import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ueber uns',
  description: 'Erfahre mehr ueber GoldenWing Creative Studios — eine Wiener Agentur fuer Marketing, Branding und Web Development.',
}

export default function UeberUnsPage() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">Ueber uns</h1>
        <p className="mb-8 text-lg text-muted">
          GoldenWing Creative Studios ist eine Wiener Marketing- und Branding-Agentur,
          die digitale Strategien entwickelt und umsetzt.
        </p>
        {/* Content will be loaded from Payload CMS */}
      </div>
    </section>
  )
}
