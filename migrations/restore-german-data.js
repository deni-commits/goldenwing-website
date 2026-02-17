/**
 * Migration Script: Restore German Data After Localization Schema Push
 *
 * This script restores the existing German content to the new localized tables.
 * Uses Node.js native SQLite support (Node 22+)
 *
 * Run with: node migrations/restore-german-data.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const DB_PATH = path.join(__dirname, '..', 'goldenwing.db')
const MIGRATIONS_DIR = __dirname

function loadBackup(filename) {
  const filepath = path.join(MIGRATIONS_DIR, filename)
  const content = fs.readFileSync(filepath, 'utf-8')
  if (!content.trim()) return []
  return JSON.parse(content)
}

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL'
  return "'" + String(str).replace(/'/g, "''") + "'"
}

function escapeID(id) {
  // If it's a number, return as-is
  if (typeof id === 'number') return id
  // If it's a string that looks like a hex ObjectID, quote it
  if (typeof id === 'string') return "'" + id + "'"
  return id
}

function generateSQL() {
  let sql = '-- Auto-generated SQL to restore German data\n'
  sql += 'BEGIN TRANSACTION;\n\n'

  // 1. Services
  console.log('📦 Generating SQL for services...')
  const services = loadBackup('services_backup.json')
  for (const item of services) {
    sql += `INSERT OR REPLACE INTO services_locales (_locale, _parent_id, title, subtitle, description) VALUES ('de', ${item.id}, ${escapeSQL(item.title)}, ${escapeSQL(item.subtitle)}, ${escapeSQL(item.description)});\n`
  }
  sql += '\n'

  // 2. Sub-services
  console.log('📦 Generating SQL for sub_services...')
  const subServices = loadBackup('sub_services_backup.json')
  for (const item of subServices) {
    sql += `INSERT OR REPLACE INTO sub_services_locales (_locale, _parent_id, title, subtitle, description, long_description, pricing_unit, pricing_description, duration, seo_meta_title, seo_meta_description, seo_keywords) VALUES ('de', ${item.id}, ${escapeSQL(item.title)}, ${escapeSQL(item.subtitle)}, ${escapeSQL(item.description)}, ${escapeSQL(item.long_description)}, ${escapeSQL(item.pricing_unit)}, ${escapeSQL(item.pricing_description)}, ${escapeSQL(item.duration)}, ${escapeSQL(item.seo_meta_title)}, ${escapeSQL(item.seo_meta_description)}, ${escapeSQL(item.seo_keywords)});\n`
  }
  sql += '\n'

  // 3. Projects
  console.log('📦 Generating SQL for projects...')
  const projects = loadBackup('projects_backup.json')
  for (const item of projects) {
    sql += `INSERT OR REPLACE INTO projects_locales (_locale, _parent_id, title, description, long_description, challenge, solution, client_feedback_quote, client_feedback_role) VALUES ('de', ${item.id}, ${escapeSQL(item.title)}, ${escapeSQL(item.description)}, ${escapeSQL(item.long_description)}, ${escapeSQL(item.challenge)}, ${escapeSQL(item.solution)}, ${escapeSQL(item.client_feedback_quote)}, ${escapeSQL(item.client_feedback_role)});\n`
  }
  sql += '\n'

  // 4. Projects Results (if locales table exists)
  console.log('📦 Generating SQL for projects_results...')
  const projectsResults = loadBackup('projects_results_backup.json')
  for (const item of projectsResults) {
    sql += `INSERT OR IGNORE INTO projects_results_locales (_locale, _parent_id, label) VALUES ('de', ${escapeID(item.id)}, ${escapeSQL(item.label)});\n`
  }
  sql += '\n'

  // 5. Projects Gallery (if locales table exists)
  console.log('📦 Generating SQL for projects_gallery...')
  const projectsGallery = loadBackup('projects_gallery_backup.json')
  for (const item of projectsGallery) {
    if (item.caption) {
      sql += `INSERT OR IGNORE INTO projects_gallery_locales (_locale, _parent_id, caption) VALUES ('de', ${escapeID(item.id)}, ${escapeSQL(item.caption)});\n`
    }
  }
  sql += '\n'

  // 6. Posts
  console.log('📦 Generating SQL for posts...')
  const posts = loadBackup('posts_backup.json')
  for (const item of posts) {
    sql += `INSERT OR REPLACE INTO posts_locales (_locale, _parent_id, title, excerpt, content, seo_meta_title, seo_meta_description, seo_keywords) VALUES ('de', ${item.id}, ${escapeSQL(item.title)}, ${escapeSQL(item.excerpt)}, ${escapeSQL(item.content)}, ${escapeSQL(item.seo_meta_title)}, ${escapeSQL(item.seo_meta_description)}, ${escapeSQL(item.seo_keywords)});\n`
  }
  sql += '\n'

  // 7. Posts Sources (if locales table exists)
  console.log('📦 Generating SQL for posts_sources...')
  const postsSources = loadBackup('posts_sources_backup.json')
  for (const item of postsSources) {
    sql += `INSERT OR IGNORE INTO posts_sources_locales (_locale, _parent_id, title) VALUES ('de', ${escapeID(item.id)}, ${escapeSQL(item.title)});\n`
  }
  sql += '\n'

  // 8. Team Members
  console.log('📦 Generating SQL for team_members...')
  const teamMembers = loadBackup('team_members_backup.json')
  for (const item of teamMembers) {
    sql += `INSERT OR REPLACE INTO team_members_locales (_locale, _parent_id, role, bio) VALUES ('de', ${item.id}, ${escapeSQL(item.role)}, ${escapeSQL(item.bio)});\n`
  }
  sql += '\n'

  // 9. Testimonials
  console.log('📦 Generating SQL for testimonials...')
  const testimonials = loadBackup('testimonials_backup.json')
  for (const item of testimonials) {
    sql += `INSERT OR REPLACE INTO testimonials_locales (_locale, _parent_id, role, quote) VALUES ('de', ${item.id}, ${escapeSQL(item.role)}, ${escapeSQL(item.quote)});\n`
  }
  sql += '\n'

  // 10. Home Page
  console.log('📦 Generating SQL for home_page...')
  const homePage = loadBackup('home_page_backup.json')
  if (homePage.length > 0) {
    const hp = homePage[0]
    sql += `INSERT OR REPLACE INTO home_page_locales (_locale, _parent_id, hero_badge, hero_headline_line1, hero_headline_highlight, hero_headline_line2, hero_subheadline, hero_cta_primary, hero_cta_secondary, hero_trust_text, services_title, services_subtitle, services_cta_text, usp_title, usp_subtitle, usp_quote, projects_title, projects_subtitle, testimonials_title, testimonials_subtitle, process_title, process_subtitle, team_title, team_subtitle, logo_carousel_title, logo_carousel_subtitle, faq_title, faq_subtitle, faq_cta_text, faq_cta_button, cta_title, cta_subtitle, cta_primary_button) VALUES ('de', ${hp.id}, ${escapeSQL(hp.hero_badge)}, ${escapeSQL(hp.hero_headline_line1)}, ${escapeSQL(hp.hero_headline_highlight)}, ${escapeSQL(hp.hero_headline_line2)}, ${escapeSQL(hp.hero_subheadline)}, ${escapeSQL(hp.hero_cta_primary)}, ${escapeSQL(hp.hero_cta_secondary)}, ${escapeSQL(hp.hero_trust_text)}, ${escapeSQL(hp.services_title)}, ${escapeSQL(hp.services_subtitle)}, ${escapeSQL(hp.services_cta_text)}, ${escapeSQL(hp.usp_title)}, ${escapeSQL(hp.usp_subtitle)}, ${escapeSQL(hp.usp_quote)}, ${escapeSQL(hp.projects_title)}, ${escapeSQL(hp.projects_subtitle)}, ${escapeSQL(hp.testimonials_title)}, ${escapeSQL(hp.testimonials_subtitle)}, ${escapeSQL(hp.process_title)}, ${escapeSQL(hp.process_subtitle)}, ${escapeSQL(hp.team_title)}, ${escapeSQL(hp.team_subtitle)}, ${escapeSQL(hp.logo_carousel_title)}, ${escapeSQL(hp.logo_carousel_subtitle)}, ${escapeSQL(hp.faq_title)}, ${escapeSQL(hp.faq_subtitle)}, ${escapeSQL(hp.faq_cta_text)}, ${escapeSQL(hp.faq_cta_button)}, ${escapeSQL(hp.cta_title)}, ${escapeSQL(hp.cta_subtitle)}, ${escapeSQL(hp.cta_primary_button)});\n`
  }
  sql += '\n'

  sql += 'COMMIT;\n'

  return sql
}

async function main() {
  console.log('🔄 Generating SQL for German data restoration...\n')

  const sql = generateSQL()

  // Write SQL to file
  const sqlFile = path.join(MIGRATIONS_DIR, 'restore-data.sql')
  fs.writeFileSync(sqlFile, sql)
  console.log(`\n✓ SQL written to ${sqlFile}`)

  // Execute SQL
  console.log('\n🔄 Executing SQL...')
  try {
    execSync(`sqlite3 "${DB_PATH}" < "${sqlFile}"`, { stdio: 'inherit' })
    console.log('\n✅ German data restoration completed successfully!')
  } catch (error) {
    console.error('\n❌ Error executing SQL:', error.message)
    process.exit(1)
  }

  // Verify
  console.log('\n📊 Verification:')
  const counts = [
    ['services_locales', 'SELECT COUNT(*) FROM services_locales'],
    ['sub_services_locales', 'SELECT COUNT(*) FROM sub_services_locales'],
    ['projects_locales', 'SELECT COUNT(*) FROM projects_locales'],
    ['posts_locales', 'SELECT COUNT(*) FROM posts_locales'],
    ['team_members_locales', 'SELECT COUNT(*) FROM team_members_locales'],
    ['testimonials_locales', 'SELECT COUNT(*) FROM testimonials_locales'],
    ['home_page_locales', 'SELECT COUNT(*) FROM home_page_locales'],
  ]

  for (const [table, query] of counts) {
    const result = execSync(`sqlite3 "${DB_PATH}" "${query}"`, { encoding: 'utf-8' }).trim()
    console.log(`  ${table}: ${result} records`)
  }
}

main()
