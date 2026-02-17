import { CheckCircle, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'

interface KeyTakeawaysProps {
  points: string[]
  title?: string
  className?: string
  variant?: 'default' | 'highlight'
}

export function KeyTakeaways({
  points,
  title,
  className,
  variant = 'default',
}: KeyTakeawaysProps) {
  const isHighlight = variant === 'highlight'

  return (
    <aside
      className={cn(
        'rounded-xl p-6 md:p-8',
        isHighlight
          ? 'bg-primary/10 border border-primary/20'
          : 'bg-muted/50 border',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            isHighlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
          )}
        >
          <Lightbulb className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold">
          {title || 'Das Wichtigste zusammengefasst'}
        </h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle
              className={cn(
                'h-5 w-5 shrink-0 mt-0.5',
                isHighlight ? 'text-primary' : 'text-green-600 dark:text-green-500'
              )}
            />
            <span className="text-muted-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

// Section wrapper for key takeaways
interface KeyTakeawaysSectionProps {
  points: string[]
  title?: string
  className?: string
  variant?: 'default' | 'highlight'
}

export function KeyTakeawaysSection({
  points,
  title,
  className,
  variant = 'default',
}: KeyTakeawaysSectionProps) {
  return (
    <section className={cn('py-16 md:py-20', className)}>
      <Container variant="block">
        <div className="max-w-3xl mx-auto">
          <KeyTakeaways points={points} title={title} variant={variant} />
        </div>
      </Container>
    </section>
  )
}
