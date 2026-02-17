import { notFound, redirect } from 'next/navigation'
import { slugRegistry } from '../registry'
import { Locale, SlugType } from '../types'

interface ValidateOptions {
  slug: string
  locale: Locale
  type: SlugType
  basePath: string
}

/**
 * Validates a slug for the current locale.
 * - If slug is valid for locale → returns slug
 * - If slug is wrong locale → redirects to correct URL
 * - If slug unknown → returns 404
 */
export function validateSlugOrRedirect(options: ValidateOptions): string {
  const { slug, locale, type, basePath } = options
  const result = slugRegistry.validate(slug, locale, type)

  // Unknown slug → 404
  if (!result.isValid && !result.shouldRedirect) {
    notFound()
  }

  // Wrong locale slug → redirect to correct
  if (!result.isValid && result.shouldRedirect && result.correctSlug) {
    redirect(`${basePath}/${result.correctSlug}`)
  }

  return slug
}

interface ValidateNestedOptions {
  parentSlug: string
  childSlug: string
  locale: Locale
  parentType: SlugType
  childType: SlugType
  basePath: string
}

/**
 * Validates nested slugs (e.g., /services/branding/brand-strategy)
 * Redirects if either parent or child slug is wrong for locale
 */
export function validateNestedSlugOrRedirect(options: ValidateNestedOptions): {
  parentSlug: string
  childSlug: string
} {
  const { parentSlug, childSlug, locale, parentType, childType, basePath } = options

  const parentResult = slugRegistry.validate(parentSlug, locale, parentType)

  // Unknown parent → 404
  if (!parentResult.isValid && !parentResult.shouldRedirect) {
    notFound()
  }

  const childResult = slugRegistry.validate(childSlug, locale, childType)

  // Unknown child → 404
  if (!childResult.isValid && !childResult.shouldRedirect) {
    notFound()
  }

  const correctParent = parentResult.correctSlug || parentSlug
  const correctChild = childResult.correctSlug || childSlug

  // Either needs redirect → redirect to fully correct URL
  if (parentResult.shouldRedirect || childResult.shouldRedirect) {
    redirect(`${basePath}/${correctParent}/${correctChild}`)
  }

  return { parentSlug, childSlug }
}
