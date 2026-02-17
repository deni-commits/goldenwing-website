interface CustomerConfirmationEmailProps {
  name: string
  email: string
  phone?: string
  service: string
  message: string
  budget?: string
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

export const CustomerConfirmationEmail = ({
  name,
  service,
  message,
  budget,
}: CustomerConfirmationEmailProps): string => {
  const serviceLabel = getServiceLabel(service)
  const budgetLabel = budget ? getBudgetLabel(budget) : ''

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vielen Dank für Ihre Anfrage - GoldenWing Creative Studios</title>
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
                <!-- GoldenWing Logo Image -->
                <div style="margin-bottom: 24px;">
                  <a href="https://goldenwing.at" style="text-decoration: none;">
                    <img src="https://goldenwing.at/logo-email-white.png" alt="GoldenWing Creative Studios" width="200" height="auto" style="display: inline-block; max-width: 200px; height: auto;" />
                  </a>
                </div>
                <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
                  Vielen Dank für Ihre Anfrage
                </h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding: 40px; background-color: #1a1a1a;">
                <p style="font-size: 16px; line-height: 1.6; color: #e5e5e5; margin: 0 0 24px 0;">
                  Hallo <strong style="color: #ffffff;">${name}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #e5e5e5; margin: 0 0 24px 0;">
                  vielen Dank für Ihr Interesse an GoldenWing Creative Studios. Wir haben Ihre Anfrage erhalten und freuen uns sehr, von Ihrem Projekt zu hören!
                </p>

                <!-- Inquiry Summary Box -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #0a0a0a; border-radius: 12px; border: 1px solid #2a2a2a; margin: 0 0 24px 0;">
                  <tr>
                    <td style="padding: 24px;">
                      <h2 style="font-size: 18px; font-weight: 600; color: #ffffff; margin: 0 0 16px 0;">
                        Ihre Anfrage im Überblick
                      </h2>

                      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <div style="font-size: 12px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                              Gewünschte Leistung
                            </div>
                            <div style="font-size: 15px; color: #ffffff; font-weight: 500;">
                              ${serviceLabel}
                            </div>
                          </td>
                        </tr>

                        ${
                          budget
                            ? `<tr>
                          <td style="padding-bottom: 12px;">
                            <div style="font-size: 12px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                              Budget-Rahmen
                            </div>
                            <div style="font-size: 15px; color: #ffffff; font-weight: 500;">
                              ${budgetLabel}
                            </div>
                          </td>
                        </tr>`
                            : ''
                        }

                        <tr>
                          <td>
                            <div style="font-size: 12px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                              Ihre Nachricht
                            </div>
                            <div style="font-size: 15px; color: #e5e5e5; line-height: 1.6; white-space: pre-wrap;">
                              ${message}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Next Steps -->
                <div style="background-color: #f2fb31; padding: 24px; border-radius: 12px; margin: 0 0 24px 0;">
                  <h3 style="font-size: 16px; font-weight: 700; color: #0a0a0a; margin: 0 0 12px 0;">
                    Wie geht es weiter?
                  </h3>
                  <ul style="margin: 0; padding-left: 20px; color: #0a0a0a; font-size: 14px; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Wir prüfen Ihre Anfrage und melden uns innerhalb von <strong>24 Stunden</strong> bei Ihnen</li>
                    <li style="margin-bottom: 8px;">In einem kostenlosen Erstgespräch besprechen wir Ihre Ziele und Wünsche</li>
                    <li>Sie erhalten ein unverbindliches Angebot, das genau auf Ihr Projekt zugeschnitten ist</li>
                  </ul>
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: #e5e5e5; margin: 0 0 24px 0;">
                  Bei dringenden Fragen können Sie uns auch direkt kontaktieren:
                </p>

                <!-- Contact Information -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 0 0 24px 0;">
                  <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #2a2a2a;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-right: 16px; vertical-align: middle;">
                            <div style="width: 44px; height: 44px; background-color: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 10px; text-align: center; line-height: 44px;">
                              <span style="color: #f2fb31; font-size: 18px;">@</span>
                            </div>
                          </td>
                          <td style="vertical-align: middle;">
                            <div style="font-size: 12px; color: #888888; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.5px;">E-Mail</div>
                            <a href="mailto:deni@goldenwing.at" style="font-size: 15px; color: #ffffff; text-decoration: none; font-weight: 500;">
                              deni@goldenwing.at
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #2a2a2a;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-right: 16px; vertical-align: middle;">
                            <div style="width: 44px; height: 44px; background-color: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 10px; text-align: center; line-height: 44px;">
                              <span style="color: #f2fb31; font-size: 18px;">T</span>
                            </div>
                          </td>
                          <td style="vertical-align: middle;">
                            <div style="font-size: 12px; color: #888888; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.5px;">Telefon</div>
                            <a href="tel:+436645439681" style="font-size: 15px; color: #ffffff; text-decoration: none; font-weight: 500;">
                              +43 664 543 96 81
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-right: 16px; vertical-align: middle;">
                            <div style="width: 44px; height: 44px; background-color: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 10px; text-align: center; line-height: 44px;">
                              <span style="color: #f2fb31; font-size: 18px;">W</span>
                            </div>
                          </td>
                          <td style="vertical-align: middle;">
                            <div style="font-size: 12px; color: #888888; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.5px;">Website</div>
                            <a href="https://goldenwing.at" style="font-size: 15px; color: #ffffff; text-decoration: none; font-weight: 500;">
                              goldenwing.at
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 16px; line-height: 1.6; color: #e5e5e5; margin: 0;">
                  Wir freuen uns darauf, mit Ihnen zu arbeiten!
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #e5e5e5; margin: 16px 0 0 0;">
                  Mit freundlichen Grüßen,<br />
                  <strong style="color: #f2fb31;">Ihr GoldenWing Team</strong>
                </p>
              </td>
            </tr>

            <!-- Social Media Links -->
            <tr>
              <td style="padding: 24px 40px; background-color: #0a0a0a; border-top: 1px solid #2a2a2a;">
                <p style="font-size: 13px; color: #888888; margin: 0 0 16px 0; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
                  Folgen Sie uns
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    <td style="padding: 0 6px;">
                      <a href="https://www.facebook.com/goldenwing.at" style="display: inline-block; width: 40px; height: 40px; background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; text-align: center; line-height: 40px; text-decoration: none; color: #f2fb31; font-size: 14px; font-weight: bold;">
                        f
                      </a>
                    </td>
                    <td style="padding: 0 6px;">
                      <a href="https://www.instagram.com/goldenwing.at" style="display: inline-block; width: 40px; height: 40px; background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; text-align: center; line-height: 40px; text-decoration: none; color: #f2fb31; font-size: 14px; font-weight: bold;">
                        IG
                      </a>
                    </td>
                    <td style="padding: 0 6px;">
                      <a href="https://www.linkedin.com/company/goldenwing-creative-studios/" style="display: inline-block; width: 40px; height: 40px; background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; text-align: center; line-height: 40px; text-decoration: none; color: #f2fb31; font-size: 14px; font-weight: bold;">
                        in
                      </a>
                    </td>
                    <td style="padding: 0 6px;">
                      <a href="https://wa.me/message/DTMCVZBIQJ3FH1" style="display: inline-block; width: 40px; height: 40px; background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; text-align: center; line-height: 40px; text-decoration: none; color: #f2fb31; font-size: 14px; font-weight: bold;">
                        WA
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 32px 40px; background-color: #0a0a0a; text-align: center; border-top: 1px solid #2a2a2a;">
                <p style="font-size: 14px; color: #888888; margin: 0 0 8px 0;">
                  <strong style="color: #f2fb31;">GoldenWing Creative Studios</strong>
                </p>
                <p style="font-size: 13px; color: #666666; margin: 0 0 16px 0; line-height: 1.6;">
                  Premium Branding & Digital Solutions<br />
                  Wien, Österreich
                </p>
                <p style="font-size: 12px; color: #555555; margin: 0; line-height: 1.5;">
                  © 2025 GoldenWing Creative Studios. Alle Rechte vorbehalten.<br />
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
