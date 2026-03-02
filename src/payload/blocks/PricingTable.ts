import type { Block } from 'payload'

export const PricingTable: Block = {
  slug: 'pricing-table',
  labels: { singular: 'Preistabelle', plural: 'Preistabellen' },
  fields: [
    { name: 'headline', type: 'text', label: 'Ueberschrift', localized: true },
    {
      name: 'packages',
      type: 'array',
      label: 'Pakete',
      fields: [
        { name: 'name', type: 'text', label: 'Paketname', required: true, localized: true },
        { name: 'price', type: 'text', label: 'Preis', required: true },
        { name: 'period', type: 'text', label: 'Zeitraum', defaultValue: 'pro Monat', localized: true },
        {
          name: 'features',
          type: 'array',
          label: 'Leistungen',
          fields: [
            { name: 'feature', type: 'text', label: 'Leistung', required: true, localized: true },
          ],
        },
        { name: 'highlighted', type: 'checkbox', label: 'Hervorgehoben', defaultValue: false },
        { name: 'ctaLabel', type: 'text', label: 'CTA Bezeichnung', localized: true },
        { name: 'ctaLink', type: 'text', label: 'CTA Link' },
      ],
    },
  ],
}
