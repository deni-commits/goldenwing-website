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

// Default content for Online Marketing Graz - Volume: 720, KD: 37
const defaultContent = {
  de: {
    metaTitle: 'Online Marketing Graz | Digitales Marketing Agentur Steiermark',
    metaDescription: 'Online Marketing Agentur in Graz. SEO, Google Ads, Social Media und Content Marketing fuer steirische Unternehmen. Lokale Expertise, messbare Ergebnisse.',
    keywords: ['Online Marketing Graz', 'Digitales Marketing Graz', 'Online Marketing Steiermark', 'Digital Marketing Graz', 'Marketing Agentur Graz', 'Social Media Marketing Graz', 'SEO Graz'],
    heroTitle: 'Online Marketing Graz – Digitale Strategien fuer die Steiermark',
    heroDescription: 'Als Online Marketing Agentur entwickeln wir ganzheitliche Digitalstrategien fuer Grazer und steirische Unternehmen. Von SEO ueber Google Ads bis Social Media – wir machen Sie online sichtbar.',
    heroBadge: 'Online Marketing Graz',
    ctaPrimary: 'Kostenlose Beratung',
    ctaSecondary: 'Marketing-Pakete ansehen',
  },
  en: {
    metaTitle: 'Online Marketing Graz | Digital Marketing Agency Styria',
    metaDescription: 'Online marketing agency in Graz. SEO, Google Ads, social media and content marketing for Styrian businesses. Local expertise, measurable results.',
    keywords: ['Online Marketing Graz', 'Digital Marketing Graz', 'Online Marketing Styria', 'Digital Marketing Styria', 'Marketing Agency Graz', 'Social Media Marketing Graz', 'SEO Graz'],
    heroTitle: 'Online Marketing Graz – Digital Strategies for Styria',
    heroDescription: 'As an online marketing agency, we develop holistic digital strategies for Graz and Styrian businesses. From SEO to Google Ads to social media – we make you visible online.',
    heroBadge: 'Online Marketing Graz',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'View Marketing Packages',
  },
  ru: {
    metaTitle: 'Онлайн-маркетинг Грац | Агентство цифрового маркетинга Штирия',
    metaDescription: 'Агентство онлайн-маркетинга в Граце. SEO, Google Ads, социальные сети и контент-маркетинг для штирийских компаний. Локальная экспертиза, измеримые результаты.',
    keywords: ['Онлайн-маркетинг Грац', 'Цифровой маркетинг Грац', 'Онлайн-маркетинг Штирия', 'Маркетинговое агентство Грац', 'SMM Грац', 'SEO Грац'],
    heroTitle: 'Онлайн-маркетинг Грац – Цифровые стратегии для Штирии',
    heroDescription: 'Как агентство онлайн-маркетинга, мы разрабатываем комплексные цифровые стратегии для компаний Граца и Штирии. От SEO до Google Ads и социальных сетей – мы сделаем вас заметными в интернете.',
    heroBadge: 'Онлайн-маркетинг Грац',
    ctaPrimary: 'Бесплатная консультация',
    ctaSecondary: 'Посмотреть пакеты',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Suchmaschinenoptimierung (SEO)', description: 'Nachhaltige Sichtbarkeit bei Google. Lokales SEO fuer Graz und die Steiermark, technische Optimierung und Content-Strategie.' },
    { icon: 'target', title: 'Google Ads (SEA)', description: 'Bezahlte Werbung mit messbarem ROI. Suchanzeigen, Display-Kampagnen und Shopping-Ads fuer den steirischen Markt.' },
    { icon: 'share-2', title: 'Social Media Marketing', description: 'Praesenz auf Facebook, Instagram, LinkedIn und TikTok. Community Management und bezahlte Social Ads fuer Graz.' },
    { icon: 'file-text', title: 'Content Marketing', description: 'Hochwertige Inhalte, die ranken und konvertieren. Blog-Artikel, Landingpages und Multimedia-Content.' },
    { icon: 'mail', title: 'E-Mail Marketing', description: 'Newsletter-Kampagnen und Marketing Automation. Kundenbindung und Lead Nurturing fuer B2B und B2C.' },
    { icon: 'bar-chart-3', title: 'Web Analytics', description: 'Datenbasierte Entscheidungen. Google Analytics Setup, Conversion Tracking und monatliche Reports.' },
  ],
  en: [
    { icon: 'search', title: 'Search Engine Optimization (SEO)', description: 'Sustainable visibility on Google. Local SEO for Graz and Styria, technical optimization and content strategy.' },
    { icon: 'target', title: 'Google Ads (SEA)', description: 'Paid advertising with measurable ROI. Search ads, display campaigns and shopping ads for the Styrian market.' },
    { icon: 'share-2', title: 'Social Media Marketing', description: 'Presence on Facebook, Instagram, LinkedIn and TikTok. Community management and paid social ads for Graz.' },
    { icon: 'file-text', title: 'Content Marketing', description: 'High-quality content that ranks and converts. Blog articles, landing pages and multimedia content.' },
    { icon: 'mail', title: 'Email Marketing', description: 'Newsletter campaigns and marketing automation. Customer retention and lead nurturing for B2B and B2C.' },
    { icon: 'bar-chart-3', title: 'Web Analytics', description: 'Data-driven decisions. Google Analytics setup, conversion tracking and monthly reports.' },
  ],
  ru: [
    { icon: 'search', title: 'Поисковая оптимизация (SEO)', description: 'Устойчивая видимость в Google. Локальное SEO для Граца и Штирии, техническая оптимизация и контент-стратегия.' },
    { icon: 'target', title: 'Google Ads (SEA)', description: 'Платная реклама с измеримым ROI. Поисковая реклама, медийные кампании и товарные объявления для штирийского рынка.' },
    { icon: 'share-2', title: 'Маркетинг в социальных сетях', description: 'Присутствие в Facebook, Instagram, LinkedIn и TikTok. Управление сообществом и платная реклама в соцсетях для Граца.' },
    { icon: 'file-text', title: 'Контент-маркетинг', description: 'Качественный контент, который ранжируется и конвертирует. Статьи для блога, лендинги и мультимедийный контент.' },
    { icon: 'mail', title: 'Email-маркетинг', description: 'Рассылки и автоматизация маркетинга. Удержание клиентов и развитие лидов для B2B и B2C.' },
    { icon: 'bar-chart-3', title: 'Веб-аналитика', description: 'Решения на основе данных. Настройка Google Analytics, отслеживание конверсий и ежемесячные отчеты.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Marketing Starter', price: '990', priceType: 'pro Monat', description: 'Fuer lokale Grazer Unternehmen', popular: false, features: ['SEO Grundoptimierung', 'Google Ads Kampagne (bis 500 EUR Budget)', 'Social Media (2 Kanaele)', 'Monatliches Reporting', '4 Stunden Support/Monat'] },
    { name: 'Marketing Business', price: '1.990', priceType: 'pro Monat', description: 'Fuer wachsende steirische Unternehmen', popular: true, features: ['Vollstaendige SEO-Betreuung', 'Google Ads (bis 1.500 EUR Budget)', 'Social Media (4 Kanaele)', 'Content-Erstellung (4 Beitraege)', 'E-Mail Marketing', 'Detailliertes Reporting', '10 Stunden Support/Monat'] },
    { name: 'Marketing Premium', price: '3.490', priceType: 'pro Monat', description: 'Full-Service fuer ambitionierte Ziele', popular: false, features: ['Enterprise SEO', 'Google Ads (bis 5.000 EUR Budget)', 'Multi-Channel Social Media', 'Content-Strategie & Produktion', 'Marketing Automation', 'Conversion-Optimierung', 'Dedizierter Account Manager', 'Woechentliche Strategy Calls'] },
  ],
  en: [
    { name: 'Marketing Starter', price: '990', priceType: 'per month', description: 'For local Graz businesses', popular: false, features: ['Basic SEO optimization', 'Google Ads campaign (up to 500 EUR budget)', 'Social media (2 channels)', 'Monthly reporting', '4 hours support/month'] },
    { name: 'Marketing Business', price: '1,990', priceType: 'per month', description: 'For growing Styrian businesses', popular: true, features: ['Complete SEO management', 'Google Ads (up to 1,500 EUR budget)', 'Social media (4 channels)', 'Content creation (4 posts)', 'Email marketing', 'Detailed reporting', '10 hours support/month'] },
    { name: 'Marketing Premium', price: '3,490', priceType: 'per month', description: 'Full-service for ambitious goals', popular: false, features: ['Enterprise SEO', 'Google Ads (up to 5,000 EUR budget)', 'Multi-channel social media', 'Content strategy & production', 'Marketing automation', 'Conversion optimization', 'Dedicated account manager', 'Weekly strategy calls'] },
  ],
  ru: [
    { name: 'Marketing Starter', price: '990', priceType: 'в месяц', description: 'Для локальных компаний Граца', popular: false, features: ['Базовая SEO-оптимизация', 'Кампания Google Ads (бюджет до 500 EUR)', 'Социальные сети (2 канала)', 'Ежемесячная отчетность', '4 часа поддержки/месяц'] },
    { name: 'Marketing Business', price: '1 990', priceType: 'в месяц', description: 'Для растущих штирийских компаний', popular: true, features: ['Полное SEO-сопровождение', 'Google Ads (бюджет до 1 500 EUR)', 'Социальные сети (4 канала)', 'Создание контента (4 публикации)', 'Email-маркетинг', 'Детальная отчетность', '10 часов поддержки/месяц'] },
    { name: 'Marketing Premium', price: '3 490', priceType: 'в месяц', description: 'Полный сервис для амбициозных целей', popular: false, features: ['Enterprise SEO', 'Google Ads (бюджет до 5 000 EUR)', 'Мультиканальные социальные сети', 'Контент-стратегия и производство', 'Автоматизация маркетинга', 'Оптимизация конверсии', 'Персональный аккаунт-менеджер', 'Еженедельные стратегические звонки'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+312%', label: 'Mehr organischer Traffic', client: 'Grazer Handelsunternehmen' },
    { metric: '3.8x', label: 'ROAS bei Google Ads', client: 'Tech-Startup Graz' },
    { metric: '+189%', label: 'Mehr qualifizierte Leads', client: 'B2B Dienstleister' },
    { metric: 'Top 3', label: 'Rankings fuer 18 Keywords', client: 'E-Commerce Steiermark' },
  ],
  en: [
    { metric: '+312%', label: 'More organic traffic', client: 'Graz trading company' },
    { metric: '3.8x', label: 'ROAS on Google Ads', client: 'Tech startup Graz' },
    { metric: '+189%', label: 'More qualified leads', client: 'B2B service provider' },
    { metric: 'Top 3', label: 'Rankings for 18 keywords', client: 'E-Commerce Styria' },
  ],
  ru: [
    { metric: '+312%', label: 'Больше органического трафика', client: 'Торговая компания Грац' },
    { metric: '3.8x', label: 'ROAS в Google Ads', client: 'Технологический стартап Грац' },
    { metric: '+189%', label: 'Больше квалифицированных лидов', client: 'B2B поставщик услуг' },
    { metric: 'Топ 3', label: 'Позиции по 18 ключевым словам', client: 'E-Commerce Штирия' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet Online Marketing in Graz?', answer: 'Unsere Online Marketing Pakete in Graz starten bei 990 Euro pro Monat fuer lokale Unternehmen. Business-Pakete mit vollem Leistungsumfang liegen bei 1.990 Euro pro Monat. Die genauen Kosten haengen von Ihren Zielen, Kanaelen und dem Wettbewerb in Ihrer Branche ab.' },
    { question: 'Welche Online Marketing Kanaele sind fuer Grazer Unternehmen wichtig?', answer: 'Das haengt von Ihrer Zielgruppe ab. Fuer Grazer Universitaeten und Tech-Startups sind LinkedIn und Content Marketing besonders relevant. Fuer lokalen Einzelhandel sind Google My Business, lokales SEO und Instagram wichtig. Wir analysieren Ihre Situation und empfehlen die optimale Strategie.' },
    { question: 'Wie schnell sehe ich Ergebnisse beim Online Marketing?', answer: 'Bei Google Ads sehen Sie erste Ergebnisse oft innerhalb weniger Tage. SEO benoetigt 3-6 Monate fuer signifikante Verbesserungen. Social Media baut organisch ueber Wochen Reichweite auf. Wir setzen auf einen Mix fuer schnelle Ergebnisse und nachhaltiges Wachstum.' },
    { question: 'Habt ihr Erfahrung mit Grazer Unternehmen?', answer: 'Ja, wir betreuen mehrere Kunden aus Graz und der Steiermark. Von Tech-Startups ueber Universitaets-Spin-offs bis zu etablierten Handelsunternehmen – wir kennen den steirischen Markt und seine Besonderheiten.' },
    { question: 'Wie messt ihr den Erfolg von Online Marketing?', answer: 'Wir definieren mit Ihnen klare KPIs: Traffic, Rankings, Conversions, Leads, ROAS bei Ads. Mit Google Analytics, Search Console und spezifischen Tracking-Tools messen wir den Erfolg transparent. Sie erhalten monatliche Reports mit allen wichtigen Kennzahlen.' },
    { question: 'Bietet ihr auch Webdesign an?', answer: 'Ja, wir bieten auch Webdesign an. Eine gute Website ist die Grundlage fuer erfolgreiches Online Marketing. Wir koennen Ihre bestehende Website optimieren oder eine neue, conversion-optimierte Website entwickeln.' },
  ],
  en: [
    { question: 'How much does online marketing cost in Graz?', answer: 'Our online marketing packages in Graz start at 990 euros per month for local businesses. Business packages with full scope are 1,990 euros per month. The exact costs depend on your goals, channels and competition in your industry.' },
    { question: 'Which online marketing channels are important for Graz businesses?', answer: 'It depends on your target audience. For Graz universities and tech startups, LinkedIn and content marketing are particularly relevant. For local retail, Google My Business, local SEO and Instagram are important. We analyze your situation and recommend the optimal strategy.' },
    { question: 'How quickly will I see results from online marketing?', answer: 'With Google Ads, you often see first results within days. SEO needs 3-6 months for significant improvements. Social media builds reach organically over weeks. We use a mix for quick results and sustainable growth.' },
    { question: 'Do you have experience with Graz businesses?', answer: 'Yes, we serve several clients from Graz and Styria. From tech startups to university spin-offs to established trading companies – we know the Styrian market and its characteristics.' },
    { question: 'How do you measure the success of online marketing?', answer: 'We define clear KPIs with you: traffic, rankings, conversions, leads, ROAS on ads. With Google Analytics, Search Console and specific tracking tools, we measure success transparently. You receive monthly reports with all important metrics.' },
    { question: 'Do you also offer web design?', answer: 'Yes, we also offer web design. A good website is the foundation for successful online marketing. We can optimize your existing website or develop a new, conversion-optimized website.' },
  ],
  ru: [
    { question: 'Сколько стоит онлайн-маркетинг в Граце?', answer: 'Наши пакеты онлайн-маркетинга в Граце начинаются от 990 евро в месяц для локальных компаний. Бизнес-пакеты с полным спектром услуг стоят 1 990 евро в месяц. Точная стоимость зависит от ваших целей, каналов и конкуренции в вашей отрасли.' },
    { question: 'Какие каналы онлайн-маркетинга важны для компаний Граца?', answer: 'Это зависит от вашей целевой аудитории. Для университетов Граца и технологических стартапов особенно актуальны LinkedIn и контент-маркетинг. Для локальной розницы важны Google My Business, локальное SEO и Instagram. Мы анализируем вашу ситуацию и рекомендуем оптимальную стратегию.' },
    { question: 'Как быстро я увижу результаты от онлайн-маркетинга?', answer: 'С Google Ads первые результаты часто видны в течение нескольких дней. SEO требует 3-6 месяцев для значительных улучшений. Социальные сети органически наращивают охват в течение недель. Мы используем микс для быстрых результатов и устойчивого роста.' },
    { question: 'Есть ли у вас опыт работы с компаниями Граца?', answer: 'Да, мы обслуживаем несколько клиентов из Граца и Штирии. От технологических стартапов до университетских спин-оффов и устоявшихся торговых компаний – мы знаем штирийский рынок и его особенности.' },
    { question: 'Как вы измеряете успех онлайн-маркетинга?', answer: 'Мы определяем с вами четкие KPI: трафик, позиции, конверсии, лиды, ROAS рекламы. С помощью Google Analytics, Search Console и специализированных инструментов отслеживания мы измеряем успех прозрачно. Вы получаете ежемесячные отчеты со всеми важными метриками.' },
    { question: 'Предлагаете ли вы также веб-дизайн?', answer: 'Да, мы также предлагаем веб-дизайн. Хороший сайт – это основа успешного онлайн-маркетинга. Мы можем оптимизировать ваш существующий сайт или разработать новый, оптимизированный для конверсий сайт.' },
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
    { title: 'Webdesign Graz', description: 'Conversion-optimierte Websites als Basis fuer Ihr Marketing.', href: '/webdesign-graz' },
    { title: 'SEO Agentur Wien', description: 'Spezialisierte Suchmaschinenoptimierung fuer nachhaltige Rankings.', href: '/seo-agentur-wien' },
    { title: 'Branding & Design', description: 'Markenentwicklung und visuelles Design fuer Ihren Auftritt.', href: '/leistungen/branding' },
  ],
  en: [
    { title: 'Web Design Graz', description: 'Conversion-optimized websites as the foundation for your marketing.', href: '/webdesign-graz' },
    { title: 'SEO Agency Vienna', description: 'Specialized search engine optimization for sustainable rankings.', href: '/seo-agentur-wien' },
    { title: 'Branding & Design', description: 'Brand development and visual design for your presence.', href: '/leistungen/branding' },
  ],
  ru: [
    { title: 'Веб-дизайн Грац', description: 'Сайты, оптимизированные для конверсий, как основа вашего маркетинга.', href: '/webdesign-graz' },
    { title: 'SEO агентство Вена', description: 'Специализированная поисковая оптимизация для устойчивых позиций.', href: '/seo-agentur-wien' },
    { title: 'Брендинг и дизайн', description: 'Развитие бренда и визуальный дизайн для вашего присутствия.', href: '/leistungen/branding' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const whyChooseUs = {
  de: {
    title: 'Warum GoldenWing als Online Marketing Agentur fuer Graz?',
    reasons: [
      { title: 'Regionale Expertise', description: 'Wir kennen die steirische Wirtschaft – von der Tech-Szene bis zum traditionellen Handel.' },
      { title: 'Full-Service Ansatz', description: 'Alle Kanaele aus einer Hand: SEO, SEA, Social Media, Content. Keine Koordination zwischen verschiedenen Agenturen.' },
      { title: 'Messbare Ergebnisse', description: 'Transparentes Reporting mit klaren KPIs. Sie sehen genau, was Ihr Marketing-Investment bringt.' },
      { title: 'Internationale Erfahrung', description: 'Mit Standorten in Wien, Dubai und California bringen wir globales Know-how in regionale Projekte.' },
    ],
  },
  en: {
    title: 'Why Choose GoldenWing as Online Marketing Agency for Graz?',
    reasons: [
      { title: 'Regional Expertise', description: 'We know the Styrian economy – from the tech scene to traditional retail.' },
      { title: 'Full-Service Approach', description: 'All channels from one source: SEO, SEA, social media, content. No coordination between different agencies.' },
      { title: 'Measurable Results', description: 'Transparent reporting with clear KPIs. You see exactly what your marketing investment delivers.' },
      { title: 'International Experience', description: 'With locations in Vienna, Dubai and California, we bring global know-how to regional projects.' },
    ],
  },
  ru: {
    title: 'Почему GoldenWing как агентство онлайн-маркетинга для Граца?',
    reasons: [
      { title: 'Региональная экспертиза', description: 'Мы знаем штирийскую экономику – от технологической сцены до традиционной торговли.' },
      { title: 'Комплексный подход', description: 'Все каналы из одного источника: SEO, SEA, социальные сети, контент. Никакой координации между разными агентствами.' },
      { title: 'Измеримые результаты', description: 'Прозрачная отчетность с четкими KPI. Вы видите точно, что приносят ваши маркетинговые инвестиции.' },
      { title: 'Международный опыт', description: 'С офисами в Вене, Дубае и Калифорнии мы привносим глобальные знания в региональные проекты.' },
    ],
  },
}

// Graz-specific context
const grazContext = {
  de: {
    title: 'Online Marketing fuer Graz und die Steiermark',
    description: 'Graz ist die zweitgroesste Stadt Oesterreichs und ein bedeutender Universitaets- und Technologiestandort. Mit vier Universitaeten, zahlreichen Forschungseinrichtungen und einem florierenden Startup-Oekosystem bietet die Stadt einzigartige Chancen fuer digitales Marketing. Ob B2B-Tech-Unternehmen, Bildungseinrichtungen oder lokaler Einzelhandel – wir verstehen die Grazer Zielgruppen.',
    highlights: [
      'Erfahrung mit Tech-Startups und Universitaets-Spin-offs',
      'Kenntnis der Grazer Startup-Szene und Investorenlandschaft',
      'Verstaendnis fuer akademische und technische Zielgruppen',
      'Lokales SEO fuer Graz und steirische Gemeinden',
    ],
  },
  en: {
    title: 'Online Marketing for Graz and Styria',
    description: 'Graz is the second largest city in Austria and an important university and technology hub. With four universities, numerous research institutions and a thriving startup ecosystem, the city offers unique opportunities for digital marketing. Whether B2B tech companies, educational institutions or local retail – we understand Graz target audiences.',
    highlights: [
      'Experience with tech startups and university spin-offs',
      'Knowledge of the Graz startup scene and investor landscape',
      'Understanding of academic and technical target audiences',
      'Local SEO for Graz and Styrian municipalities',
    ],
  },
  ru: {
    title: 'Онлайн-маркетинг для Граца и Штирии',
    description: 'Грац – второй по величине город Австрии и важный университетский и технологический центр. С четырьмя университетами, многочисленными исследовательскими учреждениями и процветающей стартап-экосистемой город предлагает уникальные возможности для цифрового маркетинга. Будь то B2B технологические компании, образовательные учреждения или локальная розница – мы понимаем целевые аудитории Граца.',
    highlights: [
      'Опыт работы с технологическими стартапами и университетскими спин-оффами',
      'Знание стартап-сцены Граца и инвестиционного ландшафта',
      'Понимание академических и технических целевых аудиторий',
      'Локальное SEO для Граца и штирийских муниципалитетов',
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/online-marketing-graz', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/online-marketing-graz', locale),
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
      canonical: getCanonicalUrl('/online-marketing-graz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function OnlineMarketingGrazPage({ params }: { params: Promise<{ locale: string }> }) {
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
  const whyUs = whyChooseUs[locale as SupportedLocale] ?? whyChooseUs['en']
  const graz = grazContext[locale as SupportedLocale] ?? grazContext['en']

  const servicesTitle = { de: 'Unsere Online Marketing Leistungen in Graz', en: 'Our Online Marketing Services in Graz', ru: 'Наши услуги онлайн-маркетинга в Граце' }[locale] ?? 'Our Online Marketing Services in Graz'
  const servicesDescription = { de: 'Full-Service Digital Marketing fuer steirische Unternehmen.', en: 'Full-service digital marketing for Styrian businesses.', ru: 'Комплексный цифровой маркетинг для штирийских компаний.' }[locale] ?? 'Full-service digital marketing for Styrian businesses.'
  const pricingTitle = { de: 'Online Marketing Pakete Graz', en: 'Online Marketing Packages Graz', ru: 'Пакеты онлайн-маркетинга Грац' }[locale] ?? 'Online Marketing Packages Graz'
  const pricingDescription = { de: 'Skalierbare Pakete fuer jedes Budget. Alle Preise exkl. Werbebudget.', en: 'Scalable packages for every budget. All prices excl. ad spend.', ru: 'Масштабируемые пакеты для любого бюджета. Все цены без рекламного бюджета.' }[locale] ?? 'Scalable packages for every budget. All prices excl. ad spend.'
  const processTitle = { de: 'So arbeiten wir', en: 'How We Work', ru: 'Как мы работаем' }[locale] ?? 'How We Work'
  const processDescription = { de: 'Strukturierte Vorgehensweise fuer nachhaltigen Marketing-Erfolg.', en: 'Structured approach for sustainable marketing success.', ru: 'Структурированный подход для устойчивого маркетингового успеха.' }[locale] ?? 'Structured approach for sustainable marketing success.'
  const faqTitle = { de: 'Haeufige Fragen zu Online Marketing in Graz', en: 'Frequently Asked Questions about Online Marketing in Graz', ru: 'Часто задаваемые вопросы об онлайн-маркетинге в Граце' }[locale] ?? 'Frequently Asked Questions about Online Marketing in Graz'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer digitales Wachstum in Graz?', en: 'Ready to Grow Your Business in Graz?', ru: 'Готовы к цифровому росту в Граце?' }[locale] ?? 'Ready to Grow Your Business in Graz?'
  const ctaDescription = { de: 'Kostenlose Erstberatung. Wir analysieren Ihre aktuelle Situation und zeigen Ihnen das Potenzial fuer Ihr Unternehmen.', en: 'Free initial consultation. We analyze your current situation and show you the potential for your business.', ru: 'Бесплатная первичная консультация. Мы анализируем вашу текущую ситуацию и показываем потенциал для вашего бизнеса.' }[locale] ?? 'Free initial consultation. We analyze your current situation and show you the potential for your business.'
  const ctaButton = { de: 'Kostenlose Beratung anfordern', en: 'Request Free Consultation', ru: 'Запросить бесплатную консультацию' }[locale] ?? 'Request Free Consultation'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Online Marketing Agentur Graz', en: 'Online Marketing Agency Graz', ru: 'Агентство онлайн-маркетинга Грац' }[locale] ?? 'Online Marketing Agency Graz',
    alternateName: { de: 'Digitales Marketing Graz', en: 'Digital Marketing Graz', ru: 'Цифровой маркетинг Грац' }[locale] ?? 'Digital Marketing Graz',
    url: 'https://goldenwing.at/online-marketing-graz',
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
    description: { de: 'Full-Service Online Marketing Agentur fuer Graz. SEO, Google Ads, Social Media und Content Marketing fuer steirische Unternehmen.', en: 'Full-service online marketing agency for Graz. SEO, Google Ads, social media and content marketing for Styrian businesses.', ru: 'Комплексное агентство онлайн-маркетинга для Граца. SEO, Google Ads, социальные сети и контент-маркетинг для штирийских компаний.' }[locale] ?? 'Full-service online marketing agency for Graz. SEO, Google Ads, social media and content marketing for Styrian businesses.',
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

      {/* Graz Context */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{graz.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{graz.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {graz.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
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
      <section id="preise" className="py-20 bg-muted/30 scroll-mt-20">
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
