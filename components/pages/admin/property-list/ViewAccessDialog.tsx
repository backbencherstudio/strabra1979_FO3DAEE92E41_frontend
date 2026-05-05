'use client'

import {
  useGetPropertyDashboardAccessListQuery,
  useRevokeDashboardAccessMutation,
  useSetAccessExpirationMutation,
} from '@/api/dashboard/properties/propertiesApi'
import { useGetPropertiesAccessListQuery } from '@/api/userManagement/userManagementApi'
import DatePickerPopover from '@/components/reusable/DatePickerPopover/DatePickerPopover'
import EmptyMessage from '@/components/reusable/EmptyMessage/EmptyMessage'
import { ListTile } from '@/components/reusable/ListTile/ListTile'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import UserAvatar from '@/components/reusable/UserAvatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PopoverAnchor } from '@/components/ui/popover'
import { Spinner } from '@/components/ui/spinner'
import { formatDate, getErrorMessage } from '@/lib/farmatters'
import { EllipsisVertical } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

type AccessListItem = {
  accessId: string
  dashboardId: string
  title: string
  subtitle: string
  userId: string
  avatar: string | null
  expiresAt: string | null
}

interface ViewAccessDialogProps extends React.ComponentProps<typeof Dialog> {
  mode: 'dashboard' | 'user'
  dashboardId?: string
  userId?: string
}

export function ViewAccessDialog(props: ViewAccessDialogProps) {
  return (
    <PaginationPageProvider>
      <ViewAccessDialogContent {...props} />
    </PaginationPageProvider>
  )
}

