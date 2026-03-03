'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface FAQAccordionProps {
  items: Array<{ question: string; answer: string }>
  variant?: 'dark' | 'light'
}

export function FAQAccordion({ items, variant = 'dark' }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className={cn(variant === 'dark' ? 'border-border' : 'border-border')}
        >
          <AccordionTrigger
            className={cn(
              'py-5 text-base font-semibold transition-colors hover:no-underline',
              'text-foreground hover:text-primary',
            )}
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground animate-in fade-in-0 text-sm leading-relaxed duration-200">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
