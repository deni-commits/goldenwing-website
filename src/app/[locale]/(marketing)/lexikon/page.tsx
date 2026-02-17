import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { ArrowRight, BookOpen, Search, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { lexikonEntries, lexikonCategories, LexikonEntry } from '@/lib/lexikon/data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = {
    de: 'Lexikon - Marketing & SEO Begriffe erklärt | GoldenWing',
    en: 'Glossary - Marketing & SEO Terms Explained | GoldenWing',
    ru: 'Глоссарий - Термины маркетинга и SEO | GoldenWing'
  }[locale] ?? 'Glossary - Marketing & SEO Terms Explained | GoldenWing'

  const metaDescription = truncateMetaDescription(
    {
      de: `Marketing-Lexikon: ${lexikonEntries.length}+ Fachbegriffe einfach erklärt. Von SEO über Branding bis Webdesign - alle wichtigen Begriffe für Ihr digitales Marketing.`,
      en: `Marketing glossary: ${lexikonEntries.length}+ terms explained simply. From SEO to branding to web design - all important terms for your digital marketing.`,
      ru: `Глоссарий маркетинга: ${lexikonEntries.length}+ терминов с простым объяснением. От SEO до брендинга и веб-дизайна - все важные термины для вашего цифрового маркетинга.`
    }[locale] ?? `Marketing glossary: ${lexikonEntries.length}+ terms explained simply. From SEO to branding to web design - all important terms for your digital marketing.`
  )

  const hreflangAlternates = getHreflangAlternates('/lexikon', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: {
      de: ['Marketing Lexikon', 'SEO Glossar', 'Fachbegriffe Marketing', 'Webdesign Begriffe', 'Online Marketing Lexikon'],
      en: ['Marketing Glossary', 'SEO Terms', 'Marketing Terms', 'Web Design Glossary', 'Digital Marketing Dictionary'],
      ru: ['Глоссарий маркетинга', 'SEO термины', 'Термины маркетинга', 'Глоссарий веб-дизайна', 'Словарь цифрового маркетинга']
    }[locale] ?? ['Marketing Glossary', 'SEO Terms', 'Marketing Terms', 'Web Design Glossary', 'Digital Marketing Dictionary'],
    openGraph: {
      title: { de: 'Marketing & SEO Lexikon', en: 'Marketing & SEO Glossary', ru: 'Глоссарий маркетинга и SEO' }[locale] ?? 'Marketing & SEO Glossary',
      description: metaDescription,
      url: getCanonicalUrl('/lexikon', locale),
    },
    alternates: {
      canonical: getCanonicalUrl('/lexikon', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function LexikonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const categories = lexikonCategories[locale as 'de' | 'en' | 'ru'] ?? lexikonCategories['en']

  // Group entries by category
  const entriesByCategory = lexikonEntries.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = []
    }
    acc[entry.category].push(entry)
    return acc
  }, {} as Record<string, LexikonEntry[]>)

  // Sort entries within each category by search volume (highest first)
  Object.keys(entriesByCategory).forEach(category => {
    entriesByCategory[category].sort((a, b) => b.searchVolume - a.searchVolume)
  })

  // Get top entries by search volume for "Most Popular" section
  const topEntries = [...lexikonEntries]
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 6)

  const heroData = {
    badge: { de: 'Lexikon', en: 'Glossary', ru: 'Глоссарий' }[locale] ?? 'Glossary',
    title: { de: 'Marketing & SEO Lexikon', en: 'Marketing & SEO Glossary', ru: 'Глоссарий маркетинга и SEO' }[locale] ?? 'Marketing & SEO Glossary',
    subtitle: { de: 'Alle wichtigen Begriffe einfach erklärt', en: 'All important terms explained simply', ru: 'Все важные термины простым языком' }[locale] ?? 'All important terms explained simply',
    description: {
      de: `Unser Lexikon enthält ${lexikonEntries.length}+ Begriffe aus den Bereichen SEO, Marketing, Webdesign und digitale Strategie. Jeder Begriff wird praxisnah und verständlich erklärt.`,
      en: `Our glossary contains ${lexikonEntries.length}+ terms from the fields of SEO, marketing, web design, and digital strategy. Each term is explained practically and understandably.`,
      ru: `Наш глоссарий содержит ${lexikonEntries.length}+ терминов из областей SEO, маркетинга, веб-дизайна и цифровой стратегии. Каждый термин объясняется практично и понятно.`
    }[locale] ?? `Our glossary contains ${lexikonEntries.length}+ terms from the fields of SEO, marketing, web design, and digital strategy. Each term is explained practically and understandably.`,
  }

  const popularTitle = { de: 'Meistgesuchte Begriffe', en: 'Most Searched Terms', ru: 'Самые популярные термины' }[locale] ?? 'Most Searched Terms'
  const allTermsTitle = { de: 'Alle Begriffe nach Kategorie', en: 'All Terms by Category', ru: 'Все термины по категориям' }[locale] ?? 'All Terms by Category'

  const definedTermListSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: { de: 'Marketing & SEO Lexikon', en: 'Marketing & SEO Glossary', ru: 'Глоссарий маркетинга и SEO' }[locale] ?? 'Marketing & SEO Glossary',
    description: {
      de: 'Umfassendes Lexikon für Marketing, SEO und Webdesign Begriffe',
      en: 'Comprehensive glossary of marketing, SEO, and web design terms',
      ru: 'Полный глоссарий терминов маркетинга, SEO и веб-дизайна'
    }[locale] ?? 'Comprehensive glossary of marketing, SEO, and web design terms',
    url: getCanonicalUrl('/lexikon', locale),
    hasDefinedTerm: lexikonEntries.map(entry => ({
      '@type': 'DefinedTerm',
      name: (entry[locale as 'de' | 'en' | 'ru'] ?? entry['en']).term,
      description: (entry[locale as 'de' | 'en' | 'ru'] ?? entry['en']).shortDefinition,
      url: getCanonicalUrl(`/lexikon/${entry.slug}`, locale),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermListSchema) }} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              {heroData.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{heroData.title}</h1>
            <p className="text-2xl text-primary font-medium mb-4">{heroData.subtitle}</p>
            <p className="text-xl text-muted-foreground max-w-2xl">{heroData.description}</p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{lexikonEntries.length}+</div>
              <div className="text-sm text-muted-foreground">{{ de: 'Begriffe', en: 'Terms', ru: 'Терминов' }[locale] ?? 'Terms'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{Object.keys(categories).length}</div>
              <div className="text-sm text-muted-foreground">{{ de: 'Kategorien', en: 'Categories', ru: 'Категорий' }[locale] ?? 'Categories'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {Math.round(lexikonEntries.reduce((sum, e) => sum + e.searchVolume, 0) / 1000)}K+
              </div>
              <div className="text-sm text-muted-foreground">{{ de: 'Monatl. Suchen', en: 'Monthly Searches', ru: 'Запросов/мес.' }[locale] ?? 'Monthly Searches'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">DE/EN/RU</div>
              <div className="text-sm text-muted-foreground">{{ de: 'Mehrsprachig', en: 'Multilingual', ru: 'Многоязычный' }[locale] ?? 'Multilingual'}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Terms */}
      <section className="py-16 md:py-20">
        <Container variant="block">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">{popularTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={{ pathname: '/lexikon/[slug]', params: { slug: entry.slug } }}
                className="group"
              >
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {(entry[locale as 'de' | 'en' | 'ru'] ?? entry['en']).term}
                      </h3>
                      <Badge variant="secondary" className="shrink-0">
                        <Search className="h-3 w-3 mr-1" />
                        {entry.searchVolume.toLocaleString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {(entry[locale as 'de' | 'en' | 'ru'] ?? entry['en']).shortDefinition}
                    </p>
                    <div className="mt-4 text-primary text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale] ?? 'Learn more'}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* All Terms by Category */}
      <section className="py-16 md:py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">{allTermsTitle}</h2>

          <div className="space-y-12">
            {Object.entries(entriesByCategory).map(([category, entries]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b">
                  {categories[category as keyof typeof categories]}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {entries.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={{ pathname: '/lexikon/[slug]', params: { slug: entry.slug } }}
                      className="group flex items-center justify-between gap-2 p-3 rounded-lg bg-background hover:bg-primary/5 border hover:border-primary/30 transition-all"
                    >
                      <span className="font-medium group-hover:text-primary transition-colors truncate">
                        {(entry[locale as 'de' | 'en' | 'ru'] ?? entry['en']).term.split(' (')[0]}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {entry.searchVolume.toLocaleString()}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <Container variant="block">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {{ de: 'Brauchen Sie Hilfe bei Ihrer SEO-Strategie?', en: 'Need Help with Your SEO Strategy?', ru: 'Нужна помощь с SEO-стратегией?' }[locale] ?? 'Need Help with Your SEO Strategy?'}
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                {{ de: 'Unsere Experten verwandeln diese Begriffe in messbare Ergebnisse für Ihr Unternehmen.', en: 'Our experts turn these terms into measurable results for your business.', ru: 'Наши эксперты превратят эти термины в измеримые результаты для вашего бизнеса.' }[locale] ?? 'Our experts turn these terms into measurable results for your business.'}
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors"
              >
                {{ de: 'Kostenlose Beratung', en: 'Free Consultation', ru: 'Бесплатная консультация' }[locale] ?? 'Free Consultation'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  )
}
