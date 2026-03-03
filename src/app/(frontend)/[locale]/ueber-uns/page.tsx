import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPageSeo } from '@/lib/seo'
import { MotionSection } from '@/components/ui/AnimatedSection'

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
        <section className="bg-foreground text-background px-4 py-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">{t.about.title}</h1>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <MotionSection>
              <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t.about.teamTitle}</h2>
              <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center">{t.about.teamSubtitle}</p>
            </MotionSection>
            <MotionSection as="div" stagger={0.1} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member: any) => {
                const photo = member.photo as any | null
                return (
                  <div
                    key={member.id as string}
                    className="border-border hover:border-primary/30 rounded-xl border p-6 transition hover:shadow-lg"
                  >
                    <div className="from-primary/20 to-primary/30 relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br">
                      {photo && (photo.url as string) ? (
                        <Image
                          src={photo.url as string}
                          alt={(photo.alt as string) || (member.name as string)}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-primary text-3xl">&#9786;</span>
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1 text-xl font-semibold">{member.name as string}</h3>
                    {member.role && <p className="text-primary mb-3 text-sm font-medium">{member.role as string}</p>}
                    {member.bio && <p className="text-muted-foreground leading-relaxed">{member.bio as string}</p>}
                  </div>
                )
              })}
            </MotionSection>
          </div>
        </section>
      )}

      <section className="bg-muted px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <MotionSection>
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t.about.valuesTitle}</h2>
            <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center">{t.about.valuesSubtitle}</p>
          </MotionSection>
          <MotionSection as="div" stagger={0.1} className="grid gap-8 md:grid-cols-3">
            {[
              { title: t.about.valueQuality, desc: t.about.valueQualityDesc },
              { title: t.about.valuePartnership, desc: t.about.valuePartnershipDesc },
              { title: t.about.valueInnovation, desc: t.about.valueInnovationDesc },
            ].map((value) => (
              <div key={value.title} className="border-border bg-card rounded-xl border p-6">
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </MotionSection>
        </div>
      </section>
    </>
  )
}
