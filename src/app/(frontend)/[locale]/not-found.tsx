import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="mb-2 text-6xl font-bold text-gold-500">404</p>
        <h1 className="mb-4 text-2xl font-bold">Seite nicht gefunden</h1>
        <p className="mb-8 text-muted">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/de"
          className="inline-block rounded-lg bg-gold-500 px-6 py-3 font-semibold text-white transition hover:bg-gold-600"
        >
          Zur Startseite
        </Link>
      </div>
    </section>
  )
}
