import type { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  label: 'Testimonial',
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Darstellung',
      defaultValue: 'single',
      options: [
        { label: 'Einzeln', value: 'single' },
        { label: 'Slider', value: 'slider' },
        { label: 'Raster', value: 'grid' },
      ],
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      label: 'Testimonials',
      hasMany: true,
    },
  ],
}
