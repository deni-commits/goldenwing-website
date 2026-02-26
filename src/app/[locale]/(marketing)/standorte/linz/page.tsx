import { Metadata } from 'next'
import Link from 'next/link'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Linz - Service-Area (KEIN LocalBusiness!)
const seoData = {
  de: {
    title: 'Digitalagentur Linz | Webdesign, SEO & Marketing für Oberösterreich',
    description: 'GoldenWing betreut oberösterreichische Unternehmen – Webdesign, SEO, Online Marketing. Remote aus Wien, mit tiefem Verständnis für Linzer Industrie. Business Upper Austria fördert bis 30%.',
    keywords: ['Digitalagentur Linz', 'Webagentur Linz', 'Online Marketing Linz', 'SEO Agentur Linz'],
  },
  en: {
    title: 'Digital Agency Linz | Web Design, SEO & Marketing for Upper Austria',
    description: 'GoldenWing serves Upper Austrian businesses – web design, SEO, online marketing. Remotely from Vienna, with deep understanding for Linz industry.',
    keywords: ['Digital Agency Linz', 'Web Agency Linz', 'Online Marketing Linz', 'SEO Agency Linz'],
  },
}

// UNIQUE Content für Linz - Industrie/Stahl/Tech Fokus
const contentData = {
  de: {
    heroTitle: 'Digitalagentur Linz',
    heroSubtitle: 'Webdesign, SEO & Online Marketing für oberösterreichische Unternehmen',
    heroDescription: 'Von der Voestalpine bis zum Tech-Startup in der Tabakfabrik – wir verstehen die Linzer Wirtschaft. Remote betreut aus Wien, mit persönlichem Kickoff in Linz.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Leistungen ansehen',

    // UNIQUE: Linz-spezifische Einleitung
    introTitle: 'Warum Linz besonders ist',
    introText: `Linz ist Oberösterreichs Wirtschaftsmotor – Schwerindustrie trifft auf Tech-Szene. Die Voestalpine, Borealis und hunderte Zulieferer prägen die Region. Gleichzeitig wächst die Startup-Szene in der Tabakfabrik.

Wir verstehen beide Welten: B2B-Industrie mit komplexen Produkten UND agile Tech-Unternehmen mit schnellen Zyklen.

**Unser Linz-Modell:** Remote-Betreuung aus Wien. Kickoff und wichtige Meetings: Vor Ort in Linz (1h 15min mit der Westbahn). Das spart Kosten ohne Qualitätsverlust.`,

    // UNIQUE: Linz-spezifische Branchen
    industriesTitle: 'Branchen, die wir in Linz betreuen',
    industries: [
      {
        name: 'Stahl & Schwerindustrie',
        description: 'Voestalpine und Zulieferer – B2B-Websites für technische Produkte, Produktkataloge mit CAD-Downloads, mehrsprachig für internationale Kunden.',
        icon: 'factory',
      },
      {
        name: 'Chemie & Kunststoff',
        description: 'Borealis, Greiner, und die Chemie-Cluster – Produktdatenbanken, technische Spezifikationen, Compliance-Dokumentation.',
        icon: 'beaker',
      },
      {
        name: 'Tech & Startups',
        description: 'Die Tabakfabrik-Szene boomt. Dynatrace, Catalysts, und viele Startups brauchen moderne Websites und Growth Marketing.',
        icon: 'rocket',
      },
      {
        name: 'Maschinenbau',
        description: 'Palfinger, Engel, und die Maschinenbau-Cluster – Konfiguratoren, Händlerportale, Service-Dokumentation.',
        icon: 'cog',
      },
    ],

    // UNIQUE: Business Upper Austria Förderung
    fundingTitle: 'Förderung in Oberösterreich',
    fundingDescription: `**Business Upper Austria** fördert Digitalisierungsprojekte mit bis zu 30% (max. €15.000).

Bei einem Website-Projekt von €10.000 zahlen Sie effektiv nur ~€7.000.

Wir helfen beim Antrag – kostenlos und unverbindlich.`,
    fundingLink: 'https://www.biz-up.at',

    servicesTitle: 'Unsere Leistungen für Linz',
    services: [
      {
        title: 'Webdesign Linz',
        description: 'B2B-Websites, Produktkataloge, Konfiguratoren für oberösterreichische Industrie.',
        href: '/standorte/linz/webdesign',
        price: 'ab €3.500',
      },
      {
        title: 'SEO Linz',
        description: 'Suchmaschinenoptimierung für technische Produkte und Industriekunden.',
        href: '/standorte/linz/seo',
        price: 'ab €490/Monat',
      },
      {
        title: 'Online Marketing Linz',
        description: 'Google Ads, LinkedIn Ads für B2B Lead-Generierung.',
        href: '/standorte/linz/online-marketing',
        price: 'ab €590/Monat',
      },
      {
        title: 'Werbeagentur Linz',
        description: 'Branding, Grafik Design, Corporate Identity für OÖ Unternehmen.',
        href: '/standorte/linz/werbeagentur',
        price: 'auf Anfrage',
      },
    ],

    // UNIQUE: Linz-spezifische FAQs
    faqTitle: 'Häufige Fragen – Linz',
    faqs: [
      {
        question: 'Habt ihr ein Büro in Linz?',
        answer: 'Nein, wir arbeiten remote aus Wien. Für Kickoff und wichtige Meetings kommen wir nach Linz (1h 15min Westbahn). Das spart Overhead-Kosten, die wir an Sie weitergeben.',
      },
      {
        question: 'Kennt ihr die oberösterreichische Industrie?',
        answer: 'Ja. Wir haben Erfahrung mit B2B-Industrie: Stahl, Maschinenbau, Chemie. Wir verstehen technische Produkte und B2B-Verkaufsprozesse.',
      },
      {
        question: 'Wie funktioniert die Remote-Zusammenarbeit?',
        answer: 'Kickoff: Workshop vor Ort in Linz (2-3 Stunden). Laufend: Wöchentliche Video-Calls. Abnahmen: Remote oder vor Ort nach Wunsch.',
      },
      {
        question: 'Welche Förderungen gibt es in Oberösterreich?',
        answer: 'Business Upper Austria fördert Digitalisierung bis 30% (max. €15.000). Weitere Programme je nach Projekt. Wir beraten kostenlos.',
      },
      {
        question: 'Was kostet eine Website für Linzer Unternehmen?',
        answer: 'Starter: ab €3.500. Business mit Produktkatalog: €7.500-12.000. Industrie-Projekte: ab €15.000. Förderung reduziert diese Kosten um bis zu 30%.',
      },
    ],

    ctaTitle: 'Projekt aus Oberösterreich?',
    ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in Linz.',
  },
  en: {
    heroTitle: 'Digital Agency Linz',
    heroSubtitle: 'Web Design, SEO & Online Marketing for Upper Austrian Businesses',
    heroDescription: 'From Voestalpine to tech startups in Tabakfabrik – we understand Linz business. Remotely managed from Vienna, with personal kickoff in Linz.',
    ctaPrimary: 'Request Project',
    ctaSecondary: 'View Services',

    introTitle: 'Why Linz is Special',
    introText: `Linz is Upper Austria's economic powerhouse – heavy industry meets tech scene. Voestalpine, Borealis and hundreds of suppliers shape the region. Meanwhile, the startup scene thrives in Tabakfabrik.

We understand both worlds: B2B industry with complex products AND agile tech companies with fast cycles.

**Our Linz Model:** Remote support from Vienna. Kickoff and important meetings: On-site in Linz (1h 15min by train). This saves costs without compromising quality.`,

    industriesTitle: 'Industries We Serve in Linz',
    industries: [
      { name: 'Steel & Heavy Industry', description: 'Voestalpine and suppliers – B2B websites for technical products, multilingual.', icon: 'factory' },
      { name: 'Chemistry & Plastics', description: 'Borealis, Greiner – product databases, technical specifications.', icon: 'beaker' },
      { name: 'Tech & Startups', description: 'The Tabakfabrik scene – modern websites and growth marketing.', icon: 'rocket' },
      { name: 'Mechanical Engineering', description: 'Palfinger, Engel – configurators, dealer portals.', icon: 'cog' },
    ],

    fundingTitle: 'Funding in Upper Austria',
    fundingDescription: `**Business Upper Austria** funds digitalization projects up to 30% (max €15,000).

We help with the application – free and non-binding.`,
    fundingLink: 'https://www.biz-up.at',

    servicesTitle: 'Our Services for Linz',
    services: [
      { title: 'Web Design Linz', description: 'B2B websites, product catalogs for Upper Austrian industry.', href: '/standorte/linz/webdesign', price: 'from €3,500' },
      { title: 'SEO Linz', description: 'Search engine optimization for technical products.', href: '/standorte/linz/seo', price: 'from €490/month' },
      { title: 'Online Marketing Linz', description: 'Google Ads, LinkedIn Ads for B2B.', href: '/standorte/linz/online-marketing', price: 'from €590/month' },
    ],

    faqTitle: 'FAQ – Linz',
    faqs: [
      { question: 'Do you have an office in Linz?', answer: 'No, we work remotely from Vienna. For kickoff and important meetings we come to Linz (1h 15min by train).' },
      { question: 'Do you know Upper Austrian industry?', answer: 'Yes. We have experience with B2B industry: steel, mechanical engineering, chemistry.' },
      { question: 'What funding is available in Upper Austria?', answer: 'Business Upper Austria funds digitalization up to 30% (max €15,000).' },
    ],

    ctaTitle: 'Project from Upper Austria?',
    ctaDescription: 'Free consultation – via video or on-site in Linz.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/linz')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/linz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortLinzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const c = contentData[locale] || contentData.de

  // Service Schema (NICHT LocalBusiness - wir haben kein Büro in Linz!)
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
      name: 'Linz',
      containedInPlace: {
        '@type': 'State',
        name: 'Oberösterreich',
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
      { '@type': 'ListItem', position: 3, name: 'Linz', item: 'https://goldenwing.at/standorte/linz' },
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
                📍 Service-Area Linz
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
                      {industry.icon === 'factory' && '🏭'}
                      {industry.icon === 'beaker' && '🧪'}
                      {industry.icon === 'rocket' && '🚀'}
                      {industry.icon === 'cog' && '⚙️'}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <WeitereStandorte currentCity="linz" locale={locale as 'de' | 'en' | 'ru'} />

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
