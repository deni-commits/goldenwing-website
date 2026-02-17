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
      title: 'Webdesign VAE · Für Unternehmen in den Emiraten | GoldenWing',
      description: 'Webdesign für die Vereinigten Arabischen Emirate. Von Dubai aus betreuen wir Abu Dhabi, Sharjah & alle Emirates.',
      keywords: ['webdesign vae', 'webdesign emirate', 'website uae'],
    },
    hero: {
      badge: 'Webdesign Agentur für die VAE',
      title: 'Webdesign VAE',
      description: 'Websites für Unternehmen in allen sieben Emiraten. Von unserem Büro in Dubai aus betreuen wir Dubai, Abu Dhabi, Sharjah und alle weiteren Emirates.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Büro in Dubai' },
      { icon: 'star', text: 'Alle 7 Emirate' },
      { icon: 'clock', text: 'Lokales Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Lokale Präsenz', description: 'Unser Büro in Business Bay für persönliche Meetings' },
      { icon: 'shield', title: 'Alle Emirate', description: 'Dubai, Abu Dhabi, Sharjah, Ajman, UAQ, RAK, Fujairah' },
      { icon: 'users', title: 'Free Zone Expertise', description: 'Erfahrung mit DMCC, DIFC, JAFZA und anderen' },
      { icon: 'star', title: 'Zweisprachig', description: 'Websites in Englisch und Arabisch (RTL)' },
    ],
    packages: [
      { name: 'Business', price: '4.000', description: 'Für lokale Unternehmen', popular: false, features: ['Bis zu 8 Seiten', 'Responsive Design', 'EN/AR Option', 'SEO für Google.ae', 'SSL-Zertifikat', 'VAE-Hosting'] },
      { name: 'Premium', price: '8.000', description: 'Für wachsende Unternehmen', popular: true, features: ['Bis zu 15 Seiten', 'CMS zur Selbstbearbeitung', 'Zweisprachig (EN/AR)', 'RTL-Support', 'Google My Business', 'Social Media Integration', 'Premium Support', '12 Monate Wartung'] },
      { name: 'Enterprise', price: '15.000+', description: 'Für Großunternehmen', popular: false, features: ['Unbegrenzte Seiten', 'Custom Development', 'Multi-Language', 'E-Commerce', 'API-Integrationen', 'Gov-Compliance', 'Dediziertes Team', '24/7 Support'] },
    ],
    process: [
      { step: '01', title: 'Vor-Ort-Meeting', description: 'Persönliches Treffen in unserem Dubai-Büro.' },
      { step: '02', title: 'Konzept & Design', description: 'Kulturell angepasstes Design für den lokalen Markt.' },
      { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit RTL-Support.' },
      { step: '04', title: 'Testing & Launch', description: 'Gründliche Tests und Go-Live.' },
      { step: '05', title: 'Support', description: 'Lokaler Support in Dubai.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Shopify', 'AWS Middle East', 'Cloudflare'],
    faqs: [
      { question: 'Betreut ihr alle Emirate oder nur Dubai?', answer: 'Wir betreuen Unternehmen in allen sieben Emiraten: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah und Fujairah. Unser Büro in Dubai ist der Ausgangspunkt.' },
      { question: 'Versteht ihr die unterschiedlichen Märkte in den VAE?', answer: 'Ja, jedes Emirat hat seine Besonderheiten: Dubai ist international und geschäftsorientiert, Abu Dhabi hat den Regierungssektor, Sharjah ist konservativer. Wir passen Designs entsprechend an.' },
      { question: 'Bietet ihr auch Websites für Free Zones an?', answer: 'Absolut. Viele unserer Kunden sind in Free Zones wie DMCC, DIFC, oder JAFZA ansässig. Wir verstehen die Bedürfnisse von Free Zone-Unternehmen.' },
      { question: 'Wie steht es um Hosting in den VAE?', answer: 'Wir können Hosting sowohl auf europäischen als auch auf UAE-basierten Servern anbieten, je nach Ihren Anforderungen bezüglich Latenz und Datenlokalisierung.' },
      { question: 'Erstellt ihr auch Government-konforme Websites?', answer: 'Ja, wir kennen die Anforderungen für Websites, die mit Regierungsstellen interagieren, einschließlich Barrierefreiheit und Sicherheitsstandards.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Speziell für Unternehmen in Dubai.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Suchmaschinenoptimierung für Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Markenentwicklung für den Golfmarkt.', href: '/branding-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere VAE-Pakete',
      pricingDescription: 'Preise in EUR, Zahlung in AED möglich. Lokaler Support inklusive.',
      process: 'Unser Prozess in den VAE',
      processDescription: 'Lokale Präsenz, persönlicher Service – so arbeiten wir in den Emiraten.',
      technologies: 'Technologien',
      technologiesDescription: 'Moderne Technologien mit Hosting im Middle East für beste Performance.',
      faq: 'Häufige Fragen zu Webdesign VAE',
      relatedServices: 'Weitere Services in den Emiraten',
      ctaTitle: 'Bereit für Ihre Website in den VAE?',
      ctaDescription: 'Besuchen Sie uns in Business Bay oder vereinbaren Sie einen Video-Call.',
      ctaButton: 'Termin vereinbaren',
    },
  },
  en: {
    meta: {
      title: 'Web Design UAE · For Businesses in the Emirates | GoldenWing',
      description: 'Web design for the United Arab Emirates. Based in Dubai, we serve Abu Dhabi, Sharjah & all Emirates. Award-winning designs.',
      keywords: ['web design uae', 'web design emirates', 'website uae'],
    },
    hero: {
      badge: 'Web Design Agency for UAE',
      title: 'Web Design UAE',
      description: 'Websites for businesses in all seven Emirates. From our Dubai office, we serve Dubai, Abu Dhabi, Sharjah, and all other Emirates.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Office in Dubai' },
      { icon: 'star', text: 'All 7 Emirates' },
      { icon: 'clock', text: 'Local Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Local Presence', description: 'Our office in Business Bay for personal meetings' },
      { icon: 'shield', title: 'All Emirates', description: 'Dubai, Abu Dhabi, Sharjah, Ajman, UAQ, RAK, Fujairah' },
      { icon: 'users', title: 'Free Zone Expertise', description: 'Experience with DMCC, DIFC, JAFZA and others' },
      { icon: 'star', title: 'Bilingual', description: 'Websites in English and Arabic (RTL)' },
    ],
    packages: [
      { name: 'Business', price: '4,000', description: 'For local businesses', popular: false, features: ['Up to 8 pages', 'Responsive design', 'EN/AR option', 'SEO for Google.ae', 'SSL certificate', 'UAE hosting'] },
      { name: 'Premium', price: '8,000', description: 'For growing businesses', popular: true, features: ['Up to 15 pages', 'CMS for self-editing', 'Bilingual (EN/AR)', 'RTL support', 'Google My Business', 'Social media integration', 'Premium support', '12 months maintenance'] },
      { name: 'Enterprise', price: '15,000+', description: 'For large enterprises', popular: false, features: ['Unlimited pages', 'Custom development', 'Multi-language', 'E-commerce', 'API integrations', 'Gov compliance', 'Dedicated team', '24/7 support'] },
    ],
    process: [
      { step: '01', title: 'On-site Meeting', description: 'Personal meeting at our Dubai office.' },
      { step: '02', title: 'Concept & Design', description: 'Culturally adapted design for the local market.' },
      { step: '03', title: 'Development', description: 'Professional implementation with RTL support.' },
      { step: '04', title: 'Testing & Launch', description: 'Thorough testing and go-live.' },
      { step: '05', title: 'Support', description: 'Local support in Dubai.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Shopify', 'AWS Middle East', 'Cloudflare'],
    faqs: [
      { question: 'Do you serve all Emirates or just Dubai?', answer: 'We serve businesses in all seven Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah. Our Dubai office is the starting point.' },
      { question: 'Do you understand the different markets in the UAE?', answer: 'Yes, each Emirate has its specifics: Dubai is international and business-oriented, Abu Dhabi has the government sector, Sharjah is more conservative. We adapt designs accordingly.' },
      { question: 'Do you also offer websites for Free Zones?', answer: 'Absolutely. Many of our clients are based in Free Zones like DMCC, DIFC, or JAFZA. We understand the needs of Free Zone companies.' },
      { question: 'What about hosting in the UAE?', answer: 'We can offer hosting on both European and UAE-based servers, depending on your requirements regarding latency and data localization.' },
      { question: 'Do you create government-compliant websites?', answer: 'Yes, we know the requirements for websites that interact with government entities, including accessibility and security standards.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Specifically for Dubai businesses.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Search engine optimization for Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Brand development for the Gulf market.', href: '/branding-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our UAE Packages',
      pricingDescription: 'Prices in EUR, payment in AED possible. Local support included.',
      process: 'Our Process in the UAE',
      processDescription: 'Local presence, personal service – this is how we work in the Emirates.',
      technologies: 'Technologies',
      technologiesDescription: 'Modern technologies with Middle East hosting for best performance.',
      faq: 'Frequently Asked Questions about Web Design UAE',
      relatedServices: 'More Services in the Emirates',
      ctaTitle: 'Ready for Your Website in the UAE?',
      ctaDescription: 'Visit us in Business Bay or schedule a video call.',
      ctaButton: 'Schedule Meeting',
    },
  },
  ru: {
    meta: {
      title: 'Веб-дизайн ОАЭ · Для компаний в Эмиратах | GoldenWing',
      description: 'Веб-дизайн для Объединенных Арабских Эмиратов. Из Дубая обслуживаем Абу-Даби, Шарджу и все Эмираты.',
      keywords: ['веб-дизайн оаэ', 'веб-дизайн эмираты', 'сайт оаэ'],
    },
    hero: {
      badge: 'Агентство веб-дизайна для ОАЭ',
      title: 'Веб-дизайн ОАЭ',
      description: 'Сайты для компаний во всех семи Эмиратах. Из нашего офиса в Дубае обслуживаем Дубай, Абу-Даби, Шарджу и все остальные Эмираты.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Дубае' },
      { icon: 'star', text: 'Все 7 Эмиратов' },
      { icon: 'clock', text: 'Местная команда' },
    ],
    benefits: [
      { icon: 'zap', title: 'Местное присутствие', description: 'Наш офис в Business Bay для личных встреч' },
      { icon: 'shield', title: 'Все Эмираты', description: 'Дубай, Абу-Даби, Шарджа, Аджман, УАК, РАК, Фуджейра' },
      { icon: 'users', title: 'Экспертиза Free Zone', description: 'Опыт работы с DMCC, DIFC, JAFZA и другими' },
      { icon: 'star', title: 'Двуязычность', description: 'Сайты на английском и арабском (RTL)' },
    ],
    packages: [
      { name: 'Business', price: '4 000', description: 'Для местного бизнеса', popular: false, features: ['До 8 страниц', 'Адаптивный дизайн', 'Опция EN/AR', 'SEO для Google.ae', 'SSL-сертификат', 'Хостинг в ОАЭ'] },
      { name: 'Premium', price: '8 000', description: 'Для растущих компаний', popular: true, features: ['До 15 страниц', 'CMS для самостоятельного редактирования', 'Двуязычный (EN/AR)', 'RTL-поддержка', 'Google My Business', 'Интеграция соцсетей', 'Премиум-поддержка', '12 месяцев обслуживания'] },
      { name: 'Enterprise', price: '15 000+', description: 'Для крупных предприятий', popular: false, features: ['Неограниченное количество страниц', 'Индивидуальная разработка', 'Мультиязычность', 'E-commerce', 'API-интеграции', 'Соответствие гос. требованиям', 'Выделенная команда', 'Поддержка 24/7'] },
    ],
    process: [
      { step: '01', title: 'Личная встреча', description: 'Персональная встреча в нашем офисе в Дубае.' },
      { step: '02', title: 'Концепция и дизайн', description: 'Культурно адаптированный дизайн для местного рынка.' },
      { step: '03', title: 'Разработка', description: 'Профессиональная реализация с поддержкой RTL.' },
      { step: '04', title: 'Тестирование и запуск', description: 'Тщательное тестирование и запуск.' },
      { step: '05', title: 'Поддержка', description: 'Локальная поддержка в Дубае.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Shopify', 'AWS Middle East', 'Cloudflare'],
    faqs: [
      { question: 'Вы обслуживаете все Эмираты или только Дубай?', answer: 'Мы обслуживаем компании во всех семи Эмиратах: Дубай, Абу-Даби, Шарджа, Аджман, Умм-эль-Кайвайн, Рас-эль-Хайма и Фуджейра. Наш офис в Дубае является отправной точкой.' },
      { question: 'Вы понимаете различия рынков в ОАЭ?', answer: 'Да, каждый Эмират имеет свои особенности: Дубай международный и ориентирован на бизнес, Абу-Даби представляет государственный сектор, Шарджа более консервативна. Мы адаптируем дизайн соответственно.' },
      { question: 'Вы также предлагаете сайты для Free Zones?', answer: 'Безусловно. Многие наши клиенты расположены в Free Zones, таких как DMCC, DIFC или JAFZA. Мы понимаем потребности компаний в свободных зонах.' },
      { question: 'Как насчет хостинга в ОАЭ?', answer: 'Мы можем предложить хостинг как на европейских, так и на серверах в ОАЭ, в зависимости от ваших требований к задержке и локализации данных.' },
      { question: 'Вы создаете сайты, соответствующие государственным требованиям?', answer: 'Да, мы знаем требования к сайтам, которые взаимодействуют с государственными органами, включая стандарты доступности и безопасности.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Специально для компаний в Дубае.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Дубай', description: 'Поисковая оптимизация для Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Брендинг Дубай', description: 'Развитие бренда для рынка Персидского залива.', href: '/branding-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши пакеты для ОАЭ',
      pricingDescription: 'Цены в EUR, оплата в AED возможна. Локальная поддержка включена.',
      process: 'Наш процесс в ОАЭ',
      processDescription: 'Местное присутствие, персональный сервис – так мы работаем в Эмиратах.',
      technologies: 'Технологии',
      technologiesDescription: 'Современные технологии с хостингом на Ближнем Востоке для лучшей производительности.',
      faq: 'Часто задаваемые вопросы о веб-дизайне ОАЭ',
      relatedServices: 'Другие услуги в Эмиратах',
      ctaTitle: 'Готовы к вашему сайту в ОАЭ?',
      ctaDescription: 'Посетите нас в Business Bay или запланируйте видеозвонок.',
      ctaButton: 'Назначить встречу',
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
      url: getCanonicalUrl('/webdesign-vae', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Webdesign VAE' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/webdesign-vae', locale),
      languages: getHreflangAlternates('/webdesign-vae').languages,
    },
  }
}

export default async function WebdesignVaePage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'Webdesign VAE', en: 'Web Design UAE', ru: 'Веб-дизайн ОАЭ' }[locale],
      serviceUrl: 'https://goldenwing.at/webdesign-vae',
      areaServed: { type: 'Country', name: 'United Arab Emirates' },
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
        { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: 'https://goldenwing.at' },
        { name: { de: 'Webdesign VAE', en: 'Web Design UAE', ru: 'Веб-дизайн ОАЭ' }[locale], url: { de: 'https://goldenwing.at/webdesign-vae', en: 'https://goldenwing.at/en/web-design-uae', ru: 'https://goldenwing.at/ru/web-design-uae' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
