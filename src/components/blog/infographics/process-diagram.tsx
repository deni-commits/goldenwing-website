'use client'

import { useEffect, useState, useRef } from 'react'

interface ProcessStep {
  title: string
  description?: string
  icon?: React.ReactNode
}

interface ProcessDiagramProps {
  title?: string
  steps: ProcessStep[]
  variant?: 'horizontal' | 'vertical'
}

export function ProcessDiagram({
  title,
  steps,
  variant = 'horizontal',
}: ProcessDiagramProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index])
            }, index * 300)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [steps])

  const isHorizontal = variant === 'horizontal'

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 my-8 border border-border/50"
    >
      {title && (
        <h4 className="font-semibold text-foreground mb-6 text-center">{title}</h4>
      )}

      <div
        className={`
          ${isHorizontal ? 'flex flex-wrap justify-center gap-4 md:gap-2' : 'space-y-4'}
        `}
      >
        {steps.map((step, index) => {
          const isVisible = visibleSteps.includes(index)
          const isLast = index === steps.length - 1

          return (
            <div
              key={index}
              className={`
                flex items-center
                ${isHorizontal ? 'flex-col md:flex-row' : ''}
              `}
            >
              {/* Step */}
              <div
                className={`
                  relative flex flex-col items-center text-center
                  transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
              >
                {/* Circle with number */}
                <div
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-amber-400 to-amber-500
                    text-white font-bold text-lg shadow-lg
                    transition-transform duration-300
                    ${isVisible ? 'scale-100' : 'scale-0'}
                  `}
                >
                  {step.icon || (index + 1)}
                </div>

                {/* Title & Description */}
                <div className="mt-3 max-w-[140px]">
                  <p className="font-medium text-foreground text-sm">{step.title}</p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow */}
              {!isLast && (
                <div
                  className={`
                    ${isHorizontal ? 'hidden md:block mx-4' : 'flex justify-center my-2'}
                    transition-all duration-500
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{ transitionDelay: '200ms' }}
                >
                  {isHorizontal ? (
                    <svg
                      className="w-8 h-8 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
