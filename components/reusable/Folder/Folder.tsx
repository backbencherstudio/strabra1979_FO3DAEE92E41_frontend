import { FolderFileTypeIcon, FolderIcon } from '@/components/icons/FolderIcon'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import SectionCard from '../SectionCard/SectionCard'

interface FolderMeta {
  label: string
  size: string
  fileCount: string
  type?: 'folder' | 'file'
}

interface FolderProps {
  meta: FolderMeta
  className?: string
}

interface FolderPreviewProps {
  meta: FolderMeta
  className?: string
}

export function FolderPreview({ meta, className }: FolderPreviewProps) {
  return (
    <SectionCard className={cn('flex gap-1.5 bg-white p-4', className)}>
      <div>{meta.type == 'file' ? <FolderFileTypeIcon /> : <FolderIcon />}</div>

      <div className="flex flex-1 flex-col text-left">
        <span className="line-clamp-1 text-sm font-medium">{meta.label}</span>
        <span className="text-gray-black-300 text-sm">
          {meta.fileCount} File &bull; {meta.size}
        </span>
      </div>
    </SectionCard>
  )
}

export function Folder({ meta, className }: FolderProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <FolderPreview meta={meta} className={className} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-1 flex-col">
            <DialogTitle className="text-foreground md:text-2xl">{meta.label}</DialogTitle>
            <span className="text-gray-black-300 text-sm">
              {meta.fileCount} File &bull; {meta.size}
            </span>
          </div>
        </DialogHeader>

        <hr className="border-gray-black-50 mb-1" />

        <div className="grid grid-cols-2 gap-4">
          <FolderPreview
            meta={{
              type: 'file',
              label: '2024 Semi Annual Inspection',
              fileCount: '24',
              size: '12 GB',
            }}
          />

          <FolderPreview
            meta={{
              type: 'file',
              label: '2024 Semi Annual Inspection',
              fileCount: '24',
              size: '12 GB',
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
