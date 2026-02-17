import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO, LocalBusinessInfo } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// Vienna LocalBusiness Info (echte Adresse!)
const viennaLocalBusiness: LocalBusinessInfo = {
  name: 'GoldenWing Creative Studios Wien',
  address: 'Czeikestrasse 4/21',
  city: 'Wien',
  postalCode: '1100',
  country: 'AT',
  phone: '+43-664-543-96-81',
  latitude: 48.1676,
  longitude: 16.3795,
}

// TIER 1: Wien - MIT LocalBusiness (echtes Büro!)
const seoData = {
  de: {
    title: 'Social Media Agentur Wien | Content, Ads & Community',
    description: 'Social Media Agentur in Wien. Content-Erstellung, Paid Social, Community Management. Meta, LinkedIn, TikTok. Büro in 1100 Wien.',
    keywords: ['Social Media Agentur Wien', 'Instagram Marketing Wien', 'Social Media Wien', 'Facebook Marketing Wien', 'TikTok Agentur Wien'],
  },
  en: {
    title: 'Social Media Agency Vienna | Content, Ads & Community',
    description: 'Social media agency in Vienna. Content creation, paid social, community management. Meta, LinkedIn, TikTok. Office in Vienna.',
    keywords: ['Social Media Agency Vienna', 'Instagram Marketing Vienna', 'Social Media Vienna', 'Facebook Marketing Vienna'],
  },
  ru: {
    title: 'Агентство социальных медиа Вена | Контент и объявления',
    description: 'Агентство социальных медиа в Вене. Создание контента, платные объявления, управление сообществом. Meta, LinkedIn, TikTok.',
    keywords: ['Агентство социальных медиа Вена', 'Маркетинг Instagram Вена', 'Маркетинг TikTok Вена'],
  },
}

