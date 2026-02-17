'use client'

import { RichText as RichTextBase, type LexicalContent } from './index'

interface RichTextWrapperProps {
  content: LexicalContent | null | undefined
  className?: string
}

export function RichTextWrapper({ content, className }: RichTextWrapperProps) {
  if (!content) return null
  return <RichTextBase content={content} className={className} />
}
