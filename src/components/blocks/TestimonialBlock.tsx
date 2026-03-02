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
          <svg className="mx-auto mb-6 h-10 w-10 text-gold/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="mb-6 text-xl leading-relaxed md:text-2xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            {t.photo?.url && (
              <img src={t.photo.url} alt={t.photo.alt || t.name} className="h-12 w-12 rounded-full object-cover" />
            )}
            <div className="text-left">
              <p className="font-semibold">{t.name}</p>
              {(t.role || t.company) && (
                <p className="text-sm text-muted">
                  {[t.role, t.company].filter(Boolean).join(' · ')}
                </p>
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
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
              <blockquote className="mb-4 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {t.photo?.url && (
                  <img src={t.photo.url} alt={t.photo.alt || t.name} className="h-10 w-10 rounded-full object-cover" />
                )}
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  {(t.role || t.company) && (
                    <p className="text-xs text-muted">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
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
