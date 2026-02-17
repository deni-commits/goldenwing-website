import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/lib/i18n-navigation'
import NextLink from 'next/link'
import { ArrowRight, ArrowLeft, BookOpen, ExternalLink, CheckCircle, Lightbulb, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { getLexikonEntry, getAllLexikonSlugs, getRelatedLexikonEntries, getLinkedRelatedTerms, getCrossCategoryRelatedEntries, lexikonCategories } from '@/lib/lexikon/data'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = getAllLexikonSlugs()
  const locales = ['de', 'en']

  return locales.flatMap(locale =>
    slugs.map(slug => ({
      locale,
      slug,
    }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const entry = getLexikonEntry(slug)
  if (!entry) {
    return {
      title: locale === 'de' ? 'Begriff nicht gefunden' : 'Term not found',
    }
  }

  const content = entry[locale as 'de' | 'en'] ?? entry['en']

  // Optimized title: max 60 chars - prioritize term, then brand
  const metaTitle = locale === 'de'
    ? `${content.term} · Definition | GoldenWing`
    : `${content.term} · Explained | GoldenWing`

  const metaDescription = truncateMetaDescription(content.shortDefinition)

  const hreflangAlternates = getHreflangAlternates(`/lexikon/${slug}`, locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [content.term, ...content.relatedTerms.slice(0, 5)],
    openGraph: {
      title: content.term,
      description: metaDescription,
      url: getCanonicalUrl(`/lexikon/${slug}`, locale),
      type: 'article',
    },
    alternates: {
      canonical: getCanonicalUrl(`/lexikon/${slug}`, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function LexikonEntryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const isEn = locale === 'en'

  const entry = getLexikonEntry(slug)
  if (!entry) {
    notFound()
  }

  const content = entry[locale as 'de' | 'en'] ?? entry['en']
  const relatedEntries = getRelatedLexikonEntries(slug, 5)
  const crossCategoryEntries = getCrossCategoryRelatedEntries(slug, 4)
  const linkedRelatedTerms = getLinkedRelatedTerms(slug, locale)
  const categories = lexikonCategories[locale as 'de' | 'en'] ?? lexikonCategories['en']

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: content.term,
    description: content.fullDefinition,
    url: getCanonicalUrl(`/lexikon/${slug}`, locale),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: isEn ? 'GoldenWing Marketing Glossary' : 'GoldenWing Marketing Lexikon',
      url: getCanonicalUrl('/lexikon', locale),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getCanonicalUrl('/', locale),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEn ? 'Glossary' : 'Lexikon',
        item: getCanonicalUrl('/lexikon', locale),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.term,
        item: getCanonicalUrl(`/lexikon/${slug}`, locale),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="border-b">
        <Container variant="block" className="py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/lexikon" className="hover:text-foreground transition-colors">
              {isEn ? 'Glossary' : 'Lexikon'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{content.term.split(' (')[0]}</span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            {/* Back link */}
            <Link href="/lexikon" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              {isEn ? 'Back to Glossary' : 'Zurück zum Lexikon'}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Badge>
                <BookOpen className="h-3 w-3 mr-1" />
                {categories[entry.category as keyof typeof categories]}
              </Badge>
              <Badge variant="secondary">
                <Search className="h-3 w-3 mr-1" />
                {entry.searchVolume.toLocaleString()} {isEn ? 'searches/mo' : 'Suchen/Monat'}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{content.term}</h1>

            {/* Quick Definition Box */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">{isEn ? 'Quick Definition' : 'Kurzdefinition'}</div>
                    <p className="text-muted-foreground">{content.shortDefinition}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <Container variant="block">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Article */}
            <article className="lg:col-span-2 space-y-8">
              {/* Full Definition */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {isEn ? `What is ${content.term.split(' (')[0]}?` : `Was ist ${content.term.split(' (')[0]}?`}
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>{content.fullDefinition}</p>
                </div>
              </div>

              {/* Key Points */}
              {content.keyPoints && content.keyPoints.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isEn ? 'Key Points' : 'Wichtige Punkte'}
                  </h2>
                  <ul className="space-y-3">
                    {content.keyPoints.map((point, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage Example */}
              {content.usageExample && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isEn ? 'Practical Example' : 'Praxisbeispiel'}
                  </h2>
                  <Card className="bg-muted/50">
                    <CardContent className="p-6">
                      <p className="italic text-muted-foreground">&ldquo;{content.usageExample}&rdquo;</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* External Links */}
              {content.externalLinks && content.externalLinks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isEn ? 'Further Reading' : 'Weiterführende Links'}
                  </h2>
                  <ul className="space-y-2">
                    {content.externalLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          {link.title}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Related Terms - now with links */}
              {linkedRelatedTerms && linkedRelatedTerms.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      {isEn ? 'Related Terms' : 'Verwandte Begriffe'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {linkedRelatedTerms.map((item, index) => (
                        item.hasLink ? (
                          <Link
                            key={index}
                            href={{ pathname: '/lexikon/[slug]', params: { slug: item.slug } }}
                          >
                            <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                              {item.term}
                            </Badge>
                          </Link>
                        ) : (
                          <Badge key={index} variant="outline">
                            {item.term}
                          </Badge>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* More from this Category */}
              {relatedEntries.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      {isEn ? 'More in this Category' : 'Mehr aus dieser Kategorie'}
                    </h3>
                    <ul className="space-y-3">
                      {relatedEntries.map((related) => (
                        <li key={related.slug}>
                          <Link
                            href={{ pathname: '/lexikon/[slug]', params: { slug: related.slug } }}
                            className="flex items-center justify-between gap-2 text-sm hover:text-primary transition-colors"
                          >
                            <span>{(related[locale as 'de' | 'en'] ?? related['en']).term.split(' (')[0]}</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Cross-Category Related Terms */}
              {crossCategoryEntries.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      {isEn ? 'Explore Other Topics' : 'Andere Themen entdecken'}
                    </h3>
                    <ul className="space-y-3">
                      {crossCategoryEntries.map((related) => (
                        <li key={related.slug}>
                          <Link
                            href={{ pathname: '/lexikon/[slug]', params: { slug: related.slug } }}
                            className="flex items-center justify-between gap-2 text-sm hover:text-primary transition-colors"
                          >
                            <span>{(related[locale as 'de' | 'en'] ?? related['en']).term.split(' (')[0]}</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* CTA Card */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    {isEn
                      ? `Need help with ${content.term.split(' (')[0]}?`
                      : `Brauchen Sie Hilfe bei ${content.term.split(' (')[0]}?`}
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    {isEn
                      ? 'Our experts are here to help you succeed.'
                      : 'Unsere Experten helfen Ihnen zum Erfolg.'}
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <NextLink href={getContactUrl(locale)}>
                      {isEn ? 'Free Consultation' : 'Kostenlose Beratung'}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </NextLink>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      {/* Back to Lexikon CTA */}
      <section className="py-12 border-t bg-muted/30">
        <Container variant="block">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold mb-1">
                {isEn ? 'Explore More Terms' : 'Mehr Begriffe entdecken'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Our glossary contains 20+ marketing and SEO terms.'
                  : 'Unser Lexikon enthält 20+ Marketing- und SEO-Begriffe.'}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lexikon">
                <BookOpen className="mr-2 h-4 w-4" />
                {isEn ? 'View All Terms' : 'Alle Begriffe ansehen'}
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
