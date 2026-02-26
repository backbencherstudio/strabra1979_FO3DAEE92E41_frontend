'use client'

import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Folder } from '../Folder/Folder'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'
import { Property } from '../PropertyCard/PropertyCard'
import CustomTable from '../table/CustomTable'
import { DocumentsTableColumns, demoDocumentsData } from '@/components/columns/DocumentsTable'
import Pagination from '../Pagination/Pagination'

interface PropertyDetailsReportsProps {
  id: string
  property: Property
  accessExpiration?: string
  headerRightContent?: React.ReactNode
}

export default function PropertyDetailsReports({
  property,
  accessExpiration,
  headerRightContent = null,
}: PropertyDetailsReportsProps) {
  const rowInfos = [
    { label: 'Type', value: property.type },
    { label: 'Address', value: property.address },
    { label: 'Next Inspection', value: property.nextInspection ?? '' },
  ]

  return (
    <SectionCard className="grid grid-cols-1 gap-5">
      <PropertyHeaderWrapper
        title={property.property}
        rightContent={
          accessExpiration ? (
            <InfoList items={[{ label: 'Access expiration', value: accessExpiration }]} />
          ) : (
            headerRightContent
          )
        }
      >
        <InfoList
          items={[
            { label: 'Last updated', value: property.updated_at ?? '' },
            // { label: 'Inspection ID', value: property.id },
            // { value: property.property },
            // { label: 'Date', value: property.date },
          ]}
        />
      </PropertyHeaderWrapper>

      <InfoGrid items={rowInfos} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Folder
          meta={{
            label: '2023 Inspection',
            fileCount: '24',
            size: '12 GB',
          }}
        />
        <Folder
          meta={{
            label: '2023 Inspection',
            fileCount: '24',
            size: '12 GB',
          }}
        />
        <Folder
          meta={{
            label: '2023 Inspection',
            fileCount: '24',
            size: '12 GB',
          }}
        />
        <Folder
          meta={{
            label: '2023 Inspection',
            fileCount: '24',
            size: '12 GB',
          }}
        />
      </div>

      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListActions titleClassName="text-forground" title="Report Updates" />

        <div>
          <CustomTable
            columns={DocumentsTableColumns}
            data={demoDocumentsData}
            //   currentPage={currentPage}
            //   itemsPerPage={itemsPerPage}
            //   onPageChange={setCurrentPage}
            //   sortConfig={sortConfig}
            //   onSort={handleSort}
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
        <Pagination showHomeAndEnd={false} className="justify-start" size="icon-xs" />
      </SectionCard>
    </SectionCard>
  )
}
