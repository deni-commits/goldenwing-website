import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
  },
  versions: {
    drafts: true,
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
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Vorschaubild',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Autor',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      options: [
        { label: 'Webentwicklung', value: 'web' },
        { label: 'SEO', value: 'seo' },
        { label: 'Branding', value: 'branding' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Design', value: 'design' },
        { label: 'Technologie', value: 'tech' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Veröffentlichungsdatum',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Lesezeit (Minuten)',
      admin: {
        readOnly: true,
        description: 'Wird automatisch berechnet',
      },
      hooks: {
        beforeChange: [
          ({ data, siblingData }) => {
            const content = siblingData?.content
            if (!content) return 1

            const text =
              typeof content === 'string'
                ? content
                : JSON.stringify(content)

            const wordCount = text.trim().split(/\s+/).length
            const minutes = Math.max(1, Math.ceil(wordCount / 200))
            return minutes
          },
        ],
      },
    },
  ],
}
