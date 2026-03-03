import { cn } from '@/lib/utils'

interface Location {
  city: string
  country: string
  flag?: string
}

interface LocationCardsProps {
  locations: Location[]
  variant?: 'dark' | 'light'
}

export function LocationCards({ locations, variant = 'dark' }: LocationCardsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {locations.map((loc, i) => (
        <div
          key={i}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium',
            variant === 'dark'
              ? 'bg-card border-border text-foreground'
              : 'bg-background border-border text-foreground',
          )}
        >
          {loc.flag && <span className="text-base">{loc.flag}</span>}
          <span>
            {loc.city}, {loc.country}
          </span>
        </div>
      ))}
    </div>
  )
}
