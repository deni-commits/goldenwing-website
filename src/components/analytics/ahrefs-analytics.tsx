'use client'

import Script from 'next/script'
import { useCookieConsent } from '@/components/cookie-banner'

export function AhrefsAnalytics() {
  const { hasAnalyticsConsent } = useCookieConsent()

  // Don't load if no consent
  if (!hasAnalyticsConsent) {
    return null
  }

  return (
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="KkGAftxDROYbx+cLKv8lBw"
      strategy="afterInteractive"
    />
  )
}
