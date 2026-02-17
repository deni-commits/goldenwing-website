import { z } from 'zod'
import nodemailer from 'nodemailer'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logXSSAttempt } from '@/lib/security/logging'

// SMTP Configuration
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

const transporter = SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass
  ? nodemailer.createTransport(SMTP_CONFIG)
  : null

// Validation schema
const chatLeadSchema = z.object({
  name: z.string().min(1).max(100),
  contact: z.string().min(1).max(200), // Email or phone
  summary: z.string().max(2000).optional(),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).max(50),
})

function formatChatHistory(history: { role: string; content: string }[]): string {
  return history
    .map((msg) => `${msg.role === 'user' ? '👤 Kunde' : '🤖 Bot'}: ${msg.content}`)
    .join('\n\n')
}

function generateEmailHtml(data: {
  name: string
  contact: string
  summary?: string
  chatHistory: { role: string; content: string }[]
  timestamp: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f2fb31 0%, #e6ef2d 100%); padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; color: #000; font-size: 20px; }
    .content { background: #fff; border: 1px solid #e0e0e0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .field-label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .field-value { margin-top: 4px; font-size: 16px; }
    .chat-history { background: #f9f9f9; border-radius: 8px; padding: 15px; margin-top: 20px; }
    .chat-message { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee; }
    .chat-message:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .user-msg { color: #1a73e8; }
    .bot-msg { color: #666; }
    .summary { background: #fffde7; border-left: 4px solid #f2fb31; padding: 15px; margin: 15px 0; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Neue Chat-Anfrage</h1>
  </div>
  <div class="content">
    <div class="field">
      <div class="field-label">Name</div>
      <div class="field-value">${data.name}</div>
    </div>

    <div class="field">
      <div class="field-label">Kontakt</div>
      <div class="field-value">${data.contact}</div>
    </div>

    <div class="field">
      <div class="field-label">Datum</div>
      <div class="field-value">${data.timestamp}</div>
    </div>

    ${data.summary ? `
    <div class="summary">
      <div class="field-label">Zusammenfassung</div>
      <div class="field-value">${data.summary}</div>
    </div>
    ` : ''}

    <div class="chat-history">
      <div class="field-label" style="margin-bottom: 15px;">Chat-Verlauf</div>
      ${data.chatHistory.map((msg) => `
        <div class="chat-message ${msg.role === 'user' ? 'user-msg' : 'bot-msg'}">
          <strong>${msg.role === 'user' ? '👤 Kunde' : '🤖 Bot'}:</strong><br>
          ${msg.content.replace(/\n/g, '<br>')}
        </div>
      `).join('')}
    </div>

    <div class="footer">
      Gesendet via GoldenWing Chatbot
    </div>
  </div>
</body>
</html>
`
}

export async function POST(req: Request) {
  try {
    const clientIP = getClientIP(req)

    // Rate limiting: 5 lead submissions per hour per IP
    const rateLimitResult = rateLimit(`chat-lead:${clientIP}`, {
      maxRequests: 5,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/chat-lead', 5 - rateLimitResult.remaining)
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()

    // Validate request
    const validationResult = chatLeadSchema.safeParse(body)
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format', details: validationResult.error.issues }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { name, contact, summary, chatHistory } = validationResult.data

    // Check for XSS
    if (containsXSS(name) || containsXSS(contact) || (summary && containsXSS(summary))) {
      logXSSAttempt(clientIP, '/api/chat-lead', `${name} ${contact}`)
      return new Response(
        JSON.stringify({ error: 'Invalid content detected' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeString(name),
      contact: sanitizeString(contact),
      summary: summary ? sanitizeString(summary) : undefined,
      chatHistory: chatHistory.map((msg) => ({
        role: msg.role,
        content: sanitizeString(msg.content),
      })),
    }

    const timestamp = new Date().toLocaleString('de-AT', {
      timeZone: 'Europe/Vienna',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    // Check if email is configured
    if (!transporter) {
      // SMTP not configured - still return success to not break UX
      // In production, leads are tracked via analytics/CRM
      return new Response(
        JSON.stringify({ success: true, warning: 'Email service not configured' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Generate and send email
    const emailHtml = generateEmailHtml({
      ...sanitizedData,
      timestamp,
    })

    const result = await transporter.sendMail({
      from: `GoldenWing Chatbot <${process.env.SMTP_USER || 'office@goldenwing.at'}>`,
      to: process.env.TEAM_EMAIL || 'deni@goldenwing.at, benedikt@goldenwing.at',
      replyTo: sanitizedData.contact.includes('@') ? sanitizedData.contact : undefined,
      subject: `Neue Chat-Anfrage: ${sanitizedData.name}`,
      html: emailHtml,
      text: `
NEUE ANFRAGE VIA CHATBOT

Name: ${sanitizedData.name}
Kontakt: ${sanitizedData.contact}
Datum: ${timestamp}

${sanitizedData.summary ? `ZUSAMMENFASSUNG:\n${sanitizedData.summary}\n\n` : ''}
CHAT-VERLAUF:
${formatChatHistory(sanitizedData.chatHistory)}

---
Gesendet via GoldenWing Chatbot
      `.trim(),
    })

    return new Response(
      JSON.stringify({ success: true, messageId: result.messageId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch {
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
