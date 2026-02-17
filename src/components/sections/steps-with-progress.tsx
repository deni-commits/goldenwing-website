'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'

interface Step {
  number?: string
  title: string
  description: string
}

interface StepsWithProgressProps {
  title: string
  steps: Step[]
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.42, 0, 0.58, 1], delay: 0.3 },
  },
}

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] },
  },
}

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function StepsWithProgress({ title, steps, className }: StepsWithProgressProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className={cn('py-16 md:py-24', className)}>
      <Container variant="block">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.h2
            variants={headerVariants}
            className="text-2xl md:text-3xl font-bold mb-16 text-center"
          >
            {title}
          </motion.h2>

          {/* Steps Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Desktop: Progress Line */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-[3px] z-0">
              {/* Background Line */}
              <div className="absolute inset-0 bg-muted-foreground/20 rounded-full" />
              {/* Animated Lime Line */}
              <motion.div
                variants={lineVariants}
                className="absolute inset-0 rounded-full origin-left"
                style={{ backgroundColor: '#f2fb31' }}
              />
            </div>

            {/* Desktop Steps Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="text-center relative"
                >
                  {/* Circle on Line */}
                  <div className="flex justify-center mb-8">
                    <motion.div
                      variants={dotVariants}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold relative z-10 border-4 border-background shadow-lg"
                      style={{
                        backgroundColor: '#f2fb31',
                        color: '#0a0a0a',
                        boxShadow: '0 0 20px rgba(242, 251, 49, 0.3)'
                      }}
                    >
                      {step.number || index + 1}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="px-2">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="md:hidden space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="relative pl-16 pb-10 last:pb-0"
                >
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                      className="absolute left-[22px] top-14 bottom-0 w-[3px] origin-top"
                      style={{ backgroundColor: '#f2fb31' }}
                    />
                  )}

                  {/* Number Circle */}
                  <motion.div
                    variants={dotVariants}
                    className="absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10"
                    style={{
                      backgroundColor: '#f2fb31',
                      color: '#0a0a0a',
                      boxShadow: '0 0 15px rgba(242, 251, 49, 0.4)'
                    }}
                  >
                    {step.number || index + 1}
                  </motion.div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default StepsWithProgress
