'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ProcessSectionProps } from './types'

export function ProcessSlidingBorder({
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

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-gray-200 dark:border-neutral-700"
        >
          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                group relative p-6 md:p-12 cursor-pointer transition-all duration-300
                ${
                  i < steps.length - 1
                    ? 'border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-neutral-700 lg:last:border-r-0'
                    : ''
                }
                ${
                  hoveredIndex === i
                    ? 'bg-gray-50 dark:bg-neutral-800'
                    : ''
                }
              `}
            >
              {/* Sliding top border */}
              <div
                className={`
                absolute top-0 left-0 h-[3px]
                transition-all duration-[400ms] ease-out
                ${hoveredIndex === i ? 'w-full' : 'w-0'}
                bg-[#2d2d2d] dark:bg-primary
              `}
              />

              <span
                className="block text-xs font-semibold tracking-[0.15em] mb-4 md:mb-6 text-gray-400 dark:text-gray-500"
              >
                STEP {step.num}
              </span>

              <h3
                className="text-xl md:text-2xl font-semibold mb-3 text-neutral-900 dark:text-white"
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-gray-500 dark:text-gray-400"
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

export default ProcessSlidingBorder
