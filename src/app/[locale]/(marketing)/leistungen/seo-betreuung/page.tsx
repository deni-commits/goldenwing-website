import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Search, TrendingUp, Target, BarChart3, FileText, RefreshCw, CheckCircle, Phone, Settings, LucideIcon } from 'lucide-react'
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
  'file-text': FileText,
  'refresh-cw': RefreshCw,
  'settings': Settings,
}

// SEO Betreuung - Volume: 110, KD: 9 (EASY WIN!), CPC: €11.93
const defaultServices = {
  de: [
    { icon: 'settings', title: 'Technisches SEO', description: 'Laufende technische Optimierung: Crawling, Indexierung, Core Web Vitals, Mobile-Friendliness. Wir halten Ihre Website technisch auf dem neuesten Stand.' },
    { icon: 'file-text', title: 'Content-Optimierung', description: 'Monatliche Content-Updates, neue Blogbeitraege und Landingpage-Optimierung. Wir sorgen fuer frischen, rankenden Content.' },
    { icon: 'target', title: 'Keyword-Monitoring', description: 'Taegliches Tracking Ihrer wichtigsten Keywords. Sofortige Reaktion auf Rankingveraenderungen und neue Chancen.' },
    { icon: 'trending-up', title: 'Backlink-Aufbau', description: 'Kontinuierlicher, natuerlicher Linkaufbau. Qualitative Backlinks fuer nachhaltige Authority.' },
    { icon: 'bar-chart-3', title: 'Monatliches Reporting', description: 'Transparente Berichte: Rankings, Traffic, Conversions. Sie sehen jeden Monat den Fortschritt.' },
    { icon: 'search', title: 'Wettbewerbsanalyse', description: 'Regelmaessige Analyse der Konkurrenz. Wir identifizieren Chancen und passen die Strategie an.' },
  ],
  en: [
    { icon: 'settings', title: 'Technical SEO', description: 'Ongoing technical optimization: crawling, indexing, Core Web Vitals, mobile-friendliness. We keep your website technically up-to-date.' },
    { icon: 'file-text', title: 'Content Optimization', description: 'Monthly content updates, new blog posts and landing page optimization. We ensure fresh, ranking content.' },
    { icon: 'target', title: 'Keyword Monitoring', description: 'Daily tracking of your most important keywords. Immediate response to ranking changes and new opportunities.' },
    { icon: 'trending-up', title: 'Link Building', description: 'Continuous, natural link building. Quality backlinks for sustainable authority.' },
    { icon: 'bar-chart-3', title: 'Monthly Reporting', description: 'Transparent reports: rankings, traffic, conversions. You see progress every month.' },
    { icon: 'search', title: 'Competitor Analysis', description: 'Regular competitor analysis. We identify opportunities and adjust strategy accordingly.' },
  ],
  ru: [
    { icon: 'settings', title: 'Техническое SEO', description: 'Постоянная техническая оптимизация: краулинг, индексация, Core Web Vitals, мобильная адаптация. Мы поддерживаем ваш сайт технически актуальным.' },
    { icon: 'file-text', title: 'Оптимизация контента', description: 'Ежемесячные обновления контента, новые статьи в блоге и оптимизация посадочных страниц. Мы обеспечиваем свежий, ранжируемый контент.' },
    { icon: 'target', title: 'Мониторинг ключевых слов', description: 'Ежедневное отслеживание ваших важнейших ключевых слов. Мгновенная реакция на изменения позиций и новые возможности.' },
    { icon: 'trending-up', title: 'Наращивание ссылочной массы', description: 'Непрерывное, естественное наращивание ссылок. Качественные обратные ссылки для устойчивого авторитета.' },
    { icon: 'bar-chart-3', title: 'Ежемесячная отчётность', description: 'Прозрачные отчёты: позиции, трафик, конверсии. Вы видите прогресс каждый месяц.' },
    { icon: 'search', title: 'Анализ конкурентов', description: 'Регулярный анализ конкурентов. Мы выявляем возможности и корректируем стратегию.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEO Basic', price: '590', priceType: 'pro Monat', description: 'Fuer kleine Websites', popular: false, features: ['Bis 50 Seiten', 'Technisches SEO-Monitoring', 'Keyword-Tracking (20 Keywords)', 'Monatlicher Report', '2 Stunden Support/Monat', 'Quartalsweiser Strategy Call'] },
    { name: 'SEO Business', price: '990', priceType: 'pro Monat', description: 'Fuer wachsende Unternehmen', popular: true, features: ['Bis 200 Seiten', 'Vollstaendiges technisches SEO', 'Keyword-Tracking (50 Keywords)', '2 Content-Optimierungen/Monat', 'Backlink-Aufbau (2 Links/Monat)', 'Monatlicher Strategy Call', '5 Stunden Support/Monat'] },
    { name: 'SEO Premium', price: '1.990', priceType: 'pro Monat', description: 'Fuer ambitionierte Ziele', popular: false, features: ['Unbegrenzte Seiten', 'Enterprise technisches SEO', 'Keyword-Tracking (150 Keywords)', '4 Content-Stuecke/Monat', 'Backlink-Aufbau (5 Links/Monat)', 'Woechentlicher Strategy Call', 'Conversion-Optimierung', 'Dedizierter Account Manager'] },
  ],
  en: [
    { name: 'SEO Basic', price: '590', priceType: 'per month', description: 'For small websites', popular: false, features: ['Up to 50 pages', 'Technical SEO monitoring', 'Keyword tracking (20 keywords)', 'Monthly report', '2 hours support/month', 'Quarterly strategy call'] },
    { name: 'SEO Business', price: '990', priceType: 'per month', description: 'For growing businesses', popular: true, features: ['Up to 200 pages', 'Complete technical SEO', 'Keyword tracking (50 keywords)', '2 content optimizations/month', 'Link building (2 links/month)', 'Monthly strategy call', '5 hours support/month'] },
    { name: 'SEO Premium', price: '1,990', priceType: 'per month', description: 'For ambitious goals', popular: false, features: ['Unlimited pages', 'Enterprise technical SEO', 'Keyword tracking (150 keywords)', '4 content pieces/month', 'Link building (5 links/month)', 'Weekly strategy call', 'Conversion optimization', 'Dedicated account manager'] },
  ],
  ru: [
    { name: 'SEO Basic', price: '590', priceType: 'в месяц', description: 'Для небольших сайтов', popular: false, features: ['До 50 страниц', 'Технический SEO-мониторинг', 'Отслеживание ключевых слов (20 ключей)', 'Ежемесячный отчёт', '2 часа поддержки/месяц', 'Стратегический созвон раз в квартал'] },
    { name: 'SEO Business', price: '990', priceType: 'в месяц', description: 'Для растущих компаний', popular: true, features: ['До 200 страниц', 'Полное техническое SEO', 'Отслеживание ключевых слов (50 ключей)', '2 оптимизации контента/месяц', 'Наращивание ссылок (2 ссылки/месяц)', 'Ежемесячный стратегический созвон', '5 часов поддержки/месяц'] },
    { name: 'SEO Premium', price: '1 990', priceType: 'в месяц', description: 'Для амбициозных целей', popular: false, features: ['Неограниченное число страниц', 'Enterprise техническое SEO', 'Отслеживание ключевых слов (150 ключей)', '4 единицы контента/месяц', 'Наращивание ссылок (5 ссылок/месяц)', 'Еженедельный стратегический созвон', 'Оптимизация конверсий', 'Персональный аккаунт-менеджер'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+215%', label: 'Durchschnittliche Traffic-Steigerung', client: 'Nach 12 Monaten Betreuung' },
    { metric: '94%', label: 'Kundenbindungsrate', client: 'Langfristige Partnerschaften' },
    { metric: '35+', label: 'Aktive Betreuungsvertraege', client: 'Im DACH-Raum' },
  ],
  en: [
    { metric: '+215%', label: 'Average traffic increase', client: 'After 12 months support' },
    { metric: '94%', label: 'Client retention rate', client: 'Long-term partnerships' },
    { metric: '35+', label: 'Active support contracts', client: 'In DACH region' },
  ],
  ru: [
    { metric: '+215%', label: 'Средний рост трафика', client: 'После 12 месяцев сопровождения' },
    { metric: '94%', label: 'Уровень удержания клиентов', client: 'Долгосрочные партнёрства' },
    { metric: '35+', label: 'Активных контрактов на сопровождение', client: 'В регионе DACH' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was beinhaltet SEO Betreuung?', answer: 'SEO Betreuung umfasst alle laufenden Massnahmen zur Verbesserung Ihrer Sichtbarkeit: technisches Monitoring, Content-Optimierung, Backlink-Aufbau, Keyword-Tracking und regelmaessiges Reporting. Im Gegensatz zu einmaligen Audits ist Betreuung ein kontinuierlicher Prozess.' },
    { question: 'Wie lange dauert es, bis SEO Betreuung wirkt?', answer: 'Erste Verbesserungen sehen Sie oft nach 2-3 Monaten. Signifikante Ergebnisse erreichen Sie nach 6-12 Monaten. SEO ist eine langfristige Investition – deshalb empfehlen wir eine Mindestlaufzeit von 6 Monaten fuer nachhaltige Erfolge.' },
    { question: 'Warum brauche ich laufende SEO Betreuung?', answer: 'Google aendert seinen Algorithmus staendig (bis zu 600 Updates pro Jahr). Ihre Konkurrenz optimiert ebenfalls. Ohne laufende Betreuung fallen Rankings langsam ab. Kontinuierliche Optimierung haelt Sie vorne.' },
    { question: 'Was kostet SEO Betreuung pro Monat?', answer: 'Unsere SEO Betreuung startet bei 590 Euro pro Monat fuer kleine Websites. Das Business-Paket mit vollem Leistungsumfang kostet 990 Euro, das Premium-Paket 1.990 Euro monatlich. Die Investition zahlt sich durch mehr Traffic und Umsatz aus.' },
    { question: 'Kann ich die Betreuung jederzeit kuendigen?', answer: 'Wir empfehlen eine Mindestlaufzeit von 6 Monaten, um Ergebnisse zu erzielen. Danach ist der Vertrag monatlich kuendbar. Wir setzen auf Ergebnisse, nicht auf lange Vertragsbindungen.' },
    { question: 'Was ist der Unterschied zu einer einmaligen SEO-Optimierung?', answer: 'Einmalige Optimierung verbessert den Status quo, aber ohne laufende Arbeit stagnieren Rankings. SEO Betreuung sorgt fuer kontinuierliche Verbesserung: neue Inhalte, technische Updates, Backlinks, Reaktion auf Google-Updates.' },
  ],
  en: [
    { question: 'What does SEO support include?', answer: 'SEO support covers all ongoing measures to improve your visibility: technical monitoring, content optimization, link building, keyword tracking and regular reporting. Unlike one-time audits, support is a continuous process.' },
    { question: 'How long until SEO support shows results?', answer: 'You often see first improvements after 2-3 months. Significant results are achieved after 6-12 months. SEO is a long-term investment – that\'s why we recommend a minimum term of 6 months for sustainable success.' },
    { question: 'Why do I need ongoing SEO support?', answer: 'Google constantly changes its algorithm (up to 600 updates per year). Your competitors are also optimizing. Without ongoing support, rankings slowly decline. Continuous optimization keeps you ahead.' },
    { question: 'How much does SEO support cost per month?', answer: 'Our SEO support starts at 590 euros per month for small websites. The Business package with full scope costs 990 euros, the Premium package 1,990 euros monthly. The investment pays off through more traffic and revenue.' },
    { question: 'Can I cancel the support at any time?', answer: 'We recommend a minimum term of 6 months to achieve results. After that, the contract can be cancelled monthly. We focus on results, not long contract commitments.' },
    { question: 'What\'s the difference from one-time SEO optimization?', answer: 'One-time optimization improves the status quo, but without ongoing work, rankings stagnate. SEO support ensures continuous improvement: new content, technical updates, backlinks, response to Google updates.' },
  ],
  ru: [
    { question: 'Что включает SEO-сопровождение?', answer: 'SEO-сопровождение охватывает все постоянные меры по улучшению вашей видимости: технический мониторинг, оптимизацию контента, наращивание ссылочной массы, отслеживание ключевых слов и регулярную отчётность. В отличие от разовых аудитов, сопровождение — это непрерывный процесс.' },
    { question: 'Как быстро SEO-сопровождение даёт результаты?', answer: 'Первые улучшения часто видны через 2-3 месяца. Значительных результатов вы достигнете через 6-12 месяцев. SEO — это долгосрочная инвестиция, поэтому мы рекомендуем минимальный срок 6 месяцев для устойчивого успеха.' },
    { question: 'Зачем мне постоянное SEO-сопровождение?', answer: 'Google постоянно меняет свой алгоритм (до 600 обновлений в год). Ваши конкуренты тоже оптимизируются. Без постоянного сопровождения позиции медленно падают. Непрерывная оптимизация держит вас впереди.' },
    { question: 'Сколько стоит SEO-сопровождение в месяц?', answer: 'Наше SEO-сопровождение начинается от 590 евро в месяц для небольших сайтов. Пакет Business с полным набором услуг стоит 990 евро, пакет Premium — 1 990 евро в месяц. Инвестиция окупается за счёт роста трафика и выручки.' },
    { question: 'Могу ли я отменить сопровождение в любое время?', answer: 'Мы рекомендуем минимальный срок 6 месяцев для достижения результатов. После этого договор можно расторгнуть ежемесячно. Мы делаем ставку на результаты, а не на длительные договорные обязательства.' },
    { question: 'В чём разница между разовой SEO-оптимизацией и сопровождением?', answer: 'Разовая оптимизация улучшает текущее положение дел, но без постоянной работы позиции стагнируют. SEO-сопровождение обеспечивает непрерывное улучшение: новый контент, технические обновления, обратные ссылки, реакция на обновления Google.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Onboarding', description: 'Zugang erhalten, Status-quo analysieren' },
    { step: '02', title: 'Strategie', description: 'Ziele definieren, Prioritaeten setzen' },
    { step: '03', title: 'Setup', description: 'Tracking einrichten, Baseline erstellen' },
    { step: '04', title: 'Optimierung', description: 'Laufende Massnahmen umsetzen' },
    { step: '05', title: 'Reporting', description: 'Monatliche Berichte und Calls' },
  ],
  en: [
    { step: '01', title: 'Onboarding', description: 'Get access, analyze status quo' },
    { step: '02', title: 'Strategy', description: 'Define goals, set priorities' },
    { step: '03', title: 'Setup', description: 'Set up tracking, create baseline' },
    { step: '04', title: 'Optimization', description: 'Implement ongoing measures' },
    { step: '05', title: 'Reporting', description: 'Monthly reports and calls' },
  ],
  ru: [
    { step: '01', title: 'Онбординг', description: 'Получение доступа, анализ текущего состояния' },
    { step: '02', title: 'Стратегия', description: 'Определение целей, расстановка приоритетов' },
    { step: '03', title: 'Настройка', description: 'Настройка трекинга, создание базовой линии' },
    { step: '04', title: 'Оптимизация', description: 'Реализация постоянных мер' },
    { step: '05', title: 'Отчётность', description: 'Ежемесячные отчёты и созвоны' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'SEO Berater', description: 'Einmalige SEO-Audits und strategische Beratung.', href: '/leistungen/seo-berater' },
    { title: 'SEO Texter', description: 'Professionelle SEO-Texte, die ranken und konvertieren.', href: '/leistungen/seo-texter' },
    { title: 'Google Ads Agentur', description: 'Schnelle Ergebnisse mit bezahlter Werbung.', href: '/leistungen/google-ads-agentur' },
  ],
  en: [
    { title: 'SEO Consultant', description: 'One-time SEO audits and strategic consulting.', href: '/leistungen/seo-berater' },
    { title: 'SEO Copywriter', description: 'Professional SEO copy that ranks and converts.', href: '/leistungen/seo-texter' },
    { title: 'Google Ads Agency', description: 'Quick results with paid advertising.', href: '/leistungen/google-ads-agentur' },
  ],
  ru: [
    { title: 'SEO-консультант', description: 'Разовые SEO-аудиты и стратегический консалтинг.', href: '/leistungen/seo-berater' },
    { title: 'SEO-копирайтер', description: 'Профессиональные SEO-тексты, которые ранжируются и конвертируют.', href: '/leistungen/seo-texter' },
    { title: 'Агентство Google Ads', description: 'Быстрые результаты с платной рекламой.', href: '/leistungen/google-ads-agentur' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'Keine Vertragsfalle', description: 'Nach 6 Monaten monatlich kuendbar.' },
    { title: 'Transparente Reports', description: 'Sie sehen jeden Monat den Fortschritt.' },
    { title: 'Persoenlicher Ansprechpartner', description: 'Direkter Kontakt, keine Callcenter.' },
    { title: 'Nachhaltige Strategien', description: 'Keine Black-Hat-Tricks, nur Qualitaet.' },
  ],
  en: [
    { title: 'No Contract Trap', description: 'Monthly cancellable after 6 months.' },
    { title: 'Transparent Reports', description: 'You see progress every month.' },
    { title: 'Personal Contact', description: 'Direct contact, no call centers.' },
    { title: 'Sustainable Strategies', description: 'No black-hat tricks, only quality.' },
  ],
  ru: [
    { title: 'Без ловушки в договоре', description: 'Ежемесячное расторжение после 6 месяцев.' },
    { title: 'Прозрачные отчёты', description: 'Вы видите прогресс каждый месяц.' },
    { title: 'Персональный контакт', description: 'Прямой контакт, без колл-центров.' },
    { title: 'Устойчивые стратегии', description: 'Никаких чёрных методов, только качество.' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = { de: 'SEO Betreuung Wien - Laufende SEO-Optimierung ab 590 EUR | GoldenWing', en: 'SEO Support Vienna - Ongoing SEO Optimization from 590 EUR | GoldenWing', ru: 'SEO-сопровождение Вена - Постоянная SEO-оптимизация от 590 EUR | GoldenWing' }[locale] ?? 'SEO Support Vienna - Ongoing SEO Optimization from 590 EUR | GoldenWing'

  const metaDescription = truncateMetaDescription(
    { de: 'Laufende SEO Betreuung ab 590 EUR/Monat. Technisches SEO, Content-Optimierung, Backlink-Aufbau und monatliches Reporting. Nach 6 Monaten monatlich kuendbar.', en: 'Ongoing SEO support from 590 EUR/month. Technical SEO, content optimization, link building and monthly reporting. Monthly cancellable after 6 months.', ru: 'Постоянное SEO-сопровождение от 590 EUR/месяц. Техническое SEO, оптимизация контента, наращивание ссылочной массы и ежемесячная отчётность. Ежемесячное расторжение после 6 месяцев.' }[locale] ?? 'Ongoing SEO support from 590 EUR/month. Technical SEO, content optimization, link building and monthly reporting. Monthly cancellable after 6 months.'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/seo-betreuung', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: { de: ['SEO Betreuung', 'SEO Betreuung Wien', 'laufende SEO Optimierung', 'SEO monatlich', 'SEO Service', 'SEO Support', 'SEO Agentur'], en: ['SEO Support', 'SEO Support Vienna', 'ongoing SEO optimization', 'monthly SEO', 'SEO Service', 'SEO Agency'], ru: ['SEO сопровождение', 'SEO сопровождение Вена', 'постоянная SEO оптимизация', 'ежемесячное SEO', 'SEO услуги', 'SEO агентство'] }[locale] ?? ['SEO Support', 'SEO Support Vienna', 'ongoing SEO optimization', 'monthly SEO', 'SEO Service', 'SEO Agency'],
    openGraph: {
      title: { de: 'SEO Betreuung Wien', en: 'SEO Support Vienna', ru: 'SEO-сопровождение Вена' }[locale] ?? 'SEO Support Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/seo-betreuung', locale),
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/seo-betreuung', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoBetreuungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  const heroData = {
    badge: { de: 'SEO Betreuung', en: 'SEO Support', ru: 'SEO-сопровождение' }[locale] ?? 'SEO Support',
    title: { de: 'SEO Betreuung', en: 'SEO Support', ru: 'SEO-сопровождение' }[locale] ?? 'SEO Support',
    subtitle: { de: 'Kontinuierlich. Messbar. Nachhaltig.', en: 'Continuous. Measurable. Sustainable.', ru: 'Непрерывно. Измеримо. Устойчиво.' }[locale] ?? 'Continuous. Measurable. Sustainable.',
    description: { de: 'Laufende SEO-Betreuung fuer nachhaltige Sichtbarkeit. Technische Optimierung, Content-Updates, Linkaufbau und monatliches Reporting. Ihre Rankings sind unsere Verantwortung.', en: 'Ongoing SEO support for sustainable visibility. Technical optimization, content updates, link building, and monthly reporting. Your rankings are our responsibility.', ru: 'Постоянное SEO-сопровождение для устойчивой видимости. Техническая оптимизация, обновление контента, наращивание ссылок и ежемесячная отчётность. Ваши позиции — наша ответственность.' }[locale] ?? 'Ongoing SEO support for sustainable visibility. Technical optimization, content updates, link building, and monthly reporting. Your rankings are our responsibility.',
    ctaPrimary: { de: 'SEO Betreuung starten', en: 'Start SEO Support', ru: 'Начать SEO-сопровождение' }[locale] ?? 'Start SEO Support',
    ctaSecondary: { de: 'Pakete ansehen', en: 'View Packages', ru: 'Посмотреть пакеты' }[locale] ?? 'View Packages',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']

  const servicesTitle = { de: 'Was SEO Betreuung beinhaltet', en: 'What\'s Included in SEO Support', ru: 'Что включает SEO-сопровождение' }[locale] ?? 'What\'s Included in SEO Support'
  const servicesDescription = { de: 'Alle laufenden Massnahmen fuer nachhaltigen SEO-Erfolg.', en: 'All ongoing measures for sustainable SEO success.', ru: 'Все постоянные меры для устойчивого SEO-успеха.' }[locale] ?? 'All ongoing measures for sustainable SEO success.'
  const pricingTitle = { de: 'SEO Betreuungs-Pakete', en: 'SEO Support Packages', ru: 'Пакеты SEO-сопровождения' }[locale] ?? 'SEO Support Packages'
  const pricingDescription = { de: 'Transparente Monatspreise. Keine versteckten Kosten.', en: 'Transparent monthly prices. No hidden costs.', ru: 'Прозрачные ежемесячные цены. Никаких скрытых расходов.' }[locale] ?? 'Transparent monthly prices. No hidden costs.'
  const processTitle = { de: 'So laeuft SEO Betreuung ab', en: 'How SEO Support Works', ru: 'Как работает SEO-сопровождение' }[locale] ?? 'How SEO Support Works'
  const processDescription = { de: 'Strukturierter Ablauf fuer kontinuierliche Verbesserung.', en: 'Structured process for continuous improvement.', ru: 'Структурированный процесс для непрерывного улучшения.' }[locale] ?? 'Structured process for continuous improvement.'
  const faqTitle = { de: 'Haeufige Fragen zur SEO Betreuung', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer nachhaltige SEO-Erfolge?', en: 'Ready for Sustainable SEO Success?', ru: 'Готовы к устойчивому SEO-успеху?' }[locale] ?? 'Ready for Sustainable SEO Success?'
  const ctaDescription = { de: 'Starten Sie mit einer kostenlosen Erstberatung. Wir analysieren Ihre Situation und zeigen Ihnen das Potenzial.', en: 'Start with a free initial consultation. We analyze your situation and show you the potential.', ru: 'Начните с бесплатной первичной консультации. Мы проанализируем вашу ситуацию и покажем потенциал.' }[locale] ?? 'Start with a free initial consultation. We analyze your situation and show you the potential.'
  const ctaButton = { de: 'Kostenlose Beratung starten', en: 'Start Free Consultation', ru: 'Начать бесплатную консультацию' }[locale] ?? 'Start Free Consultation'
  const uspsTitle = { de: 'Warum unsere SEO Betreuung', en: 'Why Our SEO Support', ru: 'Почему наше SEO-сопровождение' }[locale] ?? 'Why Our SEO Support'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'SEO Betreuung', en: 'SEO Support', ru: 'SEO-сопровождение' }[locale] ?? 'SEO Support',
    alternateName: { de: 'Laufende SEO-Optimierung', en: 'Ongoing SEO Optimization', ru: 'Постоянная SEO-оптимизация' }[locale] ?? 'Ongoing SEO Optimization',
    url: 'https://goldenwing.at/leistungen/seo-betreuung',
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
    description: { de: 'Laufende SEO-Betreuung mit technischer Optimierung, Content-Updates, Linkaufbau und monatlichem Reporting.', en: 'Ongoing SEO support with technical optimization, content updates, link building and monthly reporting.', ru: 'Постоянное SEO-сопровождение с технической оптимизацией, обновлением контента, наращиванием ссылок и ежемесячной отчётностью.' }[locale] ?? 'Ongoing SEO support with technical optimization, content updates, link building and monthly reporting.',
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('.', '').replace(',', '').replace(' ', ''),
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
