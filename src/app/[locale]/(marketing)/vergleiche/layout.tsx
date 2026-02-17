import { Metadata } from 'next'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'

const SITE_URL = 'https://goldenwing.at'

// All comparison pages for ItemList schema
const comparisonItems = [
  { name: 'Beste SEO Agenturen Wien', url: '/beste-seo-agenturen-wien' },
  { name: 'Beste SEO Agenturen Österreich', url: '/beste-seo-agenturen-oesterreich' },
  { name: 'Beste Online Marketing Agenturen Wien', url: '/beste-online-marketing-agenturen-wien' },
  { name: 'Beste Google Ads Agenturen Wien', url: '/beste-google-ads-agenturen-wien' },
  { name: 'Beste Content Marketing Agenturen Wien', url: '/beste-content-marketing-agenturen-wien' },
  { name: 'Beste Social Media Agenturen Wien', url: '/beste-social-media-agenturen-wien' },
  { name: 'Beste Webdesign Agenturen Wien', url: '/beste-webdesign-agenturen-wien' },
  { name: 'Beste Kreativagenturen Wien', url: '/beste-kreativagenturen-wien' },
  { name: 'Beste Branding Agenturen Wien', url: '/beste-branding-agenturen-wien' },
  { name: 'Beste Grafikdesign Agenturen Wien', url: '/beste-grafikdesign-agenturen-wien' },
  { name: 'Beste WordPress Agenturen Wien', url: '/beste-wordpress-agenturen-wien' },
  { name: 'Beste App Entwicklung Agenturen Wien', url: '/beste-app-entwicklung-agenturen-wien' },
  { name: 'Beste E-Commerce Agenturen Wien', url: '/beste-ecommerce-agenturen-wien' },
  { name: 'Beste Onlineshop Agenturen Wien', url: '/beste-onlineshop-agenturen-wien' },
  { name: 'Beste Digital Marketing Agenturen Wien', url: '/beste-digital-marketing-agenturen-wien' },
  { name: 'Beste Website Relaunch Agenturen', url: '/beste-website-relaunch-agenturen' },
  { name: 'Beste SEO Agenturen für Ärzte', url: '/beste-seo-agenturen-fuer-aerzte' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const hreflangAlternates = getHreflangAlternates('/vergleiche', locale)
  const canonicalUrl = getCanonicalUrl('/vergleiche', locale)

  const titles = {
    de: 'Agenturvergleiche Wien 2026 | Beste Agenturen im Überblick',
    en: 'Agency Comparisons Vienna 2026 | Best Agencies Overview',
    ru: 'Сравнение агентств Вена 2026 | Обзор лучших агентств',
  }

  const descriptions = {
    de: 'Unabhängige Vergleiche der besten Agenturen in Wien: SEO, Webdesign, Branding, Google Ads & mehr. 17 Rankings basierend auf Bewertungen & Expertise.',
    en: 'Independent comparisons of the best agencies in Vienna: SEO, web design, branding, Google Ads & more. 17 rankings based on reviews & expertise.',
    ru: 'Независимые сравнения лучших агентств Вены: SEO, веб-дизайн, брендинг, Google Ads и другие. 17 рейтингов на основе отзывов и экспертизы.',
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.de,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.de,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.de,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.de,
      url: canonicalUrl,
      type: 'website',
    },
  }
}

export default function VergleicheLayout({ children }: { children: React.ReactNode }) {
  // ItemList Schema for collection of comparison pages
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Agenturvergleiche Wien 2026',
    description: 'Unabhängige Vergleiche der besten Agenturen in Wien für SEO, Webdesign, Branding und mehr.',
    url: `${SITE_URL}/vergleiche`,
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: comparisonItems.length,
      itemListElement: comparisonItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}${item.url}`,
      })),
    },
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Vergleiche', item: `${SITE_URL}/vergleiche` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
