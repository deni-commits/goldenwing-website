'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

// Exported for reuse across components
export interface Testimonial {
  text: string
  name: string
  role: string
  company: string
  avatar?: string
}

interface TestimonialsColumnsProps {
  testimonials: Testimonial[]
  className?: string
}

function TestimonialsColumn({
  testimonials,
  className,
  duration = 15,
}: {
  testimonials: Testimonial[]
  className?: string
  duration?: number
}) {
  return (
    // CLS prevention: contain isolates this column from affecting layout
    <div className={cn('relative h-[700px] overflow-hidden', className)} style={{ contain: 'content' }}>
      <div
        className="flex flex-col gap-4 animate-scroll-up"
        style={{
          animationDuration: `${duration}s`,
          willChange: 'transform',
        }}
      >
        {/* Duplicate testimonials for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, idx) => (
          <TestimonialCard key={idx} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm hover:-translate-y-0.5 transition-transform duration-200">
      <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsColumns({
  testimonials,
  className,
}: TestimonialsColumnsProps) {
  // Split testimonials into 5 columns for more coverage
  const col1 = testimonials.filter((_, i) => i % 5 === 0)
  const col2 = testimonials.filter((_, i) => i % 5 === 1)
  const col3 = testimonials.filter((_, i) => i % 5 === 2)
  const col4 = testimonials.filter((_, i) => i % 5 === 3)
  const col5 = testimonials.filter((_, i) => i % 5 === 4)

  return (
    <div className={cn('relative', className)}>
      {/* Mask image for smooth fade at top and bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <TestimonialsColumn testimonials={col1} duration={22} />
        <TestimonialsColumn
          testimonials={col2}
          className="hidden md:block"
          duration={28}
        />
        <TestimonialsColumn
          testimonials={col3}
          className="hidden lg:block"
          duration={20}
        />
        <TestimonialsColumn
          testimonials={col4}
          className="hidden xl:block"
          duration={25}
        />
        <TestimonialsColumn
          testimonials={col5}
          className="hidden 2xl:block"
          duration={23}
        />
      </div>
    </div>
  )
}
