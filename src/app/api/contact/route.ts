import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, sanitizeEmail, sanitizePhone, isSpam, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logBotDetected, logXSSAttempt, logSpamDetected, logSecurityEvent } from '@/lib/security/logging'
import { validateOrigin, getRequestOrigin } from '@/lib/security/csrf'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional(),
  service: z.string().min(1).max(50),
  message: z.string().min(10).max(5000),
  budget: z.string().max(50).optional(),
  privacy: z.boolean().refine((val) => val === true),
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
        path: '/api/contact',
        details: { origin: getRequestOrigin(request) },
      })
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      )
    }

    // Rate limiting: 5 requests per minute per IP
    const rateLimitResult = rateLimit(`contact:${clientIP}`, {
      maxRequests: 5,
      windowMs: 60000, // 1 minute
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/contact', 5 - rateLimitResult.remaining)
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
      // Silently reject but return success to fool bots
      logBotDetected(clientIP, '/api/contact', 'honeypot')
      return NextResponse.json({ success: true })
    }

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Sanitize all inputs
    const data = {
      name: sanitizeString(validatedData.name),
      email: sanitizeEmail(validatedData.email),
      phone: validatedData.phone ? sanitizePhone(validatedData.phone) : undefined,
      service: sanitizeString(validatedData.service),
      message: sanitizeString(validatedData.message),
      budget: validatedData.budget ? sanitizeString(validatedData.budget) : undefined,
      privacy: validatedData.privacy,
    }

    // Check for XSS attempts
    const allText = `${data.name} ${data.message}`
    if (containsXSS(allText)) {
      logXSSAttempt(clientIP, '/api/contact', allText)
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      )
    }

    // Check for spam
    if (isSpam(data.message) || isSpam(data.name)) {
      logSpamDetected(clientIP, '/api/contact')
      // Return success to fool spammers
      return NextResponse.json({ success: true })
    }

    // TODO: Save to Supabase when configured
    // const supabase = await createClient()
    // await supabase.from('leads').insert({
    //   name: data.name,
    //   email: data.email,
    //   phone: data.phone,
    //   service: data.service,
    //   message: data.message,
    //   budget: data.budget,
    //   source: 'contact_form',
    //   ip_address: clientIP,
    // })

    // Send email notifications
    const { sendContactFormEmails } = await import('@/lib/email/send')
    const emailResult = await sendContactFormEmails(data, {
      ipAddress: clientIP,
    })

    if (!emailResult.success) {
      // Email sending failed - continue anyway, tracked via emailResult.error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Don't expose validation details to prevent information disclosure
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
