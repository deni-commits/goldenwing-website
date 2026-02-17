import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO, LocalBusinessInfo } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

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

const seoData = {
  de: {
    title: 'SEO Agentur Wien | Suchmaschinenoptimierung aus dem 10. Bezirk',
    description: 'SEO Agentur in Wien. Persönliche Betreuung, transparente Preise. Technical SEO, Content, Linkbuilding. Ab €590/Monat. Förderung bis 50% möglich.',
    keywords: ['SEO Agentur Wien', 'Suchmaschinenoptimierung Wien', 'SEO Wien', 'Google Ranking Wien'],
  },
  en: {
    title: 'SEO Agency Vienna | Search Engine Optimization from the 10th District',
    description: 'SEO Agency in Vienna. Personal support, transparent pricing. Technical SEO, Content, Link Building. From €590/month.',
    keywords: ['SEO Agency Vienna', 'Search Engine Optimization Vienna', 'SEO Vienna', 'Google Ranking Vienna'],
  },
  ru: {
    title: 'SEO Агентство Вена | Поисковая оптимизация из 10-го района',
    description: 'SEO Агентство в Вене. Личное сопровождение, прозрачные цены. От €590/месяц.',
    keywords: ['SEO Агентство Вена', 'Поисковая оптимизация Вена', 'SEO Вена'],
  },
}

