import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const caseStudy = data.docs[0] as Record<string, unknown> | undefined

  if (!caseStudy) {
    return { title: 'Referenz nicht gefunden' }
  }

  return {
    title: `${caseStudy.title as string} | GoldenWing Referenzen`,
    description: (caseStudy.excerpt as string) || `Case Study: ${caseStudy.client as string}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'case-studies',
    limit: 1000,
  })

  return data.docs.map((caseStudy: Record<string, unknown>) => ({
    slug: caseStudy.slug as string,
  }))
}

export default async function ReferenzDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const caseStudy = data.docs[0] as Record<string, unknown> | undefined

  if (!caseStudy) {
    notFound()
  }

  const industry = caseStudy.industry as string | null
  const metrics = caseStudy.results as Array<Record<string, unknown>> | null
  const testimonial = caseStudy.testimonial as Record<string, unknown> | null

  return (
    <>
      {/* Hero */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          {industry && (
            <span className="mb-4 inline-block rounded-full bg-gold-500/20 px-3 py-1 text-xs font-medium text-gold-400">
              {industry}
            </span>
          )}
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            {caseStudy.title as string}
          </h1>
          {caseStudy.client && (
            <p className="text-xl text-gold-400">{caseStudy.client as string}</p>
          )}
        </div>
      </section>

      {/* Cover Image */}
      {(() => {
        const coverImage = caseStudy.coverImage as Record<string, unknown> | null
        return coverImage && (coverImage.url as string) ? (
          <div className="px-4">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-xl">
              <img
                src={coverImage.url as string}
                alt={(coverImage.alt as string) || (caseStudy.title as string)}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        ) : null
      })()}

      {/* Challenge & Solution */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-16 md:grid-cols-2">
            {caseStudy.challenge && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Die Herausforderung</h2>
                <p className="leading-relaxed text-muted">
                  {caseStudy.challenge as string}
                </p>
              </div>
            )}
            {caseStudy.solution && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Unsere Loesung</h2>
                <p className="leading-relaxed text-muted">
                  {caseStudy.solution as string}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results / Metrics */}
      {metrics && metrics.length > 0 && (
        <section className="bg-dark px-4 py-24 text-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
              Erzielte Ergebnisse
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {metrics.map((metric, index) => (
                <div
                  key={(metric.id as string | undefined) ?? index}
                  className="rounded-xl border border-white/10 p-8 text-center"
                >
                  {metric.value && (
                    <p className="mb-2 text-4xl font-bold text-gold-400">
                      {metric.value as string}
                    </p>
                  )}
                  {metric.label && (
                    <p className="text-gray-300">{metric.label as string}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {testimonial && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xl leading-relaxed italic text-muted">
              &ldquo;{testimonial.quote as string}&rdquo;
            </p>
            <div>
              <p className="font-semibold">{testimonial.author as string}</p>
              {testimonial.role && (
                <p className="text-sm text-muted">{testimonial.role as string}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Back Link */}
      <div className="border-t border-gray-100 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2 font-medium text-gold-600 hover:text-gold-700"
          >
            &larr; Alle Referenzen
          </Link>
        </div>
      </div>
    </>
  )
}
