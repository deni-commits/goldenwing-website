import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Search, TrendingUp, Target, BarChart3, Globe, FileText, CheckCircle, Phone, LucideIcon } from 'lucide-react'
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
  'file-text': FileText,
  'target': Target,
  'globe': Globe,
  'bar-chart-3': BarChart3,
  'trending-up': TrendingUp,
}

// Default content for Linz SEO
const defaultContent = {
  de: {
    metaTitle: 'SEO Agentur Linz | Suchmaschinenoptimierung Oberoesterreich',
    metaDescription: 'SEO Agentur in Linz. Lokale Suchmaschinenoptimierung fuer oberoesterreichische Unternehmen. Mehr Sichtbarkeit, bessere Rankings, mehr Kunden aus der Region.',
    keywords: ['SEO Agentur Linz', 'Suchmaschinenoptimierung Linz', 'SEO Linz', 'Google Optimierung Linz', 'Local SEO Oberoesterreich', 'SEO Oberoesterreich'],
    heroTitle: 'SEO Agentur Linz – Mehr Sichtbarkeit in Oberoesterreich',
    heroDescription: 'Wir bringen Ihr Unternehmen in Linz und Oberoesterreich an die Spitze der Google-Suchergebnisse. Lokale SEO-Strategien fuer nachhaltig mehr Kunden aus Ihrer Region.',
    heroBadge: 'SEO Agentur Linz',
    ctaPrimary: 'Kostenlose SEO-Analyse',
    ctaSecondary: 'SEO-Pakete ansehen',
  },
  en: {
    metaTitle: 'SEO Agency Linz | Search Engine Optimization Upper Austria',
    metaDescription: 'SEO agency in Linz. Local search engine optimization for Upper Austrian businesses. More visibility, better rankings, more customers from your region.',
    keywords: ['SEO Agency Linz', 'Search Engine Optimization Linz', 'SEO Linz', 'Google Optimization Linz', 'Local SEO Upper Austria'],
    heroTitle: 'SEO Agency Linz – More Visibility in Upper Austria',
    heroDescription: 'We bring your business in Linz and Upper Austria to the top of Google search results. Local SEO strategies for sustainable customer acquisition from your region.',
    heroBadge: 'SEO Agency Linz',
    ctaPrimary: 'Free SEO Analysis',
    ctaSecondary: 'View SEO Packages',
  },
  ru: {
    metaTitle: 'SEO-агентство Линц | Поисковая оптимизация Верхняя Австрия',
    metaDescription: 'SEO-агентство в Линце. Локальная поисковая оптимизация для компаний Верхней Австрии. Больше видимости, лучшие позиции в поиске, больше клиентов из вашего региона.',
    keywords: ['SEO-агентство Линц', 'Поисковая оптимизация Линц', 'SEO Линц', 'Оптимизация Google Линц', 'Локальное SEO Верхняя Австрия'],
    heroTitle: 'SEO-агентство Линц – Больше видимости в Верхней Австрии',
    heroDescription: 'Мы выводим ваш бизнес в Линце и Верхней Австрии на вершину результатов поиска Google. Локальные SEO-стратегии для устойчивого привлечения клиентов из вашего региона.',
    heroBadge: 'SEO-агентство Линц',
    ctaPrimary: 'Бесплатный SEO-анализ',
    ctaSecondary: 'Смотреть SEO-пакеты',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Technisches SEO', description: 'Core Web Vitals, Seitengeschwindigkeit, Mobile-First und Indexierung fuer Linzer Websites optimieren.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword-Recherche fuer den oberoesterreichischen Markt, Content-Strategie und SEO-Texte.' },
    { icon: 'target', title: 'Local SEO Linz', description: 'Google Business Profile, lokale Keywords wie "Ihr Service + Linz" und Branchenverzeichnisse.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink-Aufbau mit Fokus auf oesterreichische und oberoesterreichische Quellen.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Umfassende Analyse Ihrer Website mit konkreten Handlungsempfehlungen.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Laufende Ueberwachung Ihrer Rankings in Linz und Oberoesterreich.' },
  ],
  en: [
    { icon: 'search', title: 'Technical SEO', description: 'Core Web Vitals, page speed, mobile-first and indexing optimization for Linz websites.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword research for the Upper Austrian market, content strategy and SEO copywriting.' },
    { icon: 'target', title: 'Local SEO Linz', description: 'Google Business Profile, local keywords like "your service + Linz" and business directories.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink building with focus on Austrian and Upper Austrian sources.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Comprehensive analysis of your website with concrete action recommendations.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Ongoing monitoring of your rankings in Linz and Upper Austria.' },
  ],
  ru: [
    { icon: 'search', title: 'Техническое SEO', description: 'Оптимизация Core Web Vitals, скорости загрузки, Mobile-First и индексации для сайтов Линца.' },
    { icon: 'file-text', title: 'Контентное SEO', description: 'Исследование ключевых слов для рынка Верхней Австрии, контент-стратегия и SEO-тексты.' },
    { icon: 'target', title: 'Локальное SEO Линц', description: 'Google Business Profile, локальные ключевые слова типа "ваша услуга + Линц" и бизнес-каталоги.' },
    { icon: 'globe', title: 'Внешнее SEO', description: 'Построение ссылочной массы с фокусом на австрийские и верхнеавстрийские источники.' },
    { icon: 'bar-chart-3', title: 'SEO-аудит', description: 'Комплексный анализ вашего сайта с конкретными рекомендациями по улучшению.' },
    { icon: 'trending-up', title: 'SEO-мониторинг', description: 'Постоянный мониторинг ваших позиций в поиске в Линце и Верхней Австрии.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEO Audit', price: '490', priceType: 'einmalig', description: 'Umfassende Analyse Ihrer Website', popular: false, features: ['Technische SEO-Analyse', 'Keyword-Recherche Linz/OOe', 'Wettbewerbsanalyse', 'Content-Audit', 'Backlink-Analyse', 'Priorisierte Massnahmenliste'] },
    { name: 'SEO Starter', price: '790', priceType: 'pro Monat', description: 'Fuer lokale Linzer Unternehmen', popular: false, features: ['Bis zu 10 Keywords', 'OnPage-Optimierung', 'Local SEO Linz', 'Google Business Profile', 'Monatliches Reporting', '3 Stunden Support/Monat'] },
    { name: 'SEO Business', price: '1.490', priceType: 'pro Monat', description: 'Fuer wachsende OOe Unternehmen', popular: true, features: ['Bis zu 30 Keywords', 'Vollstaendige OnPage-Optimierung', 'Content-Erstellung (2 Artikel/Monat)', 'Technisches SEO', 'Link-Building regional', 'Detailliertes Reporting', '8 Stunden Support/Monat'] },
    { name: 'SEO Enterprise', price: '2.990+', priceType: 'pro Monat', description: 'Fuer grosse Industrieunternehmen', popular: false, features: ['Unbegrenzte Keywords', 'Dedizierter SEO-Manager', 'Content-Strategie & Erstellung', 'Aggressives Link-Building', 'Ueberregionales SEO', 'Conversion-Optimierung', 'Woechentliche Calls'] },
  ],
  en: [
    { name: 'SEO Audit', price: '490', priceType: 'one-time', description: 'Comprehensive analysis of your website', popular: false, features: ['Technical SEO analysis', 'Keyword research Linz/Upper Austria', 'Competitor analysis', 'Content audit', 'Backlink analysis', 'Prioritized action list'] },
    { name: 'SEO Starter', price: '790', priceType: 'per month', description: 'For local Linz businesses', popular: false, features: ['Up to 10 keywords', 'OnPage optimization', 'Local SEO Linz', 'Google Business Profile', 'Monthly reporting', '3 hours support/month'] },
    { name: 'SEO Business', price: '1,490', priceType: 'per month', description: 'For growing Upper Austrian companies', popular: true, features: ['Up to 30 keywords', 'Complete OnPage optimization', 'Content creation (2 articles/month)', 'Technical SEO', 'Regional link building', 'Detailed reporting', '8 hours support/month'] },
    { name: 'SEO Enterprise', price: '2,990+', priceType: 'per month', description: 'For large industrial companies', popular: false, features: ['Unlimited keywords', 'Dedicated SEO manager', 'Content strategy & creation', 'Aggressive link building', 'Cross-regional SEO', 'Conversion optimization', 'Weekly calls'] },
  ],
  ru: [
    { name: 'SEO-аудит', price: '490', priceType: 'единоразово', description: 'Комплексный анализ вашего сайта', popular: false, features: ['Технический SEO-анализ', 'Исследование ключевых слов Линц/Верхняя Австрия', 'Анализ конкурентов', 'Контент-аудит', 'Анализ ссылочной массы', 'Приоритизированный план действий'] },
    { name: 'SEO Starter', price: '790', priceType: 'в месяц', description: 'Для локальных компаний Линца', popular: false, features: ['До 10 ключевых слов', 'OnPage-оптимизация', 'Локальное SEO Линц', 'Google Business Profile', 'Ежемесячная отчетность', '3 часа поддержки/месяц'] },
    { name: 'SEO Business', price: '1 490', priceType: 'в месяц', description: 'Для растущих компаний Верхней Австрии', popular: true, features: ['До 30 ключевых слов', 'Полная OnPage-оптимизация', 'Создание контента (2 статьи/месяц)', 'Техническое SEO', 'Региональное линкбилдинг', 'Детальная отчетность', '8 часов поддержки/месяц'] },
    { name: 'SEO Enterprise', price: '2 990+', priceType: 'в месяц', description: 'Для крупных промышленных компаний', popular: false, features: ['Неограниченное количество ключевых слов', 'Выделенный SEO-менеджер', 'Контент-стратегия и создание', 'Агрессивный линкбилдинг', 'Межрегиональное SEO', 'Оптимизация конверсий', 'Еженедельные созвоны'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+195%', label: 'Mehr organischer Traffic', client: 'Industriezulieferer Linz' },
    { metric: 'Top 3', label: 'Rankings fuer "Maschinenbau Linz"', client: 'Produktionsunternehmen' },
    { metric: '+240%', label: 'Mehr B2B-Anfragen', client: 'OOe Dienstleister' },
  ],
  en: [
    { metric: '+195%', label: 'More organic traffic', client: 'Industrial supplier Linz' },
    { metric: 'Top 3', label: 'Rankings for "mechanical engineering Linz"', client: 'Manufacturing company' },
    { metric: '+240%', label: 'More B2B inquiries', client: 'Upper Austrian service provider' },
  ],
  ru: [
    { metric: '+195%', label: 'Больше органического трафика', client: 'Промышленный поставщик Линц' },
    { metric: 'Топ 3', label: 'Позиции по запросу "машиностроение Линц"', client: 'Производственная компания' },
    { metric: '+240%', label: 'Больше B2B-запросов', client: 'Поставщик услуг Верхней Австрии' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Wie lange dauert SEO in Linz, bis Ergebnisse sichtbar sind?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen in den lokalen Suchergebnissen fuer Linz sehen Sie oft nach 3-4 Monaten. Signifikante Top-Rankings erreichen wir typischerweise nach 6-12 Monaten kontinuierlicher Optimierung.' },
    { question: 'Was kostet SEO in Linz?', answer: 'Unsere SEO-Pakete starten bei 790 Euro pro Monat fuer lokale Linzer Unternehmen. Business-Pakete liegen bei 1.490 Euro pro Monat. Ein einmaliger SEO-Audit kostet 490 Euro. Die Kosten haengen von Ihren Zielen und der Wettbewerbssituation ab.' },
    { question: 'Warum ist Local SEO fuer Linzer Unternehmen wichtig?', answer: 'Ueber 46% aller Google-Suchen haben lokale Absicht. Wenn potenzielle Kunden "Ihr Service + Linz" oder "Industriebedarf Oberoesterreich" suchen, muessen Sie gefunden werden. Local SEO optimiert Ihr Google Business Profile und sorgt fuer Sichtbarkeit in Google Maps.' },
    { question: 'Koennt ihr auch fuer ganz Oberoesterreich optimieren?', answer: 'Ja, wir optimieren nicht nur fuer Linz, sondern auch fuer ganz Oberoesterreich. Ob Wels, Steyr, Braunau oder andere Staedte – wir entwickeln eine regionale SEO-Strategie fuer Ihre Zielmaerkte.' },
    { question: 'Wie unterscheidet sich SEO fuer Industrieunternehmen in Linz?', answer: 'B2B-SEO fuer die oberoesterreichische Industrie fokussiert auf Branchen-Keywords wie "Stahlverarbeitung Linz" oder "Maschinenbau Oberoesterreich". Wir verstehen die industrielle Landschaft OOes und entwickeln Content-Strategien fuer laengere B2B-Kaufzyklen.' },
  ],
  en: [
    { question: 'How long does SEO in Linz take to show results?', answer: 'SEO is a long-term strategy. You often see first improvements in local search results for Linz after 3-4 months. We typically achieve significant top rankings after 6-12 months of continuous optimization.' },
    { question: 'How much does SEO in Linz cost?', answer: 'Our SEO packages start at 790 euros per month for local Linz businesses. Business packages are 1,490 euros per month. A one-time SEO audit costs 490 euros. Costs depend on your goals and competitive situation.' },
    { question: 'Why is Local SEO important for Linz businesses?', answer: 'Over 46% of all Google searches have local intent. When potential customers search for "your service + Linz" or "industrial supplies Upper Austria", you need to be found. Local SEO optimizes your Google Business Profile and ensures visibility in Google Maps.' },
    { question: 'Can you optimize for all of Upper Austria?', answer: 'Yes, we optimize not only for Linz but for all of Upper Austria. Whether Wels, Steyr, Braunau or other cities – we develop a regional SEO strategy for your target markets.' },
    { question: 'How does SEO differ for industrial companies in Linz?', answer: 'B2B SEO for Upper Austrian industry focuses on industry keywords like "steel processing Linz" or "mechanical engineering Upper Austria". We understand the industrial landscape of Upper Austria and develop content strategies for longer B2B purchase cycles.' },
  ],
  ru: [
    { question: 'Сколько времени нужно для SEO в Линце, чтобы увидеть результаты?', answer: 'SEO - это долгосрочная стратегия. Первые улучшения в локальных результатах поиска для Линца вы часто видите через 3-4 месяца. Значительные топовые позиции мы обычно достигаем через 6-12 месяцев непрерывной оптимизации.' },
    { question: 'Сколько стоит SEO в Линце?', answer: 'Наши SEO-пакеты начинаются от 790 евро в месяц для локальных компаний Линца. Бизнес-пакеты стоят 1 490 евро в месяц. Единоразовый SEO-аудит стоит 490 евро. Стоимость зависит от ваших целей и конкурентной ситуации.' },
    { question: 'Почему локальное SEO важно для компаний Линца?', answer: 'Более 46% всех поисковых запросов в Google имеют локальное намерение. Когда потенциальные клиенты ищут "ваша услуга + Линц" или "промышленные товары Верхняя Австрия", вас должны найти. Локальное SEO оптимизирует ваш Google Business Profile и обеспечивает видимость в Google Maps.' },
    { question: 'Можете ли вы оптимизировать для всей Верхней Австрии?', answer: 'Да, мы оптимизируем не только для Линца, но и для всей Верхней Австрии. Будь то Вельс, Штайр, Браунау или другие города - мы разрабатываем региональную SEO-стратегию для ваших целевых рынков.' },
    { question: 'Чем отличается SEO для промышленных компаний в Линце?', answer: 'B2B SEO для верхнеавстрийской промышленности фокусируется на отраслевых ключевых словах, таких как "обработка стали Линц" или "машиностроение Верхняя Австрия". Мы понимаем промышленный ландшафт Верхней Австрии и разрабатываем контент-стратегии для более длительных B2B-циклов покупки.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'SEO-Audit und Ist-Zustand Ihrer Linzer Website' },
    { step: '02', title: 'Strategie', description: 'Keywords und Massnahmen fuer Oberoesterreich' },
    { step: '03', title: 'OnPage', description: 'Technische und inhaltliche Optimierung' },
    { step: '04', title: 'Content', description: 'SEO-Texte fuer den regionalen Markt' },
    { step: '05', title: 'Monitoring', description: 'Rankings ueberwachen und optimieren' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'SEO audit and current state of your Linz website' },
    { step: '02', title: 'Strategy', description: 'Keywords and measures for Upper Austria' },
    { step: '03', title: 'OnPage', description: 'Technical and content optimization' },
    { step: '04', title: 'Content', description: 'SEO copy for the regional market' },
    { step: '05', title: 'Monitoring', description: 'Monitor and optimize rankings' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'SEO-аудит и текущее состояние вашего сайта в Линце' },
    { step: '02', title: 'Стратегия', description: 'Ключевые слова и меры для Верхней Австрии' },
    { step: '03', title: 'OnPage', description: 'Техническая и контентная оптимизация' },
    { step: '04', title: 'Контент', description: 'SEO-тексты для регионального рынка' },
    { step: '05', title: 'Мониторинг', description: 'Отслеживание и оптимизация позиций в поиске' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Linz', description: 'SEO-optimierte Websites fuer oberoesterreichische Unternehmen.', href: '/webdesign-linz' },
    { title: 'Online Marketing Linz', description: 'Ganzheitliches digitales Marketing fuer OOe.', href: '/online-marketing-agentur-linz' },
    { title: 'Google Ads', description: 'Schnelle Ergebnisse mit bezahlter Werbung bei Google.', href: '/leistungen/digital-marketing' },
  ],
  en: [
    { title: 'Web Design Linz', description: 'SEO-optimized websites for Upper Austrian businesses.', href: '/webdesign-linz' },
    { title: 'Online Marketing Linz', description: 'Holistic digital marketing for Upper Austria.', href: '/online-marketing-agentur-linz' },
    { title: 'Google Ads', description: 'Quick results with paid advertising on Google.', href: '/leistungen/digital-marketing' },
  ],
  ru: [
    { title: 'Веб-дизайн Линц', description: 'SEO-оптимизированные сайты для компаний Верхней Австрии.', href: '/webdesign-linz' },
    { title: 'Онлайн-маркетинг Линц', description: 'Комплексный цифровой маркетинг для Верхней Австрии.', href: '/online-marketing-agentur-linz' },
    { title: 'Google Ads', description: 'Быстрые результаты с платной рекламой в Google.', href: '/leistungen/digital-marketing' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/seo-agentur-linz', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/seo-agentur-linz', locale),
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
      canonical: getCanonicalUrl('/seo-agentur-linz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoAgenturLinzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const common = await getTranslations({ locale, namespace: 'common' })

  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const results = defaultResults[locale as SupportedLocale] ?? defaultResults['en']
  const services = defaultServices[locale as SupportedLocale] ?? defaultServices['en']
  const packages = defaultPackages[locale as SupportedLocale] ?? defaultPackages['en']
  const process = defaultProcess[locale as SupportedLocale] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as SupportedLocale] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as SupportedLocale] ?? defaultRelatedServices['en']

  const servicesTitle = { de: 'Unsere SEO-Leistungen fuer Linz', en: 'Our SEO Services for Linz', ru: 'Наши SEO-услуги для Линца' }[locale] ?? 'Our SEO Services for Linz'
  const servicesDescription = { de: 'Umfassende Suchmaschinenoptimierung fuer oberoesterreichische Unternehmen.', en: 'Comprehensive search engine optimization for Upper Austrian businesses.', ru: 'Комплексная поисковая оптимизация для компаний Верхней Австрии.' }[locale] ?? 'Comprehensive search engine optimization for Upper Austrian businesses.'
  const pricingTitle = { de: 'SEO Linz Pakete', en: 'SEO Linz Packages', ru: 'SEO-пакеты Линц' }[locale] ?? 'SEO Linz Packages'
  const pricingDescription = { de: 'Transparente Preise fuer oberoesterreichische Unternehmen.', en: 'Transparent pricing for Upper Austrian businesses.', ru: 'Прозрачные цены для компаний Верхней Австрии.' }[locale] ?? 'Transparent pricing for Upper Austrian businesses.'
  const processTitle = { de: 'Unser SEO-Prozess', en: 'Our SEO Process', ru: 'Наш SEO-процесс' }[locale] ?? 'Our SEO Process'
  const processDescription = { de: 'Strukturierte Vorgehensweise fuer messbare Ergebnisse in Linz.', en: 'Structured approach for measurable results in Linz.', ru: 'Структурированный подход для измеримых результатов в Линце.' }[locale] ?? 'Structured approach for measurable results in Linz.'
  const faqTitle = { de: 'Haeufige Fragen zu SEO in Linz', en: 'Frequently Asked Questions about SEO in Linz', ru: 'Часто задаваемые вопросы о SEO в Линце' }[locale] ?? 'Frequently Asked Questions about SEO in Linz'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer bessere Rankings in Linz?', en: 'Ready for Better Rankings in Linz?', ru: 'Готовы к лучшим позициям в поиске в Линце?' }[locale] ?? 'Ready for Better Rankings in Linz?'
  const ctaDescription = { de: 'Kostenlose SEO-Analyse Ihrer Website. Wir zeigen Ihnen, wo Sie in Linz und Oberoesterreich stehen.', en: 'Free SEO analysis of your website. We show you where you stand in Linz and Upper Austria.', ru: 'Бесплатный SEO-анализ вашего сайта. Мы покажем вам, где вы находитесь в Линце и Верхней Австрии.' }[locale] ?? 'Free SEO analysis of your website. We show you where you stand in Linz and Upper Austria.'
  const ctaButton = { de: 'Kostenlose Analyse anfordern', en: 'Request Free Analysis', ru: 'Запросить бесплатный анализ' }[locale] ?? 'Request Free Analysis'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'SEO Agentur Linz', en: 'SEO Agency Linz', ru: 'SEO-агентство Линц' }[locale] ?? 'SEO Agency Linz',
    alternateName: { de: 'Suchmaschinenoptimierung Linz', en: 'Search Engine Optimization Linz', ru: 'Поисковая оптимизация Линц' }[locale] ?? 'Search Engine Optimization Linz',
    url: 'https://goldenwing.at/seo-agentur-linz',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'City', name: 'Linz' },
      { '@type': 'State', name: 'Oberoesterreich' },
    ],
    description: { de: 'Professionelle Suchmaschinenoptimierung in Linz. Local SEO, technisches SEO und Content-Strategie fuer bessere Google-Rankings in Oberoesterreich.', en: 'Professional search engine optimization in Linz. Local SEO, technical SEO and content strategy for better Google rankings in Upper Austria.', ru: 'Профессиональная поисковая оптимизация в Линце. Локальное SEO, техническое SEO и контент-стратегия для лучших позиций в Google в Верхней Австрии.' }[locale] ?? 'Professional search engine optimization in Linz. Local SEO, technical SEO and content strategy for better Google rankings in Upper Austria.',
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

      {/* Services */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
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
            {packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Empfohlen', en: 'Recommended', ru: 'Рекомендуется' }[locale] ?? 'Recommended'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Inquire', ru: 'Запросить' }[locale] ?? 'Inquire'}</NextLink>
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
