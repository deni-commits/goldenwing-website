import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'sortOrder'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Position',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografie',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Reihenfolge',
      admin: {
        description: 'Niedrigere Zahlen erscheinen zuerst',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social-Media-Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: 'Plattform',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'GitHub', value: 'github' },
            { label: 'Website', value: 'website' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
  ],
}
