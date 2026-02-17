import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Search, TrendingUp, Target, BarChart3, Globe, FileText, CheckCircle, Phone, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { ProcessVerticalStepper } from '@/components/process-sections/ProcessVerticalStepper'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { getSeoAgenturWienPage, SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const iconMap: Record<string, LucideIcon> = {
  'search': Search,
  'file-text': FileText,
  'target': Target,
  'globe': Globe,
  'bar-chart-3': BarChart3,
  'trending-up': TrendingUp,
}

// Default content
const defaultServices = {
  de: [
    { icon: 'search', title: 'Technisches SEO', description: 'Core Web Vitals, Seitengeschwindigkeit, Mobile-First, Crawlability und Indexierung optimieren.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword-Recherche, Content-Strategie, Texterstellung und Content-Optimierung.' },
    { icon: 'target', title: 'Local SEO', description: 'Google Business Profile, lokale Keywords, Branchenverzeichnisse und Bewertungen.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink-Aufbau, Digital PR, Linkbuilding-Strategie und Autoritätsaufbau.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Umfassende Analyse Ihrer Website mit konkreten Handlungsempfehlungen.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Laufende Überwachung, Reporting und kontinuierliche Optimierung.' },
  ],
  en: [
    { icon: 'search', title: 'Technical SEO', description: 'Core Web Vitals, page speed, mobile-first, crawlability and indexing optimization.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword research, content strategy, copywriting and content optimization.' },
    { icon: 'target', title: 'Local SEO', description: 'Google Business Profile, local keywords, business directories and reviews.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink building, digital PR, link building strategy and authority building.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Comprehensive analysis of your website with concrete action recommendations.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Ongoing monitoring, reporting and continuous optimization.' },
  ],
  ru: [
    { icon: 'search', title: 'Техническое SEO', description: 'Оптимизация Core Web Vitals, скорости загрузки, мобильной версии, индексации и сканирования.' },
    { icon: 'file-text', title: 'Контентное SEO', description: 'Исследование ключевых слов, контент-стратегия, копирайтинг и оптимизация контента.' },
    { icon: 'target', title: 'Локальное SEO', description: 'Google Бизнес Профиль, локальные ключевые слова, бизнес-каталоги и отзывы.' },
    { icon: 'globe', title: 'Внешнее SEO', description: 'Наращивание ссылочной массы, цифровой PR, стратегия линкбилдинга и повышение авторитета.' },
    { icon: 'bar-chart-3', title: 'SEO Аудит', description: 'Комплексный анализ вашего сайта с конкретными рекомендациями к действию.' },
    { icon: 'trending-up', title: 'SEO Мониторинг', description: 'Постоянный мониторинг, отчётность и непрерывная оптимизация.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEO Audit', price: '490', priceType: 'einmalig', description: 'Umfassende Analyse Ihrer Website', popular: false, features: ['Technische SEO-Analyse', 'Keyword-Recherche', 'Wettbewerbsanalyse', 'Content-Audit', 'Backlink-Analyse', 'Priorisierte Maßnahmenliste'] },
    { name: 'SEO Starter', price: '790', priceType: 'pro Monat', description: 'Für kleine Websites und lokale Unternehmen', popular: false, features: ['Bis zu 10 Keywords', 'OnPage-Optimierung', 'Local SEO Basics', 'Google Business Profile', 'Monatliches Reporting', '3 Stunden Support/Monat'] },
    { name: 'SEO Business', price: '1.490', priceType: 'pro Monat', description: 'Für wachsende Unternehmen', popular: true, features: ['Bis zu 30 Keywords', 'Vollständige OnPage-Optimierung', 'Content-Erstellung (2 Artikel/Monat)', 'Technisches SEO', 'Link-Building', 'Detailliertes Reporting', '8 Stunden Support/Monat'] },
    { name: 'SEO Enterprise', price: '2.990+', priceType: 'pro Monat', description: 'Für große Websites und E-Commerce', popular: false, features: ['Unbegrenzte Keywords', 'Dedizierter SEO-Manager', 'Content-Strategie & Erstellung', 'Aggressive Link-Building', 'International SEO', 'Conversion-Optimierung', 'Wöchentliche Calls'] },
  ],
  en: [
    { name: 'SEO Audit', price: '490', priceType: 'one-time', description: 'Comprehensive analysis of your website', popular: false, features: ['Technical SEO analysis', 'Keyword research', 'Competitor analysis', 'Content audit', 'Backlink analysis', 'Prioritized action list'] },
    { name: 'SEO Starter', price: '790', priceType: 'per month', description: 'For small websites and local businesses', popular: false, features: ['Up to 10 keywords', 'OnPage optimization', 'Local SEO basics', 'Google Business Profile', 'Monthly reporting', '3 hours support/month'] },
    { name: 'SEO Business', price: '1,490', priceType: 'per month', description: 'For growing companies', popular: true, features: ['Up to 30 keywords', 'Complete OnPage optimization', 'Content creation (2 articles/month)', 'Technical SEO', 'Link building', 'Detailed reporting', '8 hours support/month'] },
    { name: 'SEO Enterprise', price: '2,990+', priceType: 'per month', description: 'For large websites and e-commerce', popular: false, features: ['Unlimited keywords', 'Dedicated SEO manager', 'Content strategy & creation', 'Aggressive link building', 'International SEO', 'Conversion optimization', 'Weekly calls'] },
  ],
  ru: [
    { name: 'SEO Аудит', price: '490', priceType: 'единоразово', description: 'Комплексный анализ вашего сайта', popular: false, features: ['Технический SEO-анализ', 'Исследование ключевых слов', 'Анализ конкурентов', 'Аудит контента', 'Анализ обратных ссылок', 'Приоритизированный план действий'] },
    { name: 'SEO Стартер', price: '790', priceType: 'в месяц', description: 'Для небольших сайтов и локального бизнеса', popular: false, features: ['До 10 ключевых слов', 'OnPage-оптимизация', 'Основы локального SEO', 'Google Бизнес Профиль', 'Ежемесячная отчётность', '3 часа поддержки/месяц'] },
    { name: 'SEO Бизнес', price: '1 490', priceType: 'в месяц', description: 'Для растущих компаний', popular: true, features: ['До 30 ключевых слов', 'Полная OnPage-оптимизация', 'Создание контента (2 статьи/месяц)', 'Техническое SEO', 'Линкбилдинг', 'Детальная отчётность', '8 часов поддержки/месяц'] },
    { name: 'SEO Корпоративный', price: '2 990+', priceType: 'в месяц', description: 'Для крупных сайтов и e-commerce', popular: false, features: ['Неограниченное количество ключевых слов', 'Персональный SEO-менеджер', 'Контент-стратегия и создание', 'Активный линкбилдинг', 'Международное SEO', 'Оптимизация конверсий', 'Еженедельные созвоны'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+180%', label: 'Mehr organischer Traffic', client: 'E-Commerce Kunde' },
    { metric: 'Top 3', label: 'Google-Rankings für 15 Keywords', client: 'B2B Dienstleister' },
    { metric: '+320%', label: 'Mehr Anfragen über Website', client: 'Lokales Unternehmen' },
  ],
  en: [
    { metric: '+180%', label: 'More organic traffic', client: 'E-Commerce client' },
    { metric: 'Top 3', label: 'Google rankings for 15 keywords', client: 'B2B service provider' },
    { metric: '+320%', label: 'More inquiries via website', client: 'Local business' },
  ],
  ru: [
    { metric: '+180%', label: 'Рост органического трафика', client: 'Клиент E-Commerce' },
    { metric: 'Топ 3', label: 'Позиции в Google по 15 ключевым словам', client: 'B2B поставщик услуг' },
    { metric: '+320%', label: 'Больше заявок через сайт', client: 'Локальный бизнес' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Wie lange dauert es, bis SEO Ergebnisse zeigt?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen sehen Sie oft nach 3-6 Monaten. Signifikante Ergebnisse und stabile Top-Rankings erreichen wir typischerweise nach 6-12 Monaten kontinuierlicher Optimierung.' },
    { question: 'Was kostet SEO in Wien?', answer: 'Unsere SEO-Pakete starten bei €790/Monat für kleine Websites. Business-Pakete liegen bei €1.490/Monat. Für einen einmaligen SEO-Audit berechnen wir €490. Die genauen Kosten hängen von Ihrer Website-Größe und Ihren Zielen ab.' },
    { question: 'Garantiert ihr bestimmte Rankings?', answer: 'Seriöse SEO-Agenturen können keine konkreten Rankings garantieren – Google entscheidet über die Platzierung. Was wir garantieren: professionelle Arbeit, transparente Kommunikation und messbare Verbesserungen.' },
    { question: 'Brauche ich SEO, wenn ich bereits Google Ads schalte?', answer: 'Ja! SEO und SEA ergänzen sich perfekt. SEO bringt nachhaltigen, kostenlosen Traffic, während Google Ads schnelle Ergebnisse liefert. Die Kombination maximiert Ihre Sichtbarkeit und senkt langfristig die Kundenakquisitionskosten.' },
    { question: 'Was ist der Unterschied zwischen Local SEO und normalem SEO?', answer: 'Local SEO fokussiert auf lokale Suchanfragen ("Webdesign Wien") und optimiert Ihr Google Business Profile, lokale Verzeichnisse und standortbezogene Keywords. Ideal für Unternehmen mit lokalem Einzugsgebiet.' },
  ],
  en: [
    { question: 'How long does it take for SEO to show results?', answer: 'SEO is a long-term strategy. You often see first improvements after 3-6 months. We typically achieve significant results and stable top rankings after 6-12 months of continuous optimization.' },
    { question: 'How much does SEO in Vienna cost?', answer: 'Our SEO packages start at €790/month for small websites. Business packages are €1,490/month. For a one-time SEO audit, we charge €490. The exact costs depend on your website size and goals.' },
    { question: 'Do you guarantee specific rankings?', answer: 'Reputable SEO agencies cannot guarantee specific rankings – Google decides the placement. What we guarantee: professional work, transparent communication and measurable improvements.' },
    { question: 'Do I need SEO if I already run Google Ads?', answer: 'Yes! SEO and SEA complement each other perfectly. SEO brings sustainable, free traffic, while Google Ads delivers quick results. The combination maximizes your visibility and reduces customer acquisition costs in the long run.' },
    { question: 'What is the difference between Local SEO and regular SEO?', answer: 'Local SEO focuses on local search queries ("Web design Vienna") and optimizes your Google Business Profile, local directories and location-based keywords. Ideal for businesses with a local catchment area.' },
  ],
  ru: [
    { question: 'Сколько времени нужно, чтобы SEO показало результаты?', answer: 'SEO — это долгосрочная стратегия. Первые улучшения часто видны через 3-6 месяцев. Значительных результатов и стабильных топовых позиций мы обычно достигаем через 6-12 месяцев непрерывной оптимизации.' },
    { question: 'Сколько стоит SEO в Вене?', answer: 'Наши SEO-пакеты начинаются от €790/месяц для небольших сайтов. Бизнес-пакеты стоят €1 490/месяц. За разовый SEO-аудит мы берём €490. Точная стоимость зависит от размера вашего сайта и целей.' },
    { question: 'Вы гарантируете определённые позиции?', answer: 'Серьёзные SEO-агентства не могут гарантировать конкретные позиции — Google определяет ранжирование. Что мы гарантируем: профессиональную работу, прозрачную коммуникацию и измеримые улучшения.' },
    { question: 'Нужно ли мне SEO, если я уже запускаю Google Ads?', answer: 'Да! SEO и контекстная реклама отлично дополняют друг друга. SEO приносит устойчивый, бесплатный трафик, тогда как Google Ads даёт быстрые результаты. Комбинация максимизирует вашу видимость и снижает затраты на привлечение клиентов в долгосрочной перспективе.' },
    { question: 'В чём разница между локальным SEO и обычным SEO?', answer: 'Локальное SEO фокусируется на местных поисковых запросах («веб-дизайн Вена») и оптимизирует ваш Google Бизнес Профиль, местные каталоги и геозависимые ключевые слова. Идеально для компаний с локальной зоной охвата.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'Website-Audit und Ist-Zustand erfassen' },
    { step: '02', title: 'Strategie', description: 'Keywords und Maßnahmen priorisieren' },
    { step: '03', title: 'OnPage', description: 'Technische und inhaltliche Optimierung' },
    { step: '04', title: 'Content', description: 'SEO-optimierte Inhalte erstellen' },
    { step: '05', title: 'Monitoring', description: 'Rankings überwachen und optimieren' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'Website audit and current state assessment' },
    { step: '02', title: 'Strategy', description: 'Prioritize keywords and measures' },
    { step: '03', title: 'OnPage', description: 'Technical and content optimization' },
    { step: '04', title: 'Content', description: 'Create SEO-optimized content' },
    { step: '05', title: 'Monitoring', description: 'Monitor and optimize rankings' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'Аудит сайта и оценка текущего состояния' },
    { step: '02', title: 'Стратегия', description: 'Приоритизация ключевых слов и мер' },
    { step: '03', title: 'OnPage', description: 'Техническая и контентная оптимизация' },
    { step: '04', title: 'Контент', description: 'Создание SEO-оптимизированного контента' },
    { step: '05', title: 'Мониторинг', description: 'Отслеживание и оптимизация позиций' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Wien', description: 'SEO-optimierte Websites, die von Anfang an für Google gebaut sind.', href: '/webdesign-wien' },
    { title: 'Content Marketing', description: 'Hochwertige Inhalte, die ranken und konvertieren.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Schnelle Ergebnisse mit bezahlter Werbung bei Google.', href: '/leistungen/digital-marketing' },
  ],
  en: [
    { title: 'Web Design Vienna', description: 'SEO-optimized websites built for Google from the start.', href: '/webdesign-wien' },
    { title: 'Content Marketing', description: 'High-quality content that ranks and converts.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Quick results with paid advertising on Google.', href: '/leistungen/digital-marketing' },
  ],
  ru: [
    { title: 'Веб-дизайн Вена', description: 'SEO-оптимизированные сайты, созданные для Google с самого начала.', href: '/webdesign-wien' },
    { title: 'Контент-маркетинг', description: 'Качественный контент, который ранжируется и конвертирует.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Быстрые результаты с платной рекламой в Google.', href: '/leistungen/digital-marketing' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'pillarPages.seo' })
  const cmsPage = await getSeoAgenturWienPage(locale)

  const metaTitle = cmsPage?.seo?.metaTitle || t('title')
  const metaDescription = truncateMetaDescription(cmsPage?.seo?.metaDescription || t('heroDescription'))

  const hreflangAlternates = getHreflangAlternates('/seo-agentur-wien', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: cmsPage?.seo?.keywords?.split(',').map((k: string) => k.trim()) || (locale === 'de'
      ? ['SEO Agentur Wien', 'Suchmaschinenoptimierung Wien', 'SEO Wien', 'Google Optimierung Wien']
      : ['SEO Agency Vienna', 'Search Engine Optimization Vienna', 'SEO Vienna', 'Google Optimization Vienna']),
    openGraph: {
      title: cmsPage?.hero?.title || t('heroTitle'),
      description: metaDescription,
      url: getCanonicalUrl('/seo-agentur-wien', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - SEO Agentur Wien' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cmsPage?.hero?.title || t('heroTitle'),
      description: metaDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/seo-agentur-wien', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoAgenturWienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'pillarPages.seo' })
  const common = await getTranslations({ locale, namespace: 'common' })
  const isEn = locale === 'en'

  // Fetch CMS data
  const cmsPage = await getSeoAgenturWienPage(locale)

  // Build content with CMS fallback
  const heroData = {
    badge: cmsPage?.hero?.badge || (isEn ? 'SEO Agency Vienna' : 'SEO Agentur Wien'),
    title: cmsPage?.hero?.title || t('heroTitle'),
    description: cmsPage?.hero?.description || t('heroDescription'),
    ctaPrimary: cmsPage?.hero?.ctaPrimary || (isEn ? 'Free SEO Analysis' : 'Kostenlose SEO-Analyse'),
    ctaSecondary: cmsPage?.hero?.ctaSecondary || (isEn ? 'View SEO Packages' : 'SEO-Pakete ansehen'),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = (cmsPage?.results as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.results as any[])
    : defaultResults[locale as 'de' | 'en'] ?? defaultResults['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services = (cmsPage?.services as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.services as any[]).map((s: any) => ({
        icon: s.icon || 'search',
        title: s.title,
        description: s.description,
      }))
    : defaultServices[locale as 'de' | 'en'] ?? defaultServices['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const packages = (cmsPage?.packages as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.packages as any[]).map((p: any) => ({
        name: p.name,
        price: p.price,
        priceType: p.priceType,
        description: p.description,
        popular: p.popular || false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        features: (p.features as any[])?.map((f: any) => f.text) || [],
      }))
    : defaultPackages[locale as 'de' | 'en'] ?? defaultPackages['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const process = (cmsPage?.process as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.process as any[])
    : defaultProcess[locale as 'de' | 'en'] ?? defaultProcess['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqs = (cmsPage?.faqs as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.faqs as any[])
    : defaultFaqs[locale as 'de' | 'en'] ?? defaultFaqs['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const relatedServices = (cmsPage?.relatedServices as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.relatedServices as any[])
    : defaultRelatedServices[locale as 'de' | 'en'] ?? defaultRelatedServices['en']

  const servicesTitle = cmsPage?.servicesTitle || t('services')
  const servicesDescription = cmsPage?.servicesDescription || t('servicesDescription')
  const pricingTitle = cmsPage?.pricingTitle || t('pricing')
  const pricingDescription = cmsPage?.pricingDescription || t('pricingDescription')
  const processTitle = cmsPage?.processTitle || t('process')
  const processDescription = cmsPage?.processDescription || (isEn ? 'Structured approach for measurable results.' : 'Strukturierte Vorgehensweise für messbare Ergebnisse.')
  const faqTitle = cmsPage?.faqTitle || (isEn ? 'Frequently Asked Questions about SEO' : 'Häufige Fragen zu SEO')
  const relatedServicesTitle = cmsPage?.relatedServicesTitle || (isEn ? 'Related Services' : 'Verwandte Leistungen')
  const ctaTitle = cmsPage?.ctaTitle || (isEn ? 'Ready for Better Rankings?' : 'Bereit für bessere Rankings?')
  const ctaDescription = cmsPage?.ctaDescription || (isEn ? 'Free SEO analysis of your website. We show you where you stand and what is possible.' : 'Kostenlose SEO-Analyse Ihrer Website. Wir zeigen Ihnen, wo Sie stehen und was möglich ist.')
  const ctaButton = cmsPage?.ctaButton || (isEn ? 'Request Free Analysis' : 'Kostenlose Analyse anfordern')

  // Breadcrumbs for BreadcrumbListSchema
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Startseite', url: 'https://goldenwing.at' },
    { name: isEn ? 'SEO Agency Vienna' : 'SEO Agentur Wien', url: isEn ? 'https://goldenwing.at/en/seo-agency-vienna' : 'https://goldenwing.at/seo-agentur-wien' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'SEO Agency Vienna' : 'SEO Agentur Wien',
    alternateName: isEn ? 'Search Engine Optimization Vienna' : 'Suchmaschinenoptimierung Wien',
    url: 'https://goldenwing.at/seo-agentur-wien',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: { '@type': 'City', name: 'Wien' },
    description: isEn
      ? 'Professional search engine optimization in Vienna. Technical SEO, content strategy and local SEO for better Google rankings.'
      : 'Professionelle Suchmaschinenoptimierung in Wien. Technisches SEO, Content-Strategie und Local SEO für bessere Google-Rankings.',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbListSchema items={breadcrumbs} />
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{heroData.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{heroData.title}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{heroData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {heroData.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#preise">{heroData.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-3 gap-8">
            {results.map((result: { metric: string; label: string; client: string }) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{result.metric}</div>
                <div className="font-medium mb-1">{result.label}</div>
                <div className="text-sm text-muted-foreground">{result.client}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: { icon: string; title: string; description: string }) => {
              const IconComponent = iconMap[service.icon] || Search
              return (
                <Card key={service.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="preise" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg: { name: string; price: string; priceType: string; description: string; popular: boolean; features: string[] }) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{isEn ? 'Recommended' : 'Empfohlen'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">€{pkg.price}</span>
                    <span className="text-muted-foreground text-sm"> {pkg.priceType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <NextLink href={getContactUrl(locale)}>{isEn ? 'Inquire' : 'Anfragen'}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessVerticalStepper Layout */}
      <ProcessVerticalStepper
        title={processTitle}
        subtitle={processDescription}
        steps={process.map((item: { step: string; title: string; description: string }) => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={faqTitle}
          items={faqs}
          className="bg-muted/30"
        />
      )}

      {/* Related */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{relatedServicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service: { title: string; description: string; href: StaticAppPathname }) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                                    <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {common('learnMore')} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contextual Internal Links — SEO sub-service pages */}
      <section className="py-16">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEn ? 'Our SEO Specializations' : 'Unsere SEO-Spezialisierungen'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {(isEn ? [
                { text: 'Technical SEO', href: '/services/seo-content/technical-seo' },
                { text: 'On-Page Optimization', href: '/services/seo-content/on-page-optimization' },
                { text: 'Local SEO', href: '/services/seo-content/local-seo' },
                { text: 'Content Strategy', href: '/services/seo-content/content-strategy-production' },
                { text: 'Off-Page & Link Building', href: '/services/seo-content/offpage-link-building' },
              ] : [
                { text: 'Technisches SEO', href: '/leistungen/seo-content/technical-seo' },
                { text: 'On-Page Optimierung', href: '/leistungen/seo-content/on-page-optimierung' },
                { text: 'Local SEO', href: '/leistungen/seo-content/local-seo' },
                { text: 'Content-Strategie & Produktion', href: '/leistungen/seo-content/content-strategie-produktion' },
                { text: 'OffPage & Linkbuilding', href: '/leistungen/seo-content/offpage-linkbuilding' },
              ]).map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors text-sm font-medium"
                >
                  {link.text}
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
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
