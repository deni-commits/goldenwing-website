import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'landing-pages', limit: 100 })
    return data.docs.map((lp: any) => ({ slug: [(lp.slug as string)] }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const pageSlug = slug.join('/')
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'landing-pages', locale, where: { slug: { equals: pageSlug } }, limit: 1 })
    const page = data.docs[0] as any | undefined
    if (page) return { title: page.title as string }
  } catch {}
  return { title: pageSlug }
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params
  const pageSlug = slug.join('/')

  let page: any = null

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'landing-pages', locale, where: { slug: { equals: pageSlug } }, limit: 1 })
    page = data.docs[0] as any | undefined
  } catch {}

  if (!page) notFound()

  const layout = (page.layout as any[] | null) || []

  return (
    <>
      {layout.length > 0 ? (
        <RenderBlocks blocks={layout} />
      ) : (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold">{page.title as string}</h1>
          </div>
        </section>
      )}
    </>
  )
}
