import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logXSSAttempt } from '@/lib/security/logging'
import { validateOrigin } from '@/lib/security/csrf'
import { analyzeSeo } from '@/lib/tools/analyzers/seo'
import { analyzePerformance } from '@/lib/tools/analyzers/performance'
import { analyzeDesign } from '@/lib/tools/analyzers/design'
import { analyzeSecurity } from '@/lib/tools/analyzers/security'

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

    // Rate limiting: 5 requests per hour per IP (combined analysis is heavier)
    const rateLimitResult = rateLimit(`tools-analyze:${clientIP}`, {
      maxRequests: 5,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/tools/analyze', 5 - rateLimitResult.remaining)
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
      logXSSAttempt(clientIP, '/api/tools/analyze', url)
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

    // Run all 4 analyzers in parallel
    const [seoResult, performanceResult, designResult, securityResult] = await Promise.allSettled([
      analyzeSeo(normalizedUrl),
      analyzePerformance(normalizedUrl),
      analyzeDesign(normalizedUrl),
      analyzeSecurity(normalizedUrl),
    ])

    // Extract results or create error fallbacks
    const seo = seoResult.status === 'fulfilled' ? seoResult.value : null
    const performance = performanceResult.status === 'fulfilled' ? performanceResult.value : null
    const design = designResult.status === 'fulfilled' ? designResult.value : null
    const security = securityResult.status === 'fulfilled' ? securityResult.value : null

    // Calculate overall score (average of available scores)
    const scores = [
      seo?.score,
      performance?.score,
      design?.score,
      security?.score,
    ].filter((s): s is number => typeof s === 'number')

    const overallScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

    // Aggregate all issues
    const allIssues: Array<{
      id: string
      category: 'seo' | 'performance' | 'design' | 'security'
      severity: 'critical' | 'warning' | 'passed' | 'info'
      title: string
      description: string
      howToFix?: string
    }> = []

    // Add SEO issues
    if (seo?.issues) {
      allIssues.push(...seo.issues.map((issue, i) => ({
        ...issue,
        id: `seo-${i}`,
        category: 'seo' as const,
      })))
    }

    // Add Performance issues
    if (performance?.issues) {
      allIssues.push(...performance.issues.map((issue, i) => ({
        ...issue,
        id: `perf-${i}`,
        category: 'performance' as const,
      })))
    }

    // Add Design issues
    if (design?.issues) {
      allIssues.push(...design.issues.map((issue, i) => ({
        ...issue,
        id: `design-${i}`,
        category: 'design' as const,
      })))
    }

    // Add Security issues
    if (security?.issues) {
      allIssues.push(...security.issues.map((issue, i) => ({
        ...issue,
        id: `security-${i}`,
        category: 'security' as const,
      })))
    }

    // Count issues by severity
    const criticalIssues = allIssues.filter(i => i.severity === 'critical').length
    const warningIssues = allIssues.filter(i => i.severity === 'warning').length
    const passedChecks = allIssues.filter(i => i.severity === 'passed' || i.severity === 'info').length

    return NextResponse.json({
      success: true,
      result: {
        url: normalizedUrl,
        overallScore,
        seoScore: seo?.score ?? null,
        performanceScore: performance?.score ?? null,
        designScore: design?.score ?? null,
        securityScore: security?.score ?? null,
        seo: seo ? {
          score: seo.score,
          title: seo.title,
          description: seo.description,
          h1: seo.h1,
          headingStructure: seo.headingStructure,
          images: seo.images,
          schema: seo.schema,
          canonical: seo.canonical,
          ogTags: seo.ogTags,
          sitemapFound: seo.sitemapFound,
          robotsFound: seo.robotsFound,
        } : null,
        performance: performance ? {
          score: performance.score,
          lcp: performance.lcp,
          fcp: performance.fcp,
          cls: performance.cls,
          tbt: performance.tbt,
          si: performance.si,
          ttfb: performance.ttfb,
          pageStats: performance.pageStats,
          opportunities: performance.opportunities,
        } : null,
        design: design ? {
          score: design.score,
          viewport: design.viewport,
          favicon: design.favicon,
          appleTouchIcon: design.appleTouchIcon,
          themeColor: design.themeColor,
          ogTags: design.ogTags,
          twitterCard: design.twitterCard,
          fontLoading: design.fontLoading,
          colorScheme: design.colorScheme,
          responsiveImages: design.responsiveImages,
        } : null,
        security: security ? {
          score: security.score,
          https: security.https,
          ssl: security.ssl,
          headers: security.headers,
          cookies: security.cookies,
          mixedContent: security.mixedContent,
        } : null,
        issues: allIssues,
        totalIssues: criticalIssues + warningIssues,
        criticalIssues,
        warningIssues,
        passedChecks,
        errors: {
          seo: seoResult.status === 'rejected' ? (seoResult.reason as Error).message : null,
          performance: performanceResult.status === 'rejected' ? (performanceResult.reason as Error).message : null,
          design: designResult.status === 'rejected' ? (designResult.reason as Error).message : null,
          security: securityResult.status === 'rejected' ? (securityResult.reason as Error).message : null,
        },
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid URL. Please enter a valid website address.' },
        { status: 400 }
      )
    }

    logger.error('Combined analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again later.' },
      { status: 500 }
    )
  }
}
