import { FolderFileTypeIcon, FolderIcon } from '@/components/icons/FolderIcon'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn, isArrayEmpty } from '@/lib/utils'
import SectionCard from '../SectionCard/SectionCard'
import { IFolderInspectionInfo } from '@/types'
import { formatDate } from '@/lib/farmatters'

interface FolderMeta {
  label: string
  size?: string
  fileCount?: number | string
  type?: 'folder' | 'file'
  info?: string[]
}

interface FolderPreviewProps extends React.PropsWithChildren {
  meta: FolderMeta
  className?: string
}

export function FolderPreview({ meta, className, children }: FolderPreviewProps) {
  function formateFileInfo() {
    const info = []

    if (meta.fileCount != null) {
      const count = Number(meta.fileCount)

      if (!Number.isNaN(count)) {
        info.push(`${count} File${count === 1 ? '' : 's'}`)
      }
    }

    if (meta.size != null) {
      if (info.length) {
        info.push('•')
      }
      info.push(meta.size)
    }

    return info.join(' ')
  }

  return (
    <SectionCard className={cn('flex items-center gap-1.5 bg-white p-4', className)}>
      <div>{meta.type == 'file' ? <FolderFileTypeIcon /> : <FolderIcon />}</div>

      <div className="flex flex-1 flex-col text-left">
        <span className="line-clamp-1 text-sm font-medium">{meta.label}</span>
        <span className="text-gray-black-300 text-sm">
          {isArrayEmpty(meta?.info) ? null : meta?.info.join(' • ')}
        </span>
      </div>

      {children}
    </SectionCard>
  )
}

interface FolderProps {
  meta: FolderMeta
  className?: string
  childrenFolders: IFolderInspectionInfo[] | undefined
  isLoading?: boolean
  onOpenClick: () => void
}

export function Folder({ meta, isLoading, className, childrenFolders, onOpenClick }: FolderProps) {
  return (
    <Dialog>
      <DialogTrigger onClick={onOpenClick}>
        <FolderPreview meta={meta} className={className} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-1 flex-col">
            <DialogTitle className="text-foreground md:text-2xl">{meta.label}</DialogTitle>
            <span className="text-gray-black-300 mt-1 text-sm">
              {isArrayEmpty(meta?.info) ? null : meta?.info.join(' • ')}
            </span>
          </div>
        </DialogHeader>

        <hr className="border-gray-black-50 mb-1" />

        <div className="grid grid-cols-2 gap-4">
          {isLoading && isArrayEmpty(childrenFolders) ? (
            Array.from({ length: 2 }).map((_, i) => (
              <FolderPreview meta={{ type: 'file', label: 'Loading...', info: ['...'] }} key={i} />
            ))
          ) : isArrayEmpty(childrenFolders) ? (
            <SectionCard className="col-span-full grid h-18.5 place-items-center bg-white">
              <p className="text-muted-foreground text-sm">No files in this folder yet.</p>
            </SectionCard>
          ) : (
            childrenFolders?.map((f) => (
              <FolderPreview
                key={f.id}
                meta={{
                  type: 'file',
                  label: f.title,
                  info: [formatDate(f.createdAt)],
                }}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
