import { FilePdf, FileVideo } from '@/components/icons/File'
import { Trush } from '@/components/icons/Trush'
import { Button } from '@/components/ui/button'
import { IInspectionMediaFileItem } from '@/types'
import { cn } from '@/lib/utils'
import { File } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'
import { formatFileSize } from './FileInput'

interface FileInputPreviewProps extends React.ComponentProps<'div'> {
  files: (File | IInspectionMediaFileItem)[]
  removeFile: (index: number) => void
}

export default function FileInputPreview({
  className,
  files = [],
  removeFile,
  ...props
}: FileInputPreviewProps) {
  const fileMeta = useMemo(() => {
    return files.map((file) => {
      const isRemote = 'url' in file
      const isImage = isRemote ? file.fileType === 'PHOTO' : file.type.startsWith('image/')
      const isVideo = isRemote ? file.fileType === 'VIDEO' : file.type.startsWith('video/')
      const isPdf = isRemote ? file.fileType === 'PDF' : file.type.startsWith('application/pdf')
      const name = isRemote ? file.fileName : file.name
      const size = isRemote ? file.size : file.size
      const url = isRemote ? file.url : URL.createObjectURL(file)

      return { isImage, isVideo, isPdf, name, size, url, isRemote }
    })
  }, [files])

  if (fileMeta.length == 0) {
    return null
  }

  const isOdd = fileMeta.length % 2 !== 0

  return (
    <div className={cn('grid grid-cols-2 gap-4', className)} {...props}>
      {fileMeta.map((f, index) => (
        <div
          key={index}
          className={cn(
            'border-border/50 relative flex h-35 gap-2 rounded-lg border-2 border-dashed bg-white px-2 py-2',
            { 'last:col-span-full': isOdd },
          )}
        >
          <Button
            size="icon"
            type="button"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              removeFile(index)
            }}
            className="absolute top-2 right-2"
          >
            <Trush className="text-destructive size-5" />
          </Button>

          {f.isImage ? (
            <div className="bg-normal-25 flex aspect-video items-center justify-center rounded-md p-1">
              <Image
                className="size-full object-cover"
                width={120}
                height={120}
                alt=" "
                src={f.url}
              />
            </div>
          ) : (
            <div className="grid place-items-center">
              <div className="bg-normal-25 flex size-12 items-center justify-center rounded-md">
                {f.isPdf ? <FilePdf /> : f.isVideo ? <FileVideo /> : <File />}
              </div>
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col justify-center pt-2">
            <p className="text-foreground truncate text-sm font-medium">{f.name}</p>
            <p className="text-muted-foreground text-xs">{formatFileSize(f.size)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
