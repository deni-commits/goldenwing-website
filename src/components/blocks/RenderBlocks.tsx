import type { Dictionary } from '@/i18n/getDictionary'
import { HeroBlock } from './HeroBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { FeatureGridBlock } from './FeatureGridBlock'
import { CTABlock } from './CTABlock'
import { FAQBlock } from './FAQBlock'
import { StatsBlock } from './StatsBlock'
import { BeforeAfterBlock } from './BeforeAfterBlock'
import { PricingTableBlock } from './PricingTableBlock'
import { LogoCloudBlock } from './LogoCloudBlock'
import { TestimonialBlock } from './TestimonialBlock'
import { VideoEmbedBlock } from './VideoEmbedBlock'
import { ContactFormBlock } from './ContactFormBlock'

const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  'image-text': ImageTextBlock,
  'feature-grid': FeatureGridBlock,
  cta: CTABlock,
  faq: FAQBlock,
  stats: StatsBlock,
  'before-after': BeforeAfterBlock,
  'pricing-table': PricingTableBlock,
  'logo-cloud': LogoCloudBlock,
  testimonial: TestimonialBlock,
  'video-embed': VideoEmbedBlock,
  'contact-form': ContactFormBlock,
}

export function RenderBlocks({ blocks, t }: { blocks: any[] | null | undefined; t?: Dictionary }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id || index} block={block} t={t} />
      })}
    </>
  )
}
