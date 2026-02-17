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
      title: 'E-Commerce Agentur Dubai · Online-Shops für VAE | GoldenWing',
      description: 'E-Commerce Entwicklung in Dubai. WooCommerce, Shopify & Custom Shops für den VAE-Markt. Payment-Integration & Logistik.',
      keywords: ['ecommerce agentur dubai', 'online shop dubai', 'shopify dubai'],
    },
    hero: {
      badge: 'E-Commerce Agentur in Dubai',
      title: 'E-Commerce Agentur Dubai',
      description: 'Online-Shops, die im VAE-Markt verkaufen. Wir entwickeln E-Commerce-Lösungen mit lokalen Zahlungsmethoden, Versand-Integration und kultureller Anpassung.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Büro in Dubai' },
      { icon: 'star', text: 'COD & Tabby' },
      { icon: 'clock', text: 'Lokale Logistik' },
    ],
    benefits: [
      { icon: 'zap', title: 'VAE-Zahlungen', description: 'COD, Tabby, Apple Pay, lokale Gateways' },
      { icon: 'shield', title: 'Versand-Integration', description: 'Aramex, Fetchr, DHL direkt angebunden' },
      { icon: 'users', title: 'Zweisprachig', description: 'Vollständige EN/AR Shops mit RTL' },
      { icon: 'star', title: 'Lokale Expertise', description: 'Verstehen den VAE-Konsumenten' },
    ],
    packages: [
      { name: 'Starter Shop', price: '8.000', description: 'Für den Start', popular: false, features: ['Shopify oder WooCommerce', 'Bis zu 50 Produkte', 'Responsive Design', 'Payment-Setup', 'Versand-Integration', 'SSL & Security'] },
      { name: 'Business Shop', price: '15.000', description: 'Für wachsende Händler', popular: true, features: ['Alles aus Starter+', 'Unbegrenzte Produkte', 'Zweisprachig (EN/AR)', 'Erweiterte Filter', 'Kundenkonten', 'Newsletter & Marketing', 'Inventory Management', '6 Monate Support'] },
      { name: 'Enterprise', price: '30.000+', description: 'Für große Händler', popular: false, features: ['Custom Development', 'ERP-Integration', 'Multi-Warehouse', 'Advanced Analytics', 'B2B-Features', 'API-Entwicklung', 'Dediziertes Team', '12 Monate Support'] },
    ],
    process: [
      { step: '01', title: 'Anforderungen', description: 'Analyse Ihrer Produkte und Zielgruppe.' },
      { step: '02', title: 'Plattformwahl', description: 'Shopify, WooCommerce oder Custom.' },
      { step: '03', title: 'Design & UX', description: 'Conversion-optimiertes Shop-Design.' },
      { step: '04', title: 'Entwicklung', description: 'Shop-Aufbau mit allen Integrationen.' },
      { step: '05', title: 'Launch', description: 'Go-Live und Verkaufsoptimierung.' },
    ],
    technologies: ['Shopify', 'WooCommerce', 'Magento', 'Next.js Commerce', 'Stripe', 'Tabby', 'Aramex API', 'Fetchr'],
    faqs: [
      { question: 'Welche E-Commerce-Plattformen empfehlt ihr für den VAE-Markt?', answer: 'Shopify und WooCommerce sind die gängigsten Optionen. Shopify für schnellen Start und einfache Verwaltung, WooCommerce für mehr Individualisierung und Kontrolle.' },
      { question: 'Unterstützt ihr lokale Zahlungsmethoden wie Cash on Delivery?', answer: 'Ja, wir integrieren alle relevanten Zahlungsmethoden für die VAE: COD, Kreditkarten, Apple Pay, Tabby (Buy Now Pay Later) und lokale Payment-Gateways.' },
      { question: 'Wie steht es um Versand-Integration für Dubai?', answer: 'Wir integrieren lokale Versanddienstleister wie Aramex, Fetchr, Quiqup oder DHL für nahtlose Logistik mit Echtzeit-Tracking.' },
      { question: 'Könnt ihr mehrsprachige Shops (EN/AR) erstellen?', answer: 'Absolut! Wir entwickeln vollständig zweisprachige E-Commerce-Lösungen mit korrekter RTL-Unterstützung, separaten Produktbeschreibungen und kulturell angepasstem Design.' },
      { question: 'Wie geht ihr mit dem hohen Retourenaufkommen in den VAE um?', answer: 'Wir implementieren benutzerfreundliche Retourenprozesse, klare Größentabellen, detaillierte Produktbeschreibungen und Kundenreviews, um Retouren zu minimieren.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Corporate Websites für Dubai.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Sichtbarkeit für Ihren Shop.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Traffic für Ihren Online-Shop.', href: '/digitales-marketing-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere E-Commerce-Pakete',
      pricingDescription: 'Shops, die für den VAE-Markt optimiert sind.',
      process: 'Unser E-Commerce-Prozess',
      processDescription: 'Vom Konzept zum verkaufenden Online-Shop.',
      technologies: 'Plattformen & Tools',
      technologiesDescription: 'Bewährte E-Commerce-Technologien für den VAE-Markt.',
      faq: 'Häufige Fragen zu E-Commerce Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für Ihren Online-Shop?',
      ctaDescription: 'Lassen Sie uns über Ihre E-Commerce-Strategie sprechen.',
      ctaButton: 'Shop anfragen',
    },
  },
  en: {
    meta: {
      title: 'E-Commerce Agency Dubai · Online Shops for UAE | GoldenWing',
      description: 'E-commerce development in Dubai. WooCommerce, Shopify & custom shops for the UAE market. Payment integration & logistics.',
      keywords: ['ecommerce agency dubai', 'online shop dubai', 'shopify dubai'],
    },
    hero: {
      badge: 'E-Commerce Agency in Dubai',
      title: 'E-Commerce Agency Dubai',
      description: 'Online shops that sell in the UAE market. We develop e-commerce solutions with local payment methods, shipping integration, and cultural adaptation.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Office in Dubai' },
      { icon: 'star', text: 'COD & Tabby' },
      { icon: 'clock', text: 'Local Logistics' },
    ],
    benefits: [
      { icon: 'zap', title: 'UAE Payments', description: 'COD, Tabby, Apple Pay, local gateways' },
      { icon: 'shield', title: 'Shipping Integration', description: 'Aramex, Fetchr, DHL directly connected' },
      { icon: 'users', title: 'Bilingual', description: 'Complete EN/AR shops with RTL' },
      { icon: 'star', title: 'Local Expertise', description: 'Understanding the UAE consumer' },
    ],
    packages: [
      { name: 'Starter Shop', price: '8,000', description: 'For getting started', popular: false, features: ['Shopify or WooCommerce', 'Up to 50 products', 'Responsive design', 'Payment setup', 'Shipping integration', 'SSL & security'] },
      { name: 'Business Shop', price: '15,000', description: 'For growing merchants', popular: true, features: ['Everything in Starter+', 'Unlimited products', 'Bilingual (EN/AR)', 'Advanced filters', 'Customer accounts', 'Newsletter & marketing', 'Inventory management', '6 months support'] },
      { name: 'Enterprise', price: '30,000+', description: 'For large merchants', popular: false, features: ['Custom development', 'ERP integration', 'Multi-warehouse', 'Advanced analytics', 'B2B features', 'API development', 'Dedicated team', '12 months support'] },
    ],
    process: [
      { step: '01', title: 'Requirements', description: 'Analysis of your products and target audience.' },
      { step: '02', title: 'Platform Choice', description: 'Shopify, WooCommerce, or custom.' },
      { step: '03', title: 'Design & UX', description: 'Conversion-optimized shop design.' },
      { step: '04', title: 'Development', description: 'Shop build with all integrations.' },
      { step: '05', title: 'Launch', description: 'Go-live and sales optimization.' },
    ],
    technologies: ['Shopify', 'WooCommerce', 'Magento', 'Next.js Commerce', 'Stripe', 'Tabby', 'Aramex API', 'Fetchr'],
    faqs: [
      { question: 'Which e-commerce platforms do you recommend for the UAE market?', answer: 'Shopify and WooCommerce are the most common options. Shopify for quick start and easy management, WooCommerce for more customization and control.' },
      { question: 'Do you support local payment methods like Cash on Delivery?', answer: 'Yes, we integrate all relevant payment methods for the UAE: COD, credit cards, Apple Pay, Tabby (Buy Now Pay Later), and local payment gateways.' },
      { question: 'What about shipping integration for Dubai?', answer: 'We integrate local shipping providers like Aramex, Fetchr, Quiqup, or DHL for seamless logistics with real-time tracking.' },
      { question: 'Can you create multilingual shops (EN/AR)?', answer: 'Absolutely! We develop fully bilingual e-commerce solutions with correct RTL support, separate product descriptions, and culturally adapted design.' },
      { question: 'How do you handle high return rates in the UAE?', answer: 'We implement user-friendly return processes, clear size guides, detailed product descriptions, and customer reviews to minimize returns.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Corporate websites for Dubai.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Visibility for your shop.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Traffic for your online shop.', href: '/digitales-marketing-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our E-Commerce Packages',
      pricingDescription: 'Shops optimized for the UAE market.',
      process: 'Our E-Commerce Process',
      processDescription: 'From concept to selling online shop.',
      technologies: 'Platforms & Tools',
      technologiesDescription: 'Proven e-commerce technologies for the UAE market.',
      faq: 'Frequently Asked Questions about E-Commerce Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for Your Online Shop?',
      ctaDescription: 'Let\'s discuss your e-commerce strategy.',
      ctaButton: 'Request Shop',
    },
  },
  ru: {
    meta: {
      title: 'E-Commerce агентство Дубай · Интернет-магазины для ОАЭ | GoldenWing',
      description: 'Разработка интернет-магазинов в Дубае. WooCommerce, Shopify и кастомные решения для рынка ОАЭ. Интеграция платежей и логистики.',
      keywords: ['ecommerce агентство дубай', 'интернет магазин дубай', 'shopify дубай'],
    },
    hero: {
      badge: 'E-Commerce агентство в Дубае',
      title: 'E-Commerce агентство Дубай',
      description: 'Интернет-магазины, которые продают на рынке ОАЭ. Мы разрабатываем e-commerce решения с локальными способами оплаты, интеграцией доставки и культурной адаптацией.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Дубае' },
      { icon: 'star', text: 'COD & Tabby' },
      { icon: 'clock', text: 'Локальная логистика' },
    ],
    benefits: [
      { icon: 'zap', title: 'Платежи ОАЭ', description: 'COD, Tabby, Apple Pay, локальные шлюзы' },
      { icon: 'shield', title: 'Интеграция доставки', description: 'Aramex, Fetchr, DHL напрямую подключены' },
      { icon: 'users', title: 'Двуязычность', description: 'Полноценные EN/AR магазины с RTL' },
      { icon: 'star', title: 'Локальная экспертиза', description: 'Понимаем потребителя ОАЭ' },
    ],
    packages: [
      { name: 'Starter Shop', price: '8 000', description: 'Для старта', popular: false, features: ['Shopify или WooCommerce', 'До 50 товаров', 'Адаптивный дизайн', 'Настройка платежей', 'Интеграция доставки', 'SSL и безопасность'] },
      { name: 'Business Shop', price: '15 000', description: 'Для растущих продавцов', popular: true, features: ['Всё из Starter+', 'Неограниченное количество товаров', 'Двуязычность (EN/AR)', 'Расширенные фильтры', 'Личные кабинеты клиентов', 'Рассылки и маркетинг', 'Управление складом', '6 месяцев поддержки'] },
      { name: 'Enterprise', price: '30 000+', description: 'Для крупных продавцов', popular: false, features: ['Кастомная разработка', 'Интеграция с ERP', 'Мульти-склад', 'Продвинутая аналитика', 'B2B функции', 'Разработка API', 'Выделенная команда', '12 месяцев поддержки'] },
    ],
    process: [
      { step: '01', title: 'Требования', description: 'Анализ ваших товаров и целевой аудитории.' },
      { step: '02', title: 'Выбор платформы', description: 'Shopify, WooCommerce или кастом.' },
      { step: '03', title: 'Дизайн и UX', description: 'Дизайн магазина для максимальной конверсии.' },
      { step: '04', title: 'Разработка', description: 'Создание магазина со всеми интеграциями.' },
      { step: '05', title: 'Запуск', description: 'Выход в продакшн и оптимизация продаж.' },
    ],
    technologies: ['Shopify', 'WooCommerce', 'Magento', 'Next.js Commerce', 'Stripe', 'Tabby', 'Aramex API', 'Fetchr'],
    faqs: [
      { question: 'Какие e-commerce платформы вы рекомендуете для рынка ОАЭ?', answer: 'Shopify и WooCommerce — наиболее популярные варианты. Shopify для быстрого старта и простого управления, WooCommerce для большей кастомизации и контроля.' },
      { question: 'Поддерживаете ли вы локальные способы оплаты, такие как наложенный платёж?', answer: 'Да, мы интегрируем все актуальные способы оплаты для ОАЭ: COD, банковские карты, Apple Pay, Tabby (оплата частями) и локальные платёжные шлюзы.' },
      { question: 'Как обстоят дела с интеграцией доставки для Дубая?', answer: 'Мы интегрируем локальных перевозчиков, таких как Aramex, Fetchr, Quiqup или DHL, для бесшовной логистики с отслеживанием в реальном времени.' },
      { question: 'Можете ли вы создать многоязычные магазины (EN/AR)?', answer: 'Безусловно! Мы разрабатываем полностью двуязычные e-commerce решения с корректной поддержкой RTL, отдельными описаниями товаров и культурно адаптированным дизайном.' },
      { question: 'Как вы справляетесь с высоким уровнем возвратов в ОАЭ?', answer: 'Мы внедряем удобные процессы возврата, понятные таблицы размеров, детальные описания товаров и отзывы клиентов для минимизации возвратов.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Корпоративные сайты для Дубая.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'SEO Дубай', description: 'Видимость для вашего магазина.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Цифровой маркетинг Дубай', description: 'Трафик для вашего интернет-магазина.', href: '/digitales-marketing-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши E-Commerce пакеты',
      pricingDescription: 'Магазины, оптимизированные для рынка ОАЭ.',
      process: 'Наш E-Commerce процесс',
      processDescription: 'От концепции до продающего интернет-магазина.',
      technologies: 'Платформы и инструменты',
      technologiesDescription: 'Проверенные e-commerce технологии для рынка ОАЭ.',
      faq: 'Часто задаваемые вопросы об E-Commerce в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к своему интернет-магазину?',
      ctaDescription: 'Давайте обсудим вашу e-commerce стратегию.',
      ctaButton: 'Запросить магазин',
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
      url: getCanonicalUrl('/ecommerce-agentur-dubai', locale),
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
      canonical: getCanonicalUrl('/ecommerce-agentur-dubai', locale),
      languages: getHreflangAlternates('/ecommerce-agentur-dubai').languages,
    },
  }
}

export default async function EcommerceAgenturDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'E-Commerce Agentur Dubai', en: 'E-Commerce Agency Dubai', ru: 'E-Commerce агентство Дубай' }[locale] || 'E-Commerce Agency Dubai',
      serviceUrl: 'https://goldenwing.at/ecommerce-agentur-dubai',
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
        { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] || 'Home', url: 'https://goldenwing.at' },
        { name: { de: 'E-Commerce Agentur Dubai', en: 'E-Commerce Agency Dubai', ru: 'E-Commerce агентство Дубай' }[locale] || 'E-Commerce Agency Dubai', url: { de: 'https://goldenwing.at/ecommerce-agentur-dubai', en: 'https://goldenwing.at/en/ecommerce-agency-dubai', ru: 'https://goldenwing.at/ru/ecommerce-agentur-dubai' }[locale] || 'https://goldenwing.at/en/ecommerce-agency-dubai' },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
