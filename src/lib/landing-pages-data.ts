/**
 * Landing Pages Data
 *
 * Zentrale Datei für alle Landing Page Inhalte.
 * Struktur: Shared Content per Service-Typ + City-spezifische Overrides
 */

import type {
  LandingPageContent,
  LandingPageSEO,
  LandingPageLabels,
  TrustSignal,
  Benefit,
  Result,
  Service,
  Package,
  ProcessStep,
  FAQ,
  RelatedService,
  LocalBusinessInfo,
} from '@/components/templates/landing-page'

type Locale = 'de' | 'en' | 'ru'
type ContentLocale = 'de' | 'en' | 'ru'

function getContentLocale(locale: Locale): ContentLocale {
  return locale
}

// ============================================================================
// SHARED LABELS
// ============================================================================

export const sharedLabels: Record<ContentLocale, LandingPageLabels> = {
  de: {
    pricingTitle: 'Unsere Pakete',
    pricingDescription: 'Transparente Preise für jeden Bedarf.',
    processTitle: 'Unser Prozess',
    processSubtitle: 'So arbeiten wir gemeinsam an Ihrem Erfolg.',
    technologiesTitle: 'Technologien',
    technologiesDescription: 'Wir setzen auf bewährte und moderne Technologien für beste Ergebnisse.',
    servicesTitle: 'Unsere Leistungen',
    servicesDescription: 'Umfassende Lösungen für Ihren Erfolg.',
    resultsTitle: 'Ergebnisse',
    faqTitle: 'Häufige Fragen',
    faqSubtitle: 'Antworten auf häufig gestellte Fragen.',
    relatedServicesTitle: 'Verwandte Leistungen',
    ctaTitle: 'Bereit für Ihr Projekt?',
    ctaDescription: 'Lassen Sie uns über Ihr Projekt sprechen. Kostenloses Erstgespräch ohne Verpflichtung.',
    ctaButton: 'Projekt anfragen',
    popular: 'Beliebt',
    oneTime: 'einmalig',
    sendRequest: 'Anfrage senden',
    learnMore: 'Mehr erfahren',
  },
  en: {
    pricingTitle: 'Our Packages',
    pricingDescription: 'Transparent pricing for every need.',
    processTitle: 'Our Process',
    processSubtitle: 'How we work together for your success.',
    technologiesTitle: 'Technologies',
    technologiesDescription: 'We rely on proven and modern technologies for best results.',
    servicesTitle: 'Our Services',
    servicesDescription: 'Comprehensive solutions for your success.',
    resultsTitle: 'Results',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Answers to frequently asked questions.',
    relatedServicesTitle: 'Related Services',
    ctaTitle: 'Ready for Your Project?',
    ctaDescription: "Let's talk about your project. Free initial consultation with no obligation.",
    ctaButton: 'Request Project',
    popular: 'Popular',
    oneTime: 'one-time',
    sendRequest: 'Send Request',
    learnMore: 'Learn More',
  },
  ru: {
    pricingTitle: 'Наши пакеты',
    pricingDescription: 'Прозрачные цены для любых задач.',
    processTitle: 'Наш процесс',
    processSubtitle: 'Как мы работаем вместе над вашим успехом.',
    technologiesTitle: 'Технологии',
    technologiesDescription: 'Мы используем проверенные и современные технологии для лучших результатов.',
    servicesTitle: 'Наши услуги',
    servicesDescription: 'Комплексные решения для вашего успеха.',
    resultsTitle: 'Результаты',
    faqTitle: 'Часто задаваемые вопросы',
    faqSubtitle: 'Ответы на часто задаваемые вопросы.',
    relatedServicesTitle: 'Связанные услуги',
    ctaTitle: 'Готовы к вашему проекту?',
    ctaDescription: 'Давайте обсудим ваш проект. Бесплатная первичная консультация без обязательств.',
    ctaButton: 'Заказать проект',
    popular: 'Популярный',
    oneTime: 'единоразово',
    sendRequest: 'Отправить запрос',
    learnMore: 'Узнать больше',
  },
}

// ============================================================================
// WEBDESIGN SHARED DATA
// ============================================================================

export const webdesignTrustSignals: Record<ContentLocale, TrustSignal[]> = {
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
    { icon: 'star', text: 'Рейтинг 4.9/5' },
    { icon: 'clock', text: 'С 2013 года' },
  ],
}

export const webdesignBenefits: Record<ContentLocale, Benefit[]> = {
  de: [
    { icon: 'zap', title: 'Blitzschnell', description: 'Core Web Vitals optimiert für beste Ladezeiten' },
    { icon: 'shield', title: 'Sicher', description: 'SSL-Verschlüsselung und moderne Sicherheitsstandards' },
    { icon: 'users', title: 'Benutzerfreundlich', description: 'Intuitive Navigation und UX-Design' },
    { icon: 'star', title: 'SEO-optimiert', description: 'Von Anfang an für Google optimiert' },
  ],
  en: [
    { icon: 'zap', title: 'Lightning Fast', description: 'Core Web Vitals optimized for best loading times' },
    { icon: 'shield', title: 'Secure', description: 'SSL encryption and modern security standards' },
    { icon: 'users', title: 'User-Friendly', description: 'Intuitive navigation and UX design' },
    { icon: 'star', title: 'SEO-Optimized', description: 'Optimized for Google from the start' },
  ],
  ru: [
    { icon: 'zap', title: 'Молниеносно', description: 'Core Web Vitals оптимизированы для лучшей скорости загрузки' },
    { icon: 'shield', title: 'Безопасно', description: 'SSL-шифрование и современные стандарты безопасности' },
    { icon: 'users', title: 'Удобно', description: 'Интуитивная навигация и UX-дизайн' },
    { icon: 'star', title: 'SEO-оптимизировано', description: 'Оптимизировано для Google с самого начала' },
  ],
}

export const webdesignPackages: Record<ContentLocale, Package[]> = {
  de: [
    {
      name: 'Starter',
      price: '2.000',
      description: 'Perfekt für kleine Unternehmen und Freelancer',
      popular: false,
      features: ['Bis zu 5 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Grundoptimierung', 'SSL-Zertifikat', '1 Jahr Hosting inkl.'],
    },
    {
      name: 'Business',
      price: '5.000',
      description: 'Für wachsende Unternehmen mit mehr Anforderungen',
      popular: true,
      features: ['Bis zu 15 Seiten', 'CMS (Inhalte selbst bearbeiten)', 'Blog-Funktion', 'Erweiterte SEO', 'Google Analytics Setup', 'Newsletter-Integration', 'Social Media Integration', '2 Jahre Support inkl.'],
    },
    {
      name: 'Enterprise',
      price: '10.000+',
      description: 'Maßgeschneiderte Lösungen für große Projekte',
      popular: false,
      features: ['Unbegrenzte Seiten', 'Individuelle Entwicklung', 'E-Commerce Integration', 'Multi-Language Support', 'API-Integrationen', 'Performance Optimierung', 'Dedizierter Projektmanager', 'Premium Support'],
    },
  ],
  en: [
    {
      name: 'Starter',
      price: '2,000',
      description: 'Perfect for small businesses and freelancers',
      popular: false,
      features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO optimization', 'SSL certificate', '1 year hosting incl.'],
    },
    {
      name: 'Business',
      price: '5,000',
      description: 'For growing companies with more requirements',
      popular: true,
      features: ['Up to 15 pages', 'CMS (edit content yourself)', 'Blog function', 'Advanced SEO', 'Google Analytics setup', 'Newsletter integration', 'Social media integration', '2 years support incl.'],
    },
    {
      name: 'Enterprise',
      price: '10,000+',
      description: 'Tailored solutions for large projects',
      popular: false,
      features: ['Unlimited pages', 'Custom development', 'E-commerce integration', 'Multi-language support', 'API integrations', 'Performance optimization', 'Dedicated project manager', 'Premium support'],
    },
  ],
  ru: [
    {
      name: 'Starter',
      price: '2 000',
      description: 'Идеально для малого бизнеса и фрилансеров',
      popular: false,
      features: ['До 5 страниц', 'Адаптивный дизайн', 'Контактная форма', 'Базовая SEO-оптимизация', 'SSL-сертификат', '1 год хостинга вкл.'],
    },
    {
      name: 'Business',
      price: '5 000',
      description: 'Для растущих компаний с расширенными требованиями',
      popular: true,
      features: ['До 15 страниц', 'CMS (редактируйте контент сами)', 'Функция блога', 'Расширенная SEO', 'Настройка Google Analytics', 'Интеграция рассылки', 'Интеграция соцсетей', '2 года поддержки вкл.'],
    },
    {
      name: 'Enterprise',
      price: '10 000+',
      description: 'Индивидуальные решения для крупных проектов',
      popular: false,
      features: ['Неограниченное количество страниц', 'Индивидуальная разработка', 'Интеграция e-commerce', 'Мультиязычная поддержка', 'Интеграции API', 'Оптимизация производительности', 'Выделенный менеджер проекта', 'Премиум-поддержка'],
    },
  ],
}

