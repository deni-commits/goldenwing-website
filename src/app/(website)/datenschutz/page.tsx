import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklaerung | GoldenWing Creative Studios',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Datenschutzerklaerung</h1>

      {/* Note: This content will be managed via the Payload Pages collection. */}
      {/* The sections below serve as structural DSGVO placeholders only. */}

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">1. Verantwortlicher</h2>
        <p>
          Verantwortlicher im Sinne der DSGVO ist:
        </p>
        <p className="mt-2">
          GoldenWing Creative Studios<br />
          Musterstrasse 1<br />
          1010 Wien, Oesterreich<br />
          E-Mail:{' '}
          <a href="mailto:office@goldenwing.at" className="hover:text-gold-500 underline">
            office@goldenwing.at
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p className="text-muted">
          [Platzhalter &ndash; Inhalt wird ueber das CMS verwaltet.]
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">3. Weitergabe von Daten an Dritte</h2>
        <p className="text-muted">
          [Platzhalter &ndash; Inhalt wird ueber das CMS verwaltet.]
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">4. Cookies und Tracking</h2>
        <p className="text-muted">
          [Platzhalter &ndash; Inhalt wird ueber das CMS verwaltet.]
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">5. Ihre Rechte gemaess DSGVO</h2>
        <p>Sie haben gemaess DSGVO folgende Rechte:</p>
        <ul className="mt-2 list-disc pl-6 text-muted">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Loeschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschraenkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenuebertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">6. Kontakt Datenschutz</h2>
        <p>
          Bei Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
          <a href="mailto:office@goldenwing.at" className="hover:text-gold-500 underline">
            office@goldenwing.at
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">7. Beschwerderecht bei der Aufsichtsbehoerde</h2>
        <p>
          Sie haben das Recht, sich bei der oesterreichischen Datenschutzbehoerde zu beschweren:
        </p>
        <p className="mt-2">
          Datenschutzbehoerde<br />
          Barichgasse 40&ndash;42<br />
          1030 Wien<br />
          <a
            href="https://www.dsb.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-500 underline"
          >
            www.dsb.gv.at
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">8. Aktualitaet dieser Erklaerung</h2>
        <p className="text-muted">
          [Platzhalter &ndash; Inhalt wird ueber das CMS verwaltet.]
        </p>
      </section>
    </main>
  )
}
