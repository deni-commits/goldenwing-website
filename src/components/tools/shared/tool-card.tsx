import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  features?: string[]
  badge?: string
  className?: string
}

export function ToolCard({
  title,
  description,
  href,
  icon,
  features = [],
  badge,
  className,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col p-6 rounded-2xl border bg-card',
        'hover:border-primary/50 hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <span className="absolute -top-2.5 right-4 px-3 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
          {badge}
        </span>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Arrow */}
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <span>Jetzt testen</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

interface ToolCardGridProps {
  children: React.ReactNode
  className?: string
}

export function ToolCardGrid({ children, className }: ToolCardGridProps) {
  return (
    <div className={cn('grid md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {children}
    </div>
  )
}
