// src/components/process-sections/types.ts

export interface ProcessStep {
  num: string        // "01", "02", etc.
  title: string      // "Discovery", "Strategie", etc.
  description: string // Beschreibungstext
  icon?: string      // Optional: Lucide icon name
  link?: string      // Optional: Link für "Mehr erfahren"
}

export interface ProcessSectionProps {
  /** Section title */
  title: string
  /** Section subtitle/description */
  subtitle: string
  /** Array of process steps */
  steps: ProcessStep[]
  /** Theme variant - affects colors */
  theme?: 'light' | 'dark'
  /** Optional className for additional styling */
  className?: string
  /** Optional CTA button */
  cta?: {
    label: string
    href: string
  }
}
