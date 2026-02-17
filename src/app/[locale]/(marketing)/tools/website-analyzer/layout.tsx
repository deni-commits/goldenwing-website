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
      ? 'Kostenlose Website Analyse | SEO, Performance, Design & Security'
      : 'Free Website Analysis | SEO, Performance, Design & Security',
    description: isGerman
      ? 'Umfassende Website-Analyse kostenlos: SEO-Check, Performance-Test, Design-Prüfung und Security-Audit in einem Tool. Detaillierter Report mit Empfehlungen.'
      : 'Comprehensive website analysis for free: SEO check, performance test, design review and security audit in one tool. Detailed report with recommendations.',
    keywords: isGerman
      ? ['Website Analyse', 'Site Audit', 'SEO Performance Check', 'Website Test', 'Webseiten Analyse', 'Full Website Audit', 'Website Scanner']
      : ['Website Analysis', 'Site Audit', 'SEO Performance Check', 'Website Test', 'Web Page Analysis', 'Full Website Audit', 'Website Scanner'],
    openGraph: {
      title: isGerman
        ? 'Kostenlose Website Analyse | GoldenWing 360°'
        : 'Free Website Analysis | GoldenWing 360°',
      description: isGerman
        ? 'Umfassende Website-Analyse: SEO, Performance, Design und Security. Kostenlos und ohne Registrierung.'
        : 'Comprehensive website analysis: SEO, Performance, Design and Security. Free and without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/website-analyzer' : '/en/tools/website-analyzer',
      languages: {
        'de': '/tools/website-analyzer',
        'en': '/en/tools/website-analyzer',
      },
    },
  }
}

export default function WebsiteAnalyzerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
