'use client'

import { useState } from 'react'

interface ContactFormProps {
  labels: {
    name: string
    email: string
    phone: string
    message: string
    send: string
    privacyLabel: string
    privacyLink: string
    privacySuffix: string
    successTitle: string
    successMsg: string
    errorMsg: string
  }
  datenschutzHref: string
}

export function ContactForm({ labels, datenschutzHref }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      if (key !== '_gotcha') data[key] = value.toString()
    })

    // Honeypot check — bots fill hidden fields
    if (formData.get('_gotcha')) {
      setStatus('sent')
      return
    }

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
        <p className="text-lg font-semibold text-green-800">{labels.successTitle}</p>
        <p className="mt-2 text-sm text-green-700">{labels.successMsg}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from real users, bots fill it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          {labels.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="border-border focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition focus:ring-1 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {labels.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="border-border focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition focus:ring-1 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          {labels.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="border-border focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition focus:ring-1 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="border-border focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition focus:ring-1 focus:outline-none"
        />
      </div>

      {/* Privacy consent checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          required
          className="border-border text-primary focus:ring-primary mt-1 h-4 w-4 rounded"
        />
        <label htmlFor="privacy" className="text-muted-foreground text-sm">
          {labels.privacyLabel}{' '}
          <a
            href={datenschutzHref}
            className="text-primary hover:text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.privacyLink}
          </a>{' '}
          {labels.privacySuffix}
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || !privacyAccepted}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 font-semibold transition disabled:opacity-50"
      >
        {status === 'sending' ? '...' : labels.send}
      </button>
      {status === 'error' && <p className="text-sm text-red-600">{labels.errorMsg}</p>}
    </form>
  )
}
