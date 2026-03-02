import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web Development, SEO, Branding und Marketing — unsere Services fuer deinen Erfolg.',
}

export default function ServicesPage() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Unsere Services</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">
          Von der Strategie bis zur Umsetzung — wir begleiten dich auf dem gesamten Weg.
        </p>
        {/* Services will be loaded from Payload CMS */}
      </div>
    </section>
  )
}
