'use client'

import FormInputField from '@/components/form/form-input-field'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatDate, getErrorMessage } from '@/lib/farmatters'
import { IFolderInspectionReportSelectItem } from '@/types'
import { useForm } from '@tanstack/react-form'
import { useEffect, useEffectEvent, useState } from 'react'
import z from 'zod'
import { FolderPreview } from '../Folder/Folder'
import { SelectInspectionDialog } from './SelectInspectionDialog'
import { Button } from '@/components/ui/button'
import { isArrayEmpty } from '@/lib/utils'
import { toast } from 'sonner'
import { useCreateNewFolderWithInspectionDataMutation } from '@/api/inspectionManagement/folderManagementApi'
import { Trush } from '@/components/icons/Trush'

export const createFolderSchema = z.object({
  folderName: z.string().min(1, 'Folder name is required'),
})

type FolderFormValues = z.infer<typeof createFolderSchema>

interface CreateFolderDialogProps extends React.ComponentProps<typeof Dialog> {
  dashboardId: string
}

export default function CreateFolderDialog({
  open,
  onOpenChange,
  dashboardId,
}: CreateFolderDialogProps) {
  const [createFolder, { isLoading }] = useCreateNewFolderWithInspectionDataMutation()
  const form = useForm({
    defaultValues: {
      folderName: '',
    },
    validators: {
      onSubmit: createFolderSchema,
    },
    onSubmit: async ({ value }) => {
      if (isArrayEmpty(finalSelectedInspections)) {
        toast.error('No Inspection in selected')
        return
      }

      try {
        await createFolder({
          dashboardId,
          data: {
            name: value.folderName,
            inspectionIds: finalSelectedInspections.map((item) => item.id),
          },
        }).unwrap()

        onOpenChange?.(false)
        toast.success(`${value.folderName} is created successfully`)
      } catch (err) {
        toast.error('Failded to crate new folder', {
          description: getErrorMessage(err),
        })
      }
    },
  })

  const [finalSelectedInspections, setFinalSelectedInspections] = useState<
    IFolderInspectionReportSelectItem[]
  >([])
  const [selectedInspections, setSelectedInspections] = useState<
    IFolderInspectionReportSelectItem[]
  >([])

  const resetStateOnClose = useEffectEvent(() => {
    form.reset()
    setSelectedInspections([])
    setFinalSelectedInspections([])
  })
  useEffect(() => {
    if (!open) {
      setTimeout(resetStateOnClose, 300)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 sm:max-w-152">
        <DialogHeader>
          <DialogTitle className="text-gray-black-400 text-center text-xl font-medium">
            Create New Folder
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="grid gap-4"
        >
          {/* folder name */}
          <FormInputField<FolderFormValues>
            form={form}
            name="folderName"
            label="Folder Name"
            placeholder="Enter a folder name"
          />

          <SelectInspectionDialog
            dashboardId={dashboardId}
            selectedIds={selectedInspections}
            setSelectedIds={setSelectedInspections}
            onSelectConfirm={(items) => {
              setFinalSelectedInspections(items)
            }}
          />

          <form.Subscribe
            selector={(state) => ({
              isValid: state.isValid,
              isSubmitting: state.isSubmitting,
              isTouched: state.isTouched,
            })}
          >
            {({ isValid, isSubmitting, isTouched }) => (
              <Button
                type="submit"
                size="xl"
                className="flex-1"
                disabled={isLoading || !isValid || isSubmitting || !isTouched}
              >
                Create Folder
              </Button>
            )}
          </form.Subscribe>

          {finalSelectedInspections?.map((item) => (
            <FolderPreview
              className="p-3"
              key={item.id}
              meta={{
                type: 'file',
                label: item.title,
                size: formatDate(item.createdAt),
              }}
            >
              <Button
                type="button"
                onClick={() => {
                  setFinalSelectedInspections((inspections) =>
                    inspections.filter((i) => i.id !== item.id),
                  )
                }}
                className="text-destructive hover:text-destructive"
                variant="muted"
                size="icon"
              >
                <Trush className="size-5" />
              </Button>
            </FolderPreview>
          ))}
        </form>
      </DialogContent>
    </Dialog>
  )
}
