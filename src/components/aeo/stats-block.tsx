import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'

export interface Stat {
  value: string
  label: string
  source: string
  sourceUrl?: string
}

interface StatsBlockProps {
  stats: Stat[]
  className?: string
  columns?: 2 | 3 | 4
}

export function StatsBlock({ stats, className, columns = 3 }: StatsBlockProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-card border rounded-xl p-6 flex flex-col"
        >
          <span className="text-4xl md:text-5xl font-bold text-primary mb-2">
            {stat.value}
          </span>
          <span className="text-lg font-medium mb-3">
            {stat.label}
          </span>
          <cite className="text-sm text-muted-foreground mt-auto not-italic flex items-start gap-1">
            <span className="shrink-0">Quelle:</span>
            {stat.sourceUrl ? (
              <a
                href={stat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                {stat.source}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            ) : (
              <span>{stat.source}</span>
            )}
          </cite>
        </div>
      ))}
    </div>
  )
}

// Section wrapper for stats
interface StatsSectionProps {
  title?: string
  subtitle?: string
  stats: Stat[]
  className?: string
  columns?: 2 | 3 | 4
}

export function StatsSection({
  title,
  subtitle,
  stats,
  className,
  columns = 3,
}: StatsSectionProps) {
  return (
    <section className={cn('py-16 md:py-20', className)}>
      <Container variant="block">
        {(title || subtitle) && (
          <div className="mb-10 max-w-2xl">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        <StatsBlock stats={stats} columns={columns} />
      </Container>
    </section>
  )
}
