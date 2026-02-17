import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/ui/container'

export default function ProjectsLoading() {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-full max-w-xl mb-4" />
            <Skeleton className="h-6 w-full max-w-lg" />
          </div>
        </Container>
      </section>

      {/* Filter Skeleton */}
      <section className="pb-8">
        <Container variant="block">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full shrink-0" />
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Grid Skeleton */}
      <section className="pb-20">
        <Container variant="block">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
