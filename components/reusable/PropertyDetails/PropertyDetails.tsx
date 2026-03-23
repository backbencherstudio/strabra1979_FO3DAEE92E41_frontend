'use client'

import { DocumentsTableColumns, demoDocumentsData } from '@/components/columns/DocumentsTable'
import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'
import { MediaFiles, MediaFilesGridPreview, demoSlides } from '../MediaFiles/MediaFiles'
import { Property } from '../PropertyCard/PropertyCard'
import CustomTable from '../table/CustomTable'
import PropertyScoreListPreview from './PropertyScoreList'

interface PropertyDetailsProps {
  dashboardId: string
  property: Property
  accessExpiration?: string
  headerRightContent?: React.ReactNode
}

export const propertyDetails: Property = {
  title: '2024 Annual Roof Inspection',
  property: 'Sunset Office Complex',
  id: 'INS2323',
  type: 'Commercial',
  inspector: {
    name: 'John Doe',
  },
  updated_at: '12 Jan, 2025',
  address: '1234 Sunset Blvd, Los Angeles, USA',
  nextInspection: 'Jan 12, 2025',
  date: 'May 15, 2025',
  score: 76,
}

export default function PropertyDetails({
  dashboardId,
  property,
  accessExpiration,
  headerRightContent = null,
}: PropertyDetailsProps) {
  const rowInfos = [
    { label: 'Type', value: property.type },
    { label: 'Address', value: property.address },
    { label: 'Next Inspection', value: property.nextInspection ?? '' },
  ]

  console.log('', { dashboardId })

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
            { label: 'Inspection ID', value: property.id },
            { value: property.title },
            { label: 'Date', value: property.date },
            { label: 'Inspector', value: property.inspector.name },
          ]}
        />
      </PropertyHeaderWrapper>

      <InfoGrid items={rowInfos} />
      <div className="flex flex-col gap-4.5 lg:flex-row">
        <SectionCard className="bg-white">
          <SectionTitle className="text-center">Roof Health Snapshot</SectionTitle>
          <p className="text-center text-sm">Average Health Score</p>
          <CircularProgressWithMeta
            placeholder="Remaining Life: 5-7 Years"
            value={property.score}
          />
        </SectionCard>

        <MediaFiles slides={demoSlides}>
          <MediaFilesGridPreview slides={demoSlides} />
        </MediaFiles>
      </div>
      <div className="grid gap-4.5 lg:grid-cols-2">
        <SectionCard className="space-y-2 bg-white">
          <SectionTitle className="text-center">Aerial Map</SectionTitle>
          <div className="aspect-video overflow-hidden rounded-md bg-gray-100">
            <Image
              className="h-full w-full object-cover"
              width={800}
              height={450}
              alt=""
              src={'/images/inspectin-list/aerial-map.png'}
            />
          </div>
        </SectionCard>
        <SectionCard className="space-y-2 bg-white">
          <SectionTitle className="text-center">3D Roof Tour</SectionTitle>
          <div className="aspect-video overflow-hidden rounded-md bg-gray-100">
            <Image
              className="h-full w-full object-cover"
              width={800}
              height={450}
              alt=""
              src={'/images/inspectin-list/3d-roof-tour.png'}
            />
          </div>
        </SectionCard>
      </div>
      <SectionCard>
        <SectionTitle>Priority Repair Planning</SectionTitle>
        <PiorityRepairPlanList />
      </SectionCard>
      <SectionCard>
        <PropertyScoreListPreview />
      </SectionCard>
      <SectionCard>
        <SectionTitle>Additional Information</SectionTitle>
        <div className="mt-4 space-y-3">
          <InfoCard title="NTE (Not-To-Exceed)" description="$7,500" />
          <InfoCard
            title="Additional Comments"
            description="The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. No active leaks were observed at the time of inspection. However, moisture stains / vulnerable joints were noted, indicating potential leak risks if left unaddressed."
          />
        </div>
      </SectionCard>
      <SectionCard className="space-y-4.5">
        <div className="flex items-center justify-between">
          <SectionTitle>Documents</SectionTitle>

          <Button variant="link" theme="text">
            View All <ChevronRight />
          </Button>
        </div>
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
      </SectionCard>
    </SectionCard>
  )
}
