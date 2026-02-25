import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logXSSAttempt } from '@/lib/security/logging'
import { validateOrigin } from '@/lib/security/csrf'
import { analyzePerformance, type PerformanceAnalysisResult } from '@/lib/tools/analyzers/performance'
import { getCachedAnalysis, setCachedAnalysis, getCacheAge } from '@/lib/tools/cache'
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

    // Rate limiting: 5 requests per hour per IP (PageSpeed API is slower)
    const rateLimitResult = rateLimit(`tools-performance:${clientIP}`, {
      maxRequests: 5,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/tools/performance', 5 - rateLimitResult.remaining)
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
      logXSSAttempt(clientIP, '/api/tools/performance', url)
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
    const cachedResult = getCachedAnalysis<PerformanceAnalysisResult>('performance', normalizedUrl)
    if (cachedResult) {
      const cacheAge = getCacheAge('performance', normalizedUrl)
    return NextResponse.json({
        success: true,
        cached: true,
        cacheAge: cacheAge,
        result: {
          url: normalizedUrl,
          score: cachedResult.score,
          lcp: cachedResult.lcp,
          fcp: cachedResult.fcp,
          cls: cachedResult.cls,
          tbt: cachedResult.tbt,
          si: cachedResult.si,
          ttfb: cachedResult.ttfb,
          pageStats: cachedResult.pageStats,
          opportunities: cachedResult.opportunities.slice(0, 5),
          diagnostics: cachedResult.diagnostics.slice(0, 5),
          issues: cachedResult.issues,
          totalIssues: cachedResult.issues.length,
          criticalIssues: cachedResult.issues.filter((i) => i.severity === 'critical').length,
          warningIssues: cachedResult.issues.filter((i) => i.severity === 'warning').length,
          passedChecks: cachedResult.issues.filter((i) => i.severity === 'passed' || i.severity === 'info').length,
        },
      })
    }

    // Run performance analysis
    const result = await analyzePerformance(normalizedUrl)

    // Cache the result (1 hour TTL)
    setCachedAnalysis('performance', normalizedUrl, result)

        // Track usage in GoldenWing Cockpit (non-blocking)
    trackToolUsage({
      url: normalizedUrl,
      toolType: 'performance',
      scores: { overall: result.score, performance: result.score },
      criticalIssues: result.issues.filter((i) => i.severity === 'critical').length,
      warningIssues: result.issues.filter((i) => i.severity === 'warning').length,
      passedChecks: result.issues.filter((i) => i.severity === 'passed' || i.severity === 'info').length,
      clientIP,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
    }).catch(() => {}) // fire and forget

return NextResponse.json({
      success: true,
      result: {
        url: normalizedUrl,
        score: result.score,
        lcp: result.lcp,
        fcp: result.fcp,
        cls: result.cls,
        tbt: result.tbt,
        si: result.si,
        ttfb: result.ttfb,
        pageStats: result.pageStats,
        opportunities: result.opportunities.slice(0, 5), // Top 5
        diagnostics: result.diagnostics.slice(0, 5), // Top 5
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

    // Return 200 with error flag to avoid Cloudflare intercepting 5xx responses
    if (error instanceof Error) {
      if (error.message.includes('PageSpeed API error')) {
        return NextResponse.json({
          success: false,
          error: 'Could not analyze the website. The PageSpeed service may be temporarily unavailable.',
        })
      }
      if (error.message.includes('timeout') || error.message.includes('abort')) {
        return NextResponse.json({
          success: false,
          error: 'Analysis took too long. Please try again.',
        })
      }
    }

    logger.error('Performance analysis error:', error)
    return NextResponse.json({
      success: false,
      error: 'Analysis failed. Please try again later.',
    })
  }
}
