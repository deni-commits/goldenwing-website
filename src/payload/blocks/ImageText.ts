import type { Block } from 'payload'

export const ImageText: Block = {
  slug: 'image-text',
  labels: { singular: 'Bild + Text', plural: 'Bild + Text' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Bild', required: true },
    { name: 'content', type: 'richText', label: 'Inhalt', required: true, localized: true },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Bildposition',
      defaultValue: 'left',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Rechts', value: 'right' },
      ],
    },
  ],
}
