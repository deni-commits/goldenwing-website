import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Zürich - KEIN LocalBusiness (Service Schema only!)
const seoData = {
  de: {
    title: 'SEO Agentur Zürich | Schweizer Rankings, faire Preise',
    description: 'SEO für Zürcher Unternehmen. Bessere Google-Rankings in der Schweiz. Premium-Qualität aus Wien, 55% günstiger als Schweizer Agenturen. Ab CHF 890/Monat.',
    keywords: ['SEO Agentur Zürich', 'SEO Zürich', 'Suchmaschinenoptimierung Schweiz', 'SEO Beratung Zürich'],
  },
  en: {
    title: 'SEO Agency Zurich | Swiss Rankings, Fair Prices',
    description: 'SEO for Zurich businesses. Better Google rankings in Switzerland. Premium quality from Vienna, 55% more affordable than Swiss agencies.',
    keywords: ['SEO Agency Zurich', 'SEO Zurich', 'Search Engine Optimization Switzerland'],
  },
}

// UNIQUE Content für Zürich - SEO + Preis-Argument + Finance/Pharma
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Zürich',
      title: 'SEO Agentur Zürich',
      description: 'Bessere Google-Rankings für Zürcher Unternehmen. Wir bringen Sie auf Seite 1 in google.ch – mit Premium-Qualität aus Wien zu fairen Preisen.',
      ctaPrimary: 'Kostenlose SEO-Analyse',
      ctaSecondary: 'Case Studies ansehen',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Ø +200% organischer Traffic' },
      { icon: 'award', text: '55% günstiger als Zürich' },
      { icon: 'globe', text: 'DE/FR/EN mehrsprachig' },
      { icon: 'shield', text: 'White-Hat SEO' },
    ],
    // UNIQUE: Zürich-spezifische SEO-Benefits
    benefits: [
      {
        icon: 'mapPin',
        title: 'Lokales SEO Schweiz',
        description: 'Google Maps, lokale Suchergebnisse, Schweizer Branchenverzeichnisse. Für Dienstleister, die Zürcher Kunden erreichen wollen.',
      },
      {
        icon: 'building',
        title: 'Finance-SEO',
        description: 'Vermögensverwalter, Fintech, Crypto – wir kennen die Keywords, die in der Schweizer Finance-Szene ranken.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachiges SEO',
        description: 'Zürich ist multilingual. DE/FR/EN/IT – wir optimieren für alle Schweizer Märkte mit korrekten hreflang-Tags.',
      },
      {
        icon: 'shield',
        title: 'Compliance-konform',
        description: 'Content für regulierte Branchen: Pharma, Finance, Versicherung. Wir verstehen, was geht und was nicht.',
      },
    ],
    results: [
      { metric: '+200%', label: 'Organischer Traffic', detail: 'Typisches Ergebnis nach 6 Monaten' },
      { metric: '55%', label: 'Ersparnis', detail: 'vs. Zürcher Agenturen' },
      { metric: 'Top 5', label: 'Rankings', detail: 'Für relevante CH-Keywords' },
    ],
    packages: [
      {
        name: 'SEO Starter CH',
        price: '890',
        priceType: 'mtl. (CHF)',
        description: 'Für lokale Dienstleister.',
        popular: false,
        features: [
          'Keyword-Analyse (CH)',
          'OnPage-Optimierung (10 Seiten)',
          'Google Business Schweiz',
          'Monatliches Reporting',
          'Monatlich kündbar',
        ],
      },
      {
        name: 'SEO Business CH',
        price: '1.690',
        priceType: 'mtl. (CHF)',
        description: 'Für wachsende Unternehmen.',
        popular: true,
        features: [
          'Umfangreiche Keyword-Strategie',
          'OnPage (25 Seiten)',
          'Content (2 Artikel/Monat)',
          'Linkbuilding (CH-fokussiert)',
          'Mehrsprachiges SEO',
          'Bi-wöchentliche Calls',
        ],
      },
      {
        name: 'SEO Enterprise CH',
        price: '3.490',
        priceType: 'mtl. (CHF)',
        description: 'Für Konzerne und Banken.',
        popular: false,
        features: [
          'Komplette SEO-Strategie',
          'Unbegrenzte Seiten',
          'Content-Hub Aufbau',
          'CH/DE/AT/International',
          'Dedicated Manager',
          'Wöchentliche Strategie-Calls',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technische Analyse, CH-Keyword-Recherche, Wettbewerb.' },
      { step: '02', title: 'Strategie', description: 'Priorisierung, Roadmap, Schweizer Fokus.' },
      { step: '03', title: 'OnPage', description: 'Meta-Tags, Struktur, Content-Optimierung.' },
      { step: '04', title: 'OffPage', description: 'Linkbuilding in CH, Digital PR, Verzeichnisse.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Rankings (google.ch), Traffic, Conversions.' },
    ],
    technologies: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Sistrix'],
    // UNIQUE: Zürich-spezifische FAQs
    faqs: [
      {
        question: 'Was kostet SEO für Zürcher Unternehmen?',
        answer: 'Starter: CHF 890/Monat. Business: CHF 1.690/Monat. Enterprise: CHF 3.490/Monat. Monatlich kündbar. Vergleichen Sie mit Zürcher Agenturen!',
      },
      {
        question: 'Warum SEO aus Wien statt einer Zürcher Agentur?',
        answer: 'Gleiche Qualität, 55% günstiger. Schweizer Stundensätze für SEO liegen bei CHF 200-300 – wir sind effektiv bei CHF 90-130. Die Tools und Methoden sind identisch.',
      },
      {
        question: 'Funktioniert SEO für die Schweiz auch remote?',
        answer: 'Ja. Google unterscheidet nicht, woher die Optimierung kommt. Wir optimieren für google.ch, kennen Schweizer Keywords und verstehen den Markt.',
      },
      {
        question: 'Wie läuft mehrsprachiges SEO für die Schweiz?',
        answer: 'Korrekte hreflang-Tags, separate Keyword-Strategien für DE/FR/IT/EN, lokalisierte Inhalte. Die Schweiz ist unser Spezialgebiet.',
      },
      {
        question: 'Welche Branchen in Zürich bedient ihr?',
        answer: 'Finance (Vermögensverwaltung, Fintech), Pharma, Luxury, B2B-Dienstleister. Der Premium-Segment ist unser Fokus.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Zürich', description: 'SEO-optimierte Websites.', href: '/standorte/zuerich/webdesign' as any },
      { title: 'Digitalagentur Zürich', description: 'Alle Leistungen.', href: '/standorte/zuerich' as any },
      { title: 'SEO Agentur Wien', description: 'Unser Hauptstandort.', href: '/standorte/wien/seo' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Zürich',
      pricingDescription: 'Schweizer Qualitätsanspruch – 55% günstiger als lokale Agenturen.',
      processTitle: 'So verbessern wir Ihre Rankings',
      processSubtitle: 'Datengetrieben, transparent, nachhaltig.',
      resultsTitle: 'Typische Ergebnisse',
      faqTitle: 'SEO Zürich – Häufige Fragen',
      faqSubtitle: 'Antworten für Zürcher Unternehmen.',
      ctaTitle: 'Bessere Rankings in Zürich?',
      ctaDescription: 'Kostenlose SEO-Analyse Ihrer Website.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Zurich',
      title: 'SEO Agency Zurich',
      description: 'Better Google rankings for Zurich businesses. We get you to page 1 on google.ch – with premium quality from Vienna at fair prices.',
      ctaPrimary: 'Free SEO Analysis',
      ctaSecondary: 'View Case Studies',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Avg. +200% Organic Traffic' },
      { icon: 'award', text: '55% More Affordable' },
      { icon: 'globe', text: 'DE/FR/EN Multilingual' },
      { icon: 'shield', text: 'White-Hat SEO' },
    ],
    benefits: [
      { icon: 'mapPin', title: 'Local SEO Switzerland', description: 'Google Maps, local search results, Swiss directories.' },
      { icon: 'building', title: 'Finance SEO', description: 'Asset managers, Fintech, Crypto – keywords that rank in Swiss finance.' },
      { icon: 'globe', title: 'Multilingual SEO', description: 'Zurich is multilingual. DE/FR/EN/IT – we optimize for all Swiss markets.' },
      { icon: 'shield', title: 'Compliance-Compliant', description: 'Content for regulated industries: Pharma, Finance, Insurance.' },
    ],
    results: [
      { metric: '+200%', label: 'Organic Traffic', detail: 'Typical result after 6 months' },
      { metric: '55%', label: 'Savings', detail: 'vs. Zurich agencies' },
    ],
    packages: [
      { name: 'SEO Starter CH', price: '890', priceType: 'monthly (CHF)', description: 'For local service providers.', popular: false, features: ['Keyword Analysis (CH)', 'OnPage (10 pages)', 'Google Business CH', 'Monthly Reports'] },
      { name: 'SEO Business CH', price: '1,690', priceType: 'monthly (CHF)', description: 'For growing businesses.', popular: true, features: ['Full Keyword Strategy', 'OnPage (25 pages)', 'Content (2 articles/month)', 'Linkbuilding (CH-focused)', 'Multilingual SEO'] },
      { name: 'SEO Enterprise CH', price: '3,490', priceType: 'monthly (CHF)', description: 'For corporations and banks.', popular: false, features: ['Complete SEO Strategy', 'Unlimited Pages', 'CH/DE/AT/International', 'Dedicated Manager'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technical analysis, CH keyword research, competition.' },
      { step: '02', title: 'Strategy', description: 'Prioritization, roadmap, Swiss focus.' },
      { step: '03', title: 'OnPage', description: 'Meta tags, structure, content optimization.' },
      { step: '04', title: 'OffPage', description: 'Linkbuilding in CH, Digital PR.' },
      { step: '05', title: 'Reporting', description: 'Monthly rankings (google.ch), traffic, conversions.' },
    ],
    technologies: ['SEMrush', 'Ahrefs', 'Google Search Console'],
    faqs: [
      { question: 'What does SEO cost for Zurich businesses?', answer: 'Starter: CHF 890/month. Business: CHF 1,690/month. Enterprise: CHF 3,490/month. Monthly cancellable.' },
      { question: 'Why SEO from Vienna instead of a Zurich agency?', answer: 'Same quality, 55% more affordable. Swiss hourly rates are CHF 200-300 – we\'re at CHF 90-130.' },
    ],
    relatedServices: [
      { title: 'Web Design Zurich', description: 'SEO-optimized websites.', href: '/standorte/zuerich/webdesign' as any },
      { title: 'Digital Agency Zurich', description: 'All services.', href: '/standorte/zuerich' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Zurich',
      faqTitle: 'SEO Zurich – FAQ',
      ctaTitle: 'Better Rankings in Zurich?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/zuerich/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/zuerich/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortZuerichSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 2: Zürich - KEIN LocalBusiness (Service Schema only!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Zürich' : 'SEO Agency Zurich',
    cityName: 'Zürich',
    cityType: 'City',
    url: '/standorte/zuerich/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Zürich', url: 'https://goldenwing.at/standorte/zuerich' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/zuerich/seo' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Zürich', href: '/standorte/zuerich' },
        { text: 'SEO Kosten Guide', href: '/wissen/guides/seo-kosten' },
        { text: 'SEO Agentur Wien', href: '/standorte/wien/seo' },
      ]
    : [
        { text: 'Digital Agency Zurich', href: '/locations/zurich' },
        { text: 'SEO Agency Vienna', href: '/locations/vienna/seo' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
