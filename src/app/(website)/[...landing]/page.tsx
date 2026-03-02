import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

type Props = {
  params: Promise<{ landing: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { landing } = await params
  const slug = landing.join('/')
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'landing-pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = data.docs[0] as Record<string, unknown> | undefined

  if (!page) {
    return { title: 'Seite nicht gefunden' }
  }

  const seo = page.seo as Record<string, unknown> | null

  return {
    title: (seo?.title as string) || (page.title as string) || 'GoldenWing Creative Studios',
    description: (seo?.description as string) || (page.excerpt as string) || '',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'landing-pages',
    limit: 1000,
  })

  return data.docs.map((page: Record<string, unknown>) => ({
    landing: (page.slug as string).split('/'),
  }))
}

export default async function LandingPage({ params }: Props) {
  const { landing } = await params
  const slug = landing.join('/')
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'landing-pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = data.docs[0] as Record<string, unknown> | undefined

  if (!page) {
    notFound()
  }

  const layout = page.layout as Array<Record<string, unknown>> | null

  return (
    <main>
      <RenderBlocks blocks={layout} />
    </main>
  )
}
