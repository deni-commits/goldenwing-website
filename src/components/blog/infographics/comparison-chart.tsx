'use client'

import { useEffect, useState, useRef } from 'react'

interface ComparisonItem {
  label: string
  before: number
  after: number
  unit?: string
}

interface ComparisonChartProps {
  title?: string
  items: ComparisonItem[]
  beforeLabel?: string
  afterLabel?: string
}

export function ComparisonChart({
  title = 'Vergleich',
  items,
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
}: ComparisonChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const maxValue = Math.max(...items.flatMap((item) => [item.before, item.after]))

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-muted/50 p-6 my-8 border border-border/50"
    >
      {/* Header */}
      <h4 className="font-semibold text-foreground mb-6">{title}</h4>

      {/* Legend */}
      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
          <span className="text-sm text-muted-foreground">{beforeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-sm text-muted-foreground">{afterLabel}</span>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-6">
        {items.map((item, index) => {
          const beforeWidth = (item.before / maxValue) * 100
          const afterWidth = (item.after / maxValue) * 100
          const improvement = ((item.after - item.before) / item.before) * 100

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  +{improvement.toFixed(0)}%
                </span>
              </div>

              {/* Before bar */}
              <div className="relative h-6 bg-background rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-muted-foreground/30 rounded-lg transition-all duration-1000 ease-out flex items-center"
                  style={{
                    width: isVisible ? `${beforeWidth}%` : '0%',
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <span className="absolute right-2 text-xs font-medium text-muted-foreground">
                    {item.before.toLocaleString('de-DE')}{item.unit || ''}
                  </span>
                </div>
              </div>

              {/* After bar */}
              <div className="relative h-6 bg-background rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg transition-all duration-1000 ease-out flex items-center"
                  style={{
                    width: isVisible ? `${afterWidth}%` : '0%',
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}
                >
                  <span className="absolute right-2 text-xs font-medium text-white">
                    {item.after.toLocaleString('de-DE')}{item.unit || ''}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
