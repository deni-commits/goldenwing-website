'use client'

import { cn } from '@/lib/utils'
import { CheckIcon, XIcon } from 'lucide-react'

interface Column {
  heading: string
  highlighted?: boolean
}

interface Row {
  label: string
  values: (boolean | string)[]
}

interface ComparisonTableProps {
  columns: Column[]
  rows: Row[]
  variant?: 'dark' | 'light'
}

export function ComparisonTable({ columns, rows, variant = 'dark' }: ComparisonTableProps) {
  const bgBase = variant === 'dark' ? 'bg-card' : 'bg-background'
  const borderColor = 'border-border'
  const textColor = 'text-foreground'
  const mutedColor = 'text-muted-foreground'

  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full border-collapse text-sm', bgBase, 'overflow-hidden rounded-xl')}>
        <thead>
          <tr>
            <th className={cn('p-4 text-left font-medium', mutedColor, `border-b ${borderColor}`)} />
            {columns.map((col, i) => (
              <th
                key={i}
                className={cn(
                  'p-4 text-center font-semibold',
                  `border-b ${borderColor}`,
                  col.highlighted ? 'bg-primary/10 text-primary border-primary/30 border-x' : textColor,
                )}
              >
                {col.heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={cn(`border-b last:border-b-0 ${borderColor}`)}>
              <td className={cn('p-4 font-medium', textColor)}>{row.label}</td>
              {row.values.map((val, vi) => {
                const col = columns[vi]
                return (
                  <td
                    key={vi}
                    className={cn('p-4 text-center', col?.highlighted ? 'border-primary/30 bg-primary/5 border-x' : '')}
                  >
                    {typeof val === 'boolean' ? (
                      val ? (
                        <CheckIcon className="text-primary mx-auto h-5 w-5" />
                      ) : (
                        <XIcon className={cn('mx-auto h-5 w-5', mutedColor)} />
                      )
                    ) : (
                      <span className={textColor}>{val}</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
