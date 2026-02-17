'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'
import { Link } from '@/lib/i18n-navigation'
import { Users, Target, Workflow, Award, TrendingUp, CheckCircle, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Icon mapping for WhyCard
const iconMap: Record<string, LucideIcon> = {
  'users': Users,
  'target': Target,
  'workflow': Workflow,
  'award': Award,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: 'lift' | 'glow' | 'border' | 'scale'
  delay?: number
}

const hoverEffects = {
  lift: 'hover:-translate-y-2 hover:shadow-xl',
  glow: 'hover:shadow-[0_0_30px_rgba(242,251,49,0.15)] dark:hover:shadow-[0_0_30px_rgba(242,251,49,0.2)]',
  border: 'hover:border-primary/50',
  scale: 'hover:scale-[1.02]',
}

// CSS-based animation hook with generic element type
function useScrollAnimation<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000)
          observer.disconnect()
        }
      },
      { rootMargin: '-30px', threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return { ref, isVisible }
}

export function AnimatedCard({
  children,
  className,
  hoverEffect = 'lift',
  delay = 0,
}: AnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(delay)

  return (
    <div
      ref={ref}
      className={cn(
        'p-6 rounded-xl border bg-background transition-all duration-300',
        hoverEffects[hoverEffect],
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

// Specialized card for "Why" section with icon animation
interface WhyCardProps {
  iconName: string
  title: string
  description: string
  delay?: number
}

export function WhyCard({ iconName, title, description, delay = 0 }: WhyCardProps) {
  const Icon = iconMap[iconName] || Users
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(delay)

  return (
    <div
      ref={ref}
      className="group p-6 rounded-xl border bg-background transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50 h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {/* Icon with hover animation */}
      <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
        <Icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

// Service card with arrow animation
interface ServiceCardProps {
  title: string
  description: string
  learnMore: string
  delay?: number
}

export function ServiceCard({ title, description, learnMore, delay = 0 }: ServiceCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(delay)

  return (
    <div
      ref={ref}
      className="group p-6 rounded-xl border bg-background transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50 h-full cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      <h3 className="font-semibold text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <span className="text-sm font-medium text-primary flex items-center">
        {learnMore}
        <svg
          className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </div>
  )
}

// Quality checklist item with stagger
interface QualityItemProps {
  text: string
  delay?: number
}

export function QualityItem({ text, delay = 0 }: QualityItemProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLLIElement>(delay)

  return (
    <li
      ref={ref}
      className="flex items-start gap-3 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-16px, 0, 0)',
        transition: 'opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      <svg
        className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-foreground transition-colors duration-300 group-hover:text-primary">
        {text}
      </span>
    </li>
  )
}

// Blog card with enhanced hover
interface BlogCardProps {
  category: string
  title: string
  excerpt: string
  delay?: number
}

export function BlogCard({ category, title, excerpt, delay = 0 }: BlogCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(delay)

  return (
    <article
      ref={ref}
      className="group bg-background border rounded-xl p-6 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        {category}
      </span>
      <h3 className="font-semibold text-lg mb-3 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{excerpt}</p>
    </article>
  )
}

// CTA Section - Simplified without Framer Motion
interface CTASectionProps {
  title: string
  subtitle: string
  primaryButton: string
  secondaryButton: string
}

export function CTASection({ title, subtitle, primaryButton, secondaryButton }: CTASectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(0)

  return (
    // CLS prevention: min-height + contain isolates section
    <section className="py-16 bg-foreground text-background relative overflow-hidden md:min-h-[280px]" style={{ contain: 'layout' }}>
      {/* Static Lime Glow Effects - no animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-30"
          style={{ backgroundColor: '#f2fb31' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: '#f2fb31' }}
        />
      </div>

      <div className="container relative">
        <div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
            transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
            willChange: 'opacity, transform',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#f2fb31', color: '#0a0a0a' }}
            >
              {primaryButton}
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/kontakt" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 border border-background/30 bg-transparent text-background hover:bg-background/10 transition-colors">
              {secondaryButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnimatedCard
