import { Metadata } from 'next'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getWebdesignContent, getWebdesignSeo, getWebdesignMetadata } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'salzburg'

type SupportedLocale = 'de' | 'en' | 'ru'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const meta = getWebdesignMetadata(CITY_SLUG, locale)
  const hreflangAlternates = getHreflangAlternates(`/webdesign-${CITY_SLUG}`, locale)

  return {
    title: meta.metaTitle,
    description: truncateMetaDescription(meta.metaDescription),
    keywords: meta.keywords,
    openGraph: {
      title: meta.metaTitle,
      description: truncateMetaDescription(meta.metaDescription),
      url: getCanonicalUrl(`/webdesign-${CITY_SLUG}`, locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.metaTitle,
      description: truncateMetaDescription(meta.metaDescription),
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl(`/webdesign-${CITY_SLUG}`, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebdesignSalzburgPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const content = getWebdesignContent(CITY_SLUG, locale)
  const seo = getWebdesignSeo(CITY_SLUG, locale)

  return (
    <LandingPageTemplate
      locale={locale}
      content={content}
      seo={seo}
    />
  )
}
