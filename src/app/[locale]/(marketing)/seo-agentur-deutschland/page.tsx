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
      title: 'SEO Agentur Deutschland · DACH-weite Sichtbarkeit | GoldenWing',
      description: 'SEO für deutsche Unternehmen. Wir optimieren Ihre Website für Google.de. Technisches SEO, Content & Linkaufbau.',
      keywords: ['seo agentur deutschland', 'seo deutschland', 'suchmaschinenoptimierung deutschland'],
    },
    hero: {
      badge: 'SEO Agentur für Deutschland',
      title: 'SEO Agentur Deutschland',
      description: 'Nachhaltige Sichtbarkeit auf Google.de. Wir bringen deutsche Unternehmen auf die erste Seite – mit technischem SEO, Content-Strategie und qualitativem Linkaufbau.',
      ctaPrimary: 'Kostenlose SEO-Analyse',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'DACH-Expertise' },
      { icon: 'star', text: 'Messbare Ergebnisse' },
      { icon: 'clock', text: 'Langfristige Partner' },
    ],
    benefits: [
      { icon: 'zap', title: 'Technisches SEO', description: 'Core Web Vitals, Crawlability, Indexierung optimiert' },
      { icon: 'shield', title: 'Content-Strategie', description: 'SEO-Texte, die ranken und konvertieren' },
      { icon: 'users', title: 'Local SEO', description: 'Sichtbarkeit in allen deutschen Städten' },
      { icon: 'star', title: 'Linkaufbau', description: 'Qualitative Backlinks aus dem DACH-Raum' },
    ],
    packages: [
      { name: 'Local', price: '1.000/mtl.', description: 'Für lokale Unternehmen', popular: false, features: ['Google My Business', 'Lokale Keywords', 'Citation Building', 'Review Management', 'Monatliches Reporting', 'Keyword-Tracking'] },
      { name: 'Business', price: '2.000/mtl.', description: 'Für den Mittelstand', popular: true, features: ['Alles aus Local+', 'Technisches SEO-Audit', 'Content-Erstellung', 'On-Page Optimierung', 'Link Building', 'Wettbewerbsanalyse', 'Quartals-Strategiegespräch', 'Priority Support'] },
      { name: 'Enterprise', price: '4.000+/mtl.', description: 'Für Großunternehmen', popular: false, features: ['Alles aus Business+', 'Internationales SEO', 'Dedizierter SEO-Manager', 'Custom Reporting', 'Content Hub Strategie', 'PR & Digital PR', 'Conversion Optimierung', 'Wöchentliche Calls'] },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Umfassende Analyse Ihrer aktuellen Situation.' },
      { step: '02', title: 'Strategie', description: 'Maßgeschneiderter Plan für Ihre Ziele.' },
      { step: '03', title: 'Technische Optimierung', description: 'Grundlagen für bessere Rankings schaffen.' },
      { step: '04', title: 'Content & Links', description: 'Kontinuierliche Optimierung und Aufbau.' },
      { step: '05', title: 'Reporting', description: 'Transparente Berichte über Fortschritte.' },
    ],
    technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'Surfer SEO', 'PageSpeed Insights', 'Schema Markup', 'GA4'],
    faqs: [
      { question: 'Was unterscheidet euren SEO-Ansatz für Deutschland?', answer: 'Wir optimieren gezielt für Google.de mit deutschen Keywords, lokaler Linkbuilding-Strategie und Verständnis für deutschsprachige Suchintentionen und Nutzerverhalten.' },
      { question: 'Wie lange dauert es, bis SEO-Ergebnisse sichtbar werden?', answer: 'Erste Verbesserungen zeigen sich nach 3-4 Monaten, signifikante Rankings nach 6-12 Monaten. SEO ist eine langfristige Investition mit nachhaltigem ROI.' },
      { question: 'Bietet ihr auch Local SEO für deutsche Städte an?', answer: 'Ja, wir optimieren für Google My Business und lokale Rankings in Städten wie München, Berlin, Hamburg, Frankfurt, Köln, Düsseldorf und mehr.' },
      { question: 'Arbeitet ihr mit deutschen Backlink-Quellen?', answer: 'Absolut. Wir nutzen deutsche Branchenverzeichnisse, PR-Plattformen, Fachmagazine und Content-Kooperationen für qualitatives, nachhaltiges Linkbuilding.' },
      { question: 'Erstellt ihr auch SEO-optimierten Content auf Deutsch?', answer: 'Ja, unser Team erstellt deutschen Content, der für Suchmaschinen optimiert ist und gleichzeitig Ihre Zielgruppe anspricht - von Blogartikeln bis zu Landingpages.' },
    ],
    relatedServices: [
      { title: 'Webdesign Deutschland', description: 'SEO-optimierte Websites.', href: '/webdesign-deutschland' as StaticAppPathname },
      { title: 'Branding Deutschland', description: 'Markenentwicklung für mehr Authority.', href: '/branding-agentur-deutschland' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Strategische Content-Erstellung.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere SEO-Pakete für Deutschland',
      pricingDescription: 'Transparente Preise, messbare Ergebnisse. Monatliche Laufzeit.',
      process: 'Unser SEO-Prozess',
      processDescription: 'Datengetrieben und transparent – so verbessern wir Ihre Rankings.',
      technologies: 'SEO-Tools',
      technologiesDescription: 'Professionelle Tools für präzise Analysen und Optimierungen.',
      faq: 'Häufige Fragen zu SEO Deutschland',
      relatedServices: 'Weitere Services',
      ctaTitle: 'Bereit für bessere Rankings?',
      ctaDescription: 'Lassen Sie uns Ihre Website analysieren. Kostenlose SEO-Erstanalyse.',
      ctaButton: 'SEO-Analyse anfordern',
    },
  },
  en: {
    meta: {
      title: 'SEO Agency Germany · DACH-wide Visibility | GoldenWing',
      description: 'SEO for German businesses. We optimize your website for Google.de. Technical SEO, content & link building strategies.',
      keywords: ['seo agency germany', 'seo germany', 'search engine optimization germany'],
    },
    hero: {
      badge: 'SEO Agency for Germany',
      title: 'SEO Agency Germany',
      description: 'Sustainable visibility on Google.de. We bring German businesses to the first page – with technical SEO, content strategy, and quality link building.',
      ctaPrimary: 'Free SEO Analysis',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'DACH Expertise' },
      { icon: 'star', text: 'Measurable Results' },
      { icon: 'clock', text: 'Long-term Partners' },
    ],
    benefits: [
      { icon: 'zap', title: 'Technical SEO', description: 'Core Web Vitals, crawlability, indexing optimized' },
      { icon: 'shield', title: 'Content Strategy', description: 'SEO content that ranks and converts' },
      { icon: 'users', title: 'Local SEO', description: 'Visibility in all German cities' },
      { icon: 'star', title: 'Link Building', description: 'Quality backlinks from the DACH region' },
    ],
    packages: [
      { name: 'Local', price: '1,000/mo', description: 'For local businesses', popular: false, features: ['Google My Business', 'Local keywords', 'Citation building', 'Review management', 'Monthly reporting', 'Keyword tracking'] },
      { name: 'Business', price: '2,000/mo', description: 'For mid-sized companies', popular: true, features: ['Everything in Local+', 'Technical SEO audit', 'Content creation', 'On-page optimization', 'Link building', 'Competitor analysis', 'Quarterly strategy call', 'Priority support'] },
      { name: 'Enterprise', price: '4,000+/mo', description: 'For large corporations', popular: false, features: ['Everything in Business+', 'International SEO', 'Dedicated SEO manager', 'Custom reporting', 'Content hub strategy', 'PR & digital PR', 'Conversion optimization', 'Weekly calls'] },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'Comprehensive analysis of your current situation.' },
      { step: '02', title: 'Strategy', description: 'Customized plan for your goals.' },
      { step: '03', title: 'Technical Optimization', description: 'Building foundation for better rankings.' },
      { step: '04', title: 'Content & Links', description: 'Continuous optimization and building.' },
      { step: '05', title: 'Reporting', description: 'Transparent reports on progress.' },
    ],
    technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'Surfer SEO', 'PageSpeed Insights', 'Schema Markup', 'GA4'],
    faqs: [
      { question: 'What makes your SEO approach for Germany different?', answer: 'We specifically optimize for Google.de with German keywords, local link building strategy, and understanding of German-language search intent and user behavior.' },
      { question: 'How long until SEO results become visible?', answer: 'Initial improvements show after 3-4 months, significant rankings after 6-12 months. SEO is a long-term investment with sustainable ROI.' },
      { question: 'Do you offer local SEO for German cities?', answer: 'Yes, we optimize for Google My Business and local rankings in cities like Munich, Berlin, Hamburg, Frankfurt, Cologne, Düsseldorf, and more.' },
      { question: 'Do you work with German backlink sources?', answer: 'Absolutely. We use German business directories, PR platforms, trade magazines, and content collaborations for quality, sustainable link building.' },
      { question: 'Do you create SEO-optimized content in German?', answer: 'Yes, our team creates German content optimized for search engines while appealing to your target audience - from blog articles to landing pages.' },
    ],
    relatedServices: [
      { title: 'Web Design Germany', description: 'SEO-optimized websites.', href: '/webdesign-deutschland' as StaticAppPathname },
      { title: 'Branding Germany', description: 'Brand development for more authority.', href: '/branding-agentur-deutschland' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Strategic content creation.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our SEO Packages for Germany',
      pricingDescription: 'Transparent pricing, measurable results. Monthly terms.',
      process: 'Our SEO Process',
      processDescription: 'Data-driven and transparent – how we improve your rankings.',
      technologies: 'SEO Tools',
      technologiesDescription: 'Professional tools for precise analysis and optimization.',
      faq: 'Frequently Asked Questions about SEO Germany',
      relatedServices: 'More Services',
      ctaTitle: 'Ready for Better Rankings?',
      ctaDescription: 'Let us analyze your website. Free initial SEO analysis.',
      ctaButton: 'Request SEO Analysis',
    },
  },
  ru: {
    meta: {
      title: 'SEO агентство Германия · Видимость в регионе DACH | GoldenWing',
      description: 'SEO для немецких компаний. Оптимизируем ваш сайт для Google.de. Техническое SEO, контент и линкбилдинг.',
      keywords: ['seo агентство германия', 'seo германия', 'поисковая оптимизация германия'],
    },
    hero: {
      badge: 'SEO агентство для Германии',
      title: 'SEO агентство Германия',
      description: 'Устойчивая видимость в Google.de. Выводим немецкие компании на первую страницу с помощью технического SEO, контент-стратегии и качественного линкбилдинга.',
      ctaPrimary: 'Бесплатный SEO-анализ',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Экспертиза DACH' },
      { icon: 'star', text: 'Измеримые результаты' },
      { icon: 'clock', text: 'Долгосрочные партнеры' },
    ],
    benefits: [
      { icon: 'zap', title: 'Техническое SEO', description: 'Core Web Vitals, краулинг, индексация оптимизированы' },
      { icon: 'shield', title: 'Контент-стратегия', description: 'SEO-контент, который ранжируется и конвертирует' },
      { icon: 'users', title: 'Локальное SEO', description: 'Видимость во всех городах Германии' },
      { icon: 'star', title: 'Линкбилдинг', description: 'Качественные обратные ссылки из региона DACH' },
    ],
    packages: [
      { name: 'Local', price: '1 000/мес.', description: 'Для локального бизнеса', popular: false, features: ['Google My Business', 'Локальные ключевые слова', 'Построение цитирований', 'Управление отзывами', 'Ежемесячная отчетность', 'Отслеживание ключевых слов'] },
      { name: 'Business', price: '2 000/мес.', description: 'Для среднего бизнеса', popular: true, features: ['Все из Local+', 'Технический SEO-аудит', 'Создание контента', 'On-page оптимизация', 'Линкбилдинг', 'Анализ конкурентов', 'Квартальный стратегический звонок', 'Приоритетная поддержка'] },
      { name: 'Enterprise', price: '4 000+/мес.', description: 'Для крупных компаний', popular: false, features: ['Все из Business+', 'Международное SEO', 'Выделенный SEO-менеджер', 'Индивидуальная отчетность', 'Стратегия контент-хаба', 'PR и Digital PR', 'Оптимизация конверсии', 'Еженедельные звонки'] },
    ],
    process: [
      { step: '01', title: 'SEO-аудит', description: 'Комплексный анализ вашей текущей ситуации.' },
      { step: '02', title: 'Стратегия', description: 'Индивидуальный план для ваших целей.' },
      { step: '03', title: 'Техническая оптимизация', description: 'Создание основы для лучших позиций.' },
      { step: '04', title: 'Контент и ссылки', description: 'Непрерывная оптимизация и наращивание.' },
      { step: '05', title: 'Отчетность', description: 'Прозрачные отчеты о прогрессе.' },
    ],
    technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'Surfer SEO', 'PageSpeed Insights', 'Schema Markup', 'GA4'],
    faqs: [
      { question: 'Чем отличается ваш SEO-подход для Германии?', answer: 'Мы целенаправленно оптимизируем для Google.de с немецкими ключевыми словами, локальной стратегией линкбилдинга и пониманием поисковых намерений немецкоязычных пользователей.' },
      { question: 'Как скоро станут видны результаты SEO?', answer: 'Первые улучшения видны через 3-4 месяца, значительные позиции — через 6-12 месяцев. SEO — это долгосрочная инвестиция с устойчивой окупаемостью.' },
      { question: 'Предлагаете ли вы локальное SEO для немецких городов?', answer: 'Да, мы оптимизируем для Google My Business и локальных позиций в таких городах как Мюнхен, Берлин, Гамбург, Франкфурт, Кёльн, Дюссельдорф и других.' },
      { question: 'Работаете ли вы с немецкими источниками обратных ссылок?', answer: 'Безусловно. Мы используем немецкие бизнес-каталоги, PR-платформы, отраслевые журналы и контентное сотрудничество для качественного устойчивого линкбилдинга.' },
      { question: 'Создаете ли вы SEO-оптимизированный контент на немецком языке?', answer: 'Да, наша команда создает немецкий контент, оптимизированный для поисковых систем и привлекательный для вашей целевой аудитории — от статей в блоге до лендингов.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Германия', description: 'SEO-оптимизированные сайты.', href: '/webdesign-deutschland' as StaticAppPathname },
      { title: 'Брендинг Германия', description: 'Развитие бренда для большего авторитета.', href: '/branding-agentur-deutschland' as StaticAppPathname },
      { title: 'Контент-маркетинг', description: 'Стратегическое создание контента.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши SEO-пакеты для Германии',
      pricingDescription: 'Прозрачные цены, измеримые результаты. Помесячная оплата.',
      process: 'Наш SEO-процесс',
      processDescription: 'На основе данных и прозрачно — как мы улучшаем ваши позиции.',
      technologies: 'SEO-инструменты',
      technologiesDescription: 'Профессиональные инструменты для точного анализа и оптимизации.',
      faq: 'Часто задаваемые вопросы о SEO в Германии',
      relatedServices: 'Другие услуги',
      ctaTitle: 'Готовы к лучшим позициям?',
      ctaDescription: 'Позвольте нам проанализировать ваш сайт. Бесплатный первичный SEO-анализ.',
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
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/seo-agentur-deutschland', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/seo-agentur-deutschland', locale),
      languages: getHreflangAlternates('/seo-agentur-deutschland').languages,
    },
  }
}

export default async function SeoAgenturDeutschlandPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'SEO Agentur Deutschland', en: 'SEO Agency Germany', ru: 'SEO агентство Германия' }[locale],
      serviceUrl: 'https://goldenwing.at/seo-agentur-deutschland',
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
        { name: { de: 'SEO Agentur Deutschland', en: 'SEO Agency Germany', ru: 'SEO агентство Германия' }[locale], url: { de: 'https://goldenwing.at/seo-agentur-deutschland', en: 'https://goldenwing.at/en/seo-agency-germany', ru: 'https://goldenwing.at/ru/seo-agentur-deutschland' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
