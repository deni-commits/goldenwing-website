import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// ============================================================
// IMPORT FROM CENTRAL SLUG MAPPINGS - SINGLE SOURCE OF TRUTH
// ============================================================
import {
  SERVICE_SLUGS,
  SUB_SERVICE_SLUGS,
  REFERENCE_SLUGS,
  BLOG_CATEGORY_SLUGS,
  BLOG_POST_SLUGS,

} from '@/config/slug-mappings'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Content locale type for static content (de/en only, ru falls back to en)
 */
export type ContentLocale = 'de' | 'en'

/**
 * Get content locale with fallback (ru → en)
 * Use this when accessing static content objects that only have de/en keys
 */
export function getContentLocale(locale: string): ContentLocale {
  if (locale === 'de') return 'de'
  return 'en' // en and ru both use English content
}

// ============================================================
// SLUG TRANSLATIONS (from central config)
// ============================================================

/**
 * Sub-service slug translations (DE → EN)
 * Imported from @/config/slug-mappings.ts
 */
const subServiceSlugTranslations: Record<string, string> = SUB_SERVICE_SLUGS.de

/**
 * Blog category slug translations (DE → EN)
 * Imported from @/config/slug-mappings.ts
 */
const blogCategorySlugTranslations: Record<string, string> = BLOG_CATEGORY_SLUGS.de

/**
 * Reference category slug translations (DE → EN)
 * Imported from @/config/slug-mappings.ts
 */
const referenceCategorySlugTranslations: Record<string, string> = REFERENCE_SLUGS.de

/**
 * Service slug translations (DE → EN)
 * Imported from @/config/slug-mappings.ts
 */
const serviceSlugTranslations: Record<string, string> = SERVICE_SLUGS.de

/**
 * Blog post slug translations (DE → EN)
 * Imported from @/config/slug-mappings.ts
 */
const blogPostSlugTranslations: Record<string, string> = BLOG_POST_SLUGS.de

/**
 * Reverse slug translations (EN → DE)
 */
const subServiceSlugTranslationsReverse: Record<string, string> = Object.fromEntries(
  Object.entries(subServiceSlugTranslations).map(([de, en]) => [en, de])
)

const blogCategorySlugTranslationsReverse: Record<string, string> = Object.fromEntries(
  Object.entries(blogCategorySlugTranslations).map(([de, en]) => [en, de])
)

const blogPostSlugTranslationsReverse: Record<string, string> = Object.fromEntries(
  Object.entries(blogPostSlugTranslations).map(([de, en]) => [en, de])
)

/**
 * Path translations from German to English
 * Used for canonicals, hreflang, and sitemap
 */
