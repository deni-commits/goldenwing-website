'use client'

import { cn } from '@/lib/utils'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

export interface WebVitalMetric {
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  displayValue: string
}

interface CoreWebVitalsProps {
  lcp: WebVitalMetric
  fcp: WebVitalMetric
  cls: WebVitalMetric
  tbt: WebVitalMetric
  si: WebVitalMetric
  ttfb: WebVitalMetric
  locale?: string
}

interface MetricCardProps {
  label: string
  abbreviation: string
  metric: WebVitalMetric
  target: string
  description: string
}

function getRatingColor(rating: 'good' | 'needs-improvement' | 'poor') {
  switch (rating) {
    case 'good':
      return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
    case 'needs-improvement':
      return 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
    case 'poor':
      return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
  }
}

function getRatingTextColor(rating: 'good' | 'needs-improvement' | 'poor') {
  switch (rating) {
    case 'good':
      return 'text-green-600 dark:text-green-400'
    case 'needs-improvement':
      return 'text-orange-600 dark:text-orange-400'
    case 'poor':
      return 'text-red-600 dark:text-red-400'
  }
}

function getRatingIcon(rating: 'good' | 'needs-improvement' | 'poor') {
  switch (rating) {
    case 'good':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case 'needs-improvement':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case 'poor':
      return <XCircle className="h-5 w-5 text-red-500" />
  }
}

function MetricCard({ label, abbreviation, metric, target, description }: MetricCardProps) {
  return (
    <div className={cn(
      'rounded-xl border p-4 transition-all hover:shadow-md',
      getRatingColor(metric.rating)
    )}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {abbreviation}
          </span>
          <h4 className="font-semibold text-sm">{label}</h4>
        </div>
        {getRatingIcon(metric.rating)}
      </div>

      <div className={cn('text-2xl font-bold mb-1', getRatingTextColor(metric.rating))}>
        {metric.displayValue}
      </div>

      <div className="text-xs text-muted-foreground">
        Ziel: {target}
      </div>

      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
        {description}
      </p>
    </div>
  )
}

export function CoreWebVitals({ lcp, fcp, cls, tbt, si, ttfb, locale = 'de' }: CoreWebVitalsProps) {
  const metrics = locale === 'de' ? [
    {
      label: 'Largest Contentful Paint',
      abbreviation: 'LCP',
      metric: lcp,
      target: '< 2.5s',
      description: 'Zeit bis das größte Element sichtbar ist',
    },
    {
      label: 'First Contentful Paint',
      abbreviation: 'FCP',
      metric: fcp,
      target: '< 1.8s',
      description: 'Zeit bis zum ersten sichtbaren Inhalt',
    },
    {
      label: 'Cumulative Layout Shift',
      abbreviation: 'CLS',
      metric: cls,
      target: '< 0.1',
      description: 'Stabilität des Layouts beim Laden',
    },
    {
      label: 'Total Blocking Time',
      abbreviation: 'TBT',
      metric: tbt,
      target: '< 200ms',
      description: 'Zeit in der die Seite blockiert ist',
    },
    {
      label: 'Speed Index',
      abbreviation: 'SI',
      metric: si,
      target: '< 3.4s',
      description: 'Geschwindigkeit des visuellen Aufbaus',
    },
    {
      label: 'Time to First Byte',
      abbreviation: 'TTFB',
      metric: ttfb,
      target: '< 800ms',
      description: 'Server-Antwortzeit',
    },
  ] : [
    {
      label: 'Largest Contentful Paint',
      abbreviation: 'LCP',
      metric: lcp,
      target: '< 2.5s',
      description: 'Time until largest element is visible',
    },
    {
      label: 'First Contentful Paint',
      abbreviation: 'FCP',
      metric: fcp,
      target: '< 1.8s',
      description: 'Time until first content appears',
    },
    {
      label: 'Cumulative Layout Shift',
      abbreviation: 'CLS',
      metric: cls,
      target: '< 0.1',
      description: 'Layout stability while loading',
    },
    {
      label: 'Total Blocking Time',
      abbreviation: 'TBT',
      metric: tbt,
      target: '< 200ms',
      description: 'Time the page is blocked',
    },
    {
      label: 'Speed Index',
      abbreviation: 'SI',
      metric: si,
      target: '< 3.4s',
      description: 'Speed of visual content loading',
    },
    {
      label: 'Time to First Byte',
      abbreviation: 'TTFB',
      metric: ttfb,
      target: '< 800ms',
      description: 'Server response time',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((item) => (
        <MetricCard
          key={item.abbreviation}
          label={item.label}
          abbreviation={item.abbreviation}
          metric={item.metric}
          target={item.target}
          description={item.description}
        />
      ))}
    </div>
  )
}
