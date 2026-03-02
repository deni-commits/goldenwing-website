interface VideoEmbedBlockProps {
  block: {
    url: string
    caption?: string
    posterImage?: { url?: string; alt?: string }
  }
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch?.[1]) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch?.[1]) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

export function VideoEmbedBlock({ block }: VideoEmbedBlockProps) {
  const embedUrl = getEmbedUrl(block.url)

  if (!embedUrl) return null

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            src={embedUrl}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={block.caption || 'Video'}
          />
        </div>
        {block.caption && (
          <p className="mt-3 text-center text-sm text-muted">{block.caption}</p>
        )}
      </div>
    </section>
  )
}
