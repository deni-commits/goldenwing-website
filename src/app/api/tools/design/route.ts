import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logXSSAttempt } from '@/lib/security/logging'
import { validateOrigin } from '@/lib/security/csrf'
import { analyzeDesign, type DesignAnalysisResult } from '@/lib/tools/analyzers/design'
import { getCachedAnalysis, setCachedAnalysis, getCacheAge } from '@/lib/tools/cache'

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
    const rateLimitResult = rateLimit(`tools-design:${clientIP}`, {
      maxRequests: 10,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/tools/design', 10 - rateLimitResult.remaining)
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
      logXSSAttempt(clientIP, '/api/tools/design', url)
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
    const cachedResult = getCachedAnalysis<DesignAnalysisResult>('design', normalizedUrl)
    if (cachedResult) {
      const cacheAge = getCacheAge('design', normalizedUrl)
      return NextResponse.json({
        success: true,
        cached: true,
        cacheAge: cacheAge,
        result: {
          url: normalizedUrl,
          score: cachedResult.score,
          viewport: cachedResult.viewport,
          favicon: cachedResult.favicon,
          appleTouchIcon: cachedResult.appleTouchIcon,
          themeColor: cachedResult.themeColor,
          ogTags: cachedResult.ogTags,
          twitterCard: cachedResult.twitterCard,
          fontLoading: cachedResult.fontLoading,
          colorScheme: cachedResult.colorScheme,
          responsiveImages: cachedResult.responsiveImages,
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

    // Run design analysis
    const result = await analyzeDesign(normalizedUrl)

    // Cache the result (1 hour TTL)
    setCachedAnalysis('design', normalizedUrl, result)

    return NextResponse.json({
      success: true,
      result: {
        url: normalizedUrl,
        score: result.score,
        viewport: result.viewport,
        favicon: result.favicon,
        appleTouchIcon: result.appleTouchIcon,
        themeColor: result.themeColor,
        ogTags: result.ogTags,
        twitterCard: result.twitterCard,
        fontLoading: result.fontLoading,
        colorScheme: result.colorScheme,
        responsiveImages: result.responsiveImages,
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
      if (error.message.includes('Failed to fetch')) {
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

    logger.error('Design analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again later.' },
      { status: 500 }
    )
  }
}
