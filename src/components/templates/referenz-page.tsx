import { Link } from '@/lib/i18n-navigation'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Lightbulb, LucideIcon, Palette, Globe, Search, Megaphone, Code, Cloud, Building2, ShoppingCart, Factory, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/ui/container'
import { JsonLd } from '@/components/seo/json-ld'
import { FAQSection } from '@/components/sections/faq-section'
import { ProcessSplitCard } from '@/components/process-sections/ProcessSplitCard'
import { translateReferenceCategorySlugToEn } from '@/lib/utils'

// Related categories configuration for internal linking
const allCategories = [
  { slug: 'branding', icon: Palette, de: 'Branding', en: 'Branding' },
  { slug: 'webdesign', icon: Globe, de: 'Webdesign & UX', en: 'Web Design & UX' },
  { slug: 'seo', icon: Search, de: 'SEO & Content', en: 'SEO & Content' },
  { slug: 'marketing', icon: Megaphone, de: 'Digitales Marketing', en: 'Digital Marketing' },
  { slug: 'entwicklung', icon: Code, de: 'Web- & App-Entwicklung', en: 'Web & App Development' },
  { slug: 'it-cloud', icon: Cloud, de: 'IT & Cloud Services', en: 'IT & Cloud Services' },
  { slug: 'dienstleistung', icon: Building2, de: 'Dienstleistung', en: 'Services & Consulting' },
  { slug: 'e-commerce', icon: ShoppingCart, de: 'E-Commerce', en: 'E-Commerce & Retail' },
  { slug: 'industrie', icon: Factory, de: 'Industrie', en: 'Industry & Manufacturing' },
  { slug: 'technologie', icon: Cpu, de: 'Technologie', en: 'Technology & SaaS' },
]

