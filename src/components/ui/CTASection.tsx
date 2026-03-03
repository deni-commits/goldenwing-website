'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  variant?: 'yellow' | 'dark'
  heading: string
  sub: string
  buttonText: string
  buttonHref: string
  secondaryButton?: string
  secondaryHref?: string
}

export function CTASection({
  variant = 'dark',
  heading,
  sub,
  buttonText,
  buttonHref,
  secondaryButton,
  secondaryHref,
}: CTASectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const isYellow = variant === 'yellow'

  return (
    <section
      className={cn(
        'relative overflow-hidden py-16 md:py-20',
        isYellow ? 'bg-primary text-primary-foreground' : 'bg-foreground text-background',
      )}
    >
      {!isYellow && (
        <>
          <div className="bg-primary absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-20 blur-[100px]" />
          <div className="bg-primary absolute -bottom-20 -left-20 h-80 w-80 rounded-full opacity-15 blur-[100px]" />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="mx-auto max-w-3xl text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className={cn('mb-8 text-lg', isYellow ? 'text-primary-foreground/70' : 'text-background/70')}>{sub}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={buttonHref}
              className={cn(
                'group inline-flex items-center justify-center rounded-lg px-8 py-3 font-semibold transition-all duration-200 hover:scale-105',
                isYellow
                  ? 'bg-foreground text-background hover:bg-foreground/90'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              {buttonText}
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {secondaryButton && secondaryHref && (
              <Link
                href={secondaryHref}
                className={cn(
                  'inline-flex items-center justify-center rounded-lg border px-8 py-3 font-semibold transition-colors',
                  isYellow
                    ? 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10'
                    : 'border-background/30 text-background hover:bg-background/10',
                )}
              >
                {secondaryButton}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
