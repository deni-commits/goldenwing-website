import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Graz Online Marketing - Service Schema only
const seoData = {
  de: {
    title: 'Online Marketing Graz | Google Ads & LinkedIn für B2B-Industrie',
    description: 'Online Marketing für Grazer Unternehmen – Google Ads, LinkedIn Ads, Performance Marketing für B2B-Industrie. Remote aus Wien, mit Verständnis für technische Produkte.',
    keywords: ['Online Marketing Graz', 'Google Ads Graz', 'LinkedIn Ads Steiermark', 'Performance Marketing Graz'],
  },
  en: {
    title: 'Online Marketing Graz | Google Ads & LinkedIn for B2B Industry',
    description: 'Online marketing for Graz businesses – Google Ads, LinkedIn Ads, performance marketing for B2B industry. Remotely from Vienna.',
    keywords: ['Online Marketing Graz', 'Google Ads Graz', 'LinkedIn Ads Styria'],
  },
}

// UNIQUE Content für Graz Online Marketing - B2B/Industrie-Fokus!
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Online Marketing Graz',
      title: 'Online Marketing Graz',
      description: 'Google Ads, LinkedIn Ads und Performance Marketing für steirische B2B-Unternehmen. Wir bringen Ihre Produkte vor die richtigen Entscheider – remote betreut aus Wien.',
      ctaPrimary: 'Kampagne anfragen',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Google Partner' },
      { icon: 'globe', text: 'LinkedIn Ads Expertise' },
      { icon: 'clock', text: 'B2B-Industrie-Fokus' },
      { icon: 'shield', text: 'Transparente Abrechnung' },
    ],
    // UNIQUE: Graz-spezifisches Online Marketing (B2B-Industrie!)
    benefits: [
      {
        icon: 'layers',
        title: 'Google Ads für technische Produkte',
        description: 'Von "Präzisionsteile kaufen" bis "CNC-Bearbeitung Österreich" – wir wissen, wie B2B-Einkäufer suchen und optimieren Ihre Kampagnen entsprechend.',
      },
      {
        icon: 'globe',
        title: 'LinkedIn Ads für Entscheider',
        description: 'Erreichen Sie Einkaufsleiter, CTOs und Geschäftsführer in der DACH-Region. Perfekt für steirische Industrie mit internationalen Kunden.',
      },
      {
        icon: 'users',
        title: 'Employer Branding Kampagnen',
        description: 'Fachkräftemangel in der Industrie? Recruiting-Kampagnen auf LinkedIn, XING und Google für Ingenieure und Facharbeiter.',
      },
      {
        icon: 'zap',
        title: 'Lead-Generierung B2B',
        description: 'Qualifizierte Anfragen von Unternehmen – nicht Endkonsumenten. Mit Lead-Scoring und CRM-Integration.',
      },
    ],
    results: [
      { metric: '3-5×', label: 'ROAS', detail: 'Return on Ad Spend für B2B' },
      { metric: '-40%', label: 'Cost per Lead', detail: 'Durch B2B-Optimierung' },
      { metric: '+85%', label: 'Qualifizierte Leads', detail: 'Durch bessere Targeting' },
    ],
    packages: [
      {
        name: 'Starter Graz',
        price: '590',
        priceType: 'monatlich',
        description: 'Google Ads für kleine steirische Unternehmen.',
        popular: false,
        features: [
          'Google Ads Setup',
          '1 Kampagne',
          'Keyword-Recherche',
          'Monatlicher Report',
          'bis €1.500 Adspend',
        ],
      },
      {
        name: 'Business Graz',
        price: '1.290',
        priceType: 'monatlich',
        description: 'Für B2B mit mehreren Produktlinien.',
        popular: true,
        features: [
          'Google + LinkedIn Ads',
          'Bis 5 Kampagnen',
          'Conversion-Tracking',
          'A/B Testing',
          'Lead-Formulare',
          'Wöchentliche Optimierung',
        ],
      },
      {
        name: 'Industrie Graz',
        price: '2.490',
        priceType: 'monatlich',
        description: 'Full-Service für Export-Unternehmen.',
        popular: false,
        features: [
          'Alle Kanäle (Google, LinkedIn, XING)',
          'Unbegrenzte Kampagnen',
          'International (DACH + EU)',
          'CRM-Integration',
          'Dedizierter Account Manager',
          'Wöchentliche Strategy Calls',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Analyse', description: 'Zielgruppen-Analyse, Wettbewerber-Check, Keyword-Recherche.' },
      { step: '02', title: 'Setup', description: 'Kampagnen-Struktur, Anzeigen-Texte, Targeting.' },
      { step: '03', title: 'Launch', description: 'Kampagnenstart mit Conversion-Tracking.' },
      { step: '04', title: 'Optimierung', description: 'Wöchentliche Anpassungen basierend auf Daten.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Reports mit ROI-Berechnung.' },
    ],
    technologies: ['Google Ads', 'LinkedIn Campaign Manager', 'Google Analytics 4', 'HubSpot', 'Google Tag Manager'],
    // UNIQUE: Graz-spezifische FAQs für Online Marketing
    faqs: [
      {
        question: 'Warum LinkedIn Ads für steirische Industrie?',
        answer: 'Steirische B2B-Unternehmen verkaufen an andere Unternehmen. LinkedIn erreicht Entscheider (Einkäufer, CTOs, Geschäftsführer) direkt – viel effizienter als Google für manche B2B-Produkte.',
      },
      {
        question: 'Was kostet Online Marketing für Grazer Unternehmen?',
        answer: 'Management: €590-2.490/Monat. Dazu kommt Ihr Werbebudget (wir empfehlen min. €1.500/Monat für B2B). Die SFG fördert Digitalisierung bis 30%.',
      },
      {
        question: 'Wie schnell sehen wir Ergebnisse?',
        answer: 'Google Ads: Erste Leads oft in Woche 1-2. LinkedIn Ads: 2-4 Wochen für Optimierung. Stabilisierung: 2-3 Monate.',
      },
      {
        question: 'Können wir spezifische Unternehmen targeten?',
        answer: 'Ja! LinkedIn ermöglicht Account-Based Marketing – wir können z.B. nur Automobilhersteller in DACH oder spezifische Unternehmen targeten.',
      },
      {
        question: 'Brauchen wir eine Landing Page?',
        answer: 'Für beste Ergebnisse: Ja. Wir können Lead-Formulare direkt in LinkedIn nutzen, aber eine dedizierte Landing Page konvertiert meist besser. Gerne erstellen wir diese für Sie.',
      },
    ],
    relatedServices: [
      { title: 'SEO Agentur Graz', description: 'Organische Sichtbarkeit aufbauen.', href: '/standorte/graz/seo' as any },
      { title: 'Webdesign Graz', description: 'Landing Pages für Kampagnen.', href: '/standorte/graz/webdesign' as any },
      { title: 'Digitalagentur Graz', description: 'Alle Leistungen für die Steiermark.', href: '/standorte/graz' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Online Marketing Pakete für Graz',
      pricingDescription: 'Monatliche Betreuung + Ihr Werbebudget. SFG-Förderung möglich!',
      processTitle: 'Unser Prozess',
      processSubtitle: 'Von der Analyse zur performanten Kampagne.',
      resultsTitle: 'Typische Ergebnisse für B2B',
      faqTitle: 'Online Marketing Graz – Häufige Fragen',
      faqSubtitle: 'Speziell für steirische B2B-Unternehmen.',
      ctaTitle: 'Mehr Leads für Ihr steirisches Unternehmen?',
      ctaDescription: 'Kostenlose Erstberatung – wir analysieren Ihr Potenzial.',
    },
  },
  en: {
    hero: {
      badge: 'Online Marketing Graz',
      title: 'Online Marketing Graz',
      description: 'Google Ads, LinkedIn Ads and performance marketing for Styrian B2B companies. Remotely managed from Vienna.',
      ctaPrimary: 'Request Campaign',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'award', text: 'Google Partner' },
      { icon: 'globe', text: 'LinkedIn Ads Expertise' },
      { icon: 'clock', text: 'B2B Industry Focus' },
      { icon: 'shield', text: 'Transparent Billing' },
    ],
    benefits: [
      { icon: 'layers', title: 'Google Ads for Technical Products', description: 'We know how B2B buyers search and optimize your campaigns accordingly.' },
      { icon: 'globe', title: 'LinkedIn Ads for Decision Makers', description: 'Reach purchasing managers, CTOs and CEOs in the DACH region.' },
      { icon: 'users', title: 'Employer Branding Campaigns', description: 'Recruiting campaigns on LinkedIn for engineers and skilled workers.' },
      { icon: 'zap', title: 'B2B Lead Generation', description: 'Qualified inquiries from companies with lead scoring.' },
    ],
    results: [
      { metric: '3-5×', label: 'ROAS', detail: 'Return on Ad Spend for B2B' },
      { metric: '-40%', label: 'Cost per Lead', detail: 'Through B2B optimization' },
    ],
    packages: [
      { name: 'Starter Graz', price: '590', priceType: 'monthly', description: 'Google Ads for small Styrian businesses.', popular: false, features: ['Google Ads Setup', '1 Campaign', 'Keyword Research', 'Monthly Report'] },
      { name: 'Business Graz', price: '1,290', priceType: 'monthly', description: 'For B2B with multiple product lines.', popular: true, features: ['Google + LinkedIn Ads', 'Up to 5 Campaigns', 'Conversion Tracking', 'Lead Forms'] },
      { name: 'Industry Graz', price: '2,490', priceType: 'monthly', description: 'Full-service for export companies.', popular: false, features: ['All Channels', 'Unlimited Campaigns', 'International (DACH + EU)', 'CRM Integration'] },
    ],
    process: [
      { step: '01', title: 'Analysis', description: 'Target group analysis, competitor check.' },
      { step: '02', title: 'Setup', description: 'Campaign structure, ad copy, targeting.' },
      { step: '03', title: 'Launch', description: 'Campaign start with conversion tracking.' },
      { step: '04', title: 'Optimization', description: 'Weekly adjustments based on data.' },
      { step: '05', title: 'Reporting', description: 'Monthly reports with ROI calculation.' },
    ],
    technologies: ['Google Ads', 'LinkedIn Campaign Manager', 'Google Analytics 4', 'HubSpot'],
    faqs: [
      { question: 'Why LinkedIn Ads for Styrian industry?', answer: 'LinkedIn reaches decision makers directly – much more efficient than Google for some B2B products.' },
      { question: 'What does online marketing cost for Graz companies?', answer: 'Management: €590-2,490/month. Plus your ad budget. SFG funds digitalization up to 30%.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Graz', description: 'Build organic visibility.', href: '/standorte/graz/seo' as any },
      { title: 'Digital Agency Graz', description: 'All services for Styria.', href: '/standorte/graz' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Online Marketing Packages for Graz',
      faqTitle: 'Online Marketing Graz – FAQ',
      ctaTitle: 'More leads for your Styrian company?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/graz/online-marketing')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/graz/online-marketing', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortGrazOnlineMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // Service Schema, NICHT LocalBusiness
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Online Marketing Graz' : 'Online Marketing Graz',
    cityName: 'Graz',
    cityType: 'City',
    url: '/standorte/graz/online-marketing',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Graz', url: 'https://goldenwing.at/standorte/graz' },
      { name: 'Online Marketing', url: 'https://goldenwing.at/standorte/graz/online-marketing' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Graz', href: '/standorte/graz' },
        { text: 'SEA Leistungen', href: '/leistungen/sea-agentur' },
        { text: 'Online Marketing Leistungen', href: '/leistungen/online-marketing' },
      ]
    : [
        { text: 'Digital Agency Graz', href: '/locations/graz' },
        { text: 'Online Marketing Services', href: '/services/online-marketing' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
