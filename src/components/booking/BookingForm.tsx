'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle, Calendar, ArrowLeft, Loader2, Mail, Phone, User, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BookingCalendar } from './BookingCalendar'

interface BookingFormProps {
  locale?: 'de' | 'en' | 'ru'
  className?: string
  onSuccess?: (booking: BookingResult) => void
}

interface BookingResult {
  id: string
  title: string
  startTime: string
  endTime: string
  meetingUrl?: string
  attendee: {
    name: string
    email: string
  }
}

type FormStep = 'calendar' | 'details' | 'submitting' | 'success' | 'error'

const translations = {
  de: {
    title: 'Termin buchen',
    subtitle: 'Wählen Sie einen passenden Termin für ein 30-minütiges Gespräch.',
    selectDateTime: 'Datum & Uhrzeit wählen',
    yourDetails: 'Ihre Kontaktdaten',
    name: 'Name',
    namePlaceholder: 'Ihr vollständiger Name',
    email: 'E-Mail',
    emailPlaceholder: 'ihre@email.com',
    phone: 'Telefon',
    phonePlaceholder: '+43 ...',
    phoneOptional: '(optional)',
    notes: 'Nachricht',
    notesPlaceholder: 'Worum geht es bei Ihrem Anliegen?',
    notesOptional: '(optional)',
    back: 'Zurück',
    continue: 'Weiter',
    submit: 'Termin buchen',
    submitting: 'Wird gebucht...',
    successTitle: 'Termin bestätigt!',
    successMessage: 'Sie erhalten in Kürze eine Bestätigung per E-Mail.',
    errorTitle: 'Fehler bei der Buchung',
    errorMessage: 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
    tryAgain: 'Erneut versuchen',
    contactDirect: 'Direkt kontaktieren',
    selectedDate: 'Ausgewählter Termin',
    meetingLink: 'Meeting-Link',
    openMeeting: 'Meeting öffnen',
    bookAnother: 'Weiteren Termin buchen',
    required: 'Pflichtfeld',
    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  },
  en: {
    title: 'Book a Meeting',
    subtitle: 'Choose a convenient time for a 30-minute consultation call.',
    selectDateTime: 'Select Date & Time',
    yourDetails: 'Your Contact Details',
    name: 'Name',
    namePlaceholder: 'Your full name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone',
    phonePlaceholder: '+1 ...',
    phoneOptional: '(optional)',
    notes: 'Message',
    notesPlaceholder: 'What would you like to discuss?',
    notesOptional: '(optional)',
    back: 'Back',
    continue: 'Continue',
    submit: 'Book Meeting',
    submitting: 'Booking...',
    successTitle: 'Meeting Confirmed!',
    successMessage: 'You will receive a confirmation email shortly.',
    errorTitle: 'Booking Failed',
    errorMessage: 'Please try again or contact us directly.',
    tryAgain: 'Try Again',
    contactDirect: 'Contact Directly',
    selectedDate: 'Selected Time',
    meetingLink: 'Meeting Link',
    openMeeting: 'Open Meeting',
    bookAnother: 'Book Another Meeting',
    required: 'Required',
    invalidEmail: 'Please enter a valid email address',
  },
}

