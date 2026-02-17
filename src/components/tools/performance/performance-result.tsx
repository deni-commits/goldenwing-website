'use client'

import { Gauge, HardDrive, FileCode, Image as ImageIcon, Type, Globe, Zap, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScoreRing, ScoreBar } from '@/components/tools/shared'
import { CoreWebVitals, type WebVitalMetric } from './core-web-vitals'

interface PageStats {
  totalSize: number
  totalSizeFormatted: string
  requestCount: number
  htmlSize: number
  cssSize: number
  jsSize: number
  imageSize: number
  fontSize: number
}

interface Opportunity {
  id: string
  title: string
  description: string
  savings: string
  savingsMs?: number
  savingsBytes?: number
}

interface Diagnostic {
  id: string
  title: string
  description: string
  displayValue?: string
}

interface PerformanceResultProps {
  result: {
    url: string
    score: number
    lcp: WebVitalMetric
    fcp: WebVitalMetric
    cls: WebVitalMetric
    tbt: WebVitalMetric
    si: WebVitalMetric
    ttfb: WebVitalMetric
    pageStats: PageStats
    opportunities: Opportunity[]
    diagnostics: Diagnostic[]
    totalIssues: number
    criticalIssues: number
    warningIssues: number
    passedChecks: number
  }
  isLocked?: boolean
  locale?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

interface StatBarProps {
  label: string
  value: number
  total: number
  icon: React.ReactNode
  color: string
}

function StatBar({ label, value, total, icon, color }: StatBarProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <div className="flex items-center gap-3">
      <div className={cn('flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center', color)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-muted-foreground">{formatBytes(value)}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', color.replace('bg-', 'bg-').replace('/10', ''))}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function PerformanceResult({ result, isLocked = false, locale = 'de' }: PerformanceResultProps) {
  const t = locale === 'de' ? {
    summary: 'Zusammenfassung',
    criticalIssues: 'Kritisch',
    warnings: 'Warnungen',
    passed: 'Bestanden',
    coreWebVitals: 'Core Web Vitals',
    pageStats: 'Seitenstatistik',
    totalSize: 'Gesamtgröße',
    requests: 'Anfragen',
    opportunities: 'Optimierungsmöglichkeiten',
    diagnostics: 'Diagnose',
    savePotential: 'Einsparpotenzial',
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    images: 'Bilder',
    fonts: 'Schriften',
    noOpportunities: 'Keine Optimierungsmöglichkeiten gefunden',
    noDiagnostics: 'Keine Diagnose-Hinweise',
  } : {
    summary: 'Summary',
    criticalIssues: 'Critical',
    warnings: 'Warnings',
    passed: 'Passed',
    coreWebVitals: 'Core Web Vitals',
    pageStats: 'Page Statistics',
    totalSize: 'Total Size',
    requests: 'Requests',
    opportunities: 'Opportunities',
    diagnostics: 'Diagnostics',
    savePotential: 'Potential Savings',
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    images: 'Images',
    fonts: 'Fonts',
    noOpportunities: 'No optimization opportunities found',
    noDiagnostics: 'No diagnostic hints',
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
            label="Performance Score"
            size="lg"
          />
        </div>
      </div>

      {/* Core Web Vitals */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          {t.coreWebVitals}
        </h2>
        <CoreWebVitals
          lcp={result.lcp}
          fcp={result.fcp}
          cls={result.cls}
          tbt={result.tbt}
          si={result.si}
          ttfb={result.ttfb}
          locale={locale}
        />
      </div>

      {/* Page Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-primary" />
            {t.pageStats}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="text-2xl font-bold">{result.pageStats.totalSizeFormatted}</div>
              <div className="text-xs text-muted-foreground">{t.totalSize}</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="text-2xl font-bold">{result.pageStats.requestCount}</div>
              <div className="text-xs text-muted-foreground">{t.requests}</div>
            </div>
          </div>

          <div className="space-y-4">
            <StatBar
              label={t.html}
              value={result.pageStats.htmlSize}
              total={result.pageStats.totalSize}
              icon={<FileCode className="h-4 w-4 text-blue-600" />}
              color="bg-blue-500/10"
            />
            <StatBar
              label={t.css}
              value={result.pageStats.cssSize}
              total={result.pageStats.totalSize}
              icon={<FileCode className="h-4 w-4 text-purple-600" />}
              color="bg-purple-500/10"
            />
            <StatBar
              label={t.javascript}
              value={result.pageStats.jsSize}
              total={result.pageStats.totalSize}
              icon={<FileCode className="h-4 w-4 text-yellow-600" />}
              color="bg-yellow-500/10"
            />
            <StatBar
              label={t.images}
              value={result.pageStats.imageSize}
              total={result.pageStats.totalSize}
              icon={<ImageIcon className="h-4 w-4 text-green-600" />}
              color="bg-green-500/10"
            />
            <StatBar
              label={t.fonts}
              value={result.pageStats.fontSize}
              total={result.pageStats.totalSize}
              icon={<Type className="h-4 w-4 text-pink-600" />}
              color="bg-pink-500/10"
            />
          </div>
        </div>

        {/* Opportunities */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {t.opportunities}
          </h3>

          {result.opportunities.length > 0 ? (
            <div className="space-y-3">
              {result.opportunities.slice(0, 5).map((opp, index) => (
                <div
                  key={opp.id}
                  className={cn(
                    'p-3 rounded-lg bg-muted/50 border-l-4',
                    index < 2 ? 'border-l-red-500' : 'border-l-orange-500',
                    isLocked && index > 1 && 'blur-sm'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium">{opp.title}</span>
                    {opp.savings && (
                      <span className={cn(
                        'text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap',
                        index < 2
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      )}>
                        -{opp.savings}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{t.noOpportunities}</p>
            </div>
          )}
        </div>
      </div>

      {/* Diagnostics */}
      {result.diagnostics.length > 0 && (
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t.diagnostics}
          </h3>

          <div className="grid md:grid-cols-2 gap-3">
            {result.diagnostics.slice(0, 6).map((diag, index) => (
              <div
                key={diag.id}
                className={cn(
                  'p-3 rounded-lg bg-muted/50',
                  isLocked && index > 2 && 'blur-sm'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium">{diag.title}</span>
                  {diag.displayValue && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {diag.displayValue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
