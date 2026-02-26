'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ServiceCard {
  num: string
  label: string
  icon: string
  title: string
  description: string
  tags: string[]
  href: string
  ariaLabel: string
}

interface ServicesGridProps {
  services: ServiceCard[]
  locale: string
}

function ServiceCardItem({ 
  service, 
  index,
  locale 
}: { 
  service: ServiceCard
  index: number
  locale: string 
}) {
  const cardRef = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delays = [0, 120, 60, 260, 200, 320]
          setTimeout(() => setIsVisible(true), delays[index] || 0)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        'relative rounded-[22px] overflow-hidden group',
        // Light mode
        'bg-white/80 border border-neutral-200 shadow-sm',
        // Dark mode
        'dark:bg-white/[0.015] dark:border-white/[0.04] dark:shadow-none',
        // Visibility
        !isVisible && 'opacity-0 translate-y-10 scale-[0.96]'
      )}
      style={{
        minHeight: '360px',
        transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s ease, box-shadow 0.6s ease',
        ...(isVisible && { opacity: 1, transform: 'translateY(0) scale(1)' }),
        ...(isHovered && {
          transform: 'translateY(-4px)',
          boxShadow: '0 24px 80px -20px rgba(0,0,0,0.2), 0 0 60px -15px rgba(242,251,49,0.03)',
          borderColor: 'rgba(242,251,49,0.1)'
        })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="listitem"
    >
      {/* Cursor glow - dark mode only */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-[22px] pointer-events-none z-[1] transition-opacity duration-500 hidden dark:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(242,251,49,0.015) 0%, transparent 40%)`
          }}
        />
      )}

      {/* Card Link */}
      <Link
        href={`/${locale}${service.href}`}
        className="flex flex-col justify-end h-full text-inherit no-underline cursor-pointer relative z-[4] p-9 sm:p-10"
        aria-label={service.ariaLabel}
      >
        {/* Service number label */}
        <span 
          className={cn(
            'absolute top-9 left-9 font-mono text-[0.55rem] uppercase tracking-[0.2em]',
            'text-primary/20 dark:text-[rgba(242,251,49,0.2)]'
          )}
          aria-hidden="true"
        >
          {service.num}
        </span>

        {/* Icon */}
        <div className={cn(
          'w-11 h-11 rounded-xl border flex items-center justify-center mb-5 text-[1.1rem]',
          'transition-all duration-500',
          // Light mode
          'border-primary/8 bg-primary/[0.03] text-primary',
          // Dark mode
          'dark:border-[rgba(242,251,49,0.08)] dark:bg-[rgba(242,251,49,0.03)] dark:text-[#f2fb31]'
        )}>
          {service.icon}
        </div>

        {/* Title */}
        <h3 
          className={cn(
            'font-[family-name:var(--font-bricolage)] text-[1.5rem] font-bold tracking-[-0.03em] leading-[1.12] mb-3',
            'transition-colors duration-500',
            // Light mode
            'text-neutral-900',
            // Dark mode
            'dark:text-white'
          )}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p 
          className={cn(
            'text-[0.78rem] leading-[1.7] mb-5 max-w-[380px]',
            'transition-colors duration-500',
            // Light mode
            'text-neutral-500',
            // Dark mode
            'dark:text-white/25',
            isHovered && 'dark:text-white/50 text-neutral-600'
          )}
        >
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-5" aria-label="Leistungen">
          {service.tags.map((tag) => (
            <span 
              key={tag}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-[0.66rem] font-semibold tracking-[0.01em]',
                'transition-all duration-500 cubic-bezier(0.16,1,0.3,1)',
                // Light mode
                'bg-neutral-100 text-neutral-500 border border-neutral-200',
                // Dark mode
                'dark:bg-white/[0.02] dark:text-white/15 dark:border-white/[0.025]',
                isHovered && 'dark:bg-[rgba(242,251,49,0.06)] dark:text-[#f2fb31] dark:border-[rgba(242,251,49,0.1)] bg-neutral-200 text-neutral-700 border-neutral-300'
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow link */}
        <div className={cn(
          'flex items-center gap-2 text-[0.7rem] font-semibold',
          'transition-all duration-400',
          // Light mode
          'text-primary/60',
          // Dark mode
          'dark:text-[rgba(242,251,49,0.3)]',
          isHovered && 'dark:text-[#f2fb31] text-primary'
        )}>
          <span>Mehr erfahren</span>
          <ArrowUpRight 
            className={cn(
              'w-4 h-4 transition-transform duration-400',
              isHovered && 'translate-x-1'
            )}
          />
        </div>

        {/* Arrow icon circle */}
        <span 
          className={cn(
            'absolute top-8 right-8 w-[42px] h-[42px] rounded-full border flex items-center justify-center z-[5]',
            'transition-all duration-[0.55s] cubic-bezier(0.16,1,0.3,1)',
            // Light mode
            'border-neutral-200 bg-neutral-100/50',
            // Dark mode  
            'dark:border-white/[0.03] dark:bg-transparent',
            !isHovered && 'opacity-0 -translate-x-[10px] translate-y-[10px] scale-[0.85]',
            isHovered && 'opacity-100 translate-x-0 translate-y-0 scale-100 dark:border-[rgba(242,251,49,0.25)] dark:bg-[rgba(242,251,49,0.05)] border-neutral-300 bg-neutral-200/50'
          )}
          aria-hidden="true"
        >
          <ArrowUpRight 
            className={cn(
              'w-[14px] h-[14px] transition-transform duration-400',
              // Light mode
              'text-neutral-800',
              // Dark mode
              'dark:text-[#f2fb31]',
              isHovered && 'translate-x-[1px] -translate-y-[1px]'
            )}
          />
        </span>
      </Link>
    </motion.article>
  )
}

export function ServicesGrid({ services, locale }: ServicesGridProps) {
  return (
    <div 
      className={cn(
        'grid gap-[18px]',
        // Desktop: asymmetric 3-column grid (5fr 3fr 4fr)
        'lg:grid-cols-[5fr_3fr_4fr]',
        // Tablet: 2 columns
        'md:grid-cols-2',
        // Mobile: 1 column
        'grid-cols-1'
      )}
      style={{ gridAutoRows: 'minmax(360px, auto)' }}
      role="list"
    >
      {services.map((service, index) => (
        <ServiceCardItem 
          key={service.num} 
          service={service} 
          index={index}
          locale={locale}
        />
      ))}
    </div>
  )
}
