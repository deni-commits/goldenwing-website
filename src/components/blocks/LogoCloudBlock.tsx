interface LogoCloudBlockProps {
  block: {
    headline?: string
    logos?: Array<{
      name: string
      logo?: { url?: string; alt?: string }
      link?: string
    }>
  }
}

export function LogoCloudBlock({ block }: LogoCloudBlockProps) {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {block.headline && (
          <h2 className="mb-10 text-center text-lg font-semibold uppercase tracking-wider text-muted">
            {block.headline}
          </h2>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {block.logos?.map((item, i) => {
            const img = item.logo?.url ? (
              <img
                src={item.logo.url}
                alt={item.logo.alt || item.name}
                className="h-10 max-w-[140px] object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="text-sm text-muted">{item.name}</span>
            )

            return item.link ? (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
                {img}
              </a>
            ) : (
              <div key={i}>{img}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
