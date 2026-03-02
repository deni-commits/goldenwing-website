import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { revalidateOnChange } from '../hooks/revalidateOnChange'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'parent', 'order'],
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
      name: 'excerpt',
      type: 'textarea',
      localized: true,
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
      name: 'parent',
      type: 'relationship',
      relationTo: 'services',
      label: 'Uebergeordneter Service',
      admin: {
        description: 'Wenn gesetzt, ist dies ein Sub-Service. Leer lassen fuer Hauptservices.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: 'Inhalt',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, label: 'Titel' },
        { name: 'description', type: 'textarea', localized: true, label: 'Beschreibung' },
      ],
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Verwandte Leistungen',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Reihenfolge',
      defaultValue: 0,
      admin: {
        description: 'Niedrigere Zahlen erscheinen zuerst',
      },
    },
  ],
}
