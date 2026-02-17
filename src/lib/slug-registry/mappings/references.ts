import { SlugMapping } from '../types'

/**
 * Reference Category Slug Mappings
 * Based on routing.ts definitions
 */
export const referenceMappings: SlugMapping[] = [
  { de: 'branding', en: 'branding', type: 'reference' },
  { de: 'webdesign', en: 'web-design', type: 'reference' },
  { de: 'seo', en: 'seo', type: 'reference' },
  { de: 'marketing', en: 'marketing', type: 'reference' },
  { de: 'entwicklung', en: 'development', type: 'reference' },
  { de: 'e-commerce', en: 'e-commerce', type: 'reference' },
  { de: 'industrie', en: 'industry', type: 'reference' },
  { de: 'technologie', en: 'technology', type: 'reference' },
  { de: 'dienstleistung', en: 'consulting', type: 'reference' },
  { de: 'it-cloud', en: 'it-cloud', type: 'reference' },
]

/**
 * Location Slug Mappings
 */
export const locationMappings: SlugMapping[] = [
  { de: 'wien', en: 'vienna', type: 'location' },
  { de: 'dubai', en: 'dubai', type: 'location' },
  { de: 'roseville', en: 'roseville', type: 'location' },
]

/**
 * Blog Category Slug Mappings
 * From database categories table
 */
export const blogCategoryMappings: SlugMapping[] = [
  { de: 'branding', en: 'branding', type: 'blog-category' },
  { de: 'marketing', en: 'marketing', type: 'blog-category' },
  { de: 'seo', en: 'seo', type: 'blog-category' },
  { de: 'technologie', en: 'technology', type: 'blog-category' },
  { de: 'ui-ux', en: 'ui-ux', type: 'blog-category' },
  { de: 'webdesign', en: 'web-design', type: 'blog-category' },
]

/**
 * Service Package Slug Mappings
 */
export const packageMappings: SlugMapping[] = [
  { de: 'brand-web-foundation', en: 'brand-web-foundation', type: 'package' },
  { de: 'seo-content-growth', en: 'seo-content-growth', type: 'package' },
  { de: 'demand-gen-suite', en: 'demand-gen-suite', type: 'package' },
  { de: 'individuelles-paket', en: 'custom-package', type: 'package' },
]
