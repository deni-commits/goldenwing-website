/**
 * Slug Validators
 * Functions to check and correct slugs based on locale
 */

import {
  SERVICE_SLUGS,
  SUB_SERVICE_SLUGS,
  ADDITIONAL_SERVICE_SLUGS,
  REFERENCE_SLUGS,
  BLOG_CATEGORY_SLUGS,
  PACKAGE_SLUGS,
  BLOG_POST_SLUGS,
  LEGACY_SERVICE_REDIRECTS,
  EN_ONLY_BLOG_POSTS,
  type Locale,
} from '@/config/slug-mappings'

/**
 * Get legacy service redirect if exists
 */
export function getLegacyServiceRedirect(slug: string): string | null {
  return LEGACY_SERVICE_REDIRECTS[slug] || null
}

/**
 * Generic slug correction function
 */
function getCorrectSlug(
  slug: string,
  locale: Locale,
  slugMappings: Record<string, Record<string, string>>
): string | null {
  const deMap = slugMappings.de || {}
  const enMap = slugMappings.en || {}
  const ruMap = slugMappings.ru || {}

  if (locale === 'en') {
    const expectedSlug = deMap[slug as keyof typeof deMap]
    if (expectedSlug && expectedSlug !== slug) return expectedSlug
  } else if (locale === 'ru') {
    const expectedSlug = ruMap[slug as keyof typeof ruMap]
    if (expectedSlug && expectedSlug !== slug) return expectedSlug
  } else {
    // German locale - check if EN slug was used
    const expectedSlug = enMap[slug as keyof typeof enMap]
    if (expectedSlug && expectedSlug !== slug) return expectedSlug
  }
  return null
}

/**
 * Check and correct service slugs (main services)
 */
export function getCorrectServiceSlug(slug: string, locale: Locale): string | null {
  // First check for legacy redirects
  const legacyRedirect = getLegacyServiceRedirect(slug)
  if (legacyRedirect) {
    if (locale === 'en') {
      const enSlug = SERVICE_SLUGS.de[legacyRedirect as keyof typeof SERVICE_SLUGS.de]
      return enSlug || legacyRedirect
    }
    if (locale === 'ru') {
      const ruSlug = SERVICE_SLUGS.ru[legacyRedirect as keyof typeof SERVICE_SLUGS.ru]
      return ruSlug || legacyRedirect
    }
    return legacyRedirect
  }

  return getCorrectSlug(slug, locale, SERVICE_SLUGS as Record<string, Record<string, string>>)
}

/**
 * Check and correct additional service slugs
 */
export function getCorrectAdditionalServiceSlug(slug: string, locale: Locale): string | null {
  return getCorrectSlug(slug, locale, ADDITIONAL_SERVICE_SLUGS as Record<string, Record<string, string>>)
}

/**
 * Check and correct sub-service slugs
 */
export function getCorrectSubServiceSlug(slug: string, locale: Locale): string | null {
  return getCorrectSlug(slug, locale, SUB_SERVICE_SLUGS as Record<string, Record<string, string>>)
}

/**
 * Check and correct reference slugs
 */
export function getCorrectReferenceSlug(slug: string, locale: Locale): string | null {
  return getCorrectSlug(slug, locale, REFERENCE_SLUGS as Record<string, Record<string, string>>)
}

/**
 * Check and correct blog category slugs
 */
export function getCorrectBlogCategorySlug(slug: string, locale: Locale): string | null {
  return getCorrectSlug(slug, locale, BLOG_CATEGORY_SLUGS as Record<string, Record<string, string>>)
}

/**
 * Check and correct package slugs
 */
export function getCorrectPackageSlug(slug: string, locale: Locale): string | null {
  return getCorrectSlug(slug, locale, PACKAGE_SLUGS as Record<string, Record<string, string>>)
}

/**
 * Check and correct blog post slugs
 */
export function getCorrectBlogPostSlug(slug: string, locale: Locale): string | null {
  // Check EN-only posts first - no redirect needed if already on EN
  if ((EN_ONLY_BLOG_POSTS as readonly string[]).includes(slug)) {
    // EN-only posts: return null for EN (no redirect), handled elsewhere for DE
    return null
  }

  return getCorrectSlug(slug, locale, BLOG_POST_SLUGS as Record<string, Record<string, string>>)
}
