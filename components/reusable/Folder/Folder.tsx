import { useDeleteSingleFolderMutation } from '@/api/inspectionManagement/folderManagementApi'
import { FolderFileTypeIcon, FolderIcon } from '@/components/icons/FolderIcon'
import { Trush } from '@/components/icons/Trush'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate, getErrorMessage } from '@/lib/farmatters'
import { cn, isArrayEmpty } from '@/lib/utils'
import { IFolderInspectionReportSelectItem } from '@/types'
import { Edit, EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import SectionCard from '../SectionCard/SectionCard'

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
  onOpen?: () => void
}

export function FolderPreview({ meta, className, children, onOpen }: FolderPreviewProps) {
  return (
    <SectionCard className={cn('flex items-center gap-1.5 bg-white p-4', className)}>
      <div className="cursor-pointer" onClick={onOpen}>
        {meta.type == 'file' ? <FolderFileTypeIcon /> : <FolderIcon />}
      </div>

      <div onClick={onOpen} className="flex flex-1 cursor-pointer flex-col text-left">
        <span className="line-clamp-1 text-sm font-medium">{meta.label}</span>
        <span className="text-gray-black-300 text-sm">
          {isArrayEmpty(meta?.info) ? null : meta?.info.join(' • ')}
        </span>
      </div>

      {children}
    </SectionCard>
  )
}

interface FolderProps extends React.PropsWithChildren {
  meta: FolderMeta
  className?: string
  childrenFolders: IFolderInspectionReportSelectItem[] | undefined
  isLoading?: boolean
  onOpenClick: () => void
}

export function Folder({
  meta,
  isLoading,
  className,
  childrenFolders,
  onOpenClick,
  children,
}: FolderProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FolderPreview
        onOpen={() => {
          setOpen((v) => !v)
          onOpenClick()
        }}
        meta={meta}
        className={className}
      >
        {children}
      </FolderPreview>

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

export function FolderDropdownMenu(props: {
  dashboardId: string
  folderId: string
  onEdit: () => void
}) {
  const [deleteFolder, { isLoading: isLoadingDelete }] = useDeleteSingleFolderMutation()

  async function handleDelete() {
    try {
      const res = await deleteFolder({
        dashboardId: props.dashboardId,
        folderId: props.folderId,
      }).unwrap()

      toast.success(res.message || 'Folder deleted successfully')
    } catch (err) {
      toast.error('Failed to delete folder', {
        description: getErrorMessage(err),
      })
    }
  }
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  return (
    <>
      <ConfirmDialog
        open={openConfirmDialog}
        iconContainerClass="bg-destructive"
        icon={<Trush />}
        onOpenChange={setOpenConfirmDialog}
        title="Delete Folder"
        desc="Are you sure you want to delete this folder?"
      >
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete} variant="destructive">
          Delete
        </AlertDialogAction>
      </ConfirmDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="border-none" size="icon" variant="outline">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={props.onEdit}>
            <Edit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isLoadingDelete} onClick={() => setOpenConfirmDialog(true)}>
            <Trush />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
