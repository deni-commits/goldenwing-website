import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Hauptmenü',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Bezeichnung',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
        {
          name: 'children',
          type: 'array',
          label: 'Untermenü',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Bezeichnung',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'ctaButton',
      label: 'CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Bezeichnung',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
    {
      name: 'footerMenu',
      type: 'array',
      label: 'Footer-Menü',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Überschrift',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Bezeichnung',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
