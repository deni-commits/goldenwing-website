'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void
  onTimeSelect: (time: string, dateTime: string) => void
  selectedDate: Date | null
  selectedTime: string | null
  locale?: 'de' | 'en' | 'ru'
}

interface DaySlots {
  date: string
  times: string[]
}

const DAYS_DE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Get initial values at module level to avoid issues
const getInitialYear = () => new Date().getFullYear()
const getInitialMonth = () => new Date().getMonth()

export function BookingCalendar({
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
  locale = 'de'
}: BookingCalendarProps) {
  // Use primitive values instead of Date object to avoid reference equality issues
  const [currentYear, setCurrentYear] = useState(getInitialYear)
  const [currentMonthNum, setCurrentMonthNum] = useState(getInitialMonth)
  const [retryKey, setRetryKey] = useState(0)
  const [slots, setSlots] = useState<DaySlots[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [dayTimes, setDayTimes] = useState<string[]>([])

  const days = locale === 'de' ? DAYS_DE : DAYS_EN
  const months = locale === 'de' ? MONTHS_DE : MONTHS_EN

  // Fetch available slots for the current month
  useEffect(() => {
    let cancelled = false

    const fetchSlots = async () => {
      setLoading(true)
      setError(null)

      const startDate = new Date(currentYear, currentMonthNum, 1)
      const endDate = new Date(currentYear, currentMonthNum + 2, 0)

      try {
        const response = await fetch(
          `/api/booking/slots?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch slots')
        }

        const data = await response.json()
        if (!cancelled) {
          setSlots(data.slots || [])
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError(locale === 'de'
            ? 'Termine konnten nicht geladen werden'
            : 'Could not load available times')
          setLoading(false)
        }
      }
    }

    fetchSlots()

    return () => {
      cancelled = true
    }
  }, [currentYear, currentMonthNum, locale, retryKey])

  // When a date is selected, find its times
  useEffect(() => {
    if (selectedDate) {
      setLoadingTimes(true)
      const dateStr = selectedDate.toISOString().split('T')[0]
      const daySlot = slots.find(s => s.date.startsWith(dateStr))
      setDayTimes(daySlot?.times || [])
      setLoadingTimes(false)
    }
  }, [selectedDate, slots])

  const getDaysInMonth = () => {
    const firstDay = new Date(currentYear, currentMonthNum, 1)
    const lastDay = new Date(currentYear, currentMonthNum + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    let startingDay = firstDay.getDay() - 1
    if (startingDay < 0) startingDay = 6

    const daysArray: (number | null)[] = []

    // Add empty days for alignment
    for (let i = 0; i < startingDay; i++) {
      daysArray.push(null)
    }

    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }

    return daysArray
  }

  const isDateAvailable = (day: number) => {
    const date = new Date(currentYear, currentMonthNum, day)
    const dateStr = date.toISOString().split('T')[0]
    return slots.some(s => s.date.startsWith(dateStr) && s.times.length > 0)
  }

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonthNum, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonthNum &&
      selectedDate.getFullYear() === currentYear
    )
  }

  const handleDateClick = (day: number) => {
    if (isPastDate(day) || !isDateAvailable(day)) return
    const date = new Date(currentYear, currentMonthNum, day)
    onDateSelect(date)
  }

  const handleTimeClick = (time: string) => {
    if (!selectedDate) return

    // Create ISO datetime string
    const [hours, minutes] = time.split(':')
    const dateTime = new Date(selectedDate)
    dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    onTimeSelect(time, dateTime.toISOString())
  }

  const goToPreviousMonth = () => {
    let newYear = currentYear
    let newMonth = currentMonthNum - 1

    if (newMonth < 0) {
      newMonth = 11
      newYear--
    }

    // Don't allow going to past months
    const today = new Date()
    if (newYear < today.getFullYear() ||
        (newYear === today.getFullYear() && newMonth < today.getMonth())) {
      return
    }

    setCurrentYear(newYear)
    setCurrentMonthNum(newMonth)
  }

  const goToNextMonth = () => {
    let newYear = currentYear
    let newMonth = currentMonthNum + 1

    if (newMonth > 11) {
      newMonth = 0
      newYear++
    }

    // Don't allow going more than 3 months ahead
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    const newDate = new Date(newYear, newMonth, 1)
    if (newDate > maxDate) return

    setCurrentYear(newYear)
    setCurrentMonthNum(newMonth)
  }

  const canGoPrevious = () => {
    const today = new Date()
    return (
      currentYear > today.getFullYear() ||
      (currentYear === today.getFullYear() && currentMonthNum > today.getMonth())
    )
  }

  const canGoNext = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    const currentDate = new Date(currentYear, currentMonthNum, 1)
    return currentDate < maxDate
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {months[currentMonthNum]} {currentYear}
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            disabled={!canGoPrevious()}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
            disabled={!canGoNext()}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">
            {locale === 'de' ? 'Termine werden geladen...' : 'Loading available times...'}
          </span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-8 text-destructive">
          <p>{error}</p>
          <Button variant="outline" onClick={() => setRetryKey(k => k + 1)} className="mt-4">
            {locale === 'de' ? 'Erneut versuchen' : 'Try again'}
          </Button>
        </div>
      )}

      {/* Calendar Grid */}
      {!loading && !error && (
        <>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1">
            {days.map(day => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((day, index) => (
              <div key={index} className="aspect-square">
                {day !== null && (
                  <button
                    onClick={() => handleDateClick(day)}
                    disabled={isPastDate(day) || !isDateAvailable(day)}
                    className={cn(
                      'w-full h-full flex items-center justify-center rounded-lg text-sm font-medium transition-all',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      isPastDate(day) && 'text-muted-foreground/40 cursor-not-allowed',
                      !isPastDate(day) && !isDateAvailable(day) && 'text-muted-foreground/60 cursor-not-allowed',
                      !isPastDate(day) && isDateAvailable(day) && !isSelectedDate(day) &&
                        'hover:bg-muted cursor-pointer text-foreground',
                      isSelectedDate(day) &&
                        'bg-primary text-primary-foreground hover:bg-primary/90'
                    )}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="border-t pt-6 mt-6">
              <h4 className="text-sm font-medium mb-4">
                {locale === 'de' ? 'Verfügbare Zeiten am' : 'Available times on'}{' '}
                {selectedDate.toLocaleDateString(locale === 'de' ? 'de-AT' : 'en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </h4>

              {loadingTimes ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {locale === 'de' ? 'Zeiten werden geladen...' : 'Loading times...'}
                </div>
              ) : dayTimes.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {dayTimes.map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                        'border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        selectedTime === time
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-input bg-background hover:bg-muted hover:border-primary/50'
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  {locale === 'de'
                    ? 'Keine verfügbaren Zeiten für diesen Tag.'
                    : 'No available times for this day.'}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
