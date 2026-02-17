import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Graz - KEIN LocalBusiness (Service Schema only!)
const seoData = {
  de: {
    title: 'SEO Agentur Graz | Suchmaschinenoptimierung für steirische Industrie',
    description: 'SEO für Grazer Unternehmen – B2B-Industrie, Automotive, Tech. Mehr Sichtbarkeit für technische Produkte und Dienstleistungen. Remote aus Wien, SFG-Förderung bis 30%.',
    keywords: ['SEO Agentur Graz', 'Suchmaschinenoptimierung Graz', 'SEO Steiermark', 'SEO Beratung Graz'],
  },
  en: {
    title: 'SEO Agency Graz | Search Engine Optimization for Styrian Industry',
    description: 'SEO for Graz businesses – B2B industry, automotive, tech. More visibility for technical products and services. Remotely from Vienna.',
    keywords: ['SEO Agency Graz', 'Search Engine Optimization Graz', 'SEO Styria'],
  },
}

// UNIQUE Content für Graz SEO - B2B/Industrie-Fokus!
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Graz',
      title: 'SEO Agentur Graz',
      description: 'Suchmaschinenoptimierung für steirische B2B-Unternehmen – Automotive-Zulieferer, Maschinenbau, Tech. Wir bringen Ihre technischen Produkte auf Seite 1. Remote betreut aus Wien.',
      ctaPrimary: 'SEO-Analyse anfragen',
      ctaSecondary: 'SEO-Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B-Industrie-Expertise' },
      { icon: 'globe', text: 'Mehrsprachige SEO (DE/EN)' },
      { icon: 'clock', text: 'Monatliche Reports' },
      { icon: 'shield', text: 'Keine Vertragsbindung' },
    ],
    // UNIQUE: Graz-spezifische SEO-Benefits (B2B-Industrie!)
    benefits: [
      {
        icon: 'layers',
        title: 'Technische Produkt-SEO',
        description: 'Wir optimieren für Keywords wie "CNC-Frästeile Steiermark" oder "Automotive-Zulieferer Österreich". B2B-SEO mit Verständnis für technische Produkte.',
      },
      {
        icon: 'globe',
        title: 'Internationale Sichtbarkeit',
        description: 'Steirische Industrie exportiert weltweit. Wir machen SEO für DE + EN Märkte, damit Sie international gefunden werden.',
      },
      {
        icon: 'users',
        title: 'Fachkräfte-Recruiting SEO',
        description: '"Maschinenbau Jobs Graz", "Ingenieur Karriere Steiermark" – wir bringen Ihre Karriere-Seiten nach oben.',
      },
      {
        icon: 'zap',
        title: 'Content für Entscheider',
        description: 'Technische Whitepaper, Fallstudien, Produktvergleiche – Content der bei Ingenieuren und Einkäufern wirkt.',
      },
    ],
    // UNIQUE: Graz-spezifisches SEO-Szenario
    results: [
      { metric: '+180%', label: 'Organischer Traffic', detail: 'Durchschnitt nach 12 Monaten' },
      { metric: 'Top 3', label: 'Branchen-Keywords', detail: 'Für relevante B2B-Suchbegriffe' },
      { metric: '-40%', label: 'Akquise-Kosten', detail: 'Durch organische Leads' },
    ],
    packages: [
      {
        name: 'SEO Starter Graz',
        price: '490',
        priceType: 'monatlich',
        description: 'Für kleine steirische Unternehmen.',
        popular: false,
        features: [
          'Keyword-Recherche (10 Keywords)',
          'OnPage-Optimierung',
          'Monatlicher Report',
          'Google Search Console Setup',
          'Kickoff per Video',
        ],
      },
      {
        name: 'SEO Business Graz',
        price: '990',
        priceType: 'monatlich',
        description: 'Für B2B-Unternehmen mit Produktkatalog.',
        popular: true,
        features: [
          '30+ Keywords',
          'Technische SEO-Audit',
          'Content-Optimierung',
          'Lokale SEO (Steiermark)',
          'Link-Aufbau (5/Monat)',
          'Wöchentliche Updates',
        ],
      },
      {
        name: 'SEO Industrie Graz',
        price: '1.990',
        priceType: 'monatlich',
        description: 'Für Export-orientierte Industrieunternehmen.',
        popular: false,
        features: [
          'Unbegrenzte Keywords',
          'Mehrsprachige SEO (DE/EN)',
          'Content-Produktion inkl.',
          'International Link-Building',
          'Wettbewerber-Monitoring',
          'Dedizierter Account Manager',
        ],
      },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Technische Analyse, Keyword-Recherche, Wettbewerber-Check.' },
      { step: '02', title: 'Strategie', description: 'SEO-Roadmap speziell für B2B-Industrie.' },
      { step: '03', title: 'OnPage', description: 'Technische Optimierung, Content, Struktur.' },
      { step: '04', title: 'OffPage', description: 'Linkaufbau in relevanten Industrie-Portalen.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Reports mit ROI-Berechnung.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush', 'Sistrix'],
    // UNIQUE: Graz-spezifische SEO FAQs
    faqs: [
      {
        question: 'Warum SEO für B2B-Industrie in Graz?',
        answer: 'Einkäufer und Ingenieure recherchieren online. "Präzisionsteile Steiermark", "Automotive-Zulieferer Österreich" – wer hier rankt, bekommt Anfragen. Wir verstehen technische Produkte und B2B-Kaufprozesse.',
      },
      {
        question: 'Was kostet SEO für Grazer Unternehmen?',
        answer: 'Lokale SEO: ab €490/Monat. B2B-Industrie mit mehreren Produktlinien: €990-1.990/Monat. Die SFG fördert Digitalisierung bis 30%.',
      },
      {
        question: 'Wie lange dauert SEO bis Ergebnisse sichtbar sind?',
        answer: 'Erste Rankings: 3-4 Monate. Top-Positionen für umkämpfte Keywords: 6-12 Monate. Bei technischen Nischen oft schneller.',
      },
      {
        question: 'Macht ihr auch internationales SEO?',
        answer: 'Ja. Viele steirische Unternehmen exportieren nach DACH und EU. Wir optimieren für DE + EN (und weitere Sprachen auf Anfrage).',
      },
      {
        question: 'Wie funktioniert die Zusammenarbeit ohne Büro in Graz?',
        answer: 'Kick-off: Wir kommen nach Graz für Workshop. Laufend: Wöchentliche Video-Calls, monatliche Reports. Das funktioniert hervorragend – SEO braucht keine physische Präsenz.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Graz', description: 'SEO-optimierte Website als Grundlage.', href: '/standorte/graz/webdesign' as any },
      { title: 'Online Marketing Graz', description: 'Google Ads + LinkedIn für B2B.', href: '/standorte/graz/online-marketing' as any },
      { title: 'Digitalagentur Graz', description: 'Alle Leistungen für die Steiermark.', href: '/standorte/graz' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Graz',
      pricingDescription: 'Monatliche Betreuung – SFG-Förderung bis 30% möglich!',
      processTitle: 'Unser SEO-Prozess',
      processSubtitle: 'Systematisch zu mehr Sichtbarkeit für steirische Unternehmen.',
      resultsTitle: 'Typische SEO-Ergebnisse',
      faqTitle: 'SEO Graz – Häufige Fragen',
      faqSubtitle: 'Antworten speziell für B2B-Industrie in der Steiermark.',
      ctaTitle: 'SEO für Ihr steirisches Unternehmen?',
      ctaDescription: 'Kostenlose SEO-Analyse – wir zeigen Ihr Potenzial.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Graz',
      title: 'SEO Agency Graz',
      description: 'Search engine optimization for Styrian B2B companies – automotive suppliers, mechanical engineering, tech. Remotely managed from Vienna.',
      ctaPrimary: 'Request SEO Analysis',
      ctaSecondary: 'View SEO Packages',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B Industry Expertise' },
      { icon: 'globe', text: 'Multilingual SEO (DE/EN)' },
      { icon: 'clock', text: 'Monthly Reports' },
      { icon: 'shield', text: 'No Contract Lock-in' },
    ],
    benefits: [
      { icon: 'layers', title: 'Technical Product SEO', description: 'We optimize for B2B keywords with understanding for technical products.' },
      { icon: 'globe', title: 'International Visibility', description: 'SEO for DE + EN markets for export-oriented companies.' },
      { icon: 'users', title: 'Recruiting SEO', description: 'Bring your career pages to the top for skilled workers.' },
      { icon: 'zap', title: 'Content for Decision Makers', description: 'Technical whitepapers, case studies, product comparisons.' },
    ],
    results: [
      { metric: '+180%', label: 'Organic Traffic', detail: 'Average after 12 months' },
      { metric: 'Top 3', label: 'Industry Keywords', detail: 'For relevant B2B search terms' },
    ],
    packages: [
      { name: 'SEO Starter Graz', price: '490', priceType: 'monthly', description: 'For small Styrian businesses.', popular: false, features: ['10 Keywords', 'OnPage Optimization', 'Monthly Report', 'Search Console Setup'] },
      { name: 'SEO Business Graz', price: '990', priceType: 'monthly', description: 'For B2B companies with product catalog.', popular: true, features: ['30+ Keywords', 'Technical SEO Audit', 'Content Optimization', 'Link Building (5/month)'] },
      { name: 'SEO Industry Graz', price: '1,990', priceType: 'monthly', description: 'For export-oriented industrial companies.', popular: false, features: ['Unlimited Keywords', 'Multilingual SEO', 'Content Production', 'International Link Building'] },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'Technical analysis, keyword research.' },
      { step: '02', title: 'Strategy', description: 'SEO roadmap for B2B industry.' },
      { step: '03', title: 'OnPage', description: 'Technical optimization, content.' },
      { step: '04', title: 'OffPage', description: 'Link building in relevant portals.' },
      { step: '05', title: 'Reporting', description: 'Monthly reports with ROI calculation.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush'],
    faqs: [
      { question: 'Why SEO for B2B industry in Graz?', answer: 'Buyers and engineers research online. Those who rank get inquiries. We understand technical products and B2B buying processes.' },
      { question: 'What does SEO cost for Graz companies?', answer: 'Local SEO: from €490/month. B2B industry: €990-1,990/month. SFG funds digitalization up to 30%.' },
    ],
    relatedServices: [
      { title: 'Web Design Graz', description: 'SEO-optimized website as foundation.', href: '/standorte/graz/webdesign' as any },
      { title: 'Digital Agency Graz', description: 'All services for Styria.', href: '/standorte/graz' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Graz',
      faqTitle: 'SEO Graz – FAQ',
      ctaTitle: 'SEO for your Styrian company?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/graz/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/graz/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortGrazSEOPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // WICHTIG: Service Schema, NICHT LocalBusiness (wir haben kein Büro in Graz!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Graz' : 'SEO Agency Graz',
    cityName: 'Graz',
    cityType: 'City',
    url: '/standorte/graz/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Graz', url: 'https://goldenwing.at/standorte/graz' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/graz/seo' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Graz', href: '/standorte/graz' },
        { text: 'SEO Kosten Guide', href: '/wissen/guides/seo-kosten' },
        { text: 'Unsere SEO-Leistungen', href: '/leistungen/seo' },
      ]
    : [
        { text: 'Digital Agency Graz', href: '/locations/graz' },
        { text: 'Our SEO Services', href: '/services/seo' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
