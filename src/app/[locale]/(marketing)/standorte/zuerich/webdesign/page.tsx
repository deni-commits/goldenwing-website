import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Zürich - KEIN LocalBusiness (Service Schema only!)
const seoData = {
  de: {
    title: 'Webdesign Zürich | Schweizer Qualität, 55% günstiger',
    description: 'Professionelles Webdesign für Zürcher Unternehmen. Premium-Qualität aus Wien, 55% günstiger als Schweizer Agenturen. Finance, Pharma, Luxury. Ab CHF 4.200.',
    keywords: ['Webdesign Zürich', 'Webagentur Zürich', 'Website erstellen Zürich', 'Webdesigner Schweiz'],
  },
  en: {
    title: 'Web Design Zurich | Swiss Quality, 55% More Affordable',
    description: 'Professional web design for Zurich businesses. Premium quality from Vienna, 55% more affordable than Swiss agencies. Finance, Pharma, Luxury.',
    keywords: ['Web Design Zurich', 'Web Agency Zurich', 'Website Development Zurich'],
  },
}

// UNIQUE Content für Zürich - Preis-Argument + Finance/Pharma/Luxury
const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Zürich',
      title: 'Webdesign Zürich',
      description: 'Premium-Webdesign für Zürcher Unternehmen – Schweizer Anspruch, aber 55% günstiger als lokale Agenturen. Remote aus Wien, mit persönlichem Service.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '55% günstiger als Zürich' },
      { icon: 'globe', text: 'DE/EN/FR mehrsprachig' },
      { icon: 'shield', text: 'DSGVO & nDSG konform' },
      { icon: 'clock', text: 'Kickoff vor Ort möglich' },
    ],
    // UNIQUE: Zürich-spezifische Benefits (Finance, Pharma, Luxury)
    benefits: [
      {
        icon: 'building',
        title: 'Finance & Banking',
        description: 'Vermögensverwalter, Fintech, Private Banking – wir verstehen die Compliance-Anforderungen und den Qualitätsanspruch.',
      },
      {
        icon: 'heart',
        title: 'Pharma & Life Sciences',
        description: 'Komplexe Produkte verständlich präsentiert. Regulatory-konform, wissenschaftlich korrekt, visuell überzeugend.',
      },
      {
        icon: 'gem',
        title: 'Luxury & Premium Brands',
        description: 'Uhren, Schmuck, Fashion – exklusives Webdesign für High-End-Marken. Jedes Detail zählt.',
      },
      {
        icon: 'piggyBank',
        title: '55% Ersparnis',
        description: 'Zürcher Agenturen berechnen Schweizer Preise. Wir liefern gleiche Qualität aus Wien – zu deutlich faireren Konditionen.',
      },
    ],
    results: [
      { metric: '55%', label: 'Ersparnis', detail: 'vs. Zürcher Agenturen' },
      { metric: '3', label: 'Sprachen', detail: 'DE/EN/FR Standard' },
      { metric: 'AAA', label: 'Accessibility', detail: 'WCAG 2.1 konform' },
    ],
    packages: [
      {
        name: 'Starter Zürich',
        price: '4.200',
        priceType: 'einmalig (CHF)',
        description: 'Für KMU und Startups.',
        popular: false,
        features: [
          '5-7 Seiten (Responsive)',
          'Schweizerdeutsches Lektorat',
          'CMS für einfache Pflege',
          'Kontaktformular',
          'SEO-Grundoptimierung',
        ],
      },
      {
        name: 'Business Zürich',
        price: '9.500',
        priceType: 'einmalig (CHF)',
        description: 'Für etablierte Unternehmen.',
        popular: true,
        features: [
          '10-15 Seiten',
          'Premium-Design',
          'Mehrsprachig (DE/EN/FR)',
          'Blog/News-Bereich',
          'Compliance-geprüft',
          'Kickoff vor Ort in Zürich',
        ],
      },
      {
        name: 'Enterprise Zürich',
        price: '22.000',
        priceType: 'einmalig (CHF)',
        description: 'Für Konzerne und Banken.',
        popular: false,
        features: [
          'Unbegrenzte Seiten',
          'Komplexe Funktionen',
          'Integration mit Kernbanksystemen',
          'Accessibility AAA',
          'Dedicated Team',
          'Regelmäßige Vor-Ort-Termine',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Briefing', description: 'Video-Call oder persönlich in Zürich.' },
      { step: '02', title: 'Konzeption', description: 'Informationsarchitektur, Wireframes, Compliance-Check.' },
      { step: '03', title: 'Design', description: 'Premium-Design für Schweizer Ansprüche.' },
      { step: '04', title: 'Entwicklung', description: 'Clean Code, Performance, Sicherheit, Mehrsprachigkeit.' },
      { step: '05', title: 'Launch', description: 'Testing (inkl. CH-spezifisch), Go-Live, Training.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Custom CMS', 'Accessibility Tools'],
    // UNIQUE: Zürich-spezifische FAQs
    faqs: [
      {
        question: 'Warum Webdesign aus Wien statt einer Zürcher Agentur?',
        answer: 'Gleiche Qualität, 55% günstiger. Schweizer Agenturen berechnen CHF 180-250/Stunde – wir liegen bei effektiv CHF 80-110. Die Ersparnis ist signifikant.',
      },
      {
        question: 'Versteht ihr Schweizer Besonderheiten?',
        answer: 'Ja. Wir haben Erfahrung mit Schweizer Kunden: Mehrsprachigkeit (DE/FR/IT/EN), CH-Datenschutz (nDSG), Schweizer Hosting, lokale Zahlungsmethoden.',
      },
      {
        question: 'Was kostet Webdesign für Zürcher Unternehmen?',
        answer: 'Starter: CHF 4.200. Business: CHF 9.500-18.000. Enterprise: ab CHF 22.000. Vergleichen Sie mit Zürcher Angeboten – Sie werden den Unterschied sehen.',
      },
      {
        question: 'Können wir uns in Zürich treffen?',
        answer: 'Ja! Für Kickoffs und wichtige Meilensteine kommen wir nach Zürich. Die Reisekosten sind im Business-Paket inklusive.',
      },
      {
        question: 'Wie läuft die Zahlung?',
        answer: 'Wir stellen in EUR oder CHF, je nach Wunsch. Anzahlung 30%, Restzahlung bei Abnahme. Schweizer Bankverbindung vorhanden.',
      },
    ],
    relatedServices: [
      { title: 'SEO Agentur Zürich', description: 'Sichtbarkeit in der Schweiz.', href: '/standorte/zuerich/seo' as any },
      { title: 'Digitalagentur Zürich', description: 'Alle Leistungen.', href: '/standorte/zuerich' as any },
      { title: 'Webdesign Wien', description: 'Unser Hauptstandort.', href: '/standorte/wien/webdesign' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Zürich',
      pricingDescription: 'Premium-Qualität, faire Preise – 55% günstiger als lokale Agenturen.',
      processTitle: 'So entsteht Ihre Website',
      processSubtitle: 'Schweizer Qualitätsanspruch, Wiener Effizienz.',
      resultsTitle: 'Was Sie erwarten können',
      faqTitle: 'Webdesign Zürich – Häufige Fragen',
      faqSubtitle: 'Antworten für Zürcher Unternehmen.',
      ctaTitle: 'Projekt aus Zürich?',
      ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in Zürich.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Zurich',
      title: 'Web Design Zurich',
      description: 'Premium web design for Zurich businesses – Swiss standards, but 55% more affordable than local agencies. Remote from Vienna with personal service.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: '55% More Affordable' },
      { icon: 'globe', text: 'DE/EN/FR Multilingual' },
      { icon: 'shield', text: 'GDPR & nDSG Compliant' },
      { icon: 'clock', text: 'On-Site Kickoff Available' },
    ],
    benefits: [
      { icon: 'building', title: 'Finance & Banking', description: 'Asset managers, Fintech, Private Banking – we understand compliance requirements.' },
      { icon: 'heart', title: 'Pharma & Life Sciences', description: 'Complex products presented understandably. Regulatory-compliant.' },
      { icon: 'gem', title: 'Luxury & Premium Brands', description: 'Watches, jewelry, fashion – exclusive design for high-end brands.' },
      { icon: 'piggyBank', title: '55% Savings', description: 'Same quality from Vienna at significantly better rates.' },
    ],
    results: [
      { metric: '55%', label: 'Savings', detail: 'vs. Zurich agencies' },
      { metric: '3', label: 'Languages', detail: 'DE/EN/FR standard' },
    ],
    packages: [
      { name: 'Starter Zurich', price: '4,200', priceType: 'one-time (CHF)', description: 'For SMEs.', popular: false, features: ['5-7 Pages', 'Swiss German Review', 'CMS', 'Basic SEO'] },
      { name: 'Business Zurich', price: '9,500', priceType: 'one-time (CHF)', description: 'For established businesses.', popular: true, features: ['10-15 Pages', 'Premium Design', 'Multilingual', 'Compliance-Checked', 'On-site Kickoff'] },
      { name: 'Enterprise Zurich', price: '22,000', priceType: 'one-time (CHF)', description: 'For corporations and banks.', popular: false, features: ['Unlimited Pages', 'Complex Functions', 'System Integration', 'Accessibility AAA'] },
    ],
    process: [
      { step: '01', title: 'Briefing', description: 'Video call or in person in Zurich.' },
      { step: '02', title: 'Conception', description: 'Information architecture, wireframes, compliance.' },
      { step: '03', title: 'Design', description: 'Premium design for Swiss standards.' },
      { step: '04', title: 'Development', description: 'Clean code, performance, security, multilingual.' },
      { step: '05', title: 'Launch', description: 'Testing, go-live, training.' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Custom CMS'],
    faqs: [
      { question: 'Why web design from Vienna instead of a Zurich agency?', answer: 'Same quality, 55% more affordable. Swiss agencies charge CHF 180-250/hour – we\'re effectively at CHF 80-110.' },
      { question: 'Do you understand Swiss specifics?', answer: 'Yes. Multilingual (DE/FR/IT/EN), Swiss data protection (nDSG), Swiss hosting, local payment methods.' },
    ],
    relatedServices: [
      { title: 'SEO Agency Zurich', description: 'Visibility in Switzerland.', href: '/standorte/zuerich/seo' as any },
      { title: 'Digital Agency Zurich', description: 'All services.', href: '/standorte/zuerich' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Zurich',
      faqTitle: 'Web Design Zurich – FAQ',
      ctaTitle: 'Project from Zurich?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/zuerich/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/zuerich/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortZuerichWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  // TIER 2: Zürich - KEIN LocalBusiness (Service Schema only!)
  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Zürich' : 'Web Design Zurich',
    cityName: 'Zürich',
    cityType: 'City',
    url: '/standorte/zuerich/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Zürich', url: 'https://goldenwing.at/standorte/zuerich' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/zuerich/webdesign' },
    ],
    // KEIN localBusiness - wir sind Service-Area, nicht vor Ort!
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Zürich', href: '/standorte/zuerich' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Webdesign Wien', href: '/standorte/wien/webdesign' },
      ]
    : [
        { text: 'Digital Agency Zurich', href: '/locations/zurich' },
        { text: 'Web Design Vienna', href: '/locations/vienna/web-design' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
