import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getPageSeo } from '@/lib/seo'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const subServices = await payload.find({ collection: 'services', limit: 200, where: { parent: { exists: true } }, depth: 1 })
    return subServices.docs.map((s: any) => {
      const parent = s.parent as any
      return { slug: (parent?.slug || 'unknown') as string, subSlug: s.slug as string }
    })
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string; subSlug: string }> }): Promise<Metadata> {
  const { locale, slug, subSlug } = await params
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'services', locale, where: { slug: { equals: subSlug } }, limit: 1 })
    const service = data.docs[0] as any | undefined
    if (service) return { title: service.title as string, ...getPageSeo(`services/${slug}/${subSlug}`, locale) }
  } catch {}
  return { title: subSlug }
}

export default async function SubServicePage({ params }: { params: Promise<{ locale: string; slug: string; subSlug: string }> }) {
  const { locale, slug, subSlug } = await params
  const t = await getDictionary(locale as Locale)

  let service: any = null
  let parentService: any = null

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'services', locale, where: { slug: { equals: subSlug } }, limit: 1, depth: 1 })
    service = data.docs[0] as any | undefined
    if (service?.parent) {
      parentService = service.parent as any
    }
  } catch {}

  if (!service) notFound()

  return (
    <>
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 text-sm text-gray-400">
            <Link href={`/${locale}`} className="hover:text-gold-400">{t.nav.home}</Link>
            {' / '}
            <Link href={`/${locale}/services`} className="hover:text-gold-400">{t.nav.services}</Link>
            {' / '}
            {parentService && (
              <>
                <Link href={`/${locale}/services/${slug}`} className="hover:text-gold-400">{parentService.title as string}</Link>
                {' / '}
              </>
            )}
            <span className="text-white">{service.title as string}</span>
          </nav>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{service.title as string}</h1>
          {service.excerpt && (
            <p className="max-w-2xl text-xl leading-relaxed text-gray-300">{service.excerpt as string}</p>
          )}
        </div>
      </section>

      {/* Features */}
      {service.features && (service.features as any[]).length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(service.features as any[]).map((feature: any, i: number) => (
                <div key={i} className="rounded-xl border border-gray-100 p-6">
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
