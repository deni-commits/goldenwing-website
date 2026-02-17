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
      ? 'Kostenloser SEO Check | Meta-Tags, Headings & Schema Analyse'
      : 'Free SEO Checker | Meta Tags, Headings & Schema Analysis',
    description: isGerman
      ? 'Analysieren Sie Ihre Website kostenlos auf SEO-Probleme. Prüfen Sie Meta-Tags, Überschriften, Alt-Texte, Schema Markup, Sitemap und mehr. Sofort-Ergebnis ohne Registrierung.'
      : 'Analyze your website for SEO issues for free. Check meta tags, headings, alt texts, schema markup, sitemap and more. Instant results without registration.',
    keywords: isGerman
      ? ['SEO Check', 'Meta Tags prüfen', 'Website SEO Analyse', 'kostenloser SEO Test', 'Meta Description Check', 'Heading Struktur', 'Schema Markup Checker']
      : ['SEO Check', 'Meta Tags Checker', 'Website SEO Analysis', 'Free SEO Test', 'Meta Description Check', 'Heading Structure', 'Schema Markup Checker'],
    openGraph: {
      title: isGerman
        ? 'Kostenloser SEO Check | GoldenWing 360°'
        : 'Free SEO Checker | GoldenWing 360°',
      description: isGerman
        ? 'Analysieren Sie Ihre Website kostenlos auf SEO-Probleme. Sofort-Ergebnis ohne Registrierung.'
        : 'Analyze your website for SEO issues for free. Instant results without registration.',
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? '/tools/seo-checker' : '/en/tools/seo-checker',
      languages: {
        'de': '/tools/seo-checker',
        'en': '/en/tools/seo-checker',
      },
    },
  }
}

export default function SeoCheckerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
