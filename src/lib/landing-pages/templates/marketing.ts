import type {
  Locale,
  TrustSignal,
  Benefit,
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
    { icon: 'award', text: '200+ Kampagnen' },
    { icon: 'star', text: '4.9/5 Bewertung' },
    { icon: 'clock', text: 'Seit 2013' },
  ],
  en: [
    { icon: 'award', text: '200+ Campaigns' },
    { icon: 'star', text: '4.9/5 Rating' },
    { icon: 'clock', text: 'Since 2013' },
  ],
  ru: [
    { icon: 'award', text: '200+ кампаний' },
    { icon: 'star', text: '4.9/5 Рейтинг' },
    { icon: 'clock', text: 'С 2013 года' },
  ],
}

// ---------------------------------------------------------------------------
// Benefits
// ---------------------------------------------------------------------------
const benefits: Record<Locale, Benefit[]> = {
  de: [
    {
      icon: 'bar-chart',
      title: 'Messbar',
      description: 'Transparentes Reporting und messbare KPIs für jeden Euro Ihres Marketing-Budgets.',
    },
    {
      icon: 'target',
      title: 'Zielgerichtet',
      description: 'Präzises Targeting erreicht genau die Menschen, die Ihre Produkte oder Dienstleistungen suchen.',
    },
    {
      icon: 'trending-up',
      title: 'Skalierbar',
      description: 'Flexible Strategien, die mit Ihrem Unternehmen wachsen und sich anpassen.',
    },
    {
      icon: 'database',
      title: 'Datengetrieben',
      description: 'Entscheidungen basierend auf Daten und Analysen statt Bauchgefühl.',
    },
  ],
  en: [
    {
      icon: 'bar-chart',
      title: 'Measurable',
      description: 'Transparent reporting and measurable KPIs for every euro of your marketing budget.',
    },
    {
      icon: 'target',
      title: 'Targeted',
      description: 'Precise targeting reaches exactly the people looking for your products or services.',
    },
    {
      icon: 'trending-up',
      title: 'Scalable',
      description: 'Flexible strategies that grow and adapt with your business.',
    },
    {
      icon: 'database',
      title: 'Data-Driven',
      description: 'Decisions based on data and analytics instead of gut feeling.',
    },
  ],
  ru: [
    {
      icon: 'bar-chart',
      title: 'Измеримо',
      description: 'Прозрачная отчётность и измеримые KPI для каждого евро вашего маркетингового бюджета.',
    },
    {
      icon: 'target',
      title: 'Целенаправленно',
      description: 'Точный таргетинг достигает именно тех людей, которые ищут ваши продукты или услуги.',
    },
    {
      icon: 'trending-up',
      title: 'Масштабируемо',
      description: 'Гибкие стратегии, которые растут и адаптируются вместе с вашим бизнесом.',
    },
    {
      icon: 'database',
      title: 'На основе данных',
      description: 'Решения на основе данных и аналитики, а не интуиции.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
const services: Record<Locale, Service[]> = {
  de: [
    {
      icon: 'target',
      title: 'Google Ads',
      description: 'Bezahlte Suchmaschinenwerbung für sofortige Sichtbarkeit und qualifizierte Leads.',
    },
    {
      icon: 'share-2',
      title: 'Social Media Marketing',
      description: 'Strategisches Social-Media-Marketing auf Facebook, Instagram, LinkedIn und TikTok.',
    },
    {
      icon: 'file-text',
      title: 'Content Marketing',
      description: 'Erstellung und Distribution hochwertiger Inhalte, die Ihre Zielgruppe begeistern.',
    },
    {
      icon: 'mail',
      title: 'E-Mail-Marketing',
      description: 'Automatisierte E-Mail-Kampagnen für Kundenbindung und Umsatzsteigerung.',
    },
    {
      icon: 'cog',
      title: 'Marketing Automation',
      description: 'Automatisierung wiederkehrender Marketing-Prozesse für mehr Effizienz und Skalierung.',
    },
    {
      icon: 'mouse-pointer-click',
      title: 'Conversion-Optimierung',
      description: 'Optimierung Ihrer Website und Landing Pages für maximale Conversion-Rates.',
    },
  ],
  en: [
    {
      icon: 'target',
      title: 'Google Ads',
      description: 'Paid search advertising for immediate visibility and qualified leads.',
    },
    {
      icon: 'share-2',
      title: 'Social Media Marketing',
      description: 'Strategic social media marketing on Facebook, Instagram, LinkedIn, and TikTok.',
    },
    {
      icon: 'file-text',
      title: 'Content Marketing',
      description: 'Creation and distribution of high-quality content that inspires your target audience.',
    },
    {
      icon: 'mail',
      title: 'Email Marketing',
      description: 'Automated email campaigns for customer retention and revenue growth.',
    },
    {
      icon: 'cog',
      title: 'Marketing Automation',
      description: 'Automation of recurring marketing processes for more efficiency and scaling.',
    },
    {
      icon: 'mouse-pointer-click',
      title: 'Conversion Optimization',
      description: 'Optimization of your website and landing pages for maximum conversion rates.',
    },
  ],
  ru: [
    {
      icon: 'target',
      title: 'Google Ads',
      description: 'Платная поисковая реклама для мгновенной видимости и качественных лидов.',
    },
    {
      icon: 'share-2',
      title: 'Маркетинг в соцсетях',
      description: 'Стратегический маркетинг в Facebook, Instagram, LinkedIn и TikTok.',
    },
    {
      icon: 'file-text',
      title: 'Контент-маркетинг',
      description: 'Создание и распространение качественного контента, который вдохновляет вашу целевую аудиторию.',
    },
    {
      icon: 'mail',
      title: 'Email-маркетинг',
      description: 'Автоматизированные email-кампании для удержания клиентов и роста выручки.',
    },
    {
      icon: 'cog',
      title: 'Автоматизация маркетинга',
      description: 'Автоматизация повторяющихся маркетинговых процессов для большей эффективности и масштабирования.',
    },
    {
      icon: 'mouse-pointer-click',
      title: 'Оптимизация конверсий',
      description: 'Оптимизация вашего сайта и лендингов для максимальных показателей конверсии.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------
const packages: Record<Locale, Package[]> = {
  de: [
    {
      name: 'Marketing Starter',
      price: '€990',
      priceType: '/Monat',
      description: 'Einstieg ins digitale Marketing für kleine Unternehmen.',
      popular: false,
      features: [
        'Google Ads Management (bis €2.000 Adspend)',
        'Social Media Management (2 Kanäle)',
        'Monatlicher Performance-Report',
        'Content-Planung',
        'Basis-Tracking-Setup',
        'Monatliches Strategie-Meeting',
      ],
    },
    {
      name: 'Marketing Business',
      price: '€2.490',
      priceType: '/Monat',
      description: 'Umfassende Marketing-Strategie für wachsende Unternehmen.',
      popular: true,
      features: [
        'Google Ads Management (bis €5.000 Adspend)',
        'Social Media Marketing (4 Kanäle)',
        'Content-Erstellung (4 Beiträge/Monat)',
        'E-Mail-Marketing-Kampagnen',
        'Landing Page Optimierung',
        'A/B Testing',
        'Wöchentliche Reports',
        'Persönlicher Marketing-Manager',
      ],
    },
    {
      name: 'Marketing Enterprise',
      price: 'ab €4.990',
      priceType: '/Monat',
      description: 'Maximale Marketing-Performance für große Unternehmen.',
      popular: false,
      features: [
        'Unbegrenztes Ads Management',
        'Vollständiges Social Media Management',
        'Content-Erstellung (8+ Beiträge/Monat)',
        'Marketing Automation',
        'Conversion-Optimierung',
        'Video-Marketing',
        'Influencer-Kooperationen',
        'Dediziertes Marketing-Team',
        'Tägliche Reports & Dashboard',
      ],
    },
  ],
  en: [
    {
      name: 'Marketing Starter',
      price: '€990',
      priceType: '/month',
      description: 'Getting started with digital marketing for small businesses.',
      popular: false,
      features: [
        'Google Ads management (up to €2,000 ad spend)',
        'Social media management (2 channels)',
        'Monthly performance report',
        'Content planning',
        'Basic tracking setup',
        'Monthly strategy meeting',
      ],
    },
    {
      name: 'Marketing Business',
      price: '€2,490',
      priceType: '/month',
      description: 'Comprehensive marketing strategy for growing businesses.',
      popular: true,
      features: [
        'Google Ads management (up to €5,000 ad spend)',
        'Social media marketing (4 channels)',
        'Content creation (4 posts/month)',
        'Email marketing campaigns',
        'Landing page optimization',
        'A/B testing',
        'Weekly reports',
        'Personal marketing manager',
      ],
    },
    {
      name: 'Marketing Enterprise',
      price: 'from €4,990',
      priceType: '/month',
      description: 'Maximum marketing performance for large enterprises.',
      popular: false,
      features: [
        'Unlimited ads management',
        'Full social media management',
        'Content creation (8+ posts/month)',
        'Marketing automation',
        'Conversion optimization',
        'Video marketing',
        'Influencer partnerships',
        'Dedicated marketing team',
        'Daily reports & dashboard',
      ],
    },
  ],
  ru: [
    {
      name: 'Marketing Starter',
      price: '€990',
      priceType: '/месяц',
      description: 'Начало цифрового маркетинга для малого бизнеса.',
      popular: false,
      features: [
        'Управление Google Ads (до €2 000 рекламного бюджета)',
        'Управление соцсетями (2 канала)',
        'Ежемесячный отчёт о результатах',
        'Планирование контента',
        'Базовая настройка трекинга',
        'Ежемесячная стратегическая встреча',
      ],
    },
    {
      name: 'Marketing Business',
      price: '€2 490',
      priceType: '/месяц',
      description: 'Комплексная маркетинговая стратегия для растущих компаний.',
      popular: true,
      features: [
        'Управление Google Ads (до €5 000 рекламного бюджета)',
        'Маркетинг в соцсетях (4 канала)',
        'Создание контента (4 публикации/месяц)',
        'Email-маркетинговые кампании',
        'Оптимизация лендингов',
        'A/B-тестирование',
        'Еженедельные отчёты',
        'Персональный маркетинг-менеджер',
      ],
    },
    {
      name: 'Marketing Enterprise',
      price: 'от €4 990',
      priceType: '/месяц',
      description: 'Максимальная маркетинговая эффективность для крупных компаний.',
      popular: false,
      features: [
        'Неограниченное управление рекламой',
        'Полное управление соцсетями',
        'Создание контента (8+ публикаций/месяц)',
        'Автоматизация маркетинга',
        'Оптимизация конверсий',
        'Видеомаркетинг',
        'Сотрудничество с инфлюенсерами',
        'Выделенная маркетинговая команда',
        'Ежедневные отчёты и дашборд',
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
      description: 'Analyse Ihrer Ausgangslage, Zielgruppe, Wettbewerber und bestehender Marketing-Aktivitäten.',
    },
    {
      step: '02',
      title: 'Strategie',
      description: 'Entwicklung einer datengetriebenen Marketing-Strategie mit klaren Zielen und KPIs.',
    },
    {
      step: '03',
      title: 'Umsetzung',
      description: 'Professionelle Umsetzung aller Marketing-Maßnahmen über die definierten Kanäle.',
    },
    {
      step: '04',
      title: 'Optimierung',
      description: 'Kontinuierliche Optimierung basierend auf Performance-Daten und A/B-Tests.',
    },
    {
      step: '05',
      title: 'Skalierung',
      description: 'Erfolgreiche Kampagnen skalieren und neue Wachstumschancen identifizieren.',
    },
  ],
  en: [
    {
      step: '01',
      title: 'Analysis',
      description:
        'Analysis of your current situation, target audience, competitors, and existing marketing activities.',
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Development of a data-driven marketing strategy with clear goals and KPIs.',
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Professional execution of all marketing measures across the defined channels.',
    },
    {
      step: '04',
      title: 'Optimization',
      description: 'Continuous optimization based on performance data and A/B testing.',
    },
    { step: '05', title: 'Scaling', description: 'Scale successful campaigns and identify new growth opportunities.' },
  ],
  ru: [
    {
      step: '01',
      title: 'Анализ',
      description:
        'Анализ вашей исходной ситуации, целевой аудитории, конкурентов и текущих маркетинговых активностей.',
    },
    {
      step: '02',
      title: 'Стратегия',
      description: 'Разработка маркетинговой стратегии на основе данных с чёткими целями и KPI.',
    },
    {
      step: '03',
      title: 'Реализация',
      description: 'Профессиональная реализация всех маркетинговых мероприятий по определённым каналам.',
    },
    {
      step: '04',
      title: 'Оптимизация',
      description: 'Непрерывная оптимизация на основе данных о производительности и A/B-тестов.',
    },
    {
      step: '05',
      title: 'Масштабирование',
      description: 'Масштабирование успешных кампаний и выявление новых возможностей роста.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Related Services
// ---------------------------------------------------------------------------
const relatedServices: Record<Locale, RelatedService[]> = {
  de: [
    {
      title: 'SEO',
      description: 'Organische Sichtbarkeit als nachhaltige Ergänzung zu Ihren Kampagnen.',
      href: '/seo-agentur-wien',
    },
    {
      title: 'Webdesign',
      description: 'Conversion-optimierte Websites als Basis für Ihren Marketing-Erfolg.',
      href: '/leistungen/webdesign',
    },
    {
      title: 'Branding',
      description: 'Starke Markenidentität als Grundlage für erfolgreiches Marketing.',
      href: '/leistungen/branding',
    },
  ],
  en: [
    {
      title: 'SEO',
      description: 'Organic visibility as a sustainable complement to your campaigns.',
      href: '/seo-agentur-wien',
    },
    {
      title: 'Web Design',
      description: 'Conversion-optimized websites as the foundation for your marketing success.',
      href: '/leistungen/webdesign',
    },
    {
      title: 'Branding',
      description: 'Strong brand identity as the foundation for successful marketing.',
      href: '/leistungen/branding',
    },
  ],
  ru: [
    {
      title: 'SEO',
      description: 'Органическая видимость как устойчивое дополнение к вашим кампаниям.',
      href: '/seo-agentur-wien',
    },
    {
      title: 'Веб-дизайн',
      description: 'Сайты, оптимизированные для конверсий, как основа вашего маркетингового успеха.',
      href: '/leistungen/webdesign',
    },
    {
      title: 'Брендинг',
      description: 'Сильная идентичность бренда как фундамент для успешного маркетинга.',
      href: '/leistungen/branding',
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
        question: `Wann sehe ich erste Ergebnisse meiner Marketing-Kampagnen ${prep.de} ${city}?`,
        answer: `Bei bezahlter Werbung (Google Ads, Social Ads) sehen Sie oft innerhalb weniger Tage erste Ergebnisse. Content Marketing und organische Strategien benötigen typischerweise 3–6 Monate für nachhaltige Resultate. Wir setzen auf einen Mix für schnelle und langfristige Erfolge.`,
      },
      {
        question: `Welche Marketing-Kanäle empfehlen Sie für Unternehmen ${prep.de} ${city}?`,
        answer: `Die idealen Kanäle hängen von Ihrer Zielgruppe und Branche ab. Für B2B-Unternehmen ${prep.de} ${city} empfehlen wir LinkedIn und Google Ads, für B2C oft Instagram, Facebook und TikTok. In der Analysephase identifizieren wir die besten Kanäle für Sie.`,
      },
      {
        question: `Wie viel Budget benötige ich für Online-Marketing?`,
        answer: `Das Mindestbudget für effektives Online-Marketing liegt bei ca. €1.500–3.000/Monat (inklusive Agenturgebühren und Adspend). Das optimale Budget richtet sich nach Ihren Zielen, dem Wettbewerb und Ihrer Branche. Wir beraten Sie transparent.`,
      },
      {
        question: `Wie sieht das Reporting aus?`,
        answer: `Sie erhalten regelmäßige, verständliche Reports mit allen relevanten KPIs: Impressionen, Klicks, Conversions, Cost-per-Lead, ROAS und mehr. Je nach Paket wöchentlich oder monatlich, plus Zugang zu einem Live-Dashboard.`,
      },
      {
        question: `Was ist der Unterschied zwischen B2B- und B2C-Marketing?`,
        answer: `B2B-Marketing fokussiert auf längere Entscheidungszyklen, LinkedIn, Content Marketing und Lead-Nurturing. B2C-Marketing setzt stärker auf emotionale Ansprache, Social Media, schnelle Conversions und breitere Zielgruppen. Wir passen die Strategie an Ihr Geschäftsmodell an.`,
      },
    ],
    en: [
      {
        question: `When will I see the first results of my marketing campaigns ${prep.en} ${city}?`,
        answer: `With paid advertising (Google Ads, Social Ads), you often see initial results within a few days. Content marketing and organic strategies typically need 3–6 months for sustainable results. We use a mix for both quick wins and long-term success.`,
      },
      {
        question: `Which marketing channels do you recommend for businesses ${prep.en} ${city}?`,
        answer: `The ideal channels depend on your target audience and industry. For B2B companies ${prep.en} ${city}, we recommend LinkedIn and Google Ads; for B2C, often Instagram, Facebook, and TikTok. During the analysis phase, we identify the best channels for you.`,
      },
      {
        question: `How much budget do I need for online marketing?`,
        answer: `The minimum budget for effective online marketing is approximately €1,500–3,000/month (including agency fees and ad spend). The optimal budget depends on your goals, competition, and industry. We advise you transparently.`,
      },
      {
        question: `What does the reporting look like?`,
        answer: `You receive regular, easy-to-understand reports with all relevant KPIs: impressions, clicks, conversions, cost per lead, ROAS, and more. Depending on the package, weekly or monthly, plus access to a live dashboard.`,
      },
      {
        question: `What is the difference between B2B and B2C marketing?`,
        answer: `B2B marketing focuses on longer decision cycles, LinkedIn, content marketing, and lead nurturing. B2C marketing relies more on emotional messaging, social media, quick conversions, and broader audiences. We adapt the strategy to your business model.`,
      },
    ],
    ru: [
      {
        question: `Когда я увижу первые результаты маркетинговых кампаний ${prep.ru} ${city}?`,
        answer: `При платной рекламе (Google Ads, Social Ads) первые результаты часто видны в течение нескольких дней. Контент-маркетинг и органические стратегии обычно требуют 3–6 месяцев для устойчивых результатов. Мы используем микс для быстрых и долгосрочных успехов.`,
      },
      {
        question: `Какие маркетинговые каналы вы рекомендуете для бизнеса ${prep.ru} ${city}?`,
        answer: `Идеальные каналы зависят от вашей целевой аудитории и отрасли. Для B2B-компаний ${prep.ru} ${city} мы рекомендуем LinkedIn и Google Ads, для B2C — часто Instagram, Facebook и TikTok. На этапе анализа мы определяем лучшие каналы для вас.`,
      },
      {
        question: `Какой бюджет нужен для онлайн-маркетинга?`,
        answer: `Минимальный бюджет для эффективного онлайн-маркетинга составляет примерно €1 500–3 000/месяц (включая услуги агентства и рекламный бюджет). Оптимальный бюджет зависит от ваших целей, конкуренции и отрасли. Мы консультируем вас прозрачно.`,
      },
      {
        question: `Как выглядит отчётность?`,
        answer: `Вы получаете регулярные, понятные отчёты со всеми релевантными KPI: показы, клики, конверсии, стоимость лида, ROAS и другие метрики. В зависимости от пакета — еженедельно или ежемесячно, плюс доступ к онлайн-дашборду.`,
      },
      {
        question: `В чём разница между B2B- и B2C-маркетингом?`,
        answer: `B2B-маркетинг фокусируется на длинных циклах принятия решений, LinkedIn, контент-маркетинге и подогреве лидов. B2C-маркетинг больше опирается на эмоциональное обращение, соцсети, быстрые конверсии и более широкие аудитории. Мы адаптируем стратегию под вашу бизнес-модель.`,
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
      badge: `Marketing Agentur ${city}`,
      title: `Digitales Marketing ${prep.de} ${city}`,
      description: `Mehr Leads, mehr Kunden, mehr Umsatz. Datengetriebenes Online-Marketing für Unternehmen ${prep.de} ${city} — von Google Ads über Social Media bis Content Marketing.`,
      ctaPrimary: 'Kostenlose Beratung',
      ctaSecondary: 'Fallstudien ansehen',
    },
    en: {
      badge: `Marketing Agency ${city}`,
      title: `Digital Marketing ${prep.en} ${city}`,
      description: `More leads, more customers, more revenue. Data-driven online marketing for businesses ${prep.en} ${city} — from Google Ads to social media to content marketing.`,
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Case Studies',
    },
    ru: {
      badge: `Маркетинговое агентство ${city}`,
      title: `Цифровой маркетинг ${prep.ru} ${city}`,
      description: `Больше лидов, больше клиентов, больше выручки. Маркетинг на основе данных для компаний ${prep.ru} ${city} — от Google Ads и соцсетей до контент-маркетинга.`,
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть кейсы',
    },
  }
  return heroes[locale]
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export function getMarketingContent(citySlug: string, locale: Locale): LandingPageContent {
  const cityConfig = getCityBySlug(citySlug)
  const industryConfig = getIndustryBySlug(citySlug)
  const city = cityConfig?.cityName[locale] ?? industryConfig?.name[locale] ?? citySlug
  const isIndustry = !cityConfig && !!industryConfig
  const prep = { de: isIndustry ? 'für' : 'in', en: isIndustry ? 'for' : 'in', ru: isIndustry ? 'для' : 'в' }

  return {
    hero: getHero(city, locale, isIndustry),
    trustSignals: trustSignals[locale],
    benefits: benefits[locale],
    services: services[locale],
    packages: packages[locale],
    process: processSteps[locale],
    faqs: getFaqs(city, locale, isIndustry),
    relatedServices: relatedServices[locale],
    labels: {
      ...sharedLabels[locale],
      ctaTitle:
        locale === 'de'
          ? `Marketing-Projekt ${prep.de} ${city} starten`
          : locale === 'en'
            ? `Start Your Marketing Project ${prep.en} ${city}`
            : `Начните ваш маркетинговый проект ${prep.ru} ${city}`,
      ctaDescription:
        locale === 'de'
          ? `Lassen Sie uns über Ihre Marketing-Strategie ${prep.de} ${city} sprechen. Kostenloses Erstgespräch ohne Verpflichtung.`
          : locale === 'en'
            ? `Let's talk about your marketing strategy ${prep.en} ${city}. Free initial consultation with no obligation.`
            : `Давайте обсудим вашу маркетинговую стратегию ${prep.ru} ${city}. Бесплатная первичная консультация без обязательств.`,
    },
  }
}

export function getMarketingMeta(citySlug: string, locale: Locale): { metaTitle: string; metaDescription: string } {
  const cityConfig = getCityBySlug(citySlug)
  const industryConfig = getIndustryBySlug(citySlug)
  const city = cityConfig?.cityName[locale] ?? industryConfig?.name[locale] ?? citySlug
  const isIndustry = !cityConfig && !!industryConfig

  const meta: Record<Locale, { metaTitle: string; metaDescription: string }> = {
    de: {
      metaTitle: `Marketing ${city} | GoldenWing Creative Studios`,
      metaDescription: `Marketing Agentur für ${city}. Google Ads, Social Media, Content Marketing und mehr. Datengetriebenes Online-Marketing für messbare Ergebnisse. Jetzt anfragen!`,
    },
    en: {
      metaTitle: `Marketing ${city} | GoldenWing Creative Studios`,
      metaDescription: `Marketing agency for ${city}. Google Ads, social media, content marketing, and more. Data-driven online marketing for measurable results. Get in touch!`,
    },
    ru: {
      metaTitle: `Маркетинг ${city} | GoldenWing Creative Studios`,
      metaDescription: `Маркетинговое агентство для ${city}. Google Ads, соцсети, контент-маркетинг и многое другое. Онлайн-маркетинг на основе данных для измеримых результатов. Свяжитесь с нами!`,
    },
  }
  return meta[locale]
}
