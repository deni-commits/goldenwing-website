import type { Block } from 'payload'

// Generates FAQPage schema markup for structured data / SEO
export const FAQ: Block = {
  slug: 'faq',
  label: 'FAQ',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Fragen & Antworten',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Frage',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Antwort',
          required: true,
        },
      ],
    },
  ],
}
