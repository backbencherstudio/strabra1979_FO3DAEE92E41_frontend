'use client'

import {
  useGetPropertyDashboardAccessListQuery,
  useRevokeDashboardAccessMutation,
  useShareDashboardWithEmailMutation,
} from '@/api/dashboard/properties/propertiesApi'
import FormInputField from '@/components/form/form-input-field'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { ShareIcon } from '@/components/icons/ShareIcon'
import { Trush } from '@/components/icons/Trush'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from '@/components/ui/popover'
import { routes } from '@/constant'
import { getErrorMessage } from '@/lib/farmatters'
import { isArrayEmpty } from '@/lib/utils'
import { IAccessUser, IPropertyDashboardDetails } from '@/types'
import { useForm } from '@tanstack/react-form'
import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'

type PropertyViewAccess = 'authorized-viewer' | 'only-me'

interface PropertySharePopoverProps {
  dashboardId: string
  dashboradDetails: IPropertyDashboardDetails | undefined
}

const shareSchema = z.object({
  email: z.string().min(3, 'Valid email or username is required'),
})

type ShareFormValues = z.infer<typeof shareSchema>

export default function PropertySharePopover({
  dashboradDetails,
  dashboardId,
}: PropertySharePopoverProps) {
  const [viewAccess, setViewAccess] = useState<PropertyViewAccess>('only-me')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IAccessUser | undefined>(undefined)

  const { data: { data: dashboardAccessData } = {}, isLoading: isLoadingAccessList } =
    useGetPropertyDashboardAccessListQuery(dashboardId, { skip: !isPopoverOpen })

  const [shareDashboardWithEmail, { isLoading: isLoadingShare }] =
    useShareDashboardWithEmailMutation()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: shareSchema,
    },
    onSubmit: async ({ value }) => {
      if (!dashboradDetails?.id) return
      await handleShareDashboard(dashboradDetails.id, value.email)
      form.reset()
    },
  })

  async function handleShareDashboard(dashboardId: string, emailOrUserId: string) {
    try {
      const res = await shareDashboardWithEmail({ dashboardId, emailOrUserId }).unwrap()

      toast.success(res.message || 'Dashboard shared successfully')
    } catch (err) {
      toast.error('Error sharing dashboard', {
        description: getErrorMessage(err),
      })
    }
  }

  const [revokeDashboardAccess, { isLoading: isRevokeDashboardAccessLoading }] =
    useRevokeDashboardAccessMutation()

  const onRevokeAccessClick = async (dashboardId: string, userId?: string) => {
    if (!dashboardId || !userId) return

    try {
      const res = await revokeDashboardAccess({
        dashboardId,
        targetUserId: userId,
      }).unwrap()

      toast.success(res?.message ?? 'User access revoked successfully.')
    } catch (error) {
      toast.error('Failed to revoke access.', {
        description: getErrorMessage(error),
      })
    }
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Link copied to clipboard.')
    } catch (err) {
      toast.error('We couldn’t copy the link. Please try again or copy it manually.', {
        description: getErrorMessage(err),
      })
    }
  }

  function handleOnCopy() {
    try {
      const baseUrl = window.location.origin
      if (!baseUrl) {
        throw new Error('Unable to determine the website URL.')
      }

      copyText(`${baseUrl}${routes.redirects.propertyDetail.build({ dashboardId: dashboardId })}`)
    } catch (err) {
      toast.error('Copy failed', {
        description: getErrorMessage(err),
      })
    }
  }

  if (!dashboardId) return

  return (
    <div>
      <ConfirmDialog
        open={openDeleteConfirmDialog}
        iconContainerClass="bg-destructive"
        icon={<Trush />}
        onOpenChange={setOpenDeleteConfirmDialog}
        title="Revoke Dashboard Access"
        desc={`Are you sure you want to revoke ${selectedUser?.username}'s access to this dashboard?`}
      >
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => onRevokeAccessClick(dashboardId, selectedUser?.id)}
          variant="destructive"
        >
          Revoke Access
        </AlertDialogAction>
      </ConfirmDialog>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button onClick={() => setIsPopoverOpen((v) => !v)} variant="outline">
            <ShareIcon />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="text-foreground w-full min-w-150" align="end">
          <PopoverHeader className="flex flex-1 flex-col">
            <SectionTitle className="text-foreground md:text-2xl">
              {dashboradDetails?.property.name}
            </SectionTitle>
          </PopoverHeader>

          <hr className="border-gray-black-50 my-4" />

          <div className="space-y-3">
            <section className="flex items-center justify-between">
              <span className="text-base font-medium">Share the dashboard</span>
              <Button
                onClick={handleOnCopy}
                size="default"
                className="text-[#4988C4]"
                variant="link"
              >
                <LinkIcon />
                Copy Link
              </Button>
            </section>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="flex gap-1"
            >
              <FormInputField<ShareFormValues>
                label=""
                form={form}
                name="email"
                placeholder="Add an email address or username"
                containerClass="bg-normal-25 flex-1 h-11"
                className="h-11"
              />

              <Button
                type="submit"
                size="lg"
                className="h-11 px-8"
                variant="muted"
                disabled={isLoadingShare}
              >
                Invite
              </Button>
            </form>

            <section className="pt-3">
              <section className="flex items-center justify-between">
                <span className="text-base font-medium">Who has view access</span>
                {/* <Select */}
                {/*   value={viewAccess} */}
                {/*   onValueChange={(v) => setViewAccess(v as PropertyViewAccess)} */}
                {/* > */}
                {/*   <SelectTrigger size="sm" className="bg-hover-50"> */}
                {/*     <SelectValue placeholder="Select" /> */}
                {/*   </SelectTrigger> */}
                {/*   <SelectContent align="end"> */}
                {/*     <SelectGroup> */}
                {/*       <SelectItem value="only-me">Only me</SelectItem> */}
                {/*       <SelectItem value="authorized-viewer">Authorized Viewer</SelectItem> */}
                {/*     </SelectGroup> */}
                {/*   </SelectContent> */}
                {/* </Select> */}
              </section>

              {isArrayEmpty(dashboardAccessData?.accessList) || isLoadingAccessList ? (
                <p className="text-muted-foreground py-3 text-sm">
                  {isLoadingAccessList
                    ? 'Loading...'
                    : 'No one has access to this dashboard yet. Invite someone above.'}
                </p>
              ) : (
                <section className="divide-hover-50 mt-3 divide-y">
                  {dashboardAccessData?.accessList.map((item) => (
                    <PropertryAccessUserListItem
                      onRemove={() => {
                        if (isRevokeDashboardAccessLoading) return

                        setSelectedUser(item.user)
                        setOpenDeleteConfirmDialog(true)
                      }}
                      key={item.accessId}
                      name={item.user.username}
                      email={item.user.email}
                    />
                  ))}
                </section>
              )}
            </section>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface PropertryAccessUserListItemProps {
  name: string
  email: string
  onRemove: () => void
}

export const PropertryAccessUserListItem = ({
  name,
  email,
  onRemove,
}: PropertryAccessUserListItemProps) => {
  return (
    <div className="flex justify-between py-1">
      <div>
        <h6 className="text-sm font-medium">{name}</h6>
        <p className="text-gray-black-300 text-xs">{email}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative -right-3" variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onRemove}>Remove</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
