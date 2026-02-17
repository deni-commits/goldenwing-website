'use client'

import { cn } from '@/lib/utils'
import { Globe, Image as ImageIcon } from 'lucide-react'

interface OgPreviewProps {
  title: string | null
  description: string | null
  image: string | null
  siteName: string | null
  url: string
  platform: 'facebook' | 'twitter' | 'linkedin'
  locale?: string
}

export function OgPreview({
  title,
  description,
  image,
  siteName: _siteName,
  url,
  platform,
  locale = 'de',
}: OgPreviewProps) {
  const domain = (() => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  })()

  const t = locale === 'de' ? {
    noTitle: 'Kein Titel',
    noDescription: 'Keine Beschreibung',
    noImage: 'Kein Bild',
  } : {
    noTitle: 'No title',
    noDescription: 'No description',
    noImage: 'No image',
  }

  if (platform === 'facebook') {
    return (
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 max-w-[500px]">
        {/* Image */}
        <div className="aspect-[1.91/1] bg-muted relative">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="OG Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={cn(
            'absolute inset-0 flex items-center justify-center text-muted-foreground',
            image && 'hidden'
          )}>
            <ImageIcon className="h-12 w-12 opacity-30" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3 border-t">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {domain}
          </div>
          <h3 className={cn(
            'font-semibold text-base leading-tight line-clamp-2',
            !title && 'text-muted-foreground italic'
          )}>
            {title || t.noTitle}
          </h3>
          <p className={cn(
            'text-sm text-muted-foreground mt-1 line-clamp-2',
            !description && 'italic'
          )}>
            {description || t.noDescription}
          </p>
        </div>
      </div>
    )
  }

  if (platform === 'twitter') {
    return (
      <div className="border rounded-2xl overflow-hidden bg-white dark:bg-gray-900 max-w-[500px]">
        {/* Image */}
        <div className="aspect-[2/1] bg-muted relative">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Twitter Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={cn(
            'absolute inset-0 flex items-center justify-center text-muted-foreground',
            image && 'hidden'
          )}>
            <ImageIcon className="h-12 w-12 opacity-30" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3 border-t">
          <h3 className={cn(
            'font-semibold text-base leading-tight line-clamp-1',
            !title && 'text-muted-foreground italic'
          )}>
            {title || t.noTitle}
          </h3>
          <p className={cn(
            'text-sm text-muted-foreground mt-0.5 line-clamp-2',
            !description && 'italic'
          )}>
            {description || t.noDescription}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Globe className="h-3 w-3" />
            {domain}
          </div>
        </div>
      </div>
    )
  }

  // LinkedIn
  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 max-w-[500px]">
      {/* Image */}
      <div className="aspect-[1.91/1] bg-muted relative">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="LinkedIn Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center text-muted-foreground',
          image && 'hidden'
        )}>
          <ImageIcon className="h-12 w-12 opacity-30" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 border-t">
        <h3 className={cn(
          'font-semibold text-sm leading-tight line-clamp-2',
          !title && 'text-muted-foreground italic'
        )}>
          {title || t.noTitle}
        </h3>
        <div className="text-xs text-muted-foreground mt-1">
          {domain}
        </div>
      </div>
    </div>
  )
}
