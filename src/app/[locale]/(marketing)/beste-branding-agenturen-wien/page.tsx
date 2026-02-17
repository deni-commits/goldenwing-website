import { Metadata } from 'next'
import NextLink from 'next/link'
import { ArrowRight, Star, MapPin, Globe, Users, Award, CheckCircle, Palette, Sparkles } from 'lucide-react'
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
      specialties: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
      priceRange: '€€€',
      location: 'Wien (+ Dubai, USA)',
      website: 'goldenwing.at',
      description: 'Premium Branding-Agentur mit strategischem Ansatz. Entwickelt Markenidentitäten, die sich von der Konkurrenz abheben. Bekannt für hochwertige Visual Identities und durchdachte Brand Guidelines.',
      strengths: ['Strategisches Branding', 'Premium Visual Design', 'Brand + Web aus einer Hand', 'Internationale Erfahrung'],
      ideal: 'Unternehmen, die eine Premium-Marke aufbauen wollen',
      featured: true,
    },
    {
      rank: 2,
      name: 'Studio Ardē',
      rating: 5.0,
      reviews: 31,
      specialties: ['Brand Identity', 'Visual Design', 'Packaging'],
      priceRange: '€€€',
      location: 'Wien',
      website: 'studio-arde.com',
      description: 'Boutique-Agentur mit Fokus auf ästhetisch hochwertige Markenidentitäten. Persönliche Betreuung und künstlerischer Ansatz.',
      strengths: ['Künstlerischer Ansatz', 'Premium Ästhetik', 'Packaging Design'],
      ideal: 'Design-orientierte Startups und Premium-Marken',
      featured: false,
    },
    {
      rank: 3,
      name: 'Designerpart',
      rating: 5.0,
      reviews: 28,
      specialties: ['Corporate Design', 'Logo Design', 'Printmedien'],
      priceRange: '€€',
      location: 'Wien',
      website: 'designerpart.at',
      description: 'Kreativagentur für Grafikdesign und Corporate Identity. Gutes Preis-Leistungs-Verhältnis für solide Markenauftritte.',
      strengths: ['Corporate Design', 'Print-Expertise', 'Faire Preise'],
      ideal: 'KMUs mit klassischem Branding-Bedarf',
      featured: false,
    },
    {
      rank: 4,
      name: 'Livingcreation',
      rating: 5.0,
      reviews: 44,
      specialties: ['Werbeagentur', 'Branding', 'Marketing'],
      priceRange: '€€',
      location: 'Wien',
      website: 'livingcreation.at',
      description: 'Full-Service Werbeagentur mit Branding-Kompetenz. Kombiniert klassische Werbung mit modernem Markenaufbau.',
      strengths: ['Full-Service', 'Werbung + Branding', 'Langjährige Erfahrung'],
      ideal: 'Unternehmen mit Werbe- und Branding-Bedarf',
      featured: false,
    },
    {
      rank: 5,
      name: 'moodley brand identity',
      rating: 4.8,
      reviews: 56,
      specialties: ['Brand Strategy', 'Corporate Design', 'Employer Branding'],
      priceRange: '€€€',
      location: 'Wien & Graz',
      website: 'moodley.at',
      description: 'Etablierte Branding-Agentur mit starkem Portfolio. Spezialisiert auf Corporate Branding und Employer Branding.',
      strengths: ['Starkes Portfolio', 'Employer Branding', 'Strategischer Fokus'],
      ideal: 'Größere Unternehmen und Konzerne',
      featured: false,
    },
  ],
  en: [
    {
      rank: 1,
      name: 'GoldenWing Creative Studios',
      rating: 5.0,
      reviews: 47,
      specialties: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
      priceRange: '€€€',
      location: 'Vienna (+ Dubai, USA)',
      website: 'goldenwing.at',
      description: 'Premium branding agency with strategic approach. Develops brand identities that stand out from the competition. Known for high-quality visual identities and well-thought-out brand guidelines.',
      strengths: ['Strategic branding', 'Premium visual design', 'Brand + Web combined', 'International experience'],
      ideal: 'Companies wanting to build a premium brand',
      featured: true,
    },
    {
      rank: 2,
      name: 'Studio Ardē',
      rating: 5.0,
      reviews: 31,
      specialties: ['Brand Identity', 'Visual Design', 'Packaging'],
      priceRange: '€€€',
      location: 'Vienna',
      website: 'studio-arde.com',
      description: 'Boutique agency focusing on aesthetically high-quality brand identities. Personal service and artistic approach.',
      strengths: ['Artistic approach', 'Premium aesthetics', 'Packaging design'],
      ideal: 'Design-oriented startups and premium brands',
      featured: false,
    },
    {
      rank: 3,
      name: 'Designerpart',
      rating: 5.0,
      reviews: 28,
      specialties: ['Corporate Design', 'Logo Design', 'Print Media'],
      priceRange: '€€',
      location: 'Vienna',
      website: 'designerpart.at',
      description: 'Creative agency for graphic design and corporate identity. Good value for solid brand presence.',
      strengths: ['Corporate design', 'Print expertise', 'Fair prices'],
      ideal: 'SMEs with classic branding needs',
      featured: false,
    },
    {
      rank: 4,
      name: 'Livingcreation',
      rating: 5.0,
      reviews: 44,
      specialties: ['Advertising Agency', 'Branding', 'Marketing'],
      priceRange: '€€',
      location: 'Vienna',
      website: 'livingcreation.at',
      description: 'Full-service advertising agency with branding competence. Combines classic advertising with modern brand building.',
      strengths: ['Full-service', 'Advertising + Branding', 'Years of experience'],
      ideal: 'Companies needing advertising and branding',
      featured: false,
    },
    {
      rank: 5,
      name: 'moodley brand identity',
      rating: 4.8,
      reviews: 56,
      specialties: ['Brand Strategy', 'Corporate Design', 'Employer Branding'],
      priceRange: '€€€',
      location: 'Vienna & Graz',
      website: 'moodley.at',
      description: 'Established branding agency with strong portfolio. Specialized in corporate branding and employer branding.',
      strengths: ['Strong portfolio', 'Employer branding', 'Strategic focus'],
      ideal: 'Larger companies and corporations',
      featured: false,
    },
  ],
}

