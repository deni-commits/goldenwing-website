import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, CheckCircle, Star, Shield, Zap, Users, Code, Layers, LucideIcon } from 'lucide-react'
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
  'layers': Layers,
  'code': Code,
  'zap': Zap,
  'shield': Shield,
  'star': Star,
  'users': Users,
}

// ============================================================================
// CONTENT: HERO
// ============================================================================

const heroContent = {
  de: {
    badge: 'Transparente Preise',
    title: 'Was kostet professionelles Webdesign?',
    description: 'Professionelles Webdesign kostet zwischen €990 und €9.990+ — abhängig von Umfang, Design und Funktionalität. Bei GoldenWing erhalten Sie transparente Fixpreise ohne versteckte Kosten. Vom einfachen One-Pager bis zur komplexen Enterprise-Lösung: Hier finden Sie alle Preise auf einen Blick.',
    ctaPrimary: 'Kostenloses Erstgespräch',
    ctaSecondary: 'Preise vergleichen',
  },
  en: {
    badge: 'Transparent Pricing',
    title: 'How Much Does Professional Web Design Cost?',
    description: 'Professional web design costs between €990 and €9,990+ — depending on scope, design and functionality. At GoldenWing, you get transparent fixed prices with no hidden costs. From simple one-pagers to complex enterprise solutions: Find all prices at a glance here.',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'Compare Prices',
  },
} as const

// ============================================================================
// CONTENT: PRICING PACKAGES
// ============================================================================

const packages = {
  de: [
    {
      name: 'Starter',
      price: '990',
      priceType: 'einmalig',
      description: 'Ideal für Gründer, Freelancer und kleine Projekte',
      popular: false,
      features: [
        'Responsive Design',
        'Bis zu 5 Seiten',
        'Kontaktformular',
        'Basis-SEO',
        'Mobile-First',
        'SSL-Zertifikat',
      ],
    },
    {
      name: 'Business',
      price: '2.490',
      priceType: 'einmalig',
      description: 'Für KMUs und wachsende Unternehmen',
      popular: false,
      features: [
        'Alles aus Starter',
        'Bis zu 15 Seiten',
        'CMS (WordPress/Payload)',
        'Blog-Funktion',
        'Erweiterte SEO',
        'Google Analytics',
        '3 Monate Support',
      ],
    },
    {
      name: 'Premium',
      price: '4.990',
      priceType: 'einmalig',
      description: 'Für Unternehmen mit hohen Ansprüchen',
      popular: true,
      features: [
        'Alles aus Business',
        'Individuelle Designkonzepte',
        'Bis zu 30 Seiten',
        'Animations & Interaktionen',
        'Performance-Optimierung',
        'Conversion-Optimierung',
        '6 Monate Support',
        'A/B Testing',
      ],
    },
    {
      name: 'Enterprise',
      price: '9.990',
      priceType: 'ab, individuell',
      description: 'Maßgeschneiderte Lösungen für große Projekte',
      popular: false,
      features: [
        'Alles aus Premium',
        'Unbegrenzte Seiten',
        'E-Commerce/Webshop',
        'Custom Entwicklung',
        'API-Integrationen',
        'Mehrsprachigkeit',
        'Dedizierter Projektmanager',
        '12 Monate Support',
      ],
    },
  ],
  en: [
    {
      name: 'Starter',
      price: '990',
      priceType: 'one-time',
      description: 'Ideal for startups, freelancers and small projects',
      popular: false,
      features: [
        'Responsive Design',
        'Up to 5 pages',
        'Contact form',
        'Basic SEO',
        'Mobile-First',
        'SSL Certificate',
      ],
    },
    {
      name: 'Business',
      price: '2,490',
      priceType: 'one-time',
      description: 'For SMEs and growing companies',
      popular: false,
      features: [
        'Everything in Starter',
        'Up to 15 pages',
        'CMS (WordPress/Payload)',
        'Blog functionality',
        'Advanced SEO',
        'Google Analytics',
        '3 months support',
      ],
    },
    {
      name: 'Premium',
      price: '4,990',
      priceType: 'one-time',
      description: 'For businesses with high standards',
      popular: true,
      features: [
        'Everything in Business',
        'Custom design concepts',
        'Up to 30 pages',
        'Animations & interactions',
        'Performance optimization',
        'Conversion optimization',
        '6 months support',
        'A/B Testing',
      ],
    },
    {
      name: 'Enterprise',
      price: '9,990',
      priceType: 'from, individual',
      description: 'Tailored solutions for large projects',
      popular: false,
      features: [
        'Everything in Premium',
        'Unlimited pages',
        'E-Commerce/Web shop',
        'Custom development',
        'API integrations',
        'Multi-language support',
        'Dedicated project manager',
        '12 months support',
      ],
    },
  ],
} as const

