import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  fields: [
    { name: 'headline', type: 'text', label: 'Ueberschrift', localized: true },
    {
      name: 'items',
      type: 'array',
      label: 'Fragen & Antworten',
      fields: [
        { name: 'question', type: 'text', label: 'Frage', required: true, localized: true },
        { name: 'answer', type: 'textarea', label: 'Antwort', required: true, localized: true },
      ],
    },
  ],
}
