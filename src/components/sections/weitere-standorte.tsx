'use client'

import NextLink from 'next/link'
import { MapPin } from 'lucide-react'
import { Container, Section } from '@/components/ui/container'

interface City {
  name: string
  nameEn: string
  nameRu: string
  slug: string
  country: 'AT' | 'DE' | 'CH'
}

const allCities: City[] = [
  { name: 'Wien', nameEn: 'Vienna', nameRu: 'Вена', slug: 'wien', country: 'AT' },
  { name: 'Graz', nameEn: 'Graz', nameRu: 'Грац', slug: 'graz', country: 'AT' },
  { name: 'Linz', nameEn: 'Linz', nameRu: 'Линц', slug: 'linz', country: 'AT' },
  { name: 'Salzburg', nameEn: 'Salzburg', nameRu: 'Зальцбург', slug: 'salzburg', country: 'AT' },
  { name: 'Innsbruck', nameEn: 'Innsbruck', nameRu: 'Инсбрук', slug: 'innsbruck', country: 'AT' },
  { name: 'München', nameEn: 'Munich', nameRu: 'Мюнхен', slug: 'muenchen', country: 'DE' },
  { name: 'Berlin', nameEn: 'Berlin', nameRu: 'Берлин', slug: 'berlin', country: 'DE' },
  { name: 'Zürich', nameEn: 'Zurich', nameRu: 'Цюрих', slug: 'zuerich', country: 'CH' },
]

const flags: Record<string, string> = {
  AT: '🇦🇹',
  DE: '🇩🇪',
  CH: '🇨🇭',
}

interface WeitereStandorteProps {
  currentCity: string // slug of current city to exclude
  locale: 'de' | 'en' | 'ru'
}

export function WeitereStandorte({ currentCity, locale }: WeitereStandorteProps) {
  const otherCities = allCities.filter(city => city.slug !== currentCity)

  const title = {
    de: 'Weitere Standorte',
    en: 'More Locations',
    ru: 'Другие офисы',
  }[locale]

  const subtitle = {
    de: 'Wir betreuen Kunden in ganz Österreich, Deutschland und der Schweiz.',
    en: 'We serve clients across Austria, Germany, and Switzerland.',
    ru: 'Мы обслуживаем клиентов по всей Австрии, Германии и Швейцарии.',
  }[locale]

  const getCityName = (city: City) => {
    return locale === 'en' ? city.nameEn : locale === 'ru' ? city.nameRu : city.name
  }

  return (
    <Section className="py-16 bg-muted/30">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {otherCities.map((city) => (
            <NextLink
              key={city.slug}
              href={`/standorte/${city.slug}`}
              className="group flex items-center gap-2 px-5 py-3 bg-background rounded-lg border hover:border-primary hover:shadow-md transition-all"
            >
              <span className="text-lg">{flags[city.country]}</span>
              <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium group-hover:text-primary transition-colors">
                {getCityName(city)}
              </span>
            </NextLink>
          ))}
        </div>
        <div className="text-center mt-8">
          <NextLink
            href="/standorte"
            className="text-primary hover:underline text-sm font-medium"
          >
            {locale === 'de' ? 'Alle Standorte ansehen →' : locale === 'ru' ? 'Все офисы →' : 'View all locations →'}
          </NextLink>
        </div>
      </Container>
    </Section>
  )
}
