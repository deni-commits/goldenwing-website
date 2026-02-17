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
      title: 'Branding Agentur Dubai · Marken für den Golfmarkt | GoldenWing',
      description: 'Branding in Dubai. Wir entwickeln Markenidentitäten für den arabischen Markt. Kulturell sensibel, international erfolgreich.',
      keywords: ['branding agentur dubai', 'markenentwicklung dubai', 'corporate design dubai'],
    },
    hero: {
      badge: 'Branding Agentur in Dubai',
      title: 'Branding Agentur Dubai',
      description: 'Markenidentitäten für den anspruchsvollen Dubai-Markt. Wir verbinden europäisches Design-Know-how mit kulturellem Verständnis für den Golfmarkt.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Luxus-Erfahrung' },
      { icon: 'star', text: 'Kulturelle Expertise' },
      { icon: 'clock', text: 'Lokales Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Premium-Positionierung', description: 'Designs, die den hohen Ansprüchen des Dubai-Marktes entsprechen' },
      { icon: 'shield', title: 'Kulturelle Sensibilität', description: 'Respektvolles Design für den arabischen Markt' },
      { icon: 'users', title: 'Zweisprachige Logos', description: 'Markennamen in Latein und Arabisch' },
      { icon: 'star', title: 'Internationale Standards', description: 'Europäische Qualität für globale Märkte' },
    ],
    packages: [
      { name: 'Brand Essentials', price: '5.000', description: 'Für neue Unternehmen', popular: false, features: ['Logo Design', 'Farbpalette', 'Typografie-System', 'Visitenkarten', 'Briefpapier', 'Brand Guidelines (Basic)'] },
      { name: 'Brand Identity', price: '10.000', description: 'Für Premium-Marken', popular: true, features: ['Alles aus Essentials', 'Arabische Logo-Variante', 'Ausführliche Guidelines', 'Social Media Kit', 'Präsentationsvorlage', 'Signage-Design', 'Fotografie-Richtlinien', '3 Revisionsrunden'] },
      { name: 'Brand Experience', price: '20.000+', description: 'Für Luxusmarken', popular: false, features: ['Alles aus Identity', 'Markenstrategie', 'Brand Story', 'Interior-Design-Konzept', 'Packaging Design', 'Digital Brand Guidelines', 'Launch-Kampagne', 'Ongoing Support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Workshops zum Verständnis Ihrer Vision und Zielgruppe.' },
      { step: '02', title: 'Strategie', description: 'Positionierung und Markenstrategie für Dubai.' },
      { step: '03', title: 'Design', description: 'Kreative Exploration und Design-Entwicklung.' },
      { step: '04', title: 'Refinement', description: 'Feinschliff und Finalisierung aller Assets.' },
      { step: '05', title: 'Launch', description: 'Übergabe und Support beim Markenlaunch.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy Frameworks', 'Arabic Typography', 'Color Psychology', 'Cultural Research'],
    faqs: [
      { question: 'Versteht ihr Branding für den Luxusmarkt Dubai?', answer: 'Ja, Dubai ist bekannt für Luxus und Premium-Marken. Wir kreieren Markenidentitäten, die diesem Anspruch gerecht werden.' },
      { question: 'Könnt ihr kulturell sensible Marken entwickeln?', answer: 'Absolut. Wir verstehen die kulturellen Nuancen und entwickeln Marken, die respektvoll und dennoch modern sind.' },
      { question: 'Bietet ihr auch arabische Logo-Varianten an?', answer: 'Ja, wir erstellen zweisprachige Logos und Markenauftritte, die sowohl in lateinischer als auch arabischer Schrift funktionieren.' },
      { question: 'Wie geht ihr mit religiösen und kulturellen Sensibilitäten um?', answer: 'Mit größtem Respekt. Wir vermeiden kulturell unangemessene Symbole und Farben und beraten Sie entsprechend.' },
      { question: 'Habt ihr Erfahrung mit verschiedenen Branchen in den VAE?', answer: 'Ja, wir haben Erfahrung mit Immobilien, Hospitality, Retail, Professional Services und Tech in den VAE.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Websites passend zu Ihrer Marke.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Sichtbarkeit für Ihre Marke.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Content & Visuals', description: 'Fotografie und Content für Ihre Marke.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Branding-Pakete für Dubai',
      pricingDescription: 'Investitionen in Ihre Markenidentität. Alle Preise in EUR.',
      process: 'Unser Branding-Prozess',
      processDescription: 'Strukturiert und kreativ – so entwickeln wir Marken für Dubai.',
      technologies: 'Tools & Methoden',
      technologiesDescription: 'Professionelle Tools und bewährte Methoden für erstklassiges Branding.',
      faq: 'Häufige Fragen zu Branding Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für Ihre Marke in Dubai?',
      ctaDescription: 'Lassen Sie uns eine Marke schaffen, die im Dubai-Markt heraussticht.',
      ctaButton: 'Projekt besprechen',
    },
  },
  en: {
    meta: {
      title: 'Branding Agency Dubai · Brands for the Gulf Market | GoldenWing',
      description: 'Branding in Dubai. We develop brand identities for the Arabian market. Culturally sensitive, internationally successful.',
      keywords: ['branding agency dubai', 'brand identity dubai', 'corporate design dubai'],
    },
    hero: {
      badge: 'Branding Agency in Dubai',
      title: 'Branding Agency Dubai',
      description: 'Brand identities for the demanding Dubai market. We combine European design know-how with cultural understanding for the Gulf market.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'award', text: 'Luxury Experience' },
      { icon: 'star', text: 'Cultural Expertise' },
      { icon: 'clock', text: 'Local Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Premium Positioning', description: 'Designs that meet the high standards of the Dubai market' },
      { icon: 'shield', title: 'Cultural Sensitivity', description: 'Respectful design for the Arabian market' },
      { icon: 'users', title: 'Bilingual Logos', description: 'Brand names in Latin and Arabic' },
      { icon: 'star', title: 'International Standards', description: 'European quality for global markets' },
    ],
    packages: [
      { name: 'Brand Essentials', price: '5,000', description: 'For new businesses', popular: false, features: ['Logo design', 'Color palette', 'Typography system', 'Business cards', 'Letterhead', 'Brand guidelines (basic)'] },
      { name: 'Brand Identity', price: '10,000', description: 'For premium brands', popular: true, features: ['Everything in Essentials', 'Arabic logo variant', 'Comprehensive guidelines', 'Social media kit', 'Presentation template', 'Signage design', 'Photography guidelines', '3 revision rounds'] },
      { name: 'Brand Experience', price: '20,000+', description: 'For luxury brands', popular: false, features: ['Everything in Identity', 'Brand strategy', 'Brand story', 'Interior design concept', 'Packaging design', 'Digital brand guidelines', 'Launch campaign', 'Ongoing support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Workshops to understand your vision and target audience.' },
      { step: '02', title: 'Strategy', description: 'Positioning and brand strategy for Dubai.' },
      { step: '03', title: 'Design', description: 'Creative exploration and design development.' },
      { step: '04', title: 'Refinement', description: 'Fine-tuning and finalizing all assets.' },
      { step: '05', title: 'Launch', description: 'Handover and support for brand launch.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy Frameworks', 'Arabic Typography', 'Color Psychology', 'Cultural Research'],
    faqs: [
      { question: "Do you understand branding for Dubai's luxury market?", answer: 'Yes, Dubai is known for luxury and premium brands. We create brand identities that live up to these standards.' },
      { question: 'Can you develop culturally sensitive brands?', answer: 'Absolutely. We understand cultural nuances and develop brands that are respectful yet modern.' },
      { question: 'Do you offer Arabic logo variants?', answer: 'Yes, we create bilingual logos and brand identities that work in both Latin and Arabic scripts.' },
      { question: 'How do you handle religious and cultural sensitivities?', answer: 'With the utmost respect. We avoid culturally inappropriate symbols and colors and advise you accordingly.' },
      { question: 'Do you have experience with various industries in the UAE?', answer: 'Yes, we have experience with real estate, hospitality, retail, professional services, and tech in the UAE.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Websites matching your brand.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Visibility for your brand.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Content & Visuals', description: 'Photography and content for your brand.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Branding Packages for Dubai',
      pricingDescription: 'Investments in your brand identity. All prices in EUR.',
      process: 'Our Branding Process',
      processDescription: 'Structured and creative – this is how we develop brands for Dubai.',
      technologies: 'Tools & Methods',
      technologiesDescription: 'Professional tools and proven methods for first-class branding.',
      faq: 'Frequently Asked Questions about Branding Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for Your Brand in Dubai?',
      ctaDescription: "Let's create a brand that stands out in the Dubai market.",
      ctaButton: 'Discuss Project',
    },
  },
  ru: {
    meta: {
      title: 'Брендинговое агентство Дубай · Бренды для рынка Персидского залива | GoldenWing',
      description: 'Брендинг в Дубае. Мы разрабатываем фирменный стиль для арабского рынка. Культурно адаптированный, международно успешный.',
      keywords: ['брендинговое агентство дубай', 'разработка бренда дубай', 'корпоративный дизайн дубай'],
    },
    hero: {
      badge: 'Брендинговое агентство в Дубае',
      title: 'Брендинговое агентство Дубай',
      description: 'Фирменный стиль для требовательного рынка Дубая. Мы сочетаем европейский дизайн-опыт с культурным пониманием рынка Персидского залива.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть портфолио',
    },
    trustSignals: [
      { icon: 'award', text: 'Опыт в сегменте люкс' },
      { icon: 'star', text: 'Культурная экспертиза' },
      { icon: 'clock', text: 'Локальная команда' },
    ],
    benefits: [
      { icon: 'zap', title: 'Премиум-позиционирование', description: 'Дизайн, соответствующий высоким стандартам рынка Дубая' },
      { icon: 'shield', title: 'Культурная чуткость', description: 'Уважительный дизайн для арабского рынка' },
      { icon: 'users', title: 'Двуязычные логотипы', description: 'Названия брендов на латинице и арабском' },
      { icon: 'star', title: 'Международные стандарты', description: 'Европейское качество для глобальных рынков' },
    ],
    packages: [
      { name: 'Brand Essentials', price: '5 000', description: 'Для новых компаний', popular: false, features: ['Дизайн логотипа', 'Цветовая палитра', 'Типографическая система', 'Визитные карточки', 'Фирменный бланк', 'Руководство по бренду (базовое)'] },
      { name: 'Brand Identity', price: '10 000', description: 'Для премиум-брендов', popular: true, features: ['Всё из Essentials', 'Арабская версия логотипа', 'Подробное руководство', 'Набор для соцсетей', 'Шаблон презентации', 'Дизайн вывесок', 'Рекомендации по фотографии', '3 раунда правок'] },
      { name: 'Brand Experience', price: '20 000+', description: 'Для люксовых брендов', popular: false, features: ['Всё из Identity', 'Стратегия бренда', 'История бренда', 'Концепция интерьера', 'Дизайн упаковки', 'Цифровое руководство по бренду', 'Кампания по запуску', 'Постоянная поддержка'] },
    ],
    process: [
      { step: '01', title: 'Исследование', description: 'Воркшопы для понимания вашего видения и целевой аудитории.' },
      { step: '02', title: 'Стратегия', description: 'Позиционирование и стратегия бренда для Дубая.' },
      { step: '03', title: 'Дизайн', description: 'Креативное исследование и разработка дизайна.' },
      { step: '04', title: 'Доработка', description: 'Финальная доработка и завершение всех материалов.' },
      { step: '05', title: 'Запуск', description: 'Передача и поддержка при запуске бренда.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy Frameworks', 'Arabic Typography', 'Color Psychology', 'Cultural Research'],
    faqs: [
      { question: 'Вы понимаете брендинг для люксового рынка Дубая?', answer: 'Да, Дубай известен своими люксовыми и премиум-брендами. Мы создаём фирменный стиль, соответствующий этим стандартам.' },
      { question: 'Можете ли вы разработать культурно адаптированный бренд?', answer: 'Безусловно. Мы понимаем культурные нюансы и разрабатываем бренды, которые уважительны и при этом современны.' },
      { question: 'Предлагаете ли вы арабские версии логотипов?', answer: 'Да, мы создаём двуязычные логотипы и фирменный стиль, которые работают как на латинице, так и на арабском письме.' },
      { question: 'Как вы относитесь к религиозным и культурным особенностям?', answer: 'С максимальным уважением. Мы избегаем культурно неуместных символов и цветов и консультируем вас соответствующим образом.' },
      { question: 'Есть ли у вас опыт работы с различными отраслями в ОАЭ?', answer: 'Да, у нас есть опыт работы с недвижимостью, гостеприимством, розничной торговлей, профессиональными услугами и технологиями в ОАЭ.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Сайты, соответствующие вашему бренду.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Дубай', description: 'Видимость для вашего бренда.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Контент и визуалы', description: 'Фотография и контент для вашего бренда.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Пакеты брендинга для Дубая',
      pricingDescription: 'Инвестиции в ваш фирменный стиль. Все цены в EUR.',
      process: 'Наш процесс брендинга',
      processDescription: 'Структурированный и креативный — так мы разрабатываем бренды для Дубая.',
      technologies: 'Инструменты и методы',
      technologiesDescription: 'Профессиональные инструменты и проверенные методы для первоклассного брендинга.',
      faq: 'Часто задаваемые вопросы о брендинге в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к созданию вашего бренда в Дубае?',
      ctaDescription: 'Давайте создадим бренд, который выделится на рынке Дубая.',
      ctaButton: 'Обсудить проект',
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
      url: getCanonicalUrl('/branding-agentur-dubai', locale),
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
      canonical: getCanonicalUrl('/branding-agentur-dubai', locale),
      languages: getHreflangAlternates('/branding-agentur-dubai').languages,
    },
  }
}

export default async function BrandingAgenturDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'Branding Agentur Dubai', en: 'Branding Agency Dubai', ru: 'Брендинговое агентство Дубай' }[locale],
      serviceUrl: 'https://goldenwing.at/branding-agentur-dubai',
      areaServed: { type: 'City', name: 'Dubai' },
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
        { name: { de: 'Branding Agentur Dubai', en: 'Branding Agency Dubai', ru: 'Брендинговое агентство Дубай' }[locale], url: { de: 'https://goldenwing.at/branding-agentur-dubai', en: 'https://goldenwing.at/en/branding-agency-dubai', ru: 'https://goldenwing.at/ru/branding-agentur-dubai' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
