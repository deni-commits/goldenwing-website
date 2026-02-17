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
      title: 'App Entwicklung Dubai · iOS & Android Apps VAE | GoldenWing',
      description: 'Mobile App Entwicklung in Dubai. Native & Cross-Platform Apps für iOS und Android. Von der Idee bis zum App Store.',
      keywords: ['app entwicklung dubai', 'mobile app dubai', 'ios android dubai'],
    },
    hero: {
      badge: 'App Entwicklung in Dubai',
      title: 'App Entwicklung Dubai',
      description: 'Von der Idee bis zum App Store. Wir entwickeln native und Cross-Platform Apps für iOS und Android – mit lokalem Support in Dubai.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Büro in Dubai' },
      { icon: 'star', text: 'iOS & Android' },
      { icon: 'clock', text: 'App Store Support' },
    ],
    benefits: [
      { icon: 'zap', title: 'Native & Cross-Platform', description: 'Swift, Kotlin, React Native oder Flutter' },
      { icon: 'shield', title: 'Volle Betreuung', description: 'Design, Entwicklung, Testing, Launch' },
      { icon: 'users', title: 'App Store Submission', description: 'Wir übernehmen die Einreichung' },
      { icon: 'star', title: 'Langzeit-Support', description: 'Updates und Wartung nach Launch' },
    ],
    packages: [
      { name: 'MVP', price: '15.000', description: 'Für den Start', popular: false, features: ['Eine Plattform (iOS oder Android)', 'Kern-Features', 'UI/UX Design', 'Backend-Basics', 'App Store Submission', '3 Monate Support'] },
      { name: 'Professional', price: '35.000', description: 'Für beide Plattformen', popular: true, features: ['iOS + Android', 'Cross-Platform (React Native)', 'Custom Backend', 'Push Notifications', 'Analytics Integration', 'Admin Dashboard', 'ASO-Optimierung', '6 Monate Support'] },
      { name: 'Enterprise', price: '60.000+', description: 'Komplexe Apps', popular: false, features: ['Native Development', 'Komplexe Integrationen', 'Multi-User Rollen', 'Offline-Fähigkeit', 'Security Audit', 'Performance-Optimierung', 'Dediziertes Team', '12 Monate Support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Idee verfeinern und Anforderungen definieren.' },
      { step: '02', title: 'Design', description: 'UI/UX Design und Prototyping.' },
      { step: '03', title: 'Entwicklung', description: 'Agile Entwicklung mit regelmäßigen Builds.' },
      { step: '04', title: 'Testing', description: 'Gründliche QA und User Testing.' },
      { step: '05', title: 'Launch', description: 'App Store Submission und Go-Live.' },
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Node.js', 'Firebase', 'AWS Amplify', 'PostgreSQL'],
    faqs: [
      { question: 'Entwickelt ihr native oder Cross-Platform Apps?', answer: 'Beides. Für maximale Performance empfehlen wir native Entwicklung (Swift/Kotlin). Für schnellere Markteinführung und Budget-Effizienz nutzen wir React Native oder Flutter.' },
      { question: 'Was kostet eine App-Entwicklung in Dubai?', answer: 'Eine einfache App startet bei ca. 15.000€, mittelkomplexe Apps bei 30.000-50.000€. Komplexe Apps mit Backend, Integrationen und mehreren Nutzerrollen liegen bei 50.000€+.' },
      { question: 'Übernehmt ihr auch die App Store Einreichung?', answer: 'Ja, wir kümmern uns um die komplette Einreichung bei Apple App Store und Google Play, einschließlich Store-Optimierung (ASO), Screenshots und Beschreibungen.' },
      { question: 'Bietet ihr App-Wartung nach dem Launch an?', answer: 'Ja, wir bieten Wartungspakete für regelmäßige Updates, Bug-Fixes, OS-Kompatibilität und neue Features. Continuous Improvement ist Teil unserer Philosophie.' },
      { question: 'Entwickelt ihr auch Apps für den B2B-Bereich?', answer: 'Ja, von internen Unternehmens-Apps über Field Service Apps bis zu B2B-Marketplaces - wir entwickeln maßgeschneiderte Business-Lösungen.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Begleitende Website zur App.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'App Marketing und User Acquisition.', href: '/digitales-marketing-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Online-Shops als App-Ergänzung.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere App-Pakete',
      pricingDescription: 'Von MVP bis Enterprise – für jede Phase der App-Entwicklung.',
      process: 'Unser App-Entwicklungsprozess',
      processDescription: 'Agil, transparent und auf Qualität fokussiert.',
      technologies: 'Technologien',
      technologiesDescription: 'Moderne Frameworks für performante Apps.',
      faq: 'Häufige Fragen zu App Entwicklung Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für Ihre App?',
      ctaDescription: 'Lassen Sie uns über Ihre App-Idee sprechen.',
      ctaButton: 'App anfragen',
    },
  },
  en: {
    meta: {
      title: 'App Development Dubai · iOS & Android Apps UAE | GoldenWing',
      description: 'Mobile app development in Dubai. Native & cross-platform apps for iOS and Android. From idea to app store launch.',
      keywords: ['app development dubai', 'mobile app dubai', 'ios android dubai'],
    },
    hero: {
      badge: 'App Development in Dubai',
      title: 'App Development Dubai',
      description: 'From idea to app store. We develop native and cross-platform apps for iOS and Android – with local support in Dubai.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Office in Dubai' },
      { icon: 'star', text: 'iOS & Android' },
      { icon: 'clock', text: 'App Store Support' },
    ],
    benefits: [
      { icon: 'zap', title: 'Native & Cross-Platform', description: 'Swift, Kotlin, React Native or Flutter' },
      { icon: 'shield', title: 'Full Service', description: 'Design, development, testing, launch' },
      { icon: 'users', title: 'App Store Submission', description: 'We handle the submission' },
      { icon: 'star', title: 'Long-term Support', description: 'Updates and maintenance after launch' },
    ],
    packages: [
      { name: 'MVP', price: '15,000', description: 'For getting started', popular: false, features: ['One platform (iOS or Android)', 'Core features', 'UI/UX design', 'Backend basics', 'App store submission', '3 months support'] },
      { name: 'Professional', price: '35,000', description: 'For both platforms', popular: true, features: ['iOS + Android', 'Cross-platform (React Native)', 'Custom backend', 'Push notifications', 'Analytics integration', 'Admin dashboard', 'ASO optimization', '6 months support'] },
      { name: 'Enterprise', price: '60,000+', description: 'Complex apps', popular: false, features: ['Native development', 'Complex integrations', 'Multi-user roles', 'Offline capability', 'Security audit', 'Performance optimization', 'Dedicated team', '12 months support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Refine idea and define requirements.' },
      { step: '02', title: 'Design', description: 'UI/UX design and prototyping.' },
      { step: '03', title: 'Development', description: 'Agile development with regular builds.' },
      { step: '04', title: 'Testing', description: 'Thorough QA and user testing.' },
      { step: '05', title: 'Launch', description: 'App store submission and go-live.' },
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Node.js', 'Firebase', 'AWS Amplify', 'PostgreSQL'],
    faqs: [
      { question: 'Do you develop native or cross-platform apps?', answer: 'Both. For maximum performance, we recommend native development (Swift/Kotlin). For faster time-to-market and budget efficiency, we use React Native or Flutter.' },
      { question: 'What does app development cost in Dubai?', answer: 'A simple app starts at around €15,000, medium-complexity apps at €30,000-50,000. Complex apps with backend, integrations, and multiple user roles are €50,000+.' },
      { question: 'Do you handle app store submission?', answer: 'Yes, we handle complete submission to Apple App Store and Google Play, including store optimization (ASO), screenshots, and descriptions.' },
      { question: 'Do you offer app maintenance after launch?', answer: 'Yes, we offer maintenance packages for regular updates, bug fixes, OS compatibility, and new features. Continuous improvement is part of our philosophy.' },
      { question: 'Do you also develop apps for B2B?', answer: 'Yes, from internal enterprise apps to field service apps to B2B marketplaces - we develop custom business solutions.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Accompanying website for your app.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'App marketing and user acquisition.', href: '/digitales-marketing-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Online shops as app complement.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our App Packages',
      pricingDescription: 'From MVP to Enterprise – for every phase of app development.',
      process: 'Our App Development Process',
      processDescription: 'Agile, transparent, and quality-focused.',
      technologies: 'Technologies',
      technologiesDescription: 'Modern frameworks for performant apps.',
      faq: 'Frequently Asked Questions about App Development Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for Your App?',
      ctaDescription: 'Let\'s discuss your app idea.',
      ctaButton: 'Request App',
    },
  },
  ru: {
    meta: {
      title: 'Разработка приложений Дубай · iOS & Android ОАЭ | GoldenWing',
      description: 'Разработка мобильных приложений в Дубае. Нативные и кросс-платформенные приложения для iOS и Android. От идеи до публикации в App Store.',
      keywords: ['разработка приложений дубай', 'мобильные приложения дубай', 'ios android дубай'],
    },
    hero: {
      badge: 'Разработка приложений в Дубае',
      title: 'Разработка приложений Дубай',
      description: 'От идеи до App Store. Мы разрабатываем нативные и кросс-платформенные приложения для iOS и Android – с локальной поддержкой в Дубае.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Дубае' },
      { icon: 'star', text: 'iOS & Android' },
      { icon: 'clock', text: 'Поддержка App Store' },
    ],
    benefits: [
      { icon: 'zap', title: 'Нативные и кросс-платформенные', description: 'Swift, Kotlin, React Native или Flutter' },
      { icon: 'shield', title: 'Полный сервис', description: 'Дизайн, разработка, тестирование, запуск' },
      { icon: 'users', title: 'Публикация в App Store', description: 'Мы берём на себя размещение' },
      { icon: 'star', title: 'Долгосрочная поддержка', description: 'Обновления и обслуживание после запуска' },
    ],
    packages: [
      { name: 'MVP', price: '15 000', description: 'Для старта', popular: false, features: ['Одна платформа (iOS или Android)', 'Основные функции', 'UI/UX дизайн', 'Базовый бэкенд', 'Публикация в App Store', '3 месяца поддержки'] },
      { name: 'Professional', price: '35 000', description: 'Для обеих платформ', popular: true, features: ['iOS + Android', 'Кросс-платформа (React Native)', 'Индивидуальный бэкенд', 'Push-уведомления', 'Интеграция аналитики', 'Админ-панель', 'ASO-оптимизация', '6 месяцев поддержки'] },
      { name: 'Enterprise', price: '60 000+', description: 'Сложные приложения', popular: false, features: ['Нативная разработка', 'Сложные интеграции', 'Многопользовательские роли', 'Офлайн-режим', 'Аудит безопасности', 'Оптимизация производительности', 'Выделенная команда', '12 месяцев поддержки'] },
    ],
    process: [
      { step: '01', title: 'Исследование', description: 'Уточнение идеи и определение требований.' },
      { step: '02', title: 'Дизайн', description: 'UI/UX дизайн и прототипирование.' },
      { step: '03', title: 'Разработка', description: 'Гибкая разработка с регулярными сборками.' },
      { step: '04', title: 'Тестирование', description: 'Тщательный QA и пользовательское тестирование.' },
      { step: '05', title: 'Запуск', description: 'Публикация в App Store и выход в свет.' },
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Node.js', 'Firebase', 'AWS Amplify', 'PostgreSQL'],
    faqs: [
      { question: 'Вы разрабатываете нативные или кросс-платформенные приложения?', answer: 'И то, и другое. Для максимальной производительности мы рекомендуем нативную разработку (Swift/Kotlin). Для более быстрого выхода на рынок и экономии бюджета используем React Native или Flutter.' },
      { question: 'Сколько стоит разработка приложения в Дубае?', answer: 'Простое приложение начинается от €15 000, приложения средней сложности — от €30 000-50 000. Сложные приложения с бэкендом, интеграциями и несколькими ролями пользователей — от €50 000.' },
      { question: 'Вы занимаетесь публикацией в App Store?', answer: 'Да, мы полностью берём на себя публикацию в Apple App Store и Google Play, включая оптимизацию магазина (ASO), скриншоты и описания.' },
      { question: 'Вы предлагаете обслуживание приложения после запуска?', answer: 'Да, мы предлагаем пакеты обслуживания для регулярных обновлений, исправления ошибок, совместимости с ОС и новых функций. Постоянное улучшение — часть нашей философии.' },
      { question: 'Вы также разрабатываете приложения для B2B?', answer: 'Да, от внутренних корпоративных приложений до приложений для полевого сервиса и B2B-маркетплейсов — мы разрабатываем индивидуальные бизнес-решения.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Сопутствующий сайт для вашего приложения.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Цифровой маркетинг Дубай', description: 'Маркетинг приложений и привлечение пользователей.', href: '/digitales-marketing-dubai' as StaticAppPathname },
      { title: 'E-Commerce Дубай', description: 'Интернет-магазины как дополнение к приложению.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши пакеты приложений',
      pricingDescription: 'От MVP до Enterprise – для каждого этапа разработки приложений.',
      process: 'Наш процесс разработки приложений',
      processDescription: 'Гибкий, прозрачный и ориентированный на качество.',
      technologies: 'Технологии',
      technologiesDescription: 'Современные фреймворки для производительных приложений.',
      faq: 'Часто задаваемые вопросы о разработке приложений в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к своему приложению?',
      ctaDescription: 'Давайте обсудим вашу идею приложения.',
      ctaButton: 'Запросить приложение',
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
      url: getCanonicalUrl('/app-entwicklung-dubai', locale),
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
      canonical: getCanonicalUrl('/app-entwicklung-dubai', locale),
      languages: getHreflangAlternates('/app-entwicklung-dubai').languages,
    },
  }
}

export default async function AppEntwicklungDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'App Entwicklung Dubai', en: 'App Development Dubai', ru: 'Разработка приложений Дубай' }[locale],
      serviceUrl: 'https://goldenwing.at/app-entwicklung-dubai',
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
        { name: { de: 'App Entwicklung Dubai', en: 'App Development Dubai', ru: 'Разработка приложений Дубай' }[locale], url: { de: 'https://goldenwing.at/app-entwicklung-dubai', en: 'https://goldenwing.at/en/app-development-dubai', ru: 'https://goldenwing.at/ru/app-entwicklung-dubai' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
