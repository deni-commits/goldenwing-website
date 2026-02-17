import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { notFound } from 'next/navigation'
import Image from 'next/image'

// Allow dynamic params for locales not in generateStaticParams
export const dynamicParams = true
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/seo/json-ld'
import { getCategories, getCategoryBySlug, type SupportedLocale } from '@/lib/payload'
import { getCanonicalUrl, getHreflangAlternates, translateBlogCategorySlugToEn } from '@/lib/utils'
// Note: validateSlugOrRedirect removed - next-intl routing handles path translation

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  category: { title: string; slug: string; color?: string } | null
  author: { name: string } | null
  publishedAt: string
  readTime: number
  featured: boolean
  mainImage?: {
    url?: string
    alt?: string
  }
}

interface Category {
  id: string
  title: string
  slug: string
  description: string
  color?: string
  posts: Post[]
}

// Color mapping for categories
const categoryColors: Record<string, string> = {
  webdesign: 'from-blue-500/20 to-cyan-500/20',
  branding: 'from-violet-500/20 to-purple-500/20',
  seo: 'from-emerald-500/20 to-green-500/20',
  'ui-ux': 'from-amber-500/20 to-yellow-500/20',
  marketing: 'from-rose-500/20 to-pink-500/20',
  technologie: 'from-slate-500/20 to-gray-500/20',
}

function getColorForCategory(categorySlug: string | undefined): string {
  if (!categorySlug) return 'from-gray-500/20 to-slate-500/20'
  return categoryColors[categorySlug] || 'from-gray-500/20 to-slate-500/20'
}

