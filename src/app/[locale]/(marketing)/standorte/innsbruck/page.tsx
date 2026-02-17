import { Metadata } from 'next'
import Link from 'next/link'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Innsbruck - Service-Area (KEIN LocalBusiness!)
const seoData = {
  de: {
    title: 'Digitalagentur Innsbruck | Webdesign, SEO & Marketing Tirol',
    description: 'GoldenWing betreut Tiroler Unternehmen – Webdesign, SEO, Online Marketing. Outdoor-Brands, Life Sciences, Tourismus. Remote aus Wien, Standortagentur Tirol fördert bis 30%.',
    keywords: ['Digitalagentur Innsbruck', 'Webagentur Innsbruck', 'Online Marketing Innsbruck', 'SEO Agentur Innsbruck'],
  },
  en: {
    title: 'Digital Agency Innsbruck | Web Design, SEO & Marketing Tyrol',
    description: 'GoldenWing serves Tyrolean businesses – web design, SEO, online marketing. Outdoor brands, life sciences, tourism. Remotely from Vienna.',
    keywords: ['Digital Agency Innsbruck', 'Web Agency Innsbruck', 'Online Marketing Innsbruck'],
  },
}

// UNIQUE Content für Innsbruck - Outdoor/Life Sciences/Uni Fokus
const contentData = {
  de: {
    heroTitle: 'Digitalagentur Innsbruck',
    heroSubtitle: 'Webdesign, SEO & Online Marketing für Tiroler Unternehmen',
    heroDescription: 'Von der Nordkette bis zum MCI – Innsbruck verbindet Berge, Forschung und Innovation. Wir verstehen diese einzigartige Mischung. Remote betreut aus Wien, mit persönlichem Kickoff in Innsbruck.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Leistungen ansehen',

    // UNIQUE: Innsbruck-spezifische Einleitung
    introTitle: 'Warum Innsbruck besonders ist',
    introText: `Innsbruck ist einzigartig: Olympiastadt, größte Uni West-Österreichs, Outdoor-Hauptstadt der Alpen. Die Med-Uni forscht auf Weltniveau, MCI-Startups innovieren, und Outdoor-Brands wie Atomic oder HEAD haben hier ihre Wurzeln.

Wir verstehen diese Welt: Websites für Outdoor-Brands, die Abenteuer vermitteln. Digitale Präsenzen für Life Sciences, die Vertrauen schaffen. E-Commerce für den internationalen Markt.

**Unser Innsbruck-Modell:** Remote-Betreuung aus Wien. Kickoff vor Ort in Innsbruck (4h 10min Zug oder 1h Flug). Für wichtige Projekte regelmäßig vor Ort.`,

    // UNIQUE: Innsbruck-spezifische Branchen
    industriesTitle: 'Branchen, die wir in Innsbruck betreuen',
    industries: [
      {
        name: 'Outdoor & Sport',
        description: 'Atomic, HEAD, Salewa-Nähe – E-Commerce für Outdoor-Brands, Händlerportale, internationale Märkte.',
        icon: 'mountain',
      },
      {
        name: 'Life Sciences',
        description: 'Med-Uni Innsbruck, Biotech-Startups – seriöse Websites für Forschung, klinische Studien, Investor Relations.',
        icon: 'science',
      },
      {
        name: 'Tourismus & Ski',
        description: 'Nordkette, Stubaital, Axamer Lizum – Buchungssysteme, Webcams, Live-Schneehöhen.',
        icon: 'ski',
      },
      {
        name: 'Uni & Startups',
        description: 'MCI, Uni Innsbruck – Websites für Spinoffs, Forschungsprojekte, akademische Institutionen.',
        icon: 'graduation',
      },
    ],

    // UNIQUE: Standortagentur Tirol Förderung
    fundingTitle: 'Förderung in Tirol',
    fundingDescription: `**Standortagentur Tirol** fördert Digitalisierungsprojekte mit bis zu 30% (max. €10.000).

Bei einem Website-Projekt von €10.000 zahlen Sie effektiv ~€7.000.

Zusätzlich: FFG-Förderungen für F&E-nahe Projekte.

Wir helfen beim Antrag – kostenlos und unverbindlich.`,
    fundingLink: 'https://standort-tirol.at/foerderungen',

    servicesTitle: 'Unsere Leistungen für Innsbruck',
    services: [
      {
        title: 'Webdesign Innsbruck',
        description: 'E-Commerce für Outdoor, Websites für Life Sciences.',
        href: '/standorte/innsbruck/webdesign',
        price: 'ab €3.500',
      },
      {
        title: 'SEO Innsbruck',
        description: 'International SEO für Outdoor-Brands.',
        href: '/standorte/innsbruck/seo',
        price: 'ab €490/Monat',
      },
      {
        title: 'Werbeagentur Innsbruck',
        description: 'Branding für Outdoor und Forschung.',
        href: '/standorte/innsbruck/werbeagentur',
        price: 'auf Anfrage',
      },
    ],

    // UNIQUE: Innsbruck-spezifische FAQs
    faqTitle: 'Häufige Fragen – Innsbruck',
    faqs: [
      {
        question: 'Habt ihr ein Büro in Innsbruck?',
        answer: 'Nein, wir arbeiten remote aus Wien. Für Kickoff und wichtige Meetings kommen wir nach Innsbruck. Bei längeren Projekten regelmäßig vor Ort.',
      },
      {
        question: 'Kennt ihr die Outdoor-Branche?',
        answer: 'Ja. Wir verstehen E-Commerce für Sportartikel, internationale Händlerstrukturen und die Herausforderungen globaler Brands.',
      },
      {
        question: 'Könnt ihr Websites für Life Sciences?',
        answer: 'Ja. Seriöse, vertrauenswürdige Websites für Forschung, klinische Studien und Investor Relations. DSGVO und Medizinprodukte-Compliance ist uns vertraut.',
      },
      {
        question: 'Welche Förderungen gibt es in Tirol?',
        answer: 'Standortagentur Tirol fördert Digitalisierung bis 30%. FFG für F&E-nahe Projekte. Wir beraten kostenlos.',
      },
      {
        question: 'Was kostet eine Website für Innsbrucker Unternehmen?',
        answer: 'Starter: ab €3.500. E-Commerce/Outdoor: €10.000-20.000. Life Sciences: €8.000-15.000. Förderung reduziert diese Kosten.',
      },
    ],

    ctaTitle: 'Projekt aus Tirol?',
    ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in Innsbruck.',
  },
  en: {
    heroTitle: 'Digital Agency Innsbruck',
    heroSubtitle: 'Web Design, SEO & Online Marketing for Tyrolean Businesses',
    heroDescription: 'From Nordkette to MCI – Innsbruck combines mountains, research and innovation. Remotely managed from Vienna, with personal kickoff in Innsbruck.',
    ctaPrimary: 'Request Project',
    ctaSecondary: 'View Services',

    introTitle: 'Why Innsbruck is Special',
    introText: `Innsbruck is unique: Olympic city, largest university in Western Austria, outdoor capital of the Alps. Med-Uni researches at world level, MCI startups innovate.

**Our Innsbruck Model:** Remote support from Vienna. Kickoff on-site in Innsbruck.`,

    industriesTitle: 'Industries We Serve in Innsbruck',
    industries: [
      { name: 'Outdoor & Sports', description: 'Atomic, HEAD – e-commerce for outdoor brands, dealer portals.', icon: 'mountain' },
      { name: 'Life Sciences', description: 'Med-Uni Innsbruck – serious websites for research, clinical trials.', icon: 'science' },
      { name: 'Tourism & Ski', description: 'Nordkette, Stubai – booking systems, webcams.', icon: 'ski' },
      { name: 'University & Startups', description: 'MCI, Uni Innsbruck – websites for spinoffs.', icon: 'graduation' },
    ],

    fundingTitle: 'Funding in Tyrol',
    fundingDescription: `**Standortagentur Tirol** funds digitalization projects up to 30%.

We help with the application – free and non-binding.`,
    fundingLink: 'https://standort-tirol.at/foerderungen',

    servicesTitle: 'Our Services for Innsbruck',
    services: [
      { title: 'Web Design Innsbruck', description: 'E-commerce for outdoor, websites for life sciences.', href: '/standorte/innsbruck/webdesign', price: 'from €3,500' },
      { title: 'SEO Innsbruck', description: 'International SEO for outdoor brands.', href: '/standorte/innsbruck/seo', price: 'from €490/month' },
    ],

    faqTitle: 'FAQ – Innsbruck',
    faqs: [
      { question: 'Do you have an office in Innsbruck?', answer: 'No, we work remotely from Vienna. For kickoff we come to Innsbruck.' },
      { question: 'What funding is available in Tyrol?', answer: 'Standortagentur Tirol funds digitalization up to 30%.' },
    ],

    ctaTitle: 'Project from Tyrol?',
    ctaDescription: 'Free consultation – via video or on-site in Innsbruck.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/innsbruck')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/innsbruck', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortInnsbruckPage({ params }: { params: Promise<{ locale: string }> }) {
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
      name: 'Innsbruck',
      containedInPlace: {
        '@type': 'State',
        name: 'Tirol',
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
      { '@type': 'ListItem', position: 3, name: 'Innsbruck', item: 'https://goldenwing.at/standorte/innsbruck' },
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
                📍 Service-Area Innsbruck
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
                      {industry.icon === 'mountain' && '🏔️'}
                      {industry.icon === 'science' && '🔬'}
                      {industry.icon === 'ski' && '⛷️'}
                      {industry.icon === 'graduation' && '🎓'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                  <p className="text-muted-foreground">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funding Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
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
        <WeitereStandorte currentCity="innsbruck" locale={locale as 'de' | 'en' | 'ru'} />

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
