import type { Block } from 'payload'

export const CTA: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Call to Action' },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Bezeichnung',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Variante',
      defaultValue: 'primary',
      options: [
        { label: 'Primär', value: 'primary' },
        { label: 'Sekundär', value: 'secondary' },
        { label: 'Dezent', value: 'subtle' },
      ],
    },
  ],
}
