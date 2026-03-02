import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GoldenWing Creative Studios | Marketing & Branding Agentur Wien',
  description:
    'Wir entwickeln digitale Strategien, Websites und Markenidentitaeten fuer Unternehmen in Wien und Oesterreich.',
}

export default function HomePage() {
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
            <a
              href="/kontakt"
              className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              Projekt starten
            </a>
            <a
              href="/referenzen"
              className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Referenzen ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Unsere Services
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
            Von der Strategie bis zur Umsetzung — alles aus einer Hand.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Web Development', desc: 'Moderne Websites und Web-Apps mit Fokus auf Performance und UX.' },
              { title: 'SEO', desc: 'Suchmaschinenoptimierung die Rankings und organischen Traffic steigert.' },
              { title: 'Branding', desc: 'Markenidentitaeten die im Gedaechtnis bleiben und Vertrauen schaffen.' },
              { title: 'Marketing', desc: 'Digitale Kampagnen die messbare Ergebnisse liefern.' },
            ].map((service) => (
              <div key={service.title} className="rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg">
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-muted">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Bereit fuer den naechsten Schritt?
          </h2>
          <p className="mb-8 text-gray-300">
            Lass uns gemeinsam herausfinden, wie wir dein Unternehmen nach vorne bringen koennen.
          </p>
          <a
            href="/kontakt"
            className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            Kostenloses Erstgespraech vereinbaren
          </a>
        </div>
      </section>
    </>
  )
}