export const webdesignProcess: Record<ContentLocale, ProcessStep[]> = {
  de: [
    { step: '01', title: 'Erstgespräch', description: 'Kostenlose Beratung zu Ihren Anforderungen und Zielen.' },
    { step: '02', title: 'Konzept & Design', description: 'Wireframes und Design-Entwürfe nach Ihren Wünschen.' },
    { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit modernsten Technologien.' },
    { step: '04', title: 'Testing & Launch', description: 'Gründliche Tests und Go-Live Ihrer neuen Website.' },
    { step: '05', title: 'Support', description: 'Laufende Betreuung und Optimierung nach dem Launch.' },
  ],
  en: [
    { step: '01', title: 'Initial Consultation', description: 'Free consultation on your requirements and goals.' },
    { step: '02', title: 'Concept & Design', description: 'Wireframes and design drafts according to your wishes.' },
    { step: '03', title: 'Development', description: 'Professional implementation with the latest technologies.' },
    { step: '04', title: 'Testing & Launch', description: 'Thorough testing and go-live of your new website.' },
    { step: '05', title: 'Support', description: 'Ongoing support and optimization after launch.' },
  ],
  ru: [
    { step: '01', title: 'Первичная консультация', description: 'Бесплатная консультация по вашим требованиям и целям.' },
    { step: '02', title: 'Концепция и дизайн', description: 'Прототипы и дизайн-макеты по вашим пожеланиям.' },
    { step: '03', title: 'Разработка', description: 'Профессиональная реализация с использованием новейших технологий.' },
    { step: '04', title: 'Тестирование и запуск', description: 'Тщательное тестирование и запуск вашего нового сайта.' },
    { step: '05', title: 'Поддержка', description: 'Постоянная поддержка и оптимизация после запуска.' },
  ],
}

export const webdesignTechnologies = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js']

// ============================================================================
// SEO SHARED DATA
// ============================================================================

export const seoResults: Record<ContentLocale, Result[]> = {
  de: [
    { metric: '+180%', label: 'Mehr organischer Traffic', detail: 'E-Commerce Kunde' },
    { metric: 'Top 3', label: 'Google-Rankings für 15 Keywords', detail: 'B2B Dienstleister' },
    { metric: '+320%', label: 'Mehr Anfragen über Website', detail: 'Lokales Unternehmen' },
  ],
  en: [
    { metric: '+180%', label: 'More organic traffic', detail: 'E-Commerce client' },
    { metric: 'Top 3', label: 'Google rankings for 15 keywords', detail: 'B2B service provider' },
    { metric: '+320%', label: 'More inquiries via website', detail: 'Local business' },
  ],
  ru: [
    { metric: '+180%', label: 'Больше органического трафика', detail: 'Клиент E-Commerce' },
    { metric: 'Топ 3', label: 'Позиции в Google по 15 ключевым словам', detail: 'B2B поставщик услуг' },
    { metric: '+320%', label: 'Больше заявок через сайт', detail: 'Местный бизнес' },
  ],
}

export const seoServices: Record<ContentLocale, Service[]> = {
  de: [
    { icon: 'search', title: 'Technisches SEO', description: 'Core Web Vitals, Seitengeschwindigkeit, Mobile-First, Crawlability und Indexierung optimieren.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword-Recherche, Content-Strategie, Texterstellung und Content-Optimierung.' },
    { icon: 'target', title: 'Local SEO', description: 'Google Business Profile, lokale Keywords, Branchenverzeichnisse und Bewertungen.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink-Aufbau, Digital PR, Linkbuilding-Strategie und Autoritätsaufbau.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Umfassende Analyse Ihrer Website mit konkreten Handlungsempfehlungen.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Laufende Überwachung, Reporting und kontinuierliche Optimierung.' },
  ],
  en: [
    { icon: 'search', title: 'Technical SEO', description: 'Core Web Vitals, page speed, mobile-first, crawlability and indexing optimization.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword research, content strategy, copywriting and content optimization.' },
    { icon: 'target', title: 'Local SEO', description: 'Google Business Profile, local keywords, business directories and reviews.' },
    { icon: 'globe', title: 'OffPage SEO', description: 'Backlink building, digital PR, link building strategy and authority building.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Comprehensive analysis of your website with concrete action recommendations.' },
    { icon: 'trending-up', title: 'SEO Monitoring', description: 'Ongoing monitoring, reporting and continuous optimization.' },
  ],
  ru: [
    { icon: 'search', title: 'Техническое SEO', description: 'Оптимизация Core Web Vitals, скорости загрузки, mobile-first, индексации и краулинга.' },
    { icon: 'file-text', title: 'Контент SEO', description: 'Исследование ключевых слов, контент-стратегия, копирайтинг и оптимизация контента.' },
    { icon: 'target', title: 'Локальное SEO', description: 'Google Business Profile, локальные ключевые слова, бизнес-каталоги и отзывы.' },
    { icon: 'globe', title: 'Внешнее SEO', description: 'Наращивание ссылочной массы, digital PR, стратегия линкбилдинга и повышение авторитета.' },
    { icon: 'bar-chart-3', title: 'SEO-аудит', description: 'Комплексный анализ вашего сайта с конкретными рекомендациями.' },
    { icon: 'trending-up', title: 'SEO-мониторинг', description: 'Постоянный мониторинг, отчетность и непрерывная оптимизация.' },
  ],
}

export const seoPackages: Record<ContentLocale, Package[]> = {
  de: [
    { name: 'SEO Audit', price: '490', priceType: 'einmalig', description: 'Umfassende Analyse Ihrer Website', popular: false, features: ['Technische SEO-Analyse', 'Keyword-Recherche', 'Wettbewerbsanalyse', 'Content-Audit', 'Backlink-Analyse', 'Priorisierte Maßnahmenliste'] },
    { name: 'SEO Starter', price: '790', priceType: 'pro Monat', description: 'Für kleine Websites und lokale Unternehmen', popular: false, features: ['Bis zu 10 Keywords', 'OnPage-Optimierung', 'Local SEO Basics', 'Google Business Profile', 'Monatliches Reporting', '3 Stunden Support/Monat'] },
    { name: 'SEO Business', price: '1.490', priceType: 'pro Monat', description: 'Für wachsende Unternehmen', popular: true, features: ['Bis zu 30 Keywords', 'Vollständige OnPage-Optimierung', 'Content-Erstellung (2 Artikel/Monat)', 'Technisches SEO', 'Link-Building', 'Detailliertes Reporting', '8 Stunden Support/Monat'] },
    { name: 'SEO Enterprise', price: '2.990+', priceType: 'pro Monat', description: 'Für große Websites und E-Commerce', popular: false, features: ['Unbegrenzte Keywords', 'Dedizierter SEO-Manager', 'Content-Strategie & Erstellung', 'Aggressive Link-Building', 'International SEO', 'Conversion-Optimierung', 'Wöchentliche Calls'] },
  ],
  en: [
    { name: 'SEO Audit', price: '490', priceType: 'one-time', description: 'Comprehensive analysis of your website', popular: false, features: ['Technical SEO analysis', 'Keyword research', 'Competitor analysis', 'Content audit', 'Backlink analysis', 'Prioritized action list'] },
    { name: 'SEO Starter', price: '790', priceType: 'per month', description: 'For small websites and local businesses', popular: false, features: ['Up to 10 keywords', 'OnPage optimization', 'Local SEO basics', 'Google Business Profile', 'Monthly reporting', '3 hours support/month'] },
    { name: 'SEO Business', price: '1,490', priceType: 'per month', description: 'For growing companies', popular: true, features: ['Up to 30 keywords', 'Complete OnPage optimization', 'Content creation (2 articles/month)', 'Technical SEO', 'Link building', 'Detailed reporting', '8 hours support/month'] },
    { name: 'SEO Enterprise', price: '2,990+', priceType: 'per month', description: 'For large websites and e-commerce', popular: false, features: ['Unlimited keywords', 'Dedicated SEO manager', 'Content strategy & creation', 'Aggressive link building', 'International SEO', 'Conversion optimization', 'Weekly calls'] },
  ],
  ru: [
    { name: 'SEO-аудит', price: '490', priceType: 'единоразово', description: 'Комплексный анализ вашего сайта', popular: false, features: ['Технический SEO-анализ', 'Исследование ключевых слов', 'Анализ конкурентов', 'Контент-аудит', 'Анализ ссылочного профиля', 'Приоритизированный список мер'] },
    { name: 'SEO Starter', price: '790', priceType: 'в месяц', description: 'Для небольших сайтов и местного бизнеса', popular: false, features: ['До 10 ключевых слов', 'OnPage-оптимизация', 'Основы локального SEO', 'Google Business Profile', 'Ежемесячная отчетность', '3 часа поддержки/месяц'] },
    { name: 'SEO Business', price: '1 490', priceType: 'в месяц', description: 'Для растущих компаний', popular: true, features: ['До 30 ключевых слов', 'Полная OnPage-оптимизация', 'Создание контента (2 статьи/месяц)', 'Техническое SEO', 'Линкбилдинг', 'Детальная отчетность', '8 часов поддержки/месяц'] },
    { name: 'SEO Enterprise', price: '2 990+', priceType: 'в месяц', description: 'Для крупных сайтов и e-commerce', popular: false, features: ['Неограниченное количество ключевых слов', 'Выделенный SEO-менеджер', 'Контент-стратегия и создание', 'Агрессивный линкбилдинг', 'Международное SEO', 'Оптимизация конверсий', 'Еженедельные звонки'] },
  ],
}

export const seoProcess: Record<ContentLocale, ProcessStep[]> = {
  de: [
    { step: '01', title: 'Analyse', description: 'Website-Audit und Ist-Zustand erfassen' },
    { step: '02', title: 'Strategie', description: 'Keywords und Maßnahmen priorisieren' },
    { step: '03', title: 'OnPage', description: 'Technische und inhaltliche Optimierung' },
    { step: '04', title: 'Content', description: 'SEO-optimierte Inhalte erstellen' },
    { step: '05', title: 'Monitoring', description: 'Rankings überwachen und optimieren' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'Website audit and current state assessment' },
    { step: '02', title: 'Strategy', description: 'Prioritize keywords and measures' },
    { step: '03', title: 'OnPage', description: 'Technical and content optimization' },
    { step: '04', title: 'Content', description: 'Create SEO-optimized content' },
    { step: '05', title: 'Monitoring', description: 'Monitor and optimize rankings' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'Аудит сайта и оценка текущего состояния' },
    { step: '02', title: 'Стратегия', description: 'Приоритизация ключевых слов и мер' },
    { step: '03', title: 'OnPage', description: 'Техническая и контентная оптимизация' },
    { step: '04', title: 'Контент', description: 'Создание SEO-оптимизированного контента' },
    { step: '05', title: 'Мониторинг', description: 'Отслеживание и оптимизация позиций' },
  ],
}

// ============================================================================
// CITY CONFIGURATIONS
// ============================================================================

export interface CityConfig {
  slug: string
  cityName: Record<ContentLocale, string>
  regionName?: Record<ContentLocale, string>
  country: 'AT' | 'DE' | 'CH' | 'AE'
}

export const austrianCities: CityConfig[] = [
  { slug: 'wien', cityName: { de: 'Wien', en: 'Vienna', ru: 'Вена' }, country: 'AT' },
  { slug: 'graz', cityName: { de: 'Graz', en: 'Graz', ru: 'Грац' }, regionName: { de: 'Steiermark', en: 'Styria', ru: 'Штирия' }, country: 'AT' },
  { slug: 'linz', cityName: { de: 'Linz', en: 'Linz', ru: 'Линц' }, regionName: { de: 'Oberösterreich', en: 'Upper Austria', ru: 'Верхняя Австрия' }, country: 'AT' },
  { slug: 'salzburg', cityName: { de: 'Salzburg', en: 'Salzburg', ru: 'Зальцбург' }, country: 'AT' },
  { slug: 'innsbruck', cityName: { de: 'Innsbruck', en: 'Innsbruck', ru: 'Инсбрук' }, regionName: { de: 'Tirol', en: 'Tyrol', ru: 'Тироль' }, country: 'AT' },
  { slug: 'oesterreich', cityName: { de: 'Österreich', en: 'Austria', ru: 'Австрия' }, country: 'AT' },
]

export const germanCities: CityConfig[] = [
  { slug: 'deutschland', cityName: { de: 'Deutschland', en: 'Germany', ru: 'Германия' }, country: 'DE' },
  { slug: 'berlin', cityName: { de: 'Berlin', en: 'Berlin', ru: 'Берлин' }, country: 'DE' },
  { slug: 'hamburg', cityName: { de: 'Hamburg', en: 'Hamburg', ru: 'Гамбург' }, country: 'DE' },
  { slug: 'muenchen', cityName: { de: 'München', en: 'Munich', ru: 'Мюнхен' }, country: 'DE' },
  { slug: 'frankfurt', cityName: { de: 'Frankfurt', en: 'Frankfurt', ru: 'Франкфурт' }, country: 'DE' },
]

export const swissCities: CityConfig[] = [
  { slug: 'schweiz', cityName: { de: 'Schweiz', en: 'Switzerland', ru: 'Швейцария' }, country: 'CH' },
  { slug: 'zuerich', cityName: { de: 'Zürich', en: 'Zurich', ru: 'Цюрих' }, country: 'CH' },
]

export const uaeCities: CityConfig[] = [
  { slug: 'dubai', cityName: { de: 'Dubai', en: 'Dubai', ru: 'Дубай' }, country: 'AE' },
  { slug: 'vae', cityName: { de: 'VAE', en: 'UAE', ru: 'ОАЭ' }, country: 'AE' },
  { slug: 'abu-dhabi', cityName: { de: 'Abu Dhabi', en: 'Abu Dhabi', ru: 'Абу-Даби' }, country: 'AE' },
]

// ============================================================================
// LOCAL BUSINESS CONFIGURATIONS
// ============================================================================

export const localBusinessVienna: LocalBusinessInfo = {
  name: 'GoldenWing Creative Studios',
  address: 'Czeikestrasse 4/21',
  city: 'Wien',
  postalCode: '1100',
  country: 'AT',
  phone: '+43-664-543-96-81',
  latitude: 48.1765,
  longitude: 16.3853,
}

export const localBusinessDubai: LocalBusinessInfo = {
  name: 'GoldenWing Creative Studios Dubai',
  address: 'DAMAC Executive Bay Tower B, Office 1406, 14th Floor, Business Bay',
  city: 'Dubai',
  country: 'AE',
  phone: '+971 58 514 4360',
  latitude: 25.1783747,
  longitude: 55.2615882,
}

// ============================================================================
// CITY-SPECIFIC WEBDESIGN META DATA
// ============================================================================

interface CityMetaData {
  metaTitle: Record<ContentLocale, string>
  metaDescription: Record<ContentLocale, string>
  keywords: Record<ContentLocale, string[]>
  heroTitle: Record<ContentLocale, string>
  heroDescription: Record<ContentLocale, string>
}

export const webdesignCityMeta: Record<string, CityMetaData> = {
  wien: {
    metaTitle: {
      de: 'Webdesign Wien | Professionelle Websites & SEO-Optimierung',
      en: 'Web Design Vienna | Professional Websites & SEO Optimization',
      ru: 'Веб-дизайн Вена | Профессиональные сайты и SEO-оптимизация',
    },
    metaDescription: {
      de: 'Webdesign Agentur in Wien. Moderne, schnelle und SEO-optimierte Websites für österreichische Unternehmen. Von Startups bis Enterprise – Ihre digitale Visitenkarte.',
      en: 'Web design agency in Vienna. Modern, fast and SEO-optimized websites for Austrian businesses. From startups to enterprise – your digital business card.',
      ru: 'Агентство веб-дизайна в Вене. Современные, быстрые и SEO-оптимизированные сайты для австрийских компаний. От стартапов до корпораций – ваша цифровая визитная карточка.',
    },
    keywords: {
      de: ['Webdesign Wien', 'Website erstellen Wien', 'Webdesigner Wien', 'Web Design Agentur Wien'],
      en: ['Web Design Vienna', 'Website Development Vienna', 'Web Designer Vienna', 'Web Design Agency Vienna'],
      ru: ['Веб-дизайн Вена', 'Создание сайта Вена', 'Веб-дизайнер Вена', 'Агентство веб-дизайна Вена'],
    },
    heroTitle: {
      de: 'Webdesign Wien – Moderne Websites für Ihr Business',
      en: 'Web Design Vienna – Modern Websites for Your Business',
      ru: 'Веб-дизайн Вена – Современные сайты для вашего бизнеса',
    },
    heroDescription: {
      de: 'Als Webdesign Agentur in Wien entwickeln wir performante Websites für österreichische Unternehmen. Von der Konzeption bis zum Launch – alles aus einer Hand.',
      en: 'As a web design agency in Vienna, we develop high-performance websites for Austrian businesses. From concept to launch – everything from one source.',
      ru: 'Как агентство веб-дизайна в Вене, мы разрабатываем высокопроизводительные сайты для австрийских компаний. От концепции до запуска – все из одних рук.',
    },
  },
  graz: {
    metaTitle: {
      de: 'Webdesign Graz | Professionelle Websites aus der Steiermark',
      en: 'Web Design Graz | Professional Websites from Styria',
      ru: 'Веб-дизайн Грац | Профессиональные сайты из Штирии',
    },
    metaDescription: {
      de: 'Webdesign Agentur in Graz. Moderne, schnelle und SEO-optimierte Websites für steirische Unternehmen. Von Automotive bis Tech-Startups – Ihre digitale Visitenkarte.',
      en: 'Web design agency in Graz. Modern, fast and SEO-optimized websites for Styrian businesses. From automotive to tech startups – your digital business card.',
      ru: 'Агентство веб-дизайна в Граце. Современные, быстрые и SEO-оптимизированные сайты для штирийских компаний. От автопрома до tech-стартапов – ваша цифровая визитная карточка.',
    },
    keywords: {
      de: ['Webdesign Graz', 'Website erstellen Graz', 'Webdesigner Graz', 'Web Design Agentur Graz', 'Webentwicklung Steiermark'],
      en: ['Web Design Graz', 'Website Development Graz', 'Web Designer Graz', 'Web Design Agency Graz', 'Web Development Styria'],
      ru: ['Веб-дизайн Грац', 'Создание сайта Грац', 'Веб-дизайнер Грац', 'Агентство веб-дизайна Грац', 'Веб-разработка Штирия'],
    },
    heroTitle: {
      de: 'Webdesign Graz – Moderne Websites für steirische Unternehmen',
      en: 'Web Design Graz – Modern Websites for Styrian Businesses',
      ru: 'Веб-дизайн Грац – Современные сайты для штирийских компаний',
    },
    heroDescription: {
      de: 'Als Webdesign Agentur mit Fokus auf die Steiermark entwickeln wir performante Websites für Grazer Unternehmen. Von der Automotive-Branche bis zu Tech-Startups – wir verstehen den steirischen Markt.',
      en: 'As a web design agency focusing on Styria, we develop high-performance websites for Graz businesses. From automotive to tech startups – we understand the Styrian market.',
      ru: 'Как агентство веб-дизайна с фокусом на Штирию, мы разрабатываем высокопроизводительные сайты для компаний Граца. От автопрома до tech-стартапов – мы понимаем штирийский рынок.',
    },
  },
  linz: {
    metaTitle: {
      de: 'Webdesign Linz | Professionelle Websites aus Oberösterreich',
      en: 'Web Design Linz | Professional Websites from Upper Austria',
      ru: 'Веб-дизайн Линц | Профессиональные сайты из Верхней Австрии',
    },
    metaDescription: {
      de: 'Webdesign Agentur für Linz und Oberösterreich. Moderne, schnelle und SEO-optimierte Websites. Von Industrie bis Startups – Ihre digitale Präsenz.',
      en: 'Web design agency for Linz and Upper Austria. Modern, fast and SEO-optimized websites. From industry to startups – your digital presence.',
      ru: 'Агентство веб-дизайна для Линца и Верхней Австрии. Современные, быстрые и SEO-оптимизированные сайты. От промышленности до стартапов – ваше цифровое присутствие.',
    },
    keywords: {
      de: ['Webdesign Linz', 'Website erstellen Linz', 'Webdesigner Linz', 'Web Design Agentur Linz', 'Webentwicklung Oberösterreich'],
      en: ['Web Design Linz', 'Website Development Linz', 'Web Designer Linz', 'Web Design Agency Linz'],
      ru: ['Веб-дизайн Линц', 'Создание сайта Линц', 'Веб-дизайнер Линц', 'Агентство веб-дизайна Линц', 'Веб-разработка Верхняя Австрия'],
    },
    heroTitle: {
      de: 'Webdesign Linz – Professionelle Websites für Oberösterreich',
      en: 'Web Design Linz – Professional Websites for Upper Austria',
      ru: 'Веб-дизайн Линц – Профессиональные сайты для Верхней Австрии',
    },
    heroDescription: {
      de: 'Webdesign Agentur für Linz und die Region. Wir entwickeln performante Websites für Unternehmen in Oberösterreich. Industrie, Handel, Dienstleistung – branchenübergreifend stark.',
      en: 'Web design agency for Linz and the region. We develop high-performance websites for businesses in Upper Austria. Industry, trade, services – strong across all sectors.',
      ru: 'Агентство веб-дизайна для Линца и региона. Мы разрабатываем высокопроизводительные сайты для компаний Верхней Австрии. Промышленность, торговля, услуги – сильны во всех отраслях.',
    },
  },
  salzburg: {
    metaTitle: {
      de: 'Webdesign Salzburg | Professionelle Websites für die Festspielstadt',
      en: 'Web Design Salzburg | Professional Websites for the Festival City',
      ru: 'Веб-дизайн Зальцбург | Профессиональные сайты для города фестивалей',
    },
    metaDescription: {
      de: 'Webdesign Agentur in Salzburg. Moderne, schnelle und SEO-optimierte Websites für Salzburger Unternehmen. Tourismus, Kultur, Business – Ihre digitale Präsenz.',
      en: 'Web design agency in Salzburg. Modern, fast and SEO-optimized websites for Salzburg businesses. Tourism, culture, business – your digital presence.',
      ru: 'Агентство веб-дизайна в Зальцбурге. Современные, быстрые и SEO-оптимизированные сайты для зальцбургских компаний. Туризм, культура, бизнес – ваше цифровое присутствие.',
    },
    keywords: {
      de: ['Webdesign Salzburg', 'Website erstellen Salzburg', 'Webdesigner Salzburg', 'Web Design Agentur Salzburg'],
      en: ['Web Design Salzburg', 'Website Development Salzburg', 'Web Designer Salzburg', 'Web Design Agency Salzburg'],
      ru: ['Веб-дизайн Зальцбург', 'Создание сайта Зальцбург', 'Веб-дизайнер Зальцбург', 'Агентство веб-дизайна Зальцбург'],
    },
    heroTitle: {
      de: 'Webdesign Salzburg – Moderne Websites für die Festspielstadt',
      en: 'Web Design Salzburg – Modern Websites for the Festival City',
      ru: 'Веб-дизайн Зальцбург – Современные сайты для города фестивалей',
    },
    heroDescription: {
      de: 'Webdesign Agentur für Salzburg und die Region. Wir entwickeln Websites für Tourismus, Kultur und lokale Unternehmen. Premium-Design für die Mozartstadt.',
      en: 'Web design agency for Salzburg and the region. We develop websites for tourism, culture and local businesses. Premium design for the Mozart city.',
      ru: 'Агентство веб-дизайна для Зальцбурга и региона. Мы разрабатываем сайты для туризма, культуры и местных компаний. Премиум-дизайн для города Моцарта.',
    },
  },
  innsbruck: {
    metaTitle: {
      de: 'Webdesign Innsbruck | Professionelle Websites aus Tirol',
      en: 'Web Design Innsbruck | Professional Websites from Tyrol',
      ru: 'Веб-дизайн Инсбрук | Профессиональные сайты из Тироля',
    },
    metaDescription: {
      de: 'Webdesign Agentur für Innsbruck und Tirol. Moderne, schnelle und SEO-optimierte Websites. Tourismus, Wintersport, Handel – Ihre digitale Visitenkarte.',
      en: 'Web design agency for Innsbruck and Tyrol. Modern, fast and SEO-optimized websites. Tourism, winter sports, retail – your digital business card.',
      ru: 'Агентство веб-дизайна для Инсбрука и Тироля. Современные, быстрые и SEO-оптимизированные сайты. Туризм, зимний спорт, торговля – ваша цифровая визитная карточка.',
    },
    keywords: {
      de: ['Webdesign Innsbruck', 'Website erstellen Innsbruck', 'Webdesigner Innsbruck', 'Web Design Agentur Tirol'],
      en: ['Web Design Innsbruck', 'Website Development Innsbruck', 'Web Designer Innsbruck', 'Web Design Agency Tyrol'],
      ru: ['Веб-дизайн Инсбрук', 'Создание сайта Инсбрук', 'Веб-дизайнер Инсбрук', 'Агентство веб-дизайна Тироль'],
    },
    heroTitle: {
      de: 'Webdesign Innsbruck – Moderne Websites aus den Alpen',
      en: 'Web Design Innsbruck – Modern Websites from the Alps',
      ru: 'Веб-дизайн Инсбрук – Современные сайты из Альп',
    },
    heroDescription: {
      de: 'Webdesign Agentur für Innsbruck und ganz Tirol. Wir entwickeln Websites für Tourismus, Wintersport und lokale Unternehmen. Alpine Qualität, digitale Exzellenz.',
      en: 'Web design agency for Innsbruck and all of Tyrol. We develop websites for tourism, winter sports and local businesses. Alpine quality, digital excellence.',
      ru: 'Агентство веб-дизайна для Инсбрука и всего Тироля. Мы разрабатываем сайты для туризма, зимнего спорта и местных компаний. Альпийское качество, цифровое совершенство.',
    },
  },
  oesterreich: {
    metaTitle: {
      de: 'Webdesign Österreich | Websites für Unternehmen',
      en: 'Web Design Austria | Professional Websites',
      ru: 'Веб-дизайн Австрия | Профессиональные сайты',
    },
    metaDescription: {
      de: 'Webdesign Agentur für ganz Österreich. Moderne, schnelle und SEO-optimierte Websites. Von Wien bis Bregenz – Ihr Partner für digitale Präsenz.',
      en: 'Web design agency for all of Austria. Modern, fast and SEO-optimized websites. From Vienna to Bregenz – your partner for digital presence.',
      ru: 'Агентство веб-дизайна для всей Австрии. Современные, быстрые и SEO-оптимизированные сайты. От Вены до Брегенца – ваш партнер в цифровом присутствии.',
    },
    keywords: {
      de: ['Webdesign Österreich', 'Website erstellen Österreich', 'Webdesigner Österreich', 'Web Design Agentur Österreich'],
      en: ['Web Design Austria', 'Website Development Austria', 'Web Designer Austria', 'Web Design Agency Austria'],
      ru: ['Веб-дизайн Австрия', 'Создание сайта Австрия', 'Веб-дизайнер Австрия', 'Агентство веб-дизайна Австрия'],
    },
    heroTitle: {
      de: 'Webdesign Österreich – Professionelle Websites landesweit',
      en: 'Web Design Austria – Professional Websites Nationwide',
      ru: 'Веб-дизайн Австрия – Профессиональные сайты по всей стране',
    },
    heroDescription: {
      de: 'Webdesign Agentur für ganz Österreich. Von Wien über Graz bis Innsbruck – wir entwickeln performante Websites für österreichische Unternehmen aller Branchen.',
      en: 'Web design agency for all of Austria. From Vienna to Graz to Innsbruck – we develop high-performance websites for Austrian businesses across all industries.',
      ru: 'Агентство веб-дизайна для всей Австрии. От Вены через Грац до Инсбрука – мы разрабатываем высокопроизводительные сайты для австрийских компаний всех отраслей.',
    },
  },
  deutschland: {
    metaTitle: {
      de: 'Webdesign Deutschland | Professionelle Websites für deutsche Unternehmen',
      en: 'Web Design Germany | Professional Websites for German Businesses',
      ru: 'Веб-дизайн Германия | Профессиональные сайты для немецких компаний',
    },
    metaDescription: {
      de: 'Webdesign Agentur für Deutschland. Moderne, schnelle und SEO-optimierte Websites. Österreichische Qualität für den deutschen Markt.',
      en: 'Web design agency for Germany. Modern, fast and SEO-optimized websites. Austrian quality for the German market.',
      ru: 'Агентство веб-дизайна для Германии. Современные, быстрые и SEO-оптимизированные сайты. Австрийское качество для немецкого рынка.',
    },
    keywords: {
      de: ['Webdesign Deutschland', 'Website erstellen Deutschland', 'Webdesigner Deutschland', 'Web Design Agentur Deutschland'],
      en: ['Web Design Germany', 'Website Development Germany', 'Web Designer Germany', 'Web Design Agency Germany'],
      ru: ['Веб-дизайн Германия', 'Создание сайта Германия', 'Веб-дизайнер Германия', 'Агентство веб-дизайна Германия'],
    },
    heroTitle: {
      de: 'Webdesign Deutschland – Österreichische Qualität für den deutschen Markt',
      en: 'Web Design Germany – Austrian Quality for the German Market',
      ru: 'Веб-дизайн Германия – Австрийское качество для немецкого рынка',
    },
    heroDescription: {
      de: 'Webdesign Agentur mit Fokus auf Deutschland. Wir entwickeln performante Websites für deutsche Unternehmen. Qualität aus Wien für den DACH-Raum.',
      en: 'Web design agency focusing on Germany. We develop high-performance websites for German businesses. Quality from Vienna for the DACH region.',
      ru: 'Агентство веб-дизайна с фокусом на Германию. Мы разрабатываем высокопроизводительные сайты для немецких компаний. Качество из Вены для региона DACH.',
    },
  },
  berlin: {
    metaTitle: {
      de: 'Webdesign Berlin | Moderne Websites für die Hauptstadt',
      en: 'Web Design Berlin | Modern Websites for the Capital',
      ru: 'Веб-дизайн Берлин | Современные сайты для столицы',
    },
    metaDescription: {
      de: 'Webdesign Agentur für Berlin. Moderne, schnelle und SEO-optimierte Websites. Startups, Tech, Kreativbranche – Ihre digitale Präsenz in der Hauptstadt.',
      en: 'Web design agency for Berlin. Modern, fast and SEO-optimized websites. Startups, tech, creative industry – your digital presence in the capital.',
      ru: 'Агентство веб-дизайна для Берлина. Современные, быстрые и SEO-оптимизированные сайты. Стартапы, tech, креативная индустрия – ваше цифровое присутствие в столице.',
    },
    keywords: {
      de: ['Webdesign Berlin', 'Website erstellen Berlin', 'Webdesigner Berlin', 'Web Design Agentur Berlin'],
      en: ['Web Design Berlin', 'Website Development Berlin', 'Web Designer Berlin', 'Web Design Agency Berlin'],
      ru: ['Веб-дизайн Берлин', 'Создание сайта Берлин', 'Веб-дизайнер Берлин', 'Агентство веб-дизайна Берлин'],
    },
    heroTitle: {
      de: 'Webdesign Berlin – Moderne Websites für Startups und Unternehmen',
      en: 'Web Design Berlin – Modern Websites for Startups and Businesses',
      ru: 'Веб-дизайн Берлин – Современные сайты для стартапов и компаний',
    },
    heroDescription: {
      de: 'Webdesign Agentur für Berlin und Brandenburg. Wir entwickeln Websites für die Startup-Szene, Tech-Unternehmen und die Kreativbranche. Innovation trifft Design.',
      en: 'Web design agency for Berlin and Brandenburg. We develop websites for the startup scene, tech companies and the creative industry. Innovation meets design.',
      ru: 'Агентство веб-дизайна для Берлина и Бранденбурга. Мы разрабатываем сайты для стартап-сцены, tech-компаний и креативной индустрии. Инновации встречают дизайн.',
    },
  },
  hamburg: {
    metaTitle: {
      de: 'Webdesign Hamburg | Professionelle Websites für die Hansestadt',
      en: 'Web Design Hamburg | Professional Websites for the Hanseatic City',
      ru: 'Веб-дизайн Гамбург | Профессиональные сайты для ганзейского города',
    },
    metaDescription: {
      de: 'Webdesign Agentur für Hamburg. Moderne, schnelle und SEO-optimierte Websites. Maritime Wirtschaft, Medien, Handel – Ihre digitale Visitenkarte.',
      en: 'Web design agency for Hamburg. Modern, fast and SEO-optimized websites. Maritime economy, media, trade – your digital business card.',
      ru: 'Агентство веб-дизайна для Гамбурга. Современные, быстрые и SEO-оптимизированные сайты. Морская экономика, медиа, торговля – ваша цифровая визитная карточка.',
    },
    keywords: {
      de: ['Webdesign Hamburg', 'Website erstellen Hamburg', 'Webdesigner Hamburg', 'Web Design Agentur Hamburg'],
      en: ['Web Design Hamburg', 'Website Development Hamburg', 'Web Designer Hamburg', 'Web Design Agency Hamburg'],
      ru: ['Веб-дизайн Гамбург', 'Создание сайта Гамбург', 'Веб-дизайнер Гамбург', 'Агентство веб-дизайна Гамбург'],
    },
    heroTitle: {
      de: 'Webdesign Hamburg – Professionelle Websites für die Hansestadt',
      en: 'Web Design Hamburg – Professional Websites for the Hanseatic City',
      ru: 'Веб-дизайн Гамбург – Профессиональные сайты для ганзейского города',
    },
    heroDescription: {
      de: 'Webdesign Agentur für Hamburg und Norddeutschland. Wir entwickeln Websites für Handel, Logistik und die Medienbranche. Hanseatische Qualität, digitale Exzellenz.',
      en: 'Web design agency for Hamburg and Northern Germany. We develop websites for trade, logistics and the media industry. Hanseatic quality, digital excellence.',
      ru: 'Агентство веб-дизайна для Гамбурга и Северной Германии. Мы разрабатываем сайты для торговли, логистики и медиаиндустрии. Ганзейское качество, цифровое совершенство.',
    },
  },
  muenchen: {
    metaTitle: {
      de: 'Webdesign München | Professionelle Websites für Bayern',
      en: 'Web Design Munich | Professional Websites for Bavaria',
      ru: 'Веб-дизайн Мюнхен | Профессиональные сайты для Баварии',
    },
    metaDescription: {
      de: 'Webdesign Agentur für München. Moderne, schnelle und SEO-optimierte Websites. Automotive, Tech, Mittelstand – Ihre digitale Visitenkarte.',
      en: 'Web design agency for Munich. Modern, fast and SEO-optimized websites. Automotive, tech, SMEs – your digital business card.',
      ru: 'Агентство веб-дизайна для Мюнхена. Современные, быстрые и SEO-оптимизированные сайты. Автопром, tech, средний бизнес – ваша цифровая визитная карточка.',
    },
    keywords: {
      de: ['Webdesign München', 'Website erstellen München', 'Webdesigner München', 'Web Design Agentur München'],
      en: ['Web Design Munich', 'Website Development Munich', 'Web Designer Munich', 'Web Design Agency Munich'],
      ru: ['Веб-дизайн Мюнхен', 'Создание сайта Мюнхен', 'Веб-дизайнер Мюнхен', 'Агентство веб-дизайна Мюнхен'],
    },
    heroTitle: {
      de: 'Webdesign München – Premium-Websites für bayerische Unternehmen',
      en: 'Web Design Munich – Premium Websites for Bavarian Businesses',
      ru: 'Веб-дизайн Мюнхен – Премиум-сайты для баварских компаний',
    },
    heroDescription: {
      de: 'Webdesign Agentur für München und Bayern. Wir entwickeln Websites für die Automotive-Branche, Tech-Unternehmen und den Mittelstand. Bayerische Präzision, digitale Innovation.',
      en: 'Web design agency for Munich and Bavaria. We develop websites for the automotive industry, tech companies and SMEs. Bavarian precision, digital innovation.',
      ru: 'Агентство веб-дизайна для Мюнхена и Баварии. Мы разрабатываем сайты для автомобильной индустрии, tech-компаний и среднего бизнеса. Баварская точность, цифровые инновации.',
    },
  },
  frankfurt: {
    metaTitle: {
      de: 'Webdesign Frankfurt | Professionelle Websites für die Finanzmetropole',
      en: 'Web Design Frankfurt | Professional Websites for the Financial Hub',
      ru: 'Веб-дизайн Франкфурт | Профессиональные сайты для финансовой столицы',
    },
    metaDescription: {
      de: 'Webdesign Agentur für Frankfurt. Moderne, schnelle und SEO-optimierte Websites. Finanzbranche, Consulting, Logistik – Ihre digitale Präsenz.',
      en: 'Web design agency for Frankfurt. Modern, fast and SEO-optimized websites. Finance, consulting, logistics – your digital presence.',
      ru: 'Агентство веб-дизайна для Франкфурта. Современные, быстрые и SEO-оптимизированные сайты. Финансы, консалтинг, логистика – ваше цифровое присутствие.',
    },
    keywords: {
      de: ['Webdesign Frankfurt', 'Website erstellen Frankfurt', 'Webdesigner Frankfurt', 'Web Design Agentur Frankfurt'],
      en: ['Web Design Frankfurt', 'Website Development Frankfurt', 'Web Designer Frankfurt', 'Web Design Agency Frankfurt'],
      ru: ['Веб-дизайн Франкфурт', 'Создание сайта Франкфурт', 'Веб-дизайнер Франкфурт', 'Агентство веб-дизайна Франкфурт'],
    },
    heroTitle: {
      de: 'Webdesign Frankfurt – Professionelle Websites für die Finanzmetropole',
      en: 'Web Design Frankfurt – Professional Websites for the Financial Hub',
      ru: 'Веб-дизайн Франкфурт – Профессиональные сайты для финансовой столицы',
    },
    heroDescription: {
      de: 'Webdesign Agentur für Frankfurt am Main. Wir entwickeln Websites für die Finanzbranche, Consulting und Logistik. Business-Class-Design für die Mainmetropole.',
      en: 'Web design agency for Frankfurt am Main. We develop websites for finance, consulting and logistics. Business-class design for the Main metropolis.',
      ru: 'Агентство веб-дизайна для Франкфурта-на-Майне. Мы разрабатываем сайты для финансовой отрасли, консалтинга и логистики. Дизайн бизнес-класса для метрополии на Майне.',
    },
  },
  schweiz: {
    metaTitle: {
      de: 'Webdesign Schweiz | Professionelle Websites für Schweizer Unternehmen',
      en: 'Web Design Switzerland | Professional Websites for Swiss Businesses',
      ru: 'Веб-дизайн Швейцария | Профессиональные сайты для швейцарских компаний',
    },
    metaDescription: {
      de: 'Webdesign Agentur für die Schweiz. Moderne, schnelle und SEO-optimierte Websites. Qualität aus Österreich für den Schweizer Markt.',
      en: 'Web design agency for Switzerland. Modern, fast and SEO-optimized websites. Austrian quality for the Swiss market.',
      ru: 'Агентство веб-дизайна для Швейцарии. Современные, быстрые и SEO-оптимизированные сайты. Австрийское качество для швейцарского рынка.',
    },
    keywords: {
      de: ['Webdesign Schweiz', 'Website erstellen Schweiz', 'Webdesigner Schweiz', 'Web Design Agentur Schweiz'],
      en: ['Web Design Switzerland', 'Website Development Switzerland', 'Web Designer Switzerland', 'Web Design Agency Switzerland'],
      ru: ['Веб-дизайн Швейцария', 'Создание сайта Швейцария', 'Веб-дизайнер Швейцария', 'Агентство веб-дизайна Швейцария'],
    },
    heroTitle: {
      de: 'Webdesign Schweiz – Präzision trifft Innovation',
      en: 'Web Design Switzerland – Precision Meets Innovation',
      ru: 'Веб-дизайн Швейцария – Точность встречает инновации',
    },
    heroDescription: {
      de: 'Webdesign Agentur für die Schweiz. Wir entwickeln performante Websites für Schweizer Unternehmen. Österreichische Qualität für den anspruchsvollen Schweizer Markt.',
      en: 'Web design agency for Switzerland. We develop high-performance websites for Swiss businesses. Austrian quality for the demanding Swiss market.',
      ru: 'Агентство веб-дизайна для Швейцарии. Мы разрабатываем высокопроизводительные сайты для швейцарских компаний. Австрийское качество для требовательного швейцарского рынка.',
    },
  },
  zuerich: {
    metaTitle: {
      de: 'Webdesign Zürich | Professionelle Websites für die Finanzmetropole',
      en: 'Web Design Zurich | Professional Websites for the Financial Metropolis',
      ru: 'Веб-дизайн Цюрих | Профессиональные сайты для финансовой метрополии',
    },
    metaDescription: {
      de: 'Webdesign Agentur für Zürich. Moderne, schnelle und SEO-optimierte Websites. Finanzbranche, Tech, Luxus – Ihre digitale Visitenkarte.',
      en: 'Web design agency for Zurich. Modern, fast and SEO-optimized websites. Finance, tech, luxury – your digital business card.',
      ru: 'Агентство веб-дизайна для Цюриха. Современные, быстрые и SEO-оптимизированные сайты. Финансы, tech, люкс – ваша цифровая визитная карточка.',
    },
    keywords: {
      de: ['Webdesign Zürich', 'Website erstellen Zürich', 'Webdesigner Zürich', 'Web Design Agentur Zürich'],
      en: ['Web Design Zurich', 'Website Development Zurich', 'Web Designer Zurich', 'Web Design Agency Zurich'],
      ru: ['Веб-дизайн Цюрих', 'Создание сайта Цюрих', 'Веб-дизайнер Цюрих', 'Агентство веб-дизайна Цюрих'],
    },
    heroTitle: {
      de: 'Webdesign Zürich – Premium-Websites für die Limmatstadt',
      en: 'Web Design Zurich – Premium Websites for the Limmat City',
      ru: 'Веб-дизайн Цюрих – Премиум-сайты для города на Лиммате',
    },
    heroDescription: {
      de: 'Webdesign Agentur für Zürich und die Deutschschweiz. Wir entwickeln Websites für Finanzdienstleister, Tech-Unternehmen und Luxusmarken. Schweizer Qualität, internationale Standards.',
      en: 'Web design agency for Zurich and German-speaking Switzerland. We develop websites for financial services, tech companies and luxury brands. Swiss quality, international standards.',
      ru: 'Агентство веб-дизайна для Цюриха и немецкоязычной Швейцарии. Мы разрабатываем сайты для финансовых услуг, tech-компаний и люксовых брендов. Швейцарское качество, международные стандарты.',
    },
  },
  dubai: {
    metaTitle: {
      de: 'Webdesign Dubai | Professionelle Websites für die VAE',
      en: 'Web Design Dubai | Professional Websites for the UAE',
      ru: 'Веб-дизайн Дубай | Профессиональные сайты для ОАЭ',
    },
    metaDescription: {
      de: 'Webdesign Agentur in Dubai. Moderne, schnelle und SEO-optimierte Websites für Unternehmen in den VAE. Europäische Qualität im Mittleren Osten.',
      en: 'Web design agency in Dubai. Modern, fast and SEO-optimized websites for businesses in the UAE. European quality in the Middle East.',
      ru: 'Агентство веб-дизайна в Дубае. Современные, быстрые и SEO-оптимизированные сайты для компаний в ОАЭ. Европейское качество на Ближнем Востоке.',
    },
    keywords: {
      de: ['Webdesign Dubai', 'Website erstellen Dubai', 'Webdesigner Dubai', 'Web Design Agentur Dubai'],
      en: ['Web Design Dubai', 'Website Development Dubai', 'Web Designer Dubai', 'Web Design Agency Dubai'],
      ru: ['Веб-дизайн Дубай', 'Создание сайта Дубай', 'Веб-дизайнер Дубай', 'Агентство веб-дизайна Дубай'],
    },
    heroTitle: {
      de: 'Webdesign Dubai – Europäische Qualität im Herzen der VAE',
      en: 'Web Design Dubai – European Quality in the Heart of the UAE',
      ru: 'Веб-дизайн Дубай – Европейское качество в сердце ОАЭ',
    },
    heroDescription: {
      de: 'Webdesign Agentur mit Büro in Dubai. Wir entwickeln performante Websites für internationale Unternehmen in den VAE. Premium-Design, lokale Präsenz.',
      en: 'Web design agency with office in Dubai. We develop high-performance websites for international businesses in the UAE. Premium design, local presence.',
      ru: 'Агентство веб-дизайна с офисом в Дубае. Мы разрабатываем высокопроизводительные сайты для международных компаний в ОАЭ. Премиум-дизайн, локальное присутствие.',
    },
  },
  vae: {
    metaTitle: {
      de: 'Webdesign VAE | Professionelle Websites für die Emirate',
      en: 'Web Design UAE | Professional Websites for the Emirates',
      ru: 'Веб-дизайн ОАЭ | Профессиональные сайты для Эмиратов',
    },
    metaDescription: {
      de: 'Webdesign Agentur für die VAE. Moderne, schnelle und SEO-optimierte Websites. Dubai, Abu Dhabi, Sharjah – Ihre digitale Präsenz in den Emiraten.',
      en: 'Web design agency for the UAE. Modern, fast and SEO-optimized websites. Dubai, Abu Dhabi, Sharjah – your digital presence in the Emirates.',
      ru: 'Агентство веб-дизайна для ОАЭ. Современные, быстрые и SEO-оптимизированные сайты. Дубай, Абу-Даби, Шарджа – ваше цифровое присутствие в Эмиратах.',
    },
    keywords: {
      de: ['Webdesign VAE', 'Website erstellen VAE', 'Webdesigner VAE', 'Web Design Agentur VAE'],
      en: ['Web Design UAE', 'Website Development UAE', 'Web Designer UAE', 'Web Design Agency UAE'],
      ru: ['Веб-дизайн ОАЭ', 'Создание сайта ОАЭ', 'Веб-дизайнер ОАЭ', 'Агентство веб-дизайна ОАЭ'],
    },
    heroTitle: {
      de: 'Webdesign VAE – Premium-Websites für die Emirate',
      en: 'Web Design UAE – Premium Websites for the Emirates',
      ru: 'Веб-дизайн ОАЭ – Премиум-сайты для Эмиратов',
    },
    heroDescription: {
      de: 'Webdesign Agentur für alle Emirate. Von Dubai über Abu Dhabi bis Sharjah – wir entwickeln Websites für internationale Unternehmen in den VAE.',
      en: 'Web design agency for all Emirates. From Dubai to Abu Dhabi to Sharjah – we develop websites for international businesses in the UAE.',
      ru: 'Агентство веб-дизайна для всех Эмиратов. От Дубая через Абу-Даби до Шарджи – мы разрабатываем сайты для международных компаний в ОАЭ.',
    },
  },
}

// ============================================================================
// WEBDESIGN CITY-SPECIFIC FAQ
// ============================================================================

export function getWebdesignFaqs(citySlug: string, inputLocale: Locale): FAQ[] {
  const locale = getContentLocale(inputLocale)
  const cityConfig = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities].find(c => c.slug === citySlug)
  const cityName = cityConfig?.cityName[locale] || citySlug

  const baseFaqs: Record<ContentLocale, FAQ[]> = {
    de: [
      { question: `Was kostet Webdesign in ${cityName}?`, answer: `Professionelles Webdesign in ${cityName} beginnt bei uns ab €2.000 für einfache Websites. Business-Websites mit CMS kosten €5.000-8.000, komplexe E-Commerce-Lösungen €10.000-20.000. Wir erstellen gerne ein individuelles Angebot für Ihr Projekt.` },
      { question: 'Wie lange dauert die Erstellung einer Website?', answer: 'Eine einfache Website ist in 2-4 Wochen fertig. Business-Websites mit CMS benötigen 4-8 Wochen. Komplexe E-Commerce-Projekte können 8-12 Wochen dauern. Die genaue Dauer hängt vom Projektumfang ab.' },
      { question: 'Welche Technologien verwendet ihr?', answer: 'Wir setzen auf moderne Technologien wie Next.js, React und TypeScript für maximale Performance. Für Kunden, die ihre Inhalte selbst pflegen möchten, bieten wir auch WordPress und Payload CMS an.' },
      { question: 'Ist die Website für Mobilgeräte optimiert?', answer: 'Ja, alle unsere Websites sind zu 100% responsive und mobile-first entwickelt. Sie funktionieren perfekt auf Smartphones, Tablets und Desktops.' },
      { question: 'Bietet ihr auch Hosting und Wartung an?', answer: 'Ja, wir bieten komplette Hosting-Pakete und laufende Wartung an. Im ersten Jahr ist Hosting bei den meisten Paketen inklusive. Danach ab €29/Monat.' },
      { question: 'Kann ich die Website später selbst bearbeiten?', answer: 'Ja, bei unseren Business- und Enterprise-Paketen ist ein benutzerfreundliches CMS (Content Management System) inklusive. Nach einer kurzen Einschulung können Sie Texte und Bilder selbst aktualisieren.' },
    ],
    en: [
      { question: `How much does web design in ${cityName} cost?`, answer: `Professional web design in ${cityName} starts at €2,000 for simple websites. Business websites with CMS cost €5,000-8,000, complex e-commerce solutions €10,000-20,000. We're happy to create a custom quote for your project.` },
      { question: 'How long does it take to create a website?', answer: 'A simple website is ready in 2-4 weeks. Business websites with CMS need 4-8 weeks. Complex e-commerce projects can take 8-12 weeks. The exact duration depends on the project scope.' },
      { question: 'What technologies do you use?', answer: 'We use modern technologies like Next.js, React and TypeScript for maximum performance. For customers who want to maintain their content themselves, we also offer WordPress and Payload CMS.' },
      { question: 'Is the website optimized for mobile devices?', answer: 'Yes, all our websites are 100% responsive and mobile-first developed. They work perfectly on smartphones, tablets and desktops.' },
      { question: 'Do you also offer hosting and maintenance?', answer: 'Yes, we offer complete hosting packages and ongoing maintenance. Hosting is included in the first year with most packages. After that from €29/month.' },
      { question: 'Can I edit the website myself later?', answer: 'Yes, our Business and Enterprise packages include a user-friendly CMS (Content Management System). After a short training, you can update texts and images yourself.' },
    ],
    ru: [
      { question: `Сколько стоит веб-дизайн в городе ${cityName}?`, answer: `Профессиональный веб-дизайн в ${cityName} начинается от €2 000 за простые сайты. Бизнес-сайты с CMS стоят €5 000-8 000, сложные e-commerce решения — €10 000-20 000. Мы с удовольствием подготовим индивидуальное предложение для вашего проекта.` },
      { question: 'Сколько времени занимает создание сайта?', answer: 'Простой сайт готов за 2-4 недели. Бизнес-сайты с CMS требуют 4-8 недель. Сложные e-commerce проекты могут занять 8-12 недель. Точные сроки зависят от объема проекта.' },
      { question: 'Какие технологии вы используете?', answer: 'Мы используем современные технологии, такие как Next.js, React и TypeScript для максимальной производительности. Для клиентов, которые хотят самостоятельно управлять контентом, мы также предлагаем WordPress и Payload CMS.' },
      { question: 'Оптимизирован ли сайт для мобильных устройств?', answer: 'Да, все наши сайты на 100% адаптивные и разработаны по принципу mobile-first. Они идеально работают на смартфонах, планшетах и десктопах.' },
      { question: 'Предлагаете ли вы хостинг и обслуживание?', answer: 'Да, мы предлагаем полные пакеты хостинга и постоянное обслуживание. Хостинг включен в первый год для большинства пакетов. После этого — от €29/месяц.' },
      { question: 'Могу ли я редактировать сайт самостоятельно?', answer: 'Да, наши пакеты Business и Enterprise включают удобную CMS (систему управления контентом). После короткого обучения вы сможете самостоятельно обновлять тексты и изображения.' },
    ],
  }

  return baseFaqs[locale]
}

