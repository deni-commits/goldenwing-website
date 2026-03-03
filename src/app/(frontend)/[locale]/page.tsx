import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { OrganizationSchema } from '@/components/seo/StructuredData'
import { getPageSeo } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { description: t.home.metaDescription, ...getPageSeo('', locale) }
}

function formatDate(dateString: string, locale: string): string {
  const localeMap: Record<string, string> = { de: 'de-AT', en: 'en-US', ru: 'ru-RU' }
  return new Date(dateString).toLocaleDateString(localeMap[locale] || 'de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let posts: any[] = []
  let services: any[] = []
  let testimonials: any[] = []
  let caseStudies: any[] = []
  let homepage: any = null

  try {
    const payload = await getPayload()
    const [postsData, servicesData, testimonialsData, caseStudiesData, homepageData] = await Promise.all([
      payload.find({ collection: 'posts', locale, limit: 3, sort: '-publishedDate', where: { _status: { equals: 'published' } } }),
      payload.find({ collection: 'services', locale, limit: 10, where: { parent: { exists: false } }, sort: 'order' }),
      payload.find({ collection: 'testimonials', locale, limit: 6 }),
      payload.find({ collection: 'case-studies', locale, limit: 4, sort: '-publishedDate' }),
      payload.findGlobal({ slug: 'homepage', locale }),
    ])
    posts = postsData.docs
    services = servicesData.docs
    testimonials = testimonialsData.docs
    caseStudies = caseStudiesData.docs
    homepage = homepageData
  } catch {
    // Tables may not exist yet on first build
  }

  // CMS values with dictionary fallback
  const hero = homepage?.hero as any | undefined
  const heroBadge = hero?.badge || t.home.heroBadge
  const heroLine1 = hero?.line1 || t.home.heroLine1
  const heroHighlight = hero?.highlight || t.home.heroHighlight
  const heroLine2 = hero?.line2 || t.home.heroLine2
  const heroSub = hero?.subline || t.home.heroSub
  const heroCtaPrimaryLabel = hero?.ctaPrimaryLabel || t.home.heroCtaPrimary
  const heroCtaPrimaryLink = hero?.ctaPrimaryLink || `/${locale}/kontakt`
  const heroCtaSecondaryLabel = hero?.ctaSecondaryLabel || t.home.heroCtaSecondary
  const heroCtaSecondaryLink = hero?.ctaSecondaryLink || `/${locale}/referenzen`

  const cmsStats = homepage?.stats as any[] | undefined
  const cmsProcess = homepage?.process as any | undefined
  const cmsCta = homepage?.cta as any | undefined

  return (
    <>
      <OrganizationSchema />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-dark px-4 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-sm text-gold-400">
            {heroBadge}
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            {heroLine1}{' '}
            <span className="text-gold-400">{heroHighlight}</span>{' '}
            {heroLine2}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
            {heroSub}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={heroCtaPrimaryLink}
              className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              {heroCtaPrimaryLabel}
            </Link>
            <Link
              href={heroCtaSecondaryLink}
              className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {heroCtaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar — only shown when CMS has stats */}
      {cmsStats && cmsStats.length > 0 && (
        <section className="bg-dark-light px-4 py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
            {cmsStats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-gold-400 md:text-4xl">{stat.value as string}</p>
                <p className="mt-1 text-sm text-gray-400">{stat.label as string}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.home.servicesHeading}
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">{t.services.subtitle}</p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any) => (
                <Link
                  key={service.id as string}
                  href={`/${locale}/leistungen/${service.slug as string}`}
                  className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 transition group-hover:bg-gold-100">
                    <span className="text-2xl text-gold-500">&#9733;</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-gold-600">{service.title as string}</h3>
                  {service.excerpt && <p className="line-clamp-2 text-muted">{service.excerpt as string}</p>}
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/leistungen`}
                className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
              >
                {t.home.allServices}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Process Section — only shown when CMS has process steps */}
      {cmsProcess?.steps && (cmsProcess.steps as any[]).length > 0 && (
        <section className="bg-gray-50 px-4 py-24">
          <div className="mx-auto max-w-5xl">
            {cmsProcess.heading && (
              <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
                {cmsProcess.heading as string}
              </h2>
            )}
            {cmsProcess.subline && (
              <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
                {cmsProcess.subline as string}
              </p>
            )}
            <div className="grid gap-8 md:grid-cols-4">
              {(cmsProcess.steps as any[]).map((step: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-white">
                    {step.step as string}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title as string}</h3>
                  {step.description && <p className="text-sm text-muted">{step.description as string}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Preview */}
      {caseStudies.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">{t.referenzen.title}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((cs: any) => (
                <Link
                  key={cs.id as string}
                  href={`/${locale}/referenzen/${cs.slug as string}`}
                  className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <p className="mb-2 text-sm font-medium text-gold-600">{cs.client as string}</p>
                  <h3 className="mb-3 text-xl font-semibold group-hover:text-gold-600">{cs.title as string}</h3>
                  {cs.results && (cs.results as any[]).length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {(cs.results as any[]).slice(0, 3).map((r: any, i: number) => (
                        <div key={i} className="rounded-lg bg-gray-50 px-3 py-1">
                          <span className="font-bold text-gold-600">{r.value}</span>{' '}
                          <span className="text-xs text-muted">{r.metric}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/referenzen`}
                className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
              >
                {t.common.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.home.testimonialsHeading}
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
              {t.home.testimonialsSub}
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id as string} className="rounded-xl border border-gray-100 bg-white p-6">
                  {testimonial.rating && (
                    <div className="mb-3 text-gold-400">
                      {'★'.repeat(testimonial.rating as number)}{'☆'.repeat(5 - (testimonial.rating as number))}
                    </div>
                  )}
                  <p className="mb-6 italic text-muted">&ldquo;{testimonial.quote as string}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.author as string}</p>
                    {testimonial.company && <p className="text-sm text-muted">{testimonial.company as string}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {posts.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">{t.home.blogTitle}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post: any) => (
                <Link
                  key={post.id as string}
                  href={`/${locale}/blog/${post.slug as string}`}
                  className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-gold-600">{post.title as string}</h3>
                  {post.excerpt && <p className="mb-4 line-clamp-2 text-muted">{post.excerpt as string}</p>}
                  {post.publishedDate && <p className="text-sm text-muted">{formatDate(post.publishedDate as string, locale)}</p>}
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/blog`}
                className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
              >
                {t.common.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {(cmsCta?.heading as string) || t.home.ctaHeading}
          </h2>
          <p className="mb-8 text-gray-300">
            {(cmsCta?.subline as string) || t.home.ctaSub}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={(cmsCta?.buttonLink as string) || `/${locale}/kontakt`}
              className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              {(cmsCta?.buttonLabel as string) || t.home.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
