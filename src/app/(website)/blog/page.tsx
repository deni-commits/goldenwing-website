import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Blog | GoldenWing Creative Studios',
  description: 'Insights, Tipps und Neuigkeiten rund um Web Development, SEO, Branding und Marketing.',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  const payload = await getPayload()

  const postsData = await payload.find({
    collection: 'posts',
    page: 1,
    limit: 12,
    sort: '-publishedDate',
    where: { _status: { equals: 'published' } },
  })

  const posts = postsData.docs
  const { totalPages, page: currentPage } = postsData

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">
          Insights und Tipps aus der Welt des digitalen Marketings.
        </p>

        {posts.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => {
                const category = post.category as any | null
                const featuredImage = post.featuredImage as any | null
                return (
                  <Link
                    key={post.id as string}
                    href={`/blog/${post.slug as string}`}
                    className="group flex flex-col rounded-xl border border-gray-100 transition hover:border-gold-200 hover:shadow-lg"
                  >
                    {/* Featured Image Placeholder */}
                    <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gray-100">
                      {featuredImage && (featuredImage.url as string) ? (
                        <img
                          src={featuredImage.url as string}
                          alt={(featuredImage.alt as string) || (post.title as string)}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-50 to-gold-100">
                          <span className="text-4xl text-gold-300">&#9733;</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3">
                        {category && (
                          <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                            {((category.title ?? category.name) as string) || ''}
                          </span>
                        )}
                        {post.publishedDate && (
                          <span className="text-xs text-muted">
                            {formatDate(post.publishedDate as string)}
                          </span>
                        )}
                      </div>
                      <h2 className="mb-2 text-xl font-semibold group-hover:text-gold-600">
                        {post.title as string}
                      </h2>
                      {post.excerpt && (
                        <p className="flex-1 line-clamp-3 text-muted">
                          {post.excerpt as string}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={pageNum === 1 ? '/blog' : `/blog?page=${pageNum}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition ${
                      pageNum === currentPage
                        ? 'border-gold-500 bg-gold-500 text-white'
                        : 'border-gray-200 hover:border-gold-300 hover:text-gold-600'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-muted">Noch keine Beitraege vorhanden.</p>
        )}
      </div>
    </section>
  )
}
