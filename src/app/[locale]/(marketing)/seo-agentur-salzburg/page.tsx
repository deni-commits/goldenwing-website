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

// Default content for Salzburg SEO
const defaultContent = {
  de: {
    metaTitle: 'SEO Agentur Salzburg | Suchmaschinenoptimierung Salzburger Land',
    metaDescription: 'SEO Agentur in Salzburg. Lokale Suchmaschinenoptimierung fuer Hotels, Tourismus und Salzburger Unternehmen. Mehr Gaeste, bessere Rankings, mehr Buchungen.',
    keywords: ['SEO Agentur Salzburg', 'Suchmaschinenoptimierung Salzburg', 'SEO Salzburg', 'Google Optimierung Salzburg', 'Local SEO Salzburg', 'Hotel SEO Salzburg'],
    heroTitle: 'SEO Agentur Salzburg – Mehr Gaeste durch bessere Rankings',
    heroDescription: 'Wir bringen Ihr Hotel, Restaurant oder Unternehmen in Salzburg an die Spitze der Google-Suchergebnisse. Lokale SEO-Strategien fuer nachhaltig mehr Buchungen und Kunden.',
    heroBadge: 'SEO Agentur Salzburg',
    ctaPrimary: 'Kostenlose SEO-Analyse',
    ctaSecondary: 'SEO-Pakete ansehen',
  },
  en: {
    metaTitle: 'SEO Agency Salzburg | Search Engine Optimization Salzburg Region',
    metaDescription: 'SEO agency in Salzburg. Local search engine optimization for hotels, tourism and Salzburg businesses. More guests, better rankings, more bookings.',
    keywords: ['SEO Agency Salzburg', 'Search Engine Optimization Salzburg', 'SEO Salzburg', 'Google Optimization Salzburg', 'Local SEO Salzburg', 'Hotel SEO Salzburg'],
    heroTitle: 'SEO Agency Salzburg – More Guests Through Better Rankings',
    heroDescription: 'We bring your hotel, restaurant or business in Salzburg to the top of Google search results. Local SEO strategies for sustainable bookings and customers.',
    heroBadge: 'SEO Agency Salzburg',
    ctaPrimary: 'Free SEO Analysis',
    ctaSecondary: 'View SEO Packages',
  },
  ru: {
    metaTitle: 'SEO Агентство Зальцбург | Поисковая оптимизация в регионе Зальцбург',
    metaDescription: 'SEO агентство в Зальцбурге. Локальная поисковая оптимизация для отелей, туризма и бизнеса Зальцбурга. Больше гостей, лучшие позиции, больше бронирований.',
    keywords: ['SEO агентство Зальцбург', 'Поисковая оптимизация Зальцбург', 'SEO Зальцбург', 'Google оптимизация Зальцбург', 'Локальное SEO Зальцбург', 'SEO для отелей Зальцбург'],
    heroTitle: 'SEO Агентство Зальцбург – Больше гостей благодаря лучшим позициям',
    heroDescription: 'Мы выводим ваш отель, ресторан или бизнес в Зальцбурге на вершину результатов поиска Google. Локальные SEO-стратегии для устойчивого роста бронирований и клиентов.',
    heroBadge: 'SEO Агентство Зальцбург',
    ctaPrimary: 'Бесплатный SEO-анализ',
    ctaSecondary: 'Посмотреть SEO-пакеты',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Technisches SEO', description: 'Core Web Vitals, Seitengeschwindigkeit, Mobile-First – wichtig fuer die mobile Suche von Touristen.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword-Recherche fuer den Salzburger Tourismus, Content-Strategie und mehrsprachige SEO-Texte.' },
    { icon: 'target', title: 'Local SEO Salzburg', description: 'Google Business Profile, Google Maps, lokale Keywords wie "Hotel Salzburg Altstadt" und Bewertungsmanagement.' },
    { icon: 'globe', title: 'International SEO', description: 'Mehrsprachige Optimierung fuer Gaeste aus Deutschland, Italien, USA und anderen Maerkten.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Umfassende Analyse Ihrer Hotel- oder Unternehmenswebsite mit konkreten Massnahmen.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Laufende Ueberwachung Ihrer Rankings – saisonale Anpassung fuer Festspielzeit und Wintersaison.' },
  ],
  en: [
    { icon: 'search', title: 'Technical SEO', description: 'Core Web Vitals, page speed, mobile-first – important for tourists searching on mobile.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword research for Salzburg tourism, content strategy and multilingual SEO copy.' },
    { icon: 'target', title: 'Local SEO Salzburg', description: 'Google Business Profile, Google Maps, local keywords like "Hotel Salzburg Old Town" and review management.' },
    { icon: 'globe', title: 'International SEO', description: 'Multilingual optimization for guests from Germany, Italy, USA and other markets.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Comprehensive analysis of your hotel or business website with concrete measures.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Ongoing monitoring of your rankings – seasonal adjustment for festival time and winter season.' },
  ],
  ru: [
    { icon: 'search', title: 'Техническое SEO', description: 'Core Web Vitals, скорость загрузки, Mobile-First – важно для мобильного поиска туристов.' },
    { icon: 'file-text', title: 'Контентное SEO', description: 'Исследование ключевых слов для туризма Зальцбурга, контент-стратегия и многоязычные SEO-тексты.' },
    { icon: 'target', title: 'Локальное SEO Зальцбург', description: 'Google Business Profile, Google Maps, локальные ключевые слова типа "Отель Зальцбург Старый город" и управление отзывами.' },
    { icon: 'globe', title: 'Международное SEO', description: 'Многоязычная оптимизация для гостей из Германии, Италии, США и других рынков.' },
    { icon: 'bar-chart-3', title: 'SEO Аудит', description: 'Комплексный анализ сайта вашего отеля или бизнеса с конкретными рекомендациями.' },
    { icon: 'trending-up', title: 'SEO Мониторинг', description: 'Постоянный мониторинг позиций – сезонная корректировка для фестивального и зимнего сезонов.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEO Audit', price: '490', priceType: 'einmalig', description: 'Umfassende Analyse Ihrer Website', popular: false, features: ['Technische SEO-Analyse', 'Keyword-Recherche Salzburg', 'Wettbewerbsanalyse', 'Content-Audit', 'Google Maps Analyse', 'Priorisierte Massnahmenliste'] },
    { name: 'SEO Starter', price: '790', priceType: 'pro Monat', description: 'Fuer kleine Hotels und lokale Unternehmen', popular: false, features: ['Bis zu 10 Keywords', 'OnPage-Optimierung', 'Local SEO Salzburg', 'Google Business Profile', 'Monatliches Reporting', '3 Stunden Support/Monat'] },
    { name: 'SEO Business', price: '1.490', priceType: 'pro Monat', description: 'Fuer Hotels und Tourismus-Unternehmen', popular: true, features: ['Bis zu 30 Keywords', 'Vollstaendige OnPage-Optimierung', 'Content-Erstellung (2 Artikel/Monat)', 'Mehrsprachige SEO (DE/EN)', 'Bewertungsmanagement', 'Detailliertes Reporting', '8 Stunden Support/Monat'] },
    { name: 'SEO Enterprise', price: '2.990+', priceType: 'pro Monat', description: 'Fuer grosse Hotels und Hotelketten', popular: false, features: ['Unbegrenzte Keywords', 'Dedizierter SEO-Manager', 'Content-Strategie 5+ Sprachen', 'Aggressives Link-Building', 'Konkurrenz-Monitoring', 'Conversion-Optimierung', 'Woechentliche Strategy Calls'] },
  ],
  en: [
    { name: 'SEO Audit', price: '490', priceType: 'one-time', description: 'Comprehensive analysis of your website', popular: false, features: ['Technical SEO analysis', 'Keyword research Salzburg', 'Competitor analysis', 'Content audit', 'Google Maps analysis', 'Prioritized action list'] },
    { name: 'SEO Starter', price: '790', priceType: 'per month', description: 'For small hotels and local businesses', popular: false, features: ['Up to 10 keywords', 'OnPage optimization', 'Local SEO Salzburg', 'Google Business Profile', 'Monthly reporting', '3 hours support/month'] },
    { name: 'SEO Business', price: '1,490', priceType: 'per month', description: 'For hotels and tourism businesses', popular: true, features: ['Up to 30 keywords', 'Complete OnPage optimization', 'Content creation (2 articles/month)', 'Multilingual SEO (DE/EN)', 'Review management', 'Detailed reporting', '8 hours support/month'] },
    { name: 'SEO Enterprise', price: '2,990+', priceType: 'per month', description: 'For large hotels and hotel chains', popular: false, features: ['Unlimited keywords', 'Dedicated SEO manager', 'Content strategy 5+ languages', 'Aggressive link building', 'Competitor monitoring', 'Conversion optimization', 'Weekly strategy calls'] },
  ],
  ru: [
    { name: 'SEO Аудит', price: '490', priceType: 'единоразово', description: 'Комплексный анализ вашего сайта', popular: false, features: ['Технический SEO-анализ', 'Исследование ключевых слов Зальцбург', 'Анализ конкурентов', 'Аудит контента', 'Анализ Google Maps', 'Приоритезированный список действий'] },
    { name: 'SEO Стартер', price: '790', priceType: 'в месяц', description: 'Для небольших отелей и локального бизнеса', popular: false, features: ['До 10 ключевых слов', 'OnPage-оптимизация', 'Локальное SEO Зальцбург', 'Google Business Profile', 'Ежемесячная отчетность', '3 часа поддержки/месяц'] },
    { name: 'SEO Бизнес', price: '1 490', priceType: 'в месяц', description: 'Для отелей и туристических компаний', popular: true, features: ['До 30 ключевых слов', 'Полная OnPage-оптимизация', 'Создание контента (2 статьи/месяц)', 'Многоязычное SEO (DE/EN)', 'Управление отзывами', 'Детальная отчетность', '8 часов поддержки/месяц'] },
    { name: 'SEO Корпоративный', price: '2 990+', priceType: 'в месяц', description: 'Для крупных отелей и гостиничных сетей', popular: false, features: ['Неограниченные ключевые слова', 'Выделенный SEO-менеджер', 'Контент-стратегия 5+ языков', 'Агрессивное линкбилдинг', 'Мониторинг конкурентов', 'Оптимизация конверсии', 'Еженедельные стратегические звонки'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+245%', label: 'Mehr organischer Traffic', client: 'Boutique Hotel Salzburg' },
    { metric: 'Top 3', label: 'Rankings fuer "Hotel Salzburg"', client: '4-Sterne Hotel' },
    { metric: '+168%', label: 'Mehr Direktbuchungen', client: 'Restaurant Altstadt' },
  ],
  en: [
    { metric: '+245%', label: 'More organic traffic', client: 'Boutique Hotel Salzburg' },
    { metric: 'Top 3', label: 'Rankings for "Hotel Salzburg"', client: '4-Star Hotel' },
    { metric: '+168%', label: 'More direct bookings', client: 'Old Town Restaurant' },
  ],
  ru: [
    { metric: '+245%', label: 'Больше органического трафика', client: 'Бутик-отель Зальцбург' },
    { metric: 'Топ 3', label: 'Позиции по запросу "Отель Зальцбург"', client: '4-звездочный отель' },
    { metric: '+168%', label: 'Больше прямых бронирований', client: 'Ресторан Старого города' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Wie lange dauert SEO in Salzburg, bis Ergebnisse sichtbar sind?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen in den lokalen Suchergebnissen sehen Sie oft nach 3-4 Monaten. Im Tourismus ist Timing wichtig – wir beginnen fruehzeitig vor der Hauptsaison, damit Sie zur Festspielzeit oder Wintersaison optimal positioniert sind.' },
    { question: 'Was kostet SEO fuer Hotels in Salzburg?', answer: 'Unsere SEO-Pakete starten bei 790 Euro pro Monat fuer kleinere Hotels. Business-Pakete mit mehrsprachiger Optimierung liegen bei 1.490 Euro pro Monat. Ein einmaliger SEO-Audit kostet 490 Euro. Die Kosten haengen von Ihrer Hotelgroesse und der Wettbewerbssituation ab.' },
    { question: 'Warum ist Local SEO fuer Salzburger Hotels so wichtig?', answer: 'Die meisten Hotelgaeste suchen "Hotel + Salzburg" oder "Hotel Salzburg Altstadt" bei Google. Mit Local SEO erscheinen Sie in Google Maps und im Local Pack. Dazu kommt die Optimierung Ihres Google Business Profiles mit Fotos, Bewertungen und direkter Buchungsmoeglichkeit.' },
    { question: 'Bietet ihr auch mehrsprachige SEO an?', answer: 'Ja, gerade in Salzburg ist das essentiell! Wir optimieren fuer deutsche, englische, italienische und weitere Maerkte. Internationale Gaeste suchen in ihrer Sprache – "Hotel Salzburg", "Hotels in Salzburg Austria", "Albergo Salisburgo". Wir decken alle relevanten Maerkte ab.' },
    { question: 'Wie helft ihr bei Google Bewertungen?', answer: 'Bewertungen sind ein wichtiger Ranking-Faktor. Wir helfen beim Aufbau einer Bewertungsstrategie, der professionellen Beantwortung von Reviews und der Integration von Bewertungen in Ihre Website. Positive Bewertungen verbessern sowohl Rankings als auch Buchungsraten.' },
  ],
  en: [
    { question: 'How long does SEO in Salzburg take to show results?', answer: 'SEO is a long-term strategy. You often see first improvements in local search results after 3-4 months. In tourism, timing is key – we start early before the main season so you are optimally positioned for festival time or winter season.' },
    { question: 'How much does SEO for hotels in Salzburg cost?', answer: 'Our SEO packages start at 790 euros per month for smaller hotels. Business packages with multilingual optimization are 1,490 euros per month. A one-time SEO audit costs 490 euros. Costs depend on your hotel size and competitive situation.' },
    { question: 'Why is Local SEO so important for Salzburg hotels?', answer: 'Most hotel guests search "Hotel + Salzburg" or "Hotel Salzburg Old Town" on Google. With Local SEO, you appear in Google Maps and the Local Pack. Plus optimization of your Google Business Profile with photos, reviews and direct booking options.' },
    { question: 'Do you offer multilingual SEO?', answer: 'Yes, especially in Salzburg this is essential! We optimize for German, English, Italian and other markets. International guests search in their language – "Hotel Salzburg", "Hotels in Salzburg Austria", "Albergo Salisburgo". We cover all relevant markets.' },
    { question: 'How do you help with Google reviews?', answer: 'Reviews are an important ranking factor. We help build a review strategy, professionally respond to reviews and integrate reviews into your website. Positive reviews improve both rankings and booking rates.' },
  ],
  ru: [
    { question: 'Сколько времени нужно для получения результатов SEO в Зальцбурге?', answer: 'SEO – это долгосрочная стратегия. Первые улучшения в локальных результатах поиска обычно видны через 3-4 месяца. В туризме важно правильное время – мы начинаем заблаговременно перед главным сезоном, чтобы вы были оптимально позиционированы к фестивальному или зимнему сезону.' },
    { question: 'Сколько стоит SEO для отелей в Зальцбурге?', answer: 'Наши SEO-пакеты начинаются от 790 евро в месяц для небольших отелей. Бизнес-пакеты с многоязычной оптимизацией стоят 1 490 евро в месяц. Единоразовый SEO-аудит стоит 490 евро. Стоимость зависит от размера вашего отеля и конкурентной ситуации.' },
    { question: 'Почему локальное SEO так важно для отелей Зальцбурга?', answer: 'Большинство гостей отелей ищут "Отель + Зальцбург" или "Отель Зальцбург Старый город" в Google. С локальным SEO вы появляетесь в Google Maps и Local Pack. Плюс оптимизация вашего Google Business Profile с фотографиями, отзывами и возможностью прямого бронирования.' },
    { question: 'Вы предлагаете многоязычное SEO?', answer: 'Да, особенно в Зальцбурге это необходимо! Мы оптимизируем для немецкого, английского, итальянского и других рынков. Международные гости ищут на своем языке – "Hotel Salzburg", "Hotels in Salzburg Austria", "Albergo Salisburgo". Мы охватываем все релевантные рынки.' },
    { question: 'Как вы помогаете с отзывами Google?', answer: 'Отзывы – важный фактор ранжирования. Мы помогаем выстроить стратегию работы с отзывами, профессионально отвечать на отзывы и интегрировать их на ваш сайт. Положительные отзывы улучшают как позиции, так и коэффициент бронирований.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'SEO-Audit und Ist-Zustand Ihrer Salzburger Website' },
    { step: '02', title: 'Strategie', description: 'Keywords, Sprachen und saisonale Planung' },
    { step: '03', title: 'OnPage', description: 'Technische und inhaltliche Optimierung' },
    { step: '04', title: 'Content', description: 'Mehrsprachige SEO-Texte fuer Ihre Zielmaerkte' },
    { step: '05', title: 'Monitoring', description: 'Rankings ueberwachen und saisonal anpassen' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'SEO audit and current state of your Salzburg website' },
    { step: '02', title: 'Strategy', description: 'Keywords, languages and seasonal planning' },
    { step: '03', title: 'OnPage', description: 'Technical and content optimization' },
    { step: '04', title: 'Content', description: 'Multilingual SEO copy for your target markets' },
    { step: '05', title: 'Monitoring', description: 'Monitor rankings and adjust seasonally' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'SEO-аудит и текущее состояние вашего сайта в Зальцбурге' },
    { step: '02', title: 'Стратегия', description: 'Ключевые слова, языки и сезонное планирование' },
    { step: '03', title: 'OnPage', description: 'Техническая и контентная оптимизация' },
    { step: '04', title: 'Контент', description: 'Многоязычные SEO-тексты для ваших целевых рынков' },
    { step: '05', title: 'Мониторинг', description: 'Отслеживание позиций и сезонная корректировка' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Salzburg', description: 'SEO-optimierte Websites fuer Salzburger Hotels und Tourismus.', href: '/webdesign-salzburg' },
    { title: 'Content Marketing', description: 'Hochwertige Inhalte, die ranken und Gaeste begeistern.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Bezahlte Werbung fuer schnelle Sichtbarkeit zur Hauptsaison.', href: '/leistungen/digital-marketing' },
  ],
  en: [
    { title: 'Web Design Salzburg', description: 'SEO-optimized websites for Salzburg hotels and tourism.', href: '/webdesign-salzburg' },
    { title: 'Content Marketing', description: 'High-quality content that ranks and delights guests.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Paid advertising for quick visibility during peak season.', href: '/leistungen/digital-marketing' },
  ],
  ru: [
    { title: 'Веб-дизайн Зальцбург', description: 'SEO-оптимизированные сайты для отелей и туризма Зальцбурга.', href: '/webdesign-salzburg' },
    { title: 'Контент-маркетинг', description: 'Качественный контент, который ранжируется и восхищает гостей.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Платная реклама для быстрой видимости в пиковый сезон.', href: '/leistungen/digital-marketing' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/seo-agentur-salzburg', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/seo-agentur-salzburg', locale),
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
      canonical: getCanonicalUrl('/seo-agentur-salzburg', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoAgenturSalzburgPage({ params }: { params: Promise<{ locale: string }> }) {
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

  const servicesTitle = { de: 'Unsere SEO-Leistungen fuer Salzburg', en: 'Our SEO Services for Salzburg', ru: 'Наши SEO-услуги для Зальцбурга' }[locale]
  const servicesDescription = { de: 'Umfassende Suchmaschinenoptimierung fuer Salzburger Tourismus und Unternehmen.', en: 'Comprehensive search engine optimization for Salzburg tourism and businesses.', ru: 'Комплексная поисковая оптимизация для туризма и бизнеса Зальцбурга.' }[locale]
  const pricingTitle = { de: 'SEO Salzburg Pakete', en: 'SEO Salzburg Packages', ru: 'SEO-пакеты Зальцбург' }[locale]
  const pricingDescription = { de: 'Transparente Preise fuer Salzburger Hotels und Unternehmen.', en: 'Transparent pricing for Salzburg hotels and businesses.', ru: 'Прозрачные цены для отелей и бизнеса Зальцбурга.' }[locale]
  const processTitle = { de: 'Unser SEO-Prozess', en: 'Our SEO Process', ru: 'Наш SEO-процесс' }[locale]
  const processDescription = { de: 'Strukturierte Vorgehensweise mit saisonalem Fokus fuer den Tourismus.', en: 'Structured approach with seasonal focus for tourism.', ru: 'Структурированный подход с сезонным фокусом для туризма.' }[locale]
  const faqTitle = { de: 'Haeufige Fragen zu SEO in Salzburg', en: 'Frequently Asked Questions about SEO in Salzburg', ru: 'Часто задаваемые вопросы о SEO в Зальцбурге' }[locale]
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale]
  const ctaTitle = { de: 'Bereit fuer mehr Gaeste?', en: 'Ready for More Guests?', ru: 'Готовы к большему количеству гостей?' }[locale]
  const ctaDescription = { de: 'Kostenlose SEO-Analyse Ihrer Website. Wir zeigen Ihnen, wie Sie mehr Direktbuchungen erhalten.', en: 'Free SEO analysis of your website. We show you how to get more direct bookings.', ru: 'Бесплатный SEO-анализ вашего сайта. Мы покажем, как получить больше прямых бронирований.' }[locale]
  const ctaButton = { de: 'Kostenlose Analyse anfordern', en: 'Request Free Analysis', ru: 'Запросить бесплатный анализ' }[locale]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'SEO Agentur Salzburg', en: 'SEO Agency Salzburg', ru: 'SEO Агентство Зальцбург' }[locale],
    alternateName: { de: 'Suchmaschinenoptimierung Salzburg', en: 'Search Engine Optimization Salzburg', ru: 'Поисковая оптимизация Зальцбург' }[locale],
    url: 'https://goldenwing.at/seo-agentur-salzburg',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'City', name: 'Salzburg' },
      { '@type': 'State', name: 'Salzburger Land' },
    ],
    description: { de: 'Professionelle Suchmaschinenoptimierung in Salzburg. Local SEO, mehrsprachige Optimierung und Tourismus-SEO fuer bessere Google-Rankings.', en: 'Professional search engine optimization in Salzburg. Local SEO, multilingual optimization and tourism-focused SEO for better Google rankings.', ru: 'Профессиональная поисковая оптимизация в Зальцбурге. Локальное SEO, многоязычная оптимизация и туристическое SEO для лучших позиций в Google.' }[locale],
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
                    <Badge>{{ de: 'Empfohlen', en: 'Recommended', ru: 'Рекомендуется' }[locale]}</Badge>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Inquire', ru: 'Запросить' }[locale]}</NextLink>
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
