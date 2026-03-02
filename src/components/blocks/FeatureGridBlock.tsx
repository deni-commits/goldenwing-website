type FeatureGridProps = { block: any }

export function FeatureGridBlock({ block }: FeatureGridProps) {
  const cols = block.columns || '3'
  const gridCols = cols === '2' ? 'md:grid-cols-2' : cols === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3'

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {block.headline && (
          <h2 className="mb-12 text-center text-3xl font-bold">{block.headline}</h2>
        )}
        <div className={`grid gap-8 ${gridCols}`}>
          {block.features?.map((feature: any, i: number) => (
            <div key={i} className="rounded-xl border border-gray-100 p-6">
              {feature.icon && <div className="mb-4 text-2xl text-gold-500">{feature.icon}</div>}
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
