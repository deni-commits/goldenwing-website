import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Referenzen | GoldenWing Creative Studios',
  description: 'Unsere Projekte und Case Studies — erfolgreiche Zusammenarbeit mit Unternehmen aus verschiedenen Branchen.',
}

export default async function ReferenzenPage() {
  const payload = await getPayload()

  const caseStudiesData = await payload.find({
    collection: 'case-studies',
    limit: 20,
    sort: '-publishedDate',
  })

  const caseStudies = caseStudiesData.docs

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Referenzen</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">
          Erfahre, wie wir unseren Kunden geholfen haben, ihre Ziele zu erreichen.
        </p>

        {caseStudies.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy: Record<string, unknown>) => {
              const industry = caseStudy.industry as string | null
              return (
                <Link
                  key={caseStudy.id as string}
                  href={`/referenzen/${caseStudy.slug as string}`}
                  className="group flex flex-col rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  {/* Image Placeholder */}
                  <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-gold-50 to-gold-100">
                    {(() => {
                      const coverImage = caseStudy.coverImage as Record<string, unknown> | null
                      return coverImage && (coverImage.url as string) ? (
                        <img
                          src={coverImage.url as string}
                          alt={(coverImage.alt as string) || (caseStudy.title as string)}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-5xl text-gold-300">&#9670;</span>
                        </div>
                      )
                    })()}
                  </div>

                  {industry && (
                    <span className="mb-3 inline-block self-start rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                      {industry}
                    </span>
                  )}

                  <h2 className="mb-1 text-xl font-semibold group-hover:text-gold-600">
                    {caseStudy.title as string}
                  </h2>

                  {caseStudy.client && (
                    <p className="text-sm text-muted">
                      {caseStudy.client as string}
                    </p>
                  )}
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-muted">Noch keine Referenzen vorhanden.</p>
        )}
      </div>
    </section>
  )
}
