import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategorie',
    plural: 'Kategorien',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Einstellungen',
    description: 'Blog-Kategorien für die Artikel',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      localized: true,
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Einstellungen',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title', localized: true },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description', localized: true },
        { name: 'keywords', type: 'text', label: 'Keywords (kommagetrennt)', localized: true },
      ],
    },
  ],
}
