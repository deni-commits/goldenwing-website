'use client'

import React from 'react'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { translateServiceSlugToEn, translateBlogCategorySlugToEn, translateReferenceCategorySlugToEn } from '@/lib/utils'

export interface LexicalNode {
  type: string
  tag?: string
  text?: string
  format?: number
  children?: LexicalNode[]
  listType?: string
  url?: string
  version?: number
  direction?: string
  indent?: number
  id?: string
  // Block fields
  fields?: {
    blockType?: string
    html?: string
    [key: string]: unknown
  }
}

export interface LexicalContent {
  root: {
    type: string
    children: LexicalNode[]
    direction?: string
    format?: string
    indent?: number
    version?: number
  }
}

interface RichTextProps {
  content: LexicalContent | null | undefined
  className?: string
}

// Format flags for text formatting
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16

// Helper to create URL-safe slug from text
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Extract text content from node children
function extractTextFromNode(node: LexicalNode): string {
  if (node.type === 'text' && node.text) {
    return node.text
  }
  if (node.children) {
    return node.children.map(extractTextFromNode).join('')
  }
  return ''
}

function renderTextWithFormat(text: string, format: number = 0): React.ReactNode {
  let result: React.ReactNode = text

  if (format & IS_CODE) {
    result = <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{result}</code>
  }
  if (format & IS_BOLD) {
    result = <strong>{result}</strong>
  }
  if (format & IS_ITALIC) {
    result = <em>{result}</em>
  }
  if (format & IS_UNDERLINE) {
    result = <u>{result}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    result = <s>{result}</s>
  }

  return result
}

// Locale-aware node renderer that accepts a custom child renderer
function renderNodeForLocale(
  node: LexicalNode,
  index: number,
  childRenderer: (node: LexicalNode, index: number) => React.ReactNode
): React.ReactNode {
  const key = `node-${index}-${node.type}`

  switch (node.type) {
    case 'text':
      return <React.Fragment key={key}>{renderTextWithFormat(node.text || '', node.format)}</React.Fragment>

    case 'paragraph':
      return (
        <p key={key} className="mb-6 leading-[1.8] text-foreground/90">
          {node.children?.map((child, i) => childRenderer(child, i))}
        </p>
      )

    case 'heading':
      // Downgrade H1 to H2 inside RichText to prevent multiple H1 per page
      const resolvedTag = node.tag === 'h1' ? 'h2' : (node.tag || 'h2')
      const HeadingTag = resolvedTag as keyof React.JSX.IntrinsicElements
      const headingClasses: Record<string, string> = {
        h1: 'text-3xl font-bold mt-12 mb-6 tracking-tight scroll-mt-24',
        h2: 'text-3xl md:text-4xl font-bold mt-12 mb-4 tracking-tight scroll-mt-24',
        h3: 'text-xl font-semibold mt-8 mb-3 tracking-tight scroll-mt-24',
        h4: 'text-lg font-semibold mt-6 mb-2 scroll-mt-24',
        h5: 'text-base font-semibold mt-4 mb-2 scroll-mt-24',
        h6: 'text-sm font-semibold mt-4 mb-2 scroll-mt-24',
      }
      // Auto-generate ID from heading text if not provided
      const headingText = extractTextFromNode(node)
      const headingId = node.id || createSlug(headingText)
      return (
        <HeadingTag key={key} id={headingId} className={headingClasses[resolvedTag]}>
          {node.children?.map((child, i) => childRenderer(child, i))}
        </HeadingTag>
      )

    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      const listClass = node.listType === 'number'
        ? 'list-decimal pl-6 mb-6 space-y-2 marker:text-primary'
        : 'list-disc pl-6 mb-6 space-y-2 marker:text-primary'
      return (
        <ListTag key={key} className={listClass}>
          {node.children?.map((child, i) => childRenderer(child, i))}
        </ListTag>
      )

    case 'listitem':
      return (
        <li key={key} className="leading-[1.7] text-foreground/90 pl-1">
          {node.children?.map((child, i) => childRenderer(child, i))}
        </li>
      )

    case 'quote':
      return (
        <blockquote key={key} className="border-l-4 border-primary/50 pl-5 my-8 py-1 text-lg italic text-muted-foreground bg-muted/30 rounded-r-lg pr-4">
          {node.children?.map((child, i) => childRenderer(child, i))}
        </blockquote>
      )

    case 'code':
      return (
        <pre key={key} className="bg-muted rounded-lg p-4 my-4 overflow-x-auto">
          <code className="text-sm font-mono">
            {node.children?.map((child, i) => childRenderer(child, i))}
          </code>
        </pre>
      )

    case 'link':
      // Links are handled separately in renderNodeWithLocale
      return null

    case 'horizontalrule':
      return <hr key={key} className="my-8 border-border" />

    case 'linebreak':
      return <br key={key} />

    case 'block':
      // Handle custom blocks (like HTML Block)
      if (node.fields?.blockType === 'htmlBlock' && node.fields?.html) {
        return (
          <div
            key={key}
            className="my-6 html-block"
            dangerouslySetInnerHTML={{ __html: node.fields.html }}
          />
        )
      }
      // Unknown block type - render nothing
      return null

    default:
      // For unknown types, try to render children
      if (node.children) {
        return (
          <div key={key}>
            {node.children.map((child, i) => childRenderer(child, i))}
          </div>
        )
      }
      return null
  }
}

