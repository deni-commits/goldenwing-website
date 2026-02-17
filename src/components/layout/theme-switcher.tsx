'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const tAccessibility = useTranslations('accessibility')

  const ariaLabel = resolvedTheme === 'dark'
    ? tAccessibility('switchToLight')
    : tAccessibility('switchToDark')

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={ariaLabel}
      suppressHydrationWarning
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0" aria-hidden="true" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" aria-hidden="true" />
    </Button>
  )
}
