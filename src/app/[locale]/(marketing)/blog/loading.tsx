import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/ui/container'

export default function BlogLoading() {
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

      {/* Blog Posts Grid Skeleton */}
      <section className="pb-20">
        <Container variant="block">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-2 pt-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
