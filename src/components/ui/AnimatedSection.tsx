'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'

function useScrollAnimation<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay * 1000)
          } else {
            setIsVisible(true)
          }
          observer.disconnect()
        }
      },
      { rootMargin: '-30px', threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return { ref, isVisible }
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function AnimatedSection({ children, className, delay = 0, direction = 'up' }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(delay)

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate3d(0, 24px, 0)'
      case 'down': return 'translate3d(0, -24px, 0)'
      case 'left': return 'translate3d(24px, 0, 0)'
      case 'right': return 'translate3d(-24px, 0, 0)'
      case 'none': return 'translate3d(0, 0, 0)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform(),
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.4, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.4, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

export function StaggerItem({ children, className, index = 0 }: { children: ReactNode; className?: string; index?: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(index * 0.1)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: `opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

export { useScrollAnimation }
