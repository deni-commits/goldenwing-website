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
      <div
        className={`mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 ${isRight ? 'md:[&>*:first-child]:order-2' : ''}`}
      >
        <div className="bg-muted relative aspect-video overflow-hidden rounded-xl">
          {imageUrl ? (
            <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground/50 text-4xl">&#9634;</span>
            </div>
          )}
        </div>
        <div>
          {block.headline && <h2 className="mb-4 text-3xl font-bold md:text-4xl">{block.headline as string}</h2>}
          {block.subline && <p className="text-primary mb-4 text-lg">{block.subline as string}</p>}
          {block.description && (
            <p className="text-muted-foreground mb-6 leading-relaxed">{block.description as string}</p>
          )}
          {block.cta?.label && block.cta?.url && (
            <Link
              href={block.cta.url as string}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-6 py-3 font-semibold transition"
            >
              {block.cta.label as string}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
