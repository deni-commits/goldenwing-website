"use client"

import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-velocity"

interface ScrollVelocitySectionProps {
  keywords: string
  baseVelocity?: number
  direction?: 1 | -1
  className?: string
}

export function ScrollVelocitySection({
  keywords,
  baseVelocity = 3,
  direction = 1,
  className = "py-8 bg-muted/20 border-y",
}: ScrollVelocitySectionProps) {
  return (
    <ScrollVelocityContainer className={className}>
      <ScrollVelocityRow
        baseVelocity={baseVelocity}
        direction={direction}
        className="text-4xl md:text-5xl font-bold text-foreground/10"
      >
        {keywords}
      </ScrollVelocityRow>
    </ScrollVelocityContainer>
  )
}
