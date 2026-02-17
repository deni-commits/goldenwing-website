import { Locale, SlugMapping, SlugType, SlugValidationResult } from './types'
import { serviceMappings, subServiceMappings } from './mappings/services'
import { referenceMappings, locationMappings, blogCategoryMappings, packageMappings } from './mappings/references'

class SlugRegistry {
  private mappings: SlugMapping[] = []

  constructor() {
    this.mappings = [
      ...serviceMappings,
      ...subServiceMappings,
      ...referenceMappings,
      ...locationMappings,
      ...blogCategoryMappings,
      ...packageMappings,
    ]
  }

  findBySlug(slug: string, type?: SlugType): SlugMapping | undefined {
    return this.mappings.find(m =>
      (m.de === slug || m.en === slug) &&
      (type ? m.type === type : true)
    )
  }

  isValidForLocale(slug: string, locale: Locale, type?: SlugType): boolean {
    const mapping = this.findBySlug(slug, type)
    if (!mapping) return false
    return mapping[locale] === slug
  }

  getSlugForLocale(slug: string, locale: Locale, type?: SlugType): string | undefined {
    const mapping = this.findBySlug(slug, type)
    if (!mapping) return undefined
    return mapping[locale]
  }

  getAlternateSlug(slug: string, currentLocale: Locale, type?: SlugType): string | undefined {
    const mapping = this.findBySlug(slug, type)
    if (!mapping) return undefined
    const alternateLocale: Locale = currentLocale === 'de' ? 'en' : 'de'
    return mapping[alternateLocale]
  }

  validate(slug: string, locale: Locale, type: SlugType): SlugValidationResult {
    const mapping = this.findBySlug(slug, type)

    if (!mapping) {
      return { isValid: false }
    }

    const correctSlug = mapping[locale]
    const alternateLocale: Locale = locale === 'de' ? 'en' : 'de'
    const alternateSlug = mapping[alternateLocale]

    if (correctSlug === slug) {
      return {
        isValid: true,
        correctSlug,
        alternateSlug,
      }
    }

    return {
      isValid: false,
      correctSlug,
      alternateSlug,
      shouldRedirect: true,
      redirectTo: correctSlug,
    }
  }

  getAllSlugsForLocale(locale: Locale, type: SlugType): string[] {
    return this.mappings
      .filter(m => m.type === type)
      .map(m => m[locale] ?? m.en)
      .filter((slug): slug is string => slug !== undefined)
  }

  getAllMappings(type: SlugType): SlugMapping[] {
    return this.mappings.filter(m => m.type === type)
  }

  getSubServicesForParent(parentSlug: string, locale: Locale): string[] {
    const parentMapping = this.findBySlug(parentSlug, 'service')
    if (!parentMapping) return []

    const parentDe = parentMapping.de

    return this.mappings
      .filter(m => m.type === 'sub-service' && m.parent === parentDe)
      .map(m => m[locale] ?? m.en)
      .filter((slug): slug is string => slug !== undefined)
  }
}

export const slugRegistry = new SlugRegistry()
