'use client'

import { cn } from '@/lib/utils'

interface ServicesMarqueeProps {
  title: string
  services: string[]
}

export function ServicesMarquee({ title, services }: ServicesMarqueeProps) {
  // Duplicate for seamless loop
  const items = [...services, ...services]

  return (
    <section className="py-10 lg:py-16 overflow-hidden">
      <div className="max-w-[1520px] mx-auto px-5 sm:px-9 lg:px-16">
        <h3 className={cn(
          'font-[family-name:var(--font-bricolage)] text-[1.1rem] font-bold tracking-[-0.02em] mb-10',
          'text-neutral-300 dark:text-white/30'
        )}>
          {title}
        </h3>
      </div>
      
      <div className="relative overflow-hidden py-2">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        {/* Marquee track */}
        <div className="flex gap-3 animate-marquee hover:[animation-play-state:paused]">
          {items.map((service, index) => (
            <span
              key={index}
              className={cn(
                'flex-shrink-0 px-7 py-3 rounded-full border text-[0.75rem] font-medium whitespace-nowrap cursor-default',
                'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                // Light mode
                'border-neutral-200 bg-neutral-100/50 text-neutral-500',
                // Dark mode
                'dark:border-white/[0.04] dark:bg-white/[0.01] dark:text-white/20',
                // Hover
                'hover:border-primary/15 hover:text-primary hover:bg-primary/[0.02] hover:-translate-y-0.5',
                'dark:hover:border-[rgba(242,251,49,0.15)] dark:hover:text-[#f2fb31]/60 dark:hover:bg-[rgba(242,251,49,0.02)]'
              )}
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
