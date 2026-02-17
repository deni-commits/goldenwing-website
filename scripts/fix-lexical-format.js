/**
 * Fix Lexical Editor State Format
 *
 * Problem: Posts have incomplete root structure missing direction, format, indent, version
 * Solution: Add missing fields to root node
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'goldenwing.db');
const db = new Database(dbPath);

console.log('🔧 Fixing Lexical format for all posts...\n');

// Get all posts with content
const posts = db.prepare(`
  SELECT _parent_id, _locale, slug, content
  FROM posts_locales
  WHERE content IS NOT NULL AND content != ''
`).all();

console.log(`Found ${posts.length} posts to check\n`);

let fixed = 0;
let skipped = 0;

for (const post of posts) {
  try {
    const content = JSON.parse(post.content);

    // Check if root is missing required fields
    if (!content.root.direction && !content.root.hasOwnProperty('format') && !content.root.hasOwnProperty('indent')) {
      console.log(`Fixing: ${post.slug} (${post._locale})`);

      // Add missing fields to root
      content.root.direction = null;
      content.root.format = '';
      content.root.indent = 0;
      content.root.version = 1;

      // Also fix children nodes recursively
      fixNodeRecursive(content.root);

      // Update database
      const newContent = JSON.stringify(content);
      db.prepare(`
        UPDATE posts_locales
        SET content = ?
        WHERE _parent_id = ? AND _locale = ?
      `).run(newContent, post._parent_id, post._locale);

      fixed++;
    } else {
      console.log(`OK: ${post.slug} (${post._locale})`);
      skipped++;
    }
  } catch (err) {
    console.error(`Error processing ${post.slug}: ${err.message}`);
  }
}

function fixNodeRecursive(node) {
  // Add missing fields based on node type
  if (node.type === 'paragraph' || node.type === 'heading' || node.type === 'quote' || node.type === 'list' || node.type === 'listitem') {
    if (!node.hasOwnProperty('direction')) node.direction = null;
    if (!node.hasOwnProperty('format')) node.format = '';
    if (!node.hasOwnProperty('indent')) node.indent = 0;
    if (!node.hasOwnProperty('version')) node.version = 1;
  }

  // Process children
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      fixNodeRecursive(child);
    }
  }
}

db.close();

console.log(`\n✅ Done! Fixed: ${fixed}, Skipped: ${skipped}`);
