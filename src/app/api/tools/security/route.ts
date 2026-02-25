import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logXSSAttempt } from '@/lib/security/logging'
import { validateOrigin } from '@/lib/security/csrf'
import { analyzeSecurity, type SecurityAnalysisResult } from '@/lib/tools/analyzers/security'
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

    // Rate limiting: 10 requests per hour per IP
    const rateLimitResult = rateLimit(`tools-security:${clientIP}`, {
      maxRequests: 10,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/tools/security', 10 - rateLimitResult.remaining)
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
      logXSSAttempt(clientIP, '/api/tools/security', url)
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
    const cachedResult = getCachedAnalysis<SecurityAnalysisResult>('security', normalizedUrl)
    if (cachedResult) {
      const cacheAge = getCacheAge('security', normalizedUrl)
    return NextResponse.json({
        success: true,
        cached: true,
        cacheAge: cacheAge,
        result: {
          url: normalizedUrl,
          score: cachedResult.score,
          https: cachedResult.https,
          ssl: cachedResult.ssl,
          headers: cachedResult.headers,
          cookies: cachedResult.cookies,
          mixedContent: cachedResult.mixedContent,
          issues: cachedResult.issues.filter(
            (issue) => issue.severity === 'critical' || issue.severity === 'warning' || issue.severity === 'passed' || issue.severity === 'info'
          ),
          totalIssues: cachedResult.totalIssues,
          criticalIssues: cachedResult.criticalIssues,
          warningIssues: cachedResult.warningIssues,
          passedChecks: cachedResult.passedChecks,
        },
      })
    }

    // Run security analysis
    const result = await analyzeSecurity(normalizedUrl)

    // Cache the result (1 hour TTL)
    setCachedAnalysis('security', normalizedUrl, result)

        // Track usage in GoldenWing Cockpit (non-blocking)
    trackToolUsage({
      url: normalizedUrl,
      toolType: 'security',
      scores: { overall: result.score, security: result.score },
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
        https: result.https,
        ssl: result.ssl,
        headers: result.headers,
        cookies: result.cookies,
        mixedContent: result.mixedContent,
        issues: result.issues.filter(
          (issue) => issue.severity === 'critical' || issue.severity === 'warning' || issue.severity === 'passed' || issue.severity === 'info'
        ),
        totalIssues: result.totalIssues,
        criticalIssues: result.criticalIssues,
        warningIssues: result.warningIssues,
        passedChecks: result.passedChecks,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid URL. Please enter a valid website address.' },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('fetch failed')) {
        return NextResponse.json(
          { error: 'Could not reach the website. Please check the URL and try again.' },
          { status: 502 }
        )
      }
      if (error.message.includes('timeout') || error.message.includes('abort')) {
        return NextResponse.json(
          { error: 'Analysis took too long. Please try again.' },
          { status: 504 }
        )
      }
    }

    logger.error('Security analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again later.' },
      { status: 500 }
    )
  }
}
