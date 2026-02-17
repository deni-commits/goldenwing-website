import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import type { LandingPageContent, LandingPageSEO, ContextualLink } from '@/components/templates/landing-page'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContentLocale } from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// ---------------------------------------------------------------------------
// Content — Hero
// ---------------------------------------------------------------------------
const heroContent = {
  de: {
    badge: 'E-Mail Marketing Agentur Wien',
    title: 'E-Mail Marketing das verkauft — Mehr Umsatz durch personalisierte Kommunikation',
    description:
      'Professionelles E-Mail Marketing steigert Ihren Umsatz messbar. Unsere Wiener Agentur entwickelt personalisierte Newsletter-Kampagnen, automatisierte E-Mail-Sequenzen und datenbasierte Strategien, die durchschnittlich +35 % höhere Öffnungsraten und +180 % mehr Conversions erzielen — DSGVO-konform und mit transparentem Reporting.',
    ctaPrimary: 'Kostenloses Erstgespräch',
    ctaSecondary: 'Unsere Pakete',
  },
  en: {
    badge: 'Email Marketing Agency Vienna',
    title: 'Email Marketing That Sells — More Revenue Through Personalized Communication',
    description:
      'Professional email marketing measurably increases your revenue. Our Vienna-based agency develops personalized newsletter campaigns, automated email sequences, and data-driven strategies that achieve an average of +35% higher open rates and +180% more conversions — GDPR compliant with transparent reporting.',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'Our Packages',
  },
} as const

// ---------------------------------------------------------------------------
// Trust Signals (4)
// ---------------------------------------------------------------------------
const trustSignals = {
  de: [
    { icon: 'award', text: 'Über 47 erfolgreiche Projekte' },
    { icon: 'trending-up', text: 'Durchschnittlich +35% Öffnungsrate' },
    { icon: 'shield', text: 'DSGVO-konform' },
    { icon: 'star', text: 'Zertifizierte Spezialisten' },
  ],
  en: [
    { icon: 'award', text: 'Over 47 successful projects' },
    { icon: 'trending-up', text: 'Average +35% open rate' },
    { icon: 'shield', text: 'GDPR compliant' },
    { icon: 'star', text: 'Certified specialists' },
  ],
} as const

// ---------------------------------------------------------------------------
// Benefits (6)
// ---------------------------------------------------------------------------
const benefits = {
  de: [
    { icon: 'target', title: 'Personalisierte Kampagnen', description: 'Individuelle E-Mail-Inhalte basierend auf Nutzerverhalten, Interessen und Kaufhistorie für maximale Relevanz.' },
    { icon: 'zap', title: 'Marketing Automation', description: 'Automatisierte E-Mail-Sequenzen für Onboarding, Warenkorbabbrecher und Re-Engagement — rund um die Uhr aktiv.' },
    { icon: 'bar-chart-3', title: 'Datenbasierte Optimierung', description: 'Kontinuierliche A/B-Tests, Heatmap-Analysen und Performance-Tracking für stetig steigende Kennzahlen.' },
    { icon: 'shield', title: 'DSGVO-Konformität', description: 'Rechtskonformes E-Mail Marketing mit Double-Opt-in, Abmeldelinks und datenschutzkonformer Verarbeitung.' },
    { icon: 'users', title: 'Segmentierung', description: 'Präzise Zielgruppen-Segmentierung nach Demografie, Verhalten und Engagement für höhere Conversion-Raten.' },
    { icon: 'trending-up', title: 'Messbare Ergebnisse', description: 'Transparentes Reporting mit Öffnungsraten, Klickraten, Conversions und ROI — Sie sehen genau, was wirkt.' },
  ],
  en: [
    { icon: 'target', title: 'Personalized Campaigns', description: 'Individual email content based on user behavior, interests, and purchase history for maximum relevance.' },
    { icon: 'zap', title: 'Marketing Automation', description: 'Automated email sequences for onboarding, cart abandonment, and re-engagement — active around the clock.' },
    { icon: 'bar-chart-3', title: 'Data-Driven Optimization', description: 'Continuous A/B testing, heatmap analyses, and performance tracking for steadily improving metrics.' },
    { icon: 'shield', title: 'GDPR Compliance', description: 'Legally compliant email marketing with double opt-in, unsubscribe links, and privacy-compliant processing.' },
    { icon: 'users', title: 'Segmentation', description: 'Precise audience segmentation by demographics, behavior, and engagement for higher conversion rates.' },
    { icon: 'trending-up', title: 'Measurable Results', description: 'Transparent reporting with open rates, click rates, conversions, and ROI — see exactly what works.' },
  ],
} as const

