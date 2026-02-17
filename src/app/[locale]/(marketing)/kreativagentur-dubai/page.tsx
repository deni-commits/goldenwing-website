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
      title: 'Kreativagentur Dubai · Design & Strategie | GoldenWing',
      description: 'Kreativagentur in Dubai, VAE. Full-Service: Webdesign, Branding, Content & digitale Strategie. Europäische Expertise vor Ort.',
      keywords: ['kreativagentur dubai', 'creative agency dubai', 'design agentur dubai'],
    },
    hero: {
      badge: 'Kreativagentur in Dubai',
      title: 'Kreativagentur Dubai',
      description: 'Europäische Kreativität trifft Dubai-Dynamik. Wir bieten Full-Service Kreativleistungen – von Branding über Webdesign bis Content – direkt vor Ort in Business Bay.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Büro in Dubai' },
      { icon: 'star', text: 'Europäische Qualität' },
      { icon: 'clock', text: 'Lokales Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Full-Service', description: 'Branding, Web, Content, Video – alles aus einer Hand' },
      { icon: 'shield', title: 'Europäische Standards', description: 'Österreichische Qualität, lokale Präsenz' },
      { icon: 'users', title: 'Kulturelles Verständnis', description: 'Wir kennen beide Welten – Europa und Golf' },
      { icon: 'star', title: 'Schnelle Umsetzung', description: 'Dubai-Tempo mit europäischer Präzision' },
    ],
    packages: [
      { name: 'Project', price: 'Auf Anfrage', description: 'Einzelprojekte', popular: false, features: ['Branding oder Website', 'Klar definierter Scope', 'Festpreis-Angebot', 'Projektmanagement', 'Qualitätssicherung', 'Übergabe & Training'] },
      { name: 'Retainer', price: '5.000/mtl.', description: 'Laufende Betreuung', popular: true, features: ['40 Stunden/Monat', 'Alle Kreativleistungen', 'Priorisierter Support', 'Strategieberatung', 'Content-Produktion', 'Flexibler Einsatz', 'Monatliche Reviews', 'Kein Verfallsdatum'] },
      { name: 'Enterprise', price: '10.000+/mtl.', description: 'Dediziertes Team', popular: false, features: ['Dedizierte Ressourcen', 'Alle Services inklusive', 'Strategische Partnerschaft', 'Vor-Ort-Präsenz', 'Kampagnenplanung', 'Event-Support', '24/7 Verfügbarkeit', 'C-Level Reporting'] },
    ],
    process: [
      { step: '01', title: 'Briefing', description: 'Persönliches Meeting in unserem Dubai-Büro.' },
      { step: '02', title: 'Strategie', description: 'Kreativstrategie für Ihre Ziele.' },
      { step: '03', title: 'Kreation', description: 'Design und Content-Produktion.' },
      { step: '04', title: 'Review', description: 'Feedback-Schleifen bis zur Perfektion.' },
      { step: '05', title: 'Delivery', description: 'Übergabe und Implementierung.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Premiere Pro', 'Cinema 4D', 'DaVinci Resolve', 'Blender', 'Webflow'],
    faqs: [
      { question: 'Was macht GoldenWing als Kreativagentur in Dubai einzigartig?', answer: 'Wir bringen europäische Kreativität und Qualitätsstandards mit lokaler Präsenz und Marktverständnis zusammen - eine seltene Kombination in Dubai.' },
      { question: 'Welche kreativen Services bietet ihr in Dubai an?', answer: 'Branding, Webdesign, UI/UX, Content Creation, Social Media Design, Video-Produktion, Printdesign und digitale Strategieberatung - alles aus einer Hand.' },
      { question: 'Arbeitet ihr auch mit arabischen Kreativen zusammen?', answer: 'Ja, wir haben ein Netzwerk lokaler Talente für Fotografie, Videografie, Arabisch-Copywriting, Kalligrafie und kulturelle Beratung.' },
      { question: 'Wie schnell könnt ihr auf kreative Briefings reagieren?', answer: 'Erste Konzepte liefern wir typischerweise innerhalb von 5-7 Werktagen nach dem Briefing. Rush-Projekte können wir auch in 48-72 Stunden bearbeiten.' },
      { question: 'Bietet ihr auch Event-Branding in Dubai an?', answer: 'Ja, wir erstellen Event-Branding, von Einladungen über Bühnendesign bis zu Social Media Grafiken, Merchandise und After-Event-Materialien.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Websites für den UAE-Markt.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Markenentwicklung für die Golfregion.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Sichtbarkeit auf Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Zusammenarbeit mit uns',
      pricingDescription: 'Flexibel, transparent und ergebnisorientiert.',
      process: 'Unser Prozess',
      processDescription: 'Kreativ, strukturiert und auf Dubai-Tempo.',
      technologies: 'Tools & Software',
      technologiesDescription: 'Professionelle Tools für erstklassige Kreativarbeit.',
      faq: 'Häufige Fragen zur Kreativagentur Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für kreative Exzellenz?',
      ctaDescription: 'Besuchen Sie uns in Business Bay oder starten Sie mit einem Video-Call.',
      ctaButton: 'Projekt besprechen',
    },
  },
  en: {
    meta: {
      title: 'Creative Agency Dubai · Design & Strategy | GoldenWing',
      description: 'Creative agency in Dubai, UAE. Full-service: web design, branding, content & digital strategy. European expertise on the ground.',
      keywords: ['creative agency dubai', 'design agency dubai', 'creative services dubai'],
    },
    hero: {
      badge: 'Creative Agency in Dubai',
      title: 'Creative Agency Dubai',
      description: 'European creativity meets Dubai dynamics. We offer full-service creative solutions – from branding to web design to content – directly on-site in Business Bay.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'award', text: 'Office in Dubai' },
      { icon: 'star', text: 'European Quality' },
      { icon: 'clock', text: 'Local Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Full-Service', description: 'Branding, web, content, video – all from one source' },
      { icon: 'shield', title: 'European Standards', description: 'Austrian quality, local presence' },
      { icon: 'users', title: 'Cultural Understanding', description: 'We know both worlds – Europe and Gulf' },
      { icon: 'star', title: 'Fast Execution', description: 'Dubai speed with European precision' },
    ],
    packages: [
      { name: 'Project', price: 'On Request', description: 'Single projects', popular: false, features: ['Branding or website', 'Clearly defined scope', 'Fixed price offer', 'Project management', 'Quality assurance', 'Handover & training'] },
      { name: 'Retainer', price: '5,000/mo', description: 'Ongoing support', popular: true, features: ['40 hours/month', 'All creative services', 'Priority support', 'Strategy consulting', 'Content production', 'Flexible deployment', 'Monthly reviews', 'No expiration'] },
      { name: 'Enterprise', price: '10,000+/mo', description: 'Dedicated team', popular: false, features: ['Dedicated resources', 'All services included', 'Strategic partnership', 'On-site presence', 'Campaign planning', 'Event support', '24/7 availability', 'C-level reporting'] },
    ],
    process: [
      { step: '01', title: 'Briefing', description: 'Personal meeting at our Dubai office.' },
      { step: '02', title: 'Strategy', description: 'Creative strategy for your goals.' },
      { step: '03', title: 'Creation', description: 'Design and content production.' },
      { step: '04', title: 'Review', description: 'Feedback loops until perfection.' },
      { step: '05', title: 'Delivery', description: 'Handover and implementation.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Premiere Pro', 'Cinema 4D', 'DaVinci Resolve', 'Blender', 'Webflow'],
    faqs: [
      { question: 'What makes GoldenWing unique as a creative agency in Dubai?', answer: 'We combine European creativity and quality standards with local presence and market understanding - a rare combination in Dubai.' },
      { question: 'What creative services do you offer in Dubai?', answer: 'Branding, web design, UI/UX, content creation, social media design, video production, print design, and digital strategy consulting - all under one roof.' },
      { question: 'Do you work with Arabic creatives?', answer: 'Yes, we have a network of local talent for photography, videography, Arabic copywriting, calligraphy, and cultural consulting.' },
      { question: 'How quickly can you respond to creative briefs?', answer: 'We typically deliver initial concepts within 5-7 business days after briefing. Rush projects can be handled in 48-72 hours.' },
      { question: 'Do you offer event branding in Dubai?', answer: 'Yes, we create event branding from invitations to stage design to social media graphics, merchandise, and post-event materials.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Websites for the UAE market.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Brand development for the Gulf region.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Visibility on Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Working with Us',
      pricingDescription: 'Flexible, transparent, and results-oriented.',
      process: 'Our Process',
      processDescription: 'Creative, structured, and at Dubai speed.',
      technologies: 'Tools & Software',
      technologiesDescription: 'Professional tools for first-class creative work.',
      faq: 'Frequently Asked Questions about Creative Agency Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for Creative Excellence?',
      ctaDescription: 'Visit us in Business Bay or start with a video call.',
      ctaButton: 'Discuss Project',
    },
  },
  ru: {
    meta: {
      title: 'Креативное агентство Дубай · Дизайн и стратегия | GoldenWing',
      description: 'Креативное агентство в Дубае, ОАЭ. Полный комплекс услуг: веб-дизайн, брендинг, контент и цифровая стратегия. Европейская экспертиза на месте.',
      keywords: ['креативное агентство дубай', 'creative agency dubai', 'дизайн агентство дубай'],
    },
    hero: {
      badge: 'Креативное агентство в Дубае',
      title: 'Креативное агентство Дубай',
      description: 'Европейский креатив встречает динамику Дубая. Мы предлагаем полный спектр креативных услуг — от брендинга до веб-дизайна и контента — непосредственно на месте в Business Bay.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть портфолио',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Дубае' },
      { icon: 'star', text: 'Европейское качество' },
      { icon: 'clock', text: 'Локальная команда' },
    ],
    benefits: [
      { icon: 'zap', title: 'Полный комплекс услуг', description: 'Брендинг, веб, контент, видео — всё из одних рук' },
      { icon: 'shield', title: 'Европейские стандарты', description: 'Австрийское качество, локальное присутствие' },
      { icon: 'users', title: 'Культурное понимание', description: 'Мы знаем оба мира — Европу и Залив' },
      { icon: 'star', title: 'Быстрая реализация', description: 'Скорость Дубая с европейской точностью' },
    ],
    packages: [
      { name: 'Проект', price: 'По запросу', description: 'Отдельные проекты', popular: false, features: ['Брендинг или веб-сайт', 'Чётко определённый объём', 'Фиксированная цена', 'Управление проектом', 'Контроль качества', 'Передача и обучение'] },
      { name: 'Ретейнер', price: '5 000/мес.', description: 'Постоянное сопровождение', popular: true, features: ['40 часов/месяц', 'Все креативные услуги', 'Приоритетная поддержка', 'Стратегический консалтинг', 'Производство контента', 'Гибкое использование', 'Ежемесячные обзоры', 'Без срока действия'] },
      { name: 'Enterprise', price: '10 000+/мес.', description: 'Выделенная команда', popular: false, features: ['Выделенные ресурсы', 'Все услуги включены', 'Стратегическое партнёрство', 'Присутствие на месте', 'Планирование кампаний', 'Поддержка мероприятий', 'Доступность 24/7', 'Отчётность для руководства'] },
    ],
    process: [
      { step: '01', title: 'Брифинг', description: 'Личная встреча в нашем офисе в Дубае.' },
      { step: '02', title: 'Стратегия', description: 'Креативная стратегия для ваших целей.' },
      { step: '03', title: 'Создание', description: 'Дизайн и производство контента.' },
      { step: '04', title: 'Ревью', description: 'Циклы обратной связи до совершенства.' },
      { step: '05', title: 'Поставка', description: 'Передача и внедрение.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Premiere Pro', 'Cinema 4D', 'DaVinci Resolve', 'Blender', 'Webflow'],
    faqs: [
      { question: 'Что делает GoldenWing уникальным креативным агентством в Дубае?', answer: 'Мы сочетаем европейский креатив и стандарты качества с локальным присутствием и пониманием рынка — редкая комбинация в Дубае.' },
      { question: 'Какие креативные услуги вы предлагаете в Дубае?', answer: 'Брендинг, веб-дизайн, UI/UX, создание контента, дизайн для социальных сетей, видеопроизводство, печатный дизайн и консалтинг по цифровой стратегии — всё под одной крышей.' },
      { question: 'Работаете ли вы с арабскими креативщиками?', answer: 'Да, у нас есть сеть локальных талантов для фотографии, видеосъёмки, арабского копирайтинга, каллиграфии и культурного консалтинга.' },
      { question: 'Как быстро вы можете отреагировать на креативные брифы?', answer: 'Обычно мы предоставляем первые концепции в течение 5-7 рабочих дней после брифинга. Срочные проекты можем выполнить за 48-72 часа.' },
      { question: 'Предлагаете ли вы брендинг мероприятий в Дубае?', answer: 'Да, мы создаём брендинг мероприятий — от приглашений до дизайна сцены, графики для социальных сетей, мерча и материалов по итогам мероприятия.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Веб-сайты для рынка ОАЭ.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Брендинг Дубай', description: 'Разработка бренда для региона Залива.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'SEO Дубай', description: 'Видимость в Google.ae.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Сотрудничество с нами',
      pricingDescription: 'Гибко, прозрачно и ориентировано на результат.',
      process: 'Наш процесс',
      processDescription: 'Креативно, структурированно и в темпе Дубая.',
      technologies: 'Инструменты и ПО',
      technologiesDescription: 'Профессиональные инструменты для первоклассной креативной работы.',
      faq: 'Часто задаваемые вопросы о креативном агентстве в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к креативному совершенству?',
      ctaDescription: 'Посетите нас в Business Bay или начните с видеозвонка.',
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
      url: getCanonicalUrl('/kreativagentur-dubai', locale),
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
      canonical: getCanonicalUrl('/kreativagentur-dubai', locale),
      languages: getHreflangAlternates('/kreativagentur-dubai').languages,
    },
  }
}

export default async function KreativagenturDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: locale === 'de' ? 'Kreativagentur Dubai' : locale === 'ru' ? 'Креативное агентство Дубай' : 'Creative Agency Dubai',
      serviceUrl: 'https://goldenwing.at/kreativagentur-dubai',
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
        { name: locale === 'de' ? 'Startseite' : locale === 'ru' ? 'Главная' : 'Home', url: 'https://goldenwing.at' },
        { name: locale === 'de' ? 'Kreativagentur Dubai' : locale === 'ru' ? 'Креативное агентство Дубай' : 'Creative Agency Dubai', url: locale === 'de' ? 'https://goldenwing.at/kreativagentur-dubai' : locale === 'ru' ? 'https://goldenwing.at/ru/kreativagentur-dubai' : 'https://goldenwing.at/en/creative-agency-dubai' },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