// ============================================================================
// SEO CITY-SPECIFIC FAQ
// ============================================================================

export function getSeoFaqs(citySlug: string, inputLocale: Locale): FAQ[] {
  const locale = getContentLocale(inputLocale)
  const cityConfig = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities].find(c => c.slug === citySlug)
  const cityName = cityConfig?.cityName[locale] || citySlug

  const baseFaqs: Record<ContentLocale, FAQ[]> = {
    de: [
      { question: 'Wie lange dauert es, bis SEO Ergebnisse zeigt?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen sehen Sie oft nach 3-6 Monaten. Signifikante Ergebnisse und stabile Top-Rankings erreichen wir typischerweise nach 6-12 Monaten kontinuierlicher Optimierung.' },
      { question: `Was kostet SEO in ${cityName}?`, answer: `Unsere SEO-Pakete starten bei €790/Monat für kleine Websites. Business-Pakete liegen bei €1.490/Monat. Für einen einmaligen SEO-Audit berechnen wir €490. Die genauen Kosten hängen von Ihrer Website-Größe und Ihren Zielen ab.` },
      { question: 'Garantiert ihr bestimmte Rankings?', answer: 'Seriöse SEO-Agenturen können keine konkreten Rankings garantieren – Google entscheidet über die Platzierung. Was wir garantieren: professionelle Arbeit, transparente Kommunikation und messbare Verbesserungen.' },
      { question: 'Brauche ich SEO, wenn ich bereits Google Ads schalte?', answer: 'Ja! SEO und SEA ergänzen sich perfekt. SEO bringt nachhaltigen, kostenlosen Traffic, während Google Ads schnelle Ergebnisse liefert. Die Kombination maximiert Ihre Sichtbarkeit und senkt langfristig die Kundenakquisitionskosten.' },
      { question: 'Was ist der Unterschied zwischen Local SEO und normalem SEO?', answer: `Local SEO fokussiert auf lokale Suchanfragen ("Webdesign ${cityName}") und optimiert Ihr Google Business Profile, lokale Verzeichnisse und standortbezogene Keywords. Ideal für Unternehmen mit lokalem Einzugsgebiet.` },
    ],
    en: [
      { question: 'How long does it take for SEO to show results?', answer: 'SEO is a long-term strategy. You often see first improvements after 3-6 months. We typically achieve significant results and stable top rankings after 6-12 months of continuous optimization.' },
      { question: `How much does SEO in ${cityName} cost?`, answer: `Our SEO packages start at €790/month for small websites. Business packages are €1,490/month. For a one-time SEO audit, we charge €490. The exact costs depend on your website size and goals.` },
      { question: 'Do you guarantee specific rankings?', answer: 'Reputable SEO agencies cannot guarantee specific rankings – Google decides the placement. What we guarantee: professional work, transparent communication and measurable improvements.' },
      { question: 'Do I need SEO if I already run Google Ads?', answer: 'Yes! SEO and SEA complement each other perfectly. SEO brings sustainable, free traffic, while Google Ads delivers quick results. The combination maximizes your visibility and reduces customer acquisition costs in the long run.' },
      { question: 'What is the difference between Local SEO and regular SEO?', answer: `Local SEO focuses on local search queries ("Web design ${cityName}") and optimizes your Google Business Profile, local directories and location-based keywords. Ideal for businesses with a local catchment area.` },
    ],
    ru: [
      { question: 'Сколько времени нужно, чтобы SEO показало результаты?', answer: 'SEO — это долгосрочная стратегия. Первые улучшения обычно видны через 3-6 месяцев. Значительных результатов и стабильных топовых позиций мы достигаем, как правило, через 6-12 месяцев непрерывной оптимизации.' },
      { question: `Сколько стоит SEO в ${cityName}?`, answer: `Наши SEO-пакеты начинаются от €790/месяц для небольших сайтов. Бизнес-пакеты — €1 490/месяц. За разовый SEO-аудит мы берем €490. Точная стоимость зависит от размера вашего сайта и целей.` },
      { question: 'Гарантируете ли вы определенные позиции?', answer: 'Серьезные SEO-агентства не могут гарантировать конкретные позиции — Google решает о ранжировании. Что мы гарантируем: профессиональную работу, прозрачную коммуникацию и измеримые улучшения.' },
      { question: 'Нужно ли мне SEO, если я уже запускаю Google Ads?', answer: 'Да! SEO и SEA отлично дополняют друг друга. SEO приносит устойчивый, бесплатный трафик, в то время как Google Ads дает быстрые результаты. Комбинация максимизирует вашу видимость и снижает затраты на привлечение клиентов в долгосрочной перспективе.' },
      { question: 'В чем разница между локальным SEO и обычным SEO?', answer: `Локальное SEO фокусируется на местных поисковых запросах («Веб-дизайн ${cityName}») и оптимизирует ваш Google Business Profile, местные каталоги и географические ключевые слова. Идеально для компаний с локальной зоной обслуживания.` },
    ],
  }

  return baseFaqs[locale]
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

