import { getPayload, Where } from 'payload'
import config from '@payload-config'

// Supported locales
export type SupportedLocale = 'de' | 'en' | 'ru'
const DEFAULT_LOCALE: SupportedLocale = 'de'

/**
 * Service slug translations (EN → DE) - NEW 2025 STRUCTURE
 * Used to translate EN URL slugs back to DE database slugs
 */
const serviceSlugEnToDe: Record<string, string> = {
  'branding': 'branding',
  'web-design': 'webdesign',
  'digital-marketing': 'digital-marketing',
  'seo-content': 'seo-content',
  'web-app-development': 'web-app-entwicklung',
  'it-cloud-services': 'it-cloud-services',
}

/**
 * Blog category slug translations (EN → DE)
 */
const blogCategorySlugEnToDe: Record<string, string> = {
  'design': 'design',
  'technology': 'technologie',
  'marketing': 'marketing',
  'strategy': 'strategie',
  'business': 'business',
  'seo': 'seo',
  'web-design': 'webdesign',
  'branding': 'branding',
  'ui-ux': 'ui-ux',
}

/**
 * Sub-service slug translations (EN → DE) - NEW 2025 STRUCTURE
 * Matches database exactly
 */
const subServiceSlugEnToDe: Record<string, string> = {
  // Branding (4)
  'brand-strategy-positioning': 'markenstrategie-positionierung',
  'visual-identity': 'visuelle-identitaet',
  'brand-guidelines-templates': 'markenrichtlinien-vorlagen',
  'rebranding': 'rebranding',
  // Webdesign (5)
  'information-architecture': 'informationsarchitektur',
  'ux-concepts-prototypes': 'ux-konzepte-prototypen',
  'ui-design-systems': 'ui-design-designsysteme',
  'web-development-cms': 'webentwicklung-cms',
  'accessibility-performance': 'barrierefreiheit-performance',
  // Digital Marketing (4)
  'campaign-strategy-funnel': 'kampagnenstrategie-funnel',
  'paid-media-campaigns': 'paid-media-content-kampagnen',
  'email-marketing-automation': 'email-marketing-automatisierung',
  'tracking-optimization': 'tracking-optimierung',
  // SEO & Content (5)
  'content-strategy-planning': 'content-strategie-themenplanung',
  'content-structuring': 'content-strukturierung',
  'editorial-plans-content-systems': 'redaktionsplaene-content-systeme',
  'content-production': 'content-produktion',
  'seo-measurement-impact': 'seo-messung-wirkung',
  // Web- & App-Entwicklung (4)
  'technical-architecture': 'technische-architektur',
  'development': 'entwicklung',
  'apis-integrations': 'schnittstellen-integrationen',
  'quality-assurance-testing': 'qualitaetssicherung-testing',
  // IT & Cloud Services (5)
  'cloud-architecture-migration': 'cloud-architektur-migration',
  'monitoring-maintenance': 'monitoring-wartung',
  'security-backups': 'sicherheit-backups',
  'technical-operations-support': 'technischer-betrieb-support',
  'workflow-automation': 'workflow-automation',
}


/**
 * Translate EN service slug to DE for database lookup
 */
function translateServiceSlug(slug: string): string {
  return serviceSlugEnToDe[slug] || slug
}

/**
 * Translate EN blog category slug to DE for database lookup
 */
function translateBlogCategorySlug(slug: string): string {
  return blogCategorySlugEnToDe[slug] || slug
}

/**
 * Translate EN sub-service slug to DE for database lookup
 */
function translateSubServiceSlug(slug: string): string {
  return subServiceSlugEnToDe[slug] || slug
}

export const getPayloadClient = async () => {
  return await getPayload({ config })
}

// ===========================================
// GLOBALS
// ===========================================

export async function getHomePage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const homePage = await payload.findGlobal({
      slug: 'homePage',
      locale,
    })
    return homePage
  } catch {
    // Global does not exist - return null to use defaults
    return null
  }
}

