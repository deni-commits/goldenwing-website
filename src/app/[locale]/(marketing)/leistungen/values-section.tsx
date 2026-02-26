'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ValueProp {
  num: string
  title: string
  description: string
}

interface ValuesSectionProps {
  eyebrow: string
  title: string
  titleHighlight: string
  values: ValueProp[]
}

export function ValuesSection({ eyebrow, title, titleHighlight, values }: ValuesSectionProps) {
  return (
    <section className="max-w-[1520px] mx-auto py-24 lg:py-32 px-5 sm:px-9 lg:px-16 border-t border-b border-white/[0.04] dark:border-white/[0.04]">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2.5 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-primary dark:text-[#f2fb31] mb-6">
          <span className="w-[6px] h-[6px] bg-primary dark:bg-[#f2fb31] rotate-45 animate-pulse" style={{ animationDuration: '3s' }} />
          {eyebrow}
        </div>
        <h2 className={cn(
          'font-[family-name:var(--font-bricolage)] text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.04em] leading-[0.95]',
          'text-neutral-900 dark:text-white'
        )}>
          {title}<br />
          <span className="text-primary dark:text-[#f2fb31]">{titleHighlight}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0.5">
        {values.map((val, index) => (
          <ValueCard key={index} value={val} index={index} />
        ))}
      </div>
    </section>
  )
}

function ValueCard({ value, index }: { value: ValueProp; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div 
      ref={ref}
      className={cn(
        'p-12 rounded-2xl border cursor-default group',
        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        // Light mode
        'bg-neutral-50/50 border-neutral-200',
        // Dark mode
        'dark:bg-white/[0.01] dark:border-white/[0.04]',
        // Hover
        'hover:bg-primary/[0.015] hover:border-primary/8 hover:-translate-y-1',
        'dark:hover:bg-[rgba(242,251,49,0.015)] dark:hover:border-[rgba(242,251,49,0.08)]',
        // Animation
        !isVisible && 'opacity-0 translate-y-5',
        isVisible && 'opacity-100 translate-y-0'
      )}
    >
      <div className={cn(
        'font-[family-name:var(--font-bricolage)] text-[3.5rem] font-extrabold leading-[0.9] tracking-[-0.04em] mb-6',
        'text-primary/[0.07] dark:text-[rgba(242,251,49,0.07)]',
        'transition-colors duration-500',
        'group-hover:text-primary/20 dark:group-hover:text-[rgba(242,251,49,0.2)]'
      )}>
        {value.num}
      </div>
      <h4 className={cn(
        'font-[family-name:var(--font-bricolage)] text-[1.05rem] font-bold tracking-[-0.02em] mb-3',
        'text-neutral-900 dark:text-white'
      )}>
        {value.title}
      </h4>
      <p className="text-[0.75rem] text-neutral-500 dark:text-neutral-400 leading-[1.7]">
        {value.description}
      </p>
    </div>
  )
}
