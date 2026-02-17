import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Berlin - KEIN LocalBusiness (Service Schema only!)
const seoData = {
  de: {
    title: 'SEO Agentur Berlin | Organisches Wachstum für Startups',
    description: 'SEO für Berliner Startups und Unternehmen. Content-getriebenes Wachstum, technisches SEO, Linkbuilding. Budget-freundliche Preise aus Wien. Ab €690/Monat.',
    keywords: ['SEO Agentur Berlin', 'SEO Berlin', 'Startup SEO Berlin', 'Suchmaschinenoptimierung Berlin'],
  },
  en: {
    title: 'SEO Agency Berlin | Organic Growth for Startups',
    description: 'SEO for Berlin startups and businesses. Content-driven growth, technical SEO, linkbuilding. Budget-friendly prices from Vienna.',
    keywords: ['SEO Agency Berlin', 'SEO Berlin', 'Startup SEO Berlin', 'Search Engine Optimization Berlin'],
  },
}

// UNIQUE Content für Berlin - Startup-SEO-Fokus
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Agentur Berlin',
      title: 'SEO Agentur Berlin',
      description: 'Organisches Wachstum für die Berliner Startup-Szene. Content-Strategien, die ranken und konvertieren – zu fairen Preisen aus Wien.',
      ctaPrimary: 'Kostenlose SEO-Analyse',
      ctaSecondary: 'Case Studies ansehen',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Content-First Ansatz' },
      { icon: 'rocket', text: 'Startup-erprobt' },
      { icon: 'clock', text: 'Monatlich kündbar' },
      { icon: 'piggyBank', text: 'Budget-freundlich' },
    ],
    // UNIQUE: Berlin-spezifische SEO-Benefits (Startup-Fokus!)
    benefits: [
      {
        icon: 'fileText',
        title: 'Content-Marketing SEO',
        description: 'Blog-Artikel, die ranken und Leads bringen. Thought Leadership aufbauen, organisch wachsen.',
      },
      {
        icon: 'rocket',
        title: 'Startup-SEO',
        description: 'Von 0 auf Domain Authority. Wir helfen jungen Unternehmen, ihre organische Präsenz aufzubauen.',
      },
      {
        icon: 'globe',
        title: 'Internationales SEO',
        description: 'Berlin ist international. Wir optimieren für DE/EN/weitere Märkte – mit korrekter technischer Umsetzung.',
      },
      {
        icon: 'code',
        title: 'Technisches SEO',
        description: 'Core Web Vitals, JavaScript SEO, Crawl-Optimierung. Was moderne SPAs und Next.js-Apps brauchen.',
      },
    ],
    results: [
      { metric: '+250%', label: 'Organischer Traffic', detail: 'Typisches Startup-Ergebnis nach 12 Monaten' },
      { metric: '35%', label: 'Ersparnis', detail: 'vs. Berliner Agenturen' },
      { metric: '50+', label: 'Keywords Page 1', detail: 'Für relevante Suchbegriffe' },
    ],
    packages: [
      {
        name: 'Startup SEO',
        price: '690',
        priceType: 'mtl.',
        description: 'Für junge Unternehmen.',
        popular: false,
        features: [
          'Keyword-Strategie',
          'OnPage-Optimierung (10 Seiten)',
          'Blog-Optimierung',
          'Monatliches Reporting',
          'Monatlich kündbar',
        ],
      },
      {
        name: 'Growth SEO',
        price: '1.290',
        priceType: 'mtl.',
        description: 'Für wachsende Startups.',
        popular: true,
        features: [
          'Umfangreiche Keyword-Recherche',
          'Content-Strategie',
          'Blog-Artikel (2/Monat)',
          'Technisches SEO',
          'Linkbuilding (White-Hat)',
          'Bi-wöchentliche Calls',
        ],
      },
      {
        name: 'Scale SEO',
        price: '2.490',
        priceType: 'mtl.',
        description: 'Für Series A+ Startups.',
        popular: false,
        features: [
          'Komplette SEO-Strategie',
          'Content-Hub Aufbau',
          'Blog-Artikel (4/Monat)',
          'Internationales SEO',
          'Dedicated Manager',
          'Wöchentliche Calls',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technische Analyse, Keyword-Potenzial, Wettbewerb.' },
      { step: '02', title: 'Strategie', description: 'Content-Roadmap, Quick Wins, Long-Term-Ziele.' },
      { step: '03', title: 'Content', description: 'SEO-optimierte Artikel, Landingpages, Cluster.' },
      { step: '04', title: 'Authority', description: 'Linkbuilding, Digital PR, Gastbeiträge.' },
      { step: '05', title: 'Wachstum', description: 'Skalieren, was funktioniert. Datengetrieben.' },
    ],
    technologies: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Clearscope'],
    // UNIQUE: Berlin-spezifische FAQs
    faqs: [
      {
        question: 'Was kostet SEO für Berliner Startups?',
        answer: 'Startup SEO: €690/Monat (perfekt für Seed/Pre-Seed). Growth: €1.290/Monat (Series A). Scale: €2.490/Monat (Series B+). Monatlich kündbar.',
      },
      {
        question: 'Wie schnell sehen Startups SEO-Ergebnisse?',
        answer: 'Erste Rankings nach 2-3 Monaten. Signifikanter Traffic nach 6 Monaten. Volle Wirkung nach 12 Monaten. SEO ist ein Marathon, kein Sprint.',
      },
      {
        question: 'Warum SEO aus Wien statt einer Berliner Agentur?',
        answer: 'Gleiche Qualität, bessere Preise. Das Berliner Preisniveau ist hoch – wir liefern Wiener Qualität zu fairen Konditionen. Remote funktioniert bei SEO perfekt.',
      },
      {
        question: 'Versteht ihr SaaS/Tech-SEO?',
        answer: 'Ja. JavaScript SEO, SPA-Optimierung, Product-Led Content, Developer Documentation – wir kennen die Tech-Szene.',
      },
      {
        question: 'Schreibt ihr auch Content für uns?',
        answer: 'Ja! Growth und Scale Pakete beinhalten Blog-Artikel. Wir schreiben oder briefen – je nach Bedarf. Immer SEO-optimiert.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Berlin', description: 'SEO-optimierte Websites.', href: '/standorte/berlin/webdesign' as any },
      { title: 'Digitalagentur Berlin', description: 'Alle Leistungen.', href: '/standorte/berlin' as any },
      { title: 'SEO Agentur Wien', description: 'Unser Hauptstandort.', href: '/standorte/wien/seo' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete für Berlin',
      pricingDescription: 'Startup-freundliche Preise – monatlich kündbar.',
      processTitle: 'So wächst Ihre organische Reichweite',
      processSubtitle: 'Content-First, datengetrieben, nachhaltig.',
      resultsTitle: 'Typische Startup-Ergebnisse',
      faqTitle: 'SEO Berlin – Häufige Fragen',
      faqSubtitle: 'Antworten für Berliner Startups.',
      ctaTitle: 'Organisches Wachstum?',
      ctaDescription: 'Kostenlose SEO-Analyse – wir zeigen euer Potenzial.',
    },
  },
  en: {
    hero: {
      badge: 'SEO Agency Berlin',
      title: 'SEO Agency Berlin',
      description: 'Organic growth for the Berlin startup scene. Content strategies that rank and convert – at fair prices from Vienna.',
      ctaPrimary: 'Free SEO Analysis',
      ctaSecondary: 'View Case Studies',
    },
    trustSignals: [
      { icon: 'trendingUp', text: 'Content-First Approach' },
      { icon: 'rocket', text: 'Startup-Proven' },
      { icon: 'clock', text: 'Monthly Cancellable' },
      { icon: 'piggyBank', text: 'Budget-Friendly' },
    ],
    benefits: [
      { icon: 'fileText', title: 'Content-Marketing SEO', description: 'Blog articles that rank and generate leads.' },
      { icon: 'rocket', title: 'Startup SEO', description: 'From 0 to Domain Authority. Build your organic presence.' },
      { icon: 'globe', title: 'International SEO', description: 'Berlin is international. We optimize for multiple markets.' },
      { icon: 'code', title: 'Technical SEO', description: 'Core Web Vitals, JavaScript SEO, crawl optimization.' },
    ],
    results: [
      { metric: '+250%', label: 'Organic Traffic', detail: 'Typical startup result after 12 months' },
      { metric: '35%', label: 'Savings', detail: 'vs. Berlin agencies' },
    ],
    packages: [
      { name: 'Startup SEO', price: '690', priceType: 'monthly', description: 'For young companies.', popular: false, features: ['Keyword Strategy', 'OnPage (10 pages)', 'Blog Optimization', 'Monthly Reports'] },
      { name: 'Growth SEO', price: '1,290', priceType: 'monthly', description: 'For growing startups.', popular: true, features: ['Full Keyword Research', 'Content Strategy', 'Blog Articles (2/month)', 'Technical SEO', 'Linkbuilding'] },
      { name: 'Scale SEO', price: '2,490', priceType: 'monthly', description: 'For Series A+ startups.', popular: false, features: ['Complete SEO Strategy', 'Content Hub', 'International SEO', 'Dedicated Manager'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technical analysis, keyword potential, competition.' },
      { step: '02', title: 'Strategy', description: 'Content roadmap, quick wins, long-term goals.' },
      { step: '03', title: 'Content', description: 'SEO-optimized articles, landing pages.' },
      { step: '04', title: 'Authority', description: 'Linkbuilding, Digital PR.' },
      { step: '05', title: 'Growth', description: 'Scale what works. Data-driven.' },
    ],
    technologies: ['SEMrush', 'Ahrefs', 'Google Search Console'],
    faqs: [
      { question: 'What does SEO cost for Berlin startups?', answer: 'Startup: €690/month. Growth: €1,290/month. Scale: €2,490/month. Monthly cancellable.' },
      { question: 'How fast do startups see SEO results?', answer: 'First rankings after 2-3 months. Significant traffic after 6 months. Full effect after 12 months.' },
    ],
    relatedServices: [
      { title: 'Web Design Berlin', description: 'SEO-optimized websites.', href: '/standorte/berlin/webdesign' as any },
      { title: 'Digital Agency Berlin', description: 'All services.', href: '/standorte/berlin' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages for Berlin',
      faqTitle: 'SEO Berlin – FAQ',
      ctaTitle: 'Organic Growth?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/berlin/seo')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/berlin/seo', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortBerlinSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 2: Berlin - KEIN LocalBusiness (Service Schema only!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'SEO Agentur Berlin' : 'SEO Agency Berlin',
    cityName: 'Berlin',
    cityType: 'City',
    url: '/standorte/berlin/seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Berlin', url: 'https://goldenwing.at/standorte/berlin' },
      { name: 'SEO', url: 'https://goldenwing.at/standorte/berlin/seo' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Berlin', href: '/standorte/berlin' },
        { text: 'SEO Kosten Guide', href: '/wissen/guides/seo-kosten' },
        { text: 'SEO Agentur Wien', href: '/standorte/wien/seo' },
      ]
    : [
        { text: 'Digital Agency Berlin', href: '/locations/berlin' },
        { text: 'SEO Agency Vienna', href: '/locations/vienna/seo' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