// ============================================================================
// CONTENT: COST FACTORS
// ============================================================================

const costFactors = {
  de: [
    { icon: 'layers', title: 'Anzahl der Seiten', description: 'Mehr Seiten bedeuten mehr Design- und Entwicklungsaufwand. Eine 5-Seiten-Website ist deutlich günstiger als ein Portal mit 50+ Seiten.' },
    { icon: 'star', title: 'Design-Komplexität', description: 'Ein individuelles Design mit Animationen und Interaktionen kostet mehr als ein Template-basiertes Layout.' },
    { icon: 'code', title: 'CMS-System', description: 'Die Wahl des Content-Management-Systems beeinflusst den Preis. WordPress ist kostengünstig, headless CMS wie Payload bieten mehr Flexibilität.' },
    { icon: 'shield', title: 'E-Commerce Funktionen', description: 'Ein Online-Shop mit Warenkorb, Zahlungsabwicklung und Produktverwaltung erfordert deutlich mehr Entwicklungsarbeit.' },
    { icon: 'zap', title: 'SEO & Performance', description: 'Professionelle Suchmaschinenoptimierung, Core Web Vitals-Optimierung und Ladezeit-Optimierung erhöhen den Wert Ihrer Website.' },
    { icon: 'users', title: 'Wartung & Support', description: 'Laufende Wartung, Sicherheitsupdates und technischer Support sind wichtig für den langfristigen Erfolg Ihrer Website.' },
  ],
  en: [
    { icon: 'layers', title: 'Number of Pages', description: 'More pages mean more design and development effort. A 5-page website costs significantly less than a 50+ page portal.' },
    { icon: 'star', title: 'Design Complexity', description: 'A custom design with animations and interactions costs more than a template-based layout.' },
    { icon: 'code', title: 'CMS System', description: 'The choice of content management system affects the price. WordPress is cost-effective, headless CMS like Payload offers more flexibility.' },
    { icon: 'shield', title: 'E-Commerce Features', description: 'An online shop with cart, payment processing and product management requires significantly more development work.' },
    { icon: 'zap', title: 'SEO & Performance', description: 'Professional search engine optimization, Core Web Vitals optimization and load time optimization increase the value of your website.' },
    { icon: 'users', title: 'Maintenance & Support', description: 'Ongoing maintenance, security updates and technical support are important for the long-term success of your website.' },
  ],
} as const

// ============================================================================
// CONTENT: COMPARISON TABLE
// ============================================================================

