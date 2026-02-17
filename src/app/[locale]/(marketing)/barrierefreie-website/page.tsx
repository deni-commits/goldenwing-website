import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, CheckCircle, Shield, Eye, Users, Star, Zap, AlertTriangle, Monitor, FileText, Search, Code, TrendingUp, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { ProcessVerticalStepper } from '@/components/process-sections/ProcessVerticalStepper'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl, getContentLocale } from '@/lib/utils'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// ============================================================================
// ICON MAP
// ============================================================================

const iconMap: Record<string, LucideIcon> = {
  'shield': Shield,
  'eye': Eye,
  'users': Users,
  'star': Star,
  'zap': Zap,
  'alert-triangle': AlertTriangle,
  'monitor': Monitor,
  'file-text': FileText,
  'search': Search,
  'code': Code,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
}

// ============================================================================
// CONTENT: HERO
// ============================================================================

const heroContent = {
  de: {
    badge: 'WCAG 2.2 Konform',
    title: 'Barrierefreie Website — Ab 2025 Pflicht für Ihr Unternehmen',
    description: 'Ab dem 28. Juni 2025 verpflichtet der European Accessibility Act (EAA) Unternehmen, ihre digitalen Produkte und Dienstleistungen barrierefrei zu gestalten. Wir machen Ihre Website WCAG 2.2 AA konform — damit Sie gesetzeskonform bleiben, mehr Menschen erreichen und Ihr SEO verbessern.',
    ctaPrimary: 'Barrierefreiheit prüfen lassen',
    ctaSecondary: 'Unsere Pakete',
  },
  en: {
    badge: 'WCAG 2.2 Compliant',
    title: 'Accessible Website — Required for Your Business from 2025',
    description: 'From June 28, 2025, the European Accessibility Act (EAA) requires businesses to make their digital products and services accessible. We make your website WCAG 2.2 AA compliant — keeping you legally compliant, reaching more people, and improving your SEO.',
    ctaPrimary: 'Get an Accessibility Audit',
    ctaSecondary: 'Our Packages',
  },
} as const

// ============================================================================
// CONTENT: URGENCY BANNER
// ============================================================================

const urgencyBanner = {
  de: {
    title: 'European Accessibility Act (EAA)',
    text: 'Ab 28. Juni 2025 müssen digitale Produkte und Dienstleistungen barrierefrei sein. Betrifft: E-Commerce, Banking, E-Books, Ticketing und mehr. Unternehmen, die nicht konform sind, riskieren Abmahnungen und Bußgelder.',
    cta: 'Jetzt Compliance prüfen',
  },
  en: {
    title: 'European Accessibility Act (EAA)',
    text: 'From June 28, 2025, digital products and services must be accessible. Affected sectors: E-Commerce, Banking, E-Books, Ticketing and more. Non-compliant businesses risk legal action and fines.',
    cta: 'Check Compliance Now',
  },
} as const

// ============================================================================
// CONTENT: BENEFITS
// ============================================================================

