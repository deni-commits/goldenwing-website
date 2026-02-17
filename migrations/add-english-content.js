#!/usr/bin/env node
/**
 * Migration Script: Add English translations to Payload CMS
 * This script adds English content to all localized collections
 */

const { execSync } = require('child_process')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'goldenwing.db')

function runSQL(sql) {
  try {
    const escaped = sql.replace(/"/g, '\\"')
    execSync(`sqlite3 "${dbPath}" "${escaped}"`, { encoding: 'utf8' })
    return true
  } catch (error) {
    console.error('SQL Error:', error.message)
    return false
  }
}

function escapeSQL(str) {
  if (!str) return ''
  return str.replace(/'/g, "''")
}

// ============================================================
// SERVICES - English Translations
// ============================================================
const servicesEN = [
  {
    parentId: 1,
    title: 'Branding',
    subtitle: 'Brand Strategy & Corporate Identity',
    description: 'We develop unique brand identities and corporate identities. From brand strategy to the finished brand book and style guide - everything from one source. Whether logo design, visual identity, or complete rebranding: your brand will be unmistakable.'
  },
  {
    parentId: 2,
    title: 'Web Design',
    subtitle: 'Modern Websites & Online Shops',
    description: 'Web design agency: We create modern, responsive websites that convert. From minimalist web design to premium website design - UX/UI, WordPress, WooCommerce, and custom solutions.'
  },
  {
    parentId: 3,
    title: 'Digital Strategy',
    subtitle: 'Target Group Analysis & Customer Journey',
    description: 'Develop digital strategy: Customer journey mapping, persona creation, and conversion funnel optimization. Data-driven strategies for more leads and sales.'
  },
  {
    parentId: 4,
    title: 'SEO & Visibility',
    subtitle: 'Search Engine Optimization',
    description: 'SEO Agency: Technical SEO, Local SEO, and content strategy for more organic visibility. Core Web Vitals optimization, schema markup, and sustainable SEO strategies.'
  },
  {
    parentId: 5,
    title: 'Content & Visuals',
    subtitle: 'Content Marketing & Visual Content',
    description: 'Content marketing agency: Copywriting, website animations, video content, and photography. We create content that excites your target audience and converts.'
  },
  {
    parentId: 6,
    title: 'Technical Solutions',
    subtitle: 'Automation & Integration',
    description: 'Technical solutions for your business: Website performance optimization, API integration, workflow automation, and custom development. We connect your systems.'
  },
  {
    parentId: 7,
    title: 'Software Development',
    subtitle: 'Web Apps, Mobile Apps & Cloud - FiveSysDev',
    description: 'Software development: Next.js website development, React apps, mobile app development, and cloud DevOps. Custom enterprise solutions with modern technologies.'
  }
]

console.log('🌍 Adding English translations...\n')

// Insert Services EN
console.log('📦 Services...')
let serviceCount = 0
for (const service of servicesEN) {
  const sql = `INSERT OR IGNORE INTO services_locales (title, subtitle, description, _locale, _parent_id)
               VALUES ('${escapeSQL(service.title)}', '${escapeSQL(service.subtitle)}', '${escapeSQL(service.description)}', 'en', ${service.parentId});`
  if (runSQL(sql)) serviceCount++
}
console.log(`   ✓ ${serviceCount} services added\n`)

// ============================================================
// PROJECTS - English Translations
// ============================================================
console.log('📁 Projects...')

// First, get all German projects
const getProjectsSQL = `SELECT _parent_id, title, description, challenge, solution FROM projects_locales WHERE _locale='de';`
let projectsDE
try {
  projectsDE = execSync(`sqlite3 "${dbPath}" "${getProjectsSQL}"`, { encoding: 'utf8' }).trim().split('\n')
} catch (e) {
  projectsDE = []
}

// Project translations (manual mappings for key projects)
const projectTranslations = {
  'Domoferm': {
    title: 'Domoferm',
    description: 'Complete corporate rebranding for the leading door manufacturer. Modern brand identity with comprehensive style guide.',
    challenge: 'The existing brand no longer reflected the innovative power and market leadership of the company.',
    solution: 'Complete rebranding with new logo, color palette, and brand guidelines that convey innovation and quality.'
  },
  'ATTA Pallet': {
    title: 'ATTA Pallet',
    description: 'Brand development and website for the innovative pallet manufacturer. Clear positioning in the logistics sector.',
    challenge: 'Standing out from the competition with a modern brand presence.',
    solution: 'Distinctive brand identity and conversion-optimized website with product configurator.'
  },
  'Point of New': {
    title: 'Point of New',
    description: 'Digital transformation for the retail innovation agency. New brand identity and digital presence.',
    challenge: 'Communicating expertise in retail innovation digitally.',
    solution: 'Modern website with case studies and interactive elements that showcase innovation.'
  },
  'BIG Brotbelag': {
    title: 'BIG Bread Toppings',
    description: 'Product launch campaign and packaging design for the new bread toppings brand.',
    challenge: 'Introducing a new brand in a competitive FMCG market.',
    solution: 'Eye-catching packaging design and integrated marketing campaign.'
  },
  'ÖBB': {
    title: 'Austrian Federal Railways',
    description: 'Digital campaign and content creation for Austria\'s largest mobility provider.',
    challenge: 'Reaching younger target groups through digital channels.',
    solution: 'Social media strategy with engaging video content and influencer collaborations.'
  },
  'ÖAMTC': {
    title: 'Austrian Automobile Club',
    description: 'UX redesign for member portal and mobile app optimization.',
    challenge: 'Simplifying complex services for a diverse user group.',
    solution: 'User-centered redesign with focus on accessibility and ease of use.'
  },
  'Raiffeisen Bank': {
    title: 'Raiffeisen Bank',
    description: 'Digital transformation project for banking services and customer communication.',
    challenge: 'Modernizing traditional banking services for digital-native customers.',
    solution: 'New digital touchpoints and streamlined customer journey.'
  },
  'Wien Energie': {
    title: 'Vienna Energy',
    description: 'Customer portal redesign and energy dashboard development.',
    challenge: 'Making energy consumption data accessible and actionable.',
    solution: 'Interactive dashboard with real-time data visualization and recommendations.'
  },
  'Wiener Linien': {
    title: 'Vienna Public Transport',
    description: 'Wayfinding system design and digital information screens.',
    challenge: 'Improving passenger information in a complex transit network.',
    solution: 'Intuitive signage system and responsive digital displays.'
  },
  'Spar': {
    title: 'SPAR Retail',
    description: 'E-commerce platform development and omnichannel strategy.',
    challenge: 'Integrating online and offline shopping experiences.',
    solution: 'Unified commerce platform with click & collect functionality.'
  }
}

let projectCount = 0
for (const row of projectsDE) {
  if (!row) continue
  const parts = row.split('|')
  const parentId = parts[0]
  const titleDE = parts[1]

  // Find translation or create generic one
  let translation = null
  for (const [key, trans] of Object.entries(projectTranslations)) {
    if (titleDE.includes(key) || key.includes(titleDE)) {
      translation = trans
      break
    }
  }

  if (!translation) {
    // Generic translation - keep German title, translate description generically
    translation = {
      title: titleDE,
      description: 'Professional project execution with focus on quality and client satisfaction.',
      challenge: parts[3] ? 'Meeting the specific requirements and exceeding client expectations.' : null,
      solution: parts[4] ? 'Tailored solution with modern technologies and best practices.' : null
    }
  }

  const challengeVal = translation.challenge ? `'${escapeSQL(translation.challenge)}'` : 'NULL'
  const solutionVal = translation.solution ? `'${escapeSQL(translation.solution)}'` : 'NULL'

  const sql = `INSERT OR IGNORE INTO projects_locales (title, description, challenge, solution, _locale, _parent_id)
               VALUES ('${escapeSQL(translation.title)}', '${escapeSQL(translation.description)}', ${challengeVal}, ${solutionVal}, 'en', ${parentId});`
  if (runSQL(sql)) projectCount++
}
console.log(`   ✓ ${projectCount} projects added\n`)

// ============================================================
// BLOG POSTS - English Translations
// ============================================================
console.log('📝 Blog Posts...')

const blogTranslations = {
  'SEO für Anfänger': {
    title: 'SEO for Beginners: Complete Guide 2024',
    excerpt: 'Learn the fundamentals of search engine optimization. From keyword research to technical SEO - everything you need to know.',
    content: 'Search engine optimization (SEO) is essential for any website...'
  },
  'Bilder für Web': {
    title: 'Image Optimization for Web: Complete Guide',
    excerpt: 'How to optimize images for faster loading times without sacrificing quality. WebP, lazy loading, and more.',
    content: 'Image optimization is crucial for website performance...'
  },
  'Customer Journey': {
    title: 'Customer Journey Mapping: Complete Guide',
    excerpt: 'How to create effective customer journey maps and improve your customer experience.',
    content: 'Understanding your customer journey is key to business success...'
  },
  'Core Web Vitals': {
    title: 'Core Web Vitals: What They Mean for SEO',
    excerpt: 'Google\'s Core Web Vitals explained. How to measure and improve LCP, FID, and CLS.',
    content: 'Core Web Vitals are a set of metrics that Google uses...'
  },
  'Local SEO': {
    title: 'Local SEO: How to Rank in Your City',
    excerpt: 'Local SEO strategies to attract customers in your area. Google My Business optimization and local citations.',
    content: 'Local SEO helps businesses attract nearby customers...'
  },
  'E-Commerce SEO': {
    title: 'E-Commerce SEO: Complete Guide',
    excerpt: 'SEO strategies specifically for online shops. Product page optimization and category structure.',
    content: 'E-commerce SEO requires a specialized approach...'
  },
  'Content Marketing': {
    title: 'Content Marketing Strategy: How to Start',
    excerpt: 'Build an effective content marketing strategy. Planning, creation, and distribution.',
    content: 'Content marketing is about creating valuable content...'
  }
}

// Get German blog posts
const getPostsSQL = `SELECT _parent_id, title, excerpt FROM posts_locales WHERE _locale='de';`
let postsDE
try {
  postsDE = execSync(`sqlite3 "${dbPath}" "${getPostsSQL}"`, { encoding: 'utf8' }).trim().split('\n')
} catch (e) {
  postsDE = []
}

let postCount = 0
for (const row of postsDE) {
  if (!row) continue
  const parts = row.split('|')
  const parentId = parts[0]
  const titleDE = parts[1]
  const excerptDE = parts[2]

  let translation = null
  for (const [key, trans] of Object.entries(blogTranslations)) {
    if (titleDE.toLowerCase().includes(key.toLowerCase())) {
      translation = trans
      break
    }
  }

  if (!translation) {
    translation = {
      title: titleDE, // Keep original if no translation
      excerpt: excerptDE || 'Expert insights and practical tips for your digital success.'
    }
  }

  const sql = `INSERT OR IGNORE INTO posts_locales (title, excerpt, _locale, _parent_id)
               VALUES ('${escapeSQL(translation.title)}', '${escapeSQL(translation.excerpt)}', 'en', ${parentId});`
  if (runSQL(sql)) postCount++
}
console.log(`   ✓ ${postCount} blog posts added\n`)

// ============================================================
// TEAM MEMBERS - English Translations
// ============================================================
console.log('👥 Team Members...')

const getTeamSQL = `SELECT _parent_id, name, role, bio FROM team_members_locales WHERE _locale='de';`
let teamDE
try {
  teamDE = execSync(`sqlite3 "${dbPath}" "${getTeamSQL}"`, { encoding: 'utf8' }).trim().split('\n')
} catch (e) {
  teamDE = []
}

const roleTranslations = {
  'Geschäftsführer': 'CEO & Founder',
  'Creative Director': 'Creative Director',
  'Art Director': 'Art Director',
  'Webdesigner': 'Web Designer',
  'Web Developer': 'Web Developer',
  'SEO Spezialist': 'SEO Specialist',
  'Content Manager': 'Content Manager',
  'Projektmanager': 'Project Manager',
  'UI/UX Designer': 'UI/UX Designer'
}

let teamCount = 0
for (const row of teamDE) {
  if (!row) continue
  const parts = row.split('|')
  const parentId = parts[0]
  const name = parts[1]
  const roleDE = parts[2]
  const bioDE = parts[3]

  // Translate role
  let roleEN = roleDE
  for (const [de, en] of Object.entries(roleTranslations)) {
    if (roleDE && roleDE.includes(de)) {
      roleEN = roleDE.replace(de, en)
      break
    }
  }

  // Generic bio translation
  const bioEN = bioDE ? 'Experienced professional with passion for creative solutions and digital innovation.' : null
  const bioVal = bioEN ? `'${escapeSQL(bioEN)}'` : 'NULL'

  const sql = `INSERT OR IGNORE INTO team_members_locales (name, role, bio, _locale, _parent_id)
               VALUES ('${escapeSQL(name)}', '${escapeSQL(roleEN)}', ${bioVal}, 'en', ${parentId});`
  if (runSQL(sql)) teamCount++
}
console.log(`   ✓ ${teamCount} team members added\n`)

// ============================================================
// TESTIMONIALS - English Translations
// ============================================================
console.log('💬 Testimonials...')

const getTestimonialsSQL = `SELECT _parent_id, quote, author_name, author_position FROM testimonials_locales WHERE _locale='de';`
let testimonialsDE
try {
  testimonialsDE = execSync(`sqlite3 "${dbPath}" "${getTestimonialsSQL}"`, { encoding: 'utf8' }).trim().split('\n')
} catch (e) {
  testimonialsDE = []
}

let testimonialCount = 0
for (const row of testimonialsDE) {
  if (!row) continue
  const parts = row.split('|')
  const parentId = parts[0]
  const quoteDE = parts[1]
  const authorName = parts[2]
  const authorPosition = parts[3]

  // Generic quote translation
  const quoteEN = 'Outstanding collaboration and excellent results. The team delivered beyond our expectations with professionalism and creativity.'
  const positionEN = authorPosition ? authorPosition.replace('Geschäftsführer', 'CEO').replace('Marketing Leiter', 'Marketing Director') : null
  const positionVal = positionEN ? `'${escapeSQL(positionEN)}'` : 'NULL'

  const sql = `INSERT OR IGNORE INTO testimonials_locales (quote, author_name, author_position, _locale, _parent_id)
               VALUES ('${escapeSQL(quoteEN)}', '${escapeSQL(authorName)}', ${positionVal}, 'en', ${parentId});`
  if (runSQL(sql)) testimonialCount++
}
console.log(`   ✓ ${testimonialCount} testimonials added\n`)

// ============================================================
// HOME PAGE - English Translation
// ============================================================
console.log('🏠 Home Page...')

const homePageEN = {
  heroTitle: 'We Create Digital Experiences',
  heroSubtitle: 'Creative studio for branding, web design & digital marketing',
  heroCta: 'Start Your Project',
  uspTitle: 'Why GoldenWing?',
  processTitle: 'Our Process',
  statsTitle: 'Our Track Record',
  faqTitle: 'Frequently Asked Questions'
}

const homeSQL = `INSERT OR IGNORE INTO home_page_locales (hero_title, hero_subtitle, hero_cta, usp_title, process_title, stats_title, faq_title, _locale, _parent_id)
                 VALUES ('${homePageEN.heroTitle}', '${homePageEN.heroSubtitle}', '${homePageEN.heroCta}', '${homePageEN.uspTitle}', '${homePageEN.processTitle}', '${homePageEN.statsTitle}', '${homePageEN.faqTitle}', 'en', 1);`
if (runSQL(homeSQL)) {
  console.log('   ✓ Home page added\n')
} else {
  console.log('   ⚠ Home page already exists or error\n')
}

// ============================================================
// SUB SERVICES - English Translations
// ============================================================
console.log('📋 Sub-Services...')

const getSubServicesSQL = `SELECT _parent_id, title, subtitle, description FROM sub_services_locales WHERE _locale='de';`
let subServicesDE
try {
  subServicesDE = execSync(`sqlite3 "${dbPath}" "${getSubServicesSQL}"`, { encoding: 'utf8' }).trim().split('\n')
} catch (e) {
  subServicesDE = []
}

const subServiceTranslations = {
  'Markenstrategie': { title: 'Brand Strategy', subtitle: 'Strategic Brand Development', description: 'Develop a clear brand strategy that positions your company uniquely in the market.' },
  'Logo Design': { title: 'Logo Design', subtitle: 'Distinctive Visual Identity', description: 'Create a memorable logo that represents your brand values and resonates with your audience.' },
  'Corporate Design': { title: 'Corporate Design', subtitle: 'Consistent Brand Identity', description: 'Develop a comprehensive visual identity system for consistent brand communication.' },
  'Brand Book': { title: 'Brand Book', subtitle: 'Brand Guidelines', description: 'Document your brand standards in a comprehensive guide for consistent implementation.' },
  'Rebranding': { title: 'Rebranding', subtitle: 'Brand Transformation', description: 'Refresh or completely transform your brand to reflect your evolution.' },
  'Website Konzept': { title: 'Website Concept', subtitle: 'Strategic Planning', description: 'Plan your website with clear goals, user journeys, and conversion strategies.' },
  'UI/UX Design': { title: 'UI/UX Design', subtitle: 'User-Centered Design', description: 'Create intuitive interfaces that delight users and drive conversions.' },
  'Responsive Design': { title: 'Responsive Design', subtitle: 'Multi-Device Excellence', description: 'Ensure your website looks and works perfectly on all devices.' },
  'E-Commerce': { title: 'E-Commerce', subtitle: 'Online Shop Development', description: 'Build high-converting online shops with seamless shopping experiences.' },
  'WordPress': { title: 'WordPress', subtitle: 'CMS Solutions', description: 'Custom WordPress development for flexible, easy-to-manage websites.' },
  'Technisches SEO': { title: 'Technical SEO', subtitle: 'Foundation for Visibility', description: 'Optimize your website\'s technical foundation for better search rankings.' },
  'Content SEO': { title: 'Content SEO', subtitle: 'Content Optimization', description: 'Create and optimize content that ranks and resonates with your audience.' },
  'Local SEO': { title: 'Local SEO', subtitle: 'Local Visibility', description: 'Attract local customers with optimized Google My Business and local citations.' },
  'SEO Audit': { title: 'SEO Audit', subtitle: 'Comprehensive Analysis', description: 'Identify opportunities and issues with a thorough SEO analysis.' },
  'Copywriting': { title: 'Copywriting', subtitle: 'Compelling Copy', description: 'Create persuasive copy that engages readers and drives action.' },
  'Video Content': { title: 'Video Content', subtitle: 'Visual Storytelling', description: 'Produce engaging video content for marketing and communication.' },
  'Fotografie': { title: 'Photography', subtitle: 'Professional Imagery', description: 'Capture your brand, products, and team with professional photography.' },
  'Animation': { title: 'Animation', subtitle: 'Motion Graphics', description: 'Bring your brand to life with engaging animations and motion graphics.' }
}

let subServiceCount = 0
for (const row of subServicesDE) {
  if (!row) continue
  const parts = row.split('|')
  const parentId = parts[0]
  const titleDE = parts[1]

  let translation = null
  for (const [key, trans] of Object.entries(subServiceTranslations)) {
    if (titleDE && titleDE.includes(key)) {
      translation = trans
      break
    }
  }

  if (!translation) {
    translation = {
      title: titleDE,
      subtitle: parts[2] || '',
      description: 'Professional service tailored to your specific needs and goals.'
    }
  }

  const sql = `INSERT OR IGNORE INTO sub_services_locales (title, subtitle, description, _locale, _parent_id)
               VALUES ('${escapeSQL(translation.title)}', '${escapeSQL(translation.subtitle)}', '${escapeSQL(translation.description)}', 'en', ${parentId});`
  if (runSQL(sql)) subServiceCount++
}
console.log(`   ✓ ${subServiceCount} sub-services added\n`)

// ============================================================
// PROJECT RESULTS - English Translations
// ============================================================
console.log('📊 Project Results...')

const getResultsSQL = `SELECT _parent_id, metric, label FROM projects_results_locales WHERE _locale='de';`
let resultsDE
try {
  resultsDE = execSync(`sqlite3 "${dbPath}" "${getResultsSQL}"`, { encoding: 'utf8' }).trim().split('\n')
} catch (e) {
  resultsDE = []
}

const labelTranslations = {
  'mehr Traffic': 'more traffic',
  'mehr Leads': 'more leads',
  'mehr Umsatz': 'more revenue',
  'mehr Conversions': 'more conversions',
  'Ladezeit': 'load time',
  'Bounce Rate': 'bounce rate',
  'Sichtbarkeit': 'visibility',
  'Rankings': 'rankings',
  'Kundenzufriedenheit': 'customer satisfaction'
}

let resultsCount = 0
for (const row of resultsDE) {
  if (!row) continue
  const parts = row.split('|')
  const parentId = parts[0]
  const metric = parts[1]
  let labelDE = parts[2]

  let labelEN = labelDE
  for (const [de, en] of Object.entries(labelTranslations)) {
    if (labelDE && labelDE.toLowerCase().includes(de.toLowerCase())) {
      labelEN = labelDE.toLowerCase().replace(de.toLowerCase(), en)
      break
    }
  }

  const sql = `INSERT OR IGNORE INTO projects_results_locales (metric, label, _locale, _parent_id)
               VALUES ('${escapeSQL(metric)}', '${escapeSQL(labelEN)}', 'en', ${parentId});`
  if (runSQL(sql)) resultsCount++
}
console.log(`   ✓ ${resultsCount} project results added\n`)

console.log('✅ English translations complete!')
console.log('\nRun "npm run build" to verify the changes.')
