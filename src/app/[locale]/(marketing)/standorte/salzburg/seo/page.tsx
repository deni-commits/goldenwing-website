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
    title: 'SEO Agentur Salzburg | Suchmaschinenoptimierung',
    description: 'SEO für Salzburger Hotels, Museen, Kultureinrichtungen und Tourismusunternehmen. Von Wien aus betreut. Mehr Besucher und Buchungen durch bessere Sichtbarkeit. SFG fördert bis 30%.',
    keywords: ['SEO Agentur Salzburg', 'Suchmaschinenoptimierung Salzburg', 'SEO Salzburg Land', 'Hotel SEO Salzburg'],
  },
  en: {
    title: 'SEO Agency Salzburg | Search Engine Optimization',
    description: 'SEO for Salzburg hotels, museums, cultural institutions and tourism businesses. Remotely from Vienna. More visitors and bookings through better visibility.',
    keywords: ['SEO Agency Salzburg', 'Search Engine Optimization Salzburg', 'SEO Salzburg Land'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Salzburg',
      title: 'SEO Agentur Salzburg',
      description: 'Suchmaschinenoptimierung für Salzburger Hotels, Museen, Kultureinrichtungen und Tourismusunternehmen. Wir bringen Sie auf Google-Seite 1 – für mehr Besucher und Buchungen.',
      ctaPrimary: 'SEO-Analyse anfragen',
      ctaSecondary: 'SEO-Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Kultur & Tourismus Expertise' },
      { icon: 'globe', text: 'Mehrsprachige SEO' },
      { icon: 'clock', text: 'Monatliche Reports' },
      { icon: 'shield', text: 'Keine Vertragsbindung' },
    ],
    benefits: [
      {
        icon: 'layers',
        title: 'SEO für Hotels & Kultureinrichtungen',
        description: 'Von "Hotel Salzburg Altstadt" bis "Salzburg Museum online buchen" – wir verstehen, wie Kulturbesucher und Gäste suchen.',
      },
      {
        icon: 'globe',
        title: 'Internationale Sichtbarkeit',
        description: 'Gäste aus Deutschland, Italien, Skandinavien, USA. SEO für DE, EN, FR und IT ist Standard für Salzburg.',
      },
      {
        icon: 'users',
        title: 'Seasonal SEO für Musik & Events',
        description: 'Salzburg Festival, Weihnachtsmärkte, Sommer-Tourismus. Wir optimieren für alle Saisons und Events.',
      },
      {
        icon: 'zap',
        title: 'Local SEO & Google My Business',
        description: 'Hotel-Rankings, Museum-Maps, Bewertungsmanagement, Event-Sichtbarkeit für Salzburg.',
      },
    ],
    results: [
      { metric: '+200%', label: 'Organischer Traffic', detail: 'Durchschnitt nach 12 Monaten' },
      { metric: 'Top 5', label: 'Such-Keywords', detail: 'Für relevante Buchungsbegriffe' },
      { metric: '+70%', label: 'Direkte Buchungen', detail: 'Durch bessere Sichtbarkeit' },
    ],
    packages: [
      {
        name: 'SEO Starter Salzburg',
        price: '490',
        priceType: 'monatlich',
        description: 'Für kleine Hotels und Kultureinrichtungen.',
        popular: false,
        features: ['10 Keywords', 'OnPage-Optimierung', 'Google My Business Setup', 'Monatlicher Report'],
      },
      {
        name: 'SEO Business Salzburg',
        price: '990',
        priceType: 'monatlich',
        description: 'Für größere Hotels, Museen und Tourismusverbände.',
        popular: true,
        features: ['30+ Keywords', 'Technische SEO', 'Bewertungsmanagement', 'Local SEO Salzburg', 'Link-Aufbau (5/Monat)'],
      },
      {
        name: 'SEO Tourismus Salzburg',
        price: '1.990',
        priceType: 'monatlich',
        description: 'Für große Kulturinstitutionen und Tourismus-Verbände.',
        popular: false,
        features: ['Unbegrenzte Keywords', 'Mehrsprachige SEO (DE/EN/FR/IT)', 'Content-Produktion inkl.', 'Internationales Link-Building'],
      },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Technische Analyse für Hotels/Museen, Wettbewerber-Check.' },
      { step: '02', title: 'Strategie', description: 'SEO-Roadmap für Saison-Keywords und Events.' },
      { step: '03', title: 'OnPage', description: 'Meta-Tags, Struktur-Markup, Event-Daten.' },
      { step: '04', title: 'OffPage', description: 'Link-Building in Tourismus- und Kultur-Portalen.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Reports mit Buchungs- und Besucherzahlen-Impact.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush'],
    faqs: [
      {
        question: 'Warum SEO für Salzburger Hotels und Museen?',
        answer: 'Touristen buchen online und suchen auf Google: "Hotel Salzburg Zentrum", "Mozart Salzburg", "Salzburg Sehenswürdigkeiten". Wer rankt, bekommt die Besucher und Buchungen.',
      },
      {
        question: 'Wie schnell funktioniert Tourismus-SEO?',
        answer: 'Erste Rankings: 2-3 Monate. Top-Positionen: 6-9 Monate. Bei saisonalen Keywords (z.B. "Salzburg Festival") oft schneller.',
      },
      {
        question: 'Was kostet SEO für Salzburger Tourismusbetriebe?',
        answer: 'Ab €490/Monat für kleine Hotels. Business Upper Austria / SFG fördert bis 30%.',
      },
      {
        question: 'Können Sie mehrsprachige SEO?',
        answer: 'Ja! Salzburg-Touristen kommen aus vielen Ländern. Wir optimieren für DE, EN, FR und IT – je nach Ihrer Zielgruppe.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Salzburg', description: 'Hotel-Website mit Buchungssystem.', href: '/standorte/salzburg/webdesign' as any },
      { title: 'Werbeagentur Salzburg', description: 'Branding für Kulturinstitutionen.', href: '/standorte/salzburg/werbeagentur' as any },
      { title: 'Digitalagentur Salzburg', description: 'Alle Leistungen.', href: '/standorte/salzburg' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Salzburg',
      pricingDescription: 'SFG Salzburg fördert bis 30%!',
      faqTitle: 'SEO Salzburg – Häufige Fragen',
      ctaTitle: 'Mehr Besucher und Buchungen durch bessere SEO?',
      ctaDescription: 'Kostenlose SEO-Analyse für Ihr Hotel oder Museum.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Salzburg',
      title: 'SEO Agency Salzburg',
      description: 'Search engine optimization for Salzburg hotels, museums, cultural institutions and tourism businesses. Remotely from Vienna.',
      ctaPrimary: 'Request SEO Analysis',
      ctaSecondary: 'View SEO Packages',
    },
    trustSignals: [
      { icon: 'award', text: 'Culture & Tourism Expertise' },
      { icon: 'globe', text: 'Multilingual SEO' },
      { icon: 'clock', text: 'Monthly Reports' },
      { icon: 'shield', text: 'No Contract Lock-in' },
    ],
    benefits: [
      { icon: 'layers', title: 'SEO for Hotels & Cultural Institutions', description: 'We understand how cultural visitors and tourists search.' },
      { icon: 'globe', title: 'International Visibility', description: 'SEO for DE, EN, FR and IT markets.' },
      { icon: 'users', title: 'Seasonal SEO for Music & Events', description: 'Salzburg Festival and summer tourism optimization.' },
      { icon: 'zap', title: 'Local SEO with Google My Business', description: 'Hotel rankings and museum visibility.' },
    ],
    results: [
      { metric: '+200%', label: 'Organic Traffic', detail: 'Average after 12 months' },
      { metric: 'Top 5', label: 'Search Keywords', detail: 'For booking terms' },
    ],
    packages: [
      { name: 'SEO Starter Salzburg', price: '490', priceType: 'monthly', description: 'For small hotels.', popular: false, features: ['10 Keywords', 'OnPage Optimization', 'Google My Business', 'Monthly Report'] },
      { name: 'SEO Business Salzburg', price: '990', priceType: 'monthly', description: 'For larger hotels and museums.', popular: true, features: ['30+ Keywords', 'Technical SEO', 'Review Management', 'Link Building'] },
      { name: 'SEO Tourism Salzburg', price: '1,990', priceType: 'monthly', description: 'For large cultural institutions.', popular: false, features: ['Unlimited Keywords', 'Multilingual SEO (DE/EN/FR/IT)', 'Content Production'] },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'Technical analysis and competitor check.' },
      { step: '02', title: 'Strategy', description: 'SEO roadmap for seasonal keywords.' },
      { step: '03', title: 'OnPage', description: 'Meta tags and event markup.' },
      { step: '04', title: 'OffPage', description: 'Link building in tourism portals.' },
      { step: '05', title: 'Reporting', description: 'Monthly reports with visitor impact.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog'],
    faqs: [
      { question: 'Why SEO for Salzburg hotels and museums?', answer: 'Tourists book online and search Google. Those who rank get visitors and bookings.' },
      { question: 'How fast does tourism SEO work?', answer: 'First rankings: 2-3 months. Top positions: 6-9 months.' },
    ],
    relatedServices: [
      { title: 'Web Design Salzburg', description: 'Hotel website with booking system.', href: '/standorte/salzburg/webdesign' as any },
      { title: 'Digital Agency Salzburg', description: 'All services.', href: '/standorte/salzburg' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Salzburg',
      faqTitle: 'SEO Salzburg – FAQ',
      ctaTitle: 'More visitors through better SEO?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/salzburg/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/salzburg/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortSalzburgSEOPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Salzburg' : 'SEO Agency Salzburg',
    cityName: 'Salzburg',
    cityType: 'City',
    url: '/standorte/salzburg/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Salzburg', url: 'https://goldenwing.at/standorte/salzburg' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/salzburg/seo' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Salzburg', href: '/standorte/salzburg' },
        { text: 'SEO Kosten Guide', href: '/wissen/guides/seo-kosten' },
        { text: 'SEO Leistungen', href: '/leistungen/seo' },
      ]
    : [
        { text: 'Digital Agency Salzburg', href: '/locations/salzburg' },
        { text: 'SEO Services', href: '/services/seo' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
