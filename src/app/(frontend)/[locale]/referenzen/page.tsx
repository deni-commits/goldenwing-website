import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.referenzen.title }
}

export default async function ReferenzenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let caseStudies: any[] = []

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'case-studies', locale, limit: 20, sort: '-publishedDate' })
    caseStudies = data.docs
  } catch {}

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.referenzen.title}</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">{t.referenzen.subtitle}</p>

        {caseStudies.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs: any) => (
              <Link
                key={cs.id as string}
                href={`/${locale}/referenzen/${cs.slug as string}`}
                className="group flex flex-col rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
              >
                <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-gold-50 to-gold-100">
                  {(() => {
                    const coverImage = cs.coverImage as any | null
                    return coverImage && (coverImage.url as string) ? (
                      <img
                        src={coverImage.url as string}
                        alt={(coverImage.alt as string) || (cs.title as string)}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-5xl text-gold-300">&#9670;</span>
                      </div>
                    )
                  })()}
                </div>
                {cs.industry && (
                  <span className="mb-3 inline-block self-start rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                    {cs.industry as string}
                  </span>
                )}
                <h2 className="mb-1 text-xl font-semibold group-hover:text-gold-600">{cs.title as string}</h2>
                {cs.client && <p className="text-sm text-muted">{cs.client as string}</p>}
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
