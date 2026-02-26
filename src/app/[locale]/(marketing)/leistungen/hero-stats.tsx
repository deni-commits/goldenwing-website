'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface HeroStatsProps {
  stats: Array<{
    value: string
    label: string
    animated?: boolean
  }>
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="flex gap-8 border-t border-white/[0.04] dark:border-white/[0.04] pt-7 mt-8">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  )
}

function StatItem({ value, label, animated = false }: { value: string; label: string; animated?: boolean }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animated])

  useEffect(() => {
    if (!isVisible || !animated) return

    const target = parseInt(value.replace(/\D/g, ''))
    if (isNaN(target)) return

    const duration = 1500
    const step = Math.ceil(target / 50)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / 50)

    return () => clearInterval(timer)
  }, [isVisible, value, animated])

  return (
    <div ref={ref} className="flex-1">
      <div className={cn(
        'font-[family-name:var(--font-bricolage)] text-[2rem] font-extrabold leading-[0.9] tracking-[-0.03em]',
        'text-primary dark:text-[#f2fb31]'
      )}>
        {animated && isVisible ? `${count}+` : value}
      </div>
      <div className="text-[0.65rem] text-neutral-400 dark:text-white/30 mt-0.5">
        {label}
      </div>
    </div>
  )
}
