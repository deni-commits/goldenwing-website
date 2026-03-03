'use client'

import { useRef, useState, useEffect } from 'react'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  duration?: number
}

export function AnimatedNumber({ value, suffix = '', duration = 2000 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true)
          observer.disconnect()

          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4)
            setDisplay(Math.round(eased * value))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  const digits = String(value).length
  const minWidth = `${digits + (suffix ? suffix.length : 0)}ch`

  return (
    <span
      ref={ref}
      style={{ fontVariantNumeric: 'tabular-nums', minWidth, display: 'inline-block' }}
    >
      {display}{suffix}
    </span>
  )
}
