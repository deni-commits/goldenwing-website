'use client'

import { useScrollAnimation } from '@/components/ui/AnimatedSection'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { cn } from '@/lib/utils'

interface Stat {
  value: number
  suffix?: string
  label: string
}

interface StatsBarProps {
  stats: Stat[]
  variant?: 'dark' | 'light'
}

export function StatsBar({ stats, variant = 'dark' }: StatsBarProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('grid grid-cols-2 gap-8', stats.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4')}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            'group relative text-center',
            'md:after:absolute md:after:top-1/2 md:after:right-0 md:after:h-16 md:after:w-px md:after:-translate-y-1/2 md:last:after:hidden',
            'md:after:bg-border',
          )}
        >
          <div className="text-primary mb-2 text-4xl font-bold md:text-5xl lg:text-6xl">
            <AnimatedNumber value={stat.value} suffix={stat.suffix || ''} />
          </div>
          <div className={cn('text-sm font-medium md:text-base', 'text-muted-foreground')}>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
