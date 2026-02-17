/**
 * Security Analyzer - Checks SSL, security headers, and best practices
 */

import * as https from 'https'
import * as tls from 'tls'

export interface SecurityAnalysisResult {
  score: number
  url: string

  // HTTPS
  https: {
    enabled: boolean
    redirectsToHttps: boolean
    status: 'good' | 'warning' | 'error'
  }

  // SSL Certificate
  ssl: {
    valid: boolean
    issuer: string | null
    subject: string | null
    validFrom: string | null
    validTo: string | null
    daysUntilExpiry: number | null
    protocol: string | null
    status: 'good' | 'warning' | 'error'
  }

  // Security Headers
  headers: {
    strictTransportSecurity: {
      present: boolean
      value: string | null
      maxAge: number | null
      includesSubdomains: boolean
      preload: boolean
      status: 'good' | 'warning' | 'error'
    }
    contentSecurityPolicy: {
      present: boolean
      value: string | null
      status: 'good' | 'warning' | 'error'
    }
    xFrameOptions: {
      present: boolean
      value: string | null
      status: 'good' | 'warning' | 'error'
    }
    xContentTypeOptions: {
      present: boolean
      value: string | null
      status: 'good' | 'warning' | 'error'
    }
    xXssProtection: {
      present: boolean
      value: string | null
      status: 'good' | 'warning' | 'error'
    }
    referrerPolicy: {
      present: boolean
      value: string | null
      status: 'good' | 'warning' | 'error'
    }
    permissionsPolicy: {
      present: boolean
      value: string | null
      status: 'good' | 'warning' | 'error'
    }
  }

  // Cookies
  cookies: {
    found: number
    secure: number
    httpOnly: number
    sameSite: number
    status: 'good' | 'warning' | 'error'
  }

  // Mixed Content
  mixedContent: {
    found: boolean
    count: number
    status: 'good' | 'warning' | 'error'
  }

  // HTTP/2 Support
  http2: {
    supported: boolean
    protocol: string | null
    status: 'good' | 'info' | 'warning'
  }

  // Issues
  issues: SecurityIssue[]
  totalIssues: number
  criticalIssues: number
  warningIssues: number
  passedChecks: number
}

export interface SecurityIssue {
  id: string
  category: 'security'
  severity: 'critical' | 'warning' | 'info' | 'passed'
  title: string
  description: string
  howToFix?: string
}

async function checkSSL(hostname: string): Promise<{
  valid: boolean
  issuer: string | null
  subject: string | null
  validFrom: string | null
  validTo: string | null
  daysUntilExpiry: number | null
  protocol: string | null
  alpnProtocol: string | null
  checkFailed: boolean
}> {
  return new Promise((resolve) => {
    const options = {
      host: hostname,
      port: 443,
      method: 'GET',
      rejectUnauthorized: true, // Validate certificates properly
      timeout: 15000, // Increased timeout
      servername: hostname, // Important for SNI
    }

    const req = https.request(options, (res) => {
      const socket = res.socket as tls.TLSSocket
      const cert = socket.getPeerCertificate()
      const protocol = socket.getProtocol()
      const alpnProtocol = socket.alpnProtocol || null

      if (cert && Object.keys(cert).length > 0) {
        const validTo = new Date(cert.valid_to)
        const now = new Date()
        const daysUntilExpiry = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        resolve({
          valid: socket.authorized,
          issuer: cert.issuer?.O || cert.issuer?.CN || null,
          subject: cert.subject?.CN || null,
          validFrom: cert.valid_from || null,
          validTo: cert.valid_to || null,
          daysUntilExpiry,
          protocol,
          alpnProtocol,
          checkFailed: false,
        })
      } else {
        resolve({
          valid: false,
          issuer: null,
          subject: null,
          validFrom: null,
          validTo: null,
          daysUntilExpiry: null,
          protocol: null,
          alpnProtocol: null,
          checkFailed: true,
        })
      }
    })

    req.on('error', (_err) => {
      // If rejectUnauthorized: true fails, try again without validation to get cert info
      const retryOptions = {
        host: hostname,
        port: 443,
        method: 'GET',
        rejectUnauthorized: false,
        timeout: 10000,
        servername: hostname,
      }

      const retryReq = https.request(retryOptions, (res) => {
        const socket = res.socket as tls.TLSSocket
        const cert = socket.getPeerCertificate()
        const protocol = socket.getProtocol()
        const alpnProtocol = socket.alpnProtocol || null

        if (cert && Object.keys(cert).length > 0) {
          const validTo = new Date(cert.valid_to)
          const now = new Date()
          const daysUntilExpiry = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

          // Certificate exists but is invalid (original error was cert validation)
          resolve({
            valid: false,
            issuer: cert.issuer?.O || cert.issuer?.CN || null,
            subject: cert.subject?.CN || null,
            validFrom: cert.valid_from || null,
            validTo: cert.valid_to || null,
            daysUntilExpiry,
            protocol,
            alpnProtocol,
            checkFailed: false,
          })
        } else {
          resolve({
            valid: false,
            issuer: null,
            subject: null,
            validFrom: null,
            validTo: null,
            daysUntilExpiry: null,
            protocol: null,
            alpnProtocol: null,
            checkFailed: true,
          })
        }
      })

      retryReq.on('error', () => {
        // Complete failure - network issue or no SSL at all
        resolve({
          valid: false,
          issuer: null,
          subject: null,
          validFrom: null,
          validTo: null,
          daysUntilExpiry: null,
          protocol: null,
          alpnProtocol: null,
          checkFailed: true,
        })
      })

      retryReq.on('timeout', () => {
        retryReq.destroy()
        resolve({
          valid: false,
          issuer: null,
          subject: null,
          validFrom: null,
          validTo: null,
          daysUntilExpiry: null,
          protocol: null,
          alpnProtocol: null,
          checkFailed: true,
        })
      })

      retryReq.end()
    })

    req.on('timeout', () => {
      req.destroy()
      resolve({
        valid: false,
        issuer: null,
        subject: null,
        validFrom: null,
        validTo: null,
        daysUntilExpiry: null,
        protocol: null,
        alpnProtocol: null,
        checkFailed: true,
      })
    })

    req.end()
  })
}

