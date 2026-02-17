'use client'

import { useEffect, useState, useRef } from 'react'
import { Check, X } from 'lucide-react'

interface ChecklistItem {
  text: string
  checked: boolean
  highlight?: boolean
}

interface ChecklistGraphicProps {
  title?: string
  items: ChecklistItem[]
  variant?: 'default' | 'split'
  positiveLabel?: string
  negativeLabel?: string
}

export function ChecklistGraphic({
  title,
  items,
  variant = 'default',
  positiveLabel = 'Empfohlen',
  negativeLabel = 'Vermeiden',
}: ChecklistGraphicProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 150)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [items])

  if (variant === 'split') {
    const positiveItems = items.filter((item) => item.checked)
    const negativeItems = items.filter((item) => !item.checked)

    return (
      <div
        ref={ref}
        className="rounded-2xl bg-muted/50 p-6 my-8 border border-border/50"
      >
        {title && (
          <h4 className="font-semibold text-foreground mb-6 text-center">{title}</h4>
        )}

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Positive Column */}
          <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-green-700 dark:text-green-300">
                {positiveLabel}
              </span>
            </div>
            <ul className="space-y-3">
              {positiveItems.map((item, index) => {
                const globalIndex = items.indexOf(item)
                const isVisible = visibleItems.includes(globalIndex)
                return (
                  <li
                    key={index}
                    className={`
                      flex items-start gap-3 transition-all duration-300
                      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                    `}
                  >
                    <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{item.text}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Negative Column */}
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 border border-red-200/50 dark:border-red-800/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-red-700 dark:text-red-300">
                {negativeLabel}
              </span>
            </div>
            <ul className="space-y-3">
              {negativeItems.map((item, index) => {
                const globalIndex = items.indexOf(item)
                const isVisible = visibleItems.includes(globalIndex)
                return (
                  <li
                    key={index}
                    className={`
                      flex items-start gap-3 transition-all duration-300
                      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                    `}
                  >
                    <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{item.text}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-muted/50 p-6 my-8 border border-border/50"
    >
      {title && (
        <h4 className="font-semibold text-foreground mb-6">{title}</h4>
      )}

      <ul className="space-y-3">
        {items.map((item, index) => {
          const isVisible = visibleItems.includes(index)
          return (
            <li
              key={index}
              className={`
                flex items-start gap-3 p-3 rounded-lg transition-all duration-300
                ${item.highlight ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/50' : 'bg-background/50'}
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
              `}
            >
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center shrink-0
                  ${item.checked ? 'bg-green-500' : 'bg-red-500'}
                `}
              >
                {item.checked ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </div>
              <span className={`text-sm ${item.highlight ? 'font-medium' : ''} text-foreground`}>
                {item.text}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
