import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const isGerman = locale === 'de'

  return {
    title: isGerman
      ? 'Kostenloser Cyber Security Check | SSL, Headers & Sicherheitsanalyse'
      : 'Free Cyber Security Check | SSL, Headers & Security Analysis',
    description: isGerman
      ? 'Umfassende Sicherheitsanalyse Ihrer Website. Prüfen Sie SSL-Zertifikate, Security Headers, HTTPS-Konfiguration und mehr. Kostenlos und ohne Registrierung.'
      : 'Comprehensive security analysis of your website. Check SSL certificates, security headers, HTTPS configuration and more. Free and without registration.',
    keywords: isGerman
      ? ['Security Check', 'SSL Test', 'Website Sicherheit', 'Security Headers', 'HTTPS prüfen', 'Cyber Security Analyse']
      : ['Security Check', 'SSL Test', 'Website Security', 'Security Headers', 'HTTPS Check', 'Cyber Security Analysis'],
    openGraph: {
      title: isGerman
        ? 'Kostenloser Cyber Security Check | GoldenWing 360°'
        : 'Free Cyber Security Check | GoldenWing 360°',
      description: isGerman
        ? 'Umfassende Sicherheitsanalyse Ihrer Website. Kostenlos und ohne Registrierung.'
        : 'Comprehensive security analysis of your website. Free and without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/security' : '/en/tools/security',
      languages: {
        'de': '/tools/security',
        'en': '/en/tools/security',
      },
    },
  }
}

export default function SecurityLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
