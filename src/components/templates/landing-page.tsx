/**
 * Landing Page Template
 *
 * Wiederverwendbares Template für alle Stadt/Region Landing Pages.
 * Unterstützt verschiedene Service-Typen (Webdesign, SEO, Branding, etc.)
 */

import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import {
  ArrowRight, CheckCircle, Star, Clock, Shield, Zap, Users, Award, Phone,
  Search, Palette, Code, LineChart, Target, Globe, FileText, BarChart3,
  TrendingUp, Rocket, Heart, Settings, Layers, LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Section } from '@/components/ui/container'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { FAQSection } from '@/components/sections/faq-section'
import { getContactUrl } from '@/lib/utils'

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'shield': Shield,
  'users': Users,
  'star': Star,
  'award': Award,
  'clock': Clock,
  'search': Search,
  'palette': Palette,
  'code': Code,
  'line-chart': LineChart,
  'target': Target,
  'globe': Globe,
  'file-text': FileText,
  'bar-chart-3': BarChart3,
  'trending-up': TrendingUp,
  'rocket': Rocket,
  'heart': Heart,
  'settings': Settings,
  'layers': Layers,
}

// Types
export interface TrustSignal {
  icon: string
  text: string
}

export interface Benefit {
  icon: string
  title: string
  description: string
}

export interface Result {
  metric: string
  label: string
  detail?: string
}

export interface Service {
  icon: string
  title: string
  description: string
}