export async function getContactPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const contactPage = await payload.findGlobal({
      slug: 'contactPage',
      locale,
    })
    return contactPage
  } catch {
    // Global does not exist - return null to use defaults
    return null
  }
}

export async function getAboutPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const aboutPage = await payload.findGlobal({
      slug: 'aboutPage',
      locale,
    })
    return aboutPage
  } catch {
    return null
  }
}

export async function getCulturePage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const culturePage = await payload.findGlobal({
      slug: 'culturePage',
      locale,
    })
    return culturePage
  } catch {
    // Table may not exist yet - return null to use defaults
    return null
  }
}

export async function getValuesPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const valuesPage = await payload.findGlobal({
      slug: 'valuesPage',
      locale,
    })
    return valuesPage
  } catch {
    return null
  }
}

export async function getFactsFiguresPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const factsFiguresPage = await payload.findGlobal({
      slug: 'factsFiguresPage',
      locale,
    })
    return factsFiguresPage
  } catch {
    return null
  }
}

export async function getLocationsOverviewPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const locationsOverviewPage = await payload.findGlobal({
      slug: 'locationsOverviewPage',
      locale,
    })
    return locationsOverviewPage
  } catch {
    return null
  }
}

export async function getImpressumPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const impressumPage = await payload.findGlobal({
      slug: 'impressumPage',
      locale,
    })
    return impressumPage
  } catch {
    return null
  }
}

export async function getDatenschutzPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const datenschutzPage = await payload.findGlobal({
      slug: 'datenschutzPage',
      locale,
    })
    return datenschutzPage
  } catch {
    return null
  }
}

export async function getFAQPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const faqPage = await payload.findGlobal({
      slug: 'faqPage',
      locale,
    })
    return faqPage
  } catch {
    return null
  }
}

export async function getCookieSettingsPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const cookieSettingsPage = await payload.findGlobal({
      slug: 'cookieSettingsPage',
      locale,
    })
    return cookieSettingsPage
  } catch {
    return null
  }
}

export async function getLocationBySlug(
   
  _slug: string,
   
  _locale?: SupportedLocale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  // LocationDetails collection removed - pages use defaults
  return null
}

export async function getServicesOverviewPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const servicesOverviewPage = await payload.findGlobal({
      slug: 'servicesOverviewPage',
      locale,
    })
    return servicesOverviewPage
  } catch {
    return null
  }
}

export async function getPackagesOverviewPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const packagesOverviewPage = await payload.findGlobal({
      slug: 'packagesOverviewPage',
      locale,
    })
    return packagesOverviewPage
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPackages(_locale?: SupportedLocale): Promise<any[]> {
  // Packages collection removed - pages use defaults
  return []
}

export async function getPackageBySlug(
   
  _slug: string,
   
  _locale?: SupportedLocale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  // Packages collection removed - pages use defaults
  return null
}

export async function getReferenzenOverviewPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const referenzenOverviewPage = await payload.findGlobal({
      slug: 'referenzenOverviewPage',
      locale,
    })
    return referenzenOverviewPage
  } catch {
    return null
  }
}

export async function getReferenzCategoryBySlug(
   
  _slug: string,
   
  _locale?: SupportedLocale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  // ReferenzCategories collection removed - pages use defaults
  return null
}

// ===========================================
// POSTS
// ===========================================

export async function getPosts(
  locale: SupportedLocale = DEFAULT_LOCALE,
  includeScheduled = false
) {
  const payload = await getPayloadClient()

  // Build where clause based on whether to include scheduled posts
  const whereClause: Where = includeScheduled
    ? {
        or: [
          { status: { equals: 'published' } },
          { status: { equals: 'scheduled' } },
        ],
      }
    : { status: { equals: 'published' } }

  const posts = await payload.find({
    collection: 'posts',
    where: whereClause,
    sort: '-publishedAt',
    depth: 2,
    locale,
    limit: 100, // Get all posts for backward compatibility
  })
  return posts.docs
}

