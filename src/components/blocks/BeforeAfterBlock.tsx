import Image from 'next/image'
import type { Dictionary } from '@/i18n/getDictionary'

interface BeforeAfterBlockProps {
  block: {
    headline?: string
    beforeImage?: { url?: string; alt?: string }
    afterImage?: { url?: string; alt?: string }
    beforeLabel?: string
    afterLabel?: string
  }
  t?: Dictionary
}

export function BeforeAfterBlock({ block, t }: BeforeAfterBlockProps) {
  const beforeLabel = block.beforeLabel || t?.blocks.before || ''
  const afterLabel = block.afterLabel || t?.blocks.after || ''

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {block.headline && (
          <h2 className="mb-12 text-center text-3xl font-bold">{block.headline}</h2>
        )}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-muted">
              {beforeLabel}
            </p>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              {block.beforeImage?.url ? (
                <Image src={block.beforeImage.url} alt={block.beforeImage.alt || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted">{beforeLabel}</div>
              )}
            </div>
          </div>
          <div>
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-muted">
              {afterLabel}
            </p>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              {block.afterImage?.url ? (
                <Image src={block.afterImage.url} alt={block.afterImage.alt || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted">{afterLabel}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
