/**
 * Migration script: Supabase → Local Payload CMS (Direct SQL)
 *
 * Reads from Supabase PostgreSQL (payload schema)
 * and writes directly to local PostgreSQL (public schema).
 *
 * Usage: npx tsx scripts/migrate-from-supabase.ts
 */

import pg from 'pg'

const SUPABASE_URL =
  'postgresql://postgres:dS9B337iUbqUDTLI@db.gzhvvwkoglylibvrtiqo.supabase.co:5432/postgres'
const LOCAL_URL = 'postgresql://denikhachukaev@localhost:5432/goldenwing_dev'

const sb = new pg.Pool({ connectionString: SUPABASE_URL })
const local = new pg.Pool({ connectionString: LOCAL_URL })

async function sbQuery(sql: string, params?: unknown[]) {
  return (await sb.query(sql, params)).rows
}

async function localQuery(sql: string, params?: unknown[]) {
  return (await local.query(sql, params)).rows
}

async function localExec(sql: string, params?: unknown[]) {
  await local.query(sql, params)
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

const now = new Date().toISOString()

// ── Category mapping: Supabase category slug → local posts category enum ──
const CATEGORY_MAP: Record<string, string> = {
  webdesign: 'web',
  branding: 'branding',
  seo: 'seo',
  'ui-ux': 'design',
  technologie: 'tech',
  marketing: 'marketing',
}

// ── Service slug → local category enum ──
const SERVICE_CATEGORY_MAP: Record<string, string> = {
  branding: 'branding',
  webdesign: 'web-development',
  'digital-marketing': 'marketing',
  'seo-content': 'seo',
  'web-app-entwicklung': 'web-development',
  'it-cloud-services': 'web-development',
}

async function main() {
  console.log('🔌 Connecting...')
  await sb.query('SELECT 1')
  await local.query('SELECT 1')
  console.log('✅ Both databases connected\n')

  // Disable triggers for the duration
  await localExec('SET session_replication_role = replica')

  // ── 0. Clean existing data ─────────────────────────────────
  console.log('🧹 Cleaning existing data...')
  const tablesToClean = [
    // Locale/child tables first
    'footer_legal_links_locales', 'footer_legal_links',
    'footer_columns_links_locales', 'footer_columns_links',
    'footer_columns_locales', 'footer_columns', 'footer_locales', 'footer',
    'navigation_main_menu_children_locales', 'navigation_main_menu_children',
    'navigation_main_menu_locales', 'navigation_main_menu', 'navigation_locales', 'navigation',
    'homepage_process_steps_locales', 'homepage_process_steps',
    'homepage_stats_locales', 'homepage_stats', 'homepage_locales', 'homepage',
    'site_settings_locales', 'site_settings',
    'pages_locales', 'pages',
    '_posts_v_locales', '_posts_v_version_tags', '_posts_v',
    'posts_tags', 'posts_locales', 'posts',
    'case_studies_results_locales', 'case_studies_results',
    'case_studies_images', 'case_studies_locales', 'case_studies',
    'services_features_locales', 'services_features',
    'services_rels', 'services_locales', 'services',
    'testimonials_locales', 'testimonials',
    'team_social_links', 'team_locales', 'team',
    'media_locales', 'media',
    'payload_locked_documents_rels', 'payload_locked_documents',
  ]
  for (const t of tablesToClean) {
    try { await localExec(`DELETE FROM ${t}`) } catch { /* table might not have data */ }
  }
  console.log('  ✅ Cleaned\n')

  // ── 1. Admin User ──────────────────────────────────────────
  console.log('👤 Creating admin user...')
  const existingUsers = await localQuery('SELECT count(*) FROM users')
  if (Number(existingUsers[0].count) === 0) {
    // Payload uses scrypt for password hashing, we'll set a known hash
    // For now, create with a placeholder - user can reset via admin
    await localExec(
      `INSERT INTO users (id, name, email, role, hash, salt, updated_at, created_at)
       VALUES (1, 'Deni Khachukaev', 'deni@goldenwing.at', 'admin',
               '4e5d7b6a2c1f3e8d9a0b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
               'abc123def456', $1, $1)`,
      [now],
    )
    console.log('  ✅ User created (password must be reset via admin)')
  } else {
    console.log('  ⏭ Users exist')
  }

  // ── 2. Media ───────────────────────────────────────────────
  console.log('\n📸 Migrating media...')
  const sbMedia = await sbQuery('SELECT * FROM payload.media ORDER BY id')
  const mediaIdMap = new Map<number, number>()
  let mediaCount = 0

  for (const m of sbMedia) {
    try {
      const [inserted] = await localQuery(
        `INSERT INTO media (url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, updated_at, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
        [
          m.url,
          m.thumbnail_u_r_l,
          m.filename,
          m.mime_type,
          m.filesize,
          m.width,
          m.height,
          m.focal_x || 50,
          m.focal_y || 50,
          m.updated_at,
          m.created_at,
        ],
      )
      mediaIdMap.set(m.id, inserted.id)

      // Create locale entries (local media has localized alt/caption)
      await localExec(
        `INSERT INTO media_locales (alt, caption, _locale, _parent_id)
         VALUES ($1, $2, 'de', $3), ($1, $2, 'en', $3)`,
        [m.alt || 'Bild', m.caption || null, inserted.id],
      )

      mediaCount++
    } catch (e: any) {
      console.error(`  ❌ Media ${m.id}: ${e.message}`)
    }
  }
  console.log(`  ✅ ${mediaCount}/${sbMedia.length} media items`)

  // ── 3. Team Members ────────────────────────────────────────
  console.log('\n👥 Migrating team...')
  const sbTeam = await sbQuery('SELECT * FROM payload.team_members ORDER BY id')
  const teamIdMap = new Map<number, number>()

  for (const tm of sbTeam) {
    const locales = await sbQuery(
      'SELECT * FROM payload.team_members_locales WHERE _parent_id = $1',
      [tm.id],
    )
    const de = locales.find((l: any) => l._locale === 'de')
    const en = locales.find((l: any) => l._locale === 'en')

    const [inserted] = await localQuery(
      `INSERT INTO team (name, photo_id, sort_order, updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [tm.name, mediaIdMap.get(tm.image_id) || null, tm.order || 0, tm.updated_at, tm.created_at],
    )
    teamIdMap.set(tm.id, inserted.id)

    // Locales
    await localExec(
      `INSERT INTO team_locales (role, bio, _locale, _parent_id) VALUES ($1, $2, 'de', $3)`,
      [de?.role || 'Team Member', de?.bio || null, inserted.id],
    )
    await localExec(
      `INSERT INTO team_locales (role, bio, _locale, _parent_id) VALUES ($1, $2, 'en', $3)`,
      [en?.role || de?.role || 'Team Member', en?.bio || de?.bio || null, inserted.id],
    )

    // Social links
    let order = 0
    const socials: [string, string | null][] = [
      ['linkedin', tm.social_linkedin],
      ['twitter', tm.social_twitter],
      ['instagram', tm.social_instagram],
      ['github', tm.social_github],
    ]
    for (const [platform, url] of socials) {
      if (url?.trim()) {
        await localExec(
          `INSERT INTO team_social_links (_order, _parent_id, id, platform, url)
           VALUES ($1, $2, $3, $4, $5)`,
          [order++, inserted.id, `social-${inserted.id}-${platform}`, platform, url.trim()],
        )
      }
    }

    console.log(`  ✅ ${tm.name}`)
  }

  // ── 4. Testimonials ────────────────────────────────────────
  console.log('\n⭐ Migrating testimonials...')
  const sbTestimonials = await sbQuery('SELECT * FROM payload.testimonials ORDER BY id')
  const testimonialIdMap = new Map<number, number>()

  for (const t of sbTestimonials) {
    const locales = await sbQuery(
      'SELECT * FROM payload.testimonials_locales WHERE _parent_id = $1',
      [t.id],
    )
    const de = locales.find((l: any) => l._locale === 'de')
    const en = locales.find((l: any) => l._locale === 'en')

    const [inserted] = await localQuery(
      `INSERT INTO testimonials (author, company, logo_id, rating, updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        t.name,
        t.company || null,
        mediaIdMap.get(t.image_id) || null,
        t.rating,
        t.updated_at,
        t.created_at,
      ],
    )
    testimonialIdMap.set(t.id, inserted.id)

    await localExec(
      `INSERT INTO testimonials_locales (quote, role, _locale, _parent_id) VALUES ($1, $2, 'de', $3)`,
      [de?.quote || 'Testimonial', de?.role || null, inserted.id],
    )
    await localExec(
      `INSERT INTO testimonials_locales (quote, role, _locale, _parent_id) VALUES ($1, $2, 'en', $3)`,
      [en?.quote || de?.quote || 'Testimonial', en?.role || de?.role || null, inserted.id],
    )

    console.log(`  ✅ ${t.name}`)
  }

  // ── 5. Services (parent) ───────────────────────────────────
  console.log('\n🛠 Migrating services...')
  const sbServices = await sbQuery('SELECT * FROM payload.services ORDER BY "order"')
  const serviceIdMap = new Map<number, number>()

  for (const s of sbServices) {
    const locales = await sbQuery('SELECT * FROM payload.services_locales WHERE _parent_id = $1', [
      s.id,
    ])
    const de = locales.find((l: any) => l._locale === 'de')
    const en = locales.find((l: any) => l._locale === 'en')

    const category = SERVICE_CATEGORY_MAP[s.slug] || 'web-development'

    const [inserted] = await localQuery(
      `INSERT INTO services (slug, icon, category, parent_id, "order", updated_at, created_at)
       VALUES ($1, $2, $3, NULL, $4, $5, $6) RETURNING id`,
      [s.slug, s.icon, category, s.order || 0, s.updated_at, s.created_at],
    )
    serviceIdMap.set(s.id, inserted.id)

    await localExec(
      `INSERT INTO services_locales (title, excerpt, content, _locale, _parent_id)
       VALUES ($1, $2, NULL, 'de', $3)`,
      [de?.title || s.slug, de?.subtitle || de?.description || null, inserted.id],
    )
    await localExec(
      `INSERT INTO services_locales (title, excerpt, content, _locale, _parent_id)
       VALUES ($1, $2, NULL, 'en', $3)`,
      [en?.title || de?.title || s.slug, en?.subtitle || en?.description || null, inserted.id],
    )

    // Migrate service features
    const sbFeatures = await sbQuery(
      `SELECT sf.id as sfid, sf._order FROM payload.services_features sf WHERE sf._parent_id = $1 ORDER BY sf._order`,
      [s.id],
    )

    for (const f of sbFeatures) {
      const fLocales = await sbQuery(
        'SELECT * FROM payload.services_features_locales WHERE _parent_id = $1',
        [f.sfid],
      )
      const fDe = fLocales.find((l: any) => l._locale === 'de')
      const fEn = fLocales.find((l: any) => l._locale === 'en')

      if (fDe?.title || fEn?.title) {
        const featId = `feat-${inserted.id}-${f._order}`
        await localExec(
          `INSERT INTO services_features (_order, _parent_id, id) VALUES ($1, $2, $3)`,
          [f._order, inserted.id, featId],
        )
        await localExec(
          `INSERT INTO services_features_locales (title, description, _locale, _parent_id)
           VALUES ($1, $2, 'de', $3)`,
          [fDe?.title || fEn?.title, fDe?.description || null, featId],
        )
        await localExec(
          `INSERT INTO services_features_locales (title, description, _locale, _parent_id)
           VALUES ($1, $2, 'en', $3)`,
          [fEn?.title || fDe?.title, fEn?.description || fDe?.description || null, featId],
        )
      }
    }

    console.log(`  ✅ ${de?.title || s.slug}`)
  }

  // ── 6. Sub-Services → Services (as children) ──────────────
  console.log('\n🔧 Migrating sub-services → child services...')
  const sbSubServices = await sbQuery(
    'SELECT * FROM payload.sub_services ORDER BY parent_service_id, "order"',
  )

  for (const ss of sbSubServices) {
    const locales = await sbQuery(
      'SELECT * FROM payload.sub_services_locales WHERE _parent_id = $1',
      [ss.id],
    )
    const de = locales.find((l: any) => l._locale === 'de')
    const en = locales.find((l: any) => l._locale === 'en')

    const parentLocalId = serviceIdMap.get(ss.parent_service_id)
    const parentSlug = sbServices.find((s: any) => s.id === ss.parent_service_id)?.slug
    const category = parentSlug ? SERVICE_CATEGORY_MAP[parentSlug] || 'web-development' : null

    const [inserted] = await localQuery(
      `INSERT INTO services (slug, icon, category, parent_id, "order", updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        ss.slug,
        ss.icon,
        category,
        parentLocalId || null,
        ss.order || 0,
        ss.updated_at,
        ss.created_at,
      ],
    )

    await localExec(
      `INSERT INTO services_locales (title, excerpt, content, _locale, _parent_id)
       VALUES ($1, $2, $3, 'de', $4)`,
      [
        de?.title || ss.slug,
        de?.subtitle || de?.description || null,
        de?.long_description || null,
        inserted.id,
      ],
    )
    await localExec(
      `INSERT INTO services_locales (title, excerpt, content, _locale, _parent_id)
       VALUES ($1, $2, $3, 'en', $4)`,
      [
        en?.title || de?.title || ss.slug,
        en?.subtitle || en?.description || null,
        en?.long_description || de?.long_description || null,
        inserted.id,
      ],
    )

    // Sub-service features (inline _locale, no separate locales table)
    const ssfRows = await sbQuery(
      'SELECT id as sfid, _order, _locale, title, description FROM payload.sub_services_features WHERE _parent_id = $1 ORDER BY _order, _locale',
      [ss.id],
    )
    const ssfMap = new Map<string, any>()
    for (const f of ssfRows) {
      if (!ssfMap.has(f.sfid)) ssfMap.set(f.sfid, { order: f._order, de: null, en: null })
      const entry = ssfMap.get(f.sfid)!
      if (f._locale === 'de') entry.de = { title: f.title, description: f.description }
      if (f._locale === 'en') entry.en = { title: f.title, description: f.description }
    }
    let ssfIdx = 0
    for (const [, feat] of ssfMap) {
      const title = feat.de?.title || feat.en?.title
      if (!title) continue
      const featId = `feat-${inserted.id}-${ssfIdx}`
      await localExec(
        `INSERT INTO services_features (_order, _parent_id, id) VALUES ($1, $2, $3)`,
        [ssfIdx, inserted.id, featId],
      )
      await localExec(
        `INSERT INTO services_features_locales (title, description, _locale, _parent_id)
         VALUES ($1, $2, 'de', $3)`,
        [feat.de?.title || feat.en?.title, feat.de?.description || null, featId],
      )
      await localExec(
        `INSERT INTO services_features_locales (title, description, _locale, _parent_id)
         VALUES ($1, $2, 'en', $3)`,
        [feat.en?.title || feat.de?.title, feat.en?.description || feat.de?.description || null, featId],
      )
      ssfIdx++
    }

    process.stdout.write('.')
  }
  console.log(`\n  ✅ ${sbSubServices.length} sub-services as child services`)

  // ── 7. Projects → Case Studies ─────────────────────────────
  console.log('\n📁 Migrating projects → case studies...')
  const sbProjects = await sbQuery('SELECT * FROM payload.projects ORDER BY id')

  const industryMap: Record<string, string> = {
    branding: 'other',
    webdesign: 'tech',
    seo: 'tech',
    marketing: 'other',
    entwicklung: 'tech',
    software: 'tech',
    strategie: 'other',
    content: 'other',
    'it-cloud': 'tech',
  }

  function textToLexical(text: string | null): any {
    if (!text) return null
    const paragraphs = text.split('\n\n').filter(Boolean)
    if (paragraphs.length === 0) return null
    return JSON.stringify({
      root: {
        type: 'root',
        children: paragraphs.map((p: string) => ({
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: p.trim(),
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    })
  }

  for (const p of sbProjects) {
    const locales = await sbQuery('SELECT * FROM payload.projects_locales WHERE _parent_id = $1', [
      p.id,
    ])
    const de = locales.find((l: any) => l._locale === 'de')
    const en = locales.find((l: any) => l._locale === 'en')

    // Create a testimonial from client feedback if it exists
    let testimonialId: number | null = null
    if (de?.client_feedback_quote) {
      const [t] = await localQuery(
        `INSERT INTO testimonials (author, company, rating, updated_at, created_at)
         VALUES ($1, $2, 5, $3, $3) RETURNING id`,
        [p.client_feedback_author || p.client, p.client, now],
      )
      testimonialId = t.id

      await localExec(
        `INSERT INTO testimonials_locales (quote, role, _locale, _parent_id) VALUES ($1, $2, 'de', $3)`,
        [de.client_feedback_quote, de.client_feedback_role || null, t.id],
      )
      if (en?.client_feedback_quote) {
        await localExec(
          `INSERT INTO testimonials_locales (quote, role, _locale, _parent_id) VALUES ($1, $2, 'en', $3)`,
          [en.client_feedback_quote, en.client_feedback_role || null, t.id],
        )
      } else {
        await localExec(
          `INSERT INTO testimonials_locales (quote, role, _locale, _parent_id) VALUES ($1, $2, 'en', $3)`,
          [de.client_feedback_quote, de.client_feedback_role || null, t.id],
        )
      }
    }

    const [inserted] = await localQuery(
      `INSERT INTO case_studies (slug, client, testimonial_id, cover_image_id, published_date, updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        p.slug,
        p.client,
        testimonialId,
        mediaIdMap.get(p.main_image_id) || null,
        p.created_at,
        p.updated_at,
        p.created_at,
      ],
    )

    // Locales
    const industry = industryMap[p.category] || 'other'
    await localExec(
      `INSERT INTO case_studies_locales (title, industry, challenge, solution, _locale, _parent_id)
       VALUES ($1, $2, $3, $4, 'de', $5)`,
      [
        de?.title || p.slug,
        industry,
        textToLexical(de?.challenge),
        textToLexical(de?.solution),
        inserted.id,
      ],
    )
    await localExec(
      `INSERT INTO case_studies_locales (title, industry, challenge, solution, _locale, _parent_id)
       VALUES ($1, $2, $3, $4, 'en', $5)`,
      [
        en?.title || de?.title || p.slug,
        industry,
        textToLexical(en?.challenge || de?.challenge),
        textToLexical(en?.solution || de?.solution),
        inserted.id,
      ],
    )

    // Results
    const sbResults = await sbQuery(
      `SELECT pr.id as rid, pr.metric, pr._order
       FROM payload.projects_results pr WHERE pr._parent_id = $1 ORDER BY pr._order`,
      [p.id],
    )

    for (const r of sbResults) {
      const rLocales = await sbQuery(
        'SELECT * FROM payload.projects_results_locales WHERE _parent_id = $1',
        [r.rid],
      )
      const rDe = rLocales.find((l: any) => l._locale === 'de')
      const rEn = rLocales.find((l: any) => l._locale === 'en')

      const resultId = `result-${inserted.id}-${r._order}`
      await localExec(
        `INSERT INTO case_studies_results (_order, _parent_id, id, value)
         VALUES ($1, $2, $3, $4)`,
        [r._order, inserted.id, resultId, r.metric],
      )
      await localExec(
        `INSERT INTO case_studies_results_locales (metric, _locale, _parent_id)
         VALUES ($1, 'de', $2)`,
        [rDe?.label || r.metric, resultId],
      )
      await localExec(
        `INSERT INTO case_studies_results_locales (metric, _locale, _parent_id)
         VALUES ($1, 'en', $2)`,
        [rEn?.label || rDe?.label || r.metric, resultId],
      )
    }

    // Gallery images
    const sbGallery = await sbQuery(
      'SELECT image_id, _order FROM payload.projects_gallery WHERE _parent_id = $1 ORDER BY _order',
      [p.id],
    )
    for (const g of sbGallery) {
      const newImageId = mediaIdMap.get(g.image_id)
      if (newImageId) {
        await localExec(
          `INSERT INTO case_studies_images (_order, _parent_id, id, image_id)
           VALUES ($1, $2, $3, $4)`,
          [g._order, inserted.id, `img-${inserted.id}-${g._order}`, newImageId],
        )
      }
    }

    process.stdout.write('.')
  }
  console.log(`\n  ✅ ${sbProjects.length} projects → case studies`)

  // ── 8. Blog Posts ──────────────────────────────────────────
  console.log('\n📝 Migrating blog posts...')
  const sbPosts = await sbQuery('SELECT * FROM payload.posts ORDER BY id')
  const sbCategories = await sbQuery('SELECT * FROM payload.categories')
  const categoryIdToEnum = new Map<number, string>()
  for (const c of sbCategories) {
    categoryIdToEnum.set(c.id, CATEGORY_MAP[c.slug] || 'web')
  }

  for (const p of sbPosts) {
    const locales = await sbQuery('SELECT * FROM payload.posts_locales WHERE _parent_id = $1', [
      p.id,
    ])
    const de = locales.find((l: any) => l._locale === 'de')
    const en = locales.find((l: any) => l._locale === 'en')

    if (!de) continue

    const category = categoryIdToEnum.get(p.category_id) || 'web'
    const status = p.status === 'published' ? 'published' : 'draft'

    const [inserted] = await localQuery(
      `INSERT INTO posts (slug, featured_image_id, author_id, category, published_date, reading_time, _status, updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        de.slug,
        mediaIdMap.get(p.main_image_id) || null,
        null, // author_id maps to users, not team_members - skip for now
        category,
        p.published_at,
        p.read_time,
        status,
        p.updated_at,
        p.created_at,
      ],
    )

    // Locales
    await localExec(
      `INSERT INTO posts_locales (title, excerpt, content, _locale, _parent_id)
       VALUES ($1, $2, $3, 'de', $4)`,
      [de.title, de.excerpt || null, de.content || null, inserted.id],
    )

    if (en) {
      await localExec(
        `INSERT INTO posts_locales (title, excerpt, content, _locale, _parent_id)
         VALUES ($1, $2, $3, 'en', $4)`,
        [en.title || de.title, en.excerpt || de.excerpt || null, en.content || de.content || null, inserted.id],
      )
    } else {
      // Create EN locale with DE fallback
      await localExec(
        `INSERT INTO posts_locales (title, excerpt, content, _locale, _parent_id)
         VALUES ($1, $2, $3, 'en', $4)`,
        [de.title, de.excerpt || null, de.content || null, inserted.id],
      )
    }

    // Tags from related services
    const sbRels = await sbQuery(
      'SELECT s.slug FROM payload.posts_rels pr JOIN payload.services s ON s.id = pr.services_id WHERE pr.parent_id = $1',
      [p.id],
    )
    let tagOrder = 0
    for (const r of sbRels) {
      await localExec(
        `INSERT INTO posts_tags (_order, _parent_id, id, tag)
         VALUES ($1, $2, $3, $4)`,
        [tagOrder++, inserted.id, `tag-${inserted.id}-${tagOrder}`, r.slug],
      )
    }

    process.stdout.write('.')
  }
  console.log(`\n  ✅ ${sbPosts.length} blog posts`)

  // ── 9. Globals ─────────────────────────────────────────────
  console.log('\n🌐 Configuring globals...')

  // Homepage (links are NOT localized → on homepage table; labels ARE localized → on homepage_locales)
  await localExec(
    `INSERT INTO homepage (id, hero_cta_primary_link, hero_cta_secondary_link, cta_button_link, updated_at, created_at)
     VALUES (1, '/de/kontakt', '/de/referenzen', '/de/kontakt', $1, $1) ON CONFLICT (id) DO NOTHING`,
    [now],
  )
  await localExec(
    `INSERT INTO homepage_locales (
      hero_badge, hero_line1, hero_highlight, hero_line2, hero_subline,
      hero_cta_primary_label, hero_cta_secondary_label,
      process_heading, process_subline,
      cta_heading, cta_subline, cta_button_label,
      _locale, _parent_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'de', 1)`,
    [
      'GoldenWing Creative Studios',
      'Wir machen',
      'Marken',
      'sichtbar.',
      'Full-Service Kreativagentur für Branding, Webdesign, SEO & Marketing.',
      'Projekt starten',
      'Referenzen ansehen',
      'Unser Prozess',
      'Von der Idee bis zum Launch – so arbeiten wir.',
      'Bereit für Ihr nächstes Projekt?',
      'Lassen Sie uns gemeinsam etwas Großartiges schaffen.',
      'Jetzt Kontakt aufnehmen',
    ],
  )
  await localExec(
    `INSERT INTO homepage_locales (
      hero_badge, hero_line1, hero_highlight, hero_line2, hero_subline,
      hero_cta_primary_label, hero_cta_secondary_label,
      process_heading, process_subline,
      cta_heading, cta_subline, cta_button_label,
      _locale, _parent_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'en', 1)`,
    [
      'GoldenWing Creative Studios',
      'We make',
      'brands',
      'visible.',
      'Full-service creative agency for branding, web design, SEO & marketing.',
      'Start a project',
      'View portfolio',
      'Our Process',
      'From idea to launch – how we work.',
      'Ready for your next project?',
      "Let's create something amazing together.",
      'Get in touch',
    ],
  )

  // Stats
  const stats = [
    { value: '100+', de: 'Projekte', en: 'Projects' },
    { value: '50+', de: 'Kunden', en: 'Clients' },
    { value: '6+', de: 'Jahre Erfahrung', en: 'Years Experience' },
    { value: '95%', de: 'Kundenzufriedenheit', en: 'Client Satisfaction' },
  ]
  for (let i = 0; i < stats.length; i++) {
    const s = stats[i]!
    const statId = `stat-${i}`
    await localExec(
      `INSERT INTO homepage_stats (_order, _parent_id, id, value) VALUES ($1, 1, $2, $3)`,
      [i, statId, s.value],
    )
    await localExec(
      `INSERT INTO homepage_stats_locales (label, _locale, _parent_id) VALUES ($1, 'de', $2), ($3, 'en', $2)`,
      [s.de, statId, s.en],
    )
  }

  // Process steps
  const steps = [
    {
      step: '01',
      de: ['Analyse & Strategie', 'Wir analysieren Ihre Marke, Zielgruppe und Wettbewerber.'],
      en: ['Analysis & Strategy', 'We analyze your brand, target audience and competitors.'],
    },
    {
      step: '02',
      de: ['Konzept & Design', 'Auf Basis der Strategie entwerfen wir ein visuelles Konzept.'],
      en: ['Concept & Design', 'Based on the strategy, we create a visual concept.'],
    },
    {
      step: '03',
      de: ['Entwicklung & Umsetzung', 'Technisch einwandfreie Umsetzung – responsive und SEO-optimiert.'],
      en: ['Development', 'Flawless implementation – responsive and SEO-optimized.'],
    },
    {
      step: '04',
      de: ['Launch & Optimierung', 'Nach dem Go-Live: kontinuierliche Optimierung.'],
      en: ['Launch & Optimization', 'After go-live: continuous optimization.'],
    },
  ]
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i]!
    const stepId = `step-${i}`
    await localExec(
      `INSERT INTO homepage_process_steps (_order, _parent_id, id, step) VALUES ($1, 1, $2, $3)`,
      [i, stepId, s.step],
    )
    await localExec(
      `INSERT INTO homepage_process_steps_locales (title, description, _locale, _parent_id) VALUES ($1, $2, 'de', $3)`,
      [s.de[0], s.de[1], stepId],
    )
    await localExec(
      `INSERT INTO homepage_process_steps_locales (title, description, _locale, _parent_id) VALUES ($1, $2, 'en', $3)`,
      [s.en[0], s.en[1], stepId],
    )
  }
  console.log('  ✅ Homepage global')

  // Navigation (cta_button_link is NOT localized)
  await localExec(
    `INSERT INTO navigation (id, cta_button_link, updated_at, created_at) VALUES (1, '/de/kontakt', $1, $1) ON CONFLICT (id) DO NOTHING`,
    [now],
  )
  const navItems = [
    { de: 'Leistungen', en: 'Services', link: '/de/leistungen', children: [
      { de: 'Branding', en: 'Branding', link: '/de/leistungen/branding' },
      { de: 'Webdesign', en: 'Web Design', link: '/de/leistungen/webdesign' },
      { de: 'SEO & Content', en: 'SEO & Content', link: '/de/leistungen/seo-content' },
      { de: 'Digital Marketing', en: 'Digital Marketing', link: '/de/leistungen/digital-marketing' },
    ]},
    { de: 'Referenzen', en: 'Portfolio', link: '/de/referenzen', children: [] },
    { de: 'Über uns', en: 'About', link: '/de/ueber-uns', children: [] },
    { de: 'Blog', en: 'Blog', link: '/de/blog', children: [] },
  ]

  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i]!
    const menuId = `menu-${i}`
    await localExec(
      `INSERT INTO navigation_main_menu (_order, _parent_id, id, link) VALUES ($1, 1, $2, $3)`,
      [i, menuId, item.link],
    )
    await localExec(
      `INSERT INTO navigation_main_menu_locales (label, _locale, _parent_id) VALUES ($1, 'de', $2), ($3, 'en', $2)`,
      [item.de, menuId, item.en],
    )

    for (let j = 0; j < item.children.length; j++) {
      const child = item.children[j]!
      const childId = `menu-${i}-child-${j}`
      await localExec(
        `INSERT INTO navigation_main_menu_children (_order, _parent_id, id, link) VALUES ($1, $2, $3, $4)`,
        [j, menuId, childId, child.link],
      )
      await localExec(
        `INSERT INTO navigation_main_menu_children_locales (label, _locale, _parent_id) VALUES ($1, 'de', $2), ($3, 'en', $2)`,
        [child.de, childId, child.en],
      )
    }
  }

  // Navigation locales (only label is localized)
  await localExec(
    `INSERT INTO navigation_locales (cta_button_label, _locale, _parent_id)
     VALUES ('Kontakt', 'de', 1), ('Contact', 'en', 1)`,
  )
  console.log('  ✅ Navigation global')

  // Footer
  await localExec(`INSERT INTO footer (id, updated_at, created_at) VALUES (1, $1, $1) ON CONFLICT (id) DO NOTHING`, [now])
  await localExec(
    `INSERT INTO footer_locales (copyright, _locale, _parent_id) VALUES
     ('© 2026 GoldenWing Creative Studios. Alle Rechte vorbehalten.', 'de', 1),
     ('© 2026 GoldenWing Creative Studios. All rights reserved.', 'en', 1)`,
  )

  // Footer columns
  const footerCols = [
    {
      de: 'Leistungen',
      en: 'Services',
      links: [
        { de: 'Branding', en: 'Branding', link: '/de/leistungen/branding' },
        { de: 'Webdesign', en: 'Web Design', link: '/de/leistungen/webdesign' },
        { de: 'SEO & Content', en: 'SEO & Content', link: '/de/leistungen/seo-content' },
        { de: 'Marketing', en: 'Marketing', link: '/de/leistungen/digital-marketing' },
      ],
    },
    {
      de: 'Unternehmen',
      en: 'Company',
      links: [
        { de: 'Über uns', en: 'About', link: '/de/ueber-uns' },
        { de: 'Referenzen', en: 'Portfolio', link: '/de/referenzen' },
        { de: 'Blog', en: 'Blog', link: '/de/blog' },
        { de: 'Kontakt', en: 'Contact', link: '/de/kontakt' },
      ],
    },
    {
      de: 'Standort',
      en: 'Location',
      links: [{ de: 'Innsbruck, Österreich', en: 'Innsbruck, Austria', link: '#' }],
    },
  ]

  for (let i = 0; i < footerCols.length; i++) {
    const col = footerCols[i]!
    const colId = `fcol-${i}`
    await localExec(
      `INSERT INTO footer_columns (_order, _parent_id, id) VALUES ($1, 1, $2)`,
      [i, colId],
    )
    await localExec(
      `INSERT INTO footer_columns_locales (heading, _locale, _parent_id) VALUES ($1, 'de', $2), ($3, 'en', $2)`,
      [col.de, colId, col.en],
    )
    for (let j = 0; j < col.links.length; j++) {
      const link = col.links[j]!
      const linkId = `flink-${i}-${j}`
      await localExec(
        `INSERT INTO footer_columns_links (_order, _parent_id, id, link, new_tab) VALUES ($1, $2, $3, $4, false)`,
        [j, colId, linkId, link.link],
      )
      await localExec(
        `INSERT INTO footer_columns_links_locales (label, _locale, _parent_id) VALUES ($1, 'de', $2), ($3, 'en', $2)`,
        [link.de, linkId, link.en],
      )
    }
  }

  // Legal links
  const legalLinks = [
    { de: 'Impressum', en: 'Legal Notice', link: '/de/impressum' },
    { de: 'Datenschutz', en: 'Privacy Policy', link: '/de/datenschutz' },
    { de: 'AGB', en: 'Terms', link: '/de/agb' },
  ]
  for (let i = 0; i < legalLinks.length; i++) {
    const ll = legalLinks[i]!
    const llId = `legal-${i}`
    await localExec(
      `INSERT INTO footer_legal_links (_order, _parent_id, id, link) VALUES ($1, 1, $2, $3)`,
      [i, llId, ll.link],
    )
    await localExec(
      `INSERT INTO footer_legal_links_locales (label, _locale, _parent_id) VALUES ($1, 'de', $2), ($3, 'en', $2)`,
      [ll.de, llId, ll.en],
    )
  }
  console.log('  ✅ Footer global')

  // Site Settings
  await localExec(
    `INSERT INTO site_settings (id, company_name, contact_address, contact_phone, contact_email,
     social_instagram, social_linkedin, analytics_id, updated_at, created_at)
     VALUES (1, 'GoldenWing Creative Studios',
     'Innsbruck, Österreich', '+43 660 123 4567', 'office@goldenwing.at',
     'https://instagram.com/goldenwing.studio', 'https://linkedin.com/company/goldenwing-360',
     NULL, $1, $1) ON CONFLICT (id) DO NOTHING`,
    [now],
  )
  await localExec(
    `INSERT INTO site_settings_locales (seo_default_title, seo_default_description, _locale, _parent_id)
     VALUES ('GoldenWing Creative Studios – Kreativagentur Innsbruck',
     'Full-Service Kreativagentur in Innsbruck: Branding, Webdesign, SEO & Digital Marketing.', 'de', 1),
     ('GoldenWing Creative Studios – Creative Agency Innsbruck',
     'Full-service creative agency in Innsbruck: Branding, Web Design, SEO & Digital Marketing.', 'en', 1)`,
  )
  console.log('  ✅ Site Settings global')

  // ── 10. Legal Pages (placeholders) ─────────────────────────
  console.log('\n📄 Creating legal pages...')
  const legalPages = [
    { slug: 'impressum', de: 'Impressum', en: 'Legal Notice' },
    { slug: 'datenschutz', de: 'Datenschutzerklärung', en: 'Privacy Policy' },
    { slug: 'agb', de: 'Allgemeine Geschäftsbedingungen', en: 'Terms & Conditions' },
  ]

  for (const page of legalPages) {
    const [inserted] = await localQuery(
      `INSERT INTO pages (slug, updated_at, created_at) VALUES ($1, $2, $2) RETURNING id`,
      [page.slug, now],
    )
    await localExec(
      `INSERT INTO pages_locales (title, _locale, _parent_id) VALUES ($1, 'de', $2), ($3, 'en', $2)`,
      [page.de, inserted.id, page.en],
    )
    console.log(`  ✅ ${page.de}`)
  }

  // ── Re-enable triggers ─────────────────────────────────────
  await localExec('SET session_replication_role = DEFAULT')

  // ── Fix sequences ──────────────────────────────────────────
  console.log('\n🔧 Fixing sequences...')
  const seqFixes = [
    ['media_id_seq', 'media', 'id'],
    ['team_id_seq', 'team', 'id'],
    ['testimonials_id_seq', 'testimonials', 'id'],
    ['services_id_seq', 'services', 'id'],
    ['case_studies_id_seq', 'case_studies', 'id'],
    ['posts_id_seq', 'posts', 'id'],
    ['pages_id_seq', 'pages', 'id'],
    ['users_id_seq', 'users', 'id'],
    ['media_locales_id_seq', 'media_locales', 'id'],
    ['team_locales_id_seq', 'team_locales', 'id'],
    ['testimonials_locales_id_seq', 'testimonials_locales', 'id'],
    ['services_locales_id_seq', 'services_locales', 'id'],
    ['services_features_locales_id_seq', 'services_features_locales', 'id'],
    ['case_studies_locales_id_seq', 'case_studies_locales', 'id'],
    ['case_studies_results_locales_id_seq', 'case_studies_results_locales', 'id'],
    ['posts_locales_id_seq', 'posts_locales', 'id'],
    ['pages_locales_id_seq', 'pages_locales', 'id'],
    ['homepage_locales_id_seq', 'homepage_locales', 'id'],
    ['homepage_stats_locales_id_seq', 'homepage_stats_locales', 'id'],
    ['homepage_process_steps_locales_id_seq', 'homepage_process_steps_locales', 'id'],
    ['navigation_locales_id_seq', 'navigation_locales', 'id'],
    ['navigation_main_menu_locales_id_seq', 'navigation_main_menu_locales', 'id'],
    ['navigation_main_menu_children_locales_id_seq', 'navigation_main_menu_children_locales', 'id'],
    ['footer_locales_id_seq', 'footer_locales', 'id'],
    ['footer_columns_locales_id_seq', 'footer_columns_locales', 'id'],
    ['footer_columns_links_locales_id_seq', 'footer_columns_links_locales', 'id'],
    ['footer_legal_links_locales_id_seq', 'footer_legal_links_locales', 'id'],
    ['site_settings_locales_id_seq', 'site_settings_locales', 'id'],
  ]

  for (const [seq, table, col] of seqFixes) {
    try {
      await localExec(`SELECT setval('${seq}', COALESCE((SELECT MAX(${col}) FROM ${table}), 0) + 1, false)`)
    } catch {
      // Sequence might not exist for some tables
    }
  }
  console.log('  ✅ Sequences fixed')

  // ── Summary ────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(50))
  console.log('✅ Migration complete!')
  console.log('═'.repeat(50))

  const counts = await Promise.all([
    localQuery("SELECT count(*) FROM media"),
    localQuery("SELECT count(*) FROM team"),
    localQuery("SELECT count(*) FROM testimonials"),
    localQuery("SELECT count(*) FROM services"),
    localQuery("SELECT count(*) FROM case_studies"),
    localQuery("SELECT count(*) FROM posts"),
    localQuery("SELECT count(*) FROM pages"),
    localQuery("SELECT count(*) FROM users"),
  ])

  const names = ['Media', 'Team', 'Testimonials', 'Services (parent+sub)', 'Case Studies', 'Posts', 'Pages', 'Users']
  console.log('\n📊 Collection Counts:')
  names.forEach((name, i) => {
    console.log(`  ${name}: ${counts[i]![0].count}`)
  })

  await sb.end()
  await local.end()
  process.exit(0)
}

main().catch((e) => {
  console.error('Fatal error:', e)
  process.exit(1)
})
