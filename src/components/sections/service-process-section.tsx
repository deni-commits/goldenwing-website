'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { ProcessStep } from '@/components/process-sections'

// Dynamic imports - only load the component that's actually used
const ProcessLargeNumber = dynamic(
  () => import('@/components/process-sections/ProcessLargeNumber').then(mod => mod.ProcessLargeNumber),
  { ssr: true }
)
const ProcessExpandingRows = dynamic(
  () => import('@/components/process-sections/ProcessExpandingRows').then(mod => mod.ProcessExpandingRows),
  { ssr: true }
)
const ProcessSplitCard = dynamic(
  () => import('@/components/process-sections/ProcessSplitCard').then(mod => mod.ProcessSplitCard),
  { ssr: true }
)
const ProcessVerticalStepper = dynamic(
  () => import('@/components/process-sections/ProcessVerticalStepper').then(mod => mod.ProcessVerticalStepper),
  { ssr: true }
)
const ProcessSlidingBorder = dynamic(
  () => import('@/components/process-sections/ProcessSlidingBorder').then(mod => mod.ProcessSlidingBorder),
  { ssr: true }
)
const ProcessMagazine = dynamic(
  () => import('@/components/process-sections/ProcessMagazine').then(mod => mod.ProcessMagazine),
  { ssr: true }
)

// Map service slugs to process layout components
const SERVICE_LAYOUT_MAP: Record<string, 'large-number' | 'expanding-rows' | 'split-card' | 'vertical-stepper' | 'sliding-border' | 'magazine'> = {
  // Main service pages (2025 structure)
  'branding': 'magazine',
  'webdesign': 'large-number',
  'digital-marketing': 'expanding-rows',
  'seo-content': 'sliding-border',
  'web-app-entwicklung': 'split-card',
  'it-cloud-services': 'vertical-stepper',
}

// Layout components mapping
const LAYOUT_COMPONENTS = {
  'large-number': ProcessLargeNumber,
  'expanding-rows': ProcessExpandingRows,
  'split-card': ProcessSplitCard,
  'vertical-stepper': ProcessVerticalStepper,
  'sliding-border': ProcessSlidingBorder,
  'magazine': ProcessMagazine,
}

interface ServiceProcessStep {
  step: string
  title: string
  description: string
}

interface ServiceProcessSectionProps {
  serviceSlug: string
  title: string
  subtitle: string
  steps: ServiceProcessStep[]
  locale?: 'de' | 'en' | 'ru'
}

export function ServiceProcessSection({
  serviceSlug,
  title,
  subtitle,
  steps,
  locale = 'de',
}: ServiceProcessSectionProps) {
  // Get the layout type for this service
  const layoutType = SERVICE_LAYOUT_MAP[serviceSlug] || 'vertical-stepper'
  const LayoutComponent = LAYOUT_COMPONENTS[layoutType]

  // Convert steps to ProcessStep format
  const processSteps: ProcessStep[] = steps.map((step) => ({
    num: step.step.padStart(2, '0'),
    title: step.title,
    description: step.description || '',
  }))

  // CTA based on locale
  const cta = {
    label: locale === 'de' ? 'Projekt starten' : 'Start Project',
    href: '/kontakt', // next-intl handles locale prefix automatically
  }

  // Note: Process components now use Tailwind dark: classes
  // They automatically respond to the .dark class on <html>
  return (
    <Suspense fallback={<div className="min-h-[400px]" />}>
      <LayoutComponent
        title={title}
        subtitle={subtitle}
        steps={processSteps}
        cta={cta}
      />
    </Suspense>
  )
}

export default ServiceProcessSection
