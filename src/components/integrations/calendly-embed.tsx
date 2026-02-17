'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

interface CalendlyEmbedProps {
  url?: string
  className?: string
}

// Calendly URL - hier deine Calendly URL eintragen
const CALENDLY_URL = 'https://calendly.com/goldenwing-at/erstgespraech'

export function CalendlyEmbed({ url = CALENDLY_URL, className }: CalendlyEmbedProps) {
  useEffect(() => {
    // Calendly Widget Script laden
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  const openCalendly = () => {
    // @ts-expect-error - Calendly wird extern geladen
    if (typeof window !== 'undefined' && window.Calendly) {
      // @ts-expect-error - Calendly wird extern geladen
      window.Calendly.initPopupWidget({ url })
    } else {
      // Fallback: Öffne Calendly in neuem Tab
      window.open(url, '_blank')
    }
  }

  return (
    <div className={className}>
      <Button
        onClick={openCalendly}
        size="lg"
        className="w-full gap-2"
      >
        <Calendar className="h-5 w-5" />
        Termin buchen
      </Button>
      {/* Calendly CSS */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
    </div>
  )
}

// Inline Embed Variante (für größere Darstellung)
export function CalendlyInline({
  url = CALENDLY_URL,
  height = 630,
  className
}: CalendlyEmbedProps & { height?: number }) {
  return (
    <div className={className}>
      <div
        className="calendly-inline-widget rounded-lg overflow-hidden"
        data-url={url}
        style={{ minWidth: '320px', height: `${height}px` }}
      />
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
    </div>
  )
}
