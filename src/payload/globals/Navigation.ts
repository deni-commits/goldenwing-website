import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Hauptmenue',
      fields: [
        { name: 'label', type: 'text', label: 'Bezeichnung', required: true, localized: true },
        { name: 'link', type: 'text', label: 'Link' },
        {
          name: 'children',
          type: 'array',
          label: 'Untermenue',
          fields: [
            { name: 'label', type: 'text', label: 'Bezeichnung', required: true, localized: true },
            { name: 'link', type: 'text', label: 'Link', required: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'ctaButton',
      label: 'CTA Button',
      fields: [
        { name: 'label', type: 'text', label: 'Bezeichnung', localized: true },
        { name: 'link', type: 'text', label: 'Link' },
      ],
    },
  ],
}
