import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/StructuredData'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const services = await payload.find({ collection: 'services', limit: 100, where: { parent: { exists: false } } })
    return services.docs.map((s: any) => ({ slug: s.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'services', locale, where: { slug: { equals: slug } }, limit: 1 })
    const service = data.docs[0] as any | undefined
    if (service) return { title: service.title as string }
  } catch {}
  return { title: slug }
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = await getDictionary(locale as Locale)

  let service: any = null
  let subServices: any[] = []

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'services', locale, where: { slug: { equals: slug } }, limit: 1 })
    service = data.docs[0] as any | undefined

    if (service) {
      const subData = await payload.find({ collection: 'services', locale, where: { parent: { equals: service.id } }, sort: 'order', limit: 50 })
      subServices = subData.docs
    }
  } catch {}

  if (!service) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  return (
    <>
      <ServiceSchema
        name={service.title as string}
        description={(service.excerpt as string) || undefined}
        url={`${siteUrl}/${locale}/services/${slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: `${siteUrl}/${locale}` },
          { name: t.nav.services, url: `${siteUrl}/${locale}/services` },
          { name: service.title as string, url: `${siteUrl}/${locale}/services/${slug}` },
        ]}
      />
      {/* Service Header */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 text-sm text-gray-400">
            <Link href={`/${locale}`} className="hover:text-gold-400">{t.nav.home}</Link>
            {' / '}
            <Link href={`/${locale}/services`} className="hover:text-gold-400">{t.nav.services}</Link>
            {' / '}
            <span className="text-white">{service.title as string}</span>
          </nav>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{service.title as string}</h1>
          {service.excerpt && (
            <p className="max-w-2xl text-xl leading-relaxed text-gray-300">{service.excerpt as string}</p>
          )}
        </div>
      </section>

      {/* Sub-Services Grid */}
      {subServices.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-2xl font-bold">{t.services.subServices}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subServices.map((sub: any) => (
                <Link
                  key={sub.id as string}
                  href={`/${locale}/services/${slug}/${sub.slug as string}`}
                  className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-gold-600">{sub.title as string}</h3>
                  {sub.excerpt && <p className="text-sm text-muted">{sub.excerpt as string}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {service.features && (service.features as any[]).length > 0 && (
        <section className={`px-4 py-24 ${subServices.length > 0 ? 'bg-gray-50' : ''}`}>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(service.features as any[]).map((feature: any, i: number) => (
                <div key={i} className="rounded-xl border border-gray-100 bg-white p-6">
                  <h3 className="mb-2 text-lg font-semibold">{feature.title as string}</h3>
                  {feature.description && <p className="text-muted">{feature.description as string}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">{t.home.ctaTitle}</h2>
          <Link
            href={`/${locale}/kontakt`}
            className="mt-6 inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            {t.home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
