// src/components/process-sections/index.ts
// Re-export types only - use direct imports for components to enable tree-shaking

export type { ProcessSectionProps, ProcessStep } from './types'

// Direct exports for specific imports
export { ProcessLargeNumber } from './ProcessLargeNumber'
export { ProcessExpandingRows } from './ProcessExpandingRows'
export { ProcessSplitCard } from './ProcessSplitCard'
export { ProcessVerticalStepper } from './ProcessVerticalStepper'
export { ProcessSlidingBorder } from './ProcessSlidingBorder'
export { ProcessMagazine } from './ProcessMagazine'

// Layout type for type-checking
export type ProcessLayoutType = 
  | 'large-number' 
  | 'expanding-rows' 
  | 'split-card' 
  | 'vertical-stepper' 
  | 'sliding-border' 
  | 'magazine'
