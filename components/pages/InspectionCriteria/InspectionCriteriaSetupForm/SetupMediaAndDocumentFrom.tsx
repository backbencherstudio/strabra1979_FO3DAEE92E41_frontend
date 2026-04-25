import { EmbedFieldsData, IInspectionMediaField, MediaFieldItem } from '@/types'
import { useState } from 'react'
import InspectionMediaForm from '../../InspectionReport/InspectionMediaForm/InspectionMediaForm'
import { DialogProps } from './modals/EditInputDialog/EditInputDialog'
import { CreateMoreInputModal } from './modals'

interface SetupMediaAndDocumentFromProps {
  criteriaId: string | undefined
  createModalOpts: DialogProps
  mediaFields: IInspectionMediaField[] | undefined
}

export default function SetupMediaAndDocumentFrom({
  criteriaId,
  createModalOpts,
  mediaFields,
}: SetupMediaAndDocumentFromProps) {
  // Media inputs
  const [mediaFieldsData, setMediaFieldsData] = useState<MediaFieldItem[]>([])
  const [embedFields, setEmbedFields] = useState<EmbedFieldsData>({})

  return (
    <div>
      <InspectionMediaForm
        embedFields={embedFields}
        setEmbedFields={setEmbedFields}
        files={mediaFieldsData}
        setFiles={setMediaFieldsData}
        mediaFields={mediaFields}
      />

      <CreateMoreInputModal
        mode="create"
        criteriaId={criteriaId}
        editFieldType={'input-media'}
        {...createModalOpts}
      />
    </div>
  )
}
