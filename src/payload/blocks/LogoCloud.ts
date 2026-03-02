import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logo-cloud',
  label: 'Logo Cloud',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Logos',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}
