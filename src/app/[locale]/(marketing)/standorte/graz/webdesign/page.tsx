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
    title: 'Webdesign Graz | Websites für steirische Industrie & Tech',
    description: 'Professionelles Webdesign für Grazer Unternehmen. B2B-Industrie-Websites, Produktkataloge, mehrsprachig. Remote aus Wien, mit Verständnis für die Steiermark. Ab €3.500.',
    keywords: ['Webdesign Graz', 'Website erstellen Graz', 'Webdesigner Steiermark', 'Webagentur Graz'],
  },
  en: {
    title: 'Web Design Graz | Websites for Styrian Industry & Tech',
    description: 'Professional web design for Graz businesses. B2B industry websites, product catalogs, multilingual. Remotely from Vienna.',
    keywords: ['Web Design Graz', 'Website Development Graz', 'Web Designer Styria'],
  },
}

// UNIQUE Content für Graz - B2B/Industrie-Fokus!
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Graz',
      title: 'Webdesign Graz',
      description: 'Professionelle Websites für steirische Unternehmen – B2B-Industrie-Websites, Produktkataloge, mehrsprachig. Remote betreut aus Wien, mit tiefem Verständnis für die Grazer Wirtschaft.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Erfahrung mit Industrie-Kunden' },
      { icon: 'globe', text: 'Mehrsprachig (DE/EN/weitere)' },
      { icon: 'clock', text: 'Kickoff vor Ort in Graz' },
      { icon: 'shield', text: 'DSGVO-konform' },
    ],
    // UNIQUE: Graz-spezifische Benefits (B2B-Industrie-Fokus!)
    benefits: [
      {
        icon: 'layers',
        title: 'B2B-Industrie-Websites',
        description: 'Produktkataloge mit Filter und Suche, technische Spezifikationen, Download-Bereiche für Datenblätter und CAD-Dateien. Das können wir.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachig von Grund auf',
        description: 'Steirische Unternehmen exportieren weltweit. Wir bauen Websites, die DE + EN (und mehr) von Anfang an unterstützen.',
      },
      {
        icon: 'users',
        title: 'Recruiting-Websites',
        description: 'Fachkräftemangel in der Industrie? Karriere-Portale und Employer Branding werden wichtiger. Wir helfen.',
      },
      {
        icon: 'zap',
        title: 'Konfiguratoren & Formulare',
        description: 'Produktkonfiguratoren, Anfrage-Formulare mit Vorqualifizierung, Angebotsrechner – für komplexe B2B-Verkaufsprozesse.',
      },
    ],
    // UNIQUE: Graz-spezifisches Problem-Szenario
    results: [
      { metric: '+120%', label: 'Online-Anfragen', detail: 'Typisches Ergebnis für Industrie-Website' },
      { metric: '-35%', label: 'Telefonate', detail: 'Entlastung Vertrieb durch Vorqualifizierung' },
      { metric: '< 2s', label: 'Ladezeit', detail: 'Core Web Vitals optimiert' },
    ],
    packages: [
      {
        name: 'Starter Graz',
        price: '3.500',
        priceType: 'einmalig',
        description: 'Für kleine steirische Unternehmen.',
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
        name: 'Business Graz',
        price: '7.500',
        priceType: 'einmalig',
        description: 'Für B2B-Unternehmen mit Produktkatalog.',
        popular: true,
        features: [
          '10-15 Seiten',
          'Produktdatenbank mit Filter',
          'Mehrsprachig (DE/EN)',
          'Download-Bereich',
          'Anfrage-Formulare pro Produkt',
          'Kickoff vor Ort in Graz',
        ],
      },
      {
        name: 'Industrie Graz',
        price: '15.000',
        priceType: 'einmalig',
        description: 'Für anspruchsvolle Industrie-Projekte.',
        popular: false,
        features: [
          'Unbegrenzte Seiten',
          'Produktkonfigurator',
          'ERP/CRM-Integration',
          'Weitere Sprachen',
          'Premium Support',
          'Workshops in Graz',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', description: 'Video-Call oder persönlich in Graz – wie Sie möchten.' },
      { step: '02', title: 'Konzeption', description: 'Informationsarchitektur, UX-Konzept, Produktstruktur.' },
      { step: '03', title: 'Design', description: 'Individuelles Design – seriös und professionell für B2B.' },
      { step: '04', title: 'Entwicklung', description: 'Produktdatenbank, Filter, Download-Bereiche, Formulare.' },
      { step: '05', title: 'Launch', description: 'Abnahme, Einweisung, Go-Live. Remote oder vor Ort.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Custom CMS'],
    // UNIQUE: Graz-spezifische FAQs
    faqs: [
      {
        question: 'Wie läuft die Zusammenarbeit ohne lokales Büro?',
        answer: 'Kickoff: Wir kommen nach Graz (2-3h Workshop). Laufend: Wöchentliche Video-Calls. Präsentation: Vor Ort oder remote nach Wunsch. Das funktioniert seit Jahren hervorragend.',
      },
      {
        question: 'Was kostet Webdesign für Grazer Unternehmen?',
        answer: 'Starter-Websites: ab €3.500. Business-Websites mit Produktkatalog: €7.500-12.000. Industrie-Projekte mit Konfigurator: ab €15.000. Die SFG fördert bis zu 30%.',
      },
      {
        question: 'Wie lange dauert ein Webdesign-Projekt?',
        answer: 'Starter: 4-6 Wochen. Business: 8-12 Wochen. Industrie-Projekte: 12-20 Wochen (je nach Komplexität).',
      },
      {
        question: 'Gibt es Förderungen für Webdesign in der Steiermark?',
        answer: 'Ja! Der SFG Digitalisierungsbonus fördert bis zu 30% (max. €10.000). Bei einer €7.500-Website zahlen Sie effektiv ~€5.250. Wir helfen beim Antrag.',
      },
      {
        question: 'Versteht ihr die steirische Industrie?',
        answer: 'Ja. Wir haben Erfahrung mit B2B-Industriekunden: Automotive-Zulieferer, Maschinenbau, technische Produkte. Das ist unser Fokus.',
      },
    ],
    relatedServices: [
      { title: 'SEO Agentur Graz', description: 'Damit Ihre Website auch gefunden wird.', href: '/standorte/graz/seo' as any },
      { title: 'Online Marketing Graz', description: 'Google Ads, LinkedIn für B2B.', href: '/standorte/graz/online-marketing' as any },
      { title: 'Digitalagentur Graz', description: 'Alle Leistungen für die Steiermark.', href: '/standorte/graz' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Graz',
      pricingDescription: 'Transparente Preise – SFG-Förderung bis 30% möglich!',
      processTitle: 'So entsteht Ihre Website',
      processSubtitle: 'Von der Idee zum Launch – auch für Grazer Kunden reibungslos.',
      resultsTitle: 'Typische Ergebnisse',
      faqTitle: 'Webdesign Graz – Häufige Fragen',
      faqSubtitle: 'Antworten speziell für steirische Unternehmen.',
      ctaTitle: 'Projekt aus der Steiermark?',
      ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in Graz.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Graz',
      title: 'Web Design Graz',
      description: 'Professional websites for Styrian businesses – B2B industry websites, product catalogs, multilingual. Remotely managed from Vienna.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: 'Industry Client Experience' },
      { icon: 'globe', text: 'Multilingual (DE/EN/more)' },
      { icon: 'clock', text: 'Kickoff On-Site in Graz' },
      { icon: 'shield', text: 'GDPR Compliant' },
    ],
    benefits: [
      { icon: 'layers', title: 'B2B Industry Websites', description: 'Product catalogs, technical specifications, download areas.' },
      { icon: 'globe', title: 'Multilingual from Scratch', description: 'Styrian companies export worldwide. We build multilingual.' },
      { icon: 'users', title: 'Recruiting Websites', description: 'Career portals and employer branding for industry.' },
      { icon: 'zap', title: 'Configurators & Forms', description: 'Product configurators, pre-qualifying forms.' },
    ],
    results: [
      { metric: '+120%', label: 'Online Inquiries', detail: 'Typical result for industry website' },
      { metric: '-35%', label: 'Phone Calls', detail: 'Sales team relief through pre-qualification' },
    ],
    packages: [
      { name: 'Starter Graz', price: '3,500', priceType: 'one-time', description: 'For small Styrian businesses.', popular: false, features: ['5-7 Pages', 'CMS', 'Contact Form', 'Basic SEO'] },
      { name: 'Business Graz', price: '7,500', priceType: 'one-time', description: 'For B2B companies with product catalog.', popular: true, features: ['10-15 Pages', 'Product Database', 'Multilingual', 'Downloads', 'On-site Kickoff'] },
      { name: 'Industry Graz', price: '15,000', priceType: 'one-time', description: 'For demanding industry projects.', popular: false, features: ['Unlimited Pages', 'Configurator', 'ERP Integration', 'Premium Support'] },
    ],
    process: [
      { step: '01', title: 'Initial Meeting', description: 'Video call or in person in Graz.' },
      { step: '02', title: 'Conception', description: 'Information architecture, UX concept.' },
      { step: '03', title: 'Design', description: 'Individual design for B2B.' },
      { step: '04', title: 'Development', description: 'Product database, filters, forms.' },
      { step: '05', title: 'Launch', description: 'Approval, training, go-live.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify'],
    faqs: [
      { question: 'How does collaboration work without a local office?', answer: 'Kickoff: We come to Graz. Ongoing: Weekly video calls. It works excellently.' },
      { question: 'What does web design cost for Graz companies?', answer: 'Starter: from €3,500. Business: €7,500-12,000. Industry: from €15,000. SFG funds up to 30%.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Graz', description: 'So your website gets found.', href: '/standorte/graz/seo' as any },
      { title: 'Digital Agency Graz', description: 'All services for Styria.', href: '/standorte/graz' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Graz',
      faqTitle: 'Web Design Graz – FAQ',
      ctaTitle: 'Project from Styria?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/graz/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/graz/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortGrazWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // WICHTIG: Service Schema, NICHT LocalBusiness (wir haben kein Büro in Graz!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Graz' : 'Web Design Graz',
    cityName: 'Graz',
    cityType: 'City',
    url: '/standorte/graz/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Graz', url: 'https://goldenwing.at/standorte/graz' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/graz/webdesign' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Graz', href: '/standorte/graz' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Unsere Leistungen', href: '/leistungen/webdesign' },
      ]
    : [
        { text: 'Digital Agency Graz', href: '/locations/graz' },
        { text: 'Our Services', href: '/services/web-design' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
