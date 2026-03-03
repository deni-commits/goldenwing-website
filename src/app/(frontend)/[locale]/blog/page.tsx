import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getPageSeo } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'

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
      <StructuredData data={{
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
      }} />
    )}
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.blog.title}</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">{t.blog.subtitle}</p>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                key={post.id as string}
                href={`/${locale}/blog/${post.slug as string}`}
                className="group flex flex-col rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
              >
                <h2 className="mb-2 text-xl font-semibold group-hover:text-gold-600">
                  {post.title as string}
                </h2>
                {post.excerpt && (
                  <p className="mb-4 line-clamp-3 flex-1 text-muted">{post.excerpt as string}</p>
                )}
                <div className="mt-auto flex items-center gap-4 text-sm text-muted">
                  {post.publishedDate && <span>{formatDate(post.publishedDate as string, locale)}</span>}
                  {post.readingTime && (
                    <span>{t.common.readingTime.replace('{min}', String(post.readingTime))}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted">{t.common.noResults}</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
            {page > 1 && (
              <Link
                href={`/${locale}/blog${page === 2 ? '' : `?page=${page - 1}`}`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-gold-300 hover:text-gold-600"
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
                    ? 'bg-gold-500 text-white'
                    : 'border border-gray-200 hover:border-gold-300 hover:text-gold-600'
                }`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={`/${locale}/blog?page=${page + 1}`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-gold-300 hover:text-gold-600"
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
