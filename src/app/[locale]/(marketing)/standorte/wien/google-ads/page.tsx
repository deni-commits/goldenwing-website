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
    title: 'Google Ads Agentur Wien | Zertifizierter Partner für PPC',
    description: 'Google Ads für Wiener Unternehmen. Search, Shopping, Display, YouTube. Transparente Kosten, messbare Ergebnisse. Wirtschaftsagentur 50% Förderung. Büro in 1100 Wien.',
    keywords: ['Google Ads Agentur Wien', 'Google Werbung Wien', 'AdWords Agentur Wien', 'PPC Wien'],
  },
  en: {
    title: 'Google Ads Agency Vienna | Certified PPC Partner',
    description: 'Google Ads for Vienna businesses. Search, Shopping, Display, YouTube. Transparent costs, measurable results. Office in Vienna.',
    keywords: ['Google Ads Agency Vienna', 'Google Advertising Vienna', 'PPC Vienna'],
  },
}

// UNIQUE Content für Wien - Google Ads Fokus
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Google Ads Wien',
      title: 'Google Ads Agentur Wien',
      description: 'Bezahlte Werbung mit messbarem ROI. Search Ads, Shopping, Display, YouTube – wir holen das Maximum aus Ihrem Werbebudget. Persönlich betreut aus Wien.',
      ctaPrimary: 'Kostenlose Kampagnen-Analyse',
      ctaSecondary: 'Case Studies ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Google Partner' },
      { icon: 'mapPin', text: 'Büro in Wien 1100' },
      { icon: 'trendingUp', text: 'Ø 320% ROAS' },
      { icon: 'shield', text: 'Keine Mindestlaufzeit' },
    ],
    benefits: [
      {
        icon: 'search',
        title: 'Search Ads',
        description: 'Kunden, die aktiv suchen. Keyword-Strategie, Anzeigentexte, Conversion-Tracking. Die Basis für schnelle Ergebnisse.',
      },
      {
        icon: 'shoppingCart',
        title: 'Shopping Ads',
        description: 'Für E-Commerce: Produktfeeds optimiert, Smart Bidding, PMAX-Kampagnen. Mehr Umsatz für Ihren Online-Shop.',
      },
      {
        icon: 'monitor',
        title: 'Display & Remarketing',
        description: 'Reichweite aufbauen, Website-Besucher zurückholen. Visuell starke Banner im Google Display Netzwerk.',
      },
      {
        icon: 'video',
        title: 'YouTube Ads',
        description: 'Video-Werbung für Markenbekanntheit. Bumper Ads, In-Stream, Discovery – Ihr Produkt in Bewegtbild.',
      },
    ],
    results: [
      { metric: '320%', label: 'Ø ROAS', detail: 'Return on Ad Spend unserer Kunden' },
      { metric: '-42%', label: 'CPA', detail: 'Kosten pro Conversion gesenkt' },
      { metric: '50%', label: 'Förderung', detail: 'Wirtschaftsagentur Wien möglich' },
    ],
    packages: [
      {
        name: 'Starter Ads',
        price: '590',
        priceType: 'mtl.',
        description: 'Für kleinere Budgets.',
        popular: false,
        features: [
          'Bis €2.000 Werbebudget',
          'Search Ads (1 Kampagne)',
          'Conversion-Tracking Setup',
          'Monatliches Reporting',
          'Email-Support',
        ],
      },
      {
        name: 'Business Ads',
        price: '1.290',
        priceType: 'mtl.',
        description: 'Für wachsende Unternehmen.',
        popular: true,
        features: [
          'Bis €10.000 Werbebudget',
          'Search + Shopping/Display',
          'A/B-Testing der Anzeigen',
          'Wöchentliche Optimierung',
          'Bi-wöchentliche Calls',
          'Konkurrenzanalyse',
        ],
      },
      {
        name: 'Enterprise Ads',
        price: '2.490',
        priceType: 'mtl.',
        description: 'Für große Kampagnen.',
        popular: false,
        features: [
          'Unbegrenztes Werbebudget',
          'Alle Google Ads Kanäle',
          'YouTube Ads inkl.',
          'Eigener Ansprechpartner',
          'Wöchentliche Strategie-Calls',
          'Priority Support',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyse bestehender Kampagnen oder Marktpotenzial.' },
      { step: '02', title: 'Strategie', description: 'Keyword-Recherche, Kampagnenstruktur, Budgetverteilung.' },
      { step: '03', title: 'Setup', description: 'Kampagnen aufsetzen, Tracking implementieren.' },
      { step: '04', title: 'Optimierung', description: 'Laufende A/B-Tests, Bid-Anpassungen, Skalierung.' },
      { step: '05', title: 'Reporting', description: 'Transparente Reports, ROI-Übersicht, Empfehlungen.' },
    ],
    technologies: ['Google Ads', 'Google Analytics 4', 'Google Tag Manager', 'Data Studio'],
    faqs: [
      {
        question: 'Was kostet Google Ads Betreuung in Wien?',
        answer: 'Unsere Managementgebühr: €590-2.490/Monat je nach Aufwand. Dazu kommt Ihr Werbebudget direkt an Google. Keine Mindestlaufzeit, monatlich kündbar.',
      },
      {
        question: 'Wie schnell sehe ich Ergebnisse?',
        answer: 'Erste Klicks am Tag 1. Signifikante Conversion-Daten nach 2-4 Wochen. Optimale Performance nach 2-3 Monaten Lernphase.',
      },
      {
        question: 'Wie viel Werbebudget brauche ich?',
        answer: 'Minimum: €1.000/Monat für lokale Dienstleister. E-Commerce: €3.000-10.000/Monat. Enterprise: ab €10.000/Monat. Wir beraten Sie zur optimalen Höhe.',
      },
      {
        question: 'Gibt es Förderungen für Google Ads?',
        answer: 'Ja! Die Wirtschaftsagentur Wien fördert 50% der Agenturkosten. Die Werbekosten selbst sind nicht förderfähig, aber die Betreuung schon!',
      },
      {
        question: 'Bekomme ich Zugang zu meinem Ads-Konto?',
        answer: 'Selbstverständlich. Das Konto gehört Ihnen. Sie haben jederzeit vollen Zugriff und Transparenz über alle Aktivitäten.',
      },
    ],
    relatedServices: [
      { title: 'SEO Agentur Wien', description: 'Organische Sichtbarkeit dazu.', href: '/standorte/wien/seo' as any },
      { title: 'Webdesign Wien', description: 'Landing Pages optimieren.', href: '/standorte/wien/webdesign' as any },
      { title: 'Kreativagentur Wien', description: 'Alle Leistungen.', href: '/standorte/wien' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Google Ads Pakete für Wien',
      pricingDescription: 'Transparente Managementgebühren – Werbebudget extra, direkt an Google.',
      processTitle: 'So arbeiten wir mit Google Ads',
      processSubtitle: 'Von der Analyse zum messbaren Erfolg.',
      resultsTitle: 'Durchschnittliche Ergebnisse',
      faqTitle: 'Google Ads Wien – Häufige Fragen',
      faqSubtitle: 'Alles rund um bezahlte Werbung mit Google.',
      ctaTitle: 'Mehr Kunden durch Google?',
      ctaDescription: 'Kostenlose Kampagnen-Analyse in unserem Wiener Büro.',
    },
  },
  en: {
    hero: {
      badge: 'Google Ads Vienna',
      title: 'Google Ads Agency Vienna',
      description: 'Paid advertising with measurable ROI. Search Ads, Shopping, Display, YouTube – getting the maximum from your ad budget.',
      ctaPrimary: 'Free Campaign Analysis',
      ctaSecondary: 'View Case Studies',
    },
    trustSignals: [
      { icon: 'award', text: 'Google Partner' },
      { icon: 'mapPin', text: 'Office in Vienna' },
      { icon: 'trendingUp', text: 'Avg. 320% ROAS' },
      { icon: 'shield', text: 'No Minimum Contract' },
    ],
    benefits: [
      { icon: 'search', title: 'Search Ads', description: 'Reach customers actively searching. Keyword strategy, ad copy, conversion tracking.' },
      { icon: 'shoppingCart', title: 'Shopping Ads', description: 'For e-commerce: optimized feeds, Smart Bidding, PMAX campaigns.' },
      { icon: 'monitor', title: 'Display & Remarketing', description: 'Build reach, bring back website visitors.' },
      { icon: 'video', title: 'YouTube Ads', description: 'Video advertising for brand awareness.' },
    ],
    results: [
      { metric: '320%', label: 'Avg. ROAS', detail: 'Return on Ad Spend for our clients' },
      { metric: '-42%', label: 'CPA', detail: 'Cost per Acquisition reduced' },
    ],
    packages: [
      { name: 'Starter Ads', price: '590', priceType: 'monthly', description: 'For smaller budgets.', popular: false, features: ['Up to €2,000 ad budget', 'Search Ads (1 campaign)', 'Conversion Tracking', 'Monthly Reports'] },
      { name: 'Business Ads', price: '1,290', priceType: 'monthly', description: 'For growing businesses.', popular: true, features: ['Up to €10,000 ad budget', 'Search + Shopping/Display', 'A/B Testing', 'Bi-weekly Calls'] },
      { name: 'Enterprise Ads', price: '2,490', priceType: 'monthly', description: 'For large campaigns.', popular: false, features: ['Unlimited ad budget', 'All Google Ads Channels', 'YouTube Ads incl.', 'Weekly Strategy Calls'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyze existing campaigns or market potential.' },
      { step: '02', title: 'Strategy', description: 'Keyword research, campaign structure.' },
      { step: '03', title: 'Setup', description: 'Campaign setup, tracking implementation.' },
      { step: '04', title: 'Optimization', description: 'Ongoing A/B tests, bid adjustments.' },
      { step: '05', title: 'Reporting', description: 'Transparent reports, ROI overview.' },
    ],
    technologies: ['Google Ads', 'Google Analytics 4', 'Google Tag Manager'],
    faqs: [
      { question: 'What does Google Ads management cost in Vienna?', answer: 'Management fee: €590-2,490/month. Plus your ad budget directly to Google. No minimum contract.' },
      { question: 'How quickly will I see results?', answer: 'First clicks on day 1. Significant conversion data after 2-4 weeks. Optimal performance after 2-3 months.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Vienna', description: 'Organic visibility too.', href: '/standorte/wien/seo' as any },
      { title: 'Web Design Vienna', description: 'Optimize landing pages.', href: '/standorte/wien/webdesign' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Google Ads Packages for Vienna',
      faqTitle: 'Google Ads Vienna – FAQ',
      ctaTitle: 'More Customers Through Google?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/wien/google-ads')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/wien/google-ads', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortWienGoogleAdsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 1: Wien - MIT LocalBusiness (echtes Büro!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Google Ads Agentur Wien' : 'Google Ads Agency Vienna',
    cityName: 'Wien',
    cityType: 'City',
    url: '/standorte/wien/google-ads',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Wien', url: 'https://goldenwing.at/standorte/wien' },
      { name: 'Google Ads', url: 'https://goldenwing.at/standorte/wien/google-ads' },
    ],
    localBusiness: viennaLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Kreativagentur Wien', href: '/standorte/wien' },
        { text: 'SEA Leistungen', href: '/leistungen/sea-agentur' },
        { text: 'Unsere Leistungen', href: '/leistungen/google-ads' },
      ]
    : [
        { text: 'Creative Agency Vienna', href: '/locations/vienna' },
        { text: 'Our Services', href: '/services/google-ads' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
