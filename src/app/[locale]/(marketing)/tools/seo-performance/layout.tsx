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
      ? 'Kostenloser SEO & Performance Check | Website-Analyse Tool'
      : 'Free SEO & Performance Check | Website Analysis Tool',
    description: isGerman
      ? 'Kombinierte SEO- und Performance-Analyse Ihrer Website. Prüfen Sie Meta-Tags, Core Web Vitals, Ladezeiten und mehr. Kostenlos und ohne Registrierung.'
      : 'Combined SEO and performance analysis of your website. Check meta tags, Core Web Vitals, loading times and more. Free and without registration.',
    keywords: isGerman
      ? ['SEO Check', 'Performance Test', 'Website Analyse', 'Core Web Vitals', 'Ladezeit prüfen', 'kostenloser Website Check']
      : ['SEO Check', 'Performance Test', 'Website Analysis', 'Core Web Vitals', 'Loading Time Check', 'Free Website Check'],
    openGraph: {
      title: isGerman
        ? 'Kostenloser SEO & Performance Check | GoldenWing 360°'
        : 'Free SEO & Performance Check | GoldenWing 360°',
      description: isGerman
        ? 'Kombinierte SEO- und Performance-Analyse. Kostenlos und ohne Registrierung.'
        : 'Combined SEO and performance analysis. Free and without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/seo-performance' : '/en/tools/seo-performance',
      languages: {
        'de': '/tools/seo-performance',
        'en': '/en/tools/seo-performance',
      },
    },
  }
}

export default function SeoPerformanceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
