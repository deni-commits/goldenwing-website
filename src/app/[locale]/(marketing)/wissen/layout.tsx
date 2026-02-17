import { Metadata } from 'next'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'

const SITE_URL = 'https://goldenwing.at'

// Knowledge hub items for Schema
const knowledgeItems = [
  { name: 'Praxis-Guides', url: '/wissen/guides', description: 'Praktische Anleitungen zu Webdesign, SEO und Online Marketing' },
  { name: 'Webdesign Kosten 2026', url: '/wissen/guides/webdesign-kosten', description: 'Was kostet professionelles Webdesign in Österreich?' },
  { name: 'SEO Kosten & Budget', url: '/wissen/guides/seo-kosten', description: 'SEO-Budget richtig planen und kalkulieren' },
  { name: 'Website erstellen lassen', url: '/wissen/guides/website-erstellen-lassen', description: 'Komplett-Guide zur professionellen Website-Erstellung' },
  { name: 'Online Marketing Budget', url: '/wissen/guides/online-marketing-budget', description: 'Online Marketing Budget richtig planen' },
  { name: 'Blog', url: '/blog', description: 'Aktuelle Artikel zu Digital Marketing und Webdesign' },
  { name: 'SEO Lexikon', url: '/lexikon', description: 'Fachbegriffe aus SEO und Online Marketing erklärt' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const hreflangAlternates = getHreflangAlternates('/wissen', locale)
  const canonicalUrl = getCanonicalUrl('/wissen', locale)

  const titles = {
    de: 'Wissen | Guides, Blog & Lexikon für Digital Marketing',
    en: 'Knowledge | Guides, Blog & Glossary for Digital Marketing',
    ru: 'Знания | Руководства, блог и глоссарий по диджитал маркетингу',
  }

  const descriptions = {
    de: 'Praxis-Guides, Blog-Artikel und SEO-Lexikon von GoldenWing. Lernen Sie alles über Webdesign Kosten, SEO Budget und Online Marketing.',
    en: 'Practical guides, blog articles and SEO glossary from GoldenWing. Learn about web design costs, SEO budget and online marketing.',
    ru: 'Практические руководства, статьи блога и SEO-глоссарий от GoldenWing. Узнайте о стоимости веб-дизайна, бюджете SEO и онлайн-маркетинге.',
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

export default function WissenLayout({ children }: { children: React.ReactNode }) {
  // WebPage + ItemList Schema for knowledge hub
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Wissen - Digital Marketing Knowledge Hub',
    description: 'Praxis-Guides, Blog und Lexikon für Webdesign, SEO und Online Marketing.',
    url: `${SITE_URL}/wissen`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoldenWing Creative Studios',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: knowledgeItems.length,
      itemListElement: knowledgeItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: item.name,
          description: item.description,
          url: `${SITE_URL}${item.url}`,
        },
      })),
    },
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Wissen', item: `${SITE_URL}/wissen` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
