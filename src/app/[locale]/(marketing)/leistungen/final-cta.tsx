'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FinalCTAProps {
  title: string
  titleHighlight: string
  description: string
  buttonText: string
  href: string
}

export function FinalCTA({ title, titleHighlight, description, buttonText, href }: FinalCTAProps) {
  return (
    <section className="relative py-36 text-center overflow-hidden">
      {/* Ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none hidden dark:block"
        style={{
          background: 'radial-gradient(ellipse, rgba(242,251,49,0.02) 0%, transparent 55%)',
          filter: 'blur(80px)'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1520px] mx-auto px-5 sm:px-9 lg:px-16">
        <h2 className={cn(
          'font-[family-name:var(--font-bricolage)] text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-[-0.05em] leading-[0.9] mb-6',
          'text-neutral-900 dark:text-white'
        )}>
          {title}<br />
          <span className="text-primary dark:text-[#f2fb31]">{titleHighlight}</span>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-[0.9rem] max-w-[500px] mx-auto mb-11 leading-[1.7]">
          {description}
        </p>
        <Link
          href={href}
          className={cn(
            'inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-[0.85rem]',
            'transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'bg-primary dark:bg-[#f2fb31] text-white dark:text-[#0a0a0a]',
            'hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(242,251,49,0.25)]'
          )}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
