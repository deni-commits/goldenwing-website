import type {
  Locale,
  TrustSignal,
  Result,
  Service,
  Package,
  ProcessStep,
  FAQ,
  RelatedService,
  LandingPageContent,
} from '../types'
import { sharedLabels } from '../shared'
import { getCityBySlug } from '../cities'
import { getIndustryBySlug } from '../industries'

// ---------------------------------------------------------------------------
// Trust Signals
// ---------------------------------------------------------------------------
const trustSignals: Record<Locale, TrustSignal[]> = {
  de: [
    { icon: 'award', text: '120+ Projekte' },
    { icon: 'star', text: '4.9/5 Bewertung' },
    { icon: 'clock', text: 'Seit 2013' },
  ],
  en: [
    { icon: 'award', text: '120+ Projects' },
    { icon: 'star', text: '4.9/5 Rating' },
    { icon: 'clock', text: 'Since 2013' },
  ],
  ru: [
    { icon: 'award', text: '120+ проектов' },
    { icon: 'star', text: '4.9/5 Рейтинг' },
    { icon: 'clock', text: 'С 2013 года' },
  ],
}

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------
const results: Record<Locale, Result[]> = {
  de: [
    { metric: '+180%', label: 'Mehr organischer Traffic', detail: 'E-Commerce Kunde' },
    { metric: 'Top 3', label: 'Google-Rankings für 15 Keywords', detail: 'B2B-Unternehmen' },
    { metric: '+320%', label: 'Mehr Anfragen', detail: 'Lokales Unternehmen' },
  ],
  en: [
    { metric: '+180%', label: 'More organic traffic', detail: 'E-commerce client' },
    { metric: 'Top 3', label: 'Google rankings for 15 keywords', detail: 'B2B company' },
    { metric: '+320%', label: 'More inquiries', detail: 'Local business' },
  ],
  ru: [
    { metric: '+180%', label: 'Больше органического трафика', detail: 'Клиент электронной коммерции' },
    { metric: 'Топ 3', label: 'Позиции в Google по 15 ключевым словам', detail: 'B2B-компания' },
    { metric: '+320%', label: 'Больше заявок', detail: 'Локальный бизнес' },
  ],
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
const services: Record<Locale, Service[]> = {
  de: [
    {
      icon: 'search',
      title: 'Technical SEO',
      description:
        'Technische Optimierung Ihrer Website für bestmögliches Crawling und Indexierung durch Suchmaschinen.',
    },
    {
      icon: 'file-text',
      title: 'Content SEO',
      description:
        'Erstellung und Optimierung hochwertiger Inhalte, die sowohl Nutzer als auch Suchmaschinen überzeugen.',
    },
    {
      icon: 'target',
      title: 'Local SEO',
      description: 'Lokale Suchmaschinenoptimierung für mehr Sichtbarkeit in Ihrer Region und bei Google Maps.',
    },
    {
      icon: 'globe',
      title: 'OffPage SEO',
      description:
        'Aufbau hochwertiger Backlinks und Stärkung Ihrer Domain-Autorität durch strategisches Linkbuilding.',
    },
    {
      icon: 'bar-chart-3',
      title: 'SEO Audit',
      description: 'Umfassende Analyse Ihrer Website mit konkreten Handlungsempfehlungen für bessere Rankings.',
    },
    {
      icon: 'trending-up',
      title: 'SEO Monitoring',
      description: 'Kontinuierliche Überwachung Ihrer Rankings, Traffic-Daten und SEO-KPIs mit regelmäßigen Reports.',
    },
  ],
  en: [
    {
      icon: 'search',
      title: 'Technical SEO',
      description:
        'Technical optimization of your website for the best possible crawling and indexing by search engines.',
    },
    {
      icon: 'file-text',
      title: 'Content SEO',
      description: 'Creation and optimization of high-quality content that convinces both users and search engines.',
    },
    {
      icon: 'target',
      title: 'Local SEO',
      description: 'Local search engine optimization for more visibility in your region and on Google Maps.',
    },
    {
      icon: 'globe',
      title: 'OffPage SEO',
      description:
        'Building high-quality backlinks and strengthening your domain authority through strategic link building.',
    },
    {
      icon: 'bar-chart-3',
      title: 'SEO Audit',
      description: 'Comprehensive analysis of your website with concrete recommendations for better rankings.',
    },
    {
      icon: 'trending-up',
      title: 'SEO Monitoring',
      description: 'Continuous monitoring of your rankings, traffic data, and SEO KPIs with regular reports.',
    },
  ],
  ru: [
    {
      icon: 'search',
      title: 'Техническое SEO',
      description:
        'Техническая оптимизация вашего сайта для наилучшего сканирования и индексации поисковыми системами.',
    },
    {
      icon: 'file-text',
      title: 'Контент SEO',
      description:
        'Создание и оптимизация качественного контента, который убеждает и пользователей, и поисковые системы.',
    },
    {
      icon: 'target',
      title: 'Локальное SEO',
      description: 'Локальная поисковая оптимизация для большей видимости в вашем регионе и на Google Maps.',
    },
    {
      icon: 'globe',
      title: 'Внешнее SEO',
      description:
        'Создание качественных обратных ссылок и укрепление авторитета домена через стратегическое линкбилдинг.',
    },
    {
      icon: 'bar-chart-3',
      title: 'SEO-аудит',
      description: 'Комплексный анализ вашего сайта с конкретными рекомендациями для улучшения позиций.',
    },
    {
      icon: 'trending-up',
      title: 'SEO-мониторинг',
      description: 'Непрерывный мониторинг ваших позиций, данных трафика и SEO-KPI с регулярными отчётами.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------
const packages: Record<Locale, Package[]> = {
  de: [
    {
      name: 'SEO Audit',
      price: '€490',
      priceType: 'einmalig',
      description: 'Einmalige umfassende Analyse Ihrer Website mit Handlungsempfehlungen.',
      popular: false,
      features: [
        'Technische Analyse',
        'Content-Analyse',
        'Backlink-Analyse',
        'Wettbewerbsanalyse',
        'Keyword-Recherche',
        'Ausführlicher Report mit Empfehlungen',
      ],
    },
    {
      name: 'SEO Starter',
      price: '€790',
      priceType: '/Monat',
      description: 'Monatliche SEO-Betreuung für kleine Unternehmen.',
      popular: false,
      features: [
        'Technische Optimierung',
        'OnPage-Optimierung',
        'Keyword-Monitoring (bis 20 Keywords)',
        'Monatlicher Report',
        'Content-Empfehlungen',
        'Google Search Console Setup',
      ],
    },
    {
      name: 'SEO Business',
      price: '€1.490',
      priceType: '/Monat',
      description: 'Umfassende SEO-Strategie für wachsende Unternehmen.',
      popular: true,
      features: [
        'Alles aus SEO Starter',
        'Content-Erstellung (2 Artikel/Monat)',
        'Linkbuilding-Strategie',
        'Local SEO-Optimierung',
        'Keyword-Monitoring (bis 50 Keywords)',
        'Wöchentliche Reports',
        'Persönlicher SEO-Manager',
      ],
    },
    {
      name: 'SEO Enterprise',
      price: 'ab €2.990',
      priceType: '/Monat',
      description: 'Maximale SEO-Performance für große Unternehmen.',
      popular: false,
      features: [
        'Alles aus SEO Business',
        'Content-Erstellung (4+ Artikel/Monat)',
        'Erweiterte Linkbuilding-Kampagnen',
        'International SEO',
        'Unbegrenztes Keyword-Monitoring',
        'Conversion-Optimierung',
        'Dediziertes SEO-Team',
        'Tägliche Reports',
      ],
    },
  ],
  en: [
    {
      name: 'SEO Audit',
      price: '€490',
      priceType: 'one-time',
      description: 'One-time comprehensive analysis of your website with recommendations.',
      popular: false,
      features: [
        'Technical analysis',
        'Content analysis',
        'Backlink analysis',
        'Competitor analysis',
        'Keyword research',
        'Detailed report with recommendations',
      ],
    },
    {
      name: 'SEO Starter',
      price: '€790',
      priceType: '/month',
      description: 'Monthly SEO management for small businesses.',
      popular: false,
      features: [
        'Technical optimization',
        'On-page optimization',
        'Keyword monitoring (up to 20 keywords)',
        'Monthly report',
        'Content recommendations',
        'Google Search Console setup',
      ],
    },
    {
      name: 'SEO Business',
      price: '€1,490',
      priceType: '/month',
      description: 'Comprehensive SEO strategy for growing businesses.',
      popular: true,
      features: [
        'Everything from SEO Starter',
        'Content creation (2 articles/month)',
        'Link building strategy',
        'Local SEO optimization',
        'Keyword monitoring (up to 50 keywords)',
        'Weekly reports',
        'Personal SEO manager',
      ],
    },
    {
      name: 'SEO Enterprise',
      price: 'from €2,990',
      priceType: '/month',
      description: 'Maximum SEO performance for large enterprises.',
      popular: false,
      features: [
        'Everything from SEO Business',
        'Content creation (4+ articles/month)',
        'Advanced link building campaigns',
        'International SEO',
        'Unlimited keyword monitoring',
        'Conversion optimization',
        'Dedicated SEO team',
        'Daily reports',
      ],
    },
  ],
  ru: [
    {
      name: 'SEO-аудит',
      price: '€490',
      priceType: 'единоразово',
      description: 'Единоразовый комплексный анализ вашего сайта с рекомендациями.',
      popular: false,
      features: [
        'Технический анализ',
        'Анализ контента',
        'Анализ обратных ссылок',
        'Анализ конкурентов',
        'Исследование ключевых слов',
        'Подробный отчёт с рекомендациями',
      ],
    },
    {
      name: 'SEO Starter',
      price: '€790',
      priceType: '/месяц',
      description: 'Ежемесячное SEO-обслуживание для малого бизнеса.',
      popular: false,
      features: [
        'Техническая оптимизация',
        'OnPage-оптимизация',
        'Мониторинг ключевых слов (до 20)',
        'Ежемесячный отчёт',
        'Рекомендации по контенту',
        'Настройка Google Search Console',
      ],
    },
    {
      name: 'SEO Business',
      price: '€1 490',
      priceType: '/месяц',
      description: 'Комплексная SEO-стратегия для растущих компаний.',
      popular: true,
      features: [
        'Всё из SEO Starter',
        'Создание контента (2 статьи/месяц)',
        'Стратегия линкбилдинга',
        'Локальная SEO-оптимизация',
        'Мониторинг ключевых слов (до 50)',
        'Еженедельные отчёты',
        'Персональный SEO-менеджер',
      ],
    },
    {
      name: 'SEO Enterprise',
      price: 'от €2 990',
      priceType: '/месяц',
      description: 'Максимальная SEO-эффективность для крупных компаний.',
      popular: false,
      features: [
        'Всё из SEO Business',
        'Создание контента (4+ статей/месяц)',
        'Расширенные кампании линкбилдинга',
        'Международное SEO',
        'Неограниченный мониторинг ключевых слов',
        'Оптимизация конверсий',
        'Выделенная SEO-команда',
        'Ежедневные отчёты',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------
const processSteps: Record<Locale, ProcessStep[]> = {
  de: [
    {
      step: '01',
      title: 'Analyse',
      description: 'Umfassende Analyse Ihrer Website, Wettbewerber und Zielgruppe als Grundlage für die Strategie.',
    },
    {
      step: '02',
      title: 'Strategie',
      description: 'Entwicklung einer maßgeschneiderten SEO-Strategie basierend auf den Analyseergebnissen.',
    },
    {
      step: '03',
      title: 'OnPage-Optimierung',
      description: 'Technische und inhaltliche Optimierung Ihrer Website für bessere Rankings.',
    },
    {
      step: '04',
      title: 'Content & Linkbuilding',
      description: 'Erstellung hochwertiger Inhalte und strategischer Aufbau von Backlinks.',
    },
    {
      step: '05',
      title: 'Monitoring & Reporting',
      description: 'Kontinuierliche Überwachung der Ergebnisse und regelmäßige, transparente Reports.',
    },
  ],
  en: [
    {
      step: '01',
      title: 'Analysis',
      description:
        'Comprehensive analysis of your website, competitors, and target audience as the foundation for the strategy.',
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Development of a tailored SEO strategy based on the analysis results.',
    },
    {
      step: '03',
      title: 'On-Page Optimization',
      description: 'Technical and content optimization of your website for better rankings.',
    },
    {
      step: '04',
      title: 'Content & Link Building',
      description: 'Creation of high-quality content and strategic building of backlinks.',
    },
    {
      step: '05',
      title: 'Monitoring & Reporting',
      description: 'Continuous monitoring of results and regular, transparent reports.',
    },
  ],
  ru: [
    {
      step: '01',
      title: 'Анализ',
      description: 'Комплексный анализ вашего сайта, конкурентов и целевой аудитории как основа для стратегии.',
    },
    {
      step: '02',
      title: 'Стратегия',
      description: 'Разработка индивидуальной SEO-стратегии на основе результатов анализа.',
    },
    {
      step: '03',
      title: 'OnPage-оптимизация',
      description: 'Техническая и контентная оптимизация вашего сайта для лучших позиций.',
    },
    {
      step: '04',
      title: 'Контент и линкбилдинг',
      description: 'Создание качественного контента и стратегическое построение обратных ссылок.',
    },
    {
      step: '05',
      title: 'Мониторинг и отчётность',
      description: 'Непрерывный мониторинг результатов и регулярные прозрачные отчёты.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Related Services
// ---------------------------------------------------------------------------
const relatedServices: Record<Locale, RelatedService[]> = {
  de: [
    {
      title: 'Webdesign Wien',
      description: 'Professionelle Websites, die SEO-optimiert und conversion-stark sind.',
      href: '/webdesign-wien',
    },
    {
      title: 'Content Marketing',
      description: 'Hochwertige Inhalte, die Ihre Zielgruppe erreichen und überzeugen.',
      href: '/leistungen/marketing',
    },
    {
      title: 'Google Ads',
      description: 'Bezahlte Suchmaschinenwerbung für sofortige Sichtbarkeit und Leads.',
      href: '/leistungen/marketing',
    },
  ],
  en: [
    {
      title: 'Web Design Vienna',
      description: 'Professional websites that are SEO-optimized and conversion-focused.',
      href: '/webdesign-wien',
    },
    {
      title: 'Content Marketing',
      description: 'High-quality content that reaches and convinces your target audience.',
      href: '/leistungen/marketing',
    },
    {
      title: 'Google Ads',
      description: 'Paid search advertising for immediate visibility and leads.',
      href: '/leistungen/marketing',
    },
  ],
  ru: [
    {
      title: 'Веб-дизайн Вена',
      description: 'Профессиональные сайты, оптимизированные для SEO и конверсий.',
      href: '/webdesign-wien',
    },
    {
      title: 'Контент-маркетинг',
      description: 'Качественный контент, который достигает и убеждает вашу целевую аудиторию.',
      href: '/leistungen/marketing',
    },
    {
      title: 'Google Ads',
      description: 'Платная поисковая реклама для мгновенной видимости и лидов.',
      href: '/leistungen/marketing',
    },
  ],
}

// ---------------------------------------------------------------------------
// FAQs (city-dynamic)
// ---------------------------------------------------------------------------
function getFaqs(city: string, locale: Locale, isIndustry: boolean): FAQ[] {
  const prep = { de: isIndustry ? 'für' : 'in', en: isIndustry ? 'for' : 'in', ru: isIndustry ? 'для' : 'в' }
  const faqs: Record<Locale, FAQ[]> = {
    de: [
      {
        question: `Wie lange dauert es, bis SEO-Ergebnisse ${prep.de} ${city} sichtbar werden?`,
        answer: `Erste Verbesserungen sind oft nach 3–6 Monaten sichtbar. Nachhaltige Top-Rankings erfordern in der Regel 6–12 Monate kontinuierliche Arbeit. Die genaue Dauer hängt vom Wettbewerb ${prep.de} ${city} und Ihrer Branche ab.`,
      },
      {
        question: `Was kostet SEO ${prep.de} ${city}?`,
        answer: `Unsere SEO-Pakete für ${city} starten bei €490 für einen einmaligen Audit und ab €790/Monat für laufende Betreuung. Die Investition richtet sich nach Ihren Zielen, dem Wettbewerb und dem gewünschten Umfang.`,
      },
      {
        question: `Wie wichtig ist Local SEO für Unternehmen ${prep.de} ${city}?`,
        answer: `Local SEO ist für Unternehmen ${prep.de} ${city} essenziell. Über 46% aller Google-Suchen haben einen lokalen Bezug. Mit optimiertem Google Business Profile und lokaler Strategie werden Sie von Kunden ${prep.de} ${city} gefunden.`,
      },
      {
        question: `Was beinhaltet ein technisches SEO-Audit?`,
        answer: `Unser technisches SEO-Audit umfasst die Analyse der Seitenstruktur, Ladezeiten, mobile Optimierung, Crawlability, Indexierung, interne Verlinkung, Schema-Markup und Core Web Vitals. Sie erhalten einen detaillierten Report mit priorisierten Empfehlungen.`,
      },
      {
        question: `Wie messen Sie den Erfolg der SEO-Maßnahmen?`,
        answer: `Wir messen den Erfolg anhand klar definierter KPIs: organischer Traffic, Keyword-Rankings, Sichtbarkeitsindex, Conversion-Rate und ROI. Sie erhalten regelmäßige Reports mit transparenten Daten und Analysen.`,
      },
    ],
    en: [
      {
        question: `How long does it take to see SEO results ${prep.en} ${city}?`,
        answer: `Initial improvements are often visible after 3–6 months. Sustainable top rankings typically require 6–12 months of continuous work. The exact duration depends on competition ${prep.en} ${city} and your industry.`,
      },
      {
        question: `How much does SEO cost ${prep.en} ${city}?`,
        answer: `Our SEO packages for ${city} start at €490 for a one-time audit and from €790/month for ongoing management. The investment depends on your goals, competition, and desired scope.`,
      },
      {
        question: `How important is Local SEO for businesses ${prep.en} ${city}?`,
        answer: `Local SEO is essential for businesses ${prep.en} ${city}. Over 46% of all Google searches have local intent. With an optimized Google Business Profile and local strategy, you will be found by customers ${prep.en} ${city}.`,
      },
      {
        question: `What does a technical SEO audit include?`,
        answer: `Our technical SEO audit includes analysis of site structure, loading times, mobile optimization, crawlability, indexing, internal linking, schema markup, and Core Web Vitals. You receive a detailed report with prioritized recommendations.`,
      },
      {
        question: `How do you measure the success of SEO efforts?`,
        answer: `We measure success based on clearly defined KPIs: organic traffic, keyword rankings, visibility index, conversion rate, and ROI. You receive regular reports with transparent data and analyses.`,
      },
    ],
    ru: [
      {
        question: `Как долго ждать результатов SEO ${prep.ru} ${city}?`,
        answer: `Первые улучшения часто заметны через 3–6 месяцев. Устойчивые высокие позиции обычно требуют 6–12 месяцев непрерывной работы. Точные сроки зависят от конкуренции ${prep.ru} ${city} и вашей отрасли.`,
      },
      {
        question: `Сколько стоит SEO ${prep.ru} ${city}?`,
        answer: `Наши SEO-пакеты для ${city} начинаются от €490 за единоразовый аудит и от €790/месяц за постоянное обслуживание. Инвестиции зависят от ваших целей, конкуренции и желаемого объёма.`,
      },
      {
        question: `Насколько важно локальное SEO для бизнеса ${prep.ru} ${city}?`,
        answer: `Локальное SEO необходимо для бизнеса ${prep.ru} ${city}. Более 46% всех поисков в Google имеют локальный характер. С оптимизированным профилем Google Business и локальной стратегией вас найдут клиенты ${prep.ru} ${city}.`,
      },
      {
        question: `Что включает технический SEO-аудит?`,
        answer: `Наш технический SEO-аудит включает анализ структуры сайта, скорости загрузки, мобильной оптимизации, возможности сканирования, индексации, внутренней перелинковки, разметки Schema и Core Web Vitals. Вы получите подробный отчёт с приоритизированными рекомендациями.`,
      },
      {
        question: `Как вы измеряете успех SEO-мероприятий?`,
        answer: `Мы измеряем успех на основе чётко определённых KPI: органический трафик, позиции ключевых слов, индекс видимости, конверсия и ROI. Вы получаете регулярные отчёты с прозрачными данными и аналитикой.`,
      },
    ],
  }
  return faqs[locale]
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function getHero(city: string, locale: Locale, isIndustry: boolean) {
  const prep = { de: isIndustry ? 'für' : 'in', en: isIndustry ? 'for' : 'in', ru: isIndustry ? 'для' : 'в' }
  const heroes: Record<
    Locale,
    { badge: string; title: string; description: string; ctaPrimary: string; ctaSecondary: string }
  > = {
    de: {
      badge: `SEO Agentur ${city}`,
      title: `SEO-Optimierung ${prep.de} ${city}`,
      description: `Mehr Sichtbarkeit, mehr Traffic, mehr Kunden. Professionelle Suchmaschinenoptimierung für Unternehmen ${prep.de} ${city} — datengetrieben, nachhaltig und transparent.`,
      ctaPrimary: 'Kostenlose Beratung',
      ctaSecondary: 'SEO-Audit anfordern',
    },
    en: {
      badge: `SEO Agency ${city}`,
      title: `SEO Optimization ${prep.en} ${city}`,
      description: `More visibility, more traffic, more customers. Professional search engine optimization for businesses ${prep.en} ${city} — data-driven, sustainable, and transparent.`,
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'Request SEO Audit',
    },
    ru: {
      badge: `SEO-агентство ${city}`,
      title: `SEO-оптимизация ${prep.ru} ${city}`,
      description: `Больше видимости, больше трафика, больше клиентов. Профессиональная поисковая оптимизация для компаний ${prep.ru} ${city} — на основе данных, устойчиво и прозрачно.`,
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Запросить SEO-аудит',
    },
  }
  return heroes[locale]
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export function getSeoContent(citySlug: string, locale: Locale): LandingPageContent {
  const cityConfig = getCityBySlug(citySlug)
  const industryConfig = getIndustryBySlug(citySlug)
  const city = cityConfig?.cityName[locale] ?? industryConfig?.name[locale] ?? citySlug
  const isIndustry = !cityConfig && !!industryConfig
  const prep = { de: isIndustry ? 'für' : 'in', en: isIndustry ? 'for' : 'in', ru: isIndustry ? 'для' : 'в' }

  return {
    hero: getHero(city, locale, isIndustry),
    trustSignals: trustSignals[locale],
    results: results[locale],
    services: services[locale],
    packages: packages[locale],
    process: processSteps[locale],
    faqs: getFaqs(city, locale, isIndustry),
    relatedServices: relatedServices[locale],
    labels: {
      ...sharedLabels[locale],
      ctaTitle:
        locale === 'de'
          ? `SEO-Projekt ${prep.de} ${city} starten`
          : locale === 'en'
            ? `Start Your SEO Project ${prep.en} ${city}`
            : `Начните ваш SEO-проект ${prep.ru} ${city}`,
      ctaDescription:
        locale === 'de'
          ? `Lassen Sie uns über Ihre SEO-Strategie ${prep.de} ${city} sprechen. Kostenloses Erstgespräch ohne Verpflichtung.`
          : locale === 'en'
            ? `Let's talk about your SEO strategy ${prep.en} ${city}. Free initial consultation with no obligation.`
            : `Давайте обсудим вашу SEO-стратегию ${prep.ru} ${city}. Бесплатная первичная консультация без обязательств.`,
    },
  }
}

export function getSeoMeta(citySlug: string, locale: Locale): { metaTitle: string; metaDescription: string } {
  const cityConfig = getCityBySlug(citySlug)
  const industryConfig = getIndustryBySlug(citySlug)
  const city = cityConfig?.cityName[locale] ?? industryConfig?.name[locale] ?? citySlug
  const isIndustry = !cityConfig && !!industryConfig

  const meta: Record<Locale, { metaTitle: string; metaDescription: string }> = {
    de: {
      metaTitle: `SEO ${city} | GoldenWing Creative Studios`,
      metaDescription: `SEO Agentur für ${city}. Mehr organischer Traffic durch professionelle Suchmaschinenoptimierung. Technical SEO, Content, Linkbuilding und Local SEO. Jetzt anfragen!`,
    },
    en: {
      metaTitle: `SEO ${city} | GoldenWing Creative Studios`,
      metaDescription: `SEO agency for ${city}. More organic traffic through professional search engine optimization. Technical SEO, content, link building, and local SEO. Get in touch!`,
    },
    ru: {
      metaTitle: `SEO ${city} | GoldenWing Creative Studios`,
      metaDescription: `SEO-агентство для ${city}. Больше органического трафика через профессиональную поисковую оптимизацию. Техническое SEO, контент, линкбилдинг и локальное SEO. Свяжитесь с нами!`,
    },
  }
  return meta[locale]
}