const comparisonContent = {
  de: {
    title: 'Agentur vs. Freelancer vs. Baukasten',
    description: 'Was ist die beste Wahl für Ihr Projekt?',
    headers: ['Kriterium', 'Agentur', 'Freelancer', 'Baukasten'],
    rows: [
      { label: 'Qualität', agentur: 'Sehr hoch', freelancer: 'Hoch', baukasten: 'Mittel' },
      { label: 'Individualität', agentur: '100% individuell', freelancer: 'Individuell', baukasten: 'Eingeschränkt' },
      { label: 'SEO', agentur: 'Professionell', freelancer: 'Grundlegend', baukasten: 'Minimal' },
      { label: 'Support', agentur: 'Langfristig', freelancer: 'Projektbezogen', baukasten: 'Self-Service' },
      { label: 'Kosten', agentur: '€2.490 – €9.990+', freelancer: '€1.000 – €5.000', baukasten: '€0 – €50/Monat' },
      { label: 'Zeitrahmen', agentur: '4–12 Wochen', freelancer: '2–8 Wochen', baukasten: 'Sofort' },
    ],
  },
  en: {
    title: 'Agency vs. Freelancer vs. Website Builder',
    description: 'What is the best choice for your project?',
    headers: ['Criteria', 'Agency', 'Freelancer', 'Website Builder'],
    rows: [
      { label: 'Quality', agentur: 'Very high', freelancer: 'High', baukasten: 'Medium' },
      { label: 'Customization', agentur: '100% custom', freelancer: 'Custom', baukasten: 'Limited' },
      { label: 'SEO', agentur: 'Professional', freelancer: 'Basic', baukasten: 'Minimal' },
      { label: 'Support', agentur: 'Long-term', freelancer: 'Project-based', baukasten: 'Self-service' },
      { label: 'Cost', agentur: '€2,490 – €9,990+', freelancer: '€1,000 – €5,000', baukasten: '€0 – €50/month' },
      { label: 'Timeline', agentur: '4–12 weeks', freelancer: '2–8 weeks', baukasten: 'Immediately' },
    ],
  },
} as const

// ============================================================================
// CONTENT: PROCESS
// ============================================================================

const processSteps = {
  de: [
    { step: '01', title: 'Erstgespräch', description: 'Wir lernen Ihr Unternehmen, Ihre Ziele und Anforderungen kennen — kostenlos und unverbindlich.' },
    { step: '02', title: 'Konzept & Angebot', description: 'Sie erhalten ein detailliertes Konzept mit Wireframes und ein transparentes Fixpreis-Angebot.' },
    { step: '03', title: 'Design', description: 'Wir erstellen individuelle Designkonzepte, die Ihre Marke perfekt widerspiegeln.' },
    { step: '04', title: 'Entwicklung', description: 'Ihr Design wird in eine performante, SEO-optimierte Website umgesetzt.' },
    { step: '05', title: 'Testing & Launch', description: 'Ausführliche Tests auf allen Geräten, Performance-Optimierung und Go-Live.' },
    { step: '06', title: 'Nachbetreuung', description: 'Wir begleiten Sie auch nach dem Launch mit Support, Wartung und Optimierung.' },
  ],
  en: [
    { step: '01', title: 'Initial Consultation', description: 'We learn about your business, goals and requirements — free and without obligation.' },
    { step: '02', title: 'Concept & Quote', description: 'You receive a detailed concept with wireframes and a transparent fixed-price quote.' },
    { step: '03', title: 'Design', description: 'We create custom design concepts that perfectly reflect your brand.' },
    { step: '04', title: 'Development', description: 'Your design is transformed into a high-performance, SEO-optimized website.' },
    { step: '05', title: 'Testing & Launch', description: 'Thorough testing on all devices, performance optimization and go-live.' },
    { step: '06', title: 'Aftercare', description: 'We continue to support you after launch with maintenance, support and optimization.' },
  ],
} as const

// ============================================================================
// CONTENT: FAQ
// ============================================================================

