import { Dialog } from '@/components/ui/dialog'
import InspectionMediaForm from '../../InspectionReport/InspectionMediaForm/InspectionMediaForm'
import { CreateMoreInputModal } from './EditInputFeilds/EditInputFeilds'

type DialogProps = React.ComponentProps<typeof Dialog>

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
