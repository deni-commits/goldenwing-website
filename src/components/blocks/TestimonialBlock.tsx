import Image from 'next/image'

interface TestimonialBlockProps {
  block: {
    style?: 'single' | 'slider' | 'grid'
    testimonials?: Array<{
      quote: string
      name: string
      role?: string
      company?: string
      photo?: { url?: string; alt?: string }
    }>
  }
}

export function TestimonialBlock({ block }: TestimonialBlockProps) {
  const style = block.style || 'single'
  const items = block.testimonials || []

  if (!items.length) return null

  if (style === 'single') {
    const t = items[0]!
    return (
      <section className="px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <svg className="text-primary/40 mx-auto mb-6 h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="mb-6 text-xl leading-relaxed md:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
          <div className="flex items-center justify-center gap-3">
            {t.photo?.url && (
              <Image
                src={t.photo.url}
                alt={t.photo.alt || t.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div className="text-left">
              <p className="font-semibold">{t.name}</p>
              {(t.role || t.company) && (
                <p className="text-muted-foreground text-sm">{[t.role, t.company].filter(Boolean).join(' · ')}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className={`grid gap-8 ${style === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
          {items.map((t, i) => (
            <div key={i} className="border-border bg-card rounded-xl border p-6">
              <blockquote className="mb-4 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-3">
                {t.photo?.url && (
                  <Image
                    src={t.photo.url}
                    alt={t.photo.alt || t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  {(t.role || t.company) && (
                    <p className="text-muted-foreground text-xs">{[t.role, t.company].filter(Boolean).join(' · ')}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
