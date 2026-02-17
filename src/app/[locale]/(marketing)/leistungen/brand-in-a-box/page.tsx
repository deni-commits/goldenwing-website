/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }]
}

export const revalidate = 3600

const seoData = {
  de: {
    title: 'Brand in a Box Wien | Komplettes Branding-Paket | GoldenWing',
    description: 'Brand in a Box: Logo, Brand Guidelines, Business Cards, Social Media Kit, Website — alles in einem Paket. Fixpreis, schnelle Umsetzung, professionelles Branding ab €4.990.',
    keywords: ['Brand in a Box', 'Branding Paket', 'Corporate Design', 'Logo Design', 'Brand Identity', 'Branding Agentur Wien'],
  },
  en: {
    title: 'Brand in a Box Vienna | Complete Branding Package | GoldenWing',
    description: 'Brand in a Box: Logo, brand guidelines, business cards, social media kit, website — all in one package. Fixed price, fast delivery, professional branding from €4,990.',
    keywords: ['Brand in a Box', 'Branding Package', 'Corporate Design', 'Logo Design', 'Brand Identity', 'Branding Agency Vienna'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Brand in a Box',
      title: 'Ihre Marke. Komplett. Sofort einsatzbereit.',
      description: 'Alles was Sie für einen professionellen Markenauftritt brauchen — in einem Paket. Logo, Brand Guidelines, alle Assets. Fixpreis, keine Überraschungen.',
      ctaPrimary: 'Branding-Projekt starten',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'zap', text: 'Live in 4 Wochen' },
      { icon: 'check-circle', text: 'Fixpreis-Garantie' },
      { icon: 'award', text: '120+ Brands erstellt' },
      { icon: 'users', text: 'Dediziertes Team' },
    ],
    benefits: [
      {
        icon: 'package',
        title: 'Alles in einem Paket',
        description: 'Logo, Brand Guidelines, Geschäftsausstattung, Social Media Assets, Website — Sie bekommen alles, was Sie brauchen. Kein Stückwerk.',
      },
      {
        icon: 'dollar-sign',
        title: 'Fixpreis, keine Überraschungen',
        description: 'Sie wissen von Anfang an, was es kostet. Keine versteckten Gebühren, keine Nachträge, keine Überraschungen.',
      },
      {
        icon: 'clock',
        title: 'Schnelle Umsetzung',
        description: 'Von Briefing bis Delivery in 4-6 Wochen. Klare Timelines, strukturierter Prozess, pünktliche Lieferung.',
      },
      {
        icon: 'users',
        title: 'Dediziertes Branding-Team',
        description: 'Strategist, Designer, Copywriter — ein erfahrenes Team arbeitet an Ihrer Marke. Über 120 Brands erfolgreich entwickelt.',
      },
      {
        icon: 'file-text',
        title: 'Professionelle Brand Guidelines',
        description: 'Umfassendes Brand Manual: Logo-Nutzung, Farben, Typografie, Bildsprache, Tone of Voice — damit jeder Ihre Marke richtig umsetzt.',
      },
      {
        icon: 'shield',
        title: 'Markenrechtlich sicher',
        description: 'Vorab-Check auf Ähnlichkeiten, Empfehlungen zur Markenschutz-Registrierung. Sie investieren in eine Marke, die schützbar ist.',
      },
    ],
    results: [
      { metric: '120+', label: 'Brands entwickelt', detail: 'Seit 2019' },
      { metric: '4-6 Wochen', label: 'Time to Market', detail: 'Von Briefing bis Delivery' },
      { metric: '100%', label: 'Eigentumsrechte', detail: 'Alle Dateien gehören Ihnen' },
    ],
    packages: [
      {
        name: 'STARTER',
        price: '4.990',
        priceType: 'einmalig',
        description: 'Perfekt für Startups & kleine Unternehmen.',
        popular: false,
        features: [
          'Logo Design (3 Konzepte)',
          '2 Revision-Runden',
          'Basic Brand Guidelines (15 Seiten PDF)',
          'Farbpalette & Typografie',
          'Logo-Varianten (Standard, Icon, Schwarz/Weiß)',
          'Visitenkarten-Design',
          'Social Media Templates (5 Designs)',
          'E-Mail-Signatur-Template',
          'Alle Dateien (AI, PDF, PNG, SVG)',
        ],
      },
      {
        name: 'PROFESSIONAL',
        price: '9.990',
        priceType: 'einmalig',
        description: 'Für Unternehmen, die professionell auftreten wollen.',
        popular: true,
        features: [
          'Alles aus STARTER',
          'Logo Design (5 Konzepte)',
          '3 Revision-Runden',
          'Erweiterte Brand Guidelines (30+ Seiten)',
          'Geschäftsausstattung (Visitenkarten, Briefpapier, Präsentationen)',
          'Social Media Kit (20+ Templates)',
          'Bildwelt-Konzept & Stock-Foto-Auswahl',
          'Tone of Voice Guide',
          'Icon-Set (10 Custom Icons)',
          'One-Page Website Design',
        ],
      },
      {
        name: 'PREMIUM',
        price: '19.990',
        priceType: 'einmalig',
        description: 'Für Marken, die Eindruck hinterlassen.',
        popular: false,
        features: [
          'Alles aus PROFESSIONAL',
          'Strategic Brand Workshop (2 Tage)',
          'Umfassende Brand-Strategie',
          'Wettbewerber-Analyse',
          'Zielgruppen-Research',
          'Brand Positioning & Messaging Framework',
          'Custom Illustrations/Photography',
          'Komplettes Marketing-Collateral',
          'Website Design & Entwicklung (bis 10 Seiten)',
          '3 Monate Brand-Support nach Launch',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Discovery Workshop', description: 'Wir tauchen tief ein: Ihre Vision, Ziele, Zielgruppe, Wettbewerb, Positionierung. Daraus entwickeln wir die strategische Basis für Ihre Marke.' },
      { step: '02', title: 'Konzept & Moodboards', description: 'Basierend auf dem Workshop entwickeln wir 3-5 Designrichtungen. Sie wählen die Richtung, die am besten passt.' },
      { step: '03', title: 'Design & Iteration', description: 'Wir arbeiten die gewählte Richtung im Detail aus. Logo, Farben, Typografie, Bildsprache — alles kommt zusammen.' },
      { step: '04', title: 'Brand Guidelines', description: 'Wir dokumentieren alles in einem professionellen Brand Manual. Damit kann jeder Ihre Marke korrekt umsetzen.' },
      { step: '05', title: 'Delivery & Launch', description: 'Sie bekommen alle Dateien, Assets und Guidelines. Optional: Launch-Support für die ersten 3 Monate.' },
    ],
    technologies: ['Adobe Illustrator', 'Figma', 'Adobe Photoshop', 'Adobe InDesign', 'Miro', 'FigJam', 'Canva', 'Brand.ai'],
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen den Paketen?',
        answer: 'STARTER: Fokus auf Logo & Basics, perfekt für Startups. PROFESSIONAL: Vollständiges Brand-System inkl. Geschäftsausstattung & Social Media, ideal für etablierte Unternehmen. PREMIUM: Strategic Branding inkl. Workshop, Research, Website — für Unternehmen, die eine langfristige Markenstrategie aufbauen wollen.',
      },
      {
        question: 'Wie lange dauert der Prozess?',
        answer: 'STARTER: 4 Wochen. PROFESSIONAL: 5-6 Wochen. PREMIUM: 8-10 Wochen (inkl. Website). Die Dauer hängt auch von Ihrem Feedback-Timing ab.',
      },
      {
        question: 'Kann ich Änderungen verlangen?',
        answer: 'Ja! Jedes Paket inkludiert Revision-Runden. STARTER: 2 Runden. PROFESSIONAL: 3 Runden. PREMIUM: 4 Runden. Extra-Runden: €500/Runde.',
      },
      {
        question: 'Bekomme ich alle Dateien?',
        answer: 'Ja! Sie erhalten alle Quelldateien (AI, PSD, Figma) und Export-Formate (PDF, PNG, SVG, JPG). Alle Nutzungsrechte gehören Ihnen.',
      },
      {
        question: 'Was ist, wenn mir das Design nicht gefällt?',
        answer: 'Wir arbeiten iterativ und holen nach jedem Schritt Feedback ein. Wenn Ihnen die erste Konzept-Runde nicht gefällt, entwickeln wir neue Richtungen. 98% unserer Kunden sind nach 2 Runden zufrieden.',
      },
      {
        question: 'Ist Markenschutz inkludiert?',
        answer: 'Wir prüfen vorab auf Ähnlichkeiten und geben Empfehlungen. Die tatsächliche Markenanmeldung (€300-1.500 je nach Land) ist nicht inkludiert, aber wir unterstützen dabei.',
      },
    ],
    relatedServices: [
      { title: 'Website as a Service', description: 'Monatliche Website-Betreuung.', href: '/leistungen/website-as-a-service' as any },
      { title: 'Webdesign', description: 'Website Design & Entwicklung.', href: '/leistungen/webdesign' as any },
      { title: 'Branding', description: 'Einmaliges Branding-Projekt.', href: '/leistungen/branding' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Branding-Pakete',
      pricingDescription: 'Fixpreis, professionell, schnell.',
      faqTitle: 'Häufige Fragen zu Brand in a Box',
      faqSubtitle: 'Alles über unser Branding-Paket.',
      ctaTitle: 'Bereit für Ihre neue Marke?',
      ctaDescription: 'Kostenloses Erstgespräch: Wir zeigen Ihnen Beispiele und besprechen, welches Paket zu Ihnen passt.',
      ctaButton: 'Branding-Projekt starten',
    },
  },
  en: {
    hero: {
      badge: 'Brand in a Box',
      title: 'Your Brand. Complete. Ready to Launch.',
      description: 'Everything you need for a professional brand presence — in one package. Logo, brand guidelines, all assets. Fixed price, no surprises.',
      ctaPrimary: 'Start Branding Project',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'zap', text: 'Live in 4 Weeks' },
      { icon: 'check-circle', text: 'Fixed-Price Guarantee' },
      { icon: 'award', text: '120+ Brands Created' },
      { icon: 'users', text: 'Dedicated Team' },
    ],
    benefits: [
      { icon: 'package', title: 'All in One Package', description: 'Logo, brand guidelines, business stationery, social media assets, website — you get everything you need. No piecemeal.' },
      { icon: 'dollar-sign', title: 'Fixed Price, No Surprises', description: 'You know from the start what it costs. No hidden fees, no add-ons, no surprises.' },
      { icon: 'clock', title: 'Fast Delivery', description: 'From briefing to delivery in 4-6 weeks. Clear timelines, structured process, on-time delivery.' },
      { icon: 'users', title: 'Dedicated Branding Team', description: 'Strategist, designer, copywriter — an experienced team works on your brand. Over 120 brands successfully developed.' },
      { icon: 'file-text', title: 'Professional Brand Guidelines', description: 'Comprehensive brand manual: logo usage, colors, typography, imagery, tone of voice — so everyone implements your brand correctly.' },
      { icon: 'shield', title: 'Trademark Safe', description: 'Pre-check for similarities, recommendations for trademark registration. You invest in a brand that can be protected.' },
    ],
    results: [
      { metric: '120+', label: 'Brands Developed', detail: 'Since 2019' },
      { metric: '4-6 Weeks', label: 'Time to Market', detail: 'From briefing to delivery' },
      { metric: '100%', label: 'Ownership Rights', detail: 'All files belong to you' },
    ],
    packages: [
      { name: 'STARTER', price: '4,990', priceType: 'one-time', description: 'Perfect for startups & small businesses.', popular: false, features: ['Logo design (3 concepts)', '2 revision rounds', 'Basic brand guidelines (15 pages PDF)', 'Color palette & typography', 'Logo variants (standard, icon, B&W)', 'Business card design', 'Social media templates (5 designs)', 'Email signature template', 'All files (AI, PDF, PNG, SVG)'] },
      { name: 'PROFESSIONAL', price: '9,990', priceType: 'one-time', description: 'For companies that want to appear professional.', popular: true, features: ['Everything from STARTER', 'Logo design (5 concepts)', '3 revision rounds', 'Extended brand guidelines (30+ pages)', 'Business stationery (cards, letterhead, presentations)', 'Social media kit (20+ templates)', 'Image concept & stock photo selection', 'Tone of voice guide', 'Icon set (10 custom icons)', 'One-page website design'] },
      { name: 'PREMIUM', price: '19,990', priceType: 'one-time', description: 'For brands that make an impression.', popular: false, features: ['Everything from PROFESSIONAL', 'Strategic brand workshop (2 days)', 'Comprehensive brand strategy', 'Competitor analysis', 'Target audience research', 'Brand positioning & messaging framework', 'Custom illustrations/photography', 'Complete marketing collateral', 'Website design & development (up to 10 pages)', '3 months brand support after launch'] },
    ],
    process: [
      { step: '01', title: 'Discovery Workshop', description: 'We dive deep: your vision, goals, target audience, competition, positioning. From this, we develop the strategic foundation for your brand.' },
      { step: '02', title: 'Concept & Moodboards', description: 'Based on the workshop, we develop 3-5 design directions. You choose the direction that fits best.' },
      { step: '03', title: 'Design & Iteration', description: 'We work out the chosen direction in detail. Logo, colors, typography, imagery — everything comes together.' },
      { step: '04', title: 'Brand Guidelines', description: 'We document everything in a professional brand manual. So anyone can implement your brand correctly.' },
      { step: '05', title: 'Delivery & Launch', description: 'You receive all files, assets and guidelines. Optional: launch support for the first 3 months.' },
    ],
    technologies: ['Adobe Illustrator', 'Figma', 'Adobe Photoshop', 'Adobe InDesign', 'Miro', 'FigJam', 'Canva', 'Brand.ai'],
    faqs: [
      { question: 'What is the difference between packages?', answer: 'STARTER: Focus on logo & basics, perfect for startups. PROFESSIONAL: Complete brand system incl. business stationery & social media, ideal for established businesses. PREMIUM: Strategic branding incl. workshop, research, website — for companies building a long-term brand strategy.' },
      { question: 'How long does the process take?', answer: 'STARTER: 4 weeks. PROFESSIONAL: 5-6 weeks. PREMIUM: 8-10 weeks (incl. website). Duration also depends on your feedback timing.' },
      { question: 'Can I request changes?', answer: 'Yes! Each package includes revision rounds. STARTER: 2 rounds. PROFESSIONAL: 3 rounds. PREMIUM: 4 rounds. Extra rounds: €500/round.' },
      { question: 'Do I get all files?', answer: 'Yes! You receive all source files (AI, PSD, Figma) and export formats (PDF, PNG, SVG, JPG). All usage rights belong to you.' },
      { question: 'What if I don\'t like the design?', answer: 'We work iteratively and collect feedback after each step. If you don\'t like the first concept round, we develop new directions. 98% of our clients are satisfied after 2 rounds.' },
    ],
    relatedServices: [
      { title: 'Website as a Service', description: 'Monthly website management.', href: '/services/website-as-a-service' as any },
      { title: 'Web Design', description: 'Website design & development.', href: '/services/web-design' as any },
      { title: 'Branding', description: 'One-time branding project.', href: '/services/branding' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Branding Packages',
      pricingDescription: 'Fixed price, professional, fast.',
      faqTitle: 'Brand in a Box FAQ',
      faqSubtitle: 'Everything about our branding package.',
      ctaTitle: 'Ready for Your New Brand?',
      ctaDescription: 'Free consultation: We show you examples and discuss which package suits you.',
      ctaButton: 'Start Branding Project',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/brand-in-a-box'
  const hreflangAlternates = getHreflangAlternates(basePath)

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl(basePath, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function BrandInABoxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: 'Brand in a Box',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/brand-in-a-box',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'Brand in a Box', url: 'https://goldenwing.at/leistungen/brand-in-a-box' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
