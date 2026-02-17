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
      title: 'Webdesign Dubai · Europäische Agentur in den VAE | GoldenWing',
      description: 'Webdesign-Agentur in Dubai. Europäische Qualität trifft Middle East. Wir erstellen Websites für Unternehmen in Dubai & den VAE.',
      keywords: ['webdesign dubai', 'webagentur dubai', 'website dubai'],
    },
    hero: {
      badge: 'Webdesign Agentur in Dubai',
      title: 'Webdesign Dubai',
      description: 'Europäische Kreativität trifft auf den dynamischen Dubai-Markt. Unser Team vor Ort in Business Bay erstellt erstklassige Websites für Unternehmen in den VAE.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Büro in Business Bay' },
      { icon: 'star', text: 'Europäische Qualität' },
      { icon: 'clock', text: 'Lokales Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Lokale Präsenz', description: 'Unser Büro in Business Bay – direkt bei Ihnen vor Ort' },
      { icon: 'shield', title: 'Kulturelles Know-how', description: 'Wir verstehen den arabischen Markt und seine Feinheiten' },
      { icon: 'users', title: 'Zweisprachig', description: 'Websites in Englisch und Arabisch (RTL)' },
      { icon: 'star', title: 'Premium-Design', description: 'Luxuriöse Designs für den anspruchsvollen Dubai-Markt' },
    ],
    packages: [
      { name: 'Business', price: '4.000', description: 'Für lokale Unternehmen', popular: false, features: ['Bis zu 8 Seiten', 'Responsive Design', 'Englisch/Arabisch Option', 'SEO für Google.ae', 'SSL-Zertifikat', 'VAE-Hosting'] },
      { name: 'Premium', price: '8.000', description: 'Für anspruchsvolle Marken', popular: true, features: ['Bis zu 15 Seiten', 'CMS zur Selbstbearbeitung', 'Zweisprachig (EN/AR)', 'RTL-Support', 'Google My Business', 'Social Media Integration', 'Premium Support', '12 Monate Wartung'] },
      { name: 'Enterprise', price: '15.000+', description: 'Maßgeschneidert für Konzerne', popular: false, features: ['Unbegrenzte Seiten', 'Individuelle Entwicklung', 'E-Commerce Integration', 'Multi-Language (EN/AR/DE)', 'API-Integrationen', 'Performance Optimierung', 'Dediziertes Team', '24/7 Support'] },
    ],
    process: [
      { step: '01', title: 'Vor-Ort-Meeting', description: 'Persönliches Treffen in unserem Dubai-Büro.' },
      { step: '02', title: 'Konzept & Design', description: 'Kulturell sensibles Design für den lokalen Markt.' },
      { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit RTL-Support.' },
      { step: '04', title: 'Testing & Launch', description: 'Gründliche Tests und Go-Live.' },
      { step: '05', title: 'Support', description: 'Lokaler Support in Dubai und Wien.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Shopify', 'AWS Middle East', 'Cloudflare'],
    faqs: [
      { question: 'Habt ihr wirklich ein Büro in Dubai?', answer: 'Ja, wir sind im DAMAC Executive Bay Tower B, Office 1406 im Business Bay ansässig. Sie können uns gerne vor Ort besuchen.' },
      { question: 'Versteht ihr die kulturellen Besonderheiten des arabischen Marktes?', answer: 'Absolut. Wir kennen die kulturellen Nuancen und erstellen Designs, die respektvoll und ansprechend für die lokale Zielgruppe sind.' },
      { question: 'Könnt ihr auch arabische Websites (RTL) erstellen?', answer: 'Ja, wir entwickeln zweisprachige Websites mit korrekter Right-to-Left (RTL) Darstellung für Arabisch.' },
      { question: 'Wie sind eure Arbeitszeiten in Dubai?', answer: 'Unser Dubai-Team arbeitet Sonntag bis Donnerstag, 9-18 Uhr GST. Damit sind wir sowohl für europäische als auch lokale Kunden erreichbar.' },
      { question: 'Welche Branchen bedient ihr in Dubai hauptsächlich?', answer: 'Wir arbeiten mit Immobilien, Hospitality, E-Commerce, Professional Services und Tech-Startups in den VAE.' },
    ],
    relatedServices: [
      { title: 'SEO Agentur Dubai', description: 'Suchmaschinenoptimierung für Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Markenentwicklung für den Golfmarkt.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'E-Commerce', description: 'Online-Shops für den VAE-Markt.', href: '/leistungen/webdesign' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere Dubai-Pakete',
      pricingDescription: 'Preise in EUR, Zahlung auch in AED möglich. Alle Pakete inklusive lokalem Support.',
      process: 'Unser Prozess in Dubai',
      processDescription: 'Lokale Präsenz, persönlicher Service – so arbeiten wir in den VAE.',
      technologies: 'Technologien',
      technologiesDescription: 'Moderne Technologien mit Hosting im Middle East für beste Performance.',
      faq: 'Häufige Fragen zu Webdesign Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für Ihre Website in Dubai?',
      ctaDescription: 'Besuchen Sie uns in Business Bay oder vereinbaren Sie einen Video-Call.',
      ctaButton: 'Termin vereinbaren',
    },
  },
  en: {
    meta: {
      title: 'Web Design Dubai · European Agency in UAE | GoldenWing',
      description: 'Web design agency in Dubai. European quality meets Middle East. We create stunning websites for businesses in Dubai & the UAE.',
      keywords: ['web design dubai', 'web agency dubai', 'website design dubai', 'web designer dubai'],
    },
    hero: {
      badge: 'Web Design Agency in Dubai',
      title: 'Web Design Dubai',
      description: 'European creativity meets the dynamic Dubai market. Our on-site team in Business Bay creates world-class websites for businesses in the UAE.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Office in Business Bay' },
      { icon: 'star', text: 'European Quality' },
      { icon: 'clock', text: 'Local Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Local Presence', description: 'Our office in Business Bay – right where you are' },
      { icon: 'shield', title: 'Cultural Know-how', description: 'We understand the Arabian market and its nuances' },
      { icon: 'users', title: 'Bilingual', description: 'Websites in English and Arabic (RTL)' },
      { icon: 'star', title: 'Premium Design', description: 'Luxurious designs for the demanding Dubai market' },
    ],
    packages: [
      { name: 'Business', price: '4,000', description: 'For local businesses', popular: false, features: ['Up to 8 pages', 'Responsive design', 'English/Arabic option', 'SEO for Google.ae', 'SSL certificate', 'UAE hosting'] },
      { name: 'Premium', price: '8,000', description: 'For premium brands', popular: true, features: ['Up to 15 pages', 'CMS for self-editing', 'Bilingual (EN/AR)', 'RTL support', 'Google My Business', 'Social media integration', 'Premium support', '12 months maintenance'] },
      { name: 'Enterprise', price: '15,000+', description: 'Tailored for enterprises', popular: false, features: ['Unlimited pages', 'Custom development', 'E-commerce integration', 'Multi-language (EN/AR/DE)', 'API integrations', 'Performance optimization', 'Dedicated team', '24/7 support'] },
    ],
    process: [
      { step: '01', title: 'On-site Meeting', description: 'Personal meeting at our Dubai office.' },
      { step: '02', title: 'Concept & Design', description: 'Culturally sensitive design for the local market.' },
      { step: '03', title: 'Development', description: 'Professional implementation with RTL support.' },
      { step: '04', title: 'Testing & Launch', description: 'Thorough testing and go-live.' },
      { step: '05', title: 'Support', description: 'Local support in Dubai and Vienna.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Shopify', 'AWS Middle East', 'Cloudflare'],
    faqs: [
      { question: 'Do you really have an office in Dubai?', answer: "Yes, we're located in DAMAC Executive Bay Tower B, Office 1406 in Business Bay. You're welcome to visit us on-site." },
      { question: 'Do you understand the cultural specifics of the Arabian market?', answer: 'Absolutely. We know the cultural nuances and create designs that are respectful and appealing to the local audience.' },
      { question: 'Can you create Arabic websites (RTL)?', answer: 'Yes, we develop bilingual websites with correct Right-to-Left (RTL) display for Arabic content.' },
      { question: 'What are your working hours in Dubai?', answer: "Our Dubai team works Sunday to Thursday, 9 AM - 6 PM GST. This makes us available for both European and local clients." },
      { question: 'Which industries do you mainly serve in Dubai?', answer: 'We work with real estate, hospitality, e-commerce, professional services, and tech startups in the UAE.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Dubai', description: 'Search engine optimization for Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Brand development for the Gulf market.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'E-Commerce', description: 'Online shops for the UAE market.', href: '/leistungen/webdesign' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our Dubai Packages',
      pricingDescription: 'Prices in EUR, payment in AED also possible. All packages include local support.',
      process: 'Our Process in Dubai',
      processDescription: 'Local presence, personal service – this is how we work in the UAE.',
      technologies: 'Technologies',
      technologiesDescription: 'Modern technologies with Middle East hosting for best performance.',
      faq: 'Frequently Asked Questions about Web Design Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for Your Website in Dubai?',
      ctaDescription: 'Visit us in Business Bay or schedule a video call.',
      ctaButton: 'Schedule Meeting',
    },
  },
  ru: {
    meta: {
      title: 'Веб-дизайн Дубай · Европейское агентство в ОАЭ | GoldenWing',
      description: 'Агентство веб-дизайна в Дубае. Европейское качество на Ближнем Востоке. Создаем сайты для компаний в Дубае и ОАЭ.',
      keywords: ['веб-дизайн дубай', 'веб-агентство дубай', 'создание сайта дубай', 'веб-дизайнер дубай'],
    },
    hero: {
      badge: 'Агентство веб-дизайна в Дубае',
      title: 'Веб-дизайн Дубай',
      description: 'Европейский креатив встречается с динамичным рынком Дубая. Наша команда в Business Bay создает первоклассные сайты для компаний в ОАЭ.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Business Bay' },
      { icon: 'star', text: 'Европейское качество' },
      { icon: 'clock', text: 'Локальная команда' },
    ],
    benefits: [
      { icon: 'zap', title: 'Локальное присутствие', description: 'Наш офис в Business Bay — прямо рядом с вами' },
      { icon: 'shield', title: 'Культурная экспертиза', description: 'Мы понимаем арабский рынок и его особенности' },
      { icon: 'users', title: 'Двуязычность', description: 'Сайты на английском и арабском (RTL)' },
      { icon: 'star', title: 'Премиум-дизайн', description: 'Роскошные дизайны для требовательного рынка Дубая' },
    ],
    packages: [
      { name: 'Business', price: '4 000', description: 'Для местных компаний', popular: false, features: ['До 8 страниц', 'Адаптивный дизайн', 'Опция английский/арабский', 'SEO для Google.ae', 'SSL-сертификат', 'Хостинг в ОАЭ'] },
      { name: 'Premium', price: '8 000', description: 'Для премиум-брендов', popular: true, features: ['До 15 страниц', 'CMS для самостоятельного редактирования', 'Двуязычный (EN/AR)', 'Поддержка RTL', 'Google My Business', 'Интеграция соцсетей', 'Премиум-поддержка', '12 месяцев обслуживания'] },
      { name: 'Enterprise', price: '15 000+', description: 'Индивидуально для корпораций', popular: false, features: ['Неограниченное количество страниц', 'Индивидуальная разработка', 'Интеграция e-commerce', 'Мультиязычность (EN/AR/DE)', 'Интеграции API', 'Оптимизация производительности', 'Выделенная команда', 'Поддержка 24/7'] },
    ],
    process: [
      { step: '01', title: 'Личная встреча', description: 'Персональная встреча в нашем офисе в Дубае.' },
      { step: '02', title: 'Концепция и дизайн', description: 'Культурно адаптированный дизайн для местного рынка.' },
      { step: '03', title: 'Разработка', description: 'Профессиональная реализация с поддержкой RTL.' },
      { step: '04', title: 'Тестирование и запуск', description: 'Тщательное тестирование и запуск.' },
      { step: '05', title: 'Поддержка', description: 'Локальная поддержка в Дубае и Вене.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Shopify', 'AWS Middle East', 'Cloudflare'],
    faqs: [
      { question: 'У вас действительно есть офис в Дубае?', answer: 'Да, мы расположены в DAMAC Executive Bay Tower B, Office 1406 в Business Bay. Вы можете посетить нас лично.' },
      { question: 'Вы понимаете культурные особенности арабского рынка?', answer: 'Абсолютно. Мы знаем культурные нюансы и создаем дизайны, которые уважительны и привлекательны для местной аудитории.' },
      { question: 'Можете ли вы создать арабские сайты (RTL)?', answer: 'Да, мы разрабатываем двуязычные сайты с корректным отображением Right-to-Left (RTL) для арабского контента.' },
      { question: 'Какой у вас график работы в Дубае?', answer: 'Наша команда в Дубае работает с воскресенья по четверг, 9:00-18:00 GST. Это позволяет нам быть доступными как для европейских, так и для местных клиентов.' },
      { question: 'Какие отрасли вы обслуживаете в Дубае?', answer: 'Мы работаем с недвижимостью, гостиничным бизнесом, e-commerce, профессиональными услугами и tech-стартапами в ОАЭ.' },
    ],
    relatedServices: [
      { title: 'SEO-агентство Дубай', description: 'Поисковая оптимизация для Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Брендинг Дубай', description: 'Развитие бренда для рынка Персидского залива.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'E-Commerce', description: 'Интернет-магазины для рынка ОАЭ.', href: '/leistungen/webdesign' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши пакеты для Дубая',
      pricingDescription: 'Цены в EUR, оплата в AED также возможна. Все пакеты включают локальную поддержку.',
      process: 'Наш процесс в Дубае',
      processDescription: 'Локальное присутствие, персональный сервис — так мы работаем в ОАЭ.',
      technologies: 'Технологии',
      technologiesDescription: 'Современные технологии с хостингом на Ближнем Востоке для лучшей производительности.',
      faq: 'Часто задаваемые вопросы о веб-дизайне в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к вашему сайту в Дубае?',
      ctaDescription: 'Посетите нас в Business Bay или запланируйте видеозвонок.',
      ctaButton: 'Записаться на встречу',
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
      url: getCanonicalUrl('/webdesign-dubai', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/webdesign-dubai', locale),
      languages: getHreflangAlternates('/webdesign-dubai').languages,
    },
  }
}

export default async function WebdesignDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'Webdesign Dubai', en: 'Web Design Dubai', ru: 'Веб-дизайн Дубай' }[locale],
      serviceUrl: 'https://goldenwing.at/webdesign-dubai',
      areaServed: { type: 'City', name: { de: 'Dubai', en: 'Dubai', ru: 'Дубай' }[locale] },
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
        { name: { de: 'Webdesign Dubai', en: 'Web Design Dubai', ru: 'Веб-дизайн Дубай' }[locale], url: { de: 'https://goldenwing.at/webdesign-dubai', en: 'https://goldenwing.at/en/web-design-dubai', ru: 'https://goldenwing.at/ru/web-design-dubai' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
