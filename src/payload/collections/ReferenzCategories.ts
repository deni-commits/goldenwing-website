import type { CollectionConfig } from 'payload'

export const ReferenzCategories: CollectionConfig = {
  slug: 'referenz-categories',
  labels: {
    singular: 'Referenz-Kategorie',
    plural: 'Referenz-Kategorien',
  },
  admin: {
    group: 'Referenzen',
    useAsTitle: 'title',
    description: 'Referenz-Kategorien (Branding, Webdesign, E-Commerce, etc.)',
    defaultColumns: ['title', 'slug', 'type', 'updatedAt'],
  },
  fields: [
    // Basic Info
    {
      name: 'title',
      type: 'text',
      label: 'Kategorie Name',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      unique: true,
      admin: {
        description: 'z.B. "branding", "webdesign", "e-commerce"',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Typ',
      required: true,
      options: [
        { label: 'Service', value: 'service' },
        { label: 'Branche', value: 'industry' },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon (Fallback)',
      admin: {
        description: 'Wird verwendet wenn kein Bild hochgeladen wurde',
      },
      options: [
        { label: 'Palette (Branding)', value: 'palette' },
        { label: 'Globe (Webdesign)', value: 'globe' },
        { label: 'Megaphone (Marketing)', value: 'megaphone' },
        { label: 'Search (SEO)', value: 'search' },
        { label: 'Code (Entwicklung)', value: 'code' },
        { label: 'Cloud (IT & Cloud)', value: 'cloud' },
        { label: 'Building2 (Dienstleistung)', value: 'building2' },
        { label: 'ShoppingCart (E-Commerce)', value: 'shopping-cart' },
        { label: 'Factory (Industrie)', value: 'factory' },
        { label: 'Cpu (Technologie)', value: 'cpu' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Kategorie-Bild',
      admin: {
        description: 'Bild für die Kategorie-Karte (empfohlen: 800x600px)',
      },
    },
    {
      name: 'projectCategory',
      type: 'text',
      label: 'Projekt-Kategorie Filter',
      admin: {
        description: 'Der Wert zum Filtern von Projekten (z.B. "branding", "webdesign")',
      },
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Einstellungen',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title', localized: true },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description', localized: true },
        { name: 'keywords', type: 'text', label: 'Keywords (kommagetrennt)', localized: true },
      ],
    },

    // Hero / Content Section
    {
      name: 'subtitle',
      type: 'text',
      label: 'Untertitel',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      localized: true,
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Intro Text',
      localized: true,
    },

    // Services
    {
      name: 'services',
      type: 'array',
      label: 'Leistungen in dieser Kategorie',
      localized: true,
      maxRows: 10,
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
      ],
    },

    // Process
    {
      name: 'process',
      type: 'array',
      label: 'Prozess-Schritte',
      localized: true,
      maxRows: 6,
      fields: [
        { name: 'step', type: 'text', label: 'Schritt-Nummer', required: true },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
      ],
    },

    // Client Types
    {
      name: 'clientTypes',
      type: 'array',
      label: 'Kundentypen',
      localized: true,
      maxRows: 10,
      fields: [
        { name: 'text', type: 'text', label: 'Text', required: true },
      ],
    },

    // Results
    {
      name: 'results',
      type: 'array',
      label: 'Ergebnisse/Statistiken',
      localized: true,
      maxRows: 4,
      fields: [
        { name: 'metric', type: 'text', label: 'Metrik (z.B. "95%")', required: true },
        { name: 'label', type: 'text', label: 'Label', required: true },
        { name: 'detail', type: 'text', label: 'Detail', required: true },
      ],
    },

    // Benefits
    {
      name: 'benefits',
      type: 'array',
      label: 'Vorteile',
      localized: true,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Target', value: 'target' },
            { label: 'Users', value: 'users' },
            { label: 'TrendingUp', value: 'trending-up' },
            { label: 'Award', value: 'award' },
            { label: 'Shield', value: 'shield' },
            { label: 'Zap', value: 'zap' },
            { label: 'CheckCircle', value: 'check-circle' },
            { label: 'Globe', value: 'globe' },
            { label: 'BarChart', value: 'bar-chart' },
            { label: 'DollarSign', value: 'dollar-sign' },
          ],
        },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
      ],
    },

    // FAQs
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      localized: true,
      maxRows: 10,
      fields: [
        { name: 'question', type: 'text', label: 'Frage', required: true },
        { name: 'answer', type: 'textarea', label: 'Antwort', required: true },
      ],
    },

    // Labels
    {
      name: 'labels',
      type: 'group',
      label: 'Section Labels',
      fields: [
        { name: 'servicesTitle', type: 'text', label: 'Services Titel', localized: true },
        { name: 'servicesSubtitle', type: 'text', label: 'Services Untertitel', localized: true },
        { name: 'resultsTitle', type: 'text', label: 'Ergebnisse Titel', localized: true },
        { name: 'processTitle', type: 'text', label: 'Prozess Titel', localized: true },
        { name: 'processSubtitle', type: 'text', label: 'Prozess Untertitel', localized: true },
        { name: 'benefitsTitle', type: 'text', label: 'Vorteile Titel', localized: true },
        { name: 'benefitsSubtitle', type: 'text', label: 'Vorteile Untertitel', localized: true },
        { name: 'clientTypesTitle', type: 'text', label: 'Kundentypen Titel', localized: true },
        { name: 'clientTypesSubtitle', type: 'text', label: 'Kundentypen Untertitel', localized: true },
        { name: 'projectsTitle', type: 'text', label: 'Projekte Titel', localized: true },
        { name: 'projectsSubtitle', type: 'text', label: 'Projekte Untertitel', localized: true },
        { name: 'projectsEmpty', type: 'text', label: 'Keine Projekte Text', localized: true },
        { name: 'projectsEmptySubtitle', type: 'text', label: 'Keine Projekte Untertitel', localized: true },
        { name: 'projectsEmptyCta', type: 'text', label: 'Keine Projekte CTA', localized: true },
        { name: 'faqTitle', type: 'text', label: 'FAQ Titel', localized: true },
        { name: 'faqSubtitle', type: 'text', label: 'FAQ Untertitel', localized: true },
      ],
    },

    // Buttons & Links
    {
      name: 'viewProjectLabel',
      type: 'text',
      label: 'Projekt ansehen Label',
      localized: true,
    },
    {
      name: 'allReferenzenLabel',
      type: 'text',
      label: 'Alle Referenzen Label',
      localized: true,
    },

    // CTA
    {
      name: 'ctaTitle',
      type: 'text',
      label: 'CTA Titel',
      localized: true,
    },
    {
      name: 'ctaDescription',
      type: 'text',
      label: 'CTA Beschreibung',
      localized: true,
    },
    {
      name: 'ctaButton',
      type: 'text',
      label: 'CTA Button Text',
      localized: true,
    },
  ],
}
