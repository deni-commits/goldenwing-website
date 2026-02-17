'use client'

import { useEffect, useState, useRef } from 'react'

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  subLabel?: string
}

interface StatisticsCardProps {
  title?: string
  stats: Stat[]
  columns?: 2 | 3 | 4
  variant?: 'default' | 'gradient' | 'outline'
}

export function StatisticsCard({
  title,
  stats,
  columns = 3,
  variant = 'default',
}: StatisticsCardProps) {
  const [currentValues, setCurrentValues] = useState<number[]>(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCurrentValues(stats.map((stat) => Math.round(stat.value * easeOut)))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, stats])

  const variantClasses = {
    default: 'bg-muted/50 border-border/50',
    gradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50',
    outline: 'bg-background border-border',
  }

  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <div
      ref={ref}
      className={`rounded-2xl p-6 my-8 border ${variantClasses[variant]}`}
    >
      {title && (
        <h4 className="font-semibold text-foreground mb-6 text-center">{title}</h4>
      )}

      <div className={`grid ${columnClasses[columns]} gap-4 sm:gap-6`}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              text-center p-4 rounded-xl bg-background/50
              transition-all duration-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {stat.prefix}
              {currentValues[index].toLocaleString('de-DE')}
              {stat.suffix}
            </div>
            <p className="text-sm font-medium text-foreground mt-2">{stat.label}</p>
            {stat.subLabel && (
              <p className="text-xs text-muted-foreground mt-1">{stat.subLabel}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
