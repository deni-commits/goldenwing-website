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
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const service = data.docs[0] as Record<string, unknown> | undefined

  if (!service) {
    return { title: 'Service nicht gefunden' }
  }

  return {
    title: `${service.title as string} | GoldenWing Services`,
    description: (service.excerpt as string) || '',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'services',
    limit: 1000,
  })

  return data.docs.map((service: Record<string, unknown>) => ({
    slug: service.slug as string,
  }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const [serviceData, relatedData] = await Promise.all([
    payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    }),
    payload.find({
      collection: 'services',
      limit: 3,
    }),
  ])

  const service = serviceData.docs[0] as Record<string, unknown> | undefined

  if (!service) {
    notFound()
  }

  const category = service.category as Record<string, unknown> | null
  const features = service.features as Array<Record<string, unknown>> | null
  const relatedServices = relatedData.docs.filter(
    (s: Record<string, unknown>) => s.id !== service.id,
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          {category && (
            <span className="mb-4 inline-block rounded-full bg-gold-500/20 px-3 py-1 text-xs font-medium text-gold-400">
              {((category.title ?? category.name) as string) || ''}
            </span>
          )}
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            {service.title as string}
          </h1>
          {service.excerpt && (
            <p className="max-w-2xl text-xl leading-relaxed text-gray-300">
              {service.excerpt as string}
            </p>
          )}
          <div className="mt-8">
            <Link
              href="/kontakt"
              className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              Projekt anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl">
          {service.content ? (
            <div className="prose prose-lg max-w-none">
              {/* TODO: Integrate Lexical/Payload rich text renderer */}
              <div
                data-lexical-content
                className="leading-relaxed text-gray-700"
              >
                <p className="text-muted italic">
                  [Inhalt wird geladen — Lexical Rich Text Renderer erforderlich]
                </p>
              </div>
            </div>
          ) : null}

          {/* Features List */}
          {features && features.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                Was du bekommst
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {features.map((feature, index) => (
                  <li
                    key={feature.id as string | undefined ?? index}
                    className="flex items-start gap-3 rounded-xl border border-gray-100 p-4"
                  >
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-100 text-xs text-gold-700">
                      &#10003;
                    </span>
                    <div>
                      {feature.title && (
                        <p className="font-semibold">{feature.title as string}</p>
                      )}
                      {feature.description && (
                        <p className="text-sm text-muted">{feature.description as string}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bg-gray-50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">
              Weitere Services
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedServices.map((related: Record<string, unknown>) => (
                <Link
                  key={related.id as string}
                  href={`/services/${related.slug as string}`}
                  className="group rounded-xl border border-gray-100 bg-white p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50">
                    <span className="text-gold-500">&#9733;</span>
                  </div>
                  <h3 className="mb-2 font-semibold group-hover:text-gold-600">
                    {related.title as string}
                  </h3>
                  {related.excerpt && (
                    <p className="text-sm text-muted line-clamp-2">
                      {related.excerpt as string}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Bereit loszulegen?
          </h2>
          <p className="mb-8 text-gray-300">
            Kontaktiere uns fuer ein kostenloses Erstgespraech.
          </p>
          <Link
            href="/kontakt"
            className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            Jetzt anfragen
          </Link>
        </div>
      </section>
    </>
  )
}
