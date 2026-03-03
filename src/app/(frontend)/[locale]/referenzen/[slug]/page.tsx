import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { RichText } from '@/components/ui/RichText'
import { BreadcrumbSchema, StructuredData } from '@/components/seo/StructuredData'
import { getPageSeo } from '@/lib/seo'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'case-studies', limit: 100 })
    return data.docs.map((cs: any) => ({ slug: cs.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'case-studies', locale, where: { slug: { equals: slug } }, limit: 1 })
    const cs = data.docs[0] as any | undefined
    if (cs) return {
      title: cs.title as string,
      description: (cs.client ? `${cs.title} — ${cs.client}` : cs.title) as string,
      ...getPageSeo(`referenzen/${slug}`, locale),
    }
  } catch {}
  return { title: slug }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = await getDictionary(locale as Locale)

  let caseStudy: any = null

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'case-studies', locale, where: { slug: { equals: slug } }, limit: 1, depth: 2 })
    caseStudy = data.docs[0] as any | undefined
  } catch {}

  if (!caseStudy) notFound()

  const results = (caseStudy.results as any[] | null) || []
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'
  const pageUrl = `${siteUrl}/${locale}/referenzen/${slug}`

  return (
    <>
    <BreadcrumbSchema
      items={[
        { name: t.nav.home, url: `${siteUrl}/${locale}` },
        { name: t.nav.referenzen, url: `${siteUrl}/${locale}/referenzen` },
        { name: caseStudy.title as string, url: pageUrl },
      ]}
    />
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: caseStudy.title as string,
      ...(caseStudy.client ? { about: { '@type': 'Organization', name: caseStudy.client as string } } : {}),
      url: pageUrl,
      creator: { '@type': 'Organization', name: 'GoldenWing Creative Studios', url: 'https://goldenwing.at' },
    }} />
    <article className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 text-sm text-muted">
          <Link href={`/${locale}`} className="hover:text-gold-600">{t.nav.home}</Link>
          {' / '}
          <Link href={`/${locale}/referenzen`} className="hover:text-gold-600">{t.nav.referenzen}</Link>
          {' / '}
          <span className="text-dark">{caseStudy.title as string}</span>
        </nav>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{caseStudy.title as string}</h1>
        {caseStudy.client && <p className="mb-8 text-lg text-muted">{caseStudy.client as string}</p>}

        {/* Results Metrics */}
        {results.length > 0 && (
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {results.map((r: any, i: number) => (
              <div key={i} className="rounded-xl border border-gold-100 bg-gold-50 p-6 text-center">
                <p className="text-3xl font-bold text-gold-600">{r.value as string}</p>
                <p className="mt-1 text-sm font-medium">{r.metric as string}</p>
              </div>
            ))}
          </div>
        )}

        {/* Challenge */}
        {caseStudy.challenge && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">{t.referenzen.challenge}</h2>
            <div className="prose max-w-none"><RichText content={caseStudy.challenge} /></div>
          </section>
        )}

        {/* Solution */}
        {caseStudy.solution && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">{t.referenzen.solution}</h2>
            <div className="prose max-w-none"><RichText content={caseStudy.solution} /></div>
          </section>
        )}
      </div>
    </article>
    </>
  )
}
