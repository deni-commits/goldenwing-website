import type { ComponentType } from 'react'
import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'

// Force fully static pages at build time
export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = 60
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Check,
  Target,
  Lightbulb,
  Pencil,
  FileText,
  Layout,
  Monitor,
  ShoppingCart,
  Zap,
  Users,
  Map,
  TrendingUp,
  Filter,
  MapPin,
  FileSearch,
  Key,
  Edit,
  Calendar,
  Video,
  Camera,
  Workflow,
  Lock,
  Cpu,
  Link as LinkIcon,
  Cloud,
  Smartphone,
  Globe,
  Layers,
  CheckCircle,
  Package,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { MarkdownContent } from '@/components/ui/markdown-content'
import { getSubServiceBySlug, getSiblingSubServices, type SupportedLocale } from '@/lib/payload'
import { SUB_SERVICE_SLUGS } from '@/config/slug-mappings'
import { getSubServiceTranslationRu } from '@/lib/translations/services-ru'
import { getSubServiceFAQs } from '@/lib/faq-data'
import { FAQSection } from '@/components/sections/faq-section'
import { BreadcrumbListSchema, ServiceSchema, HowToSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, translateServiceSlugToEn, translateSubServiceSlugToEn, getSubServiceUrl, getServiceUrl, truncateMetaDescription } from '@/lib/utils'
import NextLink from 'next/link'
import { validateNestedSlugOrRedirect } from '@/lib/slug-registry'

interface Benefit {
  id?: string
  benefit: string
}

interface UseCase {
  id?: string
  useCase: string
}

interface Deliverable {
  id?: string
  deliverable: string
}

interface Feature {
  id?: string
  title: string
  description?: string
}

interface ProcessStep {
  id?: string
  title: string
  description?: string
}

interface RelatedProject {
  id: string
  title: string
  slug: string
  client: string
  category: string
  mainImage?: string
  tags?: string[]
}

interface SiblingSubService {
  id: string
  title: string
  slug: string
  description?: string
  icon?: string
}

// Icon mapping
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  target: Target,
  lightbulb: Lightbulb,
  pencil: Pencil,
  'file-text': FileText,
  layout: Layout,
  monitor: Monitor,
  'shopping-cart': ShoppingCart,
  zap: Zap,
  users: Users,
  map: Map,
  'trending-up': TrendingUp,
  filter: Filter,
  'map-pin': MapPin,
  'file-search': FileSearch,
  key: Key,
  edit: Edit,
  calendar: Calendar,
  video: Video,
  camera: Camera,
  workflow: Workflow,
  lock: Lock,
  cpu: Cpu,
  link: LinkIcon,
  cloud: Cloud,
  smartphone: Smartphone,
  globe: Globe,
  layers: Layers,
  'check-circle': CheckCircle,
}

// SEMrush On-Page: SEO overrides for sub-service pages (only for pages flagged by SEMrush)
const subServiceSeoOverrides: Record<string, { title?: Record<string, string>; h1?: Record<string, string>; metaDescription?: Record<string, string> }> = {
  'customer-journey-mapping': {
    h1: {
      de: 'Customer Journey Mapping Wien — Kundenreise optimieren',
      en: 'Customer Journey Mapping Vienna — Optimize the Customer Journey',
    },
    metaDescription: {
      de: 'Customer Journey Mapping in Wien ✓ Touchpoint-Analyse ✓ Persona-Erstellung ✓ Conversion-Optimierung. Verstehen Sie Ihre Kunden besser. Jetzt Beratung!',
      en: 'Customer Journey Mapping Vienna ✓ Touchpoint Analysis ✓ Persona Creation ✓ Conversion Optimization. Understand your customers better. Get a consultation!',
    },
  },
  'automatisierung': {
    h1: {
      de: 'Workflow-Automatisierung Wien — Prozesse digitalisieren',
      en: 'Workflow Automation Vienna — Digitize Your Processes',
    },
    metaDescription: {
      de: 'Workflow-Automatisierung Wien ✓ Prozessoptimierung ✓ Zapier & Make ✓ Custom Scripts. Sparen Sie Zeit durch smarte Automatisierung. Jetzt anfragen!',
      en: 'Workflow Automation Vienna ✓ Process Optimization ✓ Zapier & Make ✓ Custom Scripts. Save time with smart automation. Get started!',
    },
  },
  'technisches-seo': {
    h1: {
      de: 'Technisches SEO Wien — Core Web Vitals & Indexierung',
      en: 'Technical SEO Vienna — Core Web Vitals & Indexing',
    },
    metaDescription: {
      de: 'Technisches SEO in Wien ✓ Core Web Vitals ✓ Crawlability ✓ Schema Markup ✓ Site Speed. Die technische Basis für Top-Rankings. Jetzt SEO Audit anfragen!',
      en: 'Technical SEO Vienna ✓ Core Web Vitals ✓ Crawlability ✓ Schema Markup ✓ Site Speed. The technical foundation for top rankings. Request your SEO audit!',
    },
  },
  'markenstrategie-positionierung': {
    h1: {
      de: 'Markenstrategie & Positionierung Wien — Ihre Marke strategisch aufbauen',
      en: 'Brand Strategy & Positioning Vienna — Build Your Brand Strategically',
    },
  },
  'on-page-optimierung': {
    h1: {
      de: 'On-Page SEO Optimierung Wien — Content & Meta Tags',
      en: 'On-Page SEO Optimization Vienna — Content & Meta Tags',
    },
  },
  'local-seo': {
    h1: {
      de: 'Local SEO Wien — Lokal bei Google gefunden werden',
      en: 'Local SEO Vienna — Get Found Locally on Google',
    },
  },
}