// ---------------------------------------------------------------------------
// Results (3)
// ---------------------------------------------------------------------------
const results = {
  de: [
    { metric: '+35%', label: 'Höhere Öffnungsrate', detail: 'Durch personalisierte Betreffzeilen und optimales Timing' },
    { metric: '+180%', label: 'Mehr Conversions', detail: 'Durch gezielte Segmentierung und Automation' },
    { metric: '4.200%', label: 'ROI im Durchschnitt', detail: 'E-Mail Marketing liefert den höchsten Return on Investment' },
  ],
  en: [
    { metric: '+35%', label: 'Higher open rate', detail: 'Through personalized subject lines and optimal timing' },
    { metric: '+180%', label: 'More conversions', detail: 'Through targeted segmentation and automation' },
    { metric: '4,200%', label: 'Average ROI', detail: 'Email marketing delivers the highest return on investment' },
  ],
} as const

// ---------------------------------------------------------------------------
// Services (6)
// ---------------------------------------------------------------------------
const services = {
  de: [
    { icon: 'file-text', title: 'Newsletter Design & Erstellung', description: 'Professionell gestaltete, responsive Newsletter-Templates, die Ihre Marke widerspiegeln und auf allen Geräten perfekt aussehen.' },
    { icon: 'zap', title: 'Marketing Automation', description: 'Automatisierte E-Mail-Workflows für Welcome-Serien, Warenkorbabbrecher, Geburtstags-Mails und Re-Engagement-Kampagnen.' },
    { icon: 'target', title: 'A/B Testing & Optimierung', description: 'Systematische Tests von Betreffzeilen, Inhalten, Versandzeiten und CTAs für kontinuierlich bessere Performance.' },
    { icon: 'users', title: 'Zielgruppen-Segmentierung', description: 'Intelligente Aufteilung Ihrer Empfänger nach Verhalten, Interessen und Engagement für relevantere Kommunikation.' },
    { icon: 'bar-chart-3', title: 'Reporting & Analytics', description: 'Detaillierte Auswertungen mit Öffnungsraten, Klickraten, Conversion-Tracking und Revenue-Attribution.' },
    { icon: 'settings', title: 'Kampagnen-Management', description: 'Vollständige Planung, Erstellung und Steuerung Ihrer E-Mail-Kampagnen — Sie lehnen sich zurück, wir liefern.' },
  ],
  en: [
    { icon: 'file-text', title: 'Newsletter Design & Creation', description: 'Professionally designed, responsive newsletter templates that reflect your brand and look perfect on all devices.' },
    { icon: 'zap', title: 'Marketing Automation', description: 'Automated email workflows for welcome series, cart abandonment, birthday emails, and re-engagement campaigns.' },
    { icon: 'target', title: 'A/B Testing & Optimization', description: 'Systematic testing of subject lines, content, send times, and CTAs for continuously improving performance.' },
    { icon: 'users', title: 'Audience Segmentation', description: 'Intelligent segmentation of your recipients by behavior, interests, and engagement for more relevant communication.' },
    { icon: 'bar-chart-3', title: 'Reporting & Analytics', description: 'Detailed analytics with open rates, click rates, conversion tracking, and revenue attribution.' },
    { icon: 'settings', title: 'Campaign Management', description: 'Complete planning, creation, and management of your email campaigns — you sit back, we deliver.' },
  ],
} as const

