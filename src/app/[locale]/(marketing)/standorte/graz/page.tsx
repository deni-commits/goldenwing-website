import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { MapPin, ArrowRight, Train, Building2, Factory, Cpu, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { Container, Section } from '@/components/ui/container'
import { getCanonicalUrl, getHreflangAlternates, getContactUrl } from '@/lib/utils'
import { BreadcrumbListSchema } from '@/components/seo/json-ld'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// TIER 2 Stadt - KEIN LocalBusiness Schema (nur Service Schema!)
const seoData = {
  de: {
    title: 'Digitalagentur Graz | Webdesign & SEO für die Steiermark',
    description: 'Digitalagentur für Grazer Unternehmen. Webdesign, SEO & Online Marketing – remote betreut aus Wien, mit Verständnis für die steirische Industrie. Förderung SFG bis 30%.',
    keywords: ['Digitalagentur Graz', 'Webdesign Graz', 'SEO Agentur Graz', 'Webagentur Steiermark'],
  },
  en: {
    title: 'Digital Agency Graz | Web Design & SEO for Styria',
    description: 'Digital agency for Graz businesses. Web design, SEO & online marketing – remotely managed from Vienna, with understanding for Styrian industry.',
    keywords: ['Digital Agency Graz', 'Web Design Graz', 'SEO Agency Graz', 'Web Agency Styria'],
  },
}

// UNIQUE Content für Graz - fokussiert auf steirische Industrie
const content = {
  de: {
    badge: 'Service-Area Steiermark',
    heroTitle: 'Digitalagentur Graz',
    heroDescription: 'Webdesign, SEO & Online Marketing für die steirische Wirtschaft – remote betreut aus Wien, mit Verständnis für Automotive, Tech und Industrie.',
    // EHRLICHE KOMMUNIKATION - kein Fake-Büro!
    setupTitle: 'Wie wir mit Grazer Kunden arbeiten',
    setupIntro: 'Wir sind in Wien ansässig, aber wir betreuen Kunden in Graz und der Steiermark seit Jahren erfolgreich.',
    setupItems: [
      { phase: 'Kickoff', description: 'Video-Call oder vor Ort in Graz (wir kommen zu Ihnen)' },
      { phase: 'Konzeption', description: 'Gemeinsame Workshops (remote oder vor Ort)' },
      { phase: 'Umsetzung', description: 'Wöchentliche Video-Updates' },
      { phase: 'Launch', description: 'Abnahme + Einweisung (remote oder persönlich)' },
    ],
    travelInfo: 'Anfahrt Wien → Graz: 2h 35min (Zug) | Für wichtige Termine sind wir vor Ort.',
    // UNIQUE: Grazer Branchen
    industriesTitle: 'Branchen in Graz, die wir verstehen',
    industries: [
      {
        icon: Factory,
        title: 'Automotive & Mobility',
        description: 'Graz ist Österreichs Automotive-Cluster. Magna Steyr, AVL List, und hunderte Zulieferer. Wir verstehen technisch komplexe Produkte und B2B-Anforderungen.',
      },
      {
        icon: Cpu,
        title: 'Tech & IT',
        description: 'Graz hat eine starke Tech-Szene: TU Graz Spin-offs, Parkside, Leftshift. Wir bauen Developer-fokussierte Websites und SaaS-Marketing.',
      },
      {
        icon: Building2,
        title: 'Industrie & Maschinenbau',
        description: 'Andritz, AT&S, und der steirische Mittelstand. Produktkonfiguratoren, technische Dokumentation, mehrsprachige B2B-Websites.',
      },
      {
        icon: GraduationCap,
        title: 'Forschung & Bildung',
        description: 'TU Graz, Uni Graz, FH Joanneum. Wissenschaftskommunikation, Projekt-Websites, Recruiting.',
      },
    ],
    // Services in Graz
    servicesTitle: 'Unsere Leistungen für Graz',
    services: [
      { name: 'Webdesign Graz', href: '/standorte/graz/webdesign', description: 'B2B-Industrie-Websites, Produktkataloge, mehrsprachig' },
      { name: 'SEO Agentur Graz', href: '/standorte/graz/seo', description: 'Local SEO, Technical SEO, Content für Industrie' },
      { name: 'Online Marketing Graz', href: '/standorte/graz/online-marketing', description: 'Google Ads, LinkedIn Ads, B2B Lead-Generation' },
    ],
    // UNIQUE: Förderungen Steiermark
    fundingTitle: 'Förderungen in der Steiermark',
    fundingItems: [
      { name: 'SFG Digitalisierungsbonus', description: 'Bis zu 30% der Kosten (max. €10.000)', link: 'sfg.at' },
      { name: 'Innovationsförderung Steiermark', description: 'Für innovative digitale Projekte', link: 'sfg.at' },
    ],
    fundingCta: 'Wir helfen beim Antrag – viele unserer steirischen Kunden nutzen Förderungen erfolgreich.',
    // Warum Wiener Agentur
    whyTitle: 'Warum eine Wiener Agentur für Graz?',
    whyItems: [
      { title: 'Spezialisierung', description: 'In Graz gibt es gute Agenturen, aber viele sind Generalisten. Wir haben uns auf B2B und Tech spezialisiert – das passt zur steirischen Wirtschaft.' },
      { title: 'Hauptstadt-Netzwerk', description: 'Zugang zu Spezialisten für jeden Bereich: Fotografen für Industrie-Shootings, Texter für technische Branchen.' },
      { title: 'Remote funktioniert', description: 'Wir arbeiten seit Jahren erfolgreich mit Kunden außerhalb Wiens. Viele Grazer Kunden schätzen die Effizienz.' },
    ],
    // FAQ
    faqs: [
      {
        question: 'Ihr habt kein Büro in Graz. Ist das ein Problem?',
        answer: 'Nein. Für den Kickoff kommen wir gerne nach Graz – das gehört zum Service. Danach funktioniert die Zusammenarbeit remote hervorragend. Viele unserer Grazer Kunden schätzen die Effizienz ohne unnötige Vor-Ort-Termine.',
      },
      {
        question: 'Kennt ihr den steirischen Markt?',
        answer: 'Ja. Wir betreuen Kunden aus Graz und der Steiermark. Wir verstehen die Industrie-Kultur, den B2B-Fokus und die lokalen Gegebenheiten. Die steirische Wirtschaft tickt anders als Wien – das wissen wir.',
      },
      {
        question: 'Gibt es Förderungen für Grazer Unternehmen?',
        answer: 'Ja! Die SFG (Steirische Wirtschaftsförderung) bietet den Digitalisierungsbonus mit bis zu 30% Förderung (max. €10.000). Wir unterstützen beim Antrag.',
      },
      {
        question: 'Wie schnell könnt ihr für Grazer Projekte starten?',
        answer: 'Nach Auftragserteilung: Kickoff innerhalb von 2-3 Wochen. Wir stimmen Termine flexibel ab und können auch kurzfristig nach Graz kommen.',
      },
    ],
    ctaTitle: 'Projekt aus der Steiermark?',
    ctaDescription: 'Kostenloses Erstgespräch – per Video oder vor Ort in Graz.',
    ctaButton: 'Termin vereinbaren',
  },
  en: {
    badge: 'Service Area Styria',
    heroTitle: 'Digital Agency Graz',
    heroDescription: 'Web design, SEO & online marketing for the Styrian economy – remotely managed from Vienna, with understanding for automotive, tech and industry.',
    setupTitle: 'How We Work with Graz Clients',
    setupIntro: 'We are based in Vienna, but we have been successfully serving clients in Graz and Styria for years.',
    setupItems: [
      { phase: 'Kickoff', description: 'Video call or on-site in Graz (we come to you)' },
      { phase: 'Conception', description: 'Joint workshops (remote or on-site)' },
      { phase: 'Implementation', description: 'Weekly video updates' },
      { phase: 'Launch', description: 'Approval + training (remote or in person)' },
    ],
    travelInfo: 'Travel Vienna → Graz: 2h 35min (train) | For important meetings, we are on-site.',
    industriesTitle: 'Industries in Graz We Understand',
    industries: [
      { icon: Factory, title: 'Automotive & Mobility', description: 'Graz is Austria\'s automotive cluster. Magna Steyr, AVL List, and hundreds of suppliers.' },
      { icon: Cpu, title: 'Tech & IT', description: 'Graz has a strong tech scene: TU Graz spin-offs, Parkside, Leftshift.' },
      { icon: Building2, title: 'Industry & Mechanical Engineering', description: 'Andritz, AT&S, and the Styrian SME sector.' },
      { icon: GraduationCap, title: 'Research & Education', description: 'TU Graz, University of Graz, FH Joanneum.' },
    ],
    servicesTitle: 'Our Services for Graz',
    services: [
      { name: 'Web Design Graz', href: '/standorte/graz/webdesign', description: 'B2B industry websites, product catalogs, multilingual' },
      { name: 'SEO Agency Graz', href: '/standorte/graz/seo', description: 'Local SEO, Technical SEO, content for industry' },
      { name: 'Online Marketing Graz', href: '/standorte/graz/online-marketing', description: 'Google Ads, LinkedIn Ads, B2B lead generation' },
    ],
    fundingTitle: 'Funding in Styria',
    fundingItems: [
      { name: 'SFG Digitization Bonus', description: 'Up to 30% of costs (max. €10,000)', link: 'sfg.at' },
    ],
    fundingCta: 'We help with the application – many of our Styrian clients successfully use funding.',
    whyTitle: 'Why a Viennese Agency for Graz?',
    whyItems: [
      { title: 'Specialization', description: 'We specialize in B2B and tech – that fits the Styrian economy.' },
      { title: 'Capital Network', description: 'Access to specialists for every field.' },
      { title: 'Remote Works', description: 'Many Graz clients appreciate the efficiency.' },
    ],
    faqs: [
      { question: 'You don\'t have an office in Graz. Is that a problem?', answer: 'No. For the kickoff, we are happy to come to Graz. After that, remote collaboration works excellently.' },
      { question: 'Do you know the Styrian market?', answer: 'Yes. We serve clients from Graz and Styria. We understand the industrial culture and local conditions.' },
      { question: 'Are there funding options for Graz companies?', answer: 'Yes! The SFG offers the digitization bonus with up to 30% funding.' },
    ],
    ctaTitle: 'Project from Styria?',
    ctaDescription: 'Free initial consultation – via video or on-site in Graz.',
    ctaButton: 'Schedule Meeting',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/graz')

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/graz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortGrazPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const c = content[locale] || content.de

  // Service Schema (NICHT LocalBusiness - wir haben kein Büro in Graz!)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.heroTitle,
    description: c.heroDescription,
    url: 'https://goldenwing.at/standorte/graz',
    provider: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Czeikestrasse 4/21',
        addressLocality: 'Wien',
        postalCode: '1100',
        addressCountry: 'AT',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Graz',
      containedInPlace: { '@type': 'State', name: 'Steiermark' },
    },
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://goldenwing.at' },
    { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
    { name: 'Graz', url: 'https://goldenwing.at/standorte/graz' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbListSchema items={breadcrumbs} />

      {/* Hero Section */}
      <Section className="pt-24 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              {c.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.heroTitle}</h1>
            <p className="text-lg text-muted-foreground mb-8">{c.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={getContactUrl(locale) as any}>{c.ctaButton}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/standorte/graz/webdesign" as={`/${locale === 'en' ? 'en/' : ''}standorte/graz/webdesign`}>
                  Webdesign Graz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Wie wir arbeiten - EHRLICH */}
      <Section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{c.setupTitle}</h2>
            <p className="text-muted-foreground mb-6">{c.setupIntro}</p>
            <div className="grid gap-4">
              {c.setupItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{item.phase}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
              <Train className="w-4 h-4" />
              {c.travelInfo}
            </p>
          </div>
        </Container>
      </Section>

      {/* Branchen - UNIQUE für Graz */}
      <Section className="py-16 bg-muted/30">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-center">{c.industriesTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {c.industries.map((industry, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <industry.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{industry.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services in Graz */}
      <Section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-center">{c.servicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {c.services.map((service, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href as any} className="text-sm text-primary hover:underline flex items-center">
                    {locale === 'de' ? 'Mehr erfahren' : 'Learn more'} <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Förderungen - UNIQUE für Steiermark */}
      <Section className="py-16 bg-primary/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">{c.fundingTitle}</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {c.fundingItems.map((item, i) => (
                <div key={i} className="p-4 bg-background rounded-lg border">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">{c.fundingCta}</p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="py-16">
        <Container>
          <FAQSection
            title={locale === 'de' ? 'Häufige Fragen von Grazer Kunden' : 'FAQ from Graz Clients'}
            items={c.faqs}
          />
        </Container>
      </Section>

      {/* Weitere Standorte - GEO/SEO Cross-Links */}
      <WeitereStandorte currentCity="graz" locale={locale as 'de' | 'en' | 'ru'} />

      {/* CTA */}
      <Section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{c.ctaTitle}</h2>
            <p className="mb-8 opacity-90">{c.ctaDescription}</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={getContactUrl(locale) as any}>{c.ctaButton}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
