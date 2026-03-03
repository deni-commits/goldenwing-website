import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'
import { locales } from '@/i18n/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  const entries: MetadataRoute.Sitemap = []

  // Static pages per locale
  const staticPaths = ['', '/services', '/referenzen', '/blog', '/ueber-uns', '/kontakt', '/impressum', '/datenschutz']

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            [...locales.map((l) => [l, `${siteUrl}/${l}${path}`]), ['x-default', `${siteUrl}/de${path}`]]
          ),
        },
      })
    }
  }

  try {
    const payload = await getPayload()

    const [posts, services, caseStudies, landingPages] = await Promise.all([
      payload.find({ collection: 'posts', limit: 1000, where: { _status: { equals: 'published' } } }),
      payload.find({ collection: 'services', limit: 200 }),
      payload.find({ collection: 'case-studies', limit: 100 }),
      payload.find({ collection: 'landing-pages', limit: 200 }),
    ])

    for (const post of posts.docs) {
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}/blog/${(post as any).slug}`,
          lastModified: new Date((post as any).updatedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${siteUrl}/${l}/blog/${(post as any).slug}`])
            ),
          },
        })
      }
    }

    for (const service of services.docs) {
      const s = service as any
      const parentService = s.parent as any | null
      for (const locale of locales) {
        const path = parentService?.slug
          ? `/services/${parentService.slug}/${s.slug}`
          : `/services/${s.slug}`
        entries.push({
          url: `${siteUrl}/${locale}${path}`,
          lastModified: new Date(s.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              [...locales.map((l) => [l, `${siteUrl}/${l}${path}`]), ['x-default', `${siteUrl}/de${path}`]]
            ),
          },
        })
      }
    }

    for (const cs of caseStudies.docs) {
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}/referenzen/${(cs as any).slug}`,
          lastModified: new Date((cs as any).updatedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${siteUrl}/${l}/referenzen/${(cs as any).slug}`])
            ),
          },
        })
      }
    }

    for (const lp of landingPages.docs) {
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}/${(lp as any).slug}`,
          lastModified: new Date((lp as any).updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${siteUrl}/${l}/${(lp as any).slug}`])
            ),
          },
        })
      }
    }
  } catch {
    // Tables may not exist yet
  }

  return entries
}
