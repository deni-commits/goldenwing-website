import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { RichText } from '@/components/ui/RichText'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/StructuredData'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const posts = await payload.find({ collection: 'posts', limit: 1000, where: { _status: { equals: 'published' } } })
    return posts.docs.map((p: any) => ({ slug: p.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'posts', locale, where: { slug: { equals: slug } }, limit: 1 })
    const post = data.docs[0] as any | undefined
    if (post) {
      return {
        title: post.title as string,
        description: (post.excerpt as string) || undefined,
      }
    }
  } catch {}
  return { title: slug }
}

function formatDate(dateString: string, locale: string): string {
  const localeMap: Record<string, string> = { de: 'de-AT', en: 'en-US', ru: 'ru-RU' }
  return new Date(dateString).toLocaleDateString(localeMap[locale] || 'de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = await getDictionary(locale as Locale)

  let post: any = null

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'posts', locale, where: { slug: { equals: slug } }, limit: 1 })
    post = data.docs[0] as any | undefined
  } catch {}

  if (!post) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'
  const postUrl = `${siteUrl}/${locale}/blog/${slug}`

  return (
    <>
      <ArticleSchema
        title={post.title as string}
        description={(post.excerpt as string) || undefined}
        publishedDate={(post.publishedDate as string) || new Date().toISOString()}
        url={postUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: `${siteUrl}/${locale}` },
          { name: t.nav.blog, url: `${siteUrl}/${locale}/blog` },
          { name: post.title as string, url: postUrl },
        ]}
      />
    <article className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-6 text-sm text-muted">
          <Link href={`/${locale}`} className="hover:text-gold-600">{t.nav.home}</Link>
          {' / '}
          <Link href={`/${locale}/blog`} className="hover:text-gold-600">{t.nav.blog}</Link>
          {' / '}
          <span className="text-dark">{post.title as string}</span>
        </nav>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title as string}</h1>

        <div className="mb-8 flex items-center gap-4 text-sm text-muted">
          {post.publishedDate && (
            <time>{formatDate(post.publishedDate as string, locale)}</time>
          )}
          {post.readingTime && (
            <span>{t.common.readingTime.replace('{min}', String(post.readingTime))}</span>
          )}
        </div>

        {post.content && (
          <div className="prose prose-lg max-w-none">
            <RichText content={post.content} />
          </div>
        )}
      </div>
    </article>
    </>
  )
}