const pathTranslations: Record<string, string> = {
  // Main sections
  '/leistungen': '/services',
  '/referenzen': '/references',
  '/projekte': '/projects',
  '/ueber-uns': '/about-us',
  '/kontakt': '/contact',
  '/standorte': '/locations',
  '/ressourcen': '/resources',
  '/haeufige-fragen': '/faq',
  '/impressum': '/imprint',
  '/datenschutz': '/privacy-policy',
  '/rechtliches': '/legal',
  '/lexikon': '/glossary',
  // Sub-paths - Ueber-uns
  '/ueber-uns/team': '/about-us/team',
  '/ueber-uns/kultur': '/about-us/culture',
  '/ueber-uns/werte': '/about-us/values',
  '/ueber-uns/partner': '/about-us/partners',
  '/ueber-uns/facts-figures': '/about-us/facts-figures',
  '/ueber-uns/standorte': '/about-us/locations',
  // Sub-paths - Blog
  '/blog/kategorie': '/blog/category',
  // Sub-paths - Locations
  '/standorte/wien': '/locations/vienna',
  '/standorte/dubai': '/locations/dubai',
  '/standorte/roseville': '/locations/roseville',
  // Sub-paths - Resources
  '/ressourcen/downloads': '/resources/downloads',
  '/ressourcen/newsletter': '/resources/newsletter',
  // Sub-paths - Legal
  '/rechtliches/cookie-einstellungen': '/legal/cookie-settings',
  // Landing pages - Austria
  '/kreativagentur-wien': '/creative-agency-vienna',
  '/webdesign-wien': '/web-design-vienna',
  '/seo-agentur-wien': '/seo-agency-vienna',
  '/branding-agentur-wien': '/branding-agency-vienna',
  '/webdesign-oesterreich': '/web-design-austria',
  // Landing pages - Germany
  '/webdesign-deutschland': '/web-design-germany',
  '/webdesign-muenchen': '/web-design-munich',
  '/webdesign-hamburg': '/web-design-hamburg',
  '/webdesign-frankfurt': '/web-design-frankfurt',
  '/seo-agentur-deutschland': '/seo-agency-germany',
  '/branding-agentur-deutschland': '/branding-agency-germany',
  // Landing pages - Switzerland
  '/webdesign-schweiz': '/web-design-switzerland',
  '/webdesign-zuerich': '/web-design-zurich',
  '/seo-agentur-schweiz': '/seo-agency-switzerland',
  // Landing pages - UAE / Dubai
  '/webdesign-vae': '/web-design-uae',
  '/webdesign-dubai': '/web-design-dubai',
  '/seo-agentur-dubai': '/seo-agency-dubai',
  '/kreativagentur-dubai': '/creative-agency-dubai',
  '/ecommerce-agentur-dubai': '/ecommerce-agency-dubai',
  '/wordpress-agentur-dubai': '/wordpress-agency-dubai',
  '/digitales-marketing-dubai': '/digital-marketing-dubai',
  '/webentwicklung-abu-dhabi': '/web-development-abu-dhabi',
  '/app-entwicklung-dubai': '/app-development-dubai',
  '/branding-agentur-dubai': '/branding-agency-dubai',
  // Keyword gap landing pages (2026)
  '/webdesign-preise': '/web-design-pricing',
  '/website-erstellen-lassen': '/have-website-created',
  '/e-mail-marketing-agentur-wien': '/email-marketing-agency-vienna',
  '/barrierefreie-website': '/accessible-website',
  // Service packages
  '/leistungen/pakete': '/services/packages',
  '/leistungen/pakete/brand-web-foundation': '/services/packages/brand-web-foundation',
  '/leistungen/pakete/seo-content-growth': '/services/packages/seo-content-growth',
  '/leistungen/pakete/demand-gen-suite': '/services/packages/demand-gen-suite',
  '/leistungen/pakete/individuelles-paket': '/services/packages/custom-package',
  // Service slugs - individual services (6 main services)
  '/leistungen/branding': '/services/branding',
  '/leistungen/webdesign': '/services/web-design',
  '/leistungen/digital-marketing': '/services/digital-marketing',
  '/leistungen/seo-content': '/services/seo-content',
  '/leistungen/web-app-entwicklung': '/services/web-app-development',
  '/leistungen/it-cloud-services': '/services/it-cloud-services',
  // Reference category slugs
  '/referenzen/entwicklung': '/references/development',
  '/referenzen/industrie': '/references/industry',
  '/referenzen/technologie': '/references/technology',
  '/referenzen/dienstleistung': '/references/consulting',
  '/referenzen/webdesign': '/references/web-design',
  '/referenzen/branding': '/references/branding',
  '/referenzen/seo': '/references/seo',
  '/referenzen/marketing': '/references/marketing',
  '/referenzen/e-commerce': '/references/e-commerce',
  '/referenzen/it-cloud': '/references/it-cloud',
}

/**
 * Translate a German path to its English equivalent
 * Handles both path segments AND dynamic slugs (sub-services, blog categories)
 */