// Translate internal URL slugs for EN locale
function translateInternalUrl(url: string, locale: string): string {
  if (locale !== 'en' || !url.startsWith('/')) return url

  // Handle /leistungen/[slug] → /services/[translated-slug]
  const serviceMatch = url.match(/^\/leistungen\/([^\/]+)(\/.*)?$/)
  if (serviceMatch) {
    const slug = serviceMatch[1]
    const rest = serviceMatch[2] || ''
    const translatedSlug = translateServiceSlugToEn(slug)
    return `/leistungen/${translatedSlug}${rest}`
  }

  // Handle /blog/kategorie/[slug] → /blog/category/[translated-slug]
  const blogCategoryMatch = url.match(/^\/blog\/kategorie\/([^\/]+)$/)
  if (blogCategoryMatch) {
    const slug = blogCategoryMatch[1]
    const translatedSlug = translateBlogCategorySlugToEn(slug)
    return `/blog/kategorie/${translatedSlug}`
  }

  // Handle /referenzen/[slug] → /references/[translated-slug]
  const referenceMatch = url.match(/^\/referenzen\/([^\/]+)$/)
  if (referenceMatch) {
    const slug = referenceMatch[1]
    const translatedSlug = translateReferenceCategorySlugToEn(slug)
    return `/referenzen/${translatedSlug}`
  }

  return url
}

export function RichText({ content, className = '' }: RichTextProps) {
  const locale = useLocale()

  if (!content || !content.root || !content.root.children) {
    return null
  }

  // Create a locale-aware render function
  function renderNodeWithLocale(node: LexicalNode, index: number): React.ReactNode {
    const key = `node-${index}-${node.type}`

    // Handle link type specially to translate URLs
    if (node.type === 'link') {
      // Support both node.url and node.fields.url (Lexical/Payload CMS format)
      const linkUrl = node.url || (node.fields as { url?: string })?.url || '#'
      const newTab = (node.fields as { newTab?: boolean })?.newTab ?? true

      const isInternal = linkUrl.startsWith('/') || linkUrl.startsWith('https://goldenwing')
      if (isInternal && linkUrl !== '#') {
        const translatedUrl = translateInternalUrl(linkUrl, locale) as StaticAppPathname
        return (
          <Link key={key} href={translatedUrl} className="text-primary font-medium underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors">
            {node.children?.map((child, i) => renderNodeWithLocale(child, i))}
          </Link>
        )
      }
      return (
        <a
          key={key}
          href={linkUrl}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className="text-primary font-medium underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors"
        >
          {node.children?.map((child, i) => renderNodeWithLocale(child, i))}
        </a>
      )
    }

    // For all other types, use the original renderNode but with our locale-aware version for children
    return renderNodeForLocale(node, index, renderNodeWithLocale)
  }

  return (
    <div className={`max-w-none text-base md:text-[17px] ${className}`}>
      {content.root.children.map((node, index) => renderNodeWithLocale(node, index))}
    </div>
  )
}

export default RichText
