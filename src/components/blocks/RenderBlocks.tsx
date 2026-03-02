import { HeroBlock } from './HeroBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { FeatureGridBlock } from './FeatureGridBlock'
import { CTABlock } from './CTABlock'
import { FAQBlock } from './FAQBlock'
import { StatsBlock } from './StatsBlock'

type Block = {
  blockType: string
  id?: string
  [key: string]: unknown
}

const blockComponents: Record<string, React.ComponentType<{ block: Block }>> = {
  hero: HeroBlock,
  'image-text': ImageTextBlock,
  'feature-grid': FeatureGridBlock,
  cta: CTABlock,
  faq: FAQBlock,
  stats: StatsBlock,
}

export function RenderBlocks({ blocks }: { blocks: Block[] | null | undefined }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id || index} block={block} />
      })}
    </>
  )
}
