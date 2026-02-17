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
      title: 'SEO Agentur Dubai · Sichtbarkeit im Middle East | GoldenWing',
      description: 'SEO-Experten in Dubai. Wir optimieren für Google.ae. Englisch & Arabisch SEO. Lokale und internationale Rankings.',
      keywords: ['seo agentur dubai', 'seo dubai', 'suchmaschinenoptimierung dubai'],
    },
    hero: {
      badge: 'SEO Agentur in Dubai',
      title: 'SEO Agentur Dubai',
      description: 'Dominieren Sie die Suchergebnisse in den VAE. Unsere SEO-Experten in Dubai optimieren Ihre Website für Google.ae – in Englisch und Arabisch.',
      ctaPrimary: 'Kostenlose SEO-Analyse',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Google.ae Expertise' },
      { icon: 'star', text: 'EN/AR SEO' },
      { icon: 'clock', text: 'Lokales Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Google.ae Optimierung', description: 'Spezialisiert auf die lokale Google-Suche in den VAE' },
      { icon: 'shield', title: 'Zweisprachiges SEO', description: 'Optimierung für englische und arabische Keywords' },
      { icon: 'users', title: 'Local SEO', description: 'Google My Business und lokale Verzeichnisse' },
      { icon: 'star', title: 'Reporting auf Deutsch', description: 'Verständliche Reports in Ihrer Sprache' },
    ],
    packages: [
      { name: 'Local SEO', price: '800/Monat', description: 'Für lokale Unternehmen', popular: false, features: ['Google My Business', 'Lokale Keywords', 'NAP-Optimierung', 'Bewertungsmanagement', 'Monatliches Reporting', '3 lokale Verzeichnisse'] },
      { name: 'Business SEO', price: '1.500/Monat', description: 'Für wachsende Unternehmen', popular: true, features: ['Alles aus Local SEO', 'On-Page Optimierung', '20 Keywords', 'Content-Strategie', 'Backlink-Aufbau', 'Wettbewerbsanalyse', 'Technisches SEO', 'Bi-weekly Reporting'] },
      { name: 'Enterprise SEO', price: '3.000+/Monat', description: 'Für große Unternehmen', popular: false, features: ['Alles aus Business SEO', 'Unbegrenzte Keywords', 'Arabisches SEO', 'Internationale SEO', 'Content-Produktion', 'Dedizierter Manager', 'Weekly Calls', 'Custom Reporting'] },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Analyse Ihrer aktuellen Performance und Wettbewerber.' },
      { step: '02', title: 'Strategie', description: 'Keyword-Recherche und SEO-Strategie für den VAE-Markt.' },
      { step: '03', title: 'On-Page', description: 'Technische und inhaltliche Optimierung Ihrer Website.' },
      { step: '04', title: 'Off-Page', description: 'Backlink-Aufbau und lokale Citations.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Reports und kontinuierliche Optimierung.' },
    ],
    technologies: ['Google Search Console', 'Google Analytics', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'BrightLocal', 'Google My Business', 'Schema.org'],
    faqs: [
      { question: 'Wie unterscheidet sich SEO in Dubai vom europäischen Markt?', answer: 'Der Dubai-Markt ist zweisprachig (Englisch/Arabisch) und stark lokal fokussiert. Wir optimieren für beide Sprachen und lokale Suchintentionen.' },
      { question: 'Optimiert ihr auch für Google.ae?', answer: 'Ja, wir optimieren gezielt für die lokale Google-Version und berücksichtigen die Besonderheiten des VAE-Marktes.' },
      { question: 'Wie wichtig ist Google My Business in Dubai?', answer: "Sehr wichtig! Lokale Suchanfragen wie 'near me' sind in Dubai extrem relevant. Ein optimiertes GMB-Profil ist essentiell." },
      { question: 'Könnt ihr auch für arabische Keywords optimieren?', answer: 'Ja, wir arbeiten mit arabischsprachigen SEO-Spezialisten zusammen, um auch den arabischen Suchmarkt abzudecken.' },
      { question: 'Wie lange dauert SEO in einem wettbewerbsintensiven Markt wie Dubai?', answer: 'Dubai ist kompetitiv. Realistische Ergebnisse erwarten wir nach 6-12 Monaten, erste Verbesserungen nach 3-4 Monaten.' },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'SEO-optimierte Websites für Dubai.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Markenaufbau für den Golfmarkt.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Content-Strategie für bessere Rankings.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'SEO-Pakete für Dubai',
      pricingDescription: 'Monatliche SEO-Betreuung für nachhaltige Ergebnisse. Keine langfristigen Verträge.',
      process: 'Unser SEO-Prozess',
      processDescription: 'Systematische Optimierung für messbare Ergebnisse in den VAE.',
      technologies: 'Tools & Plattformen',
      technologiesDescription: 'Wir nutzen die besten SEO-Tools für maximale Transparenz.',
      faq: 'Häufige Fragen zu SEO Dubai',
      relatedServices: 'Weitere Services in Dubai',
      ctaTitle: 'Bereit für bessere Rankings in Dubai?',
      ctaDescription: 'Kostenlose SEO-Analyse Ihrer Website. Erfahren Sie, wo Sie stehen.',
      ctaButton: 'SEO-Analyse anfordern',
    },
  },
  en: {
    meta: {
      title: 'SEO Agency Dubai · Visibility in Middle East | GoldenWing',
      description: 'SEO experts in Dubai. We optimize for Google.ae. English & Arabic SEO. Local and international rankings for UAE businesses.',
      keywords: ['seo agency dubai', 'seo dubai', 'search engine optimization dubai', 'seo company dubai'],
    },
    hero: {
      badge: 'SEO Agency in Dubai',
      title: 'SEO Agency Dubai',
      description: 'Dominate search results in the UAE. Our SEO experts in Dubai optimize your website for Google.ae – in English and Arabic.',
      ctaPrimary: 'Free SEO Analysis',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'Google.ae Expertise' },
      { icon: 'star', text: 'EN/AR SEO' },
      { icon: 'clock', text: 'Local Team' },
    ],
    benefits: [
      { icon: 'zap', title: 'Google.ae Optimization', description: 'Specialized in local Google search in the UAE' },
      { icon: 'shield', title: 'Bilingual SEO', description: 'Optimization for English and Arabic keywords' },
      { icon: 'users', title: 'Local SEO', description: 'Google My Business and local directories' },
      { icon: 'star', title: 'Transparent Reporting', description: 'Clear reports in your language' },
    ],
    packages: [
      { name: 'Local SEO', price: '800/month', description: 'For local businesses', popular: false, features: ['Google My Business', 'Local keywords', 'NAP optimization', 'Review management', 'Monthly reporting', '3 local directories'] },
      { name: 'Business SEO', price: '1,500/month', description: 'For growing businesses', popular: true, features: ['Everything in Local SEO', 'On-page optimization', '20 keywords', 'Content strategy', 'Backlink building', 'Competitor analysis', 'Technical SEO', 'Bi-weekly reporting'] },
      { name: 'Enterprise SEO', price: '3,000+/month', description: 'For large enterprises', popular: false, features: ['Everything in Business SEO', 'Unlimited keywords', 'Arabic SEO', 'International SEO', 'Content production', 'Dedicated manager', 'Weekly calls', 'Custom reporting'] },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'Analysis of your current performance and competitors.' },
      { step: '02', title: 'Strategy', description: 'Keyword research and SEO strategy for the UAE market.' },
      { step: '03', title: 'On-Page', description: 'Technical and content optimization of your website.' },
      { step: '04', title: 'Off-Page', description: 'Backlink building and local citations.' },
      { step: '05', title: 'Reporting', description: 'Monthly reports and continuous optimization.' },
    ],
    technologies: ['Google Search Console', 'Google Analytics', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'BrightLocal', 'Google My Business', 'Schema.org'],
    faqs: [
      { question: 'How does SEO in Dubai differ from the European market?', answer: 'The Dubai market is bilingual (English/Arabic) and highly locally focused. We optimize for both languages and local search intent.' },
      { question: 'Do you optimize for Google.ae?', answer: 'Yes, we specifically optimize for the local Google version and consider the specifics of the UAE market.' },
      { question: 'How important is Google My Business in Dubai?', answer: "Very important! Local searches like 'near me' are extremely relevant in Dubai. An optimized GMB profile is essential." },
      { question: 'Can you optimize for Arabic keywords?', answer: 'Yes, we work with Arabic-speaking SEO specialists to also cover the Arabic search market.' },
      { question: 'How long does SEO take in a competitive market like Dubai?', answer: 'Dubai is competitive. We expect realistic results after 6-12 months, with initial improvements after 3-4 months.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'SEO-optimized websites for Dubai.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Brand building for the Gulf market.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Content strategy for better rankings.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'SEO Packages for Dubai',
      pricingDescription: 'Monthly SEO management for sustainable results. No long-term contracts.',
      process: 'Our SEO Process',
      processDescription: 'Systematic optimization for measurable results in the UAE.',
      technologies: 'Tools & Platforms',
      technologiesDescription: 'We use the best SEO tools for maximum transparency.',
      faq: 'Frequently Asked Questions about SEO Dubai',
      relatedServices: 'More Services in Dubai',
      ctaTitle: 'Ready for Better Rankings in Dubai?',
      ctaDescription: 'Free SEO analysis of your website. Find out where you stand.',
      ctaButton: 'Request SEO Analysis',
    },
  },
  ru: {
    meta: {
      title: 'SEO-агентство Дубай · Видимость на Ближнем Востоке | GoldenWing',
      description: 'SEO-эксперты в Дубае. Оптимизация для Google.ae. SEO на английском и арабском языках. Локальные и международные позиции для бизнеса в ОАЭ.',
      keywords: ['seo агентство дубай', 'seo дубай', 'поисковая оптимизация дубай', 'seo компания дубай'],
    },
    hero: {
      badge: 'SEO-агентство в Дубае',
      title: 'SEO-агентство Дубай',
      description: 'Доминируйте в результатах поиска в ОАЭ. Наши SEO-эксперты в Дубае оптимизируют ваш сайт для Google.ae — на английском и арабском языках.',
      ctaPrimary: 'Бесплатный SEO-анализ',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Экспертиза Google.ae' },
      { icon: 'star', text: 'EN/AR SEO' },
      { icon: 'clock', text: 'Локальная команда' },
    ],
    benefits: [
      { icon: 'zap', title: 'Оптимизация для Google.ae', description: 'Специализация на локальном поиске Google в ОАЭ' },
      { icon: 'shield', title: 'Двуязычное SEO', description: 'Оптимизация для английских и арабских ключевых слов' },
      { icon: 'users', title: 'Локальное SEO', description: 'Google My Business и локальные каталоги' },
      { icon: 'star', title: 'Прозрачная отчётность', description: 'Понятные отчёты на вашем языке' },
    ],
    packages: [
      { name: 'Локальное SEO', price: '800/месяц', description: 'Для локального бизнеса', popular: false, features: ['Google My Business', 'Локальные ключевые слова', 'NAP-оптимизация', 'Управление отзывами', 'Ежемесячная отчётность', '3 локальных каталога'] },
      { name: 'Бизнес SEO', price: '1 500/месяц', description: 'Для растущего бизнеса', popular: true, features: ['Всё из Локального SEO', 'On-page оптимизация', '20 ключевых слов', 'Контент-стратегия', 'Наращивание ссылок', 'Анализ конкурентов', 'Техническое SEO', 'Отчётность раз в 2 недели'] },
      { name: 'Enterprise SEO', price: '3 000+/месяц', description: 'Для крупных компаний', popular: false, features: ['Всё из Бизнес SEO', 'Неограниченные ключевые слова', 'Арабское SEO', 'Международное SEO', 'Производство контента', 'Персональный менеджер', 'Еженедельные звонки', 'Индивидуальная отчётность'] },
    ],
    process: [
      { step: '01', title: 'SEO-аудит', description: 'Анализ текущей производительности и конкурентов.' },
      { step: '02', title: 'Стратегия', description: 'Исследование ключевых слов и SEO-стратегия для рынка ОАЭ.' },
      { step: '03', title: 'On-Page', description: 'Техническая и контентная оптимизация вашего сайта.' },
      { step: '04', title: 'Off-Page', description: 'Наращивание ссылок и локальные упоминания.' },
      { step: '05', title: 'Отчётность', description: 'Ежемесячные отчёты и непрерывная оптимизация.' },
    ],
    technologies: ['Google Search Console', 'Google Analytics', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'BrightLocal', 'Google My Business', 'Schema.org'],
    faqs: [
      { question: 'Чем SEO в Дубае отличается от европейского рынка?', answer: 'Рынок Дубая двуязычный (английский/арабский) и сильно ориентирован на локальный поиск. Мы оптимизируем для обоих языков и локальных поисковых намерений.' },
      { question: 'Вы оптимизируете для Google.ae?', answer: 'Да, мы целенаправленно оптимизируем для локальной версии Google и учитываем особенности рынка ОАЭ.' },
      { question: 'Насколько важен Google My Business в Дубае?', answer: 'Очень важен! Локальные запросы типа «рядом со мной» крайне релевантны в Дубае. Оптимизированный профиль GMB необходим.' },
      { question: 'Можете ли вы оптимизировать для арабских ключевых слов?', answer: 'Да, мы работаем с арабоязычными SEO-специалистами, чтобы охватить и арабский поисковый рынок.' },
      { question: 'Сколько времени занимает SEO на конкурентном рынке, таком как Дубай?', answer: 'Дубай — конкурентный рынок. Реалистичные результаты мы ожидаем через 6-12 месяцев, первые улучшения — через 3-4 месяца.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'SEO-оптимизированные сайты для Дубая.', href: '/webdesign-dubai' as StaticAppPathname },
      { title: 'Брендинг Дубай', description: 'Построение бренда для рынка Персидского залива.', href: '/branding-agentur-dubai' as StaticAppPathname },
      { title: 'Контент-маркетинг', description: 'Контент-стратегия для лучших позиций.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'SEO-пакеты для Дубая',
      pricingDescription: 'Ежемесячное SEO-сопровождение для устойчивых результатов. Без долгосрочных контрактов.',
      process: 'Наш SEO-процесс',
      processDescription: 'Систематическая оптимизация для измеримых результатов в ОАЭ.',
      technologies: 'Инструменты и платформы',
      technologiesDescription: 'Мы используем лучшие SEO-инструменты для максимальной прозрачности.',
      faq: 'Часто задаваемые вопросы о SEO в Дубае',
      relatedServices: 'Другие услуги в Дубае',
      ctaTitle: 'Готовы к лучшим позициям в Дубае?',
      ctaDescription: 'Бесплатный SEO-анализ вашего сайта. Узнайте, где вы находитесь.',
      ctaButton: 'Запросить SEO-анализ',
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
      url: getCanonicalUrl('/seo-agentur-dubai', locale),
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
      canonical: getCanonicalUrl('/seo-agentur-dubai', locale),
      languages: getHreflangAlternates('/seo-agentur-dubai').languages,
    },
  }
}

export default async function SeoAgenturDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: locale === 'de' ? 'SEO Agentur Dubai' : locale === 'ru' ? 'SEO-агентство Дубай' : 'SEO Agency Dubai',
      serviceUrl: 'https://goldenwing.at/seo-agentur-dubai',
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
        { name: locale === 'de' ? 'SEO Agentur Dubai' : locale === 'ru' ? 'SEO-агентство Дубай' : 'SEO Agency Dubai', url: locale === 'de' ? 'https://goldenwing.at/seo-agentur-dubai' : locale === 'ru' ? 'https://goldenwing.at/ru/seo-agentur-dubai' : 'https://goldenwing.at/en/seo-agency-dubai' },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
