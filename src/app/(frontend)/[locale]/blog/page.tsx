import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getPageSeo } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { MotionSection } from '@/components/ui/AnimatedSection'

const POSTS_PER_PAGE = 9

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.blog.title, description: t.blog.metaDescription, ...getPageSeo('blog', locale) }
}

function formatDate(dateString: string, locale: string): string {
  const localeMap: Record<string, string> = { de: 'de-AT', en: 'en-US', ru: 'ru-RU' }
  return new Date(dateString).toLocaleDateString(localeMap[locale] || 'de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getDictionary(locale as Locale)
  const page = Math.max(1, Number(sp.page) || 1)

  let posts: any[] = []
  let totalPages = 1

  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'posts',
      locale,
      limit: POSTS_PER_PAGE,
      page,
      sort: '-publishedDate',
      where: { _status: { equals: 'published' } },
    })
    posts = data.docs
    totalPages = data.totalPages
  } catch {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  return (
    <>
      {posts.length > 0 && (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: t.blog.title,
            url: `${siteUrl}/${locale}/blog`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: posts.map((post: any, i: number) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${siteUrl}/${locale}/blog/${post.slug as string}`,
              })),
            },
          }}
        />
      )}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <MotionSection>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.blog.title}</h1>
            <p className="text-muted-foreground mb-16 max-w-2xl text-lg">{t.blog.subtitle}</p>
          </MotionSection>

          {posts.length > 0 ? (
            <MotionSection as="div" stagger={0.08} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => (
                <Link
                  key={post.id as string}
                  href={`/${locale}/blog/${post.slug as string}`}
                  className="group border-border hover:border-primary/30 flex flex-col rounded-xl border p-6 transition hover:shadow-lg"
                >
                  <h2 className="group-hover:text-primary mb-2 text-xl font-semibold">{post.title as string}</h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt as string}</p>
                  )}
                  <div className="text-muted-foreground mt-auto flex items-center gap-4 text-sm">
                    {post.publishedDate && <span>{formatDate(post.publishedDate as string, locale)}</span>}
                    {post.readingTime && <span>{t.common.readingTime.replace('{min}', String(post.readingTime))}</span>}
                  </div>
                </Link>
              ))}
            </MotionSection>
          ) : (
            <p className="text-muted-foreground">{t.common.noResults}</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
              {page > 1 && (
                <Link
                  href={`/${locale}/blog${page === 2 ? '' : `?page=${page - 1}`}`}
                  className="border-border hover:border-primary/40 hover:text-primary rounded-lg border px-4 py-2 text-sm font-medium transition"
                >
                  &larr;
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/${locale}/blog${p === 1 ? '' : `?page=${p}`}`}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    p === page
                      ? 'bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/40 hover:text-primary border'
                  }`}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link
                  href={`/${locale}/blog?page=${page + 1}`}
                  className="border-border hover:border-primary/40 hover:text-primary rounded-lg border px-4 py-2 text-sm font-medium transition"
                >
                  &rarr;
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
