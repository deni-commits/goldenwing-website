type CTAProps = { block: any }

export function CTABlock({ block }: CTAProps) {
  const isPrimary = block.variant !== 'secondary' && block.variant !== 'subtle'
  const bgClass = isPrimary ? 'bg-dark text-white' : block.variant === 'subtle' ? 'bg-gray-50' : 'bg-gold-50'

  return (
    <section className={`px-4 py-24 ${bgClass}`}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold">{block.headline}</h2>
        {block.description && (
          <p className={`mb-8 ${isPrimary ? 'text-gray-300' : 'text-muted'}`}>
            {block.description}
          </p>
        )}
        <a
          href={block.buttonLink}
          className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
        >
          {block.buttonLabel}
        </a>
      </div>
    </section>
  )
}
