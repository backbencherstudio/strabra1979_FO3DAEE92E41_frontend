'use client'

import FormInputField from '@/components/form/form-input-field'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import z from 'zod'
import { SelectInspectionDialog } from './SelectInspectionDialog'
import { IFolderInspectionReportSelectItem } from '@/types'

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
  const form = useForm({
    defaultValues: {
      folderName: '',
    },
    validators: {
      onSubmit: createFolderSchema,
    },
    onSubmit: async ({ value }) => {
      console.log({ value })
    },
  })
  const [selectedInspectionIds, setSelectedInspectionIds] = useState<
    IFolderInspectionReportSelectItem[]
  >([])

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
            selectedIds={selectedInspectionIds}
            setSelectedIds={setSelectedInspectionIds}
            // onSelect={(id) => {
            //   setSelectedInspectionIds((prev) =>
            //     prev.some((item) => item.id === id)
            //       ? prev.filter((item) => item.id !== id)
            //       : [...prev, { id, title: '', createdAt: '' }],
            //   )
            // }}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
