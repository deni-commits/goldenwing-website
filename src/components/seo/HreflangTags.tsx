'use client'

import { usePathname } from 'next/navigation'
import { locales } from '@/i18n/config'

interface HreflangTagsProps {
  locale: string
}

export function HreflangTags({ locale }: HreflangTagsProps) {
  const pathname = usePathname()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  return (
    <>
      {locales.map((loc) => {
        const segments = pathname.split('/')
        if (segments[1] && locales.includes(segments[1] as any)) {
          segments[1] = loc
        }
        const url = `${siteUrl}${segments.join('/')}`
        return (
          <link key={loc} rel="alternate" hrefLang={loc} href={url} />
        )
      })}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/de${pathname.replace(`/${locale}`, '')}`} />
    </>
  )
}
