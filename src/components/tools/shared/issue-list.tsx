'use client'

import { useState } from 'react'
import { Lock, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IssueCard, IssueCardSkeleton, type Issue, type IssueSeverity } from './issue-card'
import { Button } from '@/components/ui/button'

interface IssueListProps {
  issues: Issue[]
  isLocked?: boolean
  lockedMessage?: string
  onUnlock?: () => void
  showFilters?: boolean
  maxVisible?: number
  locale?: string
  className?: string
}

type FilterType = 'all' | IssueSeverity

const filterConfig: Array<{ type: FilterType; labelDe: string; labelEn: string; labelRu: string; icon?: React.ComponentType<{ className?: string }> }> = [
  { type: 'all', labelDe: 'Alle', labelEn: 'All', labelRu: 'Все' },
  { type: 'critical', labelDe: 'Kritisch', labelEn: 'Critical', labelRu: 'Критично', icon: AlertCircle },
  { type: 'warning', labelDe: 'Warnung', labelEn: 'Warning', labelRu: 'Внимание', icon: AlertTriangle },
  { type: 'passed', labelDe: 'Bestanden', labelEn: 'Passed', labelRu: 'Пройдено', icon: CheckCircle2 }, // includes 'info' severity
]

export function IssueList({
  issues,
  isLocked = false,
  lockedMessage = 'E-Mail eingeben um alle Details zu sehen',
  onUnlock,
  showFilters = true,
  maxVisible,
  locale = 'de',
  className,
}: IssueListProps) {
  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'
  const [filter, setFilter] = useState<FilterType>('all')
  const [showAll, setShowAll] = useState(false)

  // Filter logic: 'passed' filter includes both 'passed' and 'info' severities
  const filteredIssues = filter === 'all'
    ? issues
    : filter === 'passed'
      ? issues.filter((issue) => issue.severity === 'passed' || issue.severity === 'info')
      : issues.filter((issue) => issue.severity === filter)

  const visibleIssues = maxVisible && !showAll
    ? filteredIssues.slice(0, maxVisible)
    : filteredIssues

  const hasMore = maxVisible && filteredIssues.length > maxVisible && !showAll

  // Count issues: 'info' is counted as 'passed' for summary stats
  const criticalCount = issues.filter((i) => i.severity === 'critical').length
  const warningCount = issues.filter((i) => i.severity === 'warning').length
  const passedCount = issues.filter((i) => i.severity === 'passed' || i.severity === 'info').length

  return (
    <div className={cn('space-y-4', className)}>
      {/* Summary Stats - Traffic Light Style */}
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <AlertCircle className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-red-700 dark:text-red-300">{criticalCount}</span>
          <span className="text-red-600 dark:text-red-400">
            {isRussian ? 'Критично' : isGerman ? 'Kritisch' : 'Critical'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/30 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-900">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
            <AlertTriangle className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-orange-700 dark:text-orange-300">{warningCount}</span>
          <span className="text-orange-600 dark:text-orange-400">
            {isRussian ? 'Внимание' : isGerman ? 'Warnungen' : 'Warnings'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-lg border border-green-200 dark:border-green-900">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-green-700 dark:text-green-300">{passedCount}</span>
          <span className="text-green-600 dark:text-green-400">
            {isRussian ? 'Пройдено' : isGerman ? 'Bestanden' : 'Passed'}
          </span>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {filterConfig.map((item) => (
            <button
              key={item.type}
              onClick={() => setFilter(item.type)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                filter === item.type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              )}
            >
              {item.icon && <item.icon className="h-3.5 w-3.5" />}
              {isRussian ? item.labelRu : isGerman ? item.labelDe : item.labelEn}
            </button>
          ))}
        </div>
      )}

      {/* Issue Cards */}
      <div className="space-y-3">
        {visibleIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            isLocked={isLocked && issue.severity !== 'critical'}
            locale={locale}
          />
        ))}

        {visibleIssues.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {isRussian
              ? 'Проблем в этой категории не найдено.'
              : isGerman
                ? 'Keine Probleme in dieser Kategorie gefunden.'
                : 'No issues found in this category.'}
          </div>
        )}
      </div>

      {/* Show More / Locked Overlay */}
      {hasMore && !isLocked && (
        <Button
          variant="outline"
          onClick={() => setShowAll(true)}
          className="w-full"
        >
          {isRussian
            ? `Показать ещё ${filteredIssues.length - maxVisible}`
            : isGerman
              ? `${filteredIssues.length - maxVisible} weitere anzeigen`
              : `Show ${filteredIssues.length - maxVisible} more`}
        </Button>
      )}

      {isLocked && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent -mt-20 pt-20 flex flex-col items-center justify-end pb-4">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">{lockedMessage}</p>
              {onUnlock && (
                <Button onClick={onUnlock} size="lg">
                  {isRussian
                    ? 'Получить полный отчет'
                    : isGerman
                      ? 'Vollständigen Report freischalten'
                      : 'Unlock Full Report'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function IssueListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-24 bg-muted rounded animate-pulse" />
        ))}
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-muted rounded-full animate-pulse" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <IssueCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
