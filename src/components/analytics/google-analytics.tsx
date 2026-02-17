'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useCookieConsent } from '@/components/cookie-banner'

const GA_MEASUREMENT_ID = 'G-ZBJFMMH3R6'

// Declare gtag on window
declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { hasAnalyticsConsent } = useCookieConsent()

  // Track page views
  useEffect(() => {
    if (!hasAnalyticsConsent || !window.gtag) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }, [pathname, searchParams, hasAnalyticsConsent])

  // Don't load if no consent
  if (!hasAnalyticsConsent) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  )
}

// Helper to track events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
