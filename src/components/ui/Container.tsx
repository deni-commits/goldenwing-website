import { cn } from '@/lib/utils'

type ContainerSize = 'default' | 'narrow' | 'wide'

interface ContainerProps {
  size?: ContainerSize
  className?: string
  children: React.ReactNode
  as?: 'div' | 'section' | 'article' | 'main'
}

const sizeStyles: Record<ContainerSize, string> = {
  default: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
}

export function Container({ size = 'default', className, children, as: Component = 'div' }: ContainerProps) {
  return <Component className={cn(sizeStyles[size], className)}>{children}</Component>
}

type SectionVariant = 'dark' | 'light'
type SectionPadding = 'none' | 'sm' | 'md' | 'lg'

interface SectionProps {
  variant?: SectionVariant
  padding?: SectionPadding
  id?: string
  className?: string
  children: React.ReactNode
  containerSize?: ContainerSize
}

const variantStyles: Record<SectionVariant, string> = {
  dark: 'bg-background text-foreground',
  light: 'bg-muted text-foreground',
}

const paddingStyles: Record<SectionPadding, string> = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
}

export function Section({
  variant = 'dark',
  padding = 'lg',
  id,
  className,
  children,
  containerSize = 'default',
}: SectionProps) {
  return (
    <section id={id} className={cn(variantStyles[variant], paddingStyles[padding], className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
