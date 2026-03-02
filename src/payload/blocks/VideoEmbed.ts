import type { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'video-embed',
  labels: { singular: 'Video', plural: 'Video' },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'YouTube/Vimeo URL',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Vorschaubild',
    },
  ],
}
