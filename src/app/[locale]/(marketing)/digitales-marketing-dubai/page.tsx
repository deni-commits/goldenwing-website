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
      title: 'Digitales Marketing Dubai · Online-Wachstum VAE | GoldenWing',
      description: 'Digital Marketing Agentur in Dubai. SEO, PPC, Social Media & Content Marketing für den Middle East Markt.',
      keywords: ['digitales marketing dubai', 'digital marketing dubai', 'online marketing dubai'],
    },
    hero: {
      badge: 'Digital Marketing Agentur in Dubai',
      title: 'Digitales Marketing Dubai',
      description: 'Wachstum für Ihr Business im VAE-Markt. Wir kombinieren SEO, Paid Ads, Social Media und Content Marketing für messbare Ergebnisse.',
      ctaPrimary: 'Kostenlose Beratung',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Büro in Dubai' },
      { icon: 'star', text: 'ROI-fokussiert' },
      { icon: 'clock', text: 'Lokales Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Full-Funnel Marketing', description: 'Von Awareness bis Conversion' },
      { icon: 'shield', title: 'Lokales Wissen', description: 'Verstehen den VAE-Konsumenten' },
      { icon: 'users', title: 'Multichannel', description: 'Instagram, LinkedIn, Google, TikTok' },
      { icon: 'star', title: 'Messbare Ergebnisse', description: 'Datengetrieben mit klaren KPIs' },
    ],
    packages: [
      { name: 'Starter', price: '2.000/mtl.', description: 'Für den Einstieg', popular: false, features: ['1 Kanal (SEO oder Ads)', 'Monatliche Optimierung', 'Basis-Reporting', 'Keyword-Tracking', 'Wettbewerbsanalyse', 'Monatliches Review'] },
      { name: 'Growth', price: '4.000/mtl.', description: 'Für wachsende Unternehmen', popular: true, features: ['SEO + Paid Ads', 'Social Media Management', 'Content-Erstellung', 'Landing Page Optimierung', 'Conversion Tracking', 'A/B Testing', 'Wöchentliches Reporting', 'Bi-Weekly Calls'] },
      { name: 'Scale', price: '8.000+/mtl.', description: 'Für aggressive Skalierung', popular: false, features: ['Alle Kanäle', 'Dedizierter Account Manager', 'Video & Influencer Marketing', 'Marketing Automation', 'CRM-Integration', 'Custom Dashboards', 'Real-time Reporting', 'Tägliche Optimierung'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyse Ihrer aktuellen Marketing-Performance.' },
      { step: '02', title: 'Strategie', description: 'Maßgeschneiderter Plan für Ihre Ziele.' },
      { step: '03', title: 'Setup', description: 'Kampagnen-Aufbau und Tracking-Integration.' },
      { step: '04', title: 'Execution', description: 'Laufende Optimierung und Content-Produktion.' },
      { step: '05', title: 'Reporting', description: 'Transparente Berichte und Strategieanpassung.' },
    ],
    technologies: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'SEMrush', 'HubSpot', 'Klaviyo', 'Google Analytics 4'],
    faqs: [
      { question: 'Welche Digital Marketing Services bietet ihr in Dubai an?', answer: 'SEO, Google Ads, Social Media Marketing (Instagram, LinkedIn, TikTok), Content Marketing, E-Mail Marketing, Influencer Marketing und Marketing Automation.' },
      { question: 'Versteht ihr die Social Media Landschaft in den VAE?', answer: 'Ja, Instagram und TikTok sind in den VAE extrem populär, LinkedIn für B2B. Wir wissen, welche Plattformen für welche Zielgruppen funktionieren.' },
      { question: 'Arbeitet ihr auch mit arabischsprachigem Marketing?', answer: 'Ja, wir haben Partner für arabisches Copywriting, Arabisch-SEO und kulturell angepasste Kampagnen, die bei der lokalen Bevölkerung resonieren.' },
      { question: 'Wie messt ihr den Erfolg von Marketing-Kampagnen?', answer: 'Wir setzen auf klare KPIs: Traffic, Conversions, Cost per Lead, ROAS. Monatliche Reports zeigen transparent, was funktioniert und wo optimiert wird.' },
      { question: 'Bietet ihr auch Marketing für Ramadan und lokale Events?', answer: 'Ja, saisonales Marketing für Ramadan, Eid, UAE National Day und Dubai Shopping Festival gehört zu unseren Spezialitäten.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Organische Sichtbarkeit.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Webdesign Dubai', description: 'Conversion-optimierte Websites.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Online-Shops für den VAE-Markt.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere Marketing-Pakete',
      pricingDescription: 'Flexibel und ergebnisorientiert. Monatliche Laufzeit.',
      process: 'Unser Marketing-Prozess',
      processDescription: 'Datengetrieben und agil – so optimieren wir Ihre Performance.',
      technologies: 'Marketing-Tools',
      technologiesDescription: 'Enterprise-Tools für messbare Ergebnisse.',
      faq: 'Häufige Fragen zu Digital Marketing Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für mehr Wachstum?',
      ctaDescription: 'Lassen Sie uns über Ihre Marketing-Strategie sprechen.',
      ctaButton: 'Marketing anfragen',
    },
  },
  en: {
    meta: {
      title: 'Digital Marketing Dubai · Online Growth UAE | GoldenWing',
      description: 'Digital marketing agency in Dubai. SEO, PPC, social media & content marketing for the Middle East market. ROI-focused.',
      keywords: ['digital marketing dubai', 'online marketing dubai', 'marketing agency dubai'],
    },
    hero: {
      badge: 'Digital Marketing Agency in Dubai',
      title: 'Digital Marketing Dubai',
      description: 'Growth for your business in the UAE market. We combine SEO, paid ads, social media, and content marketing for measurable results.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Office in Dubai' },
      { icon: 'star', text: 'ROI-Focused' },
      { icon: 'clock', text: 'Local Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Full-Funnel Marketing', description: 'From awareness to conversion' },
      { icon: 'shield', title: 'Local Knowledge', description: 'Understanding the UAE consumer' },
      { icon: 'users', title: 'Multichannel', description: 'Instagram, LinkedIn, Google, TikTok' },
      { icon: 'star', title: 'Measurable Results', description: 'Data-driven with clear KPIs' },
    ],
    packages: [
      { name: 'Starter', price: '2,000/mo', description: 'For getting started', popular: false, features: ['1 channel (SEO or Ads)', 'Monthly optimization', 'Basic reporting', 'Keyword tracking', 'Competitor analysis', 'Monthly review'] },
      { name: 'Growth', price: '4,000/mo', description: 'For growing businesses', popular: true, features: ['SEO + Paid Ads', 'Social media management', 'Content creation', 'Landing page optimization', 'Conversion tracking', 'A/B testing', 'Weekly reporting', 'Bi-weekly calls'] },
      { name: 'Scale', price: '8,000+/mo', description: 'For aggressive scaling', popular: false, features: ['All channels', 'Dedicated account manager', 'Video & influencer marketing', 'Marketing automation', 'CRM integration', 'Custom dashboards', 'Real-time reporting', 'Daily optimization'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analysis of your current marketing performance.' },
      { step: '02', title: 'Strategy', description: 'Customized plan for your goals.' },
      { step: '03', title: 'Setup', description: 'Campaign setup and tracking integration.' },
      { step: '04', title: 'Execution', description: 'Ongoing optimization and content production.' },
      { step: '05', title: 'Reporting', description: 'Transparent reports and strategy adjustment.' },
    ],
    technologies: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'SEMrush', 'HubSpot', 'Klaviyo', 'Google Analytics 4'],
    faqs: [
      { question: 'What digital marketing services do you offer in Dubai?', answer: 'SEO, Google Ads, social media marketing (Instagram, LinkedIn, TikTok), content marketing, email marketing, influencer marketing, and marketing automation.' },
      { question: 'Do you understand the social media landscape in the UAE?', answer: 'Yes, Instagram and TikTok are extremely popular in the UAE, LinkedIn for B2B. We know which platforms work for which target audiences.' },
      { question: 'Do you also work with Arabic-language marketing?', answer: 'Yes, we have partners for Arabic copywriting, Arabic SEO, and culturally adapted campaigns that resonate with the local population.' },
      { question: 'How do you measure marketing campaign success?', answer: 'We focus on clear KPIs: traffic, conversions, cost per lead, ROAS. Monthly reports transparently show what works and where to optimize.' },
      { question: 'Do you offer marketing for Ramadan and local events?', answer: 'Yes, seasonal marketing for Ramadan, Eid, UAE National Day, and Dubai Shopping Festival is one of our specialties.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Organic visibility.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Web Design Dubai', description: 'Conversion-optimized websites.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Online shops for the UAE market.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our Marketing Packages',
      pricingDescription: 'Flexible and results-oriented. Monthly terms.',
      process: 'Our Marketing Process',
      processDescription: 'Data-driven and agile – how we optimize your performance.',
      technologies: 'Marketing Tools',
      technologiesDescription: 'Enterprise tools for measurable results.',
      faq: 'Frequently Asked Questions about Digital Marketing Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for More Growth?',
      ctaDescription: 'Let\'s discuss your marketing strategy.',
      ctaButton: 'Request Marketing',
    },
  },
  ru: {
    meta: {
      title: 'Цифровой маркетинг Дубай · Онлайн-рост ОАЭ | GoldenWing',
      description: 'Агентство цифрового маркетинга в Дубае. SEO, PPC, социальные сети и контент-маркетинг для рынка Ближнего Востока. Ориентация на ROI.',
      keywords: ['цифровой маркетинг дубай', 'онлайн маркетинг дубай', 'маркетинговое агентство дубай'],
    },
    hero: {
      badge: 'Агентство цифрового маркетинга в Дубае',
      title: 'Цифровой маркетинг Дубай',
      description: 'Рост вашего бизнеса на рынке ОАЭ. Мы объединяем SEO, платную рекламу, социальные сети и контент-маркетинг для измеримых результатов.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Офис в Дубае' },
      { icon: 'star', text: 'Фокус на ROI' },
      { icon: 'clock', text: 'Локальная команда' },
    ],
    benefits: [
      { icon: 'zap', title: 'Full-Funnel маркетинг', description: 'От осведомленности до конверсии' },
      { icon: 'shield', title: 'Локальная экспертиза', description: 'Понимание потребителей ОАЭ' },
      { icon: 'users', title: 'Мультиканальность', description: 'Instagram, LinkedIn, Google, TikTok' },
      { icon: 'star', title: 'Измеримые результаты', description: 'Основано на данных с четкими KPI' },
    ],
    packages: [
      { name: 'Стартовый', price: '2 000/мес.', description: 'Для начала работы', popular: false, features: ['1 канал (SEO или Реклама)', 'Ежемесячная оптимизация', 'Базовая отчетность', 'Отслеживание ключевых слов', 'Анализ конкурентов', 'Ежемесячный обзор'] },
      { name: 'Рост', price: '4 000/мес.', description: 'Для растущего бизнеса', popular: true, features: ['SEO + Платная реклама', 'Управление социальными сетями', 'Создание контента', 'Оптимизация посадочных страниц', 'Отслеживание конверсий', 'A/B тестирование', 'Еженедельная отчетность', 'Звонки раз в две недели'] },
      { name: 'Масштаб', price: '8 000+/мес.', description: 'Для агрессивного масштабирования', popular: false, features: ['Все каналы', 'Персональный менеджер', 'Видео и инфлюенсер-маркетинг', 'Автоматизация маркетинга', 'Интеграция с CRM', 'Индивидуальные дашборды', 'Отчетность в реальном времени', 'Ежедневная оптимизация'] },
    ],
    process: [
      { step: '01', title: 'Аудит', description: 'Анализ текущей эффективности вашего маркетинга.' },
      { step: '02', title: 'Стратегия', description: 'Индивидуальный план для ваших целей.' },
      { step: '03', title: 'Настройка', description: 'Создание кампаний и интеграция отслеживания.' },
      { step: '04', title: 'Исполнение', description: 'Непрерывная оптимизация и создание контента.' },
      { step: '05', title: 'Отчетность', description: 'Прозрачные отчеты и корректировка стратегии.' },
    ],
    technologies: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'SEMrush', 'HubSpot', 'Klaviyo', 'Google Analytics 4'],
    faqs: [
      { question: 'Какие услуги цифрового маркетинга вы предлагаете в Дубае?', answer: 'SEO, Google Ads, маркетинг в социальных сетях (Instagram, LinkedIn, TikTok), контент-маркетинг, email-маркетинг, инфлюенсер-маркетинг и автоматизация маркетинга.' },
      { question: 'Понимаете ли вы ландшафт социальных сетей в ОАЭ?', answer: 'Да, Instagram и TikTok чрезвычайно популярны в ОАЭ, LinkedIn для B2B. Мы знаем, какие платформы работают для каких целевых аудиторий.' },
      { question: 'Работаете ли вы с маркетингом на арабском языке?', answer: 'Да, у нас есть партнеры для арабского копирайтинга, арабского SEO и культурно адаптированных кампаний, которые резонируют с местным населением.' },
      { question: 'Как вы измеряете успех маркетинговых кампаний?', answer: 'Мы фокусируемся на четких KPI: трафик, конверсии, стоимость лида, ROAS. Ежемесячные отчеты прозрачно показывают, что работает и где нужна оптимизация.' },
      { question: 'Предлагаете ли вы маркетинг для Рамадана и местных событий?', answer: 'Да, сезонный маркетинг для Рамадана, Ид, Национального дня ОАЭ и Дубайского торгового фестиваля — одна из наших специализаций.' },
    ],
    relatedServices: [
      { title: 'SEO Дубай', description: 'Органическая видимость.', href: '/seo-agentur-dubai' as StaticAppPathname },
      { title: 'Веб-дизайн Дубай', description: 'Сайты, оптимизированные для конверсии.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'E-Commerce Дубай', description: 'Интернет-магазины для рынка ОАЭ.', href: '/ecommerce-agentur-dubai' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши маркетинговые пакеты',
      pricingDescription: 'Гибко и ориентировано на результат. Ежемесячные условия.',
      process: 'Наш маркетинговый процесс',
      processDescription: 'На основе данных и гибко — как мы оптимизируем вашу эффективность.',
      technologies: 'Маркетинговые инструменты',
      technologiesDescription: 'Корпоративные инструменты для измеримых результатов.',
      faq: 'Часто задаваемые вопросы о цифровом маркетинге в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к большему росту?',
      ctaDescription: 'Давайте обсудим вашу маркетинговую стратегию.',
      ctaButton: 'Запросить маркетинг',
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
      url: getCanonicalUrl('/digitales-marketing-dubai', locale),
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
      canonical: getCanonicalUrl('/digitales-marketing-dubai', locale),
      languages: getHreflangAlternates('/digitales-marketing-dubai').languages,
    },
  }
}

export default async function DigitalesMarketingDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'Digitales Marketing Dubai', en: 'Digital Marketing Dubai', ru: 'Цифровой маркетинг Дубай' }[locale],
      serviceUrl: 'https://goldenwing.at/digitales-marketing-dubai',
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
        { name: { de: 'Digitales Marketing Dubai', en: 'Digital Marketing Dubai', ru: 'Цифровой маркетинг Дубай' }[locale], url: { de: 'https://goldenwing.at/digitales-marketing-dubai', en: 'https://goldenwing.at/en/digital-marketing-dubai', ru: 'https://goldenwing.at/ru/digital-marketing-dubai' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
