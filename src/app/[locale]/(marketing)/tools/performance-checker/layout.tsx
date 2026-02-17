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
      ? 'Kostenloser Website Speed Test | Core Web Vitals & Ladezeit'
      : 'Free Website Speed Test | Core Web Vitals & Load Time',
    description: isGerman
      ? 'Testen Sie die Geschwindigkeit Ihrer Website kostenlos. Messen Sie Core Web Vitals (LCP, FCP, CLS), Ladezeiten und Performance-Metriken. Powered by Google PageSpeed.'
      : 'Test your website speed for free. Measure Core Web Vitals (LCP, FCP, CLS), load times and performance metrics. Powered by Google PageSpeed.',
    keywords: isGerman
      ? ['Website Speed Test', 'Core Web Vitals', 'LCP Test', 'PageSpeed Test', 'Ladezeit messen', 'Performance Check', 'FCP CLS Analyse']
      : ['Website Speed Test', 'Core Web Vitals', 'LCP Test', 'PageSpeed Test', 'Load Time Check', 'Performance Check', 'FCP CLS Analysis'],
    openGraph: {
      title: isGerman
        ? 'Kostenloser Website Speed Test | GoldenWing 360°'
        : 'Free Website Speed Test | GoldenWing 360°',
      description: isGerman
        ? 'Messen Sie Core Web Vitals und Ladezeiten Ihrer Website. Kostenlos und ohne Registrierung.'
        : 'Measure Core Web Vitals and load times of your website. Free and without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/performance-checker' : '/en/tools/performance-checker',
      languages: {
        'de': '/tools/performance-checker',
        'en': '/en/tools/performance-checker',
      },
    },
  }
}

export default function PerformanceCheckerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
