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
  locale: string
}

export function ContactForm({ labels, locale }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const privacyLabel =
    locale === 'de'
      ? 'Ich stimme der Verarbeitung meiner Daten gemaess der'
      : locale === 'ru'
        ? 'Я согласен с обработкой моих данных в соответствии с'
        : 'I agree to the processing of my data according to the'

  const privacyLink =
    locale === 'de' ? 'Datenschutzerklaerung' : locale === 'ru' ? 'политикой конфиденциальности' : 'Privacy Policy'

  const successTitle =
    locale === 'de' ? 'Vielen Dank!' : locale === 'ru' ? 'Спасибо!' : 'Thank you!'

  const successMsg =
    locale === 'de'
      ? 'Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
      : locale === 'ru'
        ? 'Мы свяжемся с вами в течение 24 часов.'
        : 'We will get back to you within 24 hours.'

  const errorMsg =
    locale === 'de'
      ? 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.'
      : locale === 'ru'
        ? 'Что-то пошло не так. Пожалуйста, попробуйте ещё раз.'
        : 'Something went wrong. Please try again.'

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
        <p className="text-lg font-semibold text-green-800">{successTitle}</p>
        <p className="mt-2 text-sm text-green-700">{successMsg}</p>
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

      {/* Privacy consent checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
        />
        <label htmlFor="privacy" className="text-sm text-muted">
          {privacyLabel}{' '}
          <a href={`/${locale}/datenschutz`} className="text-gold-600 underline hover:text-gold-700" target="_blank" rel="noopener noreferrer">
            {privacyLink}
          </a>
          {' '}zu.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || !privacyAccepted}
        className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600 disabled:opacity-50"
      >
        {status === 'sending' ? '...' : labels.send}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}
    </form>
  )
}
