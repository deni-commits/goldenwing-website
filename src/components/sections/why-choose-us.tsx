import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import {
  Zap,
  Shield,
  Users,
  Star,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  Target,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'shield': Shield,
  'users': Users,
  'star': Star,
  'award': Award,
  'clock': Clock,
  'check-circle': CheckCircle,
  'trending-up': TrendingUp,
  'target': Target,
  'sparkles': Sparkles,
  'heart-handshake': HeartHandshake,
  'lightbulb': Lightbulb,
}

export interface Reason {
  icon: string
  title: string
  description: string
}

interface WhyChooseUsProps {
  title?: string
  subtitle?: string
  reasons: Reason[]
  className?: string
  variant?: 'grid' | 'list'
}

export function WhyChooseUs({
  title,
  subtitle,
  reasons,
  className,
  variant = 'grid'
}: WhyChooseUsProps) {
  return (
    <section className={cn('py-20', className)}>
      <Container variant="block">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid Variant */}
        {variant === 'grid' && (
          <div className={cn(
            'grid gap-4 sm:gap-6',
            reasons.length === 3 && 'md:grid-cols-3',
            reasons.length === 4 && 'md:grid-cols-2 lg:grid-cols-4',
            reasons.length === 6 && 'md:grid-cols-2 lg:grid-cols-3',
            reasons.length !== 3 && reasons.length !== 4 && reasons.length !== 6 && 'md:grid-cols-2 lg:grid-cols-3'
          )}>
            {reasons.map((reason, index) => {
              const IconComponent = iconMap[reason.icon] || Award
              return (
                <Card
                  key={reason.title}
                  className="group relative overflow-hidden border-border/50 bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* List Variant */}
        {variant === 'list' && (
          <div className="max-w-3xl mx-auto space-y-4">
            {reasons.map((reason, index) => {
              const IconComponent = iconMap[reason.icon] || Award
              return (
                <div
                  key={reason.title}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold mb-1 transition-colors duration-300 group-hover:text-primary">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
