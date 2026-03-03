'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollAnimation } from '@/components/ui/AnimatedSection'
import type { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  icon?: ReactNode
  price?: string
  href?: string
  variant?: 'dark' | 'light'
  delay?: number
}

export function ServiceCard({ title, description, icon, price, href, variant = 'dark', delay = 0 }: ServiceCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(delay)
  const shouldReduce = useReducedMotion()

  const inner = (
    <motion.div
      ref={ref}
      className={cn(
        'group relative h-full rounded-xl border p-6 transition-colors duration-300',
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
      {icon && (
        <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110">
          <span className="text-primary">{icon}</span>
        </div>
      )}
      <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      {price && <div className="text-primary mt-4 text-2xl font-bold">{price}</div>}
      {href && (
        <span className="text-primary mt-4 flex items-center text-sm font-medium">
          Mehr erfahren
          <svg
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      )}
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {inner}
      </Link>
    )
  }
  return inner
}
