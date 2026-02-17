import { Metadata } from 'next'
import NextLink from 'next/link'
import Image from 'next/image'
import { Link } from '@/lib/i18n-navigation'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { CategoryLink } from '@/components/blog/category-link'
import { getPostsPaginated, getBlogListingPage, type SupportedLocale } from '@/lib/payload'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


const POSTS_PER_PAGE = 12

export const revalidate = 60

// Default content
const defaultContent = {
  de: {
    heroTitle: 'Blog & Insights',
    heroDescription: 'Wissen, das weiterbringt. Entdecken Sie Strategien, Trends und Best Practices aus der Welt des digitalen Marketings und Designs.',
    categoriesLabel: 'Kategorien:',
    featuredLabel: 'Empfohlen',
    emptyMessage: 'Noch keine Blog-Beiträge vorhanden. Fügen Sie Inhalte im',
    adminLink: 'Admin-Bereich',
    newsletterTitle: 'Nichts mehr verpassen',
    newsletterDescription: 'Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Insights direkt in Ihr Postfach. Kein Spam, nur Mehrwert.',
    newsletterPlaceholder: 'ihre@email.at',
    newsletterButton: 'Abonnieren',
    newsletterDisclaimer: 'Mit dem Abonnieren stimmen Sie unserer Datenschutzerklärung zu.',
    metaTitle: 'Blog | Insights zu Branding, Webdesign & Marketing',
    metaDescription: 'Expertenwissen zu Branding, Webdesign, SEO und digitalem Marketing. Tipps, Trends und Best Practices von GoldenWing Creative Studios.',
  },
  en: {
    heroTitle: 'Blog & Insights',
    heroDescription: 'Knowledge that moves you forward. Discover strategies, trends, and best practices from the world of digital marketing and design.',
    categoriesLabel: 'Categories:',
    featuredLabel: 'Featured',
    emptyMessage: 'No blog posts available yet. Add content in the',
    adminLink: 'admin area',
    newsletterTitle: 'Never miss a thing',
    newsletterDescription: 'Subscribe to our newsletter and receive the latest insights directly to your inbox. No spam, just value.',
    newsletterPlaceholder: 'your@email.com',
    newsletterButton: 'Subscribe',
    newsletterDisclaimer: 'By subscribing, you agree to our privacy policy.',
    metaTitle: 'Blog | Insights on Branding, Web Design & Marketing',
    metaDescription: 'Expert knowledge on branding, web design, SEO, and digital marketing. Tips, trends, and best practices from GoldenWing Creative Studios.',
  },
  ru: {
    heroTitle: 'Блог и инсайты',
    heroDescription: 'Знания, которые продвигают вперёд. Откройте для себя стратегии, тренды и лучшие практики из мира цифрового маркетинга и дизайна.',
    categoriesLabel: 'Категории:',
    featuredLabel: 'Рекомендуемое',
    emptyMessage: 'Пока нет записей в блоге. Добавьте контент в',
    adminLink: 'админ-панели',
    newsletterTitle: 'Не пропустите ничего',
    newsletterDescription: 'Подпишитесь на нашу рассылку и получайте последние инсайты прямо на почту. Никакого спама, только ценность.',
    newsletterPlaceholder: 'ваша@почта.com',
    newsletterButton: 'Подписаться',
    newsletterDisclaimer: 'Подписываясь, вы соглашаетесь с нашей политикой конфиденциальности.',
    metaTitle: 'Блог | Инсайты о брендинге, веб-дизайне и маркетинге',
    metaDescription: 'Экспертные знания о брендинге, веб-дизайне, SEO и цифровом маркетинге. Советы, тренды и лучшие практики от GoldenWing Creative Studios.',
  },
}

interface BlogCategory {
  title: string
  slug: string
}

interface BlogAuthor {
  name: string
}

