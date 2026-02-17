import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: München - KEIN LocalBusiness (Service Schema only!)
const seoData = {
  de: {
    title: 'SEO Agentur München | Top-Rankings, faire Preise aus Wien',
    description: 'SEO für Münchner Unternehmen. Mehr Sichtbarkeit in Google, messbare Ergebnisse. Deutsche Qualität, 40% günstiger als lokale Agenturen. Ab €790/Monat.',
    keywords: ['SEO Agentur München', 'SEO München', 'Suchmaschinenoptimierung München', 'SEO Beratung Bayern'],
  },
  en: {
    title: 'SEO Agency Munich | Top Rankings, Fair Prices from Vienna',
    description: 'SEO for Munich businesses. Better Google visibility, measurable results. German quality, 40% more affordable. From €790/month.',
    keywords: ['SEO Agency Munich', 'SEO Munich', 'Search Engine Optimization Munich'],
  },
}

// UNIQUE Content für München - SEO-Fokus + Preis-Argument
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur München',
      title: 'SEO Agentur München',
      description: 'Bessere Google-Rankings für Münchner Unternehmen. Wir bringen Sie auf Seite 1 – mit transparenten Methoden und fairen Preisen aus Wien.',
      ctaPrimary: 'Kostenlose SEO-Analyse',
      ctaSecondary: 'Case Studies ansehen',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Ø +180% organischer Traffic' },
      { icon: 'award', text: '40% günstiger als München' },
      { icon: 'clock', text: 'Monatlich kündbar' },
      { icon: 'shield', text: 'White-Hat SEO' },
    ],
    // UNIQUE: München-spezifische SEO-Benefits
    benefits: [
      {
        icon: 'search',
        title: 'Lokales SEO München',
        description: 'Google Maps, lokale Suchergebnisse, Branchenverzeichnisse. Für Dienstleister, die Münchner Kunden erreichen wollen.',
      },
      {
        icon: 'building',
        title: 'B2B SEO für Bayern',
        description: 'Automotive, Finance, Tech – wir kennen die Suchintention Ihrer Zielgruppe. Long-Tail Keywords mit Kaufabsicht.',
      },
      {
        icon: 'globe',
        title: 'International SEO',
        description: 'München ist international. Wir optimieren für DE/EN/weitere Sprachen – mit korrekten hreflang-Tags.',
      },
      {
        icon: 'fileText',
        title: 'Content-Strategie',
        description: 'SEO-optimierte Texte, die ranken UND überzeugen. Blog-Artikel, Landingpages, Produkttexte.',
      },
    ],
    results: [
      { metric: '+180%', label: 'Organischer Traffic', detail: 'Typisches Ergebnis nach 6 Monaten' },
      { metric: '40%', label: 'Ersparnis', detail: 'vs. Münchner Agenturen' },
      { metric: 'Top 10', label: 'Ranking', detail: 'Für relevante Keywords' },
    ],
    packages: [
      {
        name: 'SEO Starter',
        price: '790',
        priceType: 'mtl.',
        description: 'Für lokale Dienstleister.',
        popular: false,
        features: [
          'Keyword-Analyse (lokal)',
          'OnPage-Optimierung (10 Seiten)',
          'Google Business Optimierung',
          'Monatliches Reporting',
          'Monatlich kündbar',
        ],
      },
      {
        name: 'SEO Business',
        price: '1.490',
        priceType: 'mtl.',
        description: 'Für wachsende Unternehmen.',
        popular: true,
        features: [
          'Umfangreiche Keyword-Strategie',
          'OnPage (25 Seiten)',
          'Content-Erstellung (2 Artikel/Monat)',
          'Linkbuilding (White-Hat)',
          'Technisches SEO',
          'Bi-wöchentliche Calls',
        ],
      },
      {
        name: 'SEO Enterprise',
        price: '2.990',
        priceType: 'mtl.',
        description: 'Für große Unternehmen.',
        popular: false,
        features: [
          'Komplette SEO-Strategie',
          'Unbegrenzte Seiten',
          'Content-Hub Aufbau',
          'Internationales SEO',
          'Dedicated SEO Manager',
          'Wöchentliche Strategie-Calls',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technische Analyse, Keyword-Recherche, Wettbewerb.' },
      { step: '02', title: 'Strategie', description: 'Priorisierung, Roadmap, Quick Wins identifizieren.' },
      { step: '03', title: 'OnPage', description: 'Meta-Tags, Struktur, interne Verlinkung, Content.' },
      { step: '04', title: 'OffPage', description: 'Linkbuilding, Digital PR, lokale Verzeichnisse.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Rankings, Traffic, Conversions.' },
    ],
    technologies: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog'],
    // UNIQUE: München-spezifische FAQs
    faqs: [
      {
        question: 'Was kostet SEO für Münchner Unternehmen?',
        answer: 'Starter: €790/Monat für lokales SEO. Business: €1.490/Monat für umfassende Optimierung. Enterprise: €2.990/Monat für große Projekte. Monatlich kündbar.',
      },
      {
        question: 'Wie lange dauert es, bis ich Rankings sehe?',
        answer: 'Erste Verbesserungen nach 2-3 Monaten. Signifikante Ergebnisse nach 6 Monaten. Top-Positionen für umkämpfte Keywords: 9-12 Monate.',
      },
      {
        question: 'Warum SEO aus Wien statt einer Münchner Agentur?',
        answer: 'Gleiche Qualität, bessere Preise. Das Wiener Preisniveau ist ~40% niedriger als München. Tools, Methoden und Expertise sind identisch.',
      },
      {
        question: 'Funktioniert lokales SEO auch remote?',
        answer: 'Ja. Google Business Optimierung, lokale Keywords, Branchenverzeichnisse – das funktioniert alles remote. Wir optimieren Ihr Münchner Profil von Wien aus.',
      },
      {
        question: 'Welche Branchen in München bedient ihr?',
        answer: 'Automotive (Zulieferer, Händler), Finance (Beratung, Fintech), Tech (SaaS, Startups), Dienstleister. Der B2B-Bereich ist unser Fokus.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign München', description: 'SEO-optimierte Websites.', href: '/standorte/muenchen/webdesign' as any },
      { title: 'Digitalagentur München', description: 'Alle Leistungen für Bayern.', href: '/standorte/muenchen' as any },
      { title: 'SEO Agentur Wien', description: 'Unser Hauptstandort.', href: '/standorte/wien/seo' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für München',
      pricingDescription: 'Transparente Preise – 40% günstiger als Münchner Agenturen.',
      processTitle: 'So verbessern wir Ihre Rankings',
      processSubtitle: 'Datengetrieben, transparent, nachhaltig.',
      resultsTitle: 'Typische Ergebnisse',
      faqTitle: 'SEO München – Häufige Fragen',
      faqSubtitle: 'Antworten für Münchner Unternehmen.',
      ctaTitle: 'Bessere Rankings in München?',
      ctaDescription: 'Kostenlose SEO-Analyse Ihrer Website.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Munich',
      title: 'SEO Agency Munich',
      description: 'Better Google rankings for Munich businesses. We get you to page 1 – with transparent methods and fair prices from Vienna.',
      ctaPrimary: 'Free SEO Analysis',
      ctaSecondary: 'View Case Studies',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Avg. +180% Organic Traffic' },
      { icon: 'award', text: '40% More Affordable' },
      { icon: 'clock', text: 'Monthly Cancellable' },
      { icon: 'shield', text: 'White-Hat SEO' },
    ],
    benefits: [
      { icon: 'search', title: 'Local SEO Munich', description: 'Google Maps, local search results, business directories.' },
      { icon: 'building', title: 'B2B SEO for Bavaria', description: 'Automotive, Finance, Tech – we know your target audience.' },
      { icon: 'globe', title: 'International SEO', description: 'Munich is international. We optimize for multiple languages.' },
      { icon: 'fileText', title: 'Content Strategy', description: 'SEO-optimized texts that rank AND convert.' },
    ],
    results: [
      { metric: '+180%', label: 'Organic Traffic', detail: 'Typical result after 6 months' },
      { metric: '40%', label: 'Savings', detail: 'vs. Munich agencies' },
    ],
    packages: [
      { name: 'SEO Starter', price: '790', priceType: 'monthly', description: 'For local service providers.', popular: false, features: ['Keyword Analysis', 'OnPage (10 pages)', 'Google Business', 'Monthly Reports'] },
      { name: 'SEO Business', price: '1,490', priceType: 'monthly', description: 'For growing businesses.', popular: true, features: ['Full Keyword Strategy', 'OnPage (25 pages)', 'Content (2 articles/month)', 'Linkbuilding', 'Technical SEO'] },
      { name: 'SEO Enterprise', price: '2,990', priceType: 'monthly', description: 'For large companies.', popular: false, features: ['Complete SEO Strategy', 'Unlimited Pages', 'International SEO', 'Dedicated Manager'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technical analysis, keyword research, competition.' },
      { step: '02', title: 'Strategy', description: 'Prioritization, roadmap, quick wins.' },
      { step: '03', title: 'OnPage', description: 'Meta tags, structure, internal linking.' },
      { step: '04', title: 'OffPage', description: 'Linkbuilding, Digital PR.' },
      { step: '05', title: 'Reporting', description: 'Monthly rankings, traffic, conversions.' },
    ],
    technologies: ['SEMrush', 'Ahrefs', 'Google Search Console'],
    faqs: [
      { question: 'What does SEO cost for Munich businesses?', answer: 'Starter: €790/month. Business: €1,490/month. Enterprise: €2,990/month. Monthly cancellable.' },
      { question: 'How long until I see rankings?', answer: 'First improvements after 2-3 months. Significant results after 6 months.' },
    ],
    relatedServices: [
      { title: 'Web Design Munich', description: 'SEO-optimized websites.', href: '/standorte/muenchen/webdesign' as any },
      { title: 'Digital Agency Munich', description: 'All services for Bavaria.', href: '/standorte/muenchen' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Munich',
      faqTitle: 'SEO Munich – FAQ',
      ctaTitle: 'Better Rankings in Munich?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/muenchen/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/muenchen/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortMuenchenSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 2: München - KEIN LocalBusiness (Service Schema only!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur München' : 'SEO Agency Munich',
    cityName: 'München',
    cityType: 'City',
    url: '/standorte/muenchen/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'München', url: 'https://goldenwing.at/standorte/muenchen' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/muenchen/seo' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur München', href: '/standorte/muenchen' },
        { text: 'SEO Kosten Guide', href: '/wissen/guides/seo-kosten' },
        { text: 'SEO Agentur Wien', href: '/standorte/wien/seo' },
      ]
    : [
        { text: 'Digital Agency Munich', href: '/locations/munich' },
        { text: 'SEO Agency Vienna', href: '/locations/vienna/seo' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
