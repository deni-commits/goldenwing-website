import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referenzen',
  description: 'Unsere Projekte und Case Studies — erfolgreiche Zusammenarbeit mit Unternehmen aus verschiedenen Branchen.',
}

export default function ReferenzenPage() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Referenzen</h1>
        <p className="mb-16 max-w-2xl text-lg text-muted">
          Erfahre, wie wir unseren Kunden geholfen haben, ihre Ziele zu erreichen.
        </p>
        {/* Case studies will be loaded from Payload CMS */}
      </div>
    </section>
  )
}
