import { Metadata } from 'next'
import Link from 'next/link'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'
import { Landmark, Pill, Gem, Bitcoin, MapPin, Coins } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Zürich - Service-Area
const seoData = {
  de: {
    title: 'Digitalagentur Zürich | Webdesign, SEO & Marketing aus Wien',
    description: 'GoldenWing betreut Schweizer Unternehmen von Wien aus – Webdesign, SEO, Online Marketing. Wiener Kreativität, deutlich günstiger als Zürcher Agenturen.',
    keywords: ['Digitalagentur Zürich', 'Webagentur Zürich', 'Online Marketing Zürich', 'SEO Agentur Zürich'],
  },
  en: {
    title: 'Digital Agency Zurich | Web Design, SEO & Marketing from Vienna',
    description: 'GoldenWing serves Swiss businesses from Vienna – web design, SEO, online marketing. Viennese creativity, significantly cheaper than Zurich agencies.',
    keywords: ['Digital Agency Zurich', 'Web Agency Zurich', 'Online Marketing Zurich'],
  },
}

// UNIQUE Content für Zürich - Finance, Pharma, Premium
const contentData = {
  de: {
    heroTitle: 'Digitalagentur Zürich',
    heroSubtitle: 'Webdesign, SEO & Online Marketing – aus Wien für die Schweiz',
    heroDescription: 'Zürich ist die teuerste Stadt Europas. Zürcher Agenturen entsprechend. Wir bieten Schweizer Anspruch zu österreichischen Preisen.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Warum Wien?',

    // UNIQUE: Warum Wien für Zürich
    introTitle: 'Warum eine Wiener Agentur für Zürich?',
    introText: `Zürcher Agenturpreise sind 60-100% höher als in Wien.`,
    introPoints: [
      { bold: 'Schweizer Qualitätsanspruch', text: 'Wir kennen die Erwartungen' },
      { bold: 'Österreichische Preise', text: 'Drastisch günstiger, ohne Kompromisse' },
      { bold: 'Deutschsprachig', text: 'Perfektes Hochdeutsch, kein Schweizerdeutsch nötig' },
      { bold: 'EU-Sitz', text: 'Einfachere Rechnungsstellung als mit Schweizer Agenturen' },
    ],
    introFooter: 'Wien–Zürich: 1h 10min Flug oder 7h 45min Zug. Für wichtige Meetings vor Ort.',

    // UNIQUE: Zürich-spezifische Branchen
    industriesTitle: 'Branchen, die wir in Zürich betreuen',
    industries: [
      {
        name: 'Finance & Banking',
        description: 'UBS, Credit Suisse Umfeld, FinTech, Crypto – seriöse, vertrauenswürdige digitale Präsenzen für den Finanzplatz.',
        Icon: Landmark,
      },
      {
        name: 'Pharma & Biotech',
        description: 'Roche, Novartis Nähe – Compliance-konforme Websites, klinische Studien, Investor Relations.',
        Icon: Pill,
      },
      {
        name: 'Luxury & Premium',
        description: 'Bahnhofstrasse-Niveau – Websites für Luxusmarken, Uhren, Schmuck, Premium-Retail.',
        Icon: Gem,
      },
      {
        name: 'Tech & Crypto',
        description: 'Crypto Valley Zug, ETH Spin-offs – moderne Websites für Web3, AI, DeepTech.',
        Icon: Bitcoin,
      },
    ],

    // Preisvorteil Schweiz massiv!
    fundingTitle: 'Der massive Preisvorteil',
    fundingExample: 'Beispiel Website-Projekt:',
    fundingComparison: [
      { label: 'Zürcher Agentur', price: '~CHF 25.000 (€26.000)' },
      { label: 'GoldenWing', price: '€12.000' },
    ],
    fundingConclusion: 'Gleiche Qualität. 55% günstiger.',
    fundingExtra: 'Bei Schweizer Preisniveau ist der Unterschied enorm. Das gesparte Budget können Sie in Marketing investieren.',
    fundingLink: '/kontakt',

    servicesTitle: 'Unsere Leistungen für Zürich',
    services: [
      {
        title: 'Webdesign Zürich',
        description: 'Premium-Websites zu österreichischen Preisen.',
        href: '/standorte/zuerich/webdesign',
        price: 'ab €3.500',
      },
      {
        title: 'SEO Zürich',
        description: 'Suchmaschinenoptimierung für die Schweiz.',
        href: '/standorte/zuerich/seo',
        price: 'ab €490/Monat',
      },
      {
        title: 'Branding Zürich',
        description: 'Markenidentität für Schweizer Unternehmen.',
        href: '/standorte/zuerich/branding',
        price: 'ab €2.500',
      },
    ],

    // UNIQUE: Zürich-spezifische FAQs
    faqTitle: 'Häufige Fragen – Zürich',
    faqs: [
      {
        question: 'Warum sollte ich eine österreichische Agentur beauftragen?',
        answer: 'Weil Sie bei gleicher Qualität 50-60% sparen. Wir verstehen Schweizer Qualitätsanspruch, arbeiten aber zu österreichischen Kosten.',
      },
      {
        question: 'Wie funktioniert die Rechnungsstellung?',
        answer: 'Als EU-Unternehmen stellen wir in Euro. Für Sie oft einfacher als mit Schweizer Agenturen. Keine MwSt-Komplikationen.',
      },
      {
        question: 'Versteht ihr Schweizer Markt?',
        answer: 'Ja. Wir kennen den Qualitätsanspruch, die Zurückhaltung in der Kommunikation und die Erwartung an Perfektion. Keine Kompromisse.',
      },
      {
        question: 'Was kostet eine Website für Zürcher Unternehmen?',
        answer: 'Starter: ab €3.500. Business: €8.000-15.000. Premium/Finance: ab €20.000. Das ist 50-60% unter Zürcher Marktpreisen.',
      },
      {
        question: 'Könnt ihr nach Zürich kommen?',
        answer: 'Ja! 1h 10min Flug. Für Kickoff, wichtige Präsentationen oder Workshops kommen wir gerne. Oder Sie besuchen uns in Wien.',
      },
      {
        question: 'Arbeitet ihr auch für andere Schweizer Städte?',
        answer: 'Ja – Basel, Bern, Genf, Lausanne. Alles remote möglich, bei Bedarf vor Ort.',
      },
    ],

    ctaTitle: 'Schweizer Qualität, österreichische Preise?',
    ctaDescription: 'Kostenloses Erstgespräch – wir zeigen, was möglich ist.',
  },
  en: {
    heroTitle: 'Digital Agency Zurich',
    heroSubtitle: 'Web Design, SEO & Online Marketing – from Vienna for Switzerland',
    heroDescription: 'Zurich is Europe\'s most expensive city. Zurich agencies accordingly. We offer Swiss standards at Austrian prices.',
    ctaPrimary: 'Request Project',
    ctaSecondary: 'Why Vienna?',

    introTitle: 'Why a Viennese Agency for Zurich?',
    introText: 'Zurich agency prices are 60-100% higher than in Vienna.',
    introPoints: [
      { bold: 'Swiss Quality Standards', text: 'We know the expectations' },
      { bold: 'Austrian Prices', text: 'Drastically cheaper, no compromises' },
      { bold: 'German-Speaking', text: 'Perfect High German' },
    ],
    introFooter: 'Vienna–Zurich: 1h 10min flight or 7h 45min train. On-site for important meetings.',

    industriesTitle: 'Industries We Serve in Zurich',
    industries: [
      { name: 'Finance & Banking', description: 'UBS, Credit Suisse environment, FinTech, Crypto.', Icon: Landmark },
      { name: 'Pharma & Biotech', description: 'Roche, Novartis – compliance-conform websites.', Icon: Pill },
      { name: 'Luxury & Premium', description: 'Bahnhofstrasse level – websites for luxury brands.', Icon: Gem },
      { name: 'Tech & Crypto', description: 'Crypto Valley Zug, ETH spin-offs – Web3, AI.', Icon: Bitcoin },
    ],

    fundingTitle: 'The Massive Price Advantage',
    fundingExample: 'Example website project:',
    fundingComparison: [
      { label: 'Zurich agency', price: '~CHF 25,000 (€26,000)' },
      { label: 'GoldenWing', price: '€12,000' },
    ],
    fundingConclusion: 'Same quality. 55% cheaper.',
    fundingExtra: '',
    fundingLink: '/kontakt',

    servicesTitle: 'Our Services for Zurich',
    services: [
      { title: 'Web Design Zurich', description: 'Premium websites at Austrian prices.', href: '/standorte/zuerich/webdesign', price: 'from €3,500' },
      { title: 'SEO Zurich', description: 'Search engine optimization for Switzerland.', href: '/standorte/zuerich/seo', price: 'from €490/month' },
    ],

    faqTitle: 'FAQ – Zurich',
    faqs: [
      { question: 'Why hire an Austrian agency?', answer: 'Save 50-60% with same quality. We understand Swiss quality standards.' },
      { question: 'How does invoicing work?', answer: 'As EU company, we invoice in Euro. Often simpler than with Swiss agencies.' },
    ],

    ctaTitle: 'Swiss Quality, Austrian Prices?',
    ctaDescription: 'Free consultation – we\'ll show you what\'s possible.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/zuerich')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/zuerich', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortZuerichPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const c = contentData[locale] || contentData.de

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.heroTitle,
    description: c.heroDescription,
    provider: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
    areaServed: {
      '@type': 'City',
      name: 'Zürich',
      containedInPlace: {
        '@type': 'Country',
        name: 'Switzerland',
      },
    },
    serviceType: ['Web Design', 'SEO', 'Online Marketing', 'Branding'],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://goldenwing.at' },
      { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Standorte' : 'Locations', item: 'https://goldenwing.at/standorte' },
      { '@type': 'ListItem', position: 3, name: 'Zürich', item: 'https://goldenwing.at/standorte/zuerich' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-white/10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Service für die Schweiz
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {c.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                {c.heroSubtitle}
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {c.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {c.ctaPrimary}
                </Link>
                <Link
                  href="#warum-wien"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  {c.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section id="warum-wien" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{c.introTitle}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                <strong>{c.introText}</strong>
              </p>
              <p className="text-lg text-muted-foreground mb-4">GoldenWing {locale === 'de' ? 'bietet' : 'offers'}:</p>
              <ul className="space-y-3 mb-6">
                {c.introPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>{point.bold}:</strong> {point.text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">{c.introFooter}</p>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{c.industriesTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.industries.map((industry, index) => (
                <div key={index} className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <industry.Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                  <p className="text-muted-foreground">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Massive Price Advantage Section */}
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold mb-4">
                <Coins className="w-4 h-4" />
                55% {locale === 'de' ? 'günstiger als Zürich' : 'cheaper than Zurich'}
              </div>
              <h2 className="text-3xl font-bold mb-6">{c.fundingTitle}</h2>
              <p className="text-lg text-muted-foreground mb-4">
                <strong>{c.fundingExample}</strong>
              </p>
              <div className="space-y-2 mb-4">
                {c.fundingComparison.map((item, i) => (
                  <p key={i} className="text-muted-foreground">
                    - {item.label}: {item.price}
                  </p>
                ))}
              </div>
              <p className="text-xl font-bold text-primary mb-4">{c.fundingConclusion}</p>
              {c.fundingExtra && (
                <p className="text-muted-foreground">{c.fundingExtra}</p>
              )}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{c.servicesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {c.services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <span className="text-sm font-medium text-primary">{service.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{c.faqTitle}</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {c.faqs.map((faq, index) => (
                <div key={index} className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weitere Standorte - GEO/SEO Cross-Links */}
        <WeitereStandorte currentCity="zuerich" locale={locale as 'de' | 'en' | 'ru'} />

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{c.ctaDescription}</p>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors"
            >
              {locale === 'de' ? 'Jetzt kontaktieren' : 'Contact Now'}
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
