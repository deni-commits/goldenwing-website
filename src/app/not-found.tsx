import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
        <p className="text-muted-foreground mb-8 text-xl">Seite nicht gefunden / Page not found</p>
        <Link
          href="/de"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-8 py-3 font-semibold transition"
        >
          Startseite / Homepage
        </Link>
      </div>
    </main>
  )
}