const benefits = {
  de: [
    { icon: 'shield', title: 'Gesetzliche Pflicht', description: 'Der European Accessibility Act (EAA) und das Barrierefreiheitsstärkungsgesetz (BFSG) verpflichten Unternehmen ab Juni 2025 zur digitalen Barrierefreiheit.' },
    { icon: 'users', title: 'Größere Zielgruppe', description: '15% der Weltbevölkerung lebt mit einer Behinderung. Eine barrierefreie Website erreicht Millionen zusätzlicher Nutzer und erschließt neue Märkte.' },
    { icon: 'search', title: 'Besseres SEO', description: 'Barrierefreie Websites ranken besser bei Google. Semantisches HTML, Alt-Texte und klare Strukturen sind auch SEO-Rankingfaktoren.' },
    { icon: 'star', title: 'Bessere Usability', description: 'Barrierefreiheit verbessert die Nutzererfahrung für ALLE Besucher — schnellere Navigation, klarere Inhalte, bessere Lesbarkeit.' },
    { icon: 'alert-triangle', title: 'Geringeres Rechtsrisiko', description: 'Vermeiden Sie teure Abmahnungen und Klagen. Barrierefreiheitsklagen nehmen in der EU und weltweit rasant zu.' },
    { icon: 'trending-up', title: 'Wettbewerbsvorteil', description: 'Differenzieren Sie sich von Mitbewerbern. Unternehmen mit barrierefreien Websites signalisieren soziale Verantwortung und Modernität.' },
  ],
  en: [
    { icon: 'shield', title: 'Legal Requirement', description: 'The European Accessibility Act (EAA) requires businesses to ensure digital accessibility from June 2025. Non-compliance carries significant penalties.' },
    { icon: 'users', title: 'Larger Audience', description: '15% of the global population lives with a disability. An accessible website reaches millions of additional users and opens new markets.' },
    { icon: 'search', title: 'Better SEO', description: 'Accessible websites rank higher on Google. Semantic HTML, alt texts, and clear structures are also SEO ranking factors.' },
    { icon: 'star', title: 'Better Usability', description: 'Accessibility improves the user experience for ALL visitors — faster navigation, clearer content, better readability.' },
    { icon: 'alert-triangle', title: 'Lower Legal Risk', description: 'Avoid expensive lawsuits and legal action. Accessibility lawsuits are rapidly increasing across the EU and worldwide.' },
    { icon: 'trending-up', title: 'Competitive Advantage', description: 'Differentiate yourself from competitors. Companies with accessible websites signal social responsibility and modernity.' },
  ],
} as const

// ============================================================================
// CONTENT: WCAG 4 PRINCIPLES
// ============================================================================

const wcagPrinciples = {
  de: [
    { icon: 'eye', title: 'Wahrnehmbar', description: 'Alle Inhalte müssen für alle Nutzer wahrnehmbar sein.', items: ['Alt-Texte für Bilder und Grafiken', 'Ausreichende Farbkontraste (mind. 4.5:1)', 'Untertitel für Videos und Audio', 'Skalierbare Schriftgrößen'] },
    { icon: 'monitor', title: 'Bedienbar', description: 'Die gesamte Website muss mit verschiedenen Eingabemethoden bedienbar sein.', items: ['Vollständige Tastaturnavigation', 'Keine Zeitlimits oder Anpassungsmöglichkeiten', 'Sichtbarer Fokus-Indikator', 'Keine Inhalte, die Anfälle auslösen'] },
    { icon: 'file-text', title: 'Verständlich', description: 'Inhalte und Bedienung müssen verständlich sein.', items: ['Klare, einfache Sprache', 'Konsistente Navigation und Layout', 'Hilfreiche Fehlermeldungen', 'Vorhersehbares Verhalten'] },
    { icon: 'code', title: 'Robust', description: 'Inhalte müssen von verschiedenen Technologien interpretiert werden können.', items: ['Semantisches HTML5', 'Korrekte ARIA-Labels und Rollen', 'Kompatibel mit Screenreadern', 'Valider, standardkonformer Code'] },
  ],
  en: [
    { icon: 'eye', title: 'Perceivable', description: 'All content must be perceivable by all users.', items: ['Alt texts for images and graphics', 'Sufficient color contrast (min. 4.5:1)', 'Captions for video and audio', 'Scalable font sizes'] },
    { icon: 'monitor', title: 'Operable', description: 'The entire website must be operable with various input methods.', items: ['Full keyboard navigation', 'No time limits or adjustment options', 'Visible focus indicator', 'No content that triggers seizures'] },
    { icon: 'file-text', title: 'Understandable', description: 'Content and operation must be understandable.', items: ['Clear, simple language', 'Consistent navigation and layout', 'Helpful error messages', 'Predictable behavior'] },
    { icon: 'code', title: 'Robust', description: 'Content must be interpretable by various technologies.', items: ['Semantic HTML5', 'Correct ARIA labels and roles', 'Compatible with screen readers', 'Valid, standards-compliant code'] },
  ],
} as const

