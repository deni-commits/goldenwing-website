import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getPageSeo } from '@/lib/seo'
import { BreadcrumbSchema, StructuredData } from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  const descriptions: Record<string, string> = {
    de: 'Unsere Referenzen und Erfolgsgeschichten — ausgewaehlte Projekte aus Webdesign, SEO und Branding.',
    en: 'Our references and success stories — selected projects in web design, SEO and branding.',
    ru: 'Наши кейсы и истории успеха — избранные проекты в веб-дизайне, SEO и брендинге.',
  }
  return { title: t.referenzen.title, description: descriptions[locale] || descriptions.de, ...getPageSeo('referenzen', locale) }
}

// Fallback data from real projects (shown when CMS is empty)
const fallbackProjects = [
  { slug: 'domoferm', title: 'Domoferm - B2B Digitalstrategie', client: 'Domoferm', category: 'Strategie', results: [{ value: '+180%', label: 'Qualifizierte Leads' }, { value: '+95%', label: 'Organischer Traffic' }] },
  { slug: 'point-of-new', title: 'Point of New - Marken-Relaunch', client: 'Point of New', category: 'Branding', results: [{ value: '+85%', label: 'Brand Awareness' }, { value: '+120%', label: 'Social Engagement' }] },
  { slug: 'lamberg', title: 'LAMBERG - E-Commerce Erfolgsgeschichte', client: 'LAMBERG', category: 'Software', results: [{ value: '+300%', label: 'Online-Umsatz' }, { value: '3.2%', label: 'Conversion Rate' }] },
  { slug: 'simax', title: 'SiMAX - Technologie fuer Inklusion', client: 'SiMAX', category: 'Software', results: [{ value: '15+', label: 'App-Integrationen' }, { value: '50K+', label: 'Endnutzer' }] },
  { slug: 'atta-pallet', title: 'Atta Pallet - Digitale Marktpraesenz', client: 'Atta Pallet', category: 'Webdesign', results: [{ value: '+250%', label: 'Website-Anfragen' }, { value: 'Top 3', label: 'Google Rankings' }] },
  { slug: 'glaeser-law', title: 'Glaeser Law - Juristische Sichtbarkeit', client: 'Glaeser Law', category: 'SEO', results: [{ value: '+300%', label: 'Organischer Traffic' }, { value: 'Top 5', label: 'Kern-Keywords' }] },
]

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

  const hasCMS = caseStudies.length > 0

  return (
    <>
      <BreadcrumbSchema items={[
        { name: locale === 'de' ? 'Startseite' : 'Home', url: `${siteUrl}/${locale}` },
        { name: t.referenzen.title, url: `${siteUrl}/${locale}/referenzen` },
      ]} />
      {hasCMS && (
        <StructuredData data={{
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
        }} />
      )}

      {/* Header */}
      <section className="bg-dark px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.referenzen.title}</h1>
          <p className="max-w-2xl text-lg text-gray-300">{t.referenzen.subtitle}</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          {hasCMS ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs: any) => {
                const coverImage = cs.coverImage as any | null
                return (
                  <Link
                    key={cs.id as string}
                    href={`/${locale}/referenzen/${cs.slug as string}`}
                    className="group flex flex-col rounded-xl border border-gray-100 transition hover:border-gold-200 hover:shadow-lg"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-gold-50 to-gold-100">
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
                          <span className="text-5xl text-gold-300">&#9670;</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {cs.industry && (
                        <span className="mb-3 inline-block self-start rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                          {cs.industry as string}
                        </span>
                      )}
                      <h2 className="mb-1 text-xl font-semibold group-hover:text-gold-600">{cs.title as string}</h2>
                      {cs.client && <p className="mb-4 text-sm text-muted">{cs.client as string}</p>}
                      {cs.results && (cs.results as any[]).length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-3 pt-4">
                          {(cs.results as any[]).slice(0, 3).map((r: any, i: number) => (
                            <div key={i} className="rounded-lg bg-gray-50 px-3 py-1.5">
                              <span className="font-bold text-gold-600">{r.value}</span>{' '}
                              <span className="text-xs text-muted">{r.metric}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            /* Fallback: Show real project data even without CMS */
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {fallbackProjects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col rounded-xl border border-gray-100 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-gold-50 to-gold-100">
                    <span className="text-5xl text-gold-300">&#9670;</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-3 inline-block self-start rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                      {project.category}
                    </span>
                    <h2 className="mb-1 text-xl font-semibold">{project.title}</h2>
                    <p className="mb-4 text-sm text-muted">{project.client}</p>
                    <div className="mt-auto flex flex-wrap gap-3 pt-4">
                      {project.results.map((r, i) => (
                        <div key={i} className="rounded-lg bg-gray-50 px-3 py-1.5">
                          <span className="font-bold text-gold-600">{r.value}</span>{' '}
                          <span className="text-xs text-muted">{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            {locale === 'de' ? 'Ihr Projekt koennte das naechste sein' : locale === 'ru' ? 'Ваш проект может быть следующим' : 'Your project could be next'}
          </h2>
          <Link
            href={`/${locale}/kontakt`}
            className="mt-4 inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            {locale === 'de' ? 'Projekt besprechen' : locale === 'ru' ? 'Обсудить проект' : 'Discuss Your Project'}
          </Link>
        </div>
      </section>
    </>
  )
}
