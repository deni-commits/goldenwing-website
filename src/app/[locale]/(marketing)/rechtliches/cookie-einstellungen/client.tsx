'use client'

import { Link } from '@/lib/i18n-navigation'
import NextLink from 'next/link'
import { useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Cookie, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { getContactUrl } from '@/lib/utils'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

interface ContentProps {
  title: string
  description: string
  whatAreCookiesTitle: string
  whatAreCookiesText1: string
  whatAreCookiesText2: string
  whatAreCookiesText3: string
  necessaryTitle: string
  necessaryAlwaysOn: string
  necessaryDescription: string
  necessaryDetailedText: string
  necessaryPurposeLabel: string
  necessaryPurposes: string[]
  analyticsTitle: string
  analyticsDescription: string
  analyticsDetailedText: string
  analyticsPurposeLabel: string
  analyticsPurposes: string[]
  marketingTitle: string
  marketingDescription: string
  marketingDetailedText: string
  marketingPurposeLabel: string
  marketingPurposes: string[]
  saveButton: string
  acceptAllButton: string
  savedSuccessTitle: string
  savedSuccessDescription: string
  savedErrorTitle: string
  savedErrorDescription: string
  footerText: string
  privacyLinkText: string
  footerText2: string
  contactLinkText: string
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
}

export default function CookieSettingsClient({
  content,
}: {
  content: ContentProps
}) {
  const locale = useLocale()
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cookie-preferences')
      if (saved) {
        setPreferences(JSON.parse(saved))
      }
    } catch {
      // Silently fail - use defaults
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      setIsSaving(true)
      localStorage.setItem('cookie-preferences', JSON.stringify(prefs))
      localStorage.setItem('cookie-consent-given', 'true')

      toast.success(content.savedSuccessTitle, {
        description: content.savedSuccessDescription,
      })

      // Reload page to apply new settings
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch {
      toast.error(content.savedErrorTitle, {
        description: content.savedErrorDescription,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    savePreferences(allAccepted)
  }

  const handleSaveSettings = () => {
    savePreferences(preferences)
  }

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Essential cookies cannot be toggled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!isLoaded) {
    return (
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{content.title}</h1>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <Container variant="block">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">{content.title}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{content.description}</p>
          </div>

          {/* Introduction Section */}
          <div className="mb-8 prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold mb-4">{content.whatAreCookiesTitle}</h2>
            <p className="text-muted-foreground mb-4">{content.whatAreCookiesText1}</p>
            <p className="text-muted-foreground mb-4">{content.whatAreCookiesText2}</p>
            <p className="text-muted-foreground">{content.whatAreCookiesText3}</p>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-6 mb-8">
            {/* Essential Cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {content.necessaryTitle}
                      <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                        {content.necessaryAlwaysOn}
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-2">{content.necessaryDescription}</CardDescription>
                  </div>
                  <Switch
                    checked={preferences.essential}
                    disabled={true}
                    className="ml-4"
                    aria-label={`${content.necessaryTitle} (${content.necessaryAlwaysOn})`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{content.necessaryDetailedText}</p>
                <div className="mt-3 text-sm">
                  <strong className="text-foreground">{content.necessaryPurposeLabel}</strong>
                  <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                    {content.necessaryPurposes.map((purpose, i) => (
                      <li key={i}>{purpose}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle>{content.analyticsTitle}</CardTitle>
                    <CardDescription className="mt-2">{content.analyticsDescription}</CardDescription>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={() => handleToggle('analytics')}
                    className="ml-4"
                    aria-label={content.analyticsTitle}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{content.analyticsDetailedText}</p>
                <div className="mt-3 text-sm">
                  <strong className="text-foreground">{content.analyticsPurposeLabel}</strong>
                  <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                    {content.analyticsPurposes.map((purpose, i) => (
                      <li key={i}>{purpose}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle>{content.marketingTitle}</CardTitle>
                    <CardDescription className="mt-2">{content.marketingDescription}</CardDescription>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={() => handleToggle('marketing')}
                    className="ml-4"
                    aria-label={content.marketingTitle}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{content.marketingDetailedText}</p>
                <div className="mt-3 text-sm">
                  <strong className="text-foreground">{content.marketingPurposeLabel}</strong>
                  <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                    {content.marketingPurposes.map((purpose, i) => (
                      <li key={i}>{purpose}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleSaveSettings} disabled={isSaving} className="flex-1">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {content.saveButton}
            </Button>
            <Button onClick={handleAcceptAll} disabled={isSaving} variant="outline" className="flex-1">
              {content.acceptAllButton}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {content.footerText}{' '}
              <Link href="/datenschutz" className="text-primary hover:underline font-medium">
                {content.privacyLinkText}
              </Link>
              {content.footerText2}{' '}
              <NextLink href={getContactUrl(locale)} className="text-primary hover:underline font-medium">
                {content.contactLinkText}
              </NextLink>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
