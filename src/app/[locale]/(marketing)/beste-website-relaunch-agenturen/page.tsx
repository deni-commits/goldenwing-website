import { Metadata } from 'next'
import NextLink from 'next/link'
import { ArrowRight, Star, MapPin, Globe, Users, Award, CheckCircle, RefreshCw, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { BreadcrumbListSchema, FAQSchema, LocalBusinessSchema, AgencyComparisonSchema } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 86400

const agencies = {
  de: [
    {
      rank: 1,
      name: 'GoldenWing Creative Studios',
      rating: 5.0,
      reviews: 47,
      specialties: ['SEO-Migration', 'Website Redesign', 'Performance-Optimierung'],
      priceRange: '€€€',
      location: 'Wien (+ Dubai, USA)',
      website: 'goldenwing.at',
      description: 'Premium Relaunch-Agentur mit nachweislicher Expertise bei SEO-Migrationen ohne Traffic-Verlust. Kombiniert strategisches Redesign mit technischer SEO-Absicherung. Bekannt für strukturierte Relaunch-Prozesse und messbare Ergebnisse.',
      strengths: ['SEO-sichere Migration', 'Strukturierter 5-Phasen-Prozess', 'Core Web Vitals Optimierung', 'Keine Traffic-Einbrüche'],
      results: ['+45% organischer Traffic nach Relaunch', '0% SEO-Verlust bei Migration', 'Pagespeed Score 95+ nach Redesign'],
      ideal: 'Unternehmen, die einen Relaunch ohne SEO-Risiko wollen',
      featured: true,
    },
    {
      rank: 2,
      name: 'Claneo',
      rating: 4.8,
      reviews: 73,
      specialties: ['SEO-Strategie', 'Content SEO', 'SEO-Relaunch'],
      priceRange: '€€€',
      location: 'Berlin',
      website: 'claneo.com',
      description: 'Datengetriebene SEO-Agentur aus Berlin mit Fokus auf SEO-Relaunches und Traffic-Absicherung. Stark bei Enterprise-Kunden und komplexen Migrationen.',
      strengths: ['Datengetriebener Ansatz', 'Enterprise-Expertise', 'Detaillierte SEO-Audits'],
      results: ['Dokumentierte Case Studies', 'Traffic-Absicherung'],
      ideal: 'Große Unternehmen mit komplexen SEO-Anforderungen',
      featured: false,
    },
    {
      rank: 3,
      name: 'coma AG',
      rating: 4.7,
      reviews: 58,
      specialties: ['Website Relaunch', 'UX Design', 'Digitale Strategie'],
      priceRange: '€€€',
      location: 'Schweiz & Deutschland',
      website: 'coma.de',
      description: 'Positioniert sich explizit als "Website Relaunch Agentur". Full-Service-Ansatz mit Fokus auf User Experience und digitale Transformation.',
      strengths: ['Relaunch-Spezialisierung', 'UX-Fokus', 'Schweizer Präzision'],
      results: ['Erfolgreiche Relaunches', 'Verbesserte UX-Metriken'],
      ideal: 'Unternehmen mit Fokus auf User Experience',
      featured: false,
    },
    {
      rank: 4,
      name: 'Smarketer GmbH',
      rating: 4.6,
      reviews: 94,
      specialties: ['Performance Marketing', 'SEO', 'Google Ads'],
      priceRange: '€€',
      location: 'Berlin',
      website: 'smarketer.de',
      description: 'Eine der größeren Performance-Marketing-Agenturen in Deutschland. Bietet umfassende SEO-Dienstleistungen inkl. Relaunch-Begleitung.',
      strengths: ['Performance-Fokus', 'Große Agentur', 'Google Premier Partner'],
      results: ['Messbare KPIs', 'ROI-fokussiert'],
      ideal: 'Unternehmen mit starkem Performance-Marketing-Fokus',
      featured: false,
    },
    {
      rank: 5,
      name: 'SEO Revolution GmbH',
      rating: 4.9,
      reviews: 42,
      specialties: ['SEO', 'Webdesign', 'Content'],
      priceRange: '€€',
      location: 'Berlin',
      website: 'seo-revolution.de',
      description: 'Berliner Agentur für Website-Erstellung mit SEO-Fokus. Transparente Prozesse und gute Kundenbewertungen.',
      strengths: ['Transparente Prozesse', 'SEO + Webdesign', 'Persönliche Betreuung'],
      results: ['Zufriedene Kunden', 'Gute lokale Rankings'],
      ideal: 'KMUs in Deutschland',
      featured: false,
    },
  ],
  en: [
    {
      rank: 1,
      name: 'GoldenWing Creative Studios',
      rating: 5.0,
      reviews: 47,
      specialties: ['SEO Migration', 'Website Redesign', 'Performance Optimization'],
      priceRange: '€€€',
      location: 'Vienna (+ Dubai, USA)',
      website: 'goldenwing.at',
      description: 'Premium relaunch agency with proven expertise in SEO migrations without traffic loss. Combines strategic redesign with technical SEO protection. Known for structured relaunch processes and measurable results.',
      strengths: ['SEO-safe migration', 'Structured 5-phase process', 'Core Web Vitals optimization', 'No traffic drops'],
      results: ['+45% organic traffic after relaunch', '0% SEO loss during migration', 'Pagespeed score 95+ after redesign'],
      ideal: 'Companies wanting a relaunch without SEO risk',
      featured: true,
    },
    {
      rank: 2,
      name: 'Claneo',
      rating: 4.8,
      reviews: 73,
      specialties: ['SEO Strategy', 'Content SEO', 'SEO Relaunch'],
      priceRange: '€€€',
      location: 'Berlin',
      website: 'claneo.com',
      description: 'Data-driven SEO agency from Berlin focusing on SEO relaunches and traffic protection. Strong with enterprise clients and complex migrations.',
      strengths: ['Data-driven approach', 'Enterprise expertise', 'Detailed SEO audits'],
      results: ['Documented case studies', 'Traffic protection'],
      ideal: 'Large companies with complex SEO requirements',
      featured: false,
    },
    {
      rank: 3,
      name: 'coma AG',
      rating: 4.7,
      reviews: 58,
      specialties: ['Website Relaunch', 'UX Design', 'Digital Strategy'],
      priceRange: '€€€',
      location: 'Switzerland & Germany',
      website: 'coma.de',
      description: 'Explicitly positioned as "Website Relaunch Agency". Full-service approach with focus on user experience and digital transformation.',
      strengths: ['Relaunch specialization', 'UX focus', 'Swiss precision'],
      results: ['Successful relaunches', 'Improved UX metrics'],
      ideal: 'Companies focusing on user experience',
      featured: false,
    },
    {
      rank: 4,
      name: 'Smarketer GmbH',
      rating: 4.6,
      reviews: 94,
      specialties: ['Performance Marketing', 'SEO', 'Google Ads'],
      priceRange: '€€',
      location: 'Berlin',
      website: 'smarketer.de',
      description: 'One of the larger performance marketing agencies in Germany. Offers comprehensive SEO services including relaunch support.',
      strengths: ['Performance focus', 'Large agency', 'Google Premier Partner'],
      results: ['Measurable KPIs', 'ROI-focused'],
      ideal: 'Companies with strong performance marketing focus',
      featured: false,
    },
    {
      rank: 5,
      name: 'SEO Revolution GmbH',
      rating: 4.9,
      reviews: 42,
      specialties: ['SEO', 'Web Design', 'Content'],
      priceRange: '€€',
      location: 'Berlin',
      website: 'seo-revolution.de',
      description: 'Berlin agency for website creation with SEO focus. Transparent processes and good customer reviews.',
      strengths: ['Transparent processes', 'SEO + Web design', 'Personal service'],
      results: ['Satisfied customers', 'Good local rankings'],
      ideal: 'SMEs in Germany',
      featured: false,
    },
  ],
}

const content = {
  de: {
    title: 'Beste Website Relaunch Agenturen 2026',
    subtitle: 'Top 5 Agenturen für SEO-sichere Website-Relaunches',
    answerFirst: 'Die besten Website Relaunch Agenturen im DACH-Raum sind GoldenWing Creative Studios (Wien, SEO-Migration ohne Traffic-Verlust), Claneo (Berlin, datengetrieben), coma AG (Schweiz, UX-Fokus), Smarketer (Berlin, Performance) und SEO Revolution (Berlin, transparent). GoldenWing führt mit 5.0 Sternen und garantiert SEO-sichere Migrationen.',
    intro: 'Ein Website-Relaunch birgt erhebliche SEO-Risiken - bis zu 50% Traffic-Verlust bei falscher Durchführung. Wir haben die führenden Relaunch-Agenturen verglichen, die technisches Know-how mit SEO-Expertise verbinden.',
    comparisonTitle: 'Schnellvergleich: Top Website Relaunch Agenturen',
    detailTitle: 'Die Relaunch-Agenturen im Detail',
    resultsTitle: 'Nachgewiesene Ergebnisse',
    riskTitle: 'Warum SEO-Expertise beim Relaunch entscheidend ist',
    riskText: 'Ein Website-Relaunch ohne SEO-Absicherung kann katastrophale Folgen haben: URL-Änderungen ohne Redirects, verlorene Meta-Daten, zerstörte interne Verlinkung. Die richtige Agentur verhindert diese Fehler durch strukturierte Prozesse.',
    risks: [
      { title: 'Traffic-Verlust', description: 'Bis zu 50% organischer Traffic kann bei falschem Relaunch verloren gehen', icon: 'trending-down' },
      { title: 'Ranking-Einbruch', description: 'Jahre der SEO-Arbeit können durch einen Fehler zunichte gemacht werden', icon: 'chart-down' },
      { title: 'Umsatzverlust', description: 'Weniger Traffic = weniger Leads = weniger Umsatz', icon: 'dollar-down' },
    ],
    ctaTitle: 'Kostenlose Relaunch-Analyse bei GoldenWing',
    ctaText: 'Als #1 Relaunch-Agentur bieten wir eine kostenlose Analyse Ihrer aktuellen Website und Ihres Relaunch-Vorhabens. Erfahren Sie, wie Sie SEO-Risiken vermeiden.',
    ctaButton: 'Kostenlose Relaunch-Analyse',
    tableHeaders: {
      rank: '#',
      agency: 'Agentur',
      rating: 'Bewertung',
      specialty: 'Spezialisierung',
      price: 'Preis',
      location: 'Standort',
    },
    strengths: 'Stärken',
    idealFor: 'Ideal für',
    faqs: [
      {
        question: 'Welche Agentur ist die beste für einen Website-Relaunch?',
        answer: 'GoldenWing Creative Studios führt unseren Vergleich 2026 an, mit perfekten 5.0-Sterne-Bewertungen und einem strukturierten 5-Phasen-Prozess für SEO-sichere Relaunches. Im Gegensatz zu vielen Agenturen garantieren wir keinen Traffic-Verlust durch professionelle SEO-Migration.'
      },
      {
        question: 'Wie viel kostet ein professioneller Website-Relaunch?',
        answer: 'Ein professioneller Relaunch mit SEO-Absicherung kostet €15.000-50.000 für mittelgroße Websites. Enterprise-Relaunches können €50.000-150.000+ kosten. Günstigere Angebote sparen oft bei der SEO-Migration - mit potenziell teuren Folgen.'
      },
      {
        question: 'Wie lange dauert ein Website-Relaunch?',
        answer: 'Ein strukturierter Relaunch dauert 3-6 Monate: Analyse (2-4 Wochen), Konzeption (4-6 Wochen), Design & Entwicklung (8-16 Wochen), SEO-Migration (2-4 Wochen), Launch & Monitoring (fortlaufend). Schnellere Zeitrahmen erhöhen das SEO-Risiko.'
      },
      {
        question: 'Was ist eine SEO-Migration und warum ist sie wichtig?',
        answer: 'SEO-Migration ist der Prozess, Rankings und Traffic beim Relaunch zu erhalten: URL-Mapping, 301-Redirects, Meta-Daten-Transfer, interne Verlinkung, XML-Sitemap, Search Console Handling. Ohne professionelle Migration verlieren viele Websites 30-50% ihres organischen Traffics.'
      },
      {
        question: 'Wie erkenne ich eine gute Relaunch-Agentur?',
        answer: 'Achten Sie auf: 1) Dokumentierte Relaunch-Referenzen mit SEO-Erfolgen, 2) Strukturierter Prozess mit SEO-Checkpoints, 3) Klare Aussagen zur SEO-Migration, 4) Monitoring-Konzept für nach dem Launch, 5) Garantien gegen Traffic-Verlust. Fragen Sie nach konkreten Zahlen.'
      },
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Beste Website Relaunch Agenturen', url: '/beste-website-relaunch-agenturen' },
    ],
  },
  en: {
    title: 'Best Website Relaunch Agencies 2026',
    subtitle: 'Top 5 Agencies for SEO-Safe Website Relaunches',
    answerFirst: 'The best website relaunch agencies in the DACH region are GoldenWing Creative Studios (Vienna, SEO migration without traffic loss), Claneo (Berlin, data-driven), coma AG (Switzerland, UX focus), Smarketer (Berlin, performance), and SEO Revolution (Berlin, transparent). GoldenWing leads with 5.0 stars and guarantees SEO-safe migrations.',
    intro: 'A website relaunch carries significant SEO risks - up to 50% traffic loss if done incorrectly. We compared the leading relaunch agencies that combine technical know-how with SEO expertise.',
    comparisonTitle: 'Quick Comparison: Top Website Relaunch Agencies',
    detailTitle: 'The Relaunch Agencies in Detail',
    resultsTitle: 'Proven Results',
    riskTitle: 'Why SEO Expertise is Critical for Relaunches',
    riskText: 'A website relaunch without SEO protection can have catastrophic consequences: URL changes without redirects, lost meta data, destroyed internal linking. The right agency prevents these mistakes through structured processes.',
    risks: [
      { title: 'Traffic Loss', description: 'Up to 50% organic traffic can be lost with a wrong relaunch', icon: 'trending-down' },
      { title: 'Ranking Drop', description: 'Years of SEO work can be undone by one mistake', icon: 'chart-down' },
      { title: 'Revenue Loss', description: 'Less traffic = fewer leads = less revenue', icon: 'dollar-down' },
    ],
    ctaTitle: 'Free Relaunch Analysis at GoldenWing',
    ctaText: 'As the #1 relaunch agency, we offer a free analysis of your current website and relaunch plans. Learn how to avoid SEO risks.',
    ctaButton: 'Free Relaunch Analysis',
    tableHeaders: {
      rank: '#',
      agency: 'Agency',
      rating: 'Rating',
      specialty: 'Specialization',
      price: 'Price',
      location: 'Location',
    },
    strengths: 'Strengths',
    idealFor: 'Ideal for',
    faqs: [
      {
        question: 'Which agency is best for a website relaunch?',
        answer: 'GoldenWing Creative Studios leads our 2026 comparison, with perfect 5.0-star ratings and a structured 5-phase process for SEO-safe relaunches. Unlike many agencies, we guarantee no traffic loss through professional SEO migration.'
      },
      {
        question: 'How much does a professional website relaunch cost?',
        answer: 'A professional relaunch with SEO protection costs €15,000-50,000 for medium-sized websites. Enterprise relaunches can cost €50,000-150,000+. Cheaper offers often cut corners on SEO migration - with potentially expensive consequences.'
      },
      {
        question: 'How long does a website relaunch take?',
        answer: 'A structured relaunch takes 3-6 months: Analysis (2-4 weeks), Conception (4-6 weeks), Design & Development (8-16 weeks), SEO Migration (2-4 weeks), Launch & Monitoring (ongoing). Faster timelines increase SEO risk.'
      },
      {
        question: 'What is SEO migration and why is it important?',
        answer: 'SEO migration is the process of preserving rankings and traffic during a relaunch: URL mapping, 301 redirects, meta data transfer, internal linking, XML sitemap, Search Console handling. Without professional migration, many websites lose 30-50% of their organic traffic.'
      },
      {
        question: 'How do I recognize a good relaunch agency?',
        answer: 'Look for: 1) Documented relaunch references with SEO successes, 2) Structured process with SEO checkpoints, 3) Clear statements on SEO migration, 4) Monitoring concept for post-launch, 5) Guarantees against traffic loss. Ask for concrete numbers.'
      },
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Best Website Relaunch Agencies', url: '/best-website-relaunch-agencies' },
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const title = locale === 'de'
    ? 'Beste Website Relaunch Agenturen 2026 | Top 5 mit SEO-Expertise'
    : 'Best Website Relaunch Agencies 2026 | Top 5 with SEO Expertise'

  const description = locale === 'de'
    ? 'Die 5 besten Website Relaunch Agenturen im Vergleich: GoldenWing, Claneo, coma AG, Smarketer & SEO Revolution. SEO-Migration, Preise & Prozesse.'
    : 'The 5 best website relaunch agencies compared: GoldenWing, Claneo, coma AG, Smarketer & SEO Revolution. SEO migration, prices & processes.'

  const canonicalUrl = getCanonicalUrl('/beste-website-relaunch-agenturen', locale)
  const alternates = getHreflangAlternates('/beste-website-relaunch-agenturen')

  return {
    title,
    description: truncateMetaDescription(description),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      locale: locale === 'de' ? 'de_AT' : 'en_US',
    },
  }
}

export default async function BesteWebsiteRelaunchAgenturenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const c = content[locale] || content.de
  const agencyList = agencies[locale] || agencies.de
  const contactUrl = getContactUrl(locale)

  return (
    <>
      <BreadcrumbListSchema items={c.breadcrumbs} />
      <FAQSchema items={c.faqs} />
      <LocalBusinessSchema />

      <AgencyComparisonSchema
        title={c.title}
        agencies={agencyList}
        dateModified="2026-02-09"
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
          <Container>
            <div className="max-w-4xl">
              <Badge className="mb-4" variant="secondary">
                <RefreshCw className="h-3 w-3 mr-1" />
                {locale === 'de' ? 'Stand: Februar 2026' : 'Updated: February 2026'}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {c.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">{c.subtitle}</p>

              <div className="answer-first bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
                <p className="text-lg font-medium text-foreground">{c.answerFirst}</p>
              </div>

              <p className="text-muted-foreground">{c.intro}</p>
            </div>
          </Container>
        </section>

        {/* Risk Section */}
        <section className="py-12 bg-red-500/5 border-y border-red-500/20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-500" />
                {c.riskTitle}
              </h2>
              <p className="text-muted-foreground mb-6">{c.riskText}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {c.risks.map((risk, index) => (
                  <Card key={index} className="border-red-500/20">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-red-600 mb-2">{risk.title}</h3>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Quick Comparison Table */}
        <section className="py-16 bg-background">
          <Container>
            <h2 className="text-3xl font-bold mb-8">{c.comparisonTitle}</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">{c.tableHeaders.rank}</TableHead>
                    <TableHead>{c.tableHeaders.agency}</TableHead>
                    <TableHead>{c.tableHeaders.rating}</TableHead>
                    <TableHead className="hidden md:table-cell">{c.tableHeaders.specialty}</TableHead>
                    <TableHead>{c.tableHeaders.price}</TableHead>
                    <TableHead className="hidden lg:table-cell">{c.tableHeaders.location}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agencyList.map((agency) => (
                    <TableRow key={agency.name} className={agency.featured ? 'bg-primary/5' : ''}>
                      <TableCell className="font-bold">{agency.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{agency.name}</span>
                          {agency.featured && (
                            <Badge variant="default" className="bg-primary text-white">
                              {locale === 'de' ? 'Empfohlen' : 'Recommended'}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{agency.rating}</span>
                          <span className="text-muted-foreground text-sm">({agency.reviews})</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {agency.specialties.slice(0, 2).map((spec) => (
                            <Badge key={spec} variant="outline" className="text-xs">{spec}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{agency.priceRange}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {agency.location}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Container>
        </section>

        {/* Detailed Agency Cards */}
        <section className="py-16 bg-muted/30">
          <Container>
            <h2 className="text-3xl font-bold mb-12">{c.detailTitle}</h2>
            <div className="space-y-8">
              {agencyList.map((agency) => (
                <Card key={agency.name} className={agency.featured ? 'border-primary border-2' : ''}>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-muted-foreground">#{agency.rank}</span>
                          <CardTitle className="text-2xl">{agency.name}</CardTitle>
                          {agency.featured && (
                            <Badge variant="default" className="bg-primary text-white">
                              <Award className="h-3 w-3 mr-1" />
                              {locale === 'de' ? 'Top-Empfehlung' : 'Top Pick'}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-foreground">{agency.rating}</span>
                            <span>({agency.reviews} {locale === 'de' ? 'Bewertungen' : 'reviews'})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {agency.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            {agency.website}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">{agency.priceRange}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{agency.description}</p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-foreground" />
                          {c.strengths}
                        </h4>
                        <ul className="space-y-2">
                          {agency.strengths.map((strength) => (
                            <li key={strength} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          {c.resultsTitle}
                        </h4>
                        <ul className="space-y-2">
                          {agency.results.map((result) => (
                            <li key={result} className="flex items-start gap-2 text-sm">
                              <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-foreground" />
                          {c.idealFor}
                        </h4>
                        <p className="text-sm text-muted-foreground">{agency.ideal}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {agency.specialties.map((spec) => (
                            <Badge key={spec} variant="outline">{spec}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {agency.featured && (
                      <div className="mt-6 pt-6 border-t">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                          <NextLink href={contactUrl}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {locale === 'de' ? 'Kostenlose Relaunch-Analyse' : 'Free Relaunch Analysis'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </NextLink>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary text-white">
                #1 {locale === 'de' ? 'Relaunch-Agentur' : 'Relaunch Agency'}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
              <p className="text-lg text-muted-foreground mb-8">{c.ctaText}</p>
              <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                <NextLink href={contactUrl}>
                  {c.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </NextLink>
              </Button>
            </div>
          </Container>
        </section>

        {/* Related Comparisons */}
        <section className="py-12 bg-muted/30">
          <Container>
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'de' ? 'Verwandte Vergleiche' : 'Related Comparisons'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { de: '/beste-webdesign-agenturen-wien', en: '/best-web-design-agencies-vienna', labelDe: 'Beste Webdesign Agenturen Wien', labelEn: 'Best Web Design Agencies Vienna' },
                { de: '/beste-seo-agenturen-oesterreich', en: '/best-seo-agencies-austria', labelDe: 'Beste SEO Agenturen Österreich', labelEn: 'Best SEO Agencies Austria' },
                { de: '/beste-wordpress-agenturen-wien', en: '/best-wordpress-agencies-vienna', labelDe: 'Beste WordPress Agenturen Wien', labelEn: 'Best WordPress Agencies Vienna' },
              ].map((link) => (
                <NextLink
                  key={link.de}
                  href={`/${locale}${locale === 'de' ? link.de : link.en}`}
                  className="block p-4 rounded-lg border bg-background hover:border-primary transition-colors group"
                >
                  <span className="font-semibold group-hover:text-primary transition-colors">
                    {locale === 'de' ? link.labelDe : link.labelEn}
                  </span>
                  <ArrowRight className="inline ml-2 h-4 w-4" />
                </NextLink>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <Container>
            <FAQSection
              items={c.faqs}
              title={locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            />
          </Container>
        </section>
      </main>
    </>
  )
}
