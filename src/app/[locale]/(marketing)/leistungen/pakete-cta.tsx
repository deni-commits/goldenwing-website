'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaketeCTAProps {
  title: string
  titleHighlight: string
  description: string
  buttonText: string
  locale: string
}

export function PaketeCTA({ title, titleHighlight, description, buttonText, locale }: PaketeCTAProps) {
  return (
    <section className="max-w-[1520px] mx-auto py-24 lg:py-32 px-5 sm:px-9 lg:px-16">
      <div className={cn(
        'relative rounded-3xl overflow-hidden text-center',
        'py-20 px-8 lg:py-20 lg:px-20',
        // Light mode
        'bg-gradient-to-br from-primary/[0.02] to-neutral-50 border border-primary/[0.06]',
        // Dark mode
        'dark:from-[rgba(242,251,49,0.015)] dark:to-[rgba(255,255,255,0.005)] dark:border-[rgba(242,251,49,0.06)]'
      )}>
        {/* Rotating border glow */}
        <div 
          className="absolute inset-[-1px] rounded-3xl pointer-events-none z-0 hidden dark:block"
          style={{
            background: 'conic-gradient(from 0deg, rgba(242,251,49,0.12), transparent 25%, transparent 75%, rgba(242,251,49,0.12))',
            animation: 'spin 8s linear infinite',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px'
          }}
        />

        <div className="relative z-10">
          <h3 className={cn(
            'font-[family-name:var(--font-bricolage)] text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-[-0.04em] mb-4',
            'text-neutral-900 dark:text-white'
          )}>
            {title}<span className="text-primary dark:text-[#f2fb31]">{titleHighlight}</span>
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-[0.9rem] max-w-[500px] mx-auto mb-10 leading-[1.7]">
            {description}
          </p>
          <Link
            href={`/${locale}/leistungen/pakete`}
            className={cn(
              'inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-[0.85rem] tracking-[-0.01em]',
              'transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
              'bg-primary dark:bg-[#f2fb31] text-white dark:text-[#0a0a0a]',
              'hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(242,251,49,0.25)]'
            )}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
