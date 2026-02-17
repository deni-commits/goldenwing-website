import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Projekt',
    plural: 'Projekte',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'featured'],
    group: 'Inhalt',
    description: 'Portfolio-Projekte und Case Studies',
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
      name: 'client',
      type: 'text',
      label: 'Kunde',
      required: true,
      // Nicht lokalisiert - Firmenname bleibt gleich
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      options: [
        { label: 'Branding', value: 'branding' },
        { label: 'Webdesign', value: 'webdesign' },
        { label: 'SEO', value: 'seo' },
        { label: 'Strategie', value: 'strategie' },
        { label: 'Content', value: 'content' },
        { label: 'Software', value: 'software' },
      ],
    },
    {
      name: 'year',
      type: 'number',
      label: 'Jahr',
      min: 2020,
      max: 2030,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      required: true,
      localized: true,
    },
    {
      name: 'companyDescription',
      type: 'textarea',
      label: 'Unternehmensbeschreibung',
      localized: true,
      admin: {
        description: 'Beschreibung des Kundenunternehmens',
      },
    },
    {
      name: 'industry',
      type: 'select',
      label: 'Branche',
      hasMany: true,
      options: [
        { label: 'Industrie & Manufacturing', value: 'manufacturing' },
        { label: 'E-Commerce & Retail', value: 'ecommerce' },
        { label: 'Services & Consulting', value: 'consulting' },
        { label: 'Technology & SaaS', value: 'technology' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Finance & FinTech', value: 'finance' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
      label: 'Ausführliche Beschreibung',
      localized: true,
    },
    {
      name: 'challenge',
      type: 'textarea',
      label: 'Herausforderung',
      localized: true,
    },
    {
      name: 'solution',
      type: 'textarea',
      label: 'Lösung (Einleitung)',
      localized: true,
      admin: {
        description: 'Einleitender Text zur Lösung',
      },
    },
    {
      name: 'solutionPoints',
      type: 'array',
      label: 'Lösungspunkte',
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
          type: 'text',
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'mainImage',
      type: 'upload',
      label: 'Hauptbild',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Bildunterschrift',
          localized: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      localized: true,
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'services',
      type: 'array',
      label: 'Erbrachte Leistungen',
      localized: true,
      fields: [
        {
          name: 'service',
          type: 'text',
        },
      ],
    },
    {
      name: 'results',
      type: 'array',
      label: 'Ergebnisse',
      fields: [
        {
          name: 'metric',
          type: 'text',
          label: 'Metrik',
          // Nicht lokalisiert - Zahlen/Prozente
        },
        {
          name: 'label',
          type: 'text',
          label: 'Beschreibung',
          localized: true,
        },
      ],
    },
    {
      name: 'liveUrl',
      type: 'text',
      label: 'Live URL',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'clientFeedback',
      type: 'group',
      label: 'Kundenfeedback',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Zitat',
          localized: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Name',
          // Nicht lokalisiert - Name bleibt gleich
        },
        {
          name: 'role',
          type: 'text',
          label: 'Position',
          localized: true,
        },
      ],
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
  ],
}
