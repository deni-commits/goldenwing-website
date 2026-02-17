import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO, LocalBusinessInfo } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// Vienna LocalBusiness Info (echte Adresse!)
const viennaLocalBusiness: LocalBusinessInfo = {
  name: 'GoldenWing Creative Studios Wien',
  address: 'Czeikestrasse 4/21',
  city: 'Wien',
  postalCode: '1100',
  country: 'AT',
  phone: '+43-664-543-96-81',
  latitude: 48.1676,
  longitude: 16.3795,
}

// TIER 1: Wien - MIT LocalBusiness (echtes Büro!)
const seoData = {
  de: {
    title: 'Kreativagentur Wien | Branding, Webdesign & Marketing',
    description: 'Kreativagentur in Wien. Branding, Webdesign, Online Marketing aus einer Hand. Persönliche Betreuung, kreative Lösungen. Büro in 1100 Wien.',
    keywords: ['Kreativagentur Wien', 'Werbeagentur Wien', 'Creative Agency Vienna', 'Agentur Wien'],
  },
  en: {
    title: 'Creative Agency Vienna | Branding, Web Design & Marketing',
    description: 'Creative agency in Vienna. Branding, web design, online marketing from one source. Personal support from our office in Vienna.',
    keywords: ['Creative Agency Vienna', 'Advertising Agency Vienna', 'Web Agency Vienna'],
  },
  ru: {
    title: 'Творческое агентство Вена | Брендинг, Веб-дизайн и Маркетинг',
    description: 'Творческое агентство в Вене. Брендинг, веб-дизайн, интернет-маркетинг. Личное сопровождение из нашего офиса в 1100 Вене.',
    keywords: ['Творческое агентство Вена', 'Рекламное агентство Вена', 'Агентство Вена'],
  },
}

