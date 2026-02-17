import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Target, TrendingUp, BarChart3, Search, MousePointer, Zap, CheckCircle, Phone, DollarSign, LucideIcon } from 'lucide-react'
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

// Google Ads Agentur Österreich - Volume: 590, KD: 19
const defaultContent = {
  de: {
    metaTitle: 'Google Ads Agentur Oesterreich | Zertifizierte Google Partner Agentur',
    metaDescription: 'Google Ads Agentur fuer oesterreichische Unternehmen. Zertifizierter Google Partner. Suchanzeigen, Shopping, Display und YouTube Ads. Durchschnittlich 4x ROAS.',
    keywords: ['Google Ads Agentur Oesterreich', 'Google Ads Austria', 'Google Partner Agentur', 'AdWords Agentur Oesterreich', 'PPC Agentur Oesterreich', 'Suchmaschinenwerbung Oesterreich'],
    heroTitle: 'Google Ads Agentur Oesterreich – Ihr zertifizierter Google Partner',
    heroDescription: 'Als Google Ads Agentur betreuen wir oesterreichische Unternehmen von Wien bis Vorarlberg. Professionelle Kampagnenbetreuung fuer messbare Ergebnisse und profitables Wachstum.',
    heroBadge: 'Google Ads Agentur Oesterreich',
    ctaPrimary: 'Kostenloses Ads-Audit',
    ctaSecondary: 'Pakete ansehen',
  },
  en: {
    metaTitle: 'Google Ads Agency Austria | Certified Google Partner Agency',
    metaDescription: 'Google Ads agency for Austrian businesses. Certified Google Partner. Search ads, shopping, display and YouTube ads. Average 4x ROAS.',
    keywords: ['Google Ads Agency Austria', 'Google Ads Austria', 'Google Partner Agency', 'AdWords Agency Austria', 'PPC Agency Austria', 'Search Engine Advertising Austria'],
    heroTitle: 'Google Ads Agency Austria – Your Certified Google Partner',
    heroDescription: 'As a Google Ads agency, we serve Austrian businesses from Vienna to Vorarlberg. Professional campaign management for measurable results and profitable growth.',
    heroBadge: 'Google Ads Agency Austria',
    ctaPrimary: 'Free Ads Audit',
    ctaSecondary: 'View Packages',
  },
  ru: {
    metaTitle: 'Google Ads Агентство Австрия | Сертифицированное агентство Google Partner',
    metaDescription: 'Google Ads агентство для австрийских компаний. Сертифицированный Google Partner. Поисковая реклама, Shopping, Display и YouTube Ads. Средний ROAS 4x.',
    keywords: ['Google Ads Агентство Австрия', 'Google Ads Austria', 'Google Partner Агентство', 'AdWords Агентство Австрия', 'PPC Агентство Австрия', 'Поисковая реклама Австрия'],
    heroTitle: 'Google Ads Агентство Австрия – Ваш сертифицированный Google Partner',
    heroDescription: 'Как агентство Google Ads, мы обслуживаем австрийские компании от Вены до Форарльберга. Профессиональное управление кампаниями для измеримых результатов и прибыльного роста.',
    heroBadge: 'Google Ads Агентство Австрия',
    ctaPrimary: 'Бесплатный аудит Ads',
    ctaSecondary: 'Смотреть пакеты',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Google Suchanzeigen', description: 'Textanzeigen in den Google Suchergebnissen. Keyword-Recherche, Anzeigentexte und Bidding-Strategien fuer maximale Conversions.' },
    { icon: 'mouse-pointer', title: 'Google Shopping', description: 'Produktanzeigen fuer E-Commerce. Feed-Optimierung, Smart Shopping und Performance Max Kampagnen.' },
    { icon: 'target', title: 'Display Advertising', description: 'Banner-Werbung im Google Display Network. Remarketing, In-Market Audiences und Placement-Targeting.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Video-Werbung auf YouTube. TrueView, Bumper Ads und Video Action Campaigns fuer Awareness und Conversions.' },
    { icon: 'bar-chart-3', title: 'Performance Max', description: 'KI-gestuetzte Kampagnen ueber alle Google-Kanaele. Automatisierte Optimierung fuer maximale Performance.' },
    { icon: 'dollar-sign', title: 'Conversion Tracking', description: 'Praezises Tracking mit Google Analytics 4 und Enhanced Conversions. Datenbasierte Optimierung.' },
  ],
  en: [
    { icon: 'search', title: 'Google Search Ads', description: 'Text ads in Google search results. Keyword research, ad copy and bidding strategies for maximum conversions.' },
    { icon: 'mouse-pointer', title: 'Google Shopping', description: 'Product ads for e-commerce. Feed optimization, Smart Shopping and Performance Max campaigns.' },
    { icon: 'target', title: 'Display Advertising', description: 'Banner advertising on Google Display Network. Remarketing, in-market audiences and placement targeting.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Video advertising on YouTube. TrueView, Bumper Ads and Video Action Campaigns for awareness and conversions.' },
    { icon: 'bar-chart-3', title: 'Performance Max', description: 'AI-powered campaigns across all Google channels. Automated optimization for maximum performance.' },
    { icon: 'dollar-sign', title: 'Conversion Tracking', description: 'Precise tracking with Google Analytics 4 and Enhanced Conversions. Data-driven optimization.' },
  ],
  ru: [
    { icon: 'search', title: 'Поисковая реклама Google', description: 'Текстовые объявления в результатах поиска Google. Подбор ключевых слов, тексты объявлений и стратегии ставок для максимальных конверсий.' },
    { icon: 'mouse-pointer', title: 'Google Shopping', description: 'Товарные объявления для e-commerce. Оптимизация фида, Smart Shopping и кампании Performance Max.' },
    { icon: 'target', title: 'Медийная реклама', description: 'Баннерная реклама в контекстно-медийной сети Google. Ремаркетинг, аудитории по интересам и таргетинг по площадкам.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Видеореклама на YouTube. TrueView, Bumper Ads и Video Action Campaigns для узнаваемости и конверсий.' },
    { icon: 'bar-chart-3', title: 'Performance Max', description: 'Кампании на базе ИИ по всем каналам Google. Автоматизированная оптимизация для максимальной эффективности.' },
    { icon: 'dollar-sign', title: 'Отслеживание конверсий', description: 'Точное отслеживание с Google Analytics 4 и Enhanced Conversions. Оптимизация на основе данных.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Ads Starter', price: '590', priceType: 'pro Monat', description: 'Bis 2.000 EUR Werbebudget', popular: false, features: ['Google Ads Setup', 'Bis 3 Kampagnen', 'Keyword-Recherche', 'Monatliches Reporting', 'A/B-Tests', '3 Stunden Betreuung/Monat'] },
    { name: 'Ads Business', price: '990', priceType: 'pro Monat', description: 'Bis 5.000 EUR Werbebudget', popular: true, features: ['Alles aus Starter', 'Bis 8 Kampagnen', 'Shopping & Display', 'Conversion-Tracking Setup', 'Bi-Weekly Calls', '6 Stunden Betreuung/Monat'] },
    { name: 'Ads Premium', price: '1.990', priceType: 'pro Monat', description: 'Ab 5.000 EUR Werbebudget', popular: false, features: ['Alles aus Business', 'Unbegrenzte Kampagnen', 'YouTube Ads', 'Performance Max', 'Weekly Strategy Calls', 'Dedizierter Account Manager'] },
  ],
  en: [
    { name: 'Ads Starter', price: '590', priceType: 'per month', description: 'Up to 2,000 EUR ad budget', popular: false, features: ['Google Ads setup', 'Up to 3 campaigns', 'Keyword research', 'Monthly reporting', 'A/B testing', '3 hours support/month'] },
    { name: 'Ads Business', price: '990', priceType: 'per month', description: 'Up to 5,000 EUR ad budget', popular: true, features: ['Everything in Starter', 'Up to 8 campaigns', 'Shopping & Display', 'Conversion tracking setup', 'Bi-weekly calls', '6 hours support/month'] },
    { name: 'Ads Premium', price: '1,990', priceType: 'per month', description: 'From 5,000 EUR ad budget', popular: false, features: ['Everything in Business', 'Unlimited campaigns', 'YouTube Ads', 'Performance Max', 'Weekly strategy calls', 'Dedicated account manager'] },
  ],
  ru: [
    { name: 'Ads Starter', price: '590', priceType: 'в месяц', description: 'До 2 000 EUR рекламного бюджета', popular: false, features: ['Настройка Google Ads', 'До 3 кампаний', 'Подбор ключевых слов', 'Ежемесячная отчётность', 'A/B-тестирование', '3 часа поддержки/месяц'] },
    { name: 'Ads Business', price: '990', priceType: 'в месяц', description: 'До 5 000 EUR рекламного бюджета', popular: true, features: ['Всё из Starter', 'До 8 кампаний', 'Shopping и Display', 'Настройка отслеживания конверсий', 'Звонки раз в 2 недели', '6 часов поддержки/месяц'] },
    { name: 'Ads Premium', price: '1 990', priceType: 'в месяц', description: 'От 5 000 EUR рекламного бюджета', popular: false, features: ['Всё из Business', 'Неограниченное количество кампаний', 'YouTube Ads', 'Performance Max', 'Еженедельные стратегические звонки', 'Персональный аккаунт-менеджер'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '4.2x', label: 'Durchschnittlicher ROAS', client: 'Ueber alle AT-Kunden' },
    { metric: '-32%', label: 'Niedrigere Klickkosten', client: 'Nach 3 Monaten Optimierung' },
    { metric: '2M+', label: 'Verwaltetes Budget/Jahr', client: 'In Oesterreich' },
    { metric: '50+', label: 'Oesterreichische Kunden', client: 'Aktiv betreut' },
  ],
  en: [
    { metric: '4.2x', label: 'Average ROAS', client: 'Across all AT clients' },
    { metric: '-32%', label: 'Lower click costs', client: 'After 3 months optimization' },
    { metric: '2M+', label: 'Managed budget/year', client: 'In Austria' },
    { metric: '50+', label: 'Austrian clients', client: 'Actively managed' },
  ],
  ru: [
    { metric: '4.2x', label: 'Средний ROAS', client: 'По всем клиентам в Австрии' },
    { metric: '-32%', label: 'Снижение стоимости клика', client: 'После 3 месяцев оптимизации' },
    { metric: '2M+', label: 'Управляемый бюджет/год', client: 'В Австрии' },
    { metric: '50+', label: 'Австрийских клиентов', client: 'На активном обслуживании' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet eine Google Ads Agentur in Oesterreich?', answer: 'Unsere Google Ads Betreuung startet bei 590 Euro pro Monat (zzgl. Werbebudget). Das Business-Paket kostet 990 Euro, Premium 1.990 Euro monatlich. Die Agenturkosten betragen typischerweise 15-20% des Werbebudgets.' },
    { question: 'Wie hoch sollte mein Google Ads Budget sein?', answer: 'Wir empfehlen mindestens 1.000 Euro Werbebudget pro Monat fuer aussagekraeftige Ergebnisse in Oesterreich. Je nach Branche und Wettbewerb kann mehr Budget sinnvoll sein. Wir beraten Sie individuell.' },
    { question: 'Seid ihr zertifizierter Google Partner?', answer: 'Ja, wir sind zertifizierter Google Partner. Das bedeutet nachgewiesene Expertise, Zugang zu Beta-Features und direkten Google-Support. Unsere Mitarbeiter sind Google Ads zertifiziert.' },
    { question: 'Wie schnell sehe ich Ergebnisse mit Google Ads?', answer: 'Erste Klicks und Leads sehen Sie oft innerhalb von Tagen. Die optimale Performance erreichen Kampagnen nach 2-4 Wochen Lernphase, wenn genuegend Conversiondaten fuer Smart Bidding vorliegen.' },
    { question: 'Betreut ihr auch lokale Kampagnen in Oesterreich?', answer: 'Ja, wir sind auf den oesterreichischen Markt spezialisiert. Von lokalen Kampagnen in Wien, Graz oder Linz bis zu nationalen Kampagnen – wir kennen die Besonderheiten des AT-Marktes.' },
    { question: 'Kann ich mein bestehendes Google Ads Konto uebergeben?', answer: 'Ja, wir uebernehmen bestehende Konten. Im Rahmen eines kostenlosen Audits analysieren wir Ihr Konto und zeigen Optimierungspotenziale auf, bevor wir die Betreuung starten.' },
  ],
  en: [
    { question: 'How much does a Google Ads agency cost in Austria?', answer: 'Our Google Ads management starts at 590 euros per month (plus ad budget). The Business package costs 990 euros, Premium 1,990 euros monthly. Agency costs are typically 15-20% of ad budget.' },
    { question: 'How high should my Google Ads budget be?', answer: 'We recommend at least 1,000 euros ad budget per month for meaningful results in Austria. Depending on industry and competition, more budget may be sensible. We advise you individually.' },
    { question: 'Are you a certified Google Partner?', answer: 'Yes, we are a certified Google Partner. This means proven expertise, access to beta features and direct Google support. Our staff are Google Ads certified.' },
    { question: 'How quickly will I see results with Google Ads?', answer: 'You often see first clicks and leads within days. Campaigns reach optimal performance after 2-4 weeks learning phase, when enough conversion data for Smart Bidding is available.' },
    { question: 'Do you also manage local campaigns in Austria?', answer: 'Yes, we specialize in the Austrian market. From local campaigns in Vienna, Graz or Linz to national campaigns – we know the specifics of the AT market.' },
    { question: 'Can I hand over my existing Google Ads account?', answer: 'Yes, we take over existing accounts. As part of a free audit, we analyze your account and show optimization potential before we start management.' },
  ],
  ru: [
    { question: 'Сколько стоит Google Ads агентство в Австрии?', answer: 'Наше управление Google Ads начинается от 590 евро в месяц (плюс рекламный бюджет). Пакет Business стоит 990 евро, Premium — 1 990 евро в месяц. Стоимость услуг агентства обычно составляет 15-20% от рекламного бюджета.' },
    { question: 'Какой бюджет Google Ads мне нужен?', answer: 'Мы рекомендуем минимум 1 000 евро рекламного бюджета в месяц для значимых результатов в Австрии. В зависимости от отрасли и конкуренции может потребоваться больший бюджет. Мы консультируем индивидуально.' },
    { question: 'Вы сертифицированный Google Partner?', answer: 'Да, мы являемся сертифицированным Google Partner. Это означает подтверждённую экспертизу, доступ к бета-функциям и прямую поддержку Google. Наши сотрудники сертифицированы по Google Ads.' },
    { question: 'Как быстро я увижу результаты с Google Ads?', answer: 'Первые клики и лиды вы часто видите в течение нескольких дней. Кампании достигают оптимальной эффективности после 2-4 недель обучения, когда накоплено достаточно данных о конверсиях для Smart Bidding.' },
    { question: 'Вы также управляете локальными кампаниями в Австрии?', answer: 'Да, мы специализируемся на австрийском рынке. От локальных кампаний в Вене, Граце или Линце до национальных кампаний — мы знаем особенности австрийского рынка.' },
    { question: 'Могу ли я передать вам существующий аккаунт Google Ads?', answer: 'Да, мы берём на себя существующие аккаунты. В рамках бесплатного аудита мы анализируем ваш аккаунт и показываем потенциал оптимизации, прежде чем начать управление.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Audit', description: 'Analyse bestehender Kampagnen oder Marktpotenzial' },
    { step: '02', title: 'Strategie', description: 'Kampagnenstruktur und Budget-Allokation' },
    { step: '03', title: 'Setup', description: 'Konto, Tracking und Kampagnen einrichten' },
    { step: '04', title: 'Launch', description: 'Kampagnenstart mit engem Monitoring' },
    { step: '05', title: 'Optimierung', description: 'Laufende Tests und Skalierung' },
  ],
  en: [
    { step: '01', title: 'Audit', description: 'Analysis of existing campaigns or market potential' },
    { step: '02', title: 'Strategy', description: 'Campaign structure and budget allocation' },
    { step: '03', title: 'Setup', description: 'Set up account, tracking and campaigns' },
    { step: '04', title: 'Launch', description: 'Campaign launch with close monitoring' },
    { step: '05', title: 'Optimization', description: 'Ongoing testing and scaling' },
  ],
  ru: [
    { step: '01', title: 'Аудит', description: 'Анализ существующих кампаний или рыночного потенциала' },
    { step: '02', title: 'Стратегия', description: 'Структура кампаний и распределение бюджета' },
    { step: '03', title: 'Настройка', description: 'Настройка аккаунта, отслеживания и кампаний' },
    { step: '04', title: 'Запуск', description: 'Запуск кампаний с пристальным мониторингом' },
    { step: '05', title: 'Оптимизация', description: 'Постоянное тестирование и масштабирование' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'SEA Agentur', description: 'Umfassende Suchmaschinenwerbung ueber Google hinaus.', href: '/leistungen/sea-agentur' },
    { title: 'Google Ads Agentur Wien', description: 'Spezialisiert auf den Wiener Markt.', href: '/google-ads-agentur-wien' },
    { title: 'SEO Betreuung', description: 'Organische Sichtbarkeit ergaenzend zu Ads.', href: '/leistungen/seo-betreuung' },
  ],
  en: [
    { title: 'SEA Agency', description: 'Comprehensive search advertising beyond Google.', href: '/leistungen/sea-agentur' },
    { title: 'Google Ads Agency Vienna', description: 'Specialized in the Vienna market.', href: '/google-ads-agentur-wien' },
    { title: 'SEO Support', description: 'Organic visibility complementing ads.', href: '/leistungen/seo-betreuung' },
  ],
  ru: [
    { title: 'SEA Агентство', description: 'Комплексная поисковая реклама за пределами Google.', href: '/leistungen/sea-agentur' },
    { title: 'Google Ads Агентство Вена', description: 'Специализация на венском рынке.', href: '/google-ads-agentur-wien' },
    { title: 'SEO Поддержка', description: 'Органическая видимость в дополнение к рекламе.', href: '/leistungen/seo-betreuung' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const whyChooseUs = {
  de: {
    title: 'Warum GoldenWing als Google Ads Agentur in Oesterreich?',
    reasons: [
      { title: 'Google Partner', description: 'Zertifizierte Expertise und direkter Google-Support.' },
      { title: 'Lokale Marktkenntnis', description: 'Wir kennen den oesterreichischen Markt und seine Besonderheiten.' },
      { title: 'Transparentes Reporting', description: 'Sie sehen jeden Euro und jede Conversion.' },
      { title: 'Performance-Fokus', description: 'ROAS und Conversions, nicht nur Klicks.' },
    ],
  },
  en: {
    title: 'Why Choose GoldenWing as Google Ads Agency in Austria?',
    reasons: [
      { title: 'Google Partner', description: 'Certified expertise and direct Google support.' },
      { title: 'Local Market Knowledge', description: 'We know the Austrian market and its specifics.' },
      { title: 'Transparent Reporting', description: 'You see every euro and every conversion.' },
      { title: 'Performance Focus', description: 'ROAS and conversions, not just clicks.' },
    ],
  },
  ru: {
    title: 'Почему GoldenWing как Google Ads агентство в Австрии?',
    reasons: [
      { title: 'Google Partner', description: 'Сертифицированная экспертиза и прямая поддержка Google.' },
      { title: 'Знание местного рынка', description: 'Мы знаем австрийский рынок и его особенности.' },
      { title: 'Прозрачная отчётность', description: 'Вы видите каждый евро и каждую конверсию.' },
      { title: 'Фокус на результат', description: 'ROAS и конверсии, а не только клики.' },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/google-ads-agentur-oesterreich', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/google-ads-agentur-oesterreich', locale),
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
      canonical: getCanonicalUrl('/google-ads-agentur-oesterreich', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function GoogleAdsAgenturOesterreichPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const common = await getTranslations({ locale, namespace: 'common' })

  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const whyUs = whyChooseUs[locale as 'de' | 'en' | 'ru'] ?? whyChooseUs['en']

  const servicesTitle = { de: 'Unsere Google Ads Leistungen', en: 'Our Google Ads Services', ru: 'Наши услуги Google Ads' }[locale] ?? 'Our Google Ads Services'
  const servicesDescription = { de: 'Full-Service Google Ads Betreuung fuer oesterreichische Unternehmen.', en: 'Full-service Google Ads management for Austrian businesses.', ru: 'Полный спектр услуг по управлению Google Ads для австрийских компаний.' }[locale] ?? 'Full-service Google Ads management for Austrian businesses.'
  const pricingTitle = { de: 'Google Ads Pakete', en: 'Google Ads Packages', ru: 'Пакеты Google Ads' }[locale] ?? 'Google Ads Packages'
  const pricingDescription = { de: 'Transparente Preise. Alle Preise exkl. Werbebudget.', en: 'Transparent pricing. All prices exclude ad budget.', ru: 'Прозрачные цены. Все цены без учёта рекламного бюджета.' }[locale] ?? 'Transparent pricing. All prices exclude ad budget.'
  const processTitle = { de: 'So arbeiten wir', en: 'How We Work', ru: 'Как мы работаем' }[locale] ?? 'How We Work'
  const processDescription = { de: 'Strukturierter Ansatz fuer erfolgreiche Werbekampagnen.', en: 'Structured approach for successful ad campaigns.', ru: 'Структурированный подход для успешных рекламных кампаний.' }[locale] ?? 'Structured approach for successful ad campaigns.'
  const faqTitle = { de: 'Haeufige Fragen zu Google Ads in Oesterreich', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer profitables Wachstum mit Google Ads?', en: 'Ready to Scale Your Google Ads?', ru: 'Готовы масштабировать ваш Google Ads?' }[locale] ?? 'Ready to Scale Your Google Ads?'
  const ctaDescription = { de: 'Kostenloses Audit Ihrer bestehenden Kampagnen oder Marktpotenzial-Analyse.', en: 'Free audit of your existing campaigns or market potential analysis.', ru: 'Бесплатный аудит ваших существующих кампаний или анализ рыночного потенциала.' }[locale] ?? 'Free audit of your existing campaigns or market potential analysis.'
  const ctaButton = { de: 'Kostenloses Audit anfordern', en: 'Request Free Audit', ru: 'Запросить бесплатный аудит' }[locale] ?? 'Request Free Audit'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Google Ads Agentur Oesterreich', en: 'Google Ads Agency Austria', ru: 'Google Ads Агентство Австрия' }[locale] ?? 'Google Ads Agency Austria',
    url: 'https://goldenwing.at/google-ads-agentur-oesterreich',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: { '@type': 'Country', name: 'Austria' },
    description: { de: 'Zertifizierte Google Partner Agentur fuer oesterreichische Unternehmen. Suchanzeigen, Shopping, Display und YouTube Werbung.', en: 'Certified Google Partner agency for Austrian businesses. Search ads, shopping, display and YouTube advertising.', ru: 'Сертифицированное агентство Google Partner для австрийских компаний. Поисковая реклама, Shopping, Display и YouTube реклама.' }[locale] ?? 'Certified Google Partner agency for Austrian businesses. Search ads, shopping, display and YouTube advertising.',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

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

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
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
      <section id="preise" className="py-20 scroll-mt-20">
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
