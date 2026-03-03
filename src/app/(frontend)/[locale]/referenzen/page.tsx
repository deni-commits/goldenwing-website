import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getPageSeo } from '@/lib/seo'
import { BreadcrumbSchema, StructuredData } from '@/components/seo/StructuredData'
import { MotionSection } from '@/components/ui/AnimatedSection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.referenzen.title, description: t.referenzen.metaDescription, ...getPageSeo('referenzen', locale) }
}

export default async function ReferenzenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  let caseStudies: any[] = []

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'case-studies', locale, limit: 20, sort: '-publishedDate' })
    caseStudies = data.docs
  } catch {}

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: `${siteUrl}/${locale}` },
          { name: t.referenzen.title, url: `${siteUrl}/${locale}/referenzen` },
        ]}
      />
      {caseStudies.length > 0 && (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: t.referenzen.title,
            description: t.referenzen.subtitle,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: caseStudies.map((cs: any, i: number) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'CreativeWork',
                  name: cs.title as string,
                  url: `${siteUrl}/${locale}/referenzen/${cs.slug as string}`,
                },
              })),
            },
          }}
        />
      )}

      {/* Header */}
      <section className="bg-foreground text-background px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <MotionSection>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.referenzen.title}</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">{t.referenzen.subtitle}</p>
          </MotionSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          {caseStudies.length > 0 ? (
            <MotionSection as="div" stagger={0.08} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs: any) => {
                const coverImage = cs.coverImage as any | null
                return (
                  <Link
                    key={cs.id as string}
                    href={`/${locale}/referenzen/${cs.slug as string}`}
                    className="group border-border hover:border-primary/30 flex flex-col rounded-xl border transition hover:shadow-lg"
                  >
                    <div className="from-primary/10 to-primary/20 relative aspect-video w-full overflow-hidden rounded-t-xl bg-gradient-to-br">
                      {coverImage && (coverImage.url as string) ? (
                        <Image
                          src={coverImage.url as string}
                          alt={(coverImage.alt as string) || (cs.title as string)}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-primary/60 text-5xl">&#9670;</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {cs.industry && (
                        <span className="bg-primary/10 text-primary mb-3 inline-block self-start rounded-full px-3 py-1 text-xs font-medium">
                          {cs.industry as string}
                        </span>
                      )}
                      <h2 className="group-hover:text-primary mb-1 text-xl font-semibold">{cs.title as string}</h2>
                      {cs.client && <p className="text-muted-foreground mb-4 text-sm">{cs.client as string}</p>}
                      {cs.results && (cs.results as any[]).length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-3 pt-4">
                          {(cs.results as any[]).slice(0, 3).map((r: any, i: number) => (
                            <div key={i} className="bg-muted rounded-lg px-3 py-1.5">
                              <span className="text-primary font-bold">{r.value}</span>{' '}
                              <span className="text-muted-foreground text-xs">{r.metric}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </MotionSection>
          ) : (
            <p className="text-muted-foreground text-center">{t.referenzen.emptyState}</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background px-4 py-16">
        <MotionSection className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">{t.referenzen.ctaHeading}</h2>
          <Link
            href={`/${locale}/kontakt`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-block rounded-lg px-8 py-3 font-semibold transition"
          >
            {t.referenzen.ctaButton}
          </Link>
        </MotionSection>
      </section>
    </>
  )
}