// UNIQUE Content für Wien - Kreativagentur Fokus
const contentData: Record<'de' | 'en' | 'ru', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Kreativagentur Wien',
      title: 'Kreativagentur Wien',
      description: 'Branding, Webdesign, Marketing – alles aus einer Hand. Von Positionierung bis zur Umsetzung. Persönlich betreut aus unserem Büro im 10. Bezirk.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '100+ abgeschlossene Projekte' },
      { icon: 'mapPin', text: 'Büro in Wien 1100' },
      { icon: 'users', text: 'Interdisziplinäres Team' },
      { icon: 'shield', text: 'Full-Service-Agentur' },
    ],
    benefits: [
      {
        icon: 'zap',
        title: 'Full-Service Kreativleistungen',
        description: 'Alles aus einer Hand: von der Markenentwicklung über Webdesign bis zur digitalen Kampagne. Keine langen Laufwege zwischen mehreren Agenturen.',
      },
      {
        icon: 'users',
        title: 'Interdisziplinäres Team',
        description: 'Designer, Developer, Copywriter, Strategen – alle unter einem Dach. So entstehen kohärente, durchdachte Lösungen.',
      },
      {
        icon: 'target',
        title: 'Persönliche Betreuung',
        description: 'Sie sprechen mit den Machern, nicht mit Call-Center-Agenten. Regelmäßige Workshops in unserem Wiener Büro.',
      },
      {
        icon: 'lightbulb',
        title: 'Alles aus einer Hand',
        description: 'Von der Strategie über Design bis Entwicklung und Marketing – wir begleiten Sie vom ersten Workshop bis zum erfolgreichen Launch.',
      },
    ],
    results: [
      { metric: '100+', label: 'Projekte abgeschlossen', detail: 'Durchschnittlich 15-20 pro Jahr' },
      { metric: '4-8', label: 'Wochen', detail: 'Durchschnittliche Projektdauer' },
      { metric: '85%', label: 'Kundenzufriedenheit', detail: 'NPS Score unserer Kunden' },
    ],
    packages: [
      {
        name: 'Kreativ Starter',
        price: '2.900',
        priceType: 'einmalig',
        description: 'Perfekt zum Einstieg – ein Service fokussiert.',
        popular: false,
        features: [
          'Ein Kreativ-Service wählbar',
          'Logo oder Website oder Marketing',
          'Strategische Vorbesprechung',
          'Persönliche Betreuung',
          'Finale Übergabe',
        ],
      },
      {
        name: 'Kreativ Business',
        price: '7.500',
        priceType: 'einmalig',
        description: 'Die beliebte Option – zwei Leistungen kombiniert.',
        popular: true,
        features: [
          'Zwei Services kombinierbar',
          'z.B. Branding + Website',
          'oder Branding + Marketing Setup',
          '2-3 Workshops in Wien',
          'Monatliches Reporting (3 Monate)',
          'Priority Support',
        ],
      },
      {
        name: 'Kreativ Premium',
        price: '15.000',
        priceType: 'einmalig',
        description: 'Vollständige Lösung – komplettes Kreativ-Paket.',
        popular: false,
        features: [
          'Branding + Website + Marketing',
          'Strategischer Prozess',
          'Corporate Design System',
          'SEO-optimierte Website',
          'Marketing-Kampagnen-Setup',
          'Launch-Begleitung',
          '6 Monate Betreuung',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Strategie-Workshop', description: 'Wir lernen Ihr Unternehmen kennen. Ziele, Zielgruppe, Positionierung – die Grundlage für alles.' },
      { step: '02', title: 'Konzeption', description: 'Basierend auf der Strategie entwickeln wir kreative Konzepte für alle Services.' },
      { step: '03', title: 'Design & Entwicklung', description: 'Von Logo über Website bis zu Marketing-Materialien – fachgerecht umgesetzt.' },
      { step: '04', title: 'Feedback & Optimierung', description: 'Ihre Feedback, unsere Überarbeitungen. Iterativ bis zur Perfektion.' },
      { step: '05', title: 'Launch & Betreuung', description: 'Go-Live, Training und laufende Unterstützung. Wir sind auch nach dem Launch für Sie da.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Next.js', 'React', 'WordPress', 'Google Analytics'],
    faqs: [
      {
        question: 'Was kostet eine Kreativagentur in Wien?',
        answer: 'Einzelne Services starten bei €2.900 (z.B. Logo-Design). Kombinierte Pakete: €7.500-12.000. Vollständige Lösungen ab €15.000. Gerne erstellen wir ein individuelles Angebot.',
      },
      {
        question: 'Was ist der Unterschied zu Einzelfreelancern?',
        answer: 'Wir bieten Full-Service aus einer Hand. Das bedeutet: koordinierte Lösungen, schnellere Umsetzung, persönliche Ansprechpartner, und über 10 Jahre Erfahrung. Kein Risiko von schlecht koordinierten Einzelprojekten.',
      },
      {
        question: 'Wie lange dauert ein komplettes Kreativ-Projekt?',
        answer: 'Starter-Projekte: 4-6 Wochen. Business-Projekte: 8-12 Wochen. Premium-Lösungen: 12-16 Wochen. Workshops und Abstimmungen sind dabei inklusive.',
      },
      {
        question: 'Kann ich einzelne Services buchen oder nur Pakete?',
        answer: 'Beides! Sie können einzelne Services buchen (€2.900+) oder vordefinierte Pakete kombinieren. Wir erstellen gerne ein Customized-Angebot für Ihre Bedürfnisse.',
      },
      {
        question: 'Gibt es Förderungen für Kreativ-Projekte?',
        answer: 'Ja! Die Wirtschaftsagentur Wien fördert Kreativ- und Digitalisierungsprojekte. Bis zu 50% Zuschuss für KMU. Wir helfen beim Antrag.',
      },
      {
        question: 'Wer ist mein Ansprechpartner?',
        answer: 'Sie erhalten einen festen Projektmanager – nicht irgendwelche wechselnden Kontakte. Sie kennen die Agentur, die Agentur kennt Sie.',
      },
    ],
    relatedServices: [
      { title: 'Branding Wien', description: 'Markenentwicklung & Corporate Design.', href: '/standorte/wien/branding' as any },
      { title: 'Webdesign Wien', description: 'Websites, die konvertieren.', href: '/standorte/wien/webdesign' as any },
      { title: 'Social Media Agentur Wien', description: 'Content & Community Management.', href: '/standorte/wien/social-media' as any },
      { title: 'SEO Wien', description: 'Sichtbarkeit in der Suchmaschine.', href: '/standorte/wien/seo' as any },
      { title: 'Google Ads Wien', description: 'Bezahlte Werbung & Kampagnen.', href: '/standorte/wien/google-ads' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Kreativ-Pakete für Wien',
      pricingDescription: 'Transparent und fair – vom Starter bis zur Premium-Lösung.',
      processTitle: 'Wie wir arbeiten',
      processSubtitle: 'Von der Strategie zum erfolgreichen Launch.',
      resultsTitle: 'Unsere Erfolge',
      faqTitle: 'Kreativagentur Wien – Häufige Fragen',
      faqSubtitle: 'Alles rund um Full-Service Kreativleistungen.',
      ctaTitle: 'Kreativ-Projekt starten?',
      ctaDescription: 'Kostenloses Erstgespräch in unserem Wiener Büro.',
    },
  },
  en: {
    hero: {
      badge: 'Creative Agency Vienna',
      title: 'Creative Agency Vienna',
      description: 'Branding, web design, marketing – all from one source. From positioning to implementation. Personally managed from our 10th district office.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'award', text: '100+ Completed Projects' },
      { icon: 'mapPin', text: 'Office in Vienna' },
      { icon: 'users', text: 'Interdisciplinary Team' },
      { icon: 'shield', text: 'Full-Service Agency' },
    ],
    benefits: [
      {
        icon: 'zap',
        title: 'Full-Service Creative Solutions',
        description: 'Everything from one source: from brand development to web design to digital campaigns. No long communication paths between multiple agencies.',
      },
      {
        icon: 'users',
        title: 'Interdisciplinary Team',
        description: 'Designers, developers, copywriters, strategists – all under one roof. This creates coherent, well-thought-out solutions.',
      },
      {
        icon: 'target',
        title: 'Personal Support',
        description: 'You speak with the doers, not with call center agents. Regular workshops at our Vienna office.',
      },
      {
        icon: 'lightbulb',
        title: 'All from One Source',
        description: 'From strategy to design to development and marketing – we guide you from the first workshop to successful launch.',
      },
    ],
    results: [
      { metric: '100+', label: 'Projects Completed', detail: 'Average 15-20 per year' },
      { metric: '4-8', label: 'Weeks', detail: 'Average project duration' },
      { metric: '85%', label: 'Customer Satisfaction', detail: 'NPS score of our clients' },
    ],
    packages: [
      {
        name: 'Creative Starter',
        price: '2,900',
        priceType: 'one-time',
        description: 'Perfect entry point – one focused service.',
        popular: false,
        features: [
          'One creative service of choice',
          'Logo or website or marketing',
          'Strategic consultation',
          'Personal support',
          'Final delivery',
        ],
      },
      {
        name: 'Creative Business',
        price: '7,500',
        priceType: 'one-time',
        description: 'The popular option – two services combined.',
        popular: true,
        features: [
          'Two services combinable',
          'e.g. Branding + Website',
          'or Branding + Marketing Setup',
          '2-3 Workshops in Vienna',
          'Monthly Reporting (3 months)',
          'Priority Support',
        ],
      },
      {
        name: 'Creative Premium',
        price: '15,000',
        priceType: 'one-time',
        description: 'Complete solution – full creative package.',
        popular: false,
        features: [
          'Branding + Website + Marketing',
          'Strategic process',
          'Corporate Design System',
          'SEO-optimized Website',
          'Marketing Campaign Setup',
          'Launch support',
          '6 months of support',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Strategy Workshop', description: 'We get to know your company. Goals, target audience, positioning – the foundation for everything.' },
      { step: '02', title: 'Conception', description: 'Based on the strategy, we develop creative concepts for all services.' },
      { step: '03', title: 'Design & Development', description: 'From logo to website to marketing materials – professionally implemented.' },
      { step: '04', title: 'Feedback & Optimization', description: 'Your feedback, our revisions. Iteratively until perfect.' },
      { step: '05', title: 'Launch & Support', description: 'Go-live, training and ongoing support. We\'re here for you even after launch.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Next.js', 'React', 'WordPress', 'Google Analytics'],
    faqs: [
      {
        question: 'What does a creative agency cost in Vienna?',
        answer: 'Individual services start at €2,900 (e.g., logo design). Combined packages: €7,500-12,000. Complete solutions from €15,000. We\'ll create a custom quote.',
      },
      {
        question: 'What\'s the difference to freelancers?',
        answer: 'We offer full-service from one source. This means coordinated solutions, faster implementation, personal contacts, and 10+ years of experience. No risk of poorly coordinated individual projects.',
      },
      {
        question: 'How long does a complete creative project take?',
        answer: 'Starter projects: 4-6 weeks. Business projects: 8-12 weeks. Premium solutions: 12-16 weeks. Workshops and approvals are included.',
      },
      {
        question: 'Can I book individual services or only packages?',
        answer: 'Both! You can book individual services (€2,900+) or combine predefined packages. We\'re happy to create a customized offer.',
      },
      {
        question: 'Are there grants for creative projects?',
        answer: 'Yes! The Vienna Business Agency funds creative and digitalization projects. Up to 50% subsidy for SMEs. We help with the application.',
      },
      {
        question: 'Who is my contact person?',
        answer: 'You get a dedicated project manager – not rotating contacts. You know the agency, the agency knows you.',
      },
    ],
    relatedServices: [
      { title: 'Branding Vienna', description: 'Brand development & corporate design.', href: '/standorte/wien/branding' as any },
      { title: 'Web Design Vienna', description: 'Websites that convert.', href: '/standorte/wien/webdesign' as any },
      { title: 'Social Media Agency Vienna', description: 'Content & community management.', href: '/standorte/wien/social-media' as any },
      { title: 'SEO Vienna', description: 'Visibility in search engines.', href: '/standorte/wien/seo' as any },
      { title: 'Google Ads Vienna', description: 'Paid advertising & campaigns.', href: '/standorte/wien/google-ads' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Creative Packages for Vienna',
      pricingDescription: 'Transparent and fair – from starter to premium solutions.',
      processTitle: 'How We Work',
      processSubtitle: 'From strategy to successful launch.',
      resultsTitle: 'Our Success',
      faqTitle: 'Creative Agency Vienna – FAQ',
      faqSubtitle: 'All about full-service creative solutions.',
      ctaTitle: 'Start Creative Project?',
      ctaDescription: 'Free initial meeting at our Vienna office.',
    },
  },
  ru: {
    hero: {
      badge: 'Творческое агентство Вена',
      title: 'Творческое агентство Вена',
      description: 'Брендинг, веб-дизайн, маркетинг – всё из одного источника. От позиционирования до реализации. Личное сопровождение из нашего офиса.',
      ctaPrimary: 'Заказать проект',
      ctaSecondary: 'Посмотреть портфолио',
    },
    trustSignals: [
      { icon: 'award', text: '100+ завершённых проектов' },
      { icon: 'mapPin', text: 'Офис в Вене' },
      { icon: 'users', text: 'Междисциплинарная команда' },
      { icon: 'shield', text: 'Полный спектр услуг' },
    ],
    benefits: [
      {
        icon: 'zap',
        title: 'Комплексные творческие решения',
        description: 'Всё из одного источника: от разработки бренда до веб-дизайна и цифровых кампаний.',
      },
      {
        icon: 'users',
        title: 'Междисциплинарная команда',
        description: 'Дизайнеры, разработчики, копирайтеры, стратеги – всё под одной крышей.',
      },
      {
        icon: 'target',
        title: 'Личное сопровождение',
        description: 'Вы работаете с исполнителями, а не с call-центром. Регулярные встречи в нашем офисе.',
      },
      {
        icon: 'lightbulb',
        title: 'Всё из одного источника',
        description: 'От стратегии до дизайна, разработки и маркетинга – мы сопровождаем вас от первой встречи до успешного запуска.',
      },
    ],
    results: [
      { metric: '100+', label: 'проектов завершено', detail: 'В среднем 15-20 в год' },
      { metric: '4-8', label: 'недель', detail: 'Средняя продолжительность проекта' },
      { metric: '85%', label: 'удовлетворённость', detail: 'NPS наших клиентов' },
    ],
    packages: [
      {
        name: 'Творческий Стартовый',
        price: '2 900',
        priceType: 'единоразово',
        description: 'Идеально для начала – один сервис.',
        popular: false,
        features: [
          'Один творческий сервис',
          'Логотип или сайт или маркетинг',
          'Стратегическая консультация',
          'Личное сопровождение',
          'Финальная передача',
        ],
      },
      {
        name: 'Творческий Бизнес',
        price: '7 500',
        priceType: 'единоразово',
        description: 'Популярный вариант – два сервиса.',
        popular: true,
        features: [
          'Два комбинируемых сервиса',
          'Например: Брендинг + Веб-сайт',
          'или Брендинг + Маркетинг',
          '2-3 встречи в Вене',
          'Ежемесячные отчёты (3 месяца)',
          'Приоритетная поддержка',
        ],
      },
      {
        name: 'Творческий Премиум',
        price: '15 000',
        priceType: 'единоразово',
        description: 'Полное решение – весь пакет услуг.',
        popular: false,
        features: [
          'Брендинг + Веб-сайт + Маркетинг',
          'Стратегический процесс',
          'Система Corporate Design',
          'SEO-оптимизированный сайт',
          'Настройка маркетинговых кампаний',
          'Помощь при запуске',
          '6 месяцев поддержки',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Стратегическая встреча', description: 'Мы знакомимся с вашей компанией, целями и позиционированием.' },
      { step: '02', title: 'Концепция', description: 'На основе стратегии разрабатываем творческие концепции.' },
      { step: '03', title: 'Дизайн и разработка', description: 'От логотипа до сайта – профессионально реализовано.' },
      { step: '04', title: 'Обратная связь и оптимизация', description: 'Ваша обратная связь, наши правки, пока всё не будет идеально.' },
      { step: '05', title: 'Запуск и поддержка', description: 'Go-live, обучение и постоянная поддержка.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Next.js', 'React', 'WordPress'],
    faqs: [
      {
        question: 'Сколько стоит творческое агентство в Вене?',
        answer: 'Отдельные услуги от €2 900. Комбинированные пакеты: €7 500-12 000. Полные решения от €15 000.',
      },
      {
        question: 'Как долго длится проект?',
        answer: 'Стартовые проекты: 4-6 недель. Бизнес: 8-12 недель. Премиум: 12-16 недель.',
      },
    ],
    relatedServices: [
      { title: 'Брендинг Вена', description: 'Разработка бренда и фирменный стиль.', href: '/standorte/wien/branding' as any },
      { title: 'Веб-дизайн Вена', description: 'Сайты, которые конвертируют.', href: '/standorte/wien/webdesign' as any },
      { title: 'Социальные медиа Вена', description: 'Контент и управление сообществом.', href: '/standorte/wien/social-media' as any },
    ],
    labels: {
      ...sharedLabels.ru,
      pricingTitle: 'Творческие пакеты для Вены',
      faqTitle: 'Творческое агентство Вена – Вопросы',
      ctaTitle: 'Начать творческий проект?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/wien/kreativagentur')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getCanonicalUrl('/standorte/wien/kreativagentur', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte/wien/kreativagentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortWienKreativagenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'

  const content = contentData[locale] || contentData.de

  // TIER 1: Wien - MIT LocalBusiness (echtes Büro!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Kreativagentur Wien' : locale === 'en' ? 'Creative Agency Vienna' : 'Творческое агентство Вена',
    cityName: 'Wien',
    cityType: 'City',
    url: '/standorte/wien/kreativagentur',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : locale === 'en' ? 'Locations' : 'Офисы', url: 'https://goldenwing.at/standorte' },
      { name: 'Wien', url: 'https://goldenwing.at/standorte/wien' },
      { name: locale === 'de' ? 'Kreativagentur' : locale === 'en' ? 'Creative Agency' : 'Творческое агентство', url: 'https://goldenwing.at/standorte/wien/kreativagentur' },
    ],
    localBusiness: viennaLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Unsere Leistungen', href: '/leistungen' },
        { text: 'Agentur Wien', href: '/standorte/wien' },
        { text: 'Alle Standorte', href: '/standorte' },
      ]
    : locale === 'en'
    ? [
        { text: 'Our Services', href: '/services' },
        { text: 'Agency Vienna', href: '/locations/vienna' },
        { text: 'All Locations', href: '/locations' },
      ]
    : [
        { text: 'Наши услуги', href: '/ru/services' },
        { text: 'Офис Вена', href: '/ru/locations/vienna' },
      ]

  return (
    <LandingPageTemplate
      locale={locale}
      content={content}
      seo={seo}
      contextualLinks={contextualLinks}
    />
  )
}
