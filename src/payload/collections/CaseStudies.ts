import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    ...slugField,
    {
      name: 'client',
      type: 'text',
      required: true,
      label: 'Kunde',
    },
    {
      name: 'industry',
      type: 'select',
      label: 'Branche',
      options: [
        { label: 'Technologie', value: 'tech' },
        { label: 'Gesundheitswesen', value: 'healthcare' },
        { label: 'Finanzen', value: 'finance' },
        { label: 'Einzelhandel', value: 'retail' },
        { label: 'Gastronomie', value: 'food' },
        { label: 'Immobilien', value: 'real-estate' },
        { label: 'Sonstiges', value: 'other' },
      ],
    },
    {
      name: 'challenge',
      type: 'richText',
      label: 'Herausforderung',
    },
    {
      name: 'solution',
      type: 'richText',
      label: 'Lösung',
    },
    {
      name: 'results',
      type: 'array',
      label: 'Ergebnisse',
      fields: [
        {
          name: 'metric',
          type: 'text',
          required: true,
          label: 'Kennzahl',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Wert',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Bilder',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Bild',
        },
      ],
    },
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      label: 'Testimonial',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Veröffentlichungsdatum',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
