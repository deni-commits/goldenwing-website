'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Step {
  number: string
  title: string
  description?: string
}

interface ProcessStepsProps {
  steps: Step[]
  variant?: 'dark' | 'light'
}

export function ProcessSteps({ steps, variant = 'dark' }: ProcessStepsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-50px', threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const textColor = 'text-foreground'
  const mutedColor = 'text-muted-foreground'
  const lineColor = 'bg-border'

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div className="relative hidden md:block">
        {/* Progress Line */}
        <div className={cn('absolute top-7 right-0 left-0 h-0.5', lineColor)}>
          <div
            className="bg-primary h-full"
            style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 1s cubic-bezier(0.42, 0, 0.58, 1) 0.3s',
            }}
          />
        </div>

        {/* Dots */}
        <div
          className="absolute top-7 right-0 left-0 flex justify-between"
          style={{ padding: `0 calc(100% / ${steps.length * 2})` }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              className="border-primary bg-background h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.4s ease-out ${0.5 + i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div className={cn('grid gap-8 pt-16', `grid-cols-${steps.length}`)}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="group hover:bg-muted/50 cursor-default rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${0.3 + i * 0.15}s, transform 0.5s ease ${0.3 + i * 0.15}s`,
              }}
            >
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold">
                {step.number}
              </div>
              <h3 className={cn('mb-2 text-xl font-semibold', textColor)}>{step.title}</h3>
              {step.description && <p className={cn('text-sm', mutedColor)}>{step.description}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="space-y-0 md:hidden">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative pb-10 pl-12 last:pb-0"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.5s ease ${0.3 + i * 0.15}s, transform 0.5s ease ${0.3 + i * 0.15}s`,
            }}
          >
            {i < steps.length - 1 && (
              <div className={cn('absolute top-0 bottom-0 left-[18px] w-0.5', lineColor)}>
                <div
                  className="bg-primary h-full w-full"
                  style={{
                    transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                    transition: `transform 0.5s ease ${0.3 + i * 0.2}s`,
                  }}
                />
              </div>
            )}
            <div className="bg-primary text-primary-foreground absolute top-1 left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
              {step.number}
            </div>
            <h3 className={cn('mb-1 text-lg font-semibold', textColor)}>{step.title}</h3>
            {step.description && <p className={cn('text-sm', mutedColor)}>{step.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
