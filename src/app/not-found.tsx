import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gold-500">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Seite nicht gefunden</h2>
        <p className="mb-8 text-muted">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  )
}
