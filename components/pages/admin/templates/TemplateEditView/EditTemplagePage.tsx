'use client'

import { useGetASingleDashboardTemplateQuery } from '@/api/template/templateManagementApi'
import { FileImage, PlusSignSquare } from '@/components/icons/File'
import { PlayCircle } from '@/components/icons/PlayIcon'
import { InputFieldType } from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/modals'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import { InfoGrid } from '@/components/reusable/InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '@/components/reusable/InfoList/InfoList'
import { Property } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CurrentSelectedBox,
  selectCurrentBox,
  selectTemplateSections,
  setCurrentBox,
} from '@/redux/features/template/templateSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { ChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { Slide } from 'yet-another-react-lightbox'
import { EditBox } from './EditBox'

interface PropertyDetailsProps {
  property: Property
  accessExpiration?: string
  headerRightContent?: React.ReactNode
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

export default function EditTemplagePage({
  property,
  accessExpiration,
  headerRightContent = null,
}: PropertyDetailsProps) {
  const params = useParams<{ templateId: string }>()
  const { data: { data: templateData } = {} } = useGetASingleDashboardTemplateQuery({
    id: params.templateId,
  })

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

  const templateSections = useAppSelector(selectTemplateSections).toSorted(
    (a, b) => a.order - b.order,
  )
  const currentBox = useAppSelector(selectCurrentBox)
  const dispatch = useAppDispatch()

  function handleSelectEditBox(value: CurrentSelectedBox) {
    dispatch(setCurrentBox(value?.data.type === currentBox?.data.type ? null : value))
  }

  return (
    <div>
      {/* Add More Input fileds */}
      {/* <CreateTemplateMoreInputModal */}
      {/*   criteriaId='' */}
      {/*   editFieldType={editFieldType} */}
      {/*   open={openCreateMediaFieldsModal} */}
      {/*   onOpenChange={(v) => setOpenCreateMediaFieldsModal(v)} */}
      {/* /> */}

      <SectionCard className="grid grid-cols-12 gap-5">
        <div className="col-span-full">
          <PropertyHeaderWrapper
            title={property?.property}
            //         rightContent={
            //           accessExpiration ? (
            //             <InfoList items={[{ label: 'Access expiration', value: accessExpiration }]} />
            //           ) : (
            //             headerRightContent
            //           )
            //         }
          >
            {/* <InfoList */}
            {/*   items={[ */}
            {/*     { label: 'Inspection ID', value: property.id }, */}
            {/*     { value: property?.title ?? '' }, */}
            {/*     // { label: 'Date', value: property?.date }, */}
            {/*     // { label: 'Inspector', value: property.inspector.name }, */}
            {/*   ]} */}
            {/* /> */}
          </PropertyHeaderWrapper>
        </div>

        {templateSections.map((data, sectionIndex) => {
          const checked = data.id === currentBox?.data.id

          if (data.type === 'header_info') {
            return (
              <EditBox
                key={data.id}
                data={data}
                boxSize={data.style.width}
                index={sectionIndex}
                checked={checked}
                onSelect={() => handleSelectEditBox({ data })}
              >
                <InfoGrid items={rowInfos} />
              </EditBox>
            )
          }

          if (data.type === 'health_snapshot') {
            return (
              <EditBox
                key={data.id}
                data={data}
                boxSize={data.style.width}
                index={sectionIndex}
                checked={checked}
                onSelect={() => handleSelectEditBox({ data })}
              >
                <SectionCard className="flex h-full flex-col justify-center bg-white">
                  <SectionTitle className="text-center">Roof Health Snapshot</SectionTitle>
                  <p className="text-center text-sm">Average Health Score</p>
                  <CircularProgressWithMeta
                    conf={{}}
                    containerClassName="pb-0 pt-1"
                    labelClassName="text-xs text-gray-black-300 font-medium"
                    strokeWidth={4}
                    placeholder={`Remaining Life: 0-0 Years`}
                    value={100}
                  />
                </SectionCard>
              </EditBox>
            )
          }

          if (data.type === 'media_grid') {
            return (
              <EditBox
                key={data.id}
                data={data}
                boxSize={data.style.width}
                index={sectionIndex}
                checked={checked}
                onSelect={() => handleSelectEditBox({ data })}
              >
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
              </EditBox>
            )
          }

          if (data.type === 'aerial_map') {
            return (
              <EditBox
                key={data.id}
                data={data}
                boxSize={data.style.width}
                index={sectionIndex}
                checked={checked}
                onSelect={() => handleSelectEditBox({ data })}
              >
                <SectionCard className="space-y-2 bg-white">
                  <SectionTitle className="text-center">Aerial Map</SectionTitle>
                  <div className="aspect-video overflow-hidden rounded-md bg-gray-100"></div>
                </SectionCard>
              </EditBox>
            )
          }

          if (data.type === 'tour_3d') {
            return (
              <EditBox
                key={data.id}
                data={data}
                boxSize={data.style.width}
                index={sectionIndex}
                checked={checked}
                onSelect={() => handleSelectEditBox({ data })}
              >
                <SectionCard className="space-y-2 bg-white">
                  <SectionTitle className="text-center">3D Roof Tour</SectionTitle>
                  <div className="aspect-video overflow-hidden rounded-md bg-gray-100"></div>
                </SectionCard>
              </EditBox>
            )
          }

          return `${data.type} - `
        })}

        {/* Add More btn */}
        <Button
          onClick={() => handleCreateFieldOpen('input-media')}
          type="button"
          variant="muted"
          className="text-gray-black-300 col-span-full h-23 flex-col"
        >
          <PlusSignSquare className="size-6" />
          <span className="text-sm whitespace-nowrap">Add More Media fields</span>
        </Button>

        <SectionCard className="col-span-full">
          <SectionTitle>Priority Repair Planning</SectionTitle>
          {/* // TODO: fix this */}
          {/* <PiorityRepairPlanList /> */}
        </SectionCard>

        <SectionCard className="col-span-full space-y-4.5">
          <div className="flex items-center justify-between">
            <SectionTitle>Documents</SectionTitle>

            <Button variant="link" theme="text">
              View All <ChevronRight />
            </Button>
          </div>
          <div>
            {/* <CustomTable */}
            {/*   columns={DocumentsTableColumns} */}
            {/*   data={demoDocumentsData.slice(0, 1)} */}
            {/*   //   currentPage={currentPage} */}
            {/*   //   itemsPerPage={itemsPerPage} */}
            {/*   //   onPageChange={setCurrentPage} */}
            {/*   //   sortConfig={sortConfig} */}
            {/*   //   onSort={handleSort} */}
            {/*   minWidth={1000} */}
            {/*   headerStyles={{ */}
            {/*     backgroundColor: '#eceff3', */}
            {/*     textColor: '#4a4c56', */}
            {/*     fontSize: '14px', */}
            {/*     fontWeight: '400', */}
            {/*     padding: '12px 16px', */}
            {/*   }} */}
            {/*   cellBorderColor="#eceff3" */}
            {/*   hasWrapperBorder={false} */}
            {/*   roundedClass="rounded-lg" */}
            {/* /> */}
          </div>
        </SectionCard>

        {/* <SectionCard> */}
        {/*   <PropertyScoreListPreview /> */}
        {/* </SectionCard> */}

        <SectionCard className="col-span-full">
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
