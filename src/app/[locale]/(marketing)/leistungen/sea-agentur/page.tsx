import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Target, TrendingUp, BarChart3, Search, DollarSign, MousePointer, CheckCircle, Phone, Zap, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { AggregateRatingSchema } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { ProcessExpandingRows } from '@/components/process-sections/ProcessExpandingRows'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'search': Search,
  'trending-up': TrendingUp,
  'target': Target,
  'bar-chart-3': BarChart3,
  'dollar-sign': DollarSign,
  'mouse-pointer': MousePointer,
  'zap': Zap,
}

// SEA Agentur - Volume: 170, KD: 11 (!), CPC: €14.04
const defaultServices = {
  de: [
    { icon: 'search', title: 'Google Ads Kampagnen', description: 'Suchanzeigen, die konvertieren. Keyword-Recherche, Anzeigentexte, Bidding-Strategien und laufende Optimierung fuer maximalen ROI.' },
    { icon: 'target', title: 'Display Advertising', description: 'Banner-Werbung im Google Display Network. Remarketing, Lookalike Audiences und Placement-Optimierung.' },
    { icon: 'mouse-pointer', title: 'Shopping Ads', description: 'Google Shopping Kampagnen fuer E-Commerce. Feed-Optimierung, Smart Shopping und Performance Max.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Video-Werbung auf YouTube. TrueView, Bumper Ads und In-Stream Anzeigen fuer Markenbekanntheit und Conversions.' },
    { icon: 'bar-chart-3', title: 'Tracking & Attribution', description: 'Praezises Conversion-Tracking mit Google Analytics 4, Enhanced Conversions und Multi-Channel Attribution.' },
    { icon: 'dollar-sign', title: 'Budget-Optimierung', description: 'Maximaler Output aus Ihrem Werbebudget. A/B-Tests, Bid-Management und kontinuierliche Performance-Optimierung.' },
  ],
  en: [
    { icon: 'search', title: 'Google Ads Campaigns', description: 'Search ads that convert. Keyword research, ad copy, bidding strategies and ongoing optimization for maximum ROI.' },
    { icon: 'target', title: 'Display Advertising', description: 'Banner advertising on Google Display Network. Remarketing, lookalike audiences and placement optimization.' },
    { icon: 'mouse-pointer', title: 'Shopping Ads', description: 'Google Shopping campaigns for e-commerce. Feed optimization, Smart Shopping and Performance Max.' },
    { icon: 'zap', title: 'YouTube Ads', description: 'Video advertising on YouTube. TrueView, Bumper Ads and in-stream ads for brand awareness and conversions.' },
    { icon: 'bar-chart-3', title: 'Tracking & Attribution', description: 'Precise conversion tracking with Google Analytics 4, Enhanced Conversions and multi-channel attribution.' },
    { icon: 'dollar-sign', title: 'Budget Optimization', description: 'Maximum output from your ad budget. A/B testing, bid management and continuous performance optimization.' },
  ],
  ru: [
    { icon: 'search', title: 'Кампании Google Реклама', description: 'Поисковые объявления, которые конвертируют. Исследование ключевых слов, тексты объявлений, стратегии ставок и постоянная оптимизация для максимального ROI.' },
    { icon: 'target', title: 'Медийная реклама', description: 'Баннерная реклама в контекстно-медийной сети Google. Ремаркетинг, похожие аудитории и оптимизация размещений.' },
    { icon: 'mouse-pointer', title: 'Товарные объявления', description: 'Кампании Google Shopping для электронной коммерции. Оптимизация фида, Smart Shopping и Performance Max.' },
    { icon: 'zap', title: 'Реклама на YouTube', description: 'Видеореклама на YouTube. TrueView, Bumper Ads и In-Stream объявления для узнаваемости бренда и конверсий.' },
    { icon: 'bar-chart-3', title: 'Отслеживание и атрибуция', description: 'Точное отслеживание конверсий с Google Analytics 4, Enhanced Conversions и многоканальной атрибуцией.' },
    { icon: 'dollar-sign', title: 'Оптимизация бюджета', description: 'Максимальная отдача от вашего рекламного бюджета. A/B-тесты, управление ставками и непрерывная оптимизация эффективности.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEA Starter', price: '590', priceType: 'pro Monat', description: 'Bis 2.000 EUR Werbebudget', popular: false, features: ['Google Ads Setup & Optimierung', 'Keyword-Recherche', 'Bis 3 Kampagnen', 'Monatliches Reporting', 'A/B-Tests', '3 Stunden Betreuung/Monat'] },
    { name: 'SEA Business', price: '990', priceType: 'pro Monat', description: 'Bis 5.000 EUR Werbebudget', popular: true, features: ['Alles aus Starter', 'Bis 8 Kampagnen', 'Display & Remarketing', 'Conversion-Tracking Setup', 'Woechentliche Optimierung', 'Bi-Weekly Strategy Calls', '6 Stunden Betreuung/Monat'] },
    { name: 'SEA Premium', price: '1.990', priceType: 'pro Monat', description: 'Ab 5.000 EUR Werbebudget', popular: false, features: ['Alles aus Business', 'Unbegrenzte Kampagnen', 'YouTube Ads', 'Shopping & PMax', 'Automatisierte Bidding-Strategien', 'Woechentliche Strategy Calls', 'Dedizierter Account Manager', '12 Stunden Betreuung/Monat'] },
  ],
  en: [
    { name: 'SEA Starter', price: '590', priceType: 'per month', description: 'Up to 2,000 EUR ad budget', popular: false, features: ['Google Ads setup & optimization', 'Keyword research', 'Up to 3 campaigns', 'Monthly reporting', 'A/B testing', '3 hours support/month'] },
    { name: 'SEA Business', price: '990', priceType: 'per month', description: 'Up to 5,000 EUR ad budget', popular: true, features: ['Everything in Starter', 'Up to 8 campaigns', 'Display & remarketing', 'Conversion tracking setup', 'Weekly optimization', 'Bi-weekly strategy calls', '6 hours support/month'] },
    { name: 'SEA Premium', price: '1,990', priceType: 'per month', description: 'From 5,000 EUR ad budget', popular: false, features: ['Everything in Business', 'Unlimited campaigns', 'YouTube Ads', 'Shopping & PMax', 'Automated bidding strategies', 'Weekly strategy calls', 'Dedicated account manager', '12 hours support/month'] },
  ],
  ru: [
    { name: 'SEA Starter', price: '590', priceType: 'в месяц', description: 'До 2 000 EUR рекламного бюджета', popular: false, features: ['Настройка и оптимизация Google Реклама', 'Исследование ключевых слов', 'До 3 кампаний', 'Ежемесячная отчетность', 'A/B-тестирование', '3 часа поддержки/месяц'] },
    { name: 'SEA Business', price: '990', priceType: 'в месяц', description: 'До 5 000 EUR рекламного бюджета', popular: true, features: ['Все из Starter', 'До 8 кампаний', 'Медийная реклама и ремаркетинг', 'Настройка отслеживания конверсий', 'Еженедельная оптимизация', 'Стратегические звонки раз в 2 недели', '6 часов поддержки/месяц'] },
    { name: 'SEA Premium', price: '1 990', priceType: 'в месяц', description: 'От 5 000 EUR рекламного бюджета', popular: false, features: ['Все из Business', 'Неограниченное количество кампаний', 'Реклама на YouTube', 'Shopping и PMax', 'Автоматизированные стратегии ставок', 'Еженедельные стратегические звонки', 'Выделенный аккаунт-менеджер', '12 часов поддержки/месяц'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '4.2x', label: 'Durchschnittlicher ROAS', client: 'Ueber alle Kunden' },
    { metric: '-35%', label: 'Niedrigere CPA', client: 'Nach 3 Monaten' },
    { metric: '2.5M+', label: 'Verwaltetes Werbebudget', client: 'Pro Jahr' },
  ],
  en: [
    { metric: '4.2x', label: 'Average ROAS', client: 'Across all clients' },
    { metric: '-35%', label: 'Lower CPA', client: 'After 3 months' },
    { metric: '2.5M+', label: 'Managed ad budget', client: 'Per year' },
  ],
  ru: [
    { metric: '4.2x', label: 'Средний ROAS', client: 'По всем клиентам' },
    { metric: '-35%', label: 'Ниже CPA', client: 'Через 3 месяца' },
    { metric: '2.5M+', label: 'Управляемый рекламный бюджет', client: 'В год' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was macht eine SEA Agentur?', answer: 'Eine SEA Agentur (Search Engine Advertising) verwaltet bezahlte Suchmaschinenwerbung, hauptsaechlich Google Ads. Wir erstellen Kampagnen, optimieren Anzeigen, managen Budgets und maximieren Ihren Return on Ad Spend (ROAS). SEA liefert sofortige Sichtbarkeit im Gegensatz zu organischem SEO.' },
    { question: 'Was kostet eine SEA Agentur?', answer: 'Unsere SEA-Betreuung startet bei 590 Euro pro Monat (zzgl. Werbebudget). Die Kosten richten sich nach Ihrem Werbebudget und der Komplexitaet der Kampagnen. Typisch sind 15-20% des Werbebudgets als Management-Fee.' },
    { question: 'Wie schnell sehe ich Ergebnisse mit Google Ads?', answer: 'Mit Google Ads sehen Sie oft innerhalb weniger Tage erste Klicks und Leads. Die optimale Performance erreichen Kampagnen nach 2-4 Wochen Lernphase, wenn genuegend Daten fuer Optimierung vorhanden sind.' },
    { question: 'Was ist besser: SEO oder SEA?', answer: 'SEO und SEA ergaenzen sich. SEA bringt sofortige Ergebnisse und ist ideal fuer schnelle Leads, Produktlaunches oder saisonale Kampagnen. SEO ist langfristiger und nachhaltiger. Die beste Strategie kombiniert beides.' },
    { question: 'Brauche ich ein Mindest-Werbebudget?', answer: 'Wir empfehlen mindestens 1.000 Euro Werbebudget pro Monat fuer aussagekraeftige Ergebnisse. Bei weniger Budget fehlen oft die Daten fuer sinnvolle Optimierung. Die optimale Hoehe haengt von Ihrer Branche und Ihren Zielen ab.' },
    { question: 'Wie messt ihr den Erfolg von SEA-Kampagnen?', answer: 'Wir messen Conversions, ROAS (Return on Ad Spend), CPA (Cost per Acquisition), CTR (Click-Through-Rate) und Quality Score. Sie erhalten regelmaessige Reports mit allen relevanten KPIs und transparente Einblicke in die Performance.' },
  ],
  en: [
    { question: 'What does a SEA agency do?', answer: 'A SEA agency (Search Engine Advertising) manages paid search advertising, primarily Google Ads. We create campaigns, optimize ads, manage budgets and maximize your Return on Ad Spend (ROAS). SEA delivers immediate visibility unlike organic SEO.' },
    { question: 'How much does a SEA agency cost?', answer: 'Our SEA management starts at 590 euros per month (plus ad budget). Costs depend on your ad budget and campaign complexity. Typical is 15-20% of ad budget as management fee.' },
    { question: 'How quickly will I see results with Google Ads?', answer: 'With Google Ads, you often see first clicks and leads within days. Campaigns reach optimal performance after 2-4 weeks learning phase, when enough data for optimization is available.' },
    { question: 'What\'s better: SEO or SEA?', answer: 'SEO and SEA complement each other. SEA delivers immediate results and is ideal for quick leads, product launches or seasonal campaigns. SEO is more long-term and sustainable. The best strategy combines both.' },
    { question: 'Do I need a minimum ad budget?', answer: 'We recommend at least 1,000 euros ad budget per month for meaningful results. With less budget, there\'s often insufficient data for sensible optimization. The optimal amount depends on your industry and goals.' },
    { question: 'How do you measure success of SEA campaigns?', answer: 'We measure conversions, ROAS (Return on Ad Spend), CPA (Cost per Acquisition), CTR (Click-Through-Rate) and Quality Score. You receive regular reports with all relevant KPIs and transparent insights into performance.' },
  ],
  ru: [
    { question: 'Чем занимается агентство поисковой рекламы?', answer: 'Агентство поисковой рекламы (SEA - Search Engine Advertising) управляет платной рекламой в поисковых системах, в основном Google Реклама. Мы создаем кампании, оптимизируем объявления, управляем бюджетами и максимизируем вашу рентабельность рекламных расходов (ROAS). SEA обеспечивает мгновенную видимость в отличие от органического SEO.' },
    { question: 'Сколько стоят услуги агентства поисковой рекламы?', answer: 'Наше управление SEA начинается от 590 евро в месяц (плюс рекламный бюджет). Стоимость зависит от вашего рекламного бюджета и сложности кампаний. Типичная комиссия составляет 15-20% от рекламного бюджета.' },
    { question: 'Как быстро я увижу результаты с Google Реклама?', answer: 'С Google Реклама вы часто видите первые клики и лиды в течение нескольких дней. Кампании достигают оптимальной эффективности после 2-4 недель обучения, когда накоплено достаточно данных для оптимизации.' },
    { question: 'Что лучше: SEO или SEA?', answer: 'SEO и SEA дополняют друг друга. SEA дает немедленные результаты и идеально подходит для быстрого получения лидов, запуска продуктов или сезонных кампаний. SEO более долгосрочное и устойчивое. Лучшая стратегия объединяет оба подхода.' },
    { question: 'Нужен ли минимальный рекламный бюджет?', answer: 'Мы рекомендуем минимум 1 000 евро рекламного бюджета в месяц для значимых результатов. При меньшем бюджете часто недостаточно данных для разумной оптимизации. Оптимальная сумма зависит от вашей отрасли и целей.' },
    { question: 'Как вы измеряете успех SEA-кампаний?', answer: 'Мы измеряем конверсии, ROAS (рентабельность рекламных расходов), CPA (стоимость привлечения), CTR (кликабельность) и Quality Score. Вы получаете регулярные отчеты со всеми релевантными KPI и прозрачную информацию об эффективности.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Audit', description: 'Analyse bestehender Kampagnen oder Marktpotenzial' },
    { step: '02', title: 'Strategie', description: 'Kampagnenstruktur, Keywords, Budgetverteilung' },
    { step: '03', title: 'Setup', description: 'Kontostruktur, Tracking, Anzeigenerstellung' },
    { step: '04', title: 'Launch', description: 'Kampagnenstart mit engmaschigem Monitoring' },
    { step: '05', title: 'Optimierung', description: 'Laufende Tests, Bidding, Skalierung' },
  ],
  en: [
    { step: '01', title: 'Audit', description: 'Analysis of existing campaigns or market potential' },
    { step: '02', title: 'Strategy', description: 'Campaign structure, keywords, budget allocation' },
    { step: '03', title: 'Setup', description: 'Account structure, tracking, ad creation' },
    { step: '04', title: 'Launch', description: 'Campaign launch with close monitoring' },
    { step: '05', title: 'Optimization', description: 'Ongoing testing, bidding, scaling' },
  ],
  ru: [
    { step: '01', title: 'Аудит', description: 'Анализ существующих кампаний или рыночного потенциала' },
    { step: '02', title: 'Стратегия', description: 'Структура кампаний, ключевые слова, распределение бюджета' },
    { step: '03', title: 'Настройка', description: 'Структура аккаунта, отслеживание, создание объявлений' },
    { step: '04', title: 'Запуск', description: 'Запуск кампании с тщательным мониторингом' },
    { step: '05', title: 'Оптимизация', description: 'Постоянное тестирование, управление ставками, масштабирование' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Google Ads Agentur', description: 'Spezialisiert auf Google Ads Kampagnen.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO Betreuung', description: 'Organische Sichtbarkeit ergaenzend zu Ads.', href: '/leistungen/seo-betreuung' },
    { title: 'Social Media Agentur', description: 'Bezahlte Werbung auf Social Media.', href: '/leistungen/social-media-agentur' },
  ],
  en: [
    { title: 'Google Ads Agency', description: 'Specialized in Google Ads campaigns.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO Support', description: 'Organic visibility complementing ads.', href: '/leistungen/seo-betreuung' },
    { title: 'Social Media Agency', description: 'Paid advertising on social media.', href: '/leistungen/social-media-agentur' },
  ],
  ru: [
    { title: 'Агентство Google Реклама', description: 'Специализация на кампаниях Google Реклама.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO-поддержка', description: 'Органическая видимость в дополнение к рекламе.', href: '/leistungen/seo-betreuung' },
    { title: 'Агентство социальных сетей', description: 'Платная реклама в социальных сетях.', href: '/leistungen/social-media-agentur' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'Google Partner', description: 'Zertifizierte Expertise und direkter Support.' },
    { title: 'Datengetrieben', description: 'Entscheidungen basieren auf Zahlen, nicht Bauchgefuehl.' },
    { title: 'Transparentes Reporting', description: 'Sie sehen jeden Euro und jede Conversion.' },
    { title: 'Performance-Fokus', description: 'ROAS und Conversions, nicht nur Klicks.' },
  ],
  en: [
    { title: 'Google Partner', description: 'Certified expertise and direct support.' },
    { title: 'Data-Driven', description: 'Decisions based on numbers, not gut feeling.' },
    { title: 'Transparent Reporting', description: 'You see every euro and every conversion.' },
    { title: 'Performance Focus', description: 'ROAS and conversions, not just clicks.' },
  ],
  ru: [
    { title: 'Партнер Google', description: 'Сертифицированная экспертиза и прямая поддержка.' },
    { title: 'Ориентация на данные', description: 'Решения на основе цифр, а не интуиции.' },
    { title: 'Прозрачная отчетность', description: 'Вы видите каждый евро и каждую конверсию.' },
    { title: 'Фокус на эффективности', description: 'ROAS и конверсии, а не только клики.' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = {
    de: 'SEA Agentur Wien - Google Ads & Suchmaschinenwerbung | GoldenWing',
    en: 'SEA Agency Vienna - Google Ads & Search Engine Advertising | GoldenWing',
    ru: 'Агентство поисковой рекламы Вена - Google Реклама | GoldenWing'
  }[locale as 'de' | 'en' | 'ru'] ?? 'SEA Agency Vienna - Google Ads & Search Engine Advertising | GoldenWing'

  const metaDescription = truncateMetaDescription(
    {
      de: 'SEA Agentur fuer Google Ads, Display und Shopping Kampagnen. Durchschnittlich 4.2x ROAS. Management ab 590 EUR/Monat. Google Partner mit nachweisbaren Ergebnissen.',
      en: 'SEA agency for Google Ads, display and shopping campaigns. Average 4.2x ROAS. Management from 590 EUR/month. Google Partner with proven results.',
      ru: 'Агентство поисковой рекламы для Google Реклама, медийных и товарных кампаний. Средний ROAS 4.2x. Управление от 590 EUR/месяц. Партнер Google с подтвержденными результатами.'
    }[locale as 'de' | 'en' | 'ru'] ?? 'SEA agency for Google Ads, display and shopping campaigns. Average 4.2x ROAS. Management from 590 EUR/month. Google Partner with proven results.'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/sea-agentur', locale)
  const canonicalUrl = getCanonicalUrl('/leistungen/sea-agentur', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: {
      de: ['SEA Agentur', 'SEA Agentur Wien', 'Suchmaschinenwerbung', 'Google Ads Agentur', 'Paid Search', 'SEM Agentur', 'PPC Agentur'],
      en: ['SEA Agency', 'SEA Agency Vienna', 'Search Engine Advertising', 'Google Ads Agency', 'Paid Search', 'SEM Agency', 'PPC Agency'],
      ru: ['Агентство поисковой рекламы', 'Поисковая реклама Вена', 'Google Реклама', 'Контекстная реклама', 'PPC агентство', 'SEM агентство']
    }[locale as 'de' | 'en' | 'ru'] ?? ['SEA Agency', 'SEA Agency Vienna', 'Search Engine Advertising', 'Google Ads Agency', 'Paid Search', 'SEM Agency', 'PPC Agency'],
    openGraph: {
      title: { de: 'SEA Agentur Wien', en: 'SEA Agency Vienna', ru: 'Агентство поисковой рекламы Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'SEA Agency Vienna',
      description: metaDescription,
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeaAgenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })
  const heroData = {
    badge: { de: 'SEA Agentur', en: 'SEA Agency', ru: 'Агентство поисковой рекламы' }[locale as 'de' | 'en' | 'ru'] ?? 'SEA Agency',
    title: { de: 'SEA Agentur Wien', en: 'SEA Agency Vienna', ru: 'Агентство поисковой рекламы Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'SEA Agency Vienna',
    subtitle: { de: 'Sofortige Sichtbarkeit. Messbare Ergebnisse.', en: 'Immediate Visibility. Measurable Results.', ru: 'Мгновенная видимость. Измеримые результаты.' }[locale as 'de' | 'en' | 'ru'] ?? 'Immediate Visibility. Measurable Results.',
    description: {
      de: 'Professionelle Suchmaschinenwerbung mit Google Ads. Wir maximieren Ihren ROAS durch datengetriebene Kampagnen, praezises Targeting und kontinuierliche Optimierung.',
      en: 'Professional search engine advertising with Google Ads. We maximize your ROAS through data-driven campaigns, precise targeting and continuous optimization.',
      ru: 'Профессиональная поисковая реклама с Google Реклама. Мы максимизируем ваш ROAS через кампании на основе данных, точный таргетинг и непрерывную оптимизацию.'
    }[locale as 'de' | 'en' | 'ru'] ?? 'Professional search engine advertising with Google Ads. We maximize your ROAS through data-driven campaigns, precise targeting and continuous optimization.',
    ctaPrimary: { de: 'Kostenloses Ads-Audit', en: 'Free Ads Audit', ru: 'Бесплатный аудит рекламы' }[locale as 'de' | 'en' | 'ru'] ?? 'Free Ads Audit',
    ctaSecondary: { de: 'Pakete ansehen', en: 'View Packages', ru: 'Посмотреть пакеты' }[locale as 'de' | 'en' | 'ru'] ?? 'View Packages',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']

  const servicesTitle = { de: 'Unsere SEA-Leistungen', en: 'Our SEA Services', ru: 'Наши услуги поисковой рекламы' }[locale as 'de' | 'en' | 'ru'] ?? 'Our SEA Services'
  const servicesDescription = {
    de: 'Full-Service Suchmaschinenwerbung fuer maximalen ROI.',
    en: 'Full-service search engine advertising for maximum ROI.',
    ru: 'Полный спектр услуг поисковой рекламы для максимального ROI.'
  }[locale as 'de' | 'en' | 'ru'] ?? 'Full-service search engine advertising for maximum ROI.'
  const pricingTitle = { de: 'SEA-Betreuungspakete', en: 'SEA Management Packages', ru: 'Пакеты управления поисковой рекламой' }[locale as 'de' | 'en' | 'ru'] ?? 'SEA Management Packages'
  const pricingDescription = {
    de: 'Transparente Preise. Alle Preise exkl. Werbebudget.',
    en: 'Transparent pricing. All prices exclude ad budget.',
    ru: 'Прозрачные цены. Все цены без учета рекламного бюджета.'
  }[locale as 'de' | 'en' | 'ru'] ?? 'Transparent pricing. All prices exclude ad budget.'
  const processTitle = { de: 'So arbeiten wir', en: 'How We Work', ru: 'Как мы работаем' }[locale as 'de' | 'en' | 'ru'] ?? 'How We Work'
  const processDescription = {
    de: 'Strukturierter Ansatz fuer erfolgreiche Werbekampagnen.',
    en: 'Structured approach for successful ad campaigns.',
    ru: 'Структурированный подход для успешных рекламных кампаний.'
  }[locale as 'de' | 'en' | 'ru'] ?? 'Structured approach for successful ad campaigns.'
  const faqTitle = { de: 'Haeufige Fragen zur SEA Agentur', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale as 'de' | 'en' | 'ru'] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit, Ihre Ads zu skalieren?', en: 'Ready to Scale Your Ads?', ru: 'Готовы масштабировать вашу рекламу?' }[locale as 'de' | 'en' | 'ru'] ?? 'Ready to Scale Your Ads?'
  const ctaDescription = {
    de: 'Kostenloses Audit Ihrer bestehenden Kampagnen oder Marktpotenzial-Analyse. Unverbindlich.',
    en: 'Free audit of your existing campaigns or market potential analysis. No obligation.',
    ru: 'Бесплатный аудит ваших существующих кампаний или анализ рыночного потенциала. Без обязательств.'
  }[locale as 'de' | 'en' | 'ru'] ?? 'Free audit of your existing campaigns or market potential analysis. No obligation.'
  const ctaButton = { de: 'Kostenloses Audit anfordern', en: 'Request Free Audit', ru: 'Запросить бесплатный аудит' }[locale as 'de' | 'en' | 'ru'] ?? 'Request Free Audit'
  const uspsTitle = { de: 'Warum unsere SEA Agentur', en: 'Why Our SEA Agency', ru: 'Почему наше агентство поисковой рекламы' }[locale as 'de' | 'en' | 'ru'] ?? 'Why Our SEA Agency'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'SEA Agentur Wien', en: 'SEA Agency Vienna', ru: 'Агентство поисковой рекламы Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'SEA Agency Vienna',
    alternateName: { de: 'Suchmaschinenwerbung Agentur', en: 'Search Engine Advertising Agency', ru: 'Агентство контекстной рекламы' }[locale as 'de' | 'en' | 'ru'] ?? 'Search Engine Advertising Agency',
    url: 'https://goldenwing.at/leistungen/sea-agentur',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    description: {
      de: 'Professionelle SEA Agentur fuer Google Ads, Display, Shopping und YouTube Werbung. Datengetriebene Kampagnen fuer maximalen ROAS.',
      en: 'Professional SEA agency for Google Ads, Display, Shopping and YouTube advertising. Data-driven campaigns for maximum ROAS.',
      ru: 'Профессиональное агентство поисковой рекламы для Google Реклама, медийной, товарной и YouTube рекламы. Кампании на основе данных для максимального ROAS.'
    }[locale as 'de' | 'en' | 'ru'] ?? 'Professional SEA agency for Google Ads, Display, Shopping and YouTube advertising. Data-driven campaigns for maximum ROAS.',
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('.', '').replace(',', ''),
      priceCurrency: 'EUR',
      description: pkg.description,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{heroData.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{heroData.title}</h1>
            <p className="text-2xl text-primary font-medium mb-4">{heroData.subtitle}</p>
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

      {/* USPs */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{uspsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((usp) => (
              <Card key={usp.title}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">{usp.title}</h3>
                  <p className="text-sm text-muted-foreground">{usp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="leistungen" className="py-20 bg-muted/30 scroll-mt-20">
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
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale as 'de' | 'en' | 'ru'] ?? 'Most Popular'}</Badge>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale as 'de' | 'en' | 'ru'] ?? 'Get Started'}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessExpandingRows Layout */}
      <ProcessExpandingRows
        title={processTitle}
        subtitle={processDescription}
        steps={process.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={faqTitle}
          items={faqs}
          className="bg-background"
        />
      )}

      {/* Related Services */}
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
                    {t('learnMore')} <ArrowRight className="h-3 w-3" />
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
