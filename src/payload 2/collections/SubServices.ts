import type { CollectionConfig } from 'payload'

export const SubServices: CollectionConfig = {
  slug: 'sub-services',
  labels: {
    singular: 'Unter-Leistung',
    plural: 'Unter-Leistungen',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parentService', 'featured', 'order'],
    group: 'Leistungen',
    description: 'Detail-Leistungen unter den Haupt-Kategorien',
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
      admin: {
        position: 'sidebar',
        description: 'URL-Pfad (nicht übersetzen)',
      },
    },
    {
      name: 'parentService',
      type: 'relationship',
      label: 'Übergeordnete Leistung',
      relationTo: 'services',
      required: true,
      admin: {
        position: 'sidebar',
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
      label: 'Kurzbeschreibung',
      required: true,
      localized: true,
    },
    {
      name: 'longDescription',
      type: 'richText',
      label: 'Ausführliche Beschreibung',
      localized: true,
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Target', value: 'target' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'Pencil', value: 'pencil' },
        { label: 'FileText', value: 'file-text' },
        { label: 'Layout', value: 'layout' },
        { label: 'Monitor', value: 'monitor' },
        { label: 'ShoppingCart', value: 'shopping-cart' },
        { label: 'Zap', value: 'zap' },
        { label: 'Users', value: 'users' },
        { label: 'Map', value: 'map' },
        { label: 'TrendingUp', value: 'trending-up' },
        { label: 'Search', value: 'search' },
        { label: 'Globe', value: 'globe' },
        { label: 'Video', value: 'video' },
        { label: 'Camera', value: 'camera' },
        { label: 'Code', value: 'code' },
        { label: 'Smartphone', value: 'smartphone' },
        { label: 'Cloud', value: 'cloud' },
        { label: 'Lock', value: 'lock' },
        { label: 'Workflow', value: 'workflow' },
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
      name: 'benefits',
      type: 'array',
      label: 'Vorteile',
      localized: true,
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      label: 'Prozess',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Schritt',
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
      name: 'useCases',
      type: 'array',
      label: 'Ideal für',
      localized: true,
      fields: [
        {
          name: 'useCase',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliverables',
      type: 'array',
      label: 'Liefergegenstände',
      localized: true,
      fields: [
        {
          name: 'deliverable',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Preis',
      fields: [
        {
          name: 'from',
          type: 'number',
          label: 'Ab (EUR)',
        },
        {
          name: 'to',
          type: 'number',
          label: 'Bis (EUR)',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Einheit (z.B. pro Monat)',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Preis-Hinweis',
          localized: true,
        },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Dauer',
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      label: 'Verwandte Projekte',
      relationTo: 'projects',
      hasMany: true,
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
      name: 'order',
      type: 'number',
      label: 'Reihenfolge',
      admin: {
        position: 'sidebar',
      },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Titel',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Beschreibung',
          localized: true,
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
          localized: true,
        },
      ],
    },
  ],
}
