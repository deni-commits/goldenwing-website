export interface SeoReportEmailProps {
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

function getScoreColor(score: number): string {
  if (score >= 90) return '#22c55e' // green
  if (score >= 70) return '#f2fb31' // yellow (brand)
  if (score >= 50) return '#f97316' // orange
  return '#ef4444' // red
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Ausgezeichnet'
  if (score >= 70) return 'Gut'
  if (score >= 50) return 'Verbesserungsbedarf'
  return 'Kritisch'
}

function getSeverityIcon(severity: string): string {
  switch (severity) {
    case 'critical':
      return '&#10060;' // red X
    case 'warning':
      return '&#9888;' // warning triangle
    case 'passed':
      return '&#9989;' // green check
    default:
      return ''
  }
}

function _getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return '#ef4444'
    case 'warning':
      return '#f97316'
    case 'passed':
      return '#22c55e'
    default:
      return '#888888'
  }
}

export const SeoReportEmail = ({
  websiteUrl,
  score,
  criticalIssues,
  warningIssues,
  passedChecks,
  issues,
  title,
  description,
}: SeoReportEmailProps): string => {
  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  // Sort issues: critical first, then warnings, then passed
  const sortedIssues = [...issues].sort((a, b) => {
    const order = { critical: 0, warning: 1, passed: 2 }
    return (order[a.severity] ?? 3) - (order[b.severity] ?? 3)
  })

  // Take top 10 issues for email
  const topIssues = sortedIssues.slice(0, 10)

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SEO Analyse Report - ${websiteUrl}</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 40px 20px;">
          <!-- Main Container -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

            <!-- Header with Logo -->
            <tr>
              <td style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 40px 40px 32px; text-align: center; border-bottom: 1px solid #f2fb31;">
                <div style="margin-bottom: 24px;">
                  <a href="https://goldenwing.at" style="text-decoration: none;">
                    <img src="https://goldenwing.at/logo-email-white.png" alt="GoldenWing Creative Studios" width="200" height="auto" style="display: inline-block; max-width: 200px; height: auto;" />
                  </a>
                </div>
                <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">
                  SEO Analyse Report
                </h1>
                <p style="color: #888888; font-size: 14px; margin: 0;">
                  ${websiteUrl}
                </p>
              </td>
            </tr>

            <!-- Score Section -->
            <tr>
              <td style="padding: 40px; background-color: #1a1a1a; text-align: center;">
                <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; border: 8px solid ${scoreColor}; text-align: center; line-height: 104px;">
                  <span style="font-size: 48px; font-weight: 700; color: ${scoreColor};">${score}</span>
                </div>
                <p style="color: ${scoreColor}; font-size: 18px; font-weight: 600; margin: 16px 0 0 0;">
                  ${scoreLabel}
                </p>
                <p style="color: #888888; font-size: 14px; margin: 8px 0 0 0;">
                  von 100 Punkten
                </p>
              </td>
            </tr>

            <!-- Summary Stats -->
            <tr>
              <td style="padding: 0 40px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #0a0a0a; border-radius: 12px; overflow: hidden;">
                  <tr>
                    <td style="width: 33.33%; padding: 20px; text-align: center; border-right: 1px solid #2a2a2a;">
                      <div style="font-size: 28px; font-weight: 700; color: #ef4444;">${criticalIssues}</div>
                      <div style="font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Kritisch</div>
                    </td>
                    <td style="width: 33.33%; padding: 20px; text-align: center; border-right: 1px solid #2a2a2a;">
                      <div style="font-size: 28px; font-weight: 700; color: #f97316;">${warningIssues}</div>
                      <div style="font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Warnungen</div>
                    </td>
                    <td style="width: 33.33%; padding: 20px; text-align: center;">
                      <div style="font-size: 28px; font-weight: 700; color: #22c55e;">${passedChecks}</div>
                      <div style="font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Bestanden</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            ${title || description ? `
            <!-- Meta Tags Preview -->
            <tr>
              <td style="padding: 0 40px 32px;">
                <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">Meta-Tags Vorschau</h2>
                <div style="background-color: #ffffff; border-radius: 8px; padding: 16px; font-family: Arial, sans-serif;">
                  ${title?.value ? `<div style="color: #1a0dab; font-size: 18px; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${title.value}</div>` : '<div style="color: #999999; font-size: 18px; margin-bottom: 4px;">Kein Title gefunden</div>'}
                  <div style="color: #006621; font-size: 14px; margin-bottom: 4px;">${websiteUrl}</div>
                  ${description?.value ? `<div style="color: #545454; font-size: 14px; line-height: 1.4;">${description.value.substring(0, 160)}${description.value.length > 160 ? '...' : ''}</div>` : '<div style="color: #999999; font-size: 14px;">Keine Description gefunden</div>'}
                </div>
              </td>
            </tr>
            ` : ''}

            <!-- Issues List -->
            <tr>
              <td style="padding: 0 40px 32px;">
                <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">Gefundene Probleme</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  ${topIssues.map(issue => `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a;">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td style="width: 24px; vertical-align: top; padding-right: 12px;">
                            <span style="font-size: 16px;">${getSeverityIcon(issue.severity)}</span>
                          </td>
                          <td>
                            <div style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 4px;">${issue.title}</div>
                            <div style="font-size: 13px; color: #888888; line-height: 1.4;">${issue.description}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  `).join('')}
                </table>
                ${issues.length > 10 ? `<p style="color: #888888; font-size: 13px; margin: 16px 0 0 0; text-align: center;">+ ${issues.length - 10} weitere Checks im vollstandigen Report</p>` : ''}
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td style="padding: 0 40px 40px; text-align: center;">
                <a href="https://goldenwing.at/kontakt?ref=seo-report&url=${encodeURIComponent(websiteUrl)}" style="display: inline-block; background-color: #f2fb31; color: #000000; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
                  Kostenlose Beratung anfragen
                </a>
                <p style="color: #888888; font-size: 13px; margin: 16px 0 0 0;">
                  Wir helfen Ihnen, diese Probleme zu beheben
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 32px 40px; background-color: #0a0a0a; text-align: center; border-top: 1px solid #2a2a2a;">
                <p style="font-size: 14px; color: #888888; margin: 0 0 8px 0;">
                  <strong style="color: #f2fb31;">GoldenWing Creative Studios</strong>
                </p>
                <p style="font-size: 13px; color: #666666; margin: 0 0 16px 0; line-height: 1.6;">
                  SEO, Webdesign & Digital Marketing<br />
                  Wien &middot; Dubai &middot; California
                </p>
                <p style="font-size: 12px; color: #555555; margin: 0; line-height: 1.5;">
                  &copy; ${new Date().getFullYear()} GoldenWing Creative Studios. Alle Rechte vorbehalten.<br />
                  <a href="https://goldenwing.at/datenschutz" style="color: #f2fb31; text-decoration: none;">Datenschutz</a>
                  <span style="color: #333333;"> | </span>
                  <a href="https://goldenwing.at/impressum" style="color: #f2fb31; text-decoration: none;">Impressum</a>
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
