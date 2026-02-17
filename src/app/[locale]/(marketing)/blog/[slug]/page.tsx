import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { notFound } from 'next/navigation'
import Image from 'next/image'

// Allow dynamic params for locales not in generateStaticParams
export const dynamicParams = true
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Quote, BookOpen, ExternalLink, ChevronRight, Lightbulb, Linkedin } from 'lucide-react'
import { ShareButtons } from '@/components/share-buttons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getPosts, getPostBySlug, getPostSlugByIdAndLocale, getRelatedPosts, type SupportedLocale } from '@/lib/payload'
import { BlogPostingSchema, BreadcrumbListSchema, FAQSchema } from '@/components/seo/json-ld'
import { RichText } from '@/components/rich-text'
import { translateServiceSlugToEn, translateBlogCategorySlugToEn, truncateMetaDescription, getContactUrl, getServicesUrl } from '@/lib/utils'
import NextLink from 'next/link'

interface ExpertQuote {
  quote: string
  author: string
  role?: string
  source?: string
}


interface Source {
  title: string
  url?: string
  author?: string
  year?: string
}

interface TableOfContentsItem {
  heading: string
  anchor: string
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

// Authors for EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)
const AUTHORS = {
  deni: {
    name: 'Deni Khachukaev',
    role: {
      de: 'Gründer & Technical Director',
      en: 'Founder & Technical Director'
    },
    bio: {
      de: 'Mit über 5 Jahren Erfahrung in Webentwicklung und SEO leitet Deni die technische Ausrichtung von GoldenWing. Spezialisiert auf Performance-Optimierung, technisches SEO und moderne Web-Technologien.',
      en: 'With over 5 years of experience in web development and SEO, Deni leads the technical direction of GoldenWing. Specialized in performance optimization, technical SEO, and modern web technologies.'
    },
    linkedin: 'https://www.linkedin.com/in/deni-khachukaev/'
  },
  benedikt: {
    name: 'Benedikt Hasibeder',
    role: {
      de: 'Gründer & Business Director',
      en: 'Founder & Business Director'
    },
    bio: {
      de: 'Benedikt verantwortet die strategische Geschäftsentwicklung bei GoldenWing. Mit Expertise in Branding, Marketing-Strategie und Kundenbeziehungen hilft er Unternehmen, ihre digitale Präsenz erfolgreich auszubauen.',
      en: 'Benedikt is responsible for strategic business development at GoldenWing. With expertise in branding, marketing strategy, and client relations, he helps companies successfully expand their digital presence.'
    },
    linkedin: 'https://www.linkedin.com/in/benedikt-hasibeder/'
  }
}

// Technical categories → Deni, Business categories → Benedikt
const _TECHNICAL_CATEGORIES = ['webdesign', 'seo', 'technologie', 'ui-ux']
const BUSINESS_CATEGORIES = ['branding', 'marketing', 'business', 'strategie']

function getDefaultAuthor(categorySlug: string | undefined) {
  if (!categorySlug) return AUTHORS.deni
  if (BUSINESS_CATEGORIES.includes(categorySlug.toLowerCase())) return AUTHORS.benedikt
  return AUTHORS.deni
}

// Legacy fallback
const _DEFAULT_AUTHOR = AUTHORS.deni

export async function generateStaticParams() {
  const locales = ['de', 'en'] as const
  const params: { locale: string; slug: string }[] = []

  // Generate params for each locale with locale-specific slugs
  for (const locale of locales) {
    const posts = await getPosts(locale)
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  // Guard against literal [slug] or URL-encoded variants being treated as valid route
  // Also reject any slug containing brackets (invalid for our blog posts)
  const decodedSlug = decodeURIComponent(slug)
  if (slug === '[slug]' || decodedSlug === '[slug]' || slug.includes('[') || slug.includes(']') || decodedSlug.includes('[') || decodedSlug.includes(']')) {
    return { title: 'Not Found', robots: { index: false } }
  }

  // No RU blog translations exist — all would be DE fallback → duplicate content
  if (locale === 'ru') {
    notFound()
  }

  const post = await getPostBySlug(slug, locale)

  const isEn = locale === 'en'
  if (!post) {
    notFound()
  }

  // Get the slug in the alternate locale for correct hreflang
  const alternateLocale = locale === 'en' ? 'de' : 'en'
  const alternateSlug = await getPostSlugByIdAndLocale(post.id, alternateLocale)

  // Build locale-specific URLs
  const deSlug = locale === 'de' ? slug : alternateSlug
  const enSlug = locale === 'en' ? slug : alternateSlug

  // Detect untranslated EN posts (same slug = Payload fallback to DE content)
  const isUntranslatedEn = isEn && enSlug === deSlug

  const BASE_URL = 'https://goldenwing.at'
  const deUrl = `${BASE_URL}/blog/${deSlug}`
  const enUrl = `${BASE_URL}/en/blog/${enSlug}`
  const canonicalUrl = isUntranslatedEn ? deUrl : (locale === 'en' ? enUrl : deUrl)

  const metaDescription = truncateMetaDescription(post.excerpt || '')
  const metaAuthor = getDefaultAuthor(post.category?.slug)

  return {
    title: `${post.title} | Blog`,
    description: metaDescription,
    // Noindex untranslated EN posts to prevent duplicate content
    ...(isUntranslatedEn && { robots: { index: false, follow: true } }),
    openGraph: {
      title: post.title,
      description: metaDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'GoldenWing Creative Studios',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || metaAuthor.name],
      section: post.category?.title,
      images: [
        {
          url: (post.featuredImage as { url?: string })?.url || 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [(post.featuredImage as { url?: string })?.url || 'https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
      // Only include hreflang alternates if post is translated
      ...(!isUntranslatedEn && {
        languages: {
          'de': deUrl,
          'en': enUrl,
          'x-default': deUrl,
        },
      }),
    },
  }
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  // Guard against literal [slug] or URL-encoded variants being treated as valid route
  // Also reject any slug containing brackets (invalid for our blog posts)
  const decodedSlug = decodeURIComponent(slug)
  if (slug === '[slug]' || decodedSlug === '[slug]' || slug.includes('[') || slug.includes(']') || decodedSlug.includes('[') || decodedSlug.includes(']')) {
    notFound()
  }

  // No RU blog translations exist — all would be DE fallback → duplicate content
  if (locale === 'ru') {
    notFound()
  }

  const post = await getPostBySlug(slug, locale)
  const isEn = locale === 'en'

  if (!post) {
    notFound()
  }

  // Get related posts for internal linking
  const relatedPosts = await getRelatedPosts(slug, post.category?.slug, locale, 3)

  // Select author based on category (Tech → Deni, Business → Benedikt)
  const defaultAuthor = getDefaultAuthor(post.category?.slug)

  // Build share URL
  const BASE_URL = 'https://goldenwing.at'
  const postUrl = isEn ? `${BASE_URL}/en/blog/${slug}` : `${BASE_URL}/blog/${slug}`

  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: isEn ? `${BASE_URL}/en` : BASE_URL },
          { name: 'Blog', url: isEn ? `${BASE_URL}/en/blog` : `${BASE_URL}/blog` },
          ...(post.category ? [{ name: post.category.title, url: isEn ? `${BASE_URL}/en/blog/category/${translateBlogCategorySlugToEn(post.category.slug)}` : `${BASE_URL}/blog/kategorie/${post.category.slug}` }] : []),
          { name: post.title, url: postUrl },
        ]}
      />
      <BlogPostingSchema
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        publishedAt={post.publishedAt}
        authorName={post.author?.name || defaultAuthor.name}
        authorDetails={{
          name: post.author?.name || defaultAuthor.name,
          url: defaultAuthor.linkedin,
          jobTitle: isEn ? defaultAuthor.role.en : defaultAuthor.role.de,
          description: isEn ? defaultAuthor.bio.en : defaultAuthor.bio.de,
          sameAs: [defaultAuthor.linkedin],
        }}
        category={post.category?.title}
      />
      {post.faqs && post.faqs.length > 0 && <FAQSchema items={post.faqs} />}

      {/* Hero */}
      <section className="pt-24 pb-8">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {isEn ? 'All Articles' : 'Alle Artikel'}
              </Link>

              {post.category && (
                <Link href={{ pathname: '/blog/kategorie/[slug]', params: { slug: isEn ? translateBlogCategorySlugToEn(post.category.slug) : post.category.slug } }}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 font-medium">
                    {post.category.title}
                  </Badge>
                </Link>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & Meta - EEAT compliant */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{post.author?.name || defaultAuthor.name}</p>
                    {!post.author && defaultAuthor.linkedin && (
                      <a
                        href={defaultAuthor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {post.author
                      ? (isEn ? 'Author' : 'Autor')
                      : (isEn ? defaultAuthor.role.en : defaultAuthor.role.de)
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt, locale)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime} {isEn ? 'min read' : 'Min. Lesezeit'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="pb-10">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            {post.mainImage && typeof post.mainImage === 'object' && post.mainImage.url ? (
              <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={getImageUrl(post.mainImage.url)}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                  quality={90}
                />
              </div>
            ) : (
              <div className={`aspect-[2/1] bg-gradient-to-br ${getColorForCategory(post.category?.slug)} rounded-2xl flex items-center justify-center overflow-hidden shadow-sm`}>
                <div className="text-center px-8">
                  <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-foreground/30" />
                  </div>
                  <span className="text-lg font-medium text-foreground/30 line-clamp-2">
                    {post.title}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Content with Sidebar */}
      <section className="pb-20">
        <Container variant="block">
          <div className="relative max-w-3xl mx-auto">
            {/* Main Content */}
            <div>
              {/* Table of Contents (Mobile/Tablet) */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <details className="xl:hidden mb-10 bg-card border rounded-xl overflow-hidden group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                    <span className="font-semibold flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {isEn ? 'Table of Contents' : 'Inhaltsverzeichnis'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                  </summary>
                  <nav className="px-4 pb-4 space-y-1">
                    {post.tableOfContents.map((item: TableOfContentsItem, idx: number) => (
                      <a
                        key={idx}
                        href={`#${item.anchor}`}
                        className="block text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md px-2 py-1.5 transition-colors"
                      >
                        {item.heading}
                      </a>
                    ))}
                  </nav>
                </details>
              )}

              {/* Article Content - Safari Reader Mode optimized */}
              <article
                role="article"
                aria-label={post.title}
                itemScope
                itemType="https://schema.org/Article"
                data-reader-view="article"
              >
                <meta itemProp="headline" content={post.title} />
                <meta itemProp="author" content={post.author?.name || defaultAuthor.name} />
                <meta itemProp="datePublished" content={post.publishedAt} />
                <div itemProp="articleBody" className="article-content">
                  <RichText content={post.content} />
                </div>
              </article>

              {/* Expert Quotes */}
              {post.expertQuotes && post.expertQuotes.length > 0 && (
                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Quote className="h-5 w-5 text-primary" />
                    {isEn ? 'Expert Opinions' : 'Experten-Meinungen'}
                  </h3>
                  {post.expertQuotes.map((quote: ExpertQuote, idx: number) => (
                    <blockquote
                      key={idx}
                      className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary"
                    >
                      <p className="text-lg italic mb-3">&ldquo;{quote.quote}&rdquo;</p>
                      <footer className="text-sm">
                        <span className="font-semibold">{quote.author}</span>
                        {quote.role && (
                          <span className="text-muted-foreground"> — {quote.role}</span>
                        )}
                        {quote.source && (
                          <span className="text-muted-foreground block mt-1 text-xs">
                            {isEn ? 'Source:' : 'Quelle:'} {quote.source}
                          </span>
                        )}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              )}


              {/* Sources */}
              {post.sources && post.sources.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">{isEn ? 'Sources & References' : 'Quellen & Referenzen'}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {post.sources.map((source: Source, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {source.url ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors inline-flex items-center gap-1"
                          >
                            {source.title}
                            {source.author && ` — ${source.author}`}
                            {source.year && ` (${source.year})`}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span>
                            {source.title}
                            {source.author && ` — ${source.author}`}
                            {source.year && ` (${source.year})`}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Services */}
              {post.relatedServices && post.relatedServices.length > 0 && (
                <div className="mt-12 p-6 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-3">{isEn ? 'Related Services' : 'Passende Leistungen'}</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.relatedServices.map((service: { id: string; title: string; slug: string }) => (
                      <Link
                        key={service.id}
                        href={{ pathname: '/leistungen/[slug]', params: { slug: isEn ? translateServiceSlugToEn(service.slug) : service.slug } }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-sm transition-colors"
                      >
                        {service.title}
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-medium mb-1">{isEn ? 'Did you find this article helpful?' : 'Hat Ihnen dieser Artikel geholfen?'}</p>
                    <p className="text-sm text-muted-foreground">{isEn ? 'Share it with others.' : 'Teilen Sie ihn mit anderen.'}</p>
                  </div>
                  <ShareButtons url={postUrl} title={post.title} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden xl:block absolute left-full ml-12 w-72 top-0">
              <div className="sticky top-24 space-y-5">
                {/* Table of Contents */}
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <div className="bg-card border rounded-xl p-5 shadow-sm">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg text-foreground">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {isEn ? 'Table of Contents' : 'Inhaltsverzeichnis'}
                    </h3>
                    <nav className="space-y-1">
                      {post.tableOfContents.map((item: TableOfContentsItem, idx: number) => (
                        <a
                          key={idx}
                          href={`#${item.anchor}`}
                          className="block text-[13px] text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md px-2 py-1.5 -mx-2 transition-colors"
                        >
                          {item.heading}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Quick CTA */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 text-lg">{isEn ? 'Discuss a project?' : 'Projekt besprechen?'}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {isEn ? 'We are happy to help you with your next project.' : 'Wir helfen Ihnen gerne bei Ihrem nächsten Vorhaben.'}
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <NextLink href={getContactUrl(locale)}>
                      {isEn ? 'Get in touch' : 'Kontakt aufnehmen'}
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </NextLink>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t">
          <Container variant="block">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">
                {isEn ? 'Related Articles' : 'Weitere Artikel'}
              </h2>
              <div className="grid gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={{ pathname: '/blog/[slug]', params: { slug: relatedPost.slug } }}
                    className="group flex gap-4 p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    {relatedPost.mainImage && typeof relatedPost.mainImage === 'object' && relatedPost.mainImage.url ? (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={getImageUrl(relatedPost.mainImage.url)}
                          alt={relatedPost.mainImage.alt || relatedPost.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                          loading="lazy"
                          quality={75}
                        />
                      </div>
                    ) : (
                      <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${getColorForCategory(relatedPost.category && typeof relatedPost.category === 'object' ? relatedPost.category.slug : undefined)} shrink-0 flex items-center justify-center`}>
                        <BookOpen className="h-6 w-6 text-foreground/30" />
                      </div>
                    )}
                    <div className="flex flex-col justify-center min-w-0">
                      {relatedPost.category && typeof relatedPost.category === 'object' && (
                        <Badge variant="secondary" className="w-fit mb-2 text-xs">
                          {relatedPost.category.title}
                        </Badge>
                      )}
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readTime} {isEn ? 'min' : 'Min.'}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors ml-auto self-center shrink-0" />
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {isEn ? 'View All Articles' : 'Alle Artikel ansehen'}
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isEn ? 'Ready for your project?' : 'Bereit für Ihr Projekt?'}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              {isEn
                ? 'We bring the same dedication and expertise you see in our articles to every client project.'
                : 'Wir bringen das gleiche Engagement und Know-how, das Sie in unseren Artikeln sehen, in jedes Kundenprojekt.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <NextLink href={getContactUrl(locale)}>
                  {isEn ? 'Discuss project' : 'Projekt besprechen'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </NextLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <NextLink href={getServicesUrl(locale)}>
                  {isEn ? 'View services' : 'Leistungen ansehen'}
                </NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
