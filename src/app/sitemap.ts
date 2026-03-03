import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'
import { locales } from '@/i18n/config'
import { getAllLandingPageSlugs } from '@/lib/landing-pages'

function alternatesFor(siteUrl: string, path: string) {
  return {
    languages: Object.fromEntries([
      ...locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
      ['x-default', `${siteUrl}/de${path}`],
    ]),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  const entries: MetadataRoute.Sitemap = []

  // Static pages per locale
  const staticPaths = [
    '',
    '/leistungen',
    '/referenzen',
    '/blog',
    '/glossar',
    '/ueber-uns',
    '/kontakt',
    '/impressum',
    '/datenschutz',
    '/agb',
  ]

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: alternatesFor(siteUrl, path),
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
      const path = `/blog/${(post as any).slug}`
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}${path}`,
          lastModified: new Date((post as any).updatedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: alternatesFor(siteUrl, path),
        })
      }
    }

    for (const service of services.docs) {
      const s = service as any
      const parentService = s.parent as any | null
      const path = parentService?.slug ? `/leistungen/${parentService.slug}/${s.slug}` : `/leistungen/${s.slug}`
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}${path}`,
          lastModified: new Date(s.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: alternatesFor(siteUrl, path),
        })
      }
    }

    for (const cs of caseStudies.docs) {
      const path = `/referenzen/${(cs as any).slug}`
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}${path}`,
          lastModified: new Date((cs as any).updatedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: alternatesFor(siteUrl, path),
        })
      }
    }

    for (const lp of landingPages.docs) {
      const path = `/${(lp as any).slug}`
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}${path}`,
          lastModified: new Date((lp as any).updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: alternatesFor(siteUrl, path),
        })
      }
    }
    // Glossary detail pages
    const glossaryEntries = await payload.find({ collection: 'glossary', limit: 500 })
    for (const entry of glossaryEntries.docs) {
      const path = `/glossar/${(entry as any).slug}`
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}${path}`,
          lastModified: new Date((entry as any).updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: alternatesFor(siteUrl, path),
        })
      }
    }
  } catch {
    // Tables may not exist yet
  }

  // Template-based landing pages (code-driven, not CMS)
  for (const slug of getAllLandingPageSlugs()) {
    const path = `/${slug}`
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: alternatesFor(siteUrl, path),
      })
    }
  }

  return entries
}
