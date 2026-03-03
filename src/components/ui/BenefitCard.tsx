'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollAnimation } from '@/components/ui/AnimatedSection'
import type { ReactNode } from 'react'

interface BenefitCardProps {
  icon: ReactNode
  title: string
  description: string
  variant?: 'dark' | 'light'
  delay?: number
}

export function BenefitCard({ icon, title, description, variant = 'dark', delay = 0 }: BenefitCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(delay)
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(
        'group h-full rounded-xl border p-6 transition-colors duration-300',
        variant === 'dark'
          ? 'bg-card border-border hover:border-primary/50'
          : 'bg-card border-border hover:border-primary/50',
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
      whileHover={
        shouldReduce
          ? undefined
          : {
              y: -8,
              boxShadow: '0 0 30px rgba(212, 255, 0, 0.12), 0 20px 40px rgba(0, 0, 0, 0.2)',
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }
      }
    >
      <div className="bg-primary/10 group-hover:bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
        <span className="text-primary group-hover:text-primary-foreground transition-colors duration-300">{icon}</span>
      </div>
      <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
