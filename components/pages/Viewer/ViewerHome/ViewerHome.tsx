'use client'

import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import PropertyCard, {
  PropertyCardInfoList,
  PropertyCardSkeleton,
} from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'

import {
  useCreateDashboardAccessRequestMutation,
  useGetPropertiesQuery,
  useLazyGetCheckPropertyAccessQuery,
} from '@/api/dashboard/properties/propertiesApi'

import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'

import { PropertyCardAdminInfoList } from '@/components/reusable/PropertyCard/PropertyCardAdminInfoList'
import { routes } from '@/constant'
import { addDaysBy, formatDate, getErrorMessage, naIfEmpty } from '@/lib/farmatters'
import { INOAccessReason, IPropertyListItem } from '@/types'
import { NoEntryIcon } from '@/components/icons/NoEntryIcon'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import { AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { property } from 'zod'

export default function ViewerHome() {
  return (
    <SharedPropertyCardListContextProvider>
      <PaginationPageProvider>
        <ViewerHomeContent />
      </PaginationPageProvider>
    </SharedPropertyCardListContextProvider>
  )
}

function ViewerHomeContent() {
  const { sortOrder, dateFrom, debouncedSearch } = useSharedPropertyCardListContext()

  const { page } = usePaginationPage()

  const { data: { data: properties = [], meta } = {}, isLoading } = useGetPropertiesQuery({
    page,
    sortOrder,
    search: debouncedSearch,
    limit: 9,
    dateFrom: dateFrom?.formatted,
    dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
  })

  usePaginatedQuery({ meta_data: meta })

  return (
    <div className="grid grid-cols-1 gap-6">
      <SectionCard>
        <SharedPropertyCardListActions
          showSearch
          showDateFilter
          showSortOrder
          title="Shared Property Dashboards"
        />

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : properties.map((p) => <PropertyCardWrapper key={p.id} p={p} />)}
        </div>
      </SectionCard>

      <PaginationControls />
    </div>
  )
}

const ACCESS_MESSAGES: Record<INOAccessReason, { title: string; desc: string }> = {
  NO_ACCESS: {
    title: 'Access Required',
    desc: 'You don’t have permission to view this dashboard. Please request access.',
  },
  REVOKED: {
    title: 'Access Revoked',
    desc: 'Your access has been removed. Contact the owner if this seems incorrect.',
  },
  EXPIRED: {
    title: 'Access Expired',
    desc: 'Your access has expired. Please request access again to continue.',
  },
}

function PropertyCardWrapper({ p }: { p: IPropertyListItem }) {
  const [checkAccess, { isLoading: isGetCheckAccessLoading }] = useLazyGetCheckPropertyAccessQuery()
  const [createCequestAccess, { isLoading: isCreateAccessLoading }] =
    useCreateDashboardAccessRequestMutation()

  const router = useRouter()

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [msg, setMsg] = useState(ACCESS_MESSAGES.NO_ACCESS)

  async function handleCheckAccess() {
    if (!p?.dashboard?.id) {
      toast.error('Invalid dashboard ID')
    }

    const res = await checkAccess(p?.dashboard?.id).unwrap()

    if (res.hasAccess && p?.dashboard?.id) {
      return router.push(routes.viewer.propertyDetail.build({ dashboardId: p?.dashboard?.id }))
    }

    if (!res.hasAccess) {
      setMsg(ACCESS_MESSAGES[res.reason] || ACCESS_MESSAGES.NO_ACCESS)
      setOpenConfirmDialog(true)
    }
  }

  const handleRequestAccess = async (dashboardId: string) => {
    try {
      await createCequestAccess({ dashboardId: dashboardId! }).unwrap()
      toast.success('Request sent successfully')
    } catch (err) {
      toast.error(getErrorMessage(err, 'Already requested or have access'))
    }
  }

  return (
    <>
      <ConfirmDialog
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
        iconContainerClass="bg-transparent p-0"
        icon={<NoEntryIcon className="size-14" />}
        title={msg.title}
        desc={msg.desc}
      >
        <AlertDialogCancel>Decline</AlertDialogCancel>

        <AlertDialogAction
          onClick={() => handleRequestAccess(p?.dashboard?.id)}
          disabled={isGetCheckAccessLoading}
        >
          {isCreateAccessLoading ? <Spinner /> : null}
          {isCreateAccessLoading ? 'Requesting Access...' : 'Request Access'}
        </AlertDialogAction>
      </ConfirmDialog>

      <PropertyCard
        {...p}
        dashboardId={p?.dashboard?.id}
        hasAccess={false}
        propertyName={p.name}
        address={naIfEmpty(p.address)}
        score={p?.dashboard?.latestInspection?.overallScore}
        actionButton={
          <Button onClick={handleCheckAccess} size="lg" className="w-full" variant="outline">
            {isGetCheckAccessLoading ? <Spinner /> : null}
            {isGetCheckAccessLoading ? 'Checking access...' : 'View Details'}
          </Button>
        }
      >
        <PropertyCardInfoList
          items={[
            { label: 'Type', value: naIfEmpty(p.propertyType) },
            {
              label: 'Access expiration', // TODO: update from fahim bhai
              value: naIfEmpty(p?.nextInspectionDate, formatDate),
            },
          ]}
        />
      </PropertyCard>
    </>
  )
}
