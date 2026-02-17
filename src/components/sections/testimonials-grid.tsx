'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'

interface Testimonial {
  text: string
  name: string
  role: string
  company: string
  rating?: number
}

interface TestimonialsGridProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  className?: string
}

export function TestimonialsGrid({
  testimonials,
  title,
  subtitle,
  className,
}: TestimonialsGridProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <Container variant="block">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Featured Testimonial */}
        <div className="mb-12">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
              &ldquo;{testimonials[0]?.text}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-lg font-bold">
                  {testimonials[0]?.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{testimonials[0]?.name}</p>
                <p className="text-sm opacity-80">
                  {testimonials[0]?.role}, {testimonials[0]?.company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of other testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.slice(1).map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
