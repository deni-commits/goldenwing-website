import { NextResponse } from 'next/server'

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body as Record<string, string>

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const teamEmail = process.env.TEAM_EMAIL || 'team@goldenwing.at'

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('SMTP not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Use nodemailer if available, otherwise log
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 465,
        secure: (Number(smtpPort) || 465) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      })

      await transporter.sendMail({
        from: `"GoldenWing Website" <${smtpUser}>`,
        to: teamEmail,
        replyTo: email,
        subject: `Kontaktanfrage von ${name}`,
        text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || '-'}\n\nNachricht:\n${message}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(phone || '-')}</p>
          <hr/>
          <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
        `,
      })
    } catch (mailError) {
      console.error('Mail send failed:', mailError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