const faqs = {
  de: [
    { question: 'Was kostet eine einfache Website?', answer: 'Eine einfache Website mit bis zu 5 Seiten, responsivem Design und Basis-SEO kostet bei uns ab €990 (einmalig). Für Unternehmen, die eine Blog-Funktion oder ein CMS benötigen, empfehlen wir unser Business-Paket ab €2.490.' },
    { question: 'Was kostet ein Online-Shop?', answer: 'Ein professioneller Online-Shop mit Warenkorb, Zahlungsabwicklung und Produktverwaltung startet ab €4.990. Für umfangreiche E-Commerce-Lösungen mit erweiterten Funktionen bieten wir individuelle Enterprise-Pakete ab €9.990.' },
    { question: 'Gibt es versteckte Kosten?', answer: 'Nein. Bei GoldenWing arbeiten wir mit transparenten Fixpreisen. Im Angebot steht genau, was enthalten ist. Zusätzliche Wünsche werden vorab besprochen und separat angeboten — nie ohne Ihre Zustimmung.' },
    { question: 'Wie lange dauert die Erstellung einer Website?', answer: 'Eine Starter-Website ist in 2-3 Wochen fertig. Business-Websites benötigen 4-6 Wochen, Premium-Projekte 6-10 Wochen. Enterprise-Lösungen und Webshops können 8-12 Wochen dauern. Den genauen Zeitrahmen besprechen wir im Erstgespräch.' },
    { question: 'Was ist im Preis enthalten?', answer: 'Alle Pakete beinhalten: Konzeption, Design, Entwicklung, Responsive Layout, Basis-SEO, SSL-Zertifikat und Testing. Je nach Paket kommen CMS-Einrichtung, Content-Migration, erweiterte SEO-Optimierung und Support-Monate hinzu.' },
    { question: 'Kann ich die Website selbst bearbeiten?', answer: 'Ja! Ab dem Business-Paket erhalten Sie ein benutzerfreundliches CMS (WordPress oder Payload), mit dem Sie Texte, Bilder und Seiten selbst verwalten können. Wir schulen Sie kostenlos in der Bedienung.' },
    { question: 'Bieten Sie Ratenzahlung an?', answer: 'Ja, bei größeren Projekten bieten wir flexible Zahlungsmodelle an. Typisch ist eine Aufteilung in 3 Raten: 40% bei Projektstart, 30% nach Design-Freigabe und 30% bei Launch. Sprechen Sie uns einfach darauf an.' },
    { question: 'Warum ist eine Agentur teurer als ein Baukasten?', answer: 'Website-Baukästen wie Wix oder Squarespace sind günstig, aber limitiert in Design, SEO und Performance. Eine professionell entwickelte Website ist individuell, schneller, besser für Google optimiert und skalierbar — das zahlt sich langfristig durch mehr Kunden und Umsatz aus.' },
  ],
  en: [
    { question: 'How much does a simple website cost?', answer: 'A simple website with up to 5 pages, responsive design and basic SEO costs from €990 (one-time) with us. For businesses that need a blog or CMS, we recommend our Business package from €2,490.' },
    { question: 'How much does an online shop cost?', answer: 'A professional online shop with cart, payment processing and product management starts from €4,990. For comprehensive e-commerce solutions with advanced features, we offer custom Enterprise packages from €9,990.' },
    { question: 'Are there hidden costs?', answer: 'No. At GoldenWing, we work with transparent fixed prices. The quote states exactly what is included. Additional requests are discussed in advance and quoted separately — never without your approval.' },
    { question: 'How long does it take to build a website?', answer: 'A Starter website is ready in 2-3 weeks. Business websites take 4-6 weeks, Premium projects 6-10 weeks. Enterprise solutions and web shops can take 8-12 weeks. We discuss the exact timeline in the initial consultation.' },
    { question: 'What is included in the price?', answer: 'All packages include: concept, design, development, responsive layout, basic SEO, SSL certificate and testing. Depending on the package, CMS setup, content migration, advanced SEO optimization and support months are added.' },
    { question: 'Can I edit the website myself?', answer: 'Yes! Starting from the Business package, you get a user-friendly CMS (WordPress or Payload) that lets you manage texts, images and pages yourself. We train you free of charge.' },
    { question: 'Do you offer installment payments?', answer: 'Yes, for larger projects we offer flexible payment models. A typical split is 3 installments: 40% at project start, 30% after design approval and 30% at launch. Just ask us about it.' },
    { question: 'Why is an agency more expensive than a website builder?', answer: 'Website builders like Wix or Squarespace are cheap but limited in design, SEO and performance. A professionally developed website is custom, faster, better optimized for Google and scalable — which pays off in the long run through more customers and revenue.' },
  ],
} as const

