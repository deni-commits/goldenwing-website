'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Gift, Mail, Globe, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Link } from '@/lib/i18n-navigation'
import { useTranslations } from 'next-intl'

const EXIT_POPUP_KEY = 'goldenwing_exit_popup_shown'
const EXIT_POPUP_COOLDOWN = 7 * 24 * 60 * 60 * 1000 // 7 days in ms

interface FormData {
  email: string
  website: string
  newsletterConsent: boolean
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function ExitIntentPopup() {
  const t = useTranslations('exitPopup')
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    website: '',
    newsletterConsent: false,
  })

  // Check if popup should be shown
  useEffect(() => {
    const lastShown = localStorage.getItem(EXIT_POPUP_KEY)
    if (lastShown) {
      const timeSinceShown = Date.now() - parseInt(lastShown, 10)
      if (timeSinceShown < EXIT_POPUP_COOLDOWN) {
        setHasTriggered(true) // Don't show again within cooldown
      }
    }
  }, [])

  // Exit intent detection
  useEffect(() => {
    if (hasTriggered) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through top of viewport
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
        localStorage.setItem(EXIT_POPUP_KEY, Date.now().toString())
      }
    }

    // Mobile: trigger after 30 seconds of inactivity or scroll up
    let inactivityTimer: NodeJS.Timeout
    let lastScrollY = window.scrollY

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        if (!hasTriggered && window.scrollY > 500) {
          setIsVisible(true)
          setHasTriggered(true)
          localStorage.setItem(EXIT_POPUP_KEY, Date.now().toString())
        }
      }, 30000) // 30 seconds
    }

    const handleScroll = () => {
      // Detect rapid scroll up (potential exit)
      if (window.scrollY < lastScrollY - 200 && window.scrollY < 100 && !hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
        localStorage.setItem(EXIT_POPUP_KEY, Date.now().toString())
      }
      lastScrollY = window.scrollY
      resetInactivityTimer()
    }

    // Desktop: mouse leave
    document.addEventListener('mouseleave', handleMouseLeave)

    // Mobile: scroll and inactivity
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('touchstart', resetInactivityTimer, { passive: true })

    resetInactivityTimer()

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('touchstart', resetInactivityTimer)
      clearTimeout(inactivityTimer)
    }
  }, [hasTriggered])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.website) return

    setSubmitStatus('loading')

    // Normalize URL - add https:// if no protocol
    let normalizedWebsite = formData.website.trim()
    if (!/^https?:\/\//i.test(normalizedWebsite)) {
      normalizedWebsite = `https://${normalizedWebsite}`
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          website: normalizedWebsite,
          newsletterConsent: formData.newsletterConsent,
          source: 'exit-intent-popup',
          consentTimestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitStatus('success')

      // Close popup after 3 seconds on success
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    } catch {
      setSubmitStatus('error')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className={cn(
        "relative w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden",
        "animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      )}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label={t('close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent pt-8 pb-6 px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Form */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('successTitle')}</h3>
              <p className="text-muted-foreground">{t('successMessage')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="exit-email" className="text-sm font-medium">
                  {t('emailLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="exit-email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Website Field */}
              <div className="space-y-2">
                <label htmlFor="exit-website" className="text-sm font-medium">
                  {t('websiteLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="exit-website"
                    type="text"
                    placeholder={t('websitePlaceholder')}
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="pl-10"
                    required
                    pattern="^(https?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]{2,}.*$"
                    title={t('websiteHint') || 'z.B. www.example.com oder example.com'}
                  />
                </div>
              </div>

              {/* Newsletter Consent Checkbox */}
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Checkbox
                  id="exit-newsletter"
                  checked={formData.newsletterConsent}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, newsletterConsent: checked === true }))
                  }
                  className="mt-0.5"
                />
                <label htmlFor="exit-newsletter" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  {t('newsletterConsent')}
                </label>
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <p className="text-sm text-red-500 text-center">{t('errorMessage')}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  t('submitButton')
                )}
              </Button>

              {/* Trust Signals */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {t('noSpam')}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {t('unsubscribe')}
                </span>
              </div>

              {/* Privacy Link */}
              <p className="text-xs text-center text-muted-foreground">
                {t('privacyText')}{' '}
                <Link href="/datenschutz" className="text-primary hover:underline">
                  {t('privacyLink')}
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
