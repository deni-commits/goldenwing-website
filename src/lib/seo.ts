import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

/**
 * Generate correct alternates (canonical + hreflang) for a given page path.
 * @param path - The path after the locale segment, e.g. '/services' or '/blog/my-post'. Use '' for homepage.
 * @param locale - Current locale
 */
export function getAlternates(path: string, locale: string): Metadata['alternates'] {
  const suffix = path ? `/${path}` : ''
  return {
    canonical: `${siteUrl}/${locale}${suffix}`,
    languages: {
      de: `${siteUrl}/de${suffix}`,
      en: `${siteUrl}/en${suffix}`,
      ru: `${siteUrl}/ru${suffix}`,
      'x-default': `${siteUrl}/de${suffix}`,
    },
  }
}
