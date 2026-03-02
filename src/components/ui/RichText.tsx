import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

interface RichTextProps {
  content: any
}

export function RichText({ content }: RichTextProps) {
  if (!content) return null

  return <PayloadRichText data={content} />
}
