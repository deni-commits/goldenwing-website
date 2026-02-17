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
    title: 'SEO Agentur Innsbruck | Suchmaschinenoptimierung Tirol',
    description: 'SEO für Innsbrucker Hotels, Tourismusunternehmen und Service-Provider. Von Wien aus betreut. Mehr Buchungen durch bessere Suchmaschinen-Sichtbarkeit. SFG fördert bis 30%.',
    keywords: ['SEO Agentur Innsbruck', 'Suchmaschinenoptimierung Innsbruck', 'SEO Tirol', 'Hotel SEO Innsbruck'],
  },
  en: {
    title: 'SEO Agency Innsbruck | Search Engine Optimization for Tourism',
    description: 'SEO for Innsbruck hotels, tourism businesses and service providers. Remotely from Vienna. Better visibility for more bookings.',
    keywords: ['SEO Agency Innsbruck', 'Search Engine Optimization Innsbruck', 'SEO Tyrol'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Innsbruck',
      title: 'SEO Agentur Innsbruck',
      description: 'Suchmaschinenoptimierung für Innsbrucker Hotels, Tourismusunternehmen und Sportbetriebe. Wir bringen Sie auf Google-Seite 1 – für mehr Buchungen und Anfragen.',
      ctaPrimary: 'SEO-Analyse anfragen',
      ctaSecondary: 'SEO-Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Tourismus-Expertise' },
      { icon: 'globe', text: 'Mehrsprachige SEO' },
      { icon: 'clock', text: 'Monatliche Reports' },
      { icon: 'shield', text: 'Keine Vertragsbindung' },
    ],
    benefits: [
      {
        icon: 'layers',
        title: 'SEO für Hotels & Tourismusportale',
        description: 'Von "Hotel Innsbruck günstig" bis "Skigebiet Ötztal" – wir verstehen, wie Touristen suchen.',
      },
      {
        icon: 'globe',
        title: 'Internationale Sichtbarkeit',
        description: 'Gäste aus Deutschland, Italien, Skandinavien. SEO für DE, EN und IT ist unser Standard für Tirol.',
      },
      {
        icon: 'users',
        title: 'Seasonal SEO für Wintersport',
        description: 'Ski-Saison vorbereiten, Sommer-Bookings sichern. Wir optimieren für alle Jahreszeiten.',
      },
      {
        icon: 'zap',
        title: 'Local SEO mit Google My Business',
        description: 'Hotel-Rankings, Aktivitäten-Maps, Bewertungsmanagement für Innsbruck.',
      },
    ],
    results: [
      { metric: '+180%', label: 'Organischer Traffic', detail: 'Durchschnitt nach 12 Monaten' },
      { metric: 'Top 5', label: 'Such-Keywords', detail: 'Für relevante Buchungsbegriffe' },
      { metric: '+65%', label: 'Direkte Buchungen', detail: 'Durch bessere Sichtbarkeit' },
    ],
    packages: [
      {
        name: 'SEO Starter Innsbruck',
        price: '490',
        priceType: 'monatlich',
        description: 'Für kleine Hotels und Tourismusbetriebe.',
        popular: false,
        features: ['10 Keywords', 'OnPage-Optimierung', 'Google My Business Setup', 'Monatlicher Report'],
      },
      {
        name: 'SEO Business Innsbruck',
        price: '990',
        priceType: 'monatlich',
        description: 'Für größere Hotels mit mehreren Standorten.',
        popular: true,
        features: ['30+ Keywords', 'Technische SEO', 'Bewertungsmanagement', 'Local SEO Tirol', 'Link-Aufbau (5/Monat)'],
      },
      {
        name: 'SEO Tourismusverbund',
        price: '1.990',
        priceType: 'monatlich',
        description: 'Für Tourismus-Verbände und Multi-Property-Betreiber.',
        popular: false,
        features: ['Unbegrenzte Keywords', 'Mehrsprachige SEO (DE/EN/IT)', 'Content-Produktion inkl.', 'Internationales Link-Building'],
      },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Technische Analyse für Hotels, Wettbewerber-Check.' },
      { step: '02', title: 'Strategie', description: 'SEO-Roadmap für Saison-Keywords.' },
      { step: '03', title: 'OnPage', description: 'Meta-Tags, Struktur-Markup für Buchungen.' },
      { step: '04', title: 'OffPage', description: 'Link-Building in Tourismus-Portalen.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Reports mit Buchungs-Impact.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush'],
    faqs: [
      {
        question: 'Warum SEO für Innsbrucker Hotels?',
        answer: 'Gäste buchen online und suchen auf Google: "Hotel Innsbruck Zentrum", "Skigebiet Ötztal", "Wellnesshotel Tirol". Wer rankt, bekommt die Buchungen.',
      },
      {
        question: 'Wie schnell funktioniert Hotel-SEO?',
        answer: 'Erste Rankings: 2-3 Monate. Top-Positionen: 6-9 Monate. Bei saisonalen Keywords oft schneller.',
      },
      {
        question: 'Was kostet SEO für Innsbrucker Hotels?',
        answer: 'Ab €490/Monat für kleine Hotels. Business Upper Austria / SFG fördert bis 30%.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Innsbruck', description: 'Hotel-Website mit Buchungssystem.', href: '/standorte/innsbruck/webdesign' as any },
      { title: 'Werbeagentur Innsbruck', description: 'Branding für Tourismusunternehmen.', href: '/standorte/innsbruck/werbeagentur' as any },
      { title: 'Digitalagentur Innsbruck', description: 'Alle Leistungen.', href: '/standorte/innsbruck' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Innsbruck',
      pricingDescription: 'SFG Tirol fördert bis 30%!',
      faqTitle: 'SEO Innsbruck – Häufige Fragen',
      ctaTitle: 'Mehr Buchungen durch bessere SEO?',
      ctaDescription: 'Kostenlose SEO-Analyse für Ihr Hotel.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Innsbruck',
      title: 'SEO Agency Innsbruck',
      description: 'Search engine optimization for Innsbruck hotels, tourism businesses and sports providers. Remotely from Vienna.',
      ctaPrimary: 'Request SEO Analysis',
      ctaSecondary: 'View SEO Packages',
    },
    trustSignals: [
      { icon: 'award', text: 'Tourism Expertise' },
      { icon: 'globe', text: 'Multilingual SEO' },
      { icon: 'clock', text: 'Monthly Reports' },
      { icon: 'shield', text: 'No Contract Lock-in' },
    ],
    benefits: [
      { icon: 'layers', title: 'SEO for Hotels & Tourism', description: 'We understand how tourists search online.' },
      { icon: 'globe', title: 'International Visibility', description: 'SEO for DE, EN and IT markets.' },
      { icon: 'users', title: 'Seasonal SEO for Winter Sports', description: 'Optimize for ski season and summer bookings.' },
      { icon: 'zap', title: 'Local SEO with Google My Business', description: 'Hotel rankings and review management.' },
    ],
    results: [
      { metric: '+180%', label: 'Organic Traffic', detail: 'Average after 12 months' },
      { metric: 'Top 5', label: 'Search Keywords', detail: 'For booking terms' },
    ],
    packages: [
      { name: 'SEO Starter Innsbruck', price: '490', priceType: 'monthly', description: 'For small hotels.', popular: false, features: ['10 Keywords', 'OnPage Optimization', 'Google My Business', 'Monthly Report'] },
      { name: 'SEO Business Innsbruck', price: '990', priceType: 'monthly', description: 'For larger hotels.', popular: true, features: ['30+ Keywords', 'Technical SEO', 'Review Management', 'Link Building'] },
      { name: 'SEO Tourism Network', price: '1,990', priceType: 'monthly', description: 'For tourism boards.', popular: false, features: ['Unlimited Keywords', 'Multilingual SEO (DE/EN/IT)', 'Content Production'] },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'Technical analysis and competitor check.' },
      { step: '02', title: 'Strategy', description: 'SEO roadmap for seasonal keywords.' },
      { step: '03', title: 'OnPage', description: 'Meta tags and booking markup.' },
      { step: '04', title: 'OffPage', description: 'Link building in tourism portals.' },
      { step: '05', title: 'Reporting', description: 'Monthly reports with booking impact.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog'],
    faqs: [
      { question: 'Why SEO for Innsbruck hotels?', answer: 'Guests book online and search Google for accommodations. Those who rank get the bookings.' },
      { question: 'How fast does hotel SEO work?', answer: 'First rankings: 2-3 months. Top positions: 6-9 months.' },
    ],
    relatedServices: [
      { title: 'Web Design Innsbruck', description: 'Hotel website with booking system.', href: '/standorte/innsbruck/webdesign' as any },
      { title: 'Digital Agency Innsbruck', description: 'All services.', href: '/standorte/innsbruck' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Innsbruck',
      faqTitle: 'SEO Innsbruck – FAQ',
      ctaTitle: 'More bookings through better SEO?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/innsbruck/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/innsbruck/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortInnsbruckSEOPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Innsbruck' : 'SEO Agency Innsbruck',
    cityName: 'Innsbruck',
    cityType: 'City',
    url: '/standorte/innsbruck/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Innsbruck', url: 'https://goldenwing.at/standorte/innsbruck' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/innsbruck/seo' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Innsbruck', href: '/standorte/innsbruck' },
        { text: 'SEO Kosten Guide', href: '/wissen/guides/seo-kosten' },
        { text: 'SEO Leistungen', href: '/leistungen/seo' },
      ]
    : [
        { text: 'Digital Agency Innsbruck', href: '/locations/innsbruck' },
        { text: 'SEO Services', href: '/services/seo' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
