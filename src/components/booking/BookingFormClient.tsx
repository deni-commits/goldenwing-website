'use client'

import { BookingFormSimple } from './BookingFormSimple'

interface BookingFormClientProps {
  locale?: 'de' | 'en' | 'ru'
}

export function BookingFormClient({ locale = 'de' }: BookingFormClientProps) {
  return <BookingFormSimple locale={locale} />
}
