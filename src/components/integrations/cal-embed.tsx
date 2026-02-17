'use client'

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalEmbedProps {
  calLink?: string
  namespace?: string
  className?: string
}

const DEFAULT_CAL_LINK = "deni-khachukaev-uwweyq/30min-call"

// Inline Embed (für spezielle Anwendungsfälle)
export function CalEmbed({
  calLink = DEFAULT_CAL_LINK,
  namespace = "30min-call",
  className
}: CalEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace })
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: true,
        layout: "column_view",
        cssVarsPerTheme: {
          light: {
            "cal-bg": "transparent",
            "cal-bg-emphasis": "hsl(0 0% 96%)",
            "cal-bg-subtle": "hsl(0 0% 94%)",
            "cal-bg-muted": "hsl(0 0% 90%)",
            "cal-border": "hsl(0 0% 85%)",
            "cal-border-subtle": "hsl(0 0% 88%)",
            "cal-text": "hsl(0 0% 10%)",
            "cal-text-emphasis": "hsl(0 0% 0%)",
            "cal-text-subtle": "hsl(0 0% 40%)",
            "cal-text-muted": "hsl(0 0% 55%)",
            "cal-brand": "#f2fb31",
            "cal-brand-emphasis": "#d9e22c",
            "cal-brand-text": "#000000",
          },
          dark: {
            "cal-bg": "transparent",
            "cal-bg-emphasis": "hsl(0 0% 10%)",
            "cal-bg-subtle": "hsl(0 0% 12%)",
            "cal-bg-muted": "hsl(0 0% 15%)",
            "cal-border": "hsl(0 0% 20%)",
            "cal-border-subtle": "hsl(0 0% 18%)",
            "cal-text": "hsl(0 0% 95%)",
            "cal-text-emphasis": "hsl(0 0% 100%)",
            "cal-text-subtle": "hsl(0 0% 65%)",
            "cal-text-muted": "hsl(0 0% 50%)",
            "cal-brand": "#f2fb31",
            "cal-brand-emphasis": "#d9e22c",
            "cal-brand-text": "#000000",
          }
        }
      })
    })()
  }, [namespace])

  return (
    <div className={className}>
      <Cal
        namespace={namespace}
        calLink={calLink}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          minHeight: "380px",
          maxHeight: "420px",
          borderRadius: "12px"
        }}
        config={{ layout: "column_view", theme: "dark" }}
      />
    </div>
  )
}

// Popup Button - öffnet Kalender als Modal
export function CalPopupButton({
  calLink = DEFAULT_CAL_LINK,
  namespace = "30min-call",
  children,
  className
}: CalEmbedProps & { children?: React.ReactNode }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace })
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: {
          branding: {
            brandColor: "#f2fb31"
          }
        }
      })
    })()
  }, [namespace])

  return (
    <button
      data-cal-namespace={namespace}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={cn(
        "w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl",
        "bg-primary text-primary-foreground font-semibold",
        "hover:bg-primary/90 transition-all duration-200",
        "shadow-lg hover:shadow-xl hover:scale-[1.02]",
        className
      )}
    >
      <Calendar className="h-5 w-5" />
      {children || "Termin buchen"}
      <ArrowRight className="h-4 w-4 ml-auto" />
    </button>
  )
}

// Simple Button ohne Styling (für Custom-Styling)
export function CalButton({
  calLink = DEFAULT_CAL_LINK,
  namespace = "30min-call",
  children,
  className
}: CalEmbedProps & { children?: React.ReactNode }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace })
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: {
          branding: {
            brandColor: "#f2fb31"
          }
        }
      })
    })()
  }, [namespace])

  return (
    <button
      data-cal-namespace={namespace}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      {children || "Termin buchen"}
    </button>
  )
}
