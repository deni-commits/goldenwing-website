import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Team-Mitglied',
    plural: 'Team-Mitglieder',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'featured', 'order'],
    group: 'Personen',
    description: 'Team-Mitglieder für die Über-uns Seite',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      // Nicht lokalisiert - Name bleibt gleich
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-freundlicher Name (z.B. benedikt-hasibeder)',
      },
    },
    {
      name: 'role',
      type: 'text',
      label: 'Position',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografie',
      localized: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-Mail',
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
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
