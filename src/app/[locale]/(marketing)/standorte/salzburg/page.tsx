import { Metadata } from 'next'
import Link from 'next/link'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Salzburg - Service-Area (KEIN LocalBusiness!)
const seoData = {
  de: {
    title: 'Digitalagentur Salzburg | Webdesign, SEO & Marketing',
    description: 'GoldenWing betreut Salzburger Unternehmen – Webdesign, SEO, Online Marketing. Tourismus, Festspiele, Premium-Brands. Remote aus Wien, ITG fördert bis 50%!',
    keywords: ['Digitalagentur Salzburg', 'Webagentur Salzburg', 'Online Marketing Salzburg', 'SEO Agentur Salzburg'],
  },
  en: {
    title: 'Digital Agency Salzburg | Web Design, SEO & Marketing',
    description: 'GoldenWing serves Salzburg businesses – web design, SEO, online marketing. Tourism, festivals, premium brands. Remotely from Vienna.',
    keywords: ['Digital Agency Salzburg', 'Web Agency Salzburg', 'Online Marketing Salzburg'],
  },
}

// UNIQUE Content für Salzburg - Tourismus/Festspiele/Premium Fokus
const contentData = {
  de: {
    heroTitle: 'Digitalagentur Salzburg',
    heroSubtitle: 'Webdesign, SEO & Online Marketing für Salzburger Unternehmen',
    heroDescription: 'Von den Festspielen bis zu Red Bull – Salzburg steht für Premium und Kultur. Wir verstehen diese Welt. Remote betreut aus Wien, mit persönlichem Kickoff in Salzburg.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Leistungen ansehen',

    // UNIQUE: Salzburg-spezifische Einleitung
    introTitle: 'Warum Salzburg besonders ist',
    introText: `Salzburg ist einzigartig: Weltkulturerbe, Festspiele, Mozart – und Red Bull als globaler Player. Die Stadt verbindet Tradition mit Premium-Anspruch.

Wir verstehen diese Balance: Websites, die Kultur und Qualität ausstrahlen, aber auch conversion-optimiert sind.

**Unser Salzburg-Modell:** Remote-Betreuung aus Wien. Kickoff vor Ort in Salzburg (2h 20min Westbahn). Perfekt für Premium-Projekte, die persönliche Betreuung brauchen.`,

    // UNIQUE: Salzburg-spezifische Branchen
    industriesTitle: 'Branchen, die wir in Salzburg betreuen',
    industries: [
      {
        name: 'Tourismus & Hotellerie',
        description: 'Luxushotels, Restaurants, Incoming-Agenturen – Buchungssysteme, mehrsprachige Websites, SEO für internationale Gäste.',
        icon: 'hotel',
      },
      {
        name: 'Kultur & Events',
        description: 'Festspiele, Museen, Kulturinstitutionen – digitale Präsenzen, die Salzburgs kulturellen Anspruch widerspiegeln.',
        icon: 'music',
      },
      {
        name: 'Premium & Lifestyle',
        description: 'Red Bull, Porsche, Getreidegasse-Boutiquen – Websites für Marken mit Premium-Anspruch.',
        icon: 'star',
      },
      {
        name: 'Ski & Outdoor',
        description: 'Ski Amadé, Sporthotels, Outdoor-Marken – Buchungssysteme, Webcams, Live-Daten.',
        icon: 'mountain',
      },
    ],

    // UNIQUE: ITG Salzburg Förderung (50%!)
    fundingTitle: 'Förderung in Salzburg',
    fundingDescription: `Das **Land Salzburg** und die **WKO Salzburg** fördern Digitalisierungsprojekte für KMUs.

Förderhöhen variieren je nach Programm – oft bis zu 30-50% der Projektkosten.

Wir helfen beim Antrag – kostenlos und unverbindlich.`,
    fundingLink: 'https://www.wko.at/sbg',

    servicesTitle: 'Unsere Leistungen für Salzburg',
    services: [
      {
        title: 'Webdesign Salzburg',
        description: 'Premium-Websites für Tourismus, Kultur, Lifestyle.',
        href: '/standorte/salzburg/webdesign',
        price: 'ab €3.500',
      },
      {
        title: 'SEO Salzburg',
        description: 'Suchmaschinenoptimierung für internationale Gäste.',
        href: '/standorte/salzburg/seo',
        price: 'ab €490/Monat',
      },
      {
        title: 'Werbeagentur Salzburg',
        description: 'Branding, Grafik Design für Premium-Marken.',
        href: '/standorte/salzburg/werbeagentur',
        price: 'auf Anfrage',
      },
    ],

    // UNIQUE: Salzburg-spezifische FAQs
    faqTitle: 'Häufige Fragen – Salzburg',
    faqs: [
      {
        question: 'Habt ihr ein Büro in Salzburg?',
        answer: 'Nein, wir arbeiten remote aus Wien. Für Kickoff und wichtige Meetings kommen wir nach Salzburg (2h 20min Westbahn). Premium-Projekte betreuen wir gerne persönlich.',
      },
      {
        question: 'Kennt ihr die Salzburger Tourismus-Branche?',
        answer: 'Ja. Wir haben Erfahrung mit Hotels, Incoming-Agenturen und Kulturinstitutionen. Mehrsprachige Websites und Buchungssysteme sind unser Daily Business.',
      },
      {
        question: 'Stimmt es, dass ITG Salzburg 50% fördert?',
        answer: 'Ja! Der ITG-Digitalisierungsbonus fördert bis zu 50% (max. €10.000). Das ist die höchste Quote in Österreich. Wir helfen beim Antrag.',
      },
      {
        question: 'Was kostet eine Website für Salzburger Unternehmen?',
        answer: 'Premium-Websites: €5.000-15.000. Mit ITG-Förderung zahlen Sie nur die Hälfte. Einfache Seiten starten bei €3.500.',
      },
      {
        question: 'Könnt ihr mehrsprachige Websites?',
        answer: 'Ja, das ist unser Kerngeschäft. DE, EN, IT, FR – wichtig für Salzburger Tourismus und internationale Gäste.',
      },
    ],

    ctaTitle: 'Projekt aus Salzburg?',
    ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in Salzburg.',
  },
  en: {
    heroTitle: 'Digital Agency Salzburg',
    heroSubtitle: 'Web Design, SEO & Online Marketing for Salzburg Businesses',
    heroDescription: 'From festivals to Red Bull – Salzburg stands for premium and culture. We understand this world. Remotely managed from Vienna.',
    ctaPrimary: 'Request Project',
    ctaSecondary: 'View Services',

    introTitle: 'Why Salzburg is Special',
    introText: `Salzburg is unique: World Heritage Site, festivals, Mozart – and Red Bull as a global player. The city combines tradition with premium standards.

**Our Salzburg Model:** Remote support from Vienna. Kickoff on-site in Salzburg (2h 20min by train).`,

    industriesTitle: 'Industries We Serve in Salzburg',
    industries: [
      { name: 'Tourism & Hospitality', description: 'Luxury hotels, restaurants – booking systems, multilingual websites.', icon: 'hotel' },
      { name: 'Culture & Events', description: 'Festivals, museums – digital presence reflecting Salzburg\'s cultural claim.', icon: 'music' },
      { name: 'Premium & Lifestyle', description: 'Red Bull, premium brands – websites for brands with premium standards.', icon: 'star' },
      { name: 'Ski & Outdoor', description: 'Ski Amadé, sport hotels – booking systems, live data.', icon: 'mountain' },
    ],

    fundingTitle: 'Funding in Salzburg',
    fundingDescription: `**Salzburg regional government** and **WKO Salzburg** fund digitalization projects for SMEs.

Funding rates vary by program – often 30-50% of project costs.

We help with the application – free and non-binding.`,
    fundingLink: 'https://www.wko.at/sbg',

    servicesTitle: 'Our Services for Salzburg',
    services: [
      { title: 'Web Design Salzburg', description: 'Premium websites for tourism, culture.', href: '/standorte/salzburg/webdesign', price: 'from €3,500' },
      { title: 'SEO Salzburg', description: 'SEO for international guests.', href: '/standorte/salzburg/seo', price: 'from €490/month' },
    ],

    faqTitle: 'FAQ – Salzburg',
    faqs: [
      { question: 'Do you have an office in Salzburg?', answer: 'No, we work remotely from Vienna. For kickoff we come to Salzburg.' },
      { question: 'Is it true ITG Salzburg funds 50%?', answer: 'Yes! The highest rate in Austria. We help with the application.' },
    ],

    ctaTitle: 'Project from Salzburg?',
    ctaDescription: 'Free consultation – via video or on-site in Salzburg.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/salzburg')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/salzburg', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortSalzburgPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const c = contentData[locale] || contentData.de

  // Service Schema (NICHT LocalBusiness!)
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
      name: 'Salzburg',
      containedInPlace: {
        '@type': 'State',
        name: 'Salzburg',
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
      { '@type': 'ListItem', position: 3, name: 'Salzburg', item: 'https://goldenwing.at/standorte/salzburg' },
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                📍 Service-Area Salzburg
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
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  {c.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{c.introTitle}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                {c.introText}
              </div>
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
                    <span className="text-2xl">
                      {industry.icon === 'hotel' && '🏨'}
                      {industry.icon === 'music' && '🎭'}
                      {industry.icon === 'star' && '⭐'}
                      {industry.icon === 'mountain' && '⛷️'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                  <p className="text-muted-foreground">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funding Section - HIGHLIGHT 50%! */}
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold mb-4">
                🎉 Bis zu 50% Förderung!
              </div>
              <h2 className="text-3xl font-bold mb-6">{c.fundingTitle}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line mb-6">
                {c.fundingDescription}
              </div>
              <a
                href={c.fundingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline"
              >
                Mehr zu Förderungen →
              </a>
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
        <WeitereStandorte currentCity="salzburg" locale={locale as 'de' | 'en' | 'ru'} />

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
