import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Section',
      fields: [
        { name: 'badge', type: 'text', label: 'Badge Text', localized: true },
        { name: 'line1', type: 'text', label: 'Zeile 1', localized: true },
        { name: 'highlight', type: 'text', label: 'Highlight (gold)', localized: true },
        { name: 'line2', type: 'text', label: 'Zeile 2', localized: true },
        { name: 'subline', type: 'textarea', label: 'Untertitel', localized: true },
        { name: 'ctaPrimaryLabel', type: 'text', label: 'CTA Primaer Label', localized: true },
        { name: 'ctaPrimaryLink', type: 'text', label: 'CTA Primaer Link', defaultValue: '/de/kontakt' },
        { name: 'ctaSecondaryLabel', type: 'text', label: 'CTA Sekundaer Label', localized: true },
        { name: 'ctaSecondaryLink', type: 'text', label: 'CTA Sekundaer Link', defaultValue: '/de/referenzen' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiken',
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', label: 'Wert (z.B. 120+)', required: true },
        { name: 'label', type: 'text', label: 'Beschriftung', required: true, localized: true },
      ],
    },
    {
      type: 'group',
      name: 'process',
      label: 'Prozess Section',
      fields: [
        { name: 'heading', type: 'text', label: 'Ueberschrift', localized: true },
        { name: 'subline', type: 'text', label: 'Untertitel', localized: true },
        {
          name: 'steps',
          type: 'array',
          label: 'Schritte',
          maxRows: 6,
          fields: [
            { name: 'step', type: 'text', label: 'Nummer (z.B. 01)', required: true },
            { name: 'title', type: 'text', label: 'Titel', required: true, localized: true },
            { name: 'description', type: 'textarea', label: 'Beschreibung', localized: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'cta',
      label: 'CTA Section',
      fields: [
        { name: 'heading', type: 'text', label: 'Ueberschrift', localized: true },
        { name: 'subline', type: 'textarea', label: 'Untertitel', localized: true },
        { name: 'buttonLabel', type: 'text', label: 'Button Text', localized: true },
        { name: 'buttonLink', type: 'text', label: 'Button Link', defaultValue: '/de/kontakt' },
      ],
    },
  ],
}
