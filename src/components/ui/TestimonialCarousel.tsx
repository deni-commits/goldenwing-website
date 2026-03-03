'use client'

import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  author: string
  company?: string
  rating?: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  variant?: 'dark' | 'light'
}

export function TestimonialCarousel({ testimonials, variant = 'dark' }: TestimonialCarouselProps) {
  const cardBg = variant === 'dark' ? 'bg-card border-border' : 'bg-background border-border'
  const textColor = 'text-foreground'
  const mutedColor = 'text-muted-foreground'

  return (
    <div
      className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      style={{ scrollbarWidth: 'none' }}
    >
      {testimonials.map((t, i) => (
        <div key={i} className={cn('w-[340px] flex-shrink-0 snap-start rounded-xl border p-6', cardBg)}>
          {t.rating && (
            <div className="text-primary mb-3">
              {'★'.repeat(t.rating)}
              {'☆'.repeat(5 - t.rating)}
            </div>
          )}
          <p className={cn('mb-4 text-sm leading-relaxed', mutedColor)}>&ldquo;{t.quote}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
              {t.author.charAt(0)}
            </div>
            <div>
              <p className={cn('text-sm font-semibold', textColor)}>{t.author}</p>
              {t.company && <p className={cn('text-xs', mutedColor)}>{t.company}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
