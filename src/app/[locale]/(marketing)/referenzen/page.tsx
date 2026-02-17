import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import NextLink from 'next/link'
import Image from 'next/image'
import { ArrowRight, Palette, Globe, Megaphone, Search, Code, Cloud, Building2, ShoppingCart, Factory, Cpu, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/seo/json-ld'
import { getProjects, getReferenzenOverviewPage } from '@/lib/payload'
import type { SupportedLocale } from '@/lib/payload'
import { getHreflangAlternates, getReferenzCategoryUrl, getSchemaUrl, getContactUrl } from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'palette': Palette,
  'globe': Globe,
  'megaphone': Megaphone,
  'search': Search,
  'code': Code,
  'cloud': Cloud,
  'building2': Building2,
  'shopping-cart': ShoppingCart,
  'factory': Factory,
  'cpu': Cpu,
}

// Default content
const defaultContent = {
  de: {
    title: 'Referenzen',
    subtitle: 'Erfolgreiche Projekte, die für sich sprechen',
    description: 'Von Startups bis zu etablierten Unternehmen – wir helfen Marken, digital zu wachsen. Entdecken Sie ausgewählte Projekte und die Ergebnisse, die wir gemeinsam erreicht haben.',
    byService: 'Nach Leistung',
    byIndustry: 'Nach Branche',
    viewAll: 'Alle ansehen',
    viewProject: 'Projekt ansehen',
    featuredProjects: 'Ausgewählte Projekte',
    allProjects: 'Alle Projekte',
    projectsCount: 'Projekte',
    cta: {
      title: 'Bereit für Ihr Projekt?',
      description: 'Lassen Sie uns besprechen, wie wir auch für Sie Ergebnisse liefern können.',
      button: 'Projekt besprechen'
    }
  },
  en: {
    title: 'References',
    subtitle: 'Successful Projects That Speak for Themselves',
    description: 'From startups to established companies – we help brands grow digitally. Discover selected projects and the results we achieved together.',
    byService: 'By Service',
    byIndustry: 'By Industry',
    viewAll: 'View all',
    viewProject: 'View Project',
    featuredProjects: 'Featured Projects',
    allProjects: 'All Projects',
    projectsCount: 'Projects',
    cta: {
      title: 'Ready for Your Project?',
      description: "Let's discuss how we can deliver results for you too.",
      button: 'Discuss Project'
    }
  },
  ru: {
    title: 'Референции',
    subtitle: 'Успешные проекты, которые говорят сами за себя',
    description: 'От стартапов до крупных компаний — мы помогаем брендам расти в цифровом пространстве. Откройте для себя избранные проекты и результаты, которых мы достигли вместе.',
    byService: 'По услугам',
    byIndustry: 'По отраслям',
    viewAll: 'Смотреть все',
    viewProject: 'Смотреть проект',
    featuredProjects: 'Избранные проекты',
    allProjects: 'Все проекты',
    projectsCount: 'Проектов',
    cta: {
      title: 'Готовы к вашему проекту?',
      description: 'Давайте обсудим, как мы можем достичь результатов и для вас.',
      button: 'Обсудить проект'
    }
  }
}

