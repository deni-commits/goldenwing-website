'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

interface HeroSectionProps {
  badge: string
  line1: string
  highlight: string
  line2: string
  subline: string
  ctaPrimaryLabel: string
  ctaPrimaryLink: string
  ctaSecondaryLabel: string
  ctaSecondaryLink: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const clipReveal: import('framer-motion').Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
}

export function HeroSection({
  badge,
  line1,
  highlight,
  line2,
  subline,
  ctaPrimaryLabel,
  ctaPrimaryLink,
  ctaSecondaryLabel,
  ctaSecondaryLink,
}: HeroSectionProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-[600px] overflow-hidden py-20 md:py-32 lg:min-h-[700px]">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(128,128,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Orbs */}
        <div className="animate-pulse-slow bg-primary/5 absolute top-1/4 -left-32 h-96 w-96 rounded-full blur-3xl" />
        <div
          className="animate-pulse-slow bg-primary/5 absolute -right-32 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: '2s' }}
        />
        {/* Center glow */}
        <div className="animate-spin-slow bg-primary/3 absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full blur-[100px]" />
      </div>

      <div className="container">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={shouldReduce ? undefined : staggerContainer}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : 'visible'}
        >
          {/* Badge */}
          <motion.div variants={shouldReduce ? undefined : fadeInUp} className="mb-6">
            <span className="border-border bg-muted-foreground/10 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span
                  className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ animationDuration: '2s' }}
                />
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
              </span>
              {badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={shouldReduce ? undefined : fadeInUp}
            className="hero-headline mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            {line1}{' '}
            <span className="text-primary relative inline-block">
              {highlight}
              <motion.span
                className="bg-primary/50 absolute -bottom-1 left-0 h-[3px] w-full"
                variants={shouldReduce ? undefined : clipReveal}
                initial={shouldReduce ? undefined : 'hidden'}
                animate={shouldReduce ? undefined : 'visible'}
              />
            </span>{' '}
            {line2}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={shouldReduce ? undefined : fadeInUp}
            className="hero-subheadline text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl"
          >
            {subline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={shouldReduce ? undefined : fadeInUp}
            className="hero-cta flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.div
              whileHover={shouldReduce ? undefined : { scale: 1.03 }}
              whileTap={shouldReduce ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                href={ctaPrimaryLink}
                className="bg-primary text-primary-foreground inline-block rounded-lg px-8 py-3 font-semibold transition-shadow hover:shadow-[0_0_30px_rgba(212,255,0,0.25)]"
              >
                {ctaPrimaryLabel}
              </Link>
            </motion.div>
            <motion.div
              whileHover={shouldReduce ? undefined : { scale: 1.03 }}
              whileTap={shouldReduce ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                href={ctaSecondaryLink}
                className="border-foreground/30 text-foreground hover:bg-foreground/10 inline-block rounded-lg border bg-transparent px-8 py-3 font-semibold transition-colors"
              >
                {ctaSecondaryLabel}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