export const webdesignRelatedServices: Record<ContentLocale, RelatedService[]> = {
  de: [
    { title: 'SEO Wien', description: 'Suchmaschinenoptimierung für bessere Google-Rankings.', href: '/seo-agentur-wien' },
    { title: 'Branding', description: 'Logo-Design und Corporate Identity für Ihre Marke.', href: '/leistungen/branding' },
    { title: 'E-Commerce', description: 'Online-Shops mit Shopify, WooCommerce oder custom.', href: '/leistungen/webdesign' },
  ],
  en: [
    { title: 'SEO Vienna', description: 'Search engine optimization for better Google rankings.', href: '/seo-agentur-wien' },
    { title: 'Branding', description: 'Logo design and corporate identity for your brand.', href: '/leistungen/branding' },
    { title: 'E-Commerce', description: 'Online shops with Shopify, WooCommerce or custom.', href: '/leistungen/webdesign' },
  ],
  ru: [
    { title: 'SEO Вена', description: 'Поисковая оптимизация для лучших позиций в Google.', href: '/seo-agentur-wien' },
    { title: 'Брендинг', description: 'Дизайн логотипа и фирменный стиль для вашего бренда.', href: '/leistungen/branding' },
    { title: 'E-Commerce', description: 'Интернет-магазины на Shopify, WooCommerce или индивидуальной разработке.', href: '/leistungen/webdesign' },
  ],
}

