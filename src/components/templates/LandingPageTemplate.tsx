'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/Container'
import { MotionSection } from '@/components/ui/AnimatedSection'
import { LucideIcon, CheckCircle, ChevronDown, ArrowRight, Phone } from '@/lib/icon-map'
import type { LandingPageContent } from '@/lib/landing-pages/types'

interface LandingPageTemplateProps {
  content: LandingPageContent
  locale: string
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="border-border bg-card overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`text-muted-foreground h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function LandingPageTemplate({ content, locale }: LandingPageTemplateProps) {
  const {
    hero,
    trustSignals,
    benefits,
    results,
    services,
    packages,
    process,
    technologies,
    faqs,
    relatedServices,
    labels,
  } = content

  return (
    <>
      {/* Hero */}
      <section className="bg-foreground text-background relative flex min-h-[70vh] items-center px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <MotionSection variant="fadeUp">
            <span className="border-primary/30 bg-primary/10 text-primary mb-4 inline-block rounded-full border px-4 py-1.5 text-sm font-medium">
              {hero.badge}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{hero.title}</h1>
            <p className="text-background/70 mx-auto mb-8 max-w-2xl text-lg">{hero.description}</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}/kontakt`}
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20 inline-flex items-center gap-2 rounded-lg px-8 py-3 font-semibold transition-all hover:shadow-lg"
              >
                {hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+4369917100100"
                className="border-background/20 text-background hover:bg-background/10 inline-flex items-center gap-2 rounded-lg border px-8 py-3 font-semibold transition-colors"
              >
                <Phone className="h-4 w-4" />
                {hero.ctaSecondary}
              </a>
            </div>

            {/* Trust Signals inline in Hero */}
            {trustSignals && trustSignals.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {trustSignals.map((signal, i) => (
                  <div key={i} className="text-background/60 flex items-center gap-2 text-sm">
                    <LucideIcon name={signal.icon} className="h-4 w-4" />
                    <span>{signal.text}</span>
                  </div>
                ))}
              </div>
            )}
          </MotionSection>
        </div>
      </section>

      {/* Benefits */}
      {benefits && benefits.length > 0 && (
        <Section padding="lg">
          <MotionSection variant="fadeUp" stagger={0.08}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="border-border bg-card group rounded-xl border p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                    <LucideIcon name={benefit.icon} className="text-primary h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <Section variant="light" padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-12 text-center text-3xl font-bold">{labels.resultsTitle}</h2>
          </MotionSection>
          <MotionSection variant="fadeUp" stagger={0.1}>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((result, i) => (
                <div key={i} className="text-center">
                  <div className="text-primary mb-2 text-4xl font-bold">{result.metric}</div>
                  <div className="mb-1 font-semibold">{result.label}</div>
                  <div className="text-muted-foreground text-sm">{result.detail}</div>
                </div>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* Services */}
      {services && services.length > 0 && (
        <Section padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-2 text-center text-3xl font-bold">{labels.servicesTitle}</h2>
            <p className="text-muted-foreground mb-12 text-center">{labels.servicesDescription}</p>
          </MotionSection>
          <MotionSection variant="fadeUp" stagger={0.08}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="border-border bg-card group rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <LucideIcon name={service.icon} className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* Packages */}
      {packages && packages.length > 0 && (
        <Section id="packages" variant="light" padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-2 text-center text-3xl font-bold">{labels.pricingTitle}</h2>
            <p className="text-muted-foreground mb-12 text-center">{labels.pricingDescription}</p>
          </MotionSection>
          <MotionSection variant="fadeUp" stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    pkg.popular
                      ? 'border-primary bg-card shadow-primary/10 shadow-lg'
                      : 'border-border bg-card shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <span className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold">
                      {labels.popular}
                    </span>
                  )}
                  <h3 className="mb-1 text-xl font-bold">{pkg.name}</h3>
                  <div className="text-primary mb-1 text-3xl font-bold">{pkg.price}</div>
                  {pkg.priceType && <div className="text-muted-foreground mb-4 text-sm">{pkg.priceType}</div>}
                  <p className="text-muted-foreground mb-6 text-sm">{pkg.description}</p>
                  <ul className="mb-6 space-y-2.5">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/kontakt`}
                    className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-md'
                        : 'border-border hover:border-primary/40 hover:text-primary border'
                    }`}
                  >
                    {labels.sendRequest}
                  </Link>
                </div>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* Process */}
      {process && process.length > 0 && (
        <Section padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-2 text-center text-3xl font-bold">{labels.processTitle}</h2>
            <p className="text-muted-foreground mb-12 text-center">{labels.processSubtitle}</p>
          </MotionSection>
          <MotionSection variant="fadeUp" stagger={0.1}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, i) => (
                <div
                  key={i}
                  className="border-border bg-card group relative overflow-hidden rounded-xl border p-6 transition-all duration-[400ms] ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Animated top border */}
                  <div className="bg-primary absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-[400ms] ease-out group-hover:scale-x-100" />
                  <div className="text-muted-foreground/40 mb-3 text-xs font-bold tracking-widest uppercase">
                    {step.step.padStart(2, '0')}
                  </div>
                  <h3 className="group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <Section variant="light" padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-2 text-center text-3xl font-bold">{labels.technologiesTitle}</h2>
            <p className="text-muted-foreground mb-12 text-center">{labels.technologiesDescription}</p>
          </MotionSection>
          <MotionSection variant="fadeUp">
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="border-border bg-card hover:border-primary/40 hover:text-primary rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* FAQs - 2-Column Layout */}
      {faqs && faqs.length > 0 && (
        <Section padding="lg">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <MotionSection variant="fadeUp">
              <div className="lg:sticky lg:top-24">
                <h2 className="mb-4 text-3xl font-bold">{labels.faqTitle}</h2>
                <p className="text-muted-foreground">{labels.faqSubtitle}</p>
              </div>
            </MotionSection>
            <MotionSection variant="fadeUp" delay={0.1}>
              <FAQAccordion faqs={faqs} />
            </MotionSection>
          </div>
        </Section>
      )}

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <Section variant="light" padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-12 text-center text-3xl font-bold">{labels.relatedServicesTitle}</h2>
          </MotionSection>
          <MotionSection variant="fadeUp" stagger={0.08}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service, i) => (
                <Link
                  key={i}
                  href={`/${locale}${service.href}`}
                  className="group border-border bg-card rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="group-hover:text-primary mb-2 font-semibold transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{service.description}</p>
                  <span className="text-primary inline-flex items-center gap-1 text-sm font-medium">
                    {labels.learnMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* CTA - Neon Green */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <MotionSection variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">{labels.ctaTitle}</h2>
              <p className="mb-8 opacity-90">{labels.ctaDescription}</p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href={`/${locale}/kontakt`}
                  className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-2 rounded-lg px-8 py-3 font-semibold transition-all hover:shadow-lg"
                >
                  {labels.ctaButton}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+4369917100100"
                  className="border-primary-foreground/30 hover:bg-primary-foreground/10 inline-flex items-center gap-2 rounded-lg border px-8 py-3 font-semibold transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +43 699 171 00 100
                </a>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>
    </>
  )
}
