import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Einstellungen',
  fields: [
    { name: 'companyName', type: 'text', required: true, defaultValue: 'GoldenWing Creative Studios' },
    { name: 'logoLight', type: 'upload', relationTo: 'media', label: 'Logo (Hell)' },
    { name: 'logoDark', type: 'upload', relationTo: 'media', label: 'Logo (Dunkel)' },
    { type: 'group', name: 'contact', label: 'Kontakt', fields: [
      { name: 'address', type: 'textarea', label: 'Adresse' },
      { name: 'phone', type: 'text', label: 'Telefon' },
      { name: 'email', type: 'email', label: 'E-Mail' },
    ]},
    { type: 'group', name: 'social', label: 'Social Media', fields: [
      { name: 'instagram', type: 'text' },
      { name: 'linkedin', type: 'text' },
      { name: 'facebook', type: 'text' },
      { name: 'twitter', type: 'text' },
    ]},
    { type: 'group', name: 'seo', label: 'Standard SEO', fields: [
      { name: 'defaultTitle', type: 'text', label: 'Standard Titel' },
      { name: 'defaultDescription', type: 'textarea', label: 'Standard Beschreibung' },
      { name: 'defaultOgImage', type: 'upload', relationTo: 'media', label: 'Standard OG Bild' },
    ]},
    { name: 'analyticsId', type: 'text', label: 'Google Analytics ID', admin: { position: 'sidebar' } },
  ],
}
