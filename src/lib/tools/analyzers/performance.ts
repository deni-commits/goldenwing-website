import logger from '@/lib/logger'
/**
 * Performance Analyzer - Uses Google PageSpeed Insights API
 * Free API with rate limits (400 requests per 100 seconds)
 */

export type PerformanceStrategy = 'mobile' | 'desktop'

export interface PerformanceAnalysisResult {
  score: number
  url: string
  strategy: PerformanceStrategy

  // Core Web Vitals
  lcp: {
    value: number // in seconds
    rating: 'good' | 'needs-improvement' | 'poor'
    displayValue: string
  }
  fcp: {
    value: number // in seconds
    rating: 'good' | 'needs-improvement' | 'poor'
    displayValue: string
  }
  cls: {
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    displayValue: string
  }
  tbt: {
    value: number // in milliseconds
    rating: 'good' | 'needs-improvement' | 'poor'
    displayValue: string
  }

  // Additional metrics
  si: {
    value: number // Speed Index in seconds
    rating: 'good' | 'needs-improvement' | 'poor'
    displayValue: string
  }
  ttfb: {
    value: number // in milliseconds
    rating: 'good' | 'needs-improvement' | 'poor'
    displayValue: string
  }

  // Page stats
  pageStats: {
    totalSize: number // in bytes
    totalSizeFormatted: string
    requestCount: number
    htmlSize: number
    cssSize: number
    jsSize: number
    imageSize: number
    fontSize: number
  }

  // Opportunities for improvement
  opportunities: PerformanceOpportunity[]

  // Diagnostics
  diagnostics: PerformanceDiagnostic[]

  // Issues for display
  issues: PerformanceIssue[]
}

export interface PerformanceOpportunity {
  id: string
  title: string
  description: string
  savings: string // e.g., "2.5s" or "500 KB"
  savingsMs?: number
  savingsBytes?: number
}

export interface PerformanceDiagnostic {
  id: string
  title: string
  description: string
  displayValue?: string
}

export interface PerformanceIssue {
  id: string
  category: 'performance'
  severity: 'critical' | 'warning' | 'info' | 'passed'
  title: string
  description: string
  howToFix?: string
  value?: string | number
  target?: string | number
}

// Thresholds based on Google's recommendations
const THRESHOLDS = {
  lcp: { good: 2.5, poor: 4.0 }, // seconds
  fcp: { good: 1.8, poor: 3.0 }, // seconds
  cls: { good: 0.1, poor: 0.25 },
  tbt: { good: 200, poor: 600 }, // ms
  si: { good: 3.4, poor: 5.8 }, // seconds
  ttfb: { good: 800, poor: 1800 }, // ms
}

