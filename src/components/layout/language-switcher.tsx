'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname as useNextPathname } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { locales, visibleLocales, localeNames, localeFlags, type Locale, defaultLocale } from '@/i18n/config'
import { translatePath, translatePathReverse, isEnglishPath } from '@/lib/utils'

// Helper function outside component to set cookie (avoids React Compiler immutability check)
function setLocaleCookie(targetLocale: Locale) {
  if (typeof document !== 'undefined') {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`
  }
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const tAccessibility = useTranslations('accessibility')
  // Use Next.js pathname to get the actual URL (with real slugs, not [slug])
  const realPathname = useNextPathname()

  // Pre-compute URLs for all locales (for crawlability)
  const getUrlForLocale = useCallback((targetLocale: Locale): string => {
    // Get the path without the locale prefix
    let pathWithoutLocale = realPathname

    // Remove current locale prefix if present
    for (const loc of locales) {
      if (realPathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = realPathname.slice(loc.length + 1)
        break
      } else if (realPathname === `/${loc}`) {
        pathWithoutLocale = '/'
        break
      }
    }

    // Translate the path to the target locale
    let translatedPath: string
    if (targetLocale === 'en') {
      // Switching to English: translate DE path to EN
      translatedPath = isEnglishPath(pathWithoutLocale)
        ? pathWithoutLocale
        : translatePath(pathWithoutLocale)
    } else {
      // Switching to German: translate EN path back to DE
      translatedPath = isEnglishPath(pathWithoutLocale)
        ? translatePathReverse(pathWithoutLocale)
        : pathWithoutLocale
    }

    // Build new URL with target locale
    if (targetLocale === defaultLocale) {
      // Default locale (de) has no prefix
      return translatedPath
    } else {
      // Other locales get prefix
      // Avoid trailing slash: /en instead of /en/
      if (translatedPath === '/') {
        return `/${targetLocale}`
      }
      return `/${targetLocale}${translatedPath}`
    }
  }, [realPathname])

  // Handle click to also set cookie for user preference
  const handleClick = useCallback((targetLocale: Locale) => {
    setLocaleCookie(targetLocale)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label={tAccessibility('currentLanguage', { language: localeNames[locale] })}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{localeFlags[locale]}</span>
          <span className="hidden md:inline">{localeNames[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* IMPORTANT: Using real <a> tags for SEO crawlability */}
        {/* Only show visible locales (hide ru until fully translated) */}
        {visibleLocales.map((loc) => (
          <a
            key={loc}
            href={getUrlForLocale(loc)}
            hrefLang={loc}
            lang={loc}
            onClick={() => handleClick(loc)}
            className={`
              flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer
              hover:bg-accent hover:text-accent-foreground
              ${locale === loc ? 'bg-muted font-medium' : ''}
            `}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </a>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
