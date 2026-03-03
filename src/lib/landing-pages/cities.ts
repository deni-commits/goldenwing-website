import type { CityConfig } from './types'

export const austrianCities: CityConfig[] = [
  { slug: 'wien', cityName: { de: 'Wien', en: 'Vienna', ru: 'Вена' }, country: 'AT' },
  {
    slug: 'graz',
    cityName: { de: 'Graz', en: 'Graz', ru: 'Грац' },
    regionName: { de: 'Steiermark', en: 'Styria', ru: 'Штирия' },
    country: 'AT',
  },
  {
    slug: 'linz',
    cityName: { de: 'Linz', en: 'Linz', ru: 'Линц' },
    regionName: { de: 'Oberösterreich', en: 'Upper Austria', ru: 'Верхняя Австрия' },
    country: 'AT',
  },
  { slug: 'salzburg', cityName: { de: 'Salzburg', en: 'Salzburg', ru: 'Зальцбург' }, country: 'AT' },
  {
    slug: 'innsbruck',
    cityName: { de: 'Innsbruck', en: 'Innsbruck', ru: 'Инсбрук' },
    regionName: { de: 'Tirol', en: 'Tyrol', ru: 'Тироль' },
    country: 'AT',
  },
  {
    slug: 'klagenfurt',
    cityName: { de: 'Klagenfurt', en: 'Klagenfurt', ru: 'Клагенфурт' },
    regionName: { de: 'Kärnten', en: 'Carinthia', ru: 'Каринтия' },
    country: 'AT',
  },
  { slug: 'villach', cityName: { de: 'Villach', en: 'Villach', ru: 'Филлах' }, country: 'AT' },
  { slug: 'wels', cityName: { de: 'Wels', en: 'Wels', ru: 'Вельс' }, country: 'AT' },
  {
    slug: 'st-poelten',
    cityName: { de: 'St. Pölten', en: 'St. Pölten', ru: 'Санкт-Пёльтен' },
    regionName: { de: 'Niederösterreich', en: 'Lower Austria', ru: 'Нижняя Австрия' },
    country: 'AT',
  },
  {
    slug: 'dornbirn',
    cityName: { de: 'Dornbirn', en: 'Dornbirn', ru: 'Дорнбирн' },
    regionName: { de: 'Vorarlberg', en: 'Vorarlberg', ru: 'Форарльберг' },
    country: 'AT',
  },
  {
    slug: 'wiener-neustadt',
    cityName: { de: 'Wiener Neustadt', en: 'Wiener Neustadt', ru: 'Винер-Нойштадт' },
    country: 'AT',
  },
  { slug: 'steyr', cityName: { de: 'Steyr', en: 'Steyr', ru: 'Штайр' }, country: 'AT' },
  { slug: 'bregenz', cityName: { de: 'Bregenz', en: 'Bregenz', ru: 'Брегенц' }, country: 'AT' },
  { slug: 'leonding', cityName: { de: 'Leonding', en: 'Leonding', ru: 'Леондинг' }, country: 'AT' },
  { slug: 'baden', cityName: { de: 'Baden', en: 'Baden', ru: 'Баден' }, country: 'AT' },
  {
    slug: 'feldkirch',
    cityName: { de: 'Feldkirch', en: 'Feldkirch', ru: 'Фельдкирх' },
    regionName: { de: 'Vorarlberg', en: 'Vorarlberg', ru: 'Форарльберг' },
    country: 'AT',
  },
  {
    slug: 'klosterneuburg',
    cityName: { de: 'Klosterneuburg', en: 'Klosterneuburg', ru: 'Клостернойбург' },
    country: 'AT',
  },
  {
    slug: 'leoben',
    cityName: { de: 'Leoben', en: 'Leoben', ru: 'Леобен' },
    regionName: { de: 'Steiermark', en: 'Styria', ru: 'Штирия' },
    country: 'AT',
  },
  {
    slug: 'krems',
    cityName: { de: 'Krems an der Donau', en: 'Krems', ru: 'Кремс' },
    regionName: { de: 'Niederösterreich', en: 'Lower Austria', ru: 'Нижняя Австрия' },
    country: 'AT',
  },
  { slug: 'amstetten', cityName: { de: 'Amstetten', en: 'Amstetten', ru: 'Амштеттен' }, country: 'AT' },
  {
    slug: 'wolfsberg',
    cityName: { de: 'Wolfsberg', en: 'Wolfsberg', ru: 'Вольфсберг' },
    regionName: { de: 'Kärnten', en: 'Carinthia', ru: 'Каринтия' },
    country: 'AT',
  },
  {
    slug: 'traun',
    cityName: { de: 'Traun', en: 'Traun', ru: 'Траун' },
    regionName: { de: 'Oberösterreich', en: 'Upper Austria', ru: 'Верхняя Австрия' },
    country: 'AT',
  },
  { slug: 'oesterreich', cityName: { de: 'Österreich', en: 'Austria', ru: 'Австрия' }, country: 'AT' },
]

