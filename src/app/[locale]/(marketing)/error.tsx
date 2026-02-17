'use client'

import { useEffect } from 'react'
import { Link } from '@/lib/i18n-navigation'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // In production, send to error reporting service (e.g., Sentry)
    // In development, errors are logged by React DevTools
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Seite konnte nicht geladen werden</h1>
        <p className="text-muted-foreground mb-6">
          Beim Laden dieser Seite ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground mb-4">
            Fehler-ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Erneut versuchen
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Startseite
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            Zurück zur vorherigen Seite
          </button>
        </div>
      </div>
    </div>
  )
}