export function translatePath(dePath: string): string {
  // Sort by length (longest first) to match most specific paths first
  const sortedPaths = Object.keys(pathTranslations).sort((a, b) => b.length - a.length)

  let enPath = dePath
  for (const dePart of sortedPaths) {
    if (enPath.startsWith(dePart)) {
      enPath = pathTranslations[dePart] + enPath.slice(dePart.length)
      break
    }
  }

  // Now translate any remaining slug segments
  // Check if this is a sub-service path: /services/[parent]/[subslug]
  const subServiceMatch = enPath.match(/^(\/services\/[^\/]+)\/([^\/]+)$/)
  if (subServiceMatch) {
    const [, parentPath, subSlug] = subServiceMatch
    const translatedSubSlug = subServiceSlugTranslations[subSlug] || subSlug
    enPath = `${parentPath}/${translatedSubSlug}`
  }

  // Check if this is a blog category path: /blog/category/[slug]
  const blogCategoryMatch = enPath.match(/^(\/blog\/category)\/([^\/]+)$/)
  if (blogCategoryMatch) {
    const [, categoryPath, categorySlug] = blogCategoryMatch
    const translatedCategorySlug = blogCategorySlugTranslations[categorySlug] || categorySlug
    enPath = `${categoryPath}/${translatedCategorySlug}`
  }

  // Check if this is a blog post path: /blog/[slug] (not /blog/category/...)
  const blogPostMatch = enPath.match(/^\/blog\/([^\/]+)$/)
  if (blogPostMatch) {
    const [, postSlug] = blogPostMatch
    const translatedPostSlug = blogPostSlugTranslations[postSlug] || postSlug
    enPath = `/blog/${translatedPostSlug}`
  }

  return enPath
}

/**
 * Translate an English path back to German equivalent
 * Used for generating DE hreflang from EN pages and language switching
 */
export function translatePathReverse(enPath: string): string {
  // Build reverse path translations
  const reversePathTranslations: Record<string, string> = Object.fromEntries(
    Object.entries(pathTranslations).map(([de, en]) => [en, de])
  )

  // Sort by length (longest first)
  const sortedPaths = Object.keys(reversePathTranslations).sort((a, b) => b.length - a.length)

  let dePath = enPath
  for (const enPart of sortedPaths) {
    if (dePath.startsWith(enPart)) {
      dePath = reversePathTranslations[enPart] + dePath.slice(enPart.length)
      break
    }
  }

  // Translate sub-service slugs back to German
  const subServiceMatch = dePath.match(/^(\/leistungen\/[^\/]+)\/([^\/]+)$/)
  if (subServiceMatch) {
    const [, parentPath, subSlug] = subServiceMatch
    const translatedSubSlug = subServiceSlugTranslationsReverse[subSlug] || subSlug
    dePath = `${parentPath}/${translatedSubSlug}`
  }

  // Translate blog category slugs back to German
  const blogCategoryMatch = dePath.match(/^(\/blog\/kategorie)\/([^\/]+)$/)
  if (blogCategoryMatch) {
    const [, categoryPath, categorySlug] = blogCategoryMatch
    const translatedCategorySlug = blogCategorySlugTranslationsReverse[categorySlug] || categorySlug
    dePath = `${categoryPath}/${translatedCategorySlug}`
  }

  // Translate blog post slugs back to German: /blog/[slug]
  const blogPostMatch = dePath.match(/^\/blog\/([^\/]+)$/)
  if (blogPostMatch) {
    const [, postSlug] = blogPostMatch
    const translatedPostSlug = blogPostSlugTranslationsReverse[postSlug] || postSlug
    dePath = `/blog/${translatedPostSlug}`
  }

  return dePath
}

/**
 * Check if a path is already in English format
 */
