import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate'
import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getLandingPageContent, getLandingPageMeta, getAllLandingPageSlugs, parseSlug } from '@/lib/landing-pages'
import type { Locale as LPLocale } from '@/lib/landing-pages/types'
import { getCityBySlug } from '@/lib/landing-pages/cities'
import { getIndustryBySlug } from '@/lib/landing-pages/industries'
import { localBusinessVienna, localBusinessDubai } from '@/lib/landing-pages/shared'

export async function generateStaticParams() {
  // Template-based landing pages (always available, no DB needed)
  const params: Array<{ slug: string[] }> = getAllLandingPageSlugs().map((s) => ({ slug: [s] }))

  // CMS landing pages (may fail during build if DB not available)
  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'landing-pages', limit: 100 })
    for (const lp of data.docs) {
      params.push({ slug: [lp.slug as string] })
    }
  } catch {}

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const pageSlug = slug.join('/')

  // Check CMS first
  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'landing-pages',
      locale,
      where: { slug: { equals: pageSlug } },
      limit: 1,
    })
    const page = data.docs[0] as any | undefined
    if (page) return { title: page.title as string, ...getPageSeo(pageSlug, locale) }
  } catch {}

  // Template-based LP meta
  const meta = getLandingPageMeta(pageSlug, locale as LPLocale)
  if (meta) {
    const info = parseSlug(pageSlug)
    const canonical = `https://goldenwing.at/${locale}/${pageSlug}`

    // Build structured data
    const structuredData: any[] = []

    if (info) {
      const cityConfig = info.citySlug ? getCityBySlug(info.citySlug) : null
      const industryConfig = info.industrySlug ? getIndustryBySlug(info.industrySlug) : null
      const targetName = cityConfig?.cityName[locale as LPLocale] ?? industryConfig?.name[locale as LPLocale] ?? ''
      const localBiz = cityConfig?.country === 'AE' ? localBusinessDubai : localBusinessVienna

      // Service schema
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: meta.metaTitle,
        description: meta.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: localBiz.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: localBiz.address,
            addressLocality: localBiz.city,
            addressCountry: localBiz.country,
          },
          email: localBiz.email,
        },
        ...(cityConfig ? { areaServed: { '@type': 'City', name: targetName } } : {}),
      })

      // FAQ schema (generated at build time via content)
      const content = getLandingPageContent(pageSlug, locale as LPLocale)
      if (content?.faqs && content.faqs.length > 0) {
        structuredData.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        })
      }

      // Breadcrumb schema
      const homeLabel = locale === 'de' ? 'Startseite' : locale === 'en' ? 'Home' : 'Главная'
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeLabel, item: `https://goldenwing.at/${locale}` },
          { '@type': 'ListItem', position: 2, name: meta.metaTitle, item: canonical },
        ],
      })
    }

    return {
      title: meta.metaTitle,
      description: meta.metaDescription,
      alternates: { canonical },
      other: structuredData.length > 0 ? { 'script:ld+json': JSON.stringify(structuredData) } : undefined,
    }
  }

  return { title: pageSlug }
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params
  const pageSlug = slug.join('/')

  // 1. Check CMS landing pages first
  let page: any = null
  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'landing-pages',
      locale,
      where: { slug: { equals: pageSlug } },
      limit: 1,
    })
    page = data.docs[0] as any | undefined
  } catch {}

  if (page) {
    const t = await getDictionary(locale as Locale)
    const layout = (page.layout as any[] | null) || []
    return (
      <>
        {layout.length > 0 ? (
          <RenderBlocks blocks={layout} t={t} />
        ) : (
          <section className="px-4 py-24">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-4xl font-bold">{page.title as string}</h1>
            </div>
          </section>
        )}
      </>
    )
  }

  // 2. Template-based landing pages
  const content = getLandingPageContent(pageSlug, locale as LPLocale)
  if (content) {
    return <LandingPageTemplate content={content} locale={locale} />
  }

  notFound()
}
