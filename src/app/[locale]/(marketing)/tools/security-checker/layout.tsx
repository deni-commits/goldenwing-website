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
      ? 'Kostenloser SSL & Security Check | HTTPS & Security Headers'
      : 'Free SSL & Security Check | HTTPS & Security Headers',
    description: isGerman
      ? 'Überprüfen Sie die Sicherheit Ihrer Website kostenlos. SSL-Zertifikat, HTTPS-Konfiguration, Security Headers und Mixed Content Check. Sofort-Ergebnis.'
      : 'Check your website security for free. SSL certificate, HTTPS configuration, security headers and mixed content check. Instant results.',
    keywords: isGerman
      ? ['SSL Check', 'Security Headers Test', 'HTTPS Prüfung', 'Website Sicherheit', 'SSL Zertifikat Check', 'Mixed Content Test', 'CSP Header']
      : ['SSL Check', 'Security Headers Test', 'HTTPS Check', 'Website Security', 'SSL Certificate Check', 'Mixed Content Test', 'CSP Header'],
    openGraph: {
      title: isGerman
        ? 'Kostenloser SSL & Security Check | GoldenWing 360°'
        : 'Free SSL & Security Check | GoldenWing 360°',
      description: isGerman
        ? 'Überprüfen Sie SSL, HTTPS und Security Headers Ihrer Website. Kostenlos und ohne Registrierung.'
        : 'Check SSL, HTTPS and security headers of your website. Free and without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/security-checker' : '/en/tools/security-checker',
      languages: {
        'de': '/tools/security-checker',
        'en': '/en/tools/security-checker',
      },
    },
  }
}

export default function SecurityCheckerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
