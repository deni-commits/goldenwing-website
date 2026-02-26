'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeServicesProps {
  locale: 'de' | 'en' | 'ru'
}

const services = {
  de: [
    'Grafikdesign',
    'SEO Texter',
    'SEO Berater',
    'SEO Betreuung',
    'SEA Agentur',
    'Google Ads Agentur',
    'E-Commerce Agentur',
    'Onlineshop Agentur',
    'WordPress Agentur',
    'Social Media Agentur',
    'GEO Optimierung',
    'Content Creation',
    'Reels & Video',
    'Business-Fotografie'
  ],
  en: [
    'Graphic Design',
    'SEO Writer',
    'SEO Consultant',
    'SEO Support',
    'SEA Agency',
    'Google Ads Agency',
    'E-Commerce Agency',
    'Online Shop Agency',
    'WordPress Agency',
    'Social Media Agency',
    'GEO Optimization',
    'Content Creation',
    'Reels & Video',
    'Business Photography'
  ],
  ru: [
    'Графический дизайн',
    'SEO копирайтер',
    'SEO консультант',
    'SEO поддержка',
    'SEA агентство',
    'Google Ads агентство',
    'E-Commerce агентство',
    'Интернет-магазин агентство',
    'WordPress агентство',
    'Социальные медиа агентство',
    'GEO оптимизация',
    'Создание контента',
    'Reels и видео',
    'Бизнес фотография'
  ]
}

const content = {
  de: {
    eyebrow: 'Weitere Services',
    title: 'Spezialisierte Services für spezifische Anforderungen'
  },
  en: {
    eyebrow: 'Additional Services',
    title: 'Specialized Services for Specific Requirements'
  },
  ru: {
    eyebrow: 'Дополнительные услуги',
    title: 'Специализированные услуги для конкретных требований'
  }
}

export function MarqueeServices({ locale }: MarqueeServicesProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const c = content[locale]
  const serviceList = services[locale]

  // Duplicate for seamless loop
  const duplicatedServices = [...serviceList, ...serviceList]

  return (
    <section
      ref={ref}
      className="py-10 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-9 lg:px-16 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-primary dark:text-[#f2fb31] mb-6">
            <span
              className="w-[6px] h-[6px] bg-primary dark:bg-[#f2fb31] rotate-45 animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            {c.eyebrow}
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-bricolage)] text-[1.1rem] font-bold tracking-[-0.02em] text-white/30 mb-4">
            {c.title}
          </h3>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden py-2">
        {/* Fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-[200px] bg-gradient-to-r from-background dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-background dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Moving track */}
        <motion.div
          className="flex gap-3 w-max"
          animate={{ x: [0, -50 + '%'] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {duplicatedServices.map((service, index) => (
            <div
              key={`${service}-${index}`}
              className={cn(
                'flex-shrink-0 px-7 py-3 rounded-full text-[0.75rem] font-medium whitespace-nowrap transition-all duration-500 cursor-default',
                'border border-white/[0.04] bg-white/[0.01] text-white/20',
                'hover:border-[rgba(242,251,49,0.15)] hover:text-[rgba(242,251,49,0.6)] hover:bg-[rgba(242,251,49,0.02)] hover:-translate-y-0.5'
              )}
            >
              {service}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}