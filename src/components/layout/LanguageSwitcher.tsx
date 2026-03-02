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

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()

  function getLocalizedPath(targetLocale: string): string {
    // Replace /de/ with /en/ etc, keeping the rest of the path
    const segments = pathname.split('/')
    if (segments[1] && locales.includes(segments[1] as any)) {
      segments[1] = targetLocale
    }
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={getLocalizedPath(loc)}
          className={`px-2 py-1 text-xs font-medium transition ${
            loc === locale
              ? 'text-gold-600'
              : 'text-muted hover:text-dark'
          }`}
        >
          {localeLabels[loc]}
        </Link>
      ))}
    </div>
  )
}
