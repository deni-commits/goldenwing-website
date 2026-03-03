'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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

export function HeroSection({
  badge, line1, highlight, line2, subline,
  ctaPrimaryLabel, ctaPrimaryLink, ctaSecondaryLabel, ctaSecondaryLink,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden py-20 md:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(128,128,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Orbs */}
        <div className="animate-pulse-slow absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="animate-pulse-slow absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" style={{ animationDelay: '2s' }} />
        {/* Center glow */}
        <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[600px] w-[600px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted-foreground/10 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="hero-headline mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            {line1}{' '}
            <span className="relative text-primary">
              {highlight}
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-primary/50"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              />
            </span>{' '}
            {line2}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="hero-subheadline mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            {subline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="hero-cta flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={ctaPrimaryLink}
                className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {ctaPrimaryLabel}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={ctaSecondaryLink}
                className="inline-block rounded-lg border border-foreground/30 bg-transparent px-8 py-3 font-semibold text-foreground transition-colors hover:bg-foreground/10"
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
