'use client'

import { useRef, useState, useEffect } from 'react'

interface ProcessSectionProps {
  heading?: string
  subline?: string
  steps: Array<{ step: string; title: string; description?: string }>
}

const icons = [
  // Search
  <svg key="search" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
  // Cog
  <svg key="cog" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>,
  // TrendingUp
  <svg key="trending" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
]

export function ProcessSection({ heading, subline, steps }: ProcessSectionProps) {
  const ref = useRef<HTMLElement>(null)
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
      { rootMargin: '-30px', threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const getItemStyle = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${0.3 + index * 0.15}s, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${0.3 + index * 0.15}s`,
  })

  return (
    <section ref={ref} className="overflow-hidden py-20 md:py-28">
      <div className="container">
        {/* Header */}
        <div
          className="mb-16 text-center md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          {heading && <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{heading}</h2>}
          {subline && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subline}</p>}
        </div>

        {/* Desktop: Progress Line + Grid */}
        <div className="relative mx-auto hidden max-w-5xl md:block">
          {/* Animated Line */}
          <div className="absolute left-0 right-0 top-7 h-0.5 bg-border">
            <div
              className="h-full bg-primary"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1s cubic-bezier(0.42, 0, 0.58, 1) 0.3s',
              }}
            />
          </div>
          {/* Dots */}
          <div className="absolute left-0 right-0 top-7 flex justify-between px-[calc(100%/6)]">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-primary bg-background"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.4s ease-out ${0.5 + i * 0.2}s`,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 lg:gap-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group cursor-default rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-muted/50 hover:shadow-xl"
                style={getItemStyle(i)}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground">
                  {icons[i] || icons[0]}
                </div>
                <div className="mb-2 text-sm font-medium text-muted-foreground">{step.step}</div>
                <h3 className="mb-2 text-xl font-semibold lg:text-2xl">{step.title}</h3>
                {step.description && (
                  <p className="text-sm text-muted-foreground lg:text-base">{step.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="space-y-0 md:hidden">
          {steps.map((step, i) => (
            <div key={i} className="relative pb-10 pl-10 last:pb-0" style={getItemStyle(i)}>
              {/* Vertical Line */}
              {i < steps.length - 1 && (
                <div className="absolute bottom-0 left-[18px] top-0 w-0.5 bg-border">
                  <div
                    className="h-full w-full bg-primary"
                    style={{
                      transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: `transform 0.5s ease ${0.3 + i * 0.2}s`,
                    }}
                  />
                </div>
              )}
              {/* Dot */}
              <div
                className="absolute left-3 top-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.4s ease-out ${0.3 + i * 0.1}s`,
                }}
              />
              <div className="text-sm font-medium text-muted-foreground">{step.step}</div>
              <h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
              {step.description && <p className="text-sm text-muted-foreground">{step.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
