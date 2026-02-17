'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
import { Link } from '@/lib/i18n-navigation'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const COOKIE_CONSENT_KEY = 'goldenwing_cookie_consent'

type ConsentStatus = 'pending' | 'accepted' | 'essential'

// Use localStorage as external store
function getSnapshot(): ConsentStatus | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus | null
}

function getServerSnapshot(): ConsentStatus | null {
  return null
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function CookieBanner() {
  const t = useTranslations('cookies')
  const storedConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [isVisible, setIsVisible] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleAcceptAll = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setHasInteracted(true)
    setIsVisible(false)
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'))
  }, [])

  const handleEssentialOnly = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'essential')
    setHasInteracted(true)
    setIsVisible(false)
    window.dispatchEvent(new Event('storage'))
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  // Don't show if already consented or manually closed
  if (storedConsent || hasInteracted || !isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "cookie-banner-slide-in"
      )}
    >
      <div className="bg-background border-t shadow-lg">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Close button (mobile) */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:hidden text-muted-foreground hover:text-foreground"
              aria-label={t('close')}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Text */}
            <div className="flex-1 pr-8 sm:pr-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('message')}{' '}
                <Link
                  href="/datenschutz"
                  className="text-primary hover:underline"
                >
                  {t('learnMore')}
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEssentialOnly}
                className="flex-1 sm:flex-none text-xs"
              >
                {t('essentialOnly')}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none text-xs"
              >
                {t('acceptAll')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook to check consent status
export function useCookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return {
    consent,
    hasAnalyticsConsent: consent === 'accepted',
    hasEssentialConsent: consent === 'accepted' || consent === 'essential',
  }
}
