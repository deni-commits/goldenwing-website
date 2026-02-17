import { cn } from '@/lib/utils'

interface ResultSkeletonProps {
  className?: string
}

export function ResultSkeleton({ className }: ResultSkeletonProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Score Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Score Ring Skeleton */}
        <div className="w-40 h-40 rounded-full bg-muted animate-pulse" />

        {/* Category Scores */}
        <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-2.5 w-full bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border p-5 space-y-4 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="h-5 w-16 bg-muted rounded" />
              <div className="h-5 w-12 bg-muted rounded" />
            </div>
            <div className="h-2 w-full bg-muted rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-3/4 bg-muted rounded" />
              <div className="h-3 w-5/6 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Issues Section */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border p-4 animate-pulse"
            >
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AnalyzingState({
  progress = 0,
  currentStep = 'Analysiere...',
  steps = [
    'Website wird geladen...',
    'SEO-Daten werden geprüft...',
    'Performance wird gemessen...',
    'Design wird analysiert...',
    'Sicherheit wird überprüft...',
  ],
  url,
  className,
}: {
  progress?: number
  currentStep?: string
  steps?: string[]
  url?: string
  className?: string
}) {
  return (
    <div className={cn('max-w-lg mx-auto text-center space-y-8', className)}>
      {/* Animated Scanner Effect */}
      <div className="relative mx-auto">
        {/* Browser Window Mockup */}
        <div className="relative w-72 h-48 mx-auto rounded-xl border-2 border-muted overflow-hidden bg-muted/20">
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-muted">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            {url && (
              <div className="flex-1 text-xs text-muted-foreground truncate font-mono px-2">
                {url.replace(/^https?:\/\//, '')}
              </div>
            )}
          </div>

          {/* Page Content Skeleton */}
          <div className="p-3 space-y-2">
            <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
            <div className="h-2 w-full bg-muted/30 rounded animate-pulse" />
            <div className="h-2 w-5/6 bg-muted/30 rounded animate-pulse" />
            <div className="h-8 w-1/2 bg-muted/40 rounded mt-3 animate-pulse" />
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="h-12 bg-muted/30 rounded animate-pulse" />
              <div className="h-12 bg-muted/30 rounded animate-pulse" />
              <div className="h-12 bg-muted/30 rounded animate-pulse" />
            </div>
          </div>

          {/* Scanning Line Animation */}
          <div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
            style={{
              top: `${(progress / 100) * 100}%`,
              transition: 'top 0.5s ease-out',
              boxShadow: '0 0 20px var(--primary), 0 0 40px var(--primary)',
            }}
          />
        </div>

        {/* Progress Ring - positioned bottom right */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-background rounded-full border-2 border-muted shadow-lg flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              className="stroke-muted"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              className="stroke-primary transition-all duration-500 ease-out"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - progress / 100)}
            />
          </svg>
          <span className="absolute text-sm font-bold">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Current Step */}
      <div className="space-y-2 pt-4">
        <p className="text-lg font-medium">{currentStep}</p>
        <p className="text-sm text-muted-foreground">
          Dies dauert etwa 30-60 Sekunden
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-2 text-left bg-muted/20 rounded-xl p-4">
        {steps.map((step, index) => {
          const stepProgress = (index / steps.length) * 100
          const isComplete = progress > stepProgress
          const isCurrent = progress >= stepProgress && progress < ((index + 1) / steps.length) * 100

          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300',
                isCurrent && 'bg-primary/10 scale-[1.02]',
                isComplete && 'opacity-60',
              )}
            >
              <div className="relative">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                    isComplete
                      ? 'bg-green-500 border-green-500'
                      : isCurrent
                        ? 'border-primary bg-primary/10'
                        : 'border-muted bg-background'
                  )}
                >
                  {isComplete && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-4',
                      isComplete ? 'bg-green-500/50' : 'bg-muted'
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  'text-sm transition-colors',
                  isComplete
                    ? 'text-muted-foreground line-through'
                    : isCurrent
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground/60'
                )}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
