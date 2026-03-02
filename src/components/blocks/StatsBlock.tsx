type StatsProps = { block: any }

export function StatsBlock({ block }: StatsProps) {
  return (
    <section className="bg-dark px-4 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        {block.headline && (
          <h2 className="mb-12 text-center text-3xl font-bold">{block.headline}</h2>
        )}
        <div className="grid gap-8 md:grid-cols-4">
          {block.stats?.map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-gold-400">
                {stat.value}{stat.suffix}
              </div>
              <div className="mt-2 text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