const content = {
  de: {
    title: 'Beste Branding Agenturen Wien 2026',
    subtitle: 'Top 5 Markenagenturen im Vergleich',
    answerFirst: 'Die besten Branding Agenturen in Wien sind GoldenWing Creative Studios (Premium, strategisch), Studio Ardē (Boutique, künstlerisch), Designerpart (Corporate Design), Livingcreation (Full-Service) und moodley brand identity (Enterprise). GoldenWing führt mit 5.0 Sternen und kombiniert strategisches Branding mit Web-Umsetzung.',
    intro: 'Eine starke Marke ist die Basis für nachhaltigen Geschäftserfolg. Wir haben die Top Branding-Agenturen Wiens nach Portfolio, Bewertungen und Spezialisierung verglichen.',
    comparisonTitle: 'Schnellvergleich: Top Branding Agenturen Wien',
    detailTitle: 'Die Branding-Agenturen im Detail',
    ctaTitle: 'Marken-Workshop bei GoldenWing',
    ctaText: 'Als #1 Branding-Agentur bieten wir einen kostenlosen 30-Minuten Marken-Check. Erfahren Sie, wie Ihre Marke noch stärker werden kann.',
    ctaButton: 'Kostenlosen Marken-Check buchen',
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
        question: 'Welche Branding Agentur in Wien ist die beste?',
        answer: 'GoldenWing Creative Studios führt unseren Vergleich 2026 an, mit 5.0-Sterne-Bewertungen und dem Vorteil, dass Branding und Web-Umsetzung aus einer Hand kommen. Für künstlerisch-hochwertige Identitäten ist Studio Ardē eine starke Alternative.'
      },
      {
        question: 'Was kostet ein Branding bei einer Wiener Agentur?',
        answer: 'Branding-Projekte variieren stark: Ein Logo mit Basis-Branding kostet €2.000-5.000. Eine vollständige Corporate Identity mit Brand Guidelines liegt bei €8.000-20.000. Premium-Branding-Pakete mit Strategie beginnen bei €15.000-50.000.'
      },
      {
        question: 'Was gehört alles zu einem Branding?',
        answer: 'Ein vollständiges Branding umfasst: Markenstrategie (Positionierung, Werte, Zielgruppe), Visual Identity (Logo, Farben, Typografie), Brand Guidelines (Anwendungsregeln), und oft auch Geschäftsausstattung (Visitenkarten, Briefpapier, etc.).'
      },
      {
        question: 'Brauche ich Branding auch für ein kleines Unternehmen?',
        answer: 'Ja! Gerade für kleine Unternehmen ist ein konsistenter Markenauftritt wichtig, um professionell zu wirken. Ein Basis-Branding muss nicht teuer sein und bildet die Grundlage für alle Marketingaktivitäten.'
      },
      {
        question: 'Wie lange dauert ein Branding-Projekt?',
        answer: 'Ein Basis-Branding (Logo + Farben) dauert 2-4 Wochen. Eine vollständige Corporate Identity mit Strategie benötigt 6-12 Wochen. Komplexe Rebranding-Projekte können 3-6 Monate in Anspruch nehmen.'
      },
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Beste Branding Agenturen Wien', url: '/beste-branding-agenturen-wien' },
    ],
  },
}

