'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface LeistungenFAQItem {
  question: string
  answer: string
  links?: { href: string; text: string }[]
}

interface LeistungenFAQProps {
  eyebrow: string
  title: string
  titleHighlight: string
  description: string
  items: LeistungenFAQItem[]
  locale: string
}

export function LeistungenFAQ({ eyebrow, title, titleHighlight, description, items, locale }: LeistungenFAQProps) {
  const [openIndex, setOpenIndex] = useState<number>(0) // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section 
      className="max-w-[1520px] mx-auto py-24 lg:py-32 px-5 sm:px-9 lg:px-16"
      aria-labelledby="faq-heading"
    >
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 lg:gap-20 items-start">
        {/* Left: Title */}
        <div className="lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.28em] font-normal mb-7 text-primary dark:text-[#f2fb31]" aria-hidden="true">
            <span className="w-[7px] h-[7px] bg-primary dark:bg-[#f2fb31] rotate-45 flex-shrink-0 animate-pulse" style={{ animationDuration: '3s' }} />
            {eyebrow}
          </div>
          
          <h2 
            id="faq-heading"
            className={cn(
              'font-[family-name:var(--font-bricolage)] text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.04em] leading-[0.95] mb-4',
              'text-neutral-900 dark:text-[#f5f5f5]'
            )}
          >
            {title}
            <br />
            <span className="text-primary dark:text-[#f2fb31]">{titleHighlight}</span>
          </h2>
          
          <p className="text-neutral-500 dark:text-neutral-400 text-[0.82rem] leading-[1.7]">
            {description}
          </p>
        </div>

        {/* Right: FAQ List */}
        <div>
          {items.map((item, index) => {
            const isOpen = openIndex === index
            
            return (
              <div 
                key={index}
                className={cn(
                  'border-b py-6',
                  // Light mode
                  'border-neutral-200',
                  // Dark mode
                  'dark:border-white/[0.06]',
                  index === 0 && 'border-t'
                )}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleItem(index)
                    }
                  }}
                  className={cn(
                    'w-full text-left text-[0.92rem] font-semibold cursor-pointer',
                    'flex justify-between items-center gap-4',
                    'transition-colors duration-300',
                    // Light mode
                    'text-neutral-900',
                    // Dark mode
                    'dark:text-[#f5f5f5]',
                    // Hover states
                    'hover:text-primary dark:hover:text-[#f2fb31]',
                    isOpen && 'text-primary dark:text-[#f2fb31]'
                  )}
                  aria-expanded={isOpen}
                  itemProp="name"
                >
                  <span>{item.question}</span>
                  <span 
                    className={cn(
                      'w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0',
                      'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      // Light mode
                      'border-neutral-300 text-neutral-400',
                      // Dark mode
                      'dark:border-white/[0.08] dark:text-white/30',
                      isOpen && 'dark:border-[rgba(242,251,49,0.3)] dark:text-[#f2fb31] dark:bg-[rgba(242,251,49,0.06)] border-primary/30 text-primary bg-primary/5'
                    )}
                    aria-hidden="true"
                  >
                    <ChevronDown 
                      className={cn(
                        'w-[16px] h-[16px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p 
                        className={cn(
                          'text-[0.8rem] leading-[1.8] max-w-[640px] pt-4',
                          // Light mode
                          'text-neutral-500',
                          // Dark mode
                          'dark:text-neutral-400'
                        )}
                        itemProp="text"
                      >
                        {item.answer}
                        {item.links?.map((link, linkIndex) => (
                          <span key={linkIndex}>
                            {' '}
                            <Link 
                              href={`/${locale}${link.href}`}
                              className={cn(
                                'transition-colors no-underline hover:underline font-medium',
                                // Light mode
                                'text-primary hover:text-primary',
                                // Dark mode
                                'dark:text-[#f2fb31] dark:hover:text-[#f2fb31]'
                              )}
                            >
                              {link.text}
                            </Link>
                          </span>
                        ))}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
