/**
 * Seed script: Import all real GoldenWing data into Payload CMS
 *
 * Usage: npx tsx scripts/seed.ts
 *
 * Reads from scripts/data/*.json (backup from old site)
 * and creates all content in Payload collections.
 */

import { getPayload } from 'payload'
import config from '../src/payload/payload.config'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.resolve(__dirname, 'data')

function loadJSON(filename: string) {
  const filepath = path.join(DATA_DIR, filename)
  if (!fs.existsSync(filepath)) {
    console.warn(`⚠ ${filename} not found, skipping`)
    return []
  }
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

function textToLexical(text: string) {
  if (!text) return undefined
  // If it's already Lexical JSON, return as-is
  if (text.startsWith('{') && text.includes('"root"')) {
    try {
      return JSON.parse(text)
    } catch {
      // fall through to plain text conversion
    }
  }
  // Convert plain text paragraphs to Lexical format
  const paragraphs = text.split('\n\n').filter(Boolean)
  return {
    root: {
      type: 'root',
      children: paragraphs.map((p: string) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: p.trim(), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
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
  }
}

// Map old category IDs to new Payload select values
const categoryMap: Record<string, string> = {
  branding: 'branding',
  webdesign: 'web-development',
  strategie: 'marketing',
  software: 'web-development',
  content: 'marketing',
  seo: 'seo',
}

const industryMap: Record<string, string> = {
  strategie: 'other',
  webdesign: 'tech',
  branding: 'retail',
  software: 'tech',
  content: 'other',
  seo: 'finance',
}

async function seed() {
  console.log('🌱 Starting seed with real GoldenWing data...\n')

  const payload = await getPayload({ config })

  // ------ 1. TEAM MEMBERS ------
  console.log('👥 Seeding team members...')
  const teamData = loadJSON('team_members_backup.json')
  const teamMap: Record<number, string> = {}

  for (const member of teamData) {
    const socialLinks: { platform: string; url: string }[] = []
    if (member.social_linkedin) socialLinks.push({ platform: 'linkedin', url: member.social_linkedin })
    if (member.social_instagram) socialLinks.push({ platform: 'instagram', url: member.social_instagram })
    if (member.social_github) socialLinks.push({ platform: 'github', url: member.social_github })
    if (member.social_twitter) socialLinks.push({ platform: 'twitter', url: member.social_twitter })

    try {
      const created = await payload.create({
        collection: 'team',
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio || '',
          sortOrder: member.order || 0,
          socialLinks,
        },
      })
      teamMap[member.id] = created.id as string
      console.log(`  ✓ ${member.name}`)
    } catch (err: any) {
      console.error(`  ✗ ${member.name}: ${err.message}`)
    }
  }

  // ------ 2. TESTIMONIALS ------
  console.log('\n💬 Seeding testimonials...')
  const testimonialsData = loadJSON('testimonials_backup.json')

  // Also collect testimonials from projects (client_feedback)
  const projectsData = loadJSON('projects_backup.json')
  const testimonialMap: Record<number, string> = {}

  for (const t of testimonialsData) {
    if (!t.quote || t.quote.trim().length < 10) continue
    try {
      const created = await payload.create({
        collection: 'testimonials',
        data: {
          quote: t.quote.trim(),
          author: t.name || 'Anonym',
          company: t.company || '',
          role: t.role || '',
          rating: t.rating || 5,
        },
      })
      testimonialMap[t.id] = created.id as string
      console.log(`  ✓ ${t.name}`)
    } catch (err: any) {
      console.error(`  ✗ ${t.name}: ${err.message}`)
    }
  }

  // Create testimonials from projects with client feedback
  const projectTestimonialMap: Record<number, string> = {}
  for (const p of projectsData) {
    if (p.client_feedback_quote && p.client_feedback_quote.trim().length > 10) {
      try {
        const created = await payload.create({
          collection: 'testimonials',
          data: {
            quote: p.client_feedback_quote.trim(),
            author: p.client_feedback_author || p.client,
            company: p.client,
            role: p.client_feedback_role || '',
            rating: 5,
          },
        })
        projectTestimonialMap[p.id] = created.id as string
        console.log(`  ✓ ${p.client} (from project)`)
      } catch (err: any) {
        console.error(`  ✗ ${p.client}: ${err.message}`)
      }
    }
  }

  // ------ 3. SERVICES (Parent) ------
  console.log('\n🔧 Seeding services...')
  const servicesData = loadJSON('services_backup.json')
  const servicesFeaturesData = loadJSON('services_features_backup.json')
  const serviceMap: Record<number, string> = {}

  for (const service of servicesData) {
    // Get features for this service
    const features = servicesFeaturesData
      .filter((f: any) => f._parent_id === service.id)
      .sort((a: any, b: any) => a._order - b._order)
      .map((f: any) => ({ title: f.title, description: f.description || '' }))

    // Map icon names
    const iconMap: Record<string, string> = {
      palette: 'Palette',
      globe: 'Globe',
      'line-chart': 'LineChart',
      search: 'Search',
      camera: 'Camera',
      zap: 'Zap',
      code: 'Code',
    }

    try {
      const created = await payload.create({
        collection: 'services',
        data: {
          title: service.title,
          slug: service.slug,
          excerpt: service.description || service.subtitle || '',
          icon: iconMap[service.icon] || service.icon || '',
          category: categoryMap[service.slug] || 'marketing',
          order: service.order || 0,
          features,
        },
      })
      serviceMap[service.id] = created.id as string
      console.log(`  ✓ ${service.title} (${features.length} features)`)
    } catch (err: any) {
      console.error(`  ✗ ${service.title}: ${err.message}`)
    }
  }

  // ------ 4. SUB-SERVICES ------
  console.log('\n🔧 Seeding sub-services...')
  const subServicesData = loadJSON('sub_services_backup.json')

  for (const sub of subServicesData) {
    const parentId = serviceMap[sub.parent_service_id]
    if (!parentId) {
      console.warn(`  ⚠ No parent found for ${sub.title} (parent_service_id=${sub.parent_service_id})`)
      continue
    }

    const iconMap: Record<string, string> = {
      target: 'Target',
      type: 'Type',
      'pen-tool': 'PenTool',
      shield: 'Shield',
      book: 'Book',
      monitor: 'Monitor',
      layers: 'Layers',
      layout: 'Layout',
      'shopping-cart': 'ShoppingCart',
      zap: 'Zap',
      users: 'Users',
      'git-branch': 'GitBranch',
      compass: 'Compass',
      'bar-chart': 'BarChart',
      search: 'Search',
      'map-pin': 'MapPin',
      'check-circle': 'CheckCircle',
      key: 'Key',
      'file-text': 'FileText',
      calendar: 'Calendar',
      video: 'Video',
      camera: 'Camera',
      'sliders': 'Sliders',
      lock: 'Lock',
      cpu: 'Cpu',
      link: 'Link',
      cloud: 'Cloud',
      smartphone: 'Smartphone',
      globe: 'Globe',
      terminal: 'Terminal',
      palette: 'Palette',
      clipboard: 'Clipboard',
    }

    try {
      await payload.create({
        collection: 'services',
        data: {
          title: sub.title,
          slug: sub.slug,
          excerpt: sub.description || sub.subtitle || '',
          icon: iconMap[sub.icon] || sub.icon || '',
          parent: parentId,
          order: sub.order || 0,
        },
      })
      console.log(`  ✓ ${sub.title} → ${servicesData.find((s: any) => s.id === sub.parent_service_id)?.title}`)
    } catch (err: any) {
      console.error(`  ✗ ${sub.title}: ${err.message}`)
    }
  }

  // ------ 5. CASE STUDIES (Projects) ------
  console.log('\n📁 Seeding case studies...')
  const resultsData = loadJSON('projects_results_backup.json')

  for (const project of projectsData) {
    // Get results for this project
    const projectResults = resultsData
      .filter((r: any) => r._parent_id === project.id)
      .sort((a: any, b: any) => a._order - b._order)
      .map((r: any) => ({
        metric: r.label,
        value: r.metric,
      }))

    try {
      await payload.create({
        collection: 'case-studies',
        data: {
          title: project.title,
          slug: project.slug,
          client: project.client,
          industry: industryMap[project.category] || 'other',
          challenge: textToLexical(project.challenge || ''),
          solution: textToLexical(project.solution || ''),
          results: projectResults,
          publishedDate: project.created_at || new Date().toISOString(),
          testimonial: projectTestimonialMap[project.id] || undefined,
        },
      })
      console.log(`  ✓ ${project.title} (${projectResults.length} results)`)
    } catch (err: any) {
      console.error(`  ✗ ${project.title}: ${err.message}`)
    }
  }

  // ------ 6. BLOG POSTS ------
  console.log('\n📝 Seeding blog posts...')
  const postsData = loadJSON('posts_backup.json')

  // Category mapping from old IDs
  const postCategoryMap: Record<string, string> = {
    '1': 'web',
    '2': 'seo',
    '3': 'branding',
    '4': 'marketing',
    '5': 'design',
    '6': 'tech',
  }

  for (const post of postsData) {
    let content = undefined
    if (post.content) {
      content = textToLexical(post.content)
    }

    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content,
          category: postCategoryMap[post.category_id] || 'web',
          publishedDate: post.published_at || new Date().toISOString(),
          _status: 'published',
        },
      })
      console.log(`  ✓ ${post.title}`)
    } catch (err: any) {
      console.error(`  ✗ ${post.title}: ${err.message}`)
    }
  }

  // ------ 7. HOMEPAGE (as a Page with blocks) ------
  console.log('\n🏠 Seeding homepage data...')
  const homeData = loadJSON('home_page_backup.json')[0]
  const statsData = loadJSON('home_page_stats_items_backup.json')
  const processData = loadJSON('home_page_process_steps_backup.json')
  const uspData = loadJSON('home_page_usp_items_backup.json')

  if (homeData) {
    try {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Homepage',
          slug: 'home',
          layout: [
            // Hero block
            {
              blockType: 'hero',
              headline: `${homeData.hero_headline_line1} ${homeData.hero_headline_highlight} ${homeData.hero_headline_line2}`,
              subline: homeData.hero_subheadline,
              ctaLabel: homeData.hero_cta_primary,
              ctaLink: '/de/kontakt',
              alignment: 'center',
            },
            // Stats block
            {
              blockType: 'stats',
              headline: '',
              stats: statsData.map((s: any) => ({
                value: String(s.value),
                suffix: s.suffix,
                label: s.label,
              })),
            },
            // Feature Grid (USPs)
            {
              blockType: 'feature-grid',
              headline: homeData.usp_title,
              columns: '2',
              features: uspData.map((u: any) => ({
                icon: '',
                title: u.title,
                description: u.description,
              })),
            },
            // FAQ block
            {
              blockType: 'faq',
              headline: homeData.faq_title,
              items: [], // FAQ items were empty in backup
            },
            // CTA block
            {
              blockType: 'cta',
              headline: homeData.cta_title,
              description: homeData.cta_subtitle,
              buttonLabel: homeData.cta_primary_button,
              buttonLink: '/de/kontakt',
              variant: 'primary',
            },
          ],
        },
      })
      console.log(`  ✓ Homepage with ${statsData.length} stats, ${uspData.length} USPs`)
    } catch (err: any) {
      console.error(`  ✗ Homepage: ${err.message}`)
    }
  }

  console.log('\n✅ Seed complete!')
  console.log(`
Summary:
  Team members:  ${teamData.length}
  Testimonials:  ${testimonialsData.length + Object.keys(projectTestimonialMap).length}
  Services:      ${servicesData.length} parent + ${subServicesData.length} sub
  Case Studies:  ${projectsData.length}
  Blog Posts:    ${postsData.length}
  Homepage:      1 page with blocks
  `)

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
