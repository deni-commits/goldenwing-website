"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const hasAnimatedRef = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  // Calculate min-width based on final value to prevent CLS
  const minWidth = useMemo(() => {
    const digitCount = String(end).length + prefix.length + suffix.length
    return `${digitCount * 0.65}em`
  }, [end, prefix, suffix])

  const animateCount = useCallback(() => {
    const startTime = performance.now()

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(end * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [end, duration])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            animateCount()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animateCount])

  return (
    <span
      ref={ref}
      className={cn("tabular-nums inline-block", className)}
      style={{ minWidth }}
    >
      {prefix}{count}{suffix}
    </span>
  )
}
