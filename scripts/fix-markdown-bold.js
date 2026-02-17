/**
 * Script to convert **markdown** bold syntax to Lexical format flags
 *
 * Run with: node scripts/fix-markdown-bold.js
 */

const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'goldenwing.db')
const db = new Database(dbPath)

// Lexical format flags
const IS_BOLD = 1

function processTextNode(node) {
  if (node.type !== 'text' || !node.text) return [node]

  const text = node.text
  const boldPattern = /\*\*([^*]+)\*\*/g

  // If no bold markers, return as-is
  if (!boldPattern.test(text)) return [node]

  // Reset regex
  boldPattern.lastIndex = 0

  const result = []
  let lastIndex = 0
  let match

  while ((match = boldPattern.exec(text)) !== null) {
    // Add text before the match (if any)
    if (match.index > lastIndex) {
      result.push({
        ...node,
        text: text.substring(lastIndex, match.index)
      })
    }

    // Add the bold text (without ** markers)
    result.push({
      ...node,
      text: match[1],
      format: (node.format || 0) | IS_BOLD
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    result.push({
      ...node,
      text: text.substring(lastIndex)
    })
  }

  return result
}

function processNode(node) {
  if (!node) return node

  // Process text nodes
  if (node.type === 'text') {
    // Return array of nodes (might split into multiple)
    return processTextNode(node)
  }

  // Process children recursively
  if (node.children && Array.isArray(node.children)) {
    const newChildren = []
    for (const child of node.children) {
      const processed = processNode(child)
      if (Array.isArray(processed)) {
        newChildren.push(...processed)
      } else {
        newChildren.push(processed)
      }
    }
    node.children = newChildren
  }

  return node
}

function processContent(content) {
  if (!content || !content.root || !content.root.children) {
    return { content, changed: false }
  }

  const originalStr = JSON.stringify(content)

  // Process all children
  const newChildren = []
  for (const child of content.root.children) {
    const processed = processNode(child)
    if (Array.isArray(processed)) {
      newChildren.push(...processed)
    } else {
      newChildren.push(processed)
    }
  }
  content.root.children = newChildren

  const newStr = JSON.stringify(content)
  const changed = originalStr !== newStr

  return { content, changed }
}

function main() {
  console.log('🔍 Finding posts with markdown bold syntax...\n')

  // Find all posts with **bold** markdown
  const posts = db.prepare(`
    SELECT pl.id, pl._parent_id, pl._locale, pl.content, p.slug
    FROM posts_locales pl
    JOIN posts p ON p.id = pl._parent_id
    WHERE pl.content LIKE '%**%'
  `).all()

  console.log(`Found ${posts.length} posts with potential markdown bold\n`)

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
      } else {
        console.log(`⏭️  No changes: ${post.slug || 'Post ' + post._parent_id} (${post._locale})`)
      }
    } catch (error) {
      console.error(`❌ Error processing post ${post._parent_id} (${post._locale}):`, error.message)
    }
  }

  console.log(`\n📊 Summary: Updated ${updatedCount} of ${posts.length} posts`)

  db.close()
}

main()