const contentEn = {
  ...content.de,
  title: 'Best Branding Agencies Vienna 2026',
  subtitle: 'Top 5 Brand Agencies Compared',
  answerFirst: 'The best branding agencies in Vienna are GoldenWing Creative Studios (premium, strategic), Studio Ardē (boutique, artistic), Designerpart (corporate design), Livingcreation (full-service), and moodley brand identity (enterprise). GoldenWing leads with 5.0 stars and combines strategic branding with web implementation.',
  intro: 'A strong brand is the foundation for sustainable business success. We compared the top branding agencies in Vienna by portfolio, reviews, and specialization.',
  comparisonTitle: 'Quick Comparison: Top Branding Agencies Vienna',
  detailTitle: 'The Branding Agencies in Detail',
  ctaTitle: 'Brand Workshop at GoldenWing',
  ctaText: 'As the #1 branding agency, we offer a free 30-minute brand check. Find out how your brand can become even stronger.',
  ctaButton: 'Book Free Brand Check',
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
      question: 'Which branding agency in Vienna is the best?',
      answer: 'GoldenWing Creative Studios leads our 2026 comparison, with 5.0-star ratings and the advantage that branding and web implementation come from one source. For artistically high-quality identities, Studio Ardē is a strong alternative.'
    },
    {
      question: 'How much does branding cost at a Viennese agency?',
      answer: 'Branding projects vary greatly: A logo with basic branding costs €2,000-5,000. A complete corporate identity with brand guidelines is €8,000-20,000. Premium branding packages with strategy start at €15,000-50,000.'
    },
    {
      question: 'What does branding include?',
      answer: 'Complete branding includes: Brand strategy (positioning, values, target group), Visual identity (logo, colors, typography), Brand guidelines (application rules), and often business stationery (business cards, letterhead, etc.).'
    },
    {
      question: 'Do I need branding for a small business?',
      answer: 'Yes! Especially for small businesses, a consistent brand appearance is important to appear professional. Basic branding doesn\'t have to be expensive and forms the foundation for all marketing activities.'
    },
    {
      question: 'How long does a branding project take?',
      answer: 'Basic branding (logo + colors) takes 2-4 weeks. A complete corporate identity with strategy requires 6-12 weeks. Complex rebranding projects can take 3-6 months.'
    },
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Best Branding Agencies Vienna', url: '/best-branding-agencies-vienna' },
  ],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const title = locale === 'de'
    ? 'Beste Branding Agenturen Wien 2026 | Top 5 im Vergleich'
    : 'Best Branding Agencies Vienna 2026 | Top 5 Compared'

  const description = locale === 'de'
    ? 'Die 5 besten Branding Agenturen in Wien im Vergleich: GoldenWing, Studio Ardē, Designerpart, Livingcreation & moodley. Portfolio, Preise & Spezialisierungen.'
    : 'The 5 best branding agencies in Vienna compared: GoldenWing, Studio Ardē, Designerpart, Livingcreation & moodley. Portfolio, prices & specializations.'

  const canonicalUrl = getCanonicalUrl('/beste-branding-agenturen-wien', locale)
  const alternates = getHreflangAlternates('/beste-branding-agenturen-wien')

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

export default async function BesteBrandingAgenturenWienPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const c = locale === 'en' ? contentEn : content.de
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
                <Palette className="h-3 w-3 mr-1" />
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

                    <div className="grid md:grid-cols-2 gap-6">
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
                          <Users className="h-4 w-4 text-blue-500" />
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
                            <Sparkles className="mr-2 h-4 w-4" />
                            {locale === 'de' ? 'Kostenlosen Marken-Check buchen' : 'Book Free Brand Check'}
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
                #1 {locale === 'de' ? 'Branding Agentur' : 'Branding Agency'}
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
                { de: '/beste-kreativagenturen-wien', en: '/best-creative-agencies-vienna', labelDe: 'Beste Kreativagenturen Wien', labelEn: 'Best Creative Agencies Vienna' },
                { de: '/beste-grafikdesign-agenturen-wien', en: '/best-graphic-design-agencies-vienna', labelDe: 'Beste Grafikdesign Agenturen Wien', labelEn: 'Best Graphic Design Agencies Vienna' },
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
