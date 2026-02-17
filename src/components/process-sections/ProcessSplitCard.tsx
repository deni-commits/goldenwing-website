'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ProcessSectionProps } from './types'

export function ProcessSplitCard({
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <h2
              className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight text-neutral-900 dark:text-white"
            >
              {title}
            </h2>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] rounded-2xl overflow-hidden
                cursor-pointer transition-all duration-[400ms]
                ${hoveredIndex === i ? 'scale-[1.02]' : 'scale-100'}
                bg-gray-50 dark:bg-neutral-800
              `}
            >
              {/* Number Side */}
              <div
                className={`
                flex items-center justify-center transition-colors duration-[400ms]
                ${
                  hoveredIndex === i
                    ? 'bg-[#2d2d2d] dark:bg-white'
                    : 'bg-gray-100 dark:bg-neutral-700'
                }
              `}
              >
                <span
                  className={`
                  text-2xl md:text-3xl font-bold transition-colors duration-300
                  ${
                    hoveredIndex === i
                      ? 'text-white dark:text-neutral-900'
                      : 'text-gray-400 dark:text-gray-400'
                  }
                `}
                >
                  {step.num}
                </span>
              </div>

              {/* Content Side */}
              <div className="p-6 md:p-9">
                <h3
                  className="text-lg md:text-xl font-semibold mb-2 text-neutral-900 dark:text-white"
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-gray-500 dark:text-gray-400"
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

export default ProcessSplitCard
