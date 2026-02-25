import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logXSSAttempt } from '@/lib/security/logging'
import { validateOrigin } from '@/lib/security/csrf'
import { analyzeSeo, type SeoAnalysisResult } from '@/lib/tools/analyzers/seo'
import { getCachedAnalysis, setCachedAnalysis, getCacheAge } from '@/lib/tools/cache'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { trackToolUsage } from '@/lib/tools/track-usage'

const analyzeSchema = z.object({
  url: z.string().url().max(500),
})

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request)

    // CSRF Protection
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      )
    }

    // Rate limiting: 10 requests per hour per IP for SEO analysis
    const rateLimitResult = rateLimit(`tools-seo:${clientIP}`, {
      maxRequests: 10,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/tools/seo', 10 - rateLimitResult.remaining)
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      )
    }

    const body = await request.json()
    const validatedData = analyzeSchema.parse(body)

    // Sanitize URL
    const url = sanitizeString(validatedData.url)

    // Check for XSS attempts
    if (containsXSS(url)) {
      logXSSAttempt(clientIP, '/api/tools/seo', url)
      return NextResponse.json(
        { error: 'Invalid URL detected' },
        { status: 400 }
      )
    }

    // Normalize URL
    let normalizedUrl = url.trim().toLowerCase()
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    // Check cache first
    const cachedResult = getCachedAnalysis<SeoAnalysisResult>('seo', normalizedUrl)
    if (cachedResult) {
      const cacheAge = getCacheAge('seo', normalizedUrl)
      return NextResponse.json({
        success: true,
        cached: true,
        cacheAge: cacheAge,
        result: {
          url: normalizedUrl,
          score: cachedResult.score,
          title: cachedResult.title,
          description: cachedResult.description,
          h1: cachedResult.h1,
          headingStructure: cachedResult.headingStructure,
          images: cachedResult.images,
          schema: cachedResult.schema,
          canonical: cachedResult.canonical,
          ogTags: cachedResult.ogTags,
          sitemapFound: cachedResult.sitemapFound,
          robotsFound: cachedResult.robotsFound,
          issues: cachedResult.issues,
          totalIssues: cachedResult.issues.length,
          criticalIssues: cachedResult.issues.filter((i) => i.severity === 'critical').length,
          warningIssues: cachedResult.issues.filter((i) => i.severity === 'warning').length,
          passedChecks: cachedResult.issues.filter((i) => i.severity === 'passed' || i.severity === 'info').length,
        },
      })
    }

    // Run SEO analysis
    const result = await analyzeSeo(normalizedUrl)

    // Cache the result (1 hour TTL)
    setCachedAnalysis('seo', normalizedUrl, result)

    // Try to save to Payload CMS (non-blocking)
    let analysisId: string | null = null
    try {
      const payload = await getPayload({ config })
      const analysis = await payload.create({
        collection: 'tool-analyses',
        data: {
          url: normalizedUrl,
          toolType: 'seo',
          status: 'completed',
          scores: {
            overall: result.score,
            seo: result.score,
          },
          seoData: {
            title: {
              value: result.title.value || '',
              length: result.title.length,
              status: result.title.status,
            },
            description: {
              value: result.description.value || '',
              length: result.description.length,
              status: result.description.status,
            },
            h1: {
              count: result.h1.count,
              values: result.h1.values,
              status: result.h1.status,
            },
            images: {
              total: result.images.total,
              withoutAlt: result.images.withoutAlt,
              status: result.images.status,
            },
            schema: {
              types: result.schema.types,
              status: result.schema.status,
            },
            sitemapFound: result.sitemapFound,
            robotsFound: result.robotsFound,
            canonicalUrl: result.canonical.url || '',
          },
          issues: result.issues,
          unlocked: false,
        },
      })
      analysisId = String(analysis.id)
    } catch (dbError) {
      // Database save failed (possibly missing table) - continue without saving
      logger.warn('Could not save SEO analysis to database:', dbError)
    }

    // Track usage in GoldenWing Cockpit (non-blocking)
    trackToolUsage({
      url: normalizedUrl,
      toolType: 'seo',
      scores: { overall: result.score, seo: result.score },
      criticalIssues: result.issues.filter((i) => i.severity === 'critical').length,
      warningIssues: result.issues.filter((i) => i.severity === 'warning').length,
      passedChecks: result.issues.filter((i) => i.severity === 'passed' || i.severity === 'info').length,
      clientIP,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
      payloadId: analysisId || undefined,
    }).catch(() => {}) // fire and forget

    return NextResponse.json({
      success: true,
      id: analysisId,
      result: {
        url: normalizedUrl,
        score: result.score,
        title: result.title,
        description: result.description,
        h1: result.h1,
        headingStructure: result.headingStructure,
        images: result.images,
        schema: result.schema,
        canonical: result.canonical,
        ogTags: result.ogTags,
        sitemapFound: result.sitemapFound,
        robotsFound: result.robotsFound,
        // Show all issues (critical, warnings, and passed)
        issues: result.issues,
        totalIssues: result.issues.length,
        criticalIssues: result.issues.filter((i) => i.severity === 'critical').length,
        warningIssues: result.issues.filter((i) => i.severity === 'warning').length,
        passedChecks: result.issues.filter((i) => i.severity === 'passed' || i.severity === 'info').length,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid URL. Please enter a valid website address.' },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      return NextResponse.json(
        { error: 'Could not reach the website. Please check the URL and try again.' },
        { status: 400 }
      )
    }

    logger.error('SEO analysis error:', error)
    // Return 200 with error flag to avoid Cloudflare intercepting 5xx responses
    return NextResponse.json({
      success: false,
      error: 'Analysis failed. Please try again later.',
    })
  }
}

// GET: Retrieve analysis by ID (for results page)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Analysis ID required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const analysis = await payload.findByID({
      collection: 'tool-analyses',
      id,
    })

    if (!analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
    }

    // Return limited data if not unlocked
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const issues = (analysis.issues as any[]) || []

    return NextResponse.json({
      success: true,
      analysis: {
        id: analysis.id,
        url: analysis.url,
        toolType: analysis.toolType,
        status: analysis.status,
        scores: analysis.scores,
        seoData: analysis.seoData,
        unlocked: analysis.unlocked,
        // Show all issues
        issues: issues,
        totalIssues: issues.length,
        criticalIssues: issues.filter((i: { severity: string }) => i.severity === 'critical').length,
        warningIssues: issues.filter((i: { severity: string }) => i.severity === 'warning').length,
        passedChecks: issues.filter((i: { severity: string }) => i.severity === 'passed' || i.severity === 'info').length,
        createdAt: analysis.createdAt,
      },
    })
  } catch (error) {
    logger.error('Get analysis error:', error)
    return NextResponse.json({ error: 'Failed to retrieve analysis' }, { status: 500 })
  }
}
