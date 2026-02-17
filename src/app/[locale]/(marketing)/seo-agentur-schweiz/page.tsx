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
      title: 'SEO Agentur Schweiz · Top Rankings in der CH | GoldenWing',
      description: 'SEO für Schweizer Unternehmen. Wir optimieren für Google.ch. Local SEO Zürich, Bern, Basel. Messbare Ergebnisse garantiert.',
      keywords: ['seo agentur schweiz', 'seo schweiz', 'suchmaschinenoptimierung schweiz'],
    },
    hero: {
      badge: 'SEO Agentur für die Schweiz',
      title: 'SEO Agentur Schweiz',
      description: 'Top-Rankings auf Google.ch für Schweizer Unternehmen. Wir verstehen den mehrsprachigen Schweizer Markt und liefern messbare SEO-Ergebnisse.',
      ctaPrimary: 'Kostenlose SEO-Analyse',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'CH-Expertise' },
      { icon: 'star', text: 'Mehrsprachig' },
      { icon: 'clock', text: 'DSG-konform' },
    ],
    benefits: [
      { icon: 'zap', title: 'Schweizer Keywords', description: 'Optimierung für Schweizer Suchverhalten' },
      { icon: 'shield', title: 'Mehrsprachig', description: 'DE, FR, IT – alle Landessprachen' },
      { icon: 'users', title: 'Local SEO', description: 'Zürich, Bern, Basel, Genf und mehr' },
      { icon: 'star', title: 'Premium-Qualität', description: 'Schweizer Standards erfüllt' },
    ],
    packages: [
      { name: 'Local', price: '1.500/mtl.', description: 'Für lokale KMU', popular: false, features: ['Google My Business', 'Lokale Keywords', 'local.ch & search.ch', 'Bewertungsmanagement', 'Monatliches Reporting', 'Keyword-Tracking'] },
      { name: 'Business', price: '2.500/mtl.', description: 'Für den Mittelstand', popular: true, features: ['Alles aus Local+', 'Technisches SEO-Audit', 'Content-Strategie', 'On-Page Optimierung', 'Link Building CH', 'Wettbewerbsanalyse', 'Quartals-Review', 'Priority Support'] },
      { name: 'Multilingual', price: '4.000+/mtl.', description: 'Mehrsprachige SEO', popular: false, features: ['Alles aus Business+', 'DE/FR/IT Optimierung', 'Dedizierter SEO-Manager', 'Content in allen Sprachen', 'Regionale Keywords', 'Schweizweite Abdeckung', 'Wöchentliche Calls', 'Premium Support'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Umfassende Analyse für Google.ch.' },
      { step: '02', title: 'Strategie', description: 'Maßgeschneiderter Plan für die Schweiz.' },
      { step: '03', title: 'Technische SEO', description: 'Grundlagen optimieren.' },
      { step: '04', title: 'Content & Links', description: 'Schweizer Content und Backlinks.' },
      { step: '05', title: 'Reporting', description: 'Transparente Berichte in CHF.' },
    ],
    technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'local.ch', 'search.ch', 'Sistrix', 'GA4'],
    faqs: [
      { question: 'Optimiert ihr für Google.ch oder Google.de?', answer: 'Primär für Google.ch mit Schweizer Suchverhalten. Da viele Schweizer auch Google.de nutzen, optimieren wir für beide Varianten und berücksichtigen Schweizer Hochdeutsch.' },
      { question: 'Wie geht ihr mit der Mehrsprachigkeit der Schweiz um?', answer: 'Wir können für alle Landessprachen optimieren: Deutsch, Französisch, Italienisch. Jede Sprachversion erhält eigene Keywords und lokalisierte Inhalte.' },
      { question: 'Habt ihr Erfahrung mit Schweizer Branchenverzeichnissen?', answer: 'Ja, wir kennen die relevanten Schweizer Verzeichnisse wie local.ch, search.ch, und branchenspezifische Portale für effektives Local SEO.' },
      { question: 'Was kostet SEO für Schweizer Unternehmen?', answer: 'SEO-Pakete starten bei CHF 1.500/Monat für lokale Optimierung. Umfassende SEO-Betreuung mit Content und Linkbuilding liegt bei CHF 2.500-5.000/Monat.' },
      { question: 'Bietet ihr auch SEO für E-Commerce in der Schweiz?', answer: 'Ja, E-Commerce SEO ist einer unserer Schwerpunkte. Wir optimieren Online-Shops für Schweizer Suchbegriffe, Produktsuchen und Shopping-Ergebnisse.' },
    ],
    relatedServices: [
      { title: 'Webdesign Schweiz', description: 'SEO-optimierte Websites.', href: '/webdesign-schweiz' as StaticAppPathname },
      { title: 'Webdesign Zürich', description: 'Speziell für Zürcher Unternehmen.', href: '/webdesign-zuerich' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Schweizer Content-Strategie.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere SEO-Pakete für die Schweiz',
      pricingDescription: 'Preise in CHF möglich. Schweizer Qualität, messbare Ergebnisse.',
      process: 'Unser SEO-Prozess',
      processDescription: 'Präzise und datengetrieben – so verbessern wir Ihre Rankings.',
      technologies: 'SEO-Tools',
      technologiesDescription: 'Professionelle Tools inkl. Schweizer Verzeichnisse.',
      faq: 'Häufige Fragen zu SEO Schweiz',
      relatedServices: 'Weitere Services',
      ctaTitle: 'Bereit für bessere Rankings?',
      ctaDescription: 'Lassen Sie uns Ihre Website für Google.ch analysieren.',
      ctaButton: 'SEO-Analyse anfordern',
    },
  },
  en: {
    meta: {
      title: 'SEO Agency Switzerland · Top Rankings in CH | GoldenWing',
      description: 'SEO for Swiss businesses. We optimize for Google.ch. Local SEO Zurich, Bern, Basel. Measurable results guaranteed.',
      keywords: ['seo agency switzerland', 'seo switzerland', 'search engine optimization switzerland'],
    },
    hero: {
      badge: 'SEO Agency for Switzerland',
      title: 'SEO Agency Switzerland',
      description: 'Top rankings on Google.ch for Swiss businesses. We understand the multilingual Swiss market and deliver measurable SEO results.',
      ctaPrimary: 'Free SEO Analysis',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: 'CH Expertise' },
      { icon: 'star', text: 'Multilingual' },
      { icon: 'clock', text: 'DSG Compliant' },
    ],
    benefits: [
      { icon: 'zap', title: 'Swiss Keywords', description: 'Optimization for Swiss search behavior' },
      { icon: 'shield', title: 'Multilingual', description: 'DE, FR, IT – all national languages' },
      { icon: 'users', title: 'Local SEO', description: 'Zurich, Bern, Basel, Geneva and more' },
      { icon: 'star', title: 'Premium Quality', description: 'Swiss standards met' },
    ],
    packages: [
      { name: 'Local', price: '1,500/mo', description: 'For local SMEs', popular: false, features: ['Google My Business', 'Local keywords', 'local.ch & search.ch', 'Review management', 'Monthly reporting', 'Keyword tracking'] },
      { name: 'Business', price: '2,500/mo', description: 'For mid-sized companies', popular: true, features: ['Everything in Local+', 'Technical SEO audit', 'Content strategy', 'On-page optimization', 'Link building CH', 'Competitor analysis', 'Quarterly review', 'Priority support'] },
      { name: 'Multilingual', price: '4,000+/mo', description: 'Multilingual SEO', popular: false, features: ['Everything in Business+', 'DE/FR/IT optimization', 'Dedicated SEO manager', 'Content in all languages', 'Regional keywords', 'Nationwide coverage', 'Weekly calls', 'Premium support'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Comprehensive analysis for Google.ch.' },
      { step: '02', title: 'Strategy', description: 'Customized plan for Switzerland.' },
      { step: '03', title: 'Technical SEO', description: 'Optimize foundations.' },
      { step: '04', title: 'Content & Links', description: 'Swiss content and backlinks.' },
      { step: '05', title: 'Reporting', description: 'Transparent reports in CHF.' },
    ],
    technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'local.ch', 'search.ch', 'Sistrix', 'GA4'],
    faqs: [
      { question: 'Do you optimize for Google.ch or Google.de?', answer: 'Primarily for Google.ch with Swiss search behavior. Since many Swiss also use Google.de, we optimize for both variants and consider Swiss Standard German.' },
      { question: 'How do you handle Switzerland\'s multilingualism?', answer: 'We can optimize for all national languages: German, French, Italian. Each language version receives its own keywords and localized content.' },
      { question: 'Do you have experience with Swiss business directories?', answer: 'Yes, we know the relevant Swiss directories like local.ch, search.ch, and industry-specific portals for effective local SEO.' },
      { question: 'What does SEO cost for Swiss companies?', answer: 'SEO packages start at CHF 1,500/month for local optimization. Comprehensive SEO support with content and link building ranges from CHF 2,500-5,000/month.' },
      { question: 'Do you also offer SEO for e-commerce in Switzerland?', answer: 'Yes, e-commerce SEO is one of our specialties. We optimize online shops for Swiss search terms, product searches, and shopping results.' },
    ],
    relatedServices: [
      { title: 'Web Design Switzerland', description: 'SEO-optimized websites.', href: '/webdesign-schweiz' as StaticAppPathname },
      { title: 'Web Design Zurich', description: 'Specifically for Zurich businesses.', href: '/webdesign-zuerich' as StaticAppPathname },
      { title: 'Content Marketing', description: 'Swiss content strategy.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our SEO Packages for Switzerland',
      pricingDescription: 'Prices in CHF possible. Swiss quality, measurable results.',
      process: 'Our SEO Process',
      processDescription: 'Precise and data-driven – how we improve your rankings.',
      technologies: 'SEO Tools',
      technologiesDescription: 'Professional tools including Swiss directories.',
      faq: 'Frequently Asked Questions about SEO Switzerland',
      relatedServices: 'More Services',
      ctaTitle: 'Ready for Better Rankings?',
      ctaDescription: 'Let us analyze your website for Google.ch.',
      ctaButton: 'Request SEO Analysis',
    },
  },
  ru: {
    meta: {
      title: 'SEO Агентство Швейцария · Топ позиции в CH | GoldenWing',
      description: 'SEO для швейцарских компаний. Оптимизация для Google.ch. Локальное SEO Цюрих, Берн, Базель. Гарантированные измеримые результаты.',
      keywords: ['seo агентство швейцария', 'seo швейцария', 'поисковая оптимизация швейцария'],
    },
    hero: {
      badge: 'SEO Агентство для Швейцарии',
      title: 'SEO Агентство Швейцария',
      description: 'Топ-позиции в Google.ch для швейцарских компаний. Мы понимаем многоязычный швейцарский рынок и обеспечиваем измеримые SEO-результаты.',
      ctaPrimary: 'Бесплатный SEO-анализ',
      ctaSecondary: 'Посмотреть цены',
    },
    trustSignals: [
      { icon: 'award', text: 'Экспертиза CH' },
      { icon: 'star', text: 'Многоязычность' },
      { icon: 'clock', text: 'Соответствие DSG' },
    ],
    benefits: [
      { icon: 'zap', title: 'Швейцарские ключевые слова', description: 'Оптимизация под швейцарское поисковое поведение' },
      { icon: 'shield', title: 'Многоязычность', description: 'DE, FR, IT – все государственные языки' },
      { icon: 'users', title: 'Локальное SEO', description: 'Цюрих, Берн, Базель, Женева и другие' },
      { icon: 'star', title: 'Премиум-качество', description: 'Швейцарские стандарты соблюдены' },
    ],
    packages: [
      { name: 'Local', price: '1 500/мес.', description: 'Для местного малого бизнеса', popular: false, features: ['Google My Business', 'Локальные ключевые слова', 'local.ch & search.ch', 'Управление отзывами', 'Ежемесячная отчетность', 'Отслеживание ключевых слов'] },
      { name: 'Business', price: '2 500/мес.', description: 'Для среднего бизнеса', popular: true, features: ['Все из Local+', 'Технический SEO-аудит', 'Контент-стратегия', 'On-Page оптимизация', 'Линкбилдинг CH', 'Анализ конкурентов', 'Квартальный обзор', 'Приоритетная поддержка'] },
      { name: 'Multilingual', price: '4 000+/мес.', description: 'Многоязычное SEO', popular: false, features: ['Все из Business+', 'DE/FR/IT оптимизация', 'Выделенный SEO-менеджер', 'Контент на всех языках', 'Региональные ключевые слова', 'Покрытие всей Швейцарии', 'Еженедельные звонки', 'Премиум-поддержка'] },
    ],
    process: [
      { step: '01', title: 'Аудит', description: 'Комплексный анализ для Google.ch.' },
      { step: '02', title: 'Стратегия', description: 'Индивидуальный план для Швейцарии.' },
      { step: '03', title: 'Техническое SEO', description: 'Оптимизация основ.' },
      { step: '04', title: 'Контент и ссылки', description: 'Швейцарский контент и обратные ссылки.' },
      { step: '05', title: 'Отчетность', description: 'Прозрачные отчеты в CHF.' },
    ],
    technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'local.ch', 'search.ch', 'Sistrix', 'GA4'],
    faqs: [
      { question: 'Вы оптимизируете для Google.ch или Google.de?', answer: 'В первую очередь для Google.ch с учетом швейцарского поискового поведения. Поскольку многие швейцарцы также используют Google.de, мы оптимизируем для обоих вариантов и учитываем швейцарский стандартный немецкий.' },
      { question: 'Как вы работаете с многоязычностью Швейцарии?', answer: 'Мы можем оптимизировать для всех государственных языков: немецкого, французского, итальянского. Каждая языковая версия получает собственные ключевые слова и локализованный контент.' },
      { question: 'Есть ли у вас опыт работы со швейцарскими бизнес-каталогами?', answer: 'Да, мы знаем релевантные швейцарские каталоги, такие как local.ch, search.ch, и отраслевые порталы для эффективного локального SEO.' },
      { question: 'Сколько стоит SEO для швейцарских компаний?', answer: 'SEO-пакеты начинаются от CHF 1 500/месяц для локальной оптимизации. Комплексное SEO-сопровождение с контентом и линкбилдингом составляет CHF 2 500-5 000/месяц.' },
      { question: 'Предлагаете ли вы SEO для электронной коммерции в Швейцарии?', answer: 'Да, SEO для электронной коммерции — одна из наших специализаций. Мы оптимизируем интернет-магазины под швейцарские поисковые запросы, поиск товаров и результаты покупок.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Швейцария', description: 'SEO-оптимизированные сайты.', href: '/webdesign-schweiz' as StaticAppPathname },
      { title: 'Веб-дизайн Цюрих', description: 'Специально для цюрихских компаний.', href: '/webdesign-zuerich' as StaticAppPathname },
      { title: 'Контент-маркетинг', description: 'Швейцарская контент-стратегия.', href: '/leistungen/seo-content' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши SEO-пакеты для Швейцарии',
      pricingDescription: 'Цены в CHF возможны. Швейцарское качество, измеримые результаты.',
      process: 'Наш SEO-процесс',
      processDescription: 'Точно и на основе данных — так мы улучшаем ваши позиции.',
      technologies: 'SEO-инструменты',
      technologiesDescription: 'Профессиональные инструменты включая швейцарские каталоги.',
      faq: 'Часто задаваемые вопросы о SEO в Швейцарии',
      relatedServices: 'Другие услуги',
      ctaTitle: 'Готовы к лучшим позициям?',
      ctaDescription: 'Позвольте нам проанализировать ваш сайт для Google.ch.',
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
      url: getCanonicalUrl('/seo-agentur-schweiz', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/seo-agentur-schweiz', locale),
      languages: getHreflangAlternates('/seo-agentur-schweiz').languages,
    },
  }
}

export default async function SeoAgenturSchweizPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'SEO Agentur Schweiz', en: 'SEO Agency Switzerland', ru: 'SEO Агентство Швейцария' }[locale],
      serviceUrl: 'https://goldenwing.at/seo-agentur-schweiz',
      areaServed: { type: 'Country', name: 'Switzerland' },
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
        { name: { de: 'SEO Agentur Schweiz', en: 'SEO Agency Switzerland', ru: 'SEO Агентство Швейцария' }[locale], url: { de: 'https://goldenwing.at/seo-agentur-schweiz', en: 'https://goldenwing.at/en/seo-agency-switzerland', ru: 'https://goldenwing.at/ru/seo-agentur-schweiz' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
