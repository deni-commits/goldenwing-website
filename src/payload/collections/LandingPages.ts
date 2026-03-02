import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { Hero } from '../blocks/Hero'
import { ImageText } from '../blocks/ImageText'
import { FeatureGrid } from '../blocks/FeatureGrid'
import { CTA } from '../blocks/CTA'
import { FAQ } from '../blocks/FAQ'
import { Stats } from '../blocks/Stats'
import { PricingTable } from '../blocks/PricingTable'
import { LogoCloud } from '../blocks/LogoCloud'
import { TestimonialBlock } from '../blocks/TestimonialBlock'
import { VideoEmbed } from '../blocks/VideoEmbed'
import { ContactForm } from '../blocks/ContactForm'
import { BeforeAfter } from '../blocks/BeforeAfter'
import { revalidateOnChange } from '../hooks/revalidateOnChange'

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateOnChange],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titel',
    },
    ...slugField,
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      label: 'Layout',
      blocks: [Hero, ImageText, FeatureGrid, CTA, FAQ, Stats, PricingTable, LogoCloud, TestimonialBlock, VideoEmbed, ContactForm, BeforeAfter],
    },
    {
      name: 'conversionGoal',
      type: 'text',
      label: 'Konversionsziel',
      admin: {
        description: 'Beschreibung des gewuenschten Konversionsziels dieser Seite',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
      label: 'CTA-Text',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA-URL',
    },
  ],
}
