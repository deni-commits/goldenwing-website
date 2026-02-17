import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  labels: {
    singular: 'Service-Paket',
    plural: 'Service-Pakete',
  },
  admin: {
    group: 'Leistungen',
    useAsTitle: 'title',
    description: 'Service-Pakete (Brand & Web Foundation, SEO & Content Growth, etc.)',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    // Basic Info
    {
      name: 'title',
      type: 'text',
      label: 'Paket Name',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      unique: true,
      admin: {
        description: 'z.B. "brand-web-foundation", "seo-content-growth"',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Palette', value: 'palette' },
        { label: 'TrendingUp', value: 'trending-up' },
        { label: 'Target', value: 'target' },
        { label: 'Settings', value: 'settings' },
      ],
    },
    {
      name: 'goal',
      type: 'text',
      label: 'Ziel (Kurzbeschreibung)',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      localized: true,
    },
    {
      name: 'idealFor',
      type: 'text',
      label: 'Ideal für',
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

    // Stats
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiken',
      localized: true,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', label: 'Wert', required: true },
        { name: 'label', type: 'text', label: 'Label', required: true },
      ],
    },

    // Intro Section
    {
      name: 'introTitle',
      type: 'text',
      label: 'Intro Titel',
      localized: true,
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Intro Text',
      localized: true,
    },
    {
      name: 'introHighlights',
      type: 'array',
      label: 'Intro Highlights',
      localized: true,
      maxRows: 6,
      fields: [
        { name: 'text', type: 'text', label: 'Text', required: true },
      ],
    },

    // What's Included Sections
    {
      name: 'sections',
      type: 'array',
      label: 'Paket-Inhalte Sektionen',
      localized: true,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Palette', value: 'palette' },
            { label: 'Globe', value: 'globe' },
            { label: 'FileText', value: 'file-text' },
            { label: 'Rocket', value: 'rocket' },
            { label: 'Target', value: 'target' },
            { label: 'TrendingUp', value: 'trending-up' },
            { label: 'Settings', value: 'settings' },
            { label: 'Search', value: 'search' },
            { label: 'Edit', value: 'edit' },
            { label: 'BarChart', value: 'bar-chart' },
            { label: 'Mail', value: 'mail' },
            { label: 'Users', value: 'users' },
          ],
        },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
        {
          name: 'items',
          type: 'array',
          label: 'Enthaltene Punkte',
          maxRows: 8,
          fields: [
            { name: 'text', type: 'text', label: 'Text', required: true },
          ],
        },
      ],
    },

    // Typical Contents (for overview page)
    {
      name: 'includes',
      type: 'array',
      label: 'Typische Inhalte (für Übersicht)',
      localized: true,
      maxRows: 6,
      fields: [
        { name: 'text', type: 'text', label: 'Text', required: true },
      ],
    },

    // Process
    {
      name: 'process',
      type: 'array',
      label: 'Prozess-Schritte',
      localized: true,
      maxRows: 8,
      fields: [
        { name: 'step', type: 'text', label: 'Schritt-Nummer', required: true },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
      ],
    },

    // Benefits
    {
      name: 'benefits',
      type: 'array',
      label: 'Vorteile',
      localized: true,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Target', value: 'target' },
            { label: 'Shield', value: 'shield' },
            { label: 'TrendingUp', value: 'trending-up' },
            { label: 'Users', value: 'users' },
            { label: 'Zap', value: 'zap' },
            { label: 'CheckCircle', value: 'check-circle' },
          ],
        },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
      ],
    },

    // Ideal For Tags
    {
      name: 'idealForTags',
      type: 'array',
      label: 'Ideal für (Tags)',
      localized: true,
      maxRows: 8,
      fields: [
        { name: 'text', type: 'text', label: 'Text', required: true },
      ],
    },

    // Investment
    {
      name: 'investmentTitle',
      type: 'text',
      label: 'Investment Titel',
      localized: true,
    },
    {
      name: 'investmentText',
      type: 'textarea',
      label: 'Investment Text',
      localized: true,
    },
    {
      name: 'investmentNote',
      type: 'text',
      label: 'Investment Hinweis',
      localized: true,
    },

    // FAQ
    {
      name: 'faqTitle',
      type: 'text',
      label: 'FAQ Titel',
      localized: true,
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      localized: true,
      maxRows: 10,
      fields: [
        { name: 'question', type: 'text', label: 'Frage', required: true },
        { name: 'answer', type: 'textarea', label: 'Antwort', required: true },
      ],
    },

    // CTA
    {
      name: 'ctaTitle',
      type: 'text',
      label: 'CTA Titel',
      localized: true,
    },
    {
      name: 'ctaDescription',
      type: 'text',
      label: 'CTA Beschreibung',
      localized: true,
    },
    {
      name: 'ctaPrimaryButton',
      type: 'text',
      label: 'CTA Primär Button Text',
      localized: true,
    },
    {
      name: 'ctaSecondaryButton',
      type: 'text',
      label: 'CTA Sekundär Button Text',
      localized: true,
    },
  ],
}
