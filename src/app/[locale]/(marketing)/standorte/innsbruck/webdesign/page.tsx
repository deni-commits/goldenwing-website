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
    title: 'Webdesign Innsbruck | Websites für Outdoor-Brands & Life Sciences',
    description: 'Professionelles Webdesign für Tiroler Unternehmen. E-Commerce für Outdoor, Websites für Life Sciences und Forschung. Remote aus Wien, Standortagentur Tirol fördert bis 30%.',
    keywords: ['Webdesign Innsbruck', 'Website erstellen Innsbruck', 'Webdesigner Tirol', 'Webagentur Innsbruck'],
  },
  en: {
    title: 'Web Design Innsbruck | Websites for Outdoor Brands & Life Sciences',
    description: 'Professional web design for Tyrolean businesses. E-commerce for outdoor, websites for life sciences. Remotely from Vienna.',
    keywords: ['Web Design Innsbruck', 'Website Development Innsbruck', 'Web Designer Tyrol'],
  },
}

// UNIQUE Content für Innsbruck - Outdoor/Life Sciences/Uni Fokus
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Innsbruck',
      title: 'Webdesign Innsbruck',
      description: 'E-Commerce für Outdoor-Brands, seriöse Websites für Life Sciences, digitale Präsenzen für Tiroler Forschung. Remote betreut aus Wien, mit Verständnis für Ihre Branche.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Outdoor-E-Commerce-Erfahrung' },
      { icon: 'globe', text: 'Mehrsprachig (DE/EN/IT)' },
      { icon: 'clock', text: 'Kickoff vor Ort möglich' },
      { icon: 'shield', text: 'DSGVO-konform' },
    ],
    // UNIQUE: Innsbruck-spezifische Benefits
    benefits: [
      {
        icon: 'layers',
        title: 'E-Commerce für Outdoor-Brands',
        description: 'Von Ski bis Kletter-Equipment – internationale Händlerportale, B2B-Shops, Endkunden-E-Commerce. PIM-Anbindung für tausende Produkte.',
      },
      {
        icon: 'globe',
        title: 'Life Sciences Websites',
        description: 'Biotech, Pharma, klinische Studien – seriöse, vertrauenswürdige Websites für Forschung und Investor Relations. Compliance-konform.',
      },
      {
        icon: 'users',
        title: 'Uni & Forschung',
        description: 'MCI, Med-Uni, Uni Innsbruck – Websites für Spinoffs, Forschungsprojekte, EU-geförderte Initiativen.',
      },
      {
        icon: 'zap',
        title: 'Tourismus & Ski',
        description: 'Skigebiete, Hotels, Outdoor-Aktivitäten – Buchungssysteme, Webcams, Live-Daten, mehrsprachig für internationale Gäste.',
      },
    ],
    results: [
      { metric: '+150%', label: 'Online-Umsatz', detail: 'Typisch für Outdoor E-Commerce' },
      { metric: 'Global', label: 'Reichweite', detail: 'Händler in 40+ Ländern' },
      { metric: '< 2s', label: 'Ladezeit', detail: 'Core Web Vitals optimiert' },
    ],
    packages: [
      {
        name: 'Starter Innsbruck',
        price: '3.500',
        priceType: 'einmalig',
        description: 'Für kleine Tiroler Unternehmen.',
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
        name: 'Outdoor Innsbruck',
        price: '12.000',
        priceType: 'einmalig',
        description: 'Für Outdoor-Brands und E-Commerce.',
        popular: true,
        features: [
          'E-Commerce oder B2B-Portal',
          'PIM-Integration',
          'Händler-Login',
          'Mehrsprachig (DE/EN/IT)',
          'Produkt-Konfigurator',
          'Kickoff vor Ort in Innsbruck',
        ],
      },
      {
        name: 'Life Sciences',
        price: '10.000',
        priceType: 'einmalig',
        description: 'Für Forschung und Biotech.',
        popular: false,
        features: [
          'Seriöses, vertrauenswürdiges Design',
          'Investor Relations Bereich',
          'Team & Publikationen',
          'Compliance-konform',
          'Mehrsprachig',
          'Premium Support',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', description: 'Video-Call oder vor Ort in Innsbruck.' },
      { step: '02', title: 'Konzeption', description: 'User Journey, Produktstruktur, Händlerlogik.' },
      { step: '03', title: 'Design', description: 'Markengerechtes Design – outdoor oder seriös.' },
      { step: '04', title: 'Entwicklung', description: 'E-Commerce, PIM, Händlerportal.' },
      { step: '05', title: 'Launch', description: 'Testing, Training, Go-Live.' },
    ],
    technologies: ['Next.js', 'React', 'Shopify', 'WooCommerce', 'Custom PIM'],
    faqs: [
      {
        question: 'Wie läuft die Zusammenarbeit ohne Büro in Innsbruck?',
        answer: 'Kickoff: Wir kommen nach Innsbruck (4h Zug oder 1h Flug). Laufend: Video-Calls. Bei größeren Projekten regelmäßig vor Ort.',
      },
      {
        question: 'Was kostet eine E-Commerce-Website für Outdoor?',
        answer: 'B2B-Händlerportal: €10.000-20.000. Endkunden-Shop: €8.000-15.000. Mit Standortagentur Tirol Förderung (30%) deutlich günstiger.',
      },
      {
        question: 'Könnt ihr an unser PIM anbinden?',
        answer: 'Ja. Wir haben Erfahrung mit Akeneo, Pimcore, und proprietären Systemen. API-Integration ist unser Standard.',
      },
      {
        question: 'Welche Förderungen gibt es in Tirol?',
        answer: 'Standortagentur Tirol fördert Digitalisierung bis 30% (max. €10.000). FFG für F&E-nahe Projekte. Wir helfen beim Antrag.',
      },
    ],
    relatedServices: [
      { title: 'SEO Innsbruck', description: 'International SEO für Outdoor.', href: '/standorte/innsbruck/seo' as any },
      { title: 'Werbeagentur Innsbruck', description: 'Branding für Outdoor & Science.', href: '/standorte/innsbruck/werbeagentur' as any },
      { title: 'Digitalagentur Innsbruck', description: 'Alle Leistungen.', href: '/standorte/innsbruck' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Innsbruck',
      pricingDescription: 'Spezialisiert auf Outdoor & Life Sciences – Förderung bis 30%!',
      processTitle: 'So entsteht Ihre Website',
      resultsTitle: 'Typische Ergebnisse',
      faqTitle: 'Webdesign Innsbruck – Häufige Fragen',
      ctaTitle: 'Projekt aus Tirol?',
      ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Innsbruck',
      title: 'Web Design Innsbruck',
      description: 'E-commerce for outdoor brands, websites for life sciences, digital presence for Tyrolean research. Remotely managed from Vienna.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: 'Outdoor E-Commerce Experience' },
      { icon: 'globe', text: 'Multilingual (DE/EN/IT)' },
      { icon: 'clock', text: 'Kickoff On-Site Possible' },
      { icon: 'shield', text: 'GDPR Compliant' },
    ],
    benefits: [
      { icon: 'layers', title: 'E-Commerce for Outdoor Brands', description: 'International dealer portals, B2B shops, consumer e-commerce.' },
      { icon: 'globe', title: 'Life Sciences Websites', description: 'Biotech, pharma – trustworthy websites for research and investors.' },
      { icon: 'users', title: 'University & Research', description: 'MCI, Med-Uni – websites for spinoffs and research projects.' },
      { icon: 'zap', title: 'Tourism & Ski', description: 'Ski resorts, hotels – booking systems, webcams, live data.' },
    ],
    results: [
      { metric: '+150%', label: 'Online Revenue', detail: 'Typical for outdoor e-commerce' },
      { metric: 'Global', label: 'Reach', detail: 'Dealers in 40+ countries' },
    ],
    packages: [
      { name: 'Starter Innsbruck', price: '3,500', priceType: 'one-time', description: 'For small Tyrolean businesses.', popular: false, features: ['5-7 Pages', 'CMS', 'Contact Form'] },
      { name: 'Outdoor Innsbruck', price: '12,000', priceType: 'one-time', description: 'For outdoor brands.', popular: true, features: ['E-Commerce', 'PIM Integration', 'Dealer Login', 'Multilingual'] },
      { name: 'Life Sciences', price: '10,000', priceType: 'one-time', description: 'For research and biotech.', popular: false, features: ['Trustworthy Design', 'Investor Relations', 'Compliance'] },
    ],
    process: [
      { step: '01', title: 'Initial Meeting', description: 'Video call or on-site in Innsbruck.' },
      { step: '02', title: 'Conception', description: 'User journey, product structure.' },
      { step: '03', title: 'Design', description: 'Brand-appropriate design.' },
      { step: '04', title: 'Development', description: 'E-commerce, PIM, dealer portal.' },
      { step: '05', title: 'Launch', description: 'Testing, training, go-live.' },
    ],
    technologies: ['Next.js', 'React', 'Shopify', 'WooCommerce'],
    faqs: [
      { question: 'What does an e-commerce website for outdoor cost?', answer: 'B2B dealer portal: €10,000-20,000. Consumer shop: €8,000-15,000. With funding (30%) significantly cheaper.' },
      { question: 'What funding is available in Tyrol?', answer: 'Standortagentur Tirol funds digitalization up to 30%. We help with the application.' },
    ],
    relatedServices: [
      { title: 'SEO Innsbruck', description: 'International SEO for outdoor.', href: '/standorte/innsbruck/seo' as any },
      { title: 'Digital Agency Innsbruck', description: 'All services.', href: '/standorte/innsbruck' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Innsbruck',
      faqTitle: 'Web Design Innsbruck – FAQ',
      ctaTitle: 'Project from Tyrol?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/innsbruck/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/innsbruck/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortInnsbruckWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Innsbruck' : 'Web Design Innsbruck',
    cityName: 'Innsbruck',
    cityType: 'City',
    url: '/standorte/innsbruck/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Innsbruck', url: 'https://goldenwing.at/standorte/innsbruck' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/innsbruck/webdesign' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Innsbruck', href: '/standorte/innsbruck' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Unsere Leistungen', href: '/leistungen/webdesign' },
      ]
    : [
        { text: 'Digital Agency Innsbruck', href: '/locations/innsbruck' },
        { text: 'Our Services', href: '/services/web-design' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
