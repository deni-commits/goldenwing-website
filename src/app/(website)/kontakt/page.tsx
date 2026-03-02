import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktiere GoldenWing Creative Studios — kostenloses Erstgespraech vereinbaren.',
}

export default function KontaktPage() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">Kontakt</h1>
        <p className="mb-12 text-lg text-muted">
          Lass uns gemeinsam dein naechstes Projekt besprechen.
        </p>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">E-Mail</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">Nachricht</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              Nachricht senden
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Adresse</h3>
              <p className="text-muted">Wien, Oesterreich</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">E-Mail</h3>
              <a href="mailto:office@goldenwing.at" className="text-gold-500 hover:text-gold-600">
                office@goldenwing.at
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
