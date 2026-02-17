import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medien',
    plural: 'Medien',
  },
  access: {
    read: () => true, // Public read access for all media
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    useAsTitle: 'alt',
    group: 'System',
    description: 'Bilder, PDFs und andere Medien-Dateien',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift',
    },
  ],
}
