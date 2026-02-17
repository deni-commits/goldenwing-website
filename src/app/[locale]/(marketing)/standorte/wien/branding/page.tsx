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
    title: 'Branding Agentur Wien | Corporate Design & Markenentwicklung',
    description: 'Strategisches Branding für Wiener Unternehmen. Corporate Identity, Logo-Design, Markenstrategie. Mit 50% Wirtschaftsagentur Förderung. Büro in 1100 Wien.',
    keywords: ['Branding Agentur Wien', 'Corporate Design Wien', 'Logo Design Wien', 'Markenentwicklung Wien'],
  },
  en: {
    title: 'Branding Agency Vienna | Corporate Design & Brand Strategy',
    description: 'Strategic branding for Vienna businesses. Corporate identity, logo design, brand strategy. Office in Vienna.',
    keywords: ['Branding Agency Vienna', 'Corporate Design Vienna', 'Logo Design Vienna'],
  },
}

// UNIQUE Content für Wien - Branding-Fokus
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Branding Agentur Wien',
      title: 'Branding Agentur Wien',
      description: 'Strategische Markenentwicklung für Wiener Unternehmen. Von der Positionierung über Logo-Design bis zum kompletten Corporate Design – aus unserem Büro in Wien.',
      ctaPrimary: 'Branding-Projekt starten',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '50+ Marken entwickelt' },
      { icon: 'mapPin', text: 'Büro in Wien 1100' },
      { icon: 'clock', text: 'Persönliche Workshops' },
      { icon: 'shield', text: 'Wirtschaftsagentur gefördert' },
    ],
    benefits: [
      {
        icon: 'target',
        title: 'Strategische Positionierung',
        description: 'Bevor wir gestalten, klären wir: Wer sind Sie? Wofür stehen Sie? Wie unterscheiden Sie sich? Die Basis für jede starke Marke.',
      },
      {
        icon: 'palette',
        title: 'Corporate Design System',
        description: 'Logo, Farben, Typografie, Bildsprache – ein durchgängiges System, das überall funktioniert. Digital und Print.',
      },
      {
        icon: 'book',
        title: 'Brand Guidelines',
        description: 'Dokumentation aller Markenelemente. Damit Ihr Team und externe Partner die Marke konsistent einsetzen können.',
      },
      {
        icon: 'zap',
        title: 'Umsetzung inklusive',
        description: 'Von Visitenkarten bis Website – wir setzen Ihre neue Marke in allen Touchpoints um. Alles aus einer Hand.',
      },
    ],
    results: [
      { metric: '+85%', label: 'Markenwiedererkennung', detail: 'Typisches Ergebnis nach Rebranding' },
      { metric: '50%', label: 'Förderung', detail: 'Wirtschaftsagentur Wien' },
      { metric: '4-8', label: 'Wochen', detail: 'Vom Workshop zum fertigen Design' },
    ],
    packages: [
      {
        name: 'Starter Branding',
        price: '2.900',
        priceType: 'einmalig',
        description: 'Logo + Basis Corporate Design.',
        popular: false,
        features: [
          'Logo-Design (3 Konzepte)',
          'Farbpalette + Typografie',
          'Visitenkarten-Design',
          'Briefpapier-Template',
          'Mini-Styleguide (5 Seiten)',
        ],
      },
      {
        name: 'Business Branding',
        price: '7.500',
        priceType: 'einmalig',
        description: 'Komplettes Corporate Design.',
        popular: true,
        features: [
          'Positionierungs-Workshop',
          'Logo-Design (5 Konzepte)',
          'Vollständiges Farbsystem',
          'Alle Geschäftsdrucksorten',
          'Social Media Templates',
          'Brand Guidelines (20+ Seiten)',
          '50% Wirtschaftsagentur möglich',
        ],
      },
      {
        name: 'Premium Branding',
        price: '15.000',
        priceType: 'einmalig',
        description: 'Markenstrategie + Design + Umsetzung.',
        popular: false,
        features: [
          'Strategie-Workshop (ganztägig)',
          'Wettbewerbsanalyse',
          'Naming (falls nötig)',
          'Umfangreiches Design-System',
          'Website-Redesign inklusive',
          'Fotoshooting koordiniert',
          'Launch-Begleitung',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', description: 'Workshop in Wien: Positionierung, Werte, Zielgruppe.' },
      { step: '02', title: 'Strategie', description: 'Markenkern, Tonalität, visuelle Richtung.' },
      { step: '03', title: 'Design', description: 'Logo-Konzepte, Abstimmung, Finalisierung.' },
      { step: '04', title: 'System', description: 'Ausarbeitung aller Markenelemente.' },
      { step: '05', title: 'Rollout', description: 'Umsetzung und Übergabe der Brand Guidelines.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy Frameworks'],
    faqs: [
      {
        question: 'Was kostet Branding für Wiener Unternehmen?',
        answer: 'Starter (Logo + Basics): ab €2.900. Vollständiges Corporate Design: €7.500-12.000. Premium mit Strategie: ab €15.000. Die Wirtschaftsagentur Wien fördert 50% für KMU!',
      },
      {
        question: 'Wie läuft ein Branding-Projekt ab?',
        answer: 'Wir starten mit einem Positionierungs-Workshop in unserem Wiener Büro. Dann entwickeln wir Logo-Konzepte, stimmen ab, und arbeiten das komplette System aus. Dauer: 4-8 Wochen.',
      },
      {
        question: 'Kann ich die 50% Förderung nutzen?',
        answer: 'Ja! KMU in Wien können beim Wirtschaftsagentur-Förderprogramm einreichen. Wir helfen beim Antrag und haben Erfahrung damit.',
      },
      {
        question: 'Was ist in den Brand Guidelines enthalten?',
        answer: 'Logo-Anwendung, Schutzzone, Farbcodes (CMYK, RGB, HEX), Typografie, Bildsprache, Do\'s and Don\'ts, Templates für typische Anwendungen.',
      },
      {
        question: 'Rebranding oder neues Branding – was brauche ich?',
        answer: 'Rebranding wenn: Marke ist veraltet, Unternehmen hat sich gewandelt, neue Märkte. Neues Branding für Startups und Neugründungen. Wir beraten Sie gerne.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Wien', description: 'Website passend zur neuen Marke.', href: '/standorte/wien/webdesign' as any },
      { title: 'SEO Agentur Wien', description: 'Sichtbarkeit für Ihre Marke.', href: '/standorte/wien/seo' as any },
      { title: 'Google Ads Wien', description: 'Marke bekannt machen.', href: '/standorte/wien/google-ads' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding Pakete für Wien',
      pricingDescription: 'Transparente Preise – 50% Wirtschaftsagentur-Förderung möglich!',
      processTitle: 'So entsteht Ihre Marke',
      processSubtitle: 'Von der Strategie zum fertigen Corporate Design.',
      resultsTitle: 'Typische Ergebnisse',
      faqTitle: 'Branding Wien – Häufige Fragen',
      faqSubtitle: 'Alles rund um Markenentwicklung und Corporate Design.',
      ctaTitle: 'Marke aufbauen?',
      ctaDescription: 'Kostenloses Erstgespräch in unserem Wiener Büro.',
    },
  },
  en: {
    hero: {
      badge: 'Branding Agency Vienna',
      title: 'Branding Agency Vienna',
      description: 'Strategic brand development for Vienna businesses. From positioning to logo design to complete corporate identity.',
      ctaPrimary: 'Start Branding Project',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'award', text: '50+ Brands Developed' },
      { icon: 'mapPin', text: 'Office in Vienna' },
      { icon: 'clock', text: 'Personal Workshops' },
      { icon: 'shield', text: 'Funding Available' },
    ],
    benefits: [
      { icon: 'target', title: 'Strategic Positioning', description: 'Who are you? What do you stand for? The foundation for every strong brand.' },
      { icon: 'palette', title: 'Corporate Design System', description: 'Logo, colors, typography, imagery – a coherent system that works everywhere.' },
      { icon: 'book', title: 'Brand Guidelines', description: 'Documentation for consistent brand usage.' },
      { icon: 'zap', title: 'Implementation Included', description: 'From business cards to website – we implement across all touchpoints.' },
    ],
    results: [
      { metric: '+85%', label: 'Brand Recognition', detail: 'Typical result after rebranding' },
      { metric: '50%', label: 'Funding', detail: 'Vienna Business Agency' },
    ],
    packages: [
      { name: 'Starter Branding', price: '2,900', priceType: 'one-time', description: 'Logo + Basic Corporate Design.', popular: false, features: ['Logo Design (3 concepts)', 'Color palette + Typography', 'Business Cards', 'Mini Styleguide'] },
      { name: 'Business Branding', price: '7,500', priceType: 'one-time', description: 'Complete Corporate Design.', popular: true, features: ['Positioning Workshop', 'Logo (5 concepts)', 'Complete Color System', 'All Stationery', 'Brand Guidelines'] },
      { name: 'Premium Branding', price: '15,000', priceType: 'one-time', description: 'Strategy + Design + Implementation.', popular: false, features: ['Full-day Strategy Workshop', 'Competitor Analysis', 'Website Redesign incl.', 'Launch Support'] },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', description: 'Workshop in Vienna.' },
      { step: '02', title: 'Strategy', description: 'Brand core, tonality, visual direction.' },
      { step: '03', title: 'Design', description: 'Logo concepts and finalization.' },
      { step: '04', title: 'System', description: 'All brand elements.' },
      { step: '05', title: 'Rollout', description: 'Implementation and guidelines handover.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma'],
    faqs: [
      { question: 'What does branding cost in Vienna?', answer: 'Starter: from €2,900. Full corporate design: €7,500-12,000. Premium with strategy: from €15,000. Vienna Business Agency funds 50%!' },
      { question: 'How long does a branding project take?', answer: 'Typically 4-8 weeks from workshop to final design system.' },
    ],
    relatedServices: [
      { title: 'Web Design Vienna', description: 'Website matching your new brand.', href: '/standorte/wien/webdesign' as any },
      { title: 'SEO Agency Vienna', description: 'Visibility for your brand.', href: '/standorte/wien/seo' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages for Vienna',
      faqTitle: 'Branding Vienna – FAQ',
      ctaTitle: 'Build Your Brand?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/wien/branding')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/wien/branding', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortWienBrandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 1: Wien - MIT LocalBusiness (echtes Büro!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Branding Agentur Wien' : 'Branding Agency Vienna',
    cityName: 'Wien',
    cityType: 'City',
    url: '/standorte/wien/branding',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Wien', url: 'https://goldenwing.at/standorte/wien' },
      { name: 'Branding', url: 'https://goldenwing.at/standorte/wien/branding' },
    ],
    localBusiness: viennaLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Kreativagentur Wien', href: '/standorte/wien' },
        { text: 'Unsere Pakete', href: '/leistungen/pakete' },
        { text: 'Unsere Leistungen', href: '/leistungen/branding' },
      ]
    : [
        { text: 'Creative Agency Vienna', href: '/locations/vienna' },
        { text: 'Our Services', href: '/services/branding' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
