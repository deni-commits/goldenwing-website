 
import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const seoData = {
  de: {
    title: 'Branding Agentur Zürich | Corporate Design & Markenentwicklung',
    description: 'Branding Agentur für Zürcher Unternehmen. Logo-Design, Corporate Identity, Brand Strategy. Premium-Branding für die Schweizer Finanzmetropole.',
    keywords: ['Branding Agentur Zürich', 'Corporate Design Zürich', 'Logo Design Zürich'],
  },
  en: {
    title: 'Branding Agency Zurich | Corporate Design & Brand Development',
    description: 'Branding agency for Zurich companies. Logo design, corporate identity, brand strategy. Premium branding for the Swiss financial metropolis.',
    keywords: ['Branding Agency Zurich', 'Corporate Design Zurich', 'Logo Design Zurich'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Branding Agentur Zürich',
      title: 'Branding Agentur Zürich',
      description: 'Premium-Branding für die Schweizer Finanzmetropole. Corporate Design, das Vertrauen schafft – für Banken, Versicherungen und ambitionierte Startups.',
      ctaPrimary: 'Branding-Projekt starten',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Swiss Quality' },
      { icon: 'star', text: '80+ Marken entwickelt' },
      { icon: 'globe', text: 'CH + DACH' },
      { icon: 'shield', text: 'Vertraulichkeit garantiert' },
    ],
    benefits: [
      {
        icon: 'building',
        title: 'Financial Services',
        description: 'Branding für Banken, Vermögensverwalter, FinTechs – diskret und vertrauenswürdig.',
      },
      {
        icon: 'palette',
        title: 'Premium Design',
        description: 'Schweizer Qualitätsanspruch trifft auf modernes, internationales Design.',
      },
      {
        icon: 'layers',
        title: 'Vollständige CI',
        description: 'Von Logo bis Geschäftsbericht – konsistentes Erscheinungsbild.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachig',
        description: 'Branding-Materials in DE, EN, FR – ready für internationale Kunden.',
      },
    ],
    results: [
      { metric: '+200%', label: 'Markenvertrauen', detail: 'Laut Kundenbefragung' },
      { metric: 'CHF 5M+', label: 'Betreutes Funding', detail: 'Für Startup-Kunden' },
      { metric: '100%', label: 'NDA-Schutz', detail: 'Vertraulichkeit garantiert' },
    ],
    packages: [
      {
        name: 'Startup Brand CH',
        price: '4.500',
        priceType: 'einmalig',
        description: 'Für Schweizer Startups.',
        popular: false,
        features: ['Logo + Varianten', 'Farbpalette', 'Typografie', 'Basis-Styleguide', 'Visitenkarten'],
      },
      {
        name: 'Business Brand CH',
        price: '9.500',
        priceType: 'einmalig',
        description: 'Vollständiges Branding.',
        popular: true,
        features: ['Logo Design', 'Visual Identity System', 'Geschäftsausstattung', 'Brand Guidelines', 'Präsentations-Templates', 'Social Media Kit'],
      },
      {
        name: 'Corporate Brand CH',
        price: '19.500+',
        priceType: 'einmalig',
        description: 'Für etablierte Unternehmen.',
        popular: false,
        features: ['Brand Audit', 'Strategie-Workshop', 'Neues Visual Identity', 'Annual Report Design', 'Rollout-Begleitung', 'Mehrsprachige Materials'],
      },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Markt und Positionierung.' },
      { step: '02', title: 'Strategie', description: 'Brand Platform definieren.' },
      { step: '03', title: 'Design', description: 'Visual Identity entwickeln.' },
      { step: '04', title: 'Anwendung', description: 'Alle Touchpoints gestalten.' },
      { step: '05', title: 'Übergabe', description: 'Assets und Guidelines.' },
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Notion', 'Miro'],
    faqs: [
      {
        question: 'Arbeiten Sie vor Ort in Zürich?',
        answer: 'Wir arbeiten remote aus Wien mit Schweizer Kunden. Für Strategie-Workshops und wichtige Präsentationen kommen wir gerne nach Zürich.',
      },
      {
        question: 'Können Sie diskret arbeiten?',
        answer: 'Absolut. Wir unterzeichnen NDAs und behandeln alle Projekte vertraulich – besonders wichtig für Financial Services und Pre-Launch-Startups.',
      },
      {
        question: 'Preise in CHF oder EUR?',
        answer: 'Unsere Preise sind in CHF angegeben. Zahlung in EUR zum aktuellen Wechselkurs ist möglich.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Zürich', description: 'Website für Ihre Marke.', href: '/standorte/zuerich/webdesign' as any },
      { title: 'SEO Zürich', description: 'Online sichtbar werden.', href: '/standorte/zuerich/seo' as any },
      { title: 'Digitalagentur Zürich', description: 'Alle Leistungen.', href: '/standorte/zuerich' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding Pakete für Zürich',
      pricingDescription: 'Swiss Quality Branding.',
      faqTitle: 'Branding Zürich – Häufige Fragen',
      ctaTitle: 'Marke für Zürich entwickeln?',
      ctaDescription: 'Diskretes Erstgespräch vereinbaren.',
    },
  },
  en: {
    hero: {
      badge: 'Branding Agency Zurich',
      title: 'Branding Agency Zurich',
      description: 'Premium branding for the Swiss financial metropolis. Corporate design that builds trust – for banks, insurers and ambitious startups.',
      ctaPrimary: 'Start Branding Project',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'award', text: 'Swiss Quality' },
      { icon: 'star', text: '80+ Brands Developed' },
      { icon: 'globe', text: 'CH + DACH' },
      { icon: 'shield', text: 'Confidentiality Guaranteed' },
    ],
    benefits: [
      { icon: 'building', title: 'Financial Services', description: 'Branding for banks, asset managers, FinTechs – discreet and trustworthy.' },
      { icon: 'palette', title: 'Premium Design', description: 'Swiss quality standards meet modern, international design.' },
      { icon: 'layers', title: 'Complete CI', description: 'From logo to annual report – consistent appearance.' },
      { icon: 'globe', title: 'Multilingual', description: 'Branding materials in DE, EN, FR – ready for international clients.' },
    ],
    results: [
      { metric: '+200%', label: 'Brand Trust', detail: 'According to customer survey' },
      { metric: 'CHF 5M+', label: 'Managed Funding', detail: 'For startup clients' },
    ],
    packages: [
      { name: 'Startup Brand CH', price: '4,500', priceType: 'one-time', description: 'For Swiss startups.', popular: false, features: ['Logo + variants', 'Color palette', 'Typography', 'Basic styleguide'] },
      { name: 'Business Brand CH', price: '9,500', priceType: 'one-time', description: 'Complete branding.', popular: true, features: ['Logo design', 'Visual identity system', 'Business stationery', 'Brand guidelines'] },
      { name: 'Corporate Brand CH', price: '19,500+', priceType: 'one-time', description: 'For established companies.', popular: false, features: ['Brand audit', 'Strategy workshop', 'New visual identity', 'Rollout support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Market and positioning.' },
      { step: '02', title: 'Strategy', description: 'Define brand platform.' },
      { step: '03', title: 'Design', description: 'Develop visual identity.' },
      { step: '04', title: 'Application', description: 'Design all touchpoints.' },
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Notion'],
    faqs: [
      { question: 'Do you work on-site in Zurich?', answer: 'We work remotely from Vienna with Swiss clients. For strategy workshops and important presentations, we\'re happy to come to Zurich.' },
      { question: 'Can you work discreetly?', answer: 'Absolutely. We sign NDAs and treat all projects confidentially – especially important for financial services and pre-launch startups.' },
    ],
    relatedServices: [
      { title: 'Web Design Zurich', description: 'Website for your brand.', href: '/locations/zurich/webdesign' as any },
      { title: 'Digital Agency Zurich', description: 'All services.', href: '/locations/zurich' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages for Zurich',
      faqTitle: 'Branding Zurich – FAQ',
      ctaTitle: 'Develop brand for Zurich?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/zuerich/branding')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/zuerich/branding', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortZuerichBrandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Branding Agentur Zürich' : 'Branding Agency Zurich',
    cityName: 'Zürich',
    cityType: 'City',
    url: '/standorte/zuerich/branding',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Zürich', url: 'https://goldenwing.at/standorte/zuerich' },
      { name: 'Branding', url: 'https://goldenwing.at/standorte/zuerich/branding' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Zürich', href: '/standorte/zuerich' },
        { text: 'Branding Leistungen', href: '/leistungen/branding' },
      ]
    : [
        { text: 'Digital Agency Zurich', href: '/locations/zurich' },
        { text: 'Branding Services', href: '/services/branding' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
