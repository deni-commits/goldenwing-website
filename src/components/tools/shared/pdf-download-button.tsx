'use client'

import { useState } from 'react'
import { Download, Loader2, FileText, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PdfDownloadButtonProps {
  analysisId: string
  disabled?: boolean
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

export function PdfDownloadButton({
  analysisId,
  disabled = false,
  className,
  variant = 'outline',
}: PdfDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    if (disabled || isDownloading) return

    setIsDownloading(true)
    setError(null)

    try {
      const response = await fetch(`/api/tools/pdf?id=${analysisId}`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('PDF konnte nicht generiert werden')
      }

      // Get the blob and create download link
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `website-analyse-${analysisId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      setIsComplete(true)
      setTimeout(() => setIsComplete(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download fehlgeschlagen')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className={cn('inline-flex flex-col items-start', className)}>
      <Button
        onClick={handleDownload}
        disabled={disabled || isDownloading}
        variant={variant}
        className="gap-2"
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Wird erstellt...</span>
          </>
        ) : isComplete ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Download gestartet</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span>PDF herunterladen</span>
          </>
        )}
      </Button>

      {error && (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}

interface PdfPreviewCardProps {
  title?: string
  description?: string
  onDownload?: () => void
  isLoading?: boolean
  className?: string
}

export function PdfPreviewCard({
  title = 'PDF Report',
  description = 'Laden Sie Ihren vollständigen Analyse-Report herunter',
  onDownload,
  isLoading = false,
  className,
}: PdfPreviewCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border bg-muted/30',
        className
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>

      <Button
        onClick={onDownload}
        disabled={isLoading}
        size="sm"
        variant="outline"
        className="flex-shrink-0"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
