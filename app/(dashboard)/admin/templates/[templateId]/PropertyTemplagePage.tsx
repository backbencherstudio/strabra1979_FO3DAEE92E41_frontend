'use client'

import { DocumentsTableColumns, demoDocumentsData } from '@/components/columns/DocumentsTable'
import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { InfoGrid } from '@/components/reusable/InfoGrid/InfoGrid'
import { PropertyHeaderWrapper, InfoList } from '@/components/reusable/InfoList/InfoList'
import { Property } from '@/components/reusable/PropertyCard/PropertyCard'
import PropertyScoreListPreview from '@/components/reusable/PropertyDetails/PropertyScoreList'
import CustomTable from '@/components/reusable/table/CustomTable'
import {
  MediaFiles,
  MediaFilesGridPreview,
  PosterPreview,
} from '@/components/reusable/MediaFiles/MediaFiles'
import { cn } from '@/lib/utils'
import { Slide } from 'yet-another-react-lightbox'
import { PlayCircle } from '@/components/icons/PlayIcon'
import { FileImage, PlusSignSquare } from '@/components/icons/File'
import {
  CreateMoreInputModal,
  InputFieldType,
} from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/EditInputFeilds/EditInputFeilds'
import React from 'react'
import { CreateTemplateMoreInputModal } from './CreateTemplateMoreInputModal'

interface PropertyDetailsProps {
  id: string
  property: Property
  accessExpiration?: string
  headerRightContent?: React.ReactNode
}

export const propertyDetails: Property = {
  title: '2024 Annual Roof Inspection',
  property: 'Sunset Office Complex',
  propertyName: 'Sunset Office Complex',
  id: 'INS2323',
  type: 'Commercial',
  updated_at: '12 Jan, 2025',
  address: '1234 Sunset Blvd, Los Angeles, USA',
  nextInspection: 'Jan 12, 2025',
  date: 'May 15, 2025',
  score: 76,
}

export const demoSlides: Slide[] = [
  {
    type: 'video',
    poster: '/images/carousel-files/full-shot-roofers-working-together-with-helmets.png',
    sources: [{ src: '/video/hand-water.mp4', type: 'video/mp4' }],
  },
  { type: 'image', src: '/images/carousel-files/low-angle-modern-house-roof.png' },
  { type: 'image', src: '/images/carousel-files/man-on-roof.png' },
]

export default function PropertyTemplagePage({
  property,
  accessExpiration,
  headerRightContent = null,
}: PropertyDetailsProps) {
  const rowInfos = [
    { label: 'Type', value: property.type },
    { label: 'Address', value: property.address },
    { label: 'Next Inspection', value: property.nextInspection ?? '' },
  ]

  const [editFieldType, setEditFieldType] = React.useState<InputFieldType>()
  const [openCreateFieldsModal, setOpenCreateFieldsModal] = React.useState(false)
  const [openCreateMediaFieldsModal, setOpenCreateMediaFieldsModal] = React.useState(false)

  const handleCreateFieldOpen = (type: InputFieldType) => {
    setEditFieldType(type)
    if (type === 'input-media') {
      setOpenCreateMediaFieldsModal((v) => !v)
    } else {
      setOpenCreateFieldsModal((v) => !v)
    }
  }

  return (
    <div>
      {/* Add More Input fileds */}
      <CreateTemplateMoreInputModal
        editFieldType={editFieldType}
        open={openCreateMediaFieldsModal}
        onOpenChange={(v) => setOpenCreateMediaFieldsModal(v)}
      />

      <SectionCard className="grid grid-cols-1 gap-5">
        <PropertyHeaderWrapper
          title={property?.property}
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
              // { value: property?.title ?? '' },
              // { label: 'Date', value: property?.date },
              // { label: 'Inspector', value: property.inspector.name },
            ]}
          />
        </PropertyHeaderWrapper>

        <InfoGrid items={rowInfos} />
        <div className="flex flex-col gap-4.5 lg:flex-row">
          <SectionCard className="bg-white">
            <SectionTitle className="text-center">Roof Health Snapshot</SectionTitle>
            <p className="text-center text-sm">Average Health Score</p>
            {/* // TODO: fix this */}
            {/* <CircularProgressWithMeta */}
            {/*   placeholder="Remaining Life: 5-7 Years" */}
            {/*   value={property.score} */}
            {/* /> */}
          </SectionCard>

          <SectionCard className={cn('grid flex-1 gap-2 bg-white sm:grid-cols-2')}>
            {demoSlides.map((slide, index) => (
              <div
                key={index}
                className="relative aspect-video min-h-35 rounded-md bg-gray-100 first:row-span-2 sm:aspect-auto"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {slide.type === 'video' ? (
                    <PlayCircle className="size-12" />
                  ) : (
                    <FileImage className="text-white" />
                  )}
                </div>
              </div>
            ))}
          </SectionCard>
        </div>

        <div className="grid gap-4.5 lg:grid-cols-2">
          <SectionCard className="space-y-2 bg-white">
            <SectionTitle className="text-center">Aerial Map</SectionTitle>
            <div className="aspect-video overflow-hidden rounded-md bg-gray-100">
              {/* <Image */}
              {/*   className="h-full w-full object-cover" */}
              {/*   width={800} */}
              {/*   height={450} */}
              {/*   alt="" */}
              {/*   src={'/images/inspectin-list/aerial-map.png'} */}
              {/* /> */}
            </div>
          </SectionCard>
          <SectionCard className="space-y-2 bg-white">
            <SectionTitle className="text-center">3D Roof Tour</SectionTitle>
            <div className="aspect-video overflow-hidden rounded-md bg-gray-100">
              {/* <Image */}
              {/*   className="h-full w-full object-cover" */}
              {/*   width={800} */}
              {/*   height={450} */}
              {/*   alt="" */}
              {/*   src={'/images/inspectin-list/3d-roof-tour.png'} */}
              {/* /> */}
            </div>
          </SectionCard>
        </div>

        {/* Add More btn */}
        <Button
          onClick={() => handleCreateFieldOpen('input-media')}
          type="button"
          variant="muted"
          className="text-gray-black-300 h-23 flex-col"
        >
          <PlusSignSquare className="size-6" />
          <span className="text-sm whitespace-nowrap">Add More Media fields</span>
        </Button>

        <SectionCard>
          <SectionTitle>Priority Repair Planning</SectionTitle>
          {/* // TODO: fix this */}
          {/* <PiorityRepairPlanList /> */}
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
              data={demoDocumentsData.slice(0, 1)}
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

        {/* <SectionCard> */}
        {/*   <PropertyScoreListPreview /> */}
        {/* </SectionCard> */}

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
      </SectionCard>
    </div>
  )
}
