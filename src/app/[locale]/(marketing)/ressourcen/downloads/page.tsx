import { Metadata } from 'next'
import { Download, FileText, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getResources, getDownloadsPage, type SupportedLocale } from '@/lib/payload'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'
import { BreadcrumbListSchema, JsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Default content
const defaultContent = {
  de: {
    heroTitle: 'Downloads & Templates',
    heroDescription: 'Kostenlose Ressourcen für Ihr digitales Marketing. Checklisten, Vorlagen, Guides und Templates – praxisnah und sofort einsetzbar.',
    searchPlaceholder: 'Ressourcen durchsuchen...',
    allTab: 'Alle',
    emptyTitle: 'Keine Ressourcen verfügbar',
    emptyDescription: 'Wir arbeiten an neuen Downloads. Schauen Sie bald wieder vorbei!',
    noCategoryTitle: 'Keine Ressourcen in',
    noCategoryDescription: 'Aktuell keine Ressourcen verfügbar. Schauen Sie in anderen Kategorien!',
    howToUseTitle: 'Wie Sie unsere Ressourcen nutzen',
    steps: [
      { title: 'Auswählen', description: 'Wählen Sie die passende Ressource für Ihr Projekt' },
      { title: 'Herunterladen', description: 'Kostenloser Download ohne Anmeldung' },
      { title: 'Anwenden', description: 'Direkt in Ihrem Projekt einsetzen und profitieren' },
    ],
    newLabel: 'Neu',
    metaTitle: 'Downloads & Templates | Kostenlose Ressourcen',
    metaDescription: 'Kostenlose Downloads, Checklisten, Guides und Templates für digitales Marketing, Branding und Webdesign.',
  },
  en: {
    heroTitle: 'Downloads & Templates',
    heroDescription: 'Free resources for your digital marketing. Checklists, templates, guides and templates – practical and ready to use.',
    searchPlaceholder: 'Search resources...',
    allTab: 'All',
    emptyTitle: 'No resources available',
    emptyDescription: 'We are working on new downloads. Check back soon!',
    noCategoryTitle: 'No resources in',
    noCategoryDescription: 'No resources available at the moment. Check other categories!',
    howToUseTitle: 'How to Use Our Resources',
    steps: [
      { title: 'Select', description: 'Choose the right resource for your project' },
      { title: 'Download', description: 'Free download without registration' },
      { title: 'Apply', description: 'Use directly in your project and benefit' },
    ],
    newLabel: 'New',
    metaTitle: 'Downloads & Templates | Free Resources',
    metaDescription: 'Free downloads, checklists, guides and templates for digital marketing, branding and web design.',
  },
  ru: {
    heroTitle: 'Загрузки и шаблоны',
    heroDescription: 'Бесплатные ресурсы для вашего цифрового маркетинга. Чек-листы, шаблоны, руководства – практичные и готовые к использованию.',
    searchPlaceholder: 'Поиск ресурсов...',
    allTab: 'Все',
    emptyTitle: 'Ресурсы недоступны',
    emptyDescription: 'Мы работаем над новыми загрузками. Загляните позже!',
    noCategoryTitle: 'Нет ресурсов в категории',
    noCategoryDescription: 'В данный момент ресурсы недоступны. Посмотрите другие категории!',
    howToUseTitle: 'Как использовать наши ресурсы',
    steps: [
      { title: 'Выберите', description: 'Выберите подходящий ресурс для вашего проекта' },
      { title: 'Скачайте', description: 'Бесплатная загрузка без регистрации' },
      { title: 'Применяйте', description: 'Используйте напрямую в вашем проекте и получайте результат' },
    ],
    newLabel: 'Новое',
    metaTitle: 'Загрузки и шаблоны | Бесплатные ресурсы',
    metaDescription: 'Бесплатные загрузки, чек-листы, руководства и шаблоны для цифрового маркетинга, брендинга и веб-дизайна.',
  },
}

interface Resource {
  id: string
  title: string
  slug: string
  description: string
  type: string
  category: string
  downloadCount?: number
  publishedAt: string
  thumbnail?: string
  thumbnailAlt?: string
  fileUrl?: string
  fileName?: string
}

// Category colors
const categoryColors: Record<string, string> = {
  branding: 'from-violet-500/20 to-purple-500/20',
  webdesign: 'from-blue-500/20 to-cyan-500/20',
  seo: 'from-emerald-500/20 to-green-500/20',
  marketing: 'from-rose-500/20 to-pink-500/20',
  strategie: 'from-amber-500/20 to-yellow-500/20',
}

function getColorForCategory(category: string): string {
  return categoryColors[category] || 'from-gray-500/20 to-slate-500/20'
}

function ResourceCard({
  resource,
  typeLabels,
  categoryLabels,
  newLabel,
}: {
  resource: Resource
  typeLabels: Record<string, string>
  categoryLabels: Record<string, string>
  newLabel: string
}) {
  return (
    <div className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
      <div className={`aspect-video bg-gradient-to-br ${getColorForCategory(resource.category)} flex items-center justify-center p-6`}>
        <FileText className="h-16 w-16 text-foreground/20" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="outline">
            {typeLabels[resource.type] || resource.type}
          </Badge>
          <Badge variant="secondary">
            {categoryLabels[resource.category] || resource.category}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 flex-1">
          {resource.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            {resource.downloadCount
              ? `${resource.downloadCount} Downloads`
              : newLabel}
          </div>
          {resource.fileUrl && (
            <a
              href={resource.fileUrl}
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const cmsPage = await getDownloadsPage(locale)
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const title = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const description = cmsPage?.seo?.metaDescription || defaults.metaDescription
  const canonicalUrl = getCanonicalUrl('/ressourcen/downloads', locale)
  const hreflangAlternates = getHreflangAlternates('/ressourcen/downloads', locale)

  return {
    title,
    description,
    keywords: {
      de: ['Kostenlose Downloads', 'Marketing Templates', 'Branding Checklisten', 'Webdesign Guides', 'SEO Templates'],
      en: ['Free Downloads', 'Marketing Templates', 'Branding Checklists', 'Web Design Guides', 'SEO Templates'],
      ru: ['Бесплатные загрузки', 'Маркетинговые шаблоны', 'Чек-листы брендинга', 'Руководства по веб-дизайну', 'SEO шаблоны'],
    }[locale] || ['Free Downloads', 'Marketing Templates', 'Branding Checklists', 'Web Design Guides', 'SEO Templates'],
    openGraph: {
      title: `${title} | GoldenWing Ressourcen`,
      description,
      url: canonicalUrl,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function DownloadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const [cmsPage, allResources] = await Promise.all([
    getDownloadsPage(locale),
    getResources(locale) as Promise<Resource[]>,
  ])

  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Merge CMS data with defaults
  const heroTitle = cmsPage?.hero?.title || defaults.heroTitle
  const heroDescription = cmsPage?.hero?.description || defaults.heroDescription
  const searchPlaceholder = cmsPage?.searchPlaceholder || defaults.searchPlaceholder
  const allTabLabel = cmsPage?.allTabLabel || defaults.allTab
  const emptyTitle = cmsPage?.emptyState?.title || defaults.emptyTitle
  const emptyDescription = cmsPage?.emptyState?.description || defaults.emptyDescription
  const howToUseTitle = cmsPage?.howToUseTitle || defaults.howToUseTitle

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const steps = (cmsPage?.steps as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.steps as any[]).map((s: any) => ({
        title: s.title,
        description: s.description,
      }))
    : defaults.steps

  // Type mapping for display (locale-aware)
  const typeLabels: Record<string, string> = {
    de: { download: 'Download', guide: 'Guide', template: 'Vorlage', checklist: 'Checkliste' },
    en: { download: 'Download', guide: 'Guide', template: 'Template', checklist: 'Checklist' },
    ru: { download: 'Загрузка', guide: 'Руководство', template: 'Шаблон', checklist: 'Чек-лист' },
  }[locale] || { download: 'Download', guide: 'Guide', template: 'Template', checklist: 'Checklist' }

  // Category labels (locale-aware)
  const categoryLabels: Record<string, string> = {
    de: { branding: 'Branding', webdesign: 'Webdesign', seo: 'SEO', marketing: 'Marketing', strategie: 'Strategie' },
    en: { branding: 'Branding', webdesign: 'Web Design', seo: 'SEO', marketing: 'Marketing', strategie: 'Strategy' },
    ru: { branding: 'Брендинг', webdesign: 'Веб-дизайн', seo: 'SEO', marketing: 'Маркетинг', strategie: 'Стратегия' },
  }[locale] || { branding: 'Branding', webdesign: 'Web Design', seo: 'SEO', marketing: 'Marketing', strategie: 'Strategy' }

  // Group resources by category
  const resourcesByCategory: Record<string, Resource[]> = {
    all: allResources,
  }

  Object.keys(categoryLabels).forEach((cat) => {
    resourcesByCategory[cat] = allResources.filter((r) => r.category === cat)
  })

  const metaTitle = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const metaDescription = cmsPage?.seo?.metaDescription || defaults.metaDescription

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metaTitle,
    description: metaDescription,
    url: getCanonicalUrl('/ressourcen/downloads', locale),
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
  }

  return (
    <>
      {/* JSON-LD Schemas */}
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: getSchemaUrl('/', locale) },
          { name: { de: 'Ressourcen', en: 'Resources', ru: 'Ресурсы' }[locale] || 'Resources', url: getSchemaUrl('/ressourcen', locale) },
          { name: { de: 'Downloads', en: 'Downloads', ru: 'Загрузки' }[locale] || 'Downloads', url: getSchemaUrl('/ressourcen/downloads', locale) },
        ]}
      />
      <JsonLd data={collectionPageSchema} />

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

      {/* Search & Filter */}
      <section className="pb-8">
        <Container variant="block">
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className="pl-10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Resources Grid with Tabs */}
      <section className="pb-20">
        <Container variant="block">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">
                {allTabLabel} ({allResources.length})
              </TabsTrigger>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <TabsTrigger key={key} value={key}>
                  {label} ({resourcesByCategory[key]?.length || 0})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {allResources.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      typeLabels={typeLabels}
                      categoryLabels={categoryLabels}
                      newLabel={defaults.newLabel}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {emptyTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {emptyDescription}
                  </p>
                </div>
              )}
            </TabsContent>

            {Object.entries(categoryLabels).map(([key, label]) => (
              <TabsContent key={key} value={key} className="mt-0">
                {resourcesByCategory[key] && resourcesByCategory[key].length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resourcesByCategory[key].map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        typeLabels={typeLabels}
                        categoryLabels={categoryLabels}
                        newLabel={defaults.newLabel}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {defaults.noCategoryTitle} {label}
                    </h3>
                    <p className="text-muted-foreground">
                      {defaults.noCategoryDescription}
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/50">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              {howToUseTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {steps.map((step, index) => (
                <div key={index}>
                  <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
