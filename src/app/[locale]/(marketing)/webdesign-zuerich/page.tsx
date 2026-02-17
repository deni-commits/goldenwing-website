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
      title: 'Webdesign Zürich · Agentur für die Wirtschaftsmetropole | GoldenWing',
      description: 'Webdesign für Zürcher Unternehmen. Moderne Websites für Banken, Versicherungen & Tech-Firmen. Höchste Qualitätsstandards.',
      keywords: ['webdesign zürich', 'webagentur zürich', 'website erstellen zürich'],
    },
    hero: {
      badge: 'Webdesign Agentur für Zürich',
      title: 'Webdesign Zürich',
      description: 'Premium-Websites für die Wirtschaftsmetropole der Schweiz. Wir verstehen die hohen Ansprüche Zürcher Unternehmen und liefern Ergebnisse, die überzeugen.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Finanzsektor-Erfahrung' },
      { icon: 'star', text: 'Premium-Qualität' },
      { icon: 'clock', text: 'Perfektionismus' },
    ],
    benefits: [
      { icon: 'zap', title: 'Höchste Standards', description: 'Wir erfüllen die Qualitätsansprüche der Zürcher Wirtschaft' },
      { icon: 'shield', title: 'Finanzsektor-Expertise', description: 'Erfahrung mit Banken, Versicherungen und FinTech' },
      { icon: 'users', title: 'International', description: 'Mehrsprachige Websites für globale Zielgruppen' },
      { icon: 'star', title: 'Schweizer Hosting', description: 'Auf Wunsch bei lokalen Anbietern' },
    ],
    packages: [
      { name: 'Professional', price: '5.000', description: 'Für lokale Unternehmen', popular: false, features: ['Bis zu 8 Seiten', 'Responsive Design', 'CMS-Integration', 'SEO-Optimierung', 'SSL & Datenschutz', 'CH-Hosting Option'] },
      { name: 'Business', price: '10.000', description: 'Für den Finanzsektor', popular: true, features: ['Bis zu 20 Seiten', 'Mehrsprachig (DE/EN)', 'Compliance-konform', 'Kundenportal-Option', 'Analytics & Reporting', 'Newsletter-Integration', 'API-Integrationen', '2 Jahre Support'] },
      { name: 'Enterprise', price: '20.000+', description: 'Für Großunternehmen', popular: false, features: ['Unbegrenzte Seiten', 'Alle Sprachen', 'Custom Development', 'Intranet-Lösungen', 'Höchste Sicherheit', 'Dediziertes Team', 'SLA-Garantien', '24/7 Support'] },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', description: 'Analyse Ihrer Anforderungen und Ziele.' },
      { step: '02', title: 'Konzept & Design', description: 'Detaillierte Wireframes und Designvorschläge.' },
      { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit Code-Reviews.' },
      { step: '04', title: 'Quality Assurance', description: 'Ausgiebige Tests und Qualitätsprüfung.' },
      { step: '05', title: 'Launch & Support', description: 'Go-Live und kontinuierliche Betreuung.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
    faqs: [
      { question: 'Habt ihr bereits Kunden im Zürcher Finanzsektor?', answer: 'Ja, wir haben Erfahrung mit Finanzdienstleistern, Beratungsunternehmen, Vermögensverwaltern und FinTech-Startups im Zürcher Wirtschaftsraum.' },
      { question: 'Wie geht ihr mit den hohen Qualitätsansprüchen Zürcher Unternehmen um?', answer: 'Wir sind bekannt für unseren Perfektionismus. Jedes Projekt durchläuft mehrere Qualitätsstufen, wird intern reviewed und erst nach ausgiebigen Tests freigegeben.' },
      { question: 'Könnt ihr Websites für das internationale Publikum Zürichs erstellen?', answer: 'Absolut! Zürich ist international - wir erstellen mehrsprachige Websites (DE/EN/FR), die sowohl lokale als auch internationale Zielgruppen ansprechen.' },
      { question: 'Bietet ihr auch UX-Audits für bestehende Websites an?', answer: 'Ja, wir analysieren bestehende Websites auf Usability, Performance, Conversion-Potenzial und SEO, und geben konkrete, priorisierte Verbesserungsvorschläge.' },
      { question: 'Wie schnell können wir nach Projektstart Ergebnisse sehen?', answer: 'Nach einem strukturierten Kick-off sehen Sie erste Design-Entwürfe bereits nach 1-2 Wochen. Ein komplettes Website-Projekt dauert typischerweise 6-10 Wochen.' },
    ],
    relatedServices: [
      { title: 'Webdesign Schweiz', description: 'Für Unternehmen in der ganzen Schweiz.', href: '/webdesign-schweiz' as StaticAppPathname },
      { title: 'SEO Schweiz', description: 'Suchmaschinenoptimierung für Google.ch.', href: '/seo-agentur-schweiz' as StaticAppPathname },
      { title: 'Branding', description: 'Corporate Identity für Zürcher Unternehmen.', href: '/leistungen/branding' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere Pakete für Zürich',
      pricingDescription: 'Premium-Qualität für höchste Ansprüche. Abrechnung in EUR oder CHF.',
      process: 'Unser Qualitätsprozess',
      processDescription: 'Strukturiert, präzise und mit höchsten Standards – wie Sie es von Zürich erwarten.',
      technologies: 'Technologien',
      technologiesDescription: 'Wir setzen auf bewährte und moderne Technologien für beste Ergebnisse.',
      faq: 'Häufige Fragen zu Webdesign Zürich',
      relatedServices: 'Weitere Services',
      ctaTitle: 'Bereit für Ihre neue Website?',
      ctaDescription: 'Lassen Sie uns über Ihr Projekt sprechen. Kostenloses Erstgespräch ohne Verpflichtung.',
      ctaButton: 'Projekt anfragen',
    },
  },
  en: {
    meta: {
      title: 'Web Design Zurich · Agency for the Business Hub | GoldenWing',
      description: 'Web design for Zurich businesses. Modern websites for banks, insurance & tech companies. Highest quality standards.',
      keywords: ['web design zurich', 'web agency zurich', 'website zurich'],
    },
    hero: {
      badge: 'Web Design Agency for Zurich',
      title: 'Web Design Zurich',
      description: "Premium websites for Switzerland's business metropolis. We understand the high standards of Zurich companies and deliver results that convince.",
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Finance Sector Experience' },
      { icon: 'star', text: 'Premium Quality' },
      { icon: 'clock', text: 'Perfectionism' },
    ],
    benefits: [
      { icon: 'zap', title: 'Highest Standards', description: "We meet the quality standards of Zurich's business world" },
      { icon: 'shield', title: 'Finance Sector Expertise', description: 'Experience with banks, insurance, and FinTech' },
      { icon: 'users', title: 'International', description: 'Multilingual websites for global audiences' },
      { icon: 'star', title: 'Swiss Hosting', description: 'With local providers on request' },
    ],
    packages: [
      { name: 'Professional', price: '5,000', description: 'For local businesses', popular: false, features: ['Up to 8 pages', 'Responsive design', 'CMS integration', 'SEO optimization', 'SSL & data protection', 'CH hosting option'] },
      { name: 'Business', price: '10,000', description: 'For the finance sector', popular: true, features: ['Up to 20 pages', 'Multilingual (DE/EN)', 'Compliance-ready', 'Customer portal option', 'Analytics & reporting', 'Newsletter integration', 'API integrations', '2 years support'] },
      { name: 'Enterprise', price: '20,000+', description: 'For large corporations', popular: false, features: ['Unlimited pages', 'All languages', 'Custom development', 'Intranet solutions', 'Highest security', 'Dedicated team', 'SLA guarantees', '24/7 support'] },
    ],
    process: [
      { step: '01', title: 'Initial Call', description: 'Analysis of your requirements and goals.' },
      { step: '02', title: 'Concept & Design', description: 'Detailed wireframes and design proposals.' },
      { step: '03', title: 'Development', description: 'Professional implementation with code reviews.' },
      { step: '04', title: 'Quality Assurance', description: 'Extensive testing and quality checks.' },
      { step: '05', title: 'Launch & Support', description: 'Go-live and continuous support.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
    faqs: [
      { question: "Do you have clients in Zurich's financial sector?", answer: 'Yes, we have experience with financial services, consulting firms, asset managers, and FinTech startups in the Zurich business area.' },
      { question: "How do you handle Zurich companies' high quality standards?", answer: "We're known for our perfectionism. Every project goes through multiple quality stages, internal reviews, and is only released after extensive testing." },
      { question: "Can you create websites for Zurich's international audience?", answer: 'Absolutely! Zurich is international - we create multilingual websites (DE/EN/FR) that appeal to both local and global audiences.' },
      { question: 'Do you offer UX audits for existing websites?', answer: 'Yes, we analyze existing websites for usability, performance, conversion potential, and SEO, providing concrete, prioritized improvement recommendations.' },
      { question: 'How quickly can we see results after project start?', answer: "After a structured kick-off, you'll see initial design drafts within 1-2 weeks. A complete website project typically takes 6-10 weeks." },
    ],
    relatedServices: [
      { title: 'Web Design Switzerland', description: 'For companies throughout Switzerland.', href: '/webdesign-schweiz' as StaticAppPathname },
      { title: 'SEO Switzerland', description: 'Search engine optimization for Google.ch.', href: '/seo-agentur-schweiz' as StaticAppPathname },
      { title: 'Branding', description: 'Corporate identity for Zurich companies.', href: '/leistungen/branding' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our Packages for Zurich',
      pricingDescription: 'Premium quality for highest standards. Billing in EUR or CHF.',
      process: 'Our Quality Process',
      processDescription: 'Structured, precise, and with the highest standards – as you expect from Zurich.',
      technologies: 'Technologies',
      technologiesDescription: 'We rely on proven and modern technologies for best results.',
      faq: 'Frequently Asked Questions about Web Design Zurich',
      relatedServices: 'More Services',
      ctaTitle: 'Ready for Your New Website?',
      ctaDescription: "Let's talk about your project. Free initial consultation with no obligation.",
      ctaButton: 'Request Project',
    },
  },
  ru: {
    meta: {
      title: 'Веб-дизайн Цюрих · Агентство для бизнес-метрополии | GoldenWing',
      description: 'Веб-дизайн для цюрихских компаний. Современные сайты для банков, страховых и tech-компаний. Высочайшие стандарты качества.',
      keywords: ['веб-дизайн цюрих', 'веб-агентство цюрих', 'создание сайта цюрих'],
    },
    hero: {
      badge: 'Агентство веб-дизайна для Цюриха',
      title: 'Веб-дизайн Цюрих',
      description: 'Премиум-сайты для бизнес-метрополии Швейцарии. Мы понимаем высокие требования цюрихских компаний и обеспечиваем убедительные результаты.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Опыт в финансовом секторе' },
      { icon: 'star', text: 'Премиум-качество' },
      { icon: 'clock', text: 'Перфекционизм' },
    ],
    benefits: [
      { icon: 'zap', title: 'Высочайшие стандарты', description: 'Мы соответствуем требованиям качества цюрихского бизнеса' },
      { icon: 'shield', title: 'Экспертиза финансового сектора', description: 'Опыт работы с банками, страховыми и FinTech' },
      { icon: 'users', title: 'Международность', description: 'Многоязычные сайты для глобальной аудитории' },
      { icon: 'star', title: 'Швейцарский хостинг', description: 'По запросу у локальных провайдеров' },
    ],
    packages: [
      { name: 'Professional', price: '5 000', description: 'Для местных компаний', popular: false, features: ['До 8 страниц', 'Адаптивный дизайн', 'Интеграция CMS', 'SEO-оптимизация', 'SSL и защита данных', 'Опция хостинга в Швейцарии'] },
      { name: 'Business', price: '10 000', description: 'Для финансового сектора', popular: true, features: ['До 20 страниц', 'Многоязычность (DE/EN)', 'Соответствие комплаенсу', 'Опция клиентского портала', 'Аналитика и отчетность', 'Интеграция рассылки', 'Интеграции API', '2 года поддержки'] },
      { name: 'Enterprise', price: '20 000+', description: 'Для крупных корпораций', popular: false, features: ['Неограниченное количество страниц', 'Все языки', 'Индивидуальная разработка', 'Интранет-решения', 'Высочайшая безопасность', 'Выделенная команда', 'SLA-гарантии', 'Поддержка 24/7'] },
    ],
    process: [
      { step: '01', title: 'Первичная консультация', description: 'Анализ ваших требований и целей.' },
      { step: '02', title: 'Концепция и дизайн', description: 'Детальные прототипы и дизайн-предложения.' },
      { step: '03', title: 'Разработка', description: 'Профессиональная реализация с код-ревью.' },
      { step: '04', title: 'Контроль качества', description: 'Тщательное тестирование и проверка качества.' },
      { step: '05', title: 'Запуск и поддержка', description: 'Запуск сайта и постоянное сопровождение.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
    faqs: [
      { question: 'Есть ли у вас клиенты в финансовом секторе Цюриха?', answer: 'Да, у нас есть опыт работы с финансовыми компаниями, консалтинговыми фирмами, управляющими активами и FinTech-стартапами в деловом регионе Цюриха.' },
      { question: 'Как вы справляетесь с высокими требованиями к качеству цюрихских компаний?', answer: 'Мы известны своим перфекционизмом. Каждый проект проходит несколько этапов контроля качества, внутреннюю проверку и выпускается только после тщательного тестирования.' },
      { question: 'Можете ли вы создать сайты для международной аудитории Цюриха?', answer: 'Безусловно! Цюрих международен - мы создаем многоязычные сайты (DE/EN/FR), которые привлекают как местную, так и международную аудиторию.' },
      { question: 'Предлагаете ли вы UX-аудит существующих сайтов?', answer: 'Да, мы анализируем существующие сайты на удобство использования, производительность, потенциал конверсии и SEO, предоставляя конкретные приоритизированные рекомендации по улучшению.' },
      { question: 'Как быстро мы увидим результаты после начала проекта?', answer: 'После структурированного старта вы увидите первые дизайн-макеты уже через 1-2 недели. Полный проект сайта обычно занимает 6-10 недель.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Швейцария', description: 'Для компаний по всей Швейцарии.', href: '/webdesign-schweiz' as StaticAppPathname },
      { title: 'SEO Швейцария', description: 'Поисковая оптимизация для Google.ch.', href: '/seo-agentur-schweiz' as StaticAppPathname },
      { title: 'Брендинг', description: 'Корпоративная идентичность для цюрихских компаний.', href: '/leistungen/branding' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши пакеты для Цюриха',
      pricingDescription: 'Премиум-качество для высочайших требований. Расчет в EUR или CHF.',
      process: 'Наш процесс качества',
      processDescription: 'Структурированно, точно и с высочайшими стандартами – как вы ожидаете от Цюриха.',
      technologies: 'Технологии',
      technologiesDescription: 'Мы используем проверенные и современные технологии для лучших результатов.',
      faq: 'Часто задаваемые вопросы о веб-дизайне в Цюрихе',
      relatedServices: 'Дополнительные услуги',
      ctaTitle: 'Готовы к вашему новому сайту?',
      ctaDescription: 'Давайте обсудим ваш проект. Бесплатная первичная консультация без обязательств.',
      ctaButton: 'Заказать проект',
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
      url: getCanonicalUrl('/webdesign-zuerich', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Webdesign Zürich' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/webdesign-zuerich', locale),
      languages: getHreflangAlternates('/webdesign-zuerich').languages,
    },
  }
}

export default async function WebdesignZuerichPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'Webdesign Zürich', en: 'Web Design Zurich', ru: 'Веб-дизайн Цюрих' }[locale] ?? 'Web Design Zurich',
      serviceUrl: 'https://goldenwing.at/webdesign-zuerich',
      areaServed: { type: 'City', name: 'Zurich' },
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
        { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
        { name: { de: 'Webdesign Zürich', en: 'Web Design Zurich', ru: 'Веб-дизайн Цюрих' }[locale] ?? 'Web Design Zurich', url: { de: 'https://goldenwing.at/webdesign-zuerich', en: 'https://goldenwing.at/en/web-design-zurich', ru: 'https://goldenwing.at/ru/web-design-zurich' }[locale] ?? 'https://goldenwing.at/en/web-design-zurich' },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
