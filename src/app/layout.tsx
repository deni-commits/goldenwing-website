import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'),
  title: {
    default: 'GoldenWing Creative Studios | Marketing & Branding Agentur Wien',
    template: '%s | GoldenWing Creative Studios',
  },
  description:
    'GoldenWing Creative Studios ist eine Wiener Marketing- und Branding-Agentur. Wir entwickeln Websites, SEO-Strategien, Markenidentitaeten und digitale Kampagnen.',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    siteName: 'GoldenWing Creative Studios',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-white text-dark antialiased">{children}</body>
    </html>
  )
}
