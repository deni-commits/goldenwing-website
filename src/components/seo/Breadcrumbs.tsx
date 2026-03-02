import Link from 'next/link'
import { BreadcrumbSchema } from './StructuredData'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  const schemaItems = items
    .filter((item) => item.href)
    .map((item) => ({
      name: item.label,
      url: item.href!.startsWith('http') ? item.href! : `${siteUrl}${item.href}`,
    }))

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span aria-hidden="true" className="select-none text-muted">
                    &gt;
                  </span>
                )}
                {isLast || !item.href ? (
                  <span aria-current={isLast ? 'page' : undefined} className="text-foreground">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-gold-500"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
