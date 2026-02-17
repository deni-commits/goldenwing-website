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
      ? 'Kostenloser Design Check | Mobile-Friendly Test & Social Preview'
      : 'Free Design Analyzer | Mobile-Friendly Test & Social Preview',
    description: isGerman
      ? 'Prüfen Sie das Design Ihrer Website kostenlos. Mobile-Friendly Test, Open Graph Preview, Favicon Check und mehr. Sehen Sie wie Ihre Website auf Social Media aussieht.'
      : 'Check your website design for free. Mobile-Friendly Test, Open Graph Preview, Favicon Check and more. See how your website looks on social media.',
    keywords: isGerman
      ? ['Mobile Friendly Test', 'Open Graph Preview', 'Favicon Check', 'Social Media Preview', 'Design Check', 'Responsive Test', 'OG Image Prüfung']
      : ['Mobile Friendly Test', 'Open Graph Preview', 'Favicon Check', 'Social Media Preview', 'Design Check', 'Responsive Test', 'OG Image Check'],
    openGraph: {
      title: isGerman
        ? 'Kostenloser Design Check | GoldenWing 360°'
        : 'Free Design Analyzer | GoldenWing 360°',
      description: isGerman
        ? 'Prüfen Sie Mobile-Optimierung und Social Media Previews. Kostenlos und ohne Registrierung.'
        : 'Check mobile optimization and social media previews. Free and without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/design-analyzer' : '/en/tools/design-analyzer',
      languages: {
        'de': '/tools/design-analyzer',
        'en': '/en/tools/design-analyzer',
      },
    },
  }
}

export default function DesignAnalyzerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
