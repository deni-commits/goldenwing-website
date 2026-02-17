'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ProcessSectionProps } from './types'

export function ProcessExpandingRows({
  title,
  subtitle,
  steps,
  className = '',
  cta,
}: ProcessSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      className={`py-16 md:py-24 px-5 md:px-10 bg-gray-50 dark:bg-neutral-900 ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight text-neutral-900 dark:text-white"
          >
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                grid grid-cols-1 md:grid-cols-[80px_200px_1fr] gap-4 md:gap-10 items-start md:items-center
                cursor-pointer transition-all duration-[400ms]
                ${
                  hoveredIndex === i
                    ? 'bg-[#2d2d2d] dark:bg-white rounded-2xl py-6 md:py-10 px-5 md:px-8 my-2'
                    : 'py-5 md:py-7 px-5 md:px-8 border-b border-gray-200 dark:border-neutral-800'
                }
              `}
            >
              <span
                className={`
                text-xs md:text-sm font-semibold tracking-widest transition-colors duration-300
                ${
                  hoveredIndex === i
                    ? 'text-gray-500 dark:text-gray-400'
                    : 'text-gray-400 dark:text-gray-500'
                }
              `}
              >
                {step.num}
              </span>

              <h3
                className={`
                text-xl md:text-2xl font-semibold transition-colors duration-300
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
                text-sm leading-relaxed transition-all duration-300
                ${
                  hoveredIndex === i
                    ? 'text-gray-400 dark:text-gray-600 opacity-100 translate-x-0'
                    : 'text-gray-500 dark:text-gray-400 opacity-80 md:-translate-x-2'
                }
              `}
              >
                {step.description}
              </p>
            </div>
          ))}
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

export default ProcessExpandingRows
