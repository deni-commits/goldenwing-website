import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { revalidateOnChange } from '../hooks/revalidateOnChange'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateOnChange],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
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
      localized: true,
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
      localized: true,
      label: 'Herausforderung',
    },
    {
      name: 'solution',
      type: 'richText',
      localized: true,
      label: 'Loesung',
    },
    {
      name: 'results',
      type: 'array',
      label: 'Ergebnisse',
      fields: [
        { name: 'metric', type: 'text', required: true, localized: true, label: 'Kennzahl' },
        { name: 'value', type: 'text', required: true, label: 'Wert' },
        { name: 'description', type: 'textarea', localized: true, label: 'Beschreibung' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Bilder',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Bild' },
      ],
    },
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      label: 'Testimonial',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Titelbild',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Veroeffentlichungsdatum',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
}
