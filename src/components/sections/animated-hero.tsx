'use client'

import { motion } from 'framer-motion'
import { Link } from '@/lib/i18n-navigation'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Awards } from '@/components/ui/award'
import { useTranslations } from 'next-intl'

// CMS Data Types
export interface CMSHeroData {
  badge?: string | null
  headline?: {
    line1?: string | null
    highlight?: string | null
    line2?: string | null
  } | null
  subheadline?: string | null
  locations?: Array<{ flag?: string | null; city?: string | null }> | null
  ctaPrimary?: string | null
  ctaSecondary?: string | null
  trustText?: string | null
  trustedBy?: Array<{ company?: string | null }> | null
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

// Default trusted by companies (fallback)
const defaultTrustedBy = [
  'TechStart GmbH',
  'Innovate Solutions',
  'Urban Lifestyle',
  'Green Energy AT',
  'Digital First Agency',
]

export function AnimatedHero({ cmsData }: { cmsData?: CMSHeroData }) {
  const t = useTranslations('hero')
  const tCommon = useTranslations('common')

  // Use CMS data or fall back to translations
  const badge = cmsData?.badge || t('badge')
  const titleLine1 = cmsData?.headline?.line1 || t('title')
  const titleHighlight = cmsData?.headline?.highlight || t('titleHighlight')
  const titleEnd = cmsData?.headline?.line2 || t('titleEnd')
  const description = cmsData?.subheadline || t('description')
  const ctaPrimary = cmsData?.ctaPrimary || tCommon('freeConsultation')
  const ctaSecondary = cmsData?.ctaSecondary || tCommon('viewOurWork')
  const trustText = cmsData?.trustText || t('trustedBy')

  // Locations from CMS or defaults
  const locations = cmsData?.locations?.length
    ? cmsData.locations.map(loc => ({ flag: loc.flag || '', city: loc.city || '' }))
    : [
        { flag: '🇦🇹', city: t('locations.vienna') },
        { flag: '🇦🇪', city: t('locations.dubai') },
        { flag: '🇺🇸', city: t('locations.roseville') }
      ]

  // Trusted by companies from CMS or defaults
  const trustedByCompanies = cmsData?.trustedBy?.length
    ? cmsData.trustedBy.map(item => item.company || '').filter(Boolean)
    : defaultTrustedBy

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] py-20 md:py-32 overflow-hidden">
      {/* Animated Background Orbs - Using CSS animations for better performance */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Primary gradient orb - subtle gray - CSS animation */}
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-muted-foreground/10 rounded-full blur-3xl animate-pulse-slow will-change-transform"
          style={{ animationDelay: '0s' }}
        />
        {/* Secondary gradient orb - subtle gold accent - CSS animation */}
        <div
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse-slow will-change-transform"
          style={{ animationDelay: '2s' }}
        />
        {/* Subtle center glow - CSS rotation */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-muted-foreground/5 via-transparent to-gold/5 rounded-full blur-3xl animate-spin-slow will-change-transform"
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <Container variant="block">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium mb-6 border border-border hover:border-gold/50 transition-colors"
          >
            <motion.span
              className="relative flex h-2 w-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
            </motion.span>
            {badge}
          </motion.div>

          {/* Main Headline with Word Animation */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {titleLine1}{' '}
            <span className="relative inline-block">
              <span className="relative z-10">{titleHighlight}</span>
              {/* Neon Highlighter Effect */}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-4 bg-primary/30 -skew-x-2 -z-0"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />
            </span>
            {' '}
            <br className="hidden md:block" />
            {titleEnd}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Global Offices with Floating Animation */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {locations.map((location, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <span>{location.flag}</span> {location.city}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/kontakt">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="w-full sm:w-auto group">
                  <span className="relative z-10 flex items-center">
                    {ctaPrimary}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/referenzen">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                  {ctaSecondary}
                  <Sparkles className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeIn}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <motion.p
              className="text-sm text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {trustText}
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {trustedByCompanies.map((company, i) => (
                <motion.span
                  key={i}
                  className="text-muted-foreground/60 font-medium hover:text-muted-foreground transition-colors cursor-default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  {company}
                </motion.span>
              ))}
            </motion.div>

            {/* Award Badges */}
            <motion.div
              className="flex justify-center items-center gap-8 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <Awards
                variant="stamp"
                title="TOP RATED"
                subtitle="KREATIVAGENTUR"
                date="2024"
                className="scale-[0.55] -m-6"
              />
              <Awards
                variant="stamp"
                title="VERIFIED"
                subtitle="AGENCY PARTNER"
                recipient="★★★★★"
                className="scale-[0.55] -m-6"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