export const seoRelatedServices: Record<ContentLocale, RelatedService[]> = {
  de: [
    { title: 'Webdesign Wien', description: 'SEO-optimierte Websites, die von Anfang an für Google gebaut sind.', href: '/webdesign-wien' },
    { title: 'Content Marketing', description: 'Hochwertige Inhalte, die ranken und konvertieren.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Schnelle Ergebnisse mit bezahlter Werbung bei Google.', href: '/leistungen/digital-marketing' },
  ],
  en: [
    { title: 'Web Design Vienna', description: 'SEO-optimized websites built for Google from the start.', href: '/webdesign-wien' },
    { title: 'Content Marketing', description: 'High-quality content that ranks and converts.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Quick results with paid advertising on Google.', href: '/leistungen/digital-marketing' },
  ],
  ru: [
    { title: 'Веб-дизайн Вена', description: 'SEO-оптимизированные сайты, созданные для Google с самого начала.', href: '/webdesign-wien' },
    { title: 'Контент-маркетинг', description: 'Качественный контент, который ранжируется и конвертирует.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Быстрые результаты с платной рекламой в Google.', href: '/leistungen/digital-marketing' },
  ],
}

// ============================================================================
// CONTENT GENERATORS
// ============================================================================

export function getWebdesignContent(citySlug: string, inputLocale: Locale): LandingPageContent {
  const locale = getContentLocale(inputLocale)
  const cityConfig = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities].find(c => c.slug === citySlug)
  const cityName = cityConfig?.cityName[locale] || citySlug
  const cityMeta = webdesignCityMeta[citySlug]

  // Locale-specific badges and CTAs
  const badgeText = locale === 'de' ? `Webdesign Agentur ${cityName}` : locale === 'ru' ? `Агентство веб-дизайна ${cityName}` : `Web Design Agency ${cityName}`
  const ctaPrimaryText = locale === 'de' ? 'Kostenlose Beratung' : locale === 'ru' ? 'Бесплатная консультация' : 'Free Consultation'
  const ctaSecondaryText = locale === 'de' ? 'Preise ansehen' : locale === 'ru' ? 'Смотреть цены' : 'View Pricing'

  // Use city-specific hero or default
  const hero = cityMeta ? {
    badge: badgeText,
    title: cityMeta.heroTitle[locale],
    description: cityMeta.heroDescription[locale],
    ctaPrimary: ctaPrimaryText,
    ctaSecondary: ctaSecondaryText,
  } : {
    badge: badgeText,
    title: locale === 'de' ? `Professionelles Webdesign in ${cityName}` : locale === 'ru' ? `Профессиональный веб-дизайн в ${cityName}` : `Professional Web Design in ${cityName}`,
    description: locale === 'de'
      ? `Moderne, schnelle und SEO-optimierte Websites für Unternehmen in ${cityName}. Von der Konzeption bis zum Launch – alles aus einer Hand.`
      : locale === 'ru'
        ? `Современные, быстрые и SEO-оптимизированные сайты для компаний в ${cityName}. От концепции до запуска – все из одних рук.`
        : `Modern, fast and SEO-optimized websites for businesses in ${cityName}. From concept to launch – everything from one source.`,
    ctaPrimary: ctaPrimaryText,
    ctaSecondary: ctaSecondaryText,
  }

  const labels = { ...sharedLabels[locale] }
  labels.ctaTitle = locale === 'de' ? 'Bereit für Ihre neue Website?' : locale === 'ru' ? 'Готовы к вашему новому сайту?' : 'Ready for Your New Website?'
  labels.ctaDescription = locale === 'de'
    ? 'Lassen Sie uns über Ihr Projekt sprechen. Kostenloses Erstgespräch ohne Verpflichtung.'
    : locale === 'ru'
      ? 'Давайте обсудим ваш проект. Бесплатная первичная консультация без обязательств.'
      : "Let's talk about your project. Free initial consultation with no obligation."

  return {
    hero,
    trustSignals: webdesignTrustSignals[locale],
    benefits: webdesignBenefits[locale],
    packages: webdesignPackages[locale],
    process: webdesignProcess[locale],
    technologies: webdesignTechnologies,
    faqs: getWebdesignFaqs(citySlug, locale),
    relatedServices: webdesignRelatedServices[locale],
    labels,
  }
}

