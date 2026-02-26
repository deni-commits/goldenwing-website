'use client'

import { usePathname } from 'next/navigation'

const BASE_URL = 'https://goldenwing.at'

/**
 * Path translations DE → EN
 * Must match the translations in src/lib/utils.ts
 */
const deToEn: Record<string, string> = {
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
  // Service packages
  '/leistungen/pakete': '/services/packages',
  '/leistungen/pakete/brand-web-foundation': '/services/packages/brand-web-foundation',
  '/leistungen/pakete/seo-content-growth': '/services/packages/seo-content-growth',
  '/leistungen/pakete/demand-gen-suite': '/services/packages/demand-gen-suite',
  '/leistungen/pakete/individuelles-paket': '/services/packages/custom-package',
  // Service slugs (6 main services)
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
 * Sub-service slug translations (DE → EN)
 */
const subServiceSlugTranslations: Record<string, string> = {
  // Branding
  'markenstrategie': 'brand-strategy',
  'corporate-identity': 'corporate-identity',
  'brand-guidelines': 'brand-guidelines',
  'naming': 'naming',
  'logo-design': 'logo-design',
  'visual-identity': 'visual-identity',
  // Webdesign
  'ux-ui-design': 'ux-ui-design',
  'wordpress-webdesign': 'wordpress-web-design',
  'elementor-entwicklung': 'elementor-development',
  'landingpages': 'landing-pages',
  'webshops-woocommerce': 'webshops-woocommerce',
  // Digital Strategy
  'zielgruppenanalyse': 'target-audience-analysis',
  'customer-journey-mapping': 'customer-journey-mapping',
  'funnel-strategien': 'funnel-strategies',
  'positionierungsberatung': 'positioning-consulting',
  'kampagnen-management': 'campaign-management',
  'e-mail-marketing': 'email-marketing',
  'paid-ads': 'paid-ads',
  'social-media-marketing': 'social-media-marketing',
  // SEO
  'technisches-seo': 'technical-seo',
  'local-seo': 'local-seo',
  'seo-audit': 'seo-audit',
  'keywordstrategie': 'keyword-strategy',
  // Content & Visuals
  'copywriting': 'copywriting',
  'content-planung': 'content-planning',
  'reels-social-video': 'reels-social-video',
  'business-fotografie': 'business-photography',
  // Technical Solutions
  'api-integration': 'api-integration',
  'automatisierung': 'automation',
  'gated-content': 'gated-content',
  'formular-logiken': 'form-logic',
}

/**
 * Blog category slug translations (DE → EN)
 */
const blogCategorySlugTranslations: Record<string, string> = {
  'design': 'design',
  'technologie': 'technology',
  'marketing': 'marketing',
  'strategie': 'strategy',
  'business': 'business',
  'seo': 'seo',
  'webdesign': 'web-design',
  'branding': 'branding',
}

/**
 * Reverse translations (EN → DE)
 */
const subServiceSlugTranslationsReverse: Record<string, string> = Object.fromEntries(
  Object.entries(subServiceSlugTranslations).map(([de, en]) => [en, de])
)

const blogCategorySlugTranslationsReverse: Record<string, string> = Object.fromEntries(
  Object.entries(blogCategorySlugTranslations).map(([de, en]) => [en, de])
)

/**
 * Build reverse mapping EN → DE
 */
const enToDe: Record<string, string> = Object.fromEntries(
  Object.entries(deToEn).map(([de, en]) => [en, de])
)

/**
 * Translate path between languages
 * Handles both static path translations AND dynamic slugs (sub-services, blog categories)
 */
function translatePath(path: string, translations: Record<string, string>, isDeToEn: boolean): string {
  const sortedPaths = Object.keys(translations).sort((a, b) => b.length - a.length)

  let result = path
  for (const from of sortedPaths) {
    if (result.startsWith(from)) {
      result = translations[from] + result.slice(from.length)
      break
    }
  }

  // Translate sub-service slugs
  if (isDeToEn) {
    // DE → EN: /services/[parent]/[de-slug] → /services/[parent]/[en-slug]
    const subServiceMatch = result.match(/^(\/services\/[^/]+)\/([^/]+)$/)
    if (subServiceMatch) {
      const [, parentPath, subSlug] = subServiceMatch
      const translatedSlug = subServiceSlugTranslations[subSlug] || subSlug
      result = `${parentPath}/${translatedSlug}`
    }

    // Translate blog category slugs
    const blogCategoryMatch = result.match(/^(\/blog\/category)\/([^/]+)$/)
    if (blogCategoryMatch) {
      const [, categoryPath, categorySlug] = blogCategoryMatch
      const translatedSlug = blogCategorySlugTranslations[categorySlug] || categorySlug
      result = `${categoryPath}/${translatedSlug}`
    }
  } else {
    // EN → DE: /leistungen/[parent]/[en-slug] → /leistungen/[parent]/[de-slug]
    const subServiceMatch = result.match(/^(\/leistungen\/[^/]+)\/([^/]+)$/)
    if (subServiceMatch) {
      const [, parentPath, subSlug] = subServiceMatch
      const translatedSlug = subServiceSlugTranslationsReverse[subSlug] || subSlug
      result = `${parentPath}/${translatedSlug}`
    }

    // Translate blog category slugs back to German
    const blogCategoryMatch = result.match(/^(\/blog\/kategorie)\/([^/]+)$/)
    if (blogCategoryMatch) {
      const [, categoryPath, categorySlug] = blogCategoryMatch
      const translatedSlug = blogCategorySlugTranslationsReverse[categorySlug] || categorySlug
      result = `${categoryPath}/${translatedSlug}`
    }
  }

  return result
}

export function HreflangTags() {
  const pathname = usePathname()

  // Check if we're on an EN page
  const isEnPage = pathname.startsWith('/en')

  // Extract the path without locale prefix
  const pathWithoutLocale = pathname.replace(/^\/(de|en)/, '') || '/'

  // Skip blog post pages - they have localized slugs and handle their own hreflang in metadata
  // Match /blog/[slug] but NOT /blog/kategorie/[slug] or /blog (listing page)
  const isBlogPostPage = /^\/blog\/[^/]+$/.test(pathWithoutLocale) &&
    !pathWithoutLocale.startsWith('/blog/kategorie') &&
    !pathWithoutLocale.startsWith('/blog/category')

  if (isBlogPostPage) {
    // Blog posts have localized slugs - hreflang is handled in page metadata
    return null
  }

  let dePath: string
  let enPath: string

  if (isEnPage) {
    // On EN page: current path is EN, need to translate back to DE
    enPath = pathWithoutLocale
    dePath = translatePath(pathWithoutLocale, enToDe, false)
  } else {
    // On DE page: current path is DE, need to translate to EN
    dePath = pathWithoutLocale
    enPath = translatePath(pathWithoutLocale, deToEn, true)
  }

  // Generate full URLs
  // Note: localePrefix is 'always', so DE URLs also need /de/ prefix
  const deUrl = `${BASE_URL}/de${dePath === '/' ? '' : dePath}`
  const enUrl = `${BASE_URL}/en${enPath === '/' ? '' : enPath}`

  // Generate RU URL from routing pathnames
  let ruUrl = ''
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { pathnames } = require('@/i18n/routing')
    if (pathnames && pathnames[dePath]) {
      const mapping = pathnames[dePath]
      if (typeof mapping === 'object' && mapping.ru) {
        ruUrl = `${BASE_URL}/ru${mapping.ru}`
      }
    }
  } catch {
    // Fallback below
  }
  if (!ruUrl) {
    ruUrl = `${BASE_URL}/ru${dePath === '/' ? '' : dePath}`
  }

  return (
    <>
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ru" href={ruUrl} />
      <link rel="alternate" hrefLang="x-default" href={deUrl} />
    </>
  )
}
