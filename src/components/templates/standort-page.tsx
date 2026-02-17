import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { MapPin, Phone, Mail, ArrowRight, Clock, CheckCircle, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FAQSection } from '@/components/sections/faq-section'
import { Container } from '@/components/ui/container'

export interface StandortService {
  name: string
  description: string
}

export interface StandortFaq {
  question: string
  answer: string
}

export interface StandortProject {
  client: string
  category: string
  result: string
}

export interface StandortContact {
  address: string[]
  phone: string
  phoneDisplay: string
  email: string
}

export interface StandortTransportOption {
  icon: LucideIcon
  title: string
  description: string
}

export interface StandortContent {
  heroTitle: string
  heroDescription: string
  scheduleMeeting: string
  callNow: string
  contactTitle: string
  addressLabel: string
  phoneLabel: string
  emailLabel: string
  hoursLabel: string
  hoursValue: string
  servicesTitle: string
  servicesSubtitle: string
  viewAllServices: string
  projectsTitle?: string
  projectsSubtitle?: string
  viewAllProjects?: string
  faqTitle: string
  ctaTitle: string
  ctaDescription: string
  ctaButton: string
}

export interface StandortPageProps {
  locale: string
  flag: string
  badge: string
  badgeVariant?: 'primary' | 'muted'
  contact: StandortContact
  services: StandortService[]
  projects?: StandortProject[]
  faqs: StandortFaq[]
  content: StandortContent
  transportOptions?: StandortTransportOption[]
  directionsTitle?: string
  directionsSubtitle?: string
  mapPlaceholder?: string
  mapButtonText?: string
  mapUrl?: string
  industries?: string[]
  industriesTitle?: string
  industriesSubtitle?: string
  whyChoose?: {
    title: string
    subtitle: string
    items: Array<{ icon: LucideIcon; title: string; description: string }>
  }
  jsonLd: object
  faqSchema: object
}

export function StandortPage({
  locale,
  flag,
  badge,
  badgeVariant = 'primary',
  contact,
  services,
  projects,
  faqs,
  content,
  transportOptions,
  directionsTitle,
  directionsSubtitle,
  mapPlaceholder,
  mapButtonText,
  mapUrl,
  industries,
  industriesTitle,
  industriesSubtitle,
  whyChoose,
  jsonLd,
  faqSchema: _faqSchema,
}: StandortPageProps) {
  void _faqSchema // FAQ Schema is rendered by FAQSection component
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* FAQ Schema wird automatisch von FAQSection gerendert - kein Duplikat hier */}

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{flag}</span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    badgeVariant === 'primary'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {badge}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{content.heroTitle}</h1>
              <p className="text-xl text-muted-foreground mb-8">{content.heroDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/kontakt">
                    {content.scheduleMeeting}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <NextLink href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {content.callNow}
                  </NextLink>
                </Button>
              </div>
            </div>

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{content.contactTitle}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{content.addressLabel}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.address.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < contact.address.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{content.phoneLabel}</p>
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{content.emailLabel}</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{content.hoursLabel}</p>
                      <p className="text-sm text-muted-foreground">{content.hoursValue}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container variant="block">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.servicesTitle}</h2>
            <p className="text-muted-foreground">{content.servicesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service) => (
              <Card key={service.name}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/leistungen">
                {content.viewAllServices}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Projects (optional) */}
      {projects && projects.length > 0 && (
        <section className="py-20 bg-muted/30">
          <Container variant="block">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl font-bold mb-4">{content.projectsTitle}</h2>
              <p className="text-muted-foreground">{content.projectsSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                    <h3 className="font-semibold mb-2">{project.client}</h3>
                    <p className="text-sm text-muted-foreground">{project.result}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/referenzen">
                  {content.viewAllProjects}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Industries (optional - for Dubai) */}
      {industries && industriesTitle && (
        <section className="py-20 bg-muted/30">
          <Container variant="block">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{industriesTitle}</h2>
                <p className="text-muted-foreground mb-8">{industriesSubtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <span key={industry} className="px-4 py-2 bg-background border rounded-full text-sm">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {locale === 'de' ? 'Wir betreuen die Region' : 'Serving the region'}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Why Choose (optional - for Dubai) */}
      {whyChoose && (
        <section className="py-20">
          <Container variant="block">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{whyChoose.title}</h2>
              <p className="text-muted-foreground">{whyChoose.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {whyChoose.items.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Directions (optional - for Vienna) */}
      {transportOptions && directionsTitle && (
        <section className="py-20">
          <Container variant="block">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">{directionsTitle}</h2>
                <p className="text-muted-foreground mb-8">{directionsSubtitle}</p>

                <div className="space-y-6">
                  {transportOptions.map((option, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <option.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video lg:aspect-square bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">{mapPlaceholder}</p>
                  {mapUrl && mapButtonText && (
                    <Button variant="outline" className="mt-4" asChild>
                      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                        {mapButtonText}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={content.faqTitle}
          items={faqs}
          className="bg-muted/30"
        />
      )}

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{content.ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/kontakt">
                {content.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <NextLink href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phoneDisplay}</NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
