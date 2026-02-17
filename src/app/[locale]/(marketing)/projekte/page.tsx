import { Metadata } from 'next'
import NextLink from 'next/link'
import Image from 'next/image'
import { Link } from '@/lib/i18n-navigation'
import { ArrowRight, Palette, Globe, Search, Lightbulb, FileText, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/seo/json-ld'
import { getProjects, getProjekteListingPage, type SupportedLocale } from '@/lib/payload'
import { getProjectTranslationRu } from '@/lib/translations/project-ru'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Default content
const defaultContent = {
  de: {
    heroTitle: 'Projekte & Referenzen',
    heroDescription: 'Entdecken Sie unsere erfolgreich umgesetzten Projekte: Branding, Websites und digitale Lösungen für Unternehmen in Wien und Österreich.',
    emptyMessage: 'Noch keine Projekte vorhanden.',
    emptyAdminText: 'Fügen Sie Projekte im Admin-Bereich hinzu.',
    adminLink: 'Admin',
    ctaTitle: 'Bereit für Ihr Projekt?',
    ctaDescription: 'Lassen Sie uns über Ihre Ideen sprechen. Wir entwickeln gemeinsam die perfekte Lösung für Ihr Unternehmen.',
    ctaButton: 'Projekt anfragen',
    metaTitle: 'Projekte & Referenzen | Portfolio',
    metaDescription: 'Entdecken Sie unsere erfolgreich umgesetzten Projekte: Branding, Websites und digitale Lösungen für Unternehmen in Wien und Österreich.',
  },
  en: {
    heroTitle: 'Projects & References',
    heroDescription: 'Discover our successfully completed projects: Branding, websites and digital solutions for businesses in Vienna and Austria.',
    emptyMessage: 'No projects available yet.',
    emptyAdminText: 'Add projects in the admin area.',
    adminLink: 'Admin',
    ctaTitle: 'Ready for Your Project?',
    ctaDescription: 'Let\'s talk about your ideas. We develop the perfect solution for your business together.',
    ctaButton: 'Request Project',
    metaTitle: 'Projects & References | Portfolio',
    metaDescription: 'Discover our successfully completed projects: Branding, websites and digital solutions for businesses in Vienna and Austria.',
  },
  ru: {
    heroTitle: 'Проекты и референсы',
    heroDescription: 'Откройте для себя наши успешно реализованные проекты: брендинг, веб-сайты и цифровые решения для компаний в Вене и Австрии.',
    emptyMessage: 'Проекты пока отсутствуют.',
    emptyAdminText: 'Добавьте проекты в админ-панели.',
    adminLink: 'Админ',
    ctaTitle: 'Готовы к вашему проекту?',
    ctaDescription: 'Давайте обсудим ваши идеи. Мы разработаем идеальное решение для вашего бизнеса.',
    ctaButton: 'Запросить проект',
    metaTitle: 'Проекты и референсы | Портфолио',
    metaDescription: 'Откройте для себя наши успешно реализованные проекты: брендинг, веб-сайты и цифровые решения для компаний в Вене и Австрии.',
  },
}

interface TagItem {
  id?: string
  tag: string
}

// Color mapping for project categories
const categoryColors: Record<string, string> = {
  'branding': 'from-amber-500/20 to-orange-500/20',
  'webdesign': 'from-blue-500/20 to-cyan-500/20',
  'seo': 'from-emerald-500/20 to-green-500/20',
  'marketing': 'from-rose-500/20 to-pink-500/20',
  'entwicklung': 'from-violet-500/20 to-purple-500/20',
  'it-cloud': 'from-slate-500/20 to-indigo-500/20',
}

function getColorForCategory(category: string): string {
  return categoryColors[category] || 'from-gray-500/20 to-slate-500/20'
}

function CategoryIcon({ category }: { category: string }) {
  const className = "w-16 h-16 text-foreground/10"
  switch (category) {
    case 'branding':
      return <Palette className={className} strokeWidth={1} />
    case 'webdesign':
      return <Globe className={className} strokeWidth={1} />
    case 'seo':
      return <Search className={className} strokeWidth={1} />
    case 'marketing':
      return <Lightbulb className={className} strokeWidth={1} />
    case 'entwicklung':
      return <Code className={className} strokeWidth={1} />
    case 'it-cloud':
      return <FileText className={className} strokeWidth={1} />
    default:
      return <Palette className={className} strokeWidth={1} />
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale
  const cmsPage = await getProjekteListingPage(cmsLocale)
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const hreflangAlternates = getHreflangAlternates('/projekte')

  const title = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const description = cmsPage?.seo?.metaDescription || defaults.metaDescription

  return {
    title,
    description,
    keywords: locale === 'de'
      ? ['Portfolio Webdesign', 'Branding Projekte', 'Referenzen Agentur Wien']
      : ['Web Design Portfolio', 'Branding Projects', 'Agency References Vienna'],
    openGraph: {
      title: `${cmsPage?.hero?.title || defaults.heroTitle} | GoldenWing Creative Studios`,
      description,
    },
    alternates: {
      canonical: getCanonicalUrl('/projekte', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale
  const [cmsPage, projectsRaw] = await Promise.all([
    getProjekteListingPage(cmsLocale),
    getProjects(cmsLocale),
  ])
  const tServices = await getTranslations({ locale, namespace: 'services' })

  // Apply Russian translations to projects when locale is 'ru'
  const projects = locale === 'ru' && projectsRaw
    ? projectsRaw.map(project => {
        const ruTranslation = getProjectTranslationRu(project.slug)
        if (ruTranslation) {
          return {
            ...project,
            title: ruTranslation.title || project.title,
            description: ruTranslation.description || project.description,
          }
        }
        return project
      })
    : projectsRaw

  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Merge CMS data with defaults
  const heroTitle = cmsPage?.hero?.title || defaults.heroTitle
  const heroDescription = cmsPage?.hero?.description || defaults.heroDescription
  const emptyMessage = cmsPage?.emptyState?.message || defaults.emptyMessage
  const emptyAdminText = cmsPage?.emptyState?.adminText || defaults.emptyAdminText
  const adminLink = cmsPage?.emptyState?.adminLinkText || defaults.adminLink
  const ctaTitle = cmsPage?.cta?.title || defaults.ctaTitle
  const ctaDescription = cmsPage?.cta?.description || defaults.ctaDescription
  const ctaButton = cmsPage?.cta?.button || defaults.ctaButton

  // Get category labels from translations
  const getCategoryLabel = (category: string): string => {
    const categoryKeys: Record<string, string> = {
      'branding': 'branding.title',
      'webdesign': 'webdesign.title',
      'seo': 'seoContent.title',
      'seoContent': 'seoContent.title',
      'marketing': 'digitalMarketing.title',
      'digitalMarketing': 'digitalMarketing.title',
      'entwicklung': 'webAppDevelopment.title',
      'webAppDevelopment': 'webAppDevelopment.title',
      'it-cloud': 'itCloudServices.title',
      'itCloudServices': 'itCloudServices.title',
    }
    return categoryKeys[category] ? tServices(categoryKeys[category]) : category
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {emptyMessage}
            </p>
            <p className="text-muted-foreground">
              {emptyAdminText}{' '}
              <NextLink href="/admin" className="text-primary hover:underline">
                {adminLink}
              </NextLink>
              .
            </p>
          </div>
        </Container>
      </section>
    )
  }

  // Schema for projects collection page
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: heroTitle,
    description: heroDescription,
    url: getSchemaUrl('/projekte', locale),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.slice(0, 10).map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: getSchemaUrl(`/projekte/${project.slug}`, locale),
          creator: {
            '@type': 'Organization',
            name: 'GoldenWing Creative Studios',
          },
        },
      })),
    },
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getSchemaUrl('/', locale) },
      { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Projekte' : 'Projects', item: getSchemaUrl('/projekte', locale) },
    ],
  }

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbData} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {heroDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <Container variant="block">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={{ pathname: '/projekte/[slug]', params: { slug: project.slug } }}
                className="group block"
              >
                <article className="bg-card rounded-2xl border overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group-hover:-translate-y-1">
                  {/* Project Image */}
                  <div className={`aspect-[16/10] relative overflow-hidden ${!project.mainImage?.url ? `bg-gradient-to-br ${getColorForCategory(project.category)}` : 'bg-muted'}`}>
                    {/* Actual Image */}
                    {project.mainImage && typeof project.mainImage === 'object' && project.mainImage.url ? (
                      <Image
                        src={project.mainImage.url}
                        alt={project.mainImage.alt || project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        quality={80}
                      />
                    ) : (
                      <>
                        {/* Fallback: Decorative Pattern */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        </div>
                        {/* Fallback: Category Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CategoryIcon category={project.category} />
                        </div>
                      </>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 shadow-sm">
                        {getCategoryLabel(project.category)}
                      </Badge>
                    </div>
                    {/* Client Badge */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="text-sm font-medium text-foreground/60 bg-background/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        {project.client}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h2>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                    {/* Tags - Limited to 3 */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tagItem: TagItem, idx: number) => (
                          <Badge key={tagItem.id || idx} variant="outline" className="text-xs font-normal">
                            {tagItem.tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Results */}
                    {project.results && project.results.length > 0 && (
                      <div className="pt-4 border-t flex flex-wrap items-center gap-x-4 gap-y-2">
                        {project.results.slice(0, 2).map((result: { metric: string; label: string }, idx: number) => (
                          <div key={idx} className="flex items-baseline gap-1.5 whitespace-nowrap">
                            <span className="text-lg font-bold text-primary">{result.metric}</span>
                            <span className="text-xs text-muted-foreground">{result.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/kontakt">
              {ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  )
}
