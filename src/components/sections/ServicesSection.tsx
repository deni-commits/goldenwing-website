'use client'

import Link from 'next/link'
import { AnimatedSection, StaggerItem } from '@/components/ui/AnimatedSection'

interface ServicesSectionProps {
  services: any[]
  locale: string
  heading: string
  subtitle: string
  allServicesLabel: string
}

export function ServicesSection({ services, locale, heading, subtitle, allServicesLabel }: ServicesSectionProps) {
  return (
    <section className="py-20">
      <div className="container">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any, i: number) => (
            <StaggerItem key={service.id as string} index={i}>
              <Link
                href={`/${locale}/leistungen/${service.slug as string}`}
                className="group relative block overflow-hidden rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <span className="text-xl text-primary">&#9733;</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                    {service.title as string}
                  </h3>
                  {service.excerpt && (
                    <p className="mb-4 text-sm text-muted-foreground">{service.excerpt as string}</p>
                  )}
                  <span className="flex items-center text-sm font-medium text-primary">
                    {allServicesLabel.split(' ')[0]}
                    <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.3}>
          <Link
            href={`/${locale}/leistungen`}
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-base font-semibold transition-colors hover:border-primary/50 hover:text-primary"
          >
            {allServicesLabel}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
