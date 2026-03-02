import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'

type Props = {
  params: Promise<{ slug: string }>
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const postsData = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = postsData.docs[0] as any | undefined

  if (!post) {
    return { title: 'Beitrag nicht gefunden' }
  }

  return {
    title: `${post.title as string} | GoldenWing Blog`,
    description: (post.excerpt as string) || '',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload()

  const postsData = await payload.find({
    collection: 'posts',
    limit: 1000,
    where: { _status: { equals: 'published' } },
  })

  return postsData.docs.map((post: any) => ({
    slug: post.slug as string,
  }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const postsData = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = postsData.docs[0] as any | undefined

  if (!post) {
    notFound()
  }

  const category = post.category as any | null

  return (
    <article className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {category && (
              <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                {((category.title ?? category.name) as string) || ''}
              </span>
            )}
            {post.publishedDate && (
              <span className="text-sm text-muted">
                {formatDate(post.publishedDate as string)}
              </span>
            )}
            {post.readingTime && (
              <span className="text-sm text-muted">
                {post.readingTime as number} Min. Lesezeit
              </span>
            )}
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            {post.title as string}
          </h1>

          {post.excerpt && (
            <p className="text-xl leading-relaxed text-muted">
              {post.excerpt as string}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {(() => {
          const featuredImage = post.featuredImage as any | null
          return featuredImage && (featuredImage.url as string) ? (
            <div className="mb-12 overflow-hidden rounded-xl">
              <img
                src={featuredImage.url as string}
                alt={(featuredImage.alt as string) || (post.title as string)}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null
        })()}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Rich text rendering placeholder — Lexical content requires a dedicated renderer */}
          {post.content ? (
            <div
              data-lexical-content
              className="leading-relaxed text-gray-700"
            >
              {/* TODO: Integrate Lexical/Payload rich text renderer */}
              <p className="text-muted italic">
                [Inhalt wird geladen — Lexical Rich Text Renderer erforderlich]
              </p>
            </div>
          ) : (
            <p className="text-muted">Kein Inhalt vorhanden.</p>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-16 border-t border-gray-100 pt-8">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-gold-600 hover:text-gold-700"
          >
            &larr; Zurueck zum Blog
          </a>
        </div>
      </div>
    </article>
  )
}
