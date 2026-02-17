import { Metadata } from 'next'
import NextLink from 'next/link'
import { getCanonicalUrl, getHreflangAlternates, getPackageUrl, getSchemaUrl, getContactUrl, getServicesUrl } from '@/lib/utils'
import { ArrowRight, Palette, TrendingUp, Target, Settings, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { getPackagesOverviewPage, getPackages } from '@/lib/payload'
import type { SupportedLocale } from '@/lib/payload'
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/seo/comparison-table'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'palette': Palette,
  'trending-up': TrendingUp,
  'target': Target,
  'settings': Settings,
}

// Default content for fallback
const defaultContent = {
  de: {
    heroTitle: 'Service-Pakete',
    heroSubtitle: 'Gebündelte Expertise für Ihren Erfolg',
    heroDescription: 'Unsere Service-Pakete kombinieren bewährte Leistungen zu effektiven Lösungen. Wählen Sie das Paket, das zu Ihren Zielen passt – oder lassen Sie uns ein individuelles Angebot erstellen.',
    ctaTitle: 'Nicht sicher, welches Paket passt?',
    ctaDescription: 'In einem kostenlosen Erstgespräch finden wir gemeinsam die beste Lösung für Ihre Anforderungen.',
    ctaPrimaryButton: 'Erstgespräch vereinbaren',
    ctaSecondaryButton: 'Einzelne Services ansehen',
    typicalContentsLabel: 'Typische Inhalte',
    learnMoreLabel: 'Mehr erfahren',
  },
  en: {
    heroTitle: 'Service Packages',
    heroSubtitle: 'Bundled Expertise for Your Success',
    heroDescription: 'Our service packages combine proven services into effective solutions. Choose the package that fits your goals – or let us create a custom offer.',
    ctaTitle: 'Not sure which package fits?',
    ctaDescription: 'In a free initial consultation, we will find the best solution for your requirements together.',
    ctaPrimaryButton: 'Schedule Consultation',
    ctaSecondaryButton: 'View Individual Services',
    typicalContentsLabel: 'Typical Contents',
    learnMoreLabel: 'Learn more',
  },
  ru: {
    heroTitle: 'Пакеты услуг',
    heroSubtitle: 'Комплексная экспертиза для вашего успеха',
    heroDescription: 'Наши пакеты услуг объединяют проверенные решения в эффективные комплексы. Выберите пакет, который соответствует вашим целям, или позвольте нам создать индивидуальное предложение.',
    ctaTitle: 'Не уверены, какой пакет подходит?',
    ctaDescription: 'На бесплатной первичной консультации мы вместе найдём лучшее решение для ваших задач.',
    ctaPrimaryButton: 'Записаться на консультацию',
    ctaSecondaryButton: 'Посмотреть отдельные услуги',
    typicalContentsLabel: 'Типичное содержание',
    learnMoreLabel: 'Подробнее',
  },
}

