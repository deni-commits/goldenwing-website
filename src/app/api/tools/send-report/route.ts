import logger from '@/lib/logger'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeEmail } from '@/lib/security/sanitize'
import { sendSeoReportEmail } from '@/lib/email'

const reportSchema = z.object({
  email: z.string().email(),
  toolType: z.enum(['seo', 'performance', 'design', 'security', 'website']),
  websiteUrl: z.string().url(),
  score: z.number().min(0).max(100),
  criticalIssues: z.number().min(0),
  warningIssues: z.number().min(0),
  passedChecks: z.number().min(0),
  issues: z.array(z.object({
    severity: z.enum(['critical', 'warning', 'info', 'passed']),
    title: z.string(),
    description: z.string(),
  })),
  title: z.object({
    value: z.string().nullable(),
    length: z.number(),
    status: z.enum(['good', 'warning', 'error']),
  }).optional(),
  description: z.object({
    value: z.string().nullable(),
    length: z.number(),
    status: z.enum(['good', 'warning', 'error']),
  }).optional(),
})

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request)

    // Rate limiting: 5 report emails per hour per IP
    const rateLimitResult = rateLimit(`send-report:${clientIP}`, {
      maxRequests: 5,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = reportSchema.parse(body)

    // Sanitize email
    const email = sanitizeEmail(validatedData.email)

    // Map issues to email format (filter out 'info' severity)
    const emailIssues = validatedData.issues
      .filter(issue => issue.severity !== 'info')
      .map(issue => ({
        severity: issue.severity === 'passed' ? 'passed' as const :
                  issue.severity === 'critical' ? 'critical' as const : 'warning' as const,
        title: issue.title,
        description: issue.description,
      }))

    // Send the email based on tool type
    if (validatedData.toolType === 'seo') {
      const result = await sendSeoReportEmail({
        email,
        websiteUrl: validatedData.websiteUrl,
        score: validatedData.score,
        criticalIssues: validatedData.criticalIssues,
        warningIssues: validatedData.warningIssues,
        passedChecks: validatedData.passedChecks,
        issues: emailIssues,
        title: validatedData.title,
        description: validatedData.description,
      })

      if (!result.success) {
        logger.error('Failed to send report email:', result.error)
        // Don't fail the request - email is a bonus
        return NextResponse.json({
          success: true,
          emailSent: false,
          message: 'Report unlocked but email could not be sent'
        })
      }

      return NextResponse.json({ success: true, emailSent: true })
    }

    // For other tool types, we can add more email templates later
    return NextResponse.json({ success: true, emailSent: false, message: 'Email template not yet available for this tool' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }

    logger.error('Send report error:', error)
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    )
  }
}
