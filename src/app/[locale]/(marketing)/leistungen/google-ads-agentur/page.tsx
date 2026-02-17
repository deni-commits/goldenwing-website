import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Target, TrendingUp, BarChart3, RefreshCw, ShoppingBag, Users, CheckCircle, Phone, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { ProcessExpandingRows } from '@/components/process-sections/ProcessExpandingRows'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'target': Target,
  'trending-up': TrendingUp,
  'bar-chart-3': BarChart3,
  'refresh-cw': RefreshCw,
  'shopping-bag': ShoppingBag,
  'users': Users,
}

// Default content for Google Ads Agentur page
const defaultServices = {
  de: [
    { icon: 'target', title: 'Kampagnen-Setup', description: 'Professionelle Einrichtung Ihrer Google Ads Kampagnen: Konto-Struktur, Kampagnen-Typen, Anzeigengruppen und Keywords.' },
    { icon: 'bar-chart-3', title: 'Kampagnen-Optimierung', description: 'Laufende Optimierung fuer maximale Performance: Gebotsstrategien, Qualitaetsfaktor, A/B-Tests und Budget-Allokation.' },
    { icon: 'refresh-cw', title: 'Remarketing', description: 'Nutzer erneut ansprechen, die Ihre Website besucht haben. Display, YouTube und Search Remarketing.' },
    { icon: 'shopping-bag', title: 'Shopping Ads', description: 'Google Shopping Kampagnen fuer E-Commerce: Produkt-Feed, Merchant Center und Performance Max.' },
    { icon: 'users', title: 'Display & Video', description: 'Reichweite aufbauen mit Display-Bannern und YouTube-Werbung. Targeting und Creative-Optimierung.' },
    { icon: 'trending-up', title: 'Tracking & Analytics', description: 'Conversion-Tracking, Google Analytics 4 Setup und datenbasierte Entscheidungen.' },
  ],
  en: [
    { icon: 'target', title: 'Campaign Setup', description: 'Professional setup of your Google Ads campaigns: Account structure, campaign types, ad groups, and keywords.' },
    { icon: 'bar-chart-3', title: 'Campaign Optimization', description: 'Ongoing optimization for maximum performance: Bidding strategies, quality score, A/B tests, and budget allocation.' },
    { icon: 'refresh-cw', title: 'Remarketing', description: 'Re-engage users who visited your website. Display, YouTube, and search remarketing.' },
    { icon: 'shopping-bag', title: 'Shopping Ads', description: 'Google Shopping campaigns for e-commerce: Product feed, Merchant Center, and Performance Max.' },
    { icon: 'users', title: 'Display & Video', description: 'Build reach with display banners and YouTube advertising. Targeting and creative optimization.' },
    { icon: 'trending-up', title: 'Tracking & Analytics', description: 'Conversion tracking, Google Analytics 4 setup, and data-driven decisions.' },
  ],
  ru: [
    { icon: 'target', title: 'Настройка кампаний', description: 'Профессиональная настройка ваших рекламных кампаний Google Ads: структура аккаунта, типы кампаний, группы объявлений и ключевые слова.' },
    { icon: 'bar-chart-3', title: 'Оптимизация кампаний', description: 'Постоянная оптимизация для максимальной эффективности: стратегии ставок, показатель качества, A/B-тесты и распределение бюджета.' },
    { icon: 'refresh-cw', title: 'Ремаркетинг', description: 'Повторное привлечение пользователей, посетивших ваш сайт. Display, YouTube и поисковый ремаркетинг.' },
    { icon: 'shopping-bag', title: 'Shopping Ads', description: 'Кампании Google Shopping для электронной коммерции: товарный фид, Merchant Center и Performance Max.' },
    { icon: 'users', title: 'Display и Видео', description: 'Расширение охвата с помощью баннеров и рекламы на YouTube. Таргетинг и оптимизация креативов.' },
    { icon: 'trending-up', title: 'Отслеживание и Аналитика', description: 'Отслеживание конверсий, настройка Google Analytics 4 и принятие решений на основе данных.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Kampagnen-Setup', price: '490', priceType: 'ab', description: 'Einmalige Einrichtung', popular: false, features: ['Konto-Struktur erstellen', 'Keyword-Recherche', 'Anzeigentexte (5 Varianten)', 'Conversion-Tracking', 'Zielgruppen einrichten', 'Gebotsstrategien', 'Kampagnen-Dokumentation', 'Uebergabe & Erklaerung'] },
    { name: 'Monatliche Betreuung', price: '590', priceType: 'ab/Monat', description: 'Laufende Optimierung', popular: true, features: ['Bis 5.000 Euro Ad Spend', 'Woechentliche Optimierung', 'A/B-Tests', 'Gebotsanpassungen', 'Negative Keywords', 'Monatliches Reporting', 'Quartal-Review-Calls', 'E-Mail-Support'] },
    { name: 'Performance Ads', price: '990', priceType: 'ab/Monat', description: 'Full-Service Management', popular: false, features: ['Bis 20.000 Euro Ad Spend', 'Taegliche Optimierung', 'Multi-Channel (Search, Display, YouTube)', 'Shopping & Performance Max', 'Erweiterte Audiences', 'Wettbewerbsanalysen', 'Strategie-Calls', 'Dedizierter Manager'] },
  ],
  en: [
    { name: 'Campaign Setup', price: '490', priceType: 'from', description: 'One-time setup', popular: false, features: ['Create account structure', 'Keyword research', 'Ad copy (5 variants)', 'Conversion tracking', 'Set up audiences', 'Bidding strategies', 'Campaign documentation', 'Handover & explanation'] },
    { name: 'Monthly Management', price: '590', priceType: 'from/month', description: 'Ongoing optimization', popular: true, features: ['Up to 5,000 euros ad spend', 'Weekly optimization', 'A/B tests', 'Bid adjustments', 'Negative keywords', 'Monthly reporting', 'Quarterly review calls', 'Email support'] },
    { name: 'Performance Ads', price: '990', priceType: 'from/month', description: 'Full-service management', popular: false, features: ['Up to 20,000 euros ad spend', 'Daily optimization', 'Multi-channel (Search, Display, YouTube)', 'Shopping & Performance Max', 'Advanced audiences', 'Competitor analysis', 'Strategy calls', 'Dedicated manager'] },
  ],
  ru: [
    { name: 'Настройка кампаний', price: '490', priceType: 'от', description: 'Единоразовая настройка', popular: false, features: ['Создание структуры аккаунта', 'Исследование ключевых слов', 'Тексты объявлений (5 вариантов)', 'Отслеживание конверсий', 'Настройка аудиторий', 'Стратегии ставок', 'Документация кампании', 'Передача и объяснение'] },
    { name: 'Ежемесячное ведение', price: '590', priceType: 'от/месяц', description: 'Постоянная оптимизация', popular: true, features: ['До 5 000 евро рекламного бюджета', 'Еженедельная оптимизация', 'A/B-тесты', 'Корректировка ставок', 'Минус-слова', 'Ежемесячная отчётность', 'Квартальные созвоны', 'Поддержка по email'] },
    { name: 'Performance Ads', price: '990', priceType: 'от/месяц', description: 'Полный комплекс услуг', popular: false, features: ['До 20 000 евро рекламного бюджета', 'Ежедневная оптимизация', 'Мультиканал (Search, Display, YouTube)', 'Shopping & Performance Max', 'Расширенные аудитории', 'Анализ конкурентов', 'Стратегические созвоны', 'Персональный менеджер'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+312%', label: 'Durchschnittlicher ROAS', client: 'Ueber alle Kunden' },
    { metric: '-42%', label: 'Kosten pro Conversion', client: 'Nach 3 Monaten' },
    { metric: '2.5 Mio+', label: 'Verwaltetes Ad Budget', client: 'Pro Jahr' },
  ],
  en: [
    { metric: '+312%', label: 'Average ROAS', client: 'Across all clients' },
    { metric: '-42%', label: 'Cost per conversion', client: 'After 3 months' },
    { metric: '2.5M+', label: 'Managed ad budget', client: 'Per year' },
  ],
  ru: [
    { metric: '+312%', label: 'Средний ROAS', client: 'По всем клиентам' },
    { metric: '-42%', label: 'Стоимость конверсии', client: 'Через 3 месяца' },
    { metric: '2.5 млн+', label: 'Управляемый рекламный бюджет', client: 'В год' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet Google Ads Betreuung?', answer: 'Unsere monatliche Betreuung startet ab 590 Euro fuer Budgets bis 5.000 Euro. Die Management-Gebuehr richtet sich nach dem verwalteten Werbebudget und dem Betreuungsaufwand. Ein einmaliges Kampagnen-Setup kostet ab 490 Euro.' },
    { question: 'Wie schnell sehe ich Ergebnisse?', answer: 'Google Ads liefert sofortige Sichtbarkeit. Erste Klicks und Conversions sehen Sie bereits in den ersten Tagen. Fuer optimale Performance benoetigt das System 2-4 Wochen Lernphase, danach optimieren wir kontinuierlich weiter.' },
    { question: 'Was ist ein guter ROAS?', answer: 'Ein guter ROAS (Return on Ad Spend) haengt von Ihrer Branche und Marge ab. Im E-Commerce ist ein ROAS von 300-500% oft profitabel. Fuer Leadgenerierung bewerten wir den Cost per Lead. Wir definieren gemeinsam realistische Ziele.' },
    { question: 'Brauche ich zusaetzlich SEO?', answer: 'Google Ads und SEO ergaenzen sich ideal. Ads bringen sofortige Ergebnisse, SEO baut langfristige organische Sichtbarkeit auf. Wir empfehlen eine kombinierte Strategie fuer maximale Praesenz in den Suchergebnissen.' },
    { question: 'Wie funktioniert das Reporting?', answer: 'Sie erhalten monatliche Reports mit allen relevanten KPIs: Impressionen, Klicks, CTR, Conversions, CPA und ROAS. In unserem Dashboard haben Sie jederzeit Echtzeit-Zugriff auf Ihre Kampagnen-Performance.' },
    { question: 'Koennen Sie auch Shopping-Kampagnen betreuen?', answer: 'Ja, wir sind auf Google Shopping und Performance Max spezialisiert. Wir optimieren Ihren Produkt-Feed, richten das Merchant Center ein und maximieren Ihren E-Commerce-Umsatz ueber Google Ads.' },
  ],
  en: [
    { question: 'How much does Google Ads management cost?', answer: 'Our monthly management starts at 590 euros for budgets up to 5,000 euros. The management fee depends on the managed ad budget and the level of service. A one-time campaign setup costs from 490 euros.' },
    { question: 'How quickly will I see results?', answer: 'Google Ads delivers immediate visibility. You\'ll see first clicks and conversions in the first few days. For optimal performance, the system needs 2-4 weeks learning phase, then we continuously optimize further.' },
    { question: 'What is a good ROAS?', answer: 'A good ROAS (Return on Ad Spend) depends on your industry and margins. In e-commerce, a ROAS of 300-500% is often profitable. For lead generation, we evaluate cost per lead. We define realistic goals together.' },
    { question: 'Do I also need SEO?', answer: 'Google Ads and SEO complement each other ideally. Ads bring immediate results, SEO builds long-term organic visibility. We recommend a combined strategy for maximum presence in search results.' },
    { question: 'How does reporting work?', answer: 'You receive monthly reports with all relevant KPIs: Impressions, clicks, CTR, conversions, CPA, and ROAS. In our dashboard, you have real-time access to your campaign performance at any time.' },
    { question: 'Can you also manage Shopping campaigns?', answer: 'Yes, we specialize in Google Shopping and Performance Max. We optimize your product feed, set up Merchant Center, and maximize your e-commerce revenue through Google Ads.' },
  ],
  ru: [
    { question: 'Сколько стоит ведение Google Ads?', answer: 'Наше ежемесячное ведение начинается от 590 евро для бюджетов до 5 000 евро. Стоимость управления зависит от рекламного бюджета и объёма работ. Единоразовая настройка кампании стоит от 490 евро.' },
    { question: 'Как быстро я увижу результаты?', answer: 'Google Ads обеспечивает мгновенную видимость. Первые клики и конверсии вы увидите уже в первые дни. Для оптимальной эффективности системе требуется 2-4 недели обучения, после чего мы продолжаем непрерывную оптимизацию.' },
    { question: 'Какой ROAS считается хорошим?', answer: 'Хороший ROAS (возврат на рекламные расходы) зависит от вашей отрасли и маржинальности. В электронной коммерции ROAS 300-500% часто является прибыльным. Для лидогенерации мы оцениваем стоимость лида. Мы вместе определяем реалистичные цели.' },
    { question: 'Нужно ли мне также SEO?', answer: 'Google Ads и SEO идеально дополняют друг друга. Реклама приносит мгновенные результаты, SEO создаёт долгосрочную органическую видимость. Мы рекомендуем комбинированную стратегию для максимального присутствия в результатах поиска.' },
    { question: 'Как работает отчётность?', answer: 'Вы получаете ежемесячные отчёты со всеми важными KPI: показы, клики, CTR, конверсии, CPA и ROAS. В нашей панели управления у вас всегда есть доступ к эффективности кампаний в реальном времени.' },
    { question: 'Можете ли вы также вести Shopping-кампании?', answer: 'Да, мы специализируемся на Google Shopping и Performance Max. Мы оптимизируем ваш товарный фид, настраиваем Merchant Center и максимизируем доход вашего интернет-магазина через Google Ads.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'Ziele, Zielgruppen und Wettbewerb verstehen' },
    { step: '02', title: 'Strategie', description: 'Kampagnen-Struktur und Budget planen' },
    { step: '03', title: 'Setup', description: 'Kampagnen, Anzeigen und Tracking einrichten' },
    { step: '04', title: 'Optimierung', description: 'Datenbasiert verbessern und skalieren' },
    { step: '05', title: 'Reporting', description: 'Transparente Ergebnisse und Insights' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'Understand goals, audiences, and competition' },
    { step: '02', title: 'Strategy', description: 'Plan campaign structure and budget' },
    { step: '03', title: 'Setup', description: 'Set up campaigns, ads, and tracking' },
    { step: '04', title: 'Optimization', description: 'Improve and scale based on data' },
    { step: '05', title: 'Reporting', description: 'Transparent results and insights' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'Понимание целей, аудитории и конкурентов' },
    { step: '02', title: 'Стратегия', description: 'Планирование структуры кампании и бюджета' },
    { step: '03', title: 'Настройка', description: 'Настройка кампаний, объявлений и отслеживания' },
    { step: '04', title: 'Оптимизация', description: 'Улучшение и масштабирование на основе данных' },
    { step: '05', title: 'Отчётность', description: 'Прозрачные результаты и аналитика' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Social Media Ads', description: 'Werbung auf Facebook, Instagram und LinkedIn.', href: '/leistungen/social-media-agentur' },
    { title: 'SEO', description: 'Organische Sichtbarkeit ergaenzend zu Google Ads.', href: '/leistungen/seo-content' },
    { title: 'Onlineshop', description: 'E-Commerce-Loesung fuer Ihre Shopping-Kampagnen.', href: '/leistungen/onlineshop-agentur' },
  ],
  en: [
    { title: 'Social Media Ads', description: 'Advertising on Facebook, Instagram, and LinkedIn.', href: '/leistungen/social-media-agentur' },
    { title: 'SEO', description: 'Organic visibility complementing Google Ads.', href: '/leistungen/seo-content' },
    { title: 'Online Shop', description: 'E-commerce solution for your Shopping campaigns.', href: '/leistungen/onlineshop-agentur' },
  ],
  ru: [
    { title: 'Реклама в соцсетях', description: 'Реклама в Facebook, Instagram и LinkedIn.', href: '/leistungen/social-media-agentur' },
    { title: 'SEO', description: 'Органическая видимость в дополнение к Google Ads.', href: '/leistungen/seo-content' },
    { title: 'Интернет-магазин', description: 'Решение для электронной коммерции для ваших Shopping-кампаний.', href: '/leistungen/onlineshop-agentur' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'Google Partner', description: 'Zertifizierte Google Ads Spezialisten.' },
    { title: 'Transparent', description: 'Keine versteckten Kosten, klares Reporting.' },
    { title: 'Performance-fokussiert', description: 'ROI und Conversions stehen im Fokus.' },
    { title: 'Branchenexpertise', description: 'Erfahrung in B2B, E-Commerce und Services.' },
  ],
  en: [
    { title: 'Google Partner', description: 'Certified Google Ads specialists.' },
    { title: 'Transparent', description: 'No hidden costs, clear reporting.' },
    { title: 'Performance-Focused', description: 'ROI and conversions are the focus.' },
    { title: 'Industry Expertise', description: 'Experience in B2B, e-commerce, and services.' },
  ],
  ru: [
    { title: 'Google Partner', description: 'Сертифицированные специалисты Google Ads.' },
    { title: 'Прозрачность', description: 'Никаких скрытых расходов, понятная отчётность.' },
    { title: 'Фокус на результат', description: 'ROI и конверсии в центре внимания.' },
    { title: 'Отраслевая экспертиза', description: 'Опыт в B2B, электронной коммерции и услугах.' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = {
    de: 'Google Ads Agentur Wien - Kampagnen, die konvertieren | GoldenWing',
    en: 'Google Ads Agency Vienna - Campaigns That Convert | GoldenWing',
    ru: 'Агентство Google Ads Вена - Кампании, которые конвертируют | GoldenWing',
  }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads Agency Vienna - Campaigns That Convert | GoldenWing'

  const metaDescription = truncateMetaDescription(
    {
      de: 'Google Ads Agentur aus Wien: Setup ab 490 Euro, monatliche Betreuung ab 590 Euro. Google Partner mit +312% durchschnittlichem ROAS. Jetzt Kampagne starten!',
      en: 'Google Ads agency from Vienna: Setup from 490 euros, monthly management from 590 euros. Google Partner with +312% average ROAS. Start your campaign now!',
      ru: 'Агентство Google Ads из Вены: настройка от 490 евро, ежемесячное ведение от 590 евро. Google Partner со средним ROAS +312%. Запустите кампанию сейчас!',
    }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads agency from Vienna: Setup from 490 euros, monthly management from 590 euros. Google Partner with +312% average ROAS. Start your campaign now!'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/google-ads-agentur', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: {
      de: ['Google Ads Agentur', 'Google Ads Agentur Wien', 'Google Werbung', 'AdWords Agentur', 'PPC Agentur', 'Google Shopping Agentur'],
      en: ['Google Ads Agency', 'Google Ads Agency Vienna', 'Google Advertising', 'AdWords Agency', 'PPC Agency', 'Google Shopping Agency'],
      ru: ['Агентство Google Ads', 'Агентство Google Ads Вена', 'Google реклама', 'Агентство AdWords', 'PPC агентство', 'Агентство Google Shopping'],
    }[locale as 'de' | 'en' | 'ru'] ?? ['Google Ads Agency', 'Google Ads Agency Vienna', 'Google Advertising', 'AdWords Agency', 'PPC Agency', 'Google Shopping Agency'],
    openGraph: {
      title: {
        de: 'Google Ads Agentur Wien',
        en: 'Google Ads Agency Vienna',
        ru: 'Агентство Google Ads Вена',
      }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads Agency Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/google-ads-agentur', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Google Ads Agentur' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/google-ads-agentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function GoogleAdsAgenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale as 'de' | 'en' | 'ru'] ?? 'Home', url: 'https://goldenwing.at' },
    { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/services' }[locale as 'de' | 'en' | 'ru'] ?? 'https://goldenwing.at/en/services' },
    { name: { de: 'Google Ads Agentur', en: 'Google Ads Agency', ru: 'Агентство Google Ads' }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads Agency', url: { de: 'https://goldenwing.at/leistungen/google-ads-agentur', en: 'https://goldenwing.at/en/services/google-ads-agency', ru: 'https://goldenwing.at/ru/services/google-ads-agency' }[locale as 'de' | 'en' | 'ru'] ?? 'https://goldenwing.at/en/services/google-ads-agency' },
  ]

  const heroData = {
    badge: { de: 'Google Ads Agentur', en: 'Google Ads Agency', ru: 'Агентство Google Ads' }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads Agency',
    title: { de: 'Google Ads Agentur Wien', en: 'Google Ads Agency Vienna', ru: 'Агентство Google Ads Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads Agency Vienna',
    subtitle: { de: 'Kampagnen, die konvertieren.', en: 'Campaigns that convert.', ru: 'Кампании, которые конвертируют.' }[locale as 'de' | 'en' | 'ru'] ?? 'Campaigns that convert.',
    description: { de: 'Professionelles Google Ads Management aus Wien. Kampagnen-Setup, laufende Optimierung, Remarketing und Shopping Ads. Google Partner mit nachweisbaren Ergebnissen.', en: 'Professional Google Ads management from Vienna. Campaign setup, ongoing optimization, remarketing, and Shopping Ads. Google Partner with proven results.', ru: 'Профессиональное управление Google Ads из Вены. Настройка кампаний, постоянная оптимизация, ремаркетинг и Shopping Ads. Google Partner с подтверждёнными результатами.' }[locale as 'de' | 'en' | 'ru'] ?? 'Professional Google Ads management from Vienna. Campaign setup, ongoing optimization, remarketing, and Shopping Ads. Google Partner with proven results.',
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

  const servicesTitle = { de: 'Unsere Google Ads Leistungen', en: 'Our Google Ads Services', ru: 'Наши услуги Google Ads' }[locale as 'de' | 'en' | 'ru'] ?? 'Our Google Ads Services'
  const servicesDescription = { de: 'Von Kampagnen-Setup bis laufende Optimierung - alles fuer Ihren Google Ads Erfolg.', en: 'From campaign setup to ongoing optimization - everything for your Google Ads success.', ru: 'От настройки кампаний до постоянной оптимизации - всё для вашего успеха в Google Ads.' }[locale as 'de' | 'en' | 'ru'] ?? 'From campaign setup to ongoing optimization - everything for your Google Ads success.'
  const pricingTitle = { de: 'Google Ads Pakete', en: 'Google Ads Packages', ru: 'Пакеты Google Ads' }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads Packages'
  const pricingDescription = { de: 'Transparente Preise fuer professionelles Google Ads Management.', en: 'Transparent pricing for professional Google Ads management.', ru: 'Прозрачные цены на профессиональное управление Google Ads.' }[locale as 'de' | 'en' | 'ru'] ?? 'Transparent pricing for professional Google Ads management.'
  const processTitle = { de: 'Unser Vorgehen', en: 'Our Approach', ru: 'Наш подход' }[locale as 'de' | 'en' | 'ru'] ?? 'Our Approach'
  const processDescription = { de: 'Strukturierter Prozess fuer erfolgreiche Google Ads Kampagnen.', en: 'Structured process for successful Google Ads campaigns.', ru: 'Структурированный процесс для успешных кампаний Google Ads.' }[locale as 'de' | 'en' | 'ru'] ?? 'Structured process for successful Google Ads campaigns.'
  const faqTitle = { de: 'Haeufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale as 'de' | 'en' | 'ru'] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer mehr Conversions?', en: 'Ready for More Conversions?', ru: 'Готовы к большему количеству конверсий?' }[locale as 'de' | 'en' | 'ru'] ?? 'Ready for More Conversions?'
  const ctaDescription = { de: 'Lassen Sie uns Ihr aktuelles Google Ads Konto analysieren - kostenlos und unverbindlich.', en: 'Let us analyze your current Google Ads account - free and non-binding.', ru: 'Позвольте нам проанализировать ваш текущий аккаунт Google Ads - бесплатно и без обязательств.' }[locale as 'de' | 'en' | 'ru'] ?? 'Let us analyze your current Google Ads account - free and non-binding.'
  const ctaButton = { de: 'Kostenloses Audit anfordern', en: 'Request Free Audit', ru: 'Запросить бесплатный аудит' }[locale as 'de' | 'en' | 'ru'] ?? 'Request Free Audit'
  const uspsTitle = { de: 'Warum wir', en: 'Why Choose Us', ru: 'Почему мы' }[locale as 'de' | 'en' | 'ru'] ?? 'Why Choose Us'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Google Ads Agentur Wien', en: 'Google Ads Agency Vienna', ru: 'Агентство Google Ads Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Google Ads Agency Vienna',
    alternateName: { de: 'Google Werbung Agentur Wien', en: 'Google Advertising Agency Vienna', ru: 'Рекламное агентство Google Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Google Advertising Agency Vienna',
    url: 'https://goldenwing.at/leistungen/google-ads-agentur',
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
    description: { de: 'Professionelles Google Ads Management in Wien. Kampagnen-Setup, Optimierung, Remarketing und Shopping Ads.', en: 'Professional Google Ads management in Vienna. Campaign setup, optimization, remarketing, and Shopping Ads.', ru: 'Профессиональное управление Google Ads в Вене. Настройка кампаний, оптимизация, ремаркетинг и Shopping Ads.' }[locale as 'de' | 'en' | 'ru'] ?? 'Professional Google Ads management in Vienna. Campaign setup, optimization, remarketing, and Shopping Ads.',
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
      <BreadcrumbListSchema items={breadcrumbs} />
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
                <NextLink href="#pakete">{heroData.ctaSecondary}</NextLink>
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

      {/* USPs */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{uspsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((usp: { title: string; description: string }) => (
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
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: { icon: string; title: string; description: string }) => {
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
      <section id="pakete" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg: { name: string; price: string; priceType: string; description: string; popular: boolean; features: string[] }) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale as 'de' | 'en' | 'ru'] ?? 'Most Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">{pkg.priceType} </span>
                    <span className="text-3xl font-bold">€{pkg.price}</span>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Request', ru: 'Запросить' }[locale as 'de' | 'en' | 'ru'] ?? 'Request'}</NextLink>
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
            {relatedServices.map((service: { title: string; description: string; href: string }) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  {/* @ts-expect-error CMS data properly typed via satisfies */}
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