export function isEnglishPath(path: string): boolean {
  const englishPrefixes = [
    // Main sections
    '/services', '/references', '/projects', '/about-us', '/contact',
    '/locations', '/resources', '/faq', '/imprint', '/privacy-policy',
    '/legal', '/blog/category',
    // Landing pages - Austria
    '/creative-agency-vienna', '/web-design-vienna', '/seo-agency-vienna',
    '/branding-agency-vienna', '/web-design-austria',
    // Landing pages - Germany
    '/web-design-germany', '/web-design-munich', '/web-design-hamburg',
    '/web-design-frankfurt', '/seo-agency-germany', '/branding-agency-germany',
    // Landing pages - Switzerland
    '/web-design-switzerland', '/web-design-zurich', '/seo-agency-switzerland',
    // Landing pages - UAE / Dubai
    '/web-design-uae', '/web-design-dubai', '/seo-agency-dubai',
    '/creative-agency-dubai', '/ecommerce-agency-dubai', '/wordpress-agency-dubai',
    '/digital-marketing-dubai', '/web-development-abu-dhabi', '/app-development-dubai',
  ]

  // Check prefixes first
  if (englishPrefixes.some(prefix => path.startsWith(prefix))) {
    return true
  }

  // Check if this is an English blog post slug
  const blogPostMatch = path.match(/^\/blog\/([^\/]+)$/)
  if (blogPostMatch) {
    const [, slug] = blogPostMatch
    // If the slug exists in the reverse map (EN→DE), it's an English slug
    return slug in blogPostSlugTranslationsReverse
  }

  return false
}

/**
 * Generate canonical URL using routing.ts as single source of truth
 * Returns ABSOLUTE URL for proper canonical format
 *
 * This function looks up the pathKey in routing.ts pathnames config:
 * - If mapping exists: uses locale-specific path from routing config
 * - If no mapping: falls back to translatePath() logic
 *
 * DE locale (default): /leistungen/sea-agentur → https://goldenwing.at/leistungen/sea-agentur
 * EN locale: /leistungen/sea-agentur → https://goldenwing.at/en/services/sea-agency
 */
export function getCanonicalUrl(pathKey: string, locale: string): string {
  const cleanPathKey = pathKey.startsWith('/') ? pathKey : `/${pathKey}`
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  // Try to look up in routing.ts pathnames (single source of truth)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { routing } = require('@/i18n/routing')
    const pathnames = routing.pathnames as Record<string, string | { de: string; en: string }>

    if (pathnames && pathnames[cleanPathKey]) {
      const mapping = pathnames[cleanPathKey]

      if (typeof mapping === 'string') {
        // Simple string mapping (same for both locales)
        // localePrefix: 'as-needed' — DE (default) gets no prefix, others do
        if (locale === 'de') return `${baseUrl}${mapping}`
        if (locale === 'en') return `${baseUrl}/en${mapping}`
        return `${baseUrl}/${locale}${mapping}`
      } else if (typeof mapping === 'object') {
        // Locale-specific mapping
        const localePath = (mapping as Record<string, string>)[locale] || (mapping as Record<string, string>).de
        // localePrefix: 'as-needed' — DE (default) gets no prefix, others do
        if (locale === 'de') return `${baseUrl}${localePath}`
        if (locale === 'en') return `${baseUrl}/en${localePath}`
        return `${baseUrl}/${locale}${localePath}`
      }
    }
  } catch {
    // If routing.ts lookup fails, fall through to legacy logic (error intentionally ignored)
  }

  // Fallback: use legacy translation logic
  if (locale === 'en') {
    if (isEnglishPath(cleanPathKey)) {
      return `${baseUrl}/en${cleanPathKey === '/' ? '' : cleanPathKey}`
    }
    const translatedPath = translatePath(cleanPathKey)
    return `${baseUrl}/en${translatedPath === '/' ? '' : translatedPath}`
  }
  // localePrefix: 'as-needed' — DE (default) gets no prefix
  return `${baseUrl}${cleanPathKey}`
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

/**
 * Generate hreflang alternates for metadata
 * Returns DE, EN, and RU versions of the URL as absolute URLs
 * Using absolute URLs prevents Next.js from adding trailing slashes
 *
 * @param path - The path (can be German or English format)
 * @param currentLocale - Optional: if 'en', the path may contain English slugs
 */
