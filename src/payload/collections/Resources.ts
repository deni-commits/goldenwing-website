import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: {
    singular: 'Ressource',
    plural: 'Ressourcen',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'category', 'featured'],
    group: 'Inhalt',
    description: 'Downloads, Guides, Templates und E-Books',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
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
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Typ',
      options: [
        { label: 'Download', value: 'download' },
        { label: 'Guide', value: 'guide' },
        { label: 'Template', value: 'template' },
        { label: 'Checkliste', value: 'checklist' },
        { label: 'E-Book', value: 'ebook' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      options: [
        { label: 'Branding', value: 'branding' },
        { label: 'Webdesign', value: 'webdesign' },
        { label: 'SEO', value: 'seo' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Strategie', value: 'strategie' },
        { label: 'Business', value: 'business' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'file',
      type: 'upload',
      label: 'Datei',
      relationTo: 'media',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      label: 'Vorschaubild',
      relationTo: 'media',
    },
    {
      name: 'downloadCount',
      type: 'number',
      label: 'Download-Anzahl',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Veröffentlicht am',
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
