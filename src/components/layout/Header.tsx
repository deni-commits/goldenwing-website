'use client'

import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Blog', href: '/blog' },
  { label: 'Ueber uns', href: '/ueber-uns' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          GoldenWing
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-muted transition hover:text-dark"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/kontakt"
              className="rounded-lg bg-gold-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gold-600"
            >
              Kontakt
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Menue schliessen' : 'Menue oeffnen'}
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-sm font-medium text-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kontakt"
                className="mt-2 block rounded-lg bg-gold-500 px-5 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
