'use client'

import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/lib/i18n-navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

// Lazy load MeshGradient - it's heavy (WebGL) and not critical for LCP
const MeshGradient = dynamic(
  () => import('@/components/ui/mesh-gradient').then(mod => mod.MeshGradient),
  { ssr: false }
)

interface HeroSectionProps {
  locations: string
  headline: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
}

export function HeroSection({
  locations,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    // CLS prevention: min-height + contain isolates this section
    <section
      className="relative min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden"
      style={{ contain: 'layout' }}
    >
      {/* Animated WebGL Mesh Gradient Background */}
      <MeshGradient className="absolute inset-0 -z-10 opacity-60" />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />

      <Container variant="block" className="relative py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Locations Badge */}
          <span className="inline-block text-sm font-medium text-primary mb-4">
            {locations}
          </span>

          {/* Headline - LCP element */}
          <h1 className="text-4xl leading-[1.2] md:text-[5.5rem] md:leading-[1.1] font-bold tracking-tight mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <Button size="lg" className="group w-full sm:w-auto">
                {primaryCta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/leistungen">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
