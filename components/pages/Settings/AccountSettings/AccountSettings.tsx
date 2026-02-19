import { Trush } from '@/components/icons/Trush'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import { SectionTitle, SettingSectionCard } from '@/components/reusable/SectionCard/SectionCard'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default function AccountSettings() {
  return (
    <SettingSectionCard>
      <SectionTitle className="text-lg">Delete Account</SectionTitle>
      <p className="mt-3 text-base">
        This account owns 2 Property Dashboards. Deleting your account will remove all the content
        associated with it.
      </p>

      <hr className="border-gray-black-50 my-6" />
      <div className="flex justify-end">
        <ConfirmDialog
          iconContainerClass="bg-destructive"
          icon={<Trush className="size-6" />}
          trigger={
            <Button variant="destructive" size="xl">
              Delete Account
            </Button>
          }
          title="Delete Account"
          desc="Are you sure you want to delete your account?"
        >
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete Account</AlertDialogAction>
        </ConfirmDialog>
      </div>
    </SettingSectionCard>
  )
}
