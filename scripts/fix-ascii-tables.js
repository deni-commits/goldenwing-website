/**
 * Script to convert ASCII box-drawing tables to HTML tables in blog posts
 *
 * Run with: node scripts/fix-ascii-tables.js
 */

const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'goldenwing.db')
const db = new Database(dbPath)

// Box-drawing characters used in ASCII tables
const BOX_CHARS = ['┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '─', '│']

function containsBoxChars(text) {
  return BOX_CHARS.some(char => text.includes(char))
}

function isTableLine(text) {
  return containsBoxChars(text)
}

function parseAsciiTable(lines) {
  // Filter only content lines (those with │)
  const contentLines = lines.filter(line => line.includes('│'))

  if (contentLines.length === 0) return null

  const rows = []
  let isHeader = true

  for (const line of contentLines) {
    // Split by │ and clean up
    const cells = line.split('│')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0)

    if (cells.length > 0) {
      rows.push({ cells, isHeader })
      // After first content row, rest are body rows
      isHeader = false
    }
  }

  return rows
}

function generateHtmlTable(rows) {
  if (!rows || rows.length === 0) return null

  let html = '<table class="comparison">\n'

  // Header
  if (rows.length > 0 && rows[0].isHeader) {
    html += '  <thead>\n    <tr>\n'
    for (const cell of rows[0].cells) {
      html += `      <th>${escapeHtml(cell)}</th>\n`
    }
    html += '    </tr>\n  </thead>\n'
  }

  // Body
  const bodyRows = rows.slice(1)
  if (bodyRows.length > 0) {
    html += '  <tbody>\n'
    for (const row of bodyRows) {
      html += '    <tr>\n'
      for (const cell of row.cells) {
        html += `      <td>${escapeHtml(cell)}</td>\n`
      }
      html += '    </tr>\n'
    }
    html += '  </tbody>\n'
  }

  html += '</table>'
  return html
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function createHtmlBlockNode(html) {
  return {
    type: 'block',
    fields: {
      id: Math.random().toString(36).substr(2, 9),
      blockType: 'htmlBlock',
      html: html,
      blockName: ''
    },
    format: '',
    version: 2
  }
}

function processContent(content) {
  if (!content || !content.root || !content.root.children) {
    return { content, changed: false }
  }

  const newChildren = []
  let tableLines = []
  let changed = false

  for (let i = 0; i < content.root.children.length; i++) {
    const node = content.root.children[i]

    // Check if this is a paragraph with table content
    if (node.type === 'paragraph' && node.children) {
      const text = node.children.map(c => c.text || '').join('')

      if (isTableLine(text)) {
        tableLines.push(text)
        changed = true
        continue
      }
    }

    // If we have accumulated table lines and this node is not a table line
    if (tableLines.length > 0) {
      // Convert accumulated lines to HTML table
      const rows = parseAsciiTable(tableLines)
      const html = generateHtmlTable(rows)

      if (html) {
        newChildren.push(createHtmlBlockNode(html))
      }

      tableLines = []
    }

    newChildren.push(node)
  }

  // Handle any remaining table lines at the end
  if (tableLines.length > 0) {
    const rows = parseAsciiTable(tableLines)
    const html = generateHtmlTable(rows)

    if (html) {
      newChildren.push(createHtmlBlockNode(html))
    }
  }

  if (changed) {
    content.root.children = newChildren
  }

  return { content, changed }
}

function main() {
  console.log('🔍 Finding posts with ASCII tables...\n')

  // Find all posts with ASCII tables
  const posts = db.prepare(`
    SELECT pl.id, pl._parent_id, pl._locale, pl.content, p.slug
    FROM posts_locales pl
    JOIN posts p ON p.id = pl._parent_id
    WHERE pl.content LIKE '%┌%' OR pl.content LIKE '%│%'
  `).all()

  console.log(`Found ${posts.length} posts with ASCII tables\n`)

  let updatedCount = 0

  for (const post of posts) {
    try {
      const content = JSON.parse(post.content)
      const { content: newContent, changed } = processContent(content)

      if (changed) {
        const newContentStr = JSON.stringify(newContent)

        db.prepare(`
          UPDATE posts_locales
          SET content = ?
          WHERE id = ?
        `).run(newContentStr, post.id)

        console.log(`✅ Updated: ${post.slug || 'Post ' + post._parent_id} (${post._locale})`)
        updatedCount++
      }
    } catch (error) {
      console.error(`❌ Error processing post ${post._parent_id} (${post._locale}):`, error.message)
    }
  }

  console.log(`\n📊 Summary: Updated ${updatedCount} of ${posts.length} posts`)

  db.close()
}

main()
