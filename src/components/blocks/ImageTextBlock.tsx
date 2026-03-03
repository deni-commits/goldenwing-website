import Image from 'next/image'
import Link from 'next/link'

type ImageTextProps = { block: any }

export function ImageTextBlock({ block }: ImageTextProps) {
  const isRight = block.imagePosition === 'right'
  const image = block.image as any | null
  const imageUrl = image?.url as string | undefined
  const imageAlt = (image?.alt as string) || (block.headline as string) || ''

  return (
    <section className="px-4 py-24">
      <div className={`mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 ${isRight ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl text-gray-300">&#9634;</span>
            </div>
          )}
        </div>
        <div>
          {block.headline && (
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{block.headline as string}</h2>
          )}
          {block.subline && (
            <p className="mb-4 text-lg text-gold-600">{block.subline as string}</p>
          )}
          {block.description && (
            <p className="mb-6 leading-relaxed text-muted">{block.description as string}</p>
          )}
          {block.cta?.label && block.cta?.url && (
            <Link
              href={block.cta.url as string}
              className="inline-block rounded-lg bg-gold-500 px-6 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              {block.cta.label as string}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
