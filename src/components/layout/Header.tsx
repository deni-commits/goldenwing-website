'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/i18n/getDictionary'

interface HeaderProps {
  locale: string
  t: Dictionary
  navigation?: any | null
  siteSettings?: any | null
}

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

export function Header({ locale, t, navigation, siteSettings }: HeaderProps) {
  const pathname = usePathname()
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Build navigation items — CMS or fallback
  const cmsMenu = navigation?.mainMenu as any[] | undefined
  const navItems: NavItem[] =
    cmsMenu && cmsMenu.length > 0
      ? cmsMenu.map((item: any) => ({
          label: item.label as string,
          href: item.link as string,
          children: item.children?.map((child: any) => ({
            label: child.label as string,
            href: child.link as string,
            description: child.description as string | undefined,
          })),
        }))
      : [
          {
            label: t.nav.services,
            href: `/${locale}/leistungen`,
            children: [
              {
                label: 'Webdesign',
                href: `/${locale}/leistungen/webdesign`,
                description: 'Moderne, responsive Websites',
              },
              { label: 'SEO', href: `/${locale}/leistungen/seo`, description: 'Suchmaschinenoptimierung' },
              { label: 'Branding', href: `/${locale}/leistungen/branding`, description: 'Markenidentitaet & Design' },
              {
                label: 'Marketing',
                href: `/${locale}/leistungen/marketing`,
                description: 'Digitale Marketingstrategien',
              },
            ],
          },
          { label: t.nav.referenzen, href: `/${locale}/referenzen` },
          { label: t.nav.about, href: `/${locale}/ueber-uns` },
          { label: t.nav.blog || 'Blog', href: `/${locale}/blog` },
          { label: t.nav.glossar || 'Glossar', href: `/${locale}/glossar` },
        ]

  const ctaButton = navigation?.ctaButton as { label?: string; link?: string } | undefined
  const ctaLabel = ctaButton?.label || t.nav.contact
  const ctaHref = ctaButton?.link || `/${locale}/kontakt`

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-0.5 text-xl font-bold tracking-tight">
          <span className="text-primary">Golden</span>
          <span className="text-foreground">Wing</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) =>
                item.children && item.children.length > 0 ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        'text-muted-foreground hover:text-foreground text-sm font-medium transition-colors',
                        isActive(item.href) && 'text-foreground',
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2">
                        {/* Parent link */}
                        <li className="col-span-full">
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="text-foreground hover:bg-muted flex w-full items-center rounded-md p-3 text-sm font-semibold"
                            >
                              {item.label} — {t.common.viewAll}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  'hover:bg-muted block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                                  isActive(child.href) && 'bg-muted',
                                )}
                              >
                                <div className="text-foreground text-sm leading-none font-medium">{child.label}</div>
                                {child.description && (
                                  <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-snug">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                          isActive(item.href) && 'text-foreground',
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ml-2 flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <Link
              href={ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-semibold transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation — Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="text-foreground hover:bg-muted inline-flex items-center justify-center rounded-md p-2"
                aria-label="Menu"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto p-0">
              <SheetHeader className="border-border border-b px-4 py-4">
                <SheetTitle className="text-left">
                  <span className="text-primary">Golden</span>
                  <span className="text-foreground">Wing</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col py-2">
                {navItems.map((item) =>
                  item.children && item.children.length > 0 ? (
                    <div key={item.href}>
                      <button
                        onClick={() => setOpenMobileSub(openMobileSub === item.href ? null : item.href)}
                        className={cn(
                          'text-foreground hover:bg-muted flex w-full items-center justify-between px-4 py-3 text-base font-medium transition-colors',
                          isActive(item.href) && 'text-primary',
                        )}
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={cn(
                            'text-muted-foreground h-4 w-4 transition-transform duration-200',
                            openMobileSub === item.href && 'rotate-180',
                          )}
                        />
                      </button>
                      {openMobileSub === item.href && (
                        <div className="bg-muted/50">
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className="text-foreground hover:text-primary block px-6 py-2.5 text-sm font-semibold"
                            >
                              {t.common.viewAll}
                            </Link>
                          </SheetClose>
                          {item.children.map((child) => (
                            <SheetClose asChild key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  'text-muted-foreground hover:text-foreground block px-6 py-2.5 text-sm',
                                  isActive(child.href) && 'text-primary',
                                )}
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-foreground hover:bg-muted block px-4 py-3 text-base font-medium transition-colors',
                          isActive(item.href) && 'text-primary',
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ),
                )}

                <div className="border-border my-2 border-t" />

                <div className="px-4 py-2">
                  <LanguageSwitcher locale={locale} />
                </div>

                <div className="px-4 py-2">
                  <SheetClose asChild>
                    <Link
                      href={ctaHref}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 block rounded-lg px-5 py-3 text-center text-sm font-semibold transition-colors"
                    >
                      {ctaLabel}
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Scroll progress indicator */}
      <motion.div className="bg-primary absolute right-0 bottom-0 left-0 h-[2px] origin-left" style={{ scaleX }} />
    </header>
  )
}
