type HeroProps = { block: any }

export function HeroBlock({ block }: HeroProps) {
  const align = block.alignment || 'center'
  const textAlign = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'

  return (
    <section className="relative flex min-h-[60vh] items-center bg-dark px-4 py-24 text-white">
      <div className={`mx-auto max-w-4xl ${textAlign}`}>
        {block.headline && (
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            {block.headline}
          </h1>
        )}
        {block.subline && (
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            {block.subline}
          </p>
        )}
        {block.ctaLabel && block.ctaLink && (
          <a
            href={block.ctaLink}
            className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            {block.ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
