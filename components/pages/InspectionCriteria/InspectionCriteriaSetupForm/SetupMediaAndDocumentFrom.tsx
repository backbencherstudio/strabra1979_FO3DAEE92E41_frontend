import PlusIcon from '@/components/icons/PlusIcon'
import { Portal } from '@/components/reusable/Portal/Portal'
import { Button } from '@/components/ui/button'
import { EmbedFieldsData, IInspectionMediaField, MediaFieldItem } from '@/types'
import React, { useState } from 'react'
import InspectionMediaForm from '../../InspectionReport/InspectionMediaForm/InspectionMediaForm'
import { useChecklistAndMediaTabName } from '../../InspectionReport/InspectionReportDetail/InspectionReportDetail'
import { CreateMoreInputModal } from './modals'

interface SetupMediaAndDocumentFromProps {
  criteriaId: string | undefined
  mediaFields: IInspectionMediaField[] | undefined
  isEditable: boolean
}

export default function SetupMediaAndDocumentFrom({
  criteriaId,
  mediaFields,
  isEditable,
}: SetupMediaAndDocumentFromProps) {
  const { isMediaFilesTab } = useChecklistAndMediaTabName()

  // Media inputs
  const [mediaFieldsData, setMediaFieldsData] = useState<MediaFieldItem[]>([])
  const [embedFields, setEmbedFields] = useState<EmbedFieldsData>({})

  // CreateMoreInputModal state
  const [editFieldData, setEditFieldData] = React.useState<IInspectionMediaField | undefined>()
  const [createInputModalMode, setCreateInputModalMode] = React.useState<'edit' | 'create'>()
  const handleCreateFieldOpen = () => setCreateInputModalMode('create')

  return (
    <>
      {isMediaFilesTab ? (
        <Portal targetId="open-media-modal">
          <Button onClick={handleCreateFieldOpen} variant="outline">
            <PlusIcon />
            Add More Supporting Media & Documents
          </Button>
        </Portal>
      ) : null}

      <CreateMoreInputModal
        mode={createInputModalMode}
        initialData={createInputModalMode === 'create' ? undefined : editFieldData}
        criteriaId={criteriaId}
        modalType="mediafiles"
        open={createInputModalMode !== undefined}
        onOpenChange={(v) => {
          if (!v) {
            setCreateInputModalMode(undefined)
          }
        }}
      />

      <InspectionMediaForm
        disabled
        serverMediaFiles={[]}
        onMediaUpload={() => {}}
        onDelete={() => {}}
        onOpenEditModal={(conf) => {
          setEditFieldData(conf)
          setCreateInputModalMode('edit')
        }}
        isEditMode={isEditable}
        embedFields={embedFields}
        setEmbedFields={setEmbedFields}
        mediaFields={mediaFields}
      />
    </>
  )
}