const defaultServiceCategories = {
  de: [
    { slug: 'branding', icon: 'palette', title: 'Branding', description: 'Markenentwicklung, Logo-Design, Corporate Identity', count: 12 },
    { slug: 'webdesign', icon: 'globe', title: 'Webdesign & UX', description: 'Responsive Websites, Landing Pages, User Experience', count: 18 },
    { slug: 'marketing', icon: 'megaphone', title: 'Digitales Marketing', description: 'Kampagnen, Social Media, Paid Ads', count: 15 },
    { slug: 'seo', icon: 'search', title: 'SEO & Content', description: 'Suchmaschinenoptimierung, Content-Strategie', count: 10 },
    { slug: 'entwicklung', icon: 'code', title: 'Web- & App-Entwicklung', description: 'Custom Software, Web-Apps, Mobile Apps', count: 14 },
    { slug: 'it-cloud', icon: 'cloud', title: 'IT & Cloud Services', description: 'Cloud-Lösungen, IT-Infrastruktur, DevOps', count: 8 },
  ],
  en: [
    { slug: 'branding', icon: 'palette', title: 'Branding', description: 'Brand development, logo design, corporate identity', count: 12 },
    { slug: 'webdesign', icon: 'globe', title: 'Web Design & UX', description: 'Responsive websites, landing pages, user experience', count: 18 },
    { slug: 'marketing', icon: 'megaphone', title: 'Digital Marketing', description: 'Campaigns, social media, paid ads', count: 15 },
    { slug: 'seo', icon: 'search', title: 'SEO & Content', description: 'Search engine optimization, content strategy', count: 10 },
    { slug: 'entwicklung', icon: 'code', title: 'Web & App Development', description: 'Custom software, web apps, mobile apps', count: 14 },
    { slug: 'it-cloud', icon: 'cloud', title: 'IT & Cloud Services', description: 'Cloud solutions, IT infrastructure, DevOps', count: 8 },
  ],
  ru: [
    { slug: 'branding', icon: 'palette', title: 'Брендинг', description: 'Разработка бренда, дизайн логотипа, корпоративная идентичность', count: 12 },
    { slug: 'webdesign', icon: 'globe', title: 'Веб-дизайн и UX', description: 'Адаптивные сайты, посадочные страницы, пользовательский опыт', count: 18 },
    { slug: 'marketing', icon: 'megaphone', title: 'Цифровой маркетинг', description: 'Кампании, социальные сети, платная реклама', count: 15 },
    { slug: 'seo', icon: 'search', title: 'SEO и контент', description: 'Поисковая оптимизация, контент-стратегия', count: 10 },
    { slug: 'entwicklung', icon: 'code', title: 'Веб и мобильная разработка', description: 'Кастомное ПО, веб-приложения, мобильные приложения', count: 14 },
    { slug: 'it-cloud', icon: 'cloud', title: 'IT и облачные сервисы', description: 'Облачные решения, IT-инфраструктура, DevOps', count: 8 },
  ]
}

const defaultIndustryCategories = {
  de: [
    { slug: 'dienstleistung', icon: 'building2', title: 'Dienstleistung & Beratung', description: 'Agenturen, Berater, Professional Services', count: 20 },
    { slug: 'e-commerce', icon: 'shopping-cart', title: 'E-Commerce & Retail', description: 'Online-Shops, Retail, D2C-Brands', count: 16 },
    { slug: 'industrie', icon: 'factory', title: 'Industrie & Fertigung', description: 'Produktion, B2B, Engineering', count: 12 },
    { slug: 'technologie', icon: 'cpu', title: 'Technologie & SaaS', description: 'Software-Unternehmen, Startups, Tech', count: 18 },
  ],
  en: [
    { slug: 'dienstleistung', icon: 'building2', title: 'Services & Consulting', description: 'Agencies, consultants, professional services', count: 20 },
    { slug: 'e-commerce', icon: 'shopping-cart', title: 'E-Commerce & Retail', description: 'Online shops, retail, D2C brands', count: 16 },
    { slug: 'industrie', icon: 'factory', title: 'Industry & Manufacturing', description: 'Production, B2B, engineering', count: 12 },
    { slug: 'technologie', icon: 'cpu', title: 'Technology & SaaS', description: 'Software companies, startups, tech', count: 18 },
  ],
  ru: [
    { slug: 'dienstleistung', icon: 'building2', title: 'Услуги и консалтинг', description: 'Агентства, консультанты, профессиональные услуги', count: 20 },
    { slug: 'e-commerce', icon: 'shopping-cart', title: 'Электронная коммерция', description: 'Интернет-магазины, ритейл, D2C бренды', count: 16 },
    { slug: 'industrie', icon: 'factory', title: 'Промышленность', description: 'Производство, B2B, инжиниринг', count: 12 },
    { slug: 'technologie', icon: 'cpu', title: 'Технологии и SaaS', description: 'Софтверные компании, стартапы, технологии', count: 18 },
  ]
}

