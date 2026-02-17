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
      title: 'Branding Agentur Wien · Markenidentität & Design | GoldenWing',
      description: 'Branding-Experten in Wien. Wir entwickeln Ihre Markenidentität: Logo, Corporate Design & Brand Strategy. Marken, die im Gedächtnis bleiben.',
      keywords: ['branding agentur wien', 'corporate design wien', 'markenentwicklung wien'],
    },
    hero: {
      badge: 'Branding Agentur in Wien',
      title: 'Branding Agentur Wien',
      description: 'Wir entwickeln Markenidentitäten, die im Gedächtnis bleiben. Von der Strategie über das Logo bis zum kompletten Corporate Design – alles aus einer Hand in Wien.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Lokale Expertise' },
      { icon: 'star', text: '10+ Jahre Erfahrung' },
      { icon: 'clock', text: 'Persönliche Betreuung' },
    ],
    benefits: [
      { icon: 'zap', title: 'Strategisches Branding', description: 'Markenpositionierung und -strategie als Fundament' },
      { icon: 'shield', title: 'Corporate Design', description: 'Vom Logo bis zum kompletten Erscheinungsbild' },
      { icon: 'users', title: 'Brand Guidelines', description: 'Detaillierte Dokumentation für konsistente Anwendung' },
      { icon: 'star', title: 'Rebranding', description: 'Modernisierung bestehender Marken mit Respekt vor der Geschichte' },
    ],
    packages: [
      { name: 'Logo', price: '1.500', description: 'Für Startups & Gründer', popular: false, features: ['Logoentwicklung', '3 Konzeptvarianten', 'Revision-Runden', 'Alle Dateiformate', 'Nutzungsrechte', 'Schnelle Lieferung'] },
      { name: 'Branding', price: '4.000', description: 'Komplettes Erscheinungsbild', popular: true, features: ['Alles aus Logo+', 'Farbpalette & Typografie', 'Visitenkarten & Briefpapier', 'Social Media Templates', 'Brand Guidelines', 'Icon-Set'] },
      { name: 'Brand Strategy', price: '8.000+', description: 'Strategische Markenentwicklung', popular: false, features: ['Markenanalyse', 'Positionierung', 'Alles aus Branding+', 'Verbal Identity', 'Messaging Framework', 'Implementierungsberatung'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Workshop zur Analyse Ihrer Marke und Ziele.' },
      { step: '02', title: 'Strategie', description: 'Positionierung, Werte und Markenkern definieren.' },
      { step: '03', title: 'Design', description: 'Visual Identity Entwicklung mit Feedback-Schleifen.' },
      { step: '04', title: 'Guidelines', description: 'Dokumentation für konsistente Markenführung.' },
      { step: '05', title: 'Rollout', description: 'Implementierung auf allen Touchpoints.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Illustrator', 'InDesign', 'Photoshop', 'Sketch', 'Brand.ai'],
    faqs: [
      { question: 'Was beinhaltet ein komplettes Branding-Paket in Wien?', answer: 'Ein vollständiges Branding-Paket umfasst Markenanalyse, Positionierung, Naming (falls benötigt), Logo-Design, Farbpalette, Typografie, Brand Guidelines und Anwendungsbeispiele. Je nach Bedarf ergänzen wir Visitenkarten, Briefpapier und digitale Assets.' },
      { question: 'Wie lange dauert ein Branding-Projekt?', answer: 'Ein komplettes Branding-Projekt dauert typischerweise 4-8 Wochen. Ein Logo-Design alleine kann in 2-3 Wochen fertig sein, während ein umfassendes Corporate Design mit Guidelines 6-8 Wochen benötigt.' },
      { question: 'Was kostet Branding bei GoldenWing?', answer: 'Logo-Design startet bei 1.500€, ein komplettes Branding-Paket mit Corporate Design bei 4.000€. Umfassende Markenentwicklung mit Strategie und allen Materialien liegt zwischen 8.000€ und 15.000€.' },
      { question: 'Macht ihr auch Rebranding für bestehende Unternehmen?', answer: 'Ja, Rebranding ist einer unserer Schwerpunkte. Wir analysieren Ihre bestehende Marke, identifizieren Verbesserungspotenzial und entwickeln eine modernisierte Markenidentität, die Ihre Geschichte respektiert.' },
      { question: 'Erhalte ich alle Dateien und Nutzungsrechte?', answer: 'Absolut. Nach Projektabschluss erhalten Sie alle Quelldateien (AI, PSD, etc.), Web-optimierte Formate und die vollständigen Nutzungsrechte. Die Brand Guidelines dokumentieren die korrekte Verwendung.' },
    ],
    relatedServices: [
      { title: 'Webdesign Wien', description: 'Website passend zur Marke.', href: '/webdesign-wien' as StaticAppPathname },
      { title: 'SEO Wien', description: 'Sichtbarkeit für Ihre Marke.', href: '/seo-agentur-wien' as StaticAppPathname },
      { title: 'Kreativagentur Wien', description: 'Full-Service Betreuung.', href: '/kreativagentur-wien' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Unsere Branding-Pakete',
      pricingDescription: 'Von der Logo-Entwicklung bis zur kompletten Markenidentität.',
      process: 'Unser Branding-Prozess',
      processDescription: 'Strukturiert und transparent – so entwickeln wir Ihre Marke.',
      technologies: 'Tools & Software',
      technologiesDescription: 'Professionelle Tools für erstklassige Ergebnisse.',
      faq: 'Häufige Fragen zu Branding Wien',
      relatedServices: 'Weitere Services in Wien',
      ctaTitle: 'Bereit für Ihre neue Marke?',
      ctaDescription: 'Lassen Sie uns über Ihre Markenidentität sprechen. Kostenloses Erstgespräch in Wien.',
      ctaButton: 'Branding anfragen',
    },
  },
  en: {
    meta: {
      title: 'Branding Agency Vienna · Brand Identity & Design | GoldenWing',
      description: 'Branding experts in Vienna. We develop your brand identity: logo, corporate design & brand strategy. Brands that leave a lasting impression.',
      keywords: ['branding agency vienna', 'corporate design vienna', 'brand development vienna'],
    },
    hero: {
      badge: 'Branding Agency in Vienna',
      title: 'Branding Agency Vienna',
      description: 'We develop brand identities that leave a lasting impression. From strategy to logo to complete corporate design – all from one source in Vienna.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'award', text: 'Local Expertise' },
      { icon: 'star', text: '10+ Years Experience' },
      { icon: 'clock', text: 'Personal Support' },
    ],
    benefits: [
      { icon: 'zap', title: 'Strategic Branding', description: 'Brand positioning and strategy as foundation' },
      { icon: 'shield', title: 'Corporate Design', description: 'From logo to complete visual identity' },
      { icon: 'users', title: 'Brand Guidelines', description: 'Detailed documentation for consistent application' },
      { icon: 'star', title: 'Rebranding', description: 'Modernizing existing brands while respecting history' },
    ],
    packages: [
      { name: 'Logo', price: '1,500', description: 'For startups & founders', popular: false, features: ['Logo development', '3 concept variants', 'Revision rounds', 'All file formats', 'Usage rights', 'Fast delivery'] },
      { name: 'Branding', price: '4,000', description: 'Complete visual identity', popular: true, features: ['Everything in Logo+', 'Color palette & typography', 'Business cards & stationery', 'Social media templates', 'Brand guidelines', 'Icon set'] },
      { name: 'Brand Strategy', price: '8,000+', description: 'Strategic brand development', popular: false, features: ['Brand analysis', 'Positioning', 'Everything in Branding+', 'Verbal identity', 'Messaging framework', 'Implementation consulting'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Workshop to analyze your brand and goals.' },
      { step: '02', title: 'Strategy', description: 'Define positioning, values, and brand core.' },
      { step: '03', title: 'Design', description: 'Visual identity development with feedback loops.' },
      { step: '04', title: 'Guidelines', description: 'Documentation for consistent brand management.' },
      { step: '05', title: 'Rollout', description: 'Implementation across all touchpoints.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Illustrator', 'InDesign', 'Photoshop', 'Sketch', 'Brand.ai'],
    faqs: [
      { question: 'What does a complete branding package in Vienna include?', answer: 'A complete branding package includes brand analysis, positioning, naming (if needed), logo design, color palette, typography, brand guidelines, and application examples. We add business cards, stationery, and digital assets as needed.' },
      { question: 'How long does a branding project take?', answer: 'A complete branding project typically takes 4-8 weeks. A logo design alone can be ready in 2-3 weeks, while comprehensive corporate design with guidelines requires 6-8 weeks.' },
      { question: 'What does branding cost at GoldenWing?', answer: 'Logo design starts at €1,500, a complete branding package with corporate design at €4,000. Comprehensive brand development with strategy and all materials ranges from €8,000 to €15,000.' },
      { question: 'Do you also do rebranding for existing companies?', answer: 'Yes, rebranding is one of our specialties. We analyze your existing brand, identify improvement potential, and develop a modernized brand identity that respects your history.' },
      { question: 'Do I receive all files and usage rights?', answer: 'Absolutely. After project completion, you receive all source files (AI, PSD, etc.), web-optimized formats, and complete usage rights. Brand guidelines document correct usage.' },
    ],
    relatedServices: [
      { title: 'Web Design Vienna', description: 'Website matching your brand.', href: '/webdesign-wien' as StaticAppPathname },
      { title: 'SEO Vienna', description: 'Visibility for your brand.', href: '/seo-agentur-wien' as StaticAppPathname },
      { title: 'Creative Agency Vienna', description: 'Full-service support.', href: '/kreativagentur-wien' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Our Branding Packages',
      pricingDescription: 'From logo development to complete brand identity.',
      process: 'Our Branding Process',
      processDescription: 'Structured and transparent – how we develop your brand.',
      technologies: 'Tools & Software',
      technologiesDescription: 'Professional tools for first-class results.',
      faq: 'Frequently Asked Questions about Branding Vienna',
      relatedServices: 'More Services in Vienna',
      ctaTitle: 'Ready for Your New Brand?',
      ctaDescription: 'Let\'s talk about your brand identity. Free consultation in Vienna.',
      ctaButton: 'Request Branding',
    },
  },
  ru: {
    meta: {
      title: 'Брендинг-агентство Вена · Корпоративная идентичность и дизайн | GoldenWing',
      description: 'Эксперты по брендингу в Вене. Разрабатываем вашу корпоративную идентичность: логотип, фирменный стиль и стратегию бренда. Бренды, которые запоминаются.',
      keywords: ['брендинг агентство вена', 'корпоративный дизайн вена', 'разработка бренда вена'],
    },
    hero: {
      badge: 'Брендинг-агентство в Вене',
      title: 'Брендинг-агентство Вена',
      description: 'Мы создаём бренды, которые запоминаются надолго. От стратегии до логотипа и полного фирменного стиля — всё из одних рук в Вене.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть портфолио',
    },
    trustSignals: [
      { icon: 'award', text: 'Локальная экспертиза' },
      { icon: 'star', text: '10+ лет опыта' },
      { icon: 'clock', text: 'Персональное сопровождение' },
    ],
    benefits: [
      { icon: 'zap', title: 'Стратегический брендинг', description: 'Позиционирование и стратегия бренда как основа' },
      { icon: 'shield', title: 'Корпоративный дизайн', description: 'От логотипа до полной визуальной идентичности' },
      { icon: 'users', title: 'Брендбук', description: 'Детальная документация для единообразного применения' },
      { icon: 'star', title: 'Ребрендинг', description: 'Модернизация существующих брендов с уважением к истории' },
    ],
    packages: [
      { name: 'Логотип', price: '1 500', description: 'Для стартапов и основателей', popular: false, features: ['Разработка логотипа', '3 концептуальных варианта', 'Раунды правок', 'Все форматы файлов', 'Права использования', 'Быстрая доставка'] },
      { name: 'Брендинг', price: '4 000', description: 'Полная визуальная идентичность', popular: true, features: ['Всё из пакета Логотип+', 'Цветовая палитра и типографика', 'Визитки и бланки', 'Шаблоны для соцсетей', 'Брендбук', 'Набор иконок'] },
      { name: 'Стратегия бренда', price: '8 000+', description: 'Стратегическое развитие бренда', popular: false, features: ['Анализ бренда', 'Позиционирование', 'Всё из пакета Брендинг+', 'Вербальная идентичность', 'Коммуникационная платформа', 'Консультации по внедрению'] },
    ],
    process: [
      { step: '01', title: 'Исследование', description: 'Воркшоп для анализа вашего бренда и целей.' },
      { step: '02', title: 'Стратегия', description: 'Определение позиционирования, ценностей и ядра бренда.' },
      { step: '03', title: 'Дизайн', description: 'Разработка визуальной идентичности с обратной связью.' },
      { step: '04', title: 'Брендбук', description: 'Документация для последовательного управления брендом.' },
      { step: '05', title: 'Запуск', description: 'Внедрение на всех точках контакта.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Illustrator', 'InDesign', 'Photoshop', 'Sketch', 'Brand.ai'],
    faqs: [
      { question: 'Что включает полный пакет брендинга в Вене?', answer: 'Полный пакет брендинга включает анализ бренда, позиционирование, нейминг (при необходимости), дизайн логотипа, цветовую палитру, типографику, брендбук и примеры применения. По необходимости добавляем визитки, бланки и цифровые материалы.' },
      { question: 'Сколько времени занимает проект по брендингу?', answer: 'Полный проект по брендингу обычно занимает 4-8 недель. Разработка только логотипа может быть готова за 2-3 недели, тогда как комплексный корпоративный дизайн с брендбуком требует 6-8 недель.' },
      { question: 'Сколько стоит брендинг в GoldenWing?', answer: 'Дизайн логотипа начинается от 1 500 €, полный пакет брендинга с корпоративным дизайном — от 4 000 €. Комплексное развитие бренда со стратегией и всеми материалами — от 8 000 € до 15 000 €.' },
      { question: 'Вы также занимаетесь ребрендингом существующих компаний?', answer: 'Да, ребрендинг — одна из наших специализаций. Мы анализируем ваш существующий бренд, выявляем потенциал улучшений и разрабатываем обновлённую идентичность бренда с уважением к вашей истории.' },
      { question: 'Получу ли я все файлы и права на использование?', answer: 'Безусловно. После завершения проекта вы получаете все исходные файлы (AI, PSD и др.), оптимизированные для веба форматы и полные права на использование. Брендбук документирует правильное применение.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Вена', description: 'Сайт в стиле вашего бренда.', href: '/webdesign-wien' as StaticAppPathname },
      { title: 'SEO Вена', description: 'Видимость для вашего бренда.', href: '/seo-agentur-wien' as StaticAppPathname },
      { title: 'Креативное агентство Вена', description: 'Полный комплекс услуг.', href: '/kreativagentur-wien' as StaticAppPathname },
    ],
    sectionTitles: {
      pricing: 'Наши пакеты брендинга',
      pricingDescription: 'От разработки логотипа до полной идентичности бренда.',
      process: 'Наш процесс брендинга',
      processDescription: 'Структурированно и прозрачно — так мы развиваем ваш бренд.',
      technologies: 'Инструменты и ПО',
      technologiesDescription: 'Профессиональные инструменты для первоклассных результатов.',
      faq: 'Часто задаваемые вопросы о брендинге в Вене',
      relatedServices: 'Другие услуги в Вене',
      ctaTitle: 'Готовы к вашему новому бренду?',
      ctaDescription: 'Давайте обсудим вашу корпоративную идентичность. Бесплатная консультация в Вене.',
      ctaButton: 'Заказать брендинг',
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
      url: getCanonicalUrl('/branding-agentur-wien', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Branding Agentur Wien' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/branding-agentur-wien', locale),
      languages: getHreflangAlternates('/branding-agentur-wien').languages,
    },
  }
}

export default async function BrandingAgenturWienPage({ params }: { params: Promise<{ locale: string }> }) {
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
      serviceName: { de: 'Branding Agentur Wien', en: 'Branding Agency Vienna', ru: 'Брендинг-агентство Вена' }[locale],
      serviceUrl: 'https://goldenwing.at/branding-agentur-wien',
      areaServed: { type: 'City', name: 'Vienna' },
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
        { name: { de: 'Branding Agentur Wien', en: 'Branding Agency Vienna', ru: 'Брендинг-агентство Вена' }[locale], url: { de: 'https://goldenwing.at/branding-agentur-wien', en: 'https://goldenwing.at/en/branding-agency-vienna', ru: 'https://goldenwing.at/ru/branding-agentur-wien' }[locale] },
      ],
    },
  }

  return <RegionalLandingPage data={landingPageData} />
}
