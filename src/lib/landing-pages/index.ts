import type { Locale, LandingPageContent, ServiceType } from './types'
import { allCities } from './cities'
import { industries, getIndustryBySlug } from './industries'
import { sharedLabels } from './shared'
import { getWebdesignContent, getWebdesignMeta } from './templates/webdesign'
import { getSeoContent, getSeoMeta } from './templates/seo'
import { getBrandingContent, getBrandingMeta } from './templates/branding'
import { getMarketingContent, getMarketingMeta } from './templates/marketing'

// ── Slug patterns ──
// webdesign-{city}           → Webdesign × City
// seo-agentur-{city}         → SEO × City
// branding-{city}            → Branding × City
// marketing-agentur-{city}   → Marketing × City
// webdesign-fuer-{industry}  → Webdesign × Industry
// seo-fuer-{industry}        → SEO × Industry
// branding-fuer-{industry}   → Branding × Industry
// marketing-fuer-{industry}  → Marketing × Industry

interface SlugInfo {
  service: ServiceType
  citySlug?: string
  industrySlug?: string
}

const SERVICE_PREFIXES: Array<{ prefix: string; service: ServiceType }> = [
  { prefix: 'webdesign-fuer-', service: 'webdesign' },
  { prefix: 'seo-fuer-', service: 'seo' },
  { prefix: 'branding-fuer-', service: 'branding' },
  { prefix: 'marketing-fuer-', service: 'marketing' },
  { prefix: 'webdesign-', service: 'webdesign' },
  { prefix: 'seo-agentur-', service: 'seo' },
  { prefix: 'branding-', service: 'branding' },
  { prefix: 'marketing-agentur-', service: 'marketing' },
]

export function parseSlug(slug: string): SlugInfo | null {
  for (const { prefix, service } of SERVICE_PREFIXES) {
    if (slug.startsWith(prefix)) {
      const rest = slug.slice(prefix.length)
      if (!rest) continue

      // Check if it's an industry slug (fuer- prefixes already handled)
      if (prefix.includes('-fuer-')) {
        if (getIndustryBySlug(rest)) {
          return { service, industrySlug: rest }
        }
        continue
      }

      // Otherwise it's a city slug
      if (allCities.find((c) => c.slug === rest)) {
        return { service, citySlug: rest }
      }
    }
  }
  return null
}

export function getLandingPageContent(slug: string, locale: Locale): LandingPageContent | null {
  const info = parseSlug(slug)
  if (!info) return null

  const targetSlug = info.citySlug || info.industrySlug || ''

  switch (info.service) {
    case 'webdesign':
      return getWebdesignContent(targetSlug, locale)
    case 'seo':
      return getSeoContent(targetSlug, locale)
    case 'branding':
      return getBrandingContent(targetSlug, locale)
    case 'marketing':
      return getMarketingContent(targetSlug, locale)
    default:
      return null
  }
}

export function getLandingPageMeta(
  slug: string,
  locale: Locale,
): { metaTitle: string; metaDescription: string } | null {
  const info = parseSlug(slug)
  if (!info) return null

  const targetSlug = info.citySlug || info.industrySlug || ''

  switch (info.service) {
    case 'webdesign':
      return getWebdesignMeta(targetSlug, locale)
    case 'seo':
      return getSeoMeta(targetSlug, locale)
    case 'branding':
      return getBrandingMeta(targetSlug, locale)
    case 'marketing':
      return getMarketingMeta(targetSlug, locale)
    default:
      return null
  }
}

export function getAllLandingPageSlugs(): string[] {
  const slugs: string[] = []

  // Service × City combinations
  for (const city of allCities) {
    slugs.push(`webdesign-${city.slug}`)
    slugs.push(`seo-agentur-${city.slug}`)
    slugs.push(`branding-${city.slug}`)
    slugs.push(`marketing-agentur-${city.slug}`)
  }

  // Service × Industry combinations
  for (const industry of industries) {
    slugs.push(`webdesign-fuer-${industry.slug}`)
    slugs.push(`seo-fuer-${industry.slug}`)
    slugs.push(`branding-fuer-${industry.slug}`)
    slugs.push(`marketing-fuer-${industry.slug}`)
  }

  return slugs
}

// Re-exports
export { allCities } from './cities'
export { industries } from './industries'
export type { Locale, LandingPageContent, ServiceType } from './types'
