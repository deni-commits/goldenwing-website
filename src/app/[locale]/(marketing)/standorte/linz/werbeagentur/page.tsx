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
    title: 'Werbeagentur Linz | Branding & Design für B2B & Industrie',
    description: 'Werbeagentur für Linzer Industrie-Unternehmen. Branding, Logo-Design, Corporate Identity für Voestalpine, Borealis und Tech-Startups. Von Wien aus betreut. Business Upper Austria fördert bis 30%.',
    keywords: ['Werbeagentur Linz', 'Branding Linz', 'Grafik Design Oberösterreich', 'Logo Design Linz'],
  },
  en: {
    title: 'Advertising Agency Linz | Branding & Design for B2B & Industry',
    description: 'Advertising agency for Linz industrial companies. Branding, logo design, corporate identity. Remotely from Vienna.',
    keywords: ['Advertising Agency Linz', 'Branding Linz', 'Graphic Design Upper Austria'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Werbeagentur Linz',
      title: 'Werbeagentur Linz',
      description: 'Branding und Design für Linzer Industrie-Unternehmen. Von der Voestalpine bis zu Tech-Startups in der Tabakfabrik. Von Wien aus betreut mit persönlichem Kickoff vor Ort.',
      ctaPrimary: 'Branding-Projekt anfragen',
      ctaSecondary: 'Leistungen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B-Industrie-Branding' },
      { icon: 'palette', text: 'Creative Design' },
      { icon: 'globe', text: 'Mehrsprachig' },
      { icon: 'shield', text: 'Bewährte Kreativität' },
    ],
    benefits: [
      {
        icon: 'layers',
        title: 'B2B & Industrie-Branding',
        description: 'Wir kennen die Linzer Industrie. Logos und Corporate Identities, die technische Kompetenz und Innovation vermitteln.',
      },
      {
        icon: 'palette',
        title: 'Design für alle Kanäle',
        description: 'Print, Web, Social Media, Messe-Material – konsistentes Design über alle Touchpoints.',
      },
      {
        icon: 'globe',
        title: 'International & Mehrsprachig',
        description: 'Export-Unternehmen brauchen Materialien in Deutsch, Englisch, manchmal mehr. Wir halten Konsistenz.',
      },
      {
        icon: 'zap',
        title: 'Tech-Branding für Startups',
        description: 'Von klassischem B2B bis zu modernem SaaS-Branding – wir verstehen beide Welten in Linz.',
      },
    ],
    results: [
      { metric: '95%', label: 'Markenwiederkennung', detail: 'Nach rebrand-Kampagne' },
      { metric: '+40%', label: 'Engagement', detail: 'Durch konsistentes Design' },
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
        description: 'Komplettes Branding-Paket für B2B-Unternehmen.',
        popular: true,
        features: ['Umfassendes Branding', 'Detaillierte Brand Guidelines', 'Visitenkarten, Briefpapier', 'Website-Design-System', 'Social Media Templates'],
      },
      {
        name: 'Rebranding mit Kampagne',
        price: '9.990',
        priceType: 'einmalig',
        description: 'Komplettes Rebranding mit Launch-Kampagne und Materialproduktion.',
        popular: false,
        features: ['Neues Brand Design', 'Umfassende Guidelines', 'Alle Print-Materialien', 'Digital Assets', 'Launch-Kampagne', 'Beratung vor Ort in Linz'],
      },
    ],
    process: [
      { step: '01', title: 'Kickoff & Strategie', description: 'Vor Ort in Linz: Ihre Ziele, Zielgruppe, Wettbewerb.' },
      { step: '02', title: 'Kreative Konzepte', description: '3-5 Design-Varianten zur Auswahl.' },
      { step: '03', title: 'Detaillierung', description: 'Ausarbeitung, Anpassungen, Brand Guidelines.' },
      { step: '04', title: 'Umsetzung', description: 'Print, Web, Social Media, Messe-Material.' },
      { step: '05', title: 'Launch Support', description: 'Einführung, Schulung, After-Launch-Support.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Illustrator', 'InDesign'],
    faqs: [
      {
        question: 'Wie lange dauert ein Branding-Projekt?',
        answer: 'Typisch 8-12 Wochen: 2 Wochen Konzept, 4-6 Wochen Kreativ, 2-4 Wochen Finalisierung. Komplexe Rebranding: bis 16 Wochen.',
      },
      {
        question: 'Können Sie während des Projekts vor Ort in Linz sein?',
        answer: 'Ja! Kickoff und wichtige Meilensteine finden vor Ort statt. Regelmäßige Meetings sind remote via Zoom. Das spart Kosten ohne Qualitätsverlust.',
      },
      {
        question: 'Was kostet Branding für Linzer B2B-Unternehmen?',
        answer: 'Logo-Design: ab €2.490. Vollständige Corporate Identity: ab €5.990. Business Upper Austria fördert Digitalisierungsprojekte bis 30%.',
      },
      {
        question: 'Können wir Änderungen nach dem Projekt noch machen?',
        answer: 'Ja! Nach dem Projekt erhalten Sie alle Dateien (Vektoren, Quellen). Sie können damit selbstständig arbeiten oder uns für laufende Anpassungen engagieren (Retainer ab €300/Monat).',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Linz', description: 'Website-Design konsistent mit Ihrem Branding.', href: '/standorte/linz/webdesign' as any },
      { title: 'Online Marketing Linz', description: 'Ihre neue Marke bekannt machen.', href: '/standorte/linz/online-marketing' as any },
      { title: 'Digitalagentur Linz', description: 'Alle Leistungen für OÖ B2B.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding Pakete für Linz',
      pricingDescription: 'Business Upper Austria fördert bis 30%!',
      faqTitle: 'Werbeagentur Linz – Häufige Fragen',
      ctaTitle: 'Bereit für ein professionelles Branding?',
      ctaDescription: 'Kostenlose Erstberatung – wir besprechen Ihr Projekt vor Ort in Linz.',
    },
  },
  en: {
    hero: {
      badge: 'Advertising Agency Linz',
      title: 'Advertising Agency Linz',
      description: 'Branding and design for Linz industrial companies. From large manufacturers to tech startups. Remotely from Vienna.',
      ctaPrimary: 'Request Branding Project',
      ctaSecondary: 'View Services',
    },
    trustSignals: [
      { icon: 'award', text: 'B2B Industrial Branding' },
      { icon: 'palette', text: 'Creative Design' },
      { icon: 'globe', text: 'Multilingual' },
      { icon: 'shield', text: 'Proven Creativity' },
    ],
    benefits: [
      { icon: 'layers', title: 'B2B & Industrial Branding', description: 'We know Linz industry. Logos and corporate identities that convey technical expertise.' },
      { icon: 'palette', title: 'Design for All Channels', description: 'Print, web, social media, trade show materials – consistent design.' },
      { icon: 'globe', title: 'International & Multilingual', description: 'Export companies need materials in German, English and more. We maintain consistency.' },
      { icon: 'zap', title: 'Tech Branding for Startups', description: 'From classic B2B to modern SaaS branding – we understand both worlds.' },
    ],
    results: [
      { metric: '95%', label: 'Brand Recognition', detail: 'After rebrand campaign' },
      { metric: '+40%', label: 'Engagement', detail: 'Through consistent design' },
    ],
    packages: [
      { name: 'Logo & Branding Starter', price: '2,490', priceType: 'one-time', description: 'Logo design and color scheme.', popular: false, features: ['Logo Design', 'Color Scheme', 'Basic Brand Guidelines'] },
      { name: 'Complete Corporate Identity', price: '5,990', priceType: 'one-time', description: 'Complete branding package for B2B.', popular: true, features: ['Full Branding', 'Brand Guidelines', 'Print Materials', 'Web Design System'] },
      { name: 'Rebranding with Campaign', price: '9,990', priceType: 'one-time', description: 'Complete rebranding with launch campaign.', popular: false, features: ['New Brand Design', 'Guidelines', 'All Print Materials', 'Launch Campaign'] },
    ],
    process: [
      { step: '01', title: 'Kickoff & Strategy', description: 'On-site in Linz: Your goals and target audience.' },
      { step: '02', title: 'Creative Concepts', description: '3-5 design options to choose from.' },
      { step: '03', title: 'Refinement', description: 'Finalization and brand guidelines.' },
      { step: '04', title: 'Implementation', description: 'Print, web, social media and trade show materials.' },
      { step: '05', title: 'Launch Support', description: 'Introduction and after-launch support.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Illustrator'],
    faqs: [
      { question: 'How long does a branding project take?', answer: 'Typically 8-12 weeks. Complex rebranding: up to 16 weeks.' },
      { question: 'Can you be on-site in Linz?', answer: 'Yes! Kickoff and important milestones happen on-site. Regular meetings are remote via Zoom.' },
    ],
    relatedServices: [
      { title: 'Web Design Linz', description: 'Website consistent with your branding.', href: '/standorte/linz/webdesign' as any },
      { title: 'Digital Agency Linz', description: 'All services for Upper Austria.', href: '/standorte/linz' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages for Linz',
      faqTitle: 'Advertising Agency Linz – FAQ',
      ctaTitle: 'Ready for professional branding?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/linz/werbeagentur')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/linz/werbeagentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortLinzWerbeagenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Werbeagentur Linz' : 'Advertising Agency Linz',
    cityName: 'Linz',
    cityType: 'City',
    url: '/standorte/linz/werbeagentur',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Linz', url: 'https://goldenwing.at/standorte/linz' },
      { name: locale === 'de' ? 'Werbeagentur' : 'Advertising Agency', url: 'https://goldenwing.at/standorte/linz/werbeagentur' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Linz', href: '/standorte/linz' },
        { text: 'Branding Leistungen', href: '/leistungen/branding' },
        { text: 'Design Services', href: '/leistungen/design' },
      ]
    : [
        { text: 'Digital Agency Linz', href: '/locations/linz' },
        { text: 'Branding Services', href: '/services/branding' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
