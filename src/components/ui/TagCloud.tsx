import { cn } from '@/lib/utils'

interface TagCloudProps {
  tags: string[]
  variant?: 'dark' | 'light'
}

export function TagCloud({ tags, variant = 'dark' }: TagCloudProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className={cn(
            'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
            variant === 'dark'
              ? 'bg-primary/10 text-primary border-primary/20 border'
              : 'bg-primary/10 text-foreground border-primary/30 border',
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
