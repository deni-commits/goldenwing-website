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

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'publishedDate',
      type: 'date',
      label: 'Veroeffentlichungsdatum',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
}
