import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

interface PageSeoData {
  collection: string
  title: string
  slug: string
  seoScore: number
  issues: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
  }
}

function calculateSeoScore(item: {
  title?: string
  slug?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
  }
}): { score: number; issues: string[] } {
  let score = 0
  const issues: string[] = []

  // Has slug (+15)
  if (item.slug) {
    score += 15
  } else {
    issues.push('Kein Slug')
  }

  // Has meta title (+20)
  if (item.seo?.metaTitle) {
    score += 20
    // Title length 50-60 chars (+15)
    const titleLen = item.seo.metaTitle.length
    if (titleLen >= 50 && titleLen <= 60) {
      score += 15
    } else {
      issues.push(`Meta Title: ${titleLen} Zeichen (ideal: 50-60)`)
    }
  } else {
    issues.push('Kein Meta Title')
  }

  // Has meta description (+20)
  if (item.seo?.metaDescription) {
    score += 20
    // Description length 150-160 chars (+15)
    const descLen = item.seo.metaDescription.length
    if (descLen >= 150 && descLen <= 160) {
      score += 15
    } else {
      issues.push(`Meta Description: ${descLen} Zeichen (ideal: 150-160)`)
    }
  } else {
    issues.push('Keine Meta Description')
  }

  // Has keywords (+15)
  if (item.seo?.keywords) {
    score += 15
  } else {
    issues.push('Keine Keywords')
  }

  return { score, issues }
}

// GET /api/seo/dashboard
export async function GET() {
  try {
    const payload = await getPayload({ config })

    const collections = [
      'posts',
      'sub-services',
      'packages',
      'referenz-categories',
      'location-details',
      'projects',
      'services',
      'resources',
      'categories',
    ] as const

    const allPages: PageSeoData[] = []

    for (const slug of collections) {
      try {
        const result = await payload.find({
          collection: slug,
          limit: 100,
          locale: 'de',
        })

        for (const doc of result.docs) {
          const item = doc as Record<string, unknown>
          const { score, issues } = calculateSeoScore({
            title: item.title as string,
            slug: item.slug as string,
            seo: item.seo as PageSeoData['seo'],
          })

          allPages.push({
            collection: slug,
            title: (item.title as string) || 'Ohne Titel',
            slug: (item.slug as string) || '',
            seoScore: score,
            issues,
            seo: item.seo as PageSeoData['seo'],
          })
        }
      } catch {
        // Collection might not exist or be empty
      }
    }

    // Sort by score (lowest first = needs most work)
    const sorted = [...allPages].sort((a, b) => a.seoScore - b.seoScore)

    const withSeo = allPages.filter((p) => p.seoScore >= 50)
    const withoutSeo = allPages.filter((p) => p.seoScore < 50)
    const avgScore = allPages.length > 0
      ? Math.round(allPages.reduce((sum, p) => sum + p.seoScore, 0) / allPages.length)
      : 0

    return NextResponse.json({
      summary: {
        totalPages: allPages.length,
        averageScore: avgScore,
        pagesWithSeo: withSeo.length,
        pagesNeedingSeo: withoutSeo.length,
        scoreDistribution: {
          excellent: allPages.filter((p) => p.seoScore >= 80).length,
          good: allPages.filter((p) => p.seoScore >= 50 && p.seoScore < 80).length,
          poor: allPages.filter((p) => p.seoScore >= 20 && p.seoScore < 50).length,
          critical: allPages.filter((p) => p.seoScore < 20).length,
        },
      },
      needsAttention: sorted.slice(0, 10),
      allPages: sorted,
    })
  } catch (error) {
    logger.error('SEO Dashboard error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
