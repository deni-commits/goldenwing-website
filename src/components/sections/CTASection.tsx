'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/components/ui/AnimatedSection'

interface CTASectionProps {
  heading: string
  subline: string
  buttonLabel: string
  buttonLink: string
}

export function CTASection({ heading, subline, buttonLabel, buttonLink }: CTASectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="relative overflow-hidden bg-foreground py-16 text-background">
      {/* Lime glow blobs */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f2fb31] opacity-20 blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#f2fb31] opacity-30 blur-[100px]" />

      <div className="container relative">
        <div
          className="mx-auto max-w-3xl text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mb-8 text-lg text-background/70">{subline}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={buttonLink}
              className="inline-block rounded-lg px-8 py-3 font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: '#f2fb31', color: '#0a0a0a' }}
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
