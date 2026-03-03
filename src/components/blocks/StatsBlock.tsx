type StatsProps = { block: any }

export function StatsBlock({ block }: StatsProps) {
  return (
    <section className="bg-foreground text-background px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {block.headline && <h2 className="mb-12 text-center text-3xl font-bold">{block.headline}</h2>}
        <div className="grid gap-8 md:grid-cols-4">
          {block.stats?.map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-primary text-4xl font-bold">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-background/60 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
