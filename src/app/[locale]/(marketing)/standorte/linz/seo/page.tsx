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
    title: 'SEO Agentur Linz | Suchmaschinenoptimierung für OÖ Industrie',
    description: 'SEO für Linzer Unternehmen – Schwerindustrie, Maschinenbau, Tech. Mehr Sichtbarkeit für technische Produkte. Remote aus Wien, Business Upper Austria fördert bis 30%.',
    keywords: ['SEO Agentur Linz', 'Suchmaschinenoptimierung Linz', 'SEO Oberösterreich'],
  },
  en: {
    title: 'SEO Agency Linz | Search Engine Optimization for Upper Austrian Industry',
    description: 'SEO for Linz businesses – heavy industry, mechanical engineering, tech. Remotely from Vienna.',
    keywords: ['SEO Agency Linz', 'Search Engine Optimization Linz', 'SEO Upper Austria'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Linz',
      title: 'SEO Agentur Linz',
      description: 'Suchmaschinenoptimierung für oberösterreichische Industrie – Stahl, Maschinenbau, Chemie, Tech. Wir bringen Ihre technischen Produkte auf Seite 1.',
      ctaPrimary: 'SEO-Analyse anfragen',
      ctaSecondary: 'SEO-Pakete ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B-Industrie-Expertise' },
      { icon: 'globe', text: 'Mehrsprachige SEO' },
      { icon: 'clock', text: 'Monatliche Reports' },
      { icon: 'shield', text: 'Keine Vertragsbindung' },
    ],
    benefits: [
      {
        icon: 'layers',
        title: 'SEO für Industrieprodukte',
        description: 'Von "Stahlprofile kaufen" bis "Spritzgussmaschine Hersteller" – wir verstehen, wie B2B-Einkäufer suchen.',
      },
      {
        icon: 'globe',
        title: 'Internationale Sichtbarkeit',
        description: 'OÖ Industrie exportiert weltweit. SEO für DE + EN Märkte ist unser Standard.',
      },
      {
        icon: 'users',
        title: 'Tech-SEO für Startups',
        description: 'SaaS, Software, Tech aus der Tabakfabrik – wir kennen beide Welten.',
      },
      {
        icon: 'zap',
        title: 'Content für Entscheider',
        description: 'Technische Whitepaper und Fallstudien, die bei Ingenieuren und Einkäufern wirken.',
      },
    ],
    results: [
      { metric: '+200%', label: 'Organischer Traffic', detail: 'Durchschnitt nach 12 Monaten' },
      { metric: 'Top 5', label: 'Branchen-Keywords', detail: 'Für relevante B2B-Suchbegriffe' },
      { metric: '-35%', label: 'Akquise-Kosten', detail: 'Durch organische Leads' },
    ],
    packages: [
      {
        name: 'SEO Starter Linz',
        price: '490',
        priceType: 'monatlich',
        description: 'Für kleine OÖ Unternehmen.',
        popular: false,
        features: ['10 Keywords', 'OnPage-Optimierung', 'Monatlicher Report', 'Search Console Setup'],
      },
      {
        name: 'SEO Business Linz',
        price: '990',
        priceType: 'monatlich',
        description: 'Für B2B mit Produktkatalog.',
        popular: true,
        features: ['30+ Keywords', 'Technische SEO', 'Content-Optimierung', 'Lokale SEO (OÖ)', 'Link-Aufbau (5/Monat)'],
      },
      {
        name: 'SEO Industrie Linz',
        price: '1.990',
        priceType: 'monatlich',
        description: 'Für Export-Unternehmen.',
        popular: false,
        features: ['Unbegrenzte Keywords', 'Mehrsprachige SEO', 'Content-Produktion inkl.', 'International Link-Building'],
      },
    ],
    process: [
      { step: '01', title: 'SEO-Audit', description: 'Technische Analyse, Keyword-Recherche.' },
      { step: '02', title: 'Strategie', description: 'SEO-Roadmap für Industrie.' },
      { step: '03', title: 'OnPage', description: 'Technische Optimierung.' },
      { step: '04', title: 'OffPage', description: 'Linkaufbau in Fachportalen.' },
      { step: '05', title: 'Reporting', description: 'Monatliche ROI-Reports.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'SEMrush'],
    faqs: [
      {
        question: 'Warum SEO für OÖ Industrie?',
        answer: 'B2B-Einkäufer recherchieren online. "Stahllieferant Österreich", "Kunststoffgranulat Hersteller" – wer rankt, bekommt Anfragen.',
      },
      {
        question: 'Was kostet SEO für Linzer Unternehmen?',
        answer: 'Lokal: ab €490/Monat. B2B-Industrie: €990-1.990/Monat. Business Upper Austria fördert bis 30%.',
      },
      {
        question: 'Wie lange bis Ergebnisse?',
        answer: 'Erste Rankings: 3-4 Monate. Top-Positionen: 6-12 Monate. Bei Nischen oft schneller.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Linz', description: 'SEO-optimierte Website.', href: '/standorte/linz/webdesign' as any },
      { title: 'Online Marketing Linz', description: 'Google Ads für B2B.', href: '/standorte/linz/online-marketing' as any },
      { title: 'Digitalagentur Linz', description: 'Alle Leistungen.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Linz',
      pricingDescription: 'Business Upper Austria fördert bis 30%!',
      faqTitle: 'SEO Linz – Häufige Fragen',
      ctaTitle: 'SEO für OÖ Unternehmen?',
      ctaDescription: 'Kostenlose SEO-Analyse.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Linz',
      title: 'SEO Agency Linz',
      description: 'Search engine optimization for Upper Austrian industry. Remotely from Vienna.',
      ctaPrimary: 'Request SEO Analysis',
      ctaSecondary: 'View SEO Packages',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B Industry Expertise' },
      { icon: 'globe', text: 'Multilingual SEO' },
      { icon: 'clock', text: 'Monthly Reports' },
      { icon: 'shield', text: 'No Contract Lock-in' },
    ],
    benefits: [
      { icon: 'layers', title: 'SEO for Industrial Products', description: 'We understand how B2B buyers search.' },
      { icon: 'globe', title: 'International Visibility', description: 'SEO for DE + EN markets.' },
      { icon: 'users', title: 'Tech SEO for Startups', description: 'SaaS, Software, Tech.' },
      { icon: 'zap', title: 'Content for Decision Makers', description: 'Technical whitepapers and case studies.' },
    ],
    results: [
      { metric: '+200%', label: 'Organic Traffic', detail: 'Average after 12 months' },
      { metric: 'Top 5', label: 'Industry Keywords', detail: 'For relevant B2B terms' },
    ],
    packages: [
      { name: 'SEO Starter Linz', price: '490', priceType: 'monthly', description: 'For small businesses.', popular: false, features: ['10 Keywords', 'OnPage Optimization', 'Monthly Report'] },
      { name: 'SEO Business Linz', price: '990', priceType: 'monthly', description: 'For B2B companies.', popular: true, features: ['30+ Keywords', 'Technical SEO', 'Link Building'] },
      { name: 'SEO Industry Linz', price: '1,990', priceType: 'monthly', description: 'For export companies.', popular: false, features: ['Unlimited Keywords', 'Multilingual SEO', 'Content Production'] },
    ],
    process: [
      { step: '01', title: 'SEO Audit', description: 'Technical analysis.' },
      { step: '02', title: 'Strategy', description: 'SEO roadmap.' },
      { step: '03', title: 'OnPage', description: 'Technical optimization.' },
      { step: '04', title: 'OffPage', description: 'Link building.' },
      { step: '05', title: 'Reporting', description: 'Monthly ROI reports.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog'],
    faqs: [
      { question: 'Why SEO for Upper Austrian industry?', answer: 'B2B buyers research online. Those who rank get inquiries.' },
      { question: 'What does SEO cost?', answer: 'Local: from €490/month. Business Upper Austria funds up to 30%.' },
    ],
    relatedServices: [
      { title: 'Web Design Linz', description: 'SEO-optimized website.', href: '/standorte/linz/webdesign' as any },
      { title: 'Digital Agency Linz', description: 'All services.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Linz',
      faqTitle: 'SEO Linz – FAQ',
      ctaTitle: 'SEO for Upper Austrian company?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/linz/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/linz/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortLinzSEOPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Linz' : 'SEO Agency Linz',
    cityName: 'Linz',
    cityType: 'City',
    url: '/standorte/linz/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Linz', url: 'https://goldenwing.at/standorte/linz' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/linz/seo' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Linz', href: '/standorte/linz' },
        { text: 'SEO Kosten Guide', href: '/wissen/guides/seo-kosten' },
        { text: 'SEO Leistungen', href: '/leistungen/seo' },
      ]
    : [
        { text: 'Digital Agency Linz', href: '/locations/linz' },
        { text: 'SEO Services', href: '/services/seo' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