export function getHreflangAlternates(path: string, currentLocale?: string): {
  canonical: string
  languages: { de: string; en: string; ru: string; 'x-default': string }
} {
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  let dePath: string
  let enPath: string

  // If current locale is English and path is already in English format
  if (currentLocale === 'en' && isEnglishPath(cleanPath)) {
    // Path is like /services/branding/brand-strategy (full EN format)
    enPath = cleanPath
    // Translate back to German
    dePath = translatePathReverse(cleanPath)
  } else if (currentLocale === 'en') {
    // Path is like /leistungen/branding/brand-strategy (mixed - DE structure with EN slug)
    // Need to translate slugs back to German
    dePath = translatePathReverse(cleanPath)
    enPath = translatePath(dePath)
  } else {
    // German locale - path is already in German
    dePath = cleanPath
    enPath = translatePath(dePath)
  }

  // Use absolute URLs to prevent Next.js from adding trailing slashes
  // localePrefix: 'as-needed' — DE (default) gets no prefix
  const deUrl = `${BASE_URL}${dePath === '/' ? '' : dePath}`
  const enUrl = `${BASE_URL}/en${enPath === '/' ? '' : enPath}`

  // Generate RU URL from routing.ts pathnames
  let ruUrl = ''
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { routing } = require('@/i18n/routing')
    const pathnames = routing.pathnames as Record<string, string | Record<string, string>>
    // The path key in routing.ts matches the DE path
    const pathKey = dePath
    if (pathnames && pathnames[pathKey]) {
      const mapping = pathnames[pathKey]
      if (typeof mapping === 'object' && mapping.ru) {
        ruUrl = `${BASE_URL}/ru${mapping.ru}`
      }
    }
  } catch {
    // Fallback below
  }
  // Fallback: use /ru + DE path (next-intl middleware will handle redirect)
  if (!ruUrl) {
    ruUrl = `${BASE_URL}/ru${dePath === '/' ? '' : dePath}`
  }

  return {
    canonical: currentLocale === 'en' ? enUrl : (currentLocale === 'ru' ? ruUrl : deUrl),
    languages: {
      'de': deUrl,
      'en': enUrl,
      'ru': ruUrl,
      'x-default': deUrl, // Default to German
    },
  }
}

/**
 * Translate a service slug from German to English
 * Used by pages to construct correct basePath for EN locale
 */
export function translateServiceSlugToEn(deSlug: string): string {
  return serviceSlugTranslations[deSlug] || deSlug
}

/**
 * Translate a reference category slug from German to English
 * Used by pages to construct correct basePath for EN locale
 */
export function translateReferenceCategorySlugToEn(deSlug: string): string {
  return referenceCategorySlugTranslations[deSlug] || deSlug
}

/**
 * Translate a blog category slug from German to English
 * Used by pages to construct correct basePath for EN locale
 */
export function translateBlogCategorySlugToEn(deSlug: string): string {
  return blogCategorySlugTranslations[deSlug] || deSlug
}

/**
 * Translate a sub-service slug from German to English
 * Used by pages to construct correct basePath for EN locale
 */
export function translateSubServiceSlugToEn(deSlug: string): string {
  return subServiceSlugTranslations[deSlug] || deSlug
}

/**
 * Generate a localized sub-service URL
 * Returns the correct URL based on locale with translated slugs
 */
export function getSubServiceUrl(
  serviceSlug: string,
  subServiceSlug: string,
  locale: 'de' | 'en' | 'ru'
): string {
  if (locale === 'en') {
    const enServiceSlug = serviceSlugTranslations[serviceSlug] || serviceSlug
    const enSubServiceSlug = subServiceSlugTranslations[subServiceSlug] || subServiceSlug
    return `/en/services/${enServiceSlug}/${enSubServiceSlug}`
  }
  return `/leistungen/${serviceSlug}/${subServiceSlug}`
}

/**
 * Generate a localized service URL
 * Returns the correct URL based on locale with translated slugs
 */
