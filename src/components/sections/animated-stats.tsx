"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Container } from '@/components/ui/container'
import { useTranslations } from "next-intl"

interface Stat {
  value: number
  suffix: string
  labelKey: string
}

export interface CMSStat {
  value: number
  suffix?: string | null
  label: string
}

// CSS-based animation hook
function useStatsAnimation() {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100)
          observer.disconnect()
        }
      },
      { rootMargin: '-100px', threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

function AnimatedNumber({
  value,
  suffix,
  isVisible
}: {
  value: number
  suffix: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true
      const duration = 2000
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing: easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(value * eased))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isVisible, value])

  // Calculate min-width based on final value to prevent CLS
  const digitCount = String(value).length + suffix.length
  const minWidth = `${digitCount * 0.65}em`

  // Show final value until animation actually starts (count > 0)
  // This prevents CLS from SSR showing "120" then client showing "0"
  const displayValue = count > 0 ? count : value

  return (
    <span
      className="tabular-nums inline-block text-right"
      style={{ minWidth }}
    >
      {displayValue}{suffix}
    </span>
  )
}

export function AnimatedStats({
  className,
  cmsStats
}: {
  className?: string
  cmsStats?: CMSStat[]
}) {
  const t = useTranslations('stats')
  const { ref, isVisible } = useStatsAnimation()

  // Default stats with translations
  const defaultStats: Stat[] = [
    { value: 120, suffix: "+", labelKey: "projects" },
    { value: 98, suffix: "%", labelKey: "satisfaction" },
    { value: 13, suffix: "+", labelKey: "experience" },
  ]

  // CSS transition helper
  const getItemStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
    transition: `opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
    willChange: 'opacity, transform' as const,
  })

  return (
    // CLS prevention: min-height + contain isolates layout
    <section
      ref={ref}
      className={cn("py-16 md:py-20 md:min-h-[180px]", className)}
      style={{ contain: 'layout' }}
    >
      <Container variant="block">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {cmsStats ? (
            // Render CMS stats
            cmsStats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "text-center relative group cursor-default",
                  index < cmsStats.length - 1 && "md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-16 md:after:w-px md:after:bg-border"
                )}
                style={getItemStyle(index * 150)}
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-2">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix || ''}
                    isVisible={isVisible}
                  />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))
          ) : (
            // Render default stats with translations
            defaultStats.map((stat, index) => (
              <div
                key={stat.labelKey}
                className={cn(
                  "text-center relative group cursor-default",
                  index < defaultStats.length - 1 && "md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-16 md:after:w-px md:after:bg-border"
                )}
                style={getItemStyle(index * 150)}
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-2">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  )
}
