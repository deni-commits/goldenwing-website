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
    title: 'Webdesign Berlin | Startup-Websites & Scale-up Solutions',
    description: 'Professionelles Webdesign für Berliner Startups und Unternehmen. Schnell, modern, skalierbar. Budget-freundliche Preise aus Wien. Ab €3.500.',
    keywords: ['Webdesign Berlin', 'Webagentur Berlin', 'Website erstellen Berlin', 'Startup Website Berlin'],
  },
  en: {
    title: 'Web Design Berlin | Startup Websites & Scale-up Solutions',
    description: 'Professional web design for Berlin startups and businesses. Fast, modern, scalable. Budget-friendly prices from Vienna.',
    keywords: ['Web Design Berlin', 'Web Agency Berlin', 'Website Development Berlin', 'Startup Website Berlin'],
  },
}

// UNIQUE Content für Berlin - Startup-Fokus
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Berlin',
      title: 'Webdesign Berlin',
      description: 'Websites für die Berliner Startup-Szene und etablierte Unternehmen. Schnell, modern, skalierbar – zu Budget-freundlichen Preisen aus Wien.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'rocket', text: 'Startup-erprobt' },
      { icon: 'clock', text: 'Schnelle Umsetzung' },
      { icon: 'code', text: 'Moderne Tech-Stacks' },
      { icon: 'piggyBank', text: 'Budget-freundlich' },
    ],
    // UNIQUE: Berlin-spezifische Benefits (Startup-Szene!)
    benefits: [
      {
        icon: 'rocket',
        title: 'MVP-Websites',
        description: 'Schnell live gehen, testen, iterieren. Wir bauen MVPs für Startups – in Wochen, nicht Monaten.',
      },
      {
        icon: 'trendingUp',
        title: 'Scale-up Ready',
        description: 'Von 100 auf 100.000 Nutzer. Wir bauen von Anfang an skalierbar – keine Rewrite-Kosten später.',
      },
      {
        icon: 'palette',
        title: 'Pitch-Perfect Design',
        description: 'Investoren überzeugen? Wir designen Websites, die Ihre Story verkaufen – visuell und inhaltlich.',
      },
      {
        icon: 'code',
        title: 'Moderne Tech-Stacks',
        description: 'Next.js, React, Headless CMS. Was Berliner Entwickler erwarten – und was performt.',
      },
    ],
    results: [
      { metric: '< 4', label: 'Wochen MVP', detail: 'Für einfache Startup-Websites' },
      { metric: '35%', label: 'Ersparnis', detail: 'vs. Berliner Agenturen' },
      { metric: '< 2s', label: 'Ladezeit', detail: 'Core Web Vitals optimiert' },
    ],
    packages: [
      {
        name: 'Startup MVP',
        price: '3.500',
        priceType: 'einmalig',
        description: 'Schnell live, schnell testen.',
        popular: false,
        features: [
          'One-Pager oder 3-5 Seiten',
          'Modernes Design',
          'CMS für einfache Pflege',
          'Kontaktformular/Waitlist',
          '3-4 Wochen Umsetzung',
        ],
      },
      {
        name: 'Scale-up Website',
        price: '8.000',
        priceType: 'einmalig',
        description: 'Für wachsende Startups.',
        popular: true,
        features: [
          '8-12 Seiten',
          'Blog/Content-Hub',
          'Mehrsprachig (DE/EN)',
          'Analytics Setup',
          'CRM-Integration',
          'Investor-Ready Design',
        ],
      },
      {
        name: 'Enterprise Berlin',
        price: '18.000',
        priceType: 'einmalig',
        description: 'Für Series A+ Startups.',
        popular: false,
        features: [
          'Komplexe Web-Apps',
          'Custom Funktionen',
          'API-Integrationen',
          'Dedicated Team',
          'Agile Entwicklung',
          'Vor-Ort-Workshops in Berlin',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Video-Call: Produkt, Zielgruppe, Timeline.' },
      { step: '02', title: 'Design Sprint', description: 'Wireframes → Design in 1 Woche.' },
      { step: '03', title: 'Development', description: 'Clean Code, schnelle Iterationen.' },
      { step: '04', title: 'Launch', description: 'Testing, Go-Live, Handover.' },
      { step: '05', title: 'Iteration', description: 'Daten analysieren, optimieren.' },
    ],
    technologies: ['Next.js', 'React', 'Vercel', 'Headless CMS', 'Framer Motion'],
    // UNIQUE: Berlin-spezifische FAQs
    faqs: [
      {
        question: 'Warum Webdesign aus Wien für Berliner Startups?',
        answer: 'Gleiche Qualität, bessere Preise. Berliner Agenturen sind teuer – wir liefern Wiener Qualität zu fairen Preisen. Remote funktioniert in der Startup-Welt eh besser.',
      },
      {
        question: 'Wie schnell kann meine Website live gehen?',
        answer: 'MVP/One-Pager: 3-4 Wochen. Scale-up Website: 6-8 Wochen. Komplexe Projekte: 12+ Wochen. Wir arbeiten agil und priorisieren.',
      },
      {
        question: 'Was kostet Webdesign für Berliner Startups?',
        answer: 'MVP: €3.500. Scale-up: €8.000-15.000. Enterprise: ab €18.000. Wir passen uns eurem Budget an – keine versteckten Kosten.',
      },
      {
        question: 'Versteht ihr die Startup-Szene?',
        answer: 'Ja. Pitch Decks, Product Hunt Launches, Investor Relations – wir kennen die Anforderungen. Schnell, lean, auf den Punkt.',
      },
      {
        question: 'Können wir uns in Berlin treffen?',
        answer: 'Für Kickoffs und wichtige Meilensteine kommen wir nach Berlin. Für Enterprise-Projekte sind regelmäßige Vor-Ort-Workshops inklusive.',
      },
    ],
    relatedServices: [
      { title: 'SEO Agentur Berlin', description: 'Organisches Wachstum.', href: '/standorte/berlin/seo' as any },
      { title: 'Digitalagentur Berlin', description: 'Alle Leistungen.', href: '/standorte/berlin' as any },
      { title: 'Webdesign Wien', description: 'Unser Hauptstandort.', href: '/standorte/wien/webdesign' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Berlin',
      pricingDescription: 'Startup-freundliche Preise – keine versteckten Kosten.',
      processTitle: 'So entsteht Ihre Website',
      processSubtitle: 'Agil, schnell, startup-erprobt.',
      resultsTitle: 'Was Sie erwarten können',
      faqTitle: 'Webdesign Berlin – Häufige Fragen',
      faqSubtitle: 'Antworten für Berliner Startups und Unternehmen.',
      ctaTitle: 'Startup in Berlin?',
      ctaDescription: 'Kostenloses Erstgespräch – wir verstehen eure Sprache.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Berlin',
      title: 'Web Design Berlin',
      description: 'Websites for the Berlin startup scene and established businesses. Fast, modern, scalable – at budget-friendly prices from Vienna.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'rocket', text: 'Startup-Proven' },
      { icon: 'clock', text: 'Fast Delivery' },
      { icon: 'code', text: 'Modern Tech Stacks' },
      { icon: 'piggyBank', text: 'Budget-Friendly' },
    ],
    benefits: [
      { icon: 'rocket', title: 'MVP Websites', description: 'Go live fast, test, iterate. We build MVPs in weeks, not months.' },
      { icon: 'trendingUp', title: 'Scale-up Ready', description: 'From 100 to 100,000 users. Built scalable from day one.' },
      { icon: 'palette', title: 'Pitch-Perfect Design', description: 'Convince investors. Websites that sell your story.' },
      { icon: 'code', title: 'Modern Tech Stacks', description: 'Next.js, React, Headless CMS. What Berlin developers expect.' },
    ],
    results: [
      { metric: '< 4', label: 'Weeks MVP', detail: 'For simple startup websites' },
      { metric: '35%', label: 'Savings', detail: 'vs. Berlin agencies' },
    ],
    packages: [
      { name: 'Startup MVP', price: '3,500', priceType: 'one-time', description: 'Go live fast.', popular: false, features: ['One-Pager or 3-5 pages', 'Modern Design', 'CMS', 'Contact/Waitlist'] },
      { name: 'Scale-up Website', price: '8,000', priceType: 'one-time', description: 'For growing startups.', popular: true, features: ['8-12 Pages', 'Blog/Content Hub', 'Multilingual', 'Analytics', 'CRM Integration'] },
      { name: 'Enterprise Berlin', price: '18,000', priceType: 'one-time', description: 'For Series A+ startups.', popular: false, features: ['Complex Web Apps', 'Custom Functions', 'API Integrations', 'On-site Workshops'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Video call: product, audience, timeline.' },
      { step: '02', title: 'Design Sprint', description: 'Wireframes → Design in 1 week.' },
      { step: '03', title: 'Development', description: 'Clean code, fast iterations.' },
      { step: '04', title: 'Launch', description: 'Testing, go-live, handover.' },
      { step: '05', title: 'Iteration', description: 'Analyze data, optimize.' },
    ],
    technologies: ['Next.js', 'React', 'Vercel', 'Headless CMS'],
    faqs: [
      { question: 'Why web design from Vienna for Berlin startups?', answer: 'Same quality, better prices. Berlin agencies are expensive – we deliver Vienna quality at fair prices.' },
      { question: 'How fast can my website go live?', answer: 'MVP: 3-4 weeks. Scale-up: 6-8 weeks. Complex projects: 12+ weeks.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Berlin', description: 'Organic growth.', href: '/standorte/berlin/seo' as any },
      { title: 'Digital Agency Berlin', description: 'All services.', href: '/standorte/berlin' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Berlin',
      faqTitle: 'Web Design Berlin – FAQ',
      ctaTitle: 'Startup in Berlin?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/berlin/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/berlin/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortBerlinWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 2: Berlin - KEIN LocalBusiness (Service Schema only!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Berlin' : 'Web Design Berlin',
    cityName: 'Berlin',
    cityType: 'City',
    url: '/standorte/berlin/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Berlin', url: 'https://goldenwing.at/standorte/berlin' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/berlin/webdesign' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Berlin', href: '/standorte/berlin' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Webdesign Wien', href: '/standorte/wien/webdesign' },
      ]
    : [
        { text: 'Digital Agency Berlin', href: '/locations/berlin' },
        { text: 'Web Design Vienna', href: '/locations/vienna/web-design' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
