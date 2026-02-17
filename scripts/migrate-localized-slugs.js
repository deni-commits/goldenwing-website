const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'goldenwing.db'));

// Mapping: post_id -> { de: DE-slug, en: EN-slug }
const slugMapping = {
  1: { de: 'was-kostet-eine-professionelle-website', en: 'professional-website-cost-2025' },
  2: { de: 'wordpress-oder-webflow-vergleich', en: 'wordpress-vs-webflow-comparison' },
  3: { de: 'core-web-vitals-optimieren-guide', en: 'core-web-vitals-optimization-guide' },
  4: { de: 'markenidentitaet-entwickeln-leitfaden', en: 'brand-identity-development-guide' },
  5: { de: 'seo-fuer-anfaenger-guide', en: 'seo-beginners-guide' },
  6: { de: 'customer-journey-mapping-guide', en: 'customer-journey-mapping-guide' },
  7: { de: 'bilder-fuer-web-optimieren', en: 'web-image-optimization-guide' },
};

console.log('🔄 Starting slug migration...\n');

// Step 1: Check if slug column exists in posts_locales
const tableInfo = db.prepare("PRAGMA table_info(posts_locales)").all();
const hasSlugColumn = tableInfo.some(col => col.name === 'slug');

if (!hasSlugColumn) {
  console.log('📝 Adding slug column to posts_locales...');
  db.exec('ALTER TABLE posts_locales ADD COLUMN slug TEXT');
  console.log('✅ Column added\n');
} else {
  console.log('ℹ️  Slug column already exists in posts_locales\n');
}

// Step 2: Get current posts with their slugs
const posts = db.prepare('SELECT id, slug FROM posts').all();
console.log(`📊 Found ${posts.length} posts:\n`);

posts.forEach(post => {
  console.log(`  ID ${post.id}: ${post.slug}`);
});

// Step 3: Update posts_locales with localized slugs
console.log('\n📝 Updating localized slugs...\n');

const updateStmt = db.prepare(`
  UPDATE posts_locales
  SET slug = ?
  WHERE _parent_id = ? AND _locale = ?
`);

for (const [postId, slugs] of Object.entries(slugMapping)) {
  const id = parseInt(postId);

  // Update DE slug
  const deResult = updateStmt.run(slugs.de, id, 'de');
  console.log(`  Post ${id} DE: ${slugs.de} (${deResult.changes} rows updated)`);

  // Update EN slug
  const enResult = updateStmt.run(slugs.en, id, 'en');
  console.log(`  Post ${id} EN: ${slugs.en} (${enResult.changes} rows updated)`);
}

// Step 4: Verify the update
console.log('\n✅ Verification:\n');

const verifyStmt = db.prepare(`
  SELECT p.id, pl._locale, pl.slug, pl.title
  FROM posts p
  JOIN posts_locales pl ON p.id = pl._parent_id
  ORDER BY p.id, pl._locale
`);

const results = verifyStmt.all();
results.forEach(row => {
  console.log(`  Post ${row.id} [${row._locale}]: /${row.slug}`);
});

console.log('\n🎉 Migration completed successfully!');
db.close();
