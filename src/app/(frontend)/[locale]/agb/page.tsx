import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPageSeo } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    de: 'Allgemeine Geschaeftsbedingungen',
    en: 'Terms and Conditions',
    ru: 'Условия и положения',
  }
  return {
    title: titles[locale] || titles.de,
    description: 'Allgemeine Geschaeftsbedingungen (AGB) von GoldenWing Creative Studios.',
    ...getPageSeo('agb', locale),
  }
}

export default async function AGBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  const titles: Record<string, string> = {
    de: 'Allgemeine Geschaeftsbedingungen',
    en: 'Terms and Conditions',
    ru: 'Условия и положения',
  }

  let layout: any[] | null = null
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'pages', locale, where: { slug: { equals: 'agb' } }, limit: 1 })
    const page = data.docs[0] as any | undefined
    layout = page?.layout as any[] | null
  } catch {}

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">{titles[locale] || titles.de}</h1>
        {layout && layout.length > 0 ? (
          <RenderBlocks blocks={layout} />
        ) : (
          <p className="text-muted">
            {locale === 'de' ? 'Die AGB werden in Kuerze ergaenzt.' : locale === 'ru' ? 'Условия будут добавлены в ближайшее время.' : 'Terms and conditions coming soon.'}
          </p>
        )}
      </div>
    </section>
  )
}
