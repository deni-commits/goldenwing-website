'use client'

import { useEffect, useState, useRef, useId } from 'react'

interface GrowthChartProps {
  title?: string
  subtitle?: string
  startValue: number
  endValue: number
  unit?: string
  duration?: number
  color?: 'primary' | 'success' | 'warning' | 'info'
  showPercentage?: boolean
}

const colorMap = {
  primary: { gradient: ['#f59e0b', '#d97706'], bg: 'bg-amber-50 dark:bg-amber-950/30' },
  success: { gradient: ['#22c55e', '#16a34a'], bg: 'bg-green-50 dark:bg-green-950/30' },
  warning: { gradient: ['#f97316', '#ea580c'], bg: 'bg-orange-50 dark:bg-orange-950/30' },
  info: { gradient: ['#3b82f6', '#2563eb'], bg: 'bg-blue-50 dark:bg-blue-950/30' },
}

export function GrowthChart({
  title = 'Wachstum',
  subtitle,
  startValue,
  endValue,
  unit = '',
  duration = 2000,
  color = 'primary',
  showPercentage = true,
}: GrowthChartProps) {
  const [currentValue, setCurrentValue] = useState(startValue)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const percentageGrowth = ((endValue - startValue) / startValue) * 100
  const colors = colorMap[color]

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

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const value = startValue + (endValue - startValue) * easeOut
      setCurrentValue(Math.round(value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, startValue, endValue, duration])

  // Generate curve points
  const generatePath = () => {
    const points: string[] = []
    const steps = 50
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 280 + 20
      const progress = i / steps
      const easeOut = 1 - Math.pow(1 - progress, 2)
      const y = 140 - (easeOut * 100)
      points.push(`${x},${y}`)
    }
    return `M20,140 L${points.join(' L')}`
  }

  const uniqueId = useId()
  const gradientId = `gradient-${color}-${uniqueId}`
  const areaGradientId = `area-${color}-${uniqueId}`

  return (
    <div
      ref={ref}
      className={`rounded-2xl ${colors.bg} p-6 my-8 border border-border/50`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {showPercentage && (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 border border-border/50">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              +{percentageGrowth.toFixed(0)}%
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="relative">
        <svg viewBox="0 0 320 160" className="w-full h-auto">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.gradient[0]} />
              <stop offset="100%" stopColor={colors.gradient[1]} />
            </linearGradient>
            <linearGradient id={areaGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity="0.3" />
              <stop offset="100%" stopColor={colors.gradient[0]} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <g className="text-muted-foreground/20">
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="20"
                y1={40 + i * 33}
                x2="300"
                y2={40 + i * 33}
                stroke="currentColor"
                strokeDasharray="4 4"
              />
            ))}
          </g>

          {/* Area fill */}
          <path
            d={`${generatePath()} L300,140 L20,140 Z`}
            fill={`url(#${areaGradientId})`}
            className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Line */}
          <path
            d={generatePath()}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              strokeDasharray: 400,
              strokeDashoffset: isVisible ? 0 : 400,
              transition: `stroke-dashoffset ${duration}ms ease-out`,
            }}
          />

          {/* End point */}
          <circle
            cx="300"
            cy="40"
            r="6"
            fill={colors.gradient[1]}
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{ transformOrigin: '300px 40px', transitionDelay: `${duration}ms` }}
          />
        </svg>

        {/* Values */}
        <div className="flex justify-between mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              {startValue.toLocaleString('de-DE')}{unit}
            </p>
            <p className="text-xs text-muted-foreground">Vorher</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: colors.gradient[1] }}>
              {currentValue.toLocaleString('de-DE')}{unit}
            </p>
            <p className="text-xs text-muted-foreground">Nachher</p>
          </div>
        </div>
      </div>
    </div>
  )
}
