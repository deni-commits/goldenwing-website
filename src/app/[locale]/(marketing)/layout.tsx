import { Suspense } from 'react'
import type { Metadata } from "next"
import { Inter, Bricolage_Grotesque, Space_Mono } from "next/font/google"
import dynamic from 'next/dynamic'
import { Toaster } from "@/components/ui/sonner"
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CookieBanner } from '@/components/cookie-banner'

// Lazy load ChatWidget to reduce initial JS bundle and improve TBT
const ChatWidget = dynamic(
  () => import('@/components/ai/chat-widget').then(mod => ({ default: mod.ChatWidget }))
)

// Lazy load ExitIntentPopup - only needed after initial page load
const ExitIntentPopup = dynamic(
  () => import('@/components/exit-intent-popup').then(mod => ({ default: mod.ExitIntentPopup }))
)
import { SkipToContent } from '@/components/layout/skip-to-content'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
// NOTE: Hreflang tags are handled by individual page metadata.alternates
// Do NOT use HreflangTags component to avoid duplicates
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { AhrefsAnalytics } from '@/components/analytics/ahrefs-analytics'
import { HotjarAnalytics } from '@/components/analytics/hotjar-analytics'
import "../../globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'

  // Base metadata shared between locales
  const baseMetadata = {
    authors: [{ name: 'GoldenWing Creative Studios' }],
    creator: 'GoldenWing Creative Studios',
    publisher: 'GoldenWing Creative Studios',
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    // Theme color for mobile browsers
    other: {
      'theme-color': '#0a0a0a',
      'msapplication-TileColor': '#0a0a0a',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
    // NOTE: Hreflang tags are handled by the <HreflangTags /> component
    // which provides page-specific translations (e.g. /leistungen → /services)
    // Do NOT add alternates here to avoid duplicates
  }

  const metadataByLocale: Record<string, Metadata> = {
    de: {
      ...baseMetadata,
      metadataBase: new URL('https://goldenwing.at'),
      title: {
        default: 'GoldenWing Creative Studios | Branding & Webdesign Wien',
        template: '%s',
      },
      description: 'Kreativagentur für Branding, Webdesign und digitales Marketing in Wien.',
      keywords: ['Webdesign Wien', 'Branding Agentur', 'SEO Wien', 'Kreativagentur'],
      openGraph: {
        type: 'website',
        locale: 'de_AT',
        siteName: 'GoldenWing Creative Studios',
        images: [
          {
            url: 'https://goldenwing.at/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'GoldenWing Creative Studios - Kreativagentur Wien',
          },
        ],
      },
    },
    en: {
      ...baseMetadata,
      metadataBase: new URL('https://goldenwing.at'),
      title: {
        default: 'GoldenWing Creative Studios | Branding & Web Design',
        template: '%s',
      },
      description: 'Creative agency for branding, web design, and digital marketing.',
      keywords: ['Web Design', 'Branding Agency', 'SEO', 'Creative Studio'],
      openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'GoldenWing Creative Studios',
        images: [
          {
            url: 'https://goldenwing.at/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'GoldenWing Creative Studios - Creative Agency Vienna',
          },
        ],
      },
    },
  }

  return metadataByLocale[locale] || metadataByLocale.de
}

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins for faster LCP */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preload logo for faster header rendering */}
        <link rel="preload" href="/logo-light.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${bricolage.variable} ${spaceMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SkipToContent />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                <Suspense fallback={null}>
                  {children}
                </Suspense>
              </main>
              <Footer localeOverride={locale as 'de' | 'en' | 'ru'} />
              <ChatWidget />
              <ExitIntentPopup />
              <CookieBanner />
              <GoogleAnalytics />
              <AhrefsAnalytics />
              <HotjarAnalytics />
            </div>
            <Toaster position="top-center" />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
