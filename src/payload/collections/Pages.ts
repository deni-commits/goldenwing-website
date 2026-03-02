import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'layout',
      type: 'blocks',
      label: 'Layout',
      blocks: [
        {
          slug: 'Hero',
          labels: {
            singular: 'Hero',
            plural: 'Heroes',
          },
          fields: [],
        },
        {
          slug: 'ImageText',
          labels: {
            singular: 'Bild & Text',
            plural: 'Bild & Text Blöcke',
          },
          fields: [],
        },
        {
          slug: 'FeatureGrid',
          labels: {
            singular: 'Feature-Raster',
            plural: 'Feature-Raster',
          },
          fields: [],
        },
        {
          slug: 'CTA',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Actions',
          },
          fields: [],
        },
        {
          slug: 'Testimonial',
          labels: {
            singular: 'Testimonial',
            plural: 'Testimonials',
          },
          fields: [],
        },
        {
          slug: 'FAQ',
          labels: {
            singular: 'FAQ',
            plural: 'FAQs',
          },
          fields: [],
        },
        {
          slug: 'PricingTable',
          labels: {
            singular: 'Preistabelle',
            plural: 'Preistabellen',
          },
          fields: [],
        },
        {
          slug: 'LogoCloud',
          labels: {
            singular: 'Logo-Wolke',
            plural: 'Logo-Wolken',
          },
          fields: [],
        },
        {
          slug: 'Stats',
          labels: {
            singular: 'Statistiken',
            plural: 'Statistiken',
          },
          fields: [],
        },
        {
          slug: 'VideoEmbed',
          labels: {
            singular: 'Video-Einbettung',
            plural: 'Video-Einbettungen',
          },
          fields: [],
        },
        {
          slug: 'ContactForm',
          labels: {
            singular: 'Kontaktformular',
            plural: 'Kontaktformulare',
          },
          fields: [],
        },
      ],
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
