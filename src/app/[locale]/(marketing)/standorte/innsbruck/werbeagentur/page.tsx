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
    title: 'Werbeagentur Innsbruck | Branding & Grafik Design für Hotels und Tourismus',
    description: 'Werbeagentur für Innsbrucker Hotels, Tourismus und Sportbetriebe. Branding, Logo-Design, Corporate Identity. Von Wien aus betreut. SFG fördert bis 30%.',
    keywords: ['Werbeagentur Innsbruck', 'Branding Innsbruck', 'Grafik Design Tirol', 'Logo Design Innsbruck'],
  },
  en: {
    title: 'Advertising Agency Innsbruck | Branding & Graphic Design',
    description: 'Advertising agency for Innsbruck hotels and tourism businesses. Branding, logo design, corporate identity. Remotely from Vienna.',
    keywords: ['Advertising Agency Innsbruck', 'Branding Innsbruck', 'Graphic Design Tyrol'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Werbeagentur Innsbruck',
      title: 'Werbeagentur Innsbruck',
      description: 'Branding, Logo-Design und Corporate Identity für Innsbrucker Hotels, Tourismus und Sportbetriebe. Von Wien aus betreut mit persönlichem Kickoff in Innsbruck.',
      ctaPrimary: 'Branding-Projekt anfragen',
      ctaSecondary: 'Leistungen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: 'Tourismus-Branding' },
      { icon: 'palette', text: 'Creative Design' },
      { icon: 'globe', text: 'International' },
      { icon: 'shield', text: 'Bewährte Kreativität' },
    ],
    benefits: [
      {
        icon: 'layers',
        title: 'Hotel & Tourismus Branding',
        description: 'Wir verstehen die Tourismusbranche. Logos, Farbschemata und Corporate Identities, die Gäste anziehen.',
      },
      {
        icon: 'palette',
        title: 'Grafik Design für Alle Kanäle',
        description: 'Print, Web, Social Media, Beschilderung – konsistentes Design über alle Touchpoints.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachige Kommunikation',
        description: 'Marketing-Materialien für deutsche, italienische und englischsprachige Gäste.',
      },
      {
        icon: 'zap',
        title: 'Digital & Print Integration',
        description: 'Vom Prospekt über Website bis zur Beschilderung – alles aus einer Hand.',
      },
    ],
    results: [
      { metric: '95%', label: 'Markenwiederkennung', detail: 'Nach rebrand-Kampagne' },
      { metric: '+45%', label: 'Engagement', detail: 'Durch konsistentes Design' },
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
        description: 'Komplettes Branding-Paket für Hotels und Tourismusunternehmen.',
        popular: true,
        features: ['Umfassendes Branding', 'Detaillierte Brand Guidelines', 'Visitenkarten, Briefpapier', 'Website-Design-System', 'Social Media Templates'],
      },
      {
        name: 'Rebranding mit Kampagne',
        price: '9.990',
        priceType: 'einmalig',
        description: 'Komplettes Rebranding mit Launch-Kampagne und Materialproduktion.',
        popular: false,
        features: ['Neues Brand Design', 'Umfassende Guidelines', 'Alle Print-Materialien', 'Digital Assets', 'Launch-Kampagne', 'Beratung vor Ort in Innsbruck'],
      },
    ],
    process: [
      { step: '01', title: 'Kickoff & Strategie', description: 'Vor Ort in Innsbruck: Ihre Ziele, Zielgruppe, Wettbewerb.' },
      { step: '02', title: 'Kreative Konzepte', description: '3-5 Design-Varianten zur Auswahl.' },
      { step: '03', title: 'Detaillierung', description: 'Ausarbeitung, Anpassungen, Brand Guidelines.' },
      { step: '04', title: 'Umsetzung', description: 'Print, Web, Social Media Design.' },
      { step: '05', title: 'Launch Support', description: 'Einführung, Schulung, After-Launch-Support.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Illustrator', 'InDesign'],
    faqs: [
      {
        question: 'Wie lange dauert ein Branding-Projekt?',
        answer: 'Typisch 8-12 Wochen: 2 Wochen Konzept, 4-6 Wochen Kreativ, 2-4 Wochen Finalisierung. Komplexe Rebranding: bis 16 Wochen.',
      },
      {
        question: 'Können Sie während des Projekts vor Ort in Innsbruck sein?',
        answer: 'Ja! Kickoff und wichtige Meilensteine finden vor Ort statt. Regelmäßige Meetings sind remote via Zoom. Das spart Kosten ohne Qualitätsverlust.',
      },
      {
        question: 'Was kostet Branding für Innsbrucker Hotels?',
        answer: 'Logo-Design: ab €2.490. Vollständige Corporate Identity: ab €5.990. SFG fördert Digitalisierungsprojekte bis 30%.',
      },
      {
        question: 'Erhalten wir die Design-Dateien?',
        answer: 'Ja! Sie bekommen alle Dateien (Vektoren, Raster, Quellen). Sie können damit selbstständig arbeiten oder uns für laufende Anpassungen engagieren.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Innsbruck', description: 'Website-Design konsistent mit Ihrem Branding.', href: '/standorte/innsbruck/webdesign' as any },
      { title: 'SEO Innsbruck', description: 'Ihre neue Marke sichtbar machen.', href: '/standorte/innsbruck/seo' as any },
      { title: 'Digitalagentur Innsbruck', description: 'Alle Leistungen für Tourismusunternehmen.', href: '/standorte/innsbruck' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding Pakete für Innsbruck',
      pricingDescription: 'SFG fördert bis 30% für Digitalisierungsprojekte!',
      faqTitle: 'Werbeagentur Innsbruck – Häufige Fragen',
      ctaTitle: 'Bereit für ein professionelles Branding?',
      ctaDescription: 'Kostenlose Erstberatung – wir besprechen Ihr Projekt vor Ort.',
    },
  },
  en: {
    hero: {
      badge: 'Advertising Agency Innsbruck',
      title: 'Advertising Agency Innsbruck',
      description: 'Branding, logo design and corporate identity for Innsbruck hotels and tourism businesses. Remotely from Vienna.',
      ctaPrimary: 'Request Branding Project',
      ctaSecondary: 'View Services',
    },
    trustSignals: [
      { icon: 'award', text: 'Tourism Branding' },
      { icon: 'palette', text: 'Creative Design' },
      { icon: 'globe', text: 'International' },
      { icon: 'shield', text: 'Proven Creativity' },
    ],
    benefits: [
      { icon: 'layers', title: 'Hotel & Tourism Branding', description: 'We understand tourism. Logos and corporate identities that attract guests.' },
      { icon: 'palette', title: 'Graphic Design for All Channels', description: 'Print, web, social media, signage – consistent design.' },
      { icon: 'globe', title: 'Multilingual Communication', description: 'Marketing materials for German, Italian and English-speaking guests.' },
      { icon: 'zap', title: 'Digital & Print Integration', description: 'From brochures to websites to signage – all from one source.' },
    ],
    results: [
      { metric: '95%', label: 'Brand Recognition', detail: 'After rebrand campaign' },
      { metric: '+45%', label: 'Engagement', detail: 'Through consistent design' },
    ],
    packages: [
      { name: 'Logo & Branding Starter', price: '2,490', priceType: 'one-time', description: 'Logo design and color scheme.', popular: false, features: ['Logo Design', 'Color Scheme', 'Basic Brand Guidelines'] },
      { name: 'Complete Corporate Identity', price: '5,990', priceType: 'one-time', description: 'Complete branding package.', popular: true, features: ['Full Branding', 'Brand Guidelines', 'Print Materials', 'Web Design System'] },
      { name: 'Rebranding with Campaign', price: '9,990', priceType: 'one-time', description: 'Complete rebranding with launch campaign.', popular: false, features: ['New Brand Design', 'Comprehensive Guidelines', 'All Print Materials', 'Launch Campaign'] },
    ],
    process: [
      { step: '01', title: 'Kickoff & Strategy', description: 'On-site in Innsbruck: Your goals and target audience.' },
      { step: '02', title: 'Creative Concepts', description: '3-5 design options to choose from.' },
      { step: '03', title: 'Refinement', description: 'Finalization and brand guidelines.' },
      { step: '04', title: 'Implementation', description: 'Print, web and social media design.' },
      { step: '05', title: 'Launch Support', description: 'Introduction and after-launch support.' },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Illustrator'],
    faqs: [
      { question: 'How long does a branding project take?', answer: 'Typically 8-12 weeks. Complex rebranding: up to 16 weeks.' },
      { question: 'Can you be on-site in Innsbruck?', answer: 'Yes! Kickoff and important milestones happen on-site. Regular meetings are remote via Zoom.' },
    ],
    relatedServices: [
      { title: 'Web Design Innsbruck', description: 'Website consistent with your branding.', href: '/standorte/innsbruck/webdesign' as any },
      { title: 'Digital Agency Innsbruck', description: 'All services for tourism.', href: '/standorte/innsbruck' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages for Innsbruck',
      faqTitle: 'Advertising Agency Innsbruck – FAQ',
      ctaTitle: 'Ready for professional branding?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/innsbruck/werbeagentur')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/innsbruck/werbeagentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortInnsbruckWerbeagenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Werbeagentur Innsbruck' : 'Advertising Agency Innsbruck',
    cityName: 'Innsbruck',
    cityType: 'City',
    url: '/standorte/innsbruck/werbeagentur',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'Innsbruck', url: 'https://goldenwing.at/standorte/innsbruck' },
      { name: locale === 'de' ? 'Werbeagentur' : 'Advertising Agency', url: 'https://goldenwing.at/standorte/innsbruck/werbeagentur' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur Innsbruck', href: '/standorte/innsbruck' },
        { text: 'Branding Leistungen', href: '/leistungen/branding' },
        { text: 'Design Services', href: '/leistungen/design' },
      ]
    : [
        { text: 'Digital Agency Innsbruck', href: '/locations/innsbruck' },
        { text: 'Branding Services', href: '/services/branding' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
