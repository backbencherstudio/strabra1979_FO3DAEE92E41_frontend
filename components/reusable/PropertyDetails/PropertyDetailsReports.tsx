'use client'

import {
  useGetAllFolderWithDashboardIdQuery,
  useLazyGetSingleFolderInfoQuery,
} from '@/api/inspectionManagement/folderManagementApi'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { SharedPropertyCardListContextProvider } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { formatDate, naIfEmpty, withNA } from '@/lib/farmatters'
import { IFolderItem, IPropertyDashboardDetails, ISingleFolderInfo } from '@/types'
import { useState } from 'react'
import CreateFolderDialog from '../CreateFolderDialog/CreateFolderDialog'
import { Folder, FolderDropdownMenu } from '../Folder/Folder'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'
import PaginationControls from '../Pagination/Pagination'

interface PropertyDetailsReportsProps {
  dashboardId: string
  accessExpiration?: string
  data: IPropertyDashboardDetails
  headerRightContent?: React.ReactNode
}

export default function PropertyDetailsReports({
  dashboardId,
  data,
  accessExpiration,
  headerRightContent = null,
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

  return (
    <SectionCard className="grid grid-cols-1 gap-5">
      <PropertyHeaderWrapper
        title={withNA(property?.name)}
        rightContent={
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
          </Folder>
        ))}
      </div>

      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListContextProvider>
          <SharedPropertyCardListActions titleClassName="text-forground" title="Report Updates" />
        </SharedPropertyCardListContextProvider>

        {/* <div> */}
        {/*   <CustomTable */}
        {/*     columns={DocumentsTableColumns} */}
        {/*     data={demoDocumentsData} */}
        {/*     //   currentPage={currentPage} */}
        {/*     //   itemsPerPage={itemsPerPage} */}
        {/*     //   onPageChange={setCurrentPage} */}
        {/*     //   sortConfig={sortConfig} */}
        {/*     //   onSort={handleSort} */}
        {/*     minWidth={1000} */}
        {/*     headerStyles={{ */}
        {/*       backgroundColor: '#eceff3', */}
        {/*       textColor: '#4a4c56', */}
        {/*       fontSize: '14px', */}
        {/*       fontWeight: '400', */}
        {/*       padding: '12px 16px', */}
        {/*     }} */}
        {/*     cellBorderColor="#eceff3" */}
        {/*     hasWrapperBorder={false} */}
        {/*     roundedClass="rounded-lg" */}
        {/*   /> */}
        {/* </div> */}
        <PaginationControls showHomeAndEnd={false} className="justify-start" size="icon-xs" />
      </SectionCard>
    </SectionCard>
  )
}
