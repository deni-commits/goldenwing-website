'use client'

import { useRef, useEffect, useState } from 'react'
import { Search, Cog, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'

interface ProcessStep {
  step: string
  title: string
  description: string
}

interface ApproachSectionProps {
  title: string
  subtitle: string
  steps: ProcessStep[]
  className?: string
}

const stepIcons = [Search, Cog, TrendingUp]

// CSS-based animation hook
function useApproachAnimation() {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100)
          observer.disconnect()
        }
      },
      { rootMargin: '-100px', threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export function ApproachSection({ title, subtitle, steps, className }: ApproachSectionProps) {
  const { ref, isVisible } = useApproachAnimation()

  // CSS transition helper
  const getItemStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
    transition: `opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
    willChange: 'opacity, transform' as const,
  })

  const getLineStyle = () => ({
    transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
    transition: 'transform 1s cubic-bezier(0.42, 0, 0.58, 1) 300ms',
    transformOrigin: 'left',
  })

  const getDotStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transition: `opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
  })

  const getVerticalLineStyle = (delay: number) => ({
    transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
    transition: `transform 0.5s ease ${delay}ms`,
    transformOrigin: 'top',
  })

  return (
    // CLS prevention: min-height + contain isolates layout
    <section
      ref={ref}
      className={cn('py-20 md:py-28 bg-background overflow-hidden md:min-h-[550px]', className)}
      style={{ contain: 'layout' }}
    >
      <Container variant="block">
        <div>
          {/* Header */}
          <div className="text-center mb-16 md:mb-20" style={getItemStyle(0)}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Desktop Progress Line + Steps */}
          <div className="relative max-w-5xl mx-auto">
            {/* Progress Line Container (Desktop only) */}
            <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-[3px] z-0">
              {/* Background Line */}
              <div className="absolute inset-0 bg-border rounded-full" />
              {/* Animated Accent Line - Anthracite on light, Lime on dark */}
              <div
                className="absolute inset-0 rounded-full bg-[#2d2d2d] dark:bg-[#f2fb31]"
                style={getLineStyle()}
              />
            </div>

            {/* Dots on Line (Desktop only) - Anthracite on light, Lime on dark */}
            <div className="hidden md:flex absolute top-10 left-0 right-0 justify-between px-[16.66%] z-10">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border-4 border-background -translate-y-1/2 bg-[#2d2d2d] dark:bg-[#f2fb31] shadow-[0_0_20px_rgba(45,45,45,0.3)] dark:shadow-[0_0_20px_rgba(242,251,49,0.5)]"
                  style={getDotStyle(200 + index * 100)}
                />
              ))}
            </div>

            {/* Desktop Steps Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12 pt-16">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] || Search
                return (
                  <div
                    key={index}
                    className="approach-step group text-center"
                    style={getItemStyle(300 + index * 150)}
                  >
                    <div
                      className={cn(
                        'relative p-6 lg:p-8 rounded-2xl transition-all duration-300',
                        'hover:bg-muted/50 hover:-translate-y-2',
                        'hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(242,251,49,0.1)]'
                      )}
                    >
                      {/* Step Number - Anthracite on light, Lime on dark */}
                      <span
                        className={cn(
                          'block text-6xl lg:text-7xl font-bold mb-4',
                          'text-[#2d2d2d]/20 dark:text-[#f2fb31]/20 transition-colors duration-300',
                          'group-hover:text-[#2d2d2d] dark:group-hover:text-[#f2fb31]'
                        )}
                      >
                        {step.step}
                      </span>

                      {/* Icon */}
                      <div
                        className={cn(
                          'flex justify-center mb-4',
                          'text-muted-foreground transition-colors duration-300',
                          'group-hover:text-[#2d2d2d] dark:group-hover:text-[#f2fb31]'
                        )}
                      >
                        <Icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl lg:text-2xl font-semibold mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="md:hidden space-y-0">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] || Search
                return (
                  <div
                    key={index}
                    className="relative pl-10 pb-10 last:pb-0"
                    style={getItemStyle(200 + index * 150)}
                  >
                    {/* Vertical Line - Anthracite on light, Lime on dark */}
                    {index < steps.length - 1 && (
                      <div
                        className="absolute left-[9px] top-6 bottom-0 w-[3px] bg-[#2d2d2d] dark:bg-[#f2fb31]"
                        style={getVerticalLineStyle(500 + index * 200)}
                      />
                    )}

                    {/* Dot - Anthracite on light, Lime on dark */}
                    <div
                      className="absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-background z-10 bg-[#2d2d2d] dark:bg-[#f2fb31] shadow-[0_0_15px_rgba(45,45,45,0.3)] dark:shadow-[0_0_15px_rgba(242,251,49,0.5)]"
                      style={getDotStyle(200 + index * 100)}
                    />

                    {/* Content */}
                    <div className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-[#2d2d2d] dark:text-[#f2fb31]">
                          {step.step}
                        </span>
                        <Icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ApproachSection
