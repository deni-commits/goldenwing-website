'use client'

import { useScrollAnimation } from '@/components/ui/AnimatedSection'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

interface StatsSectionProps {
  stats: Array<{ value: string; label: string }>
}

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/)
  if (match) return { num: parseInt(match[1]!, 10), suffix: match[2] || '' }
  return { num: 0, suffix: value }
}

export function StatsSection({ stats }: StatsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          {stats.map((stat, i) => {
            const { num, suffix } = parseStatValue(stat.value)
            return (
              <div
                key={i}
                className="relative text-center group cursor-default md:last:after:hidden md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-16 md:after:w-px md:after:bg-border"
              >
                <div className="mb-2 text-5xl font-bold text-primary md:text-6xl lg:text-7xl">
                  <AnimatedNumber value={num} suffix={suffix} />
                </div>
                <div className="text-sm font-medium text-muted-foreground md:text-base">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
