'use client'

import { useState } from 'react'
import { Share2, Check, Link2, Twitter, Linkedin, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  url: string
  title: string
  score?: number
  toolName: string
  locale?: string
  className?: string
}

export function ShareButton({
  url,
  title,
  score,
  toolName,
  locale = 'de',
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const t = locale === 'de' ? {
    share: 'Teilen',
    copyLink: 'Link kopieren',
    copied: 'Kopiert!',
    shareOn: 'Teilen auf',
  } : {
    share: 'Share',
    copyLink: 'Copy link',
    copied: 'Copied!',
    shareOn: 'Share on',
  }

  // Generate share text
  const shareText = score !== undefined
    ? locale === 'de'
      ? `Meine Website ${url} hat einen ${toolName} Score von ${score}/100! Teste deine Website kostenlos:`
      : `My website ${url} got a ${toolName} score of ${score}/100! Test your website for free:`
    : locale === 'de'
      ? `Ich habe meine Website mit dem kostenlosen ${toolName} von GoldenWing analysiert:`
      : `I analyzed my website with the free ${toolName} from GoldenWing:`

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const handleShareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(linkedInUrl, '_blank', 'width=550,height=420')
  }

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, '_blank', 'width=550,height=420')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        })
      } catch {
        // User cancelled or share failed
      }
    }
  }

  // Check if native share is available (mobile)
  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className={cn('gap-2', className)}>
          <Share2 className="h-4 w-4" />
          {t.share}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              {t.copied}
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              {t.copyLink}
            </>
          )}
        </DropdownMenuItem>

        {hasNativeShare && (
          <DropdownMenuItem onClick={handleNativeShare} className="gap-2 cursor-pointer">
            <Share2 className="h-4 w-4" />
            {t.share}...
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleShareTwitter} className="gap-2 cursor-pointer">
          <Twitter className="h-4 w-4" />
          Twitter / X
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleShareLinkedIn} className="gap-2 cursor-pointer">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleShareFacebook} className="gap-2 cursor-pointer">
          <Facebook className="h-4 w-4" />
          Facebook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