// UNIQUE Content für Wien - Social Media Fokus
const contentData: Record<'de' | 'en' | 'ru', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Social Media Agentur Wien',
      title: 'Social Media Agentur Wien',
      description: 'Content-Erstellung, Paid Ads, Community Management – alles für Ihre Social-Media-Präsenz. Professionell betreut aus unserem Wiener Büro.',
      ctaPrimary: 'Social Media Strategie buchen',
      ctaSecondary: 'Cases ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Meta Partner' },
      { icon: 'mapPin', text: 'Büro in Wien 1100' },
      { icon: 'trendingUp', text: 'Ø 250% Engagement-Wachstum' },
      { icon: 'shield', text: 'Sichere, getestete Strategien' },
    ],
    benefits: [
      {
        icon: 'pencil',
        title: 'Content Creation',
        description: 'Hochwertige Posts, Reels, Stories – wir erstellen Content, der Ihre Zielgruppe wirklich interessiert. Design, Copywriting, Video – alles inhouse.',
      },
      {
        icon: 'zap',
        title: 'Paid Social Ads',
        description: 'Gezielte Kampagnen auf Meta, LinkedIn, TikTok. Pixel-Tracking, Remarketing, Lookalike Audiences – für maximale ROI.',
      },
      {
        icon: 'users',
        title: 'Community Management',
        description: 'Wir beantworten Kommentare, reagieren auf Messages und bauen eine echte Community auf. Nicht einfach nur Content-Posting.',
      },
      {
        icon: 'bar-chart-2',
        title: 'Performance Analytics',
        description: 'Monatliche Reports mit klaren Metriken: Reichweite, Engagement, Conversions. So sehen Sie, was funktioniert.',
      },
    ],
    results: [
      { metric: '250%', label: 'Engagement-Wachstum', detail: 'Im Durchschnitt bei unseren Kunden' },
      { metric: '-35%', label: 'CPM', detail: 'Niedrigere Werbekosten pro 1.000 Impressionen' },
      { metric: '45', label: 'Tage', detail: 'Durchschnittliche Reaktionszeit auf Kommentare' },
    ],
    packages: [
      {
        name: 'Social Starter',
        price: '590',
        priceType: 'mtl.',
        description: 'Perfekt zum Einstieg – Basis Social Media Management.',
        popular: false,
        features: [
          '1 Plattform (Instagram oder TikTok)',
          '4 Posts pro Monat',
          'Community Management (Basis)',
          'Monatlicher Report',
          'Email-Support',
          'Organic-fokussiert',
        ],
      },
      {
        name: 'Social Business',
        price: '1.290',
        priceType: 'mtl.',
        description: 'Die beliebteste Option – Vollständiges Social Media Management.',
        popular: true,
        features: [
          '2-3 Plattformen (Instagram, Facebook, LinkedIn)',
          '8-12 Posts pro Monat',
          'Reels/Video-Content (2-3/Monat)',
          'Community Management (täglich)',
          'Bezahlte Kampagnen (€500-1.000 Budget)',
          'Wöchentliche Optimierung',
          'Bi-wöchentliche Strategy-Calls',
          'Monatlicher Report',
        ],
      },
      {
        name: 'Social Premium',
        price: '2.490',
        priceType: 'mtl.',
        description: 'Vollständige Social Media Transformation – mit Influencer-Kooperationen.',
        popular: false,
        features: [
          'Alle großen Plattformen (Instagram, TikTok, LinkedIn, Pinterest)',
          '15-20 Posts pro Monat',
          'Professional Video/Reels (5-8/Monat)',
          'Tägliches Community Management',
          'Bezahlte Kampagnen (€2.000+ Budget)',
          'Influencer-Kooperationen koordiniert',
          'Wöchentliche Strategie-Calls',
          'Tägliche Unterstützung',
          'Detailliertes Reporting',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Social Audit', description: 'Wir analysieren Ihren aktuellen Stand, Wettbewerber und Zielgruppe.' },
      { step: '02', title: 'Strategie & Content-Planung', description: 'Content-Kalender, Ton der Stimme, Best Practice für jede Plattform.' },
      { step: '03', title: 'Content Production', description: 'Wir erstellen oder optimieren Posts, Reels, Stories – je nach Paket.' },
      { step: '04', title: 'Paid Campaigns', description: 'Bezahlte Kampagnen auf Meta, LinkedIn, TikTok für schnellere Ergebnisse.' },
      { step: '05', title: 'Monitoring & Optimierung', description: 'Wöchentliche A/B-Tests, Bid-Anpassungen, Performance-Tracking.' },
    ],
    technologies: ['Meta Business Suite', 'TikTok For Business', 'LinkedIn Campaign Manager', 'Canva', 'Adobe Creative Suite', 'Google Analytics'],
    faqs: [
      {
        question: 'Was kostet Social Media Management in Wien?',
        answer: 'Starter: €590/Monat (1 Plattform, organisch). Business: €1.290/Monat (2-3 Plattformen + Ads). Premium: €2.490/Monat (alle Plattformen + Influencer). Dazu kommen Werbebudgets je nach Kampagne.',
      },
      {
        question: 'Wie schnell sehe ich Ergebnisse?',
        answer: 'Organische Reichweite: nach 4-8 Wochen sichtbar. Bezahlte Ads: erste Conversions am Tag 1. Massive Wachstum: nach 2-3 Monaten konsistenter Content.',
      },
      {
        question: 'Welche Plattformen macht Ihr?',
        answer: 'Instagram (Spezialität), TikTok, Facebook, LinkedIn, Pinterest. Wir konzentrieren uns auf Plattformen, wo Ihre Zielgruppe aktiv ist – nicht auf alle gleichzeitig.',
      },
      {
        question: 'Können Sie Videos erstellen?',
        answer: 'Ja! Im Premium-Paket sind 5-8 professionelle Reels/Videos pro Monat enthalten. Im Business-Paket: 2-3. Starter-Paket: organischer Content.',
      },
      {
        question: 'Was ist mit Influencer-Kooperationen?',
        answer: 'Das ist im Premium-Paket enthalten. Wir koordinieren mit relevanten Influencern in Wien/Österreich. Abhängig von Ihrem Budget und Zielgruppe.',
      },
      {
        question: 'Wer schreibt die Posts?',
        answer: 'Unser Team – bestehend aus Content-Strategin, Designer und Copywriter. Ihr Input und Feedback ist essentiell.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Wien', description: 'Website passend zur Social Media Strategie.', href: '/standorte/wien/webdesign' as any },
      { title: 'Google Ads Wien', description: 'Zusätzlich zu Social – Search Marketing.', href: '/standorte/wien/google-ads' as any },
      { title: 'Kreativagentur Wien', description: 'Komplettes Marketing Setup.', href: '/standorte/wien/kreativagentur' as any },
      { title: 'Branding Wien', description: 'Marke auf Social Media zeigen.', href: '/standorte/wien/branding' as any },
      { title: 'SEO Wien', description: 'Organische Sichtbarkeit.', href: '/standorte/wien/seo' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Social Media Pakete für Wien',
      pricingDescription: 'Monatlich kündbar – ohne Vertragsbindung. Werbebudget je nach Kampagne extra.',
      processTitle: 'So arbeiten wir',
      processSubtitle: 'Von der Strategie zur Community.',
      resultsTitle: 'Durchschnittliche Ergebnisse',
      faqTitle: 'Social Media Wien – Häufige Fragen',
      faqSubtitle: 'Alles rund um Content, Ads und Community Management.',
      ctaTitle: 'Social Media Strategie starten?',
      ctaDescription: 'Kostenloses Beratungsgespräch in unserem Wiener Büro.',
    },
  },
  en: {
    hero: {
      badge: 'Social Media Agency Vienna',
      title: 'Social Media Agency Vienna',
      description: 'Content creation, paid ads, community management – everything for your social media presence. Professionally managed from our Vienna office.',
      ctaPrimary: 'Book Social Media Strategy',
      ctaSecondary: 'View Cases',
    },
    trustSignals: [
      { icon: 'award', text: 'Meta Partner' },
      { icon: 'mapPin', text: 'Office in Vienna' },
      { icon: 'trendingUp', text: 'Avg. 250% Engagement Growth' },
      { icon: 'shield', text: 'Proven Strategies' },
    ],
    benefits: [
      {
        icon: 'pencil',
        title: 'Content Creation',
        description: 'High-quality posts, reels, stories – we create content that truly interests your audience. Design, copywriting, video – all in-house.',
      },
      {
        icon: 'zap',
        title: 'Paid Social Ads',
        description: 'Targeted campaigns on Meta, LinkedIn, TikTok. Pixel tracking, remarketing, lookalike audiences for maximum ROI.',
      },
      {
        icon: 'users',
        title: 'Community Management',
        description: 'We respond to comments, reply to messages and build a real community. Not just posting content.',
      },
      {
        icon: 'bar-chart-2',
        title: 'Performance Analytics',
        description: 'Monthly reports with clear metrics: reach, engagement, conversions. So you see what works.',
      },
    ],
    results: [
      { metric: '250%', label: 'Engagement Growth', detail: 'Average for our clients' },
      { metric: '-35%', label: 'CPM', detail: 'Lower ad costs per 1,000 impressions' },
      { metric: '45', label: 'Days', detail: 'Average response time on comments' },
    ],
    packages: [
      {
        name: 'Social Starter',
        price: '590',
        priceType: 'monthly',
        description: 'Perfect entry point – basic social media management.',
        popular: false,
        features: [
          '1 Platform (Instagram or TikTok)',
          '4 Posts per Month',
          'Community Management (Basic)',
          'Monthly Report',
          'Email Support',
          'Organic-focused',
        ],
      },
      {
        name: 'Social Business',
        price: '1,290',
        priceType: 'monthly',
        description: 'The most popular option – complete social media management.',
        popular: true,
        features: [
          '2-3 Platforms (Instagram, Facebook, LinkedIn)',
          '8-12 Posts per Month',
          'Video/Reels Content (2-3/month)',
          'Daily Community Management',
          'Paid Campaigns (€500-1,000 budget)',
          'Weekly Optimization',
          'Bi-weekly Strategy Calls',
          'Monthly Report',
        ],
      },
      {
        name: 'Social Premium',
        price: '2,490',
        priceType: 'monthly',
        description: 'Complete social media transformation – with influencer collaborations.',
        popular: false,
        features: [
          'All major platforms (Instagram, TikTok, LinkedIn, Pinterest)',
          '15-20 Posts per Month',
          'Professional Video/Reels (5-8/month)',
          'Daily Community Management',
          'Paid Campaigns (€2,000+ budget)',
          'Influencer Collaborations coordinated',
          'Weekly Strategy Calls',
          'Daily Support',
          'Detailed Reporting',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Social Audit', description: 'We analyze your current status, competitors and target audience.' },
      { step: '02', title: 'Strategy & Content Planning', description: 'Content calendar, voice and tone, best practices for each platform.' },
      { step: '03', title: 'Content Production', description: 'We create or optimize posts, reels, stories – depending on your package.' },
      { step: '04', title: 'Paid Campaigns', description: 'Paid campaigns on Meta, LinkedIn, TikTok for faster results.' },
      { step: '05', title: 'Monitoring & Optimization', description: 'Weekly A/B tests, bid adjustments, performance tracking.' },
    ],
    technologies: ['Meta Business Suite', 'TikTok For Business', 'LinkedIn Campaign Manager', 'Canva', 'Adobe Creative Suite', 'Google Analytics'],
    faqs: [
      {
        question: 'What does social media management cost in Vienna?',
        answer: 'Starter: €590/month (1 platform, organic). Business: €1,290/month (2-3 platforms + ads). Premium: €2,490/month (all platforms + influencer). Ad budgets extra depending on campaigns.',
      },
      {
        question: 'How quickly will I see results?',
        answer: 'Organic reach: visible after 4-8 weeks. Paid ads: first conversions on day 1. Major growth: after 2-3 months of consistent content.',
      },
      {
        question: 'Which platforms do you work with?',
        answer: 'Instagram (specialty), TikTok, Facebook, LinkedIn, Pinterest. We focus on platforms where your target audience is active – not all at once.',
      },
      {
        question: 'Can you create videos?',
        answer: 'Yes! Premium package includes 5-8 professional reels/videos per month. Business package: 2-3. Starter: organic content.',
      },
      {
        question: 'What about influencer collaborations?',
        answer: 'It\'s included in the Premium package. We coordinate with relevant influencers in Vienna/Austria. Depends on your budget and target audience.',
      },
      {
        question: 'Who writes the posts?',
        answer: 'Our team – consisting of content strategist, designer and copywriter. Your input and feedback is essential.',
      },
    ],
    relatedServices: [
      { title: 'Web Design Vienna', description: 'Website matching your social strategy.', href: '/standorte/wien/webdesign' as any },
      { title: 'Google Ads Vienna', description: 'In addition to social – search marketing.', href: '/standorte/wien/google-ads' as any },
      { title: 'Creative Agency Vienna', description: 'Complete marketing setup.', href: '/standorte/wien/kreativagentur' as any },
      { title: 'Branding Vienna', description: 'Show your brand on social media.', href: '/standorte/wien/branding' as any },
      { title: 'SEO Vienna', description: 'Organic visibility.', href: '/standorte/wien/seo' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Social Media Packages for Vienna',
      pricingDescription: 'Monthly cancellation – no contract binding. Ad budgets extra depending on campaigns.',
      processTitle: 'How We Work',
      processSubtitle: 'From strategy to community.',
      resultsTitle: 'Average Results',
      faqTitle: 'Social Media Vienna – FAQ',
      faqSubtitle: 'All about content, ads and community management.',
      ctaTitle: 'Start Social Media Strategy?',
      ctaDescription: 'Free consultation at our Vienna office.',
    },
  },
  ru: {
    hero: {
      badge: 'Агентство социальных медиа Вена',
      title: 'Агентство социальных медиа Вена',
      description: 'Создание контента, платные объявления, управление сообществом – всё для вашего присутствия в социальных медиа. Профессионально из нашего офиса.',
      ctaPrimary: 'Заказать стратегию',
      ctaSecondary: 'Посмотреть случаи',
    },
    trustSignals: [
      { icon: 'award', text: 'Meta Партнер' },
      { icon: 'mapPin', text: 'Офис в Вене' },
      { icon: 'trendingUp', text: 'Рост на 250%' },
      { icon: 'shield', text: 'Проверенные стратегии' },
    ],
    benefits: [
      {
        icon: 'pencil',
        title: 'Создание контента',
        description: 'Высокого качества посты, видео, истории. Дизайн, копирайтинг, видео – всё инhouse.',
      },
      {
        icon: 'zap',
        title: 'Платные объявления',
        description: 'Целевые кампании на Meta, LinkedIn, TikTok. Отслеживание, ремаркетинг, похожие аудитории.',
      },
      {
        icon: 'users',
        title: 'Управление сообществом',
        description: 'Мы отвечаем на комментарии и строим настоящее сообщество.',
      },
      {
        icon: 'bar-chart-2',
        title: 'Аналитика и отчёты',
        description: 'Ежемесячные отчёты с ясными метриками.',
      },
    ],
    results: [
      { metric: '250%', label: 'рост engagement', detail: 'В среднем' },
      { metric: '-35%', label: 'снижение CPM', detail: 'Стоимость объявлений' },
    ],
    packages: [
      {
        name: 'Социальная Стартовая',
        price: '590',
        priceType: 'месяц',
        description: 'Идеально для начала – основное управление.',
        popular: false,
        features: [
          '1 платформа (Instagram или TikTok)',
          '4 поста в месяц',
          'Управление сообществом',
          'Ежемесячный отчёт',
          'Органический контент',
        ],
      },
      {
        name: 'Социальная Бизнес',
        price: '1 290',
        priceType: 'месяц',
        description: 'Популярный вариант – полное управление.',
        popular: true,
        features: [
          '2-3 платформы (Instagram, Facebook, LinkedIn)',
          '8-12 постов в месяц',
          'Видео и Reels (2-3/месяц)',
          'Ежедневное управление сообществом',
          'Платные кампании (€500-1 000)',
          'Еженедельная оптимизация',
          'Стратегические звонки',
          'Ежемесячный отчёт',
        ],
      },
      {
        name: 'Социальная Премиум',
        price: '2 490',
        priceType: 'месяц',
        description: 'Полная трансформация с influencer сотрудничеством.',
        popular: false,
        features: [
          'Все платформы (Instagram, TikTok, LinkedIn, Pinterest)',
          '15-20 постов в месяц',
          'Профессиональные видео (5-8/месяц)',
          'Ежедневное управление',
          'Платные кампании (€2 000+)',
          'Сотрудничество с influencers',
          'Стратегические звонки',
          'Ежедневная поддержка',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Аудит', description: 'Анализ вашего текущего статуса, конкурентов и целевой аудитории.' },
      { step: '02', title: 'Стратегия', description: 'План контента, голос и тон, лучшие практики.' },
      { step: '03', title: 'Производство контента', description: 'Создание постов, видео, историй.' },
      { step: '04', title: 'Платные кампании', description: 'Объявления на Meta, LinkedIn, TikTok.' },
      { step: '05', title: 'Мониторинг', description: 'A/B тесты, оптимизация, отслеживание производительности.' },
    ],
    technologies: ['Meta Business Suite', 'TikTok For Business', 'LinkedIn Campaign Manager', 'Canva', 'Adobe Creative Suite'],
    faqs: [
      {
        question: 'Сколько стоит управление социальными медиа в Вене?',
        answer: 'Стартовая: €590/месяц. Бизнес: €1 290/месяц. Премиум: €2 490/месяц. Плюс бюджеты объявлений.',
      },
      {
        question: 'Как долго ждать результатов?',
        answer: 'Органический контент: 4-8 недель. Платные объявления: результаты с первого дня.',
      },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Вена', description: 'Сайт, соответствующий вашей стратегии.', href: '/standorte/wien/webdesign' as any },
      { title: 'Google Ads Вена', description: 'Поиск маркетинг дополнительно.', href: '/standorte/wien/google-ads' as any },
    ],
    labels: {
      ...sharedLabels.ru,
      pricingTitle: 'Пакеты социальных медиа для Вены',
      faqTitle: 'Социальные медиа Вена – Вопросы',
      ctaTitle: 'Начать стратегию социальных медиа?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/wien/social-media')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getCanonicalUrl('/standorte/wien/social-media', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte/wien/social-media', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortWienSocialMediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'

  const content = contentData[locale] || contentData.de

  // TIER 1: Wien - MIT LocalBusiness (echtes Büro!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Social Media Agentur Wien' : locale === 'en' ? 'Social Media Agency Vienna' : 'Агентство социальных медиа Вена',
    cityName: 'Wien',
    cityType: 'City',
    url: '/standorte/wien/social-media',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : locale === 'en' ? 'Locations' : 'Офисы', url: 'https://goldenwing.at/standorte' },
      { name: 'Wien', url: 'https://goldenwing.at/standorte/wien' },
      { name: locale === 'de' ? 'Social Media' : locale === 'en' ? 'Social Media' : 'Социальные медиа', url: 'https://goldenwing.at/standorte/wien/social-media' },
    ],
    localBusiness: viennaLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Unsere Leistungen', href: '/leistungen' },
        { text: 'Agentur Wien', href: '/standorte/wien' },
        { text: 'Alle Standorte', href: '/standorte' },
      ]
    : locale === 'en'
    ? [
        { text: 'Our Services', href: '/services' },
        { text: 'Agency Vienna', href: '/locations/vienna' },
        { text: 'All Locations', href: '/locations' },
      ]
    : [
        { text: 'Наши услуги', href: '/ru/services' },
        { text: 'Офис Вена', href: '/ru/locations/vienna' },
      ]

  return (
    <LandingPageTemplate
      locale={locale}
      content={content}
      seo={seo}
      contextualLinks={contextualLinks}
    />
  )
}
