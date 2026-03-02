import type { Block } from 'payload'

export const CTA: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Call to Action' },
  fields: [
    { name: 'headline', type: 'text', label: 'Ueberschrift', required: true, localized: true },
    { name: 'description', type: 'textarea', label: 'Beschreibung', localized: true },
    { name: 'buttonLabel', type: 'text', label: 'Button Bezeichnung', required: true, localized: true },
    { name: 'buttonLink', type: 'text', label: 'Button Link', required: true },
    {
      name: 'variant',
      type: 'select',
      label: 'Variante',
      defaultValue: 'primary',
      options: [
        { label: 'Primaer', value: 'primary' },
        { label: 'Sekundaer', value: 'secondary' },
        { label: 'Dezent', value: 'subtle' },
      ],
    },
  ],
}
