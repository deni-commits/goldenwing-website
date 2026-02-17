import { Skeleton } from '@/components/ui/skeleton'

export default function MarketingLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Skeleton */}
      <section className="min-h-[500px] flex items-center justify-center py-24">
        <div className="container max-w-4xl text-center">
          <Skeleton className="h-6 w-40 mx-auto mb-4" />
          <Skeleton className="h-14 w-full mb-4" />
          <Skeleton className="h-14 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-5 w-2/3 mx-auto mb-8" />
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-36 rounded-md" />
            <Skeleton className="h-12 w-36 rounded-md" />
          </div>
        </div>
      </section>

      {/* Stats Skeleton */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-10 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16">
        <div className="container">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
