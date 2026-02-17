'use client'

import React from 'react'

interface MarkdownContentProps {
  content: string
  className?: string
}

/**
 * Simple Markdown renderer for basic content
 * Supports: ## headings, ### subheadings, **bold**, - lists, numbered lists
 */
export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  if (!content) return null

  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | null = null
  let key = 0

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType
      elements.push(
        <ListTag key={key++} className={listType === 'ul' ? 'list-disc pl-6 mb-6 space-y-2' : 'list-decimal pl-6 mb-6 space-y-2'}>
          {currentList.map((item, i) => (
            <li key={i} className="text-foreground/90">{renderInlineFormatting(item)}</li>
          ))}
        </ListTag>
      )
      currentList = []
      listType = null
    }
  }

  const renderInlineFormatting = (text: string): React.ReactNode => {
    // Handle **bold** and *italic*
    const parts: React.ReactNode[] = []
    let remaining = text
    let partKey = 0

    while (remaining.length > 0) {
      // Check for **bold**
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/)
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(<React.Fragment key={partKey++}>{remaining.slice(0, boldMatch.index)}</React.Fragment>)
        }
        parts.push(<strong key={partKey++}>{boldMatch[1]}</strong>)
        remaining = remaining.slice(boldMatch.index + boldMatch[0].length)
        continue
      }

      // Check for *italic*
      const italicMatch = remaining.match(/\*([^*]+)\*/)
      if (italicMatch && italicMatch.index !== undefined) {
        if (italicMatch.index > 0) {
          parts.push(<React.Fragment key={partKey++}>{remaining.slice(0, italicMatch.index)}</React.Fragment>)
        }
        parts.push(<em key={partKey++}>{italicMatch[1]}</em>)
        remaining = remaining.slice(italicMatch.index + italicMatch[0].length)
        continue
      }

      // No more formatting, add the rest
      parts.push(<React.Fragment key={partKey++}>{remaining}</React.Fragment>)
      break
    }

    return parts.length > 0 ? parts : text
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Empty line - flush any pending list
    if (!trimmed) {
      flushList()
      continue
    }

    // Heading ##
    if (trimmed.startsWith('## ')) {
      flushList()
      const text = trimmed.slice(3)
      elements.push(
        <h2 key={key++} className="text-2xl md:text-3xl font-bold mt-10 mb-4">
          {renderInlineFormatting(text)}
        </h2>
      )
      continue
    }

    // Subheading ###
    if (trimmed.startsWith('### ')) {
      flushList()
      const text = trimmed.slice(4)
      elements.push(
        <h3 key={key++} className="text-xl font-semibold mt-8 mb-3">
          {renderInlineFormatting(text)}
        </h3>
      )
      continue
    }

    // Bullet list item
    if (trimmed.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      currentList.push(trimmed.slice(2))
      continue
    }

    // Numbered list item
    const numberedMatch = trimmed.match(/^\d+\.\s+(.+)$/)
    if (numberedMatch) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
      }
      currentList.push(numberedMatch[1])
      continue
    }

    // Regular paragraph
    flushList()
    elements.push(
      <p key={key++} className="mb-4 text-foreground/90 leading-relaxed">
        {renderInlineFormatting(trimmed)}
      </p>
    )
  }

  // Flush any remaining list
  flushList()

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {elements}
    </div>
  )
}

export default MarkdownContent