const defaultPakete = {
  de: [
    {
      icon: 'palette',
      slug: 'brand-web-foundation',
      title: 'Brand & Web Foundation',
      goal: 'Eine klare Marke und eine Website, die Orientierung schafft',
      description: 'Das Fundament für Ihren digitalen Auftritt. Wir entwickeln Ihre Markenidentität und setzen sie in einer professionellen Website um.',
      includes: [
        'Markenpositionierung und visuelle Identität',
        'Webseitenstruktur und Design',
        'Grundlegende Inhalte und Templates',
        'Sauberer technischer Setup und Go-Live',
      ],
      idealFor: 'Ideal für Startups und Unternehmen, die ihre digitale Präsenz von Grund auf aufbauen möchten.',
    },
    {
      icon: 'trending-up',
      slug: 'seo-content-growth',
      title: 'SEO & Content Growth',
      goal: 'Nachhaltige Sichtbarkeit und planbarer organischer Traffic',
      description: 'Organisches Wachstum durch strategischen Content und technische Optimierung. Wir bringen Ihre Zielgruppe zu Ihnen.',
      includes: [
        'Themen- und Content-Strategie',
        'Strukturierte Inhalte und Seitenlogik',
        'Redaktionspläne und Prozesse',
        'Kontinuierliche Optimierung und Auswertung',
      ],
      idealFor: 'Ideal für Unternehmen mit bestehender Website, die ihre organische Reichweite ausbauen möchten.',
    },
    {
      icon: 'target',
      slug: 'demand-gen-suite',
      title: 'Demand Gen Suite',
      goal: 'Messbare Nachfrage und qualifizierte Anfragen',
      description: 'Full-Funnel-Marketing für B2B und B2C. Von der ersten Berührung bis zur Conversion – wir generieren qualifizierte Leads.',
      includes: [
        'Funnel- und Kampagnenkonzepte',
        'Paid Media und Content-Produktion',
        'Automatisierung und Lead-Nurturing',
        'Tracking und laufende Optimierung',
      ],
      idealFor: 'Ideal für Unternehmen, die aktiv Leads generieren und ihren Sales-Funnel füllen möchten.',
    },
    {
      icon: 'settings',
      slug: 'individuelles-paket',
      title: 'Individuelles Paket',
      goal: 'Maximale Passgenauigkeit für komplexe Anforderungen',
      description: 'Maßgeschneiderte Lösungen für Ihre spezifischen Herausforderungen. Wir kombinieren unsere Services nach Ihren Bedürfnissen.',
      includes: [
        'Kombination aller Services nach Bedarf',
        'Klare Roadmap und Priorisierung',
        'Enge Abstimmung mit internen Teams',
        'Langfristige Begleitung und Betrieb',
      ],
      idealFor: 'Ideal für Unternehmen mit komplexen Anforderungen oder laufenden Projekten.',
    },
  ],
  en: [
    {
      icon: 'palette',
      slug: 'brand-web-foundation',
      title: 'Brand & Web Foundation',
      goal: 'A clear brand and a website that creates orientation',
      description: 'The foundation for your digital presence. We develop your brand identity and implement it in a professional website.',
      includes: [
        'Brand positioning and visual identity',
        'Website structure and design',
        'Basic content and templates',
        'Clean technical setup and go-live',
      ],
      idealFor: 'Ideal for startups and companies that want to build their digital presence from scratch.',
    },
    {
      icon: 'trending-up',
      slug: 'seo-content-growth',
      title: 'SEO & Content Growth',
      goal: 'Sustainable visibility and predictable organic traffic',
      description: 'Organic growth through strategic content and technical optimization. We bring your target audience to you.',
      includes: [
        'Topic and content strategy',
        'Structured content and page logic',
        'Editorial plans and processes',
        'Continuous optimization and evaluation',
      ],
      idealFor: 'Ideal for companies with existing websites that want to expand their organic reach.',
    },
    {
      icon: 'target',
      slug: 'demand-gen-suite',
      title: 'Demand Gen Suite',
      goal: 'Measurable demand and qualified inquiries',
      description: 'Full-funnel marketing for B2B and B2C. From first touch to conversion – we generate qualified leads.',
      includes: [
        'Funnel and campaign concepts',
        'Paid media and content production',
        'Automation and lead nurturing',
        'Tracking and ongoing optimization',
      ],
      idealFor: 'Ideal for companies that want to actively generate leads and fill their sales funnel.',
    },
    {
      icon: 'settings',
      slug: 'individuelles-paket',
      title: 'Custom Package',
      goal: 'Maximum precision for complex requirements',
      description: 'Tailored solutions for your specific challenges. We combine our services according to your needs.',
      includes: [
        'Combination of all services as needed',
        'Clear roadmap and prioritization',
        'Close coordination with internal teams',
        'Long-term support and operations',
      ],
      idealFor: 'Ideal for companies with complex requirements or ongoing projects.',
    },
  ],
  ru: [
    {
      icon: 'palette',
      slug: 'brand-web-foundation',
      title: 'Brand & Web Foundation',
      goal: 'Чёткий бренд и сайт, который создаёт ориентацию',
      description: 'Фундамент для вашего цифрового присутствия. Мы разрабатываем вашу идентичность бренда и реализуем её в профессиональном веб-сайте.',
      includes: [
        'Позиционирование бренда и визуальная идентичность',
        'Структура и дизайн веб-сайта',
        'Базовый контент и шаблоны',
        'Чистая техническая настройка и запуск',
      ],
      idealFor: 'Идеально для стартапов и компаний, которые хотят создать цифровое присутствие с нуля.',
    },
    {
      icon: 'trending-up',
      slug: 'seo-content-growth',
      title: 'SEO & Content Growth',
      goal: 'Устойчивая видимость и предсказуемый органический трафик',
      description: 'Органический рост через стратегический контент и техническую оптимизацию.',
      includes: [
        'Тематическая и контент-стратегия',
        'Структурированный контент и логика страниц',
        'Редакционные планы и процессы',
        'Постоянная оптимизация и оценка',
      ],
      idealFor: 'Идеально для компаний с существующим сайтом, которые хотят расширить органический охват.',
    },
    {
      icon: 'target',
      slug: 'demand-gen-suite',
      title: 'Demand Gen Suite',
      goal: 'Измеримый спрос и квалифицированные запросы',
      description: 'Полноценный маркетинг для B2B и B2C. От первого контакта до конверсии.',
      includes: [
        'Воронка и концепции кампаний',
        'Платные медиа и производство контента',
        'Автоматизация и взращивание лидов',
        'Отслеживание и постоянная оптимизация',
      ],
      idealFor: 'Идеально для компаний, которые хотят активно генерировать лиды.',
    },
    {
      icon: 'settings',
      slug: 'individuelles-paket',
      title: 'Индивидуальный пакет',
      goal: 'Максимальная точность для сложных требований',
      description: 'Индивидуальные решения для ваших конкретных задач.',
      includes: [
        'Комбинация всех услуг по необходимости',
        'Чёткая дорожная карта и приоритеты',
        'Тесная координация с внутренними командами',
        'Долгосрочная поддержка и эксплуатация',
      ],
      idealFor: 'Идеально для компаний со сложными требованиями.',
    },
  ],
}

