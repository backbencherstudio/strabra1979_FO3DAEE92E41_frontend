import InspectionMediaForm from '../../InspectionReport/InspectionMediaForm/InspectionMediaForm'
import { CreateMoreInputModal, DialogProps } from './EditInputFeilds/EditInputFeilds'

interface SetupMediaAndDocumentFromProps {
  createModalOpts: DialogProps
}

export default function SetupMediaAndDocumentFrom({
  createModalOpts,
}: SetupMediaAndDocumentFromProps) {
  return (
    <div>
      <InspectionMediaForm />

      {/* Add More Input fileds */}
      <CreateMoreInputModal editFieldType={'input-media'} {...createModalOpts} />
    </div>
  )
}