// ============================================================================
// CONTENT: SERVICES
// ============================================================================

const services = {
  de: [
    { icon: 'search', title: 'Barrierefreiheits-Audit', description: 'Umfassende Prüfung Ihrer Website nach WCAG 2.2 AA Standards — automatisiert und manuell. Inklusive priorisiertem Maßnahmenkatalog.' },
    { icon: 'code', title: 'WCAG-konforme Entwicklung', description: 'Entwicklung neuer Websites, die von Grund auf barrierefrei sind. Semantisches HTML, ARIA-Labels, Tastaturnavigation und mehr.' },
    { icon: 'zap', title: 'Remediation bestehender Websites', description: 'Wir machen Ihre bestehende Website WCAG 2.2 AA konform — vom Quick Fix bis zur vollständigen Überarbeitung.' },
    { icon: 'users', title: 'Schulung & Training', description: 'Wir schulen Ihr Team in barrierefreier Content-Erstellung, Design-Prinzipien und WCAG-Richtlinien.' },
    { icon: 'shield', title: 'Laufende Überwachung', description: 'Kontinuierliches Monitoring Ihrer Website auf Barrierefreiheitsprobleme. Regelmäßige Reports und proaktive Fehlerbehebung.' },
  ],
  en: [
    { icon: 'search', title: 'Accessibility Audit', description: 'Comprehensive review of your website against WCAG 2.2 AA standards — automated and manual. Including prioritized action plan.' },
    { icon: 'code', title: 'WCAG-Compliant Development', description: 'Development of new websites that are accessible from the ground up. Semantic HTML, ARIA labels, keyboard navigation and more.' },
    { icon: 'zap', title: 'Existing Website Remediation', description: 'We make your existing website WCAG 2.2 AA compliant — from quick fixes to complete overhaul.' },
    { icon: 'users', title: 'Training & Education', description: 'We train your team in accessible content creation, design principles and WCAG guidelines.' },
    { icon: 'shield', title: 'Ongoing Monitoring', description: 'Continuous monitoring of your website for accessibility issues. Regular reports and proactive bug fixing.' },
  ],
} as const

// ============================================================================
// CONTENT: PRICING PACKAGES
// ============================================================================

const packages = {
  de: [
    {
      name: 'Quick Audit',
      price: '490',
      priceType: 'einmalig',
      description: 'Umfassende Prüfung Ihrer Website auf WCAG-Konformität',
      popular: false,
      features: [
        'WCAG 2.2 Prüfung',
        'Priorisierter Maßnahmenkatalog',
        'Automatisierte + manuelle Tests',
        'Executive Summary',
        'Screenreader-Test',
        'Tastaturnavigations-Test',
      ],
    },
    {
      name: 'Full Compliance',
      price: '2.990',
      priceType: 'ab, einmalig',
      description: 'Kompletter Audit + alle Anpassungen für WCAG-Konformität',
      popular: true,
      features: [
        'Kompletter Audit inklusive',
        'Alle notwendigen Anpassungen',
        'WCAG 2.2 AA Konformität',
        'Assistive Technology Testing',
        'Konformitätserklärung',
        '3 Monate Monitoring',
        'Prioritäts-Support',
      ],
    },
    {
      name: 'Laufende Betreuung',
      price: '490',
      priceType: 'pro Monat',
      description: 'Kontinuierliche Überwachung und Pflege der Barrierefreiheit',
      popular: false,
      features: [
        'Monatliche Prüfungen',
        'Neue Inhalte prüfen',
        'WCAG-Updates umsetzen',
        'Support für Content-Team',
        'Quartalsberichte',
        'Compliance-Dashboard',
      ],
    },
  ],
  en: [
    {
      name: 'Quick Audit',
      price: '490',
      priceType: 'one-time',
      description: 'Comprehensive review of your website for WCAG compliance',
      popular: false,
      features: [
        'WCAG 2.2 review',
        'Prioritized action plan',
        'Automated + manual testing',
        'Executive summary',
        'Screen reader test',
        'Keyboard navigation test',
      ],
    },
    {
      name: 'Full Compliance',
      price: '2,990',
      priceType: 'from, one-time',
      description: 'Complete audit + all adjustments for WCAG compliance',
      popular: true,
      features: [
        'Complete audit included',
        'All necessary adjustments',
        'WCAG 2.2 AA compliance',
        'Assistive technology testing',
        'Conformance statement',
        '3 months monitoring',
        'Priority support',
      ],
    },
    {
      name: 'Ongoing Support',
      price: '490',
      priceType: 'per month',
      description: 'Continuous monitoring and maintenance of accessibility',
      popular: false,
      features: [
        'Monthly audits',
        'New content reviews',
        'WCAG updates implementation',
        'Content team support',
        'Quarterly reports',
        'Compliance dashboard',
      ],
    },
  ],
} as const

