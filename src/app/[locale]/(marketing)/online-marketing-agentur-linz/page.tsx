import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Search, TrendingUp, Target, BarChart3, Globe, FileText, CheckCircle, Phone, Megaphone, Mail, Share2, LucideIcon } from 'lucide-react'
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
  'megaphone': Megaphone,
  'mail': Mail,
  'share-2': Share2,
}

// Default content for Online Marketing Linz - HIGH PRIORITY (Volume: 3,600)
const defaultContent = {
  de: {
    metaTitle: 'Online Marketing Agentur Linz | Digitales Marketing Oberoesterreich',
    metaDescription: 'Online Marketing Agentur in Linz. SEO, Google Ads, Social Media und Content Marketing fuer oberoesterreichische Unternehmen. Messbare Ergebnisse, lokale Expertise.',
    keywords: ['Online Marketing Agentur Linz', 'Digitales Marketing Linz', 'Online Marketing Linz', 'Digital Marketing Oberoesterreich', 'Werbeagentur Linz', 'Marketing Agentur Linz', 'Social Media Marketing Linz'],
    heroTitle: 'Online Marketing Agentur Linz – Digitales Wachstum fuer Oberoesterreich',
    heroDescription: 'Als Online Marketing Agentur in Linz entwickeln wir ganzheitliche Digitalstrategien fuer oberoesterreichische Unternehmen. Von SEO ueber Google Ads bis Social Media – wir bringen Sie zu Ihren Kunden.',
    heroBadge: 'Online Marketing Agentur Linz',
    ctaPrimary: 'Kostenlose Beratung',
    ctaSecondary: 'Marketing-Pakete ansehen',
  },
  en: {
    metaTitle: 'Online Marketing Agency Linz | Digital Marketing Upper Austria',
    metaDescription: 'Online marketing agency in Linz. SEO, Google Ads, social media and content marketing for Upper Austrian businesses. Measurable results, local expertise.',
    keywords: ['Online Marketing Agency Linz', 'Digital Marketing Linz', 'Online Marketing Linz', 'Digital Marketing Upper Austria', 'Advertising Agency Linz', 'Marketing Agency Linz', 'Social Media Marketing Linz'],
    heroTitle: 'Online Marketing Agency Linz – Digital Growth for Upper Austria',
    heroDescription: 'As an online marketing agency in Linz, we develop holistic digital strategies for Upper Austrian businesses. From SEO to Google Ads to social media – we connect you with your customers.',
    heroBadge: 'Online Marketing Agency Linz',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'View Marketing Packages',
  },
  ru: {
    metaTitle: 'Агентство онлайн-маркетинга Линц | Цифровой маркетинг Верхняя Австрия',
    metaDescription: 'Агентство онлайн-маркетинга в Линце. SEO, Google Ads, социальные сети и контент-маркетинг для компаний Верхней Австрии. Измеримые результаты, локальная экспертиза.',
    keywords: ['Агентство онлайн-маркетинга Линц', 'Цифровой маркетинг Линц', 'Онлайн-маркетинг Линц', 'Цифровой маркетинг Верхняя Австрия', 'Рекламное агентство Линц', 'Маркетинговое агентство Линц', 'SMM Линц'],
    heroTitle: 'Агентство онлайн-маркетинга Линц – Цифровой рост для Верхней Австрии',
    heroDescription: 'Как агентство онлайн-маркетинга в Линце, мы разрабатываем комплексные цифровые стратегии для компаний Верхней Австрии. От SEO до Google Ads и социальных сетей – мы связываем вас с вашими клиентами.',
    heroBadge: 'Агентство онлайн-маркетинга Линц',
    ctaPrimary: 'Бесплатная консультация',
    ctaSecondary: 'Посмотреть пакеты услуг',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Suchmaschinenoptimierung (SEO)', description: 'Nachhaltige Sichtbarkeit bei Google. Lokales SEO fuer Linz und Oberoesterreich, technische Optimierung und Content-Strategie.' },
    { icon: 'target', title: 'Google Ads (SEA)', description: 'Bezahlte Werbung mit messbarem ROI. Suchanzeigen, Display-Kampagnen und Shopping-Ads fuer den oberoesterreichischen Markt.' },
    { icon: 'share-2', title: 'Social Media Marketing', description: 'Praesenz auf Facebook, Instagram, LinkedIn und TikTok. Community Management und bezahlte Social Ads.' },
    { icon: 'file-text', title: 'Content Marketing', description: 'Hochwertige Inhalte, die ranken und konvertieren. Blog-Artikel, Landingpages und Multimedia-Content.' },
    { icon: 'mail', title: 'E-Mail Marketing', description: 'Newsletter-Kampagnen und Marketing Automation. Kundenbindung und Lead Nurturing fuer B2B und B2C.' },
    { icon: 'bar-chart-3', title: 'Web Analytics', description: 'Datenbasierte Entscheidungen. Google Analytics Setup, Conversion Tracking und monatliche Reports.' },
  ],
  en: [
    { icon: 'search', title: 'Search Engine Optimization (SEO)', description: 'Sustainable visibility on Google. Local SEO for Linz and Upper Austria, technical optimization and content strategy.' },
    { icon: 'target', title: 'Google Ads (SEA)', description: 'Paid advertising with measurable ROI. Search ads, display campaigns and shopping ads for the Upper Austrian market.' },
    { icon: 'share-2', title: 'Social Media Marketing', description: 'Presence on Facebook, Instagram, LinkedIn and TikTok. Community management and paid social ads.' },
    { icon: 'file-text', title: 'Content Marketing', description: 'High-quality content that ranks and converts. Blog articles, landing pages and multimedia content.' },
    { icon: 'mail', title: 'Email Marketing', description: 'Newsletter campaigns and marketing automation. Customer retention and lead nurturing for B2B and B2C.' },
    { icon: 'bar-chart-3', title: 'Web Analytics', description: 'Data-driven decisions. Google Analytics setup, conversion tracking and monthly reports.' },
  ],
  ru: [
    { icon: 'search', title: 'Поисковая оптимизация (SEO)', description: 'Устойчивая видимость в Google. Локальное SEO для Линца и Верхней Австрии, техническая оптимизация и контент-стратегия.' },
    { icon: 'target', title: 'Google Ads (SEA)', description: 'Платная реклама с измеримым ROI. Поисковые объявления, медийные кампании и торговые объявления для рынка Верхней Австрии.' },
    { icon: 'share-2', title: 'Маркетинг в социальных сетях', description: 'Присутствие в Facebook, Instagram, LinkedIn и TikTok. Управление сообществом и платная реклама в соцсетях.' },
    { icon: 'file-text', title: 'Контент-маркетинг', description: 'Качественный контент, который ранжируется и конвертирует. Статьи для блога, лендинги и мультимедийный контент.' },
    { icon: 'mail', title: 'Email-маркетинг', description: 'Рассылки и автоматизация маркетинга. Удержание клиентов и nurturing лидов для B2B и B2C.' },
    { icon: 'bar-chart-3', title: 'Веб-аналитика', description: 'Решения на основе данных. Настройка Google Analytics, отслеживание конверсий и ежемесячные отчеты.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Marketing Starter', price: '990', priceType: 'pro Monat', description: 'Fuer lokale Linzer Unternehmen', popular: false, features: ['SEO Grundoptimierung', 'Google Ads Kampagne (bis 500 EUR Budget)', 'Social Media (2 Kanaele)', 'Monatliches Reporting', '4 Stunden Support/Monat'] },
    { name: 'Marketing Business', price: '1.990', priceType: 'pro Monat', description: 'Fuer wachsende OOe Unternehmen', popular: true, features: ['Vollstaendige SEO-Betreuung', 'Google Ads (bis 1.500 EUR Budget)', 'Social Media (4 Kanaele)', 'Content-Erstellung (4 Beitraege)', 'E-Mail Marketing', 'Detailliertes Reporting', '10 Stunden Support/Monat'] },
    { name: 'Marketing Premium', price: '3.490', priceType: 'pro Monat', description: 'Full-Service fuer ambitionierte Ziele', popular: false, features: ['Enterprise SEO', 'Google Ads (bis 5.000 EUR Budget)', 'Multi-Channel Social Media', 'Content-Strategie & Produktion', 'Marketing Automation', 'Conversion-Optimierung', 'Dedizierter Account Manager', 'Woechentliche Strategy Calls'] },
  ],
  en: [
    { name: 'Marketing Starter', price: '990', priceType: 'per month', description: 'For local Linz businesses', popular: false, features: ['Basic SEO optimization', 'Google Ads campaign (up to 500 EUR budget)', 'Social media (2 channels)', 'Monthly reporting', '4 hours support/month'] },
    { name: 'Marketing Business', price: '1,990', priceType: 'per month', description: 'For growing Upper Austrian businesses', popular: true, features: ['Complete SEO management', 'Google Ads (up to 1,500 EUR budget)', 'Social media (4 channels)', 'Content creation (4 posts)', 'Email marketing', 'Detailed reporting', '10 hours support/month'] },
    { name: 'Marketing Premium', price: '3,490', priceType: 'per month', description: 'Full-service for ambitious goals', popular: false, features: ['Enterprise SEO', 'Google Ads (up to 5,000 EUR budget)', 'Multi-channel social media', 'Content strategy & production', 'Marketing automation', 'Conversion optimization', 'Dedicated account manager', 'Weekly strategy calls'] },
  ],
  ru: [
    { name: 'Marketing Starter', price: '990', priceType: 'в месяц', description: 'Для местных компаний Линца', popular: false, features: ['Базовая SEO-оптимизация', 'Кампания Google Ads (бюджет до 500 EUR)', 'Социальные сети (2 канала)', 'Ежемесячная отчетность', '4 часа поддержки/месяц'] },
    { name: 'Marketing Business', price: '1 990', priceType: 'в месяц', description: 'Для растущих компаний Верхней Австрии', popular: true, features: ['Полное SEO-сопровождение', 'Google Ads (бюджет до 1 500 EUR)', 'Социальные сети (4 канала)', 'Создание контента (4 публикации)', 'Email-маркетинг', 'Детальная отчетность', '10 часов поддержки/месяц'] },
    { name: 'Marketing Premium', price: '3 490', priceType: 'в месяц', description: 'Полный сервис для амбициозных целей', popular: false, features: ['Enterprise SEO', 'Google Ads (бюджет до 5 000 EUR)', 'Мультиканальные социальные сети', 'Контент-стратегия и производство', 'Автоматизация маркетинга', 'Оптимизация конверсий', 'Персональный менеджер', 'Еженедельные стратегические звонки'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+285%', label: 'Mehr Website-Traffic', client: 'E-Commerce Linz' },
    { metric: '4.2x', label: 'ROAS bei Google Ads', client: 'B2B Industriekunde' },
    { metric: '+156%', label: 'Mehr qualifizierte Leads', client: 'Dienstleister OOe' },
    { metric: 'Top 5', label: 'Rankings fuer 25 Keywords', client: 'Handelsunternehmen' },
  ],
  en: [
    { metric: '+285%', label: 'More website traffic', client: 'E-Commerce Linz' },
    { metric: '4.2x', label: 'ROAS on Google Ads', client: 'B2B industrial client' },
    { metric: '+156%', label: 'More qualified leads', client: 'Service provider Upper Austria' },
    { metric: 'Top 5', label: 'Rankings for 25 keywords', client: 'Trading company' },
  ],
  ru: [
    { metric: '+285%', label: 'Больше трафика на сайт', client: 'E-Commerce Линц' },
    { metric: '4.2x', label: 'ROAS в Google Ads', client: 'B2B промышленный клиент' },
    { metric: '+156%', label: 'Больше квалифицированных лидов', client: 'Сервисная компания Верхняя Австрия' },
    { metric: 'Top 5', label: 'Позиции по 25 ключевым словам', client: 'Торговая компания' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet Online Marketing in Linz?', answer: 'Unsere Online Marketing Pakete in Linz starten bei 990 Euro pro Monat fuer lokale Unternehmen. Business-Pakete mit vollem Leistungsumfang liegen bei 1.990 Euro pro Monat. Die genauen Kosten haengen von Ihren Zielen, Kanaelen und dem Wettbewerb in Ihrer Branche ab.' },
    { question: 'Welche Online Marketing Kanaele sind fuer Linzer Unternehmen am wichtigsten?', answer: 'Das haengt von Ihrer Zielgruppe ab. Fuer B2B-Industrieunternehmen in Oberoesterreich ist SEO und LinkedIn meist am effektivsten. Fuer B2C sind Google Ads und Facebook/Instagram oft die besten Kanaele. Wir analysieren Ihre Situation und empfehlen die optimale Kanalstrategie.' },
    { question: 'Wie schnell sehe ich Ergebnisse beim Online Marketing?', answer: 'Bei Google Ads sehen Sie erste Ergebnisse oft innerhalb weniger Tage. SEO benoetigt 3-6 Monate fuer signifikante Verbesserungen. Social Media baut organisch ueber Wochen Reichweite auf. Wir setzen auf einen Mix fuer schnelle Ergebnisse und nachhaltiges Wachstum.' },
    { question: 'Arbeitet ihr nur mit Unternehmen aus Linz?', answer: 'Unser Fokus liegt auf Oberoesterreich, aber wir betreuen auch Kunden aus anderen Bundeslaendern. Fuer lokale Linzer Kunden bieten wir persoenliche Termine vor Ort an. Remote-Zusammenarbeit funktioniert genauso gut – viele unserer Meetings finden online statt.' },
    { question: 'Wie messt ihr den Erfolg von Online Marketing?', answer: 'Wir definieren mit Ihnen klare KPIs: Traffic, Rankings, Conversions, Leads, ROAS bei Ads. Mit Google Analytics, Search Console und spezifischen Tracking-Tools messen wir den Erfolg transparent. Sie erhalten monatliche Reports mit allen wichtigen Kennzahlen.' },
    { question: 'Koennt ihr auch unsere Website erstellen oder verbessern?', answer: 'Ja, wir bieten auch Webdesign in Linz an. Eine gute Website ist die Grundlage fuer erfolgreiches Online Marketing. Wir koennen Ihre bestehende Website optimieren oder eine neue, conversion-optimierte Website entwickeln.' },
  ],
  en: [
    { question: 'How much does online marketing cost in Linz?', answer: 'Our online marketing packages in Linz start at 990 euros per month for local businesses. Business packages with full scope are 1,990 euros per month. The exact costs depend on your goals, channels and competition in your industry.' },
    { question: 'Which online marketing channels are most important for Linz businesses?', answer: 'It depends on your target audience. For B2B industrial companies in Upper Austria, SEO and LinkedIn are usually most effective. For B2C, Google Ads and Facebook/Instagram are often the best channels. We analyze your situation and recommend the optimal channel strategy.' },
    { question: 'How quickly will I see results from online marketing?', answer: 'With Google Ads, you often see first results within days. SEO needs 3-6 months for significant improvements. Social media builds reach organically over weeks. We use a mix for quick results and sustainable growth.' },
    { question: 'Do you only work with companies from Linz?', answer: 'Our focus is on Upper Austria, but we also serve clients from other regions. For local Linz customers, we offer in-person meetings. Remote collaboration works just as well – many of our meetings take place online.' },
    { question: 'How do you measure the success of online marketing?', answer: 'We define clear KPIs with you: traffic, rankings, conversions, leads, ROAS on ads. With Google Analytics, Search Console and specific tracking tools, we measure success transparently. You receive monthly reports with all important metrics.' },
    { question: 'Can you also create or improve our website?', answer: 'Yes, we also offer web design in Linz. A good website is the foundation for successful online marketing. We can optimize your existing website or develop a new, conversion-optimized website.' },
  ],
  ru: [
    { question: 'Сколько стоит онлайн-маркетинг в Линце?', answer: 'Наши пакеты онлайн-маркетинга в Линце начинаются от 990 евро в месяц для местных компаний. Бизнес-пакеты с полным набором услуг стоят 1 990 евро в месяц. Точная стоимость зависит от ваших целей, каналов и конкуренции в вашей отрасли.' },
    { question: 'Какие каналы онлайн-маркетинга наиболее важны для компаний Линца?', answer: 'Это зависит от вашей целевой аудитории. Для B2B промышленных компаний в Верхней Австрии обычно наиболее эффективны SEO и LinkedIn. Для B2C часто лучшими каналами являются Google Ads и Facebook/Instagram. Мы анализируем вашу ситуацию и рекомендуем оптимальную стратегию каналов.' },
    { question: 'Как быстро я увижу результаты от онлайн-маркетинга?', answer: 'С Google Ads вы часто видите первые результаты в течение нескольких дней. SEO требует 3-6 месяцев для значительных улучшений. Социальные сети наращивают охват органически в течение недель. Мы используем микс для быстрых результатов и устойчивого роста.' },
    { question: 'Вы работаете только с компаниями из Линца?', answer: 'Наш фокус на Верхней Австрии, но мы также обслуживаем клиентов из других регионов. Для местных клиентов в Линце мы предлагаем личные встречи. Удаленное сотрудничество работает так же хорошо – многие наши встречи проходят онлайн.' },
    { question: 'Как вы измеряете успех онлайн-маркетинга?', answer: 'Мы определяем с вами четкие KPI: трафик, позиции, конверсии, лиды, ROAS в рекламе. С помощью Google Analytics, Search Console и специальных инструментов отслеживания мы измеряем успех прозрачно. Вы получаете ежемесячные отчеты со всеми важными показателями.' },
    { question: 'Можете ли вы также создать или улучшить наш сайт?', answer: 'Да, мы также предлагаем веб-дизайн в Линце. Хороший сайт – это основа успешного онлайн-маркетинга. Мы можем оптимизировать ваш существующий сайт или разработать новый, оптимизированный для конверсий.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'Audit Ihrer aktuellen Online-Praesenz und Wettbewerbsanalyse' },
    { step: '02', title: 'Strategie', description: 'Kanalauswahl, Budget-Allokation und KPI-Definition' },
    { step: '03', title: 'Setup', description: 'Tracking, Kampagnen-Setup und Content-Planung' },
    { step: '04', title: 'Umsetzung', description: 'Laufende Optimierung aller Marketing-Kanaele' },
    { step: '05', title: 'Reporting', description: 'Transparente Erfolgsberichte und Strategie-Anpassung' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'Audit of your current online presence and competitive analysis' },
    { step: '02', title: 'Strategy', description: 'Channel selection, budget allocation and KPI definition' },
    { step: '03', title: 'Setup', description: 'Tracking, campaign setup and content planning' },
    { step: '04', title: 'Execution', description: 'Ongoing optimization of all marketing channels' },
    { step: '05', title: 'Reporting', description: 'Transparent success reports and strategy adjustment' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'Аудит вашего текущего онлайн-присутствия и анализ конкурентов' },
    { step: '02', title: 'Стратегия', description: 'Выбор каналов, распределение бюджета и определение KPI' },
    { step: '03', title: 'Настройка', description: 'Отслеживание, настройка кампаний и планирование контента' },
    { step: '04', title: 'Реализация', description: 'Постоянная оптимизация всех маркетинговых каналов' },
    { step: '05', title: 'Отчетность', description: 'Прозрачные отчеты об успехах и корректировка стратегии' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Linz', description: 'Conversion-optimierte Websites als Basis fuer Ihr Marketing.', href: '/webdesign-linz' },
    { title: 'SEO Agentur Linz', description: 'Spezialisierte Suchmaschinenoptimierung fuer nachhaltige Rankings.', href: '/seo-agentur-linz' },
    { title: 'Branding & Design', description: 'Markenentwicklung und visuelles Design fuer Ihren Auftritt.', href: '/leistungen/branding' },
  ],
  en: [
    { title: 'Web Design Linz', description: 'Conversion-optimized websites as the foundation for your marketing.', href: '/webdesign-linz' },
    { title: 'SEO Agency Linz', description: 'Specialized search engine optimization for sustainable rankings.', href: '/seo-agentur-linz' },
    { title: 'Branding & Design', description: 'Brand development and visual design for your presence.', href: '/leistungen/branding' },
  ],
  ru: [
    { title: 'Веб-дизайн Линц', description: 'Сайты, оптимизированные для конверсий, как основа вашего маркетинга.', href: '/webdesign-linz' },
    { title: 'SEO-агентство Линц', description: 'Специализированная поисковая оптимизация для устойчивых позиций.', href: '/seo-agentur-linz' },
    { title: 'Брендинг и дизайн', description: 'Разработка бренда и визуальный дизайн для вашего присутствия.', href: '/leistungen/branding' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

// Why choose us section
const whyChooseUs = {
  de: {
    title: 'Warum GoldenWing als Online Marketing Agentur in Linz?',
    reasons: [
      { title: 'Lokale Expertise', description: 'Wir kennen den oberoesterreichischen Markt – von der Industrie in Linz-Land bis zum Einzelhandel in der Landstrasse.' },
      { title: 'Full-Service Ansatz', description: 'Alle Kanaele aus einer Hand: SEO, SEA, Social Media, Content. Keine Koordination zwischen verschiedenen Agenturen noetig.' },
      { title: 'Messbare Ergebnisse', description: 'Transparentes Reporting mit klaren KPIs. Sie sehen genau, was Ihr Marketing-Investment bringt.' },
      { title: 'Persoenliche Betreuung', description: 'Fester Ansprechpartner, regelmaessige Meetings – persoenlich in Linz oder digital.' },
    ],
  },
  en: {
    title: 'Why Choose GoldenWing as Online Marketing Agency in Linz?',
    reasons: [
      { title: 'Local Expertise', description: 'We know the Upper Austrian market – from industry in Linz-Land to retail on Landstrasse.' },
      { title: 'Full-Service Approach', description: 'All channels from one source: SEO, SEA, social media, content. No coordination between different agencies needed.' },
      { title: 'Measurable Results', description: 'Transparent reporting with clear KPIs. You see exactly what your marketing investment delivers.' },
      { title: 'Personal Support', description: 'Dedicated contact person, regular meetings – in person in Linz or digitally.' },
    ],
  },
  ru: {
    title: 'Почему GoldenWing как агентство онлайн-маркетинга в Линце?',
    reasons: [
      { title: 'Локальная экспертиза', description: 'Мы знаем рынок Верхней Австрии – от промышленности в Линц-Ланд до розничной торговли на Ландштрассе.' },
      { title: 'Комплексный подход', description: 'Все каналы из одних рук: SEO, SEA, социальные сети, контент. Не нужна координация между разными агентствами.' },
      { title: 'Измеримые результаты', description: 'Прозрачная отчетность с четкими KPI. Вы видите точно, что приносит ваше маркетинговое вложение.' },
      { title: 'Персональная поддержка', description: 'Постоянный контактный специалист, регулярные встречи – лично в Линце или онлайн.' },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/online-marketing-agentur-linz', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/online-marketing-agentur-linz', locale),
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
      canonical: getCanonicalUrl('/online-marketing-agentur-linz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function OnlineMarketingAgenturLinzPage({ params }: { params: Promise<{ locale: string }> }) {
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

  const servicesTitle = { de: 'Unsere Online Marketing Leistungen in Linz', en: 'Our Online Marketing Services in Linz', ru: 'Наши услуги онлайн-маркетинга в Линце' }[locale]
  const servicesDescription = { de: 'Full-Service Digital Marketing fuer oberoesterreichische Unternehmen.', en: 'Full-service digital marketing for Upper Austrian businesses.', ru: 'Комплексный цифровой маркетинг для компаний Верхней Австрии.' }[locale]
  const pricingTitle = { de: 'Online Marketing Pakete Linz', en: 'Online Marketing Packages Linz', ru: 'Пакеты онлайн-маркетинга Линц' }[locale]
  const pricingDescription = { de: 'Skalierbare Pakete fuer jedes Budget. Alle Preise exkl. Werbebudget.', en: 'Scalable packages for every budget. All prices excl. ad spend.', ru: 'Масштабируемые пакеты для любого бюджета. Все цены без учета рекламного бюджета.' }[locale]
  const processTitle = { de: 'So arbeiten wir', en: 'How We Work', ru: 'Как мы работаем' }[locale]
  const processDescription = { de: 'Strukturierte Vorgehensweise fuer nachhaltigen Marketing-Erfolg.', en: 'Structured approach for sustainable marketing success.', ru: 'Структурированный подход для устойчивого маркетингового успеха.' }[locale]
  const faqTitle = { de: 'Haeufige Fragen zu Online Marketing in Linz', en: 'Frequently Asked Questions about Online Marketing in Linz', ru: 'Часто задаваемые вопросы об онлайн-маркетинге в Линце' }[locale]
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale]
  const ctaTitle = { de: 'Bereit fuer digitales Wachstum?', en: 'Ready to Grow Your Business?', ru: 'Готовы к цифровому росту?' }[locale]
  const ctaDescription = { de: 'Kostenlose Erstberatung. Wir analysieren Ihre aktuelle Situation und zeigen Ihnen das Potenzial fuer Ihr Unternehmen in Linz.', en: 'Free initial consultation. We analyze your current situation and show you the potential for your business in Linz.', ru: 'Бесплатная первичная консультация. Мы анализируем вашу текущую ситуацию и показываем потенциал для вашего бизнеса в Линце.' }[locale]
  const ctaButton = { de: 'Kostenlose Beratung anfordern', en: 'Request Free Consultation', ru: 'Запросить бесплатную консультацию' }[locale]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Online Marketing Agentur Linz', en: 'Online Marketing Agency Linz', ru: 'Агентство онлайн-маркетинга Линц' }[locale],
    alternateName: { de: 'Digitales Marketing Linz', en: 'Digital Marketing Linz', ru: 'Цифровой маркетинг Линц' }[locale],
    url: 'https://goldenwing.at/online-marketing-agentur-linz',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'City', name: 'Linz' },
      { '@type': 'State', name: { de: 'Oberoesterreich', en: 'Upper Austria', ru: 'Верхняя Австрия' }[locale] },
    ],
    description: { de: 'Full-Service Online Marketing Agentur in Linz. SEO, Google Ads, Social Media und Content Marketing fuer oberoesterreichische Unternehmen.', en: 'Full-service online marketing agency in Linz. SEO, Google Ads, social media and content marketing for Upper Austrian businesses.', ru: 'Полносервисное агентство онлайн-маркетинга в Линце. SEO, Google Ads, социальные сети и контент-маркетинг для компаний Верхней Австрии.' }[locale],
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
              const IconComponent = iconMap[service.icon] || Megaphone
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
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale]}</Badge>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale]}</NextLink>
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
        />
      )}

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
