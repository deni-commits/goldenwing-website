import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'GoldenWing Creative Studios | Marketing & Branding Agentur Wien',
  description:
    'Wir entwickeln digitale Strategien, Websites und Markenidentitaeten fuer Unternehmen in Wien und Oesterreich.',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function HomePage() {
  const payload = await getPayload()

  const [postsData, servicesData, testimonialsData] = await Promise.all([
    payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-publishedDate',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'services',
      limit: 10,
    }),
    payload.find({
      collection: 'testimonials',
      limit: 6,
    }),
  ])

  const posts = postsData.docs
  const services = servicesData.docs
  const testimonials = testimonialsData.docs

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-dark px-4 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Deine Marke.{' '}
            <span className="text-gold-400">Dein Erfolg.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
            GoldenWing Creative Studios entwickelt Websites, SEO-Strategien und
            Markenidentitaeten, die Ergebnisse liefern.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/kontakt"
              className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              Projekt starten
            </Link>
            <Link
              href="/referenzen"
              className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Referenzen ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Unsere Services
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
            Von der Strategie bis zur Umsetzung — alles aus einer Hand.
          </p>
          {services.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any) => (
                <Link
                  key={service.id as string}
                  href={`/services/${service.slug as string}`}
                  className="rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50">
                    <span className="text-2xl text-gold-500">&#9733;</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {service.title as string}
                  </h3>
                  {service.excerpt && (
                    <p className="text-muted">{service.excerpt as string}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Web Development', desc: 'Moderne Websites und Web-Apps mit Fokus auf Performance und UX.' },
                { title: 'SEO', desc: 'Suchmaschinenoptimierung die Rankings und organischen Traffic steigert.' },
                { title: 'Branding', desc: 'Markenidentitaeten die im Gedaechtnis bleiben und Vertrauen schaffen.' },
                { title: 'Marketing', desc: 'Digitale Kampagnen die messbare Ergebnisse liefern.' },
              ].map((service) => (
                <div
                  key={service.title}
                  className="rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
            >
              Alle Services ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Was unsere Kunden sagen
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
              Echte Ergebnisse fuer echte Unternehmen.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial: any) => (
                <div
                  key={testimonial.id as string}
                  className="rounded-xl border border-gray-100 bg-white p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <p className="mb-6 italic text-muted">
                    &ldquo;{testimonial.quote as string}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.author as string}</p>
                    {testimonial.company && (
                      <p className="text-sm text-muted">
                        {testimonial.company as string}
                      </p>
                    )}
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
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Aktuelles aus dem Blog
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
              Insights und Tipps aus der Welt des digitalen Marketings.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post: any) => {
                const category = post.category as any | null
                return (
                  <Link
                    key={post.id as string}
                    href={`/blog/${post.slug as string}`}
                    className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                  >
                    {category && (
                      <span className="mb-3 inline-block rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                        {((category.title ?? category.name) as string) || ''}
                      </span>
                    )}
                    <h3 className="mb-2 text-xl font-semibold group-hover:text-gold-600">
                      {post.title as string}
                    </h3>
                    {post.excerpt && (
                      <p className="mb-4 line-clamp-2 text-muted">
                        {post.excerpt as string}
                      </p>
                    )}
                    {post.publishedDate && (
                      <p className="text-sm text-muted">
                        {formatDate(post.publishedDate as string)}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
              >
                Alle Beitraege lesen
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Bereit fuer den naechsten Schritt?
          </h2>
          <p className="mb-8 text-gray-300">
            Lass uns gemeinsam herausfinden, wie wir dein Unternehmen nach vorne bringen koennen.
          </p>
          <Link
            href="/kontakt"
            className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            Kostenloses Erstgespraech vereinbaren
          </Link>
        </div>
      </section>
    </>
  )
}
