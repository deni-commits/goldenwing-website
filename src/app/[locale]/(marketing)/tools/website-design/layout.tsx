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
      ? 'Kostenloser Website Design Check | UX, Responsive & Accessibility'
      : 'Free Website Design Check | UX, Responsive & Accessibility',
    description: isGerman
      ? 'Analysieren Sie das Design Ihrer Website. Prüfen Sie Responsive Design, Accessibility, Farbkontraste, Typografie und mehr. Kostenlos und ohne Registrierung.'
      : 'Analyze your website design. Check responsive design, accessibility, color contrasts, typography and more. Free and without registration.',
    keywords: isGerman
      ? ['Design Check', 'Website Analyse', 'UX Audit', 'Responsive Test', 'Accessibility Check', 'Barrierefreiheit prüfen']
      : ['Design Check', 'Website Analysis', 'UX Audit', 'Responsive Test', 'Accessibility Check', 'WCAG Compliance'],
    openGraph: {
      title: isGerman
        ? 'Kostenloser Website Design Check | GoldenWing 360°'
        : 'Free Website Design Check | GoldenWing 360°',
      description: isGerman
        ? 'Analysieren Sie das Design Ihrer Website. Kostenlos und ohne Registrierung.'
        : 'Analyze your website design. Free and without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/website-design' : '/en/tools/website-design',
      languages: {
        'de': '/tools/website-design',
        'en': '/en/tools/website-design',
      },
    },
  }
}

export default function WebsiteDesignLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
