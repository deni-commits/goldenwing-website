'use client'

import { useState } from 'react'
import { Search, Gauge, Palette, Shield, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScoreRing, ScoreBar } from '@/components/tools/shared'
import { CategoryTabs } from './category-tabs'
import { SeoResult } from '@/components/tools/seo'
import { PerformanceResult } from '@/components/tools/performance'
import { DesignResult } from '@/components/tools/design'
import { SecurityResult } from '@/components/tools/security'

interface FullAnalysisResultProps {
  result: {
    url: string
    overallScore: number
    seoScore: number | null
    performanceScore: number | null
    designScore: number | null
    securityScore: number | null
    seo: Record<string, unknown> | null
    performance: Record<string, unknown> | null
    design: Record<string, unknown> | null
    security: Record<string, unknown> | null
    issues: Array<{
      id: string
      category: 'seo' | 'performance' | 'design' | 'security'
      severity: 'critical' | 'warning' | 'passed' | 'info'
      title: string
      description: string
      howToFix?: string
    }>
    totalIssues: number
    criticalIssues: number
    warningIssues: number
    passedChecks: number
    errors: {
      seo: string | null
      performance: string | null
      design: string | null
      security: string | null
    }
  }
  isLocked?: boolean
  locale?: string
}

const categoryIcons = {
  seo: Search,
  performance: Gauge,
  design: Palette,
  security: Shield,
}

const categoryLabels = {
  de: {
    seo: 'SEO',
    performance: 'Performance',
    design: 'Design',
    security: 'Security',
  },
  en: {
    seo: 'SEO',
    performance: 'Performance',
    design: 'Design',
    security: 'Security',
  },
}

function getScoreColor(score: number | null): string {
  if (score === null) return 'text-muted-foreground'
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-yellow-500'
  if (score >= 50) return 'text-orange-500'
  return 'text-red-500'
}

function getScoreBg(score: number | null): string {
  if (score === null) return 'bg-muted/50'
  if (score >= 90) return 'bg-green-50 dark:bg-green-950/20'
  if (score >= 70) return 'bg-yellow-50 dark:bg-yellow-950/20'
  if (score >= 50) return 'bg-orange-50 dark:bg-orange-950/20'
  return 'bg-red-50 dark:bg-red-950/20'
}

