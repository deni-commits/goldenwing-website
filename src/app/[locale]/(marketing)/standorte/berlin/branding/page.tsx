 
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
    title: 'Branding Agentur Berlin | Markenentwicklung & Corporate Design',
    description: 'Branding Agentur für Berliner Startups und Unternehmen. Logo-Design, Corporate Identity, Brand Strategy. Remote aus Wien, lokal für Berlin.',
    keywords: ['Branding Agentur Berlin', 'Corporate Design Berlin', 'Logo Design Berlin'],
  },
  en: {
    title: 'Branding Agency Berlin | Brand Development & Corporate Design',
    description: 'Branding agency for Berlin startups and companies. Logo design, corporate identity, brand strategy. Remote from Vienna, local for Berlin.',
    keywords: ['Branding Agency Berlin', 'Corporate Design Berlin', 'Logo Design Berlin'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Branding Agentur Berlin',
      title: 'Branding Agentur Berlin',
      description: 'Markenentwicklung für die deutsche Hauptstadt. Von der Startup-Brand bis zum Corporate Rebranding – strategisches Branding für Berliner Unternehmen.',
      ctaPrimary: 'Branding-Projekt starten',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '80+ Marken entwickelt' },
      { icon: 'star', text: 'Design Awards' },
      { icon: 'globe', text: 'D-A-CH Expertise' },
      { icon: 'clock', text: 'Schnelle Lieferung' },
    ],
    benefits: [
      {
        icon: 'target',
        title: 'Startup Branding',
        description: 'Berlins Startup-Szene braucht starke Marken. Wir verstehen die Dynamik.',
      },
      {
        icon: 'palette',
        title: 'Logo & Visual Identity',
        description: 'Einprägsame Logos und konsistente visuelle Systeme.',
      },
      {
        icon: 'layers',
        title: 'Corporate Design',
        description: 'Geschäftsausstattung, Präsentationen, alle Touchpoints.',
      },
      {
        icon: 'trending-up',
        title: 'Brand Strategy',
        description: 'Positionierung, Werte, Messaging – die Basis jeder starken Marke.',
      },
    ],
    results: [
      { metric: '+150%', label: 'Markenbekanntheit', detail: 'Nach Rebranding' },
      { metric: '3 Wochen', label: 'Lieferzeit', detail: 'Für Basis-Branding' },
      { metric: '100%', label: 'Ownership', detail: 'Alle Rechte bei Ihnen' },
    ],
    packages: [
      {
        name: 'Startup Brand',
        price: '2.990',
        priceType: 'einmalig',
        description: 'Für junge Unternehmen.',
        popular: false,
        features: ['Logo + Varianten', 'Farbpalette', 'Typografie', 'Basis-Styleguide', 'Social Media Kit'],
      },
      {
        name: 'Business Brand',
        price: '5.990',
        priceType: 'einmalig',
        description: 'Vollständiges Branding.',
        popular: true,
        features: ['Logo Design', 'Visual Identity System', 'Geschäftsausstattung', 'Brand Guidelines', 'Icon-Set', 'Präsentations-Template'],
      },
      {
        name: 'Corporate Rebrand',
        price: '12.990+',
        priceType: 'einmalig',
        description: 'Für etablierte Unternehmen.',
        popular: false,
        features: ['Brand Audit', 'Strategie-Workshop', 'Neues Visual Identity', 'Rollout-Begleitung', 'Change Management'],
      },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Markt und Wettbewerb verstehen.' },
      { step: '02', title: 'Strategie', description: 'Positionierung definieren.' },
      { step: '03', title: 'Design', description: 'Visual Identity entwickeln.' },
      { step: '04', title: 'Rollout', description: 'Anwendung auf alle Medien.' },
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Affinity', 'Notion'],
    faqs: [
      {
        question: 'Arbeiten Sie vor Ort in Berlin?',
        answer: 'Wir arbeiten remote aus Wien mit Kunden in ganz D-A-CH. Für größere Projekte und Workshops kommen wir gerne nach Berlin.',
      },
      {
        question: 'Wie lange dauert ein Branding-Projekt?',
        answer: 'Startup Brand: 2-3 Wochen. Vollständiges Corporate Branding: 4-6 Wochen. Rebranding: 6-12 Wochen abhängig vom Umfang.',
      },
      {
        question: 'Was kostet Branding für ein Berliner Startup?',
        answer: 'Unser Startup Brand Paket beginnt bei €2.990 – speziell für junge Unternehmen mit begrenztem Budget aber hohem Anspruch.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Berlin', description: 'Website für Ihre Marke.', href: '/standorte/berlin/webdesign' as any },
      { title: 'SEO Berlin', description: 'Online sichtbar werden.', href: '/standorte/berlin/seo' as any },
      { title: 'Digitalagentur Berlin', description: 'Alle Leistungen.', href: '/standorte/berlin' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding Pakete für Berlin',
      pricingDescription: 'Starke Marken für die Hauptstadt.',
      faqTitle: 'Branding Berlin – Häufige Fragen',
      ctaTitle: 'Marke für Berlin entwickeln?',
      ctaDescription: 'Kostenloses Branding-Gespräch.',
    },
  },
  en: {
    hero: {
      badge: 'Branding Agency Berlin',
      title: 'Branding Agency Berlin',
      description: 'Brand development for the German capital. From startup brand to corporate rebranding – strategic branding for Berlin companies.',
      ctaPrimary: 'Start Branding Project',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'award', text: '80+ Brands Developed' },
      { icon: 'star', text: 'Design Awards' },
      { icon: 'globe', text: 'DACH Expertise' },
      { icon: 'clock', text: 'Fast Delivery' },
    ],
    benefits: [
      { icon: 'target', title: 'Startup Branding', description: 'Berlin\'s startup scene needs strong brands. We understand the dynamics.' },
      { icon: 'palette', title: 'Logo & Visual Identity', description: 'Memorable logos and consistent visual systems.' },
      { icon: 'layers', title: 'Corporate Design', description: 'Business stationery, presentations, all touchpoints.' },
      { icon: 'trending-up', title: 'Brand Strategy', description: 'Positioning, values, messaging – the foundation of every strong brand.' },
    ],
    results: [
      { metric: '+150%', label: 'Brand Awareness', detail: 'After rebranding' },
      { metric: '3 Weeks', label: 'Delivery Time', detail: 'For basic branding' },
    ],
    packages: [
      { name: 'Startup Brand', price: '2,990', priceType: 'one-time', description: 'For young companies.', popular: false, features: ['Logo + variants', 'Color palette', 'Typography', 'Basic styleguide'] },
      { name: 'Business Brand', price: '5,990', priceType: 'one-time', description: 'Complete branding.', popular: true, features: ['Logo design', 'Visual identity system', 'Business stationery', 'Brand guidelines'] },
      { name: 'Corporate Rebrand', price: '12,990+', priceType: 'one-time', description: 'For established companies.', popular: false, features: ['Brand audit', 'Strategy workshop', 'New visual identity', 'Rollout support'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Understand market and competition.' },
      { step: '02', title: 'Strategy', description: 'Define positioning.' },
      { step: '03', title: 'Design', description: 'Develop visual identity.' },
      { step: '04', title: 'Rollout', description: 'Apply to all media.' },
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Affinity'],
    faqs: [
      { question: 'Do you work on-site in Berlin?', answer: 'We work remotely from Vienna with clients throughout DACH. For larger projects and workshops, we\'re happy to come to Berlin.' },
      { question: 'How long does a branding project take?', answer: 'Startup brand: 2-3 weeks. Complete corporate branding: 4-6 weeks. Rebranding: 6-12 weeks depending on scope.' },
    ],
    relatedServices: [
      { title: 'Web Design Berlin', description: 'Website for your brand.', href: '/locations/berlin/webdesign' as any },
      { title: 'Digital Agency Berlin', description: 'All services.', href: '/locations/berlin' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages for Berlin',
      faqTitle: 'Branding Berlin – FAQ',
      ctaTitle: 'Develop brand for Berlin?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/berlin/branding')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/berlin/branding', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortBerlinBrandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Branding Agentur Berlin' : 'Branding Agency Berlin',
    cityName: 'Berlin',
    cityType: 'City',
    url: '/standorte/berlin/branding',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Berlin', url: 'https://goldenwing.at/standorte/berlin' },
      { name: 'Branding', url: 'https://goldenwing.at/standorte/berlin/branding' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Berlin', href: '/standorte/berlin' },
        { text: 'Branding Leistungen', href: '/leistungen/branding' },
      ]
    : [
        { text: 'Digital Agency Berlin', href: '/locations/berlin' },
        { text: 'Branding Services', href: '/services/branding' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
