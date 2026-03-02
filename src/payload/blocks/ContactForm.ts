import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contact-form',
  label: 'Kontaktformular',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Formularfelder',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Feldname',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          label: 'Feldtyp',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'E-Mail', value: 'email' },
            { label: 'Telefon', value: 'phone' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Auswahl', value: 'select' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Bezeichnung',
          required: true,
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Pflichtfeld',
          defaultValue: false,
        },
        {
          name: 'options',
          type: 'textarea',
          label: 'Optionen (für Auswahlfeld, eine Option pro Zeile)',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'select',
          },
        },
      ],
    },
  ],
}
