'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ProcessSectionProps } from './types'

export function ProcessVerticalStepper({
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2
            className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight text-neutral-900 dark:text-white"
          >
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-5 md:left-7 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-neutral-700"
          />

          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                flex gap-4 md:gap-10 cursor-pointer
                ${i === steps.length - 1 ? '' : 'mb-4 md:mb-5'}
              `}
            >
              {/* Circle Indicator */}
              <div
                className={`
                w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center
                text-sm md:text-base font-semibold flex-shrink-0 z-10 transition-all duration-300
                border-2 ${
                  hoveredIndex === i
                    ? 'bg-[#2d2d2d] dark:bg-white border-[#2d2d2d] dark:border-white text-white dark:text-neutral-900'
                    : 'bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-600 text-gray-500 dark:text-gray-400'
                }
              `}
              >
                {step.num}
              </div>

              {/* Content Card */}
              <div
                className={`
                flex-1 p-5 md:p-8 rounded-2xl transition-all duration-[400ms]
                ${
                  hoveredIndex === i
                    ? 'bg-[#2d2d2d] dark:bg-white translate-x-2 shadow-lg'
                    : 'bg-white dark:bg-neutral-800'
                }
              `}
              >
                <h3
                  className={`
                  text-lg md:text-xl font-semibold mb-2 transition-colors duration-300
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

export default ProcessVerticalStepper
