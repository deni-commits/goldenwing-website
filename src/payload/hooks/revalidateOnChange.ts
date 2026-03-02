import type { CollectionAfterChangeHook } from 'payload'

export const revalidateOnChange: CollectionAfterChangeHook = async ({ doc, collection, req }) => {
  const revalidateSecret = process.env.REVALIDATE_SECRET
  if (!revalidateSecret) return doc

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const slug = doc.slug as string | undefined

  if (!slug) return doc

  const collectionSlug = collection.slug
  const pathsToRevalidate: string[] = []

  const locales = ['de', 'en', 'ru']

  for (const locale of locales) {
    switch (collectionSlug) {
      case 'posts':
        pathsToRevalidate.push(`/${locale}/blog/${slug}`, `/${locale}/blog`)
        break
      case 'services':
        pathsToRevalidate.push(`/${locale}/services/${slug}`, `/${locale}/services`)
        break
      case 'case-studies':
        pathsToRevalidate.push(`/${locale}/referenzen/${slug}`, `/${locale}/referenzen`)
        break
      case 'pages':
        pathsToRevalidate.push(`/${locale}/${slug}`)
        break
      case 'landing-pages':
        pathsToRevalidate.push(`/${locale}/${slug}`)
        break
      default:
        pathsToRevalidate.push(`/${locale}`)
    }
  }

  // Fire and forget — don't block the admin
  for (const path of pathsToRevalidate) {
    fetch(`${siteUrl}/api/revalidate?secret=${revalidateSecret}&path=${path}`).catch(() => {
      // Silently ignore revalidation errors
    })
  }

  return doc
}
