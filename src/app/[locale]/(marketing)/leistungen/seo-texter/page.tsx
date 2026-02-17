import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, FileText, Search, PenTool, Target, Layers, BarChart3, CheckCircle, Phone, LucideIcon } from 'lucide-react'
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
  'file-text': FileText,
  'search': Search,
  'pen-tool': PenTool,
  'target': Target,
  'layers': Layers,
  'bar-chart-3': BarChart3,
}

// Default content for SEO Texter page
const defaultServices = {
  de: [
    { icon: 'file-text', title: 'Website-Texte', description: 'SEO-optimierte Texte fuer Ihre Startseite, Ueber-uns-Seite, Leistungsseiten und mehr. Conversion-fokussiert und suchmaschinenfreundlich.' },
    { icon: 'pen-tool', title: 'Blog-Artikel', description: 'Hochwertige Blogartikel, die Ihre Expertise zeigen, organischen Traffic generieren und Leser in Kunden verwandeln.' },
    { icon: 'layers', title: 'Produktbeschreibungen', description: 'Ueberzeugende Produkttexte fuer Ihren Online-Shop. SEO-optimiert und verkaufsfoerdernd formuliert.' },
    { icon: 'target', title: 'Landingpages', description: 'Conversion-optimierte Landingpage-Texte, die Besucher zu Kunden machen. Mit klarem Call-to-Action.' },
    { icon: 'search', title: 'SEO Content-Strategie', description: 'Keyword-Recherche, Content-Planung und Themencluster fuer nachhaltigen organischen Traffic.' },
    { icon: 'bar-chart-3', title: 'Content-Optimierung', description: 'Bestehende Texte analysieren und optimieren fuer bessere Rankings und mehr Conversions.' },
  ],
  en: [
    { icon: 'file-text', title: 'Website Copy', description: 'SEO-optimized copy for your homepage, about page, service pages, and more. Conversion-focused and search engine friendly.' },
    { icon: 'pen-tool', title: 'Blog Articles', description: 'High-quality blog articles that showcase your expertise, generate organic traffic, and convert readers into customers.' },
    { icon: 'layers', title: 'Product Descriptions', description: 'Compelling product copy for your online shop. SEO-optimized and written to drive sales.' },
    { icon: 'target', title: 'Landing Pages', description: 'Conversion-optimized landing page copy that turns visitors into customers. With clear calls-to-action.' },
    { icon: 'search', title: 'SEO Content Strategy', description: 'Keyword research, content planning, and topic clusters for sustainable organic traffic.' },
    { icon: 'bar-chart-3', title: 'Content Optimization', description: 'Analyze and optimize existing content for better rankings and more conversions.' },
  ],
  ru: [
    { icon: 'file-text', title: 'Тексты для сайта', description: 'SEO-оптимизированные тексты для главной страницы, страницы о компании, страниц услуг и других разделов. Ориентированы на конверсию и дружелюбны к поисковым системам.' },
    { icon: 'pen-tool', title: 'Статьи для блога', description: 'Качественные статьи для блога, которые демонстрируют вашу экспертизу, генерируют органический трафик и превращают читателей в клиентов.' },
    { icon: 'layers', title: 'Описания товаров', description: 'Убедительные описания товаров для вашего интернет-магазина. SEO-оптимизированные и написанные для увеличения продаж.' },
    { icon: 'target', title: 'Лендинги', description: 'Тексты для посадочных страниц, оптимизированные для конверсии, которые превращают посетителей в клиентов. С четким призывом к действию.' },
    { icon: 'search', title: 'SEO контент-стратегия', description: 'Исследование ключевых слов, планирование контента и тематические кластеры для устойчивого органического трафика.' },
    { icon: 'bar-chart-3', title: 'Оптимизация контента', description: 'Анализ и оптимизация существующего контента для улучшения позиций в поиске и повышения конверсии.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Blog-Artikel', price: '150', priceType: 'ab', description: 'SEO-optimierter Blogartikel', popular: false, features: ['800-1.500 Woerter', 'Keyword-Recherche inkl.', 'Meta-Title & Description', 'Interne Verlinkung', '1 Revisionsrunde', 'Lieferzeit: 5 Werktage'] },
    { name: 'Website-Text', price: '120', priceType: 'ab', description: 'Professioneller Seitentext', popular: true, features: ['300-600 Woerter', 'SEO-optimiert', 'Conversion-fokussiert', 'Meta-Tags inklusive', '2 Revisionsrunden', 'Lieferzeit: 3 Werktage'] },
    { name: 'Produktbeschreibung', price: '30', priceType: 'ab', description: 'Verkaufsstarke Produkttexte', popular: false, features: ['150-250 Woerter', 'USPs hervorgehoben', 'SEO-optimiert', 'Emotional ansprechend', 'Bulk-Rabatte moeglich', 'Lieferzeit: 2 Werktage'] },
    { name: 'Content-Paket', price: '890', priceType: 'ab', description: 'Monatliches Content-Paket', popular: false, features: ['4 Blog-Artikel/Monat', 'Content-Kalender', 'Keyword-Strategie', 'Redaktionsplan', 'Performance-Report', 'Persoenlicher Ansprechpartner'] },
  ],
  en: [
    { name: 'Blog Article', price: '150', priceType: 'from', description: 'SEO-optimized blog article', popular: false, features: ['800-1,500 words', 'Keyword research incl.', 'Meta title & description', 'Internal linking', '1 revision round', 'Delivery: 5 business days'] },
    { name: 'Website Copy', price: '120', priceType: 'from', description: 'Professional page copy', popular: true, features: ['300-600 words', 'SEO-optimized', 'Conversion-focused', 'Meta tags included', '2 revision rounds', 'Delivery: 3 business days'] },
    { name: 'Product Description', price: '30', priceType: 'from', description: 'Sales-driven product copy', popular: false, features: ['150-250 words', 'USPs highlighted', 'SEO-optimized', 'Emotionally engaging', 'Bulk discounts available', 'Delivery: 2 business days'] },
    { name: 'Content Package', price: '890', priceType: 'from', description: 'Monthly content package', popular: false, features: ['4 blog articles/month', 'Content calendar', 'Keyword strategy', 'Editorial plan', 'Performance report', 'Personal account manager'] },
  ],
  ru: [
    { name: 'Статья для блога', price: '150', priceType: 'от', description: 'SEO-оптимизированная статья для блога', popular: false, features: ['800-1500 слов', 'Исследование ключевых слов вкл.', 'Meta-заголовок и описание', 'Внутренняя перелинковка', '1 раунд правок', 'Срок: 5 рабочих дней'] },
    { name: 'Текст для сайта', price: '120', priceType: 'от', description: 'Профессиональный текст для страницы', popular: true, features: ['300-600 слов', 'SEO-оптимизация', 'Ориентация на конверсию', 'Meta-теги включены', '2 раунда правок', 'Срок: 3 рабочих дня'] },
    { name: 'Описание товара', price: '30', priceType: 'от', description: 'Продающее описание товара', popular: false, features: ['150-250 слов', 'Выделение УТП', 'SEO-оптимизация', 'Эмоциональная подача', 'Скидки на объем', 'Срок: 2 рабочих дня'] },
    { name: 'Контент-пакет', price: '890', priceType: 'от', description: 'Ежемесячный контент-пакет', popular: false, features: ['4 статьи в месяц', 'Контент-календарь', 'Стратегия ключевых слов', 'Редакционный план', 'Отчет об эффективности', 'Персональный менеджер'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+156%', label: 'Mehr organischer Traffic', client: 'E-Commerce Kunde' },
    { metric: '2.800+', label: 'Texte geschrieben', client: 'Seit 2018' },
    { metric: 'Top 5', label: 'Rankings fuer Hauptkeywords', client: 'B2B Kunde' },
  ],
  en: [
    { metric: '+156%', label: 'More organic traffic', client: 'E-Commerce client' },
    { metric: '2,800+', label: 'Texts written', client: 'Since 2018' },
    { metric: 'Top 5', label: 'Rankings for main keywords', client: 'B2B client' },
  ],
  ru: [
    { metric: '+156%', label: 'Больше органического трафика', client: 'E-Commerce клиент' },
    { metric: '2800+', label: 'Написано текстов', client: 'С 2018 года' },
    { metric: 'Топ-5', label: 'Позиции по основным ключевым словам', client: 'B2B клиент' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet ein SEO-Text?', answer: 'Die Kosten haengen von Laenge, Komplexitaet und Recherche-Aufwand ab. Blog-Artikel starten ab 150 Euro, Website-Texte ab 120 Euro und Produktbeschreibungen ab 30 Euro. Fuer groessere Projekte erstellen wir gerne ein individuelles Angebot.' },
    { question: 'Wie lange dauert die Texterstellung?', answer: 'Ein Blog-Artikel ist in der Regel innerhalb von 5 Werktagen fertig, Website-Texte in 3 Werktagen. Bei groesseren Projekten erstellen wir einen detaillierten Zeitplan. Express-Lieferung ist gegen Aufpreis moeglich.' },
    { question: 'Schreiben Sie auch auf Englisch?', answer: 'Ja, wir erstellen Texte auf Deutsch und Englisch. Fuer beide Sprachen arbeiten wir mit Native Speakern, um hoechste Qualitaet zu gewaehrleisten. Auch Uebersetzungen bestehender Texte sind moeglich.' },
    { question: 'Was unterscheidet Sie von anderen Textern?', answer: 'Wir kombinieren journalistische Ausbildung mit SEO-Expertise. Unsere Texte sind nicht nur suchmaschinenoptimiert, sondern auch lesenswert und ueberzeugend. Zudem verstehen wir die technische Seite von SEO.' },
    { question: 'Wie laeuft die Zusammenarbeit ab?', answer: 'Nach einem kurzen Briefing-Gespraech erhalten Sie ein Angebot. Nach Freigabe beginnen wir mit der Keyword-Recherche und Texterstellung. Sie erhalten den Text zur Durchsicht mit der Moeglichkeit fuer Revisionen.' },
    { question: 'Bieten Sie auch Content-Strategie an?', answer: 'Ja, wir entwickeln komplette Content-Strategien inklusive Keyword-Recherche, Themenplanung, Redaktionskalender und Erfolgsmessung. So stellen wir sicher, dass Ihre Inhalte langfristig Traffic generieren.' },
  ],
  en: [
    { question: 'How much does SEO copywriting cost?', answer: 'Costs depend on length, complexity, and research effort. Blog articles start from 150 euros, website copy from 120 euros, and product descriptions from 30 euros. For larger projects, we create custom quotes.' },
    { question: 'How long does the writing process take?', answer: 'A blog article is typically ready within 5 business days, website copy in 3 business days. For larger projects, we create a detailed schedule. Express delivery is available for an additional fee.' },
    { question: 'Do you write in English as well?', answer: 'Yes, we create content in German and English. For both languages, we work with native speakers to ensure the highest quality. Translation of existing texts is also possible.' },
    { question: 'What sets you apart from other copywriters?', answer: 'We combine journalistic training with SEO expertise. Our texts are not only search engine optimized but also engaging and persuasive. We also understand the technical side of SEO.' },
    { question: 'How does the collaboration work?', answer: 'After a brief briefing, you receive a quote. Upon approval, we begin with keyword research and writing. You receive the text for review with the option for revisions.' },
    { question: 'Do you offer content strategy services?', answer: 'Yes, we develop complete content strategies including keyword research, topic planning, editorial calendars, and success measurement. This ensures your content generates long-term traffic.' },
  ],
  ru: [
    { question: 'Сколько стоит SEO-текст?', answer: 'Стоимость зависит от объема, сложности и необходимых исследований. Статьи для блога от 150 евро, тексты для сайта от 120 евро, описания товаров от 30 евро. Для крупных проектов мы составляем индивидуальное предложение.' },
    { question: 'Сколько времени занимает написание текста?', answer: 'Статья для блога обычно готова в течение 5 рабочих дней, текст для сайта за 3 рабочих дня. Для крупных проектов мы составляем детальный график. Срочная доставка доступна за дополнительную плату.' },
    { question: 'Вы пишете на английском языке?', answer: 'Да, мы создаем контент на немецком и английском языках. Для обоих языков мы работаем с носителями языка, чтобы обеспечить высочайшее качество. Перевод существующих текстов также возможен.' },
    { question: 'Чем вы отличаетесь от других копирайтеров?', answer: 'Мы сочетаем журналистское образование с экспертизой в SEO. Наши тексты не только оптимизированы для поисковых систем, но и увлекательны и убедительны. Мы также понимаем техническую сторону SEO.' },
    { question: 'Как проходит сотрудничество?', answer: 'После краткого брифинга вы получаете коммерческое предложение. После согласования мы начинаем исследование ключевых слов и написание текста. Вы получаете текст на проверку с возможностью внесения правок.' },
    { question: 'Вы предлагаете услуги контент-стратегии?', answer: 'Да, мы разрабатываем полные контент-стратегии, включая исследование ключевых слов, планирование тем, редакционные календари и измерение эффективности. Это гарантирует, что ваш контент генерирует долгосрочный трафик.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Briefing', description: 'Ziele, Zielgruppe und Anforderungen verstehen' },
    { step: '02', title: 'Recherche', description: 'Keyword-Analyse und Wettbewerbsrecherche' },
    { step: '03', title: 'Konzept', description: 'Struktur und Gliederung erstellen' },
    { step: '04', title: 'Texterstellung', description: 'SEO-optimierter, ueberzeugender Text' },
    { step: '05', title: 'Revision', description: 'Feedback einarbeiten und finalisieren' },
  ],
  en: [
    { step: '01', title: 'Briefing', description: 'Understand goals, target audience, and requirements' },
    { step: '02', title: 'Research', description: 'Keyword analysis and competitor research' },
    { step: '03', title: 'Concept', description: 'Create structure and outline' },
    { step: '04', title: 'Writing', description: 'SEO-optimized, persuasive copy' },
    { step: '05', title: 'Revision', description: 'Incorporate feedback and finalize' },
  ],
  ru: [
    { step: '01', title: 'Брифинг', description: 'Понимание целей, целевой аудитории и требований' },
    { step: '02', title: 'Исследование', description: 'Анализ ключевых слов и исследование конкурентов' },
    { step: '03', title: 'Концепция', description: 'Создание структуры и плана' },
    { step: '04', title: 'Написание', description: 'SEO-оптимизированный, убедительный текст' },
    { step: '05', title: 'Правки', description: 'Внесение корректировок и финализация' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'SEO Beratung', description: 'Strategische SEO-Beratung fuer nachhaltiges Wachstum.', href: '/leistungen/seo-berater' },
    { title: 'Content Marketing', description: 'Ganzheitliche Content-Strategie fuer Ihre Marke.', href: '/leistungen/seo-content' },
    { title: 'Webdesign', description: 'SEO-optimierte Websites, die konvertieren.', href: '/leistungen/webdesign' },
  ],
  en: [
    { title: 'SEO Consulting', description: 'Strategic SEO consulting for sustainable growth.', href: '/leistungen/seo-berater' },
    { title: 'Content Marketing', description: 'Holistic content strategy for your brand.', href: '/leistungen/seo-content' },
    { title: 'Web Design', description: 'SEO-optimized websites that convert.', href: '/leistungen/webdesign' },
  ],
  ru: [
    { title: 'SEO-консалтинг', description: 'Стратегический SEO-консалтинг для устойчивого роста.', href: '/leistungen/seo-berater' },
    { title: 'Контент-маркетинг', description: 'Комплексная контент-стратегия для вашего бренда.', href: '/leistungen/seo-content' },
    { title: 'Веб-дизайн', description: 'SEO-оптимизированные сайты, которые конвертируют.', href: '/leistungen/webdesign' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'Journalistische Ausbildung', description: 'Fundierte Ausbildung in Recherche und Storytelling fuer Texte, die fesseln.' },
    { title: 'SEO-Expertise', description: 'Tiefes Verstaendnis von Suchmaschinenoptimierung und Ranking-Faktoren.' },
    { title: 'Native German', description: 'Muttersprachliche Qualitaet fuer den deutschsprachigen Markt.' },
    { title: 'Conversion-Fokus', description: 'Texte, die nicht nur ranken, sondern auch verkaufen.' },
  ],
  en: [
    { title: 'Journalistic Training', description: 'Solid training in research and storytelling for engaging copy.' },
    { title: 'SEO Expertise', description: 'Deep understanding of search engine optimization and ranking factors.' },
    { title: 'Native German', description: 'Native-level quality for the German-speaking market.' },
    { title: 'Conversion Focus', description: 'Copy that not only ranks but also sells.' },
  ],
  ru: [
    { title: 'Журналистское образование', description: 'Основательная подготовка в области исследований и сторителлинга для увлекательных текстов.' },
    { title: 'SEO-экспертиза', description: 'Глубокое понимание поисковой оптимизации и факторов ранжирования.' },
    { title: 'Носитель немецкого', description: 'Качество носителя языка для немецкоязычного рынка.' },
    { title: 'Фокус на конверсию', description: 'Тексты, которые не только ранжируются, но и продают.' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = { de: 'SEO Texter Wien - Professionelle SEO-Texte & Content | GoldenWing', en: 'SEO Copywriter Vienna - Professional SEO Copy & Content | GoldenWing', ru: 'SEO-копирайтер Вена - Профессиональные SEO-тексты и контент | GoldenWing' }[locale] ?? 'SEO Copywriter Vienna - Professional SEO Copy & Content | GoldenWing'

  const metaDescription = truncateMetaDescription(
    { de: 'SEO Texter aus Wien: Blog-Artikel ab 150 Euro, Website-Texte ab 120 Euro, Produktbeschreibungen ab 30 Euro. Journalistische Qualitaet trifft SEO-Expertise. Jetzt anfragen!', en: 'SEO copywriter from Vienna: Blog articles from 150 euros, website copy from 120 euros, product descriptions from 30 euros. Journalistic quality meets SEO expertise. Request now!', ru: 'SEO-копирайтер из Вены: статьи для блога от 150 евро, тексты для сайта от 120 евро, описания товаров от 30 евро. Журналистское качество и SEO-экспертиза. Запросите сейчас!' }[locale] ?? 'SEO copywriter from Vienna: Blog articles from 150 euros, website copy from 120 euros, product descriptions from 30 euros. Journalistic quality meets SEO expertise. Request now!'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/seo-texter', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: { de: ['SEO Texter', 'SEO Texter Wien', 'SEO Texte schreiben lassen', 'SEO Content', 'Blog-Artikel schreiben', 'Website-Texte', 'Produktbeschreibungen'], en: ['SEO Copywriter', 'SEO Copywriter Vienna', 'SEO Content Writing', 'Blog Articles', 'Website Copy', 'Product Descriptions'], ru: ['SEO-копирайтер', 'SEO-копирайтер Вена', 'SEO контент', 'Статьи для блога', 'Тексты для сайта', 'Описания товаров'] }[locale] ?? ['SEO Copywriter', 'SEO Copywriter Vienna', 'SEO Content Writing', 'Blog Articles', 'Website Copy', 'Product Descriptions'],
    openGraph: {
      title: { de: 'SEO Texter Wien', en: 'SEO Copywriter Vienna', ru: 'SEO-копирайтер Вена' }[locale] ?? 'SEO Copywriter Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/seo-texter', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - SEO Texter' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/seo-texter', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoTexterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
    { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale] ?? 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/services' }[locale] ?? 'https://goldenwing.at/en/services' },
    { name: { de: 'SEO Texter', en: 'SEO Copywriter', ru: 'SEO-копирайтер' }[locale] ?? 'SEO Copywriter', url: { de: 'https://goldenwing.at/leistungen/seo-texter', en: 'https://goldenwing.at/en/services/seo-copywriter', ru: 'https://goldenwing.at/ru/services/seo-copywriter' }[locale] ?? 'https://goldenwing.at/en/services/seo-copywriter' },
  ]

  const heroData = {
    badge: { de: 'SEO Texter', en: 'SEO Copywriter', ru: 'SEO-копирайтер' }[locale] ?? 'SEO Copywriter',
    title: { de: 'SEO Texter Wien', en: 'SEO Copywriter Vienna', ru: 'SEO-копирайтер Вена' }[locale] ?? 'SEO Copywriter Vienna',
    subtitle: { de: 'Texte, die ranken und verkaufen.', en: 'Copy that ranks and converts.', ru: 'Тексты, которые ранжируются и продают.' }[locale] ?? 'Copy that ranks and converts.',
    description: { de: 'Professionelle SEO-Texte aus Wien. Blog-Artikel, Website-Texte, Produktbeschreibungen und Landingpages - journalistische Qualitaet trifft SEO-Expertise. Muttersprachlich Deutsch, conversion-fokussiert.', en: 'Professional SEO copywriting from Vienna. Blog articles, website copy, product descriptions, and landing pages - journalistic quality meets SEO expertise. Native German, conversion-focused.', ru: 'Профессиональный SEO-копирайтинг из Вены. Статьи для блога, тексты для сайта, описания товаров и лендинги - журналистское качество в сочетании с SEO-экспертизой. Носитель немецкого языка, ориентация на конверсию.' }[locale] ?? 'Professional SEO copywriting from Vienna. Blog articles, website copy, product descriptions, and landing pages - journalistic quality meets SEO expertise. Native German, conversion-focused.',
    ctaPrimary: { de: 'Angebot anfordern', en: 'Request Quote', ru: 'Запросить предложение' }[locale] ?? 'Request Quote',
    ctaSecondary: { de: 'Preise ansehen', en: 'View Pricing', ru: 'Посмотреть цены' }[locale] ?? 'View Pricing',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']

  const servicesTitle = { de: 'Unsere SEO-Texter-Leistungen', en: 'Our SEO Copywriting Services', ru: 'Наши услуги SEO-копирайтинга' }[locale] ?? 'Our SEO Copywriting Services'
  const servicesDescription = { de: 'Von Blog-Artikeln bis Produktbeschreibungen - wir schreiben SEO-optimierte Inhalte, die Traffic generieren und konvertieren.', en: 'From blog articles to product descriptions - we write SEO-optimized content that generates traffic and converts.', ru: 'От статей для блога до описаний товаров - мы пишем SEO-оптимизированный контент, который генерирует трафик и конвертирует.' }[locale] ?? 'From blog articles to product descriptions - we write SEO-optimized content that generates traffic and converts.'
  const pricingTitle = { de: 'Transparente Preise', en: 'Transparent Pricing', ru: 'Прозрачные цены' }[locale] ?? 'Transparent Pricing'
  const pricingDescription = { de: 'Klare Preise fuer SEO-Texte. Keine versteckten Kosten.', en: 'Clear pricing for SEO copywriting. No hidden costs.', ru: 'Четкие цены на SEO-копирайтинг. Никаких скрытых расходов.' }[locale] ?? 'Clear pricing for SEO copywriting. No hidden costs.'
  const processTitle = { de: 'Unser Prozess', en: 'Our Process', ru: 'Наш процесс' }[locale] ?? 'Our Process'
  const processDescription = { de: 'Vom Briefing zum fertigen Text in 5 Schritten.', en: 'From briefing to finished text in 5 steps.', ru: 'От брифинга до готового текста за 5 шагов.' }[locale] ?? 'From briefing to finished text in 5 steps.'
  const faqTitle = { de: 'Haeufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Sie brauchen SEO-optimierte Texte?', en: 'Need SEO-Optimized Content?', ru: 'Нужен SEO-оптимизированный контент?' }[locale] ?? 'Need SEO-Optimized Content?'
  const ctaDescription = { de: 'Lassen Sie uns ueber Ihre Content-Beduerfnisse sprechen. Wir antworten innerhalb von 24 Stunden.', en: 'Let\'s discuss your content needs. We respond within 24 hours.', ru: 'Давайте обсудим ваши потребности в контенте. Мы ответим в течение 24 часов.' }[locale] ?? 'Let\'s discuss your content needs. We respond within 24 hours.'
  const ctaButton = { de: 'Kostenloses Angebot anfordern', en: 'Request Free Quote', ru: 'Запросить бесплатное предложение' }[locale] ?? 'Request Free Quote'
  const uspsTitle = { de: 'Warum wir', en: 'Why Choose Us', ru: 'Почему мы' }[locale] ?? 'Why Choose Us'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'SEO Texter Wien', en: 'SEO Copywriter Vienna', ru: 'SEO-копирайтер Вена' }[locale] ?? 'SEO Copywriter Vienna',
    alternateName: { de: 'SEO Content Texte Wien', en: 'SEO Content Writing Vienna', ru: 'SEO контент Вена' }[locale] ?? 'SEO Content Writing Vienna',
    url: 'https://goldenwing.at/leistungen/seo-texter',
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
    description: { de: 'Professionelle SEO-Texterstellung in Wien. Blog-Artikel, Website-Texte, Produktbeschreibungen und Landingpages.', en: 'Professional SEO copywriting services in Vienna. Blog articles, website copy, product descriptions, and landing pages.', ru: 'Профессиональные услуги SEO-копирайтинга в Вене. Статьи для блога, тексты для сайта, описания товаров и лендинги.' }[locale] ?? 'Professional SEO copywriting services in Vienna. Blog articles, website copy, product descriptions, and landing pages.',
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price,
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
              const IconComponent = iconMap[service.icon] || FileText
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg: { name: string; price: string; priceType: string; description: string; popular: boolean; features: string[] }) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Beliebt', en: 'Popular', ru: 'Популярно' }[locale] ?? 'Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Request', ru: 'Запросить' }[locale] ?? 'Request'}</NextLink>
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
