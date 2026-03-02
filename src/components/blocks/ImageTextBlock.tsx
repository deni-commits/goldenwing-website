type ImageTextProps = { block: any }

export function ImageTextBlock({ block }: ImageTextProps) {
  const isRight = block.imagePosition === 'right'

  return (
    <section className="px-4 py-24">
      <div className={`mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 ${isRight ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className="aspect-video rounded-xl bg-gray-100" />
        <div>
          <p className="text-muted">Content wird aus Payload CMS geladen.</p>
        </div>
      </div>
    </section>
  )
}
