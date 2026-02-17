'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryImage {
  id?: string
  url: string
  alt?: string
  caption?: string
}

interface ProjectGalleryProps {
  images: GalleryImage[]
  projectTitle: string
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const isOpen = selectedIndex !== null

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null

  const goToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') setSelectedIndex(null)
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {images.map((image, idx) => (
          <button
            key={image.id || idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
          >
            <div className="aspect-video bg-card rounded-xl overflow-hidden border relative">
              <Image
                src={decodeURIComponent(image.url)}
                alt={image.alt || image.caption || `${projectTitle} - Bild ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 dark:bg-black/90 rounded-full p-3">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
            {image.caption && (
              <p className="mt-2 text-sm text-muted-foreground text-center">
                {image.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent
          className="!inset-0 !translate-x-0 !translate-y-0 !top-0 !left-0 !max-w-none w-screen h-screen p-0 bg-black/95 border-none rounded-none [&>button]:text-white [&>button]:hover:bg-white/20 [&>button]:rounded-full [&>button]:opacity-100 [&>button]:z-[60]"
          onKeyDown={handleKeyDown}
          showCloseButton={true}
        >
          {/* Hidden title for accessibility */}
          <VisuallyHidden>
            <DialogTitle>
              {currentImage?.caption || `${projectTitle} - Bild ${(selectedIndex ?? 0) + 1}`}
            </DialogTitle>
          </VisuallyHidden>

          {currentImage && (
            <div className="relative w-full h-full flex items-center justify-center">

              {/* Navigation - Previous */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                  <span className="sr-only">Vorheriges Bild</span>
                </Button>
              )}

              {/* Main Image */}
              <div className="relative w-[85vw] h-[70vh] mx-auto">
                <Image
                  src={decodeURIComponent(currentImage.url)}
                  alt={currentImage.alt || currentImage.caption || `${projectTitle} - Bild ${(selectedIndex ?? 0) + 1}`}
                  fill
                  className="object-contain"
                  sizes="85vw"
                  unoptimized
                  priority
                />
              </div>

              {/* Navigation - Next */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                  <span className="sr-only">Nächstes Bild</span>
                </Button>
              )}

              {/* Caption & Counter */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                {currentImage.caption && (
                  <p className="text-lg mb-2">{currentImage.caption}</p>
                )}
                <p className="text-sm text-white/70">
                  {(selectedIndex ?? 0) + 1} / {images.length}
                </p>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto p-2">
                  {images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={cn(
                        "relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all",
                        idx === selectedIndex
                          ? "border-white opacity-100"
                          : "border-transparent opacity-50 hover:opacity-75"
                      )}
                    >
                      <Image
                        src={decodeURIComponent(img.url)}
                        alt={img.alt || `${projectTitle} - Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