// ============================================================================
// CONTENT: PROCESS
// ============================================================================

const processSteps = {
  de: [
    { step: '01', title: 'Erstanalyse & Audit', description: 'Umfassende Prüfung Ihrer Website mit automatisierten Tools und manuellen Tests nach WCAG 2.2 AA.' },
    { step: '02', title: 'Maßnahmenplan erstellen', description: 'Priorisierter Katalog aller notwendigen Änderungen — sortiert nach Schweregrad und Aufwand.' },
    { step: '03', title: 'Technische Umsetzung', description: 'Implementierung aller Barrierefreiheits-Anpassungen: Semantik, ARIA, Kontraste, Tastaturnavigation.' },
    { step: '04', title: 'Testing & Validierung', description: 'Tests mit echten assistiven Technologien (Screenreader, Sprachsteuerung) und Nutzer-Tests.' },
    { step: '05', title: 'Zertifizierung & Monitoring', description: 'Konformitätserklärung erstellen und laufende Überwachung einrichten.' },
  ],
  en: [
    { step: '01', title: 'Initial Analysis & Audit', description: 'Comprehensive review of your website using automated tools and manual testing per WCAG 2.2 AA.' },
    { step: '02', title: 'Create Action Plan', description: 'Prioritized catalog of all necessary changes — sorted by severity and effort.' },
    { step: '03', title: 'Technical Implementation', description: 'Implementation of all accessibility adjustments: semantics, ARIA, contrast, keyboard navigation.' },
    { step: '04', title: 'Testing & Validation', description: 'Testing with real assistive technologies (screen readers, voice control) and user testing.' },
    { step: '05', title: 'Certification & Monitoring', description: 'Create conformance statement and set up ongoing monitoring.' },
  ],
} as const

// ============================================================================
// CONTENT: FAQ
// ============================================================================

