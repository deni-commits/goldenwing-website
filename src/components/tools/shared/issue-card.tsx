'use client'

import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, Info, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export type IssueSeverity = 'critical' | 'warning' | 'info' | 'passed'
export type IssueCategory = 'seo' | 'performance' | 'design' | 'security'

export interface Issue {
  id: string
  category: IssueCategory
  severity: IssueSeverity
  title: string
  description: string
  howToFix?: string
  value?: string | number
  target?: string | number
}

interface IssueCardProps {
  issue: Issue
  isLocked?: boolean
  locale?: string
  className?: string
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    iconColor: 'text-white',
    iconBg: 'bg-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-l-4 border-l-red-500 border-red-200 dark:border-red-900',
    labelDe: 'Kritisch',
    labelEn: 'Critical',
    labelRu: 'Критично',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-white',
    iconBg: 'bg-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-l-4 border-l-orange-500 border-orange-200 dark:border-orange-900',
    labelDe: 'Warnung',
    labelEn: 'Warning',
    labelRu: 'Внимание',
  },
  info: {
    icon: Info,
    iconColor: 'text-white',
    iconBg: 'bg-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-l-4 border-l-blue-500 border-blue-200 dark:border-blue-900',
    labelDe: 'Info',
    labelEn: 'Info',
    labelRu: 'Инфо',
  },
  passed: {
    icon: CheckCircle2,
    iconColor: 'text-white',
    iconBg: 'bg-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-l-4 border-l-green-500 border-green-200 dark:border-green-900',
    labelDe: 'Bestanden',
    labelEn: 'Passed',
    labelRu: 'Пройдено',
  },
}

const categoryLabels: Record<IssueCategory, { de: string; en: string; ru: string }> = {
  seo: { de: 'SEO', en: 'SEO', ru: 'SEO' },
  performance: { de: 'Performance', en: 'Performance', ru: 'Скорость' },
  design: { de: 'Design', en: 'Design', ru: 'Дизайн' },
  security: { de: 'Sicherheit', en: 'Security', ru: 'Безопасность' },
}

export function IssueCard({ issue, isLocked = false, locale = 'de', className }: IssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const config = severityConfig[issue.severity]
  const Icon = config.icon
  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'

  const getLabel = () => {
    if (isRussian) return config.labelRu
    if (isGerman) return config.labelDe
    return config.labelEn
  }

  const getCategoryLabel = () => {
    if (isRussian) return categoryLabels[issue.category].ru
    if (isGerman) return categoryLabels[issue.category].de
    return categoryLabels[issue.category].en
  }

  const hasDetails = issue.howToFix || issue.value !== undefined

  return (
    <div
      className={cn(
        'rounded-xl border transition-all overflow-hidden',
        config.bgColor,
        config.borderColor,
        hasDetails && !isLocked && 'cursor-pointer hover:shadow-md',
        isLocked && 'opacity-60',
        className
      )}
      onClick={() => hasDetails && !isLocked && setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Traffic Light Indicator */}
          <div className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm',
            config.iconBg
          )}>
            <Icon className={cn('h-5 w-5', config.iconColor)} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    'text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded',
                    issue.severity === 'critical' && 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
                    issue.severity === 'warning' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
                    issue.severity === 'info' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
                    issue.severity === 'passed' && 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
                  )}>
                    {getLabel()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getCategoryLabel()}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground leading-tight">
                  {isLocked ? (
                    <span className="blur-sm select-none">{issue.title}</span>
                  ) : (
                    issue.title
                  )}
                </h4>
              </div>

              {hasDetails && !isLocked && (
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 mt-1',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </div>

            {!isLocked && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {issue.description}
              </p>
            )}

            {isLocked && (
              <p className="text-sm text-muted-foreground mt-2 blur-sm select-none">
                {issue.description}
              </p>
            )}

            {issue.value !== undefined && !isLocked && (
              <div className="flex items-center gap-2 mt-3 text-sm">
                <span className="text-muted-foreground">
                  {isRussian ? 'Текущее:' : isGerman ? 'Aktuell:' : 'Current:'}
                </span>
                <span className="font-mono font-medium bg-muted px-2 py-0.5 rounded">{issue.value}</span>
                {issue.target && (
                  <>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-muted-foreground">
                      {isRussian ? 'Цель:' : isGerman ? 'Ziel:' : 'Target:'}
                    </span>
                    <span className="font-mono font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">{issue.target}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How to Fix Section - Expanded */}
      {isExpanded && issue.howToFix && !isLocked && (
        <div className="px-4 pb-4">
          <div className="bg-background/80 rounded-lg p-4 border border-dashed">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="h-4 w-4 text-primary" />
              <h5 className="text-sm font-semibold text-foreground">
                {isRussian ? 'Как исправить:' : isGerman ? 'So beheben Sie das Problem:' : 'How to fix:'}
              </h5>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">{issue.howToFix}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function IssueCardSkeleton() {
  return (
    <div className="rounded-xl border border-muted bg-muted/30 p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <div className="h-5 w-16 bg-muted rounded" />
            <div className="h-5 w-20 bg-muted rounded" />
          </div>
          <div className="h-5 w-3/4 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded mt-2" />
        </div>
      </div>
    </div>
  )
}
