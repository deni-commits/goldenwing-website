import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, sanitizeEmail, isSpam, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logBotDetected, logXSSAttempt, logSpamDetected, logSecurityEvent } from '@/lib/security/logging'
import { validateOrigin, getRequestOrigin } from '@/lib/security/csrf'

const newsletterSchema = z.object({
  email: z.string().email().max(255),
  firstName: z.string().max(100).optional(),
  // Honeypot field - should always be empty
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request)

    // CSRF Protection: Validate request origin
    if (!validateOrigin(request)) {
      logSecurityEvent({
        type: 'csrf_violation',
        ip: clientIP,
        path: '/api/newsletter/subscribe',
        details: { origin: getRequestOrigin(request) },
      })
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      )
    }

    // Rate limiting: 3 requests per minute per IP
    const rateLimitResult = rateLimit(`newsletter:${clientIP}`, {
      maxRequests: 3,
      windowMs: 60000, // 1 minute
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/newsletter/subscribe', 3 - rateLimitResult.remaining)
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

    // Honeypot check - if filled, it's a bot
    if (body.website && body.website.length > 0) {
      logBotDetected(clientIP, '/api/newsletter/subscribe', 'honeypot')
      return NextResponse.json({ success: true })
    }

    // Validate input
    const validatedData = newsletterSchema.parse(body)

    // Sanitize inputs
    const data = {
      email: sanitizeEmail(validatedData.email),
      firstName: validatedData.firstName ? sanitizeString(validatedData.firstName) : undefined,
    }

    // Check for XSS attempts
    if (data.firstName && containsXSS(data.firstName)) {
      logXSSAttempt(clientIP, '/api/newsletter/subscribe', data.firstName)
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      )
    }

    // Check for spam email patterns
    if (isSpam(data.email)) {
      logSpamDetected(clientIP, '/api/newsletter/subscribe')
      return NextResponse.json({ success: true })
    }

    // Send welcome email and notification
    const { sendNewsletterWelcome } = await import('@/lib/email/send')
    const emailResult = await sendNewsletterWelcome(data)

    if (!emailResult.success) {
      logger.error('Newsletter signup email failed:', emailResult.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    logger.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