export function getServiceUrl(
  serviceSlug: string,
  locale: 'de' | 'en' | 'ru'
): string {
  if (locale === 'en') {
    const enServiceSlug = serviceSlugTranslations[serviceSlug] || serviceSlug
    return `/en/services/${enServiceSlug}`
  }
  if (locale === 'ru') {
    // Russian uses transliterated slugs
    const ruServiceSlugs: Record<string, string> = {
      'branding': 'brending',
      'webdesign': 'veb-dizayn',
      'digital-marketing': 'tsifrovoy-marketing',
      'seo-content': 'seo-kontent',
      'web-app-entwicklung': 'razrabotka-veb-prilozheniy',
      'it-cloud-services': 'it-oblachnye-servisy',
    }
    const ruServiceSlug = ruServiceSlugs[serviceSlug] || serviceSlug
    return `/ru/uslugi/${ruServiceSlug}`
  }
  return `/leistungen/${serviceSlug}`
}

/**
 * Generate a localized reference category URL
 * Returns the correct URL based on locale with translated slugs
 */
export function getReferenzCategoryUrl(
  categorySlug: string,
  locale: 'de' | 'en' | 'ru'
): string {
  if (locale === 'en') {
    const enSlug = referenceCategorySlugTranslations[categorySlug] || categorySlug
    return `/en/references/${enSlug}`
  }
  return `/referenzen/${categorySlug}`
}

/**
 * Generate a localized location URL
 * Returns the correct URL based on locale with translated slugs
 */
export function getLocationUrl(
  locationSlug: string,
  locale: 'de' | 'en' | 'ru'
): string {
  const locationSlugTranslations: Record<string, string> = {
    'wien': 'vienna',
    'dubai': 'dubai',
    'roseville': 'roseville',
  }
  if (locale === 'en') {
    const enSlug = locationSlugTranslations[locationSlug] || locationSlug
    return `/en/locations/${enSlug}`
  }
  return `/standorte/${locationSlug}`
}

/**
 * Generate a localized package URL
 * Returns the correct URL based on locale with translated slugs
 */
export function getPackageUrl(
  packageSlug: string,
  locale: 'de' | 'en' | 'ru'
): string {
  const packageSlugTranslations: Record<string, string> = {
    'brand-web-foundation': 'brand-web-foundation',
    'seo-content-growth': 'seo-content-growth',
    'demand-gen-suite': 'demand-gen-suite',
    'individuelles-paket': 'custom-package',
  }
  if (locale === 'en') {
    const enSlug = packageSlugTranslations[packageSlug] || packageSlug
    return `/en/services/packages/${enSlug}`
  }
  return `/leistungen/pakete/${packageSlug}`
}

/**
 * Generate absolute URL for schema.org markup
 * German locale: https://goldenwing.at/path (no /de/ prefix)
 * English locale: https://goldenwing.at/en/translated-path
 *
 * This function handles both locale prefix AND path translation.
 * Pass the German path (as used in file structure) and it will:
 * - For German: Return BASE_URL + German path
 * - For English: Return BASE_URL/en + translated English path
 *
 * @example
 * getSchemaUrl('/projekte', 'de') → https://goldenwing.at/projekte
 * getSchemaUrl('/projekte', 'en') → https://goldenwing.at/en/projects
 * getSchemaUrl('/ueber-uns/partner', 'en') → https://goldenwing.at/en/about-us/partners
 */
export function getSchemaUrl(dePath: string, locale: string): string {
  const cleanPath = dePath.startsWith('/') ? dePath : `/${dePath}`
  if (locale === 'en') {
    const translatedPath = translatePath(cleanPath)
    return `${BASE_URL}/en${translatedPath === '/' ? '' : translatedPath}`
  }
  // localePrefix: 'as-needed' — DE (default) gets no prefix
  return `${BASE_URL}/de${cleanPath === '/' ? '' : cleanPath}`
}

/**
 * Generate consistent Open Graph metadata for pages
 * Ensures all pages have proper og:image, og:type, and og:locale
 * Use this to extend page-specific OG config without losing default images
 */
