'use client'

import { Link } from '@/lib/i18n-navigation'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { useTranslations, useLocale } from 'next-intl'
import { useRef, useEffect, useState, ReactNode } from 'react'

interface Project {
  id: string
  title: string
  slug: string
  client: string
  category: string
  description: string
  mainImage?: {
    url?: string
    alt?: string
  }
}

interface FeaturedProjectsProps {
  projects: Project[]
  title?: string
  subtitle?: string
  showCTA?: boolean
}

// English translations for projects (fallback when CMS doesn't have EN content)
const projectTranslationsEN: Record<string, { title: string; description: string }> = {
  'domoferm': {
    title: 'Domoferm - B2B Digital Strategy',
    description: 'From digital invisibility to B2B market leader: How we catapulted an industrial giant into the digital age. A success story of strategic web design, SEO dominance, and measurable lead generation.',
  },
  'point-of-new': {
    title: 'Point of New - Brand Relaunch',
    description: 'When a brand shows its age: How we transformed Point of New from a dusty relic into a coveted lifestyle brand with a bold rebranding. A metamorphosis in gold.',
  },
  'lamberg': {
    title: 'LAMBERG - E-Commerce Success Story',
    description: 'From marketplace prisoner to e-commerce entrepreneur: How we built LAMBERG an online shop that not only looks good but sells. 300% more revenue is no coincidence.',
  },
  'simax': {
    title: 'SiMAX - Technology for Inclusion',
    description: 'When innovation meets inclusion: How we paved the way for a groundbreaking sign language technology into millions of apps. An SDK that breaks down barriers.',
  },
}

// CSS-based animation hook for CLS-safe animations
function useScrollAnimation(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
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

  return { ref, isVisible }
}

// Animated wrapper component
function AnimatedDiv({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, isVisible } = useScrollAnimation(delay)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
        transition: `opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

// Category colors for gradient overlays
const categoryGradients: Record<string, string> = {
  'branding': 'from-amber-500/80 to-orange-600/80',
  'webdesign': 'from-blue-500/80 to-cyan-600/80',
  'seo': 'from-emerald-500/80 to-green-600/80',
  'strategie': 'from-violet-500/80 to-purple-600/80',
  'content': 'from-rose-500/80 to-pink-600/80',
  'software': 'from-slate-600/80 to-zinc-800/80',
}

function getGradient(category: string): string {
  return categoryGradients[category] || 'from-zinc-700/80 to-zinc-900/80'
}

function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const tCommon = useTranslations('common')
  const locale = useLocale()
  const imageUrl = project.mainImage?.url

  // Use English translations when available
  const enTranslation = locale === 'en' ? projectTranslationsEN[project.slug] : null
  const title = enTranslation?.title || project.title
  const description = enTranslation?.description || project.description

  return (
    <Link href={{ pathname: '/projekte/[slug]', params: { slug: project.slug } }} className="group block h-full">
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-900 h-full">
        {/* Background Image or Gradient */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.mainImage?.alt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            quality={85}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(project.category)}`} />
        )}

        {/* Dark overlay - stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Category Badge - Top */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">
            {project.category}
          </span>
        </div>

        {/* Arrow - Top Right */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content - Bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-10">
          {/* Client - Always visible */}
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-primary">
            {project.client}
          </p>

          {/* Title - Always visible */}
          <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3 transition-transform duration-300 group-hover:-translate-y-1">
            {title}
          </h3>

          {/* Description - Only on hover */}
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-[opacity,max-height] duration-500 overflow-hidden">
            {description}
          </p>

          {/* View Project Link - Only on hover */}
          <div className="flex items-center gap-2 mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-500 delay-100">
            <span className="text-primary text-sm font-medium">{tCommon('viewProject')}</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function FeaturedProjects({
  projects,
  title,
  subtitle,
  showCTA = true,
}: FeaturedProjectsProps) {
  const tCommon = useTranslations('common')

  // Don't render section if no projects
  if (!projects || projects.length === 0) {
    return null
  }

  const displayProjects = projects.slice(0, 4)

  return (
    // CLS prevention: min-height + contain isolates this section
    <section
      className="py-24 md:py-32 md:min-h-[700px] lg:min-h-[650px]"
      style={{ contain: 'layout style' }}
    >
      {/* Header - in container */}
      <Container variant="block" className="mb-12">
        <AnimatedDiv className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {subtitle}
          </p>
        </AnimatedDiv>
      </Container>

      {/* Full-width Grid - edge to edge */}
      <div className="px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {displayProjects.map((project, index) => (
            <AnimatedDiv key={project.id} delay={index * 100}>
              <ProjectCard project={project} priority={index < 2} />
            </AnimatedDiv>
          ))}
        </div>
      </div>

      {/* CTA - in container */}
      {showCTA && (
        <Container variant="block">
          <AnimatedDiv className="mt-12 text-center" delay={400}>
            <Link href="/referenzen">
              <Button variant="outline" size="lg" className="group text-base">
                {tCommon('allProjects')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </AnimatedDiv>
        </Container>
      )}
    </section>
  )
}
