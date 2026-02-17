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
    title: 'Werbeagentur Salzburg | Branding & Design für Hotels, Kultur & Tourismus',
    description: 'Werbeagentur für Salzburger Hotels, Museen, Kultureinrichtungen. Branding, Logo-Design, Corporate Identity. Von Wien aus betreut. SFG fördert bis 30%.',
    keywords: ['Werbeagentur Salzburg', 'Branding Salzburg', 'Grafik Design Salzburg Land', 'Logo Design Salzburg'],
  },
  en: {
    title: 'Advertising Agency Salzburg | Branding & Design for Hotels, Culture & Tourism',
    description: 'Advertising agency for Salzburg hotels, museums, cultural institutions. Branding, logo design, corporate identity. Remotely from Vienna.',
    keywords: ['Advertising Agency Salzburg', 'Branding Salzburg', 'Graphic Design Salzburg'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Werbeagentur Salzburg',
      title: 'Werbeagentur Salzburg',
      description: 'Branding, Logo-Design und Corporate Identity für Salzburger Hotels, Museen und Kultureinrichtungen. Von Wien aus betreut mit persönlichem Kickoff vor Ort.',
      ctaPrimary: 'Branding-Projekt anfragen',
      ctaSecondary: 'Leistungen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Kultur & Tourismus Branding' },
      { icon: 'palette', text: 'Creative Design' },
      { icon: 'globe', text: 'International' },
      { icon: 'shield', text: 'Bewährte Kreativität' },
    ],
    benefits: [
      {
        icon: 'layers',
        title: 'Hotel & Kulturinstitutions-Branding',
        description: 'Wir kennen die Salzburger Tourismusszene. Logos und Corporate Identities, die Gäste, Kulturbesucher und Investoren anziehen.',
      },
      {
        icon: 'palette',
        title: 'Design für alle Kanäle',
        description: 'Print, Web, Social Media, Event-Material, Ausstellungsdesign – konsistentes Design über alle Touchpoints.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachig & International',
        description: 'Hotels und Museen in Salzburg haben internationale Gäste. Marketing-Materialien in Deutsch, Englisch, Französisch, Italienisch.',
      },
      {
        icon: 'zap',
        title: 'Event & Festival Branding',
        description: 'Salzburg Festival, Weihnachtsmärkte, Summer Events. Wir schaffen Markenidentitäten für Kulturveranstaltungen.',
      },
    ],
    results: [
      { metric: '95%', label: 'Markenwiederkennung', detail: 'Nach rebrand-Kampagne' },
      { metric: '+50%', label: 'Besucherzuwachs', detail: 'Durch starkes Branding' },
      { metric: '8 Wochen', label: 'Durchschn. Projektlaufzeit', detail: 'Von Kickoff bis Launch' },
    ],
    packages: [
      {
        name: 'Logo & Branding Starter',
        price: '2.490',
        priceType: 'einmalig',
        description: 'Logo-Design, Farbschema und Basis-Richtlinien.',
        popular: false,
        features: ['Logo Design (5 Varianten)', 'Farbschema & Typografie', 'Brand Guidelines (Basis)', 'Print & Digital-Templates'],
      },
      {
        name: 'Vollständige Corporate Identity',
        price: '5.990',
        priceType: 'einmalig',
        description: 'Komplettes Branding-Paket für Hotels und Kultureinrichtungen.',
        popular: true,
        features: ['Umfassendes Branding', 'Detaillierte Brand Guidelines', 'Visitenkarten, Briefpapier', 'Website-Design-System', 'Social Media Templates'],
      },
      {
        name: 'Rebranding mit Kampagne',
        price: '9.990',
        priceType: 'einmalig',
        description: 'Komplettes Rebranding mit Launch-Kampagne und Materialproduktion.',
        popular: false,
        features: ['Neues Brand Design', 'Umfassende Guidelines', 'Alle Print-Materialien', 'Digital Assets', 'Launch-Kampagne', 'Beratung vor Ort in Salzburg'],
      },
    ],
    process: [
      { step: '01', title: 'Kickoff & Strategie', description: 'Vor Ort in Salzburg: Ihre Ziele, Zielgruppe, Positionierung.' },
      { step: '02', title: 'Kreative Konzepte', description: '3-5 Design-Varianten zur Auswahl.' },
      { step: '03', title: 'Detaillierung', description: 'Ausarbeitung, Anpassungen, Brand Guidelines.' },
      { step: '04', title: 'Umsetzung', description: 'Print, Web, Social Media, Event-Material.' },
      { step: '05', title: 'Launch Support', description: 'Einführung, Schulung, After-Launch-Support.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Illustrator', 'InDesign'],
    faqs: [
      {
        question: 'Wie lange dauert ein Branding-Projekt?',
        answer: 'Typisch 8-12 Wochen: 2 Wochen Konzept, 4-6 Wochen Kreativ, 2-4 Wochen Finalisierung. Komplexe Rebranding: bis 16 Wochen.',
      },
      {
        question: 'Können Sie während des Projekts vor Ort in Salzburg sein?',
        answer: 'Ja! Kickoff und wichtige Meilensteine finden vor Ort statt. Regelmäßige Meetings sind remote via Zoom. Das spart Kosten ohne Qualitätsverlust.',
      },
      {
        question: 'Was kostet Branding für Salzburger Hotels und Museen?',
        answer: 'Logo-Design: ab €2.490. Vollständige Corporate Identity: ab €5.990. SFG fördert Digitalisierungsprojekte bis 30%.',
      },
      {
        question: 'Können wir Änderungen nach dem Projekt noch machen?',
        answer: 'Ja! Nach dem Projekt erhalten Sie alle Dateien (Vektoren, Quellen). Sie können damit selbstständig arbeiten oder uns für laufende Anpassungen engagieren (Retainer ab €300/Monat).',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Salzburg', description: 'Website-Design konsistent mit Ihrem Branding.', href: '/standorte/salzburg/webdesign' as any },
      { title: 'SEO Salzburg', description: 'Ihre neue Marke sichtbar machen.', href: '/standorte/salzburg/seo' as any },
      { title: 'Digitalagentur Salzburg', description: 'Alle Leistungen für Kultur und Tourismus.', href: '/standorte/salzburg' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding Pakete für Salzburg',
      pricingDescription: 'SFG fördert bis 30%!',
      faqTitle: 'Werbeagentur Salzburg – Häufige Fragen',
      ctaTitle: 'Bereit für ein professionelles Branding?',
      ctaDescription: 'Kostenlose Erstberatung – wir besprechen Ihr Projekt vor Ort in Salzburg.',
    },
  },
  en: {
    hero: {
      badge: 'Advertising Agency Salzburg',
      title: 'Advertising Agency Salzburg',
      description: 'Branding, logo design and corporate identity for Salzburg hotels, museums and cultural institutions. Remotely from Vienna.',
      ctaPrimary: 'Request Branding Project',
      ctaSecondary: 'View Services',
    },
    trustSignals: [
      { icon: 'award', text: 'Culture & Tourism Branding' },
      { icon: 'palette', text: 'Creative Design' },
      { icon: 'globe', text: 'International' },
      { icon: 'shield', text: 'Proven Creativity' },
    ],
    benefits: [
      { icon: 'layers', title: 'Hotel & Cultural Institution Branding', description: 'We know Salzburg tourism. Logos and identities that attract guests and visitors.' },
      { icon: 'palette', title: 'Design for All Channels', description: 'Print, web, social media, event materials – consistent design.' },
      { icon: 'globe', title: 'Multilingual & International', description: 'Marketing materials in German, English, French and Italian.' },
      { icon: 'zap', title: 'Event & Festival Branding', description: 'Salzburg Festival, Christmas markets and summer events.' },
    ],
    results: [
      { metric: '95%', label: 'Brand Recognition', detail: 'After rebrand campaign' },
      { metric: '+50%', label: 'Visitor Growth', detail: 'Through strong branding' },
    ],
    packages: [
      { name: 'Logo & Branding Starter', price: '2,490', priceType: 'one-time', description: 'Logo design and color scheme.', popular: false, features: ['Logo Design', 'Color Scheme', 'Basic Brand Guidelines'] },
      { name: 'Complete Corporate Identity', price: '5,990', priceType: 'one-time', description: 'Complete branding package.', popular: true, features: ['Full Branding', 'Brand Guidelines', 'Print Materials', 'Web Design System'] },
      { name: 'Rebranding with Campaign', price: '9,990', priceType: 'one-time', description: 'Complete rebranding with launch campaign.', popular: false, features: ['New Brand Design', 'Guidelines', 'All Print Materials', 'Launch Campaign'] },
    ],
    process: [
      { step: '01', title: 'Kickoff & Strategy', description: 'On-site in Salzburg: Your goals and positioning.' },
      { step: '02', title: 'Creative Concepts', description: '3-5 design options to choose from.' },
      { step: '03', title: 'Refinement', description: 'Finalization and brand guidelines.' },
      { step: '04', title: 'Implementation', description: 'Print, web, social media and event materials.' },
      { step: '05', title: 'Launch Support', description: 'Introduction and after-launch support.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Illustrator'],
    faqs: [
      { question: 'How long does a branding project take?', answer: 'Typically 8-12 weeks. Complex rebranding: up to 16 weeks.' },
      { question: 'Can you be on-site in Salzburg?', answer: 'Yes! Kickoff and important milestones happen on-site. Regular meetings are remote via Zoom.' },
    ],
    relatedServices: [
      { title: 'Web Design Salzburg', description: 'Website consistent with your branding.', href: '/standorte/salzburg/webdesign' as any },
      { title: 'Digital Agency Salzburg', description: 'All services for culture and tourism.', href: '/standorte/salzburg' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages for Salzburg',
      faqTitle: 'Advertising Agency Salzburg – FAQ',
      ctaTitle: 'Ready for professional branding?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/salzburg/werbeagentur')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/salzburg/werbeagentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortSalzburgWerbeagenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Werbeagentur Salzburg' : 'Advertising Agency Salzburg',
    cityName: 'Salzburg',
    cityType: 'City',
    url: '/standorte/salzburg/werbeagentur',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Salzburg', url: 'https://goldenwing.at/standorte/salzburg' },
      { name: locale === 'de' ? 'Werbeagentur' : 'Advertising Agency', url: 'https://goldenwing.at/standorte/salzburg/werbeagentur' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Salzburg', href: '/standorte/salzburg' },
        { text: 'Branding Leistungen', href: '/leistungen/branding' },
        { text: 'Design Services', href: '/leistungen/design' },
      ]
    : [
        { text: 'Digital Agency Salzburg', href: '/locations/salzburg' },
        { text: 'Branding Services', href: '/services/branding' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
