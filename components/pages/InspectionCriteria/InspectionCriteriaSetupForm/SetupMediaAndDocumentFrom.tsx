import InspectionMediaForm from '../../InspectionReport/InspectionMediaForm/InspectionMediaForm'
import { DialogProps } from './modals/EditInputDialog/EditInputDialog'
import { CreateMoreInputModal } from './modals'

interface SetupMediaAndDocumentFromProps {
  createModalOpts: DialogProps
}

export default function SetupMediaAndDocumentFrom({
  createModalOpts,
}: SetupMediaAndDocumentFromProps) {
  return (
    <div>
      {/* <InspectionMediaForm /> */}

      {/* Add More Input fileds */}
      <CreateMoreInputModal editFieldType={'input-media'} {...createModalOpts} />
    </div>
  )
}
