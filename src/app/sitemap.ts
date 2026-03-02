import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/ueber-uns`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/referenzen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
  ]

  try {
    const payload = await getPayload()

    const [posts, services, caseStudies] = await Promise.all([
      payload.find({ collection: 'posts', limit: 1000, where: { _status: { equals: 'published' } } }),
      payload.find({ collection: 'services', limit: 100 }),
      payload.find({ collection: 'case-studies', limit: 100 }),
    ])

    const postPages: MetadataRoute.Sitemap = posts.docs.map((post: any) => ({
      url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: 'monthly' as const, priority: 0.7,
    }))

    const servicePages: MetadataRoute.Sitemap = services.docs.map((service: any) => ({
      url: `${siteUrl}/services/${service.slug}`, lastModified: new Date(service.updatedAt), changeFrequency: 'monthly' as const, priority: 0.8,
    }))

    const caseStudyPages: MetadataRoute.Sitemap = caseStudies.docs.map((cs: any) => ({
      url: `${siteUrl}/referenzen/${cs.slug}`, lastModified: new Date(cs.updatedAt), changeFrequency: 'monthly' as const, priority: 0.7,
    }))

    return [...staticPages, ...postPages, ...servicePages, ...caseStudyPages]
  } catch {
    return staticPages
  }
}
