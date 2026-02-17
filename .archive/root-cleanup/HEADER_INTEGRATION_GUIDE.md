# Header Integration Guide - Language Switcher

## Goal
Add the language switcher to the header so users can switch between German and English.

## Quick Integration

### Option 1: Add to Desktop CTA Area (Recommended)

Update `/Users/denikhachukaev/Documents/GoldenWing 360/goldenwing-website/src/components/layout/header.tsx`

**Line 1-8:** Add import
```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'  // Add this line
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
```

**Line 109-114:** Update desktop CTA section
```tsx
{/* Desktop CTA */}
<div className="hidden lg:flex items-center gap-4">
  <LanguageSwitcher />  {/* Add this line */}
  <Link href="/kontakt">
    <Button>Projekt starten</Button>
  </Link>
</div>
```

**Line 194-201:** Add to mobile menu CTA section
```tsx
{/* CTA Button */}
<div className="mt-6 pt-4 border-t space-y-3">  {/* Added space-y-3 */}
  <LanguageSwitcher />  {/* Add this line - full width on mobile */}
  <Link href="/kontakt" onClick={() => setIsOpen(false)}>
    <Button className="w-full" size="lg">
      Projekt starten
    </Button>
  </Link>
</div>
```

### Result
- Desktop: Language switcher appears between navigation and "Projekt starten" button
- Mobile: Language switcher appears in the mobile menu before the CTA button

## Option 2: Standalone in Top Bar

If you want the language switcher in its own area:

```tsx
<div className="hidden lg:flex items-center gap-2">
  <LanguageSwitcher />
  <div className="h-4 w-px bg-border mx-2" /> {/* Divider */}
  <Link href="/kontakt">
    <Button>Projekt starten</Button>
  </Link>
</div>
```

## Full Updated Header Component

Here's the complete updated header with language switcher integrated:

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const services = [
  { title: 'Branding', href: '/leistungen/branding', description: 'Markenstrategie, Logo, Corporate Identity' },
  { title: 'Webdesign', href: '/leistungen/webdesign', description: 'UX/UI, Responsive, WordPress' },
  { title: 'Digitale Strategie', href: '/leistungen/digitale-strategie', description: 'Zielgruppen, Positionierung' },
  { title: 'SEO & Sichtbarkeit', href: '/leistungen/seo-sichtbarkeit', description: 'Technisches SEO, Local SEO' },
  { title: 'Content & Visuals', href: '/leistungen/content-visuals', description: 'Copywriting, Foto, Video' },
  { title: 'Technische Lösungen', href: '/leistungen/technische-loesungen', description: 'Automatisierung, API-Integration' },
  { title: 'Software-Entwicklung', href: '/leistungen/software-entwicklung', description: 'Web-Apps, Mobile, Cloud' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="GoldenWing 360°"
            width={160}
            height={32}
            className="h-8"
            style={{ width: 'auto', filter: 'var(--logo-filter, none)' }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Leistungen</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                  {services.map((service) => (
                    <li key={service.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium leading-none">{service.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/projekte"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Projekte
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/ueber-uns"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Über uns
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/blog"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA with Language Switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/kontakt">
            <Button>Projekt starten</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menü öffnen</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Hauptnavigation der Website</SheetDescription>

            {/* Header mit Logo */}
            <div className="flex items-center justify-between p-6 border-b">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo.svg"
                  alt="GoldenWing 360°"
                  width={140}
                  height={28}
                  className="h-7"
                  style={{ width: 'auto', filter: 'var(--logo-filter, none)' }}
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-6">
              {/* Main Links */}
              <div className="space-y-1">
                <Link
                  href="/projekte"
                  className="flex items-center py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Projekte
                </Link>
                <Link
                  href="/ueber-uns"
                  className="flex items-center py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Über uns
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </div>

              {/* Divider */}
              <div className="h-px bg-border my-4" />

              {/* Services Section */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Leistungen
                </h3>
                <div className="space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="group flex flex-col py-2.5 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-sm font-medium">{service.title}</span>
                      <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                        {service.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Button with Language Switcher */}
              <div className="mt-6 pt-4 border-t space-y-3">
                <LanguageSwitcher />
                <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" size="lg">
                    Projekt starten
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
```

## Testing After Integration

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`

3. Look for the language switcher:
   - **Desktop:** Between navigation and CTA button
   - **Mobile:** In the slide-out menu

4. Click the language switcher:
   - Should show "Deutsch" and "English" options
   - Click "English" → URL should change to `/en/`
   - Content should remain on same page

5. Verify language switching works on different pages

## Visual Appearance

The language switcher will appear as:
- **Desktop:** Small button with Languages icon and current language name
- **Mobile:** Full-width dropdown button
- **Both:** Dropdown menu with checkmark on selected language

## Troubleshooting

### Issue: LanguageSwitcher component not found
**Solution:** Make sure the file exists at:
`/Users/denikhachukaev/Documents/GoldenWing 360/goldenwing-website/src/components/layout/language-switcher.tsx`

### Issue: No dropdown appears
**Solution:** Check that shadcn dropdown-menu component is installed

### Issue: Switching doesn't work
**Solution:** Verify middleware is configured correctly at `src/middleware.ts`

### Issue: Styling looks off
**Solution:** The component uses your existing design system (shadcn/ui), should match automatically

## Next Steps After Header Integration

1. Test language switching on all pages
2. Start translating header navigation items
3. Translate footer content
4. Migrate routes to `[locale]` structure (see MIGRATION_GUIDE.md)

## Notes

- The language switcher automatically detects the current locale
- It preserves the current page when switching languages
- Works seamlessly with the i18n infrastructure already set up
- No configuration needed - just add the component!
