import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Linz - Service Schema only
const seoData = {
  de: {
    title: 'Webdesign Linz | Websites für oberösterreichische Industrie',
    description: 'Professionelles Webdesign für Linzer Unternehmen. B2B-Industrie-Websites, Produktkataloge, Konfiguratoren. Remote aus Wien, Business Upper Austria fördert bis 30%.',
    keywords: ['Webdesign Linz', 'Website erstellen Linz', 'Webdesigner Oberösterreich', 'Webagentur Linz'],
  },
  en: {
    title: 'Web Design Linz | Websites for Upper Austrian Industry',
    description: 'Professional web design for Linz businesses. B2B industry websites, product catalogs, configurators. Remotely from Vienna.',
    keywords: ['Web Design Linz', 'Website Development Linz', 'Web Designer Upper Austria'],
  },
}

// UNIQUE Content für Linz - Stahl/Industrie/Tech Fokus
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Linz',
      title: 'Webdesign Linz',
      description: 'Professionelle Websites für oberösterreichische Unternehmen – von Schwerindustrie bis Tech-Startup. B2B-Websites, Produktkataloge, Konfiguratoren. Remote betreut aus Wien.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B-Industrie-Erfahrung' },
      { icon: 'globe', text: 'Mehrsprachig (DE/EN/weitere)' },
      { icon: 'clock', text: 'Kickoff vor Ort in Linz' },
      { icon: 'shield', text: 'DSGVO-konform' },
    ],
    // UNIQUE: Linz-spezifische Benefits (Stahl/Industrie + Tech!)
    benefits: [
      {
        icon: 'layers',
        title: 'Industrie-Produktkataloge',
        description: 'Von Stahlprodukten bis Kunststoffgranulat – wir bauen Produktdatenbanken mit Filter, Suche und technischen Spezifikationen. Export nach PDF/Excel inklusive.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachig für Export',
        description: 'Oberösterreichische Industrie exportiert weltweit. Websites in DE + EN + weitere Sprachen sind unser Standard.',
      },
      {
        icon: 'users',
        title: 'Tech-Startup Websites',
        description: 'Die Tabakfabrik-Szene wächst. Moderne Websites für SaaS, Tech-Startups und Scale-ups – schnell, agil, conversion-optimiert.',
      },
      {
        icon: 'zap',
        title: 'Händlerportale & Konfiguratoren',
        description: 'B2B-Verkauf ist komplex. Händlerportale mit Login, Produktkonfiguratoren, Angebotsrechner – wir können das.',
      },
    ],
    results: [
      { metric: '+95%', label: 'Online-Anfragen', detail: 'Typisches Ergebnis für Industrie-Website' },
      { metric: '-30%', label: 'Support-Anfragen', detail: 'Durch bessere Produktinformation' },
      { metric: '< 2s', label: 'Ladezeit', detail: 'Core Web Vitals optimiert' },
    ],
    packages: [
      {
        name: 'Starter Linz',
        price: '3.500',
        priceType: 'einmalig',
        description: 'Für kleine OÖ Unternehmen.',
        popular: false,
        features: [
          '5-7 Seiten (Responsive)',
          'CMS für einfache Pflege',
          'Kontaktformular',
          'SEO-Grundoptimierung',
          'Kickoff per Video',
        ],
      },
      {
        name: 'Business Linz',
        price: '7.500',
        priceType: 'einmalig',
        description: 'Für B2B mit Produktkatalog.',
        popular: true,
        features: [
          '10-15 Seiten',
          'Produktdatenbank mit Filter',
          'Mehrsprachig (DE/EN)',
          'Download-Bereich für Datenblätter',
          'Anfrage-Formulare pro Produkt',
          'Kickoff vor Ort in Linz',
        ],
      },
      {
        name: 'Industrie Linz',
        price: '15.000',
        priceType: 'einmalig',
        description: 'Für anspruchsvolle Industrie-Projekte.',
        popular: false,
        features: [
          'Unbegrenzte Seiten',
          'Produktkonfigurator',
          'ERP/PIM-Integration',
          'Händlerportal mit Login',
          'Premium Support',
          'Workshops in Linz',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', description: 'Video-Call oder persönlich in Linz.' },
      { step: '02', title: 'Konzeption', description: 'Informationsarchitektur, Produktstruktur.' },
      { step: '03', title: 'Design', description: 'Seriöses B2B-Design, Ihrer Marke entsprechend.' },
      { step: '04', title: 'Entwicklung', description: 'Produktdatenbank, Filter, Downloads.' },
      { step: '05', title: 'Launch', description: 'Abnahme, Einweisung, Go-Live.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Custom CMS'],
    faqs: [
      {
        question: 'Wie läuft die Zusammenarbeit ohne lokales Büro?',
        answer: 'Kickoff: Wir kommen nach Linz (1h 15min Westbahn). Laufend: Wöchentliche Video-Calls. Das funktioniert hervorragend – unsere Industrie-Kunden schätzen die Effizienz.',
      },
      {
        question: 'Was kostet Webdesign für Linzer Unternehmen?',
        answer: 'Starter: ab €3.500. Business mit Produktkatalog: €7.500-12.000. Industrie mit Konfigurator: ab €15.000. Business Upper Austria fördert bis 30%.',
      },
      {
        question: 'Könnt ihr Produktdaten aus unserem ERP/PIM importieren?',
        answer: 'Ja. Wir haben Erfahrung mit SAP, Microsoft Dynamics, und diversen PIM-Systemen. Automatischer Import oder manuelle Schnittstelle – je nach Bedarf.',
      },
      {
        question: 'Welche Förderungen gibt es in Oberösterreich?',
        answer: 'Business Upper Austria fördert Digitalisierung bis 30% (max. €15.000). Bei €10.000 Projekt zahlen Sie effektiv ~€7.000. Wir helfen beim Antrag.',
      },
    ],
    relatedServices: [
      { title: 'SEO Agentur Linz', description: 'Damit Ihre Website gefunden wird.', href: '/standorte/linz/seo' as any },
      { title: 'Online Marketing Linz', description: 'Google Ads, LinkedIn für B2B.', href: '/standorte/linz/online-marketing' as any },
      { title: 'Digitalagentur Linz', description: 'Alle Leistungen für OÖ.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Linz',
      pricingDescription: 'Transparente Preise – Business Upper Austria fördert bis 30%!',
      processTitle: 'So entsteht Ihre Website',
      processSubtitle: 'Auch für oberösterreichische Kunden reibungslos.',
      resultsTitle: 'Typische Ergebnisse',
      faqTitle: 'Webdesign Linz – Häufige Fragen',
      faqSubtitle: 'Antworten für oberösterreichische Unternehmen.',
      ctaTitle: 'Projekt aus Oberösterreich?',
      ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in Linz.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Linz',
      title: 'Web Design Linz',
      description: 'Professional websites for Upper Austrian businesses – from heavy industry to tech startups. B2B websites, product catalogs, configurators.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B Industry Experience' },
      { icon: 'globe', text: 'Multilingual (DE/EN/more)' },
      { icon: 'clock', text: 'Kickoff On-Site in Linz' },
      { icon: 'shield', text: 'GDPR Compliant' },
    ],
    benefits: [
      { icon: 'layers', title: 'Industry Product Catalogs', description: 'Product databases with filter, search and specifications.' },
      { icon: 'globe', title: 'Multilingual for Export', description: 'Websites in DE + EN + more languages.' },
      { icon: 'users', title: 'Tech Startup Websites', description: 'Modern websites for SaaS and tech startups.' },
      { icon: 'zap', title: 'Dealer Portals & Configurators', description: 'Dealer portals with login, product configurators.' },
    ],
    results: [
      { metric: '+95%', label: 'Online Inquiries', detail: 'Typical result for industry website' },
      { metric: '-30%', label: 'Support Inquiries', detail: 'Through better product information' },
    ],
    packages: [
      { name: 'Starter Linz', price: '3,500', priceType: 'one-time', description: 'For small Upper Austrian businesses.', popular: false, features: ['5-7 Pages', 'CMS', 'Contact Form', 'Basic SEO'] },
      { name: 'Business Linz', price: '7,500', priceType: 'one-time', description: 'For B2B with product catalog.', popular: true, features: ['10-15 Pages', 'Product Database', 'Multilingual', 'Downloads'] },
      { name: 'Industry Linz', price: '15,000', priceType: 'one-time', description: 'For demanding industry projects.', popular: false, features: ['Unlimited Pages', 'Configurator', 'ERP Integration'] },
    ],
    process: [
      { step: '01', title: 'Initial Meeting', description: 'Video call or in person in Linz.' },
      { step: '02', title: 'Conception', description: 'Information architecture.' },
      { step: '03', title: 'Design', description: 'Professional B2B design.' },
      { step: '04', title: 'Development', description: 'Product database, filters.' },
      { step: '05', title: 'Launch', description: 'Approval, training, go-live.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify'],
    faqs: [
      { question: 'How does collaboration work without a local office?', answer: 'Kickoff: We come to Linz. Ongoing: Weekly video calls. It works excellently.' },
      { question: 'What does web design cost for Linz companies?', answer: 'Starter: from €3,500. Business: €7,500-12,000. Business Upper Austria funds up to 30%.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Linz', description: 'So your website gets found.', href: '/standorte/linz/seo' as any },
      { title: 'Digital Agency Linz', description: 'All services for Upper Austria.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Linz',
      faqTitle: 'Web Design Linz – FAQ',
      ctaTitle: 'Project from Upper Austria?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/linz/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/linz/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortLinzWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Linz' : 'Web Design Linz',
    cityName: 'Linz',
    cityType: 'City',
    url: '/standorte/linz/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Linz', url: 'https://goldenwing.at/standorte/linz' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/linz/webdesign' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Linz', href: '/standorte/linz' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Unsere Leistungen', href: '/leistungen/webdesign' },
      ]
    : [
        { text: 'Digital Agency Linz', href: '/locations/linz' },
        { text: 'Our Services', href: '/services/web-design' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
