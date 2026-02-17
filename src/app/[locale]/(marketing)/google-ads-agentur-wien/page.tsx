import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Target, TrendingUp, BarChart3, Search, MousePointer, Zap, CheckCircle, Phone, DollarSign, LucideIcon, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { FAQSection } from '@/components/sections/faq-section'
import { ProcessVerticalStepper } from '@/components/process-sections/ProcessVerticalStepper'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


type SupportedLocale = 'de' | 'en' | 'ru'

export const revalidate = 3600

const iconMap: Record<string, LucideIcon> = {
  'search': Search,
  'target': Target,
  'trending-up': TrendingUp,
  'bar-chart-3': BarChart3,
  'mouse-pointer': MousePointer,
  'zap': Zap,
  'dollar-sign': DollarSign,
}

// Google Ads Agentur Wien - Volume: 210, KD: 27
const defaultContent = {
  de: {
    metaTitle: 'Google Ads Agentur Wien | Lokaler Google Partner fuer Wiener Unternehmen',
    metaDescription: 'Google Ads Agentur in Wien. Zertifizierter Google Partner mit Buero in Wien 10. Lokale Kampagnen, Shopping, Display und YouTube Ads. Persoenliche Betreuung vor Ort.',
    keywords: ['Google Ads Agentur Wien', 'Google Ads Wien', 'Google Partner Wien', 'AdWords Agentur Wien', 'PPC Agentur Wien', 'Suchmaschinenwerbung Wien'],
    heroTitle: 'Google Ads Agentur Wien – Ihr lokaler Google Partner',
    heroDescription: 'Als Google Ads Agentur mit Buero in Wien betreuen wir Wiener Unternehmen persoenlich vor Ort. Von lokalen Suchkampagnen bis zu internationaler Expansion – wir sind Ihr Partner fuer profitables Wachstum.',
    heroBadge: 'Google Ads Agentur Wien',
    ctaPrimary: 'Kostenloses Ads-Audit',
    ctaSecondary: 'Pakete ansehen',
  },
  en: {
    metaTitle: 'Google Ads Agency Vienna | Local Google Partner for Viennese Businesses',
    metaDescription: 'Google Ads agency in Vienna. Certified Google Partner with office in Vienna 10. Local campaigns, shopping, display and YouTube ads. Personal on-site support.',
    keywords: ['Google Ads Agency Vienna', 'Google Ads Vienna', 'Google Partner Vienna', 'AdWords Agency Vienna', 'PPC Agency Vienna', 'Search Engine Advertising Vienna'],
    heroTitle: 'Google Ads Agency Vienna – Your Local Google Partner',
    heroDescription: 'As a Google Ads agency with an office in Vienna, we support Viennese businesses personally on-site. From local search campaigns to international expansion – we are your partner for profitable growth.',
    heroBadge: 'Google Ads Agency Vienna',
    ctaPrimary: 'Free Ads Audit',
    ctaSecondary: 'View Packages',
  },
  ru: {
    metaTitle: 'Агентство Google Ads в Вене | Локальный Google Партнер для венских компаний',
    metaDescription: 'Агентство Google Ads в Вене. Сертифицированный Google Партнер с офисом в Вене 10. Локальные кампании, Shopping, Display и YouTube реклама. Личное сопровождение на месте.',
    keywords: ['Агентство Google Ads Вена', 'Google Ads Вена', 'Google Партнер Вена', 'AdWords агентство Вена', 'PPC агентство Вена', 'Контекстная реклама Вена'],
    heroTitle: 'Агентство Google Ads в Вене – Ваш локальный Google Партнер',
    heroDescription: 'Как агентство Google Ads с офисом в Вене, мы лично сопровождаем венские компании на месте. От локальных поисковых кампаний до международной экспансии – мы ваш партнер для прибыльного роста.',
    heroBadge: 'Агентство Google Ads Вена',
    ctaPrimary: 'Бесплатный аудит рекламы',
    ctaSecondary: 'Смотреть пакеты',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Lokale Suchanzeigen Wien', description: 'Textanzeigen fuer Wiener Kunden. Geo-Targeting, lokale Keywords und Anzeigenerweiterungen fuer maximale lokale Reichweite.' },
    { icon: 'mouse-pointer', title: 'Google Shopping', description: 'Produktanzeigen fuer Wiener E-Commerce. Feed-Optimierung und Local Inventory Ads fuer stationaeren Handel.' },
    { icon: 'target', title: 'Display & Remarketing', description: 'Banner-Werbung im Google Display Network. Remarketing fuer Wiener Besucher und lokales Targeting.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Video-Werbung auf YouTube. Lokales Targeting fuer Wiener Publikum mit TrueView und Bumper Ads.' },
    { icon: 'bar-chart-3', title: 'Performance Max', description: 'KI-gestuetzte Kampagnen ueber alle Google-Kanaele. Optimiert fuer Wien und Umgebung.' },
    { icon: 'dollar-sign', title: 'Conversion Tracking', description: 'Praezises Tracking mit GA4. Offline-Conversions fuer lokale Geschaefte und Store Visits Tracking.' },
  ],
  en: [
    { icon: 'search', title: 'Local Search Ads Vienna', description: 'Text ads for Viennese customers. Geo-targeting, local keywords and ad extensions for maximum local reach.' },
    { icon: 'mouse-pointer', title: 'Google Shopping', description: 'Product ads for Viennese e-commerce. Feed optimization and Local Inventory Ads for retail stores.' },
    { icon: 'target', title: 'Display & Remarketing', description: 'Banner advertising on Google Display Network. Remarketing for Vienna visitors and local targeting.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Video advertising on YouTube. Local targeting for Vienna audience with TrueView and Bumper Ads.' },
    { icon: 'bar-chart-3', title: 'Performance Max', description: 'AI-powered campaigns across all Google channels. Optimized for Vienna and surrounding areas.' },
    { icon: 'dollar-sign', title: 'Conversion Tracking', description: 'Precise tracking with GA4. Offline conversions for local businesses and store visits tracking.' },
  ],
  ru: [
    { icon: 'search', title: 'Локальные поисковые объявления Вена', description: 'Текстовые объявления для венских клиентов. Гео-таргетинг, локальные ключевые слова и расширения объявлений для максимального локального охвата.' },
    { icon: 'mouse-pointer', title: 'Google Shopping', description: 'Товарные объявления для венского e-commerce. Оптимизация фида и Local Inventory Ads для розничной торговли.' },
    { icon: 'target', title: 'Display и ремаркетинг', description: 'Баннерная реклама в Google Display Network. Ремаркетинг для венских посетителей и локальный таргетинг.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Видеореклама на YouTube. Локальный таргетинг для венской аудитории с TrueView и Bumper Ads.' },
    { icon: 'bar-chart-3', title: 'Performance Max', description: 'Кампании на базе ИИ по всем каналам Google. Оптимизировано для Вены и окрестностей.' },
    { icon: 'dollar-sign', title: 'Отслеживание конверсий', description: 'Точное отслеживание с GA4. Офлайн-конверсии для локального бизнеса и отслеживание посещений магазинов.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Ads Starter', price: '590', priceType: 'pro Monat', description: 'Bis 2.000 EUR Werbebudget', popular: false, features: ['Google Ads Setup', 'Bis 3 Kampagnen', 'Lokale Keywords Wien', 'Monatliches Reporting', 'A/B-Tests', '3 Stunden Betreuung/Monat'] },
    { name: 'Ads Business', price: '990', priceType: 'pro Monat', description: 'Bis 5.000 EUR Werbebudget', popular: true, features: ['Alles aus Starter', 'Bis 8 Kampagnen', 'Shopping & Display', 'Conversion-Tracking Setup', 'Bi-Weekly Calls', 'Persoenliche Meetings in Wien'] },
    { name: 'Ads Premium', price: '1.990', priceType: 'pro Monat', description: 'Ab 5.000 EUR Werbebudget', popular: false, features: ['Alles aus Business', 'Unbegrenzte Kampagnen', 'YouTube Ads', 'Performance Max', 'Weekly Strategy Calls', 'Dedizierter Account Manager'] },
  ],
  en: [
    { name: 'Ads Starter', price: '590', priceType: 'per month', description: 'Up to 2,000 EUR ad budget', popular: false, features: ['Google Ads setup', 'Up to 3 campaigns', 'Local Vienna keywords', 'Monthly reporting', 'A/B testing', '3 hours support/month'] },
    { name: 'Ads Business', price: '990', priceType: 'per month', description: 'Up to 5,000 EUR ad budget', popular: true, features: ['Everything in Starter', 'Up to 8 campaigns', 'Shopping & Display', 'Conversion tracking setup', 'Bi-weekly calls', 'Personal meetings in Vienna'] },
    { name: 'Ads Premium', price: '1,990', priceType: 'per month', description: 'From 5,000 EUR ad budget', popular: false, features: ['Everything in Business', 'Unlimited campaigns', 'YouTube Ads', 'Performance Max', 'Weekly strategy calls', 'Dedicated account manager'] },
  ],
  ru: [
    { name: 'Ads Starter', price: '590', priceType: 'в месяц', description: 'До 2 000 EUR рекламного бюджета', popular: false, features: ['Настройка Google Ads', 'До 3 кампаний', 'Локальные ключевые слова Вена', 'Ежемесячная отчетность', 'A/B-тесты', '3 часа поддержки/месяц'] },
    { name: 'Ads Business', price: '990', priceType: 'в месяц', description: 'До 5 000 EUR рекламного бюджета', popular: true, features: ['Все из Starter', 'До 8 кампаний', 'Shopping и Display', 'Настройка отслеживания конверсий', 'Созвоны раз в 2 недели', 'Личные встречи в Вене'] },
    { name: 'Ads Premium', price: '1 990', priceType: 'в месяц', description: 'От 5 000 EUR рекламного бюджета', popular: false, features: ['Все из Business', 'Неограниченные кампании', 'YouTube Ads', 'Performance Max', 'Еженедельные стратегические созвоны', 'Персональный аккаунт-менеджер'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '4.5x', label: 'Durchschnittlicher ROAS', client: 'Wiener Kunden' },
    { metric: '-28%', label: 'Niedrigere Klickkosten', client: 'Nach 3 Monaten' },
    { metric: '1M+', label: 'Verwaltetes Budget/Jahr', client: 'In Wien' },
    { metric: '35+', label: 'Wiener Kunden', client: 'Aktiv betreut' },
  ],
  en: [
    { metric: '4.5x', label: 'Average ROAS', client: 'Vienna clients' },
    { metric: '-28%', label: 'Lower click costs', client: 'After 3 months' },
    { metric: '1M+', label: 'Managed budget/year', client: 'In Vienna' },
    { metric: '35+', label: 'Vienna clients', client: 'Actively managed' },
  ],
  ru: [
    { metric: '4.5x', label: 'Средний ROAS', client: 'Клиенты из Вены' },
    { metric: '-28%', label: 'Снижение стоимости клика', client: 'Через 3 месяца' },
    { metric: '1M+', label: 'Управляемый бюджет/год', client: 'В Вене' },
    { metric: '35+', label: 'Клиентов из Вены', client: 'Активно ведем' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Habt ihr ein Buero in Wien?', answer: 'Ja, unser Hauptsitz ist in Wien 10 (Favoriten), Czeikestrasse 4/21. Wir treffen uns gerne persoenlich mit unseren Wiener Kunden fuer Kickoff-Meetings, Strategie-Workshops oder regelmaessige Reviews.' },
    { question: 'Was kostet eine Google Ads Agentur in Wien?', answer: 'Unsere Google Ads Betreuung startet bei 590 Euro pro Monat (zzgl. Werbebudget). Das Business-Paket mit persoenlichen Meetings in Wien kostet 990 Euro, Premium 1.990 Euro monatlich.' },
    { question: 'Koennt ihr lokale Kampagnen fuer Wien optimieren?', answer: 'Ja, das ist unsere Staerke. Wir optimieren Kampagnen fuer Wiener Bezirke, setzen Local Inventory Ads fuer Haendler um und nutzen Offline-Conversion-Tracking fuer stationaere Geschaefte.' },
    { question: 'Wie schnell sehe ich Ergebnisse?', answer: 'Erste Klicks und Leads sehen Sie oft innerhalb von Tagen. Optimale Performance erreichen lokale Kampagnen nach 2-4 Wochen, wenn genuegend lokale Conversion-Daten vorliegen.' },
    { question: 'Betreut ihr auch internationale Kampagnen von Wien aus?', answer: 'Ja, von unserem Wiener Buero aus betreuen wir auch internationale Kampagnen. Viele unserer Wiener Kunden expandieren nach Deutschland, Schweiz oder in die VAE – wir begleiten dieses Wachstum.' },
    { question: 'Kann ich mein bestehendes Google Ads Konto uebergeben?', answer: 'Ja, wir uebernehmen bestehende Konten. Im kostenlosen Audit analysieren wir Ihr Konto bei einem persoenlichen Termin in Wien und zeigen Optimierungspotenziale auf.' },
  ],
  en: [
    { question: 'Do you have an office in Vienna?', answer: 'Yes, our headquarters is in Vienna 10 (Favoriten), Czeikestrasse 4/21. We are happy to meet personally with our Vienna clients for kickoff meetings, strategy workshops or regular reviews.' },
    { question: 'How much does a Google Ads agency cost in Vienna?', answer: 'Our Google Ads management starts at 590 euros per month (plus ad budget). The Business package with personal meetings in Vienna costs 990 euros, Premium 1,990 euros monthly.' },
    { question: 'Can you optimize local campaigns for Vienna?', answer: 'Yes, that is our strength. We optimize campaigns for Vienna districts, implement Local Inventory Ads for retailers and use offline conversion tracking for brick-and-mortar businesses.' },
    { question: 'How quickly will I see results?', answer: 'You often see first clicks and leads within days. Local campaigns reach optimal performance after 2-4 weeks when enough local conversion data is available.' },
    { question: 'Do you also manage international campaigns from Vienna?', answer: 'Yes, from our Vienna office we also manage international campaigns. Many of our Vienna clients expand to Germany, Switzerland or the UAE – we support this growth.' },
    { question: 'Can I hand over my existing Google Ads account?', answer: 'Yes, we take over existing accounts. In the free audit, we analyze your account at a personal meeting in Vienna and show optimization potential.' },
  ],
  ru: [
    { question: 'Есть ли у вас офис в Вене?', answer: 'Да, наша штаб-квартира находится в Вене 10 (Фаворитен), Czeikestrasse 4/21. Мы рады встретиться лично с нашими венскими клиентами для стартовых встреч, стратегических воркшопов или регулярных обзоров.' },
    { question: 'Сколько стоит агентство Google Ads в Вене?', answer: 'Наше ведение Google Ads начинается от 590 евро в месяц (плюс рекламный бюджет). Пакет Business с личными встречами в Вене стоит 990 евро, Premium – 1 990 евро ежемесячно.' },
    { question: 'Можете ли вы оптимизировать локальные кампании для Вены?', answer: 'Да, это наша сильная сторона. Мы оптимизируем кампании для венских районов, внедряем Local Inventory Ads для розничных продавцов и используем отслеживание офлайн-конверсий для физических магазинов.' },
    { question: 'Как быстро я увижу результаты?', answer: 'Первые клики и лиды вы часто видите уже в течение нескольких дней. Локальные кампании достигают оптимальной производительности через 2-4 недели, когда накапливается достаточно локальных данных о конверсиях.' },
    { question: 'Ведете ли вы международные кампании из Вены?', answer: 'Да, из нашего венского офиса мы также ведем международные кампании. Многие наши венские клиенты расширяются в Германию, Швейцарию или ОАЭ – мы сопровождаем этот рост.' },
    { question: 'Могу ли я передать вам мой существующий аккаунт Google Ads?', answer: 'Да, мы берем на себя существующие аккаунты. В рамках бесплатного аудита мы анализируем ваш аккаунт на личной встрече в Вене и показываем потенциал оптимизации.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Persoenliches Audit', description: 'Analyse bei einem Meeting in Wien' },
    { step: '02', title: 'Strategie', description: 'Lokale Kampagnenstruktur entwickeln' },
    { step: '03', title: 'Setup', description: 'Konto, Tracking und Kampagnen' },
    { step: '04', title: 'Launch', description: 'Start mit engem Monitoring' },
    { step: '05', title: 'Optimierung', description: 'Laufende Tests und Skalierung' },
  ],
  en: [
    { step: '01', title: 'Personal Audit', description: 'Analysis at a meeting in Vienna' },
    { step: '02', title: 'Strategy', description: 'Develop local campaign structure' },
    { step: '03', title: 'Setup', description: 'Account, tracking and campaigns' },
    { step: '04', title: 'Launch', description: 'Start with close monitoring' },
    { step: '05', title: 'Optimization', description: 'Ongoing testing and scaling' },
  ],
  ru: [
    { step: '01', title: 'Личный аудит', description: 'Анализ на встрече в Вене' },
    { step: '02', title: 'Стратегия', description: 'Разработка локальной структуры кампаний' },
    { step: '03', title: 'Настройка', description: 'Аккаунт, отслеживание и кампании' },
    { step: '04', title: 'Запуск', description: 'Старт с плотным мониторингом' },
    { step: '05', title: 'Оптимизация', description: 'Постоянные тесты и масштабирование' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Google Ads Agentur Oesterreich', description: 'Nationale Kampagnen fuer ganz Oesterreich.', href: '/google-ads-agentur-oesterreich' },
    { title: 'SEO Agentur Wien', description: 'Organische Sichtbarkeit ergaenzend zu Ads.', href: '/seo-agentur-wien' },
    { title: 'Webdesign Wien', description: 'Landingpages, die konvertieren.', href: '/webdesign-wien' },
  ],
  en: [
    { title: 'Google Ads Agency Austria', description: 'National campaigns for all of Austria.', href: '/google-ads-agentur-oesterreich' },
    { title: 'SEO Agency Vienna', description: 'Organic visibility complementing ads.', href: '/seo-agentur-wien' },
    { title: 'Web Design Vienna', description: 'Landing pages that convert.', href: '/webdesign-wien' },
  ],
  ru: [
    { title: 'Агентство Google Ads Австрия', description: 'Национальные кампании для всей Австрии.', href: '/google-ads-agentur-oesterreich' },
    { title: 'SEO агентство Вена', description: 'Органическая видимость в дополнение к рекламе.', href: '/seo-agentur-wien' },
    { title: 'Веб-дизайн Вена', description: 'Лендинги, которые конвертируют.', href: '/webdesign-wien' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const whyChooseUs = {
  de: {
    title: 'Warum GoldenWing als Google Ads Agentur in Wien?',
    reasons: [
      { title: 'Buero in Wien', description: 'Persoenliche Meetings in Wien 10. Kein Remote-only.' },
      { title: 'Google Partner', description: 'Zertifizierte Expertise und direkter Google-Support.' },
      { title: 'Lokale Expertise', description: 'Wir kennen Wien und seine Bezirke.' },
      { title: 'Performance-Fokus', description: 'ROAS und lokale Conversions im Fokus.' },
    ],
  },
  en: {
    title: 'Why Choose GoldenWing as Google Ads Agency in Vienna?',
    reasons: [
      { title: 'Office in Vienna', description: 'Personal meetings in Vienna 10. Not remote-only.' },
      { title: 'Google Partner', description: 'Certified expertise and direct Google support.' },
      { title: 'Local Expertise', description: 'We know Vienna and its districts.' },
      { title: 'Performance Focus', description: 'ROAS and local conversions in focus.' },
    ],
  },
  ru: {
    title: 'Почему GoldenWing как агентство Google Ads в Вене?',
    reasons: [
      { title: 'Офис в Вене', description: 'Личные встречи в Вене 10. Не только удаленно.' },
      { title: 'Google Партнер', description: 'Сертифицированная экспертиза и прямая поддержка Google.' },
      { title: 'Локальная экспертиза', description: 'Мы знаем Вену и её районы.' },
      { title: 'Фокус на результат', description: 'ROAS и локальные конверсии в приоритете.' },
    ],
  },
}

// Vienna-specific context
const wienContext = {
  de: {
    title: 'Google Ads fuer Wiener Unternehmen',
    description: 'Wien ist nicht nur die Bundeshauptstadt, sondern auch das wirtschaftliche Zentrum Oesterreichs. Mit 2 Millionen Einwohnern und einer Kaufkraft von ueber 25.000 Euro pro Kopf bietet Wien enormes Potenzial fuer Online-Werbung. Ob Einzelhandel am Graben, Gastronomie im 1. Bezirk oder B2B-Dienstleister in den Aussenbezirken – wir optimieren Ihre Kampagnen fuer den Wiener Markt.',
    highlights: [
      'Geo-Targeting nach Wiener Bezirken (1.-23. Bezirk)',
      'Local Inventory Ads fuer Wiener Haendler',
      'Offline-Conversion-Tracking fuer stationaere Geschaefte',
      'Saisonale Kampagnen (Weihnachtsmarkt, Ballsaison, Ferienzeiten)',
    ],
  },
  en: {
    title: 'Google Ads for Viennese Businesses',
    description: 'Vienna is not only the federal capital but also the economic center of Austria. With 2 million inhabitants and purchasing power of over 25,000 euros per capita, Vienna offers enormous potential for online advertising. Whether retail on Graben, gastronomy in the 1st district or B2B service providers in the outer districts – we optimize your campaigns for the Vienna market.',
    highlights: [
      'Geo-targeting by Vienna districts (1st-23rd district)',
      'Local Inventory Ads for Vienna retailers',
      'Offline conversion tracking for brick-and-mortar stores',
      'Seasonal campaigns (Christmas market, ball season, holidays)',
    ],
  },
  ru: {
    title: 'Google Ads для венских компаний',
    description: 'Вена – это не только федеральная столица, но и экономический центр Австрии. С 2 миллионами жителей и покупательной способностью более 25 000 евро на человека, Вена предлагает огромный потенциал для онлайн-рекламы. Будь то розничная торговля на Грабен, гастрономия в 1-м районе или B2B-поставщики услуг в окраинных районах – мы оптимизируем ваши кампании для венского рынка.',
    highlights: [
      'Гео-таргетинг по венским районам (1-23 район)',
      'Local Inventory Ads для венских продавцов',
      'Отслеживание офлайн-конверсий для физических магазинов',
      'Сезонные кампании (рождественские ярмарки, бальный сезон, праздники)',
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/google-ads-agentur-wien', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/google-ads-agentur-wien', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/google-ads-agentur-wien', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function GoogleAdsAgenturWienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const common = await getTranslations({ locale, namespace: 'common' })

  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const results = defaultResults[locale as 'de' | 'en'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en'] ?? defaultRelatedServices['en']
  const whyUs = whyChooseUs[locale as 'de' | 'en'] ?? whyChooseUs['en']
  const wien = wienContext[locale as 'de' | 'en'] ?? wienContext['en']

  const servicesTitle = { de: 'Unsere Google Ads Leistungen fuer Wien', en: 'Our Google Ads Services for Vienna', ru: 'Наши услуги Google Ads для Вены' }[locale] ?? 'Our Google Ads Services for Vienna'
  const servicesDescription = { de: 'Full-Service Google Ads Betreuung mit lokaler Wiener Expertise.', en: 'Full-service Google Ads management with local Vienna expertise.', ru: 'Полный комплекс услуг Google Ads с локальной венской экспертизой.' }[locale] ?? 'Full-service Google Ads management with local Vienna expertise.'
  const pricingTitle = { de: 'Google Ads Pakete', en: 'Google Ads Packages', ru: 'Пакеты Google Ads' }[locale] ?? 'Google Ads Packages'
  const pricingDescription = { de: 'Transparente Preise. Alle Preise exkl. Werbebudget.', en: 'Transparent pricing. All prices exclude ad budget.', ru: 'Прозрачные цены. Все цены без рекламного бюджета.' }[locale] ?? 'Transparent pricing. All prices exclude ad budget.'
  const processTitle = { de: 'So arbeiten wir', en: 'How We Work', ru: 'Как мы работаем' }[locale] ?? 'How We Work'
  const processDescription = { de: 'Persoenlicher Ansatz fuer Wiener Unternehmen.', en: 'Personal approach for Vienna businesses.', ru: 'Персональный подход для венских компаний.' }[locale] ?? 'Personal approach for Vienna businesses.'
  const faqTitle = { de: 'Haeufige Fragen zu Google Ads in Wien', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы о Google Ads в Вене' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Сопутствующие услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer persoenliche Betreuung in Wien?', en: 'Ready for Personal Support in Vienna?', ru: 'Готовы к персональной поддержке в Вене?' }[locale] ?? 'Ready for Personal Support in Vienna?'
  const ctaDescription = { de: 'Kostenloses Audit-Meeting in unserem Wiener Buero oder bei Ihnen vor Ort.', en: 'Free audit meeting at our Vienna office or at your location.', ru: 'Бесплатная аудит-встреча в нашем венском офисе или у вас на месте.' }[locale] ?? 'Free audit meeting at our Vienna office or at your location.'
  const ctaButton = { de: 'Termin vereinbaren', en: 'Schedule Meeting', ru: 'Запланировать встречу' }[locale] ?? 'Schedule Meeting'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Google Ads Agentur Wien', en: 'Google Ads Agency Vienna', ru: 'Агентство Google Ads Вена' }[locale] ?? 'Google Ads Agency Vienna',
    url: 'https://goldenwing.at/google-ads-agentur-wien',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: { '@type': 'City', name: 'Vienna', containedIn: 'Austria' },
    description: { de: 'Lokale Google Partner Agentur in Wien. Suchanzeigen, Shopping, Display und YouTube Werbung mit persoenlicher Vor-Ort-Betreuung.', en: 'Local Google Partner agency in Vienna. Search ads, shopping, display and YouTube advertising with personal on-site support.', ru: 'Локальное агентство Google Partner в Вене. Поисковая реклама, Shopping, Display и YouTube реклама с персональным сопровождением на месте.' }[locale] ?? 'Local Google Partner agency in Vienna. Search ads, shopping, display and YouTube advertising with personal on-site support.',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GoldenWing Creative Studios',
    image: 'https://goldenwing.at/images/logo.png',
    '@id': 'https://goldenwing.at',
    url: 'https://goldenwing.at',
    telephone: '+43 664 543 96 81',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Czeikestrasse 4/21',
      addressLocality: 'Wien',
      postalCode: '1100',
      addressCountry: 'AT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1741,
      longitude: 16.3761,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: 'EUR 590-1990/month',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{content.heroBadge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{content.heroTitle}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{content.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {content.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#preise">{content.ctaSecondary}</NextLink>
              </Button>
            </div>
            {/* Office Badge */}
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-full px-4 py-2">
              <MapPin className="h-4 w-4" />
              {{ de: 'Buero: Czeikestrasse 4/21, 1100 Wien', en: 'Office: Czeikestrasse 4/21, 1100 Vienna', ru: 'Офис: Czeikestrasse 4/21, 1100 Вена' }[locale] ?? 'Office: Czeikestrasse 4/21, 1100 Vienna'}
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-4 gap-8">
            {results.map((result) => (
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
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Target
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

      {/* Vienna Context */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{wien.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{wien.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {wien.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{whyUs.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.reasons.map((reason, index) => (
              <div key={reason.title} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-4">0{index + 1}</div>
                <h3 className="font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
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
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale] ?? 'Most Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">EUR {pkg.price}</span>
                    <span className="text-muted-foreground text-sm"> {pkg.priceType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale] ?? 'Get Started'}</NextLink>
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
        steps={process.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      {faqs.length > 0 && <FAQSection title={faqTitle} items={faqs} />}

      {/* Related */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{relatedServicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service) => (
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
