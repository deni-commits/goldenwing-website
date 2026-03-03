'use client'

import { useRef, useState, useEffect, Children, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'

// =============================================
// Original IntersectionObserver-based system
// (kept for backward compatibility)
// =============================================

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
      { rootMargin: '-30px', threshold: 0.1 },
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
      case 'up':
        return 'translate3d(0, 24px, 0)'
      case 'down':
        return 'translate3d(0, -24px, 0)'
      case 'left':
        return 'translate3d(24px, 0, 0)'
      case 'right':
        return 'translate3d(-24px, 0, 0)'
      case 'none':
        return 'translate3d(0, 0, 0)'
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

export function StaggerItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode
  className?: string
  index?: number
}) {
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

// =============================================
// Framer-motion based system (opt-in)
// =============================================

type MotionVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'none'

const variantMap: Record<MotionVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

const reducedVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

interface MotionSectionProps {
  children: ReactNode
  className?: string
  variant?: MotionVariant
  stagger?: number
  delay?: number
  duration?: number
  once?: boolean
  as?: 'div' | 'section' | 'article' | 'ul'
}

export function MotionSection({
  children,
  className,
  variant = 'fadeUp',
  stagger = 0,
  delay = 0,
  duration = 0.5,
  once = true,
  as = 'div',
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-40px 0px' })
  const shouldReduce = useReducedMotion()

  const Container = motion[as] as typeof motion.div

  const containerVariants: Variants = shouldReduce
    ? reducedVariants
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }

  const itemVariants = shouldReduce ? reducedVariants : variantMap[variant]

  if (stagger > 0) {
    return (
      <Container
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {Children.map(children, (child) => (
          <motion.div variants={itemVariants} transition={{ duration, ease: [0.25, 0.4, 0.25, 1] }}>
            {child}
          </motion.div>
        ))}
      </Container>
    )
  }

  return (
    <Container
      ref={ref}
      className={className}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </Container>
  )
}

export function MotionItem({
  children,
  className,
  variant = 'fadeUp',
  duration = 0.5,
}: {
  children: ReactNode
  className?: string
  variant?: MotionVariant
  duration?: number
}) {
  const shouldReduce = useReducedMotion()
  const itemVariants = shouldReduce ? reducedVariants : variantMap[variant]

  return (
    <motion.div className={className} variants={itemVariants} transition={{ duration, ease: [0.25, 0.4, 0.25, 1] }}>
      {children}
    </motion.div>
  )
}

export { useScrollAnimation }
