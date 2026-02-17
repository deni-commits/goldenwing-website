'use client'

import { useRef, ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
}

// CSS-only animation component for better CLS performance
// Uses CSS transitions which are GPU-composited by default
export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay via setTimeout for staggered effects
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
          observer.disconnect()
        }
      },
      { rootMargin: '-50px', threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  // Map direction to CSS transform
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate3d(0, 24px, 0)'
      case 'down': return 'translate3d(0, -24px, 0)'
      case 'left': return 'translate3d(24px, 0, 0)'
      case 'right': return 'translate3d(-24px, 0, 0)'
      case 'none': return 'translate3d(0, 0, 0)'
      default: return 'translate3d(0, 24px, 0)'
    }
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
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

// Stagger container for multiple children - simplified for CLS performance
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className = '',
}: StaggerContainerProps) {
  // Simple pass-through - staggering handled by individual items
  return (
    <div className={cn(className)}>
      {children}
    </div>
  )
}

// Stagger item (child of StaggerContainer) - CSS-based for CLS performance
interface StaggerItemProps {
  children: ReactNode
  className?: string
  index?: number
}

export function StaggerItem({ children, className = '', index = 0 }: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay based on index
          setTimeout(() => {
            setIsVisible(true)
          }, index * 100)
          observer.disconnect()
        }
      },
      { rootMargin: '-30px', threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: 'opacity 0.4s cubic-bezier(0.25, 0.4, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.4, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
