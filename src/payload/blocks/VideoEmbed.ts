import type { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'video-embed',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    { name: 'url', type: 'text', label: 'YouTube/Vimeo URL', required: true },
    { name: 'caption', type: 'text', label: 'Untertitel', localized: true },
    { name: 'posterImage', type: 'upload', relationTo: 'media', label: 'Vorschaubild' },
  ],
}
