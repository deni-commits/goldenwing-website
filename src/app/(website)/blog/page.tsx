import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, Tipps und Neuigkeiten rund um Web Development, SEO, Branding und Marketing.',
}

export default function BlogPage() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">
          Insights und Tipps aus der Welt des digitalen Marketings.
        </p>
        {/* Blog posts will be loaded from Payload CMS */}
      </div>
    </section>
  )
}
