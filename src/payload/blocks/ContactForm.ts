import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contact-form',
  labels: { singular: 'Kontaktformular', plural: 'Kontaktformulare' },
  fields: [
    { name: 'headline', type: 'text', label: 'Ueberschrift', localized: true },
    { name: 'description', type: 'textarea', label: 'Beschreibung', localized: true },
    {
      name: 'fields',
      type: 'array',
      label: 'Formularfelder',
      fields: [
        { name: 'name', type: 'text', label: 'Feldname', required: true },
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
        { name: 'label', type: 'text', label: 'Bezeichnung', required: true, localized: true },
        { name: 'required', type: 'checkbox', label: 'Pflichtfeld', defaultValue: false },
        {
          name: 'options',
          type: 'textarea',
          label: 'Optionen (eine pro Zeile)',
          admin: { condition: (_, siblingData) => siblingData?.type === 'select' },
        },
      ],
    },
  ],
}
