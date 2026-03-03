'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'
import type { Dictionary } from '@/i18n/getDictionary'

interface HeaderProps {
  locale: string
  t: Dictionary
  navigation?: any | null
  siteSettings?: any | null
}

export function Header({ locale, t, navigation, siteSettings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const cmsMenu = navigation?.mainMenu as any[] | undefined
  const navItems = cmsMenu && cmsMenu.length > 0
    ? cmsMenu.map((item: any) => ({
        label: item.label as string,
        href: item.link as string,
      }))
    : [
        { label: t.nav.services, href: `/${locale}/leistungen` },
        { label: t.nav.referenzen, href: `/${locale}/referenzen` },
        { label: t.nav.blog || 'Blog', href: `/${locale}/blog` },
        { label: t.nav.about, href: `/${locale}/ueber-uns` },
      ]

  const ctaButton = navigation?.ctaButton as { label?: string; link?: string } | undefined
  const ctaLabel = ctaButton?.label || t.nav.contact
  const ctaHref = ctaButton?.link || `/${locale}/kontakt`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-1 text-xl font-bold tracking-tight">
          <span className="text-primary">Golden</span><span className="text-foreground">Wing</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <LanguageSwitcher locale={locale} />
          </li>
          <li>
            <Link
              href={ctaHref}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {ctaLabel}
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t.common.close : t.nav.home}
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <LanguageSwitcher locale={locale} />
            </li>
            <li>
              <Link
                href={ctaHref}
                className="mt-2 block rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {ctaLabel}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
