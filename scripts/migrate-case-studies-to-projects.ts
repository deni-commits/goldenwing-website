/**
 * Migration Script: Add Case Study Content to Existing Projects
 *
 * This script updates existing projects with detailed case study content
 * including challenge, solution, and client feedback.
 *
 * Run with: npx tsx scripts/migrate-case-studies-to-projects.ts
 */

import Database from 'better-sqlite3'
import { caseStudies } from '../src/lib/case-studies/data'

const db = new Database('goldenwing.db')

// Mapping: existing project slug → case study slug
const projectToCaseStudy: Record<string, string> = {
  'domoferm': 'domoferm-b2b-digital-strategy',
  'atta-pallet': 'atta-paper-pallet-sustainable-innovation',
  'point-of-new': 'point-of-new-innovation-rebranding',
  'lamberg': 'lamberg-ecommerce-success',
  'turbo-mango': 'turbo-mango-agency-branding',
  'inspire': 'inspire-icmpd-talent-recruitment',
  'alinea-partners': 'alinea-partners-consulting',
  'simax': 'simax-inclusion-technology',
  'erkurt-gartengestaltung': 'erkurt-gartengestaltung-landscaping',
  'tet-group': 'tet-group-brand-guidelines',
  'umzugsreif': 'umzugsreif-digital-business',
  'derbotaniker': 'der-botaniker-premium-brand',
  'glaeser-law': 'glaeser-law-brand-presence',
  'soki': 'soki-ai-website-redesign',
  'qatar-duty-free': 'qatar-duty-free-digital-marketing',
  'vimmi': 'vimmi-streaming-platform',
  'healthcare-app': 'healthcare-tablet-clinical-app',
  'vpn-billing-integration': 'vpn-billing-integration',
  'banking-analytics': 'banking-analytics-platform',
  'cloud-devops': 'cloud-devops-infrastructure',
}

// Get case study by slug
function getCaseStudyBySlug(slug: string) {
  return caseStudies.find(cs => cs.slug === slug)
}

// Update project locales
function updateProjectLocale(
  projectId: number,
  locale: 'de' | 'en',
  data: {
    title?: string
    description?: string
    long_description?: string
    challenge?: string
    solution?: string
    client_feedback_quote?: string
    client_feedback_role?: string
  }
) {
  const existing = db.prepare(
    'SELECT * FROM projects_locales WHERE _parent_id = ? AND _locale = ?'
  ).get(projectId, locale) as Record<string, unknown> | undefined

  if (existing) {
    // Update existing locale entry
    db.prepare(`
      UPDATE projects_locales SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        long_description = COALESCE(?, long_description),
        challenge = COALESCE(?, challenge),
        solution = COALESCE(?, solution),
        client_feedback_quote = COALESCE(?, client_feedback_quote),
        client_feedback_role = COALESCE(?, client_feedback_role)
      WHERE _parent_id = ? AND _locale = ?
    `).run(
      data.title,
      data.description,
      data.long_description,
      data.challenge,
      data.solution,
      data.client_feedback_quote,
      data.client_feedback_role,
      projectId,
      locale
    )
  } else {
    // Insert new locale entry
    db.prepare(`
      INSERT INTO projects_locales (
        _parent_id, _locale, title, description, long_description,
        challenge, solution, client_feedback_quote, client_feedback_role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      projectId,
      locale,
      data.title || '',
      data.description || '',
      data.long_description || null,
      data.challenge || null,
      data.solution || null,
      data.client_feedback_quote || null,
      data.client_feedback_role || null
    )
  }
}

// Update client_feedback_author in main projects table
function updateProjectAuthor(projectId: number, author: string) {
  db.prepare(`
    UPDATE projects SET client_feedback_author = ? WHERE id = ?
  `).run(author, projectId)
}

// Main migration
function migrate() {
  console.log('🚀 Starting case study to projects migration...\n')

  // Get all projects
  const projects = db.prepare('SELECT id, slug, client FROM projects').all() as Array<{
    id: number
    slug: string
    client: string
  }>

  let updated = 0
  let skipped = 0

  for (const project of projects) {
    const caseStudySlug = projectToCaseStudy[project.slug]

    if (!caseStudySlug) {
      console.log(`⏭️  Skipping ${project.slug} - no matching case study`)
      skipped++
      continue
    }

    const caseStudy = getCaseStudyBySlug(caseStudySlug)

    if (!caseStudy) {
      console.log(`⚠️  Case study not found: ${caseStudySlug}`)
      skipped++
      continue
    }

    console.log(`📝 Updating ${project.slug} with ${caseStudySlug}...`)

    // Update German locale
    updateProjectLocale(project.id, 'de', {
      title: caseStudy.de.title,
      description: caseStudy.de.shortDescription,
      long_description: caseStudy.de.fullDescription,
      challenge: caseStudy.de.challenge,
      solution: caseStudy.de.solution,
      client_feedback_quote: caseStudy.de.clientQuote,
      client_feedback_role: caseStudy.de.clientRole,
    })

    // Update English locale
    updateProjectLocale(project.id, 'en', {
      title: caseStudy.en.title,
      description: caseStudy.en.shortDescription,
      long_description: caseStudy.en.fullDescription,
      challenge: caseStudy.en.challenge,
      solution: caseStudy.en.solution,
      client_feedback_quote: caseStudy.en.clientQuote,
      client_feedback_role: caseStudy.en.clientRole,
    })

    // Update author (not localized)
    updateProjectAuthor(project.id, caseStudy.de.clientName)

    updated++
  }

  console.log('\n✅ Migration complete!')
  console.log(`   Updated: ${updated} projects`)
  console.log(`   Skipped: ${skipped} projects`)
}

// Run migration
migrate()
db.close()