// ============================================================================
// CONTENT: RELATED SERVICES
// ============================================================================

const relatedServices = {
  de: [
    { title: 'Webdesign Wien', description: 'Professionelles Webdesign aus Wien — modern, performant und SEO-optimiert.', href: '/webdesign-wien' as const },
    { title: 'Website erstellen lassen', description: 'Ihre neue Website vom Konzept bis zum Launch — alles aus einer Hand.', href: '/website-erstellen-lassen' as const },
    { title: 'SEO Optimierung', description: 'Mehr Sichtbarkeit bei Google durch professionelle Suchmaschinenoptimierung.', href: '/leistungen/seo-content' as const },
  ],
  en: [
    { title: 'Web Design Vienna', description: 'Professional web design from Vienna — modern, performant and SEO-optimized.', href: '/webdesign-wien' as const },
    { title: 'Website Development', description: 'Your new website from concept to launch — all from one source.', href: '/website-erstellen-lassen' as const },
    { title: 'SEO Optimization', description: 'More visibility on Google through professional search engine optimization.', href: '/leistungen/seo-content' as const },
  ],
} as const satisfies Record<'de' | 'en', Array<{ title: string; description: string; href: StaticAppPathname }>>

// ============================================================================
// CONTENT: SECTION LABELS
// ============================================================================

