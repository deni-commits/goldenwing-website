import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPageSeo } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.about.title, description: t.about.metaDescription, ...getPageSeo('ueber-uns', locale) }
}

export default async function UeberUnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let team: any[] = []
  let layout: any[] | null = null

  try {
    const payload = await getPayload()
    const [teamData, pageData] = await Promise.all([
      payload.find({ collection: 'team', locale, sort: 'sortOrder', limit: 20 }),
      payload.find({ collection: 'pages', locale, where: { slug: { equals: 'ueber-uns' } }, limit: 1 }),
    ])
    team = teamData.docs
    const page = pageData.docs[0] as any | undefined
    layout = page?.layout as any[] | null
  } catch {}

  return (
    <>
      {layout && layout.length > 0 ? (
        <RenderBlocks blocks={layout} t={t} />
      ) : (
        <section className="bg-dark px-4 py-24 text-white">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">{t.about.title}</h1>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t.about.teamTitle}</h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">{t.about.teamSubtitle}</p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member: any) => {
                const photo = member.photo as any | null
                return (
                  <div key={member.id as string} className="rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg">
                    <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-gold-100 to-gold-200">
                      {photo && (photo.url as string) ? (
                        <Image src={photo.url as string} alt={(photo.alt as string) || (member.name as string)} fill className="object-cover" sizes="96px" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-3xl text-gold-400">&#9786;</span>
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1 text-xl font-semibold">{member.name as string}</h3>
                    {member.role && <p className="mb-3 text-sm font-medium text-gold-600">{member.role as string}</p>}
                    {member.bio && <p className="text-muted leading-relaxed">{member.bio as string}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t.about.valuesTitle}</h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">{t.about.valuesSubtitle}</p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: t.about.valueQuality, desc: t.about.valueQualityDesc },
              { title: t.about.valuePartnership, desc: t.about.valuePartnershipDesc },
              { title: t.about.valueInnovation, desc: t.about.valueInnovationDesc },
            ].map((value) => (
              <div key={value.title} className="rounded-xl border border-gray-100 bg-white p-6">
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
