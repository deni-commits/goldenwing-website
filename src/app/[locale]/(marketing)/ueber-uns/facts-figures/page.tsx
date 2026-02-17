import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'
import { Users, Globe, Languages, Shield, Zap, Award, LucideIcon } from 'lucide-react'
import { JsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { getFactsFiguresPage, type SupportedLocale } from '@/lib/payload'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'globe': Globe,
  'languages': Languages,
  'shield': Shield,
  'zap': Zap,
  'users': Users,
  'award': Award,
}

// Default content
const defaultContent = {
  de: {
    title: 'Facts & Figures',
    subtitle: 'GoldenWing in Zahlen',
    description: 'Ein Kurzüberblick über unser Netzwerk, unsere Reichweite und unsere Arbeitsweise.',
    mainStats: [
      { number: '15+', label: 'Kernteam + Partnernetzwerk', description: 'Festes Kernteam in Wien, ergänzt durch spezialisierte Partner für Projekte jeder Größe.' },
      { number: '3', label: 'Kontinente', description: 'Präsenz in Europa, Nordamerika und dem Nahen Osten für globale Reichweite.' },
      { number: '13+', label: 'Jahre Erfahrung', description: 'Kontinuierliche Weiterentwicklung und Anpassung an neue Technologien und Märkte.' },
      { number: '500+', label: 'Erfolgreich umgesetzte Projekte', description: 'Von Startups bis zu etablierten Unternehmen – vielfältige Branchenerfahrung.' },
    ],
    highlightsTitle: 'Was uns auszeichnet',
    highlightsSubtitle: 'Unsere Stärken liegen in der Kombination aus lokalem Verständnis und globaler Expertise.',
    highlights: [
      { icon: 'globe', title: 'Internationale Präsenz', description: 'Standorte in Wien, Dubai und California ermöglichen lokale Betreuung mit globalem Know-how.' },
      { icon: 'languages', title: 'Mehrsprachige Projektabwicklung', description: 'Kommunikation und Dokumentation in Deutsch, Englisch und weiteren Sprachen.' },
      { icon: 'shield', title: 'Klare Qualitätsstandards', description: 'Definierte Prozesse, regelmäßige Quality Checks und transparente Kommunikation.' },
      { icon: 'zap', title: 'Agile Arbeitsweise', description: 'Flexible Anpassung an Projektanforderungen, kurze Iterationszyklen und schnelle Reaktion.' },
      { icon: 'users', title: 'Integrierte Teams', description: 'Keine Silos – Strategie, Design, Entwicklung und Marketing arbeiten Hand in Hand.' },
      { icon: 'award', title: 'Messbare Ergebnisse', description: 'Fokus auf Wirkung: Klare KPIs, regelmäßiges Reporting und datenbasierte Optimierung.' },
    ],
    locationsTitle: 'Unsere Standorte',
    locations: [
      { flag: '🇦🇹', city: 'Wien, Österreich', role: 'Hauptsitz' },
      { flag: '🇦🇪', city: 'Dubai, VAE', role: 'MENA Region' },
      { flag: '🇺🇸', city: 'California', role: 'Vertretung Nordamerika' },
    ],
    ctaTitle: 'Bereit für Ihr Projekt?',
    ctaDescription: 'Lassen Sie uns gemeinsam besprechen, wie wir Ihre Ziele erreichen können.',
    ctaPrimaryButton: 'Kontakt aufnehmen',
    ctaSecondaryButton: 'Standorte ansehen',
  },
  en: {
    title: 'Facts & Figures',
    subtitle: 'GoldenWing in Numbers',
    description: 'A brief overview of our network, reach, and working methods.',
    mainStats: [
      { number: '15+', label: 'Core Team + Partner Network', description: 'Dedicated core team in Vienna, supported by specialized partners for projects of any scale.' },
      { number: '3', label: 'Continents', description: 'Presence in Europe, North America, and the Middle East for global reach.' },
      { number: '13+', label: 'Years of Experience', description: 'Continuous development and adaptation to new technologies and markets.' },
      { number: '500+', label: 'Successfully Completed Projects', description: 'From startups to established companies – diverse industry experience.' },
    ],
    highlightsTitle: 'What Sets Us Apart',
    highlightsSubtitle: 'Our strengths lie in the combination of local understanding and global expertise.',
    highlights: [
      { icon: 'globe', title: 'International Presence', description: 'Locations in Vienna, Dubai, and California enable local support with global expertise.' },
      { icon: 'languages', title: 'Multilingual Project Management', description: 'Communication and documentation in German, English, and other languages.' },
      { icon: 'shield', title: 'Clear Quality Standards', description: 'Defined processes, regular quality checks, and transparent communication.' },
      { icon: 'zap', title: 'Agile Approach', description: 'Flexible adaptation to project requirements, short iteration cycles, and quick response.' },
      { icon: 'users', title: 'Integrated Teams', description: 'No silos – strategy, design, development, and marketing work hand in hand.' },
      { icon: 'award', title: 'Measurable Results', description: 'Focus on impact: Clear KPIs, regular reporting, and data-driven optimization.' },
    ],
    locationsTitle: 'Our Locations',
    locations: [
      { flag: '🇦🇹', city: 'Vienna, Austria', role: 'Headquarters' },
      { flag: '🇦🇪', city: 'Dubai, UAE', role: 'MENA Region' },
      { flag: '🇺🇸', city: 'California', role: 'Representative Office' },
    ],
    ctaTitle: 'Ready for Your Project?',
    ctaDescription: 'Let\'s discuss together how we can achieve your goals.',
    ctaPrimaryButton: 'Get in Touch',
    ctaSecondaryButton: 'View Locations',
  },
  ru: {
    title: 'Факты и цифры',
    subtitle: 'GoldenWing в цифрах',
    description: 'Краткий обзор нашей сети, охвата и методов работы.',
    mainStats: [
      { number: '15+', label: 'Основная команда + партнёрская сеть', description: 'Постоянная команда в Вене, усиленная специализированными партнёрами для проектов любого масштаба.' },
      { number: '3', label: 'Континента', description: 'Присутствие в Европе, Северной Америке и на Ближнем Востоке для глобального охвата.' },
      { number: '13+', label: 'Лет опыта', description: 'Постоянное развитие и адаптация к новым технологиям и рынкам.' },
      { number: '500+', label: 'Успешно завершённых проектов', description: 'От стартапов до крупных компаний — разнообразный отраслевой опыт.' },
    ],
    highlightsTitle: 'Что нас отличает',
    highlightsSubtitle: 'Наши сильные стороны — сочетание локального понимания и глобальной экспертизы.',
    highlights: [
      { icon: 'globe', title: 'Международное присутствие', description: 'Офисы в Вене, Дубае и Калифорнии обеспечивают локальную поддержку с глобальной экспертизой.' },
      { icon: 'languages', title: 'Многоязычное управление проектами', description: 'Коммуникация и документация на немецком, английском и других языках.' },
      { icon: 'shield', title: 'Чёткие стандарты качества', description: 'Определённые процессы, регулярные проверки качества и прозрачная коммуникация.' },
      { icon: 'zap', title: 'Гибкий подход', description: 'Гибкая адаптация к требованиям проекта, короткие итерационные циклы и быстрая реакция.' },
      { icon: 'users', title: 'Интегрированные команды', description: 'Без разделения — стратегия, дизайн, разработка и маркетинг работают рука об руку.' },
      { icon: 'award', title: 'Измеримые результаты', description: 'Фокус на эффект: чёткие KPI, регулярные отчёты и оптимизация на основе данных.' },
    ],
    locationsTitle: 'Наши офисы',
    locations: [
      { flag: '🇦🇹', city: 'Вена, Австрия', role: 'Головной офис' },
      { flag: '🇦🇪', city: 'Дубай, ОАЭ', role: 'Регион MENA' },
      { flag: '🇺🇸', city: 'Калифорния', role: 'Представительство' },
    ],
    ctaTitle: 'Готовы к вашему проекту?',
    ctaDescription: 'Давайте вместе обсудим, как мы можем достичь ваших целей.',
    ctaPrimaryButton: 'Связаться с нами',
    ctaSecondaryButton: 'Посмотреть офисы',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const factsFiguresPage = await getFactsFiguresPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = factsFiguresPage as Record<string, any> | null
  const canonicalUrl = getCanonicalUrl('/ueber-uns/facts-figures', locale)

  const metaTitles: Record<string, string> = {
    de: 'Facts & Figures | Über GoldenWing Creative Studios',
    en: 'Facts & Figures | About GoldenWing Creative Studios',
    ru: 'Факты и цифры | О GoldenWing Creative Studios',
  }
  const metaDescriptions: Record<string, string> = {
    de: '500+ Projekte, internationale Präsenz in Europa, Nordamerika und weiteren Märkten. Kernteam in Wien, ergänzt durch spezialisierte Partner.',
    en: '500+ projects, international presence in Europe, North America, and beyond. Core team in Vienna, supported by specialized partners.',
    ru: '500+ проектов, международное присутствие в Европе, Северной Америке и других регионах. Основная команда в Вене, усиленная специализированными партнёрами.',
  }
  const metaKeywords: Record<string, string[]> = {
    de: ['GoldenWing Fakten', 'Agentur Zahlen', 'Internationale Agentur', 'Kreativagentur', 'Experten Team'],
    en: ['GoldenWing Facts', 'Agency Numbers', 'International Agency', 'Creative Agency', 'Expert Team'],
    ru: ['Факты GoldenWing', 'Цифры агентства', 'Международное агентство', 'Креативное агентство', 'Команда экспертов'],
  }

  const title = cp?.seo?.metaTitle || metaTitles[locale] || metaTitles.en
  const description = cp?.seo?.metaDescription || metaDescriptions[locale] || metaDescriptions.en
  const hreflangAlternates = getHreflangAlternates('/ueber-uns/facts-figures', locale)

  return {
    title,
    description,
    keywords: metaKeywords[locale] || metaKeywords.en,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function FactsFiguresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const factsFiguresPage = await getFactsFiguresPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = factsFiguresPage as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Extract CMS arrays
  type MainStat = { number: string; label: string; description: string }
  type Highlight = { icon?: string; title: string; description: string }
  type Location = { flag: string; city: string; role: string }

  const cmsMainStats = cp?.mainStats as MainStat[] | undefined
  const cmsHighlights = cp?.highlights as Highlight[] | undefined
  const cmsLocations = cp?.locationItems as Location[] | undefined

  // Build content with fallbacks
  const content = {
    title: cp?.heroTitle || defaults.title,
    subtitle: cp?.heroSubtitle || defaults.subtitle,
    description: cp?.heroDescription || defaults.description,
    mainStats: cmsMainStats?.length ? cmsMainStats : defaults.mainStats,
    highlightsTitle: cp?.highlightsTitle || defaults.highlightsTitle,
    highlightsSubtitle: cp?.highlightsSubtitle || defaults.highlightsSubtitle,
    highlights: cmsHighlights?.length ? cmsHighlights.map(h => ({
      icon: iconMap[h.icon || 'globe'] || Globe,
      title: h.title,
      description: h.description,
    })) : defaults.highlights.map(h => ({
      icon: iconMap[h.icon] || Globe,
      title: h.title,
      description: h.description,
    })),
    locationsTitle: cp?.locationsTitle || defaults.locationsTitle,
    locations: cmsLocations?.length ? cmsLocations : defaults.locations,
    ctaTitle: cp?.ctaTitle || defaults.ctaTitle,
    ctaDescription: cp?.ctaDescription || defaults.ctaDescription,
    ctaPrimaryButton: cp?.ctaPrimaryButton || defaults.ctaPrimaryButton,
    ctaSecondaryButton: cp?.ctaSecondaryButton || defaults.ctaSecondaryButton,
  }

  const aboutLabels: Record<string, string> = { de: 'Über uns', en: 'About Us', ru: 'О нас' }
  const factsLabels: Record<string, string> = { de: 'Facts & Figures', en: 'Facts & Figures', ru: 'Факты и цифры' }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': getSchemaUrl('/', locale) },
      { '@type': 'ListItem', 'position': 2, 'name': aboutLabels[locale] || aboutLabels.en, 'item': getSchemaUrl('/ueber-uns', locale) },
      { '@type': 'ListItem', 'position': 3, 'name': factsLabels[locale] || factsLabels.en, 'item': getSchemaUrl('/ueber-uns/facts-figures', locale) },
    ],
  }

  const schemaNames: Record<string, string> = {
    de: 'Facts & Figures - GoldenWing Creative Studios',
    en: 'Facts & Figures - GoldenWing Creative Studios',
    ru: 'Факты и цифры - GoldenWing Creative Studios',
  }
  const schemaDescriptions: Record<string, string> = {
    de: '500+ Projekte, internationale Präsenz in Europa, Nordamerika und weiteren Märkten. Kernteam in Wien, ergänzt durch spezialisierte Partner.',
    en: '500+ projects, international presence in Europe, North America, and beyond. Core team in Vienna, supported by specialized partners.',
    ru: '500+ проектов, международное присутствие в Европе, Северной Америке и других регионах. Основная команда в Вене, усиленная специализированными партнёрами.',
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': schemaNames[locale] || schemaNames.en,
    'description': schemaDescriptions[locale] || schemaDescriptions.en,
    'url': getSchemaUrl('/ueber-uns/facts-figures', locale),
    'publisher': {
      '@type': 'Organization',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
      'logo': 'https://goldenwing.at/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Czeikestrasse 4/21',
        'addressLocality': 'Wien',
        'postalCode': '1100',
        'addressCountry': 'AT',
      },
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={webPageSchema} />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
        <Container variant="block" className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              {content.subtitle}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Stats Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.mainStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-background border hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.highlightsTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{content.highlightsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {content.highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Global Reach Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.locationsTitle}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {content.locations.map((location, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-background border">
                  <div className="text-3xl mb-2">{location.flag}</div>
                  <h3 className="text-lg font-semibold mb-1">{location.city}</h3>
                  <p className="text-sm text-muted-foreground">{location.role}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.ctaTitle}</h2>
            <p className="text-muted-foreground mb-8">{content.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {content.ctaPrimaryButton}
              </Link>
              <Link
                href="/standorte"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
              >
                {content.ctaSecondaryButton}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
