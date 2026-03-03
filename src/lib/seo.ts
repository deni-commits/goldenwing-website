import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

/**
 * Generate correct alternates (canonical + hreflang) and openGraph URL for a given page path.
 * @param path - The path after the locale segment, e.g. 'services' or 'blog/my-post'. Use '' for homepage.
 * @param locale - Current locale
 */
export function getPageSeo(path: string, locale: string): Pick<Metadata, 'alternates' | 'openGraph'> {
  const suffix = path ? `/${path}` : ''
  const pageUrl = `${siteUrl}/${locale}${suffix}`
  return {
    alternates: {
      canonical: pageUrl,
      languages: {
        de: `${siteUrl}/de${suffix}`,
        en: `${siteUrl}/en${suffix}`,
        ru: `${siteUrl}/ru${suffix}`,
        'x-default': `${siteUrl}/de${suffix}`,
      },
    },
    openGraph: {
      url: pageUrl,
    },
  }
}

// Backwards-compatible alias
export function getAlternates(path: string, locale: string): Metadata['alternates'] {
  return getPageSeo(path, locale).alternates
}
