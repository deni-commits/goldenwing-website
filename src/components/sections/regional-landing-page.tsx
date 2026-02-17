import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, CheckCircle, Star, Clock, Shield, Zap, Users, Award, Phone, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { FAQSchema, BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { ProcessMagazine } from '@/components/process-sections/ProcessMagazine'

const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'shield': Shield,
  'users': Users,
  'star': Star,
  'award': Award,
  'clock': Clock,
}

interface TrustSignal {
  icon: string
  text: string
}

interface Benefit {
  icon: string
  title: string
  description: string
}

interface Package {
  name: string
  price: string
  description: string
  popular: boolean
  features: string[]
}

interface ProcessStep {
  step: string
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface RelatedService {
  title: string
  description: string
  href: StaticAppPathname
}

export interface RegionalLandingPageData {
  locale: 'de' | 'en' | 'ru'
  hero: {
    badge: string
    title: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
  }
  trustSignals: TrustSignal[]
  benefits: Benefit[]
  packages: Package[]
  process: ProcessStep[]
  technologies: string[]
  faqs: FAQ[]
  relatedServices: RelatedService[]
  sectionTitles: {
    pricing: string
    pricingDescription: string
    process: string
    processDescription: string
    technologies: string
    technologiesDescription: string
    faq: string
    relatedServices: string
    ctaTitle: string
    ctaDescription: string
    ctaButton: string
  }
  schema: {
    serviceName: string
    serviceUrl: string
    areaServed: {
      type: 'City' | 'Country' | 'Region'
      name: string
    }
    description: string
    localBusiness?: {
      name: string
      address: string
      city: string
      postalCode?: string
      country: string
      phone?: string
      latitude?: number
      longitude?: number
    }
    breadcrumbs?: Array<{ name: string; url: string }>
  }
}

export function RegionalLandingPage({ data }: { data: RegionalLandingPageData }) {
  const { locale, hero, trustSignals, benefits, packages, process, technologies, faqs, relatedServices, sectionTitles, schema } = data
  const isEn = locale === 'en'

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: schema.serviceName,
    url: schema.serviceUrl,
    provider: schema.localBusiness ? {
      '@type': 'LocalBusiness',
      name: schema.localBusiness.name,
      url: 'https://goldenwing.at',
      address: {
        '@type': 'PostalAddress',
        streetAddress: schema.localBusiness.address,
        addressLocality: schema.localBusiness.city,
        postalCode: schema.localBusiness.postalCode,
        addressCountry: schema.localBusiness.country,
      },
      ...(schema.localBusiness.phone && { telephone: schema.localBusiness.phone }),
      ...(schema.localBusiness.latitude && schema.localBusiness.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: schema.localBusiness.latitude,
          longitude: schema.localBusiness.longitude,
        },
      }),
    } : {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
    areaServed: { '@type': schema.areaServed.type, name: schema.areaServed.name },
    description: schema.description,
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('+', '').replace(',', '').replace('.', ''),
      priceCurrency: 'EUR',
      description: pkg.description,
    })),
  }

  return (
    <>
      {/* Service Schema - FAQ Schema wird automatisch von FAQSection gerendert */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {schema.breadcrumbs && <BreadcrumbListSchema items={schema.breadcrumbs} />}
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/kontakt">
                  {hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#preise">
                  {hero.ctaSecondary}
                </NextLink>
              </Button>
            </div>

            {/* Trust Signals */}
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
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-20 border-y bg-muted/30">
        <Container variant="block">
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
        </Container>
      </section>

      {/* Pricing */}
      <section id="preise" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{sectionTitles.pricing}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {sectionTitles.pricingDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{isEn ? 'Popular' : 'Beliebt'}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">€{pkg.price}</span>
                    {!pkg.price.includes('+') && <span className="text-muted-foreground"> {isEn ? 'one-time' : 'einmalig'}</span>}
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
                    <Link href="/kontakt">{isEn ? 'Send Request' : 'Anfrage senden'}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - Using ProcessMagazine layout */}
      <ProcessMagazine
        title={sectionTitles.process}
        subtitle={sectionTitles.processDescription}
        steps={process.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* Technologies */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{sectionTitles.technologies}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {sectionTitles.technologiesDescription}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <span key={tech} className="px-6 py-3 bg-muted rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-muted/30">
          <FAQSchema items={faqs} />
          <Container variant="block">
            <h2 className="text-3xl font-bold mb-12 text-center">{sectionTitles.faq}</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>
      )}

      {/* Related Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {sectionTitles.relatedServices}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {isEn ? 'Learn more' : 'Mehr erfahren'} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {sectionTitles.ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {sectionTitles.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/kontakt">
                {sectionTitles.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <NextLink href="tel:+436645439681">
                <Phone className="mr-2 h-4 w-4" />
                +43 664 543 96 81
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