const faqs = {
  de: [
    { question: 'Was ist eine barrierefreie Website?', answer: 'Eine barrierefreie Website ist so gestaltet, dass sie von allen Menschen genutzt werden kann — unabhängig von körperlichen, sensorischen oder kognitiven Einschränkungen. Sie erfüllt die WCAG (Web Content Accessibility Guidelines) und kann mit assistiven Technologien wie Screenreadern, Tastaturnavigation oder Sprachsteuerung bedient werden.' },
    { question: 'Was ist WCAG 2.2 und welche Stufe brauche ich?', answer: 'WCAG 2.2 ist der internationale Standard für Web-Barrierefreiheit mit drei Konformitätsstufen: A (Minimum), AA (Standard) und AAA (Maximum). Für die meisten Unternehmen ist WCAG 2.2 AA die relevante Stufe — sie wird auch vom European Accessibility Act gefordert und bietet ein ausgewogenes Verhältnis zwischen Aufwand und Barrierefreiheit.' },
    { question: 'Wer muss ab 2025 barrierefrei sein? (EAA)', answer: 'Der European Accessibility Act (EAA) betrifft ab dem 28. Juni 2025 alle Unternehmen, die digitale Produkte und Dienstleistungen in der EU anbieten. Dazu gehören: E-Commerce/Online-Shops, Bankdienstleistungen, E-Books, Ticketing-Systeme, Telekommunikationsdienste und mehr. In Österreich wird dies durch das Barrierefreiheitsstärkungsgesetz (BFSG) umgesetzt.' },
    { question: 'Was passiert, wenn meine Website nicht barrierefrei ist?', answer: 'Ab Juni 2025 drohen Unternehmen bei Nicht-Einhaltung des EAA Abmahnungen, Bußgelder und rechtliche Konsequenzen. Darüber hinaus verlieren Sie potenzielle Kunden — 15% der Bevölkerung hat eine Behinderung. Auch Reputationsschäden und Wettbewerbsnachteile können die Folge sein.' },
    { question: 'Kann eine bestehende Website barrierefrei gemacht werden?', answer: 'Ja, in den meisten Fällen kann eine bestehende Website barrierefrei gemacht werden, ohne sie komplett neu zu bauen. Durch gezielte Remediation — Anpassung der HTML-Struktur, Hinzufügen von ARIA-Labels, Verbesserung der Kontraste und Tastaturnavigation — erreichen wir WCAG 2.2 AA Konformität.' },
    { question: 'Wie lange dauert die Umsetzung?', answer: 'Ein reines Audit dauert 1-2 Wochen. Die vollständige Umsetzung (Audit + Remediation) hängt von der Website-Größe ab: Kleine Websites (bis 20 Seiten) benötigen 2-4 Wochen, mittlere Websites 4-8 Wochen, große Websites oder Shops 8-12 Wochen. Wir erstellen einen realistischen Zeitplan im Erstgespräch.' },
    { question: 'Beeinträchtigt Barrierefreiheit das Design?', answer: 'Nein! Modernes barrierefreies Design sieht genauso gut aus wie jedes andere hochwertige Webdesign. Viele Barrierefreiheits-Verbesserungen (bessere Kontraste, klarere Typografie, intuitive Navigation) verbessern sogar das Design und die Usability für alle Nutzer. Barrierefreiheit und ästhetisches Design gehen Hand in Hand.' },
    { question: 'Was kostet es, eine Website barrierefrei zu machen?', answer: 'Die Kosten variieren je nach Umfang: Ein Quick Audit kostet €490 einmalig. Eine vollständige Compliance-Umsetzung (Audit + alle Anpassungen + Zertifizierung) beginnt ab €2.990. Für laufende Betreuung und Monitoring bieten wir Pakete ab €490/Monat. Im kostenlosen Erstgespräch erstellen wir Ihnen ein individuelles Angebot.' },
  ],
  en: [
    { question: 'What is an accessible website?', answer: 'An accessible website is designed to be usable by all people — regardless of physical, sensory or cognitive limitations. It meets WCAG (Web Content Accessibility Guidelines) and can be operated with assistive technologies like screen readers, keyboard navigation, or voice control.' },
    { question: 'What is WCAG 2.2 and which level do I need?', answer: 'WCAG 2.2 is the international standard for web accessibility with three conformance levels: A (minimum), AA (standard) and AAA (maximum). For most businesses, WCAG 2.2 AA is the relevant level — it is also required by the European Accessibility Act and offers a balanced ratio between effort and accessibility.' },
    { question: 'Who must be accessible from 2025? (EAA)', answer: 'The European Accessibility Act (EAA) affects all businesses offering digital products and services in the EU from June 28, 2025. This includes: e-commerce/online shops, banking services, e-books, ticketing systems, telecommunications services and more.' },
    { question: 'What happens if my website is not accessible?', answer: 'From June 2025, businesses face legal warnings, fines and legal consequences for non-compliance with the EAA. Additionally, you lose potential customers — 15% of the population has a disability. Reputational damage and competitive disadvantages can also result.' },
    { question: 'Can an existing website be made accessible?', answer: 'Yes, in most cases an existing website can be made accessible without rebuilding it completely. Through targeted remediation — adjusting HTML structure, adding ARIA labels, improving contrasts and keyboard navigation — we achieve WCAG 2.2 AA compliance.' },
    { question: 'How long does implementation take?', answer: 'A pure audit takes 1-2 weeks. Full implementation (audit + remediation) depends on website size: small websites (up to 20 pages) need 2-4 weeks, medium websites 4-8 weeks, large websites or shops 8-12 weeks. We create a realistic timeline in the initial consultation.' },
    { question: 'Does accessibility affect design?', answer: 'No! Modern accessible design looks just as good as any other high-quality web design. Many accessibility improvements (better contrasts, clearer typography, intuitive navigation) actually improve the design and usability for all users. Accessibility and aesthetic design go hand in hand.' },
    { question: 'How much does it cost to make a website accessible?', answer: 'Costs vary by scope: A quick audit costs a one-time fee of \u20AC490. Full compliance implementation (audit + all adjustments + certification) starts from \u20AC2,990. For ongoing support and monitoring, we offer packages from \u20AC490/month. We create a customized quote in the free initial consultation.' },
  ],
} as const

