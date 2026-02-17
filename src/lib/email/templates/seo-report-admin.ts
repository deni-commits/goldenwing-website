export interface SeoReportAdminEmailProps {
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
}

function getScoreColor(score: number): string {
  if (score >= 90) return '#22c55e'
  if (score >= 70) return '#f2fb31'
  if (score >= 50) return '#f97316'
  return '#ef4444'
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Ausgezeichnet'
  if (score >= 70) return 'Gut'
  if (score >= 50) return 'Verbesserungsbedarf'
  return 'Kritisch'
}

function getPriorityBadge(score: number): { text: string; color: string; bg: string } {
  if (score <= 50) return { text: 'HOT LEAD', color: '#ffffff', bg: '#ef4444' }
  if (score <= 70) return { text: 'Warm Lead', color: '#000000', bg: '#f97316' }
  return { text: 'Lead', color: '#000000', bg: '#22c55e' }
}

export const SeoReportAdminEmail = ({
  email,
  websiteUrl,
  score,
  criticalIssues,
  warningIssues,
  passedChecks,
  issues,
}: SeoReportAdminEmailProps): string => {
  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)
  const priority = getPriorityBadge(score)

  const topIssues = issues
    .filter(i => i.severity === 'critical' || i.severity === 'warning')
    .slice(0, 5)

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- Header -->
            <tr>
              <td style="background-color: #0a0a0a; padding: 24px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td>
                      <span style="display: inline-block; background-color: ${priority.bg}; color: ${priority.color}; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${priority.text}
                      </span>
                      <h1 style="color: #ffffff; font-size: 22px; margin: 12px 0 0 0; font-weight: 600;">
                        Neuer SEO-Report Lead
                      </h1>
                    </td>
                    <td style="text-align: right; vertical-align: top;">
                      <div style="display: inline-block; width: 60px; height: 60px; border-radius: 50%; border: 4px solid ${scoreColor}; text-align: center; line-height: 52px; background-color: #1a1a1a;">
                        <span style="font-size: 22px; font-weight: 700; color: ${scoreColor};">${score}</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Lead Info -->
            <tr>
              <td style="padding: 24px 32px; border-bottom: 1px solid #eee;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="padding-bottom: 16px;">
                      <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">E-Mail</div>
                      <a href="mailto:${email}" style="color: #0a0a0a; font-size: 16px; font-weight: 600; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Website analysiert</div>
                      <a href="${websiteUrl}" style="color: #0a0a0a; font-size: 16px; text-decoration: none;" target="_blank">${websiteUrl}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Score Summary -->
            <tr>
              <td style="padding: 24px 32px; border-bottom: 1px solid #eee;">
                <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">Analyse-Ergebnis: <strong style="color: ${scoreColor};">${scoreLabel}</strong></div>
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="width: 33.33%; text-align: center; padding: 16px; background-color: #fef2f2; border-radius: 8px 0 0 8px;">
                      <div style="font-size: 28px; font-weight: 700; color: #ef4444;">${criticalIssues}</div>
                      <div style="font-size: 11px; color: #666; text-transform: uppercase;">Kritisch</div>
                    </td>
                    <td style="width: 33.33%; text-align: center; padding: 16px; background-color: #fff7ed;">
                      <div style="font-size: 28px; font-weight: 700; color: #f97316;">${warningIssues}</div>
                      <div style="font-size: 11px; color: #666; text-transform: uppercase;">Warnungen</div>
                    </td>
                    <td style="width: 33.33%; text-align: center; padding: 16px; background-color: #f0fdf4; border-radius: 0 8px 8px 0;">
                      <div style="font-size: 28px; font-weight: 700; color: #22c55e;">${passedChecks}</div>
                      <div style="font-size: 11px; color: #666; text-transform: uppercase;">Bestanden</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            ${topIssues.length > 0 ? `
            <!-- Top Issues -->
            <tr>
              <td style="padding: 24px 32px; border-bottom: 1px solid #eee;">
                <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">Hauptprobleme</div>
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  ${topIssues.map(issue => `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                      <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${issue.severity === 'critical' ? '#ef4444' : '#f97316'}; margin-right: 8px;"></span>
                      <span style="font-size: 14px; color: #333;">${issue.title}</span>
                    </td>
                  </tr>
                  `).join('')}
                </table>
              </td>
            </tr>
            ` : ''}

            <!-- Quick Actions -->
            <tr>
              <td style="padding: 24px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="padding-right: 8px; width: 50%;">
                      <a href="mailto:${email}?subject=Ihr%20SEO-Report%20f%C3%BCr%20${encodeURIComponent(websiteUrl)}&body=Hallo,%0A%0Avielen%20Dank%20f%C3%BCr%20Ihr%20Interesse%20an%20unserem%20SEO-Report.%0A%0AIch%20habe%20mir%20die%20Analyse%20Ihrer%20Website%20${encodeURIComponent(websiteUrl)}%20angeschaut%20und%20w%C3%BCrde%20gerne%20die%20Ergebnisse%20mit%20Ihnen%20besprechen.%0A%0AWann%20h%C3%A4tten%20Sie%20Zeit%20f%C3%BCr%20ein%20kurzes%20Telefonat?%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen" style="display: block; background-color: #0a0a0a; color: #ffffff; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center;">
                        Kontaktieren
                      </a>
                    </td>
                    <td style="padding-left: 8px; width: 50%;">
                      <a href="${websiteUrl}" style="display: block; background-color: #f5f5f5; color: #333; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center;" target="_blank">
                        Website ansehen
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 16px 32px; background-color: #f9fafb; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                  ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna', dateStyle: 'long', timeStyle: 'short' })}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
