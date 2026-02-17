import { Trush } from '@/components/icons/Trush'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useMemo } from 'react'
import { formatFileSize } from './FileInput'
import { useFileInput } from './FileInputProvider'

export default function FileInputPreview() {
  const { files, removeFile } = useFileInput()

  const imageUrls = useMemo(() => {
    return files.map((file) => ({
      isImage: file.type.startsWith('image/'),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    }))
  }, [files])

  return (
    <div className="h-full space-y-3">
      {imageUrls.map((img, index) => (
        <div className="flex h-full gap-3 px-3" key={index}>
          <Image className="" width={120} height={120} alt=" " src={img.url} />

          <div className="mt-3 min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{img.name}</p>
            <p className="text-muted-foreground text-xs">{formatFileSize(img.size)}</p>
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
