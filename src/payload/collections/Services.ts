import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
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
      name: 'excerpt',
      type: 'textarea',
      label: 'Kurzbeschreibung',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon (Lucide-Name)',
      admin: {
        description: 'Name des Lucide-Icons, z. B. "Globe", "Search", "Palette"',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      options: [
        { label: 'Webentwicklung', value: 'web-development' },
        { label: 'SEO', value: 'seo' },
        { label: 'Branding', value: 'branding' },
        { label: 'Marketing', value: 'marketing' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Verwandte Leistungen',
    },
  ],
}
