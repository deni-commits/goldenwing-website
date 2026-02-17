import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature, FixedToolbarFeature } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog-Beitrag',
    plural: 'Blog-Beiträge',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'featured'],
    group: 'Inhalt',
    description: 'Blog-Artikel und News für die Website',
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
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'URL-Pfad für SEO (pro Sprache unterschiedlich)',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        { label: 'Entwurf', value: 'draft' },
        { label: 'Geplant', value: 'scheduled' },
        { label: 'Veröffentlicht', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          BlocksFeature({
            blocks: ['htmlBlock'], // Reference by slug from global blocks
          }),
        ],
      }),
    },
    {
      name: 'mainImage',
      type: 'upload',
      label: 'Hauptbild',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Kategorie',
      relationTo: 'categories',
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Autor',
      relationTo: 'team-members',
    },
    // Related Services for internal linking
    {
      name: 'relatedServices',
      type: 'relationship',
      label: 'Verknüpfte Leistungen',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Für interne Verlinkung zu relevanten Leistungen',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Veröffentlicht am',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Lesezeit (Minuten)',
      defaultValue: 5,
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
    // Expert Quotes
    {
      name: 'expertQuotes',
      type: 'array',
      label: 'Experten-Zitate',
      localized: true,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Zitat',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Autor/Experte',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Rolle/Position',
        },
        {
          name: 'source',
          type: 'text',
          label: 'Quelle (URL oder Buch)',
        },
      ],
    },
    // FAQs for Schema.org
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs (für Google Rich Results)',
      localized: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Frage',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Antwort',
          required: true,
        },
      ],
    },
    // Sources/Citations
    {
      name: 'sources',
      type: 'array',
      label: 'Quellen & Referenzen',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
        {
          name: 'author',
          type: 'text',
          label: 'Autor',
        },
        {
          name: 'year',
          type: 'text',
          label: 'Jahr',
        },
      ],
    },
    // Table of Contents
    {
      name: 'tableOfContents',
      type: 'array',
      label: 'Inhaltsverzeichnis',
      localized: true,
      admin: {
        description: 'Für lange Artikel - generiert Sprungmarken',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Überschrift',
          required: true,
        },
        {
          name: 'anchor',
          type: 'text',
          label: 'Anker-ID',
          required: true,
        },
      ],
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
          label: 'Keywords (kommagetrennt)',
          localized: true,
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL (optional)',
        },
      ],
    },
  ],
}
