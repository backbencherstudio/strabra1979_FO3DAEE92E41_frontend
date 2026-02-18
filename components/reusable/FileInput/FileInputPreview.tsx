import { FilePdf, FileVideo } from '@/components/icons/File'
import { Trush } from '@/components/icons/Trush'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { File } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'
import { formatFileSize } from './FileInput'
import { useFileInput } from './FileInputProvider'

export default function FileInputPreview({ className, ...props }: React.ComponentProps<'div'>) {
  const { files, removeFile } = useFileInput()

  const fileMeta = useMemo(() => {
    return files.map((file) => ({
      isImage: file.type.startsWith('image/'),
      isVideo: file.type.startsWith('video/'),
      isPdf: file.type.startsWith('application/pdf'),
      isApplicationFile: file.type.startsWith('application/'),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    }))
  }, [files])

  if (fileMeta.length == 0) {
    return null
  }

  return (
    <div className={cn('flex h-full flex-col gap-y-3.5 rounded-lg bg-white', className)} {...props}>
      {fileMeta.map((f, index) => (
        <div className="flex h-full gap-3 px-3" key={index}>
          {f.isImage ? (
            <div className="bg-normal-25 flex items-center justify-center rounded-md p-1">
              <Image className="" width={120} height={120} alt=" " src={f.url} />
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

          <Button
            type="button"
            size="icon-md"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              removeFile(index)
            }}
            className="self-center"
          >
            <Trush className="size-6" />
          </Button>
        </div>
      ))}
    </div>
  )
}
