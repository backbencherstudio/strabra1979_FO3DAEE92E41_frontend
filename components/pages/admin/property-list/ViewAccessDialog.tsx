'use client'

import { useGetPropertyDashboardAccessListQuery } from '@/api/dashboard/properties/propertiesApi'
import { useGetPropertiesAccessListQuery } from '@/api/userManagement/userManagementApi'
import EmptyMessage from '@/components/reusable/EmptyMessage/EmptyMessage'
import { ListTile } from '@/components/reusable/ListTile/ListTile'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import UserAvatar from '@/components/reusable/UserAvatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { formatDate } from '@/lib/farmatters'
import { IAuthUserRole } from '@/types'
import { useMemo, useState } from 'react'
import { AccessListTileActions } from './AccessListTileActions'

type AccessListItem = {
  accessId: string
  dashboardId: string
  title: string
  subtitle: string
  userId: string
  avatar: string | null
  expiresAt: string | null
  grantedByRole: IAuthUserRole | null
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
          grantedByRole: item.grantedByRole,
          userId: item.user.id,
          accessId: item.accessId,
          title: item.user.username,
          subtitle: item.user.email,
          avatar: item.user.avatar,
          expiresAt: item.expiresAt ?? null,
        }))

      case 'user':
        return (userAccessData ?? []).map((item) => ({
          dashboardId: item.property.dashboardId,
          grantedByRole: null,
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

          {isLoadingData ? (
            <div className="grid min-h-32 place-items-center">
              <Spinner className="size-6" />
            </div>
          ) : Array.isArray(formattedAccessList) && formattedAccessList.length ? (
            <ul className="divide-y">
              {formattedAccessList?.map((item) => {
                return (
                  <ListTile
                    key={item.accessId}
                    leading={<UserAvatar src={item?.avatar ?? undefined} name={item?.title} />}
                    title={item?.title}
                    subTitle={
                      <div className="flex justify-between">
                        <span>{item?.subtitle}</span>
                        {item.expiresAt ? (
                          <span>
                            <span className="font-medium">Access expires: </span>
                            <span>{item.expiresAt ? formatDate(item.expiresAt) : null}</span>
                          </span>
                        ) : null}
                      </div>
                    }
                    tailing={
                      <AccessListTileActions
                        mode={mode}
                        accessId={item.accessId}
                        userId={item.userId}
                        itemName={item.title}
                        dashboardId={item.dashboardId}
                        expiresAt={item.expiresAt}
                      />
                    }
                  />
                )
              })}
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
