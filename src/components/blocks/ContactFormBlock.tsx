'use client'

import { useState } from 'react'

interface ContactFormBlockProps {
  block: {
    headline?: string
    description?: string
    fields?: Array<{
      name: string
      type: 'text' | 'email' | 'phone' | 'textarea' | 'select'
      label: string
      required?: boolean
      options?: string
    }>
  }
}

export function ContactFormBlock({ block }: ContactFormBlockProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-2xl">
        {block.headline && (
          <h2 className="mb-4 text-center text-3xl font-bold">{block.headline}</h2>
        )}
        {block.description && (
          <p className="mb-8 text-center text-muted">{block.description}</p>
        )}

        {status === 'sent' ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
            <p className="text-lg font-semibold text-green-800">Vielen Dank!</p>
            <p className="mt-2 text-sm text-green-700">Wir melden uns in Kuerze bei Ihnen.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {block.fields?.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium">
                  {field.label}
                  {field.required && <span className="ml-0.5 text-red-500">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="">Bitte waehlen...</option>
                    {field.options
                      ?.split('\n')
                      .filter(Boolean)
                      .map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type === 'phone' ? 'tel' : field.type}
                    required={field.required}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-lg bg-gold py-3 font-semibold text-white transition hover:bg-gold-dark disabled:opacity-50"
            >
              {status === 'sending' ? 'Wird gesendet...' : 'Absenden'}
            </button>

            {status === 'error' && (
              <p className="text-center text-sm text-red-600">
                Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
