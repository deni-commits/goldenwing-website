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
    // ============================================================
    // E-E-A-T FIELDS (Experience, Expertise, Authority, Trust)
    // ============================================================
    {
      name: 'credentials',
      type: 'array',
      label: 'Zertifizierungen & Qualifikationen',
      admin: {
        description: 'Offizielle Zertifikate, Abschlüsse und Qualifikationen für E-E-A-T',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Zertifizierungsname',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
          label: 'Ausstellende Organisation',
          required: true,
        },
        {
          name: 'dateAwarded',
          type: 'date',
          label: 'Erworben am',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL zum Nachweis',
          admin: {
            description: 'Link zur Zertifizierungsseite oder Credential',
          },
        },
        {
          name: 'credentialType',
          type: 'select',
          label: 'Art der Qualifikation',
          options: [
            { label: 'Hochschulabschluss', value: 'degree' },
            { label: 'Zertifizierung', value: 'certification' },
            { label: 'Kurs/Weiterbildung', value: 'course' },
            { label: 'Auszeichnung', value: 'award' },
            { label: 'Lizenz', value: 'license' },
          ],
        },
      ],
    },
    {
      name: 'expertise',
      type: 'array',
      label: 'Fachgebiete',
      admin: {
        description: 'Hauptfachgebiete und Spezialisierungen',
      },
      fields: [
        {
          name: 'area',
          type: 'select',
          label: 'Fachgebiet',
          options: [
            { label: 'Branding & Strategie', value: 'branding' },
            { label: 'Webdesign & UX/UI', value: 'webdesign' },
            { label: 'Digital Marketing', value: 'digital-marketing' },
            { label: 'SEO & Content', value: 'seo-content' },
            { label: 'Web-Entwicklung', value: 'development' },
            { label: 'IT & Cloud', value: 'it-cloud' },
            { label: 'Projektmanagement', value: 'project-management' },
            { label: 'Unternehmensberatung', value: 'consulting' },
          ],
          required: true,
        },
        {
          name: 'yearsExperience',
          type: 'number',
          label: 'Jahre Erfahrung',
          min: 0,
          max: 50,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
          localized: true,
        },
      ],
    },
    {
      name: 'awards',
      type: 'array',
      label: 'Auszeichnungen & Preise',
      admin: {
        description: 'Gewonnene Awards, Auszeichnungen und Anerkennungen',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
          label: 'Verleihende Organisation',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Datum',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL zur Auszeichnung',
        },
      ],
    },
    {
      name: 'extendedBio',
      type: 'richText',
      label: 'Erweiterte Biografie',
      localized: true,
      admin: {
        description: 'Detaillierte Biografie mit Werdegang für E-E-A-T Signale',
      },
    },
    {
      name: 'languages',
      type: 'array',
      label: 'Sprachen',
      fields: [
        {
          name: 'language',
          type: 'text',
          label: 'Sprache',
          required: true,
        },
        {
          name: 'level',
          type: 'select',
          label: 'Niveau',
          options: [
            { label: 'Muttersprache', value: 'native' },
            { label: 'Fließend', value: 'fluent' },
            { label: 'Verhandlungssicher', value: 'business' },
            { label: 'Grundkenntnisse', value: 'basic' },
          ],
        },
      ],
    },
    {
      name: 'notableClients',
      type: 'array',
      label: 'Namhafte Kunden',
      admin: {
        description: 'Bekannte Unternehmen/Marken für die gearbeitet wurde',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Unternehmen',
          required: true,
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
