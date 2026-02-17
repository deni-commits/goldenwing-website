'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { slugRegistry } from '@/lib/slug-registry'

interface CategoryLinkProps {
  slug: string
  title: string
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  className?: string
}

export function CategoryLink({ slug, title, variant = 'outline', className = '' }: CategoryLinkProps) {
  const router = useRouter()
  const locale = useLocale() as 'de' | 'en'

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Get the correct slug for the current locale
    const localizedSlug = slugRegistry.getSlugForLocale(slug, locale, 'blog-category') || slug

    // Use correct path segment for locale
    const pathSegment = locale === 'de' ? 'kategorie' : 'category'
    const prefix = locale === 'de' ? '' : '/en'

    router.push(`${prefix}/blog/${pathSegment}/${localizedSlug}`)
  }

  return (
    <span
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as unknown as React.MouseEvent)
        }
      }}
    >
      <Badge variant={variant} className={`w-fit cursor-pointer hover:bg-accent ${className}`}>
        {title}
      </Badge>
    </span>
  )
}
