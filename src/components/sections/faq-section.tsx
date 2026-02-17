'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { FAQSchema } from '@/components/seo/json-ld'
import { useLocale } from 'next-intl'

// Shared types - exported for reuse
export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
  className?: string
  clickHint?: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

// Shared accordion item component - exported for reuse
export function FAQAccordionItem({ item, isOpen, onToggle }: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left font-medium hover:text-primary transition-colors"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection({ title, subtitle, items, className, clickHint }: FAQSectionProps) {
  // Initialize with 0 to have first item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const locale = useLocale()

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const defaultClickHint = locale === 'de'
    ? 'Klicken Sie auf eine Frage, um die Antwort zu sehen.'
    : 'Click on a question to see the answer.'

  return (
    <section className={cn("py-16 md:py-20", className)}>
      {/* FAQ Schema for Rich Results */}
      <FAQSchema items={items} />

      <Container variant="block">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
          {/* Left: Title & Subtitle */}
          {(title || subtitle) && (
            <div className="lg:sticky lg:top-24">
              {title && (
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
              )}
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
              <p className="text-sm text-muted-foreground mt-4 hidden lg:block">
                {clickHint || defaultClickHint}
              </p>
            </div>
          )}

          {/* Right: FAQ Accordion */}
          <div className="bg-card border rounded-xl p-6 md:p-8">
            {items.map((item, index) => (
              <FAQAccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// Simple accordion without section wrapper - for standalone use
export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn("bg-card border rounded-xl p-6 md:p-8", className)}>
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}
