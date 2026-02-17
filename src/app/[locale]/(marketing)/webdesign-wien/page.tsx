import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { getWebdesignWienPage, SupportedLocale } from '@/lib/payload'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getWebdesignContent, getWebdesignSeo } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'wien'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'pillarPages.webdesign' })
  const cmsPage = await getWebdesignWienPage(locale)

  const metaTitle = cmsPage?.seo?.metaTitle || t('title')
  const metaDescription = truncateMetaDescription(cmsPage?.seo?.metaDescription || t('heroDescription'))

  const hreflangAlternates = getHreflangAlternates('/webdesign-wien', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: cmsPage?.seo?.keywords?.split(',').map((k: string) => k.trim()) || (locale === 'de'
      ? ['Webdesign Wien', 'Website erstellen Wien', 'Webdesigner Wien', 'Web Design Agentur Wien']
      : ['Web Design Vienna', 'Website Development Vienna', 'Web Designer Vienna', 'Web Design Agency Vienna']),
    openGraph: {
      title: cmsPage?.hero?.title || t('heroTitle'),
      description: metaDescription,
      url: getCanonicalUrl('/webdesign-wien', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios - Webdesign Wien' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cmsPage?.hero?.title || t('heroTitle'),
      description: metaDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/webdesign-wien', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebdesignWienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  // Fetch CMS data for potential overrides
  const cmsPage = await getWebdesignWienPage(locale)

  // Get base content from data file
  const content = getWebdesignContent(CITY_SLUG, locale)
  const seo = getWebdesignSeo(CITY_SLUG, locale)

  // Apply CMS overrides if available
  if (cmsPage) {
    if (cmsPage.hero?.badge) content.hero.badge = cmsPage.hero.badge
    if (cmsPage.hero?.title) content.hero.title = cmsPage.hero.title
    if (cmsPage.hero?.description) content.hero.description = cmsPage.hero.description
    if (cmsPage.hero?.ctaPrimary) content.hero.ctaPrimary = cmsPage.hero.ctaPrimary
    if (cmsPage.hero?.ctaSecondary) content.hero.ctaSecondary = cmsPage.hero.ctaSecondary

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((cmsPage.trustSignals as any[])?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.trustSignals = cmsPage.trustSignals as any[]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((cmsPage.benefits as any[])?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.benefits = (cmsPage.benefits as any[]).map((b: any) => ({
        icon: b.icon || 'zap',
        title: b.title,
        description: b.description,
      }))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((cmsPage.packages as any[])?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.packages = (cmsPage.packages as any[]).map((p: any) => ({
        name: p.name,
        price: p.price,
        description: p.description,
        popular: p.popular || false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        features: (p.features as any[])?.map((f: any) => f.text) || [],
      }))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((cmsPage.process as any[])?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.process = cmsPage.process as any[]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((cmsPage.technologies as any[])?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.technologies = (cmsPage.technologies as any[]).map((t: any) => t.name)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((cmsPage.faqs as any[])?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.faqs = cmsPage.faqs as any[]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((cmsPage.relatedServices as any[])?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content.relatedServices = cmsPage.relatedServices as any[]
    }

    // Labels overrides
    if (cmsPage.pricingTitle) content.labels.pricingTitle = cmsPage.pricingTitle
    if (cmsPage.pricingDescription) content.labels.pricingDescription = cmsPage.pricingDescription
    if (cmsPage.processTitle) content.labels.processTitle = cmsPage.processTitle
    if (cmsPage.technologiesTitle) content.labels.technologiesTitle = cmsPage.technologiesTitle
    if (cmsPage.technologiesDescription) content.labels.technologiesDescription = cmsPage.technologiesDescription
    if (cmsPage.faqTitle) content.labels.faqTitle = cmsPage.faqTitle
    if (cmsPage.relatedServicesTitle) content.labels.relatedServicesTitle = cmsPage.relatedServicesTitle
    if (cmsPage.ctaTitle) content.labels.ctaTitle = cmsPage.ctaTitle
    if (cmsPage.ctaDescription) content.labels.ctaDescription = cmsPage.ctaDescription
    if (cmsPage.ctaButton) content.labels.ctaButton = cmsPage.ctaButton
  }

  // SEMrush On-Page: contextual internal links to relevant sub-services
  const contextualLinks = locale === 'de'
    ? [
        { text: 'Informationsarchitektur', href: '/leistungen/webdesign/informationsarchitektur' },
        { text: 'UX-Konzepte & Prototypen', href: '/leistungen/webdesign/ux-konzepte-prototypen' },
        { text: 'UI Design & Designsysteme', href: '/leistungen/webdesign/ui-design-designsysteme' },
        { text: 'CMS-Entwicklung', href: '/leistungen/webdesign/cms-entwicklung' },
        { text: 'Barrierefreiheit & Performance', href: '/leistungen/webdesign/barrierefreiheit-performance' },
      ]
    : [
        { text: 'Information Architecture', href: '/services/web-design/information-architecture' },
        { text: 'UX Concepts & Prototypes', href: '/services/web-design/ux-concepts-prototypes' },
        { text: 'UI Design & Design Systems', href: '/services/web-design/ui-design-design-systems' },
        { text: 'CMS Development', href: '/services/web-design/cms-development' },
        { text: 'Accessibility & Performance', href: '/services/web-design/accessibility-performance' },
      ]

  return (
    <LandingPageTemplate
      locale={locale}
      content={content}
      seo={seo}
      contextualLinks={contextualLinks}
    />
  )
}
