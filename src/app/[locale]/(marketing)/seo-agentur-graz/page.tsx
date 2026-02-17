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

// Default content for Graz SEO
const defaultContent = {
  de: {
    metaTitle: 'SEO Agentur Graz | Suchmaschinenoptimierung Steiermark',
    metaDescription: 'SEO Agentur in Graz. Lokale Suchmaschinenoptimierung fuer steirische Unternehmen. Mehr Sichtbarkeit, bessere Rankings, mehr Kunden aus der Region.',
    keywords: ['SEO Agentur Graz', 'Suchmaschinenoptimierung Graz', 'SEO Graz', 'Google Optimierung Graz', 'Local SEO Steiermark', 'SEO Steiermark'],
    heroTitle: 'SEO Agentur Graz – Mehr Sichtbarkeit in der Steiermark',
    heroDescription: 'Wir bringen Ihr Unternehmen in Graz und der Steiermark an die Spitze der Google-Suchergebnisse. Lokale SEO-Strategien fuer nachhaltig mehr Kunden aus Ihrer Region.',
    heroBadge: 'SEO Agentur Graz',
    ctaPrimary: 'Kostenlose SEO-Analyse',
    ctaSecondary: 'SEO-Pakete ansehen',
  },
  en: {
    metaTitle: 'SEO Agency Graz | Search Engine Optimization Styria',
    metaDescription: 'SEO agency in Graz. Local search engine optimization for Styrian businesses. More visibility, better rankings, more customers from your region.',
    keywords: ['SEO Agency Graz', 'Search Engine Optimization Graz', 'SEO Graz', 'Google Optimization Graz', 'Local SEO Styria'],
    heroTitle: 'SEO Agency Graz – More Visibility in Styria',
    heroDescription: 'We bring your business in Graz and Styria to the top of Google search results. Local SEO strategies for sustainable customer acquisition from your region.',
    heroBadge: 'SEO Agency Graz',
    ctaPrimary: 'Free SEO Analysis',
    ctaSecondary: 'View SEO Packages',
  },
  ru: {
    metaTitle: 'SEO Агентство Грац | Поисковая оптимизация Штирия',
    metaDescription: 'SEO агентство в Граце. Локальная поисковая оптимизация для штирийских компаний. Больше видимости, лучшие позиции, больше клиентов из вашего региона.',
    keywords: ['SEO Агентство Грац', 'Поисковая оптимизация Грац', 'SEO Грац', 'Google оптимизация Грац', 'Локальное SEO Штирия'],
    heroTitle: 'SEO Агентство Грац – Больше видимости в Штирии',
    heroDescription: 'Мы выводим ваш бизнес в Граце и Штирии на вершину результатов поиска Google. Локальные SEO-стратегии для устойчивого привлечения клиентов из вашего региона.',
    heroBadge: 'SEO Агентство Грац',
    ctaPrimary: 'Бесплатный SEO-анализ',
    ctaSecondary: 'Смотреть SEO-пакеты',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Technisches SEO', description: 'Core Web Vitals, Seitengeschwindigkeit, Mobile-First und Indexierung fuer Grazer Websites optimieren.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword-Recherche fuer den steirischen Markt, Content-Strategie und SEO-Texte.' },
    { icon: 'target', title: 'Local SEO Graz', description: 'Google Business Profile, lokale Keywords wie "Ihr Service + Graz" und Branchenverzeichnisse.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink-Aufbau mit Fokus auf oesterreichische und steirische Quellen.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Umfassende Analyse Ihrer Website mit konkreten Handlungsempfehlungen.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Laufende Ueberwachung Ihrer Rankings in Graz und der Steiermark.' },
  ],
  en: [
    { icon: 'search', title: 'Technical SEO', description: 'Core Web Vitals, page speed, mobile-first and indexing optimization for Graz websites.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword research for the Styrian market, content strategy and SEO copywriting.' },
    { icon: 'target', title: 'Local SEO Graz', description: 'Google Business Profile, local keywords like "your service + Graz" and business directories.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink building with focus on Austrian and Styrian sources.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Comprehensive analysis of your website with concrete action recommendations.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Ongoing monitoring of your rankings in Graz and Styria.' },
  ],
  ru: [
    { icon: 'search', title: 'Техническое SEO', description: 'Оптимизация Core Web Vitals, скорости загрузки, Mobile-First и индексации для сайтов в Граце.' },
    { icon: 'file-text', title: 'Контент SEO', description: 'Исследование ключевых слов для штирийского рынка, контент-стратегия и SEO-тексты.' },
    { icon: 'target', title: 'Локальное SEO Грац', description: 'Google Business Profile, локальные ключевые слова типа "ваша услуга + Грац" и бизнес-каталоги.' },
    { icon: 'globe', title: 'Внешнее SEO', description: 'Построение ссылочной массы с фокусом на австрийские и штирийские источники.' },
    { icon: 'bar-chart-3', title: 'SEO Аудит', description: 'Комплексный анализ вашего сайта с конкретными рекомендациями по действиям.' },
    { icon: 'trending-up', title: 'SEO Мониторинг', description: 'Постоянный мониторинг ваших позиций в Граце и Штирии.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEO Audit', price: '490', priceType: 'einmalig', description: 'Umfassende Analyse Ihrer Website', popular: false, features: ['Technische SEO-Analyse', 'Keyword-Recherche Graz/Steiermark', 'Wettbewerbsanalyse', 'Content-Audit', 'Backlink-Analyse', 'Priorisierte Massnahmenliste'] },
    { name: 'SEO Starter', price: '790', priceType: 'pro Monat', description: 'Fuer lokale Grazer Unternehmen', popular: false, features: ['Bis zu 10 Keywords', 'OnPage-Optimierung', 'Local SEO Graz', 'Google Business Profile', 'Monatliches Reporting', '3 Stunden Support/Monat'] },
    { name: 'SEO Business', price: '1.490', priceType: 'pro Monat', description: 'Fuer wachsende steirische Unternehmen', popular: true, features: ['Bis zu 30 Keywords', 'Vollstaendige OnPage-Optimierung', 'Content-Erstellung (2 Artikel/Monat)', 'Technisches SEO', 'Link-Building regional', 'Detailliertes Reporting', '8 Stunden Support/Monat'] },
    { name: 'SEO Enterprise', price: '2.990+', priceType: 'pro Monat', description: 'Fuer grosse Unternehmen und E-Commerce', popular: false, features: ['Unbegrenzte Keywords', 'Dedizierter SEO-Manager', 'Content-Strategie & Erstellung', 'Aggressives Link-Building', 'Ueberregionales SEO', 'Conversion-Optimierung', 'Woechentliche Calls'] },
  ],
  en: [
    { name: 'SEO Audit', price: '490', priceType: 'one-time', description: 'Comprehensive analysis of your website', popular: false, features: ['Technical SEO analysis', 'Keyword research Graz/Styria', 'Competitor analysis', 'Content audit', 'Backlink analysis', 'Prioritized action list'] },
    { name: 'SEO Starter', price: '790', priceType: 'per month', description: 'For local Graz businesses', popular: false, features: ['Up to 10 keywords', 'OnPage optimization', 'Local SEO Graz', 'Google Business Profile', 'Monthly reporting', '3 hours support/month'] },
    { name: 'SEO Business', price: '1,490', priceType: 'per month', description: 'For growing Styrian companies', popular: true, features: ['Up to 30 keywords', 'Complete OnPage optimization', 'Content creation (2 articles/month)', 'Technical SEO', 'Regional link building', 'Detailed reporting', '8 hours support/month'] },
    { name: 'SEO Enterprise', price: '2,990+', priceType: 'per month', description: 'For large companies and e-commerce', popular: false, features: ['Unlimited keywords', 'Dedicated SEO manager', 'Content strategy & creation', 'Aggressive link building', 'Cross-regional SEO', 'Conversion optimization', 'Weekly calls'] },
  ],
  ru: [
    { name: 'SEO Аудит', price: '490', priceType: 'единоразово', description: 'Комплексный анализ вашего сайта', popular: false, features: ['Технический SEO-анализ', 'Исследование ключевых слов Грац/Штирия', 'Анализ конкурентов', 'Контент-аудит', 'Анализ обратных ссылок', 'Приоритизированный план действий'] },
    { name: 'SEO Стартер', price: '790', priceType: 'в месяц', description: 'Для локальных компаний Граца', popular: false, features: ['До 10 ключевых слов', 'OnPage-оптимизация', 'Локальное SEO Грац', 'Google Business Profile', 'Ежемесячный отчет', '3 часа поддержки/месяц'] },
    { name: 'SEO Бизнес', price: '1 490', priceType: 'в месяц', description: 'Для растущих штирийских компаний', popular: true, features: ['До 30 ключевых слов', 'Полная OnPage-оптимизация', 'Создание контента (2 статьи/месяц)', 'Техническое SEO', 'Региональное построение ссылок', 'Детальный отчет', '8 часов поддержки/месяц'] },
    { name: 'SEO Корпоративный', price: '2 990+', priceType: 'в месяц', description: 'Для крупных компаний и e-commerce', popular: false, features: ['Неограниченное количество ключевых слов', 'Выделенный SEO-менеджер', 'Контент-стратегия и создание', 'Агрессивное построение ссылок', 'Межрегиональное SEO', 'Оптимизация конверсий', 'Еженедельные созвоны'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+210%', label: 'Mehr organischer Traffic', client: 'Automotive-Zulieferer Graz' },
    { metric: 'Top 3', label: 'Rankings fuer "Webdesign Graz"', client: 'IT-Dienstleister' },
    { metric: '+180%', label: 'Mehr Anfragen', client: 'Steirisches KMU' },
  ],
  en: [
    { metric: '+210%', label: 'More organic traffic', client: 'Automotive supplier Graz' },
    { metric: 'Top 3', label: 'Rankings for "web design Graz"', client: 'IT service provider' },
    { metric: '+180%', label: 'More inquiries', client: 'Styrian SME' },
  ],
  ru: [
    { metric: '+210%', label: 'Больше органического трафика', client: 'Автомобильный поставщик Грац' },
    { metric: 'Топ 3', label: 'Позиции по "веб-дизайн Грац"', client: 'IT-провайдер' },
    { metric: '+180%', label: 'Больше заявок', client: 'Штирийский МСБ' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Wie lange dauert SEO in Graz, bis Ergebnisse sichtbar sind?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen in den lokalen Suchergebnissen fuer Graz sehen Sie oft nach 3-4 Monaten. Signifikante Top-Rankings erreichen wir typischerweise nach 6-12 Monaten kontinuierlicher Optimierung.' },
    { question: 'Was kostet SEO in Graz?', answer: 'Unsere SEO-Pakete starten bei 790 Euro pro Monat fuer lokale Grazer Unternehmen. Business-Pakete liegen bei 1.490 Euro pro Monat. Ein einmaliger SEO-Audit kostet 490 Euro. Die Kosten haengen von Ihren Zielen und der Wettbewerbssituation ab.' },
    { question: 'Warum ist Local SEO fuer Grazer Unternehmen wichtig?', answer: 'Ueber 46% aller Google-Suchen haben lokale Absicht. Wenn potenzielle Kunden "Ihr Service + Graz" suchen, muessen Sie gefunden werden. Local SEO optimiert Ihr Google Business Profile und sorgt fuer Sichtbarkeit in Google Maps.' },
    { question: 'Koennt ihr auch fuer die gesamte Steiermark optimieren?', answer: 'Ja, wir optimieren nicht nur fuer Graz, sondern auch fuer die gesamte Steiermark. Ob Leoben, Kapfenberg, Bruck an der Mur oder andere steirische Staedte – wir entwickeln eine regionale SEO-Strategie fuer Ihre Zielmaerkte.' },
    { question: 'Wie unterscheidet sich SEO fuer B2B-Unternehmen in Graz?', answer: 'B2B-SEO in Graz fokussiert auf Branchen-Keywords wie "Automotive Zulieferer Steiermark" oder "Maschinenbau Graz". Wir verstehen die steirische Industrielandschaft und entwickeln Content-Strategien fuer laengere B2B-Kaufzyklen.' },
  ],
  en: [
    { question: 'How long does SEO in Graz take to show results?', answer: 'SEO is a long-term strategy. You often see first improvements in local search results for Graz after 3-4 months. We typically achieve significant top rankings after 6-12 months of continuous optimization.' },
    { question: 'How much does SEO in Graz cost?', answer: 'Our SEO packages start at 790 euros per month for local Graz businesses. Business packages are 1,490 euros per month. A one-time SEO audit costs 490 euros. Costs depend on your goals and competitive situation.' },
    { question: 'Why is Local SEO important for Graz businesses?', answer: 'Over 46% of all Google searches have local intent. When potential customers search for "your service + Graz", you need to be found. Local SEO optimizes your Google Business Profile and ensures visibility in Google Maps.' },
    { question: 'Can you optimize for all of Styria?', answer: 'Yes, we optimize not only for Graz but for all of Styria. Whether Leoben, Kapfenberg, Bruck an der Mur or other Styrian cities – we develop a regional SEO strategy for your target markets.' },
    { question: 'How does SEO differ for B2B companies in Graz?', answer: 'B2B SEO in Graz focuses on industry keywords like "automotive supplier Styria" or "mechanical engineering Graz". We understand the Styrian industrial landscape and develop content strategies for longer B2B purchase cycles.' },
  ],
  ru: [
    { question: 'Сколько времени занимает SEO в Граце до появления результатов?', answer: 'SEO - это долгосрочная стратегия. Первые улучшения в локальных результатах поиска для Граца обычно видны через 3-4 месяца. Значительные топовые позиции мы достигаем, как правило, через 6-12 месяцев непрерывной оптимизации.' },
    { question: 'Сколько стоит SEO в Граце?', answer: 'Наши SEO-пакеты начинаются от 790 евро в месяц для локальных компаний Граца. Бизнес-пакеты стоят 1 490 евро в месяц. Единоразовый SEO-аудит стоит 490 евро. Стоимость зависит от ваших целей и конкурентной ситуации.' },
    { question: 'Почему локальное SEO важно для компаний Граца?', answer: 'Более 46% всех поисковых запросов Google имеют локальное намерение. Когда потенциальные клиенты ищут "ваша услуга + Грац", вы должны быть найдены. Локальное SEO оптимизирует ваш Google Business Profile и обеспечивает видимость в Google Maps.' },
    { question: 'Можете ли вы оптимизировать для всей Штирии?', answer: 'Да, мы оптимизируем не только для Граца, но и для всей Штирии. Будь то Леобен, Капфенберг, Брук-ан-дер-Мур или другие штирийские города - мы разрабатываем региональную SEO-стратегию для ваших целевых рынков.' },
    { question: 'Чем отличается SEO для B2B-компаний в Граце?', answer: 'B2B SEO в Граце фокусируется на отраслевых ключевых словах, таких как "автомобильный поставщик Штирия" или "машиностроение Грац". Мы понимаем штирийский промышленный ландшафт и разрабатываем контент-стратегии для более длительных B2B-циклов покупки.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'SEO-Audit und Ist-Zustand Ihrer Grazer Website' },
    { step: '02', title: 'Strategie', description: 'Keywords und Massnahmen fuer die Steiermark' },
    { step: '03', title: 'OnPage', description: 'Technische und inhaltliche Optimierung' },
    { step: '04', title: 'Content', description: 'SEO-Texte fuer den lokalen Markt' },
    { step: '05', title: 'Monitoring', description: 'Rankings ueberwachen und optimieren' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'SEO audit and current state of your Graz website' },
    { step: '02', title: 'Strategy', description: 'Keywords and measures for Styria' },
    { step: '03', title: 'OnPage', description: 'Technical and content optimization' },
    { step: '04', title: 'Content', description: 'SEO copy for the local market' },
    { step: '05', title: 'Monitoring', description: 'Monitor and optimize rankings' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'SEO-аудит и текущее состояние вашего сайта в Граце' },
    { step: '02', title: 'Стратегия', description: 'Ключевые слова и меры для Штирии' },
    { step: '03', title: 'OnPage', description: 'Техническая и контентная оптимизация' },
    { step: '04', title: 'Контент', description: 'SEO-тексты для локального рынка' },
    { step: '05', title: 'Мониторинг', description: 'Отслеживание и оптимизация позиций' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Graz', description: 'SEO-optimierte Websites fuer steirische Unternehmen.', href: '/webdesign-graz' },
    { title: 'Content Marketing', description: 'Hochwertige Inhalte, die ranken und konvertieren.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Schnelle Ergebnisse mit bezahlter Werbung bei Google.', href: '/leistungen/digital-marketing' },
  ],
  en: [
    { title: 'Web Design Graz', description: 'SEO-optimized websites for Styrian businesses.', href: '/webdesign-graz' },
    { title: 'Content Marketing', description: 'High-quality content that ranks and converts.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Quick results with paid advertising on Google.', href: '/leistungen/digital-marketing' },
  ],
  ru: [
    { title: 'Веб-дизайн Грац', description: 'SEO-оптимизированные сайты для штирийских компаний.', href: '/webdesign-graz' },
    { title: 'Контент-маркетинг', description: 'Качественный контент, который ранжируется и конвертирует.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Быстрые результаты с платной рекламой в Google.', href: '/leistungen/digital-marketing' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/seo-agentur-graz', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/seo-agentur-graz', locale),
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
      canonical: getCanonicalUrl('/seo-agentur-graz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoAgenturGrazPage({ params }: { params: Promise<{ locale: string }> }) {
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

  const servicesTitle = { de: 'Unsere SEO-Leistungen fuer Graz', en: 'Our SEO Services for Graz', ru: 'Наши SEO-услуги для Граца' }[locale] ?? 'Our SEO Services for Graz'
  const servicesDescription = { de: 'Umfassende Suchmaschinenoptimierung fuer steirische Unternehmen.', en: 'Comprehensive search engine optimization for Styrian businesses.', ru: 'Комплексная поисковая оптимизация для штирийских компаний.' }[locale] ?? 'Comprehensive search engine optimization for Styrian businesses.'
  const pricingTitle = { de: 'SEO Graz Pakete', en: 'SEO Graz Packages', ru: 'SEO пакеты Грац' }[locale] ?? 'SEO Graz Packages'
  const pricingDescription = { de: 'Transparente Preise fuer steirische Unternehmen.', en: 'Transparent pricing for Styrian businesses.', ru: 'Прозрачные цены для штирийских компаний.' }[locale] ?? 'Transparent pricing for Styrian businesses.'
  const processTitle = { de: 'Unser SEO-Prozess', en: 'Our SEO Process', ru: 'Наш SEO-процесс' }[locale] ?? 'Our SEO Process'
  const processDescription = { de: 'Strukturierte Vorgehensweise fuer messbare Ergebnisse in Graz.', en: 'Structured approach for measurable results in Graz.', ru: 'Структурированный подход для измеримых результатов в Граце.' }[locale] ?? 'Structured approach for measurable results in Graz.'
  const faqTitle = { de: 'Haeufige Fragen zu SEO in Graz', en: 'Frequently Asked Questions about SEO in Graz', ru: 'Часто задаваемые вопросы о SEO в Граце' }[locale] ?? 'Frequently Asked Questions about SEO in Graz'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer bessere Rankings in Graz?', en: 'Ready for Better Rankings in Graz?', ru: 'Готовы к лучшим позициям в Граце?' }[locale] ?? 'Ready for Better Rankings in Graz?'
  const ctaDescription = { de: 'Kostenlose SEO-Analyse Ihrer Website. Wir zeigen Ihnen, wo Sie in Graz und der Steiermark stehen.', en: 'Free SEO analysis of your website. We show you where you stand in Graz and Styria.', ru: 'Бесплатный SEO-анализ вашего сайта. Мы покажем вам, где вы находитесь в Граце и Штирии.' }[locale] ?? 'Free SEO analysis of your website. We show you where you stand in Graz and Styria.'
  const ctaButton = { de: 'Kostenlose Analyse anfordern', en: 'Request Free Analysis', ru: 'Запросить бесплатный анализ' }[locale] ?? 'Request Free Analysis'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'SEO Agentur Graz', en: 'SEO Agency Graz', ru: 'SEO Агентство Грац' }[locale] ?? 'SEO Agency Graz',
    alternateName: { de: 'Suchmaschinenoptimierung Graz', en: 'Search Engine Optimization Graz', ru: 'Поисковая оптимизация Грац' }[locale] ?? 'Search Engine Optimization Graz',
    url: 'https://goldenwing.at/seo-agentur-graz',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'City', name: 'Graz' },
      { '@type': 'State', name: 'Steiermark' },
    ],
    description: { de: 'Professionelle Suchmaschinenoptimierung in Graz. Local SEO, technisches SEO und Content-Strategie fuer bessere Google-Rankings in der Steiermark.', en: 'Professional search engine optimization in Graz. Local SEO, technical SEO and content strategy for better Google rankings in Styria.', ru: 'Профессиональная поисковая оптимизация в Граце. Локальное SEO, техническое SEO и контент-стратегия для лучших позиций в Google в Штирии.' }[locale] ?? 'Professional search engine optimization in Graz. Local SEO, technical SEO and content strategy for better Google rankings in Styria.',
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
                    <Badge>{{ de: 'Empfohlen', en: 'Recommended', ru: 'Рекомендуемый' }[locale] ?? 'Recommended'}</Badge>
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
