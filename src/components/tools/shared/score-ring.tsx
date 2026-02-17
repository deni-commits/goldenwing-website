'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ScoreRingProps {
  score: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
  label?: string
  animate?: boolean
  className?: string
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-primary'
  if (score >= 50) return 'text-orange-500'
  return 'text-red-500'
}

function getScoreStrokeColor(score: number): string {
  if (score >= 90) return 'stroke-green-500'
  if (score >= 70) return 'stroke-primary'
  if (score >= 50) return 'stroke-orange-500'
  return 'stroke-red-500'
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Ausgezeichnet'
  if (score >= 70) return 'Gut'
  if (score >= 50) return 'Verbesserungsbedarf'
  return 'Kritisch'
}

const sizeConfig = {
  sm: { dimension: 80, strokeWidth: 6, fontSize: 'text-xl', labelSize: 'text-[10px]' },
  md: { dimension: 120, strokeWidth: 8, fontSize: 'text-3xl', labelSize: 'text-xs' },
  lg: { dimension: 160, strokeWidth: 10, fontSize: 'text-4xl', labelSize: 'text-sm' },
  xl: { dimension: 200, strokeWidth: 12, fontSize: 'text-5xl', labelSize: 'text-base' },
}

export function ScoreRing({
  score,
  maxScore = 100,
  size = 'lg',
  showLabel = true,
  label,
  animate = true,
  className,
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const config = sizeConfig[size]
  const radius = (config.dimension - config.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const normalizedScore = Math.min(Math.max(score, 0), maxScore)
  const percentage = normalizedScore / maxScore
  const strokeDashoffset = circumference * (1 - (animate ? displayScore / maxScore : percentage))

  // Animate score counting
  useEffect(() => {
    if (!animate || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)

            const duration = 1500
            const startTime = performance.now()

            const animateScore = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)

              // Easing function: easeOutExpo
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

               
              setDisplayScore(Math.round(normalizedScore * easeProgress))

              if (progress < 1) {
                requestAnimationFrame(animateScore)
              }
            }

            requestAnimationFrame(animateScore)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animate, normalizedScore, hasAnimated])

  // Calculate current display score
  const currentDisplayScore = !animate ? normalizedScore : (hasAnimated ? normalizedScore : displayScore)

  return (
    <div
      ref={ref}
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: config.dimension, height: config.dimension }}
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={maxScore}
      aria-label={label || `Score: ${score} von ${maxScore}`}
    >
      <svg
        className="transform -rotate-90"
        width={config.dimension}
        height={config.dimension}
      >
        {/* Background circle */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth={config.strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={radius}
          fill="none"
          className={cn(
            getScoreStrokeColor(normalizedScore),
            'transition-all duration-1000 ease-out'
          )}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn(config.fontSize, 'font-bold', getScoreColor(normalizedScore))}>
          {currentDisplayScore}
        </span>
        {showLabel && (
          <span className={cn(config.labelSize, 'text-muted-foreground font-medium')}>
            {label || `/${maxScore}`}
          </span>
        )}
      </div>
    </div>
  )
}

export function ScoreRingLabel({ score }: { score: number }) {
  return (
    <span className={cn('font-medium', getScoreColor(score))}>
      {getScoreLabel(score)}
    </span>
  )
}
