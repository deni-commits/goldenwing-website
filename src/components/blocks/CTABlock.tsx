type CTAProps = { block: any }

export function CTABlock({ block }: CTAProps) {
  const isPrimary = block.variant !== 'secondary' && block.variant !== 'subtle'
  const bgClass = isPrimary ? 'bg-foreground text-background' : block.variant === 'subtle' ? 'bg-muted' : 'bg-primary/5'

  return (
    <section className={`px-4 py-24 ${bgClass}`}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold">{block.headline}</h2>
        {block.description && (
          <p className={`mb-8 ${isPrimary ? 'text-background/70' : 'text-muted-foreground'}`}>{block.description}</p>
        )}
        <a
          href={block.buttonLink}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-8 py-3 font-semibold transition-colors"
        >
          {block.buttonLabel}
        </a>
      </div>
    </section>
  )
}
