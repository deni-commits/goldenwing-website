'use client'

import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface TestimonialsSectionProps {
  testimonials: any[]
  heading: string
  subtitle: string
}

function splitIntoColumns(items: any[], count: number): any[][] {
  const cols: any[][] = Array.from({ length: count }, () => [])
  items.forEach((item, i) => cols[i % count]!.push(item))
  return cols
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      {testimonial.rating && (
        <div className="mb-3 text-primary">
          {'★'.repeat(testimonial.rating as number)}{'☆'.repeat(5 - (testimonial.rating as number))}
        </div>
      )}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        &ldquo;{testimonial.quote as string}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {(testimonial.author as string).charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold">{testimonial.author as string}</p>
          {testimonial.company && (
            <p className="text-xs text-muted-foreground">{testimonial.company as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function ScrollColumn({ testimonials, speed }: { testimonials: any[]; speed: number }) {
  // Duplicate for infinite scroll
  const doubled = [...testimonials, ...testimonials]

  return (
    <div className="relative h-[700px] overflow-hidden" style={{ contain: 'content' }}>
      <div
        className="[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      >
        <div
          className="animate-scroll-up"
          style={{ animationDuration: `${speed}s`, willChange: 'transform' }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection({ testimonials, heading, subtitle }: TestimonialsSectionProps) {
  const columns = splitIntoColumns(testimonials, 5)
  const speeds = [22, 18, 25, 20, 15]

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {columns.map((col, i) => (
            <div key={i} className={i === 1 ? 'hidden md:block' : i === 2 ? 'hidden lg:block' : i === 3 ? 'hidden xl:block' : i === 4 ? 'hidden 2xl:block' : ''}>
              {col.length > 0 && <ScrollColumn testimonials={col} speed={speeds[i]!} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