interface BlogImage {
  url: string
  alt?: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: BlogCategory | null
  author: BlogAuthor | null
  mainImage?: BlogImage | null
  publishedAt: string
  readTime: number
  featured?: boolean
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

// All blog categories for internal linking (slugs match slug-registry mappings)
const blogCategories = [
  { slugDe: 'seo', slugEn: 'seo', labelDe: 'SEO', labelEn: 'SEO', labelRu: 'SEO' },
  { slugDe: 'webdesign', slugEn: 'web-design', labelDe: 'Webdesign', labelEn: 'Web Design', labelRu: 'Веб-дизайн' },
  { slugDe: 'branding', slugEn: 'branding', labelDe: 'Branding', labelEn: 'Branding', labelRu: 'Брендинг' },
  { slugDe: 'ui-ux', slugEn: 'ui-ux', labelDe: 'UI/UX', labelEn: 'UI/UX', labelRu: 'UI/UX' },
  { slugDe: 'marketing', slugEn: 'marketing', labelDe: 'Marketing', labelEn: 'Marketing', labelRu: 'Маркетинг' },
  { slugDe: 'technologie', slugEn: 'technology', labelDe: 'Technologie', labelEn: 'Technology', labelRu: 'Технологии' },
]

function formatDate(dateString: string, locale: string) {
  const localeMap: Record<string, string> = {
    de: 'de-DE',
    en: 'en-US',
    ru: 'ru-RU',
  }
  return new Date(dateString).toLocaleDateString(localeMap[locale] || 'de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ page?: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const queryParams = await searchParams
  const currentPage = Math.max(1, parseInt(queryParams.page || '1', 10))
  const isPaginated = currentPage > 1

  const cmsPage = await getBlogListingPage(locale)
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const hreflangAlternates = getHreflangAlternates('/blog')

  const title = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const description = cmsPage?.seo?.metaDescription || defaults.metaDescription

  return {
    title: isPaginated ? `${title} - Seite ${currentPage}` : title,
    description,
    // Paginated pages should not be indexed — only the main /blog page
    ...(isPaginated && {
      robots: {
        index: false,
        follow: true,
      },
    }),
    keywords: locale === 'de'
      ? ['Branding Blog', 'Webdesign Tipps', 'SEO Blog', 'Marketing Insights']
      : ['Branding Blog', 'Web Design Tips', 'SEO Blog', 'Marketing Insights'],
    openGraph: {
      title: `${cmsPage?.hero?.title || defaults.heroTitle} | GoldenWing Creative Studios`,
      description,
      url: { de: 'https://goldenwing.at/blog', en: 'https://goldenwing.at/en/blog', ru: 'https://goldenwing.at/ru/blog' }[locale] || 'https://goldenwing.at/blog',
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${cmsPage?.hero?.title || defaults.heroTitle} | GoldenWing Creative Studios`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cmsPage?.hero?.title || defaults.heroTitle} | GoldenWing Creative Studios`,
      description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      // Canonical always points to /blog (page 1), never to ?page=N
      canonical: getCanonicalUrl('/blog', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const queryParams = await searchParams
  const currentPage = Math.max(1, parseInt(queryParams.page || '1', 10))

  const [cmsPage, paginatedPosts] = await Promise.all([
    getBlogListingPage(locale),
    getPostsPaginated(locale, currentPage, POSTS_PER_PAGE),
  ])

  const posts = paginatedPosts.docs as BlogPost[]
  const { totalPages, hasNextPage, hasPrevPage, totalDocs } = paginatedPosts
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Merge CMS data with defaults
  const heroTitle = cmsPage?.hero?.title || defaults.heroTitle
  const heroDescription = cmsPage?.hero?.description || defaults.heroDescription
  const categoriesLabel = cmsPage?.hero?.categoriesLabel || defaults.categoriesLabel
  const featuredLabel = cmsPage?.featuredLabel || defaults.featuredLabel
  const emptyMessage = cmsPage?.emptyState?.message || defaults.emptyMessage
  const adminLink = cmsPage?.emptyState?.adminLinkText || defaults.adminLink
  const newsletterTitle = cmsPage?.newsletter?.title || defaults.newsletterTitle
  const newsletterDescription = cmsPage?.newsletter?.description || defaults.newsletterDescription
  const newsletterPlaceholder = cmsPage?.newsletter?.placeholder || defaults.newsletterPlaceholder
  const newsletterButton = cmsPage?.newsletter?.button || defaults.newsletterButton
  const newsletterDisclaimer = cmsPage?.newsletter?.disclaimer || defaults.newsletterDisclaimer

  // Only show featured post on first page
  const featuredPost = currentPage === 1 ? posts.find((post) => post.featured) : null
  const regularPosts = featuredPost ? posts.filter((post) => !post.featured) : posts

  // Schema markup for SEO
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: heroTitle,
    description: heroDescription,
    url: getSchemaUrl('/blog', locale),
    inLanguage: { de: 'de-AT', en: 'en', ru: 'ru' }[locale] || 'de-AT',
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
  }

  // Blog schema for structured data
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: heroTitle,
    description: heroDescription,
    url: getSchemaUrl('/blog', locale),
    inLanguage: { de: 'de-AT', en: 'en', ru: 'ru' }[locale] || 'de-AT',
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goldenwing.at/logo.png',
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: getSchemaUrl(`/blog/${post.slug}`, locale),
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'GoldenWing Creative Studios',
      },
      ...(post.category && { articleSection: post.category.title }),
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': getSchemaUrl('/', locale) },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': getSchemaUrl('/blog', locale) }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {heroDescription}
            </p>
          </div>

          {/* Category Links for internal linking */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="text-sm text-muted-foreground py-2">
              {categoriesLabel}
            </span>
            {blogCategories.map((cat) => (
              <Link
                key={cat.slugDe}
                href={{ pathname: '/blog/kategorie/[slug]', params: { slug: locale === 'de' ? cat.slugDe : cat.slugEn } }}
                className="px-4 py-2 rounded-full border bg-card text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {{ de: cat.labelDe, en: cat.labelEn, ru: cat.labelRu }[locale] || cat.labelEn}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-16">
          <Container variant="block">
            <Link href={{ pathname: '/blog/[slug]', params: { slug: featuredPost.slug } }} className="group block">
              <article className="grid md:grid-cols-2 gap-8 bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all">
                {featuredPost.mainImage?.url ? (
                  <div className="relative aspect-video md:aspect-auto md:min-h-[300px]">
                    <Image
                      src={getImageUrl(featuredPost.mainImage.url)}
                      alt={featuredPost.mainImage.alt || featuredPost.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      quality={85}
                    />
                  </div>
                ) : (
                  <div className={`aspect-video md:aspect-auto bg-gradient-to-br ${getColorForCategory(featuredPost.category?.slug)} flex items-center justify-center p-8`}>
                    <span className="text-2xl font-bold text-foreground/20 text-center">
                      {featuredPost.title}
                    </span>
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge>{featuredLabel}</Badge>
                    {featuredPost.category && (
                      <CategoryLink slug={featuredPost.category.slug} title={featuredPost.category.title} />
                    )}
                  </div>
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
                      {featuredPost.readTime} {{ de: 'min', en: 'min', ru: 'мин' }[locale] || 'min'}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </Container>
        </section>
      )}

      {/* Posts Grid */}
      <section className="pb-12">
        <Container variant="block">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {emptyMessage}{' '}
                <NextLink href="/admin" className="text-primary hover:underline">
                  {adminLink}
                </NextLink>
                {{ de: ' hinzu.', en: '.', ru: '.' }[locale] || '.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                  className="group block"
                >
                  <article className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                    {post.mainImage?.url ? (
                      <div className="relative aspect-video">
                        <Image
                          src={getImageUrl(post.mainImage.url)}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                          quality={80}
                        />
                      </div>
                    ) : (
                      <div className={`aspect-video bg-gradient-to-br ${getColorForCategory(post.category?.slug)} flex items-center justify-center p-4`}>
                        <span className="text-lg font-bold text-foreground/20 text-center">
                          {post.title}
                        </span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <div className="mb-3">
                          <CategoryLink slug={post.category.slug} title={post.category.title} />
                        </div>
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
                          {post.readTime} {{ de: 'min', en: 'min', ru: 'мин' }[locale] || 'min'}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="pb-20">
          <Container variant="block">
            <div className="flex items-center justify-center gap-2">
              {/* Previous */}
              {hasPrevPage ? (
                <NextLink
                  href={currentPage === 2 ? '/blog' : `/blog?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border bg-card hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {{ de: 'Zurück', en: 'Previous', ru: 'Назад' }[locale] || 'Previous'}
                </NextLink>
              ) : (
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border bg-muted/50 text-muted-foreground cursor-not-allowed">
                  <ChevronLeft className="h-4 w-4" />
                  {{ de: 'Zurück', en: 'Previous', ru: 'Назад' }[locale] || 'Previous'}
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first, last, current, and neighbors
                  const showPage = pageNum === 1 ||
                                   pageNum === totalPages ||
                                   Math.abs(pageNum - currentPage) <= 1

                  // Show ellipsis
                  const showEllipsisBefore = pageNum === currentPage - 2 && currentPage > 3
                  const showEllipsisAfter = pageNum === currentPage + 2 && currentPage < totalPages - 2

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return <span key={pageNum} className="px-2 text-muted-foreground">...</span>
                  }

                  if (!showPage) return null

                  return (
                    <NextLink
                      key={pageNum}
                      href={pageNum === 1 ? '/blog' : `/blog?page=${pageNum}`}
                      className={`min-w-[40px] h-10 inline-flex items-center justify-center rounded-lg border transition-colors ${
                        pageNum === currentPage
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card hover:bg-muted'
                      }`}
                    >
                      {pageNum}
                    </NextLink>
                  )
                })}
              </div>

              {/* Next */}
              {hasNextPage ? (
                <NextLink
                  href={`/blog?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border bg-card hover:bg-muted transition-colors"
                >
                  {{ de: 'Weiter', en: 'Next', ru: 'Далее' }[locale] || 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </NextLink>
              ) : (
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border bg-muted/50 text-muted-foreground cursor-not-allowed">
                  {{ de: 'Weiter', en: 'Next', ru: 'Далее' }[locale] || 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </div>

            {/* Page Info */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              {locale === 'en'
                ? `Showing ${(currentPage - 1) * POSTS_PER_PAGE + 1}-${Math.min(currentPage * POSTS_PER_PAGE, totalDocs)} of ${totalDocs} articles`
                : locale === 'ru'
                ? `${(currentPage - 1) * POSTS_PER_PAGE + 1}-${Math.min(currentPage * POSTS_PER_PAGE, totalDocs)} из ${totalDocs} статей`
                : `${(currentPage - 1) * POSTS_PER_PAGE + 1}-${Math.min(currentPage * POSTS_PER_PAGE, totalDocs)} von ${totalDocs} Artikeln`
              }
            </p>
          </Container>
        </section>
      )}

      {/* Featured Articles Section */}
      <section className="py-16 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'de' ? 'Empfohlene Artikel' : locale === 'ru' ? 'Рекомендуемые статьи' : 'Featured Articles'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === 'de'
                ? 'Unsere meistgelesenen Guides und Anleitungen.'
                : locale === 'ru'
                ? 'Наши самые читаемые руководства и инструкции.'
                : 'Our most read guides and tutorials.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NextLink href={locale === 'en' ? '/en/blog/core-web-vitals-optimization-guide' : '/blog/core-web-vitals-optimieren-guide'} className="p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all">
              <span className="text-sm font-medium">Core Web Vitals Guide</span>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'de' ? 'Alles über LCP, FID, CLS und wie Sie diese optimieren' : locale === 'ru' ? 'Всё о LCP, FID, CLS и как их оптимизировать' : 'Everything about LCP, FID, CLS and how to optimize them'}
              </p>
            </NextLink>
            <NextLink href={locale === 'en' ? '/en/blog/seo-vs-geo-ai-search' : '/blog/seo-vs-geo-ai-suche'} className="p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all">
              <span className="text-sm font-medium">SEO vs GEO</span>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'de' ? 'Die Zukunft der Suche: Generative Engine Optimization' : locale === 'ru' ? 'Будущее поиска: Generative Engine Optimization' : 'The future of search: Generative Engine Optimization'}
              </p>
            </NextLink>
            <NextLink href={locale === 'en' ? '/en/blog/brand-identity-development-guide' : '/blog/markenidentitaet-entwickeln-leitfaden'} className="p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all">
              <span className="text-sm font-medium">Brand Identity Guide</span>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'de' ? 'Schritt für Schritt zur starken Markenidentität' : locale === 'ru' ? 'Пошаговое руководство по созданию сильного бренда' : 'Step by step to a strong brand identity'}
              </p>
            </NextLink>
            <NextLink href={locale === 'en' ? '/en/blog/customer-journey-mapping-guide' : '/blog/customer-journey-mapping-guide'} className="p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all">
              <span className="text-sm font-medium">Customer Journey Mapping</span>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'de' ? 'Touchpoints verstehen und optimieren' : locale === 'ru' ? 'Понимание и оптимизация точек контакта' : 'Understanding and optimizing touchpoints'}
              </p>
            </NextLink>
            <NextLink href={locale === 'en' ? '/en/blog/local-seo-austria-guide' : '/en/blog/local-seo-austria-guide'} className="p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all">
              <span className="text-sm font-medium">Local SEO Austria</span>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'de' ? 'Lokale Suchmaschinenoptimierung für österreichische Unternehmen' : locale === 'ru' ? 'Локальная SEO-оптимизация для австрийских компаний' : 'Local search optimization for Austrian businesses'}
              </p>
            </NextLink>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {newsletterTitle}
            </h2>
            <p className="text-muted-foreground mb-8">
              {newsletterDescription}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {newsletterButton}
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              {newsletterDisclaimer}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
