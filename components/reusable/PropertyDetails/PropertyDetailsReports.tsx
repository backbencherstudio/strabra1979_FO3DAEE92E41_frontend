'use client'

import {
  useGetAllFolderWithDashboardIdQuery,
  useGetinspectionPropertyQuery,
  useLazyGetSingleFolderInfoQuery,
} from '@/api/inspectionManagement/folderManagementApi'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { SharedPropertyCardListContextProvider } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { formatDate, naIfEmpty, withNA } from '@/lib/farmatters'
import {
  IAuthUserRole,
  IFolderItem,
  IPropertyDashboardDetails,
  ISingleFolderInfo,
  RoleUtils,
  TableRow,
} from '@/types'
import { useState } from 'react'
import CreateFolderDialog from '../CreateFolderDialog/CreateFolderDialog'
import { Folder, FolderDropdownMenu } from '../Folder/Folder'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'
import PaginationControls from '../Pagination/Pagination'
import CustomTable from '../table/CustomTable'
import { ReportsTableColumns } from '@/components/columns/ReportsTable'
import { usePaginatedQuery, usePaginationPage } from '../Pagination/PaginationPageProvider'

interface PropertyDetailsReportsProps {
  dashboardId: string
  data: IPropertyDashboardDetails
  headerRightContent?: React.ReactNode
  role: IAuthUserRole | null
}

export default function PropertyDetailsReports({
  dashboardId,
  data,
  headerRightContent = null,
  role,
}: PropertyDetailsReportsProps) {
  const { data: { data: folders } = {} } = useGetAllFolderWithDashboardIdQuery(
    { dashboardId: dashboardId },
    { skip: !dashboardId },
  )

  const { property } = data

  const rowInfos = [
    { label: 'Type', value: naIfEmpty(property?.propertyType) },
    { label: 'Address', value: naIfEmpty(property?.address) },
    { label: 'Next Inspection', value: naIfEmpty(formatDate(property?.nextInspectionDate)) },
  ]

  const [
    getFolderInfo,
    { isFetching: isFetchingFolderData, data: { data: renameDefaultDataInfo } = {} },
  ] = useLazyGetSingleFolderInfoQuery()
  const [opneFoderData, setOpneFoderData] = useState<Record<string, ISingleFolderInfo>>({})
  const handleOpenFolderClick = async (folderId: string, dashboardId: string) => {
    try {
      const res = await getFolderInfo({ folderId, dashboardId }).unwrap()
      setOpneFoderData((v) => {
        return { ...v, [folderId]: res.data }
      })
    } catch (err) {
      console.error(err)
    }
  }

  const [selectedFolderToRename, setSelectedFolderToRename] = useState<undefined | IFolderItem>()
  const [createFolderDialogMode, setCreateFolderDialogMode] = useState<'rename' | 'create'>(
    'create',
  )
  const [openFolderCreateDialog, setOpenFolderCreateDialog] = useState(false)

  const isAdmin = RoleUtils.isAdmin(role)

  const { data: inspectionData, isLoading: isLoadingReportTable } = useGetinspectionPropertyQuery({ dashboardId })
  const inspections = inspectionData?.data || []

  const tableData: TableRow[] = inspections.map((item) => ({
    name: item.propertyName,
    status: item.status,
    lastUpdate: item.date,
    size: 0,
    url: '',
  }))

  return (
    <SectionCard className="grid grid-cols-1 gap-5">
      <PropertyHeaderWrapper
        title={withNA(property?.name)}
        rightContent={
          headerRightContent ? (
            headerRightContent
          ) : isAdmin ? (
            <Button
              size="xl"
              variant="outline"
              onClick={() => {
                setCreateFolderDialogMode('create')
                setOpenFolderCreateDialog(true)
              }}
            >
              Create New Folder
            </Button>
          ) : null
        }
      >
        <InfoList
          items={[
            { label: 'Last updated', value: withNA(formatDate(data.updatedAt)) },
            { label: 'Status', value: withNA(property?.status) },
          ]}
        />
      </PropertyHeaderWrapper>

      <section className="grid grid-cols-8 gap-6">
        {data.templateSnapshot?.map((item) => {
          if (item.type === 'header_info') {
            return <InfoGrid className="col-span-full" key={item.type} items={rowInfos} />
          }
        })}
      </section>

      <CreateFolderDialog
        mode={createFolderDialogMode}
        defaultFoderInfo={renameDefaultDataInfo}
        dashboardId={dashboardId}
        open={openFolderCreateDialog}
        onOpenChange={setOpenFolderCreateDialog}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {folders?.map((f) => (
          <Folder
            onOpenClick={() => handleOpenFolderClick(f.id, f.dashboardId)}
            isLoading={isFetchingFolderData}
            childrenFolders={opneFoderData[f.id] ? opneFoderData[f.id].inspections : undefined}
            key={f.id}
            meta={{
              label: f.name,
              info: [`${f.inspectionCount} Files`, f.totalSizeLabel],
            }}
          >
            {isAdmin ? (
              <FolderDropdownMenu
                onEdit={async () => {
                  await getFolderInfo({ folderId: f.id, dashboardId: f.dashboardId }).unwrap()

                  setCreateFolderDialogMode('rename')
                  setSelectedFolderToRename(f)
                  setOpenFolderCreateDialog(true)

                  console.log('onEdit')
                }}
                dashboardId={f.dashboardId}
                folderId={f.id}
              />
            ) : null}
          </Folder>
        ))}
      </div>

      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListContextProvider>
          <SharedPropertyCardListActions titleClassName="text-forground" title="Report Updates" />
        </SharedPropertyCardListContextProvider>

        <div>
          <CustomTable
            isLoading={isLoadingReportTable}
            columns={ReportsTableColumns}
            data={tableData}
            minWidth={1000}
            headerStyles={{
              backgroundColor: '#eceff3',
              textColor: '#4a4c56',
              fontSize: '14px',
              fontWeight: '400',
              padding: '12px 16px',
            }}
            cellBorderColor="#eceff3"
            hasWrapperBorder={false}
            roundedClass="rounded-lg"
          />
        </div>
        <PaginationControls showHomeAndEnd={false} className="justify-start" size="icon-xs" />
      </SectionCard>
    </SectionCard>
  )
}
