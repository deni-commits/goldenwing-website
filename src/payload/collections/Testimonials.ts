import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Zitat',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Unternehmen',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Position',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Bewertung',
      min: 1,
      max: 5,
      admin: {
        description: 'Bewertung von 1 bis 5 Sternen',
      },
    },
  ],
}
