import type { IndustryConfig } from './types'

export const industries: IndustryConfig[] = [
  {
    slug: 'aerzte',
    name: { de: 'Ärzte & Medizin', en: 'Doctors & Medicine', ru: 'Врачи и медицина' },
    icon: 'heart-pulse',
  },
  { slug: 'rechtsanwaelte', name: { de: 'Rechtsanwälte', en: 'Lawyers', ru: 'Юристы' }, icon: 'scale' },
  { slug: 'gastronomie', name: { de: 'Gastronomie', en: 'Gastronomy', ru: 'Гастрономия' }, icon: 'utensils' },
  { slug: 'immobilien', name: { de: 'Immobilien', en: 'Real Estate', ru: 'Недвижимость' }, icon: 'building' },
  {
    slug: 'e-commerce',
    name: { de: 'E-Commerce', en: 'E-Commerce', ru: 'Электронная коммерция' },
    icon: 'shopping-cart',
  },
  { slug: 'handwerk', name: { de: 'Handwerk', en: 'Trades & Crafts', ru: 'Ремёсла' }, icon: 'wrench' },
  { slug: 'fitness', name: { de: 'Fitness & Sport', en: 'Fitness & Sports', ru: 'Фитнес и спорт' }, icon: 'dumbbell' },
  { slug: 'hotels', name: { de: 'Hotels & Tourismus', en: 'Hotels & Tourism', ru: 'Отели и туризм' }, icon: 'bed' },
  {
    slug: 'finanzen',
    name: { de: 'Finanzen & Versicherung', en: 'Finance & Insurance', ru: 'Финансы и страхование' },
    icon: 'landmark',
  },
  { slug: 'bildung', name: { de: 'Bildung', en: 'Education', ru: 'Образование' }, icon: 'graduation-cap' },
  { slug: 'automotive', name: { de: 'Automotive', en: 'Automotive', ru: 'Автомобильная отрасль' }, icon: 'car' },
  { slug: 'mode', name: { de: 'Mode & Fashion', en: 'Fashion', ru: 'Мода' }, icon: 'shirt' },
  {
    slug: 'beauty',
    name: { de: 'Beauty & Kosmetik', en: 'Beauty & Cosmetics', ru: 'Красота и косметика' },
    icon: 'sparkles',
  },
  { slug: 'it-tech', name: { de: 'IT & Tech', en: 'IT & Tech', ru: 'IT и технологии' }, icon: 'cpu' },
  { slug: 'architektur', name: { de: 'Architektur', en: 'Architecture', ru: 'Архитектура' }, icon: 'ruler' },
  {
    slug: 'steuerberater',
    name: { de: 'Steuerberater', en: 'Tax Advisors', ru: 'Налоговые консультанты' },
    icon: 'calculator',
  },
  { slug: 'zahnaerzte', name: { de: 'Zahnärzte', en: 'Dentists', ru: 'Стоматологи' }, icon: 'smile' },
  { slug: 'physiotherapie', name: { de: 'Physiotherapie', en: 'Physiotherapy', ru: 'Физиотерапия' }, icon: 'activity' },
  {
    slug: 'coaching',
    name: { de: 'Coaching & Beratung', en: 'Coaching & Consulting', ru: 'Коучинг и консалтинг' },
    icon: 'message-circle',
  },
  { slug: 'fotografie', name: { de: 'Fotografie', en: 'Photography', ru: 'Фотография' }, icon: 'camera' },
]

export function getIndustryBySlug(slug: string): IndustryConfig | undefined {
  return industries.find((i) => i.slug === slug)
}
