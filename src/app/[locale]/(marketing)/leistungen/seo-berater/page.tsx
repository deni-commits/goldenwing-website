import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Search, TrendingUp, Target, BarChart3, Users, Lightbulb, CheckCircle, Phone, LucideIcon } from 'lucide-react'
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
  'search': Search,
  'trending-up': TrendingUp,
  'target': Target,
  'bar-chart-3': BarChart3,
  'users': Users,
  'lightbulb': Lightbulb,
}

// Default content for SEO Berater page
const defaultServices = {
  de: [
    { icon: 'search', title: 'SEO Audit', description: 'Umfassende Analyse Ihrer Website: Technisches SEO, OnPage, OffPage, Content und Wettbewerb. Mit konkreten Handlungsempfehlungen.' },
    { icon: 'lightbulb', title: 'SEO Strategie', description: 'Individuelle SEO-Strategie basierend auf Ihren Zielen, Ihrer Branche und Ihrem Budget. Priorisierte Massnahmenplaene.' },
    { icon: 'users', title: 'SEO Coaching', description: 'Schulungen fuer Ihr Team: Von SEO-Grundlagen bis zu fortgeschrittenen Techniken. Praxisnah und verstaendlich.' },
    { icon: 'bar-chart-3', title: 'Laufende Betreuung', description: 'Monatliche SEO-Beratung mit Monitoring, Reporting und kontinuierlicher Optimierung Ihrer Strategie.' },
    { icon: 'target', title: 'Keyword-Strategie', description: 'Datenbasierte Keyword-Recherche und Priorisierung. Identifikation von Quick Wins und langfristigen Zielen.' },
    { icon: 'trending-up', title: 'Wettbewerbsanalyse', description: 'Analyse Ihrer Konkurrenz: Wo stehen Sie? Welche Luecken gibt es? Wie koennen Sie ueberholen?' },
  ],
  en: [
    { icon: 'search', title: 'SEO Audit', description: 'Comprehensive website analysis: Technical SEO, OnPage, OffPage, content, and competition. With concrete recommendations.' },
    { icon: 'lightbulb', title: 'SEO Strategy', description: 'Individual SEO strategy based on your goals, industry, and budget. Prioritized action plans.' },
    { icon: 'users', title: 'SEO Coaching', description: 'Training for your team: From SEO basics to advanced techniques. Practical and understandable.' },
    { icon: 'bar-chart-3', title: 'Ongoing Support', description: 'Monthly SEO consulting with monitoring, reporting, and continuous optimization of your strategy.' },
    { icon: 'target', title: 'Keyword Strategy', description: 'Data-driven keyword research and prioritization. Identification of quick wins and long-term goals.' },
    { icon: 'trending-up', title: 'Competitor Analysis', description: 'Competitor analysis: Where do you stand? What gaps exist? How can you overtake?' },
  ],
  ru: [
    { icon: 'search', title: 'SEO-аудит', description: 'Комплексный анализ вашего сайта: техническое SEO, OnPage, OffPage, контент и конкуренты. С конкретными рекомендациями.' },
    { icon: 'lightbulb', title: 'SEO-стратегия', description: 'Индивидуальная SEO-стратегия на основе ваших целей, отрасли и бюджета. Приоритизированные планы действий.' },
    { icon: 'users', title: 'SEO-коучинг', description: 'Обучение для вашей команды: от основ SEO до продвинутых техник. Практично и понятно.' },
    { icon: 'bar-chart-3', title: 'Постоянная поддержка', description: 'Ежемесячные SEO-консультации с мониторингом, отчетностью и непрерывной оптимизацией вашей стратегии.' },
    { icon: 'target', title: 'Стратегия ключевых слов', description: 'Исследование и приоритизация ключевых слов на основе данных. Выявление быстрых побед и долгосрочных целей.' },
    { icon: 'trending-up', title: 'Анализ конкурентов', description: 'Анализ ваших конкурентов: где вы находитесь? Какие есть пробелы? Как вы можете их обогнать?' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEO Audit', price: '990', priceType: 'ab', description: 'Einmalige Website-Analyse', popular: false, features: ['Technisches SEO-Audit', 'OnPage-Analyse', 'Content-Bewertung', 'Backlink-Check', 'Wettbewerbsanalyse', 'Priorisierte Massnahmenliste', 'PDF-Report (30+ Seiten)', '60-Min. Praesentationscall'] },
    { name: 'Strategie Workshop', price: '1.490', priceType: 'ab', description: 'Halbtaegiger SEO-Workshop', popular: true, features: ['Vorab SEO-Quick-Audit', '4 Stunden Workshop', 'Keyword-Strategie', 'Content-Roadmap', 'Technische Prioritaeten', 'Massnahmenplan 6 Monate', 'Aufzeichnung inklusive', 'Follow-up Call nach 4 Wochen'] },
    { name: 'Monatliche Beratung', price: '590', priceType: 'ab/Monat', description: 'Laufende SEO-Betreuung', popular: false, features: ['Monatliches Strategie-Call', 'Keyword-Monitoring', 'Ranking-Tracking', 'Wettbewerbs-Updates', 'Content-Empfehlungen', 'Technische Checks', 'Priorisierte To-do-Liste', 'E-Mail-Support'] },
    { name: 'SEO Coaching', price: '1.990', priceType: 'ab', description: 'Team-Schulung (1 Tag)', popular: false, features: ['Ganztaegiges Training', 'Bis zu 6 Teilnehmer', 'Individuelle Inhalte', 'Hands-on Uebungen', 'Schulungsmaterial', 'Teilnahmezertifikate', 'Q&A Session', '30-Tage E-Mail-Support'] },
  ],
  en: [
    { name: 'SEO Audit', price: '990', priceType: 'from', description: 'One-time website analysis', popular: false, features: ['Technical SEO audit', 'OnPage analysis', 'Content evaluation', 'Backlink check', 'Competitor analysis', 'Prioritized action list', 'PDF report (30+ pages)', '60-min presentation call'] },
    { name: 'Strategy Workshop', price: '1,490', priceType: 'from', description: 'Half-day SEO workshop', popular: true, features: ['Preliminary SEO quick audit', '4-hour workshop', 'Keyword strategy', 'Content roadmap', 'Technical priorities', '6-month action plan', 'Recording included', 'Follow-up call after 4 weeks'] },
    { name: 'Monthly Consulting', price: '590', priceType: 'from/month', description: 'Ongoing SEO support', popular: false, features: ['Monthly strategy call', 'Keyword monitoring', 'Ranking tracking', 'Competitor updates', 'Content recommendations', 'Technical checks', 'Prioritized to-do list', 'Email support'] },
    { name: 'SEO Coaching', price: '1,990', priceType: 'from', description: 'Team training (1 day)', popular: false, features: ['Full-day training', 'Up to 6 participants', 'Customized content', 'Hands-on exercises', 'Training materials', 'Certificates', 'Q&A session', '30-day email support'] },
  ],
  ru: [
    { name: 'SEO-аудит', price: '990', priceType: 'от', description: 'Разовый анализ сайта', popular: false, features: ['Технический SEO-аудит', 'OnPage-анализ', 'Оценка контента', 'Проверка обратных ссылок', 'Анализ конкурентов', 'Приоритизированный список действий', 'PDF-отчет (30+ страниц)', '60-мин. презентационный звонок'] },
    { name: 'Стратегический воркшоп', price: '1 490', priceType: 'от', description: 'Полудневной SEO-воркшоп', popular: true, features: ['Предварительный экспресс-аудит SEO', '4-часовой воркшоп', 'Стратегия ключевых слов', 'Дорожная карта контента', 'Технические приоритеты', 'План действий на 6 месяцев', 'Запись включена', 'Контрольный звонок через 4 недели'] },
    { name: 'Ежемесячные консультации', price: '590', priceType: 'от/месяц', description: 'Постоянная SEO-поддержка', popular: false, features: ['Ежемесячный стратегический звонок', 'Мониторинг ключевых слов', 'Отслеживание позиций', 'Обновления по конкурентам', 'Рекомендации по контенту', 'Технические проверки', 'Приоритизированный список задач', 'Поддержка по электронной почте'] },
    { name: 'SEO-коучинг', price: '1 990', priceType: 'от', description: 'Обучение команды (1 день)', popular: false, features: ['Полнодневное обучение', 'До 6 участников', 'Индивидуальный контент', 'Практические упражнения', 'Учебные материалы', 'Сертификаты', 'Сессия вопросов и ответов', '30-дневная поддержка по email'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '200+', label: 'SEO Audits durchgefuehrt', client: 'Seit 2018' },
    { metric: '+215%', label: 'Durchschnittliche Traffic-Steigerung', client: 'Nach 12 Monaten' },
    { metric: '50+', label: 'Unternehmen beraten', client: 'Im DACH-Raum' },
  ],
  en: [
    { metric: '200+', label: 'SEO audits conducted', client: 'Since 2018' },
    { metric: '+215%', label: 'Average traffic increase', client: 'After 12 months' },
    { metric: '50+', label: 'Companies advised', client: 'In DACH region' },
  ],
  ru: [
    { metric: '200+', label: 'Проведено SEO-аудитов', client: 'С 2018 года' },
    { metric: '+215%', label: 'Средний рост трафика', client: 'Через 12 месяцев' },
    { metric: '50+', label: 'Консультированных компаний', client: 'В регионе DACH' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was bringt mir ein SEO Audit?', answer: 'Ein SEO Audit zeigt Ihnen genau, wo Ihre Website steht und was Sie verbessern koennen. Sie erhalten eine priorisierte Liste mit konkreten Massnahmen, die Sie selbst umsetzen oder von uns durchfuehren lassen koennen. Das Audit ist die Grundlage fuer jede erfolgreiche SEO-Strategie.' },
    { question: 'Wie lange dauert es, bis SEO-Beratung Ergebnisse zeigt?', answer: 'Erste Verbesserungen sehen Sie oft nach 3-4 Monaten. Signifikante Ergebnisse und stabile Top-Rankings erreichen Sie typischerweise nach 6-12 Monaten. SEO ist eine langfristige Investition - wir setzen auf nachhaltige Strategien statt kurzfristiger Tricks.' },
    { question: 'Was kostet SEO-Beratung?', answer: 'Unser SEO Audit startet ab 990 Euro einmalig. Der Strategie-Workshop kostet ab 1.490 Euro. Fuer laufende Beratung berechnen wir ab 590 Euro monatlich. Die genauen Kosten haengen von Ihrer Website-Groesse und Ihren Zielen ab.' },
    { question: 'Setzen Sie die Massnahmen auch um?', answer: 'Wir bieten sowohl reine Beratung als auch Umsetzung an. Als SEO-Berater geben wir Ihnen das Wissen und die Strategie - Ihr Team setzt um. Alternativ uebernehmen wir auch die Implementierung als Full-Service SEO-Agentur.' },
    { question: 'Fuer wen eignet sich SEO-Beratung?', answer: 'SEO-Beratung eignet sich fuer Unternehmen mit eigenem Marketing-Team, die ihr SEO-Wissen vertiefen wollen. Auch fuer Unternehmen, die eine zweite Meinung zu ihrer aktuellen SEO-Strategie suchen oder intern aufbauen wollen.' },
    { question: 'Wie unterscheidet sich Beratung von Agentur-Leistungen?', answer: 'Bei der Beratung geben wir Wissen weiter und entwickeln Strategien - Sie setzen selbst um. Als Agentur uebernehmen wir die komplette Umsetzung. Beratung ist ideal, wenn Sie ein Marketing-Team haben und unabhaengig werden wollen.' },
  ],
  en: [
    { question: 'What does an SEO audit do for me?', answer: 'An SEO audit shows you exactly where your website stands and what you can improve. You receive a prioritized list of concrete measures that you can implement yourself or have us carry out. The audit is the foundation for any successful SEO strategy.' },
    { question: 'How long until SEO consulting shows results?', answer: 'You often see first improvements after 3-4 months. Significant results and stable top rankings are typically achieved after 6-12 months. SEO is a long-term investment - we focus on sustainable strategies rather than short-term tricks.' },
    { question: 'How much does SEO consulting cost?', answer: 'Our SEO audit starts at 990 euros one-time. The strategy workshop costs from 1,490 euros. For ongoing consulting, we charge from 590 euros monthly. The exact costs depend on your website size and goals.' },
    { question: 'Do you also implement the measures?', answer: 'We offer both pure consulting and implementation. As SEO consultants, we give you the knowledge and strategy - your team implements. Alternatively, we also handle implementation as a full-service SEO agency.' },
    { question: 'Who is SEO consulting suitable for?', answer: 'SEO consulting is suitable for companies with their own marketing team who want to deepen their SEO knowledge. Also for companies seeking a second opinion on their current SEO strategy or wanting to build in-house capabilities.' },
    { question: 'How does consulting differ from agency services?', answer: 'With consulting, we transfer knowledge and develop strategies - you implement yourself. As an agency, we handle complete implementation. Consulting is ideal if you have a marketing team and want to become independent.' },
  ],
  ru: [
    { question: 'Что мне дает SEO-аудит?', answer: 'SEO-аудит показывает вам точно, где находится ваш сайт и что можно улучшить. Вы получаете приоритизированный список конкретных мер, которые можете реализовать самостоятельно или поручить нам. Аудит - это основа любой успешной SEO-стратегии.' },
    { question: 'Как скоро SEO-консультирование покажет результаты?', answer: 'Первые улучшения часто видны через 3-4 месяца. Значительные результаты и стабильные топовые позиции обычно достигаются через 6-12 месяцев. SEO - это долгосрочная инвестиция - мы делаем ставку на устойчивые стратегии, а не на краткосрочные трюки.' },
    { question: 'Сколько стоит SEO-консультирование?', answer: 'Наш SEO-аудит начинается от 990 евро единоразово. Стратегический воркшоп стоит от 1 490 евро. За постоянные консультации мы берем от 590 евро в месяц. Точная стоимость зависит от размера вашего сайта и ваших целей.' },
    { question: 'Вы также реализуете рекомендации?', answer: 'Мы предлагаем как чистое консультирование, так и реализацию. Как SEO-консультанты мы даем вам знания и стратегию - ваша команда реализует. Альтернативно, мы также берем на себя внедрение как SEO-агентство полного цикла.' },
    { question: 'Для кого подходит SEO-консультирование?', answer: 'SEO-консультирование подходит для компаний с собственной маркетинговой командой, которые хотят углубить свои знания SEO. Также для компаний, которые ищут второе мнение о своей текущей SEO-стратегии или хотят развивать внутренние компетенции.' },
    { question: 'Чем консультирование отличается от агентских услуг?', answer: 'При консультировании мы передаем знания и разрабатываем стратегии - вы реализуете сами. Как агентство мы берем на себя полную реализацию. Консультирование идеально, если у вас есть маркетинговая команда и вы хотите стать независимыми.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Erstgespraech', description: 'Ihre Ziele und Herausforderungen verstehen' },
    { step: '02', title: 'Analyse', description: 'Tiefgehende Analyse Ihrer Website und Branche' },
    { step: '03', title: 'Strategie', description: 'Individuelle Strategie mit klaren Prioritaeten' },
    { step: '04', title: 'Praesentation', description: 'Ausfuehrliche Besprechung der Ergebnisse' },
    { step: '05', title: 'Begleitung', description: 'Optionale Unterstuetzung bei der Umsetzung' },
  ],
  en: [
    { step: '01', title: 'Initial Talk', description: 'Understand your goals and challenges' },
    { step: '02', title: 'Analysis', description: 'Deep analysis of your website and industry' },
    { step: '03', title: 'Strategy', description: 'Individual strategy with clear priorities' },
    { step: '04', title: 'Presentation', description: 'Detailed discussion of results' },
    { step: '05', title: 'Support', description: 'Optional assistance with implementation' },
  ],
  ru: [
    { step: '01', title: 'Первичная беседа', description: 'Понимание ваших целей и задач' },
    { step: '02', title: 'Анализ', description: 'Глубокий анализ вашего сайта и отрасли' },
    { step: '03', title: 'Стратегия', description: 'Индивидуальная стратегия с четкими приоритетами' },
    { step: '04', title: 'Презентация', description: 'Детальное обсуждение результатов' },
    { step: '05', title: 'Сопровождение', description: 'Опциональная поддержка при реализации' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'SEO Texter', description: 'Professionelle SEO-Texte, die ranken und konvertieren.', href: '/leistungen/seo-texter' },
    { title: 'SEO & Content', description: 'Komplette SEO-Umsetzung durch unsere Agentur.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Schnelle Ergebnisse mit bezahlter Werbung.', href: '/leistungen/google-ads-agentur' },
  ],
  en: [
    { title: 'SEO Copywriter', description: 'Professional SEO copy that ranks and converts.', href: '/leistungen/seo-texter' },
    { title: 'SEO & Content', description: 'Complete SEO implementation by our agency.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Quick results with paid advertising.', href: '/leistungen/google-ads-agentur' },
  ],
  ru: [
    { title: 'SEO-копирайтер', description: 'Профессиональные SEO-тексты, которые ранжируются и конвертируют.', href: '/leistungen/seo-texter' },
    { title: 'SEO и контент', description: 'Полная реализация SEO нашим агентством.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Быстрые результаты с платной рекламой.', href: '/leistungen/google-ads-agentur' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: '10+ Jahre Erfahrung', description: 'Tiefgreifende SEO-Expertise aus hunderten Projekten.' },
    { title: 'Datengetrieben', description: 'Entscheidungen basieren auf Daten, nicht auf Vermutungen.' },
    { title: 'Praxisorientiert', description: 'Konkrete Handlungsempfehlungen, keine theoretischen Abhandlungen.' },
    { title: 'DACH-Expertise', description: 'Spezialisiert auf den deutschsprachigen Markt.' },
  ],
  en: [
    { title: '10+ Years Experience', description: 'Deep SEO expertise from hundreds of projects.' },
    { title: 'Data-Driven', description: 'Decisions based on data, not assumptions.' },
    { title: 'Practice-Oriented', description: 'Concrete recommendations, not theoretical treatises.' },
    { title: 'DACH Expertise', description: 'Specialized in the German-speaking market.' },
  ],
  ru: [
    { title: '10+ лет опыта', description: 'Глубокая SEO-экспертиза из сотен проектов.' },
    { title: 'Основано на данных', description: 'Решения основаны на данных, а не на предположениях.' },
    { title: 'Практическая направленность', description: 'Конкретные рекомендации, а не теоретические трактаты.' },
    { title: 'Экспертиза DACH', description: 'Специализация на немецкоязычном рынке.' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = {
    de: 'SEO Berater Wien - Strategische SEO-Beratung & Audits | GoldenWing',
    en: 'SEO Consultant Vienna - Strategic SEO Consulting & Audits | GoldenWing',
    ru: 'SEO-консультант Вена - Стратегический SEO-консалтинг и аудиты | GoldenWing',
  }[locale] ?? 'SEO Consultant Vienna - Strategic SEO Consulting & Audits | GoldenWing'

  const metaDescription = truncateMetaDescription(
    {
      de: 'SEO Berater aus Wien: Audits ab 990 Euro, Strategie-Workshops ab 1.490 Euro, monatliche Beratung ab 590 Euro. 10+ Jahre Erfahrung im DACH-Raum. Jetzt beraten lassen!',
      en: 'SEO consultant from Vienna: Audits from 990 euros, strategy workshops from 1,490 euros, monthly consulting from 590 euros. 10+ years experience in DACH region. Get advice now!',
      ru: 'SEO-консультант из Вены: аудиты от 990 евро, стратегические воркшопы от 1 490 евро, ежемесячные консультации от 590 евро. 10+ лет опыта в регионе DACH. Получите консультацию!',
    }[locale] ?? 'SEO consultant from Vienna: Audits from 990 euros, strategy workshops from 1,490 euros, monthly consulting from 590 euros. 10+ years experience in DACH region. Get advice now!'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/seo-berater', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: {
      de: ['SEO Berater', 'SEO Berater Wien', 'SEO Beratung', 'SEO Consultant', 'SEO Audit', 'SEO Strategie', 'SEO Coaching'],
      en: ['SEO Consultant', 'SEO Consultant Vienna', 'SEO Consulting', 'SEO Audit', 'SEO Strategy', 'SEO Coaching'],
      ru: ['SEO-консультант', 'SEO-консультант Вена', 'SEO-консалтинг', 'SEO-аудит', 'SEO-стратегия', 'SEO-коучинг'],
    }[locale] ?? ['SEO Consultant', 'SEO Consultant Vienna', 'SEO Consulting', 'SEO Audit', 'SEO Strategy', 'SEO Coaching'],
    openGraph: {
      title: { de: 'SEO Berater Wien', en: 'SEO Consultant Vienna', ru: 'SEO-консультант Вена' }[locale] ?? 'SEO Consultant Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/seo-berater', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - SEO Berater' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/seo-berater', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoBeraterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
    { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale] ?? 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/services' }[locale] ?? 'https://goldenwing.at/en/services' },
    { name: { de: 'SEO Berater', en: 'SEO Consultant', ru: 'SEO-консультант' }[locale] ?? 'SEO Consultant', url: { de: 'https://goldenwing.at/leistungen/seo-berater', en: 'https://goldenwing.at/en/services/seo-consultant', ru: 'https://goldenwing.at/ru/services/seo-consultant' }[locale] ?? 'https://goldenwing.at/en/services/seo-consultant' },
  ]

  const heroData = {
    badge: { de: 'SEO Berater', en: 'SEO Consultant', ru: 'SEO-консультант' }[locale] ?? 'SEO Consultant',
    title: { de: 'SEO Berater Wien', en: 'SEO Consultant Vienna', ru: 'SEO-консультант Вена' }[locale] ?? 'SEO Consultant Vienna',
    subtitle: { de: 'Strategie. Wissen. Ergebnisse.', en: 'Strategy. Knowledge. Results.', ru: 'Стратегия. Знания. Результаты.' }[locale] ?? 'Strategy. Knowledge. Results.',
    description: {
      de: 'Strategische SEO-Beratung fuer nachhaltiges Wachstum. SEO-Audits, Strategie-Workshops, Team-Coaching und laufende Betreuung. Datengetrieben, praxisorientiert und auf Ihre Ziele zugeschnitten.',
      en: 'Strategic SEO consulting for sustainable growth. SEO audits, strategy workshops, team coaching, and ongoing support. Data-driven, practice-oriented, and tailored to your goals.',
      ru: 'Стратегический SEO-консалтинг для устойчивого роста. SEO-аудиты, стратегические воркшопы, командный коучинг и постоянная поддержка. На основе данных, практико-ориентированный и адаптированный под ваши цели.',
    }[locale] ?? 'Strategic SEO consulting for sustainable growth. SEO audits, strategy workshops, team coaching, and ongoing support. Data-driven, practice-oriented, and tailored to your goals.',
    ctaPrimary: { de: 'Kostenloses Erstgespraech', en: 'Free Initial Consultation', ru: 'Бесплатная первичная консультация' }[locale] ?? 'Free Initial Consultation',
    ctaSecondary: { de: 'Leistungen ansehen', en: 'View Services', ru: 'Смотреть услуги' }[locale] ?? 'View Services',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']

  const servicesTitle = { de: 'Unsere SEO-Beratungsleistungen', en: 'Our SEO Consulting Services', ru: 'Наши услуги SEO-консалтинга' }[locale] ?? 'Our SEO Consulting Services'
  const servicesDescription = {
    de: 'Von einmaligen Audits bis zur laufenden strategischen Begleitung - wir beraten Sie in jeder Phase Ihrer SEO-Reise.',
    en: 'From one-time audits to ongoing strategic support - we advise you at every stage of your SEO journey.',
    ru: 'От разовых аудитов до постоянной стратегической поддержки - мы консультируем вас на каждом этапе вашего SEO-пути.',
  }[locale] ?? 'From one-time audits to ongoing strategic support - we advise you at every stage of your SEO journey.'
  const pricingTitle = { de: 'SEO-Beratungspakete', en: 'SEO Consulting Packages', ru: 'Пакеты SEO-консалтинга' }[locale] ?? 'SEO Consulting Packages'
  const pricingDescription = {
    de: 'Transparente Preise fuer professionelle SEO-Beratung.',
    en: 'Transparent pricing for professional SEO consulting.',
    ru: 'Прозрачные цены на профессиональный SEO-консалтинг.',
  }[locale] ?? 'Transparent pricing for professional SEO consulting.'
  const processTitle = { de: 'So arbeiten wir', en: 'How We Work', ru: 'Как мы работаем' }[locale] ?? 'How We Work'
  const processDescription = {
    de: 'Strukturierter Beratungsprozess fuer maximale Wirkung.',
    en: 'Structured consulting process for maximum impact.',
    ru: 'Структурированный процесс консалтинга для максимального эффекта.',
  }[locale] ?? 'Structured consulting process for maximum impact.'
  const faqTitle = { de: 'Haeufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Sie brauchen strategische SEO-Beratung?', en: 'Need Strategic SEO Guidance?', ru: 'Нужно стратегическое SEO-руководство?' }[locale] ?? 'Need Strategic SEO Guidance?'
  const ctaDescription = {
    de: 'Lassen Sie uns besprechen, wie wir Ihnen helfen koennen, Ihre SEO-Ziele zu erreichen. Kostenloses Erstgespraech.',
    en: 'Let\'s discuss how we can help you achieve your SEO goals. Free initial consultation.',
    ru: 'Давайте обсудим, как мы можем помочь вам достичь ваших SEO-целей. Бесплатная первичная консультация.',
  }[locale] ?? 'Let\'s discuss how we can help you achieve your SEO goals. Free initial consultation.'
  const ctaButton = { de: 'Beratungsgespraech vereinbaren', en: 'Schedule Consultation', ru: 'Записаться на консультацию' }[locale] ?? 'Schedule Consultation'
  const uspsTitle = { de: 'Warum unsere Beratung', en: 'Why Our Consulting', ru: 'Почему наш консалтинг' }[locale] ?? 'Why Our Consulting'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'SEO Berater Wien', en: 'SEO Consultant Vienna', ru: 'SEO-консультант Вена' }[locale] ?? 'SEO Consultant Vienna',
    alternateName: { de: 'SEO Beratung Wien', en: 'SEO Consulting Vienna', ru: 'SEO-консалтинг Вена' }[locale] ?? 'SEO Consulting Vienna',
    url: 'https://goldenwing.at/leistungen/seo-berater',
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
      de: 'Professionelle SEO-Beratung in Wien. SEO-Audits, Strategie-Workshops, Team-Coaching und laufende Betreuung.',
      en: 'Professional SEO consulting services in Vienna. SEO audits, strategy workshops, team coaching, and ongoing support.',
      ru: 'Профессиональные услуги SEO-консалтинга в Вене. SEO-аудиты, стратегические воркшопы, командный коучинг и постоянная поддержка.',
    }[locale] ?? 'Professional SEO consulting services in Vienna. SEO audits, strategy workshops, team coaching, and ongoing support.',
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
                <NextLink href="#leistungen">{heroData.ctaSecondary}</NextLink>
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
      <section id="leistungen" className="py-20 bg-muted/30 scroll-mt-20">
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
                    <Badge>{{ de: 'Beliebt', en: 'Popular', ru: 'Популярный' }[locale] ?? 'Popular'}</Badge>
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