const sectionLabels = {
  de: {
    costFactorsTitle: 'Was beeinflusst den Preis einer Website?',
    costFactorsDescription: 'Diese 6 Faktoren bestimmen, wie viel Ihre Website kostet.',
    pricingTitle: 'Unsere Webdesign-Pakete im Detail',
    pricingDescription: 'Transparente Fixpreise — ohne versteckte Kosten. Alle Pakete inklusive Konzeption, Design und Entwicklung.',
    processTitle: 'So entsteht Ihre Website',
    processSubtitle: 'In 6 Schritten von der Idee zur fertigen Website.',
    faqTitle: 'Häufige Fragen zu Webdesign Preisen',
    relatedServicesTitle: 'Verwandte Leistungen',
    ctaTitle: 'Jetzt Ihr individuelles Angebot erhalten',
    ctaDescription: 'Erzählen Sie uns von Ihrem Projekt — wir erstellen Ihnen ein kostenloses, unverbindliches Angebot mit transparentem Fixpreis.',
    ctaButton: 'Kostenloses Erstgespräch buchen',
    learnMore: 'Mehr erfahren',
    inquire: 'Anfragen',
    recommended: 'Empfohlen',
  },
  en: {
    costFactorsTitle: 'What Influences the Price of a Website?',
    costFactorsDescription: 'These 6 factors determine how much your website costs.',
    pricingTitle: 'Our Web Design Packages in Detail',
    pricingDescription: 'Transparent fixed prices — no hidden costs. All packages include concept, design and development.',
    processTitle: 'How Your Website Is Created',
    processSubtitle: 'In 6 steps from idea to finished website.',
    faqTitle: 'Frequently Asked Questions About Web Design Pricing',
    relatedServicesTitle: 'Related Services',
    ctaTitle: 'Get Your Individual Quote Now',
    ctaDescription: 'Tell us about your project — we will create a free, no-obligation quote with a transparent fixed price.',
    ctaButton: 'Book Free Consultation',
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
    de: 'Webdesign Preise 2026 — Kosten & Pakete | GoldenWing',
    en: 'Web Design Pricing 2026 — Costs & Packages | GoldenWing',
  } as const

  const descriptions = {
    de: 'Transparente Webdesign Preise: Von €990 Website-Starter bis Enterprise. ✓ Fixpreise ✓ Keine versteckten Kosten ✓ Wien & Österreich',
    en: 'Transparent web design pricing: From €990 website starter to enterprise. ✓ Fixed prices ✓ No hidden costs ✓ Vienna & Austria',
  } as const

  const keywords: Record<'de' | 'en', string[]> = {
    de: ['Webdesign Preise', 'Website Kosten', 'Was kostet Webdesign', 'Homepage erstellen Kosten', 'Webdesign Kosten Österreich'],
    en: ['Web Design Pricing', 'Website Cost', 'How Much Does Web Design Cost', 'Website Development Cost'],
  }

  const metaTitle = titles[cl]
  const metaDescription = truncateMetaDescription(descriptions[cl])
  const hreflangAlternates = getHreflangAlternates('/webdesign-preise', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords[cl],
    openGraph: {
      title: heroContent[cl].title,
      description: metaDescription,
      url: getCanonicalUrl('/webdesign-preise', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Webdesign Preise' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: heroContent[cl].title,
      description: metaDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/webdesign-preise', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function WebdesignPreisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const cl = getContentLocale(locale)

  const hero = heroContent[cl]
  const pkgs = packages[cl]
  const factors = costFactors[cl]
  const comparison = comparisonContent[cl]
  const process = processSteps[cl]
  const faqItems = faqs[cl]
  const related = relatedServices[cl]
  const labels = sectionLabels[cl]

  // Breadcrumbs
  const breadcrumbs = [
    { name: cl === 'de' ? 'Startseite' : 'Home', url: 'https://goldenwing.at' },
    { name: cl === 'de' ? 'Leistungen' : 'Services', url: cl === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
    { name: cl === 'de' ? 'Webdesign Preise' : 'Web Design Pricing', url: cl === 'de' ? 'https://goldenwing.at/webdesign-preise' : 'https://goldenwing.at/en/web-design-pricing' },
  ]

  // Service Schema (inline)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cl === 'de' ? 'Webdesign & Website-Entwicklung' : 'Web Design & Website Development',
    alternateName: cl === 'de' ? 'Professionelles Webdesign Wien' : 'Professional Web Design Vienna',
    url: 'https://goldenwing.at/webdesign-preise',
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
      name: cl === 'de' ? 'Webdesign Pakete' : 'Web Design Packages',
      itemListElement: [
        { '@type': 'Offer', name: 'Starter Website', price: '990', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Business Website', price: '2490', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Premium Website', price: '4990', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Enterprise Website', price: '9990', priceCurrency: 'EUR' },
      ],
    },
    description: cl === 'de'
      ? 'Professionelles Webdesign ab €990. Transparente Fixpreise für responsive Websites, Business-Websites mit CMS, Premium-Designs und Enterprise-Lösungen.'
      : 'Professional web design from €990. Transparent fixed prices for responsive websites, business websites with CMS, premium designs and enterprise solutions.',
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
                <NextLink href="#preise">{hero.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Packages */}
      <section id="preise" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.pricingTitle}</h2>
            <p className="text-muted-foreground">{labels.pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <span className="text-3xl font-bold">€{pkg.price}</span>
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

      {/* Cost Factors */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.costFactorsTitle}</h2>
            <p className="text-muted-foreground">{labels.costFactorsDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factors.map((factor) => {
              const IconComponent = iconMap[factor.icon] || Layers
              return (
                <Card key={factor.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{factor.title}</h3>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{comparison.title}</h2>
            <p className="text-muted-foreground">{comparison.description}</p>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 pb-4 border-b-2 border-primary/20">
                {comparison.headers.map((header, index) => (
                  <div key={header} className={`font-semibold text-sm ${index === 1 ? 'text-primary' : ''}`}>
                    {header}
                    {index === 1 && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {cl === 'de' ? 'Beste Wahl' : 'Best Choice'}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {comparison.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-4 gap-4 py-4 border-b border-muted">
                  <div className="font-medium text-sm">{row.label}</div>
                  <div className="text-sm text-primary font-medium">{row.agentur}</div>
                  <div className="text-sm text-muted-foreground">{row.freelancer}</div>
                  <div className="text-sm text-muted-foreground">{row.baukasten}</div>
                </div>
              ))}
            </div>
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