// ---------------------------------------------------------------------------
// Packages (3)
// ---------------------------------------------------------------------------
const packages = {
  de: [
    {
      name: 'Starter',
      price: '490',
      priceType: 'pro Monat',
      description: 'Ideal für den Einstieg ins professionelle E-Mail Marketing',
      popular: false,
      features: [
        'Newsletter Design',
        'Bis zu 2 Kampagnen/Monat',
        'Basis-Segmentierung',
        'Monatliches Reporting',
        'Template-Erstellung',
        'List Management',
      ],
    },
    {
      name: 'Business',
      price: '990',
      priceType: 'pro Monat',
      description: 'Für Unternehmen, die E-Mail Marketing skalieren möchten',
      popular: true,
      features: [
        'Alles aus Starter',
        'Bis zu 6 Kampagnen/Monat',
        'Marketing Automation',
        'A/B Testing',
        'Erweiterte Segmentierung',
        'Detailliertes Reporting',
        'Landing Pages',
      ],
    },
    {
      name: 'Enterprise',
      price: '1.990+',
      priceType: 'pro Monat',
      description: 'Maßgeschneiderte E-Mail-Strategie für maximalen ROI',
      popular: false,
      features: [
        'Alles aus Business',
        'Unbegrenzte Kampagnen',
        'Dedizierter Account Manager',
        'Custom Integrationen',
        'Conversion-Optimierung',
        'Predictive Analytics',
        'Priority Support',
      ],
    },
  ],
  en: [
    {
      name: 'Starter',
      price: '490',
      priceType: 'per month',
      description: 'Ideal for getting started with professional email marketing',
      popular: false,
      features: [
        'Newsletter design',
        'Up to 2 campaigns/month',
        'Basic segmentation',
        'Monthly reporting',
        'Template creation',
        'List management',
      ],
    },
    {
      name: 'Business',
      price: '990',
      priceType: 'per month',
      description: 'For companies looking to scale email marketing',
      popular: true,
      features: [
        'Everything in Starter',
        'Up to 6 campaigns/month',
        'Marketing automation',
        'A/B testing',
        'Advanced segmentation',
        'Detailed reporting',
        'Landing pages',
      ],
    },
    {
      name: 'Enterprise',
      price: '1,990+',
      priceType: 'per month',
      description: 'Custom email strategy for maximum ROI',
      popular: false,
      features: [
        'Everything in Business',
        'Unlimited campaigns',
        'Dedicated account manager',
        'Custom integrations',
        'Conversion optimization',
        'Predictive analytics',
        'Priority support',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Process (5 steps)
// ---------------------------------------------------------------------------
const processSteps = {
  de: [
    { step: '01', title: 'Analyse & Strategie', description: 'Wir analysieren Ihre Zielgruppe, bestehende Daten und Ziele, um eine maßgeschneiderte E-Mail-Marketing-Strategie zu entwickeln.' },
    { step: '02', title: 'Setup & Integration', description: 'Einrichtung der E-Mail-Plattform, Import bestehender Listen und Integration mit Ihrem CRM, Shop oder CMS.' },
    { step: '03', title: 'Design & Content', description: 'Erstellung professioneller Templates und überzeugender Inhalte, die Ihre Marke widerspiegeln und konvertieren.' },
    { step: '04', title: 'Automation & Launch', description: 'Aufbau automatisierter Workflows, Segmentierung der Empfänger und Start der ersten Kampagnen.' },
    { step: '05', title: 'Optimierung & Reporting', description: 'Kontinuierliche A/B-Tests, Analyse der Ergebnisse und datenbasierte Optimierung für stetig bessere Performance.' },
  ],
  en: [
    { step: '01', title: 'Analysis & Strategy', description: 'We analyze your target audience, existing data, and goals to develop a tailored email marketing strategy.' },
    { step: '02', title: 'Setup & Integration', description: 'Setup of the email platform, import of existing lists, and integration with your CRM, shop, or CMS.' },
    { step: '03', title: 'Design & Content', description: 'Creation of professional templates and compelling content that reflects your brand and converts.' },
    { step: '04', title: 'Automation & Launch', description: 'Building automated workflows, segmenting recipients, and launching the first campaigns.' },
    { step: '05', title: 'Optimization & Reporting', description: 'Continuous A/B testing, result analysis, and data-driven optimization for steadily improving performance.' },
  ],
} as const

// ---------------------------------------------------------------------------
// FAQs (8)
// ---------------------------------------------------------------------------
const faqs = {
  de: [
    {
      question: 'Was kostet E-Mail Marketing?',
      answer: 'Unsere Pakete beginnen bei €490 pro Monat für das Starter-Paket mit bis zu 2 Kampagnen. Das Business-Paket mit Automation und A/B Testing liegt bei €990/Monat. Für maßgeschneiderte Enterprise-Lösungen starten die Preise ab €1.990/Monat. Die genauen Kosten hängen von Listengröße, Kampagnenfrequenz und gewünschten Features ab.',
    },
    {
      question: 'Wie schnell sehe ich Ergebnisse?',
      answer: 'Erste Verbesserungen bei Öffnungs- und Klickraten sind bereits nach 2–4 Wochen sichtbar. Signifikante Umsatzsteigerungen durch Automation und Segmentierung zeigen sich typischerweise nach 2–3 Monaten. Langfristig wachsen die Ergebnisse durch kontinuierliche Optimierung stetig weiter.',
    },
    {
      question: 'Welche Tools verwenden Sie?',
      answer: 'Wir arbeiten mit allen gängigen E-Mail-Marketing-Plattformen: Mailchimp, Klaviyo, ActiveCampaign, HubSpot, Brevo (ehemals Sendinblue) und weitere. Die Tool-Empfehlung richtet sich nach Ihren Anforderungen, bestehender Infrastruktur und Budget.',
    },
    {
      question: 'Ist E-Mail Marketing noch relevant?',
      answer: 'Absolut. E-Mail Marketing liefert mit durchschnittlich 4.200 % ROI den höchsten Return on Investment aller Marketing-Kanäle. Im Gegensatz zu Social Media gehört Ihnen die E-Mail-Liste — Sie sind unabhängig von Algorithmus-Änderungen und erreichen Ihre Zielgruppe direkt.',
    },
    {
      question: 'Wie steigern Sie die Öffnungsrate?',
      answer: 'Durch eine Kombination bewährter Methoden: personalisierte Betreffzeilen, optimale Versandzeiten basierend auf Empfängerverhalten, Absendernamen-Optimierung, Vorschautext-Optimierung und kontinuierliche A/B-Tests. Unsere Kunden erreichen durchschnittlich 35 % höhere Öffnungsraten.',
    },
    {
      question: 'Können Sie mein bestehendes System übernehmen?',
      answer: 'Ja, wir übernehmen und optimieren bestehende E-Mail-Marketing-Setups. Wir führen zunächst ein Audit durch, identifizieren Verbesserungspotenziale und implementieren Optimierungen schrittweise — ohne laufende Kampagnen zu unterbrechen.',
    },
    {
      question: 'Was ist Marketing Automation?',
      answer: 'Marketing Automation sind automatisch ausgelöste E-Mail-Sequenzen basierend auf Nutzeraktionen. Beispiele: Welcome-Serie nach Anmeldung, Warenkorbabbrecher-Mails, Geburtstags-Angebote oder Re-Engagement-Kampagnen bei Inaktivität. Diese laufen 24/7 und generieren Umsatz, während Sie schlafen.',
    },
    {
      question: 'Ist das DSGVO-konform?',
      answer: 'Selbstverständlich. Alle unsere E-Mail-Kampagnen sind vollständig DSGVO-konform: Double-Opt-in-Verfahren, rechtskonforme Abmeldelinks, datenschutzkonforme Verarbeitung und Speicherung. Wir beraten Sie auch bei der rechtskonformen Gestaltung Ihrer Einwilligungsprozesse.',
    },
  ],
  en: [
    {
      question: 'How much does email marketing cost?',
      answer: 'Our packages start at \u20ac490 per month for the Starter package with up to 2 campaigns. The Business package with automation and A/B testing is \u20ac990/month. Custom Enterprise solutions start from \u20ac1,990/month. Exact costs depend on list size, campaign frequency, and desired features.',
    },
    {
      question: 'How quickly will I see results?',
      answer: 'Initial improvements in open and click rates are visible within 2\u20134 weeks. Significant revenue increases through automation and segmentation typically show after 2\u20133 months. Long-term, results continue to grow through continuous optimization.',
    },
    {
      question: 'Which tools do you use?',
      answer: 'We work with all major email marketing platforms: Mailchimp, Klaviyo, ActiveCampaign, HubSpot, Brevo (formerly Sendinblue), and more. Our tool recommendation depends on your requirements, existing infrastructure, and budget.',
    },
    {
      question: 'Is email marketing still relevant?',
      answer: 'Absolutely. Email marketing delivers an average ROI of 4,200% \u2014 the highest return on investment of any marketing channel. Unlike social media, you own your email list \u2014 you are independent of algorithm changes and reach your audience directly.',
    },
    {
      question: 'How do you increase open rates?',
      answer: 'Through a combination of proven methods: personalized subject lines, optimal send times based on recipient behavior, sender name optimization, preview text optimization, and continuous A/B testing. Our clients achieve an average of 35% higher open rates.',
    },
    {
      question: 'Can you take over my existing system?',
      answer: 'Yes, we take over and optimize existing email marketing setups. We first conduct an audit, identify areas for improvement, and implement optimizations step by step \u2014 without interrupting running campaigns.',
    },
    {
      question: 'What is marketing automation?',
      answer: 'Marketing automation consists of automatically triggered email sequences based on user actions. Examples: welcome series after signup, cart abandonment emails, birthday offers, or re-engagement campaigns for inactive subscribers. These run 24/7 and generate revenue while you sleep.',
    },
    {
      question: 'Is this GDPR compliant?',
      answer: 'Of course. All our email campaigns are fully GDPR compliant: double opt-in process, legally compliant unsubscribe links, privacy-compliant processing and storage. We also advise you on the legally compliant design of your consent processes.',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// Related Services (3)
// ---------------------------------------------------------------------------
const relatedServices = {
  de: [
    {
      title: 'Digital Marketing',
      description: 'Ganzheitliche digitale Marketingstrategien für nachhaltiges Wachstum.',
      href: '/leistungen/digital-marketing' as StaticAppPathname,
    },
    {
      title: 'SEO Agentur Wien',
      description: 'Professionelle Suchmaschinenoptimierung für mehr organische Sichtbarkeit.',
      href: '/seo-agentur-wien' as StaticAppPathname,
    },
    {
      title: 'Content Marketing',
      description: 'Strategische Inhalte, die Ihre Zielgruppe ansprechen und konvertieren.',
      href: '/leistungen/seo-content' as StaticAppPathname,
    },
  ],
  en: [
    {
      title: 'Digital Marketing',
      description: 'Holistic digital marketing strategies for sustainable growth.',
      href: '/leistungen/digital-marketing' as StaticAppPathname,
    },
    {
      title: 'SEO Agency Vienna',
      description: 'Professional search engine optimization for more organic visibility.',
      href: '/seo-agentur-wien' as StaticAppPathname,
    },
    {
      title: 'Content Marketing',
      description: 'Strategic content that engages your audience and converts.',
      href: '/leistungen/seo-content' as StaticAppPathname,
    },
  ],
} as const satisfies Record<'de' | 'en', Array<{ title: string; description: string; href: StaticAppPathname }>>

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------
const sectionLabels = {
  de: {
    pricingTitle: 'Transparente E-Mail Marketing Pakete',
    pricingDescription: 'Klare Leistungen, faire Preise — wählen Sie das Paket, das zu Ihren Zielen passt.',
    processTitle: 'Unser Prozess',
    processSubtitle: 'In 5 Schritten zu erfolgreichem E-Mail Marketing — strukturiert, transparent und ergebnisorientiert.',
    servicesTitle: 'Unsere E-Mail Marketing Leistungen',
    servicesDescription: 'Von Newsletter-Design bis Marketing Automation — alles aus einer Hand.',
    resultsTitle: 'Ergebnisse, die überzeugen',
    faqTitle: 'Häufige Fragen zum E-Mail Marketing',
    faqSubtitle: 'Antworten auf die wichtigsten Fragen rund um professionelles E-Mail Marketing.',
    relatedServicesTitle: 'Weitere Leistungen',
    ctaTitle: 'Bereit für E-Mail Marketing, das verkauft?',
    ctaDescription: 'Lassen Sie uns in einem kostenlosen Erstgespräch Ihre E-Mail-Marketing-Strategie besprechen. Unverbindlich und mit konkreten Empfehlungen.',
    ctaButton: 'Kostenloses Erstgespräch vereinbaren',
    popular: 'Beliebt',
    oneTime: 'einmalig',
    sendRequest: 'Anfrage senden',
    learnMore: 'Mehr erfahren',
  },
  en: {
    pricingTitle: 'Transparent Email Marketing Packages',
    pricingDescription: 'Clear services, fair prices — choose the package that fits your goals.',
    processTitle: 'Our Process',
    processSubtitle: 'Successful email marketing in 5 steps — structured, transparent, and results-driven.',
    servicesTitle: 'Our Email Marketing Services',
    servicesDescription: 'From newsletter design to marketing automation — everything from one source.',
    resultsTitle: 'Results That Convince',
    faqTitle: 'Email Marketing FAQ',
    faqSubtitle: 'Answers to the most important questions about professional email marketing.',
    relatedServicesTitle: 'Related Services',
    ctaTitle: 'Ready for Email Marketing That Sells?',
    ctaDescription: 'Let us discuss your email marketing strategy in a free consultation. No obligation, with concrete recommendations.',
    ctaButton: 'Schedule Free Consultation',
    popular: 'Popular',
    oneTime: 'one-time',
    sendRequest: 'Send Request',
    learnMore: 'Learn More',
  },
} as const

// ============================================================================
// Metadata
// ============================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const cl = getContentLocale(locale)

  const metaTitle =
    cl === 'de'
      ? 'E-Mail Marketing Agentur Wien | GoldenWing'
      : 'Email Marketing Agency Vienna | GoldenWing'

  const metaDescription = truncateMetaDescription(
    cl === 'de'
      ? 'E-Mail Marketing Agentur in Wien. \u2713 Newsletter Design \u2713 Marketing Automation \u2713 A/B Testing \u2713 Segmentierung. Mehr Umsatz durch professionelles E-Mail Marketing.'
      : 'Email marketing agency in Vienna. \u2713 Newsletter design \u2713 Marketing automation \u2713 A/B testing \u2713 Segmentation. More revenue through professional email marketing.',
  )

  const hreflangAlternates = getHreflangAlternates('/e-mail-marketing-agentur-wien', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords:
      cl === 'de'
        ? [
            'E-Mail Marketing Agentur',
            'E-Mail Marketing Agentur Wien',
            'Newsletter Agentur Wien',
            'Marketing Automation Wien',
            'E-Mail Kampagnen Wien',
          ]
        : [
            'Email Marketing Agency',
            'Email Marketing Agency Vienna',
            'Newsletter Agency Vienna',
            'Marketing Automation Vienna',
            'Email Campaigns Vienna',
          ],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: getCanonicalUrl('/e-mail-marketing-agentur-wien', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'GoldenWing - E-Mail Marketing Agentur Wien',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/e-mail-marketing-agentur-wien', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

// ============================================================================
// Page Component
// ============================================================================
export default async function EmailMarketingAgenturWienPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const cl = getContentLocale(locale)

  // Build content object
  const content: LandingPageContent = {
    hero: { ...heroContent[cl] },
    trustSignals: [...trustSignals[cl]],
    benefits: [...benefits[cl]],
    results: [...results[cl]],
    services: [...services[cl]],
    packages: packages[cl].map((pkg) => ({ ...pkg, features: [...pkg.features] })),
    process: [...processSteps[cl]],
    faqs: [...faqs[cl]],
    relatedServices: [...relatedServices[cl]],
    labels: { ...sectionLabels[cl] },
  }

  // Build SEO object
  const seo: LandingPageSEO = {
    serviceName: cl === 'de' ? 'E-Mail Marketing' : 'Email Marketing',
    cityName: cl === 'de' ? 'Wien' : 'Vienna',
    url: getCanonicalUrl('/e-mail-marketing-agentur-wien', locale),
    breadcrumbs: [
      {
        name: cl === 'de' ? 'Startseite' : 'Home',
        url: 'https://goldenwing.at',
      },
      {
        name: cl === 'de' ? 'E-Mail Marketing Agentur Wien' : 'Email Marketing Agency Vienna',
        url: `https://goldenwing.at${locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : ''}/e-mail-marketing-agentur-wien`,
      },
    ],
  }

  // Contextual internal links for SEO
  const contextualLinks: ContextualLink[] =
    cl === 'de'
      ? [
          { text: 'E-Mail Marketing Automatisierung', href: '/leistungen/digital-marketing/email-marketing-automatisierung' },
          { text: 'Digital Marketing Leistungen', href: '/leistungen/digital-marketing' },
          { text: 'SEO Agentur Wien', href: '/seo-agentur-wien' },
        ]
      : [
          { text: 'Email Marketing Automation', href: '/services/digital-marketing/email-marketing-automation' },
          { text: 'Digital Marketing Services', href: '/services/digital-marketing' },
          { text: 'SEO Agency Vienna', href: '/seo-agency-vienna' },
        ]

  return (
    <LandingPageTemplate
      locale={locale}
      content={content}
      seo={seo}
      contextualLinks={contextualLinks}
      fullWidth
    />
  )
}
