type HeroProps = { block: any }

export function HeroBlock({ block }: HeroProps) {
  const align = block.alignment || 'center'
  const textAlign = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'

  return (
    <section className="bg-foreground text-background relative flex min-h-[60vh] items-center px-4 py-24">
      <div className={`mx-auto max-w-4xl ${textAlign}`}>
        {block.headline && <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">{block.headline}</h1>}
        {block.subline && <p className="text-background/70 mx-auto mb-8 max-w-2xl text-lg">{block.subline}</p>}
        {block.ctaLabel && block.ctaLink && (
          <a
            href={block.ctaLink}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-8 py-3 font-semibold transition-colors"
          >
            {block.ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
