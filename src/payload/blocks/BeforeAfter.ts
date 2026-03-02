import type { Block } from 'payload'

export const BeforeAfter: Block = {
  slug: 'before-after',
  labels: { singular: 'Vorher/Nachher', plural: 'Vorher/Nachher' },
  fields: [
    { name: 'headline', type: 'text', label: 'Ueberschrift', localized: true },
    { name: 'beforeImage', type: 'upload', relationTo: 'media', label: 'Vorher-Bild', required: true },
    { name: 'afterImage', type: 'upload', relationTo: 'media', label: 'Nachher-Bild', required: true },
    { name: 'beforeLabel', type: 'text', label: 'Vorher-Label', defaultValue: 'Vorher', localized: true },
    { name: 'afterLabel', type: 'text', label: 'Nachher-Label', defaultValue: 'Nachher', localized: true },
  ],
}