export function FullAnalysisResult({ result, isLocked = false, locale = 'de' }: FullAnalysisResultProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'seo' | 'performance' | 'design' | 'security'>('overview')

  const t = locale === 'de' ? {
    overview: 'Übersicht',
    categories: 'Kategorien',
    criticalIssues: 'Kritisch',
    warnings: 'Warnungen',
    passed: 'Bestanden',
    topIssues: 'Wichtigste Probleme',
    viewDetails: 'Details ansehen',
    noIssues: 'Keine Probleme gefunden',
    analysisFailed: 'Analyse fehlgeschlagen',
    critical: 'Kritisch',
    warning: 'Warnung',
  } : {
    overview: 'Overview',
    categories: 'Categories',
    criticalIssues: 'Critical',
    warnings: 'Warnings',
    passed: 'Passed',
    topIssues: 'Top Issues',
    viewDetails: 'View Details',
    noIssues: 'No issues found',
    analysisFailed: 'Analysis failed',
    critical: 'Critical',
    warning: 'Warning',
  }

  const labels = categoryLabels[locale === 'de' ? 'de' : 'en']

  // Overview content
  const renderOverview = () => (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <ScoreRing score={result.overallScore} size="xl" />

        <div className="flex-1 w-full max-w-xl space-y-4">
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

          <ScoreBar score={result.overallScore} label="Overall Score" size="lg" />
        </div>
      </div>

      {/* Category Scores Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">{t.categories}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['seo', 'performance', 'design', 'security'] as const).map((category) => {
            const score = result[`${category}Score`]
            const error = result.errors[category]
            const Icon = categoryIcons[category]

            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={cn(
                  'p-4 rounded-xl border text-left transition-all hover:shadow-md hover:border-primary/50',
                  getScoreBg(score)
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                  {error ? (
                    <span className="text-sm text-red-500">Error</span>
                  ) : (
                    <span className={cn('text-2xl font-bold', getScoreColor(score))}>
                      {score ?? '-'}
                    </span>
                  )}
                </div>
                <div className="font-medium">{labels[category]}</div>
                {score !== null && !error && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          score >= 90 ? 'bg-green-500' :
                          score >= 70 ? 'bg-yellow-500' :
                          score >= 50 ? 'bg-orange-500' : 'bg-red-500'
                        )}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                )}
                {error && (
                  <p className="text-xs text-red-500 mt-2">{t.analysisFailed}</p>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Top Issues */}
      <div>
        <h2 className="text-xl font-bold mb-4">{t.topIssues}</h2>
        {result.issues.filter(i => i.severity !== 'passed').length === 0 ? (
          <div className="p-6 rounded-xl bg-green-50 dark:bg-green-950/20 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-600 dark:text-green-400">{t.noIssues}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {result.issues
              .filter(i => i.severity !== 'passed')
              .slice(0, isLocked ? 3 : 10)
              .map((issue) => {
                const Icon = categoryIcons[issue.category]
                const isCritical = issue.severity === 'critical'

                return (
                  <div
                    key={issue.id}
                    className={cn(
                      'p-4 rounded-xl border',
                      isCritical
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                        : 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {isCritical ? (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{issue.title}</span>
                          <span className={cn(
                            'px-2 py-0.5 rounded text-xs font-medium',
                            isCritical
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                              : 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
                          )}>
                            {isCritical ? t.critical : t.warning}
                          </span>
                        </div>
                        <p className={cn(
                          'text-sm text-muted-foreground',
                          isLocked && 'blur-sm'
                        )}>
                          {issue.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs uppercase">{issue.category}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            {isLocked && result.issues.filter(i => i.severity !== 'passed').length > 3 && (
              <div className="text-center py-4 text-muted-foreground">
                + {result.issues.filter(i => i.severity !== 'passed').length - 3} {locale === 'de' ? 'weitere Probleme' : 'more issues'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'seo':
        if (!result.seo) {
          return (
            <div className="p-8 text-center text-muted-foreground">
              {result.errors.seo || t.analysisFailed}
            </div>
          )
        }
        return (
          <SeoResult
            result={{
              ...result.seo,
              url: result.url,
              score: result.seoScore ?? 0,
              issues: result.issues.filter(i => i.category === 'seo'),
              totalIssues: result.issues.filter(i => i.category === 'seo' && i.severity !== 'passed').length,
              criticalIssues: result.issues.filter(i => i.category === 'seo' && i.severity === 'critical').length,
              warningIssues: result.issues.filter(i => i.category === 'seo' && i.severity === 'warning').length,
              passedChecks: result.issues.filter(i => i.category === 'seo' && i.severity === 'passed').length,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any}
            isLocked={isLocked}
            locale={locale}
          />
        )
      case 'performance':
        if (!result.performance) {
          return (
            <div className="p-8 text-center text-muted-foreground">
              {result.errors.performance || t.analysisFailed}
            </div>
          )
        }
        return (
          <PerformanceResult
            result={{
              ...result.performance,
              url: result.url,
              score: result.performanceScore ?? 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any}
            isLocked={isLocked}
            locale={locale}
          />
        )
      case 'design':
        if (!result.design) {
          return (
            <div className="p-8 text-center text-muted-foreground">
              {result.errors.design || t.analysisFailed}
            </div>
          )
        }
        return (
          <DesignResult
            result={{
              ...result.design,
              url: result.url,
              score: result.designScore ?? 0,
              issues: result.issues.filter(i => i.category === 'design'),
              totalIssues: result.issues.filter(i => i.category === 'design' && i.severity !== 'passed').length,
              criticalIssues: result.issues.filter(i => i.category === 'design' && i.severity === 'critical').length,
              warningIssues: result.issues.filter(i => i.category === 'design' && i.severity === 'warning').length,
              passedChecks: result.issues.filter(i => i.category === 'design' && i.severity === 'passed').length,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any}
            isLocked={isLocked}
            locale={locale}
          />
        )
      case 'security':
        if (!result.security) {
          return (
            <div className="p-8 text-center text-muted-foreground">
              {result.errors.security || t.analysisFailed}
            </div>
          )
        }
        return (
          <SecurityResult
            result={{
              ...result.security,
              url: result.url,
              score: result.securityScore ?? 0,
              issues: result.issues.filter(i => i.category === 'security'),
              totalIssues: result.issues.filter(i => i.category === 'security' && i.severity !== 'passed').length,
              criticalIssues: result.issues.filter(i => i.category === 'security' && i.severity === 'critical').length,
              warningIssues: result.issues.filter(i => i.category === 'security' && i.severity === 'warning').length,
              passedChecks: result.issues.filter(i => i.category === 'security' && i.severity === 'passed').length,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any}
            isLocked={isLocked}
            locale={locale}
          />
        )
    }
  }

  return (
    <div className="space-y-6">
      <CategoryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        scores={{
          seo: result.seoScore,
          performance: result.performanceScore,
          design: result.designScore,
          security: result.securityScore,
        }}
        locale={locale}
      />
      {renderContent()}
    </div>
  )
}
