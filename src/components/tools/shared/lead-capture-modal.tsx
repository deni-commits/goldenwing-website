'use client'

import { useState, useCallback, type FormEvent } from 'react'
import { X, Mail, FileText, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LeadData) => Promise<void>
  toolName: string
  analyzedUrl?: string
  benefits?: string[]
  className?: string
  locale?: string
}

export interface LeadData {
  email: string
  newsletterConsent: boolean
  website: string
  source: string
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  toolName,
  analyzedUrl = '',
  benefits,
  className,
  locale = 'de',
}: LeadCaptureModalProps) {
  const [email, setEmail] = useState('')
  const [newsletterConsent, setNewsletterConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'

  const t = {
    close: isRussian ? 'Закрыть' : isGerman ? 'Schließen' : 'Close',
    successTitle: isRussian ? 'Успешно разблокировано!' : isGerman ? 'Erfolgreich freigeschaltet!' : 'Successfully unlocked!',
    successText: isRussian ? 'Теперь у вас есть доступ ко всем деталям.' : isGerman ? 'Sie haben jetzt Zugriff auf alle Details.' : 'You now have access to all details.',
    title: isRussian ? 'Получить полный отчет' : isGerman ? 'Vollständigen Report erhalten' : 'Get Full Report',
    subtitle: isRussian ? 'Введите email, чтобы разблокировать все детали.' : isGerman ? 'Geben Sie Ihre E-Mail ein, um alle Details freizuschalten.' : 'Enter your email to unlock all details.',
    emailPlaceholder: isRussian ? 'ваш@email.com' : isGerman ? 'ihre@email.at' : 'your@email.com',
    errorEmpty: isRussian ? 'Пожалуйста, введите email' : isGerman ? 'Bitte geben Sie Ihre E-Mail-Adresse ein' : 'Please enter your email address',
    errorInvalid: isRussian ? 'Пожалуйста, введите действительный email' : isGerman ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' : 'Please enter a valid email address',
    errorGeneric: isRussian ? 'Произошла ошибка' : isGerman ? 'Ein Fehler ist aufgetreten' : 'An error occurred',
    newsletterLabel: isRussian
      ? 'Хочу получать ежемесячные советы по SEO и веб-дизайну (необязательно, можно отписаться в любое время)'
      : isGerman
        ? 'Ich möchte monatlich Tipps zu SEO & Webdesign erhalten (optional, jederzeit abbestellbar)'
        : 'I want to receive monthly tips on SEO & web design (optional, unsubscribe anytime)',
    submitButton: isRussian ? 'Разблокировать отчет' : isGerman ? 'Report freischalten' : 'Unlock Report',
    loadingText: isRussian ? 'Разблокировка...' : isGerman ? 'Wird freigeschaltet...' : 'Unlocking...',
    privacyNote: isRussian ? 'Ваши данные в безопасности. Мы никогда не передаем их третьим лицам.' : isGerman ? 'Ihre Daten sind sicher. Wir geben sie niemals weiter.' : 'Your data is safe. We never share it with third parties.',
  }

  const defaultBenefits = isRussian
    ? ['Полный анализ всех проблем', 'Детальные рекомендации', 'PDF-отчет для скачивания']
    : isGerman
      ? ['Vollständige Analyse aller Probleme', 'Detaillierte Lösungsvorschläge', 'PDF-Report zum Download']
      : ['Complete analysis of all issues', 'Detailed solutions', 'PDF report download']

  const displayBenefits = benefits || defaultBenefits

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setError(t.errorEmpty)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.errorInvalid)
      return
    }

    setIsLoading(true)

    try {
      await onSubmit({
        email: email.trim().toLowerCase(),
        newsletterConsent,
        website: analyzedUrl,
        source: toolName,
      })
      setIsSuccess(true)
      // Auto close after success
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric)
    } finally {
      setIsLoading(false)
    }
  }, [email, newsletterConsent, analyzedUrl, toolName, onSubmit, onClose, t.errorEmpty, t.errorInvalid, t.errorGeneric])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full max-w-md bg-background rounded-2xl shadow-2xl',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label={t.close}
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.successTitle}</h3>
              <p className="text-muted-foreground">
                {t.successText}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h2 id="modal-title" className="text-2xl font-bold mb-2">
                  {t.title}
                </h2>
                <p className="text-muted-foreground">
                  {t.subtitle}
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-2 mb-6">
                {displayBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="lead-email" className="sr-only">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="lead-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError(null)
                      }}
                      placeholder={t.emailPlaceholder}
                      disabled={isLoading}
                      className={cn(
                        'h-12 pl-10 text-base',
                        error && 'border-destructive focus-visible:border-destructive'
                      )}
                      aria-invalid={!!error}
                      aria-describedby={error ? 'email-error' : undefined}
                    />
                  </div>
                  {error && (
                    <p id="email-error" className="mt-1.5 text-sm text-destructive">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="newsletter-consent"
                    checked={newsletterConsent}
                    onCheckedChange={(checked) => setNewsletterConsent(!!checked)}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="newsletter-consent"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    {t.newsletterLabel}
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full h-12 text-base font-bold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>{t.loadingText}</span>
                    </>
                  ) : (
                    t.submitButton
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  {t.privacyNote}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