export async function getPostsByCategory(
  categorySlug: string,
  locale: SupportedLocale = DEFAULT_LOCALE,
  limit = 3
) {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { 'category.slug': { equals: categorySlug } },
      ],
    },
    sort: '-publishedAt',
    depth: 1,
    locale,
    limit,
  })
  return posts.docs
}

export async function getPostsPaginated(
  locale: SupportedLocale = DEFAULT_LOCALE,
  page = 1,
  limit = 12
) {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 2,
    locale,
    page,
    limit,
  })

  return {
    docs: posts.docs,
    totalDocs: posts.totalDocs,
    totalPages: posts.totalPages,
    page: posts.page || 1,
    hasNextPage: posts.hasNextPage,
    hasPrevPage: posts.hasPrevPage,
  }
}

export async function getPostBySlug(
  slug: string,
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 2,
    locale,
  })
  return posts.docs[0] || null
}

/**
 * Get the slug of a post in a specific locale by post ID
 * Used for generating correct hreflang alternates
 */
export async function getPostSlugByIdAndLocale(
  postId: number | string,
  locale: SupportedLocale
): Promise<string | null> {
  const payload = await getPayloadClient()
  const post = await payload.findByID({
    collection: 'posts',
    id: postId,
    locale,
  })
  return post?.slug || null
}

/**
 * Get related posts - first from same category, then from other categories
 */
export async function getRelatedPosts(
  currentSlug: string,
  categorySlug: string | undefined,
  locale: SupportedLocale = DEFAULT_LOCALE,
  limit = 3
) {
  const payload = await getPayloadClient()

  // First, try to get posts from the same category
  const sameCategoryPosts = categorySlug
    ? await payload.find({
        collection: 'posts',
        where: {
          and: [
            { status: { equals: 'published' } },
            { slug: { not_equals: currentSlug } },
            { 'category.slug': { equals: categorySlug } },
          ],
        },
        sort: '-publishedAt',
        depth: 1,
        locale,
        limit,
      })
    : { docs: [] }

  // If we have enough, return them
  if (sameCategoryPosts.docs.length >= limit) {
    return sameCategoryPosts.docs.slice(0, limit)
  }

  // Otherwise, get more from other categories
  const remaining = limit - sameCategoryPosts.docs.length
  const existingSlugs = [currentSlug, ...sameCategoryPosts.docs.map((p) => p.slug)]

  const otherPosts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { slug: { not_in: existingSlugs } },
      ],
    },
    sort: '-publishedAt',
    depth: 1,
    locale,
    limit: remaining,
  })

  return [...sameCategoryPosts.docs, ...otherPosts.docs]
}

export async function getFeaturedPost(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: { featured: { equals: true } },
    sort: '-publishedAt',
    limit: 1,
    depth: 2,
    locale,
  })
  return posts.docs[0] || null
}

// ===========================================
// PROJECTS
// ===========================================

export async function getProjects(locale: SupportedLocale = DEFAULT_LOCALE) {
  const payload = await getPayloadClient()
  const projects = await payload.find({
    collection: 'projects',
    sort: 'order',
    depth: 2,
    locale,
    limit: 0, // Get all projects (Payload defaults to 10)
  })
  return projects.docs
}

export async function getProjectBySlug(
  slug: string,
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const projects = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    locale,
  })
  return projects.docs[0] || null
}

export async function getFeaturedProjects(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const projects = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'order',
    limit: 6,
    depth: 2,
    locale,
  })
  return projects.docs
}

