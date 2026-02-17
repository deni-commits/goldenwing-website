import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import Image from 'next/image'
import { Linkedin, Instagram, Facebook, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { headers } from 'next/headers'

// Helper to extract locale from URL path (fallback for notFound pages)
async function getLocaleFromHeaders(): Promise<'de' | 'en' | 'ru'> {
  try {
    const headersList = await headers()
    const possibleUrls = [
      headersList.get('x-url'),
      headersList.get('x-invoke-path'),
      headersList.get('x-matched-path'),
      headersList.get('referer'),
      headersList.get('x-pathname'),
    ]
    for (const url of possibleUrls) {
      if (url) {
        if (url.includes('/ru/') || url.includes('/ru') || url.startsWith('ru/')) return 'ru'
        if (url.includes('/en/') || url.includes('/en') || url.startsWith('en/')) return 'en'
      }
    }
  } catch {
    // Headers not available, fall back to default
  }
  return 'de'
}

// 6 Main Services
const serviceKeys: Array<{ key: string; href: StaticAppPathname }> = [
  { key: 'branding', href: '/leistungen/branding' },
  { key: 'webdesign', href: '/leistungen/webdesign' },
  { key: 'digitalMarketing', href: '/leistungen/digital-marketing' },
  { key: 'seoContent', href: '/leistungen/seo-content' },
  { key: 'webAppDevelopment', href: '/leistungen/web-app-entwicklung' },
  { key: 'itCloudServices', href: '/leistungen/it-cloud-services' },
   
  { key: 'geoOptimierung', href: '/leistungen/geo-optimierung' as StaticAppPathname },
]

const companyLinks: Array<{ key?: string; label?: string; href: StaticAppPathname }> = [
  { key: 'about', href: '/ueber-uns' },
  { key: 'references', href: '/referenzen' },
  { key: 'blog', href: '/blog' },
  { label: 'Lexikon', href: '/lexikon' },
  { key: 'contact', href: '/kontakt' },
  { label: 'FAQ', href: '/haeufige-fragen' },
]

// Service packages
const packageLinks: Array<{ labelDe: string; labelEn: string; labelRu: string; href: StaticAppPathname }> = [
  { labelDe: 'Brand & Web Foundation', labelEn: 'Brand & Web Foundation', labelRu: 'Бренд и веб-основа', href: '/leistungen/pakete/brand-web-foundation' },
  { labelDe: 'SEO & Content Growth', labelEn: 'SEO & Content Growth', labelRu: 'SEO и контент-рост', href: '/leistungen/pakete/seo-content-growth' },
  { labelDe: 'Demand Gen Suite', labelEn: 'Demand Gen Suite', labelRu: 'Demand Gen Suite', href: '/leistungen/pakete/demand-gen-suite' },
  { labelDe: 'Individuelles Paket', labelEn: 'Custom Package', labelRu: 'Индивидуальный пакет', href: '/leistungen/pakete/individuelles-paket' },
]

const legalKeys: Array<{ key: string; href: StaticAppPathname }> = [
  { key: 'imprint', href: '/impressum' },
  { key: 'privacy', href: '/datenschutz' },
  { key: 'cookies', href: '/rechtliches/cookie-einstellungen' },
]

interface FooterProps {
  localeOverride?: 'de' | 'en' | 'ru'
}

export async function Footer({ localeOverride }: FooterProps = {}) {
  let locale = localeOverride || await getLocale()

  // On notFound pages, getLocale() may return 'de' even for /ru/ or /en/ URLs
  if (!localeOverride) {
    const urlLocale = await getLocaleFromHeaders()
    if (urlLocale !== 'de' && locale === 'de') {
      locale = urlLocale
    }
  }

  const isRussian = locale === 'ru'
  const isGerman = locale === 'de'
  const t = await getTranslations({ locale, namespace: 'footer' })
  const tServices = await getTranslations({ locale, namespace: 'services' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const tLocations = await getTranslations({ locale, namespace: 'locations' })
  const tAccessibility = await getTranslations({ locale, namespace: 'accessibility' })

  // Location links - DACH + International
  const locationLinks: Array<{ labelDe: string; labelEn: string; labelRu: string; href: StaticAppPathname }> = [
    // Österreich
    { labelDe: 'Wien', labelEn: 'Vienna', labelRu: 'Вена', href: '/standorte/wien' },
    { labelDe: 'Graz', labelEn: 'Graz', labelRu: 'Грац', href: '/standorte/graz' },
    { labelDe: 'Linz', labelEn: 'Linz', labelRu: 'Линц', href: '/standorte/linz' },
    { labelDe: 'Salzburg', labelEn: 'Salzburg', labelRu: 'Зальцбург', href: '/standorte/salzburg' },
    { labelDe: 'Innsbruck', labelEn: 'Innsbruck', labelRu: 'Инсбрук', href: '/standorte/innsbruck' },
    // Deutschland
    { labelDe: 'München', labelEn: 'Munich', labelRu: 'Мюнхен', href: '/standorte/muenchen' },
    { labelDe: 'Berlin', labelEn: 'Berlin', labelRu: 'Берлин', href: '/standorte/berlin' },
    // Schweiz
    { labelDe: 'Zürich', labelEn: 'Zurich', labelRu: 'Цюрих', href: '/standorte/zuerich' },
  ]

  return (
    <footer className="border-t bg-muted/50" style={{ contain: 'layout style paint' }}>
      <div className="container py-12 md:py-16">
        {/* Main Grid - 5 columns on xl, 3 on lg, 2 on md */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand & Contact */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="GoldenWing 360°"
                width={140}
                height={28}
                className="h-7 w-[140px] dark:hidden"
                priority
              />
              <Image
                src="/logo-light.svg"
                alt="GoldenWing 360°"
                width={140}
                height={28}
                className="h-7 w-[140px] hidden dark:block"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('slogan')}
            </p>
            <nav aria-label={tAccessibility('socialLinks')} className="flex gap-3">
              <a
                href="https://www.facebook.com/goldenwing.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={tAccessibility('visitFacebook')}
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/goldenwing.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={tAccessibility('visitInstagram')}
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/goldenwing-creative-studios/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={tAccessibility('visitLinkedin')}
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/message/DTMCVZBIQJ3FH1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={tAccessibility('visitWhatsapp')}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>

            {/* Contact Info */}
            <address className="pt-2 space-y-2 not-italic">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>deni@goldenwing.at</span>
              </div>
              <a
                href="tel:+436645439681"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={tAccessibility('callPhone', { phone: '+43 664 543 96 81' })}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                +43 664 543 96 81
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" aria-hidden="true" />
                <span>Czeikestrasse 4/21<br />1100 Wien</span>
              </div>
            </address>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {serviceKeys.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tServices(`${item.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Packages */}
          <div>
            <h3 className="font-semibold mb-4">{isRussian ? 'Пакеты' : isGerman ? 'Pakete' : 'Packages'}</h3>
            <ul className="space-y-2">
              {packageLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isRussian ? item.labelRu : isGerman ? item.labelDe : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.key ? tNav(item.key) : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standorte */}
          <div>
            <h3 className="font-semibold mb-4">{tLocations('title')}</h3>
            <ul className="space-y-2">
              {locationLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isRussian ? item.labelRu : isGerman ? item.labelDe : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-4">
            {legalKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
