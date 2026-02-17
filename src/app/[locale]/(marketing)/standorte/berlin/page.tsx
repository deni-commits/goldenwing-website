import { Metadata } from 'next'
import Link from 'next/link'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2: Berlin - Service-Area
const seoData = {
  de: {
    title: 'Digitalagentur Berlin | Webdesign, SEO & Marketing aus Wien',
    description: 'GoldenWing betreut Berliner Startups und Unternehmen von Wien aus – Webdesign, SEO, Online Marketing. Startup-Erfahrung, faire Preise.',
    keywords: ['Digitalagentur Berlin', 'Webagentur Berlin', 'Online Marketing Berlin', 'SEO Agentur Berlin'],
  },
  en: {
    title: 'Digital Agency Berlin | Web Design, SEO & Marketing from Vienna',
    description: 'GoldenWing serves Berlin startups and businesses from Vienna – web design, SEO, online marketing. Startup experience, fair prices.',
    keywords: ['Digital Agency Berlin', 'Web Agency Berlin', 'Online Marketing Berlin'],
  },
}

// UNIQUE Content für Berlin - Startups, Tech, Kreativ
const contentData = {
  de: {
    heroTitle: 'Digitalagentur Berlin',
    heroSubtitle: 'Webdesign, SEO & Online Marketing – aus Wien für Berlin',
    heroDescription: 'Berlin baut. Wir auch. Websites für Startups, Scale-ups und Kreative – von einer Agentur, die versteht, dass Budget oft knapp ist.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Warum Wien?',

    // UNIQUE: Warum Wien für Berlin
    introTitle: 'Warum eine Wiener Agentur für Berlin?',
    introText: `Berlin hat die coolsten Startups. Aber auch sehr hohe Erwartungen bei begrenztem Budget.

GoldenWing passt perfekt:
- **Startup-DNA**: Wir kennen schnelle Zyklen, MVPs, Pivots
- **Faire Preise**: Günstiger als Berliner Agenturen, ohne Qualitätseinbußen
- **Remote-Native**: So wie Berliner Startups selbst arbeiten
- **Kreative Freiheit**: Keine Corporate-Zwänge, frische Ideen

Von Wien nach Berlin: 1h 15min Flug. Für Pitch-Meetings sind wir da.`,

    // UNIQUE: Berlin-spezifische Branchen
    industriesTitle: 'Wen wir in Berlin betreuen',
    industries: [
      {
        name: 'Startups & Scale-ups',
        description: 'Von Pre-Seed bis Series C – Websites die wachsen, Pitchdecks die überzeugen, Marketing das skaliert.',
        icon: 'rocket',
      },
      {
        name: 'Tech & SaaS',
        description: 'N26, Zalando-Ecosystem, DeepTech – moderne Web-Apps, Produkt-Websites, Developer Docs.',
        icon: 'tech',
      },
      {
        name: 'Kreativ & Kultur',
        description: 'Galerien, Musik, Film – Websites die Kunst sind, nicht nur Werbung.',
        icon: 'art',
      },
      {
        name: 'Impact & Social',
        description: 'Purpose-driven Businesses, NGOs, GreenTech – Websites mit Haltung.',
        icon: 'heart',
      },
    ],

    // Startup-Fokus
    fundingTitle: 'Startup-freundlich',
    fundingDescription: `**Wir verstehen Startup-Reality:**

- MVP-First: Schnell launchen, dann iterieren
- Budget-Bewusst: Premium-Qualität ohne Premium-Preise
- Equity-Deals: In Ausnahmefällen möglich
- Schnelle Turnarounds: Weil Funding-Runden nicht warten

Typische Website: €5.000-10.000 statt €15.000+ bei Berliner Agenturen.`,
    fundingLink: '/kontakt',

    servicesTitle: 'Unsere Leistungen für Berlin',
    services: [
      {
        title: 'Webdesign Berlin',
        description: 'Moderne Websites für Startups und Kreative.',
        href: '/standorte/berlin/webdesign',
        price: 'ab €3.500',
      },
      {
        title: 'SEO Berlin',
        description: 'Growth-fokussierte Suchmaschinenoptimierung.',
        href: '/standorte/berlin/seo',
        price: 'ab €490/Monat',
      },
      {
        title: 'Branding Berlin',
        description: 'Markenidentität für Startups.',
        href: '/standorte/berlin/branding',
        price: 'ab €2.500',
      },
    ],

    // UNIQUE: Berlin-spezifische FAQs
    faqTitle: 'Häufige Fragen – Berlin',
    faqs: [
      {
        question: 'Arbeitet ihr mit Startups?',
        answer: 'Ja, sehr gerne! Wir verstehen MVPs, schnelle Iterationen und knappe Budgets. Unsere Prozesse sind lean und auf Startup-Geschwindigkeit ausgelegt.',
      },
      {
        question: 'Wie funktioniert Remote-Zusammenarbeit?',
        answer: 'Wie bei jedem Berliner Startup: Slack, Notion, Figma, Video-Calls. Wir sind remote-native und asynchrone Kommunikation gewohnt.',
      },
      {
        question: 'Was kostet eine Startup-Website?',
        answer: 'MVP-Website: €3.500-5.000. Product-Website: €7.500-10.000. Scale-up mit allem: €15.000+. Immer unter Berliner Marktpreisen.',
      },
      {
        question: 'Könnt ihr für Pitches nach Berlin kommen?',
        answer: 'Ja! Wien-Berlin ist 1h 15min Flug. Für wichtige Meetings, Pitches oder Workshops sind wir vor Ort.',
      },
      {
        question: 'Macht ihr auch Equity-Deals?',
        answer: 'In Ausnahmefällen, bei spannenden Projekten mit klarem Potenzial. Sprechen wir drüber.',
      },
    ],

    ctaTitle: 'Startup aus Berlin?',
    ctaDescription: 'Kostenloses Erstgespräch – keine Pitch-Decks nötig.',
  },
  en: {
    heroTitle: 'Digital Agency Berlin',
    heroSubtitle: 'Web Design, SEO & Online Marketing – from Vienna for Berlin',
    heroDescription: 'Berlin builds. So do we. Websites for startups, scale-ups and creatives.',
    ctaPrimary: 'Request Project',
    ctaSecondary: 'Why Vienna?',

    introTitle: 'Why a Viennese Agency for Berlin?',
    introText: `Berlin has the coolest startups. But also high expectations with limited budget.

GoldenWing is a perfect fit:
- **Startup DNA**: We know fast cycles, MVPs, pivots
- **Fair Prices**: Cheaper than Berlin agencies
- **Remote-Native**: The way Berlin startups work`,

    industriesTitle: 'Who We Serve in Berlin',
    industries: [
      { name: 'Startups & Scale-ups', description: 'From pre-seed to Series C – websites that scale.', icon: 'rocket' },
      { name: 'Tech & SaaS', description: 'N26, Zalando ecosystem – modern web apps.', icon: 'tech' },
      { name: 'Creative & Culture', description: 'Galleries, music, film – websites that are art.', icon: 'art' },
      { name: 'Impact & Social', description: 'Purpose-driven businesses, NGOs, GreenTech.', icon: 'heart' },
    ],

    fundingTitle: 'Startup-friendly',
    fundingDescription: `**We understand startup reality:**

- MVP-First: Launch fast, iterate later
- Budget-Conscious: Premium quality without premium prices
- Fast Turnarounds: Because funding rounds don't wait`,
    fundingLink: '/kontakt',

    servicesTitle: 'Our Services for Berlin',
    services: [
      { title: 'Web Design Berlin', description: 'Modern websites for startups.', href: '/standorte/berlin/webdesign', price: 'from €3,500' },
      { title: 'SEO Berlin', description: 'Growth-focused SEO.', href: '/standorte/berlin/seo', price: 'from €490/month' },
    ],

    faqTitle: 'FAQ – Berlin',
    faqs: [
      { question: 'Do you work with startups?', answer: 'Yes! We understand MVPs, fast iterations and tight budgets.' },
      { question: 'How does remote collaboration work?', answer: 'Like any Berlin startup: Slack, Notion, Figma, video calls.' },
    ],

    ctaTitle: 'Startup from Berlin?',
    ctaDescription: 'Free consultation – no pitch decks needed.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/berlin')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/berlin', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortBerlinPage({ params }: { params: Promise<{ locale: string }> }) {
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
      name: 'Berlin',
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
      { '@type': 'ListItem', position: 3, name: 'Berlin', item: 'https://goldenwing.at/standorte/berlin' },
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
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-yellow-500/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-red-500/10 text-red-600 rounded-full text-sm font-medium mb-6">
                🇩🇪 Service für Berlin
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
                      {industry.icon === 'rocket' && '🚀'}
                      {industry.icon === 'tech' && '💻'}
                      {industry.icon === 'art' && '🎨'}
                      {industry.icon === 'heart' && '💚'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                  <p className="text-muted-foreground">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Startup-friendly Section */}
        <section className="py-16 bg-purple-50 dark:bg-purple-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-bold mb-4">
                🚀 Startup-freundlich
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
        <WeitereStandorte currentCity="berlin" locale={locale as 'de' | 'en' | 'ru'} />

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
