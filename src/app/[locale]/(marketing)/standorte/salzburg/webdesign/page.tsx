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
    title: 'Webdesign Salzburg | Premium-Websites für Tourismus & Kultur',
    description: 'Professionelles Webdesign für Salzburger Unternehmen. Tourismus, Hotels, Kultur, Premium-Brands. Remote aus Wien, ITG fördert bis 50%! Ab €3.500.',
    keywords: ['Webdesign Salzburg', 'Website erstellen Salzburg', 'Webdesigner Salzburg', 'Webagentur Salzburg'],
  },
  en: {
    title: 'Web Design Salzburg | Premium Websites for Tourism & Culture',
    description: 'Professional web design for Salzburg businesses. Tourism, hotels, culture, premium brands. Remotely from Vienna.',
    keywords: ['Web Design Salzburg', 'Website Development Salzburg', 'Web Designer Salzburg'],
  },
}

// UNIQUE Content für Salzburg - Tourismus/Kultur/Premium Fokus
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Salzburg',
      title: 'Webdesign Salzburg',
      description: 'Premium-Websites für Salzburger Tourismus, Kultur und Lifestyle. Buchungssysteme, mehrsprachig, visuell beeindruckend. Remote betreut aus Wien.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Tourismus-Expertise' },
      { icon: 'globe', text: 'Mehrsprachig (DE/EN/IT/FR)' },
      { icon: 'clock', text: 'Kickoff vor Ort' },
      { icon: 'shield', text: 'DSGVO-konform' },
    ],
    // UNIQUE: Salzburg-spezifische Benefits (Tourismus/Premium!)
    benefits: [
      {
        icon: 'layers',
        title: 'Tourismus-Websites',
        description: 'Hotels, Restaurants, Incoming-Agenturen – Buchungssysteme, Verfügbarkeitsanzeigen, Anbindung an Channel Manager (booking.com, etc.).',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachig für internationale Gäste',
        description: 'Salzburg empfängt die Welt. DE, EN, IT, FR – automatische Spracherkennung und perfekte Übersetzungen.',
      },
      {
        icon: 'users',
        title: 'Kultur-Websites',
        description: 'Museen, Festspiele, Konzerte – Veranstaltungskalender, Ticketing-Integration, barrierefreie Designs.',
      },
      {
        icon: 'zap',
        title: 'Premium-Marken',
        description: 'Wenn Ästhetik zählt: Visuelle Websites für Boutiquen, Premium-Brands und Lifestyle-Marken in der Getreidegasse.',
      },
    ],
    results: [
      { metric: '+85%', label: 'Direktbuchungen', detail: 'Weniger OTA-Provisionen' },
      { metric: '4+ Sprachen', label: 'Standard', detail: 'Für internationale Gäste' },
      { metric: '< 2s', label: 'Ladezeit', detail: 'Core Web Vitals optimiert' },
    ],
    packages: [
      {
        name: 'Starter Salzburg',
        price: '3.500',
        priceType: 'einmalig',
        description: 'Für kleine Salzburger Unternehmen.',
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
        name: 'Tourismus Salzburg',
        price: '8.000',
        priceType: 'einmalig',
        description: 'Für Hotels und Gastronomie.',
        popular: true,
        features: [
          '10-15 Seiten',
          'Buchungssystem-Integration',
          'Mehrsprachig (3+ Sprachen)',
          'Zimmer-/Speisekarten-Darstellung',
          'Channel Manager Anbindung',
          'Kickoff vor Ort in Salzburg',
        ],
      },
      {
        name: 'Premium Salzburg',
        price: '15.000',
        priceType: 'einmalig',
        description: 'Für Premium-Marken und Kultur.',
        popular: false,
        features: [
          'Unbegrenzte Seiten',
          'Custom Design (Award-Level)',
          'Event-Kalender + Ticketing',
          'Alle Sprachen',
          'Video-Integration',
          'Workshops in Salzburg',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', description: 'Video-Call oder vor Ort in Salzburg.' },
      { step: '02', title: 'Konzeption', description: 'Gäste-Journey, Buchungsflow, Sprachen.' },
      { step: '03', title: 'Design', description: 'Premium-Design, das Salzburg würdig ist.' },
      { step: '04', title: 'Entwicklung', description: 'Buchungssystem, Mehrsprachigkeit, Speed.' },
      { step: '05', title: 'Launch', description: 'Abnahme, Einweisung, Go-Live.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Booking Engines'],
    faqs: [
      {
        question: 'Wie läuft die Zusammenarbeit ohne Büro in Salzburg?',
        answer: 'Kickoff: Wir kommen nach Salzburg (2h 20min Westbahn). Laufend: Video-Calls. Für Premium-Projekte auch regelmäßig vor Ort.',
      },
      {
        question: 'Was kostet eine Hotel-Website?',
        answer: 'Mit Buchungssystem und 3 Sprachen: €8.000-12.000. Mit ITG-Förderung (50%) zahlen Sie nur die Hälfte!',
      },
      {
        question: 'Könnt ihr an unser Buchungssystem anbinden?',
        answer: 'Ja. Wir haben Erfahrung mit SiteMinder, Protel, Opera, Gastrofix und vielen weiteren. API-Anbindung ist unser Standard.',
      },
      {
        question: 'Fördert ITG Salzburg wirklich 50%?',
        answer: 'Ja! Der Digitalisierungsbonus fördert bis 50% (max. €10.000). Bei €8.000 Website zahlen Sie effektiv €4.000. Wir helfen beim Antrag.',
      },
    ],
    relatedServices: [
      { title: 'SEO Salzburg', description: 'Damit internationale Gäste Sie finden.', href: '/standorte/salzburg/seo' as any },
      { title: 'Werbeagentur Salzburg', description: 'Branding für Premium-Marken.', href: '/standorte/salzburg/werbeagentur' as any },
      { title: 'Digitalagentur Salzburg', description: 'Alle Leistungen.', href: '/standorte/salzburg' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Salzburg',
      pricingDescription: 'Premium-Qualität – ITG fördert bis 50%!',
      processTitle: 'So entsteht Ihre Website',
      resultsTitle: 'Typische Ergebnisse',
      faqTitle: 'Webdesign Salzburg – Häufige Fragen',
      ctaTitle: 'Projekt aus Salzburg?',
      ctaDescription: 'Kostenloses Erstgespräch – ITG-Förderung bis 50% möglich!',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Salzburg',
      title: 'Web Design Salzburg',
      description: 'Premium websites for Salzburg tourism, culture and lifestyle. Booking systems, multilingual, visually impressive.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: 'Tourism Expertise' },
      { icon: 'globe', text: 'Multilingual (DE/EN/IT/FR)' },
      { icon: 'clock', text: 'Kickoff On-Site' },
      { icon: 'shield', text: 'GDPR Compliant' },
    ],
    benefits: [
      { icon: 'layers', title: 'Tourism Websites', description: 'Hotels, restaurants – booking systems, channel manager integration.' },
      { icon: 'globe', title: 'Multilingual for International Guests', description: 'DE, EN, IT, FR – automatic language detection.' },
      { icon: 'users', title: 'Culture Websites', description: 'Museums, festivals – event calendars, ticketing integration.' },
      { icon: 'zap', title: 'Premium Brands', description: 'Visual websites for boutiques and lifestyle brands.' },
    ],
    results: [
      { metric: '+85%', label: 'Direct Bookings', detail: 'Less OTA commissions' },
      { metric: '4+ Languages', label: 'Standard', detail: 'For international guests' },
    ],
    packages: [
      { name: 'Starter Salzburg', price: '3,500', priceType: 'one-time', description: 'For small businesses.', popular: false, features: ['5-7 Pages', 'CMS', 'Contact Form'] },
      { name: 'Tourism Salzburg', price: '8,000', priceType: 'one-time', description: 'For hotels and gastronomy.', popular: true, features: ['10-15 Pages', 'Booking System', 'Multilingual', 'Channel Manager'] },
      { name: 'Premium Salzburg', price: '15,000', priceType: 'one-time', description: 'For premium brands.', popular: false, features: ['Unlimited Pages', 'Custom Design', 'Event Calendar', 'All Languages'] },
    ],
    process: [
      { step: '01', title: 'Initial Meeting', description: 'Video call or on-site in Salzburg.' },
      { step: '02', title: 'Conception', description: 'Guest journey, booking flow.' },
      { step: '03', title: 'Design', description: 'Premium design worthy of Salzburg.' },
      { step: '04', title: 'Development', description: 'Booking system, multilingual.' },
      { step: '05', title: 'Launch', description: 'Approval, training, go-live.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Booking Engines'],
    faqs: [
      { question: 'What does a hotel website cost?', answer: 'With booking system and 3 languages: €8,000-12,000. With ITG funding (50%) you pay only half!' },
      { question: 'Does ITG Salzburg really fund 50%?', answer: 'Yes! Up to 50% (max €10,000). We help with the application.' },
    ],
    relatedServices: [
      { title: 'SEO Salzburg', description: 'So international guests find you.', href: '/standorte/salzburg/seo' as any },
      { title: 'Digital Agency Salzburg', description: 'All services.', href: '/standorte/salzburg' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Salzburg',
      faqTitle: 'Web Design Salzburg – FAQ',
      ctaTitle: 'Project from Salzburg?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/salzburg/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/salzburg/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortSalzburgWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Salzburg' : 'Web Design Salzburg',
    cityName: 'Salzburg',
    cityType: 'City',
    url: '/standorte/salzburg/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Salzburg', url: 'https://goldenwing.at/standorte/salzburg' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/salzburg/webdesign' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Salzburg', href: '/standorte/salzburg' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Unsere Leistungen', href: '/leistungen/webdesign' },
      ]
    : [
        { text: 'Digital Agency Salzburg', href: '/locations/salzburg' },
        { text: 'Our Services', href: '/services/web-design' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
