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
    title: 'Branding Agentur Dubai | Corporate Design & Markenentwicklung',
    description: 'Strategisches Branding für Unternehmen in Dubai & VAE. Logo-Design, Corporate Identity, Markenstrategie. MENA-Expertise. Büro in Dubai.',
    keywords: ['Branding Agentur Dubai', 'Corporate Design Dubai', 'Logo Design Dubai', 'Markenentwicklung Dubai'],
  },
  en: {
    title: 'Branding Agency Dubai | Corporate Design & Brand Strategy',
    description: 'Strategic branding for businesses in Dubai & UAE. Logo design, corporate identity, brand strategy. MENA expertise. Office in Dubai.',
    keywords: ['Branding Agency Dubai', 'Corporate Design Dubai', 'Logo Design Dubai', 'Brand Strategy Dubai'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Branding Agentur Dubai',
      title: 'Branding Agentur Dubai',
      description: 'Strategische Markenentwicklung für Unternehmen in Dubai und der MENA-Region. Von der Positionierung über Logo-Design bis zum kompletten Corporate Design – aus unserem Büro in Dubai.',
      ctaPrimary: 'Branding-Projekt starten',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '40+ MENA-Marken entwickelt' },
      { icon: 'mapPin', text: 'Büro in Dubai DAMAC Bay' },
      { icon: 'clock', text: 'Persönliche Workshops' },
      { icon: 'globe', text: 'Lokale & internationale Expertise' },
    ],
    benefits: [
      {
        icon: 'target',
        title: 'MENA-Marktstrategie',
        description: 'Wir verstehen die Besonderheiten des arabischen Marktes. Kulturelle Sensibilität, lokale Vorlieben, regionale Trends – alles fließt in Ihre Markenstrategie ein.',
      },
      {
        icon: 'palette',
        title: 'Corporate Design System',
        description: 'Logo, Farben, Typografie, Bildsprache – ein durchgängiges System für Digital und Print, angepasst an arabische Design-Standards.',
      },
      {
        icon: 'book',
        title: 'Brand Guidelines',
        description: 'Vollständige Dokumentation in Deutsch, Englisch und Arabisch. Damit Ihr Team und externe Partner die Marke konsistent einsetzen können.',
      },
      {
        icon: 'zap',
        title: 'Umsetzung inklusive',
        description: 'Von Visitenkarten bis Website – wir setzen Ihre neue Marke in allen Touchpoints um. Alles aus einer Hand im MENA-Standard.',
      },
    ],
    packages: [
      {
        name: 'Starter Branding',
        price: '3.200',
        priceType: 'einmalig',
        description: 'Logo + Basis Corporate Design.',
        popular: false,
        features: [
          'Logo-Design (3 Konzepte)',
          'Farbpalette + Typografie',
          'Visitenkarten-Design',
          'Briefpapier-Template',
          'Mini-Styleguide (5 Seiten)',
          'Arabische Adaptationen',
        ],
      },
      {
        name: 'Business Branding',
        price: '8.500',
        priceType: 'einmalig',
        description: 'Komplettes Corporate Design mit MENA-Anpassung.',
        popular: true,
        features: [
          'Positionierungs-Workshop',
          'Logo-Design (5 Konzepte)',
          'Vollständiges Farbsystem',
          'Alle Geschäftsdrucksorten',
          'Social Media Templates',
          'Brand Guidelines (EN/AR)',
          'Arabische Typografie-Standards',
          'Lokale Marktberatung',
        ],
      },
      {
        name: 'Premium Branding',
        price: '18.000',
        priceType: 'einmalig',
        description: 'Markenstrategie + Design + regionale Umsetzung.',
        popular: false,
        features: [
          'Strategie-Workshop (ganztägig)',
          'MENA-Marktanalyse',
          'Wettbewerbsanalyse',
          'Umfangreiches Design-System',
          'Website-Redesign inklusive',
          'Mehrsprachige Guidelines (DE/EN/AR)',
          'Regional-Anpassungen',
          'Launch-Begleitung',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', description: 'Workshop in Dubai: Positionierung, Werte, Zielgruppe der MENA-Region.' },
      { step: '02', title: 'Marktstrategie', description: 'Markenkern, lokale Tonalität, kulturelle Anpassung, visuelle Richtung.' },
      { step: '03', title: 'Design', description: 'Logo-Konzepte, arabische Adaptationen, Abstimmung, Finalisierung.' },
      { step: '04', title: 'System', description: 'Ausarbeitung aller Markenelemente für mehrsprachige Verwendung.' },
      { step: '05', title: 'Rollout', description: 'Umsetzung und Übergabe der mehrsprachigen Brand Guidelines.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy Frameworks', 'Arabic Typography Tools'],
    faqs: [
      {
        question: 'Was kostet Branding für Unternehmen in Dubai?',
        answer: 'Starter (Logo + Basics): ab €3.200. Vollständiges Corporate Design: €8.500-14.000. Premium mit Strategie und arabischen Adaptationen: ab €18.000. Maßgeschneidert für MENA-Märkte.',
      },
      {
        question: 'Warum ist lokale Branding-Expertise wichtig?',
        answer: 'Die MENA-Region hat eigene Design-Standards, Farbbedeutungen und kulturelle Vorlieben. Wir verstehen diese Nuancen und entwickeln Marken, die lokal und international funktionieren.',
      },
      {
        question: 'Könnt ihr arabische Typografie und RTL-Design?',
        answer: 'Absolut! Wir entwickeln Markendesigns, die beide Sprachen (Deutsch/Englisch und Arabisch) perfekt unterstützen, mit korrekter RTL-Ausrichtung und arabischen Designstandards.',
      },
      {
        question: 'Wie läuft ein Branding-Projekt ab?',
        answer: 'Positionierungs-Workshop in unserem Dubai-Büro, dann entwickeln wir Logo-Konzepte mit lokalen Adaptationen. Dauer: 4-8 Wochen.',
      },
      {
        question: 'Rebranding oder neues Branding – was brauche ich?',
        answer: 'Rebranding wenn: Marke ist veraltet, Expansion in neue Märkte. Neues Branding für Startups und Neugründungen. Wir beraten Sie gerne.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Website passend zur neuen Marke.', href: '/standorte/dubai/webdesign' as any },
      { title: 'SEO Dubai', description: 'Sichtbarkeit für Ihre Marke.', href: '/standorte/dubai/seo' as any },
      { title: 'Digital Marketing Dubai', description: 'Marke bekannt machen.', href: '/standorte/dubai/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding Pakete für Dubai',
      pricingDescription: 'Transparente Preise mit MENA-Expertise!',
      processTitle: 'So entsteht Ihre Marke',
      processSubtitle: 'Von der Strategie zum fertigen Corporate Design.',
      faqTitle: 'Branding Dubai – Häufige Fragen',
      faqSubtitle: 'Alles rund um Markenentwicklung in der MENA-Region.',
      ctaTitle: 'Marke aufbauen?',
      ctaDescription: 'Kostenloses Erstgespräch in unserem Dubai-Büro.',
    },
  },
  en: {
    hero: {
      badge: 'Branding Agency Dubai',
      title: 'Branding Agency Dubai',
      description: 'Strategic brand development for businesses in Dubai and the MENA region. From positioning to logo design to complete corporate identity.',
      ctaPrimary: 'Start Branding Project',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'award', text: '40+ MENA Brands Developed' },
      { icon: 'mapPin', text: 'Office in Dubai' },
      { icon: 'clock', text: 'Personal Workshops' },
      { icon: 'globe', text: 'Local & International Expertise' },
    ],
    benefits: [
      { icon: 'target', title: 'MENA Market Strategy', description: 'We understand the Arabic market. Cultural sensitivity, local preferences, regional trends inform your brand strategy.' },
      { icon: 'palette', title: 'Corporate Design System', description: 'Logo, colors, typography, imagery – a coherent system for digital and print, adapted to Arabic design standards.' },
      { icon: 'book', title: 'Brand Guidelines', description: 'Complete documentation in German, English, and Arabic for consistent brand usage.' },
      { icon: 'zap', title: 'Implementation Included', description: 'From business cards to website – we implement across all touchpoints to MENA standards.' },
    ],
    packages: [
      { name: 'Starter Branding', price: '3,200', priceType: 'one-time', description: 'Logo + Basic Corporate Design.', popular: false, features: ['Logo Design (3 concepts)', 'Color palette + Typography', 'Business Cards', 'Mini Styleguide', 'Arabic Adaptations'] },
      { name: 'Business Branding', price: '8,500', priceType: 'one-time', description: 'Complete Corporate Design with MENA adaptation.', popular: true, features: ['Positioning Workshop', 'Logo (5 concepts)', 'Complete Color System', 'All Stationery', 'Brand Guidelines (EN/AR)', 'Social Media Templates'] },
      { name: 'Premium Branding', price: '18,000', priceType: 'one-time', description: 'Strategy + Design + Regional Implementation.', popular: false, features: ['Full-day Strategy Workshop', 'MENA Market Analysis', 'Website Redesign incl.', 'Multilingual Guidelines (DE/EN/AR)', 'Regional Adaptations', 'Launch Support'] },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', description: 'Workshop in Dubai on positioning, values, MENA region target audience.' },
      { step: '02', title: 'Market Strategy', description: 'Brand core, local tonality, cultural adaptation, visual direction.' },
      { step: '03', title: 'Design', description: 'Logo concepts, Arabic adaptations and finalization.' },
      { step: '04', title: 'System', description: 'All brand elements for multilingual use.' },
      { step: '05', title: 'Rollout', description: 'Implementation and multilingual guidelines handover.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy Frameworks', 'Arabic Typography Tools'],
    faqs: [
      { question: 'What does branding cost in Dubai?', answer: 'Starter: from €3,200. Full corporate design: €8,500-14,000. Premium with strategy and Arabic adaptations: from €18,000. Tailored for MENA markets.' },
      { question: 'Why is local branding expertise important?', answer: 'The MENA region has its own design standards, color meanings, and cultural preferences. We understand these nuances and develop brands that work locally and internationally.' },
      { question: 'Can you handle Arabic typography and RTL design?', answer: 'Absolutely! We develop brand designs that perfectly support both languages with correct RTL orientation and Arabic design standards.' },
      { question: 'How long does a branding project take?', answer: 'Typically 4-8 weeks from workshop to final design system with local adaptations.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Website matching your new brand.', href: '/standorte/dubai/webdesign' as any },
      { title: 'SEO Dubai', description: 'Visibility for your brand.', href: '/standorte/dubai/seo' as any },
      { title: 'Digital Marketing Dubai', description: 'Make your brand known.', href: '/standorte/dubai/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages for Dubai',
      pricingDescription: 'Transparent prices with MENA expertise!',
      processTitle: 'How Your Brand is Created',
      processSubtitle: 'From strategy to complete corporate design.',
      faqTitle: 'Branding Dubai – FAQ',
      faqSubtitle: 'Everything about brand development in the MENA region.',
      ctaTitle: 'Build Your Brand?',
      ctaDescription: 'Free consultation at our Dubai office.',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/dubai/branding')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/dubai/branding', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortDubaiBrandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Branding Agentur Dubai' : 'Branding Agency Dubai',
    cityName: 'Dubai',
    cityType: 'City',
    url: '/standorte/dubai/branding',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.ae' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.ae/standorte' },
      { name: 'Dubai', url: 'https://goldenwing.ae/standorte/dubai' },
      { name: 'Branding', url: 'https://goldenwing.ae/standorte/dubai/branding' },
    ],
    localBusiness: dubaiLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Kreativagentur Dubai', href: '/standorte/dubai' },
        { text: 'Unsere Pakete', href: '/leistungen/pakete' },
        { text: 'Unsere Leistungen', href: '/leistungen/branding' },
      ]
    : [
        { text: 'Creative Agency Dubai', href: '/locations/dubai' },
        { text: 'Our Services', href: '/services/branding' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