export async function analyzeSecurity(url: string): Promise<SecurityAnalysisResult> {
  const urlObj = new URL(url)
  const isHttps = urlObj.protocol === 'https:'
  const hostname = urlObj.hostname

  // Fetch the page to get headers
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; GoldenWingBot/1.0; +https://goldenwing.at)',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  })

  const headers = response.headers
  const html = await response.text()

  // Check HTTPS redirect
  let redirectsToHttps = false
  if (!isHttps) {
    try {
      const httpsUrl = url.replace('http://', 'https://')
      const httpsResponse = await fetch(httpsUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      })
      redirectsToHttps = httpsResponse.ok
    } catch {
      redirectsToHttps = false
    }
  }

  // Check SSL
  const ssl = await checkSSL(hostname)

  // Parse security headers
  const hstsValue = headers.get('strict-transport-security')
  const cspValue = headers.get('content-security-policy')
  const xFrameValue = headers.get('x-frame-options')
  const xContentTypeValue = headers.get('x-content-type-options')
  const xXssValue = headers.get('x-xss-protection')
  const referrerValue = headers.get('referrer-policy')
  const permissionsValue = headers.get('permissions-policy') || headers.get('feature-policy')

  // Parse HSTS
  let hstsMaxAge: number | null = null
  let hstsIncludesSubdomains = false
  let hstsPreload = false
  if (hstsValue) {
    const maxAgeMatch = hstsValue.match(/max-age=(\d+)/i)
    if (maxAgeMatch) hstsMaxAge = parseInt(maxAgeMatch[1], 10)
    hstsIncludesSubdomains = hstsValue.toLowerCase().includes('includesubdomains')
    hstsPreload = hstsValue.toLowerCase().includes('preload')
  }

  // Check for mixed content in HTML
  const mixedContentPatterns = [
    /src=["']http:\/\//gi,
    /href=["']http:\/\/[^"']*\.(css|js)/gi,
    /url\(["']?http:\/\//gi,
  ]
  let mixedContentCount = 0
  for (const pattern of mixedContentPatterns) {
    const matches = html.match(pattern)
    if (matches) mixedContentCount += matches.length
  }

  // Parse cookies from set-cookie headers
  const setCookieHeaders = headers.getSetCookie?.() || []
  const cookieStats = {
    found: setCookieHeaders.length,
    secure: 0,
    httpOnly: 0,
    sameSite: 0,
  }
  for (const cookie of setCookieHeaders) {
    if (cookie.toLowerCase().includes('secure')) cookieStats.secure++
    if (cookie.toLowerCase().includes('httponly')) cookieStats.httpOnly++
    if (cookie.toLowerCase().includes('samesite')) cookieStats.sameSite++
  }

  // Build issues list
  const issues: SecurityIssue[] = []

  // HTTPS Check
  if (!isHttps && !redirectsToHttps) {
    issues.push({
      id: 'https-missing',
      category: 'security',
      severity: 'critical',
      title: 'HTTPS nicht aktiviert',
      description: 'Die Website verwendet kein HTTPS. Daten werden unverschlüsselt übertragen.',
      howToFix: 'Installieren Sie ein SSL-Zertifikat und leiten Sie HTTP auf HTTPS um.',
    })
  } else if (!isHttps && redirectsToHttps) {
    issues.push({
      id: 'https-redirect',
      category: 'security',
      severity: 'warning',
      title: 'HTTP leitet zu HTTPS weiter',
      description: 'HTTP ist noch erreichbar, leitet aber zu HTTPS weiter.',
      howToFix: 'Konfigurieren Sie eine permanente 301-Weiterleitung von HTTP zu HTTPS.',
    })
  } else {
    issues.push({
      id: 'https-ok',
      category: 'security',
      severity: 'passed',
      title: 'HTTPS aktiviert',
      description: 'Die Website verwendet HTTPS für sichere Verbindungen.',
    })
  }

  // SSL Check
  if (ssl.checkFailed) {
    // Could not complete SSL check - don't mark as invalid, just info
    issues.push({
      id: 'ssl-check-failed',
      category: 'security',
      severity: 'info',
      title: 'SSL-Prüfung nicht abgeschlossen',
      description: 'Die SSL-Zertifikatsprüfung konnte nicht durchgeführt werden (Netzwerk-Timeout).',
    })
  } else if (!ssl.valid) {
    issues.push({
      id: 'ssl-invalid',
      category: 'security',
      severity: 'critical',
      title: 'SSL-Zertifikat ungültig',
      description: ssl.issuer
        ? `Das SSL-Zertifikat von "${ssl.issuer}" ist ungültig oder nicht vertrauenswürdig.`
        : 'Das SSL-Zertifikat ist ungültig oder nicht vertrauenswürdig.',
      howToFix: 'Erneuern Sie das Zertifikat oder verwenden Sie einen vertrauenswürdigen Aussteller wie Let\'s Encrypt.',
    })
  } else if (ssl.daysUntilExpiry !== null && ssl.daysUntilExpiry < 30) {
    issues.push({
      id: 'ssl-expiring',
      category: 'security',
      severity: 'warning',
      title: 'SSL-Zertifikat läuft bald ab',
      description: `Das Zertifikat läuft in ${ssl.daysUntilExpiry} Tagen ab.`,
      howToFix: 'Erneuern Sie das SSL-Zertifikat rechtzeitig.',
    })
  } else {
    issues.push({
      id: 'ssl-ok',
      category: 'security',
      severity: 'passed',
      title: 'SSL-Zertifikat gültig',
      description: ssl.daysUntilExpiry
        ? `Gültig für ${ssl.daysUntilExpiry} Tage. Aussteller: ${ssl.issuer || 'Unbekannt'}`
        : 'Zertifikat ist gültig.',
    })
  }

  // HSTS Check
  if (!hstsValue) {
    issues.push({
      id: 'hsts-missing',
      category: 'security',
      severity: 'warning',
      title: 'HSTS Header fehlt',
      description: 'Strict-Transport-Security Header ist nicht gesetzt.',
      howToFix: 'Fügen Sie den Header hinzu: Strict-Transport-Security: max-age=31536000; includeSubDomains',
    })
  } else if (hstsMaxAge && hstsMaxAge < 31536000) {
    issues.push({
      id: 'hsts-short',
      category: 'security',
      severity: 'warning',
      title: 'HSTS max-age zu kurz',
      description: `max-age ist ${hstsMaxAge}s. Empfohlen: mindestens 1 Jahr (31536000s).`,
      howToFix: 'Erhöhen Sie max-age auf mindestens 31536000 (1 Jahr).',
    })
  } else {
    issues.push({
      id: 'hsts-ok',
      category: 'security',
      severity: 'passed',
      title: 'HSTS konfiguriert',
      description: `max-age: ${hstsMaxAge}s${hstsIncludesSubdomains ? ', includeSubDomains' : ''}${hstsPreload ? ', preload' : ''}`,
    })
  }

  // CSP Check
  if (!cspValue) {
    issues.push({
      id: 'csp-missing',
      category: 'security',
      severity: 'warning',
      title: 'Content-Security-Policy fehlt',
      description: 'CSP Header ist nicht gesetzt. Schutz vor XSS ist eingeschränkt.',
      howToFix: 'Implementieren Sie eine Content-Security-Policy für Ihre Website.',
    })
  } else {
    issues.push({
      id: 'csp-ok',
      category: 'security',
      severity: 'passed',
      title: 'Content-Security-Policy aktiv',
      description: 'CSP ist konfiguriert und schützt vor XSS-Angriffen.',
    })
  }

  // X-Frame-Options Check
  if (!xFrameValue) {
    issues.push({
      id: 'xframe-missing',
      category: 'security',
      severity: 'warning',
      title: 'X-Frame-Options fehlt',
      description: 'Die Seite kann in Frames eingebettet werden (Clickjacking-Risiko).',
      howToFix: 'Fügen Sie hinzu: X-Frame-Options: DENY oder SAMEORIGIN',
    })
  } else {
    issues.push({
      id: 'xframe-ok',
      category: 'security',
      severity: 'passed',
      title: 'X-Frame-Options gesetzt',
      description: `Wert: ${xFrameValue}`,
    })
  }

  // X-Content-Type-Options Check
  if (!xContentTypeValue) {
    issues.push({
      id: 'xcontent-missing',
      category: 'security',
      severity: 'warning',
      title: 'X-Content-Type-Options fehlt',
      description: 'MIME-Type Sniffing ist nicht deaktiviert.',
      howToFix: 'Fügen Sie hinzu: X-Content-Type-Options: nosniff',
    })
  } else {
    issues.push({
      id: 'xcontent-ok',
      category: 'security',
      severity: 'passed',
      title: 'X-Content-Type-Options gesetzt',
      description: 'MIME-Type Sniffing ist deaktiviert.',
    })
  }

  // Referrer-Policy Check
  if (!referrerValue) {
    issues.push({
      id: 'referrer-missing',
      category: 'security',
      severity: 'info',
      title: 'Referrer-Policy fehlt',
      description: 'Keine Referrer-Policy gesetzt. Browser-Standard wird verwendet.',
      howToFix: 'Fügen Sie hinzu: Referrer-Policy: strict-origin-when-cross-origin',
    })
  } else {
    issues.push({
      id: 'referrer-ok',
      category: 'security',
      severity: 'passed',
      title: 'Referrer-Policy gesetzt',
      description: `Wert: ${referrerValue}`,
    })
  }

  // Mixed Content Check
  if (mixedContentCount > 0) {
    issues.push({
      id: 'mixed-content',
      category: 'security',
      severity: 'warning',
      title: 'Mixed Content gefunden',
      description: `${mixedContentCount} HTTP-Ressourcen auf HTTPS-Seite gefunden.`,
      howToFix: 'Ändern Sie alle HTTP-URLs zu HTTPS oder verwenden Sie protocol-relative URLs.',
    })
  } else if (isHttps) {
    issues.push({
      id: 'mixed-content-ok',
      category: 'security',
      severity: 'passed',
      title: 'Kein Mixed Content',
      description: 'Alle Ressourcen werden über HTTPS geladen.',
    })
  }

  // Cookie Security Check (only if cookies found)
  if (cookieStats.found > 0) {
    const insecureCookies = cookieStats.found - cookieStats.secure
    if (insecureCookies > 0 && isHttps) {
      issues.push({
        id: 'cookies-insecure',
        category: 'security',
        severity: 'warning',
        title: 'Cookies ohne Secure-Flag',
        description: `${insecureCookies} von ${cookieStats.found} Cookies haben kein Secure-Flag.`,
        howToFix: 'Setzen Sie das Secure-Flag für alle Cookies auf HTTPS-Seiten.',
      })
    } else {
      issues.push({
        id: 'cookies-ok',
        category: 'security',
        severity: 'passed',
        title: 'Cookie-Sicherheit',
        description: `${cookieStats.found} Cookies gefunden, ${cookieStats.secure} mit Secure-Flag.`,
      })
    }
  }

  // HTTP/2 Check
  const isHttp2 = ssl.alpnProtocol === 'h2' || ssl.alpnProtocol === 'h2c'
  if (isHttp2) {
    issues.push({
      id: 'http2-ok',
      category: 'security',
      severity: 'passed',
      title: 'HTTP/2 unterstützt',
      description: `Server unterstützt HTTP/2 (${ssl.alpnProtocol}). Bessere Performance und Sicherheit.`,
    })
  } else if (ssl.alpnProtocol) {
    issues.push({
      id: 'http2-not-supported',
      category: 'security',
      severity: 'info',
      title: 'HTTP/2 nicht aktiviert',
      description: `Server verwendet ${ssl.alpnProtocol}. HTTP/2 bietet bessere Performance.`,
      howToFix: 'Aktivieren Sie HTTP/2 in Ihrer Webserver-Konfiguration (Nginx, Apache, etc.).',
    })
  }

  // Calculate score (don't count info items like check-failed)
  let score = 100
  const criticalCount = issues.filter(i => i.severity === 'critical').length
  const warningCount = issues.filter(i => i.severity === 'warning').length
  const passedCount = issues.filter(i => i.severity === 'passed').length

  score -= criticalCount * 25
  score -= warningCount * 8 // Reduced from 10 - warnings are less severe
  score = Math.max(0, Math.min(100, score))

  // Determine statuses
  const httpsStatus: 'good' | 'warning' | 'error' = !isHttps && !redirectsToHttps ? 'error' : !isHttps ? 'warning' : 'good'
  const sslStatus: 'good' | 'warning' | 'error' = ssl.checkFailed ? 'warning' : !ssl.valid ? 'error' : (ssl.daysUntilExpiry !== null && ssl.daysUntilExpiry < 30) ? 'warning' : 'good'
  const hstsStatus: 'good' | 'warning' | 'error' = !hstsValue ? 'warning' : (hstsMaxAge && hstsMaxAge < 31536000) ? 'warning' : 'good'
  const cspStatus: 'good' | 'warning' | 'error' = cspValue ? 'good' : 'warning'
  const xFrameStatus: 'good' | 'warning' | 'error' = xFrameValue ? 'good' : 'warning'
  const xContentStatus: 'good' | 'warning' | 'error' = xContentTypeValue ? 'good' : 'warning'
  const referrerStatus: 'good' | 'warning' | 'error' = referrerValue ? 'good' : 'warning'
  const permissionsStatus: 'good' | 'warning' | 'error' = permissionsValue ? 'good' : 'warning'
  const mixedContentStatus: 'good' | 'warning' | 'error' = mixedContentCount > 0 ? 'warning' : 'good'
  const cookieStatus: 'good' | 'warning' | 'error' = cookieStats.found === 0 ? 'good' : (cookieStats.secure === cookieStats.found) ? 'good' : 'warning'

  return {
    score,
    url,
    https: {
      enabled: isHttps,
      redirectsToHttps,
      status: httpsStatus,
    },
    ssl: {
      valid: ssl.valid,
      issuer: ssl.issuer,
      subject: ssl.subject,
      validFrom: ssl.validFrom,
      validTo: ssl.validTo,
      daysUntilExpiry: ssl.daysUntilExpiry,
      protocol: ssl.protocol,
      status: sslStatus,
    },
    headers: {
      strictTransportSecurity: {
        present: !!hstsValue,
        value: hstsValue,
        maxAge: hstsMaxAge,
        includesSubdomains: hstsIncludesSubdomains,
        preload: hstsPreload,
        status: hstsStatus,
      },
      contentSecurityPolicy: {
        present: !!cspValue,
        value: cspValue,
        status: cspStatus,
      },
      xFrameOptions: {
        present: !!xFrameValue,
        value: xFrameValue,
        status: xFrameStatus,
      },
      xContentTypeOptions: {
        present: !!xContentTypeValue,
        value: xContentTypeValue,
        status: xContentStatus,
      },
      xXssProtection: {
        present: !!xXssValue,
        value: xXssValue,
        status: xXssValue ? 'good' : 'warning',
      },
      referrerPolicy: {
        present: !!referrerValue,
        value: referrerValue,
        status: referrerStatus,
      },
      permissionsPolicy: {
        present: !!permissionsValue,
        value: permissionsValue,
        status: permissionsStatus,
      },
    },
    cookies: {
      ...cookieStats,
      status: cookieStatus,
    },
    mixedContent: {
      found: mixedContentCount > 0,
      count: mixedContentCount,
      status: mixedContentStatus,
    },
    http2: {
      supported: isHttp2,
      protocol: ssl.alpnProtocol,
      status: isHttp2 ? 'good' : 'info',
    },
    issues: issues.filter(i => i.severity !== 'info'),
    totalIssues: issues.length,
    criticalIssues: criticalCount,
    warningIssues: warningCount,
    passedChecks: passedCount,
  }
}
