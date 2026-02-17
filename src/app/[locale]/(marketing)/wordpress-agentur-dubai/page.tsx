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
      title: 'WordPress Agentur Dubai · CMS-Experten in VAE | GoldenWing',
      description: 'WordPress-Entwicklung in Dubai. Themes, Plugins & individuelle Lösungen. Wartung & Support für Unternehmen in den VAE.',
      keywords: ['wordpress agentur dubai', 'wordpress dubai', 'wordpress entwicklung dubai'],
    },
    hero: {
      badge: 'WordPress Agentur in Dubai',
      title: 'WordPress Agentur Dubai',
      description: 'WordPress-Expertise für den VAE-Markt. Wir entwickeln Custom Themes, Plugins und komplette WordPress-Lösungen – mit lokalem Support in Dubai.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Büro in Dubai' },
      { icon: 'star', text: 'WordPress-Experten' },
      { icon: 'clock', text: 'Lokaler Support' },
    ],
    benefits: [
      { icon: 'zap', title: 'Custom Development', description: 'Maßgeschneiderte Themes und Plugins' },
      { icon: 'shield', title: 'Wartung & Security', description: 'Updates, Backups und Sicherheit' },
      { icon: 'users', title: 'Mehrsprachig', description: 'WPML für EN/AR Websites' },
      { icon: 'star', title: 'Performance', description: 'Optimiert für schnelle Ladezeiten' },
    ],
    packages: [
      { name: 'Starter', price: '4.000', description: 'Für kleine Websites', popular: false, features: ['Custom Theme', 'Bis zu 8 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO-Grundlagen', 'SSL & Security'] },
      { name: 'Business', price: '8.000', description: 'Für Unternehmen', popular: true, features: ['Alles aus Starter+', 'Bis zu 20 Seiten', 'Custom Plugins', 'WPML (2 Sprachen)', 'Blog & News', 'Performance-Optimierung', 'Training Session', '12 Monate Support'] },
      { name: 'Enterprise', price: '15.000+', description: 'Für komplexe Projekte', popular: false, features: ['Alles aus Business+', 'Unbegrenzte Seiten', 'Multisite-Setup', 'Custom Integrationen', 'Staging Environment', 'Dedizierter Support', 'SLA-Garantien', 'Wartungsvertrag'] },
    ],
    process: [
      { step: '01', title: 'Anforderungen', description: 'Analyse Ihrer Bedürfnisse und Ziele.' },
      { step: '02', title: 'Design', description: 'UI/UX Design für Ihre WordPress-Seite.' },
      { step: '03', title: 'Entwicklung', description: 'Custom Theme und Plugin-Entwicklung.' },
      { step: '04', title: 'Testing', description: 'Gründliche Tests auf allen Geräten.' },
      { step: '05', title: 'Launch', description: 'Go-Live und Schulung Ihres Teams.' },
    ],
    technologies: ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF Pro', 'WPML', 'Yoast SEO', 'WP Rocket', 'PHP 8'],
    faqs: [
      { question: 'Warum WordPress für Unternehmen in Dubai?', answer: 'WordPress ist das weltweit meistgenutzte CMS - flexibel, skalierbar und einfach zu verwalten. Perfekt für Unternehmen, die ihre Website selbst pflegen möchten.' },
      { question: 'Entwickelt ihr auch Custom WordPress Themes?', answer: 'Ja, wir erstellen maßgeschneiderte WordPress-Themes, die perfekt zu Ihrer Marke passen - keine Templates von der Stange, sondern individuelles Design.' },
      { question: 'Bietet ihr WordPress-Wartung und Support an?', answer: 'Ja, wir bieten Wartungspakete mit regelmäßigen Updates, Backups, Sicherheitsüberwachung und technischem Support - auch in UAE-Zeitzonen.' },
      { question: 'Könnt ihr bestehende WordPress-Seiten optimieren?', answer: 'Absolut. Wir führen Performance-Audits durch, optimieren Ladezeiten, verbessern SEO und modernisieren veraltete Designs oder Plugins.' },
      { question: 'Unterstützt ihr auch WordPress Multisite für Konzerne?', answer: 'Ja, wir haben Erfahrung mit WordPress Multisite für Unternehmen mit mehreren Standorten, Marken oder Sprachversionen unter einer Installation.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Moderne Websites für Dubai.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'WooCommerce Online-Shops.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'WordPress SEO-Optimierung.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere WordPress-Pakete',
      pricingDescription: 'Professionelle WordPress-Entwicklung für den VAE-Markt.',
      process: 'Unser WordPress-Prozess',
      processDescription: 'Von der Konzeption bis zum Launch – strukturiert und effizient.',
      technologies: 'WordPress Stack',
      technologiesDescription: 'Bewährte WordPress-Technologien und Premium-Plugins.',
      faq: 'Häufige Fragen zu WordPress Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für Ihre WordPress-Website?',
      ctaDescription: 'Lassen Sie uns über Ihr WordPress-Projekt sprechen.',
      ctaButton: 'Projekt anfragen',
    },
  },
  en: {
    meta: {
      title: 'WordPress Agency Dubai · CMS Experts in UAE | GoldenWing',
      description: 'WordPress development in Dubai. Themes, plugins & custom solutions. Maintenance & support for UAE businesses.',
      keywords: ['wordpress agency dubai', 'wordpress dubai', 'wordpress development dubai'],
    },
    hero: {
      badge: 'WordPress Agency in Dubai',
      title: 'WordPress Agency Dubai',
      description: 'WordPress expertise for the UAE market. We develop custom themes, plugins, and complete WordPress solutions – with local support in Dubai.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Office in Dubai' },
      { icon: 'star', text: 'WordPress Experts' },
      { icon: 'clock', text: 'Local Support' },
    ],
    benefits: [
      { icon: 'zap', title: 'Custom Development', description: 'Tailored themes and plugins' },
      { icon: 'shield', title: 'Maintenance & Security', description: 'Updates, backups, and security' },
      { icon: 'users', title: 'Multilingual', description: 'WPML for EN/AR websites' },
      { icon: 'star', title: 'Performance', description: 'Optimized for fast loading' },
    ],
    packages: [
      { name: 'Starter', price: '4,000', description: 'For small websites', popular: false, features: ['Custom theme', 'Up to 8 pages', 'Responsive design', 'Contact form', 'SEO basics', 'SSL & security'] },
      { name: 'Business', price: '8,000', description: 'For businesses', popular: true, features: ['Everything in Starter+', 'Up to 20 pages', 'Custom plugins', 'WPML (2 languages)', 'Blog & news', 'Performance optimization', 'Training session', '12 months support'] },
      { name: 'Enterprise', price: '15,000+', description: 'For complex projects', popular: false, features: ['Everything in Business+', 'Unlimited pages', 'Multisite setup', 'Custom integrations', 'Staging environment', 'Dedicated support', 'SLA guarantees', 'Maintenance contract'] },
    ],
    process: [
      { step: '01', title: 'Requirements', description: 'Analysis of your needs and goals.' },
      { step: '02', title: 'Design', description: 'UI/UX design for your WordPress site.' },
      { step: '03', title: 'Development', description: 'Custom theme and plugin development.' },
      { step: '04', title: 'Testing', description: 'Thorough testing on all devices.' },
      { step: '05', title: 'Launch', description: 'Go-live and training for your team.' },
    ],
    technologies: ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF Pro', 'WPML', 'Yoast SEO', 'WP Rocket', 'PHP 8'],
    faqs: [
      { question: 'Why WordPress for businesses in Dubai?', answer: 'WordPress is the world\'s most used CMS - flexible, scalable, and easy to manage. Perfect for businesses that want to maintain their website themselves.' },
      { question: 'Do you develop custom WordPress themes?', answer: 'Yes, we create custom WordPress themes that perfectly match your brand - no off-the-shelf templates, but individual design.' },
      { question: 'Do you offer WordPress maintenance and support?', answer: 'Yes, we offer maintenance packages with regular updates, backups, security monitoring, and technical support - also in UAE time zones.' },
      { question: 'Can you optimize existing WordPress sites?', answer: 'Absolutely. We conduct performance audits, optimize loading times, improve SEO, and modernize outdated designs or plugins.' },
      { question: 'Do you support WordPress Multisite for corporations?', answer: 'Yes, we have experience with WordPress Multisite for companies with multiple locations, brands, or language versions under one installation.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Modern websites for Dubai.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'WooCommerce online shops.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'WordPress SEO optimization.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our WordPress Packages',
      pricingDescription: 'Professional WordPress development for the UAE market.',
      process: 'Our WordPress Process',
      processDescription: 'From concept to launch – structured and efficient.',
      technologies: 'WordPress Stack',
      technologiesDescription: 'Proven WordPress technologies and premium plugins.',
      faq: 'Frequently Asked Questions about WordPress Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for Your WordPress Website?',
      ctaDescription: 'Let\'s discuss your WordPress project.',
      ctaButton: 'Request Project',
    },
  },
  ru: {
    meta: {
      title: 'WordPress Агентство Дубай · CMS-эксперты в ОАЭ | GoldenWing',
      description: 'WordPress-разработка в Дубае. Темы, плагины и индивидуальные решения. Обслуживание и поддержка для компаний в ОАЭ.',
      keywords: ['wordpress агентство дубай', 'wordpress дубай', 'wordpress разработка дубай'],
    },
    hero: {
      badge: 'WordPress Агентство в Дубае',
      title: 'WordPress Агентство Дубай',
      description: 'Экспертиза WordPress для рынка ОАЭ. Мы разрабатываем кастомные темы, плагины и комплексные WordPress-решения — с локальной поддержкой в Дубае.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Дубае' },
      { icon: 'star', text: 'WordPress-эксперты' },
      { icon: 'clock', text: 'Локальная поддержка' },
    ],
    benefits: [
      { icon: 'zap', title: 'Кастомная разработка', description: 'Индивидуальные темы и плагины' },
      { icon: 'shield', title: 'Обслуживание и безопасность', description: 'Обновления, бэкапы и защита' },
      { icon: 'users', title: 'Мультиязычность', description: 'WPML для EN/AR сайтов' },
      { icon: 'star', title: 'Производительность', description: 'Оптимизация скорости загрузки' },
    ],
    packages: [
      { name: 'Starter', price: '4 000', description: 'Для небольших сайтов', popular: false, features: ['Кастомная тема', 'До 8 страниц', 'Адаптивный дизайн', 'Контактная форма', 'Основы SEO', 'SSL и безопасность'] },
      { name: 'Business', price: '8 000', description: 'Для бизнеса', popular: true, features: ['Всё из Starter+', 'До 20 страниц', 'Кастомные плагины', 'WPML (2 языка)', 'Блог и новости', 'Оптимизация производительности', 'Обучающая сессия', '12 месяцев поддержки'] },
      { name: 'Enterprise', price: '15 000+', description: 'Для сложных проектов', popular: false, features: ['Всё из Business+', 'Неограниченное количество страниц', 'Multisite-настройка', 'Кастомные интеграции', 'Тестовая среда', 'Выделенная поддержка', 'SLA-гарантии', 'Контракт на обслуживание'] },
    ],
    process: [
      { step: '01', title: 'Требования', description: 'Анализ ваших потребностей и целей.' },
      { step: '02', title: 'Дизайн', description: 'UI/UX дизайн для вашего WordPress-сайта.' },
      { step: '03', title: 'Разработка', description: 'Разработка кастомной темы и плагинов.' },
      { step: '04', title: 'Тестирование', description: 'Тщательное тестирование на всех устройствах.' },
      { step: '05', title: 'Запуск', description: 'Запуск и обучение вашей команды.' },
    ],
    technologies: ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF Pro', 'WPML', 'Yoast SEO', 'WP Rocket', 'PHP 8'],
    faqs: [
      { question: 'Почему WordPress для бизнеса в Дубае?', answer: 'WordPress — самая популярная CMS в мире: гибкая, масштабируемая и простая в управлении. Идеально подходит для компаний, которые хотят самостоятельно управлять своим сайтом.' },
      { question: 'Вы разрабатываете кастомные WordPress-темы?', answer: 'Да, мы создаём индивидуальные WordPress-темы, которые идеально соответствуют вашему бренду — никаких готовых шаблонов, только уникальный дизайн.' },
      { question: 'Вы предлагаете обслуживание и поддержку WordPress?', answer: 'Да, мы предлагаем пакеты обслуживания с регулярными обновлениями, резервным копированием, мониторингом безопасности и технической поддержкой — в том числе в часовом поясе ОАЭ.' },
      { question: 'Можете ли вы оптимизировать существующие WordPress-сайты?', answer: 'Безусловно. Мы проводим аудит производительности, оптимизируем скорость загрузки, улучшаем SEO и модернизируем устаревший дизайн или плагины.' },
      { question: 'Вы поддерживаете WordPress Multisite для корпораций?', answer: 'Да, у нас есть опыт работы с WordPress Multisite для компаний с несколькими локациями, брендами или языковыми версиями в одной установке.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Современные сайты для Дубая.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'E-Commerce Дубай', description: 'WooCommerce интернет-магазины.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
      { title: 'SEO Дубай', description: 'WordPress SEO-оптимизация.', href: '/seo-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши WordPress-пакеты',
      pricingDescription: 'Профессиональная WordPress-разработка для рынка ОАЭ.',
      process: 'Наш WordPress-процесс',
      processDescription: 'От концепции до запуска — структурированно и эффективно.',
      technologies: 'WordPress-стек',
      technologiesDescription: 'Проверенные WordPress-технологии и премиум-плагины.',
      faq: 'Часто задаваемые вопросы о WordPress в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к вашему WordPress-сайту?',
      ctaDescription: 'Давайте обсудим ваш WordPress-проект.',
      ctaButton: 'Запросить проект',
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
      url: getCanonicalUrl('/wordpress-agentur-dubai', locale),
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
      canonical: getCanonicalUrl('/wordpress-agentur-dubai', locale),
      languages: getHreflangAlternates('/wordpress-agentur-dubai').languages,
    },
  }
}

export default async function WordpressAgenturDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'WordPress Agentur Dubai', en: 'WordPress Agency Dubai', ru: 'WordPress Агентство Дубай' }[locale],
      serviceUrl: 'https://goldenwing.at/wordpress-agentur-dubai',
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
        { name: { de: 'WordPress Agentur Dubai', en: 'WordPress Agency Dubai', ru: 'WordPress Агентство Дубай' }[locale], url: { de: 'https://goldenwing.at/wordpress-agentur-dubai', en: 'https://goldenwing.at/en/wordpress-agency-dubai', ru: 'https://goldenwing.at/ru/wordpress-agency-dubai' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
