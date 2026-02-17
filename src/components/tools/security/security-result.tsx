'use client'

import {
  Shield,
  Lock,
  FileWarning,
  Cookie,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScoreRing, ScoreBar } from '@/components/tools/shared'

interface SecurityResultProps {
  result: {
    url: string
    score: number
    https: {
      enabled: boolean
      redirectsToHttps: boolean
      status: 'good' | 'warning' | 'error'
    }
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
    cookies: {
      found: number
      secure: number
      httpOnly: number
      sameSite: number
      status: 'good' | 'warning' | 'error'
    }
    mixedContent: {
      found: boolean
      count: number
      status: 'good' | 'warning' | 'error'
    }
    totalIssues: number
    criticalIssues: number
    warningIssues: number
    passedChecks: number
  }
  isLocked?: boolean
  locale?: string
}

interface HeaderCheckProps {
  name: string
  present: boolean
  value: string | null
  status: 'good' | 'warning' | 'error'
  isLocked?: boolean
}

function HeaderCheck({ name, present, value, status, isLocked }: HeaderCheckProps) {
  const StatusIcon = status === 'good' ? CheckCircle2 : status === 'warning' ? AlertTriangle : XCircle
  const statusColor = status === 'good' ? 'text-green-500' : status === 'warning' ? 'text-orange-500' : 'text-red-500'
  const bgColor = status === 'good' ? 'bg-green-50 dark:bg-green-950/20' : status === 'warning' ? 'bg-orange-50 dark:bg-orange-950/20' : 'bg-red-50 dark:bg-red-950/20'

  return (
    <div className={cn('p-3 rounded-lg', bgColor)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-sm font-medium">{name}</span>
        <StatusIcon className={cn('h-4 w-4 flex-shrink-0', statusColor)} />
      </div>
      {present && value && (
        <p className={cn(
          'text-xs text-muted-foreground mt-1 truncate font-mono',
          isLocked && 'blur-sm'
        )}>
          {value.length > 50 ? value.substring(0, 50) + '...' : value}
        </p>
      )}
      {!present && (
        <p className="text-xs text-muted-foreground mt-1">
          Nicht gesetzt
        </p>
      )}
    </div>
  )
}

export function SecurityResult({ result, isLocked = false, locale = 'de' }: SecurityResultProps) {
  const t = locale === 'de' ? {
    summary: 'Zusammenfassung',
    criticalIssues: 'Kritisch',
    warnings: 'Warnungen',
    passed: 'Bestanden',
    httpsSSL: 'HTTPS & SSL',
    https: 'HTTPS',
    httpsEnabled: 'Aktiviert',
    httpsDisabled: 'Nicht aktiviert',
    sslCertificate: 'SSL-Zertifikat',
    valid: 'Gültig',
    invalid: 'Ungültig',
    issuer: 'Aussteller',
    expiresIn: 'Läuft ab in',
    days: 'Tagen',
    protocol: 'Protokoll',
    securityHeaders: 'Security Headers',
    cookies: 'Cookies',
    cookiesFound: 'Cookies gefunden',
    secureFlag: 'Secure Flag',
    httpOnlyFlag: 'HttpOnly Flag',
    sameSiteFlag: 'SameSite Flag',
    mixedContent: 'Mixed Content',
    noMixedContent: 'Kein Mixed Content',
    mixedContentFound: 'HTTP-Ressourcen gefunden',
  } : {
    summary: 'Summary',
    criticalIssues: 'Critical',
    warnings: 'Warnings',
    passed: 'Passed',
    httpsSSL: 'HTTPS & SSL',
    https: 'HTTPS',
    httpsEnabled: 'Enabled',
    httpsDisabled: 'Not enabled',
    sslCertificate: 'SSL Certificate',
    valid: 'Valid',
    invalid: 'Invalid',
    issuer: 'Issuer',
    expiresIn: 'Expires in',
    days: 'days',
    protocol: 'Protocol',
    securityHeaders: 'Security Headers',
    cookies: 'Cookies',
    cookiesFound: 'Cookies found',
    secureFlag: 'Secure Flag',
    httpOnlyFlag: 'HttpOnly Flag',
    sameSiteFlag: 'SameSite Flag',
    mixedContent: 'Mixed Content',
    noMixedContent: 'No mixed content',
    mixedContentFound: 'HTTP resources found',
  }

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <ScoreRing score={result.score} size="xl" />

        <div className="flex-1 w-full max-w-xl space-y-4">
          <h2 className="text-xl font-bold">{t.summary}</h2>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20">
              <div className="text-2xl font-bold text-red-500">{result.criticalIssues}</div>
              <div className="text-xs text-muted-foreground">{t.criticalIssues}</div>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20">
              <div className="text-2xl font-bold text-orange-500">{result.warningIssues}</div>
              <div className="text-xs text-muted-foreground">{t.warnings}</div>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/20">
              <div className="text-2xl font-bold text-green-500">{result.passedChecks}</div>
              <div className="text-xs text-muted-foreground">{t.passed}</div>
            </div>
          </div>

          <ScoreBar
            score={result.score}
            label="Security Score"
            size="lg"
          />
        </div>
      </div>

      {/* HTTPS & SSL */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            {t.httpsSSL}
          </h3>

          <div className="space-y-4">
            {/* HTTPS Status */}
            <div className={cn(
              'p-4 rounded-lg flex items-center gap-4',
              result.https.enabled ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
            )}>
              {result.https.enabled ? (
                <ShieldCheck className="h-10 w-10 text-green-500" />
              ) : (
                <ShieldAlert className="h-10 w-10 text-red-500" />
              )}
              <div>
                <div className="font-bold">{t.https}</div>
                <div className={cn(
                  'text-sm',
                  result.https.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}>
                  {result.https.enabled ? t.httpsEnabled : t.httpsDisabled}
                </div>
              </div>
            </div>

            {/* SSL Certificate */}
            <div className={cn(
              'p-4 rounded-lg',
              result.ssl.valid ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">{t.sslCertificate}</span>
                {result.ssl.valid ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={result.ssl.valid ? 'text-green-600' : 'text-red-600'}>
                    {result.ssl.valid ? t.valid : t.invalid}
                  </span>
                </div>
                {result.ssl.issuer && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.issuer}:</span>
                    <span className={isLocked ? 'blur-sm' : ''}>{result.ssl.issuer}</span>
                  </div>
                )}
                {result.ssl.daysUntilExpiry !== null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.expiresIn}:</span>
                    <span className={cn(
                      result.ssl.daysUntilExpiry < 30 ? 'text-orange-500' : 'text-green-600'
                    )}>
                      {result.ssl.daysUntilExpiry} {t.days}
                    </span>
                  </div>
                )}
                {result.ssl.protocol && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.protocol}:</span>
                    <span>{result.ssl.protocol}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cookies & Mixed Content */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            {t.cookies} & {t.mixedContent}
          </h3>

          <div className="space-y-4">
            {/* Cookies */}
            {result.cookies.found > 0 ? (
              <div className={cn(
                'p-4 rounded-lg',
                result.cookies.status === 'good' ? 'bg-green-50 dark:bg-green-950/20' : 'bg-orange-50 dark:bg-orange-950/20'
              )}>
                <div className="font-medium mb-2">{result.cookies.found} {t.cookiesFound}</div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="font-bold">{result.cookies.secure}</div>
                    <div className="text-xs text-muted-foreground">{t.secureFlag}</div>
                  </div>
                  <div>
                    <div className="font-bold">{result.cookies.httpOnly}</div>
                    <div className="text-xs text-muted-foreground">{t.httpOnlyFlag}</div>
                  </div>
                  <div>
                    <div className="font-bold">{result.cookies.sameSite}</div>
                    <div className="text-xs text-muted-foreground">{t.sameSiteFlag}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-muted/50 text-center text-muted-foreground">
                {locale === 'de' ? 'Keine Cookies gefunden' : 'No cookies found'}
              </div>
            )}

            {/* Mixed Content */}
            <div className={cn(
              'p-4 rounded-lg flex items-center gap-4',
              result.mixedContent.found ? 'bg-orange-50 dark:bg-orange-950/20' : 'bg-green-50 dark:bg-green-950/20'
            )}>
              {result.mixedContent.found ? (
                <FileWarning className="h-8 w-8 text-orange-500" />
              ) : (
                <ShieldCheck className="h-8 w-8 text-green-500" />
              )}
              <div>
                <div className="font-medium">{t.mixedContent}</div>
                <div className={cn(
                  'text-sm',
                  result.mixedContent.found ? 'text-orange-600' : 'text-green-600'
                )}>
                  {result.mixedContent.found
                    ? `${result.mixedContent.count} ${t.mixedContentFound}`
                    : t.noMixedContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Headers */}
      <div className="rounded-xl border p-4">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          {t.securityHeaders}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <HeaderCheck
            name="Strict-Transport-Security"
            present={result.headers.strictTransportSecurity.present}
            value={result.headers.strictTransportSecurity.value}
            status={result.headers.strictTransportSecurity.status}
            isLocked={isLocked}
          />
          <HeaderCheck
            name="Content-Security-Policy"
            present={result.headers.contentSecurityPolicy.present}
            value={result.headers.contentSecurityPolicy.value}
            status={result.headers.contentSecurityPolicy.status}
            isLocked={isLocked}
          />
          <HeaderCheck
            name="X-Frame-Options"
            present={result.headers.xFrameOptions.present}
            value={result.headers.xFrameOptions.value}
            status={result.headers.xFrameOptions.status}
            isLocked={isLocked}
          />
          <HeaderCheck
            name="X-Content-Type-Options"
            present={result.headers.xContentTypeOptions.present}
            value={result.headers.xContentTypeOptions.value}
            status={result.headers.xContentTypeOptions.status}
            isLocked={isLocked}
          />
          <HeaderCheck
            name="Referrer-Policy"
            present={result.headers.referrerPolicy.present}
            value={result.headers.referrerPolicy.value}
            status={result.headers.referrerPolicy.status}
            isLocked={isLocked}
          />
          <HeaderCheck
            name="Permissions-Policy"
            present={result.headers.permissionsPolicy.present}
            value={result.headers.permissionsPolicy.value}
            status={result.headers.permissionsPolicy.status}
            isLocked={isLocked}
          />
        </div>
      </div>
    </div>
  )
}
