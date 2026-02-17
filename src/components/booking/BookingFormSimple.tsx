'use client'

interface BookingFormSimpleProps {
  locale?: 'de' | 'en' | 'ru'
}

export function BookingFormSimple({ locale = 'de' }: BookingFormSimpleProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {locale === 'de' ? 'Termin buchen' : 'Book Appointment'}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {locale === 'de'
          ? 'Wählen Sie einen passenden Zeitpunkt für ein kostenloses 30-minütiges Erstgespräch.'
          : 'Choose a suitable time for a free 30-minute initial consultation.'}
      </p>
      <a
        href="https://cal.com/goldenwing/erstgespraech"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
      >
        {locale === 'de' ? 'Termin vereinbaren' : 'Schedule Appointment'}
      </a>
    </div>
  )
}
