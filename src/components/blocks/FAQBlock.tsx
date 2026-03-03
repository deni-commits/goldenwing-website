'use client'

import { useState } from 'react'

type FAQProps = { block: any }

export function FAQBlock({ block }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        {block.headline && <h2 className="mb-12 text-center text-3xl font-bold">{block.headline}</h2>}
        <div className="space-y-4">
          {block.items?.map((item: any, i: number) => (
            <div key={i} className="border-border rounded-lg border">
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {item.question}
                <svg
                  className={`h-5 w-5 shrink-0 transition ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && <div className="text-muted-foreground px-6 pb-4">{item.answer}</div>}
            </div>
          ))}
        </div>

        {/* FAQPage Schema Markup */}
        {block.items?.length && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: block.items.map((item: any) => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                  },
                })),
              }),
            }}
          />
        )}
      </div>
    </section>
  )
}
