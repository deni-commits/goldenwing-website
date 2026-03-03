import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.nav.impressum, description: 'Impressum und rechtliche Angaben von GoldenWing Creative Studios, Wien.', alternates: getAlternates('impressum', locale) }
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let layout: any[] | null = null
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'pages', locale, where: { slug: { equals: 'impressum' } }, limit: 1 })
    const page = data.docs[0] as any | undefined
    layout = page?.layout as any[] | null
  } catch {}

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">{t.nav.impressum}</h1>
        {layout && layout.length > 0 ? (
          <RenderBlocks blocks={layout} />
        ) : (
          <p className="text-muted">{locale === 'de' ? 'Impressum wird in Kuerze ergaenzt.' : 'Legal notice coming soon.'}</p>
        )}
      </div>
    </section>
  )
}
