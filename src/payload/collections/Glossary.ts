import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { revalidateOnChange } from '../hooks/revalidateOnChange'

export const Glossary: CollectionConfig = {
  slug: 'glossary',
  admin: {
    useAsTitle: 'term',
    defaultColumns: ['term', 'category', 'searchVolume', 'difficulty'],
    group: 'Content',
  },
  hooks: {
    afterChange: [revalidateOnChange],
  },
  fields: [
    {
      name: 'term',
      type: 'text',
      required: true,
      localized: true,
      label: 'Begriff',
    },
    ...slugField,
    {
      name: 'shortDefinition',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Kurzdefinition',
    },
    {
      name: 'fullDefinition',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Vollstaendige Definition',
    },
    {
      name: 'usageExample',
      type: 'textarea',
      localized: true,
      label: 'Anwendungsbeispiel',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategorie',
      options: [
        { label: 'SEO & Suchmaschinen', value: 'seo' },
        { label: 'Marketing & Strategie', value: 'marketing' },
        { label: 'Design & UX', value: 'design' },
        { label: 'Entwicklung & Technologie', value: 'development' },
        { label: 'Strategie & Branding', value: 'strategy' },
      ],
    },
    {
      name: 'searchVolume',
      type: 'number',
      label: 'Suchvolumen',
      admin: {
        description: 'Monatliches Suchvolumen (AT/DE)',
      },
    },
    {
      name: 'difficulty',
      type: 'number',
      label: 'Keyword Difficulty',
      min: 0,
      max: 100,
    },
    {
      name: 'keyPoints',
      type: 'array',
      label: 'Kernpunkte',
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          localized: true,
          label: 'Punkt',
        },
      ],
    },
    {
      name: 'relatedTerms',
      type: 'relationship',
      relationTo: 'glossary',
      hasMany: true,
      label: 'Verwandte Begriffe',
    },
    {
      name: 'externalLinks',
      type: 'array',
      label: 'Externe Links',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Titel' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
  ],
}
