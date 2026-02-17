import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { Link } from '@/lib/i18n-navigation'

interface ToolHeroProps {
  title: string
  description: string
  icon?: React.ReactNode
  badge?: string
  className?: string
  children?: React.ReactNode
}

export function ToolHero({
  title,
  description,
  icon,
  badge,
  className,
  children,
}: ToolHeroProps) {
  return (
    <section className={cn('relative py-16 md:py-24 overflow-hidden', className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {icon && <span className="text-lg">{icon}</span>}
              {badge}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Children (URL Input, etc.) */}
          {children && (
            <div className="pt-4 max-w-2xl mx-auto">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

interface ToolHeroCompactProps {
  title: string
  url?: string
  score?: number
  className?: string
  locale?: string
}

export function ToolHeroCompact({ title, url, score, className, locale }: ToolHeroCompactProps) {
  return (
    <section className={cn('py-8 border-b', className)}>
      <div className="container mx-auto px-4">
        {/* Back to Tools Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          {locale === 'de' ? 'Alle Tools' : locale === 'ru' ? 'Все инструменты' : 'All Tools'}
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            {url && (
              <p className="text-muted-foreground mt-1 font-mono text-sm truncate max-w-md">
                {url}
              </p>
            )}
          </div>
          {score !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {locale === 'de' ? 'Gesamt-Score:' : locale === 'ru' ? 'Общий балл:' : 'Total Score:'}
              </span>
              <span className={cn(
                'text-3xl font-bold',
                score >= 90 ? 'text-green-500' :
                score >= 70 ? 'text-primary' :
                score >= 50 ? 'text-orange-500' : 'text-red-500'
              )}>
                {score}
              </span>
              <span className="text-muted-foreground">/100</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
