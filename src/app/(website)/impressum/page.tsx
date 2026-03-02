import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | GoldenWing Creative Studios',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Impressum</h1>

      {/* Note: This content will be managed via the Payload Pages collection. */}
      {/* The sections below serve as a structural placeholder only. */}

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Angaben gemaess &sect; 5 ECG</h2>
        <p>GoldenWing Creative Studios</p>
        <p>Musterstrasse 1</p>
        <p>1010 Wien, Oesterreich</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Kontakt</h2>
        <p>
          E-Mail:{' '}
          <a href="mailto:office@goldenwing.at" className="hover:text-gold-500 underline">
            office@goldenwing.at
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Geschaeftsfuehrer</h2>
        <p>[Name des Geschaeftsfuehrers]</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Unternehmensregistrierung</h2>
        <p>UID-Nr.: ATU[XXXXXXXX]</p>
        <p>Firmenbuchnummer: FN [XXXXXX] x</p>
        <p>Firmenbuchgericht: Handelsgericht Wien</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Behoerde gemaess ECG</h2>
        <p>Bezirkshauptmannschaft / Magistrat Wien</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Haftungsausschluss</h2>
        <p className="text-muted">
          [Platzhalter &ndash; Inhalt wird ueber das CMS verwaltet.]
        </p>
      </section>
    </main>
  )
}
