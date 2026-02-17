import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, sanitizeEmail, isSpam, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logSpamDetected, logXSSAttempt, logSecurityEvent } from '@/lib/security/logging'
import { validateOrigin, getRequestOrigin } from '@/lib/security/csrf'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

const leadSchema = z.object({
  email: z.string().email().max(255),
  website: z.string().url().max(500),
  newsletterConsent: z.boolean().default(false),
  source: z.enum([
    'exit-intent-popup',
    'contact-form',
    'newsletter',
    'landing-page',
    'seo-checker',
    'performance-checker',
    'design-analyzer',
    'security-checker',
    'website-analyzer',
    'seo-performance',
    'website-design',
    'security-check',
    'other'
  ]).default('exit-intent-popup'),
  consentTimestamp: z.string().datetime().optional(),
})

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request)

    // CSRF Protection: Validate request origin
    if (!validateOrigin(request)) {
      logSecurityEvent({
        type: 'csrf_violation',
        ip: clientIP,
        path: '/api/leads',
        details: { origin: getRequestOrigin(request) },
      })
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      )
    }

    // Rate limiting: 3 requests per hour per IP for lead generation
    const rateLimitResult = rateLimit(`leads:${clientIP}`, {
      maxRequests: 3,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/leads', 3 - rateLimitResult.remaining)
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

    // Validate input
    const validatedData = leadSchema.parse(body)

    // Sanitize inputs
    const data = {
      email: sanitizeEmail(validatedData.email),
      website: sanitizeString(validatedData.website),
      newsletterConsent: validatedData.newsletterConsent,
      source: validatedData.source,
      consentTimestamp: validatedData.consentTimestamp || new Date().toISOString(),
    }

    // Check for XSS attempts
    if (containsXSS(data.email) || containsXSS(data.website)) {
      logXSSAttempt(clientIP, '/api/leads', `${data.email} ${data.website}`)
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      )
    }

    // Check for spam in email domain
    const spamDomains = ['tempmail', 'guerrillamail', '10minutemail', 'throwaway']
    const emailDomain = data.email.split('@')[1]?.toLowerCase() || ''
    if (spamDomains.some(spam => emailDomain.includes(spam)) || isSpam(data.email)) {
      logSpamDetected(clientIP, '/api/leads')
      // Return success to fool spammers
      return NextResponse.json({ success: true })
    }

    // Save to Payload CMS
    const payload = await getPayload({ config })

    // Check if lead already exists
    const existingLead = await payload.find({
      collection: 'leads',
      where: {
        email: { equals: data.email },
      },
      limit: 1,
    })

    if (existingLead.docs.length > 0) {
      // Update existing lead if they opted into newsletter
      if (data.newsletterConsent && !existingLead.docs[0].newsletterConsent) {
        await payload.update({
          collection: 'leads',
          id: existingLead.docs[0].id,
          data: {
            newsletterConsent: true,
            consentTimestamp: data.consentTimestamp,
          },
        })
      }
      return NextResponse.json({ success: true, message: 'Lead updated' })
    }

    // Create new lead
    await payload.create({
      collection: 'leads',
      data: {
        email: data.email,
        website: data.website,
        newsletterConsent: data.newsletterConsent,
        source: data.source,
        consentTimestamp: data.consentTimestamp,
        status: 'new',
      },
    })

    // Send notification emails (user confirmation + team notification)
    try {
      const { sendLeadNotificationEmail } = await import('@/lib/email/send')
      await sendLeadNotificationEmail(data)
    } catch {
      // Email failure should not fail the lead creation
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input. Please check your form data.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
