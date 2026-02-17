import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'featured'],
    group: 'Personen',
    description: 'Kundenbewertungen und Testimonials',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      // Nicht lokalisiert - Name bleibt gleich
    },
    {
      name: 'role',
      type: 'text',
      label: 'Position',
      localized: true,
    },
    {
      name: 'company',
      type: 'text',
      label: 'Unternehmen',
      // Nicht lokalisiert - Firmenname bleibt gleich
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Zitat',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Bewertung (1-5)',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