export interface Package {
  name: string
  price: string
  priceType?: string // 'einmalig' | 'pro Monat' | 'one-time' | 'per month'
  description: string
  popular: boolean
  features: string[]
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface RelatedService {
  title: string
  description: string
  href: StaticAppPathname
}

export interface LandingPageHero {
  badge: string
  title: string
  description: string
  ctaPrimary: string
  ctaSecondary: string
}

export interface LandingPageLabels {
  pricingTitle: string
  pricingDescription: string
  processTitle: string
  processSubtitle: string
  technologiesTitle?: string
  technologiesDescription?: string
  servicesTitle?: string
  servicesDescription?: string
  resultsTitle?: string
  faqTitle: string
  faqSubtitle: string
  relatedServicesTitle: string
  ctaTitle: string
  ctaDescription: string
  ctaButton: string
  popular: string
  oneTime: string
  sendRequest: string
  learnMore: string
}

export interface LandingPageContent {
  hero: LandingPageHero
  trustSignals?: TrustSignal[]
  benefits?: Benefit[]
  results?: Result[]
  services?: Service[]
  packages: Package[]
  process: ProcessStep[]
  technologies?: string[]
  faqs: FAQ[]
  relatedServices: RelatedService[]
  labels: LandingPageLabels
}

export interface LocalBusinessInfo {
  name: string
  address: string
  city: string
  postalCode?: string
  country: string
  phone?: string
  latitude?: number
  longitude?: number
}

export interface ContextualLink {
  text: string
  href: string
}

export interface LandingPageSEO {
  serviceName: string
  cityName: string
  cityType?: 'City' | 'Country' | 'State' | 'AdministrativeArea' // Default: City
  url: string
  breadcrumbs: { name: string; url: string }[]
  alternateName?: string
  localBusiness?: LocalBusinessInfo // Optional: für Dubai/UAE mit anderer Adresse
}

interface LandingPageProps {
  locale: string
  content: LandingPageContent
  seo: LandingPageSEO
  siteUrl?: string
  contextualLinks?: ContextualLink[]
  fullWidth?: boolean
}

export function LandingPageTemplate({
  locale,
  content,
  seo,
  siteUrl = 'https://goldenwing.at',
  contextualLinks,
  fullWidth = false,
}: LandingPageProps) {
  const { hero, trustSignals, benefits, results, services, packages, process, technologies, faqs, relatedServices, labels } = content
  const descClass = fullWidth ? 'text-muted-foreground' : 'text-muted-foreground max-w-2xl mx-auto'

  // Default LocalBusiness (Vienna office)
  const defaultLocalBusiness: LocalBusinessInfo = {
    name: 'GoldenWing Creative Studios',
    address: 'Czeikestrasse 4/21',
    city: 'Wien',
    postalCode: '1100',
    country: 'AT',
    phone: '+43-664-543-96-81',
  }

  const localBusiness = seo.localBusiness || defaultLocalBusiness

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: seo.serviceName,
    ...(seo.alternateName && { alternateName: seo.alternateName }),
    url: `${siteUrl}${seo.url}`,
    provider: {
      '@type': 'LocalBusiness',
      name: localBusiness.name,
      url: siteUrl,
      ...(localBusiness.phone && { telephone: localBusiness.phone }),
      address: {
        '@type': 'PostalAddress',
        streetAddress: localBusiness.address,
        addressLocality: localBusiness.city,
        ...(localBusiness.postalCode && { postalCode: localBusiness.postalCode }),
        addressCountry: localBusiness.country,
      },
      ...(localBusiness.latitude && localBusiness.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: localBusiness.latitude,
          longitude: localBusiness.longitude,
        },
      }),
    },
    areaServed: { '@type': seo.cityType || 'City', name: seo.cityName },
    description: hero.description,
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace(/[+,.\s]/g, ''),
      priceCurrency: 'EUR',
      description: pkg.description,
    })),
  }

  // FAQ Schema is handled by FAQSection component - no need to add it here

  // Determine package grid columns
  const packageCols = packages.length === 4 ? 'lg:grid-cols-4' : 'md:grid-cols-3'

  return (
    <>
      {/* Schema.org - FAQ Schema is handled by FAQSection component */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbListSchema items={seo.breadcrumbs} />
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* Hero */}
      <Section background="muted" padding="lg" containerVariant="block">
        <Badge className="mb-4">{hero.badge}</Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {hero.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <NextLink href={getContactUrl(locale)}>
              {hero.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <NextLink href="#preise">
              {hero.ctaSecondary}
            </NextLink>
          </Button>
        </div>

        {/* Trust Signals (optional) */}
        {trustSignals && trustSignals.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-6 items-center text-sm text-muted-foreground">
            {trustSignals.map((signal) => {
              const IconComponent = iconMap[signal.icon] || Award
              return (
                <div key={signal.text} className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <span>{signal.text}</span>
                </div>
              )
            })}
          </div>
        )}
      </Section>

      {/* Results (optional - for SEO pages) */}
      {results && results.length > 0 && labels.resultsTitle && (
        <Section background="muted" padding="lg" containerVariant="block" className="border-y">
          <div className={`grid md:grid-cols-${results.length} gap-4 sm:gap-6 lg:gap-8`}>
            {results.map((result) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{result.metric}</div>
                <div className="font-medium mb-1">{result.label}</div>
                {result.detail && <div className="text-sm text-muted-foreground">{result.detail}</div>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Benefits (optional - for Webdesign pages) */}
      {benefits && benefits.length > 0 && !results && (
        <Section background="muted" padding="lg" containerVariant="block" className="border-y">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.icon] || Zap
              return (
                <div key={benefit.title} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* Services (optional - for SEO pages) */}
      {services && services.length > 0 && labels.servicesTitle && (
        <Section padding="lg" containerVariant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.servicesTitle}</h2>
            {labels.servicesDescription && (
              <p className={descClass}>{labels.servicesDescription}</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Search
              return (
                <Card key={service.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Section>
      )}

      {/* Pricing */}
      <Section padding="lg" containerVariant="block" className="scroll-mt-20" id="preise">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{labels.pricingTitle}</h2>
          <p className={descClass}>
            {labels.pricingDescription}
          </p>
        </div>

        <div className={`grid ${packageCols} gap-4 sm:gap-6 lg:gap-8${fullWidth ? '' : ' max-w-6xl mx-auto'}`}>
          {packages.map((pkg) => (
            <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>{labels.popular}</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">€{pkg.price}</span>
                  {pkg.priceType ? (
                    <span className="text-muted-foreground text-sm"> {pkg.priceType}</span>
                  ) : (
                    !pkg.price.includes('+') && <span className="text-muted-foreground"> {labels.oneTime}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                  <NextLink href={getContactUrl(locale)}>{labels.sendRequest}</NextLink>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <ProcessTimeline
        title={labels.processTitle}
        subtitle={labels.processSubtitle}
        steps={process}
      />

      {/* Technologies (optional) */}
      {technologies && technologies.length > 0 && labels.technologiesTitle && (
        <Section padding="lg" containerVariant="block">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{labels.technologiesTitle}</h2>
            {labels.technologiesDescription && (
              <p className="text-muted-foreground">
                {labels.technologiesDescription}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <span key={tech} className="px-6 py-3 bg-muted rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={labels.faqTitle}
          subtitle={labels.faqSubtitle}
          items={faqs}
        />
      )}

      {/* Related Services */}
      <Section padding="lg" containerVariant="block">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {labels.relatedServicesTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {relatedServices.map((service) => (
            <Card key={service.title}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  {labels.learnMore} <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contextual Internal Links — SEO internal linking */}
      {contextualLinks && contextualLinks.length > 0 && (
        <Section padding="lg" containerVariant="block">
          <div className={fullWidth ? '' : 'max-w-3xl mx-auto'}>
            <h2 className="text-2xl font-bold mb-6 text-center">
              {locale === 'de' ? 'Weitere relevante Leistungen' : 'More Relevant Services'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {contextualLinks.map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors text-sm font-medium"
                >
                  {link.text}
                </NextLink>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section background="primary" padding="lg" containerVariant="block" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {labels.ctaTitle}
        </h2>
        <p className="text-lg opacity-90 mb-8">
          {labels.ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <NextLink href={getContactUrl(locale)}>
              {labels.ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <NextLink href="tel:+436645439681">
              <Phone className="mr-2 h-4 w-4" />
              +43 664 543 96 81
            </NextLink>
          </Button>
        </div>
      </Section>
    </>
  )
}