const defaultSEO = {
  de: {
    metaTitle: 'Referenzen | Erfolgreiche Projekte & Kundenprojekte',
    metaDescription: 'Entdecken Sie unsere erfolgreichen Kundenprojekte aus Branding, Webdesign, Marketing, SEO und Entwicklung. Echte Ergebnisse für echte Unternehmen.',
    keywords: 'Referenzen, Kundenprojekte, Portfolio, Case Studies, Erfolgsgeschichten',
  },
  en: {
    metaTitle: 'References | Successful Projects & Client Work',
    metaDescription: 'Discover our successful client projects in branding, web design, marketing, SEO, and development. Real results for real businesses.',
    keywords: 'References, Client Projects, Portfolio, Case Studies, Success Stories',
  },
  ru: {
    metaTitle: 'Референции | Успешные проекты и работы для клиентов',
    metaDescription: 'Откройте для себя наши успешные клиентские проекты в области брендинга, веб-дизайна, маркетинга, SEO и разработки.',
    keywords: 'Референции, Клиентские проекты, Портфолио, Кейсы, Истории успеха',
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale
  const rop = await getReferenzenOverviewPage(cmsLocale)
  const seo = defaultSEO[locale]
  const hreflangAlternates = getHreflangAlternates('/referenzen')

  const title = rop?.seo?.metaTitle || seo.metaTitle
  const description = rop?.seo?.metaDescription || seo.metaDescription

  return {
    title,
    description,
    keywords: (rop?.seo?.keywords || seo.keywords).split(',').map((k: string) => k.trim()),
    openGraph: {
      title,
      description,
      url: { de: 'https://goldenwing.at/referenzen', en: 'https://goldenwing.at/en/references', ru: 'https://goldenwing.at/ru/referensy' }[locale] || 'https://goldenwing.at/referenzen',
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
      canonical: { de: '/referenzen', en: '/en/references', ru: '/ru/referensy' }[locale] || '/referenzen',
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ReferenzenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale

  // Fetch CMS data and ALL projects (not just featured)
  const [rop, projects] = await Promise.all([
    getReferenzenOverviewPage(cmsLocale),
    getProjects(cmsLocale),
  ])

  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const defaultServiceCats = defaultServiceCategories[locale]
  const defaultIndustryCats = defaultIndustryCategories[locale]

  // Build content from CMS or defaults
  const content = {
    title: rop?.heroTitle || defaults.title,
    subtitle: rop?.heroSubtitle || defaults.subtitle,
    description: rop?.heroDescription || defaults.description,
    byService: rop?.byServiceLabel || defaults.byService,
    byIndustry: rop?.byIndustryLabel || defaults.byIndustry,
    viewAll: rop?.viewAllLabel || defaults.viewAll,
    featuredProjects: rop?.featuredProjectsLabel || defaults.featuredProjects,
    allProjects: rop?.allProjectsLabel || defaults.allProjects,
    projectsCount: rop?.projectsCountLabel || defaults.projectsCount,
    cta: {
      title: rop?.ctaTitle || defaults.cta.title,
      description: rop?.ctaDescription || defaults.cta.description,
      button: rop?.ctaButton || defaults.cta.button,
    }
  }

  // Use CMS categories or defaults
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serviceCategories = (rop?.serviceCategories && (rop.serviceCategories as any[]).length > 0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (rop.serviceCategories as any[]).map((cat) => ({
        slug: cat.slug as string,
        icon: cat.icon as string || 'palette',
        title: cat.title as string,
        description: cat.description as string,
        count: cat.count as number || 0,
        image: cat.image && typeof cat.image === 'object' ? cat.image as { url?: string; alt?: string } : null,
      }))
    : defaultServiceCats.map(cat => ({ ...cat, image: null }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const industryCategories = (rop?.industryCategories && (rop.industryCategories as any[]).length > 0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (rop.industryCategories as any[]).map((cat) => ({
        slug: cat.slug as string,
        icon: cat.icon as string || 'building2',
        title: cat.title as string,
        description: cat.description as string,
        count: cat.count as number || 0,
        image: cat.image && typeof cat.image === 'object' ? cat.image as { url?: string; alt?: string } : null,
      }))
    : defaultIndustryCats.map(cat => ({ ...cat, image: null }))

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': getSchemaUrl('/', locale) },
      { '@type': 'ListItem', 'position': 2, 'name': { de: 'Referenzen', en: 'References', ru: 'Референции' }[locale] || 'References', 'item': getSchemaUrl('/referenzen', locale) }
    ]
  }

  // CollectionPage schema for portfolio/references overview
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': getSchemaUrl('/referenzen#collection', locale),
    name: content.title,
    description: content.description,
    url: getSchemaUrl('/referenzen', locale),
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://goldenwing.at/#website',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
    about: {
      '@type': 'Thing',
      name: { de: 'Portfolio & Referenzen', en: 'Portfolio & References', ru: 'Портфолио и референции' }[locale] || 'Portfolio & References',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: { de: 'Referenz-Kategorien', en: 'Reference Categories', ru: 'Категории референций' }[locale] || 'Reference Categories',
      numberOfItems: serviceCategories.length + industryCategories.length,
      itemListElement: [
        ...serviceCategories.map((cat, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: cat.title,
            description: cat.description,
            url: getSchemaUrl(`/referenzen/${cat.slug}`, locale),
            provider: {
              '@type': 'Organization',
              name: 'GoldenWing Creative Studios',
            },
          },
        })),
        ...industryCategories.map((cat, index) => ({
          '@type': 'ListItem',
          position: serviceCategories.length + index + 1,
          item: {
            '@type': 'Thing',
            name: cat.title,
            description: cat.description,
            url: getSchemaUrl(`/referenzen/${cat.slug}`, locale),
          },
        })),
      ],
    },
    ...(projects.length > 0 && {
      hasPart: projects.slice(0, 10).map((project) => ({
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: getSchemaUrl(`/projekte/${project.slug}`, locale),
        creator: {
          '@type': 'Organization',
          name: 'GoldenWing Creative Studios',
        },
      })),
    }),
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={collectionSchema} />

      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container variant="block">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {content.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      {/* By Service */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{content.byService}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => {
              const IconComponent = iconMap[category.icon] || Palette
              return (
                <NextLink
                  key={category.slug}
                  href={getReferenzCategoryUrl(category.slug, locale as 'de' | 'en' | 'ru')}
                  className="group rounded-xl bg-background border hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden"
                >
                  {category.image?.url ? (
                    <div className="relative aspect-[16/9] bg-muted">
                      <Image
                        src={category.image.url}
                        alt={category.image.alt || category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {!category.image?.url && (
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {category.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {content.viewAll}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </NextLink>
              )
            })}
          </div>
        </Container>
      </section>

      {/* By Industry */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{content.byIndustry}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryCategories.map((category) => {
              const IconComponent = iconMap[category.icon] || Building2
              return (
                <NextLink
                  key={category.slug}
                  href={getReferenzCategoryUrl(category.slug, locale as 'de' | 'en' | 'ru')}
                  className="group rounded-xl bg-muted/30 border hover:border-primary/50 hover:bg-background transition-all overflow-hidden"
                >
                  {category.image?.url ? (
                    <div className="relative aspect-[4/3] bg-muted">
                      <Image
                        src={category.image.url}
                        alt={category.image.alt || category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    {!category.image?.url && (
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                  </div>
                </NextLink>
              )
            })}
          </div>
        </Container>
      </section>

      {/* All Projects */}
      {projects.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <Container variant="block">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">{content.allProjects}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {(projects as Array<{
                id: string
                slug: string
                title: string
                client?: string
                category?: string
                description?: string
                challenge?: string
                services?: Array<{ service?: string }>
                results?: Array<{ metric?: string; label?: string }>
                tags?: Array<{ tag?: string }>
                mainImage?: { url?: string; alt?: string }
              }>).map((project) => (
                <Link
                  key={project.id}
                  href={{ pathname: '/projekte/[slug]', params: { slug: project.slug } }}
                  className="group bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden flex flex-col"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[16/10] md:aspect-[4/3] bg-muted overflow-hidden">
                    {project.mainImage && typeof project.mainImage === 'object' && project.mainImage.url && (
                      <Image
                        src={project.mainImage.url}
                        alt={project.mainImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    {/* Category Badge */}
                    {project.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-md shadow-sm">
                        {project.category}
                      </span>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-1 p-4 md:p-5">
                    {/* Client */}
                    {project.client && (
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        {project.client}
                      </p>
                    )}
                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    {/* Description */}
                    {(project.description || project.challenge) && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {project.description || project.challenge}
                      </p>
                    )}
                    {/* Results Section */}
                    {project.results && project.results.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-border/50">
                        {project.results.slice(0, 2).map((result, idx) => (
                          result.metric && (
                            <div key={idx} className="text-left">
                              <p className="text-base md:text-lg font-bold text-primary leading-none">
                                {result.metric}
                              </p>
                              {result.label && (
                                <p className="text-[11px] md:text-xs text-muted-foreground mt-1 leading-tight">
                                  {result.label}
                                </p>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                    )}
                    {/* View Project Link */}
                    <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      {defaults.viewProject}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {content.cta.title}
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {content.cta.description}
            </p>
            <NextLink href={getContactUrl(locale)}>
              <Button size="lg" variant="secondary">
                {content.cta.button}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </NextLink>
          </div>
        </Container>
      </section>
    </>
  )
}
