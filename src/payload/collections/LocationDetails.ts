import type { CollectionConfig } from 'payload'

export const LocationDetails: CollectionConfig = {
  slug: 'location-details',
  labels: {
    singular: 'Standort Details',
    plural: 'Standort Details',
  },
  admin: {
    group: 'Standorte',
    useAsTitle: 'name',
    description: 'Detailseiten für jeden Standort (Wien, Dubai, California)',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  fields: [
    // =====================================================
    // BASIC INFO
    // =====================================================
    {
      name: 'name',
      type: 'text',
      label: 'Standort Name',
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
        description: 'z.B. "wien", "dubai", "roseville"',
      },
    },
    {
      name: 'flag',
      type: 'text',
      label: 'Flag Emoji',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      required: true,
      localized: true,
    },

    // =====================================================
    // SEO
    // =====================================================
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

    // =====================================================
    // HERO
    // =====================================================
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero Titel',
      localized: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero Beschreibung',
      localized: true,
    },

    // =====================================================
    // CONTACT INFO
    // =====================================================
    {
      name: 'contact',
      type: 'group',
      label: 'Kontaktdaten',
      fields: [
        {
          name: 'addressLines',
          type: 'array',
          label: 'Adresse (Zeilen)',
          localized: true,
          fields: [
            { name: 'line', type: 'text', label: 'Zeile', required: true },
          ],
        },
        { name: 'phone', type: 'text', label: 'Telefon' },
        { name: 'phoneDisplay', type: 'text', label: 'Telefon Anzeige' },
        { name: 'email', type: 'email', label: 'E-Mail' },
        { name: 'hours', type: 'text', label: 'Öffnungszeiten', localized: true },
      ],
    },

    // =====================================================
    // CONTENT LABELS
    // =====================================================
    {
      name: 'labels',
      type: 'group',
      label: 'Button & Label Texte',
      fields: [
        { name: 'scheduleMeeting', type: 'text', label: 'Termin Button', localized: true },
        { name: 'callNow', type: 'text', label: 'Jetzt anrufen Button', localized: true },
        { name: 'contactTitle', type: 'text', label: 'Kontakt Überschrift', localized: true },
        { name: 'addressLabel', type: 'text', label: 'Adresse Label', localized: true },
        { name: 'phoneLabel', type: 'text', label: 'Telefon Label', localized: true },
        { name: 'emailLabel', type: 'text', label: 'E-Mail Label', localized: true },
        { name: 'hoursLabel', type: 'text', label: 'Öffnungszeiten Label', localized: true },
      ],
    },

    // =====================================================
    // SERVICES
    // =====================================================
    {
      name: 'servicesTitle',
      type: 'text',
      label: 'Services Titel',
      localized: true,
    },
    {
      name: 'servicesSubtitle',
      type: 'textarea',
      label: 'Services Untertitel',
      localized: true,
    },
    {
      name: 'viewAllServicesLabel',
      type: 'text',
      label: 'Alle Leistungen Link Text',
      localized: true,
    },
    {
      name: 'services',
      type: 'array',
      label: 'Leistungen',
      localized: true,
      maxRows: 8,
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
      ],
    },

    // =====================================================
    // PROJECTS (optional)
    // =====================================================
    {
      name: 'projectsTitle',
      type: 'text',
      label: 'Projekte Titel',
      localized: true,
    },
    {
      name: 'projectsSubtitle',
      type: 'text',
      label: 'Projekte Untertitel',
      localized: true,
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projekte',
      localized: true,
      maxRows: 5,
      fields: [
        { name: 'client', type: 'text', label: 'Kunde', required: true },
        { name: 'category', type: 'text', label: 'Kategorie', required: true },
        { name: 'result', type: 'text', label: 'Ergebnis', required: true },
      ],
    },

    // =====================================================
    // INDUSTRIES/REGIONS (optional)
    // =====================================================
    {
      name: 'industriesTitle',
      type: 'text',
      label: 'Branchen/Regionen Titel',
      localized: true,
    },
    {
      name: 'industriesSubtitle',
      type: 'textarea',
      label: 'Branchen/Regionen Untertitel',
      localized: true,
    },
    {
      name: 'industries',
      type: 'array',
      label: 'Branchen/Regionen',
      localized: true,
      maxRows: 10,
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true },
      ],
    },

    // =====================================================
    // WHY CHOOSE (optional)
    // =====================================================
    {
      name: 'whyChooseTitle',
      type: 'text',
      label: 'Warum wir Titel',
      localized: true,
    },
    {
      name: 'whyChooseSubtitle',
      type: 'text',
      label: 'Warum wir Untertitel',
      localized: true,
    },
    {
      name: 'whyChooseItems',
      type: 'array',
      label: 'Warum wir Items',
      localized: true,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Globe', value: 'globe' },
            { label: 'Building', value: 'building' },
            { label: 'CheckCircle', value: 'check-circle' },
            { label: 'Train', value: 'train' },
            { label: 'Car', value: 'car' },
          ],
        },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'text', label: 'Beschreibung', required: true },
      ],
    },

    // =====================================================
    // TRANSPORT (optional, for Wien)
    // =====================================================
    {
      name: 'transportOptions',
      type: 'array',
      label: 'Anfahrt Optionen',
      localized: true,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Train', value: 'train' },
            { label: 'Car', value: 'car' },
            { label: 'Bus', value: 'bus' },
            { label: 'Plane', value: 'plane' },
          ],
        },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'textarea', label: 'Beschreibung', required: true },
      ],
    },
    {
      name: 'directionsTitle',
      type: 'text',
      label: 'Anfahrt Titel',
      localized: true,
    },
    {
      name: 'directionsSubtitle',
      type: 'text',
      label: 'Anfahrt Untertitel',
      localized: true,
    },
    {
      name: 'mapPlaceholder',
      type: 'textarea',
      label: 'Karten Platzhalter Text',
      localized: true,
    },
    {
      name: 'mapButtonText',
      type: 'text',
      label: 'Karten Button Text',
      localized: true,
    },
    {
      name: 'mapUrl',
      type: 'text',
      label: 'Google Maps URL',
    },

    // =====================================================
    // FAQS
    // =====================================================
    {
      name: 'faqTitle',
      type: 'text',
      label: 'FAQ Titel',
      localized: true,
    },
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

    // =====================================================
    // CTA
    // =====================================================
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
      label: 'CTA Button',
      localized: true,
    },

    // =====================================================
    // JSON-LD
    // =====================================================
    {
      name: 'geo',
      type: 'group',
      label: 'Geo-Koordinaten',
      fields: [
        { name: 'latitude', type: 'number', label: 'Breitengrad' },
        { name: 'longitude', type: 'number', label: 'Längengrad' },
      ],
    },
  ],
}
