'use client'

import { useState } from 'react'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Palette, Globe, Search, PenTool, Code, Zap, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { useTranslations } from 'next-intl'

interface Service {
  icon: React.ComponentType<{ className?: string }>
  key: string
  href: StaticAppPathname
  image: string
}

const services: Service[] = [
  {
    icon: Palette,
    key: 'branding',
    href: '/leistungen/branding',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80'
  },
  {
    icon: Globe,
    key: 'webdesign',
    href: '/leistungen/webdesign',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  {
    icon: PenTool,
    key: 'digitalMarketing',
    href: '/leistungen/digital-marketing',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
  },
  {
    icon: Search,
    key: 'seoContent',
    href: '/leistungen/seo-content',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80'
  },
  {
    icon: Code,
    key: 'webAppDevelopment',
    href: '/leistungen/web-app-entwicklung',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
  },
  {
    icon: Wrench,
    key: 'itCloudServices',
    href: '/leistungen/it-cloud-services',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
  },
]

interface ServicesAccordionProps {
  title?: string | null
  subtitle?: string | null
  ctaText?: string | null
}

export function ServicesAccordion({ title, subtitle, ctaText }: ServicesAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(1)
  const t = useTranslations('services')
  const tCommon = useTranslations('common')

  return (
    <section className="py-20 md:py-32">
      <Container variant="block">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Title & CTA */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </span>
                {title || t('title')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {subtitle || t('subtitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Von der ersten Idee bis zur perfekten Umsetzung – wir machen es möglich.
              </p>
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/leistungen">
                  {ctaText || tCommon('allServices')}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Accordion */}
          <div className="space-y-0">
            {services.map((service, index) => {
              const isActive = activeIndex === index

              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-b border-border"
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    className="w-full py-5 flex items-center justify-between group"
                  >
                    <span className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {t(`${service.key}.title`)}
                    </span>
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                      }`}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 grid md:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <p className="text-muted-foreground mb-4">
                              {t(`${service.key}.description`)}
                            </p>
                            <Link
                              href={service.href}
                              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-[gap]"
                            >
                              {tCommon('learnMore')}
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                            <Image
                              src={service.image}
                              alt={t(`${service.key}.title`)}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-3 right-3">
                              <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                                {t(`${service.key}.title`)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