function ViewAccessDialogContent({
  open,
  mode,
  onOpenChange,
  dashboardId,
  userId,
}: ViewAccessDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const isUserMode = mode === 'user'
  const shouldFetchUser = isUserMode && isOpen && Boolean(userId)
  const shouldFetchDashboard = !isUserMode && isOpen && Boolean(dashboardId)

  const { page } = usePaginationPage()

  // Get access list with dashboardId or userId
  const { data: { data: userAccessData, meta: metaUser } = {}, isLoading: isLoadingUserData } =
    useGetPropertiesAccessListQuery({ userId, page }, { skip: !shouldFetchUser })
  const {
    data: { data: dashboardAccessData, meta: metaDashboard } = {},
    isLoading: isLoadingDashboardData,
  } = useGetPropertyDashboardAccessListQuery(dashboardId as string, { skip: !shouldFetchDashboard })

  usePaginatedQuery({ meta_data: isUserMode ? metaUser : metaDashboard })

  const isLoadingData = isLoadingDashboardData || isLoadingUserData

  const formattedAccessList: AccessListItem[] = useMemo(() => {
    switch (mode) {
      case 'dashboard':
        return (dashboardAccessData?.accessList ?? []).map((item) => ({
          dashboardId: dashboardId!,
          userId: item.user.id,
          accessId: item.accessId,
          title: item.user.username,
          subtitle: item.user.username,
          avatar: item.user.avatar,
          expiresAt: item.expiresAt ?? null,
        }))

      case 'user':
        return (userAccessData ?? []).map((item) => ({
          dashboardId: item.property.dashboardId,
          userId: userId!,
          accessId: item.accessId,
          title: item.property.name,
          subtitle: item.property.address,
          avatar: null,
          expiresAt: item.expiresAt ?? null,
        }))

      default:
        return []
    }
  }, [dashboardAccessData, userAccessData, userId, mode, dashboardId])

  const [revokeDashboardAccess, { isLoading: isRevokeDashboardAccessLoading }] =
    useRevokeDashboardAccessMutation()

  const onRevokeAccessClick = async (userId: string, dashboardId: string) => {
    if (!userId || !dashboardId) {
      toast.error('Unable to revoke access', {
        description: !userId ? 'User ID is missing.' : 'Dashboard ID is missing.',
      })
      return
    }

    try {
      const res = await revokeDashboardAccess({
        dashboardId,
        targetUserId: userId,
      }).unwrap()

      toast.success(res?.message ?? 'User access revoked successfully.')
    } catch (error) {
      toast.error('Failed to revoke access', { description: getErrorMessage(error) })
    }
  }

  // TODO: work on "Set access expiration date"
  const [setAccessExpiration, { isLoading: isAccessExpirationLoading }] =
    useSetAccessExpirationMutation()

  const handleSetExpiration = async (expiresAt: string, userId: string, dashboardId: string) => {
    try {
      await setAccessExpiration({
        dashboardId,
        userId,
        accessExpiresAt: expiresAt,
      }).unwrap()

      toast.success('Access expiration updated!')
    } catch (error) {
      toast.error('Failed to update expiration', {
        description: getErrorMessage(error),
      })
    }
  }

  const userAccessExpireInfo = useRef<{
    userId: string | undefined
    dashboardId: string | undefined
  }>({
    userId: undefined,
    dashboardId: undefined,
  })
  const [userAccessExpireAt, setUserAccessExpireAt] = useState<Date | undefined>()
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const handDatePickerOpen = (
    expiresAt: string | null,
    userId: string | undefined,
    dashboardId: string | undefined,
  ) => {
    if (!userId || !dashboardId) {
      toast.error('User Info missing', {
        description: !userId ? 'User ID is missing.' : 'Dashboard ID is missing.',
      })
      return
    }

    userAccessExpireInfo.current = { userId, dashboardId }
    setUserAccessExpireAt(expiresAt ? new Date(expiresAt) : undefined)
    setTimeout(() => setOpenDatePicker(true), 200)
  }
  const onSelectDate = (newDate: Date | undefined) => {
    if (!userAccessExpireInfo.current.userId || !userAccessExpireInfo.current.dashboardId) {
      toast.error('User Info missing', {
        description: !userAccessExpireInfo.current.userId
          ? 'User ID is missing.'
          : 'Dashboard ID is missing.',
      })
      return
    }

    setUserAccessExpireAt(newDate)
    setOpenDatePicker(false)

    if (!newDate) {
      toast.error('Please select a valid date')
      return
    }
    if (newDate < new Date()) {
      toast.error('Expiration date cannot be in the past')
      return
    }
    if (userAccessExpireAt && newDate.toISOString() === userAccessExpireAt.toISOString()) {
      return
    }

    handleSetExpiration(
      newDate.toISOString(),
      userAccessExpireInfo.current.userId,
      userAccessExpireInfo.current.dashboardId,
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-235" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center">Property Dashboard Access</DialogTitle>
            <DialogDescription className="sr-only text-center">
              View access information and permissions for this property
            </DialogDescription>
          </DialogHeader>

          <DatePickerPopover
            date={userAccessExpireAt}
            onSelect={onSelectDate}
            open={openDatePicker}
            onOpenChange={setOpenDatePicker}
          >
            <PopoverAnchor />
          </DatePickerPopover>

          {isLoadingData ? (
            <div className="grid min-h-32 place-items-center">
              <Spinner className="size-6" />
            </div>
          ) : Array.isArray(formattedAccessList) && formattedAccessList.length ? (
            <ul className="divide-y">
              {formattedAccessList?.map((item) => (
                <ListTile
                  key={item.accessId}
                  leading={<UserAvatar src={item?.avatar ?? undefined} name={item?.title} />}
                  title={item?.title}
                  subtitle={[
                    item?.subtitle,
                    ...(item.expiresAt ? ['|', formatDate(item.expiresAt)] : []),
                  ].join(' ')}
                  tailing={
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            handDatePickerOpen(item.expiresAt, item.userId, item.dashboardId)
                          }}
                        >
                          Set access expiration date
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => onRevokeAccessClick(item?.userId, item.dashboardId)}
                        >
                          Revoke access
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                />
              ))}
            </ul>
          ) : (
            <EmptyMessage>
              {isUserMode
                ? 'This user doesn’t have access to any properties yet.'
                : 'No users have access to this property yet.'}
            </EmptyMessage>
          )}

          <PaginationControls size="icon-sm" />
        </DialogContent>
      </Dialog>
    </>
  )
}
