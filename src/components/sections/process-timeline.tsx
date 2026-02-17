import { ProcessSlidingBorder } from '@/components/process-sections/ProcessSlidingBorder'

export interface ProcessStep {
  step: string
  title: string
  description: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  title?: string
  subtitle?: string
  className?: string
}

export function ProcessTimeline({
  steps,
  title,
  subtitle,
  className
}: ProcessTimelineProps) {
  return (
    <ProcessSlidingBorder
      title={title || ''}
      subtitle={subtitle || ''}
      steps={steps.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      className={className}
    />
  )
}
