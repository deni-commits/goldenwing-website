'use client'

import Link from 'next/link'
import { Section } from '@/components/ui/Container'
import { MotionSection } from '@/components/ui/AnimatedSection'
import type { LandingPageContent } from '@/lib/landing-pages/types'

interface LandingPageTemplateProps {
  content: LandingPageContent
  locale: string
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
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-8 py-3 font-semibold transition-colors"
              >
                {hero.ctaPrimary}
              </Link>
              <a
                href="#packages"
                className="border-background/20 text-background hover:bg-background/10 inline-block rounded-lg border px-8 py-3 font-semibold transition-colors"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Trust Signals */}
      {trustSignals && trustSignals.length > 0 && (
        <Section variant="light" padding="sm">
          <MotionSection variant="fadeUp">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {trustSignals.map((signal, i) => (
                <div key={i} className="text-muted-foreground flex items-center gap-2 text-sm">
                  <span className="text-lg">{signal.icon}</span>
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* Benefits */}
      {benefits && benefits.length > 0 && (
        <Section padding="lg">
          <MotionSection variant="fadeUp" stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="border-border bg-card rounded-xl border p-6">
                  <span className="mb-3 block text-2xl">{benefit.icon}</span>
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
          <MotionSection variant="fadeUp" stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <div key={i} className="border-border bg-card rounded-xl border p-6">
                  <span className="mb-3 block text-2xl">{service.icon}</span>
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
                  className={`relative rounded-xl border p-6 ${
                    pkg.popular ? 'border-primary bg-card shadow-primary/10 shadow-lg' : 'border-border bg-card'
                  }`}
                >
                  {pkg.popular && (
                    <span className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold">
                      {labels.popular}
                    </span>
                  )}
                  <h3 className="mb-1 text-xl font-bold">{pkg.name}</h3>
                  <div className="text-primary mb-1 text-3xl font-bold">{pkg.price}</div>
                  {pkg.priceType && <div className="text-muted-foreground mb-4 text-sm">{pkg.priceType}</div>}
                  <p className="text-muted-foreground mb-6 text-sm">{pkg.description}</p>
                  <ul className="mb-6 space-y-2">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">&#10003;</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/kontakt`}
                    className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border hover:bg-muted border'
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
            <div className="mx-auto grid max-w-3xl gap-8">
              {process.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-primary text-primary-foreground flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
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
                <span key={i} className="border-border bg-card rounded-full border px-4 py-2 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <Section padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-2 text-center text-3xl font-bold">{labels.faqTitle}</h2>
            <p className="text-muted-foreground mb-12 text-center">{labels.faqSubtitle}</p>
          </MotionSection>
          <MotionSection variant="fadeUp">
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-border bg-card rounded-xl border">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold">
                    {faq.question}
                    <span className="text-muted-foreground ml-4 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="text-muted-foreground px-5 pb-5 text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <Section variant="light" padding="lg">
          <MotionSection variant="fadeUp">
            <h2 className="mb-12 text-center text-3xl font-bold">{labels.relatedServicesTitle}</h2>
          </MotionSection>
          <MotionSection variant="fadeUp" stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service, i) => (
                <Link
                  key={i}
                  href={`/${locale}${service.href}`}
                  className="group border-border bg-card hover:border-primary/50 rounded-xl border p-6 transition-colors"
                >
                  <h3 className="group-hover:text-primary mb-2 font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{service.description}</p>
                  <span className="text-primary text-sm font-medium">{labels.learnMore} &rarr;</span>
                </Link>
              ))}
            </div>
          </MotionSection>
        </Section>
      )}

      {/* CTA */}
      <Section padding="lg">
        <MotionSection variant="fadeUp">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">{labels.ctaTitle}</h2>
            <p className="text-muted-foreground mb-8">{labels.ctaDescription}</p>
            <Link
              href={`/${locale}/kontakt`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-8 py-3 font-semibold transition-colors"
            >
              {labels.ctaButton}
            </Link>
          </div>
        </MotionSection>
      </Section>
    </>
  )
}