export function getWebdesignMetadata(citySlug: string, inputLocale: Locale) {
  const locale = getContentLocale(inputLocale)
  const cityMeta = webdesignCityMeta[citySlug]
  const cityConfig = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities].find(c => c.slug === citySlug)
  const cityName = cityConfig?.cityName[locale] || citySlug

  if (cityMeta) {
    return {
      metaTitle: cityMeta.metaTitle[locale],
      metaDescription: cityMeta.metaDescription[locale],
      keywords: cityMeta.keywords[locale],
    }
  }

  // Fallback
  return {
    metaTitle: locale === 'de'
      ? `Webdesign ${cityName} | Professionelle Websites`
      : locale === 'ru'
        ? `Веб-дизайн ${cityName} | Профессиональные сайты`
        : `Web Design ${cityName} | Professional Websites`,
    metaDescription: locale === 'de'
      ? `Webdesign Agentur für ${cityName}. Moderne, schnelle und SEO-optimierte Websites für Unternehmen.`
      : locale === 'ru'
        ? `Агентство веб-дизайна для ${cityName}. Современные, быстрые и SEO-оптимизированные сайты для компаний.`
        : `Web design agency for ${cityName}. Modern, fast and SEO-optimized websites for businesses.`,
    keywords: locale === 'de'
      ? [`Webdesign ${cityName}`, `Website erstellen ${cityName}`, `Webdesigner ${cityName}`]
      : locale === 'ru'
        ? [`Веб-дизайн ${cityName}`, `Создание сайта ${cityName}`, `Веб-дизайнер ${cityName}`]
        : [`Web Design ${cityName}`, `Website Development ${cityName}`, `Web Designer ${cityName}`],
  }
}

