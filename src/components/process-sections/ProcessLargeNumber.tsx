'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ProcessSectionProps } from './types'

export function ProcessLargeNumber({
  title,
  subtitle,
  steps,
  className = '',
  cta,
}: ProcessSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      className={`py-16 md:py-24 px-5 md:px-10 bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight text-neutral-900 dark:text-white"
          >
            {title}
          </h2>
          <p
            className="text-base md:text-lg max-w-md text-gray-500 dark:text-gray-400"
          >
            {subtitle}
          </p>
        </div>

        {/* Grid - 6 columns for flexible layout */}
        {/* 5 items: 3 on top (span-2 each), 2 on bottom centered (span-3 each) */}
        {/* Other counts: evenly distributed */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
          steps.length === 5
            ? 'lg:grid-cols-6'
            : steps.length === 6
              ? 'lg:grid-cols-3'
              : 'lg:grid-cols-4'
        }`}>
          {steps.map((step, i) => {
            // For 5 items: first 3 span 2 cols, last 2 span 3 cols (centered)
            const spanClass = steps.length === 5
              ? (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3')
              : ''

            return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                group relative overflow-hidden rounded-2xl cursor-pointer
                min-h-[260px] md:min-h-[280px] flex flex-col justify-end
                p-6 md:p-10 pt-20 md:pt-24 transition-all duration-[400ms]
                ${spanClass}
                ${
                  hoveredIndex === i
                    ? 'bg-[#2d2d2d] dark:bg-white -translate-y-2 shadow-xl'
                    : 'bg-gray-50 dark:bg-neutral-800'
                }
              `}
            >
              {/* Large Background Number */}
              <span
                className={`
                absolute -top-5 -right-2 text-[120px] md:text-[180px] font-extrabold
                leading-none pointer-events-none transition-all duration-[400ms]
                ${
                  hoveredIndex === i
                    ? 'text-neutral-800 dark:text-gray-200 opacity-30'
                    : 'text-gray-200 dark:text-neutral-700 opacity-50'
                }
              `}
              >
                {step.num}
              </span>

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className={`
                  text-xl md:text-2xl font-semibold mb-3 transition-colors duration-300
                  ${
                    hoveredIndex === i
                      ? 'text-white dark:text-neutral-900'
                      : 'text-neutral-900 dark:text-white'
                  }
                `}
                >
                  {step.title}
                </h3>
                <p
                  className={`
                  text-sm leading-relaxed transition-colors duration-300
                  ${
                    hoveredIndex === i
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                `}
                >
                  {step.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div
                className={`
                absolute bottom-5 right-5 md:bottom-7 md:right-7 w-8 h-8 rounded-full
                flex items-center justify-center transition-all duration-300
                border ${
                  hoveredIndex === i
                    ? 'border-gray-600 dark:border-gray-400 rotate-0'
                    : 'border-gray-300 dark:border-gray-600 -rotate-45'
                }
              `}
              >
                <span
                  className={`
                  transition-colors duration-300
                  ${
                    hoveredIndex === i
                      ? 'text-white dark:text-neutral-900'
                      : 'text-neutral-900 dark:text-white'
                  }
                `}
                >
                  &rarr;
                </span>
              </div>
            </div>
          )})}
        </div>

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

export default ProcessLargeNumber