export async function getRelatedProjects(
  category: string,
  currentSlug: string,
  locale: SupportedLocale = DEFAULT_LOCALE,
  limit: number = 3
) {
  const payload = await getPayloadClient()
  const projects = await payload.find({
    collection: 'projects',
    where: {
      and: [
        { category: { equals: category } },
        { slug: { not_equals: currentSlug } },
      ],
    },
    sort: '-publishedAt',
    limit,
    depth: 1,
    locale,
  })
  return projects.docs
}

// ===========================================
// SERVICES
// ===========================================

export async function getServices(locale: SupportedLocale = DEFAULT_LOCALE) {
  const payload = await getPayloadClient()
  const services = await payload.find({
    collection: 'services',
    sort: 'order',
    depth: 1,
    locale,
  })
  return services.docs
}

export async function getServiceBySlug(
  slug: string,
   
  _locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  // Translate EN slug to DE for database lookup
  const dbSlug = translateServiceSlug(slug)
  // Always query with default locale (de) to ensure content is found
  // English translations are handled in the page component
  const services = await payload.find({
    collection: 'services',
    where: { slug: { equals: dbSlug } },
    depth: 1,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
  })

  const service = services.docs[0] || null

  if (service) {
    // Get sub-services for this service
    // Always query with default locale (de) for consistent content
    const subServices = await payload.find({
      collection: 'sub-services',
      where: { parentService: { equals: service.id } },
      sort: 'order',
      depth: 1,
      locale: DEFAULT_LOCALE,
      fallbackLocale: DEFAULT_LOCALE,
    })
    return { ...service, subServices: subServices.docs }
  }

  return null
}

// ===========================================
// SUB-SERVICES
// ===========================================

export async function getSubServiceBySlug(
  category: string,
  slug: string,
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()

  // Translate EN slugs to DE for database lookup
  const dbCategory = translateServiceSlug(category)
  const dbSlug = translateSubServiceSlug(slug)

  // First get the parent service with correct locale
  const services = await payload.find({
    collection: 'services',
    where: { slug: { equals: dbCategory } },
    locale,
    fallbackLocale: DEFAULT_LOCALE,
  })

  const parentService = services.docs[0]
  if (!parentService) return null

  // Get the sub-service with correct locale for SEO metadata
  const subServices = await payload.find({
    collection: 'sub-services',
    where: {
      and: [
        { slug: { equals: dbSlug } },
        { parentService: { equals: parentService.id } },
      ],
    },
    depth: 2,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
  })

  const subService = subServices.docs[0]
  if (!subService) return null

  // Ensure parentService is included as object with title and slug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = subService as any
  result.parentService = {
    id: parentService.id,
    title: parentService.title,
    slug: parentService.slug,
  }
  return result
}

export async function getSiblingSubServices(
  parentServiceId: string,
  currentSubServiceSlug: string,
  locale: SupportedLocale = DEFAULT_LOCALE,
  limit: number = 4
) {
  const payload = await getPayloadClient()

  // Get other sub-services from the same parent, excluding the current one
  const subServices = await payload.find({
    collection: 'sub-services',
    where: {
      and: [
        { parentService: { equals: parentServiceId } },
        { slug: { not_equals: currentSubServiceSlug } },
      ],
    },
    sort: 'order',
    depth: 1,
    limit,
    locale,
  })

  return subServices.docs
}

// ===========================================
// CATEGORIES
// ===========================================

export async function getCategories(locale: SupportedLocale = DEFAULT_LOCALE) {
  const payload = await getPayloadClient()
  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
    locale,
  })
  return categories.docs
}

export async function getCategoryBySlug(
  slug: string,
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  // Translate EN slug to DE for database lookup
  const dbSlug = translateBlogCategorySlug(slug)
  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: dbSlug } },
    depth: 0,
    locale,
  })

  const category = categories.docs[0] || null

  if (category) {
    // Get posts in this category
    const posts = await payload.find({
      collection: 'posts',
      where: { category: { equals: category.id } },
      sort: '-publishedAt',
      depth: 2,
      locale,
    })
    return { ...category, posts: posts.docs }
  }

  return null
}

// ===========================================
// TEAM MEMBERS
// ===========================================

export async function getTeamMembers(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const members = await payload.find({
    collection: 'team-members',
    sort: 'order',
    depth: 1,
    locale,
  })
  return members.docs
}

export async function getFeaturedTeamMembers(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const members = await payload.find({
    collection: 'team-members',
    where: { featured: { equals: true } },
    sort: 'order',
    limit: 6,
    depth: 1,
    locale,
  })
  return members.docs
}

export async function getTeamMemberBySlug(
  slug: string,
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const members = await payload.find({
    collection: 'team-members',
    where: { slug: { equals: slug } },
    depth: 1,
    locale,
  })
  return members.docs[0] || null
}

export async function getOtherTeamMembers(
  currentSlug: string,
  locale: SupportedLocale = DEFAULT_LOCALE,
  limit: number = 3
) {
  const payload = await getPayloadClient()
  const members = await payload.find({
    collection: 'team-members',
    where: { slug: { not_equals: currentSlug } },
    sort: 'order',
    limit,
    depth: 1,
    locale,
  })
  return members.docs
}

// ===========================================
// PARTNERS
// ===========================================

export async function getPartners(locale: SupportedLocale = DEFAULT_LOCALE) {
  const payload = await getPayloadClient()
  const partners = await payload.find({
    collection: 'partners',
    sort: 'order',
    depth: 1,
    locale,
  })
  return partners.docs
}

export async function getFeaturedPartners(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const partners = await payload.find({
    collection: 'partners',
    where: { featured: { equals: true } },
    sort: 'order',
    limit: 8,
    depth: 1,
    locale,
  })
  return partners.docs
}

// ===========================================
// TESTIMONIALS
// ===========================================

export async function getTestimonials(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const testimonials = await payload.find({
    collection: 'testimonials',
    depth: 1,
    locale,
  })
  return testimonials.docs
}

export async function getFeaturedTestimonials(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const testimonials = await payload.find({
    collection: 'testimonials',
    where: { featured: { equals: true } },
    limit: 3,
    depth: 1,
    locale,
  })
  return testimonials.docs
}

// ===========================================
// RESOURCES
// ===========================================

export async function getResources(locale: SupportedLocale = DEFAULT_LOCALE) {
  const payload = await getPayloadClient()
  const resources = await payload.find({
    collection: 'resources',
    sort: '-publishedAt',
    depth: 1,
    locale,
  })
  return resources.docs
}

export async function getFeaturedResources(
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const resources = await payload.find({
    collection: 'resources',
    where: { featured: { equals: true } },
    sort: '-publishedAt',
    limit: 6,
    depth: 1,
    locale,
  })
  return resources.docs
}

export async function getResourcesByCategory(
  category: string,
  locale: SupportedLocale = DEFAULT_LOCALE
) {
  const payload = await getPayloadClient()
  const resources = await payload.find({
    collection: 'resources',
    where: { category: { equals: category } },
    sort: '-publishedAt',
    depth: 1,
    locale,
  })
  return resources.docs
}

// ===========================================
// LANDING PAGES
// ===========================================

export async function getKreativagenturWienPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'kreativagenturWienPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}

export async function getSeoAgenturWienPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'seoAgenturWienPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}

export async function getWebdesignWienPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'webdesignWienPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}

// ===========================================
// RESSOURCEN PAGES
// ===========================================

export async function getRessourcenOverviewPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'ressourcenOverviewPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}

export async function getDownloadsPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'downloadsPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}

export async function getNewsletterPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'newsletterPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}

// ===========================================
// LISTING PAGES
// ===========================================

export async function getBlogListingPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'blogListingPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}

export async function getProjekteListingPage(locale: SupportedLocale = DEFAULT_LOCALE) {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({
      slug: 'projekteListingPage',
      locale,
    })
    return page
  } catch {
    return null
  }
}
