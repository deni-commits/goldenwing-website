interface PricingTableBlockProps {
  block: {
    headline?: string
    packages?: Array<{
      name: string
      price: string
      period?: string
      features?: Array<{ feature: string }>
      highlighted?: boolean
      ctaLabel?: string
      ctaLink?: string
    }>
  }
}

export function PricingTableBlock({ block }: PricingTableBlockProps) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {block.headline && (
          <h2 className="mb-12 text-center text-3xl font-bold">{block.headline}</h2>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {block.packages?.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 ${
                pkg.highlighted
                  ? 'border-gold bg-gold/5 shadow-lg shadow-gold/10'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-semibold text-white">
                  Empfohlen
                </span>
              )}
              <h3 className="mb-2 text-xl font-bold">{pkg.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">{pkg.price}</span>
                {pkg.period && (
                  <span className="ml-1 text-sm text-muted">/{pkg.period}</span>
                )}
              </div>
              <ul className="mb-8 space-y-3">
                {pkg.features?.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f.feature}
                  </li>
                ))}
              </ul>
              {pkg.ctaLabel && pkg.ctaLink && (
                <a
                  href={pkg.ctaLink}
                  className={`block rounded-lg py-3 text-center font-semibold transition ${
                    pkg.highlighted
                      ? 'bg-gold text-white hover:bg-gold-dark'
                      : 'border border-gray-300 hover:border-gold hover:text-gold'
                  }`}
                >
                  {pkg.ctaLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
