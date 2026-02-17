import { Metadata } from 'next'
import NextLink from 'next/link'
import Image from 'next/image'
import { Link } from '@/lib/i18n-navigation'
import { ArrowRight, ShoppingCart, CheckCircle, Phone, Euro, Clock, Shield, Store, Palette, Settings, TrendingUp, Quote, Star, Award, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// E-E-A-T: Author Info
const authorInfo = {
  name: 'Deni Khachukaev',
  role: { de: 'Technical Director & E-Commerce Experte', en: 'Technical Director & E-Commerce Expert' },
  experience: { de: '13+ Jahre Erfahrung in Webentwicklung und E-Commerce', en: '13+ years experience in web development and e-commerce' },
  credentials: { de: '150+ Online-Shops entwickelt, WooCommerce & Shopify zertifiziert', en: '150+ online shops developed, WooCommerce & Shopify certified' },
  image: '/api/media/file/Deni%20Khachukaev.jpeg',
}

// E-E-A-T: Statistics with Sources (GEO/LLM optimized - citable facts)
const industryStats = {
  de: [
    { stat: '87%', label: 'der Käufer recherchieren online vor dem Kauf', source: 'Statista 2024' },
    { stat: '€5.500', label: 'durchschnittliche Kosten für einen Basis-Webshop in DACH', source: 'iBusiness 2024' },
    { stat: '4-8 Wochen', label: 'typische Entwicklungszeit für mittelgroße Shops', source: 'GoldenWing Projektdaten' },
    { stat: '23%', label: 'des Einzelhandelsumsatzes in AT erfolgt online', source: 'Handelsverband AT 2024' },
  ],
  en: [
    { stat: '87%', label: 'of buyers research online before purchasing', source: 'Statista 2024' },
    { stat: '€5,500', label: 'average cost for a basic webshop in DACH region', source: 'iBusiness 2024' },
    { stat: '4-8 weeks', label: 'typical development time for medium shops', source: 'GoldenWing Project Data' },
    { stat: '23%', label: 'of retail revenue in AT is online', source: 'Handelsverband AT 2024' },
  ],
}

// E-E-A-T: Client Testimonials (real shop projects)
const testimonials = {
  de: [
    { text: 'Der neue Online-Shop hat unseren Umsatz um 340% gesteigert. Die Investition hat sich in 4 Monaten amortisiert.', name: 'Inna', company: 'Weingut Habsburg', result: '+340% Umsatz' },
    { text: 'Von der Beratung bis zum Launch alles aus einer Hand. Besonders die Anbindung an unser Warenwirtschaftssystem war perfekt.', name: 'Husein', company: 'Lamberg', result: 'ERP-Integration' },
    { text: 'Endlich ein Shop, der auf allen Geräten perfekt funktioniert. Die Conversion Rate ist deutlich gestiegen.', name: 'Ramzan', company: 'Kraftpack', result: '+89% Conversion' },
  ],
  en: [
    { text: 'The new online shop increased our revenue by 340%. The investment paid off in 4 months.', name: 'Inna', company: 'Weingut Habsburg', result: '+340% Revenue' },
    { text: 'From consultation to launch, everything from one source. The connection to our ERP system was perfect.', name: 'Husein', company: 'Lamberg', result: 'ERP Integration' },
    { text: 'Finally a shop that works perfectly on all devices. The conversion rate has increased significantly.', name: 'Ramzan', company: 'Kraftpack', result: '+89% Conversion' },
  ],
}

// E-E-A-T: Partner/Technology Logos
const _partnerLogos = [
  { name: 'WooCommerce', logo: '/images/partners/woocommerce.svg' },
  { name: 'Shopify', logo: '/images/partners/shopify.svg' },
  { name: 'Stripe', logo: '/images/partners/stripe.svg' },
  { name: 'PayPal', logo: '/images/partners/paypal.svg' },
  { name: 'Klarna', logo: '/images/partners/klarna.svg' },
]

// Case Studies (real projects for E-E-A-T)
const caseStudies = {
  de: [
    { name: 'Weingut Habsburg', type: 'WooCommerce Shop', products: '120+ Weine', result: '+340% Umsatz nach Relaunch', url: '/referenzen' },
    { name: 'Lamberg', type: 'B2B Shop mit ERP', products: '500+ Produkte', result: 'Vollautomatisierte Bestellabwicklung', url: '/referenzen' },
    { name: 'Kraftpack', type: 'Shopify Shop', products: '80+ Produkte', result: '+89% Conversion Rate', url: '/referenzen' },
  ],
  en: [
    { name: 'Weingut Habsburg', type: 'WooCommerce Shop', products: '120+ Wines', result: '+340% revenue after relaunch', url: '/referenzen' },
    { name: 'Lamberg', type: 'B2B Shop with ERP', products: '500+ Products', result: 'Fully automated order processing', url: '/referenzen' },
    { name: 'Kraftpack', type: 'Shopify Shop', products: '80+ Products', result: '+89% conversion rate', url: '/referenzen' },
  ],
}

// Cost Overview Data - Key for AI Overview
const costOverview = {
  de: [
    { type: 'Kleiner Shop', products: '1-50 Produkte', priceRange: '990 € – 3.500 €', duration: '2-4 Wochen', description: 'Ideal für Startups und kleine Sortimente' },
    { type: 'Mittelgroßer Shop', products: '50-500 Produkte', priceRange: '3.500 € – 8.000 €', duration: '4-8 Wochen', description: 'Für wachsende Unternehmen mit mehr Funktionen' },
    { type: 'Großer Shop', products: '500+ Produkte', priceRange: '8.000 € – 20.000 €', duration: '8-16 Wochen', description: 'Enterprise-Lösung mit ERP-Integration' },
    { type: 'Individual-Entwicklung', products: 'Unbegrenzt', priceRange: 'ab 20.000 €', duration: 'Nach Absprache', description: 'Maßgeschneiderte Lösung für komplexe Anforderungen' },
  ],
  en: [
    { type: 'Small Shop', products: '1-50 Products', priceRange: '€990 – €3,500', duration: '2-4 Weeks', description: 'Ideal for startups and small catalogs' },
    { type: 'Medium Shop', products: '50-500 Products', priceRange: '€3,500 – €8,000', duration: '4-8 Weeks', description: 'For growing businesses with more features' },
    { type: 'Large Shop', products: '500+ Products', priceRange: '€8,000 – €20,000', duration: '8-16 Weeks', description: 'Enterprise solution with ERP integration' },
    { type: 'Custom Development', products: 'Unlimited', priceRange: 'from €20,000', duration: 'By arrangement', description: 'Tailored solution for complex requirements' },
  ],
}

// Process Steps
const processSteps = {
  de: [
    { num: '01', title: 'Anforderungsanalyse', description: 'Wir analysieren Ihre Produkte, Zielgruppe und Anforderungen. Welche Funktionen braucht Ihr Shop? Welche Integrationen sind nötig?' },
    { num: '02', title: 'Konzept & Design', description: 'Wir erstellen ein Konzept für Struktur und Navigation. Das Design wird auf Ihre Marke und Conversion-Optimierung ausgerichtet.' },
    { num: '03', title: 'Shop-Entwicklung', description: 'Programmierung des Shops mit WooCommerce, Shopify oder individueller Lösung. Integration von Zahlungsanbietern und Versand.' },
    { num: '04', title: 'Produkteinpflege', description: 'Wir übernehmen die Einpflege Ihrer Produkte inkl. Beschreibungen, Bilder, Varianten und Kategorien.' },
    { num: '05', title: 'Testing & Launch', description: 'Umfangreiche Tests aller Funktionen. Schulung für Sie, dann Go-Live und Übergabe.' },
  ],
  en: [
    { num: '01', title: 'Requirements Analysis', description: 'We analyze your products, target audience, and requirements. What features does your shop need? What integrations are necessary?' },
    { num: '02', title: 'Concept & Design', description: 'We create a concept for structure and navigation. The design is tailored to your brand and conversion optimization.' },
    { num: '03', title: 'Shop Development', description: 'Programming the shop with WooCommerce, Shopify, or custom solution. Integration of payment providers and shipping.' },
    { num: '04', title: 'Product Entry', description: 'We handle entering your products including descriptions, images, variants, and categories.' },
    { num: '05', title: 'Testing & Launch', description: 'Comprehensive testing of all functions. Training for you, then go-live and handover.' },
  ],
}

// Shop Systems Comparison
const shopSystems = {
  de: [
    { name: 'WooCommerce', description: 'WordPress-basiert, keine Lizenzkosten, volle Kontrolle', pros: ['Keine monatlichen Gebühren', 'Volle Flexibilität', 'Große Plugin-Auswahl', 'Eigenes Hosting'], cons: ['Technisches Know-how nötig', 'Wartung erforderlich'], bestFor: 'Unternehmen mit eigenem Server und technischem Team' },
    { name: 'Shopify', description: 'Cloud-Lösung, einfach zu bedienen, schneller Start', pros: ['Einfache Bedienung', 'Hosting inklusive', 'Guter Support', '24/7 Verfügbarkeit'], cons: ['Monatliche Gebühren (ab 36€)', 'Weniger Flexibilität'], bestFor: 'Einsteiger und schnelle Markteinführung' },
    { name: 'Custom Shop', description: 'Individuelle Entwicklung für spezielle Anforderungen', pros: ['100% maßgeschneidert', 'Keine Einschränkungen', 'Skalierbar', 'Einzigartig'], cons: ['Höhere Kosten', 'Längere Entwicklungszeit'], bestFor: 'Komplexe B2B-Shops und spezielle Branchen' },
  ],
  en: [
    { name: 'WooCommerce', description: 'WordPress-based, no license fees, full control', pros: ['No monthly fees', 'Full flexibility', 'Large plugin selection', 'Own hosting'], cons: ['Technical know-how needed', 'Maintenance required'], bestFor: 'Companies with own server and technical team' },
    { name: 'Shopify', description: 'Cloud solution, easy to use, quick start', pros: ['Easy to use', 'Hosting included', 'Good support', '24/7 availability'], cons: ['Monthly fees (from €36)', 'Less flexibility'], bestFor: 'Beginners and quick market entry' },
    { name: 'Custom Shop', description: 'Custom development for special requirements', pros: ['100% tailored', 'No limitations', 'Scalable', 'Unique'], cons: ['Higher costs', 'Longer development time'], bestFor: 'Complex B2B shops and special industries' },
  ],
}

// FAQs focused on costs
const faqs = {
  de: [
    { question: 'Was kostet es, einen Webshop erstellen zu lassen?', answer: 'Die Kosten für einen professionellen Webshop liegen zwischen 990 € und 50.000 €, abhängig von Größe und Komplexität. Ein kleiner Shop mit bis zu 50 Produkten kostet ca. 990-3.500 €. Mittelgroße Shops (50-500 Produkte) liegen bei 3.500-8.000 €. Für große Enterprise-Lösungen mit ERP-Anbindung sollten Sie 8.000-20.000 € oder mehr einplanen.' },
    { question: 'Wie lange dauert es, einen Online-Shop erstellen zu lassen?', answer: 'Die Entwicklungszeit hängt vom Umfang ab: Kleine Shops sind in 2-4 Wochen fertig, mittelgroße Shops benötigen 4-8 Wochen, und große Enterprise-Projekte 8-16 Wochen. Bei uns erhalten Sie einen verbindlichen Zeitplan nach der Anforderungsanalyse.' },
    { question: 'WooCommerce oder Shopify - was ist günstiger?', answer: 'WooCommerce hat keine Lizenzkosten, Sie zahlen nur für Hosting (ab ca. 20€/Monat) und ggf. Premium-Plugins. Shopify kostet ab 36€/Monat plus Transaktionsgebühren. Langfristig ist WooCommerce oft günstiger, Shopify dafür einfacher zu bedienen.' },
    { question: 'Was ist im Preis für die Shop-Erstellung enthalten?', answer: 'Bei uns ist enthalten: Konzeption, Design, Programmierung, Einrichtung der Zahlungsarten, Versandintegration, Basis-SEO, Produkteinpflege (bis zu einer definierten Anzahl), SSL-Zertifikat, Schulung und 3 Monate Support nach Launch.' },
    { question: 'Gibt es versteckte Kosten?', answer: 'Nein. Wir arbeiten mit Festpreisen nach einem verbindlichen Angebot. Zusätzliche Kosten entstehen nur, wenn Sie während des Projekts zusätzliche Features wünschen, die nicht im ursprünglichen Angebot enthalten waren. Dafür erhalten Sie vorher immer einen Kostenvoranschlag.' },
    { question: 'Kann ich meinen Shop später erweitern?', answer: 'Ja, alle unsere Shops sind skalierbar. Sie können jederzeit weitere Produkte, Funktionen, Zahlungsarten oder Sprachen hinzufügen. Wir bieten Wartungsverträge für laufende Betreuung und Erweiterungen an.' },
    { question: 'Bieten Sie auch Shop-Wartung und Support an?', answer: 'Ja, wir bieten Wartungsverträge ab 99€/Monat an. Diese beinhalten: Updates, Backups, Sicherheitschecks, technischen Support und kleinere Änderungen. Auch einmalige Optimierungen oder Erweiterungen sind möglich.' },
    { question: 'Kann ich meinen bestehenden Shop zu Ihnen migrieren?', answer: 'Ja, wir führen Shop-Migrationen durch - z.B. von Jimdo, Wix oder einer alten WooCommerce-Version zu einem modernen System. Die Kosten hängen vom Umfang ab und werden nach Analyse individuell kalkuliert.' },
  ],
  en: [
    { question: 'How much does it cost to have a webshop created?', answer: 'The costs for a professional webshop range from €990 to €50,000, depending on size and complexity. A small shop with up to 50 products costs approx. €990-3,500. Medium shops (50-500 products) are €3,500-8,000. For large enterprise solutions with ERP integration, you should plan €8,000-20,000 or more.' },
    { question: 'How long does it take to create an online shop?', answer: 'Development time depends on scope: Small shops are ready in 2-4 weeks, medium shops need 4-8 weeks, and large enterprise projects 8-16 weeks. With us, you receive a binding schedule after the requirements analysis.' },
    { question: 'WooCommerce or Shopify - which is cheaper?', answer: 'WooCommerce has no license costs, you only pay for hosting (from approx. €20/month) and possibly premium plugins. Shopify costs from €36/month plus transaction fees. Long-term, WooCommerce is often cheaper, but Shopify is easier to use.' },
    { question: 'What is included in the shop creation price?', answer: 'With us, this is included: Concept, design, programming, payment method setup, shipping integration, basic SEO, product entry (up to a defined number), SSL certificate, training, and 3 months support after launch.' },
    { question: 'Are there hidden costs?', answer: 'No. We work with fixed prices based on a binding offer. Additional costs only arise if you want additional features during the project that were not included in the original offer. You always receive a cost estimate beforehand.' },
    { question: 'Can I expand my shop later?', answer: 'Yes, all our shops are scalable. You can add more products, features, payment methods, or languages at any time. We offer maintenance contracts for ongoing support and extensions.' },
    { question: 'Do you also offer shop maintenance and support?', answer: 'Yes, we offer maintenance contracts from €99/month. These include: Updates, backups, security checks, technical support, and minor changes. One-time optimizations or extensions are also possible.' },
    { question: 'Can I migrate my existing shop to you?', answer: 'Yes, we perform shop migrations - e.g., from Jimdo, Wix, or an old WooCommerce version to a modern system. Costs depend on scope and are calculated individually after analysis.' },
  ],
}

// What's included
const included = {
  de: [
    { icon: Palette, title: 'Individuelles Design', description: 'Kein Template - Ihr Shop sieht einzigartig aus' },
    { icon: ShoppingCart, title: 'Shop-Einrichtung', description: 'Zahlungsarten, Versand, Steuern komplett eingerichtet' },
    { icon: Store, title: 'Produkteinpflege', description: 'Wir übernehmen die Einpflege Ihrer Produkte' },
    { icon: Shield, title: 'SSL & Sicherheit', description: 'DSGVO-konform, SSL-Zertifikat, sichere Zahlung' },
    { icon: TrendingUp, title: 'Basis-SEO', description: 'Grundlegende Suchmaschinenoptimierung inklusive' },
    { icon: Settings, title: 'Schulung & Support', description: 'Admin-Schulung + 3 Monate Support' },
  ],
  en: [
    { icon: Palette, title: 'Custom Design', description: 'No template - your shop looks unique' },
    { icon: ShoppingCart, title: 'Shop Setup', description: 'Payment methods, shipping, taxes fully configured' },
    { icon: Store, title: 'Product Entry', description: 'We handle entering your products' },
    { icon: Shield, title: 'SSL & Security', description: 'GDPR compliant, SSL certificate, secure payment' },
    { icon: TrendingUp, title: 'Basic SEO', description: 'Basic search engine optimization included' },
    { icon: Settings, title: 'Training & Support', description: 'Admin training + 3 months support' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = {
    de: 'Webshop erstellen lassen | Kosten ab 990€ | Wien',
    en: 'Have Webshop Created | Costs from €990 | Vienna',
  }[locale as 'de' | 'en'] ?? 'Have Webshop Created | Costs from €990 | Vienna'

  const metaDescription = truncateMetaDescription(
    {
      de: 'Webshop erstellen lassen: Kosten von 990€ bis 20.000€ je nach Größe. Kleiner Shop ab 990€, mittelgroßer Shop ab 3.500€, Enterprise ab 8.000€. WooCommerce & Shopify Agentur Wien.',
      en: 'Have a webshop created: Costs from €990 to €20,000 depending on size. Small shop from €990, medium shop from €3,500, Enterprise from €8,000. WooCommerce & Shopify agency Vienna.',
    }[locale as 'de' | 'en'] ?? 'Have a webshop created: Costs from €990 to €20,000 depending on size. Small shop from €990, medium shop from €3,500, Enterprise from €8,000. WooCommerce & Shopify agency Vienna.'
  )

  const hreflangAlternates = getHreflangAlternates('/webshop-erstellen-lassen', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: {
      de: ['Webshop erstellen lassen', 'Webshop erstellen lassen Kosten', 'Online Shop erstellen lassen', 'Webshop Kosten', 'E-Commerce Agentur Wien', 'WooCommerce Shop erstellen', 'Shopify Shop erstellen'],
      en: ['Have webshop created', 'Webshop creation costs', 'Have online shop created', 'Webshop costs', 'E-Commerce agency Vienna', 'Create WooCommerce shop', 'Create Shopify shop'],
    }[locale as 'de' | 'en'] ?? ['Have webshop created', 'Webshop creation costs', 'Have online shop created'],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: getCanonicalUrl('/webshop-erstellen-lassen', locale),
    },
    alternates: {
      canonical: getCanonicalUrl('/webshop-erstellen-lassen', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebshopErstellenLassenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const isGerman = locale === 'de'

  const costs = costOverview[locale as 'de' | 'en'] ?? costOverview['de']
  const steps = processSteps[locale as 'de' | 'en'] ?? processSteps['de']
  const systems = shopSystems[locale as 'de' | 'en'] ?? shopSystems['de']
  const faqItems = faqs[locale as 'de' | 'en'] ?? faqs['de']
  const includedItems = included[locale as 'de' | 'en'] ?? included['de']
  const stats = industryStats[locale as 'de' | 'en'] ?? industryStats['de']
  const reviews = testimonials[locale as 'de' | 'en'] ?? testimonials['de']
  const cases = caseStudies[locale as 'de' | 'en'] ?? caseStudies['de']

  // Schema for cost table (important for AI Overview)
  const priceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isGerman ? 'Webshop Erstellung' : 'Webshop Creation',
    description: isGerman
      ? 'Professionelle Webshop-Erstellung mit WooCommerce oder Shopify'
      : 'Professional webshop creation with WooCommerce or Shopify',
    brand: { '@type': 'Brand', name: 'GoldenWing Creative Studios' },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '990',
      highPrice: '50000',
      priceCurrency: 'EUR',
      offerCount: costs.length,
      offers: costs.map((cost) => ({
        '@type': 'Offer',
        name: cost.type,
        description: cost.description,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: cost.priceRange,
          priceCurrency: 'EUR',
        },
      })),
    },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isGerman ? 'Webshop erstellen lassen - Der Prozess' : 'Have Webshop Created - The Process',
    description: isGerman
      ? 'So läuft die Erstellung Ihres Webshops bei uns ab'
      : 'This is how the creation of your webshop works with us',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  }

  // E-E-A-T: Author Schema
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isGerman ? 'Webshop erstellen lassen: Kosten, Ablauf & Systeme' : 'Have Webshop Created: Costs, Process & Systems',
    author: {
      '@type': 'Person',
      name: authorInfo.name,
      jobTitle: authorInfo.role[locale as 'de' | 'en'] ?? authorInfo.role['de'],
      worksFor: {
        '@type': 'Organization',
        name: 'GoldenWing Creative Studios',
        url: 'https://goldenwing.at',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      logo: { '@type': 'ImageObject', url: 'https://goldenwing.at/logo.png' },
    },
    datePublished: '2024-01-15',
    dateModified: '2026-01-27',
  }

  // E-E-A-T: Review Schema
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GoldenWing Creative Studios',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{isGerman ? 'E-Commerce Agentur Wien' : 'E-Commerce Agency Vienna'}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {isGerman ? 'Webshop erstellen lassen' : 'Have Webshop Created'}
            </h1>
            <p className="text-2xl text-primary font-medium mb-4">
              {isGerman ? 'Kosten, Ablauf & Systeme im Überblick' : 'Costs, Process & Systems Overview'}
            </p>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {isGerman
                ? 'Sie möchten einen professionellen Webshop erstellen lassen? Hier erfahren Sie, was ein Online-Shop kostet, wie der Ablauf funktioniert und welches System zu Ihnen passt.'
                : 'Want to have a professional webshop created? Here you\'ll learn what an online shop costs, how the process works, and which system suits you.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {isGerman ? 'Kostenloses Angebot anfordern' : 'Request Free Quote'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#kosten">{isGerman ? 'Preise ansehen' : 'View Prices'}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Cost Overview - THE KEY SECTION for AI Overview */}
      <section id="kosten" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Euro className="h-5 w-5" />
              <span className="font-medium">{isGerman ? 'Kostenübersicht' : 'Cost Overview'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isGerman ? 'Was kostet ein Webshop?' : 'What Does a Webshop Cost?'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isGerman
                ? 'Die Kosten für einen Webshop hängen von Größe, Funktionsumfang und Komplexität ab. Hier eine Übersicht:'
                : 'Webshop costs depend on size, features, and complexity. Here\'s an overview:'}
            </p>
          </div>

          {/* Cost Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">{isGerman ? 'Shop-Typ' : 'Shop Type'}</th>
                  <th className="text-left p-4 font-semibold">{isGerman ? 'Produkte' : 'Products'}</th>
                  <th className="text-left p-4 font-semibold">{isGerman ? 'Preis' : 'Price'}</th>
                  <th className="text-left p-4 font-semibold">{isGerman ? 'Dauer' : 'Duration'}</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">{isGerman ? 'Beschreibung' : 'Description'}</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{cost.type}</td>
                    <td className="p-4 text-muted-foreground">{cost.products}</td>
                    <td className="p-4">
                      <span className="font-semibold text-primary">{cost.priceRange}</span>
                    </td>
                    <td className="p-4 text-muted-foreground">{cost.duration}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{cost.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cost Breakdown Cards (Mobile) */}
          <div className="grid md:hidden gap-4 mt-8">
            {costs.map((cost, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{cost.type}</h3>
                    <span className="text-primary font-bold">{cost.priceRange}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{cost.products} • {cost.duration}</p>
                  <p className="text-sm text-muted-foreground">{cost.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-background rounded-xl border">
            <p className="text-sm text-muted-foreground">
              <strong>{isGerman ? 'Hinweis:' : 'Note:'}</strong>{' '}
              {isGerman
                ? 'Die Preise sind Richtwerte. Der genaue Preis hängt von Ihren individuellen Anforderungen ab. Wir erstellen Ihnen gerne ein kostenloses, unverbindliches Angebot.'
                : 'Prices are guidelines. The exact price depends on your individual requirements. We\'ll be happy to provide you with a free, non-binding quote.'}
            </p>
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isGerman ? 'Das ist bei uns inklusive' : 'This Is Included With Us'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isGerman
                ? 'Bei der Webshop-Erstellung erhalten Sie ein Komplettpaket ohne versteckte Kosten.'
                : 'With webshop creation, you get a complete package with no hidden costs.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedItems.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Clock className="h-5 w-5" />
              <span className="font-medium">{isGerman ? 'Der Ablauf' : 'The Process'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isGerman ? 'So erstellen wir Ihren Webshop' : 'How We Create Your Webshop'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isGerman
                ? 'Ein strukturierter Prozess für ein erfolgreiches Ergebnis.'
                : 'A structured process for a successful result.'}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {step.num}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Shop Systems Comparison */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isGerman ? 'Welches Shop-System passt zu Ihnen?' : 'Which Shop System Suits You?'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isGerman
                ? 'Wir arbeiten mit verschiedenen Plattformen. Hier ein Vergleich:'
                : 'We work with various platforms. Here\'s a comparison:'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {systems.map((system) => (
              <Card key={system.name} className="flex flex-col">
                <CardContent className="p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">{system.name}</h3>
                  <p className="text-muted-foreground mb-4">{system.description}</p>

                  <div className="mb-4">
                    <p className="font-medium text-sm mb-2 text-green-600">{isGerman ? 'Vorteile:' : 'Pros:'}</p>
                    <ul className="space-y-1">
                      {system.pros.map((pro, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-sm mb-2 text-foreground">{isGerman ? 'Nachteile:' : 'Cons:'}</p>
                    <ul className="space-y-1">
                      {system.cons.map((con, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-4 h-4 shrink-0 text-center">–</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm">
                      <span className="font-medium">{isGerman ? 'Am besten für: ' : 'Best for: '}</span>
                      <span className="text-muted-foreground">{system.bestFor}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* GEO/LLM: Industry Statistics with Sources */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isGerman ? 'E-Commerce in Zahlen' : 'E-Commerce in Numbers'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isGerman
                ? 'Aktuelle Statistiken zum Online-Handel in Österreich und der DACH-Region.'
                : 'Current statistics on online retail in Austria and the DACH region.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.stat}</div>
                  <p className="text-sm mb-3">{stat.label}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    {stat.source}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* E-E-A-T: Testimonials */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {isGerman ? 'Das sagen unsere Shop-Kunden' : 'What Our Shop Clients Say'}
            </h2>
            <p className="text-muted-foreground">
              {isGerman ? 'Echte Ergebnisse von echten Projekten.' : 'Real results from real projects.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="mb-4 italic">&quot;{review.text}&quot;</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.company}</p>
                    </div>
                    <Badge variant="secondary">{review.result}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* E-E-A-T: Case Studies */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <Badge className="mb-4">
              <Award className="h-4 w-4 mr-1" />
              {isGerman ? 'Referenzen' : 'Case Studies'}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              {isGerman ? 'Erfolgreiche Shop-Projekte' : 'Successful Shop Projects'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isGerman
                ? 'Auszug aus über 150 erfolgreich umgesetzten Online-Shops.'
                : 'Selection from over 150 successfully implemented online shops.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted-foreground">{project.type}</p>
                    <p className="text-sm">{project.products}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary">{project.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/referenzen">
                {isGerman ? 'Alle Referenzen ansehen' : 'View All References'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* E-E-A-T: Expert Section */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-block mb-6 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {isGerman ? 'Ihr Ansprechpartner' : 'Your Contact'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isGerman ? 'Ihr Experte für Webshops' : 'Your Webshop Expert'}
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-lg text-muted-foreground">
                  {isGerman
                    ? 'Sie möchten einen professionellen Webshop erstellen lassen? Ich berate Sie persönlich zu Ihrem Projekt und finde die beste Lösung für Ihre Anforderungen.'
                    : 'Want to have a professional webshop created? I will personally advise you on your project and find the best solution for your requirements.'}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{authorInfo.experience[locale as 'de' | 'en'] ?? authorInfo.experience['de']}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{authorInfo.credentials[locale as 'de' | 'en'] ?? authorInfo.credentials['de']}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{isGerman ? 'Persönliche Beratung & transparente Kommunikation' : 'Personal consultation & transparent communication'}</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <NextLink href={getContactUrl(locale)}>
                    {isGerman ? 'Kostenloses Erstgespräch' : 'Free Consultation'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </NextLink>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <NextLink href="tel:+436645439681">
                    <Phone className="mr-2 h-4 w-4" />
                    +43 664 543 96 81
                  </NextLink>
                </Button>
              </div>
              {/* Author Name */}
              <div className="mt-8 pt-6 border-t">
                <p className="font-bold text-xl">{authorInfo.name}</p>
                <p className="text-primary">{authorInfo.role[locale as 'de' | 'en'] ?? authorInfo.role['de']}</p>
              </div>
            </div>
            {/* Right: Large Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-[450px] md:w-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={authorInfo.image}
                  alt={`${authorInfo.name} - ${isGerman ? 'Webshop Experte bei GoldenWing' : 'Webshop Expert at GoldenWing'}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 320px, 384px"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQSection
        title={isGerman ? 'Häufige Fragen zur Webshop-Erstellung' : 'Frequently Asked Questions About Webshop Creation'}
        items={faqItems}
        className="bg-muted/30"
      />

      {/* Related Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isGerman ? 'Verwandte Leistungen' : 'Related Services'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{isGerman ? 'Onlineshop Agentur' : 'Online Shop Agency'}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isGerman ? 'Mehr Details zu unseren E-Commerce-Leistungen.' : 'More details about our e-commerce services.'}
                </p>
                <Link href="/leistungen/onlineshop-agentur" className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  {isGerman ? 'Mehr erfahren' : 'Learn more'} <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{isGerman ? 'E-Commerce Agentur' : 'E-Commerce Agency'}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isGerman ? 'Ganzheitliche E-Commerce-Betreuung.' : 'Comprehensive e-commerce support.'}
                </p>
                <Link href="/leistungen/ecommerce-agentur" className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  {isGerman ? 'Mehr erfahren' : 'Learn more'} <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{isGerman ? 'SEO für Online-Shops' : 'SEO for Online Shops'}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isGerman ? 'Mehr Sichtbarkeit für Ihren Shop.' : 'More visibility for your shop.'}
                </p>
                <Link href="/leistungen/seo-content" className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  {isGerman ? 'Mehr erfahren' : 'Learn more'} <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isGerman ? 'Webshop erstellen lassen?' : 'Have a Webshop Created?'}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {isGerman
              ? 'Lassen Sie uns über Ihr Projekt sprechen. Wir erstellen Ihnen ein kostenloses, unverbindliches Angebot.'
              : 'Let\'s talk about your project. We\'ll provide you with a free, non-binding quote.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {isGerman ? 'Kostenloses Angebot anfordern' : 'Request Free Quote'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent hover:bg-primary-foreground/10" asChild>
              <NextLink href="tel:+436645439681">
                <Phone className="mr-2 h-4 w-4" />
                +43 664 543 96 81
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
