'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales } from '@/i18n/config'

interface LanguageSwitcherProps {
  locale: string
}

const localeLabels: Record<string, string> = {
  de: 'DE',
  en: 'EN',
  ru: 'RU',
}

const localeNames: Record<string, string> = {
  de: 'Deutsch',
  en: 'English',
  ru: 'Русский',
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()

  function getLocalizedPath(targetLocale: string): string {
    const segments = pathname.split('/')
    if (segments[1] && locales.includes(segments[1] as any)) {
      segments[1] = targetLocale
    }
    return segments.join('/')
  }

  return (
    <nav aria-label="Language" className="flex items-center gap-1">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={getLocalizedPath(loc)}
          hrefLang={loc}
          lang={loc}
          aria-label={localeNames[loc]}
          aria-current={loc === locale ? 'true' : undefined}
          className={`rounded px-2 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-gold-500 ${
            loc === locale
              ? 'bg-gold-50 text-gold-600'
              : 'text-muted hover:text-dark'
          }`}
        >
          {localeLabels[loc]}
        </Link>
      ))}
    </nav>
  )
}
