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
      title: 'Branding Agentur Deutschland · Marken mit Substanz | GoldenWing',
      description: 'Branding für deutsche Unternehmen. Strategische Markenentwicklung, Corporate Design & Rebranding. Made in Austria.',
      keywords: ['branding agentur deutschland', 'markenentwicklung deutschland', 'corporate design deutschland'],
    },
    hero: {
      badge: 'Branding Agentur für Deutschland',
      title: 'Branding Agentur Deutschland',
      description: 'Marken mit Substanz für den deutschen Markt. Wir entwickeln Identitäten, die überzeugen – von der Strategie bis zur Visual Identity.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'DACH-Expertise' },
      { icon: 'star', text: 'Strategiegetrieben' },
      { icon: 'clock', text: 'Langfristige Partner' },
    ],
    benefits: [
      { icon: 'zap', title: 'Frischer Blick', description: 'Österreichische Kreativität für den deutschen Markt' },
      { icon: 'shield', title: 'Strategische Fundierung', description: 'Positionierung und Markenstrategie als Basis' },
      { icon: 'users', title: 'Alle Branchen', description: 'Von Tech-Startup bis Traditionsunternehmen' },
      { icon: 'star', title: 'Ganzheitlich', description: 'Von der Strategie bis zur Implementierung' },
    ],
    packages: [
      { name: 'Logo & Basics', price: '2.000', description: 'Für Startups & Gründer', popular: false, features: ['Logoentwicklung', '3 Konzeptvarianten', 'Farbpalette', 'Typografie', 'Alle Dateiformate', 'Nutzungsrechte'] },
      { name: 'Corporate Design', price: '6.000', description: 'Komplette Identität', popular: true, features: ['Alles aus Logo+', 'Markenworkshop', 'Brand Guidelines', 'Visitenkarten & Papier', 'Social Media Kit', 'Präsentationstemplate', 'Icon-Set', '3 Monate Support'] },
      { name: 'Brand Strategy', price: '12.000+', description: 'Strategische Entwicklung', popular: false, features: ['Marktanalyse', 'Positionierung', 'Alles aus Corporate Design+', 'Verbal Identity', 'Messaging Framework', 'Employer Branding', 'Implementierungsberatung', 'Langzeit-Support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Tiefes Verständnis Ihrer Marke und Ziele.' },
      { step: '02', title: 'Strategie', description: 'Positionierung und Markenkern definieren.' },
      { step: '03', title: 'Kreation', description: 'Visual Identity mit iterativen Feedback-Schleifen.' },
      { step: '04', title: 'Guidelines', description: 'Dokumentation für konsistente Anwendung.' },
      { step: '05', title: 'Rollout', description: 'Unterstützung bei der Implementierung.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Illustrator', 'InDesign', 'Photoshop', 'Notion', 'Miro'],
    faqs: [
      { question: 'Warum eine österreichische Agentur für deutsches Branding?', answer: 'Wir bringen einen frischen Blick von außen mit, verstehen aber den DACH-Markt perfekt. Viele deutsche Marken schätzen die österreichische Kreativität kombiniert mit deutscher Gründlichkeit.' },
      { question: 'Für welche Branchen entwickelt ihr Marken in Deutschland?', answer: 'Von Tech-Startups über Mittelstand bis zu Traditionsunternehmen - wir entwickeln Marken für B2B, B2C, E-Commerce, Professional Services und mehr.' },
      { question: 'Wie läuft ein Branding-Projekt mit euch ab?', answer: 'Wir starten mit einem Strategie-Workshop, entwickeln dann Positionierung und Markenkern, gefolgt von Visual Identity (Logo, Farben, Typografie) und Brand Guidelines.' },
      { question: 'Bietet ihr auch Employer Branding an?', answer: 'Ja, Employer Branding wird immer wichtiger. Wir entwickeln Arbeitgebermarken, die Talente anziehen - von der EVP bis zur Karriereseite.' },
      { question: 'Unterstützt ihr auch bei der Markenimplementierung?', answer: 'Absolut. Nach der Markenentwicklung helfen wir bei der Umsetzung: Website, Social Media, Printmaterialien, Messeauftritte und interne Kommunikation.' },
    ],
    relatedServices: [
      { title: 'Webdesign Deutschland', description: 'Website passend zur Marke.', href: '/webdesign-deutschland' as StaticAppPathname },
      { title: 'SEO Deutschland', description: 'Sichtbarkeit für Ihre Marke.', href: '/seo-agentur-deutschland' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Marken-Content strategisch entwickeln.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere Branding-Pakete für Deutschland',
      pricingDescription: 'Strategisches Branding zu transparenten Preisen.',
      process: 'Unser Branding-Prozess',
      processDescription: 'Strukturiert und kreativ – so entwickeln wir Ihre Marke.',
      technologies: 'Tools & Software',
      technologiesDescription: 'Professionelle Tools für erstklassige Ergebnisse.',
      faq: 'Häufige Fragen zu Branding Deutschland',
      relatedServices: 'Weitere Services',
      ctaTitle: 'Bereit für Ihre neue Marke?',
      ctaDescription: 'Lassen Sie uns über Ihre Markenidentität sprechen.',
      ctaButton: 'Branding anfragen',
    },
  },
  en: {
    meta: {
      title: 'Branding Agency Germany · Brands with Substance | GoldenWing',
      description: 'Branding for German businesses. Strategic brand development, corporate design & rebranding. Made in Austria.',
      keywords: ['branding agency germany', 'brand development germany', 'corporate design germany'],
    },
    hero: {
      badge: 'Branding Agency for Germany',
      title: 'Branding Agency Germany',
      description: 'Brands with substance for the German market. We develop identities that convince – from strategy to visual identity.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'award', text: 'DACH Expertise' },
      { icon: 'star', text: 'Strategy-Driven' },
      { icon: 'clock', text: 'Long-term Partners' },
    ],
    benefits: [
      { icon: 'zap', title: 'Fresh Perspective', description: 'Austrian creativity for the German market' },
      { icon: 'shield', title: 'Strategic Foundation', description: 'Positioning and brand strategy as basis' },
      { icon: 'users', title: 'All Industries', description: 'From tech startup to traditional company' },
      { icon: 'star', title: 'Holistic', description: 'From strategy to implementation' },
    ],
    packages: [
      { name: 'Logo & Basics', price: '2,000', description: 'For startups & founders', popular: false, features: ['Logo development', '3 concept variants', 'Color palette', 'Typography', 'All file formats', 'Usage rights'] },
      { name: 'Corporate Design', price: '6,000', description: 'Complete identity', popular: true, features: ['Everything in Logo+', 'Brand workshop', 'Brand guidelines', 'Business cards & stationery', 'Social media kit', 'Presentation template', 'Icon set', '3 months support'] },
      { name: 'Brand Strategy', price: '12,000+', description: 'Strategic development', popular: false, features: ['Market analysis', 'Positioning', 'Everything in Corporate Design+', 'Verbal identity', 'Messaging framework', 'Employer branding', 'Implementation consulting', 'Long-term support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Deep understanding of your brand and goals.' },
      { step: '02', title: 'Strategy', description: 'Define positioning and brand essence.' },
      { step: '03', title: 'Creation', description: 'Visual identity with iterative feedback loops.' },
      { step: '04', title: 'Guidelines', description: 'Documentation for consistent application.' },
      { step: '05', title: 'Rollout', description: 'Support with implementation.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Illustrator', 'InDesign', 'Photoshop', 'Notion', 'Miro'],
    faqs: [
      { question: 'Why choose an Austrian agency for German branding?', answer: 'We bring a fresh outside perspective while perfectly understanding the DACH market. Many German brands appreciate Austrian creativity combined with German thoroughness.' },
      { question: 'Which industries do you develop brands for in Germany?', answer: 'From tech startups to SMEs to traditional companies - we develop brands for B2B, B2C, e-commerce, professional services, and more.' },
      { question: 'How does a branding project with you work?', answer: 'We start with a strategy workshop, then develop positioning and brand essence, followed by visual identity (logo, colors, typography) and brand guidelines.' },
      { question: 'Do you also offer employer branding?', answer: 'Yes, employer branding is increasingly important. We develop employer brands that attract talent - from EVP to career pages.' },
      { question: 'Do you support brand implementation?', answer: 'Absolutely. After brand development, we help with implementation: website, social media, print materials, trade show presence, and internal communications.' },
    ],
    relatedServices: [
      { title: 'Web Design Germany', description: 'Website matching your brand.', href: '/webdesign-deutschland' as StaticAppPathname },
      { title: 'SEO Germany', description: 'Visibility for your brand.', href: '/seo-agentur-deutschland' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Strategic brand content development.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our Branding Packages for Germany',
      pricingDescription: 'Strategic branding at transparent prices.',
      process: 'Our Branding Process',
      processDescription: 'Structured and creative – how we develop your brand.',
      technologies: 'Tools & Software',
      technologiesDescription: 'Professional tools for first-class results.',
      faq: 'Frequently Asked Questions about Branding Germany',
      relatedServices: 'More Services',
      ctaTitle: 'Ready for Your New Brand?',
      ctaDescription: 'Let\'s talk about your brand identity.',
      ctaButton: 'Request Branding',
    },
  },
  ru: {
    meta: {
      title: 'Брендинговое агентство Германия · Бренды с содержанием | GoldenWing',
      description: 'Брендинг для немецких компаний. Стратегическое развитие бренда, корпоративный дизайн и ребрендинг. Made in Austria.',
      keywords: ['брендинговое агентство германия', 'развитие бренда германия', 'корпоративный дизайн германия'],
    },
    hero: {
      badge: 'Брендинговое агентство для Германии',
      title: 'Брендинговое агентство Германия',
      description: 'Бренды с содержанием для немецкого рынка. Мы разрабатываем идентичность, которая убеждает — от стратегии до визуальной айдентики.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть портфолио',
    },
    trustSignals: [
      { icon: 'award', text: 'Экспертиза DACH' },
      { icon: 'star', text: 'Стратегический подход' },
      { icon: 'clock', text: 'Долгосрочное партнёрство' },
    ],
    benefits: [
      { icon: 'zap', title: 'Свежий взгляд', description: 'Австрийская креативность для немецкого рынка' },
      { icon: 'shield', title: 'Стратегическая основа', description: 'Позиционирование и бренд-стратегия как фундамент' },
      { icon: 'users', title: 'Все отрасли', description: 'От технологических стартапов до традиционных компаний' },
      { icon: 'star', title: 'Комплексный подход', description: 'От стратегии до реализации' },
    ],
    packages: [
      { name: 'Логотип и основы', price: '2 000', description: 'Для стартапов и основателей', popular: false, features: ['Разработка логотипа', '3 концептуальных варианта', 'Цветовая палитра', 'Типографика', 'Все форматы файлов', 'Права на использование'] },
      { name: 'Корпоративный дизайн', price: '6 000', description: 'Полная идентичность', popular: true, features: ['Всё из пакета Логотип+', 'Бренд-воркшоп', 'Брендбук', 'Визитки и бланки', 'Набор для соцсетей', 'Шаблон презентации', 'Набор иконок', '3 месяца поддержки'] },
      { name: 'Бренд-стратегия', price: '12 000+', description: 'Стратегическое развитие', popular: false, features: ['Анализ рынка', 'Позиционирование', 'Всё из пакета Корпоративный дизайн+', 'Вербальная идентичность', 'Система сообщений', 'HR-брендинг', 'Консультации по внедрению', 'Долгосрочная поддержка'] },
    ],
    process: [
      { step: '01', title: 'Исследование', description: 'Глубокое понимание вашего бренда и целей.' },
      { step: '02', title: 'Стратегия', description: 'Определение позиционирования и сущности бренда.' },
      { step: '03', title: 'Создание', description: 'Визуальная идентичность с итеративной обратной связью.' },
      { step: '04', title: 'Гайдлайны', description: 'Документация для последовательного применения.' },
      { step: '05', title: 'Запуск', description: 'Поддержка при внедрении.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Illustrator', 'InDesign', 'Photoshop', 'Notion', 'Miro'],
    faqs: [
      { question: 'Почему стоит выбрать австрийское агентство для брендинга в Германии?', answer: 'Мы привносим свежий взгляд извне, при этом прекрасно понимая рынок DACH. Многие немецкие бренды ценят австрийскую креативность в сочетании с немецкой основательностью.' },
      { question: 'Для каких отраслей вы разрабатываете бренды в Германии?', answer: 'От технологических стартапов до среднего бизнеса и традиционных компаний — мы разрабатываем бренды для B2B, B2C, электронной коммерции, профессиональных услуг и многого другого.' },
      { question: 'Как проходит брендинговый проект с вами?', answer: 'Мы начинаем со стратегического воркшопа, затем разрабатываем позиционирование и сущность бренда, после чего создаём визуальную идентичность (логотип, цвета, типографика) и брендбук.' },
      { question: 'Вы также предлагаете HR-брендинг?', answer: 'Да, HR-брендинг становится всё более важным. Мы разрабатываем бренды работодателей, привлекающие таланты — от EVP до карьерных страниц.' },
      { question: 'Вы помогаете с внедрением бренда?', answer: 'Безусловно. После разработки бренда мы помогаем с реализацией: веб-сайт, социальные сети, печатные материалы, выставочные стенды и внутренние коммуникации.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Германия', description: 'Сайт, соответствующий вашему бренду.', href: '/webdesign-deutschland' as StaticAppPathname },
      { title: 'SEO Германия', description: 'Видимость для вашего бренда.', href: '/seo-agentur-deutschland' as StaticAppPathname },
      { title: 'Контент-маркетинг', description: 'Стратегическое развитие бренд-контента.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши брендинговые пакеты для Германии',
      pricingDescription: 'Стратегический брендинг по прозрачным ценам.',
      process: 'Наш процесс брендинга',
      processDescription: 'Структурированно и креативно — так мы разрабатываем ваш бренд.',
      technologies: 'Инструменты и ПО',
      technologiesDescription: 'Профессиональные инструменты для первоклассных результатов.',
      faq: 'Часто задаваемые вопросы о брендинге в Германии',
      relatedServices: 'Другие услуги',
      ctaTitle: 'Готовы к новому бренду?',
      ctaDescription: 'Давайте обсудим вашу бренд-идентичность.',
      ctaButton: 'Запросить брендинг',
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
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/branding-agentur-deutschland', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/branding-agentur-deutschland', locale),
      languages: getHreflangAlternates('/branding-agentur-deutschland').languages,
    },
  }
}

export default async function BrandingAgenturDeutschlandPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'Branding Agentur Deutschland', en: 'Branding Agency Germany', ru: 'Брендинговое агентство Германия' }[locale],
      serviceUrl: 'https://goldenwing.at/branding-agentur-deutschland',
      areaServed: { type: 'Country', name: 'Germany' },
      description: data.meta.description,
      localBusiness: {
        name: 'GoldenWing Creative Studios',
        address: 'Czeikestrasse 4/21',
        city: 'Wien',
        postalCode: '1100',
        country: 'AT',
        phone: '+43-664-543-96-81',
      },
      breadcrumbs: [
        { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: 'https://goldenwing.at' },
        { name: { de: 'Branding Agentur Deutschland', en: 'Branding Agency Germany', ru: 'Брендинговое агентство Германия' }[locale], url: { de: 'https://goldenwing.at/branding-agentur-deutschland', en: 'https://goldenwing.at/en/branding-agency-germany', ru: 'https://goldenwing.at/ru/branding-agency-germany' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
