import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { ArrowRight, Download, FileText, Mail, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getFeaturedResources, getRessourcenOverviewPage, type SupportedLocale } from '@/lib/payload'
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
    heroTitle: 'Ressourcen & Downloads',
    heroDescription: 'Kostenlose Tools, Templates und Guides, die Ihnen helfen, Ihre digitale Präsenz auf das nächste Level zu bringen. Praxisnah, sofort einsetzbar und komplett kostenfrei.',
    downloadsTitle: 'Downloads & Templates',
    downloadsDescription: 'Checklisten, Vorlagen und Tools für Branding, Webdesign, SEO und Marketing.',
    newsletterTitle: 'Newsletter',
    newsletterDescription: 'Exklusive Insights, Tipps und Updates direkt in Ihr Postfach. Kein Spam, nur Mehrwert.',
    featuredTitle: 'Beliebte Ressourcen',
    featuredButton: 'Alle anzeigen',
    benefitsTitle: 'Warum unsere Ressourcen?',
    benefitsDescription: 'Praxisorientiertes Wissen aus über 13 Jahren Erfahrung im digitalen Marketing.',
    ctaTitle: 'Bleiben Sie auf dem Laufenden',
    ctaDescription: 'Abonnieren Sie unseren Newsletter und erhalten Sie neue Ressourcen, Insights und Tipps direkt in Ihr Postfach.',
    ctaButton: 'Newsletter abonnieren',
    benefits: [
      { icon: 'bookOpen', title: 'Praxisnah', description: 'Alle Ressourcen sind sofort einsetzbar und basieren auf bewährten Strategien.' },
      { icon: 'download', title: 'Kostenlos', description: 'Alle Downloads sind komplett kostenlos und ohne versteckte Kosten.' },
      { icon: 'fileText', title: 'Aktuell', description: 'Regelmäßig aktualisiert mit den neuesten Trends und Best Practices.' },
    ],
    downloadNow: 'Jetzt herunterladen',
    metaTitle: 'Ressourcen | Kostenlose Downloads & Guides',
    metaDescription: 'Kostenlose Downloads, Guides und Templates für Ihr digitales Marketing und Branding. Praxisnahe Tools und Checklisten.',
  },
  en: {
    heroTitle: 'Resources & Downloads',
    heroDescription: 'Free tools, templates and guides to help you take your digital presence to the next level. Practical, ready to use and completely free.',
    downloadsTitle: 'Downloads & Templates',
    downloadsDescription: 'Checklists, templates and tools for branding, web design, SEO and marketing.',
    newsletterTitle: 'Newsletter',
    newsletterDescription: 'Exclusive insights, tips and updates straight to your inbox. No spam, just value.',
    featuredTitle: 'Popular Resources',
    featuredButton: 'View all',
    benefitsTitle: 'Why Our Resources?',
    benefitsDescription: 'Practical knowledge from over 13 years of experience in digital marketing.',
    ctaTitle: 'Stay Up to Date',
    ctaDescription: 'Subscribe to our newsletter and receive new resources, insights and tips straight to your inbox.',
    ctaButton: 'Subscribe to Newsletter',
    benefits: [
      { icon: 'bookOpen', title: 'Practical', description: 'All resources are ready to use and based on proven strategies.' },
      { icon: 'download', title: 'Free', description: 'All downloads are completely free with no hidden costs.' },
      { icon: 'fileText', title: 'Up-to-date', description: 'Regularly updated with the latest trends and best practices.' },
    ],
    downloadNow: 'Download now',
    metaTitle: 'Resources | Free Downloads & Guides',
    metaDescription: 'Free downloads, guides and templates for your digital marketing and branding. Practical tools and checklists.',
  },
  ru: {
    heroTitle: 'Ресурсы и загрузки',
    heroDescription: 'Бесплатные инструменты, шаблоны и руководства, которые помогут вывести ваше цифровое присутствие на новый уровень. Практично, готово к использованию и абсолютно бесплатно.',
    downloadsTitle: 'Загрузки и шаблоны',
    downloadsDescription: 'Чек-листы, шаблоны и инструменты для брендинга, веб-дизайна, SEO и маркетинга.',
    newsletterTitle: 'Рассылка',
    newsletterDescription: 'Эксклюзивные материалы, советы и обновления прямо на вашу почту. Без спама, только польза.',
    featuredTitle: 'Популярные ресурсы',
    featuredButton: 'Показать все',
    benefitsTitle: 'Почему наши ресурсы?',
    benefitsDescription: 'Практические знания из более чем 13 лет опыта в цифровом маркетинге.',
    ctaTitle: 'Будьте в курсе',
    ctaDescription: 'Подпишитесь на нашу рассылку и получайте новые ресурсы, материалы и советы прямо на почту.',
    ctaButton: 'Подписаться на рассылку',
    benefits: [
      { icon: 'bookOpen', title: 'Практично', description: 'Все ресурсы готовы к использованию и основаны на проверенных стратегиях.' },
      { icon: 'download', title: 'Бесплатно', description: 'Все загрузки полностью бесплатны без скрытых платежей.' },
      { icon: 'fileText', title: 'Актуально', description: 'Регулярно обновляется с учетом последних трендов и лучших практик.' },
    ],
    downloadNow: 'Скачать сейчас',
    metaTitle: 'Ресурсы | Бесплатные загрузки и руководства',
    metaDescription: 'Бесплатные загрузки, руководства и шаблоны для вашего цифрового маркетинга и брендинга. Практичные инструменты и чек-листы.',
  },
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bookOpen: BookOpen,
  download: Download,
  fileText: FileText,
  mail: Mail,
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const cmsPage = await getRessourcenOverviewPage(locale)
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const title = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const description = cmsPage?.seo?.metaDescription || defaults.metaDescription

  const canonicalUrl = getCanonicalUrl('/ressourcen', locale)
  const hreflangAlternates = getHreflangAlternates('/ressourcen', locale)

  return {
    title,
    description,
    keywords: {
      de: ['Kostenlose Ressourcen', 'Marketing Downloads', 'Branding Templates', 'Webdesign Guides', 'Newsletter'],
      en: ['Free Resources', 'Marketing Downloads', 'Branding Templates', 'Web Design Guides', 'Newsletter'],
      ru: ['Бесплатные ресурсы', 'Маркетинговые загрузки', 'Шаблоны брендинга', 'Руководства по веб-дизайну', 'Рассылка'],
    }[locale as 'de' | 'en' | 'ru'] || ['Free Resources', 'Marketing Downloads', 'Branding Templates', 'Web Design Guides', 'Newsletter'],
    openGraph: {
      title: `${title} | GoldenWing Creative Studios`,
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

export default async function RessourcenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const [cmsPage, featuredResources] = await Promise.all([
    getRessourcenOverviewPage(locale),
    getFeaturedResources(locale),
  ])

  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Merge CMS data with defaults
  const heroTitle = cmsPage?.hero?.title || defaults.heroTitle
  const heroDescription = cmsPage?.hero?.description || defaults.heroDescription
  const downloadsTitle = cmsPage?.quickLinks?.downloadsTitle || defaults.downloadsTitle
  const downloadsDescription = cmsPage?.quickLinks?.downloadsDescription || defaults.downloadsDescription
  const newsletterTitle = cmsPage?.quickLinks?.newsletterTitle || defaults.newsletterTitle
  const newsletterDescription = cmsPage?.quickLinks?.newsletterDescription || defaults.newsletterDescription
  const featuredTitle = cmsPage?.featuredTitle || defaults.featuredTitle
  const featuredButton = cmsPage?.featuredButtonText || defaults.featuredButton
  const benefitsTitle = cmsPage?.benefitsTitle || defaults.benefitsTitle
  const benefitsDescription = cmsPage?.benefitsDescription || defaults.benefitsDescription
  const ctaTitle = cmsPage?.ctaTitle || defaults.ctaTitle
  const ctaDescription = cmsPage?.ctaDescription || defaults.ctaDescription
  const ctaButton = cmsPage?.ctaButton || defaults.ctaButton

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const benefits = (cmsPage?.benefits as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.benefits as any[]).map((b: any) => ({
        icon: b.icon || 'bookOpen',
        title: b.title,
        description: b.description,
      }))
    : defaults.benefits

  // Type mapping for display (locale-aware)
  const typeLabels: Record<string, string> = {
    de: { download: 'Download', guide: 'Guide', template: 'Vorlage', checklist: 'Checkliste' },
    en: { download: 'Download', guide: 'Guide', template: 'Template', checklist: 'Checklist' },
    ru: { download: 'Загрузка', guide: 'Руководство', template: 'Шаблон', checklist: 'Чек-лист' },
  }[locale as 'de' | 'en' | 'ru'] || { download: 'Download', guide: 'Guide', template: 'Template', checklist: 'Checklist' }

  const metaTitle = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const metaDescription = cmsPage?.seo?.metaDescription || defaults.metaDescription

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metaTitle,
    description: metaDescription,
    url: getCanonicalUrl('/ressourcen', locale),
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
          { name: { de: 'Ressourcen', en: 'Resources', ru: 'Ресурсы' }[locale as 'de' | 'en' | 'ru'] || 'Resources', url: getSchemaUrl('/ressourcen', locale) },
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
            <p className="text-xl text-muted-foreground mb-8">
              {heroDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="pb-16">
        <Container variant="block">
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/ressourcen/downloads"
              className="group bg-card rounded-xl border p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Download className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                {downloadsTitle}
              </h2>
              <p className="text-muted-foreground">
                {downloadsDescription}
              </p>
            </Link>

            <Link
              href="/ressourcen/newsletter"
              className="group bg-card rounded-xl border p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{newsletterTitle}</h2>
              <p className="text-muted-foreground">
                {newsletterDescription}
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Resources */}
      {featuredResources && featuredResources.length > 0 && (
        <section className="pb-20">
          <Container variant="block">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                {featuredTitle}
              </h2>
              <Button variant="outline" asChild>
                <Link href="/ressourcen/downloads">
                  {featuredButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all h-full flex flex-col"
                >
                  <div className={`aspect-video bg-gradient-to-br ${getColorForCategory(resource.category)} flex items-center justify-center p-6`}>
                    <FileText className="h-16 w-16 text-foreground/20" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">
                        {typeLabels[resource.type] || resource.type}
                      </Badge>
                      <Badge variant="secondary">
                        {resource.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {resource.description}
                    </p>
                    {resource.fileUrl && (
                      <a
                        href={resource.fileUrl}
                        download
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                      >
                        <Download className="h-4 w-4" />
                        {defaults.downloadNow}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {benefitsTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {benefitsDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || BookOpen
              return (
                <div key={index} className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
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
            <Link href="/ressourcen/newsletter">
              {ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  )
}
