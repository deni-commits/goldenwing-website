'use client'

import { Search, Gauge, Palette, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryTabsProps {
  activeTab: 'overview' | 'seo' | 'performance' | 'design' | 'security'
  onTabChange: (tab: 'overview' | 'seo' | 'performance' | 'design' | 'security') => void
  scores: {
    seo: number | null
    performance: number | null
    design: number | null
    security: number | null
  }
  locale?: string
}

const tabs = [
  { id: 'overview', icon: null, labelDe: 'Übersicht', labelEn: 'Overview' },
  { id: 'seo', icon: Search, labelDe: 'SEO', labelEn: 'SEO' },
  { id: 'performance', icon: Gauge, labelDe: 'Performance', labelEn: 'Performance' },
  { id: 'design', icon: Palette, labelDe: 'Design', labelEn: 'Design' },
  { id: 'security', icon: Shield, labelDe: 'Security', labelEn: 'Security' },
] as const

function getScoreColor(score: number | null): string {
  if (score === null) return 'text-muted-foreground'
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-yellow-500'
  if (score >= 50) return 'text-orange-500'
  return 'text-red-500'
}

export function CategoryTabs({ activeTab, onTabChange, scores, locale = 'de' }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b pb-4">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const score = tab.id !== 'overview' ? scores[tab.id as keyof typeof scores] : null
        const isActive = activeTab === tab.id
        const label = locale === 'de' ? tab.labelDe : tab.labelEn

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as typeof activeTab)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
              'hover:bg-muted/50',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/30 text-foreground'
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{label}</span>
            {score !== null && (
              <span className={cn(
                'text-sm font-bold',
                isActive ? 'text-primary-foreground' : getScoreColor(score)
              )}>
                {score}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
