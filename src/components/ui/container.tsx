import { cn } from '@/lib/utils'

export type ContainerVariant = 'full' | 'block' | 'wide'

interface ContainerProps {
  variant?: ContainerVariant
  className?: string
  children: React.ReactNode
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
}

const containerVariants: Record<ContainerVariant, string> = {
  full: 'w-full',
  block: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'w-full px-4 sm:px-8 lg:px-16 xl:px-24',
}

/**
 * Container Component
 *
 * Provides consistent width constraints across the site.
 *
 * Variants:
 * - full: 100% width (for backgrounds, hero sections)
 * - block: 1280px max with padding (for ALL content)
 *
 * Usage:
 * ```tsx
 * <section className="w-full bg-muted">
 *   <Container variant="block">
 *     <Content />
 *   </Container>
 * </section>
 * ```
 */
export function Container({
  variant = 'block',
  className,
  children,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={cn(containerVariants[variant], className)}>
      {children}
    </Component>
  )
}

// Section wrapper with consistent padding
interface SectionProps {
  children: React.ReactNode
  className?: string
  containerVariant?: ContainerVariant
  background?: 'default' | 'muted' | 'primary' | 'dark'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  id?: string
}

const backgroundStyles: Record<string, string> = {
  default: '',
  muted: 'bg-muted/50',
  primary: 'bg-primary text-primary-foreground',
  dark: 'bg-foreground text-background',
}

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
}

/**
 * Section Component
 *
 * Full-width section with optional background and container.
 * Provides consistent vertical spacing.
 *
 * Usage:
 * ```tsx
 * <Section background="muted">
 *   <Content />
 * </Section>
 * ```
 */
export function Section({
  children,
  className,
  containerVariant = 'block',
  background = 'default',
  padding = 'lg',
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(backgroundStyles[background], paddingStyles[padding], className)}>
      <Container variant={containerVariant}>
        {children}
      </Container>
    </section>
  )
}
