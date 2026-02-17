'use client'

import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { ThemeSwitcher } from '@/components/layout/theme-switcher'
import { useTranslations, useLocale } from 'next-intl'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const locale = useLocale()
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const tAccessibility = useTranslations('accessibility')
  const tLanguages = useTranslations('languages')

  const isRussian = locale === 'ru'
  const isGerman = locale === 'de'

  // Services - NEW STRUCTURE 2025 (6 Main Services)
  const services: Array<{ key: string; href: StaticAppPathname; title: string; description: string }> = [
    {
      key: 'branding',
      href: '/leistungen/branding',
      title: isRussian ? 'Брендинг' : isGerman ? 'Branding' : 'Branding',
      description: isRussian
        ? 'Стратегия бренда, визуальная идентичность и брендбук'
        : isGerman
          ? 'Markenstrategie, visuelle Identität und Markenrichtlinien'
          : 'Brand strategy, visual identity and brand guidelines'
    },
    {
      key: 'webdesign',
      href: '/leistungen/webdesign',
      title: isRussian ? 'Веб-дизайн' : isGerman ? 'Webdesign' : 'Web Design',
      description: isRussian
        ? 'Информационная архитектура, UX/UI-дизайн и CMS-разработка'
        : isGerman
          ? 'Informationsarchitektur, UX/UI-Design und CMS-Entwicklung'
          : 'Information architecture, UX/UI design and CMS development'
    },
    {
      key: 'digitalMarketing',
      href: '/leistungen/digital-marketing',
      title: isRussian ? 'Цифровой маркетинг' : isGerman ? 'Digital Marketing' : 'Digital Marketing',
      description: isRussian
        ? 'Стратегия кампаний, платная реклама и email-автоматизация'
        : isGerman
          ? 'Kampagnenstrategie, Paid Media und E-Mail-Automatisierung'
          : 'Campaign strategy, paid media and email automation'
    },
    {
      key: 'seoContent',
      href: '/leistungen/seo-content',
      title: isRussian ? 'SEO и контент' : isGerman ? 'SEO & Content' : 'SEO & Content',
      description: isRussian
        ? 'Техническое SEO, On-/Off-Page, Local SEO и создание контента'
        : isGerman
          ? 'Technical SEO, On-/Off-Page, Local SEO und Content-Produktion'
          : 'Technical SEO, on-/off-page, local SEO and content production'
    },
    {
      key: 'webAppDev',
      href: '/leistungen/web-app-entwicklung',
      title: isRussian ? 'Веб- и приложения' : isGerman ? 'Web- & App-Entwicklung' : 'Web & App Development',
      description: isRussian
        ? 'Техническая архитектура, разработка, API и автоматизация'
        : isGerman
          ? 'Technische Architektur, Entwicklung, APIs und Automatisierung'
          : 'Technical architecture, development, APIs and automation'
    },
    {
      key: 'itCloud',
      href: '/leistungen/it-cloud-services',
      title: isRussian ? 'IT и облако' : isGerman ? 'IT & Cloud Services' : 'IT & Cloud Services',
      description: isRussian
        ? 'Облачная архитектура, мониторинг, безопасность и поддержка'
        : isGerman
          ? 'Cloud-Architektur, Monitoring, Sicherheit und Support'
          : 'Cloud architecture, monitoring, security and support'
    },
  ]

  // Service packages (new)
  const servicePakete: Array<{ key: string; href: StaticAppPathname; title: string; description: string }> = [
    {
      key: 'brandWebFoundation',
      href: '/leistungen/pakete/brand-web-foundation',
      title: isRussian ? 'Бренд и веб-основа' : isGerman ? 'Brand & Web Foundation' : 'Brand & Web Foundation',
      description: isRussian
        ? 'Чёткий бренд и сайт, создающий ориентацию'
        : isGerman
          ? 'Klare Marke und Website, die Orientierung schafft'
          : 'Clear brand and website that creates orientation'
    },
    {
      key: 'seoContentGrowth',
      href: '/leistungen/pakete/seo-content-growth',
      title: isRussian ? 'SEO и контент-рост' : isGerman ? 'SEO & Content Growth' : 'SEO & Content Growth',
      description: isRussian
        ? 'Устойчивая видимость и органический трафик'
        : isGerman
          ? 'Nachhaltige Sichtbarkeit und organischer Traffic'
          : 'Sustainable visibility and organic traffic'
    },
    {
      key: 'demandGenSuite',
      href: '/leistungen/pakete/demand-gen-suite',
      title: isRussian ? 'Demand Gen Suite' : isGerman ? 'Demand Gen Suite' : 'Demand Gen Suite',
      description: isRussian
        ? 'Измеримый спрос и квалифицированные заявки'
        : isGerman
          ? 'Messbare Nachfrage und qualifizierte Anfragen'
          : 'Measurable demand and qualified inquiries'
    },
    {
      key: 'individuell',
      href: '/leistungen/pakete/individuelles-paket',
      title: isRussian ? 'Индивидуальный пакет' : isGerman ? 'Individuelles Paket' : 'Custom Package',
      description: isRussian
        ? 'Максимальная точность для сложных требований'
        : isGerman
          ? 'Maximale Passgenauigkeit für komplexe Anforderungen'
          : 'Maximum precision for complex requirements'
    },
  ]

  // About us sub-pages
  const aboutPages: Array<{ key: string; href: StaticAppPathname; title: string; description: string }> = [
    {
      key: 'team',
      href: '/ueber-uns/team',
      title: isRussian ? 'Команда' : isGerman ? 'Team' : 'Team',
      description: isRussian ? 'Люди, которые берут на себя ответственность' : isGerman ? 'Menschen, die Verantwortung übernehmen' : 'People who take responsibility'
    },
    {
      key: 'kultur',
      href: '/ueber-uns/kultur',
      title: isRussian ? 'Культура' : isGerman ? 'Kultur' : 'Culture',
      description: isRussian ? 'Наша рабочая культура и ценности' : isGerman ? 'Unsere Arbeitskultur und Werte' : 'Our work culture and values'
    },
    {
      key: 'werte',
      href: '/ueber-uns/werte',
      title: isRussian ? 'Ценности' : isGerman ? 'Werte' : 'Values',
      description: isRussian ? 'Ценности, которые направляют наши действия' : isGerman ? 'Werte, die unser Handeln leiten' : 'Values that guide our actions'
    },
    {
      key: 'factsFigures',
      href: '/ueber-uns/facts-figures',
      title: isRussian ? 'Факты и цифры' : isGerman ? 'Facts & Figures' : 'Facts & Figures',
      description: isRussian ? 'Цифры и факты о GoldenWing' : isGerman ? 'Zahlen und Fakten zu GoldenWing' : 'Numbers and facts about GoldenWing'
    },
  ]

  // References by service - matching new 6 services structure
  const referenzenByService: Array<{ href: StaticAppPathname; title: string }> = [
    { href: '/referenzen/branding', title: isRussian ? 'Брендинг' : isGerman ? 'Branding' : 'Branding' },
    { href: '/referenzen/webdesign', title: isRussian ? 'Веб-дизайн' : isGerman ? 'Webdesign' : 'Web Design' },
    { href: '/referenzen/marketing', title: isRussian ? 'Цифровой маркетинг' : isGerman ? 'Digital Marketing' : 'Digital Marketing' },
    { href: '/referenzen/seo', title: isRussian ? 'SEO и контент' : isGerman ? 'SEO & Content' : 'SEO & Content' },
    { href: '/referenzen/entwicklung', title: isRussian ? 'Веб- и приложения' : isGerman ? 'Web- & App-Entwicklung' : 'Web & App Development' },
    { href: '/referenzen/it-cloud', title: isRussian ? 'IT и облако' : isGerman ? 'IT & Cloud' : 'IT & Cloud' },
  ]

  // References by industry
  const referenzenByIndustry: Array<{ href: StaticAppPathname; title: string }> = [
    { href: '/referenzen/industrie', title: isRussian ? 'Промышленность' : isGerman ? 'Industrie & Fertigung' : 'Industry & Manufacturing' },
    { href: '/referenzen/technologie', title: isRussian ? 'Технологии и SaaS' : isGerman ? 'Technologie & SaaS' : 'Technology & SaaS' },
    { href: '/referenzen/e-commerce', title: isRussian ? 'E-Commerce и ритейл' : isGerman ? 'E-Commerce & Retail' : 'E-Commerce & Retail' },
    { href: '/referenzen/dienstleistung', title: isRussian ? 'Услуги и консалтинг' : isGerman ? 'Dienstleistung & Beratung' : 'Services & Consulting' },
  ]

  // Free Tools (3 combined tools)
  const tools: Array<{ href: string; title: string; description: string }> = [
    {
      href: '/tools/seo-performance',
      title: isRussian ? 'SEO и производительность' : isGerman ? 'SEO & Performance' : 'SEO & Performance',
      description: isRussian ? 'Мета-теги, структура, Core Web Vitals и скорость загрузки' : isGerman ? 'Meta-Tags, Struktur, Core Web Vitals & Ladezeiten' : 'Meta tags, structure, Core Web Vitals & load times',
    },
    {
      href: '/tools/website-design',
      title: isRussian ? 'Сайт и дизайн' : isGerman ? 'Website & Design' : 'Website & Design',
      description: isRussian ? 'Mobile-Friendliness, Social превью и UX-анализ' : isGerman ? 'Mobile-Friendliness, Social Previews & UX-Analyse' : 'Mobile friendliness, social previews & UX analysis',
    },
    {
      href: '/tools/security',
      title: isRussian ? 'Проверка безопасности' : isGerman ? 'Security Check' : 'Security Check',
      description: isRussian ? 'SSL, HTTPS, заголовки безопасности и уязвимости' : isGerman ? 'SSL, HTTPS, Security Headers & Schwachstellen' : 'SSL, HTTPS, security headers & vulnerabilities',
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ contain: 'layout style', height: '65px' }}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo - Fixed dimensions to prevent CLS */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="GoldenWing 360°"
            width={160}
            height={32}
            className="h-8 w-[160px] dark:hidden"
            priority
          />
          <Image
            src="/logo-light.svg"
            alt="GoldenWing 360°"
            width={160}
            height={32}
            className="h-8 w-[160px] hidden dark:block"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Leistungen Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('services')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[700px] p-4">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Services */}
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {isRussian ? 'Услуги' : isGerman ? 'Services' : 'Services'}
                      </span>
                      <ul className="space-y-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/leistungen"
                              className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                            >
                              <div className="text-sm font-medium">
                                {isRussian ? 'Все услуги' : isGerman ? 'Alle Leistungen' : 'All Services'}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {services.map((service) => (
                          <li key={service.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={service.href}
                                className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                              >
                                <div className="text-sm font-medium">{service.title}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Service-Pakete */}
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {isRussian ? 'Пакеты услуг' : isGerman ? 'Service-Pakete' : 'Service Packages'}
                      </span>
                      <ul className="space-y-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/leistungen/pakete"
                              className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                            >
                              <div className="text-sm font-medium">
                                {isRussian ? 'Все пакеты' : isGerman ? 'Alle Pakete' : 'All Packages'}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {servicePakete.map((paket) => (
                          <li key={paket.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={paket.href}
                                className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                              >
                                <div className="text-sm font-medium">{paket.title}</div>
                                <p className="line-clamp-1 text-xs text-muted-foreground">
                                  {paket.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Referenzen Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{isRussian ? 'Портфолио' : isGerman ? 'Referenzen' : 'References'}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[600px] p-4">
                  {/* Alle Referenzen - Standalone at top */}
                  <NavigationMenuLink asChild>
                    <Link
                      href="/referenzen"
                      className="block select-none rounded-md p-3 mb-4 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted border-b pb-4"
                    >
                      <div className="text-sm font-semibold">
                        {isRussian ? 'Все проекты' : isGerman ? 'Alle Referenzen' : 'All References'}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isRussian ? 'Все проекты и работы для клиентов' : isGerman ? 'Alle Projekte und Kundenarbeiten' : 'All projects and client work'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Nach Service */}
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {isRussian ? 'По услугам' : isGerman ? 'Nach Service' : 'By Service'}
                      </span>
                      <ul className="space-y-1">
                        {referenzenByService.map((ref) => (
                          <li key={ref.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={ref.href}
                                className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                              >
                                <div className="text-sm font-medium">{ref.title}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Nach Industrie */}
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {isRussian ? 'По отрасли' : isGerman ? 'Nach Industrie' : 'By Industry'}
                      </span>
                      <ul className="space-y-1">
                        {referenzenByIndustry.map((ref) => (
                          <li key={ref.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={ref.href}
                                className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                              >
                                <div className="text-sm font-medium">{ref.title}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Über uns Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('about')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/ueber-uns"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                      >
                        <div className="text-sm font-medium leading-none">
                          {isRussian ? 'О GoldenWing' : isGerman ? 'Über GoldenWing' : 'About GoldenWing'}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {isRussian ? 'Узнайте больше о нас' : isGerman ? 'Erfahren Sie mehr über uns' : 'Learn more about us'}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {aboutPages.map((page) => (
                    <li key={page.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={page.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium leading-none">{page.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {page.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Tools Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{isRussian ? 'Инструменты' : isGerman ? 'Tools' : 'Tools'}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4">
                  <li className="border-b pb-3 mb-2">
                    <NavigationMenuLink asChild>
                      <a
                        href={`/${locale}/tools`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                      >
                        <div className="text-sm font-semibold leading-none">
                          {isRussian ? 'Все инструменты' : isGerman ? 'Alle Tools' : 'All Tools'}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {isRussian ? 'Бесплатные инструменты для анализа сайта' : isGerman ? 'Kostenlose Website-Analyse Tools' : 'Free website analysis tools'}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {tools.map((tool) => (
                    <li key={tool.href}>
                      <NavigationMenuLink asChild>
                        <a
                          href={`/${locale}${tool.href}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium leading-none">
                            {tool.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {tool.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Kontakt Direct Link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/kontakt"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  {isRussian ? 'Контакт' : isGerman ? 'Kontakt' : 'Contact'}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA & Language/Theme Switcher */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Link href="/kontakt">
            <Button>{tCommon('projectStart')}</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">{tAccessibility('openMenu')}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Hauptnavigation der Website</SheetDescription>

            {/* Header mit Logo - Fixed dimensions to prevent CLS */}
            <div className="flex items-center justify-between p-6 border-b">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo.svg"
                  alt="GoldenWing 360°"
                  width={140}
                  height={28}
                  className="h-7 w-[140px] dark:hidden"
                />
                <Image
                  src="/logo-light.svg"
                  alt="GoldenWing 360°"
                  width={140}
                  height={28}
                  className="h-7 w-[140px] hidden dark:block"
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
              {/* Leistungen Section */}
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'services' ? null : 'services')}
                  aria-expanded={mobileSubmenu === 'services'}
                  aria-controls="mobile-services-menu"
                  aria-label={mobileSubmenu === 'services'
                    ? tAccessibility('collapseSubmenu', { menu: t('services') })
                    : tAccessibility('expandSubmenu', { menu: t('services') })}
                >
                  {t('services')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenu === 'services' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {mobileSubmenu === 'services' && (
                  <div id="mobile-services-menu" className="pl-4 space-y-3 border-l border-border ml-2">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 mt-2">
                        Services
                      </span>
                      <Link
                        href="/leistungen"
                        className="block py-1.5 text-sm font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {isRussian ? 'Все услуги' : isGerman ? 'Alle Leistungen' : 'All Services'}
                      </Link>
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block py-1.5 text-sm hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        {isRussian ? 'Пакеты' : isGerman ? 'Pakete' : 'Packages'}
                      </span>
                      <Link
                        href="/leistungen/pakete"
                        className="block py-1.5 text-sm font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {isRussian ? 'Все пакеты' : isGerman ? 'Alle Pakete' : 'All Packages'}
                      </Link>
                      {servicePakete.map((paket) => (
                        <Link
                          key={paket.href}
                          href={paket.href}
                          className="block py-1.5 text-sm hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {paket.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Referenzen Section */}
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'references' ? null : 'references')}
                  aria-expanded={mobileSubmenu === 'references'}
                  aria-controls="mobile-references-menu"
                  aria-label={mobileSubmenu === 'references'
                    ? tAccessibility('collapseSubmenu', { menu: isRussian ? 'Портфолио' : isGerman ? 'Referenzen' : 'References' })
                    : tAccessibility('expandSubmenu', { menu: isRussian ? 'Портфолио' : isGerman ? 'Referenzen' : 'References' })}
                >
                  {isRussian ? 'Портфолио' : isGerman ? 'Referenzen' : 'References'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenu === 'references' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {mobileSubmenu === 'references' && (
                  <div id="mobile-references-menu" className="pl-4 border-l border-border ml-2">
                    {/* Alle Referenzen - Standalone at very top */}
                    <div className="standalone-all-refs mb-4 pb-3 border-b border-border">
                      <Link
                        href="/referenzen"
                        className="block py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {isRussian ? 'Все проекты' : isGerman ? 'Alle Referenzen' : 'All References'}
                      </Link>
                    </div>
                    {/* Nach Service */}
                    <div className="mb-4">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        {isRussian ? 'По услугам' : isGerman ? 'Nach Service' : 'By Service'}
                      </span>
                      {referenzenByService.map((ref) => (
                        <Link
                          key={ref.title}
                          href={ref.href}
                          className="block py-1.5 text-sm hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {ref.title}
                        </Link>
                      ))}
                    </div>
                    {/* Nach Industrie */}
                    <div className="pt-3 border-t border-border">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        {isRussian ? 'По отрасли' : isGerman ? 'Nach Industrie' : 'By Industry'}
                      </span>
                      {referenzenByIndustry.map((ref) => (
                        <Link
                          key={ref.title}
                          href={ref.href}
                          className="block py-1.5 text-sm hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {ref.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Über uns Section */}
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'about' ? null : 'about')}
                  aria-expanded={mobileSubmenu === 'about'}
                  aria-controls="mobile-about-menu"
                  aria-label={mobileSubmenu === 'about'
                    ? tAccessibility('collapseSubmenu', { menu: t('about') })
                    : tAccessibility('expandSubmenu', { menu: t('about') })}
                >
                  {t('about')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenu === 'about' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {mobileSubmenu === 'about' && (
                  <div id="mobile-about-menu" className="pl-4 space-y-1 border-l border-border ml-2">
                    <Link
                      href="/ueber-uns"
                      className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {isRussian ? 'Обзор' : isGerman ? 'Übersicht' : 'Overview'}
                    </Link>
                    {aboutPages.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="block py-2 text-sm hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {page.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Tools Section */}
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'tools' ? null : 'tools')}
                  aria-expanded={mobileSubmenu === 'tools'}
                  aria-controls="mobile-tools-menu"
                  aria-label={mobileSubmenu === 'tools'
                    ? tAccessibility('collapseSubmenu', { menu: 'Tools' })
                    : tAccessibility('expandSubmenu', { menu: 'Tools' })}
                >
                  Tools
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenu === 'tools' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {mobileSubmenu === 'tools' && (
                  <div id="mobile-tools-menu" className="pl-4 space-y-1 border-l border-border ml-2">
                    <a
                      href={`/${locale}/tools`}
                      className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {isRussian ? 'Все инструменты' : isGerman ? 'Alle Tools' : 'All Tools'}
                    </a>
                    {tools.map((tool) => (
                      <a
                        key={tool.href}
                        href={`/${locale}${tool.href}`}
                        className="block py-2 text-sm hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {tool.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Kontakt Direct Link */}
              <Link
                href="/kontakt"
                className="flex items-center py-3 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isRussian ? 'Контакт' : isGerman ? 'Kontakt' : 'Contact'}
              </Link>

              {/* Theme, Language Switcher & CTA Button */}
              <div className="mt-6 pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{isRussian ? 'Тема' : isGerman ? 'Design' : 'Theme'}</span>
                  <ThemeSwitcher />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{tLanguages('switchLanguage')}</span>
                  <LanguageSwitcher />
                </div>
                <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" size="lg">
                    {tCommon('projectStart')}
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
