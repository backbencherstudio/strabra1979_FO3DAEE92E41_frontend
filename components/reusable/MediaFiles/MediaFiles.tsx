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
import DefaultMediaImage from '@/public/images/default_media_image.png'

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

export function MediaFilesPreviewGrid({ slides, className }: MediaFilesProps) {
  const { openAt } = useMediaFiles()

  const maxVisibleItems = 3
  const hasMore = Array.isArray(slides) && slides.length > maxVisibleItems
  const previewItems = Array.isArray(slides) ? slides.slice(0, maxVisibleItems) : []

  return (
    <SectionCard
      className={cn('grid flex-1 gap-2 bg-white', className, {
        'sm:grid-cols-2': previewItems.length > 1,
      })}
    >
      {previewItems.map((slide, index) => (
        <PosterPreview
          className={cn({
            'first:row-span-2 [&_img]:aspect-22/9': previewItems.length !== 2,
          })}
          key={index}
          onClick={() => openAt(index)}
          slide={slide}
        >
          {hasMore && index === maxVisibleItems - 1 ? (
            <div className="absolute z-10 grid h-full w-full place-items-center bg-black/70">
              <span className="text-xl text-white">+{slides.length - maxVisibleItems}</span>
            </div>
          ) : null}
        </PosterPreview>
      ))}
    </SectionCard>
  )
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

interface PosterPreviewProps extends React.ComponentProps<'button'> {
  slide: Slide
}

export function PosterPreview({ slide, children, className, ...props }: PosterPreviewProps) {
  if (!slide) return null

  const previewImage =
    slide.type === 'video' ? DefaultMediaImage : ((slide as any)?.poster ?? (slide as any)?.src)

  return (
    <button
      className={cn('relative h-full w-full overflow-hidden rounded-md', className)}
      {...props}
    >
      {children}

      <Image
        alt=""
        width={300}
        height={200}
        src={previewImage ?? DefaultMediaImage}
        className="h-full min-h-35 w-full bg-[#e9eef1] object-cover"
      />

      {slide.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <PlayCircle className="size-12" />
        </div>
      )}
    </button>
  )
}

export function MediaFiles(props: MediaFilesProps) {
  return (
    <MediaFilesProvider>
      <MediaFilesInner {...props} />
    </MediaFilesProvider>
  )
}
