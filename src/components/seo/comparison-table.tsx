import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'

export interface ComparisonColumn {
  name: string
  description?: string
  highlighted?: boolean
}

export interface ComparisonRow {
  feature: string
  description?: string
  values: (boolean | string | 'partial')[]
}

interface ComparisonTableProps {
  title?: string
  subtitle?: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  className?: string
  footerNote?: string
  locale?: 'de' | 'en' | 'ru'
}

export function ComparisonTable({
  title,
  subtitle,
  columns,
  rows,
  className,
  footerNote,
  locale = 'de',
}: ComparisonTableProps) {
  // Localized labels
  const labels = {
    included: locale === 'en' ? 'Included' : 'Enthalten',
    notIncluded: locale === 'en' ? 'Not included' : 'Nicht enthalten',
    partiallyIncluded: locale === 'en' ? 'Partially included' : 'Teilweise enthalten',
    feature: locale === 'en' ? 'Feature' : 'Funktion',
  }

  const renderValue = (value: boolean | string | 'partial') => {
    if (value === true) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" aria-hidden="true" />
          <span className="sr-only">{labels.included}</span>
        </span>
      )
    }
    if (value === false) {
      // Neutral/empty state - no negative icons
      return (
        <span className="inline-flex items-center justify-center w-6 h-6">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/20" aria-hidden="true" />
          <span className="sr-only">{labels.notIncluded}</span>
        </span>
      )
    }
    if (value === 'partial') {
      // Green circle for partial - positive indication
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-50 dark:bg-green-900/20 rounded-full">
          <Circle className="h-3.5 w-3.5 text-green-500 dark:text-green-400 fill-green-500/30 dark:fill-green-400/30" aria-hidden="true" />
          <span className="sr-only">{labels.partiallyIncluded}</span>
        </span>
      )
    }
    return <span className="text-sm font-medium">{value}</span>
  }

  return (
    <section className={cn('py-12 md:py-16', className)}>
      <Container variant="block">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
            {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 border-b bg-muted/50 rounded-tl-lg font-semibold">
                  <span className="sr-only">{labels.feature}</span>
                </th>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={cn(
                      'py-4 px-4 border-b text-center font-semibold',
                      col.highlighted
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50',
                      idx === columns.length - 1 && 'rounded-tr-lg'
                    )}
                    scope="col"
                  >
                    <div className="font-bold">{col.name}</div>
                    {col.description && (
                      <div className={cn(
                        'text-xs font-normal mt-1',
                        col.highlighted ? 'opacity-80' : 'text-muted-foreground'
                      )}>
                        {col.description}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={cn(
                    'hover:bg-muted/30 transition-colors',
                    rowIdx % 2 === 0 ? 'bg-transparent' : 'bg-muted/10'
                  )}
                >
                  <th
                    scope="row"
                    className="text-left py-4 px-4 border-b font-medium"
                  >
                    <div>{row.feature}</div>
                    {row.description && (
                      <div className="text-xs text-muted-foreground font-normal mt-0.5">
                        {row.description}
                      </div>
                    )}
                  </th>
                  {row.values.map((value, colIdx) => (
                    <td
                      key={colIdx}
                      className={cn(
                        'py-4 px-4 border-b text-center',
                        columns[colIdx]?.highlighted && 'bg-primary/5'
                      )}
                    >
                      {renderValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {footerNote && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            {footerNote}
          </p>
        )}
      </Container>
    </section>
  )
}

// Simple data table for SEO content
interface DataTableProps {
  title?: string
  headers: string[]
  rows: string[][]
  className?: string
  caption?: string
}

export function DataTable({
  title,
  headers,
  rows,
  className,
  caption,
}: DataTableProps) {
  return (
    <section className={cn('py-8', className)}>
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[400px] border-collapse border border-border rounded-lg overflow-hidden">
          {caption && (
            <caption className="text-sm text-muted-foreground mb-2 text-left">
              {caption}
            </caption>
          )}
          <thead>
            <tr className="bg-muted/50">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="py-3 px-4 text-left font-semibold border-b border-border"
                  scope="col"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={cn(
                  'hover:bg-muted/30 transition-colors',
                  rowIdx % 2 === 1 && 'bg-muted/10'
                )}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="py-3 px-4 border-b border-border text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