function getIcon(iconName?: string) {
  if (!iconName) return Target
  return iconMap[iconName] || Target
}

export async function generateStaticParams() {
  // Note: This would require a helper function to get all sub-services
  // For now, return empty array - params will be generated on-demand
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; subslug: string }>
}): Promise<Metadata> {
  const { locale: localeParam, slug, subslug } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  // Whitelist check: only allow known sub-service slugs
  const validDeSlugs = Object.keys(SUB_SERVICE_SLUGS.de)
  const validEnSlugs = Object.keys(SUB_SERVICE_SLUGS.en)
  if (!validDeSlugs.includes(subslug) && !validEnSlugs.includes(subslug)) {
    notFound()
  }

  const subService = await getSubServiceBySlug(slug, subslug, locale)

  if (!subService) {
    notFound()
  }

  // Keep title under 60 chars - remove parent service to shorten
  const location = locale === 'de' ? 'Wien' : locale === 'ru' ? 'Вена' : 'Vienna'
  // Apply Russian translations if available
  const ruTranslation = locale === 'ru' ? getSubServiceTranslationRu(subslug) : null
  const subServiceTitle = ruTranslation?.title || subService.title
  // SEMrush On-Page: apply SEO overrides for title and meta description
  const seoOverride = subServiceSeoOverrides[subslug]
  const title = seoOverride?.title?.[locale] || subService.seo?.metaTitle || `${subServiceTitle} ${location} | GoldenWing`
  const description = truncateMetaDescription(seoOverride?.metaDescription?.[locale] || subService.seo?.metaDescription || ruTranslation?.description || subService.description || '')
  // Use the correct path structure based on locale
  // slug and subslug from params are always German (from DB), translate to English for EN locale
  const enSlug = translateServiceSlugToEn(slug)
  const enSubslug = translateSubServiceSlugToEn(subslug)
  const basePath = locale === 'en'
    ? `/services/${enSlug}/${enSubslug}`
    : `/leistungen/${slug}/${subslug}`
  const canonicalUrl = getCanonicalUrl(basePath, locale)
  const hreflangAlternates = getHreflangAlternates(basePath, locale)

  return {
    title,
    description,
    keywords: subService.seo?.keywords || [`${subService.title} Wien`, `${subService.title} Agentur`, subService.parentService.title],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; subslug: string }>
}) {
  const { locale: localeParam, slug, subslug } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  // Whitelist check: only allow known sub-service slugs (prevents soft-404)
  const validDeSlugs = Object.keys(SUB_SERVICE_SLUGS.de)
  const validEnSlugs = Object.keys(SUB_SERVICE_SLUGS.en)
  if (!validDeSlugs.includes(subslug) && !validEnSlugs.includes(subslug)) {
    notFound()
  }

  // Validate both parent and child slugs for current locale
  const basePath = locale === 'en' ? '/en/services' : '/leistungen'
  validateNestedSlugOrRedirect({
    parentSlug: slug,
    childSlug: subslug,
    locale,
    parentType: 'service',
    childType: 'sub-service',
    basePath,
  })

  const t = await getTranslations({ locale, namespace: 'servicesPage' })
  const subServiceData = await getSubServiceBySlug(slug, subslug, locale)

  if (!subServiceData) {
    notFound()
  }

  // Apply Russian translations if available
  const ruTranslation = locale === 'ru' ? getSubServiceTranslationRu(subslug) : null
  const subService = ruTranslation ? {
    ...subServiceData,
    title: ruTranslation.title || subServiceData.title,
    subtitle: ruTranslation.subtitle || subServiceData.subtitle,
    description: ruTranslation.description || subServiceData.description,
  } : subServiceData

  // Fetch sibling sub-services for internal linking
  const siblingSubServices = await getSiblingSubServices(
    subService.parentService.id,
    subService.slug,
    locale,
    4
  ) as SiblingSubService[]

  const Icon = getIcon(subService.icon)

  return (
    <>
      {/* SEO Schemas */}
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: { de: 'https://goldenwing.at', en: 'https://goldenwing.at/en', ru: 'https://goldenwing.at/ru' }[locale] || 'https://goldenwing.at' },
          { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale] || 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/uslugi' }[locale] || 'https://goldenwing.at/leistungen' },
          { name: subService.parentService.title, url: locale === 'en' ? `https://goldenwing.at/en/services/${translateServiceSlugToEn(subService.parentService.slug)}` : `https://goldenwing.at/leistungen/${subService.parentService.slug}` },
          { name: subService.title, url: locale === 'en' ? `https://goldenwing.at/en/services/${translateServiceSlugToEn(subService.parentService.slug)}/${translateSubServiceSlugToEn(subService.slug)}` : `https://goldenwing.at/leistungen/${subService.parentService.slug}/${subService.slug}` },
        ]}
      />
      <ServiceSchema
        name={subService.title}
        description={subService.description}
        slug={subService.slug}
        parentService={{
          name: subService.parentService.title,
          slug: subService.parentService.slug,
        }}
      />
      {/* HowTo Schema for Process - Rich Results */}
      {subService.process && subService.process.length > 0 && (
        <HowToSchema
          name={{ de: `${subService.title} - Unser Ansatz`, en: `${subService.title} - Our Approach`, ru: `${subService.title} - Наш подход` }[locale] || `${subService.title} - Our Approach`}
          description={{ de: `So entwickeln wir ${subService.title} für Ihr Unternehmen.`, en: `How we develop ${subService.title} for your business.`, ru: `Как мы разрабатываем ${subService.title} для вашего бизнеса.` }[locale] || `How we develop ${subService.title} for your business.`}
          steps={subService.process.map((step: ProcessStep) => ({
            name: step.title,
            text: step.description || step.title,
          }))}
        />
      )}

      {/* Breadcrumb */}
      <section className="py-6 border-b">
        <Container variant="block">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <NextLink href="/leistungen" className="hover:text-foreground transition-colors">
              {t('title')}
            </NextLink>
            <span aria-hidden="true">/</span>
            <NextLink
              href={getServiceUrl(subService.parentService.slug, locale)}
              className="hover:text-foreground transition-colors"
            >
              {subService.parentService.title}
            </NextLink>
            <span aria-hidden="true">/</span>
            <span className="text-foreground" aria-current="page">{subService.title}</span>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-4xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {subServiceSeoOverrides[subService.slug]?.h1?.[locale] || subService.title}
            </h1>
            {subService.subtitle && (
              <p className="text-2xl text-primary font-medium mb-4">
                {subService.subtitle}
              </p>
            )}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {subService.description}
            </p>

            {/* Quick Info Badges */}
            {(subService.duration || subService.pricingFrom) && (
              <div className="flex flex-wrap gap-4 mt-8">
                {subService.duration && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t('projectDuration')}: {subService.duration}</span>
                  </div>
                )}
                {subService.pricingFrom && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <span className="text-sm font-medium text-primary">
                      {subService.pricingUnit || ({ de: 'ab', en: 'from', ru: 'от' }[locale] || 'from')} €{subService.pricingFrom.toLocaleString(locale === 'de' ? 'de-DE' : locale === 'ru' ? 'ru-RU' : 'en-US')}
                      {subService.pricingTo && ` - €${subService.pricingTo.toLocaleString(locale === 'de' ? 'de-DE' : locale === 'ru' ? 'ru-RU' : 'en-US')}`}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Pricing Description */}
            {subService.pricingDescription && (
              <p className="mt-4 text-sm text-muted-foreground">
                {subService.pricingDescription}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Long Description - Markdown Content */}
      {subService.longDescription && (
        <section className="pb-16">
          <Container variant="block">
            <MarkdownContent content={subService.longDescription} />
          </Container>
        </section>
      )}

      {/* Features */}
      {subService.features && subService.features.length > 0 && (
        <section className="py-16 bg-muted/50">
          <Container variant="block">
            <h2 className="text-3xl font-bold mb-8">{t('whatsIncluded')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {subService.features.map((feature: Feature, idx: number) => (
                <div
                  key={idx}
                  className="bg-background rounded-lg border p-5 flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    {feature.description && (
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Benefits */}
      {subService.benefits && subService.benefits.length > 0 && (
        <section className="py-16">
          <Container variant="block">
            <h2 className="text-3xl font-bold mb-8">{t('yourBenefits')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {subService.benefits.map((item: Benefit | string, idx: number) => {
                const benefitText = typeof item === 'string' ? item : item.benefit
                return (
                  <div key={idx} className="flex items-start gap-3 bg-card rounded-lg border p-5">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{benefitText}</span>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Process */}
      {subService.process && subService.process.length > 0 && (
        <section className="py-16 bg-muted/50">
          <Container variant="block">
            <h2 className="text-3xl font-bold mb-8">{t('ourApproach')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {subService.process.map((step: ProcessStep, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 bg-background rounded-lg border p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                    {step.description && (
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Use Cases & Deliverables */}
      {((subService.useCases && subService.useCases.length > 0) || (subService.deliverables && subService.deliverables.length > 0)) && (
        <section className="py-16">
          <Container variant="block">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Use Cases */}
              {subService.useCases && subService.useCases.length > 0 && (
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {t('idealFor')}
                  </h2>
                  <ul className="space-y-3">
                    {subService.useCases.map((item: UseCase | string, idx: number) => {
                      const useCaseText = typeof item === 'string' ? item : item.useCase
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{useCaseText}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Deliverables */}
              {subService.deliverables && subService.deliverables.length > 0 && (
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    {t('whatYouGet')}
                  </h2>
                  <ul className="space-y-3">
                    {subService.deliverables.map((item: Deliverable | string, idx: number) => {
                      const deliverableText = typeof item === 'string' ? item : item.deliverable
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{deliverableText}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}


      {/* Related Projects */}
      {subService.relatedProjects && subService.relatedProjects.length > 0 && (
        <section className="py-16">
          <Container variant="block">
            <h2 className="text-3xl font-bold mb-8">{t('referenceProjects')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subService.relatedProjects.map((project: RelatedProject) => (
                <Link
                  key={project.id}
                  href={{ pathname: '/projekte/[slug]', params: { slug: project.slug } }}
                  className="group"
                >
                  <div className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                    {project.mainImage && (
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <Image
                          src={project.mainImage}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">{project.client}</div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.tags && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-muted rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related Sub-Services - Internal Linking for SEO */}
      {siblingSubServices.length > 0 && (
        <section className="py-16">
          <Container variant="block">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {{ de: `Weitere ${subService.parentService.title}-Leistungen`, en: `More ${subService.parentService.title} Services`, ru: `Другие услуги ${subService.parentService.title}` }[locale] || `More ${subService.parentService.title} Services`}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siblingSubServices.map((sibling) => {
                const SiblingIcon = getIcon(sibling.icon)
                return (
                  <NextLink
                    key={sibling.id}
                    href={getSubServiceUrl(subService.parentService.slug, sibling.slug, locale)}
                    className="group"
                  >
                    <div className="bg-card rounded-xl border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <SiblingIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {sibling.title}
                      </h3>
                      {sibling.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {sibling.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center text-sm font-medium text-primary">
                        {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale] || 'Learn more'}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </NextLink>
                )
              })}
            </div>
            {/* Link to parent service page for more */}
            <div className="mt-8 text-center">
              <NextLink
                href={getServiceUrl(subService.parentService.slug, locale)}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                {{ de: `Alle ${subService.parentService.title}-Leistungen ansehen`, en: `View all ${subService.parentService.title} services`, ru: `Смотреть все услуги ${subService.parentService.title}` }[locale] || `View all ${subService.parentService.title} services`}
                <ArrowRight className="ml-1 h-4 w-4" />
              </NextLink>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ Section - Dynamic based on SubService */}
      {(() => {
        const faqs = getSubServiceFAQs(subService.slug, locale)
        if (!faqs) return null
        return (
          <FAQSection
            title={{ de: `Häufige Fragen zu ${subService.title}`, en: `Frequently Asked Questions about ${subService.title}`, ru: `Часто задаваемые вопросы о ${subService.title}` }[locale] || `Frequently Asked Questions about ${subService.title}`}
            subtitle={{ de: 'Antworten auf die wichtigsten Fragen unserer Kunden.', en: 'Answers to the most important questions from our clients.', ru: 'Ответы на самые важные вопросы наших клиентов.' }[locale] || 'Answers to the most important questions from our clients.'}
            items={faqs}
            className="bg-muted/30"
          />
        )
      })()}

      {/* CTA */}
      <section className="py-20">
        <Container variant="block">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('interestedIn', { service: subService.title })}
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('interestedDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <NextLink href="/kontakt">
                  {t('inquireNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                asChild
              >
                <NextLink href={getServiceUrl(subService.parentService.slug, locale)}>
                  {t('backTo', { service: subService.parentService.title })}
                </NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
