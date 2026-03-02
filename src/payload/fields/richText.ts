import type { Field } from 'payload'

export const richTextField = (name = 'content', label = 'Inhalt'): Field => ({
  name,
  type: 'richText',
  label,
  required: true,
})
