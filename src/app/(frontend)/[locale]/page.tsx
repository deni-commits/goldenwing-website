import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { OrganizationSchema } from '@/components/seo/StructuredData'
import { getPageSeo } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { ...getPageSeo('', locale) }
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

  try {
    const payload = await getPayload()
    const [postsData, servicesData, testimonialsData] = await Promise.all([
      payload.find({ collection: 'posts', locale, limit: 3, sort: '-publishedDate', where: { _status: { equals: 'published' } } }),
      payload.find({ collection: 'services', locale, limit: 10, where: { parent: { exists: false } } }),
      payload.find({ collection: 'testimonials', locale, limit: 6 }),
    ])
    posts = postsData.docs
    services = servicesData.docs
    testimonials = testimonialsData.docs
  } catch {
    // Tables may not exist yet on first build
  }

  return (
    <>
      <OrganizationSchema />
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-dark px-4 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            {locale === 'de' ? (
              <>Deine Marke. <span className="text-gold-400">Dein Erfolg.</span></>
            ) : locale === 'ru' ? (
              <>Твой бренд. <span className="text-gold-400">Твой успех.</span></>
            ) : (
              <>Your Brand. <span className="text-gold-400">Your Success.</span></>
            )}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/${locale}/kontakt`}
              className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              {t.home.ctaButton}
            </Link>
            <Link
              href={`/${locale}/referenzen`}
              className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {t.referenzen.title}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{t.home.servicesTitle}</h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">{t.services.subtitle}</p>
          {services.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any) => (
                <Link
                  key={service.id as string}
                  href={`/${locale}/services/${service.slug as string}`}
                  className="rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50">
                    <span className="text-2xl text-gold-500">&#9733;</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title as string}</h3>
                  {service.excerpt && <p className="text-muted">{service.excerpt as string}</p>}
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Web Development', desc: locale === 'de' ? 'Moderne Websites und Web-Apps mit Fokus auf Performance und UX.' : 'Modern websites and web apps focused on performance and UX.' },
                { title: 'SEO', desc: locale === 'de' ? 'Suchmaschinenoptimierung die Rankings und organischen Traffic steigert.' : 'Search engine optimization that boosts rankings and organic traffic.' },
                { title: 'Branding', desc: locale === 'de' ? 'Markenidentitaeten die im Gedaechtnis bleiben.' : 'Brand identities that stick in memory.' },
                { title: 'Marketing', desc: locale === 'de' ? 'Digitale Kampagnen die messbare Ergebnisse liefern.' : 'Digital campaigns that deliver measurable results.' },
              ].map((service) => (
                <div key={service.title} className="rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg">
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/services`}
              className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
            >
              {t.common.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
              {locale === 'de' ? 'Was unsere Kunden sagen' : locale === 'ru' ? 'Что говорят наши клиенты' : 'What our clients say'}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id as string} className="rounded-xl border border-gray-100 bg-white p-6">
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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.home.ctaTitle}</h2>
          <p className="mb-8 text-gray-300">
            {locale === 'de' ? 'Lass uns gemeinsam herausfinden, wie wir dein Unternehmen nach vorne bringen koennen.' : locale === 'ru' ? 'Давайте вместе выясним, как мы можем продвинуть ваш бизнес вперёд.' : 'Let us figure out together how we can move your business forward.'}
          </p>
          <Link
            href={`/${locale}/kontakt`}
            className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            {t.home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
