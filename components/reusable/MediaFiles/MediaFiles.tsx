'use client'
import { PlayCircle } from '@/components/icons/PlayIcon'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import Lightbox, { Slide } from 'yet-another-react-lightbox'
import Inline from 'yet-another-react-lightbox/plugins/inline'
import Video from 'yet-another-react-lightbox/plugins/video'
import 'yet-another-react-lightbox/styles.css'
import SectionCard from '../SectionCard/SectionCard'
import { MediaFilesProvider, useMediaFiles } from './MediaFilesContext'
import { cn } from '@/lib/utils'

export const demoSlides: Slide[] = [
  {
    type: 'video',
    poster: '/images/carousel-files/full-shot-roofers-working-together-with-helmets.png',
    sources: [{ src: '/video/hand-water.mp4', type: 'video/mp4' }],
  },
  { type: 'image', src: '/images/carousel-files/low-angle-modern-house-roof.png' },
  { type: 'image', src: '/images/carousel-files/man-on-roof.png' },
]

interface MediaFilesProps extends React.ComponentProps<'div'> {
  slides: Slide[]
}

function MediaFilesInner({ slides, children }: MediaFilesProps) {
  const { open, index, setOpen } = useMediaFiles()

  return (
    <>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="p-0 md:max-w-3xl lg:max-w-5xl">
          <DialogHeader className="px-4 pt-4">
            <DialogTitle className="text-center">Media Files</DialogTitle>
          </DialogHeader>
          <div className="dialog-light-box relative aspect-3/2 w-full">
            <Lightbox
              className="absolute"
              index={index}
              slides={slides}
              plugins={[Video, Inline]}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function MediaFilesGridPreview({ slides, className }: MediaFilesProps) {
  const { openAt } = useMediaFiles()

  return (
    <SectionCard className={cn('grid flex-1 gap-2 bg-white sm:grid-cols-2', className)}>
      {Array.isArray(slides) &&
        slides.slice(0, 3).map((slide, index) => (
          <div
            key={index}
            onClick={() => openAt(index)}
            className="aspect-video min-h-35 rounded-md bg-gray-100 first:row-span-2 sm:aspect-auto"
          >
            <PosterPreview slide={slide} />
          </div>
        ))}
    </SectionCard>
  )
}

interface PosterPreviewProps extends React.ComponentProps<'div'> {
  slide: Slide
}

export function PosterPreview({ slide, ...props }: PosterPreviewProps) {
  if (!slide) return null

  const img = (slide as any)?.poster ?? (slide as any)?.src

  return (
    <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-md" {...props}>
      <Image
        alt=""
        width={300}
        height={200}
        // src={slide?.poster ?? slide?.src}
        src={img}
        className="h-full w-full object-cover"
      />
      {slide.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <PlayCircle className="size-12" />
        </div>
      )}
    </div>
  )
}

export function MediaFiles(props: MediaFilesProps) {
  return (
    <MediaFilesProvider>
      <MediaFilesInner {...props} />
    </MediaFilesProvider>
  )
}
