'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">Etwas ist schiefgelaufen</h1>
        <p className="text-muted-foreground mb-8">Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.</p>
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-semibold transition"
        >
          Erneut versuchen
        </button>
      </div>
    </section>
  )
}