export function getOpenGraphConfig(
  options: {
    title: string
    description: string
    url: string
    locale?: 'de' | 'en'
    type?: 'website' | 'article'
    image?: string
  }
): {
  title: string
  description: string
  url: string
  type: 'website' | 'article'
  locale: string
  siteName: string
  images: Array<{ url: string; width: number; height: number; alt: string }>
} {
  const { title, description, url, locale = 'de', type = 'website', image } = options

  return {
    title,
    description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    type,
    locale: locale === 'en' ? 'en_US' : 'de_AT',
    siteName: 'GoldenWing Creative Studios',
    images: [
      {
        url: image || `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${title} | GoldenWing Creative Studios`,
      },
    ],
  }
}

/**
 * Transform Payload CMS media URL to direct URL
 * Payload CMS returns URLs like /api/media/file/filename.webp
 * which redirect (301) to /media/filename.webp
 *
 * This function removes the /api/media/file/ prefix to avoid 301 redirects
 * which are flagged as issues by SEO tools like Ahrefs
 *
 * @param url - The media URL from Payload CMS
 * @param absolute - If true, prepend BASE_URL for absolute URLs (useful for schema.org)
 * @returns Direct URL to the media file
 */
export function getMediaUrl(url: string | undefined | null, absolute: boolean = false): string {
  if (!url) return ''

  // Transform /api/media/file/filename to /media/filename
  const directUrl = url.replace('/api/media/file/', '/media/')

  if (absolute) {
    return `${BASE_URL}${directUrl}`
  }

  return directUrl
}

/**
 * Truncate meta description to optimal length for SEO
 * Google typically displays 150-160 characters in search results
 *
 * @param description - The original description text
 * @param maxLength - Maximum length (default: 155)
 * @returns Truncated description ending at word boundary with ellipsis if needed
 */
export function truncateMetaDescription(description: string, maxLength: number = 155): string {
  if (!description || description.length <= maxLength) {
    return description
  }

  // Find the last space before maxLength to avoid cutting words
  const truncated = description.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  // If we found a space, truncate there; otherwise use full truncation
  const cutPoint = lastSpace > maxLength - 30 ? lastSpace : maxLength

  return description.substring(0, cutPoint).trim() + '...'
}

/**
 * Generate localized contact URL
 * @param locale - 'de' or 'en'
 * @returns Correct path for the contact page
 */
export function getContactUrl(_locale: 'de' | 'en' | 'ru' | string): string {
  // Always return internal path - next-intl Link handles locale prefix automatically
  return '/kontakt'
}

/**
 * Generate localized services overview URL
 * @param locale - 'de' or 'en'
 * @returns Correct path for the services page
 */
export function getServicesUrl(_locale: 'de' | 'en' | 'ru' | string): string {
  // Always return internal path - next-intl Link handles locale prefix automatically
  return '/leistungen'
}

/**
 * Generate localized about URL
 * @param locale - 'de' or 'en'
 * @returns Correct path for the about page
 */
export function getAboutUrl(locale: 'de' | 'en' | 'ru' | string): string {
  return locale === 'en' ? '/en/about-us' : '/ueber-uns'
}

/**
 * Generate localized references URL
 * @param locale - 'de' or 'en'
 * @returns Correct path for the references page
 */
export function getReferencesUrl(locale: 'de' | 'en' | 'ru' | string): string {
  return locale === 'en' ? '/en/references' : '/referenzen'
}

/**
 * Generate localized projects URL
 * @param locale - 'de' or 'en'
 * @returns Correct path for the projects page
 */
export function getProjectsUrl(locale: 'de' | 'en' | 'ru' | string): string {
  return locale === 'en' ? '/en/projects' : '/projekte'
}

/**
 * Generate localized blog URL
 * @param locale - 'de' or 'en'
 * @returns Correct path for the blog page
 */
export function getBlogUrl(locale: 'de' | 'en' | 'ru' | string): string {
  return locale === 'en' ? '/en/blog' : '/blog'
}

/**
 * Generate localized packages URL
 * @param locale - 'de' or 'en'
 * @returns Correct path for the packages page
 */
export function getPackagesUrl(locale: 'de' | 'en' | 'ru' | string): string {
  return locale === 'en' ? '/en/services/packages' : '/leistungen/pakete'
}

