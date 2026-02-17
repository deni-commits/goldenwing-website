'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ScoreBarProps {
  score: number
  maxScore?: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  className?: string
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'bg-green-500'
  if (score >= 70) return 'bg-primary'
  if (score >= 50) return 'bg-orange-500'
  return 'bg-red-500'
}

function getScoreTextColor(score: number): string {
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-primary'
  if (score >= 50) return 'text-orange-500'
  return 'text-red-500'
}

const sizeConfig = {
  sm: { height: 'h-1.5', text: 'text-xs' },
  md: { height: 'h-2.5', text: 'text-sm' },
  lg: { height: 'h-4', text: 'text-base' },
}

export function ScoreBar({
  score,
  maxScore = 100,
  label,
  showValue = true,
  size = 'md',
  animate = true,
  className,
}: ScoreBarProps) {
  const [width, setWidth] = useState(animate ? 0 : score)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const config = sizeConfig[size]
  const normalizedScore = Math.min(Math.max(score, 0), maxScore)
  const percentage = (normalizedScore / maxScore) * 100

  useEffect(() => {
    if (!animate || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)

            // Small delay before starting animation
            setTimeout(() => {
               
              setWidth(percentage)
            }, 100)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animate, percentage, hasAnimated])

  // Update width when percentage changes (after animation)
  const currentWidth = !animate ? percentage : (hasAnimated ? percentage : width)

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className={cn(config.text, 'font-medium text-foreground')}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn(config.text, 'font-bold', getScoreTextColor(normalizedScore))}>
              {normalizedScore}/{maxScore}
            </span>
          )}
        </div>
      )}

      <div
        className={cn('w-full rounded-full bg-muted overflow-hidden', config.height)}
        role="progressbar"
        aria-valuenow={normalizedScore}
        aria-valuemin={0}
        aria-valuemax={maxScore}
        aria-label={label || `Score: ${normalizedScore} von ${maxScore}`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            getScoreColor(normalizedScore)
          )}
          style={{ width: `${currentWidth}%` }}
        />
      </div>
    </div>
  )
}

interface ScoreBarGroupProps {
  scores: Array<{
    label: string
    score: number
    icon?: React.ReactNode
  }>
  className?: string
}

export function ScoreBarGroup({ scores, className }: ScoreBarGroupProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {scores.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {item.icon && (
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              {item.icon}
            </div>
          )}
          <div className="flex-1">
            <ScoreBar label={item.label} score={item.score} size="md" />
          </div>
        </div>
      ))}
    </div>
  )
}
