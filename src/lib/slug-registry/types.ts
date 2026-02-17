export type Locale = 'de' | 'en' | 'ru'

export type SlugType =
  | 'service'
  | 'sub-service'
  | 'reference'
  | 'location'
  | 'project'
  | 'blog-post'
  | 'blog-category'
  | 'package'

export interface SlugMapping {
  de: string
  en: string
  ru?: string  // Optional until all Russian slugs are added
  type: SlugType
  parent?: string
}

export interface SlugValidationResult {
  isValid: boolean
  correctSlug?: string
  alternateSlug?: string
  shouldRedirect?: boolean
  redirectTo?: string
}
