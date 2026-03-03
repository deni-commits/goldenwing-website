'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">Etwas ist schiefgelaufen</h1>
        <p className="mb-8 text-muted">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-gold-500 px-6 py-3 font-semibold text-white transition hover:bg-gold-600"
        >
          Erneut versuchen
        </button>
      </div>
    </section>
  )
}
