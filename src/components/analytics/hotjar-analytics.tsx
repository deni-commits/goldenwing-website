'use client'

import Script from 'next/script'
import { Suspense } from 'react'
import { useCookieConsent } from '@/components/cookie-banner'

const HOTJAR_ID = 3841747
const HOTJAR_SV = 6

function HotjarAnalyticsInner() {
  const { hasAnalyticsConsent } = useCookieConsent()

  // Don't load if no consent
  if (!hasAnalyticsConsent) {
    return null
  }

  return (
    <Script
      id="hotjar-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SV}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  )
}

export function HotjarAnalytics() {
  return (
    <Suspense fallback={null}>
      <HotjarAnalyticsInner />
    </Suspense>
  )
}
