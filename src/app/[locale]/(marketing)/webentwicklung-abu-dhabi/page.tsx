import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { RegionalLandingPage, RegionalLandingPageData } from '@/components/sections/regional-landing-page'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'Webentwicklung Abu Dhabi · Hauptstadt-Expertise | GoldenWing',
      description: 'Webentwicklung für Abu Dhabi. Custom Web Apps, Portale & Plattformen für Regierung & Unternehmen in der UAE-Hauptstadt.',
      keywords: ['webentwicklung abu dhabi', 'web development abu dhabi', 'website abu dhabi'],
    },
    hero: {
      badge: 'Webentwicklung für Abu Dhabi',
      title: 'Webentwicklung Abu Dhabi',
      description: 'Professionelle Webentwicklung für die UAE-Hauptstadt. Von unserem Dubai-Büro betreuen wir Unternehmen, Government-Projekte und ADGM-Firmen in Abu Dhabi.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Dubai-Büro' },
      { icon: 'star', text: 'Government-Erfahrung' },
      { icon: 'clock', text: 'ADGM-Expertise' },
    ],
    benefits: [
      { icon: 'zap', title: 'Hauptstadt-Expertise', description: 'Verstehen den Abu Dhabi Markt und seine Besonderheiten' },
      { icon: 'shield', title: 'Government-Ready', description: 'Barrierefreiheit und Sicherheitsstandards' },
      { icon: 'users', title: 'Zweisprachig', description: 'Vollständige AR/EN Websites mit RTL' },
      { icon: 'star', title: 'Regelmäßige Meetings', description: 'Nur 1,5h von unserem Dubai-Büro' },
    ],
    packages: [
      { name: 'Business', price: '6.000', description: 'Für Unternehmen', popular: false, features: ['Bis zu 12 Seiten', 'Responsive Design', 'CMS-Integration', 'EN/AR Option', 'SEO-Grundlagen', 'SSL & Security'] },
      { name: 'Professional', price: '12.000', description: 'Für ADGM & Firmen', popular: true, features: ['Bis zu 25 Seiten', 'Custom Development', 'Zweisprachig (EN/AR)', 'Kundenportal-Option', 'API-Integrationen', 'Performance-Optimierung', 'Analytics Setup', '12 Monate Support'] },
      { name: 'Government', price: '25.000+', description: 'Für öffentliche Projekte', popular: false, features: ['Unbegrenzte Seiten', 'Höchste Barrierefreiheit', 'Security-Audit', 'WCAG 2.1 AA', 'Load Testing', 'Dediziertes Team', 'SLA-Garantien', 'Wartungsvertrag'] },
    ],
    process: [
      { step: '01', title: 'Meeting', description: 'Persönliches Treffen in Abu Dhabi oder Dubai.' },
      { step: '02', title: 'Anforderungen', description: 'Detaillierte Analyse Ihrer Bedürfnisse.' },
      { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung nach höchsten Standards.' },
      { step: '04', title: 'Testing', description: 'Gründliche Tests inkl. Accessibility.' },
      { step: '05', title: 'Launch', description: 'Go-Live und fortlaufende Betreuung.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'Node.js', 'AWS Middle East', 'Azure UAE', 'PostgreSQL'],
    faqs: [
      { question: 'Betreut ihr auch Kunden in Abu Dhabi von Dubai aus?', answer: 'Ja, Abu Dhabi ist nur 1,5 Stunden von unserem Dubai-Büro entfernt. Wir betreuen regelmäßig Kunden in der Hauptstadt, auch mit persönlichen Meetings.' },
      { question: 'Habt ihr Erfahrung mit dem Government-Sektor in Abu Dhabi?', answer: 'Wir verstehen die Anforderungen an Websites und Portale im öffentlichen Sektor, einschließlich Barrierefreiheit, Sicherheit und Compliance-Standards.' },
      { question: 'Entwickelt ihr auch für Abu Dhabi Global Market (ADGM)?', answer: 'Ja, wir haben Erfahrung mit Finanz- und Professional-Services-Unternehmen im ADGM und verstehen deren spezifische Anforderungen.' },
      { question: 'Könnt ihr mehrsprachige Portale für Abu Dhabi entwickeln?', answer: 'Absolut. Regierungsnahe Projekte erfordern oft Arabisch und Englisch. Wir entwickeln vollständig zweisprachige Lösungen mit korrekter RTL-Implementierung.' },
      { question: 'Was unterscheidet den Abu Dhabi Markt von Dubai?', answer: 'Abu Dhabi ist stärker vom Regierungssektor, Öl & Gas und kulturellen Institutionen geprägt. Die Anforderungen sind oft formeller und langfristiger orientiert.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Websites für das ganze UAE.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Webdesign VAE', description: 'Für alle sieben Emirate.', href: '/webdesign-vae' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Sichtbarkeit auf Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere Pakete für Abu Dhabi',
      pricingDescription: 'Professionelle Webentwicklung für die Hauptstadt.',
      process: 'Unser Prozess',
      processDescription: 'Strukturiert und auf höchste Standards ausgerichtet.',
      technologies: 'Technologien',
      technologiesDescription: 'Enterprise-Technologien mit Middle East Hosting.',
      faq: 'Häufige Fragen zu Webentwicklung Abu Dhabi',
      relatedServices: 'Weitere Services',
      ctaTitle: 'Bereit für Ihr Projekt in Abu Dhabi?',
      ctaDescription: 'Lassen Sie uns persönlich in Abu Dhabi oder Dubai treffen.',
      ctaButton: 'Projekt anfragen',
    },
  },
  ru: {
    meta: {
      title: 'Веб-разработка Абу-Даби · Экспертиза столицы | GoldenWing',
      description: 'Веб-разработка для Абу-Даби. Кастомные веб-приложения, порталы и платформы для правительства и бизнеса в столице ОАЭ.',
      keywords: ['веб-разработка абу-даби', 'web development abu dhabi', 'сайт абу-даби'],
    },
    hero: {
      badge: 'Веб-разработка для Абу-Даби',
      title: 'Веб-разработка Абу-Даби',
      description: 'Профессиональная веб-разработка для столицы ОАЭ. Из нашего офиса в Дубае мы обслуживаем компании, государственные проекты и фирмы ADGM в Абу-Даби.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Дубае' },
      { icon: 'star', text: 'Опыт работы с госсектором' },
      { icon: 'clock', text: 'Экспертиза ADGM' },
    ],
    benefits: [
      { icon: 'zap', title: 'Экспертиза столицы', description: 'Понимание рынка Абу-Даби и его особенностей' },
      { icon: 'shield', title: 'Готовность к госзаказам', description: 'Доступность и стандарты безопасности' },
      { icon: 'users', title: 'Двуязычность', description: 'Полноценные AR/EN сайты с RTL' },
      { icon: 'star', title: 'Регулярные встречи', description: 'Всего 1,5 часа от нашего офиса в Дубае' },
    ],
    packages: [
      { name: 'Business', price: '6 000', description: 'Для компаний', popular: false, features: ['До 12 страниц', 'Адаптивный дизайн', 'Интеграция CMS', 'Опция EN/AR', 'Основы SEO', 'SSL и безопасность'] },
      { name: 'Professional', price: '12 000', description: 'Для ADGM и компаний', popular: true, features: ['До 25 страниц', 'Кастомная разработка', 'Двуязычный (EN/AR)', 'Опция клиентского портала', 'API-интеграции', 'Оптимизация производительности', 'Настройка аналитики', '12 месяцев поддержки'] },
      { name: 'Government', price: '25 000+', description: 'Для государственных проектов', popular: false, features: ['Неограниченное количество страниц', 'Высшая доступность', 'Аудит безопасности', 'WCAG 2.1 AA', 'Нагрузочное тестирование', 'Выделенная команда', 'Гарантии SLA', 'Контракт на обслуживание'] },
    ],
    process: [
      { step: '01', title: 'Встреча', description: 'Личная встреча в Абу-Даби или Дубае.' },
      { step: '02', title: 'Требования', description: 'Детальный анализ ваших потребностей.' },
      { step: '03', title: 'Разработка', description: 'Профессиональная реализация по высшим стандартам.' },
      { step: '04', title: 'Тестирование', description: 'Тщательное тестирование включая доступность.' },
      { step: '05', title: 'Запуск', description: 'Запуск и постоянная поддержка.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'Node.js', 'AWS Middle East', 'Azure UAE', 'PostgreSQL'],
    faqs: [
      { question: 'Обслуживаете ли вы клиентов в Абу-Даби из Дубая?', answer: 'Да, Абу-Даби находится всего в 1,5 часах от нашего офиса в Дубае. Мы регулярно обслуживаем клиентов в столице, включая личные встречи.' },
      { question: 'Есть ли у вас опыт работы с государственным сектором в Абу-Даби?', answer: 'Мы понимаем требования к веб-сайтам и порталам в государственном секторе, включая доступность, безопасность и стандарты соответствия.' },
      { question: 'Разрабатываете ли вы для Abu Dhabi Global Market (ADGM)?', answer: 'Да, у нас есть опыт работы с финансовыми компаниями и компаниями профессиональных услуг в ADGM, и мы понимаем их специфические требования.' },
      { question: 'Можете ли вы разработать многоязычные порталы для Абу-Даби?', answer: 'Безусловно. Проекты, связанные с правительством, часто требуют арабский и английский языки. Мы разрабатываем полностью двуязычные решения с правильной реализацией RTL.' },
      { question: 'Чем отличается рынок Абу-Даби от Дубая?', answer: 'Абу-Даби больше ориентирован на государственный сектор, нефть и газ, а также культурные учреждения. Требования часто более формальные и долгосрочные.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Сайты для всех ОАЭ.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Веб-дизайн ОАЭ', description: 'Для всех семи эмиратов.', href: '/webdesign-vae' as StaticAppPathname },
      { title: 'SEO Дубай', description: 'Видимость на Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши пакеты для Абу-Даби',
      pricingDescription: 'Профессиональная веб-разработка для столицы.',
      process: 'Наш процесс',
      processDescription: 'Структурированный и ориентированный на высшие стандарты.',
      technologies: 'Технологии',
      technologiesDescription: 'Корпоративные технологии с хостингом на Ближнем Востоке.',
      faq: 'Часто задаваемые вопросы о веб-разработке в Абу-Даби',
      relatedServices: 'Другие услуги',
      ctaTitle: 'Готовы к вашему проекту в Абу-Даби?',
      ctaDescription: 'Давайте встретимся лично в Абу-Даби или Дубае.',
      ctaButton: 'Запросить проект',
    },
  },
  en: {
    meta: {
      title: 'Web Development Abu Dhabi · Capital City Expertise | GoldenWing',
      description: 'Web development for Abu Dhabi. Custom web apps, portals & platforms for government & businesses in the UAE capital.',
      keywords: ['web development abu dhabi', 'website abu dhabi', 'web agency abu dhabi'],
    },
    hero: {
      badge: 'Web Development for Abu Dhabi',
      title: 'Web Development Abu Dhabi',
      description: 'Professional web development for the UAE capital. From our Dubai office, we serve businesses, government projects, and ADGM companies in Abu Dhabi.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Dubai Office' },
      { icon: 'star', text: 'Government Experience' },
      { icon: 'clock', text: 'ADGM Expertise' },
    ],
    benefits: [
      { icon: 'zap', title: 'Capital Expertise', description: 'Understanding Abu Dhabi market and its specifics' },
      { icon: 'shield', title: 'Government-Ready', description: 'Accessibility and security standards' },
      { icon: 'users', title: 'Bilingual', description: 'Complete AR/EN websites with RTL' },
      { icon: 'star', title: 'Regular Meetings', description: 'Only 1.5h from our Dubai office' },
    ],
    packages: [
      { name: 'Business', price: '6,000', description: 'For businesses', popular: false, features: ['Up to 12 pages', 'Responsive design', 'CMS integration', 'EN/AR option', 'SEO basics', 'SSL & security'] },
      { name: 'Professional', price: '12,000', description: 'For ADGM & companies', popular: true, features: ['Up to 25 pages', 'Custom development', 'Bilingual (EN/AR)', 'Customer portal option', 'API integrations', 'Performance optimization', 'Analytics setup', '12 months support'] },
      { name: 'Government', price: '25,000+', description: 'For public projects', popular: false, features: ['Unlimited pages', 'Highest accessibility', 'Security audit', 'WCAG 2.1 AA', 'Load testing', 'Dedicated team', 'SLA guarantees', 'Maintenance contract'] },
    ],
    process: [
      { step: '01', title: 'Meeting', description: 'Personal meeting in Abu Dhabi or Dubai.' },
      { step: '02', title: 'Requirements', description: 'Detailed analysis of your needs.' },
      { step: '03', title: 'Development', description: 'Professional implementation to highest standards.' },
      { step: '04', title: 'Testing', description: 'Thorough testing including accessibility.' },
      { step: '05', title: 'Launch', description: 'Go-live and ongoing support.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'Node.js', 'AWS Middle East', 'Azure UAE', 'PostgreSQL'],
    faqs: [
      { question: 'Do you serve clients in Abu Dhabi from Dubai?', answer: 'Yes, Abu Dhabi is only 1.5 hours from our Dubai office. We regularly serve clients in the capital, including in-person meetings.' },
      { question: 'Do you have experience with the government sector in Abu Dhabi?', answer: 'We understand the requirements for websites and portals in the public sector, including accessibility, security, and compliance standards.' },
      { question: 'Do you develop for Abu Dhabi Global Market (ADGM)?', answer: 'Yes, we have experience with financial and professional services companies in ADGM and understand their specific requirements.' },
      { question: 'Can you develop multilingual portals for Abu Dhabi?', answer: 'Absolutely. Government-related projects often require Arabic and English. We develop fully bilingual solutions with correct RTL implementation.' },
      { question: 'What differentiates the Abu Dhabi market from Dubai?', answer: 'Abu Dhabi is more shaped by the government sector, oil & gas, and cultural institutions. Requirements are often more formal and long-term oriented.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Websites for all UAE.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Web Design UAE', description: 'For all seven Emirates.', href: '/webdesign-vae' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Visibility on Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our Packages for Abu Dhabi',
      pricingDescription: 'Professional web development for the capital.',
      process: 'Our Process',
      processDescription: 'Structured and focused on highest standards.',
      technologies: 'Technologies',
      technologiesDescription: 'Enterprise technologies with Middle East hosting.',
      faq: 'Frequently Asked Questions about Web Development Abu Dhabi',
      relatedServices: 'More Services',
      ctaTitle: 'Ready for Your Project in Abu Dhabi?',
      ctaDescription: 'Let\'s meet in person in Abu Dhabi or Dubai.',
      ctaButton: 'Request Project',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/webentwicklung-abu-dhabi', locale),
      siteName: 'GoldenWing Creative Studios',
      type: 'website',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/webentwicklung-abu-dhabi', locale),
      languages: getHreflangAlternates('/webentwicklung-abu-dhabi').languages,
    },
  }
}

export default async function WebentwicklungAbuDhabiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']

  const landingPageData: RegionalLandingPageData = {
    locale,
    hero: data.hero,
    trustSignals: data.trustSignals,
    benefits: data.benefits,
    packages: data.packages,
    process: data.process,
    technologies: data.technologies,
    faqs: data.faqs,
    relatedServices: data.relatedServices,
    sectionTitles: data.sectionTitles,
    schema: {
      serviceName: { de: 'Webentwicklung Abu Dhabi', en: 'Web Development Abu Dhabi', ru: 'Веб-разработка Абу-Даби' }[locale] ?? 'Web Development Abu Dhabi',
      serviceUrl: 'https://goldenwing.at/webentwicklung-abu-dhabi',
      areaServed: { type: 'City', name: 'Abu Dhabi' },
      description: data.meta.description,
      localBusiness: {
        name: 'GoldenWing Creative Studios Dubai',
        address: 'DAMAC Executive Bay Tower B, Office 1406, 14th Floor, Business Bay',
        city: 'Dubai',
        country: 'AE',
        phone: '+971 58 514 4360',
        latitude: 25.1783747,
        longitude: 55.2615882,
      },
      breadcrumbs: [
        { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
        { name: { de: 'Webentwicklung Abu Dhabi', en: 'Web Development Abu Dhabi', ru: 'Веб-разработка Абу-Даби' }[locale] ?? 'Web Development Abu Dhabi', url: { de: 'https://goldenwing.at/webentwicklung-abu-dhabi', en: 'https://goldenwing.at/en/web-development-abu-dhabi', ru: 'https://goldenwing.at/ru/web-development-abu-dhabi' }[locale] ?? 'https://goldenwing.at/en/web-development-abu-dhabi' },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
