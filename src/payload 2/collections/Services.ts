import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Leistung',
    plural: 'Leistungen',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
    group: 'Leistungen',
    description: 'Haupt-Leistungskategorien (Branding, Webdesign, etc.)',
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
        description: 'URL-Pfad (nicht übersetzen)',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Untertitel',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      required: true,
      localized: true,
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Palette (Branding)', value: 'palette' },
        { label: 'Globe (Web)', value: 'globe' },
        { label: 'Search (SEO)', value: 'search' },
        { label: 'Line Chart (Strategie)', value: 'line-chart' },
        { label: 'Camera (Content)', value: 'camera' },
        { label: 'Code (Software)', value: 'code' },
        { label: 'Target', value: 'target' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'Zap', value: 'zap' },
        { label: 'Users', value: 'users' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      label: 'Prozess-Schritte',
      localized: true,
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
        },
      ],
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
