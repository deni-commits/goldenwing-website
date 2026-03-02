import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  labels: { singular: 'Kennzahlen', plural: 'Kennzahlen' },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Kennzahlen',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Wert',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Bezeichnung',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
        },
      ],
    },
  ],
}
