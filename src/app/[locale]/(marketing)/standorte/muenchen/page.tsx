import { Metadata } from 'next'
import Link from 'next/link'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: München - Service-Area (KEIN LocalBusiness!)
const seoData = {
  de: {
    title: 'Digitalagentur München | Webdesign, SEO & Marketing aus Wien',
    description: 'GoldenWing betreut Münchner Unternehmen von Wien aus – Webdesign, SEO, Online Marketing. Wiener Qualität zu fairen Preisen. Remote-First für Bayern.',
    keywords: ['Digitalagentur München', 'Webagentur München', 'Online Marketing München', 'SEO Agentur München'],
  },
  en: {
    title: 'Digital Agency Munich | Web Design, SEO & Marketing from Vienna',
    description: 'GoldenWing serves Munich businesses from Vienna – web design, SEO, online marketing. Viennese quality at fair prices.',
    keywords: ['Digital Agency Munich', 'Web Agency Munich', 'Online Marketing Munich'],
  },
}

// UNIQUE Content für München - Premium B2B, Auto, Tech
const contentData = {
  de: {
    heroTitle: 'Digitalagentur München',
    heroSubtitle: 'Webdesign, SEO & Online Marketing – aus Wien für Bayern',
    heroDescription: 'München ist teuer. Wir nicht. Wiener Qualität zu faireren Preisen – für Münchner Unternehmen, die Premium wollen ohne Premium-Agenturpreise.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Warum Wien?',

    // UNIQUE: Warum Wien für München
    introTitle: 'Warum eine Wiener Agentur für München?',
    introText: `**Münchner Agenturpreise sind 40-60% höher** als in Wien – bei vergleichbarer Qualität.

GoldenWing bietet:
- Wiener Kreativität zu fairen Preisen
- Remote-First: Effizient, ohne Münchner Mieten einzupreisen
- Deutschsprachig, gleiche Zeitzone, kulturelles Verständnis
- Kickoff vor Ort möglich (1h 30min Flug oder 4h Zug)

Für Münchner Startups, Mittelständler und Konzerne, die smart einkaufen.`,

    // UNIQUE: München-spezifische Branchen
    industriesTitle: 'Branchen, die wir in München betreuen',
    industries: [
      {
        name: 'Automotive & Mobility',
        description: 'BMW, Audi-Nähe, Zulieferer – B2B-Websites, Händlerportale, Konfiguratoren. Wir kennen die Anforderungen.',
        icon: 'car',
      },
      {
        name: 'Tech & SaaS',
        description: 'München ist Deutschlands Tech-Hub. Moderne Websites für Startups, Scale-ups und Enterprise.',
        icon: 'tech',
      },
      {
        name: 'Finance & Insurance',
        description: 'Allianz, Munich Re Umfeld – seriöse, vertrauenswürdige digitale Präsenzen für FinTech und Versicherungen.',
        icon: 'finance',
      },
      {
        name: 'Medien & Kreativ',
        description: 'ProSiebenSat.1, Burda – Content-Plattformen, Medien-Websites, kreative Projekte.',
        icon: 'media',
      },
    ],

    // Preisvorteil hervorheben
    fundingTitle: 'Der Preisvorteil',
    fundingDescription: `**Beispiel Website-Projekt:**

- Münchner Agentur: ~€15.000
- GoldenWing: €9.000

**Gleiche Qualität. 40% günstiger.**

Wir haben keine Münchner Mieten, keine Münchner Gehälter. Das geben wir weiter.`,
    fundingLink: '/kontakt',

    servicesTitle: 'Unsere Leistungen für München',
    services: [
      {
        title: 'Webdesign München',
        description: 'Premium-Websites zu fairen Preisen.',
        href: '/standorte/muenchen/webdesign',
        price: 'ab €3.500',
      },
      {
        title: 'SEO München',
        description: 'Suchmaschinenoptimierung von Wien aus.',
        href: '/standorte/muenchen/seo',
        price: 'ab €490/Monat',
      },
      {
        title: 'Online Marketing München',
        description: 'Google Ads, LinkedIn Ads für B2B.',
        href: '/standorte/muenchen/online-marketing',
        price: 'ab €590/Monat',
      },
    ],

    // UNIQUE: München-spezifische FAQs
    faqTitle: 'Häufige Fragen – München',
    faqs: [
      {
        question: 'Warum sollte ich eine Wiener Agentur beauftragen?',
        answer: 'Gleiche Qualität, 40% günstiger. Wir sprechen Deutsch, sind in der gleichen Zeitzone, verstehen deutsche Unternehmenskultur. Remote funktioniert exzellent.',
      },
      {
        question: 'Wie funktioniert die Zusammenarbeit?',
        answer: 'Kickoff: Video-Call oder persönlich in München (wir kommen gerne). Laufend: Slack, Video-Calls, gemeinsame Dokumente. Zeitzone ist identisch – keine Verzögerungen.',
      },
      {
        question: 'Was kostet eine Website für Münchner Unternehmen?',
        answer: 'Starter: ab €3.500. Business: €7.500-12.000. Enterprise: ab €15.000. Das ist 30-40% unter Münchner Marktpreisen.',
      },
      {
        question: 'Könnt ihr vor Ort kommen?',
        answer: 'Ja! München ist 1h 30min Flug oder 4h Zug von Wien. Für Kickoff, Workshops oder Präsentationen kommen wir gerne.',
      },
      {
        question: 'Wie ist das mit Rechnungen/Steuern?',
        answer: 'Innerhalb der EU gilt Reverse Charge – Sie zahlen keine österreichische USt. Rechnungsstellung ist unkompliziert.',
      },
    ],

    ctaTitle: 'Premium ohne Premium-Preise?',
    ctaDescription: 'Kostenloses Erstgespräch – wir zeigen, was möglich ist.',
  },
  en: {
    heroTitle: 'Digital Agency Munich',
    heroSubtitle: 'Web Design, SEO & Online Marketing – from Vienna for Bavaria',
    heroDescription: 'Munich is expensive. We\'re not. Viennese quality at fairer prices – for Munich businesses.',
    ctaPrimary: 'Request Project',
    ctaSecondary: 'Why Vienna?',

    introTitle: 'Why a Viennese Agency for Munich?',
    introText: `**Munich agency prices are 40-60% higher** than in Vienna – with comparable quality.

GoldenWing offers:
- Viennese creativity at fair prices
- Remote-First: Efficient, without Munich rents factored in
- German-speaking, same timezone, cultural understanding`,

    industriesTitle: 'Industries We Serve in Munich',
    industries: [
      { name: 'Automotive & Mobility', description: 'BMW, Audi suppliers – B2B websites, dealer portals.', icon: 'car' },
      { name: 'Tech & SaaS', description: 'Germany\'s tech hub – modern websites for startups.', icon: 'tech' },
      { name: 'Finance & Insurance', description: 'Allianz, Munich Re environment – serious digital presence.', icon: 'finance' },
      { name: 'Media & Creative', description: 'ProSiebenSat.1, Burda – content platforms.', icon: 'media' },
    ],

    fundingTitle: 'The Price Advantage',
    fundingDescription: `**Example website project:**

- Munich agency: ~€15,000
- GoldenWing: €9,000

**Same quality. 40% cheaper.**`,
    fundingLink: '/kontakt',

    servicesTitle: 'Our Services for Munich',
    services: [
      { title: 'Web Design Munich', description: 'Premium websites at fair prices.', href: '/standorte/muenchen/webdesign', price: 'from €3,500' },
      { title: 'SEO Munich', description: 'Search engine optimization from Vienna.', href: '/standorte/muenchen/seo', price: 'from €490/month' },
    ],

    faqTitle: 'FAQ – Munich',
    faqs: [
      { question: 'Why hire a Viennese agency?', answer: 'Same quality, 40% cheaper. We speak German, same timezone, understand German business culture.' },
      { question: 'How does collaboration work?', answer: 'Kickoff: Video call or in-person in Munich. Ongoing: Slack, video calls. Same timezone – no delays.' },
    ],

    ctaTitle: 'Premium without Premium Prices?',
    ctaDescription: 'Free consultation – we\'ll show you what\'s possible.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/muenchen')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/muenchen', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortMuenchenPage({ params }: { params: Promise<{ locale: string }> }) {
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
      name: 'München',
      containedInPlace: {
        '@type': 'Country',
        name: 'Germany',
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
      { '@type': 'ListItem', position: 3, name: 'München', item: 'https://goldenwing.at/standorte/muenchen' },
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-white/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium mb-6">
                🇩🇪 Service für München
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

        {/* Intro Section - Warum Wien */}
        <section id="warum-wien" className="py-16 bg-muted/30">
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
                      {industry.icon === 'car' && '🚗'}
                      {industry.icon === 'tech' && '💻'}
                      {industry.icon === 'finance' && '🏦'}
                      {industry.icon === 'media' && '📺'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                  <p className="text-muted-foreground">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price Advantage Section */}
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold mb-4">
                💰 40% günstiger als München
              </div>
              <h2 className="text-3xl font-bold mb-6">{c.fundingTitle}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line mb-6">
                {c.fundingDescription}
              </div>
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
        <WeitereStandorte currentCity="muenchen" locale={locale as 'de' | 'en' | 'ru'} />

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
