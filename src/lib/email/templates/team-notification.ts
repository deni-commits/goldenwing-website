interface TeamNotificationEmailProps {
  name: string
  email: string
  phone?: string
  service: string
  message: string
  budget?: string
  submittedAt: string
  ipAddress: string
}

const getServiceLabel = (service: string): string => {
  const labels: Record<string, string> = {
    branding: 'Branding',
    webdesign: 'Webdesign',
    seo: 'SEO & Sichtbarkeit',
    strategie: 'Digitale Strategie',
    content: 'Content & Visuals',
    software: 'Software-Entwicklung',
    other: 'Sonstiges',
  }
  return labels[service] || service
}

const getBudgetLabel = (budget: string): string => {
  const labels: Record<string, string> = {
    '<5000': 'Unter 5.000 €',
    '5000-10000': '5.000 – 10.000 €',
    '10000-25000': '10.000 – 25.000 €',
    '>25000': 'Über 25.000 €',
    unsure: 'Noch unklar',
  }
  return labels[budget] || budget
}

const getUrgencyColor = (budget: string): string => {
  if (budget === '>25000') return '#16a34a' // green-600
  if (budget === '10000-25000') return '#D4A574' // gold
  return '#6b7280' // gray-500
}

export const TeamNotificationEmail = ({
  name,
  email,
  phone,
  service,
  message,
  budget,
  submittedAt,
  ipAddress,
}: TeamNotificationEmailProps): string => {
  const serviceLabel = getServiceLabel(service)
  const budgetLabel = budget ? getBudgetLabel(budget) : ''
  const urgencyColor = budget ? getUrgencyColor(budget) : '#6b7280'

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neue Projektanfrage - ${name}</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 40px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); overflow: hidden;">

            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td>
                      <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
                        Neue Projektanfrage
                      </h1>
                      <p style="color: #D4A574; font-size: 14px; margin: 8px 0 0 0; font-weight: 500;">
                        ${submittedAt}
                      </p>
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-block; padding: 8px 16px; background-color: ${urgencyColor}; border-radius: 6px; color: #ffffff; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${serviceLabel}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Alert Banner -->
            <tr>
              <td style="background-color: #fef3c7; padding: 16px 40px; border-bottom: 1px solid #fde68a;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="width: 32px; vertical-align: middle; font-size: 24px;">⚡</td>
                    <td style="vertical-align: middle;">
                      <p style="font-size: 14px; color: #92400e; margin: 0; font-weight: 600;">
                        Bitte innerhalb von 24 Stunden antworten!
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Customer Information -->
            <tr>
              <td style="padding: 32px 40px;">
                <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 2px solid #D4A574;">
                  Kundendaten
                </h2>

                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 24px;">
                  <tr>
                    <td style="width: 50%; padding: 12px 16px 12px 0;">
                      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Name</div>
                      <div style="font-size: 16px; color: #1f2937; font-weight: 600;">${name}</div>
                    </td>
                    <td style="width: 50%; padding: 12px 0 12px 16px;">
                      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Leistung</div>
                      <div style="font-size: 16px; color: #1f2937; font-weight: 600;">${serviceLabel}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 12px 16px 12px 0; border-top: 1px solid #e5e7eb;">
                      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">E-Mail</div>
                      <div style="font-size: 15px; color: #1f2937;">
                        <a href="mailto:${email}" style="color: #D4A574; text-decoration: none; font-weight: 500;">${email}</a>
                      </div>
                    </td>
                    <td style="padding: 12px 0 12px 16px; border-top: 1px solid #e5e7eb;">
                      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Telefon</div>
                      <div style="font-size: 15px; color: #1f2937;">
                        ${
                          phone
                            ? `<a href="tel:${phone}" style="color: #D4A574; text-decoration: none; font-weight: 500;">${phone}</a>`
                            : '<span style="color: #9ca3af; font-style: italic;">Nicht angegeben</span>'
                        }
                      </div>
                    </td>
                  </tr>

                  ${
                    budget
                      ? `<tr>
                    <td colspan="2" style="padding: 12px 0; border-top: 1px solid #e5e7eb;">
                      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Budget-Rahmen</div>
                      <div style="font-size: 16px; color: #1f2937; font-weight: 600;">${budgetLabel}</div>
                    </td>
                  </tr>`
                      : ''
                  }
                </table>

                <!-- Project Description -->
                <h3 style="font-size: 18px; font-weight: 600; color: #1f2937; margin: 32px 0 16px 0; padding-bottom: 12px; border-bottom: 2px solid #D4A574;">
                  Projektbeschreibung
                </h3>

                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                  <p style="font-size: 15px; line-height: 1.7; color: #374151; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>

                <!-- Quick Actions -->
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                  <h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 0 0 16px 0;">Schnellaktionen</h3>

                  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                    <tr>
                      <td style="padding: 0 8px 0 0;">
                        <a href="mailto:${email}?subject=Re:%20Ihre%20Anfrage%20bei%20GoldenWing%20Creative%20Studios&body=Hallo%20${name},%0D%0A%0D%0AVielen%20Dank%20für%20Ihre%20Anfrage%20bezüglich%20${serviceLabel}.%0D%0A%0D%0A" style="display: block; background-color: #D4A574; color: #ffffff; text-align: center; padding: 14px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(212, 165, 116, 0.3);">
                          E-Mail beantworten
                        </a>
                      </td>
                      ${
                        phone
                          ? `<td style="padding: 0 0 0 8px;">
                        <a href="tel:${phone}" style="display: block; background-color: #1f2937; color: #ffffff; text-align: center; padding: 14px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                          Anrufen
                        </a>
                      </td>`
                          : ''
                      }
                    </tr>
                  </table>
                </div>

                <!-- Next Steps Checklist -->
                <div style="margin-top: 32px; background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px;">
                  <h3 style="font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Nächste Schritte</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.6;">
                    <li style="margin-bottom: 6px;">Lead in CRM eintragen</li>
                    <li style="margin-bottom: 6px;">Erstgespräch innerhalb 24h vereinbaren</li>
                    <li style="margin-bottom: 6px;">Projektunterlagen vorbereiten</li>
                    <li>Follow-up Reminder setzen</li>
                  </ul>
                </div>
              </td>
            </tr>

            <!-- Technical Details Footer -->
            <tr>
              <td style="padding: 20px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="font-size: 12px; color: #6b7280;"><strong>Eingereicht:</strong> ${submittedAt}</td>
                    <td style="font-size: 12px; color: #6b7280; text-align: right;"><strong>IP:</strong> ${ipAddress}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 24px 40px; background-color: #1a1a1a; text-align: center;">
                <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                  <strong style="color: #D4A574;">GoldenWing Creative Studios</strong> - Internal Notification System
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