export interface ReferenzPageContent {
  title: string
  subtitle: string
  description: string
  introText: string
  services: Array<{ name: string; description: string }>
  process: Array<{ step: string; title: string; description: string }>
  clientTypes: string[]
  results: Array<{ metric: string; label: string; detail: string }>
  benefits: Array<{ icon: LucideIcon; title: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  viewProject: string
  allReferenzen: string
  cta: {
    title: string
    description: string
    button: string
  }
}

export interface ReferenzPageLabels {
  servicesTitle: string
  servicesSubtitle: string
  resultsTitle: string
  processTitle: string
  processSubtitle: string
  benefitsTitle: string
  benefitsSubtitle: string
  clientTypesTitle: string
  clientTypesSubtitle: string
  projectsTitle: string
  projectsSubtitle: string
  projectsEmpty: string
  projectsEmptySubtitle: string
  projectsEmptyCta: string
  faqTitle: string
  faqSubtitle: string
}

export interface ReferenzPageProject {
  id: string
  slug: string
  title: string
  client?: string
  category?: string
  excerpt?: string
  challenge?: string
  services?: Array<{ service?: string }>
  results?: Array<{ metric?: string; label?: string }>
  featuredImage?: { url?: string; alt?: string }
}

interface ReferenzPageProps {
  locale: string
  category: string
  categorySlug: string
  icon: LucideIcon
  content: ReferenzPageContent
  labels: ReferenzPageLabels
  projects: ReferenzPageProject[]
  siteUrl?: string
}

export function ReferenzPage({
  locale,
  category,
  categorySlug,
  icon: Icon,
  content,
  labels,
  projects,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at',
}: ReferenzPageProps) {
  const pageUrl = `${siteUrl}/${locale === 'de' ? 'referenzen' : 'references'}/${locale === 'en' ? translateReferenceCategorySlugToEn(categorySlug) : categorySlug}`

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Referenzen' : 'References', item: `${siteUrl}/${locale === 'de' ? 'referenzen' : 'en/references'}` },
      { '@type': 'ListItem', position: 3, name: category, item: pageUrl },
    ],
  }

  const faqSchema = content.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  // CollectionPage schema for this reference category
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: content.title,
    description: content.description,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://goldenwing.at/#website',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
    about: {
      '@type': 'Service',
      name: category,
      description: content.subtitle,
      provider: {
        '@type': 'Organization',
        '@id': 'https://goldenwing.at/#organization',
        name: 'GoldenWing Creative Studios',
      },
    },
    ...(projects.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        name: `${category} ${locale === 'de' ? 'Projekte' : 'Projects'}`,
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            description: project.excerpt,
            url: `${siteUrl}/${locale === 'de' ? 'projekte' : 'en/projects'}/${project.slug}`,
            ...(project.featuredImage?.url && {
              image: project.featuredImage.url,
            }),
            creator: {
              '@type': 'Organization',
              name: 'GoldenWing Creative Studios',
            },
          },
        })),
      },
    }),
  }

  // Service schema for the category itself
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: category,
    description: content.description,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      '@id': 'https://goldenwing.at/#organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goldenwing.at/logo.png',
      },
    },
    areaServed: [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    ...(content.services.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: labels.servicesTitle,
        itemListElement: content.services.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
          },
          position: index + 1,
        })),
      },
    }),
    ...(content.results.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: projects.length > 0 ? projects.length : 10,
      },
    }),
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero */}
      <Section padding="lg" containerVariant="block">
        <Link
          href="/referenzen"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          {content.allReferenzen}
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {content.title}
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6">{content.subtitle}</p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">{content.description}</p>
        <p className="text-muted-foreground leading-relaxed">{content.introText}</p>
      </Section>

      {/* Services Detailed */}
      <Section background="muted" padding="lg" containerVariant="block">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{labels.servicesTitle}</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {labels.servicesSubtitle}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {content.services.map((service, index) => (
            <Card key={index}>
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
      </Section>

      {/* Results */}
      <Section padding="lg" containerVariant="block">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{labels.resultsTitle}</h2>
        <div className="grid md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {content.results.map((result, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{result.metric}</div>
              <div className="font-medium mb-1">{result.label}</div>
              <div className="text-sm text-muted-foreground">{result.detail}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Process - ProcessSplitCard Layout */}
      <ProcessSplitCard
        title={labels.processTitle}
        subtitle={labels.processSubtitle}
        steps={content.process.map(step => ({ num: step.step, title: step.title, description: step.description }))}
      />

      {/* Benefits */}
      <Section padding="lg" containerVariant="block">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{labels.benefitsTitle}</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {labels.benefitsSubtitle}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {content.benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Client Types */}
      <Section background="muted" padding="lg" containerVariant="block">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{labels.clientTypesTitle}</h2>
        <p className="text-muted-foreground text-center mb-8">
          {labels.clientTypesSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {content.clientTypes.map((type, index) => (
            <span key={index} className="px-4 py-2 rounded-full bg-background border text-sm">
              {type}
            </span>
          ))}
        </div>
      </Section>

      {/* Projects Grid */}
      <Section padding="lg" containerVariant="block">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{labels.projectsTitle}</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {labels.projectsSubtitle}
        </p>
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={{ pathname: '/projekte/[slug]', params: { slug: project.slug } }}
                className="group bg-background rounded-xl border hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="relative aspect-[4/3] bg-muted">
                  {project.featuredImage?.url && (
                    <Image
                      src={project.featuredImage.url}
                      alt={project.featuredImage.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Category Badge */}
                  {project.category && (
                    <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
                      {project.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  {/* Client */}
                  {project.client && (
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {project.client}
                    </p>
                  )}
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {/* Description */}
                  {(project.excerpt || project.challenge) && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {project.excerpt || project.challenge}
                    </p>
                  )}
                  {/* Services */}
                  {project.services && project.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.services.slice(0, 3).map((s, idx) => (
                        s.service && (
                          <span key={idx} className="px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground">
                            {s.service}
                          </span>
                        )
                      ))}
                      {project.services.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground">
                          +{project.services.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  {/* Results Preview */}
                  {project.results && project.results.length > 0 && (
                    <div className="flex gap-4 pt-3 border-t border-border">
                      {project.results.slice(0, 2).map((result, idx) => (
                        result.metric && (
                          <div key={idx} className="text-center">
                            <p className="text-sm font-bold text-primary">{result.metric}</p>
                            {result.label && (
                              <p className="text-xs text-muted-foreground">{result.label}</p>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  {/* View Project Link */}
                  <div className="flex items-center gap-1 mt-3 text-sm font-medium text-primary">
                    {content.viewProject}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">{labels.projectsEmpty}</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              {labels.projectsEmptySubtitle}
            </p>
            <Link href="/kontakt">
              <Button variant="outline">{labels.projectsEmptyCta}</Button>
            </Link>
          </div>
        )}
      </Section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <FAQSection
          title={labels.faqTitle}
          subtitle={labels.faqSubtitle}
          items={content.faqs}
          className="bg-muted/30"
        />
      )}

      {/* Related Categories - Internal Linking */}
      <Section padding="lg" containerVariant="block">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          {locale === 'de' ? 'Weitere Referenzen entdecken' : 'Explore More References'}
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Entdecken Sie unsere Projekte in anderen Bereichen.'
            : 'Discover our projects in other areas.'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {allCategories
            .filter(cat => cat.slug !== categorySlug)
            .map((cat) => {
              const CatIcon = cat.icon
              // Use locale-specific slug for proper routing
              const linkSlug = locale === 'en' ? translateReferenceCategorySlugToEn(cat.slug) : cat.slug
              return (
                <Link
                  key={cat.slug}
                  href={{ pathname: '/referenzen/[slug]', params: { slug: linkSlug } }}
                  className="group flex flex-col items-center p-4 rounded-xl border bg-background hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <CatIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                    {locale === 'de' ? cat.de : cat.en}
                  </span>
                </Link>
              )
            })}
        </div>
      </Section>

      {/* CTA */}
      <Section background="muted" padding="lg" containerVariant="block">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.cta.title}</h2>
          <p className="text-lg opacity-90 mb-6">{content.cta.description}</p>
          <Link href="/kontakt">
            <Button size="lg" variant="secondary">
              {content.cta.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>
    </>
  )
}
