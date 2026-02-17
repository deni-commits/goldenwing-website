'use client'

import { useEffect } from 'react'
import { Link } from '@/lib/i18n-navigation'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
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
    <html lang="de">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Etwas ist schief gelaufen</h1>
            <p className="text-muted-foreground mb-6">
              Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kehren Sie zur Startseite zurück.
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
                  Zur Startseite
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
