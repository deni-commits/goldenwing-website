import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Lead',
    plural: 'Leads',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'website', 'source', 'newsletterConsent', 'createdAt'],
    group: 'Marketing',
  },
  access: {
    // Only admins can read/manage leads
    read: ({ req: { user } }) => !!user,
    create: () => true, // Allow public submissions via API
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-Mail',
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      label: 'Website URL',
    },
    {
      name: 'newsletterConsent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Newsletter Einwilligung',
      admin: {
        description: 'Hat der monatlichen Newsletter-Zusendung zugestimmt',
      },
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Exit Intent Popup', value: 'exit-intent-popup' },
        { label: 'Kontaktformular', value: 'contact-form' },
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Landing Page', value: 'landing-page' },
        { label: 'SEO Checker', value: 'seo-checker' },
        { label: 'Performance Checker', value: 'performance-checker' },
        { label: 'Design Analyzer', value: 'design-analyzer' },
        { label: 'Security Checker', value: 'security-checker' },
        { label: 'Website Analyzer', value: 'website-analyzer' },
        { label: 'Sonstige', value: 'other' },
      ],
      defaultValue: 'other',
      label: 'Quelle',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Neu', value: 'new' },
        { label: 'Kontaktiert', value: 'contacted' },
        { label: 'Audit gesendet', value: 'audit-sent' },
        { label: 'Qualifiziert', value: 'qualified' },
        { label: 'Nicht interessiert', value: 'not-interested' },
        { label: 'Kunde', value: 'customer' },
      ],
      defaultValue: 'new',
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'consentTimestamp',
      type: 'date',
      label: 'Einwilligungszeitpunkt',
      admin: {
        description: 'Wann wurde die DSGVO-Einwilligung gegeben',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notizen',
      admin: {
        description: 'Interne Notizen zum Lead',
      },
    },
    {
      name: 'auditSentAt',
      type: 'date',
      label: 'Audit gesendet am',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  timestamps: true, // Adds createdAt and updatedAt
}
