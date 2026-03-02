import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Services | GoldenWing Creative Studios',
  description: 'Web Development, SEO, Branding und Marketing — unsere Services fuer deinen Erfolg.',
}

export default async function ServicesPage() {
  let services: any[] = []

  try {
    const payload = await getPayload()
    const servicesData = await payload.find({ collection: 'services', limit: 20 })
    services = servicesData.docs
  } catch {
    // Tables may not exist yet on first build
  }

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Unsere Services</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">
          Von der Strategie bis zur Umsetzung — wir begleiten dich auf dem gesamten Weg.
        </p>

        {services.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service: any) => {
              const category = service.category as any | null
              return (
                <Link
                  key={service.id as string}
                  href={`/services/${service.slug as string}`}
                  className="group flex flex-col rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  {/* Icon Placeholder */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50">
                    <span className="text-2xl text-gold-500">&#9733;</span>
                  </div>

                  {category && (
                    <span className="mb-3 inline-block self-start rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                      {((category.title ?? category.name) as string) || ''}
                    </span>
                  )}

                  <h2 className="mb-2 text-xl font-semibold group-hover:text-gold-600">
                    {service.title as string}
                  </h2>

                  {service.excerpt && (
                    <p className="flex-1 text-muted">
                      {service.excerpt as string}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-600">
                    Mehr erfahren &rarr;
                  </span>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-muted">Noch keine Services vorhanden.</p>
        )}
      </div>
    </section>
  )
}
