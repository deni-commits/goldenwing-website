import { Skeleton } from '@/components/ui/skeleton'

export default function UeberUnsLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-72 mx-auto mb-4" />
        <Skeleton className="h-6 w-[500px] max-w-full mx-auto" />
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>

      {/* Team Grid */}
      <div className="mb-16">
        <Skeleton className="h-8 w-40 mx-auto mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center space-y-4">
              <Skeleton className="h-40 w-40 rounded-full mx-auto" />
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
