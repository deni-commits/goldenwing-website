import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Partner',
    plural: 'Partner',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'row', 'featured', 'order'],
    group: 'Personen',
    description: 'Partner & Kunden-Logos für das Logo-Carousel',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      localized: true,
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      options: [
        { label: 'Technologie', value: 'technology' },
        { label: 'Agentur', value: 'agency' },
        { label: 'Strategie', value: 'strategy' },
        { label: 'Medien', value: 'media' },
        { label: 'Sonstiges', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'row',
      type: 'select',
      label: 'Carousel Reihe',
      options: [
        { label: 'Reihe 1 (links scrollend)', value: '1' },
        { label: 'Reihe 2 (rechts scrollend)', value: '2' },
        { label: 'Reihe 3 (links scrollend)', value: '3' },
      ],
      defaultValue: '1',
      admin: {
        position: 'sidebar',
        description: 'In welcher Reihe soll das Logo im Carousel erscheinen?',
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
    {
      name: 'showInCarousel',
      type: 'checkbox',
      label: 'Im Logo-Carousel anzeigen',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Reihenfolge',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
