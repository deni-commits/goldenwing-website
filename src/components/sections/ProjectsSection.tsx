'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection, StaggerItem } from '@/components/ui/AnimatedSection'

interface ProjectsSectionProps {
  projects: any[]
  locale: string
  heading: string
  viewAllLabel: string
}

export function ProjectsSection({ projects, locale, heading, viewAllLabel }: ProjectsSectionProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-2 px-2 sm:grid-cols-2 sm:gap-4 sm:px-4 lg:grid-cols-4">
          {projects.map((cs: any, i: number) => {
            const image = cs.featuredImage as any | null
            return (
              <StaggerItem key={cs.id as string} index={i}>
                <Link
                  href={`/${locale}/referenzen/${cs.slug as string}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 md:aspect-[3/4]"
                >
                  {/* Image */}
                  {image?.url && (
                    <Image
                      src={image.url as string}
                      alt={(image.alt as string) || (cs.title as string)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Arrow (hover) */}
                  <div className="absolute right-4 top-4 z-10 flex h-10 w-10 translate-x-2 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <p className="mb-2 text-xs uppercase tracking-wider text-white/50 transition-colors duration-300 group-hover:text-primary">
                      {cs.client as string}
                    </p>
                    <h3 className="mb-3 text-xl font-bold leading-tight text-white transition-transform duration-300 group-hover:-translate-y-1 md:text-2xl">
                      {cs.title as string}
                    </h3>
                    {cs.results && (cs.results as any[]).length > 0 && (
                      <div className="flex flex-wrap gap-2 overflow-hidden opacity-0 transition-[opacity,max-height] duration-500 group-hover:max-h-20 group-hover:opacity-100" style={{ maxHeight: 0 }}>
                        {(cs.results as any[]).slice(0, 3).map((r: any, j: number) => (
                          <span key={j} className="rounded-md bg-white/10 px-2 py-1 text-xs text-white backdrop-blur-sm">
                            <strong className="text-primary">{r.value}</strong> {r.metric}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.3}>
          <Link
            href={`/${locale}/referenzen`}
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-base font-semibold transition-colors hover:border-primary/50 hover:text-primary"
          >
            {viewAllLabel}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