// ============================================================================
// CONTENT: RELATED SERVICES
// ============================================================================

const relatedServices = {
  de: [
    { title: 'Webdesign Wien', description: 'Professionelles Webdesign aus Wien — modern, performant und von Anfang an barrierefrei.', href: '/webdesign-wien' as const },
    { title: 'Website erstellen lassen', description: 'Ihre neue Website vom Konzept bis zum Launch — inkl. Barrierefreiheit nach WCAG 2.2.', href: '/website-erstellen-lassen' as const },
    { title: 'Webdesign Preise', description: 'Transparente Preise für Ihr Webprojekt — alle Pakete inklusive barrierefreier Grundausstattung.', href: '/webdesign-preise' as const },
  ],
  en: [
    { title: 'Web Design Vienna', description: 'Professional web design from Vienna — modern, performant and accessible from the start.', href: '/webdesign-wien' as const },
    { title: 'Website Development', description: 'Your new website from concept to launch — including WCAG 2.2 accessibility.', href: '/website-erstellen-lassen' as const },
    { title: 'Web Design Pricing', description: 'Transparent pricing for your web project — all packages include accessible basics.', href: '/webdesign-preise' as const },
  ],
} as const satisfies Record<'de' | 'en', Array<{ title: string; description: string; href: StaticAppPathname }>>

// ============================================================================
// CONTENT: SECTION LABELS
// ============================================================================