export function getSeoContent(citySlug: string, inputLocale: Locale): LandingPageContent {
  const locale = getContentLocale(inputLocale)
  const cityConfig = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities].find(c => c.slug === citySlug)
  const cityName = cityConfig?.cityName[locale] || citySlug

  const hero = locale === 'de' ? {
    badge: `SEO Agentur ${cityName}`,
    title: `Suchmaschinenoptimierung in ${cityName}`,
    description: `Mehr Sichtbarkeit, mehr Traffic, mehr Kunden. Professionelle SEO-Betreuung für Unternehmen in ${cityName}.`,
    ctaPrimary: 'Kostenlose SEO-Analyse',
    ctaSecondary: 'SEO-Pakete ansehen',
  } : locale === 'ru' ? {
    badge: `SEO-агентство ${cityName}`,
    title: `Поисковая оптимизация в ${cityName}`,
    description: `Больше видимости, больше трафика, больше клиентов. Профессиональные SEO-услуги для компаний в ${cityName}.`,
    ctaPrimary: 'Бесплатный SEO-анализ',
    ctaSecondary: 'Смотреть SEO-пакеты',
  } : {
    badge: `SEO Agency ${cityName}`,
    title: `Search Engine Optimization in ${cityName}`,
    description: `More visibility, more traffic, more customers. Professional SEO services for businesses in ${cityName}.`,
    ctaPrimary: 'Free SEO Analysis',
    ctaSecondary: 'View SEO Packages',
  }

  const labels = { ...sharedLabels[locale] }
  labels.resultsTitle = locale === 'de' ? 'Ergebnisse' : locale === 'ru' ? 'Результаты' : 'Results'
  labels.servicesTitle = locale === 'de' ? 'Unsere SEO-Leistungen' : locale === 'ru' ? 'Наши SEO-услуги' : 'Our SEO Services'
  labels.servicesDescription = locale === 'de'
    ? 'Umfassende Suchmaschinenoptimierung für nachhaltigen Erfolg.'
    : locale === 'ru'
      ? 'Комплексная поисковая оптимизация для устойчивого успеха.'
      : 'Comprehensive search engine optimization for sustainable success.'
  labels.ctaTitle = locale === 'de' ? 'Bereit für bessere Rankings?' : locale === 'ru' ? 'Готовы к лучшим позициям?' : 'Ready for Better Rankings?'
  labels.ctaDescription = locale === 'de'
    ? 'Kostenlose SEO-Analyse Ihrer Website. Wir zeigen Ihnen, wo Sie stehen und was möglich ist.'
    : locale === 'ru'
      ? 'Бесплатный SEO-анализ вашего сайта. Мы покажем вам, где вы находитесь и что возможно.'
      : 'Free SEO analysis of your website. We show you where you stand and what is possible.'

  return {
    hero,
    results: seoResults[locale],
    services: seoServices[locale],
    packages: seoPackages[locale],
    process: seoProcess[locale],
    faqs: getSeoFaqs(citySlug, locale),
    relatedServices: seoRelatedServices[locale],
    labels,
  }
}

