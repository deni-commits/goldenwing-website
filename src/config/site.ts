/**
 * Site Configuration
 * Single source of truth for site-wide settings
 */

/**
 * Base URL for the site
 * - Uses NEXT_PUBLIC_SITE_URL if set (for staging/preview)
 * - Falls back to production URL
 * 
 * Note: For SEO schema markup, always use production URL
 * since crawlers index the live site, not staging
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

/**
 * Production URL (for SEO schemas)
 * Always use this for structured data to ensure consistency
 */
export const PRODUCTION_URL = 'https://goldenwing.at'

/**
 * Site metadata
 */
export const SITE_NAME = 'GoldenWing Creative Studios'
export const SITE_DESCRIPTION = 'Premium Branding, Webdesign & SEO Agentur in Wien, Dubai & Roseville'

/**
 * Social links
 */
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/goldenwing.at',
  linkedin: 'https://www.linkedin.com/company/goldenwing-creative-studios',
  facebook: 'https://www.facebook.com/goldenwing.at',
} as const

/**
 * Contact info
 */
export const CONTACT = {
  email: 'office@goldenwing.at',
  phone: '+43 1 234 5678',
} as const

/**
 * Get the appropriate base URL
 * @param forSchema - If true, always returns production URL for SEO consistency
 */
export function getBaseUrl(forSchema = false): string {
  if (forSchema) return PRODUCTION_URL
  return SITE_URL
}

/**
 * Build full URL from path
 * @param path - Path starting with /
 * @param locale - Locale (de/en/ru), defaults to de (no prefix)
 * @param forSchema - If true, uses production URL
 */
export function buildUrl(path: string, locale: 'de' | 'en' | 'ru' = 'de', forSchema = false): string {
  const base = getBaseUrl(forSchema)
  const prefix = locale === 'de' ? '' : `/${locale}`
  const cleanPath = path === '/' ? '' : path
  return `${base}${prefix}${cleanPath}`
}
