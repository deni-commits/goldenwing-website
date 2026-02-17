import logger from '@/lib/logger'
import nodemailer from 'nodemailer'
import { CustomerConfirmationEmail } from './templates/customer-confirmation'
import { TeamNotificationEmail } from './templates/team-notification'
import { SeoReportEmail, type SeoReportEmailProps } from './templates/seo-report'
import { SeoReportAdminEmail } from './templates/seo-report-admin'
import { generateSeoReportPdf } from './pdf-generator'

// SMTP Configuration for Google Workspace
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

// Create transporter only if credentials are available
const transporter = SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass
  ? nodemailer.createTransport(SMTP_CONFIG)
  : null

// Email configuration
// Team email can be overridden via TEAM_EMAIL env variable
const EMAIL_CONFIG = {
  from: `GoldenWing Creative Studios <${process.env.SMTP_USER || 'office@goldenwing.at'}>`,
  teamEmail: process.env.TEAM_EMAIL || 'deni@goldenwing.at, benedikt@goldenwing.at',
  replyTo: process.env.REPLY_TO_EMAIL || 'deni@goldenwing.at',
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service: string
  message: string
  budget?: string
}

interface SendEmailsResult {
  success: boolean
  customerEmailId?: string
  teamEmailId?: string
  error?: string
}

/**
 * Sanitize email to prevent header injection attacks
 */
function sanitizeEmailHeader(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[\r\n]/g, '')
    .replace(/[^a-z0-9@._+-]/g, '')
}

/**
 * Sends confirmation email to the customer
 */
