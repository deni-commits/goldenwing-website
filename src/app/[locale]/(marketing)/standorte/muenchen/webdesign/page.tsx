import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: München - KEIN LocalBusiness (Service Schema only!)
const seoData = {
  de: {
    title: 'Webdesign München | Premium-Qualität, faire Preise aus Wien',
    description: 'Professionelles Webdesign für Münchner Unternehmen. Deutsche Qualität, 40% günstiger als lokale Agenturen. Remote aus Wien, mit Kickoff vor Ort. Ab €3.900.',
    keywords: ['Webdesign München', 'Webagentur München', 'Website erstellen München', 'Webdesigner Bayern'],
  },
  en: {
    title: 'Web Design Munich | Premium Quality, Fair Prices from Vienna',
    description: 'Professional web design for Munich businesses. German quality, 40% more affordable than local agencies. Remote from Vienna.',
    keywords: ['Web Design Munich', 'Website Development Munich', 'Web Designer Bavaria'],
  },
}

// UNIQUE Content für München - Preis-Argument + Automotive/Tech/Finance
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign München',
      title: 'Webdesign München',
      description: 'Premium-Webdesign für Münchner Unternehmen – deutsche Qualität, aber 40% günstiger als M-Agenturen. Remote aus Wien, mit persönlichem Kickoff in München.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '40% günstiger als München' },
      { icon: 'globe', text: 'Kickoff vor Ort möglich' },
      { icon: 'clock', text: '8+ Jahre Erfahrung' },
      { icon: 'shield', text: 'DSGVO-konform' },
    ],
    // UNIQUE: München-spezifische Benefits
    benefits: [
      {
        icon: 'car',
        title: 'Automotive-Expertise',
        description: 'BMW, Audi, Zulieferer – wir kennen die Anforderungen der Branche. B2B-Websites, Produktkataloge, Konfiguratoren.',
      },
      {
        icon: 'building',
        title: 'Finance & Insurance',
        description: 'Allianz, Munich Re, Fintech-Startups – komplexe Produkte verständlich präsentiert. Compliance-konform.',
      },
      {
        icon: 'cpu',
        title: 'Tech & SaaS',
        description: 'Münchens Tech-Szene boomt. Wir bauen Websites für Startups und Scale-ups – schnell, modern, skalierbar.',
      },
      {
        icon: 'piggyBank',
        title: '40% Ersparnis',
        description: 'Gleiche Qualität wie Top-Agenturen in München, aber faire Wiener Preise. Das Geld investieren Sie in Ads.',
      },
    ],
    results: [
      { metric: '40%', label: 'Ersparnis', detail: 'vs. Münchner Agenturen' },
      { metric: '< 2s', label: 'Ladezeit', detail: 'Core Web Vitals optimiert' },
      { metric: '+95%', label: 'Conversion', detail: 'Typische Verbesserung' },
    ],
    packages: [
      {
        name: 'Starter München',
        price: '3.900',
        priceType: 'einmalig',
        description: 'Für KMU und Selbstständige.',
        popular: false,
        features: [
          '5-7 Seiten (Responsive)',
          'Modernes CMS',
          'Kontaktformular',
          'SEO-Grundoptimierung',
          'Kickoff per Video',
        ],
      },
      {
        name: 'Business München',
        price: '8.500',
        priceType: 'einmalig',
        description: 'Für etablierte Unternehmen.',
        popular: true,
        features: [
          '10-15 Seiten',
          'Individuelles Design',
          'Mehrsprachig (DE/EN)',
          'Blog/News-Bereich',
          'Kontaktformulare pro Service',
          'Kickoff vor Ort in München',
        ],
      },
      {
        name: 'Enterprise München',
        price: '18.000',
        priceType: 'einmalig',
        description: 'Für Konzerne und große Projekte.',
        popular: false,
        features: [
          'Unbegrenzte Seiten',
          'Komplexe Funktionen',
          'ERP/CRM-Integration',
          'Mehrere Sprachen',
          'Dedicated Team',
          'Vor-Ort-Workshops in München',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Briefing', description: 'Video-Call oder persönlich in München.' },
      { step: '02', title: 'Konzeption', description: 'Informationsarchitektur, Wireframes.' },
      { step: '03', title: 'Design', description: 'Individuelles Design – Premium, aber fair.' },
      { step: '04', title: 'Entwicklung', description: 'Clean Code, Performance, Sicherheit.' },
      { step: '05', title: 'Launch', description: 'Testing, Go-Live, Einweisung.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Custom CMS'],
    // UNIQUE: München-spezifische FAQs
    faqs: [
      {
        question: 'Warum Webdesign aus Wien statt einer Münchner Agentur?',
        answer: 'Gleiche Qualität, bessere Preise. Münchner Agenturen zahlen Münchner Mieten – wir nicht. Das Preisniveau in Wien ist ~40% niedriger. Die Ersparnis geben wir weiter.',
      },
      {
        question: 'Wie funktioniert die Zusammenarbeit über Distanz?',
        answer: 'Kickoff: Wir kommen nach München (1-2 Tage Workshop). Laufend: Wöchentliche Video-Calls. Abnahme: Vor Ort oder remote. Das funktioniert seit Jahren hervorragend.',
      },
      {
        question: 'Was kostet Webdesign für Münchner Unternehmen?',
        answer: 'Starter: ab €3.900. Business: €8.500-15.000. Enterprise: ab €18.000. Vergleichen Sie gerne mit Münchner Angeboten – wir sind mindestens 40% günstiger.',
      },
      {
        question: 'Habt ihr Erfahrung mit bayerischen Unternehmen?',
        answer: 'Ja. Wir haben Kunden aus dem Automotive-, Finance- und Tech-Bereich in Bayern. Der DACH-Markt ist unser Fokus.',
      },
      {
        question: 'Können wir uns in München persönlich treffen?',
        answer: 'Ja! Für Kickoffs und wichtige Meilensteine kommen wir nach München. Die Reisekosten sind im Business-Paket inklusive.',
      },
    ],
    relatedServices: [
      { title: 'SEO Agentur München', description: 'Sichtbarkeit in Suchmaschinen.', href: '/standorte/muenchen/seo' as any },
      { title: 'Digitalagentur München', description: 'Alle Leistungen für Bayern.', href: '/standorte/muenchen' as any },
      { title: 'Webdesign Wien', description: 'Unser Hauptstandort.', href: '/standorte/wien/webdesign' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für München',
      pricingDescription: 'Premium-Qualität, faire Preise – 40% günstiger als lokale Agenturen.',
      processTitle: 'So entsteht Ihre Website',
      processSubtitle: 'Professioneller Prozess, auch über die Distanz.',
      resultsTitle: 'Was Sie erwarten können',
      faqTitle: 'Webdesign München – Häufige Fragen',
      faqSubtitle: 'Antworten für Münchner Unternehmen.',
      ctaTitle: 'Website aus München?',
      ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in München.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Munich',
      title: 'Web Design Munich',
      description: 'Premium web design for Munich businesses – German quality, 40% more affordable than local agencies. Remote from Vienna, with on-site kickoff.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: '40% More Affordable' },
      { icon: 'globe', text: 'On-Site Kickoff Available' },
      { icon: 'clock', text: '8+ Years Experience' },
      { icon: 'shield', text: 'GDPR Compliant' },
    ],
    benefits: [
      { icon: 'car', title: 'Automotive Expertise', description: 'BMW, Audi, suppliers – we know the industry requirements.' },
      { icon: 'building', title: 'Finance & Insurance', description: 'Complex products presented understandably. Compliance-ready.' },
      { icon: 'cpu', title: 'Tech & SaaS', description: 'Websites for startups and scale-ups – fast, modern, scalable.' },
      { icon: 'piggyBank', title: '40% Savings', description: 'Same quality as Munich agencies, fair Vienna prices.' },
    ],
    results: [
      { metric: '40%', label: 'Savings', detail: 'vs. Munich agencies' },
      { metric: '< 2s', label: 'Load Time', detail: 'Core Web Vitals optimized' },
    ],
    packages: [
      { name: 'Starter Munich', price: '3,900', priceType: 'one-time', description: 'For SMEs.', popular: false, features: ['5-7 Pages', 'Modern CMS', 'Contact Form', 'Basic SEO'] },
      { name: 'Business Munich', price: '8,500', priceType: 'one-time', description: 'For established businesses.', popular: true, features: ['10-15 Pages', 'Custom Design', 'Multilingual', 'Blog', 'On-site Kickoff'] },
      { name: 'Enterprise Munich', price: '18,000', priceType: 'one-time', description: 'For corporations.', popular: false, features: ['Unlimited Pages', 'Complex Functions', 'ERP Integration', 'Dedicated Team'] },
    ],
    process: [
      { step: '01', title: 'Briefing', description: 'Video call or in person in Munich.' },
      { step: '02', title: 'Conception', description: 'Information architecture, wireframes.' },
      { step: '03', title: 'Design', description: 'Custom design – premium, but fair.' },
      { step: '04', title: 'Development', description: 'Clean code, performance, security.' },
      { step: '05', title: 'Launch', description: 'Testing, go-live, training.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify'],
    faqs: [
      { question: 'Why web design from Vienna instead of a Munich agency?', answer: 'Same quality, better prices. Vienna price levels are ~40% lower than Munich. We pass on the savings.' },
      { question: 'How does remote collaboration work?', answer: 'Kickoff: We come to Munich. Ongoing: Weekly video calls. It works excellently.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Munich', description: 'Search engine visibility.', href: '/standorte/muenchen/seo' as any },
      { title: 'Digital Agency Munich', description: 'All services for Bavaria.', href: '/standorte/muenchen' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Munich',
      faqTitle: 'Web Design Munich – FAQ',
      ctaTitle: 'Website from Munich?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/muenchen/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/muenchen/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortMuenchenWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 2: München - KEIN LocalBusiness (Service Schema only!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign München' : 'Web Design Munich',
    cityName: 'München',
    cityType: 'City',
    url: '/standorte/muenchen/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'München', url: 'https://goldenwing.at/standorte/muenchen' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/muenchen/webdesign' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur München', href: '/standorte/muenchen' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Webdesign Wien', href: '/standorte/wien/webdesign' },
      ]
    : [
        { text: 'Digital Agency Munich', href: '/locations/munich' },
        { text: 'Web Design Vienna', href: '/locations/vienna/web-design' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
