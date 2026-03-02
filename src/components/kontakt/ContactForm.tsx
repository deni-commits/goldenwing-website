'use client'

import { useState } from 'react'

interface ContactFormProps {
  labels: {
    name: string
    email: string
    phone: string
    message: string
    send: string
  }
}

export function ContactForm({ labels }: ContactFormProps) {
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
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800">Vielen Dank!</p>
        <p className="mt-2 text-sm text-green-700">Wir melden uns in Kuerze bei Ihnen.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">{labels.name}</label>
        <input type="text" id="name" name="name" required className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">{labels.email}</label>
        <input type="email" id="email" name="email" required className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">{labels.phone}</label>
        <input type="tel" id="phone" name="phone" className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">{labels.message}</label>
        <textarea id="message" name="message" rows={5} required className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600 disabled:opacity-50"
      >
        {status === 'sending' ? '...' : labels.send}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600">Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.</p>
      )}
    </form>
  )
}