// Transform Payload CMS API URLs to direct media paths
// Also normalize Unicode to NFC (composed form) for proper file matching
function getImageUrl(url: string | undefined): string {
  if (!url) return ''
  let result = url
  if (result.startsWith('/api/media/file/')) {
    result = result.replace('/api/media/file/', '/media/')
  }
  // Normalize Unicode: NFD (decomposed) → NFC (composed)
  // Fixes German umlauts like ä, ö, ü that may be stored as combining characters
  return result.normalize('NFC')
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateStaticParams() {
  const categories = await getCategories('de')
  const locales = ['de', 'en'] as const
  // Generate params for both locales with correct translated slugs
  return locales.flatMap(locale =>
    categories.map(category => ({
      locale,
      slug: locale === 'en' ? translateBlogCategorySlugToEn(category.slug) : category.slug
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const category = await getCategoryBySlug(slug, locale) as Category | null
  const isEn = locale === 'en'

  if (!category) {
    return { title: isEn ? 'Category not found' : 'Kategorie nicht gefunden' }
  }

  // Extended titles for better SEO (30-60 chars target)
  // IMPORTANT: Each language must have a UNIQUE title for SEO
  const titleMap: Record<string, { de: string; en: string }> = {
    'seo': { de: 'SEO Tipps & Strategien für bessere Rankings', en: 'SEO Tips & Strategies for Better Rankings' },
    'ui-ux': { de: 'UI/UX Design Insights & Best Practices', en: 'UI/UX Design Insights & Guidelines' },
    'branding': { de: 'Branding Tipps & Markenentwicklung', en: 'Branding Tips & Brand Development' },
    'marketing': { de: 'Marketing Strategien & Tipps', en: 'Marketing Strategies & Growth Tips' },
    'webdesign': { de: 'Webdesign Trends & Tipps', en: 'Web Design Trends & Best Practices' },
    'technologie': { de: 'Technologie News & Trends', en: 'Technology News & Innovation' },
  }

  const extendedTitle = titleMap[slug]?.[isEn ? 'en' : 'de'] || (isEn ? `${category.title} Articles` : `${category.title} Artikel`)
  // Use the correct path structure based on locale
  // slug from params is always German (from DB), translate to English for EN locale
  const enSlug = translateBlogCategorySlugToEn(slug)
  const basePath = locale === 'en' ? `/blog/category/${enSlug}` : `/blog/kategorie/${slug}`
  const canonicalUrl = getCanonicalUrl(basePath, locale)
  const hreflangAlternates = getHreflangAlternates(basePath, locale)

  return {
    title: `${extendedTitle} | Blog`,
    description: category.description || (isEn
      ? `All articles in the category ${category.title}`
      : `Alle Artikel aus der Kategorie ${category.title}`),
    keywords: [`${category.title} Blog`, `${category.title} ${isEn ? 'Articles' : 'Artikel'}`, 'GoldenWing Blog', 'Marketing Insights'],
    openGraph: {
      title: `${category.title} | GoldenWing Blog`,
      description: category.description || (isEn
        ? `All articles in the category ${category.title}`
        : `Alle Artikel aus der Kategorie ${category.title}`),
      url: canonicalUrl,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Note: slug validation removed - next-intl routing handles path translation
  // The slug received here is always the German slug from the database

  const category = await getCategoryBySlug(slug, locale) as Category | null
  const isEn = locale === 'en'

  if (!category) {
    notFound()
  }

  const featuredPost = category.posts.find((post) => post.featured)
  const regularPosts = category.posts.filter((post) => !post.featured)

  // Get correct URL path for current locale
  const categoryPath = isEn ? 'category' : 'kategorie'
  const categorySlug = isEn ? translateBlogCategorySlugToEn(slug) : slug
  const categoryUrl = `https://goldenwing.at${isEn ? '/en' : ''}/blog/${categoryPath}/${categorySlug}`

  // CollectionPage schema for blog category
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.title} | Blog`,
    description: category.description || (isEn
      ? `All articles in the category ${category.title}`
      : `Alle Artikel aus der Kategorie ${category.title}`),
    url: categoryUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: category.posts.length,
      itemListElement: category.posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `https://goldenwing.at${isEn ? '/en' : ''}/blog/${post.slug}`,
          datePublished: post.publishedAt,
        },
      })),
    },
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://goldenwing.at${isEn ? '/en' : ''}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://goldenwing.at${isEn ? '/en' : ''}/blog` },
      { '@type': 'ListItem', position: 3, name: category.title, item: categoryUrl },
    ],
  }

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbData} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {isEn ? 'All Articles' : 'Alle Artikel'}
              </Link>
              <Badge>{category.title}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-xl text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Category Introduction - adds more text content for SEO (100-200 words) */}
      <section className="pb-12">
        <Container variant="block">
          <div className="max-w-4xl">
            <div className="prose prose-lg text-muted-foreground mb-6 space-y-4">
              {category.slug === 'webdesign' && (
                <>
                  <p>
                    {isEn
                      ? 'Discover our comprehensive articles about modern web design, responsive layouts, user experience optimization, and the latest trends in digital design. Our experts share practical tips and in-depth guides to help you create stunning websites that convert visitors into customers.'
                      : 'Entdecken Sie unsere umfassenden Artikel über modernes Webdesign, responsive Layouts, User Experience Optimierung und die neuesten Trends im digitalen Design. Unsere Experten teilen praktische Tipps und detaillierte Anleitungen, die Ihnen helfen, beeindruckende Websites zu erstellen, die Besucher in Kunden verwandeln.'}
                  </p>
                  <p>
                    {isEn
                      ? 'Whether you are looking to redesign your existing website or build a new digital presence from scratch, our web design guides cover everything from choosing the right color schemes and typography to implementing effective navigation structures and call-to-action elements. We explore mobile-first design principles, accessibility best practices, and performance optimization techniques that ensure your website delivers an exceptional user experience across all devices.'
                      : 'Ob Sie Ihre bestehende Website neu gestalten oder eine neue digitale Präsenz von Grund auf aufbauen möchten – unsere Webdesign-Guides decken alles ab, von der Auswahl der richtigen Farbschemata und Typografie bis hin zur Implementierung effektiver Navigationsstrukturen und Call-to-Action-Elemente. Wir erkunden Mobile-First-Designprinzipien, Best Practices für Barrierefreiheit und Performance-Optimierungstechniken, die sicherstellen, dass Ihre Website auf allen Geräten ein außergewöhnliches Benutzererlebnis bietet.'}
                  </p>
                </>
              )}
              {category.slug === 'branding' && (
                <>
                  <p>
                    {isEn
                      ? 'Explore our expert insights on brand development, visual identity, logo design, and strategic brand positioning. Learn how successful brands build recognition and trust through consistent messaging and compelling visual storytelling.'
                      : 'Erkunden Sie unsere Experten-Einblicke zur Markenentwicklung, visuellen Identität, Logo-Design und strategischen Markenpositionierung. Erfahren Sie, wie erfolgreiche Marken durch konsistente Botschaften und überzeugendes visuelles Storytelling Wiedererkennung und Vertrauen aufbauen.'}
                  </p>
                  <p>
                    {isEn
                      ? 'Our branding articles delve deep into the psychology of brand perception, helping you understand what makes customers connect emotionally with certain brands. From developing a unique brand voice and tone to creating comprehensive brand guidelines, we provide actionable strategies for businesses of all sizes. Learn how to conduct competitive analysis, define your target audience, and craft a brand story that resonates with your ideal customers and sets you apart in a crowded marketplace.'
                      : 'Unsere Branding-Artikel tauchen tief in die Psychologie der Markenwahrnehmung ein und helfen Ihnen zu verstehen, was Kunden dazu bringt, sich emotional mit bestimmten Marken zu verbinden. Von der Entwicklung einer einzigartigen Markenstimme bis zur Erstellung umfassender Markenrichtlinien bieten wir umsetzbare Strategien für Unternehmen jeder Größe. Erfahren Sie, wie Sie Wettbewerbsanalysen durchführen, Ihre Zielgruppe definieren und eine Markengeschichte entwickeln, die bei Ihren idealen Kunden ankommt und Sie in einem überfüllten Markt von der Konkurrenz abhebt.'}
                  </p>
                </>
              )}
              {category.slug === 'seo' && (
                <>
                  <p>
                    {isEn
                      ? 'Stay ahead with our SEO guides covering search engine optimization strategies, keyword research, technical SEO, local SEO, and content optimization. Our articles help you improve your website visibility and drive organic traffic.'
                      : 'Bleiben Sie mit unseren SEO-Guides auf dem neuesten Stand, die Suchmaschinenoptimierung-Strategien, Keyword-Recherche, technisches SEO, lokales SEO und Content-Optimierung abdecken. Unsere Artikel helfen Ihnen, Ihre Website-Sichtbarkeit zu verbessern und organischen Traffic zu steigern.'}
                  </p>
                  <p>
                    {isEn
                      ? 'Search engine optimization is constantly evolving, and staying informed is crucial for maintaining your competitive edge. Our SEO articles cover the latest algorithm updates, emerging ranking factors, and proven optimization techniques that deliver measurable results. Learn how to conduct effective keyword research, optimize your content for featured snippets, build high-quality backlinks, and implement technical SEO improvements that boost your search rankings. We also explore the intersection of SEO and AI-powered search, helping you prepare for the future of search engine discovery.'
                      : 'Suchmaschinenoptimierung entwickelt sich ständig weiter, und informiert zu bleiben ist entscheidend für die Wahrung Ihres Wettbewerbsvorteils. Unsere SEO-Artikel behandeln die neuesten Algorithmus-Updates, aufkommende Ranking-Faktoren und bewährte Optimierungstechniken, die messbare Ergebnisse liefern. Erfahren Sie, wie Sie effektive Keyword-Recherche durchführen, Ihren Content für Featured Snippets optimieren, hochwertige Backlinks aufbauen und technische SEO-Verbesserungen implementieren, die Ihre Suchrankings verbessern. Wir erkunden auch die Schnittstelle von SEO und KI-gestützter Suche und helfen Ihnen, sich auf die Zukunft der Suchmaschinenentdeckung vorzubereiten.'}
                  </p>
                </>
              )}
              {category.slug === 'ui-ux' && (
                <>
                  <p>
                    {isEn
                      ? 'Dive into our UI/UX design resources covering user interface design principles, user experience best practices, usability testing, and interaction design. Learn how to create intuitive digital experiences that delight users.'
                      : 'Tauchen Sie ein in unsere UI/UX-Design-Ressourcen, die Prinzipien des User Interface Designs, Best Practices für User Experience, Usability-Tests und Interaktionsdesign abdecken. Erfahren Sie, wie Sie intuitive digitale Erlebnisse schaffen, die Benutzer begeistern.'}
                  </p>
                  <p>
                    {isEn
                      ? 'Great user experience is the foundation of successful digital products. Our UI/UX articles explore the research methods and design processes used by leading product teams to create interfaces that are both beautiful and functional. From conducting user interviews and creating personas to designing wireframes and prototypes, we guide you through every stage of the UX design process. Learn how to apply cognitive psychology principles, implement design systems, and use data-driven insights to continuously improve user satisfaction and achieve your business goals.'
                      : 'Hervorragende User Experience ist das Fundament erfolgreicher digitaler Produkte. Unsere UI/UX-Artikel erkunden die Forschungsmethoden und Designprozesse, die von führenden Produktteams verwendet werden, um Interfaces zu schaffen, die sowohl schön als auch funktional sind. Von der Durchführung von Benutzerinterviews und der Erstellung von Personas bis zum Design von Wireframes und Prototypen begleiten wir Sie durch jede Phase des UX-Design-Prozesses. Erfahren Sie, wie Sie kognitive Psychologie-Prinzipien anwenden, Design-Systeme implementieren und datengestützte Erkenntnisse nutzen, um die Benutzerzufriedenheit kontinuierlich zu verbessern und Ihre Geschäftsziele zu erreichen.'}
                  </p>
                </>
              )}
              {category.slug === 'marketing' && (
                <>
                  <p>
                    {isEn
                      ? 'Discover effective digital marketing strategies, social media tactics, content marketing approaches, and conversion optimization techniques. Our marketing articles help you reach your target audience and grow your business online.'
                      : 'Entdecken Sie effektive digitale Marketingstrategien, Social-Media-Taktiken, Content-Marketing-Ansätze und Conversion-Optimierungstechniken. Unsere Marketing-Artikel helfen Ihnen, Ihre Zielgruppe zu erreichen und Ihr Geschäft online auszubauen.'}
                  </p>
                  <p>
                    {isEn
                      ? 'The digital marketing landscape offers unprecedented opportunities to connect with your ideal customers at every stage of their journey. Our marketing guides cover the full spectrum of online marketing channels, from paid advertising and email campaigns to influencer partnerships and marketing automation. Learn how to develop data-driven marketing strategies, create compelling content that generates leads, measure ROI across multiple touchpoints, and build sustainable customer acquisition systems that scale with your business growth.'
                      : 'Die digitale Marketinglandschaft bietet beispiellose Möglichkeiten, mit Ihren idealen Kunden in jeder Phase ihrer Customer Journey in Kontakt zu treten. Unsere Marketing-Guides decken das gesamte Spektrum der Online-Marketing-Kanäle ab, von bezahlter Werbung und E-Mail-Kampagnen bis hin zu Influencer-Partnerschaften und Marketing-Automatisierung. Erfahren Sie, wie Sie datengesteuerte Marketingstrategien entwickeln, überzeugende Inhalte erstellen, die Leads generieren, den ROI über mehrere Touchpoints hinweg messen und nachhaltige Kundenakquisitionssysteme aufbauen, die mit Ihrem Unternehmenswachstum skalieren.'}
                  </p>
                </>
              )}
              {category.slug === 'technologie' && (
                <>
                  <p>
                    {isEn
                      ? 'Keep up with the latest technology trends, web development frameworks, tools, and innovations. Our technology articles cover everything from frontend technologies to backend solutions and emerging tech that shapes the digital landscape.'
                      : 'Bleiben Sie auf dem Laufenden über die neuesten Technologie-Trends, Webentwicklungs-Frameworks, Tools und Innovationen. Unsere Technologie-Artikel decken alles ab, von Frontend-Technologien bis hin zu Backend-Lösungen und aufkommenden Technologien, die die digitale Landschaft prägen.'}
                  </p>
                  <p>
                    {isEn
                      ? 'Technology is advancing at an unprecedented pace, transforming how businesses operate and compete. Our technology articles help you navigate this evolving landscape by exploring practical applications of emerging technologies like AI, machine learning, and cloud computing. From choosing the right tech stack for your projects to implementing secure and scalable architectures, we provide insights that help technical and non-technical readers alike make informed decisions. Stay updated on industry developments, learn about new tools and frameworks, and discover how technology can drive innovation in your organization.'
                      : 'Technologie entwickelt sich in einem beispiellosen Tempo weiter und verändert, wie Unternehmen arbeiten und konkurrieren. Unsere Technologie-Artikel helfen Ihnen, diese sich entwickelnde Landschaft zu navigieren, indem sie praktische Anwendungen aufkommender Technologien wie KI, maschinelles Lernen und Cloud Computing erkunden. Von der Auswahl des richtigen Tech-Stacks für Ihre Projekte bis zur Implementierung sicherer und skalierbarer Architekturen bieten wir Einblicke, die sowohl technischen als auch nicht-technischen Lesern helfen, fundierte Entscheidungen zu treffen. Bleiben Sie über Branchenentwicklungen informiert, erfahren Sie mehr über neue Tools und Frameworks und entdecken Sie, wie Technologie Innovation in Ihrer Organisation vorantreiben kann.'}
                  </p>
                </>
              )}
              {!['webdesign', 'branding', 'seo', 'ui-ux', 'marketing', 'technologie'].includes(category.slug) && (
                <>
                  <p>
                    {isEn
                      ? `Explore our collection of articles about ${category.title}. Our team of experts shares valuable insights, practical tips, and in-depth guides to help you stay informed about the latest developments in this field.`
                      : `Erkunden Sie unsere Artikelsammlung zum Thema ${category.title}. Unser Expertenteam teilt wertvolle Einblicke, praktische Tipps und detaillierte Anleitungen, die Ihnen helfen, über die neuesten Entwicklungen in diesem Bereich informiert zu bleiben.`}
                  </p>
                  <p>
                    {isEn
                      ? `Each article is carefully crafted by our experienced professionals who bring years of industry knowledge to every piece they write. We focus on providing actionable information that you can immediately apply to your projects and business challenges. Browse through our ${category.title} articles to discover strategies, best practices, and innovative approaches that can help you achieve your goals.`
                      : `Jeder Artikel wird sorgfältig von unseren erfahrenen Fachleuten erstellt, die jahrelange Branchenkenntnisse in jeden Text einbringen. Wir konzentrieren uns darauf, umsetzbare Informationen zu liefern, die Sie sofort auf Ihre Projekte und geschäftlichen Herausforderungen anwenden können. Durchstöbern Sie unsere ${category.title}-Artikel, um Strategien, Best Practices und innovative Ansätze zu entdecken, die Ihnen helfen können, Ihre Ziele zu erreichen.`}
                  </p>
                </>
              )}
            </div>
            <p className="text-muted-foreground">
              {category.posts.length} {isEn ? (category.posts.length === 1 ? 'Article' : 'Articles') : 'Artikel'}
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-16">
          <Container variant="block">
            <Link href={{ pathname: '/blog/[slug]', params: { slug: featuredPost.slug } }} className="group block">
              <article className="grid md:grid-cols-2 gap-8 bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all">
                <div className={`aspect-video md:aspect-auto relative ${!featuredPost.mainImage?.url ? `bg-gradient-to-br ${getColorForCategory(featuredPost.category?.slug)}` : ''}`}>
                  {featuredPost.mainImage?.url ? (
                    <Image
                      src={getImageUrl(featuredPost.mainImage.url)}
                      alt={featuredPost.mainImage.alt || featuredPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <span className="text-2xl font-bold text-foreground/20 text-center">
                        {featuredPost.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4">Featured</Badge>
                  {featuredPost.category && (
                    <Badge variant="outline" className="w-fit mb-4">
                      {featuredPost.category.title}
                    </Badge>
                  )}
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredPost.publishedAt, locale)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime} min
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </Container>
        </section>
      )}

      {/* Posts Grid */}
      {regularPosts.length > 0 && (
        <section className="pb-20">
          <Container variant="block">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                  className="group block"
                >
                  <article className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                    <div className={`aspect-video relative ${!post.mainImage?.url ? `bg-gradient-to-br ${getColorForCategory(post.category?.slug)}` : ''}`}>
                      {post.mainImage?.url ? (
                        <Image
                          src={getImageUrl(post.mainImage.url)}
                          alt={post.mainImage.alt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <span className="text-lg font-bold text-foreground/20 text-center">
                            {post.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <Badge variant="outline" className="w-fit mb-3">
                          {post.category.title}
                        </Badge>
                      )}
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt, locale)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Empty State */}
      {category.posts.length === 0 && (
        <section className="pb-20">
          <Container variant="block">
            <div className="max-w-2xl mx-auto text-center py-12">
              <p className="text-muted-foreground text-lg">
                {isEn
                  ? 'No articles available in this category yet.'
                  : 'In dieser Kategorie sind noch keine Artikel verfügbar.'}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary hover:underline mt-6"
              >
                <ArrowLeft className="h-4 w-4" />
                {isEn ? 'Back to overview' : 'Zurück zur Übersicht'}
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? 'Never miss a thing' : 'Nichts mehr verpassen'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isEn
                ? 'Subscribe to our newsletter and receive the latest insights directly in your inbox. No spam, only value.'
                : 'Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Insights direkt in Ihr Postfach. Kein Spam, nur Mehrwert.'}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={isEn ? 'your@email.com' : 'ihre@email.at'}
                className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {isEn ? 'Subscribe' : 'Abonnieren'}
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              {isEn
                ? 'By subscribing, you agree to our privacy policy.'
                : 'Mit dem Abonnieren stimmen Sie unserer Datenschutzerklärung zu.'}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