const sectionLabels = {
  de: {
    benefitsTitle: 'Warum Barrierefreiheit für Ihr Unternehmen wichtig ist',
    benefitsDescription: '6 Gründe, warum Sie Ihre Website jetzt barrierefrei machen sollten.',
    wcagTitle: 'Die 4 WCAG-Prinzipien der Barrierefreiheit',
    wcagDescription: 'Jede barrierefreie Website basiert auf diesen vier Grundprinzipien.',
    servicesTitle: 'Unsere Barrierefreiheits-Leistungen',
    servicesDescription: 'Von der Erstanalyse bis zur laufenden Betreuung — alles aus einer Hand.',
    pricingTitle: 'Barrierefreiheit Pakete & Preise',
    pricingDescription: 'Transparente Preise für Ihre barrierefreie Website. Vom Quick Audit bis zur vollständigen Compliance.',
    processTitle: 'So machen wir Ihre Website barrierefrei',
    processSubtitle: 'Strukturierter Prozess für WCAG 2.2 AA Konformität.',
    faqTitle: 'Häufige Fragen zur Barrierefreiheit',
    relatedServicesTitle: 'Verwandte Leistungen',
    ctaTitle: 'Ist Ihre Website barrierefrei? Jetzt prüfen lassen.',
    ctaDescription: 'Kostenlose Ersteinschätzung Ihrer Website. Wir zeigen Ihnen, wo Sie stehen und was zu tun ist — bevor der EAA in Kraft tritt.',
    ctaButton: 'Kostenlose Ersteinschätzung anfordern',
    learnMore: 'Mehr erfahren',
    inquire: 'Anfragen',
    recommended: 'Empfohlen',
  },
  en: {
    benefitsTitle: 'Why Accessibility Matters for Your Business',
    benefitsDescription: '6 reasons why you should make your website accessible now.',
    wcagTitle: 'The 4 WCAG Principles of Accessibility',
    wcagDescription: 'Every accessible website is built on these four core principles.',
    servicesTitle: 'Our Accessibility Services',
    servicesDescription: 'From initial analysis to ongoing support — everything from one source.',
    pricingTitle: 'Accessibility Packages & Pricing',
    pricingDescription: 'Transparent pricing for your accessible website. From quick audit to full compliance.',
    processTitle: 'How We Make Your Website Accessible',
    processSubtitle: 'Structured process for WCAG 2.2 AA compliance.',
    faqTitle: 'Frequently Asked Questions About Accessibility',
    relatedServicesTitle: 'Related Services',
    ctaTitle: 'Is Your Website Accessible? Get It Checked Now.',
    ctaDescription: 'Free initial assessment of your website. We show you where you stand and what needs to be done — before the EAA takes effect.',
    ctaButton: 'Request Free Assessment',
    learnMore: 'Learn more',
    inquire: 'Inquire',
    recommended: 'Recommended',
  },
} as const

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const cl = getContentLocale(locale)

  const titles = {
    de: 'Barrierefreie Website — WCAG 2.2 | GoldenWing Wien',
    en: 'Accessible Website — WCAG 2.2 | GoldenWing Vienna',
  } as const

  const descriptions = {
    de: 'Barrierefreie Website nach WCAG 2.2 AA Standard erstellen. \u2713 Pflicht ab 2025 (EAA) \u2713 Inklusive Audit \u2713 Zertifizierung. Jetzt beraten lassen.',
    en: 'Create accessible websites meeting WCAG 2.2 AA standards. \u2713 Required from 2025 (EAA) \u2713 Including audit \u2713 Certification. Get a consultation now.',
  } as const

  const keywords: Record<'de' | 'en', string[]> = {
    de: ['Barrierefreie Website', 'Barrierefreies Webdesign', 'WCAG 2.2', 'Web Accessibility', 'EAA Barrierefreiheit', 'Barrierefreiheitsstärkungsgesetz'],
    en: ['Accessible Website', 'Web Accessibility', 'WCAG 2.2', 'ADA Compliance', 'EAA Accessibility', 'Inclusive Web Design'],
  }

  const metaTitle = titles[cl]
  const metaDescription = truncateMetaDescription(descriptions[cl])
  const hreflangAlternates = getHreflangAlternates('/barrierefreie-website', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords[cl],
    openGraph: {
      title: heroContent[cl].title,
      description: metaDescription,
      url: getCanonicalUrl('/barrierefreie-website', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Barrierefreie Website' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: heroContent[cl].title,
      description: metaDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/barrierefreie-website', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function BarrierefreieWebsitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const cl = getContentLocale(locale)

  const hero = heroContent[cl]
  const urgency = urgencyBanner[cl]
  const benefitItems = benefits[cl]
  const principles = wcagPrinciples[cl]
  const serviceItems = services[cl]
  const pkgs = packages[cl]
  const process = processSteps[cl]
  const faqItems = faqs[cl]
  const related = relatedServices[cl]
  const labels = sectionLabels[cl]

  // Breadcrumbs
  const breadcrumbs = [
    { name: cl === 'de' ? 'Startseite' : 'Home', url: 'https://goldenwing.at' },
    { name: cl === 'de' ? 'Barrierefreie Website' : 'Accessible Website', url: cl === 'de' ? 'https://goldenwing.at/barrierefreie-website' : 'https://goldenwing.at/en/accessible-website' },
  ]

  // Service Schema (inline)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cl === 'de' ? 'Web Accessibility Consulting' : 'Web Accessibility Consulting',
    alternateName: cl === 'de' ? 'Barrierefreie Website Beratung Wien' : 'Accessible Website Consulting Vienna',
    url: 'https://goldenwing.at/barrierefreie-website',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: cl === 'de' ? 'Barrierefreiheits-Pakete' : 'Accessibility Packages',
      itemListElement: [
        { '@type': 'Offer', name: 'Quick Audit', price: '490', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Full Compliance', price: '2990', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: cl === 'de' ? 'Laufende Betreuung' : 'Ongoing Support', price: '490', priceCurrency: 'EUR', priceSpecification: { '@type': 'UnitPriceSpecification', price: '490', priceCurrency: 'EUR', unitText: 'MONTH' } },
      ],
    },
    description: cl === 'de'
      ? 'Barrierefreie Website nach WCAG 2.2 AA Standard. Audit, Umsetzung und laufende Überwachung für EAA-Konformität.'
      : 'Accessible websites meeting WCAG 2.2 AA standards. Audit, implementation and ongoing monitoring for EAA compliance.',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbListSchema items={breadcrumbs} />
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div>
            <Badge className="mb-4">{hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{hero.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#pakete">{hero.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Urgency Banner */}
      <section className="py-8 bg-destructive/10 border-y border-destructive/20">
        <Container variant="block">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg mb-1">{urgency.title}</h2>
              <p className="text-sm text-muted-foreground">{urgency.text}</p>
            </div>
            <Button variant="destructive" size="sm" asChild>
              <NextLink href={getContactUrl(locale)}>
                {urgency.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.benefitsTitle}</h2>
            <p className="text-muted-foreground">{labels.benefitsDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitItems.map((benefit) => {
              const IconComponent = iconMap[benefit.icon] || Shield
              return (
                <Card key={benefit.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* WCAG 4 Principles */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.wcagTitle}</h2>
            <p className="text-muted-foreground">{labels.wcagDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle) => {
              const IconComponent = iconMap[principle.icon] || Eye
              return (
                <Card key={principle.title} className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{principle.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{principle.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {principle.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.servicesTitle}</h2>
            <p className="text-muted-foreground">{labels.servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceItems.map((service) => {
              const IconComponent = iconMap[service.icon] || Search
              return (
                <Card key={service.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pakete" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.pricingTitle}</h2>
            <p className="text-muted-foreground">{labels.pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pkgs.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{labels.recommended}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">&euro;{pkg.price}</span>
                    <span className="text-muted-foreground text-sm"> {pkg.priceType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <NextLink href={getContactUrl(locale)}>{labels.inquire}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <ProcessVerticalStepper
        title={labels.processTitle}
        subtitle={labels.processSubtitle}
        steps={process.map((item) => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      <FAQSection
        title={labels.faqTitle}
        items={[...faqItems]}
        className="bg-muted/30"
      />

      {/* Related Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{labels.relatedServicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {labels.learnMore} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{labels.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8">{labels.ctaDescription}</p>
          <Button size="lg" variant="secondary" asChild>
            <NextLink href={getContactUrl(locale)}>
              {labels.ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
        </Container>
      </section>
    </>
  )
}