const defaultSEO = {
  de: {
    metaTitle: 'Service-Pakete | Komplettlösungen für Ihr Unternehmen',
    metaDescription: 'Wählen Sie aus unseren gebündelten Service-Paketen: Brand & Web Foundation, SEO & Content Growth, Demand Gen Suite oder ein individuelles Paket.',
    keywords: 'Service-Pakete, Branding Paket, SEO Paket, Marketing Paket, Website Paket, GoldenWing',
  },
  en: {
    metaTitle: 'Service Packages | Complete Solutions for Your Business',
    metaDescription: 'Choose from our bundled service packages: Brand & Web Foundation, SEO & Content Growth, Demand Gen Suite, or a custom package.',
    keywords: 'Service Packages, Branding Package, SEO Package, Marketing Package, Website Package, GoldenWing',
  },
  ru: {
    metaTitle: 'Пакеты услуг | Комплексные решения для вашего бизнеса',
    metaDescription: 'Выберите из наших пакетов услуг: Brand & Web Foundation, SEO & Content Growth, Demand Gen Suite или индивидуальный пакет.',
    keywords: 'Пакеты услуг, Пакет брендинга, SEO пакет, Маркетинговый пакет, Пакет веб-сайта, GoldenWing',
  },
}

// Package comparison data for SEO
const comparisonData = {
  de: {
    title: 'Pakete im Vergleich',
    subtitle: 'Finden Sie das passende Paket für Ihre Anforderungen',
    columns: [
      { name: 'Brand & Web Foundation', description: 'Basis-Paket' },
      { name: 'SEO & Content Growth', description: 'Wachstums-Paket', highlighted: true },
      { name: 'Demand Gen Suite', description: 'Marketing-Paket' },
      { name: 'Individuell', description: 'Maßgeschneidert' },
    ] as ComparisonColumn[],
    rows: [
      { feature: 'Markenstrategie', description: 'Positionierung & Identität', values: [true, 'partial', 'partial', true] },
      { feature: 'Logo & Visual Identity', description: 'Visuelles Erscheinungsbild', values: [true, false, false, true] },
      { feature: 'Website Design & Entwicklung', description: 'Responsive Webseite', values: [true, 'partial', 'partial', true] },
      { feature: 'SEO-Optimierung', description: 'Technisches & On-Page SEO', values: ['partial', true, true, true] },
      { feature: 'Content-Strategie', description: 'Redaktionsplanung', values: [false, true, true, true] },
      { feature: 'Content-Produktion', description: 'Texte, Bilder, Videos', values: ['partial', true, true, true] },
      { feature: 'Paid Media Kampagnen', description: 'Google Ads, Meta Ads', values: [false, false, true, true] },
      { feature: 'E-Mail Marketing', description: 'Automation & Nurturing', values: [false, false, true, true] },
      { feature: 'Lead Generation', description: 'Funnel & Conversion', values: [false, 'partial', true, true] },
      { feature: 'Monatliches Reporting', description: 'Performance-Analyse', values: [false, true, true, true] },
      { feature: 'Laufende Betreuung', description: 'Support & Optimierung', values: ['3 Monate', '6 Monate', '12 Monate', 'Flexibel'] },
    ] as ComparisonRow[],
    footerNote: 'Alle Pakete werden individuell auf Ihre Anforderungen angepasst. Preise auf Anfrage.',
  },
  en: {
    title: 'Package Comparison',
    subtitle: 'Find the right package for your requirements',
    columns: [
      { name: 'Brand & Web Foundation', description: 'Basic Package' },
      { name: 'SEO & Content Growth', description: 'Growth Package', highlighted: true },
      { name: 'Demand Gen Suite', description: 'Marketing Package' },
      { name: 'Custom', description: 'Tailored' },
    ] as ComparisonColumn[],
    rows: [
      { feature: 'Brand Strategy', description: 'Positioning & Identity', values: [true, 'partial', 'partial', true] },
      { feature: 'Logo & Visual Identity', description: 'Visual appearance', values: [true, false, false, true] },
      { feature: 'Website Design & Development', description: 'Responsive website', values: [true, 'partial', 'partial', true] },
      { feature: 'SEO Optimization', description: 'Technical & On-Page SEO', values: ['partial', true, true, true] },
      { feature: 'Content Strategy', description: 'Editorial planning', values: [false, true, true, true] },
      { feature: 'Content Production', description: 'Text, images, videos', values: ['partial', true, true, true] },
      { feature: 'Paid Media Campaigns', description: 'Google Ads, Meta Ads', values: [false, false, true, true] },
      { feature: 'Email Marketing', description: 'Automation & Nurturing', values: [false, false, true, true] },
      { feature: 'Lead Generation', description: 'Funnel & Conversion', values: [false, 'partial', true, true] },
      { feature: 'Monthly Reporting', description: 'Performance analysis', values: [false, true, true, true] },
      { feature: 'Ongoing Support', description: 'Support & Optimization', values: ['3 months', '6 months', '12 months', 'Flexible'] },
    ] as ComparisonRow[],
    footerNote: 'All packages are individually tailored to your requirements. Prices on request.',
  },
  ru: {
    title: 'Сравнение пакетов',
    subtitle: 'Найдите подходящий пакет для ваших задач',
    columns: [
      { name: 'Brand & Web Foundation', description: 'Базовый пакет' },
      { name: 'SEO & Content Growth', description: 'Пакет роста', highlighted: true },
      { name: 'Demand Gen Suite', description: 'Маркетинговый пакет' },
      { name: 'Индивидуальный', description: 'По запросу' },
    ] as ComparisonColumn[],
    rows: [
      { feature: 'Стратегия бренда', description: 'Позиционирование и идентичность', values: [true, 'partial', 'partial', true] },
      { feature: 'Логотип и визуальная идентичность', description: 'Визуальный облик', values: [true, false, false, true] },
      { feature: 'Дизайн и разработка сайта', description: 'Адаптивный веб-сайт', values: [true, 'partial', 'partial', true] },
      { feature: 'SEO-оптимизация', description: 'Техническое и On-Page SEO', values: ['partial', true, true, true] },
      { feature: 'Контент-стратегия', description: 'Редакционное планирование', values: [false, true, true, true] },
      { feature: 'Производство контента', description: 'Тексты, изображения, видео', values: ['partial', true, true, true] },
      { feature: 'Рекламные кампании', description: 'Google Ads, Meta Ads', values: [false, false, true, true] },
      { feature: 'E-mail маркетинг', description: 'Автоматизация и взращивание', values: [false, false, true, true] },
      { feature: 'Генерация лидов', description: 'Воронка и конверсия', values: [false, 'partial', true, true] },
      { feature: 'Ежемесячная отчётность', description: 'Анализ эффективности', values: [false, true, true, true] },
      { feature: 'Постоянная поддержка', description: 'Поддержка и оптимизация', values: ['3 месяца', '6 месяцев', '12 месяцев', 'Гибко'] },
    ] as ComparisonRow[],
    footerNote: 'Все пакеты индивидуально адаптируются под ваши требования. Цены по запросу.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const pp = await getPackagesOverviewPage(locale)
  const seo = defaultSEO[locale]
  const canonicalUrl = getCanonicalUrl('/leistungen/pakete', locale)
  const hreflangAlternates = getHreflangAlternates('/leistungen/pakete', locale)

  return {
    title: pp?.seo?.metaTitle || seo.metaTitle,
    description: pp?.seo?.metaDescription || seo.metaDescription,
    keywords: (pp?.seo?.keywords || seo.keywords).split(',').map((k: string) => k.trim()),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function PaketePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const [pp, packagesData] = await Promise.all([
    getPackagesOverviewPage(locale),
    getPackages(locale),
  ])

  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const defaultPaketList = defaultPakete[locale]

  // Build content from CMS or defaults
  const content = {
    heroTitle: pp?.heroTitle || defaults.heroTitle,
    heroSubtitle: pp?.heroSubtitle || defaults.heroSubtitle,
    heroDescription: pp?.heroDescription || defaults.heroDescription,
    ctaTitle: pp?.ctaTitle || defaults.ctaTitle,
    ctaDescription: pp?.ctaDescription || defaults.ctaDescription,
    ctaPrimaryButton: pp?.ctaPrimaryButton || defaults.ctaPrimaryButton,
    ctaSecondaryButton: pp?.ctaSecondaryButton || defaults.ctaSecondaryButton,
    typicalContentsLabel: pp?.typicalContentsLabel || defaults.typicalContentsLabel,
    learnMoreLabel: pp?.learnMoreLabel || defaults.learnMoreLabel,
  }

  // Use CMS packages or default list
   
  const pakete = (packagesData && packagesData.length > 0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (packagesData as any[]).map((p) => ({
        icon: p.icon || 'settings',
        slug: p.slug as string,
        title: p.title as string,
        goal: (p.goal as string) || '',
        description: (p.description as string) || '',
        includes: (p.includes as Array<{ text: string }> | undefined)?.map((i) => i.text) || [],
        idealFor: (p.idealFor as string) || '',
      }))
    : defaultPaketList

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': getSchemaUrl('/', locale)
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale] || 'Services',
        'item': getSchemaUrl('/leistungen', locale)
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': { de: 'Service-Pakete', en: 'Service Packages', ru: 'Пакеты услуг' }[locale] || 'Service Packages',
        'item': getSchemaUrl('/leistungen/pakete', locale)
      }
    ]
  }

  // Vienna office provider for Service schemas
  const viennaOfficeProvider = {
    '@type': 'LocalBusiness',
    '@id': 'https://goldenwing.at/#organization',
    name: 'GoldenWing Creative Studios',
    url: 'https://goldenwing.at',
    telephone: '+43-664-543-96-81',
    email: 'office@goldenwing.at',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Czeikestrasse 4/21',
      addressLocality: 'Wien',
      postalCode: '1100',
      addressRegion: 'Wien',
      addressCountry: 'AT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1676,
      longitude: 16.3795,
    },
    priceRange: '$$',
  }

  // ItemList schema for packages with Vienna provider
  const packagesListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: { de: 'Service-Pakete', en: 'Service Packages', ru: 'Пакеты услуг' }[locale] || 'Service Packages',
    description: content.heroDescription,
    itemListElement: pakete.map((paket, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: paket.title,
        description: paket.description,
        url: `https://goldenwing.at${getPackageUrl(paket.slug, locale as 'de' | 'en' | 'ru')}`,
        provider: viennaOfficeProvider,
        areaServed: [
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
      },
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={packagesListSchema} />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
        <Container variant="block" className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              {content.heroSubtitle}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {content.heroDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Pakete Grid */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="grid md:grid-cols-2 gap-8">
            {pakete.map((paket, index) => {
              const IconComponent = iconMap[paket.icon] || Settings
              return (
                <NextLink
                  key={index}
                  href={getPackageUrl(paket.slug, locale as 'de' | 'en' | 'ru')}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {paket.title}
                        </h2>
                        <p className="text-sm text-primary font-medium mt-1">
                          {paket.goal}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">
                      {paket.description}
                    </p>

                    {/* Includes */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {content.typicalContentsLabel}
                      </h3>
                      <ul className="space-y-2">
                        {paket.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal for */}
                    <p className="text-sm text-muted-foreground italic mb-4">
                      {paket.idealFor}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-sm font-medium text-primary">
                      {content.learnMoreLabel}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </NextLink>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Comparison Table for SEO */}
      <ComparisonTable
        title={(comparisonData[locale as 'de' | 'en' | 'ru'] ?? comparisonData['en']).title}
        subtitle={(comparisonData[locale as 'de' | 'en' | 'ru'] ?? comparisonData['en']).subtitle}
        columns={(comparisonData[locale as 'de' | 'en' | 'ru'] ?? comparisonData['en']).columns}
        rows={(comparisonData[locale as 'de' | 'en' | 'ru'] ?? comparisonData['en']).rows}
        footerNote={(comparisonData[locale as 'de' | 'en' | 'ru'] ?? comparisonData['en']).footerNote}
        className="bg-muted/30"
      />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {content.ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8">
              {content.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NextLink href={getContactUrl(locale)}>
                <Button size="lg">
                  {content.ctaPrimaryButton}
                </Button>
              </NextLink>
              <NextLink href={getServicesUrl(locale)}>
                <Button variant="outline" size="lg">
                  {content.ctaSecondaryButton}
                </Button>
              </NextLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
