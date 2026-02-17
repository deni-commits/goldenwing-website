import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Linz Online Marketing - Service Schema only
const seoData = {
  de: {
    title: 'Online Marketing Linz | Google Ads & LinkedIn für B2B Industrie',
    description: 'Online Marketing für Linzer Unternehmen – Google Ads, LinkedIn Ads, Performance Marketing für B2B-Industrie. Remote aus Wien, Business Upper Austria fördert bis 30%.',
    keywords: ['Online Marketing Linz', 'Google Ads Linz', 'LinkedIn Ads Oberösterreich', 'Performance Marketing Linz'],
  },
  en: {
    title: 'Online Marketing Linz | Google Ads & LinkedIn for B2B Industry',
    description: 'Online marketing for Linz businesses – Google Ads, LinkedIn Ads, performance marketing for B2B industry. Remotely from Vienna.',
    keywords: ['Online Marketing Linz', 'Google Ads Linz', 'LinkedIn Ads Upper Austria'],
  },
}

// UNIQUE Content für Linz Online Marketing - B2B/Industrie-Fokus!
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Online Marketing Linz',
      title: 'Online Marketing Linz',
      description: 'Google Ads, LinkedIn Ads und Performance Marketing für oberösterreichische B2B-Unternehmen. Wir bringen Ihre Produkte vor die richtigen Entscheider – remote betreut aus Wien.',
      ctaPrimary: 'Kampagne anfragen',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Google Partner' },
      { icon: 'globe', text: 'LinkedIn Ads Expertise' },
      { icon: 'clock', text: 'B2B-Industrie-Fokus' },
      { icon: 'shield', text: 'Transparente Abrechnung' },
    ],
    // UNIQUE: Linz-spezifisches Online Marketing (B2B-Industrie!)
    benefits: [
      {
        icon: 'layers',
        title: 'Google Ads für technische Produkte',
        description: 'Von "Stahlprofile kaufen" bis "CNC-Bearbeitung Österreich" – wir wissen, wie B2B-Einkäufer suchen und optimieren Ihre Kampagnen entsprechend.',
      },
      {
        icon: 'globe',
        title: 'LinkedIn Ads für Entscheider',
        description: 'Erreichen Sie Einkaufsleiter, CTOs und Geschäftsführer in der DACH-Region. Perfekt für OÖ Industrie mit internationalen Kunden.',
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
        name: 'Starter Linz',
        price: '590',
        priceType: 'monatlich',
        description: 'Google Ads für kleine OÖ Unternehmen.',
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
        name: 'Business Linz',
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
        name: 'Industrie Linz',
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
    // UNIQUE: Linz-spezifische FAQs für Online Marketing
    faqs: [
      {
        question: 'Warum LinkedIn Ads für OÖ Industrie?',
        answer: 'OÖ B2B-Unternehmen verkaufen an andere Unternehmen. LinkedIn erreicht Entscheider (Einkäufer, CTOs, Geschäftsführer) direkt – viel effizienter als Google für manche B2B-Produkte.',
      },
      {
        question: 'Was kostet Online Marketing für Linzer Unternehmen?',
        answer: 'Management: €590-2.490/Monat. Dazu kommt Ihr Werbebudget (wir empfehlen min. €1.500/Monat für B2B). Business Upper Austria fördert bis 30%.',
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
      { title: 'SEO Agentur Linz', description: 'Organische Sichtbarkeit aufbauen.', href: '/standorte/linz/seo' as any },
      { title: 'Webdesign Linz', description: 'Landing Pages für Kampagnen.', href: '/standorte/linz/webdesign' as any },
      { title: 'Digitalagentur Linz', description: 'Alle Leistungen für OÖ.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Online Marketing Pakete für Linz',
      pricingDescription: 'Monatliche Betreuung + Ihr Werbebudget. Business Upper Austria fördert bis 30%!',
      processTitle: 'Unser Prozess',
      processSubtitle: 'Von der Analyse zur performanten Kampagne.',
      resultsTitle: 'Typische Ergebnisse für B2B',
      faqTitle: 'Online Marketing Linz – Häufige Fragen',
      faqSubtitle: 'Speziell für OÖ B2B-Unternehmen.',
      ctaTitle: 'Mehr Leads für Ihr OÖ Unternehmen?',
      ctaDescription: 'Kostenlose Erstberatung – wir analysieren Ihr Potenzial.',
    },
  },
  en: {
    hero: {
      badge: 'Online Marketing Linz',
      title: 'Online Marketing Linz',
      description: 'Google Ads, LinkedIn Ads and performance marketing for Upper Austrian B2B companies. Remotely managed from Vienna.',
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
      { name: 'Starter Linz', price: '590', priceType: 'monthly', description: 'Google Ads for small businesses.', popular: false, features: ['Google Ads Setup', '1 Campaign', 'Keyword Research', 'Monthly Report'] },
      { name: 'Business Linz', price: '1,290', priceType: 'monthly', description: 'For B2B with multiple product lines.', popular: true, features: ['Google + LinkedIn Ads', 'Up to 5 Campaigns', 'Conversion Tracking', 'Lead Forms'] },
      { name: 'Industry Linz', price: '2,490', priceType: 'monthly', description: 'Full-service for export companies.', popular: false, features: ['All Channels', 'Unlimited Campaigns', 'International (DACH + EU)', 'CRM Integration'] },
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
      { question: 'Why LinkedIn Ads for Upper Austrian industry?', answer: 'LinkedIn reaches decision makers directly – much more efficient than Google for some B2B products.' },
      { question: 'What does online marketing cost for Linz companies?', answer: 'Management: €590-2,490/month. Plus your ad budget. Business Upper Austria funds up to 30%.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Linz', description: 'Build organic visibility.', href: '/standorte/linz/seo' as any },
      { title: 'Digital Agency Linz', description: 'All services for Upper Austria.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Online Marketing Packages for Linz',
      faqTitle: 'Online Marketing Linz – FAQ',
      ctaTitle: 'More leads for your Upper Austrian company?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/linz/online-marketing')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/linz/online-marketing', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortLinzOnlineMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // Service Schema, NICHT LocalBusiness
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Online Marketing Linz' : 'Online Marketing Linz',
    cityName: 'Linz',
    cityType: 'City',
    url: '/standorte/linz/online-marketing',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Linz', url: 'https://goldenwing.at/standorte/linz' },
      { name: 'Online Marketing', url: 'https://goldenwing.at/standorte/linz/online-marketing' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Linz', href: '/standorte/linz' },
        { text: 'SEA Leistungen', href: '/leistungen/sea-agentur' },
        { text: 'Online Marketing Leistungen', href: '/leistungen/online-marketing' },
      ]
    : [
        { text: 'Digital Agency Linz', href: '/locations/linz' },
        { text: 'Online Marketing Services', href: '/services/online-marketing' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
