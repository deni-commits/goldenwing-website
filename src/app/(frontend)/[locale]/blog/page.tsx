import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.blog.title }
}

function formatDate(dateString: string, locale: string): string {
  const localeMap: Record<string, string> = { de: 'de-AT', en: 'en-US', ru: 'ru-RU' }
  return new Date(dateString).toLocaleDateString(localeMap[locale] || 'de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let posts: any[] = []

  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'posts',
      locale,
      limit: 12,
      sort: '-publishedDate',
      where: { _status: { equals: 'published' } },
    })
    posts = data.docs
  } catch {}

  return (
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
      </div>
    </section>
  )
}
