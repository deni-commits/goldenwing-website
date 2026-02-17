import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO, LocalBusinessInfo } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const dubaiLocalBusiness: LocalBusinessInfo = {
  name: 'GoldenWing Creative Studios Dubai',
  address: 'DAMAC Executive Bay Tower B, Office 1406',
  city: 'Dubai',
  postalCode: '',
  country: 'AE',
  phone: '+971-4-XXX-XXXX',
  latitude: 25.1857,
  longitude: 55.2744,
}

const seoData = {
  de: {
    title: 'SEO Agentur Dubai | Suchmaschinenoptimierung MENA',
    description: 'SEO Agentur in Dubai. Technical SEO, Content-Strategie, Linkbuilding für Deutsch, Englisch und Arabisch. MENA-Marktexperten. Ab €650/Monat.',
    keywords: ['SEO Agentur Dubai', 'Suchmaschinenoptimierung Dubai', 'SEO Dubai', 'Google Ranking Dubai'],
  },
  en: {
    title: 'SEO Agency Dubai | Search Engine Optimization MENA',
    description: 'SEO Agency in Dubai. Technical SEO, content strategy, link building for German, English and Arabic. MENA market experts. From €650/month.',
    keywords: ['SEO Agency Dubai', 'Search Engine Optimization Dubai', 'SEO Dubai', 'Google Ranking Dubai'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Dubai',
      title: 'SEO Agentur Dubai',
      description: 'Mehr Sichtbarkeit für Unternehmen in Dubai und der MENA-Region. Technical SEO, Content-Strategie und Linkbuilding – persönlich betreut aus unserem Büro in Dubai.',
      ctaPrimary: 'SEO-Analyse anfragen',
      ctaSecondary: 'Case Studies ansehen',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Ø +200% organischer Traffic' },
      { icon: 'star', text: '4.9/5 Kundenbewertung' },
      { icon: 'award', text: '35+ MENA-Projekte' },
      { icon: 'shield', text: 'Keine Black-Hat-Methoden' },
    ],
    benefits: [
      {
        icon: 'search',
        title: 'Technical SEO',
        description: 'Site-Audits, Core Web Vitals, strukturierte Daten. Wir sorgen dafür, dass Google Ihre Seite liebt – auf Deutsch, Englisch und Arabisch.',
      },
      {
        icon: 'fileText',
        title: 'Content-Strategie',
        description: 'Keyword-Recherche für MENA-Märkte, Content-Pläne, SEO-Texte. Inhalte, die ranken UND konvertieren.',
      },
      {
        icon: 'globe',
        title: 'Local SEO Dubai',
        description: 'Google Business Profile, lokale Keywords, Bewertungsmanagement. Damit Sie in Dubai und der Region gefunden werden.',
      },
      {
        icon: 'barChart3',
        title: 'Transparentes Reporting',
        description: 'Monatliche Reports mit echten Zahlen. Sie wissen immer, was wir tun und was es bringt.',
      },
    ],
    packages: [
      {
        name: 'SEO Starter Dubai',
        price: '650',
        priceType: 'pro Monat',
        description: 'Für kleine Unternehmen mit lokalem Fokus.',
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
        name: 'SEO Business Dubai',
        price: '1.450',
        priceType: 'pro Monat',
        description: 'Für wachsende Unternehmen in der MENA-Region.',
        popular: true,
        features: [
          'Alles aus Starter',
          '15 Fokus-Keywords',
          'Content-Erstellung (2 Artikel/Monat)',
          'Linkbuilding (5 Links/Monat)',
          'Conversion-Optimierung',
          'Zweisprachige Berichte (DE/EN)',
          'Telefon-Support',
        ],
      },
      {
        name: 'SEO Premium Dubai',
        price: '2.850',
        priceType: 'pro Monat',
        description: 'Für ambitionierte Unternehmen mit regionalem Wachstum.',
        popular: false,
        features: [
          'Alles aus Business',
          'Unbegrenzte Keywords',
          'Content-Erstellung (4 Artikel/Monat)',
          'Linkbuilding (10 Links/Monat)',
          'Drei-sprachig (DE/EN/AR)',
          'Dedizierter Ansprechpartner',
          'Wöchentliche Calls',
        ],
      },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Wir analysieren Ihre Website und identifizieren Optimierungspotenzial für MENA-Märkte.' },
      { step: '02', title: 'Strategie', description: 'Keyword-Recherche, Wettbewerbsanalyse, lokale Marktanalyse, Maßnahmenplan.' },
      { step: '03', title: 'Umsetzung', description: 'Technical SEO, Content-Erstellung, Linkbuilding – alles angepasst an regionale Standards.' },
      { step: '04', title: 'Monitoring', description: 'Ranking-Tracking, Traffic-Analyse, kontinuierliche Optimierung.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush', 'Google Analytics 4', 'Arabic SEO Tools'],
    faqs: [
      {
        question: 'Wie lange dauert es, bis SEO wirkt?',
        answer: 'Erste Verbesserungen nach 3-4 Monaten. Signifikante Ergebnisse nach 6-12 Monaten. SEO ist ein Marathon, kein Sprint – aber wir zeigen Ihnen kontinuierlichen Fortschritt.',
      },
      {
        question: 'Was kostet SEO in Dubai?',
        answer: 'Unsere SEO-Pakete starten bei €650/Monat für lokales SEO. Business-Pakete liegen bei €1.450/Monat. Premium mit mehrsprachigen Inhalten: €2.850/Monat.',
      },
      {
        question: 'Garantiert ihr Rankings?',
        answer: 'Nein. Wer "Platz 1 garantiert" verspricht, lügt. Wir garantieren professionelle Arbeit, transparente Kommunikation und messbare Verbesserungen.',
      },
      {
        question: 'Könnt ihr auf Arabisch SEO machen?',
        answer: 'Ja! Wir haben Expertise in arabischer SEO. Andere Keyword-Strukturen, andere Suchtrends. Wir verstehen den arabischen Suchmarkt.',
      },
      {
        question: 'Kann ich euch im Dubai-Büro besuchen?',
        answer: 'Ja! Unser Büro in DAMAC Executive Bay ist leicht erreichbar. Kickoff-Meetings und Strategie-Sessions finden oft hier statt.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Websites, die für SEO optimiert sind.', href: '/standorte/dubai/webdesign' as any },
      { title: 'Digital Marketing Dubai', description: 'Sofort sichtbar mit bezahlter Werbung.', href: '/standorte/dubai/digital-marketing' as any },
      { title: 'Content Marketing', description: 'Inhalte, die ranken und konvertieren.', href: '/leistungen/seo-content' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Dubai',
      pricingDescription: 'Transparente Preise mit MENA-Expertise!',
      faqTitle: 'SEO Dubai – Häufige Fragen',
      ctaTitle: 'Mehr Sichtbarkeit?',
      ctaDescription: 'Kostenloses SEO-Audit für Unternehmen in Dubai.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Dubai',
      title: 'SEO Agency Dubai',
      description: 'More visibility for businesses in Dubai and the MENA region. Technical SEO, content strategy and link building – personally managed from our Dubai office.',
      ctaPrimary: 'Request SEO Analysis',
      ctaSecondary: 'View Case Studies',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Avg +200% Organic Traffic' },
      { icon: 'star', text: '4.9/5 Customer Rating' },
      { icon: 'award', text: '35+ MENA Projects' },
      { icon: 'shield', text: 'No Black-Hat Methods' },
    ],
    benefits: [
      { icon: 'search', title: 'Technical SEO', description: 'Site audits, Core Web Vitals, structured data. We make sure Google loves your site – in German, English and Arabic.' },
      { icon: 'fileText', title: 'Content Strategy', description: 'Keyword research for MENA markets, content plans, SEO copy. Content that ranks AND converts.' },
      { icon: 'globe', title: 'Local SEO Dubai', description: 'Google Business Profile, local keywords, review management. So you can be found in Dubai and the region.' },
      { icon: 'barChart3', title: 'Transparent Reporting', description: 'Monthly reports with real numbers. You always know what we do and what it brings.' },
    ],
    packages: [
      { name: 'SEO Starter Dubai', price: '650', priceType: 'per month', description: 'For small businesses with local focus.', popular: false, features: ['Technical SEO Audit', '5 Focus Keywords', 'Google Business Optimization', 'Monthly Reporting'] },
      { name: 'SEO Business Dubai', price: '1,450', priceType: 'per month', description: 'For growing MENA businesses.', popular: true, features: ['Everything from Starter', '15 Focus Keywords', 'Content Creation (2 articles)', 'Link Building (5 links)', 'Conversion Optimization', 'Bilingual Reports'] },
      { name: 'SEO Premium Dubai', price: '2,850', priceType: 'per month', description: 'For ambitious regional businesses.', popular: false, features: ['Everything from Business', 'Unlimited Keywords', 'Content Creation (4 articles)', 'Link Building (10 links)', 'Trilingual (DE/EN/AR)', 'Dedicated Manager', 'Weekly Calls'] },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'We analyze your website and identify optimization potential for MENA markets.' },
      { step: '02', title: 'Strategy', description: 'Keyword research, competitive analysis, local market analysis, action plan.' },
      { step: '03', title: 'Implementation', description: 'Technical SEO, content creation, link building – all adapted to regional standards.' },
      { step: '04', title: 'Monitoring', description: 'Ranking tracking, traffic analysis, continuous optimization.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush', 'Google Analytics 4', 'Arabic SEO Tools'],
    faqs: [
      { question: 'How long does SEO take to work?', answer: 'First improvements after 3-4 months. Significant results after 6-12 months. SEO is a marathon, not a sprint – but we show you continuous progress.' },
      { question: 'What does SEO cost in Dubai?', answer: 'Our packages start at €650/month for local SEO. Business packages €1,450/month. Premium with multilingual content: €2,850/month.' },
      { question: 'Do you guarantee rankings?', answer: 'No. Anyone promising "rank 1 guaranteed" is lying. We guarantee professional work, transparent communication and measurable improvements.' },
      { question: 'Can you do Arabic SEO?', answer: 'Yes! We have Arabic SEO expertise. Different keyword structures, different search trends. We understand the Arabic search market.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Websites optimized for SEO.', href: '/standorte/dubai/webdesign' as any },
      { title: 'Digital Marketing Dubai', description: 'Instant visibility with paid ads.', href: '/standorte/dubai/digital-marketing' as any },
      { title: 'Content Marketing', description: 'Content that ranks and converts.', href: '/leistungen/seo-content' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Dubai',
      pricingDescription: 'Transparent prices with MENA expertise!',
      faqTitle: 'SEO Dubai – FAQ',
      ctaTitle: 'More Visibility?',
      ctaDescription: 'Free SEO audit for Dubai businesses.',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/dubai/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/dubai/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortDubaiSEOPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Dubai' : 'SEO Agency Dubai',
    cityName: 'Dubai',
    cityType: 'City',
    url: '/standorte/dubai/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.ae' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.ae/standorte' },
      { name: 'Dubai', url: 'https://goldenwing.ae/standorte/dubai' },
      { name: 'SEO', url: 'https://goldenwing.ae/standorte/dubai/seo' },
    ],
    localBusiness: dubaiLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Beste SEO Agenturen Dubai', href: '/beste-seo-agenturen-dubai' },
        { text: 'SEO Kosten', href: '/wissen/guides/seo-kosten' },
      ]
    : [
        { text: 'Best SEO Agencies Dubai', href: '/best-seo-agencies-dubai' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