export async function sendCustomerConfirmation(
  data: ContactFormData
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  try {
    if (!transporter) {
      logger.warn('SMTP not configured - skipping customer confirmation email')
      return { success: false, error: 'Email service not configured' }
    }

    const emailHtml = CustomerConfirmationEmail(data)

    const result = await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: sanitizeEmailHeader(data.email),
      replyTo: EMAIL_CONFIG.replyTo,
      subject: 'Vielen Dank für Ihre Anfrage - GoldenWing Creative Studios',
      html: emailHtml,
    })

    return { success: true, emailId: result.messageId }
  } catch (error) {
    logger.error('Error sending customer confirmation:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Sends notification email to the team
 */
export async function sendTeamNotification(
  data: ContactFormData,
  metadata: {
    ipAddress: string
    submittedAt: string
  }
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  try {
    if (!transporter) {
      logger.warn('SMTP not configured - skipping team notification email')
      return { success: false, error: 'Email service not configured' }
    }

    const emailHtml = TeamNotificationEmail({
      ...data,
      submittedAt: metadata.submittedAt,
      ipAddress: metadata.ipAddress,
    })

    const result = await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.teamEmail,
      replyTo: sanitizeEmailHeader(data.email),
      subject: `Neue Projektanfrage: ${data.service} - ${data.name}`,
      html: emailHtml,
    })

    return { success: true, emailId: result.messageId }
  } catch (error) {
    logger.error('Error sending team notification:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Newsletter subscription data
 */
export interface NewsletterData {
  email: string
  firstName?: string
}

/**
 * Sends welcome email to newsletter subscriber and notification to team
 */
export async function sendNewsletterWelcome(
  data: NewsletterData
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!transporter) {
      logger.warn('SMTP not configured - skipping newsletter welcome email')
      return { success: false, error: 'Email service not configured' }
    }

    const name = data.firstName || 'there'

    // Send welcome email to subscriber
    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: sanitizeEmailHeader(data.email),
      replyTo: EMAIL_CONFIG.replyTo,
      subject: 'Willkommen beim GoldenWing Newsletter! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: #000000; border-radius: 12px; overflow: hidden;">
              <div style="padding: 40px; text-align: center;">
                <h1 style="color: #f2fb31; font-size: 28px; margin: 0 0 20px 0;">
                  Willkommen, ${name}! 🎉
                </h1>
                <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                  Vielen Dank für Ihre Newsletter-Anmeldung! Ab jetzt erhalten Sie regelmäßig wertvolle Insights zu Branding, Webdesign, SEO und digitalem Marketing.
                </p>
                <div style="background-color: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                  <h3 style="color: #f2fb31; font-size: 16px; margin: 0 0 15px 0;">Das erwartet Sie:</h3>
                  <ul style="color: #cccccc; font-size: 14px; text-align: left; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Exklusive Tipps & Best Practices</li>
                    <li>Aktuelle Trends aus der Branche</li>
                    <li>Case Studies & Erfolgsgeschichten</li>
                    <li>Kostenlose Tools & Ressourcen</li>
                  </ul>
                </div>
                <a href="https://goldenwing.at/blog" style="display: inline-block; background-color: #f2fb31; color: #000000; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  Blog entdecken
                </a>
              </div>
              <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                <p style="color: #666666; font-size: 12px; margin: 0;">
                  © ${new Date().getFullYear()} GoldenWing Creative Studios<br>
                  Wien · Dubai · California
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Send notification to team
    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.teamEmail,
      subject: `📬 Neuer Newsletter-Abonnent: ${data.email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Neuer Newsletter-Abonnent</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.firstName ? `<p><strong>Name:</strong> ${data.firstName}</p>` : ''}
          <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })}</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    logger.error('Error sending newsletter welcome email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * SEO Report data interface
 */
export interface SeoReportData {
  email: string
  websiteUrl: string
  score: number
  criticalIssues: number
  warningIssues: number
  passedChecks: number
  issues: Array<{
    severity: 'critical' | 'warning' | 'passed'
    title: string
    description: string
  }>
  title?: {
    value: string | null
    length: number
    status: 'good' | 'warning' | 'error'
  }
  description?: {
    value: string | null
    length: number
    status: 'good' | 'warning' | 'error'
  }
}

/**
 * Sends SEO report email to user and notification to team
 */
export async function sendSeoReportEmail(
  data: SeoReportData
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!transporter) {
      logger.warn('SMTP not configured - skipping SEO report email')
      return { success: false, error: 'Email service not configured' }
    }

    const emailHtml = SeoReportEmail(data as SeoReportEmailProps)

    // Generate PDF report
    let pdfBuffer: Buffer | null = null
    try {
      pdfBuffer = await generateSeoReportPdf({
        websiteUrl: data.websiteUrl,
        score: data.score,
        criticalIssues: data.criticalIssues,
        warningIssues: data.warningIssues,
        passedChecks: data.passedChecks,
        issues: data.issues,
        title: data.title,
        description: data.description,
      })
    } catch (pdfError) {
      logger.error('Failed to generate PDF:', pdfError)
      // Continue without PDF
    }

    // Extract domain for filename
    const domain = new URL(data.websiteUrl).hostname.replace(/^www\./, '')

    // Send report to user with PDF attachment
    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: sanitizeEmailHeader(data.email),
      replyTo: EMAIL_CONFIG.replyTo,
      subject: `SEO Analyse Report: ${data.score}/100 - ${data.websiteUrl}`,
      html: emailHtml,
      attachments: pdfBuffer ? [
        {
          filename: `SEO-Report-${domain}-${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ] : undefined,
    })

    // Send notification to team with nice template
    const adminEmailHtml = SeoReportAdminEmail({
      email: data.email,
      websiteUrl: data.websiteUrl,
      score: data.score,
      criticalIssues: data.criticalIssues,
      warningIssues: data.warningIssues,
      passedChecks: data.passedChecks,
      issues: data.issues,
    })

    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.teamEmail,
      replyTo: sanitizeEmailHeader(data.email),
      subject: `${data.score <= 50 ? '🔥' : data.score <= 70 ? '📊' : '✅'} SEO-Report Lead: ${data.score}/100 - ${data.websiteUrl}`,
      html: adminEmailHtml,
    })

    return { success: true }
  } catch (error) {
    logger.error('Error sending SEO report email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Lead notification data
 */
export interface LeadNotificationData {
  email: string
  website: string
  source: string
  newsletterConsent: boolean
}

/**
 * Sends notification emails for new leads (exit-intent popup, etc.)
 */
export async function sendLeadNotificationEmail(
  data: LeadNotificationData
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!transporter) {
      logger.warn('SMTP not configured - skipping lead notification email')
      return { success: false, error: 'Email service not configured' }
    }

    const sourceLabels: Record<string, string> = {
      'exit-intent-popup': 'Exit-Intent Popup',
      'seo-checker': 'SEO Checker',
      'performance-checker': 'Performance Checker',
      'design-analyzer': 'Design Analyzer',
      'security-checker': 'Security Checker',
      'website-analyzer': 'Website Analyzer',
      'contact-form': 'Kontaktformular',
      'newsletter': 'Newsletter',
      'landing-page': 'Landing Page',
      'other': 'Sonstige',
    }

    const sourceLabel = sourceLabels[data.source] || data.source

    // Send confirmation to user
    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: sanitizeEmailHeader(data.email),
      replyTo: EMAIL_CONFIG.replyTo,
      subject: 'Ihr kostenloses SEO-Audit ist unterwegs!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border-radius: 16px;">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 50px 40px 30px 40px; text-align: center;">
                      <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;">
                        Vielen Dank für Ihre Anfrage!
                      </h1>
                      <p style="color: #a0a0a0; font-size: 16px; line-height: 1.5; margin: 0;">
                        Wir haben Ihre Anfrage für ein kostenloses SEO-Audit erhalten.
                      </p>
                    </td>
                  </tr>
                  <!-- Content Box -->
                  <tr>
                    <td style="padding: 0 40px 30px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; border: 1px solid #333333;">
                        <tr>
                          <td style="padding: 25px;">
                            <p style="color: #888888; font-size: 13px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">Website</p>
                            <p style="color: #ffffff; font-size: 16px; margin: 0 0 25px 0; word-break: break-all;">
                              <a href="${data.website}" style="color: #60a5fa; text-decoration: none;">${data.website}</a>
                            </p>
                            <p style="color: #888888; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Was passiert jetzt?</p>
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 6px 0; color: #22c55e; font-size: 14px;">✓</td>
                                <td style="padding: 6px 0 6px 10px; color: #d0d0d0; font-size: 14px;">Unser Team analysiert Ihre Website</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #22c55e; font-size: 14px;">✓</td>
                                <td style="padding: 6px 0 6px 10px; color: #d0d0d0; font-size: 14px;">Sie erhalten innerhalb von 48 Stunden Ihren Report</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #22c55e; font-size: 14px;">✓</td>
                                <td style="padding: 6px 0 6px 10px; color: #d0d0d0; font-size: 14px;">Inklusive konkreter Handlungsempfehlungen</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- CTA Button -->
                  <tr>
                    <td style="padding: 0 40px 40px 40px; text-align: center;">
                      <a href="https://goldenwing.at/tools" style="display: inline-block; background-color: #ffffff; color: #000000; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                        Unsere Tools entdecken →
                      </a>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 25px 40px; border-top: 1px solid #222222; text-align: center;">
                      <p style="color: #666666; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} GoldenWing Creative Studios<br>
                        Wien · Dubai · California
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    // Send notification to team
    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.teamEmail,
      replyTo: sanitizeEmailHeader(data.email),
      subject: `Neuer Lead: ${sourceLabel} - ${data.website}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
            <tr>
              <td align="center" style="padding: 30px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border-radius: 16px;">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 35px 35px 25px 35px;">
                      <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0;">
                        🎯 Neuer Lead eingegangen!
                      </h1>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 0 35px 25px 35px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; border: 1px solid #333333;">
                        <tr>
                          <td style="padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 10px 0; color: #888888; font-size: 13px; width: 100px; vertical-align: top;">Quelle:</td>
                                <td style="padding: 10px 0; color: #22c55e; font-size: 14px; font-weight: 600;">${sourceLabel}</td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0; color: #888888; font-size: 13px; vertical-align: top;">E-Mail:</td>
                                <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none; font-size: 14px;">${data.email}</a></td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0; color: #888888; font-size: 13px; vertical-align: top;">Website:</td>
                                <td style="padding: 10px 0;"><a href="${data.website}" target="_blank" style="color: #60a5fa; text-decoration: none; font-size: 14px; word-break: break-all;">${data.website}</a></td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0; color: #888888; font-size: 13px; vertical-align: top;">Newsletter:</td>
                                <td style="padding: 10px 0; color: ${data.newsletterConsent ? '#22c55e' : '#666666'}; font-size: 14px;">${data.newsletterConsent ? '✓ Ja' : '✗ Nein'}</td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0; color: #888888; font-size: 13px; vertical-align: top;">Zeitpunkt:</td>
                                <td style="padding: 10px 0; color: #d0d0d0; font-size: 14px;">${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- CTA Button -->
                  <tr>
                    <td style="padding: 0 35px 30px 35px;">
                      <a href="https://goldenwing.at/admin/collections/leads" style="display: inline-block; background-color: #ffffff; color: #000000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                        Im Admin öffnen →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return { success: true }
  } catch (error) {
    logger.error('Error sending lead notification email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Sends both customer confirmation and team notification emails
 */
export async function sendContactFormEmails(
  data: ContactFormData,
  metadata: {
    ipAddress: string
  }
): Promise<SendEmailsResult> {
  const submittedAt = new Date().toLocaleString('de-AT', {
    timeZone: 'Europe/Vienna',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  try {
    // Send both emails in parallel
    const [customerResult, teamResult] = await Promise.allSettled([
      sendCustomerConfirmation(data),
      sendTeamNotification(data, {
        ...metadata,
        submittedAt,
      }),
    ])

    // Check results
    const customerSuccess =
      customerResult.status === 'fulfilled' && customerResult.value.success
    const teamSuccess = teamResult.status === 'fulfilled' && teamResult.value.success

    // Log any failures
    if (!customerSuccess) {
      logger.error(
        'Customer email failed:',
        customerResult.status === 'fulfilled'
          ? customerResult.value.error
          : customerResult.reason
      )
    }

    if (!teamSuccess) {
      logger.error(
        'Team email failed:',
        teamResult.status === 'fulfilled' ? teamResult.value.error : teamResult.reason
      )
    }

    // Return results
    return {
      success: customerSuccess || teamSuccess,
      customerEmailId:
        customerResult.status === 'fulfilled' ? customerResult.value.emailId : undefined,
      teamEmailId: teamResult.status === 'fulfilled' ? teamResult.value.emailId : undefined,
      error:
        !customerSuccess && !teamSuccess
          ? 'Failed to send both emails'
          : !customerSuccess
            ? 'Customer email failed'
            : !teamSuccess
              ? 'Team email failed'
              : undefined,
    }
  } catch (error) {
    logger.error('Unexpected error sending emails:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