function getRating(value: number, metric: keyof typeof THRESHOLDS): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metric]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)} ms`
  return `${(ms / 1000).toFixed(1)} s`
}

export async function analyzePerformance(
  url: string,
  strategy: PerformanceStrategy = 'mobile'
): Promise<PerformanceAnalysisResult> {
  // Call PageSpeed Insights API
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')
  apiUrl.searchParams.set('url', url)
  apiUrl.searchParams.set('strategy', strategy)
  apiUrl.searchParams.set('category', 'performance')

  // Add API key if available (higher rate limits)
  if (process.env.PAGESPEED_API_KEY) {
    apiUrl.searchParams.set('key', process.env.PAGESPEED_API_KEY)
  }

  const response = await fetch(apiUrl.toString(), {
    signal: AbortSignal.timeout(60000), // 60 second timeout
  })

  if (!response.ok) {
    const errorText = await response.text()
    logger.error('PageSpeed API error:', errorText)
    throw new Error(`PageSpeed API error: ${response.status}`)
  }

  const data = await response.json()

  // Extract lighthouse results
  const lighthouse = data.lighthouseResult
  const audits = lighthouse.audits
  const categories = lighthouse.categories

  // Performance score (0-100)
  const score = Math.round((categories.performance?.score || 0) * 100)

  // Core Web Vitals
  const lcpMs = audits['largest-contentful-paint']?.numericValue || 0
  const lcpSec = lcpMs / 1000

  const fcpMs = audits['first-contentful-paint']?.numericValue || 0
  const fcpSec = fcpMs / 1000

  const clsValue = audits['cumulative-layout-shift']?.numericValue || 0

  const tbtMs = audits['total-blocking-time']?.numericValue || 0

  const siMs = audits['speed-index']?.numericValue || 0
  const siSec = siMs / 1000

  // TTFB from server response time
  const ttfbMs = audits['server-response-time']?.numericValue || 0

  // Page stats from resource summary
  const resourceSummary = audits['resource-summary']?.details?.items || []
  let totalSize = 0
  let requestCount = 0
  let htmlSize = 0
  let cssSize = 0
  let jsSize = 0
  let imageSize = 0
  let fontSize = 0

  for (const item of resourceSummary) {
    const size = item.transferSize || 0
    const count = item.requestCount || 0

    switch (item.resourceType) {
      case 'total':
        totalSize = size
        requestCount = count
        break
      case 'document':
        htmlSize = size
        break
      case 'stylesheet':
        cssSize = size
        break
      case 'script':
        jsSize = size
        break
      case 'image':
        imageSize = size
        break
      case 'font':
        fontSize = size
        break
    }
  }

  // Extract opportunities
  const opportunities: PerformanceOpportunity[] = []
  const opportunityAudits = [
    'render-blocking-resources',
    'unused-css-rules',
    'unused-javascript',
    'modern-image-formats',
    'uses-optimized-images',
    'uses-responsive-images',
    'offscreen-images',
    'unminified-css',
    'unminified-javascript',
    'efficient-animated-content',
    'uses-text-compression',
  ]

  for (const auditId of opportunityAudits) {
    const audit = audits[auditId]
    if (audit && audit.score !== null && audit.score < 1) {
      const savings = audit.numericValue
        ? formatTime(audit.numericValue)
        : audit.details?.overallSavingsBytes
          ? formatBytes(audit.details.overallSavingsBytes)
          : ''

      opportunities.push({
        id: auditId,
        title: audit.title || auditId,
        description: audit.description || '',
        savings,
        savingsMs: audit.numericValue,
        savingsBytes: audit.details?.overallSavingsBytes,
      })
    }
  }

  // Sort by savings (highest first)
  opportunities.sort((a, b) => (b.savingsMs || 0) - (a.savingsMs || 0))

  // Extract diagnostics
  const diagnostics: PerformanceDiagnostic[] = []
  const diagnosticAudits = [
    'dom-size',
    'critical-request-chains',
    'long-tasks',
    'third-party-summary',
    'bootup-time',
    'mainthread-work-breakdown',
    'font-display',
  ]

  for (const auditId of diagnosticAudits) {
    const audit = audits[auditId]
    if (audit && audit.score !== null && audit.score < 1) {
      diagnostics.push({
        id: auditId,
        title: audit.title || auditId,
        description: audit.description || '',
        displayValue: audit.displayValue,
      })
    }
  }

  // Build issues list
  const issues: PerformanceIssue[] = []

  // LCP
  const lcpRating = getRating(lcpSec, 'lcp')
  issues.push({
    id: 'lcp',
    category: 'performance',
    severity: lcpRating === 'good' ? 'passed' : lcpRating === 'poor' ? 'critical' : 'warning',
    title: lcpRating === 'good' ? 'LCP ist gut' : 'Largest Contentful Paint (LCP) optimieren',
    description: lcpRating === 'good'
      ? `LCP von ${lcpSec.toFixed(1)}s ist schnell (Ziel: <2.5s)`
      : `LCP von ${lcpSec.toFixed(1)}s ist ${lcpRating === 'poor' ? 'zu langsam' : 'verbesserungswürdig'} (Ziel: <2.5s)`,
    value: lcpSec.toFixed(1),
    target: '2.5s',
    howToFix: lcpRating !== 'good'
      ? 'Optimieren Sie das größte sichtbare Element: Bilder komprimieren, CSS/JS minimieren, Server-Antwortzeit verbessern.'
      : undefined,
  })

  // FCP
  const fcpRating = getRating(fcpSec, 'fcp')
  issues.push({
    id: 'fcp',
    category: 'performance',
    severity: fcpRating === 'good' ? 'passed' : fcpRating === 'poor' ? 'critical' : 'warning',
    title: fcpRating === 'good' ? 'FCP ist gut' : 'First Contentful Paint (FCP) optimieren',
    description: fcpRating === 'good'
      ? `FCP von ${fcpSec.toFixed(1)}s ist schnell (Ziel: <1.8s)`
      : `FCP von ${fcpSec.toFixed(1)}s ist ${fcpRating === 'poor' ? 'zu langsam' : 'verbesserungswürdig'} (Ziel: <1.8s)`,
    value: fcpSec.toFixed(1),
    target: '1.8s',
    howToFix: fcpRating !== 'good'
      ? 'Render-blockierende Ressourcen eliminieren, kritisches CSS inline laden, Fonts optimieren.'
      : undefined,
  })

  // CLS
  const clsRating = getRating(clsValue, 'cls')
  issues.push({
    id: 'cls',
    category: 'performance',
    severity: clsRating === 'good' ? 'passed' : clsRating === 'poor' ? 'critical' : 'warning',
    title: clsRating === 'good' ? 'CLS ist gut' : 'Cumulative Layout Shift (CLS) reduzieren',
    description: clsRating === 'good'
      ? `CLS von ${clsValue.toFixed(3)} ist stabil (Ziel: <0.1)`
      : `CLS von ${clsValue.toFixed(3)} verursacht Layout-Verschiebungen (Ziel: <0.1)`,
    value: clsValue.toFixed(3),
    target: '0.1',
    howToFix: clsRating !== 'good'
      ? 'Bildgrößen immer angeben, keine Inhalte über bestehenden Content einfügen, Fonts mit font-display optimieren.'
      : undefined,
  })

  // TBT
  const tbtRating = getRating(tbtMs, 'tbt')
  issues.push({
    id: 'tbt',
    category: 'performance',
    severity: tbtRating === 'good' ? 'passed' : tbtRating === 'poor' ? 'critical' : 'warning',
    title: tbtRating === 'good' ? 'TBT ist gut' : 'Total Blocking Time (TBT) reduzieren',
    description: tbtRating === 'good'
      ? `TBT von ${Math.round(tbtMs)}ms ist niedrig (Ziel: <200ms)`
      : `TBT von ${Math.round(tbtMs)}ms blockiert die Interaktivität (Ziel: <200ms)`,
    value: Math.round(tbtMs),
    target: '200ms',
    howToFix: tbtRating !== 'good'
      ? 'JavaScript aufteilen, lange Tasks vermeiden, Third-Party-Scripts optimieren oder verzögert laden.'
      : undefined,
  })

  // Speed Index
  const siRating = getRating(siSec, 'si')
  issues.push({
    id: 'si',
    category: 'performance',
    severity: siRating === 'good' ? 'passed' : siRating === 'poor' ? 'critical' : 'warning',
    title: siRating === 'good' ? 'Speed Index ist gut' : 'Speed Index verbessern',
    description: siRating === 'good'
      ? `Speed Index von ${siSec.toFixed(1)}s zeigt schnellen visuellen Aufbau`
      : `Speed Index von ${siSec.toFixed(1)}s - Seite baut visuell langsam auf`,
    value: siSec.toFixed(1),
    target: '3.4s',
    howToFix: siRating !== 'good'
      ? 'Above-the-fold Content priorisieren, kritisches CSS inline, Bilder lazy-loaden.'
      : undefined,
  })

  // TTFB
  const ttfbRating = getRating(ttfbMs, 'ttfb')
  issues.push({
    id: 'ttfb',
    category: 'performance',
    severity: ttfbRating === 'good' ? 'passed' : ttfbRating === 'poor' ? 'critical' : 'warning',
    title: ttfbRating === 'good' ? 'Server-Antwortzeit ist gut' : 'Server-Antwortzeit (TTFB) verbessern',
    description: ttfbRating === 'good'
      ? `TTFB von ${Math.round(ttfbMs)}ms ist schnell (Ziel: <800ms)`
      : `TTFB von ${Math.round(ttfbMs)}ms - Server antwortet langsam (Ziel: <800ms)`,
    value: Math.round(ttfbMs),
    target: '800ms',
    howToFix: ttfbRating !== 'good'
      ? 'Server-Performance optimieren, Caching aktivieren, CDN verwenden, Datenbank-Queries optimieren.'
      : undefined,
  })

  // Page size
  if (totalSize > 3 * 1024 * 1024) { // > 3MB
    issues.push({
      id: 'page-size',
      category: 'performance',
      severity: totalSize > 5 * 1024 * 1024 ? 'critical' : 'warning',
      title: 'Seitengröße reduzieren',
      description: `Die Seite ist ${formatBytes(totalSize)} groß. Für mobile Nutzer sollte sie unter 3MB sein.`,
      value: formatBytes(totalSize),
      target: '<3 MB',
      howToFix: 'Bilder komprimieren, ungenutztes CSS/JS entfernen, Fonts optimieren, Gzip/Brotli aktivieren.',
    })
  } else {
    issues.push({
      id: 'page-size',
      category: 'performance',
      severity: 'passed',
      title: 'Seitengröße ist akzeptabel',
      description: `Die Seite ist ${formatBytes(totalSize)} groß - das ist akzeptabel.`,
    })
  }

  // Add top opportunities as issues
  for (const opp of opportunities.slice(0, 3)) {
    if (opp.savingsMs && opp.savingsMs > 500) {
      issues.push({
        id: opp.id,
        category: 'performance',
        severity: opp.savingsMs > 2000 ? 'critical' : 'warning',
        title: opp.title,
        description: `Mögliche Einsparung: ${opp.savings}`,
        howToFix: opp.description,
      })
    }
  }

  return {
    score,
    url,
    strategy,
    lcp: {
      value: lcpSec,
      rating: lcpRating,
      displayValue: audits['largest-contentful-paint']?.displayValue || `${lcpSec.toFixed(1)} s`,
    },
    fcp: {
      value: fcpSec,
      rating: fcpRating,
      displayValue: audits['first-contentful-paint']?.displayValue || `${fcpSec.toFixed(1)} s`,
    },
    cls: {
      value: clsValue,
      rating: clsRating,
      displayValue: audits['cumulative-layout-shift']?.displayValue || clsValue.toFixed(3),
    },
    tbt: {
      value: tbtMs,
      rating: tbtRating,
      displayValue: audits['total-blocking-time']?.displayValue || `${Math.round(tbtMs)} ms`,
    },
    si: {
      value: siSec,
      rating: siRating,
      displayValue: audits['speed-index']?.displayValue || `${siSec.toFixed(1)} s`,
    },
    ttfb: {
      value: ttfbMs,
      rating: ttfbRating,
      displayValue: audits['server-response-time']?.displayValue || `${Math.round(ttfbMs)} ms`,
    },
    pageStats: {
      totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      requestCount,
      htmlSize,
      cssSize,
      jsSize,
      imageSize,
      fontSize,
    },
    opportunities,
    diagnostics,
    issues,
  }
}

/**
 * Analyze both mobile and desktop performance
 * Returns both results for comparison
 */
export async function analyzePerformanceBoth(url: string): Promise<{
  mobile: PerformanceAnalysisResult
  desktop: PerformanceAnalysisResult
}> {
  // Run both analyses in parallel
  const [mobile, desktop] = await Promise.all([
    analyzePerformance(url, 'mobile'),
    analyzePerformance(url, 'desktop'),
  ])

  return { mobile, desktop }
}
