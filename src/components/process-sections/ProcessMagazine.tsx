'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ProcessSectionProps } from './types'

export function ProcessMagazine({
  title,
  subtitle,
  steps,
  className = '',
  cta,
}: ProcessSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Split title for multi-line display
  const titleParts = title.split(' ')
  const formattedTitle =
    titleParts.length > 2
      ? titleParts.slice(0, Math.ceil(titleParts.length / 2)).join(' ') +
        '\n' +
        titleParts.slice(Math.ceil(titleParts.length / 2)).join(' ')
      : title

  return (
    <section
      className={`py-16 md:py-24 px-5 md:px-10 bg-gray-50 dark:bg-neutral-900 ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header - 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 mb-12 md:mb-20">
          <h2
            className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] whitespace-pre-line text-neutral-900 dark:text-white"
          >
            {formattedTitle}
          </h2>
          <div className="flex items-end pb-2 md:pb-5">
            <p
              className="text-base md:text-lg leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Steps */}
        {steps.map((step, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              grid grid-cols-1 md:grid-cols-[80px_200px_1fr_50px] lg:grid-cols-[120px_280px_1fr_50px]
              gap-4 md:gap-10 items-center
              py-6 md:py-9 cursor-pointer transition-all duration-300
              border-t border-gray-300 dark:border-neutral-700
              ${i === steps.length - 1 ? 'border-b border-gray-300 dark:border-neutral-700' : ''}
            `}
          >
            <span
              className={`
              text-4xl md:text-6xl font-bold leading-none transition-colors duration-300
              ${
                hoveredIndex === i
                  ? 'text-[#2d2d2d] dark:text-primary'
                  : 'text-gray-300 dark:text-neutral-600'
              }
            `}
            >
              {step.num}
            </span>

            <h3
              className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white"
            >
              {step.title}
            </h3>

            <p
              className="text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {step.description}
            </p>

            <div
              className={`
              hidden md:flex w-10 h-10 rounded-full items-center justify-center
              border transition-all duration-300
              ${
                hoveredIndex === i
                  ? 'bg-[#2d2d2d] dark:bg-primary border-[#2d2d2d] dark:border-primary'
                  : 'border-gray-300 dark:border-neutral-600'
              }
            `}
            >
              <span
                className={`
                transition-all duration-300
                ${
                  hoveredIndex === i
                    ? 'text-white dark:text-neutral-900 translate-x-0.5'
                    : 'text-gray-400 dark:text-gray-500'
                }
              `}
              >
                &rarr;
              </span>
            </div>
          </div>
        ))}

        {/* CTA */}
        {cta && (
          <div className="mt-12 text-center">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                font-semibold transition-all duration-300
                bg-[#2d2d2d] dark:bg-primary text-white dark:text-black
                hover:bg-[#2d2d2d]/90 dark:hover:bg-primary/90"
            >
              {cta.label}
              <span>&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProcessMagazine
