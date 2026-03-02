import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    { name: 'headline', type: 'text', label: 'Ueberschrift', required: true, localized: true },
    { name: 'subline', type: 'textarea', label: 'Unterzeile', localized: true },
    { name: 'ctaLabel', type: 'text', label: 'CTA Bezeichnung', localized: true },
    { name: 'ctaLink', type: 'text', label: 'CTA Link' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Hintergrundbild' },
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Hintergrundtyp',
      options: [
        { label: 'Bild', value: 'image' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Ausrichtung',
      defaultValue: 'center',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Mitte', value: 'center' },
        { label: 'Rechts', value: 'right' },
      ],
    },
  ],
}