const contentData: Record<'de' | 'en' | 'ru', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Wien',
      title: 'SEO Agentur Wien',
      description: 'Mehr Sichtbarkeit für Wiener Unternehmen. Technical SEO, Content-Strategie und Linkbuilding – persönlich betreut aus unserem Büro im 10. Bezirk.',
      ctaPrimary: 'SEO-Analyse anfragen',
      ctaSecondary: 'Case Studies ansehen',
    },
    trustSignals: [
      { icon: 'trending-up', text: 'Ø +180% organischer Traffic' },
      { icon: 'star', text: '4.9/5 Kundenbewertung' },
      { icon: 'award', text: '30+ Wiener Projekte' },
      { icon: 'shield', text: 'Keine Black-Hat-Methoden' },
    ],
    benefits: [
      {
        icon: 'search',
        title: 'Technical SEO',
        description: 'Site-Audits, Core Web Vitals, strukturierte Daten. Wir sorgen dafür, dass Google Ihre Seite liebt.',
      },
      {
        icon: 'file-text',
        title: 'Content-Strategie',
        description: 'Keyword-Recherche, Content-Pläne, SEO-Texte. Inhalte, die ranken UND konvertieren.',
      },
      {
        icon: 'globe',
        title: 'Local SEO Wien',
        description: 'Google Business Profile, lokale Keywords, Bewertungsmanagement. Damit Sie in Wien gefunden werden.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Transparentes Reporting',
        description: 'Monatliche Reports mit echten Zahlen. Sie wissen immer, was wir tun und was es bringt.',
      },
    ],
    packages: [
      {
        name: 'SEO Starter Wien',
        price: '590',
        priceType: 'pro Monat',
        description: 'Für kleine Wiener Unternehmen mit lokalem Fokus.',
        popular: false,
        features: [
          'Technical SEO Audit',
          '5 Fokus-Keywords',
          'Google Business Optimierung',
          'Monatliches Reporting',
          'E-Mail Support',
        ],
      },
      {
        name: 'SEO Business Wien',
        price: '1.290',
        priceType: 'pro Monat',
        description: 'Für wachsende Wiener Unternehmen.',
        popular: true,
        features: [
          'Alles aus Starter',
          '15 Fokus-Keywords',
          'Content-Erstellung (2 Artikel/Monat)',
          'Linkbuilding (5 Links/Monat)',
          'Conversion-Optimierung',
          'Telefon-Support',
        ],
      },
      {
        name: 'SEO Premium Wien',
        price: '2.490',
        priceType: 'pro Monat',
        description: 'Für ambitionierte Wiener Unternehmen.',
        popular: false,
        features: [
          'Alles aus Business',
          'Unbegrenzte Keywords',
          'Content-Erstellung (4 Artikel/Monat)',
          'Linkbuilding (10 Links/Monat)',
          'Dedizierter Ansprechpartner',
          'Wöchentliche Calls',
        ],
      },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Wir analysieren Ihre Website und identifizieren Optimierungspotenzial.' },
      { step: '02', title: 'Strategie', description: 'Keyword-Recherche, Wettbewerbsanalyse, Maßnahmenplan.' },
      { step: '03', title: 'Umsetzung', description: 'Technical SEO, Content-Erstellung, Linkbuilding.' },
      { step: '04', title: 'Monitoring', description: 'Ranking-Tracking, Traffic-Analyse, kontinuierliche Optimierung.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush', 'Google Analytics 4'],
    faqs: [
      {
        question: 'Wie lange dauert es, bis SEO wirkt?',
        answer: 'Erste Verbesserungen sehen Sie nach 3-4 Monaten. Signifikante Ergebnisse nach 6-12 Monaten. SEO ist ein Marathon, kein Sprint.',
      },
      {
        question: 'Was kostet SEO in Wien?',
        answer: 'Unsere SEO-Pakete starten bei €590/Monat für lokales SEO. Business-Pakete liegen bei €1.290/Monat. Die Wirtschaftsagentur Wien fördert Digitalisierung mit bis zu 50%.',
      },
      {
        question: 'Garantiert ihr Rankings?',
        answer: 'Nein. Wer "Platz 1 garantiert" verspricht, lügt. Wir garantieren professionelle Arbeit, transparente Kommunikation und messbare Verbesserungen.',
      },
      {
        question: 'Kann ich euch im Büro besuchen?',
        answer: 'Ja! Unser Büro in der Czeikestrasse (1100 Wien) ist mit U1 gut erreichbar. Kickoff-Meetings und Strategie-Sessions finden oft hier statt.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Wien', description: 'Websites, die für SEO optimiert sind.', href: '/standorte/wien/webdesign' as any },
      { title: 'Google Ads Wien', description: 'Sofort sichtbar mit bezahlter Werbung.', href: '/standorte/wien/google-ads' as any },
      { title: 'Content Marketing', description: 'Inhalte, die ranken und konvertieren.', href: '/leistungen/seo-content' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Wien',
      pricingDescription: 'Transparente Preise – Förderung bis 50% möglich!',
      faqTitle: 'SEO Wien – Häufige Fragen',
      ctaTitle: 'Mehr Sichtbarkeit für Ihr Unternehmen?',
      ctaDescription: 'Kostenloses SEO-Audit für Wiener Unternehmen.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Vienna',
      title: 'SEO Agency Vienna',
      description: 'More visibility for Viennese businesses. Technical SEO, content strategy and link building – personally managed from our office.',
      ctaPrimary: 'Request SEO Analysis',
      ctaSecondary: 'View Case Studies',
    },
    trustSignals: [
      { icon: 'trending-up', text: 'Ø +180% Organic Traffic' },
      { icon: 'star', text: '4.9/5 Customer Rating' },
      { icon: 'award', text: '30+ Vienna Projects' },
      { icon: 'shield', text: 'No Black-Hat Methods' },
    ],
    benefits: [
      { icon: 'search', title: 'Technical SEO', description: 'Site audits, Core Web Vitals, structured data.' },
      { icon: 'file-text', title: 'Content Strategy', description: 'Keyword research, content plans, SEO copy.' },
      { icon: 'globe', title: 'Local SEO Vienna', description: 'Google Business Profile, local keywords, review management.' },
      { icon: 'bar-chart-3', title: 'Transparent Reporting', description: 'Monthly reports with real numbers.' },
    ],
    packages: [
      {
        name: 'SEO Starter Vienna',
        price: '590',
        priceType: 'per month',
        description: 'For small Viennese businesses.',
        popular: false,
        features: ['Technical SEO Audit', '5 Focus Keywords', 'Google Business Optimization', 'Monthly Reporting'],
      },
      {
        name: 'SEO Business Vienna',
        price: '1,290',
        priceType: 'per month',
        description: 'For growing Viennese businesses.',
        popular: true,
        features: ['Everything from Starter', '15 Focus Keywords', 'Content Creation', 'Link Building'],
      },
      {
        name: 'SEO Premium Vienna',
        price: '2,490',
        priceType: 'per month',
        description: 'For ambitious Viennese businesses.',
        popular: false,
        features: ['Everything from Business', 'Unlimited Keywords', 'Dedicated Manager', 'Weekly Calls'],
      },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'We analyze your website and identify optimization potential.' },
      { step: '02', title: 'Strategy', description: 'Keyword research, competitive analysis, action plan.' },
      { step: '03', title: 'Implementation', description: 'Technical SEO, content creation, link building.' },
      { step: '04', title: 'Monitoring', description: 'Ranking tracking, traffic analysis, continuous optimization.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush', 'Google Analytics 4'],
    faqs: [
      { question: 'How long does SEO take to work?', answer: 'First improvements after 3-4 months. Significant results after 6-12 months.' },
      { question: 'What does SEO cost in Vienna?', answer: 'Our packages start at €590/month. The Vienna Business Agency funds up to 50%.' },
    ],
    relatedServices: [
      { title: 'Web Design Vienna', description: 'Websites optimized for SEO.', href: '/standorte/wien/webdesign' as any },
      { title: 'Google Ads Vienna', description: 'Instant visibility with paid ads.', href: '/standorte/wien/google-ads' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Vienna',
      faqTitle: 'SEO Vienna – FAQ',
      ctaTitle: 'More Visibility for Your Business?',
    },
  },
  ru: {
    hero: {
      badge: 'SEO Агентство Вена',
      title: 'SEO Агентство Вена',
      description: 'Больше видимости для венских компаний. Техническое SEO, контент-стратегия и линкбилдинг.',
      ctaPrimary: 'Заказать SEO-аудит',
      ctaSecondary: 'Посмотреть кейсы',
    },
    trustSignals: [
      { icon: 'trending-up', text: 'Ø +180% органического трафика' },
      { icon: 'star', text: 'Оценка 4.9/5' },
    ],
    benefits: [
      { icon: 'search', title: 'Техническое SEO', description: 'Аудиты, Core Web Vitals, структурированные данные.' },
      { icon: 'file-text', title: 'Контент-стратегия', description: 'Исследование ключевых слов, контент-планы.' },
    ],
    packages: [
      { name: 'SEO Стартовый', price: '590', priceType: 'в месяц', description: 'Для малых компаний.', popular: false, features: ['SEO-аудит', '5 ключевых слов'] },
      { name: 'SEO Бизнес', price: '1 290', priceType: 'в месяц', description: 'Для растущих компаний.', popular: true, features: ['15 ключевых слов', 'Контент'] },
    ],
    process: [
      { step: '01', title: 'Аудит', description: 'Анализ сайта.' },
      { step: '02', title: 'Стратегия', description: 'Исследование ключевых слов.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs'],
    faqs: [
      { question: 'Сколько времени нужно для SEO?', answer: 'Первые результаты через 3-4 месяца.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Вена', description: 'Сайты, оптимизированные для SEO.', href: '/standorte/wien/webdesign' as any },
    ],
    labels: { ...sharedLabels.ru, pricingTitle: 'SEO Пакеты для Вены', faqTitle: 'SEO Вена – Вопросы' },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/wien/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/wien/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortWienSEOPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'

  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Wien' : 'SEO Agency Vienna',
    cityName: 'Wien',
    cityType: 'City',
    url: '/standorte/wien/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Wien', url: 'https://goldenwing.at/standorte/wien' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/wien/seo' },
    ],
    localBusiness: viennaLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Beste SEO Agenturen Wien', href: '/beste-seo-agenturen-wien' },
        { text: 'SEO Kosten', href: '/wissen/guides/seo-kosten' },
      ]
    : [
        { text: 'Best SEO Agencies Vienna', href: '/best-seo-agencies-vienna' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
