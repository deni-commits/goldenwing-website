import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.services.title }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let services: any[] = []

  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'services',
      locale,
      limit: 50,
      where: { parent: { exists: false } },
      sort: 'order',
    })
    services = data.docs
  } catch {
    // Tables may not exist yet
  }

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.services.title}</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">{t.services.subtitle}</p>

        {services.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service: any) => (
              <Link
                key={service.id as string}
                href={`/${locale}/services/${service.slug as string}`}
                className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50">
                  <span className="text-2xl text-gold-500">&#9733;</span>
                </div>
                <h2 className="mb-2 text-xl font-semibold group-hover:text-gold-600">
                  {service.title as string}
                </h2>
                {service.excerpt && (
                  <p className="text-muted">{service.excerpt as string}</p>
                )}
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
