'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'

// Office IDs for translation keys
const officeIds = ['vienna', 'roseville', 'dubai'] as const

// Static map queries (don't need translation)
const officeMapData = {
  vienna: {
    mapQuery: 'Czeikestrasse+4,+1100+Wien,+Austria',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Czeikestrasse+4,+1100+Wien,+Austria',
    highlight: true,
  },
  roseville: {
    mapQuery: '2700+N+Hayden+Pkwy,+Roseville,+CA+95747,+USA',
    mapsLink: 'https://www.google.com/maps/place/2700+N+Hayden+Pkwy,+Roseville,+CA+95747,+USA/@38.7975689,-121.3740698,17z',
    highlight: false,
  },
  dubai: {
    mapQuery: 'DAMAC+Executive+Bay+Tower+B,+Dubai,+UAE',
    mapsLink: 'https://www.google.com/maps/place/GoldenWing+-+Creative+Studios/@25.1783748,55.2638842,17z',
    highlight: false,
  },
} as const

export function OfficeLocations() {
  const t = useTranslations('offices')
  const [openId, setOpenId] = useState<string | null>('vienna')

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-16 md:py-24">
      <Container variant="block">
        {/* Vertical Accordion */}
        <div className="border-t border-border">
          {officeIds.map((officeId) => {
            const isOpen = openId === officeId
            const mapData = officeMapData[officeId]

            return (
              <div key={officeId} className="border-b border-border">
                {/* Accordion Header - Clickable */}
                <button
                  onClick={() => toggleAccordion(officeId)}
                  className="w-full text-left"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Column */}
                    <div className="py-8 md:py-10 pr-4 md:pr-8 md:border-r border-border">
                      {/* City & Country */}
                      <h4 className="text-xl md:text-2xl font-semibold mb-6">
                        <span className="block">{t(`${officeId}.name`)}</span>
                        <span className="block">{t(`${officeId}.country`)}</span>
                      </h4>

                      {/* Location */}
                      <h5 className="text-sm font-semibold mb-2">{t('location')}</h5>
                      <a
                        href={mapData.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="block text-muted-foreground mb-6 hover:text-primary transition-colors"
                      >
                        <span className="block text-sm">{t(`${officeId}.address.line1`)}</span>
                        <span className="block text-sm">{t(`${officeId}.address.line2`)}</span>
                        <span className="block text-sm">{t(`${officeId}.address.line3`)}</span>
                      </a>

                      {/* General Inquiries */}
                      <h5 className="text-sm font-semibold mb-2">{t('generalInquiries')}</h5>
                      <a
                        href={`mailto:${t(`${officeId}.email`)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        {t(`${officeId}.email`)}
                      </a>
                    </div>

                    {/* Right Column */}
                    <div className="py-8 md:py-10 md:pl-8 flex flex-col justify-between">
                      <div>
                        {/* Coordinates */}
                        <p className="text-sm text-muted-foreground mb-6">
                          {t(`${officeId}.coordinates`)}
                        </p>

                        {/* Opening Hours */}
                        <h5 className="text-sm font-semibold mb-2">{t('openingHours')}</h5>
                        <p className="text-muted-foreground mb-6">
                          <span className="block text-sm">{t(`${officeId}.hours.days`)}</span>
                          <span className="block text-sm">{t(`${officeId}.hours.time`)}</span>
                        </p>

                        {/* Phone */}
                        <h5 className="text-sm font-semibold mb-2">{t('phone')}</h5>
                        <a
                          href={`tel:${t(`${officeId}.phone`).replace(/\s/g, '')}`}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            "text-sm hover:text-primary transition-colors",
                            mapData.highlight
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground'
                          )}
                        >
                          {t(`${officeId}.phone`)}
                        </a>
                      </div>

                      {/* Accordion Arrow */}
                      <div className="flex justify-end mt-4">
                        <ChevronDown
                          className={cn(
                            "h-6 w-6 text-muted-foreground transition-transform duration-300",
                            isOpen && "rotate-180"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Accordion Content - Map */}
                <div
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="h-[350px] md:h-[450px] relative">
                    {isOpen && (
                      <iframe
                        src={`https://www.google.com/maps?q=${mapData.mapQuery}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`GoldenWing ${t(`${officeId}.name`)}`}
                        className="absolute inset-0 w-full h-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
