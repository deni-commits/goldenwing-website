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
        { name: 'heading', type: 'text', label: 'Ueberschrift', required: true, localized: true },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            { name: 'label', type: 'text', label: 'Bezeichnung', required: true, localized: true },
            { name: 'link', type: 'text', label: 'Link', required: true },
            { name: 'newTab', type: 'checkbox', label: 'In neuem Tab oeffnen', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      label: 'Copyright',
      defaultValue: '© {year} GoldenWing Creative Studios. Alle Rechte vorbehalten.',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Rechtliche Links',
      fields: [
        { name: 'label', type: 'text', label: 'Bezeichnung', required: true, localized: true },
        { name: 'link', type: 'text', label: 'Link', required: true },
      ],
    },
  ],
}
