import type { Block } from 'payload'

export const ImageText: Block = {
  slug: 'image-text',
  label: 'Bild + Text',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
      required: true,
    },
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
