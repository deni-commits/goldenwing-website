import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Spalten',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Überschrift',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Bezeichnung',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link',
              required: true,
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'In neuem Tab öffnen',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
      defaultValue: '© {year} GoldenWing Creative Studios. Alle Rechte vorbehalten.',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Rechtliche Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Bezeichnung',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
    },
  ],
}
