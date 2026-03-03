/**
 * Migration script: Glossar/Lexikon → Local Payload CMS (Direct SQL)
 *
 * Reads from the old repo's lexikon data and inserts into local PostgreSQL.
 *
 * Usage: npx tsx scripts/migrate-glossary.ts
 */

import pg from 'pg'
import * as fs from 'fs'

const LOCAL_URL = 'postgresql://denikhachukaev@localhost:5432/goldenwing_dev'
const local = new pg.Pool({ connectionString: LOCAL_URL })

// Path to old repo's lexikon data
const DATA_FILE =
  '/Users/denikhachukaev/Documents/GoldenWing 360/goldenwing-website/src/lib/lexikon/data.ts'

async function localExec(sql: string, params?: unknown[]) {
  await local.query(sql, params)
}

async function localQuery(sql: string, params?: unknown[]) {
  return (await local.query(sql, params)).rows
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

const now = new Date().toISOString()

// Convert plain text to Payload Lexical richText JSON
function textToLexical(text: string) {
  if (!text) return { root: { children: [], direction: null, format: '', indent: 0, type: 'root', version: 1 } }

  const paragraphs = text.split(/\n\n|\n/).filter((p) => p.trim())
  return {
    root: {
      children: paragraphs.map((p) => ({
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: p.trim(), type: 'text', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
        textFormat: 0,
        textStyle: '',
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

// Parse the TypeScript data file to extract entries
function parseLexikonData(): LexikonEntry[] {
  const content = fs.readFileSync(DATA_FILE, 'utf-8')

  // Extract the lexikonEntries array using regex
  const arrayMatch = content.match(/export const lexikonEntries:\s*LexikonEntry\[\]\s*=\s*\[/)
  if (!arrayMatch) throw new Error('Could not find lexikonEntries array in data file')

  const startIdx = content.indexOf(arrayMatch[0]) + arrayMatch[0].length
  let depth = 1
  let endIdx = startIdx
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') depth++
    if (content[i] === ']') depth--
    if (depth === 0) {
      endIdx = i
      break
    }
  }

  const arrayContent = content.substring(startIdx, endIdx)

  // Parse entries using a state machine approach
  const entries: LexikonEntry[] = []
  let currentEntry: string | null = null
  let braceDepth = 0

  for (let i = 0; i < arrayContent.length; i++) {
    const ch = arrayContent[i]
    if (ch === '{' && braceDepth === 0) {
      currentEntry = '{'
      braceDepth = 1
    } else if (ch === '{' && braceDepth > 0 && currentEntry) {
      currentEntry += ch
      braceDepth++
    } else if (ch === '}' && braceDepth > 0 && currentEntry) {
      currentEntry += ch
      braceDepth--
      if (braceDepth === 0) {
        try {
          // Convert JS object syntax to valid JSON
          const jsonStr = currentEntry
            .replace(/\/\/.*$/gm, '') // remove comments
            .replace(/,\s*([\]}])/g, '$1') // remove trailing commas
            .replace(/(\w+)\s*:/g, '"$1":') // quote keys
            .replace(/'/g, '"') // single to double quotes
            .replace(/"(\w+)":/g, (_, key) => `"${key}":`) // ensure keys are quoted

          // Actually, this is too fragile. Use Function eval instead
          // eslint-disable-next-line no-eval
          const entry = new Function(`return (${currentEntry})`)()
          entries.push(entry)
        } catch {
          // Try a different approach - use eval-like parsing
          try {
            const entry = new Function(`return (${currentEntry})`)()
            entries.push(entry)
          } catch (e2) {
            console.error('Failed to parse entry:', (e2 as Error).message)
            console.error('Entry starts with:', currentEntry.slice(0, 100))
          }
        }
        currentEntry = null
      }
    } else if (currentEntry && braceDepth > 0) {
      currentEntry += ch
    }
  }

  return entries
}

interface LexikonContent {
  term: string
  shortDefinition: string
  fullDefinition: string
  relatedTerms: string[]
  usageExample?: string
  keyPoints: string[]
  externalLinks?: { title: string; url: string }[]
}

interface LexikonEntry {
  slug: string
  searchVolume: number
  difficulty: number
  de: LexikonContent
  en: LexikonContent
  ru?: LexikonContent
  category: string
}

async function main() {
  console.log('🔍 Parsing lexikon data from old repo...')
  const entries = parseLexikonData()
  console.log(`✅ Found ${entries.length} glossary entries`)

  if (entries.length === 0) {
    console.error('❌ No entries found!')
    process.exit(1)
  }

  // Show first 3 entries as sanity check
  console.log('\n📋 First 3 entries:')
  for (const e of entries.slice(0, 3)) {
    console.log(`  - ${e.slug} (${e.category}) [SV: ${e.searchVolume}, KD: ${e.difficulty}]`)
  }

  // Disable triggers for bulk insert
  await localExec("SET session_replication_role = 'replica'")

  // Clean existing glossary data
  console.log('\n🗑️  Cleaning existing glossary data...')
  await localExec('DELETE FROM glossary_rels')
  await localExec('DELETE FROM glossary_key_points_locales')
  await localExec('DELETE FROM glossary_key_points')
  await localExec('DELETE FROM glossary_external_links')
  await localExec('DELETE FROM glossary_locales')
  await localExec('DELETE FROM glossary')

  // Map slug → id for relatedTerms linking
  const slugToId: Record<string, number> = {}

  // ── Pass 1: Insert all entries ──
  console.log('\n📝 Pass 1: Inserting glossary entries...')

  for (const entry of entries) {
    // Insert main glossary row
    const [row] = await localQuery(
      `INSERT INTO glossary (slug, category, search_volume, difficulty, updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $5) RETURNING id`,
      [entry.slug, entry.category, entry.searchVolume, entry.difficulty, now],
    )
    const id = row.id
    slugToId[entry.slug] = id

    // Insert locales (de, en, ru)
    const locales: [string, LexikonContent | undefined][] = [
      ['de', entry.de],
      ['en', entry.en],
      ['ru', entry.ru],
    ]

    for (const [locale, content] of locales) {
      if (!content) continue
      await localExec(
        `INSERT INTO glossary_locales (term, short_definition, full_definition, usage_example, _locale, _parent_id)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [content.term, content.shortDefinition, JSON.stringify(textToLexical(content.fullDefinition)), content.usageExample || null, locale, id],
      )
    }

    // Insert key points
    if (entry.de.keyPoints) {
      for (let i = 0; i < entry.de.keyPoints.length; i++) {
        const kpId = uid()
        await localExec(
          `INSERT INTO glossary_key_points (_order, _parent_id, id) VALUES ($1, $2, $3)`,
          [i + 1, id, kpId],
        )

        // Key point locales
        const kpLocales: [string, LexikonContent | undefined][] = [
          ['de', entry.de],
          ['en', entry.en],
          ['ru', entry.ru],
        ]
        for (const [locale, content] of kpLocales) {
          if (!content?.keyPoints?.[i]) continue
          await localExec(
            `INSERT INTO glossary_key_points_locales (point, _locale, _parent_id) VALUES ($1, $2, $3)`,
            [content.keyPoints[i], locale, kpId],
          )
        }
      }
    }

    // Insert external links (not localized)
    if (entry.de.externalLinks) {
      for (let i = 0; i < entry.de.externalLinks.length; i++) {
        const link = entry.de.externalLinks[i]!
        await localExec(
          `INSERT INTO glossary_external_links (_order, _parent_id, id, title, url) VALUES ($1, $2, $3, $4, $5)`,
          [i + 1, id, uid(), link.title, link.url],
        )
      }
    }
  }

  console.log(`✅ Inserted ${entries.length} glossary entries with locales`)

  // ── Pass 2: Link relatedTerms ──
  console.log('\n🔗 Pass 2: Linking related terms...')

  let relCount = 0
  for (const entry of entries) {
    const parentId = slugToId[entry.slug]
    if (!parentId) continue

    // Collect all unique related term slugs
    const relatedSlugs = new Set<string>()
    for (const term of entry.de.relatedTerms || []) {
      // Try to find matching slug
      const slug = term
        .toLowerCase()
        .replace(/[äÄ]/g, 'ae')
        .replace(/[öÖ]/g, 'oe')
        .replace(/[üÜ]/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      if (slugToId[slug]) relatedSlugs.add(slug)
    }

    let order = 1
    for (const slug of relatedSlugs) {
      const targetId = slugToId[slug]
      if (targetId && targetId !== parentId) {
        await localExec(
          `INSERT INTO glossary_rels (parent_id, path, glossary_id, "order") VALUES ($1, $2, $3, $4)`,
          [parentId, 'relatedTerms', targetId, order++],
        )
        relCount++
      }
    }
  }

  console.log(`✅ Created ${relCount} related term links`)

  // Re-enable triggers
  await localExec("SET session_replication_role = 'origin'")

  // Fix sequences
  console.log('\n🔧 Fixing sequences...')
  const sequences = [
    { seq: 'glossary_id_seq', table: 'glossary', col: 'id' },
    { seq: 'glossary_locales_id_seq', table: 'glossary_locales', col: 'id' },
    { seq: 'glossary_key_points_locales_id_seq', table: 'glossary_key_points_locales', col: 'id' },
    { seq: 'glossary_rels_id_seq', table: 'glossary_rels', col: 'id' },
  ]
  for (const { seq, table, col } of sequences) {
    try {
      await localExec(`SELECT setval('${seq}', COALESCE((SELECT MAX(${col}) FROM ${table}), 0) + 1, false)`)
    } catch {
      // Sequence might not exist
    }
  }

  // Final count
  const [countRow] = await localQuery('SELECT count(*) FROM glossary')
  const [localeRow] = await localQuery('SELECT count(*) FROM glossary_locales')
  const [kpRow] = await localQuery('SELECT count(*) FROM glossary_key_points')
  const [relRow] = await localQuery('SELECT count(*) FROM glossary_rels')

  console.log('\n📊 Migration complete:')
  console.log(`  Glossary entries: ${countRow.count}`)
  console.log(`  Locales: ${localeRow.count}`)
  console.log(`  Key points: ${kpRow.count}`)
  console.log(`  Related term links: ${relRow.count}`)

  await local.end()
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