export const germanCities: CityConfig[] = [
  { slug: 'deutschland', cityName: { de: 'Deutschland', en: 'Germany', ru: 'Германия' }, country: 'DE' },
  { slug: 'berlin', cityName: { de: 'Berlin', en: 'Berlin', ru: 'Берлин' }, country: 'DE' },
  { slug: 'hamburg', cityName: { de: 'Hamburg', en: 'Hamburg', ru: 'Гамбург' }, country: 'DE' },
  { slug: 'muenchen', cityName: { de: 'München', en: 'Munich', ru: 'Мюнхен' }, country: 'DE' },
  { slug: 'frankfurt', cityName: { de: 'Frankfurt', en: 'Frankfurt', ru: 'Франкфурт' }, country: 'DE' },
  { slug: 'koeln', cityName: { de: 'Köln', en: 'Cologne', ru: 'Кёльн' }, country: 'DE' },
  { slug: 'duesseldorf', cityName: { de: 'Düsseldorf', en: 'Düsseldorf', ru: 'Дюссельдорф' }, country: 'DE' },
  { slug: 'stuttgart', cityName: { de: 'Stuttgart', en: 'Stuttgart', ru: 'Штутгарт' }, country: 'DE' },
  { slug: 'leipzig', cityName: { de: 'Leipzig', en: 'Leipzig', ru: 'Лейпциг' }, country: 'DE' },
  { slug: 'dresden', cityName: { de: 'Dresden', en: 'Dresden', ru: 'Дрезден' }, country: 'DE' },
  { slug: 'nuernberg', cityName: { de: 'Nürnberg', en: 'Nuremberg', ru: 'Нюрнберг' }, country: 'DE' },
  { slug: 'hannover', cityName: { de: 'Hannover', en: 'Hanover', ru: 'Ганновер' }, country: 'DE' },
  { slug: 'bremen', cityName: { de: 'Bremen', en: 'Bremen', ru: 'Бремен' }, country: 'DE' },
]

export const swissCities: CityConfig[] = [
  { slug: 'schweiz', cityName: { de: 'Schweiz', en: 'Switzerland', ru: 'Швейцария' }, country: 'CH' },
  { slug: 'zuerich', cityName: { de: 'Zürich', en: 'Zurich', ru: 'Цюрих' }, country: 'CH' },
  { slug: 'bern', cityName: { de: 'Bern', en: 'Bern', ru: 'Берн' }, country: 'CH' },
  { slug: 'basel', cityName: { de: 'Basel', en: 'Basel', ru: 'Базель' }, country: 'CH' },
  { slug: 'luzern', cityName: { de: 'Luzern', en: 'Lucerne', ru: 'Люцерн' }, country: 'CH' },
]

export const uaeCities: CityConfig[] = [
  { slug: 'dubai', cityName: { de: 'Dubai', en: 'Dubai', ru: 'Дубай' }, country: 'AE' },
  { slug: 'abu-dhabi', cityName: { de: 'Abu Dhabi', en: 'Abu Dhabi', ru: 'Абу-Даби' }, country: 'AE' },
  { slug: 'vae', cityName: { de: 'VAE', en: 'UAE', ru: 'ОАЭ' }, country: 'AE' },
]

export const allCities: CityConfig[] = [...austrianCities, ...germanCities, ...swissCities, ...uaeCities]

export function getCityBySlug(slug: string): CityConfig | undefined {
  return allCities.find((c) => c.slug === slug)
}
