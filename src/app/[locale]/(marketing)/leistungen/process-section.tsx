'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProcessStep {
  num: string
  title: string
  description: string
}

interface ProcessSectionProps {
  eyebrow: string
  title: string
  titleHighlight: string
  description: string
  steps: ProcessStep[]
}

export function ProcessSection({ eyebrow, title, titleHighlight, description, steps }: ProcessSectionProps) {
  const stepsRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!stepsRef.current) return
      const rect = stepsRef.current.getBoundingClientRect()
      const winH = window.innerHeight
      const total = rect.height - winH * 0.5
      if (rect.top > winH) { setProgress(0); return }
      if (rect.bottom - winH * 0.5 < 0) { setProgress(100); return }
      const pct = Math.min(100, Math.max(0, ((winH - rect.top) / (total + winH * 0.5)) * 100))
      setProgress(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="max-w-[1520px] mx-auto py-24 lg:py-32 px-5 sm:px-9 lg:px-16">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* Left: Sticky title */}
        <div className="lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2.5 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-primary dark:text-[#f2fb31] mb-6">
            <span className="w-[6px] h-[6px] bg-primary dark:bg-[#f2fb31] rotate-45 animate-pulse" style={{ animationDuration: '3s' }} />
            {eyebrow}
          </div>
          <h2 className={cn(
            'font-[family-name:var(--font-bricolage)] text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-[-0.04em] leading-[0.95] mb-4',
            'text-neutral-900 dark:text-white'
          )}>
            {title}<br />
            <span className="text-primary dark:text-[#f2fb31]">{titleHighlight}</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-[0.85rem] leading-[1.75] max-w-[360px]">
            {description}
          </p>
        </div>

        {/* Right: Steps */}
        <div ref={stepsRef} className="relative pl-14">
          {/* Progress bar */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/[0.03] dark:bg-white/[0.03] rounded-full">
            <div 
              className="w-full rounded-full transition-[height] duration-300 ease-out"
              style={{ 
                height: `${progress}%`,
                background: 'linear-gradient(180deg, #f2fb31, rgba(242,251,49,0.1))'
              }} 
            />
          </div>

          {steps.map((step, index) => (
            <StepItem key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepItem({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div 
      ref={ref}
      className={cn(
        'relative py-9 border-b border-white/[0.04] dark:border-white/[0.04] group',
        index === 0 && 'border-t',
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        !isVisible && 'opacity-0 translate-y-4',
        isVisible && 'opacity-100 translate-y-0'
      )}
    >
      <span className={cn(
        'absolute left-[-56px] top-[38px] font-[family-name:var(--font-bricolage)] text-[1.8rem] font-extrabold leading-none',
        'text-transparent [-webkit-text-stroke:1px_rgba(242,251,49,0.08)]',
        'transition-all duration-500',
        'group-hover:[-webkit-text-stroke-color:rgba(242,251,49,0.25)]'
      )}>
        {step.num}
      </span>
      <h4 className={cn(
        'font-[family-name:var(--font-bricolage)] text-[1.15rem] font-bold tracking-[-0.02em] mb-2',
        'text-neutral-900 dark:text-white',
        'transition-colors duration-400',
        'group-hover:text-primary dark:group-hover:text-[#f2fb31]'
      )}>
        {step.title}
      </h4>
      <p className="text-[0.78rem] text-neutral-500 dark:text-neutral-400 leading-[1.7]">
        {step.description}
      </p>
    </div>
  )
}
