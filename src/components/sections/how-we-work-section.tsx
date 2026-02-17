'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/container'

interface Step {
  number: string
  title: string
  description: string
}

interface HowWeWorkSectionProps {
  title: string
  subtitle: string
  steps: Step[]
}

export function HowWeWorkSection({ title, subtitle, steps }: HowWeWorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <Container variant="block">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Progress Line Container */}
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px]">
            {/* Background Line (gray) */}
            <div className="absolute inset-0 bg-muted-foreground/20 rounded-full" />
            {/* Animated Line (lime) */}
            <motion.div
              className="absolute inset-0 rounded-full origin-left"
              style={{ backgroundColor: '#f2fb31' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative group">
                {/* Dot on line */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    className="w-4 h-4 rounded-full border-4 border-background relative z-10 transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: '#f2fb31' }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      delay: 0.5 + index * 0.15,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                  />
                </div>

                {/* Number */}
                <motion.span
                  className="block text-5xl md:text-6xl font-bold mb-4 transition-colors duration-300"
                  style={{ color: 'rgba(242, 251, 49, 0.3)' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                >
                  <span className="group-hover:text-[#f2fb31] transition-colors duration-300">
                    {step.number}
                  </span>
                </motion.span>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-[#f2fb31]">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden max-w-sm mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
            >
              {/* Vertical Line + Dot */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <motion.div
                  className="w-4 h-4 rounded-full flex-shrink-0 z-10"
                  style={{ backgroundColor: '#f2fb31' }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                />
                {/* Line (except last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="w-[2px] flex-1 min-h-[80px] origin-top"
                    style={{ backgroundColor: '#f2fb31' }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                {/* Number */}
                <span
                  className="text-3xl font-bold block mb-1"
                  style={{ color: 'rgba(242, 251, 49, 0.5)' }}
                >
                  {step.number}
                </span>
                {/* Title */}
                <h3 className="font-semibold mb-1">{step.title}</h3>
                {/* Description */}
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