export function BookingForm({ locale = 'de', className, onSuccess }: BookingFormProps) {
  const t = translations[locale as 'de' | 'en'] ?? translations['en']

  // Form state
  const [step, setStep] = useState<FormStep>('calendar')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null)

  // Form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Result
  const [booking, setBooking] = useState<BookingResult | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setSelectedDateTime(null)
  }

  const handleTimeSelect = (time: string, dateTime: string) => {
    setSelectedTime(time)
    setSelectedDateTime(dateTime)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = t.required
    }

    if (!email.trim()) {
      newErrors.email = t.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.invalidEmail
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime && selectedDateTime) {
      setStep('details')
    }
  }

  const handleBack = () => {
    setStep('calendar')
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !selectedDateTime) return

    setStep('submitting')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startTime: selectedDateTime,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          notes: notes.trim() || undefined,
          timeZone: 'Europe/Vienna',
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Booking failed')
      }

      setBooking(data.booking)
      setStep('success')
      onSuccess?.(data.booking)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      setStep('error')
    }
  }

  const handleReset = () => {
    setStep('calendar')
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedDateTime(null)
    setName('')
    setEmail('')
    setPhone('')
    setNotes('')
    setErrors({})
    setBooking(null)
    setErrorMessage(null)
  }

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return ''

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }

    const formattedDate = selectedDate.toLocaleDateString(
      locale === 'de' ? 'de-AT' : 'en-US',
      dateOptions
    )

    return `${formattedDate}, ${selectedTime} Uhr`
  }

  // Loading/Submitting State
  if (step === 'submitting') {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16 px-4', className)}>
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">{t.submitting}</p>
      </div>
    )
  }

  // Success State
  if (step === 'success' && booking) {
    const startDate = new Date(booking.startTime)
    const endDate = new Date(booking.endTime)

    return (
      <div className={cn('flex flex-col items-center text-center py-8 px-4', className)}>
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>

        <h3 className="text-2xl font-bold mb-2">{t.successTitle}</h3>
        <p className="text-muted-foreground mb-8">{t.successMessage}</p>

        <div className="w-full max-w-sm space-y-4 text-left">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">{t.selectedDate}</p>
                <p className="font-medium">
                  {startDate.toLocaleDateString(locale === 'de' ? 'de-AT' : 'en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {startDate.toLocaleTimeString(locale === 'de' ? 'de-AT' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {' - '}
                  {endDate.toLocaleTimeString(locale === 'de' ? 'de-AT' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{booking.attendee.name}</p>
                <p className="text-sm text-muted-foreground">{booking.attendee.email}</p>
              </div>
            </div>
          </div>

          {booking.meetingUrl && (
            <Button asChild className="w-full" size="lg">
              <a href={booking.meetingUrl} target="_blank" rel="noopener noreferrer">
                {t.openMeeting}
              </a>
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            {t.bookAnother}
          </Button>
        </div>
      </div>
    )
  }

  // Error State
  if (step === 'error') {
    return (
      <div className={cn('flex flex-col items-center text-center py-8 px-4', className)}>
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>

        <h3 className="text-2xl font-bold mb-2">{t.errorTitle}</h3>
        <p className="text-muted-foreground mb-2">{t.errorMessage}</p>
        {errorMessage && (
          <p className="text-sm text-destructive mb-8">{errorMessage}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleReset}>
            {t.tryAgain}
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:office@goldenwing.at`}>
              {t.contactDirect}
            </a>
          </Button>
        </div>
      </div>
    )
  }

  // Calendar Step
  if (step === 'calendar') {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-2">{t.selectDateTime}</h3>
          <p className="text-muted-foreground text-sm">{t.subtitle}</p>
        </div>

        <BookingCalendar
          onDateSelect={handleDateSelect}
          onTimeSelect={handleTimeSelect}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          locale={locale}
        />

        {selectedDate && selectedTime && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">{t.selectedDate}: </span>
                <span className="font-medium">{formatSelectedDateTime()}</span>
              </div>
              <Button onClick={handleContinue}>
                {t.continue}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Details Step
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-xl font-semibold">{t.yourDetails}</h3>
          <p className="text-sm text-muted-foreground">{formatSelectedDateTime()}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="booking-name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            {t.name} *
          </Label>
          <Input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="booking-email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            {t.email} *
          </Label>
          <Input
            id="booking-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="booking-phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            {t.phone}
            <span className="text-muted-foreground font-normal">{t.phoneOptional}</span>
          </Label>
          <Input
            id="booking-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            autoComplete="tel"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="booking-notes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            {t.notes}
            <span className="text-muted-foreground font-normal">{t.notesOptional}</span>
          </Label>
          <Textarea
            id="booking-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t.notesPlaceholder}
            rows={3}
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            {t.submit}
          </Button>
        </div>
      </form>
    </div>
  )
}
