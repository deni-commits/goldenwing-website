'use client'

import { useState } from 'react'
import type { Dictionary } from '@/i18n/getDictionary'

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
  t?: Dictionary
}

export function ContactFormBlock({ block, t }: ContactFormBlockProps) {
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

  const labels = t?.blocks

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-2xl">
        {block.headline && <h2 className="mb-4 text-center text-3xl font-bold">{block.headline}</h2>}
        {block.description && <p className="text-muted-foreground mb-8 text-center">{block.description}</p>}

        {status === 'sent' ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
            <p className="text-lg font-semibold text-green-800">{labels?.formSuccess}</p>
            <p className="mt-2 text-sm text-green-700">{labels?.formSuccessMsg}</p>
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
                    className="border-border focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm transition focus:ring-1 focus:outline-none"
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    className="border-border focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm transition focus:ring-1 focus:outline-none"
                  >
                    <option value="">{labels?.selectPlaceholder}</option>
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
                    className="border-border focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm transition focus:ring-1 focus:outline-none"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg py-3 font-semibold transition disabled:opacity-50"
            >
              {status === 'sending' ? labels?.sending : labels?.send}
            </button>

            {status === 'error' && <p className="text-center text-sm text-red-600">{labels?.formError}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