// ============================================================================
// SEO GENERATORS
// ============================================================================

export function getWebdesignSeo(citySlug: string, inputLocale: Locale): LandingPageSEO {
  const locale = getContentLocale(inputLocale)
  const cityConfig = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities].find(c => c.slug === citySlug)
  const cityName = cityConfig?.cityName[locale] || citySlug
  const siteUrl = 'https://goldenwing.at'

  // Determine cityType based on slug
  const countryLevelSlugs = ['oesterreich', 'deutschland', 'schweiz', 'vae']
  const cityType: 'City' | 'Country' = countryLevelSlugs.includes(citySlug) ? 'Country' : 'City'

  // Determine localBusiness based on location
  const isUAE = cityConfig?.country === 'AE'
  const localBusiness = isUAE ? localBusinessDubai : localBusinessVienna

  const serviceName = locale === 'de' ? `Webdesign ${cityName}` : locale === 'ru' ? `Веб-дизайн ${cityName}` : `Web Design ${cityName}`
  const homeLabel = locale === 'de' ? 'Startseite' : locale === 'ru' ? 'Главная' : 'Home'
  const localePrefix = locale === 'en' ? 'en/' : locale === 'ru' ? 'ru/' : ''

  return {
    serviceName,
    cityName,
    cityType,
    url: `/webdesign-${citySlug}`,
    localBusiness,
    breadcrumbs: [
      { name: homeLabel, url: siteUrl },
      { name: serviceName, url: `${siteUrl}/${localePrefix}webdesign-${citySlug}` },
    ],
  }
}

export function getSeoSeo(citySlug: string, inputLocale: Locale): LandingPageSEO {
  const locale = getContentLocale(inputLocale)
  const cityConfig = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities].find(c => c.slug === citySlug)
  const cityName = cityConfig?.cityName[locale] || citySlug
  const siteUrl = 'https://goldenwing.at'

  // Determine cityType based on slug
  const countryLevelSlugs = ['oesterreich', 'deutschland', 'schweiz', 'vae']
  const cityType: 'City' | 'Country' = countryLevelSlugs.includes(citySlug) ? 'Country' : 'City'

  // Determine localBusiness based on location
  const isUAE = cityConfig?.country === 'AE'
  const localBusiness = isUAE ? localBusinessDubai : localBusinessVienna

  const serviceName = locale === 'de' ? `SEO Agentur ${cityName}` : locale === 'ru' ? `SEO-агентство ${cityName}` : `SEO Agency ${cityName}`
  const alternateName = locale === 'de' ? `Suchmaschinenoptimierung ${cityName}` : locale === 'ru' ? `Поисковая оптимизация ${cityName}` : `Search Engine Optimization ${cityName}`
  const homeLabel = locale === 'de' ? 'Startseite' : locale === 'ru' ? 'Главная' : 'Home'
  const localePrefix = locale === 'en' ? 'en/' : locale === 'ru' ? 'ru/' : ''

  return {
    serviceName,
    alternateName,
    cityName,
    cityType,
    url: `/seo-agentur-${citySlug}`,
    localBusiness,
    breadcrumbs: [
      { name: homeLabel, url: siteUrl },
      { name: serviceName, url: `${siteUrl}/${localePrefix}seo-agentur-${citySlug}` },
    ],
  }
}
