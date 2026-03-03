import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { OrganizationSchema } from '@/components/seo/StructuredData'
import { getPageSeo } from '@/lib/seo'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { description: t.home.metaDescription, ...getPageSeo('', locale) }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let posts: any[] = []
  let services: any[] = []
  let testimonials: any[] = []
  let caseStudies: any[] = []
  let homepage: any = null

  try {
    const payload = await getPayload()
    const [postsData, servicesData, testimonialsData, caseStudiesData, homepageData] = await Promise.all([
      payload.find({ collection: 'posts', locale, limit: 3, sort: '-publishedDate', where: { _status: { equals: 'published' } } }),
      payload.find({ collection: 'services', locale, limit: 10, where: { parent: { exists: false } }, sort: 'order' }),
      payload.find({ collection: 'testimonials', locale, limit: 20 }),
      payload.find({ collection: 'case-studies', locale, limit: 4, sort: '-publishedDate' }),
      payload.findGlobal({ slug: 'homepage', locale }),
    ])
    posts = postsData.docs
    services = servicesData.docs
    testimonials = testimonialsData.docs
    caseStudies = caseStudiesData.docs
    homepage = homepageData
  } catch {
    // Tables may not exist yet on first build
  }

  const hero = homepage?.hero as any | undefined
  const cmsStats = homepage?.stats as any[] | undefined
  const cmsProcess = homepage?.process as any | undefined
  const cmsCta = homepage?.cta as any | undefined

  return (
    <>
      <OrganizationSchema />

      <HeroSection
        badge={hero?.badge || t.home.heroBadge}
        line1={hero?.line1 || t.home.heroLine1}
        highlight={hero?.highlight || t.home.heroHighlight}
        line2={hero?.line2 || t.home.heroLine2}
        subline={hero?.subline || t.home.heroSub}
        ctaPrimaryLabel={hero?.ctaPrimaryLabel || t.home.heroCtaPrimary}
        ctaPrimaryLink={hero?.ctaPrimaryLink || `/${locale}/kontakt`}
        ctaSecondaryLabel={hero?.ctaSecondaryLabel || t.home.heroCtaSecondary}
        ctaSecondaryLink={hero?.ctaSecondaryLink || `/${locale}/referenzen`}
      />

      {cmsStats && cmsStats.length > 0 && (
        <StatsSection stats={cmsStats} />
      )}

      {services.length > 0 && (
        <ServicesSection
          services={services}
          locale={locale}
          heading={t.home.servicesHeading}
          subtitle={t.services.subtitle}
          allServicesLabel={t.home.allServices}
        />
      )}

      {cmsProcess?.steps && (cmsProcess.steps as any[]).length > 0 && (
        <ProcessSection
          heading={cmsProcess.heading}
          subline={cmsProcess.subline}
          steps={cmsProcess.steps}
        />
      )}

      {caseStudies.length > 0 && (
        <ProjectsSection
          projects={caseStudies}
          locale={locale}
          heading={t.referenzen.title}
          viewAllLabel={t.common.viewAll}
        />
      )}

      {testimonials.length > 0 && (
        <TestimonialsSection
          testimonials={testimonials}
          heading={t.home.testimonialsHeading}
          subtitle={t.home.testimonialsSub}
        />
      )}

      <CTASection
        heading={(cmsCta?.heading as string) || t.home.ctaHeading}
        subline={(cmsCta?.subline as string) || t.home.ctaSub}
        buttonLabel={(cmsCta?.buttonLabel as string) || t.home.ctaButton}
        buttonLink={(cmsCta?.buttonLink as string) || `/${locale}/kontakt`}
      />
    </>
  )
}
