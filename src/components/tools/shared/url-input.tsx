'use client'

import { useState, useCallback, type FormEvent } from 'react'
import { Globe, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface UrlInputProps {
  onSubmit: (url: string) => void | Promise<void>
  isLoading?: boolean
  placeholder?: string
  buttonText?: string
  className?: string
  disabled?: boolean
  locale?: string
}

function normalizeUrl(input: string): string {
  let url = input.trim().toLowerCase()

  // Remove trailing slash
  url = url.replace(/\/+$/, '')

  // Add https:// if no protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }

  // Upgrade http to https
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://')
  }

  return url
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    // Must have a valid hostname with at least one dot
    return parsed.hostname.includes('.') && parsed.hostname.length > 3
  } catch {
    return false
  }
}

export function UrlInput({
  onSubmit,
  isLoading = false,
  placeholder,
  buttonText,
  className,
  disabled = false,
  locale = 'de',
}: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'

  const t = {
    placeholder: placeholder || (isRussian ? 'https://ваш-сайт.com' : isGerman ? 'https://ihre-website.at' : 'https://your-website.com'),
    buttonText: buttonText || (isRussian ? 'Анализировать' : isGerman ? 'Analysieren' : 'Analyze'),
    loadingText: isRussian ? 'Анализ...' : isGerman ? 'Analysiere...' : 'Analyzing...',
    errorEmpty: isRussian ? 'Пожалуйста, введите URL' : isGerman ? 'Bitte geben Sie eine URL ein' : 'Please enter a URL',
    errorInvalid: isRussian ? 'Пожалуйста, введите действительный URL' : isGerman ? 'Bitte geben Sie eine gültige URL ein' : 'Please enter a valid URL',
    errorGeneric: isRussian ? 'Произошла ошибка' : isGerman ? 'Ein Fehler ist aufgetreten' : 'An error occurred',
    free: isRussian ? 'Бесплатно' : isGerman ? 'Kostenlos' : 'Free',
    noRegistration: isRussian ? 'Без регистрации' : isGerman ? 'Keine Registrierung' : 'No registration',
    instantResult: isRussian ? 'Мгновенный результат' : isGerman ? 'Sofort-Ergebnis' : 'Instant result',
  }

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!url.trim()) {
      setError(t.errorEmpty)
      return
    }

    const normalizedUrl = normalizeUrl(url)

    if (!isValidUrl(normalizedUrl)) {
      setError(t.errorInvalid)
      return
    }

    try {
      await onSubmit(normalizedUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric)
    }
  }, [url, onSubmit, t.errorEmpty, t.errorInvalid, t.errorGeneric])

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setError(null)
            }}
            placeholder={t.placeholder}
            disabled={isLoading || disabled}
            className={cn(
              'h-14 pl-12 pr-4 text-base rounded-xl border-2 bg-background',
              'focus-visible:border-primary focus-visible:ring-primary/20',
              error && 'border-destructive focus-visible:border-destructive'
            )}
            aria-label="Website URL"
            aria-invalid={!!error}
            aria-describedby={error ? 'url-error' : undefined}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || disabled}
          size="lg"
          className="h-14 px-8 rounded-xl font-bold text-base min-w-[160px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{t.loadingText}</span>
            </>
          ) : (
            <>
              <span>{t.buttonText}</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      {error && (
        <p id="url-error" className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="text-green-500">✓</span> {t.free}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-green-500">✓</span> {t.noRegistration}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-green-500">✓</span> {t.instantResult}
        </span>
      </div>
    </form>
  )
}
