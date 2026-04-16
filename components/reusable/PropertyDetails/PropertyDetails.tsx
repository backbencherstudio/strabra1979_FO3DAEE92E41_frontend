'use client'

import { useGetPropertyInspectionFormQuery } from '@/api/inspectionManagement/inspectionFormApi'
import { DocumentsTableColumns } from '@/components/columns/DocumentsTable'
import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { formatDate, naIfEmpty, withNA } from '@/lib/farmatters'
import {
  clearInspectionForm,
  setDefaultInspectionFormData,
} from '@/redux/features/inspectionForm/inspectionFormSlice'
import { useAppDispatch } from '@/redux/store'
import { IDashboardInspectionListItem, IPropertyDashboardDetails } from '@/types'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useEffectEvent } from 'react'
import { Slide } from 'yet-another-react-lightbox'
import FullPageSpinner from '../FullPageSpinner/FullPageSpinner'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'
import { MediaFiles, MediaFilesPreviewGrid } from '../MediaFiles/MediaFiles'
import CustomTable from '../table/CustomTable'
import PropertyCheckListPreview from './PropertyCheckListPreview'

interface PropertyDetailsProps {
  dashboardId: string
  data: IPropertyDashboardDetails
  headerRightContent?: React.ReactNode
}

export default function PropertyDetails({
  dashboardId,
  data,
  headerRightContent,
}: PropertyDetailsProps) {
  const { property } = data
  const rowInfos = [
    { label: 'Type', value: naIfEmpty(property?.propertyType) },
    { label: 'Address', value: naIfEmpty(property?.address) },
    { label: 'Next Inspection', value: naIfEmpty(formatDate(property?.nextInspectionDate)) },
  ]

  const inspectinData = data?.inspections[0] || {}
  const { data: { data: formConfig } = {}, isLoading: isFormConfigLoading } =
    useGetPropertyInspectionFormQuery(dashboardId, { skip: !dashboardId })

  const dispatch = useAppDispatch()
  const handleInspectinDataChangeFromServer = useEffectEvent(
    (data: IDashboardInspectionListItem) => {
      dispatch(setDefaultInspectionFormData(data))
    },
  )
  useEffect(() => {
    if (data?.inspections.length && formConfig) {
      handleInspectinDataChangeFromServer(data?.inspections[0])
    }
    return () => {
      dispatch(clearInspectionForm())
    }
  }, [data?.inspections, formConfig, dispatch])

  if (isFormConfigLoading) {
    return <FullPageSpinner />
  }

  return (
    <SectionCard className="grid grid-cols-1 gap-5">
      <PropertyHeaderWrapper title={withNA(property?.name)} rightContent={headerRightContent}>
        <InfoList
          items={[
            // { label: 'Inspection ID', value: data.id },
            { label: 'Property Manager', value: withNA(property?.propertyManager?.username) },
            { label: 'Date', value: withNA(formatDate(data.createdAt)) },
            { label: 'Status', value: withNA(property?.status) },
          ]}
        />
      </PropertyHeaderWrapper>
      {/* outline *:outline *:outline-red-500 */}
      <section className="grid grid-cols-8 gap-6">
        {data.templateSnapshot?.map((item) => {
          if (item.type === 'header_info') {
            return <InfoGrid className="col-span-full" key={item.type} items={rowInfos} />
          }

          if (item.type === 'health_snapshot') {
            return (
              <SectionCard key={item.type} className="col-span-2 bg-white">
                <SectionTitle className="text-center">{item.label}</SectionTitle>
                <p className="text-center text-sm">Average Health Score</p>
                <CircularProgressWithMeta
                  conf={item.config}
                  healthLabel={inspectinData?.healthLabel}
                  placeholder={`Remaining Life: ${inspectinData?.remainingLife}`}
                  value={inspectinData?.overallScore}
                />
              </SectionCard>
            )
          }

          if (item.type === 'media_grid') {
            if (!Array.isArray(inspectinData?.mediaFiles)) {
              return (
                <SectionCard
                  key={item.type}
                  className="col-span-6 grid place-items-center bg-white"
                >
                  <span className="text-muted-foreground text-sm">
                    No photos or videos available
                  </span>
                </SectionCard>
              )
            }

            const slides: Slide[] = inspectinData?.mediaFiles
              .filter((item) => item.mediaFieldKey === 'mediaFiles')
              ?.map((item) => {
                const isVideo = item.fileType === 'VIDEO'

                if (isVideo) {
                  return {
                    type: 'video',
                    poster: item?.url,
                    sources: [{ src: item.url, type: 'video/mp4' }],
                  }
                }

                return {
                  type: 'image',
                  src: item?.url,
                }
              })

            return (
              <div key={item.type} className="col-span-6">
                <MediaFiles className="bg-red-300" slides={slides}>
                  <MediaFilesPreviewGrid slides={slides} />
                </MediaFiles>
              </div>
            )
          }

          if (item.type === 'aerial_map') {
            return (
              <SectionCard key={item.type} className="col-span-4 space-y-2 bg-white">
                <SectionTitle className="text-center">{item.label}</SectionTitle>
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
            )
          }

          if (item.type === 'tour_3d') {
            return (
              <SectionCard key={item.type} className="col-span-4 space-y-2 bg-white">
                <SectionTitle className="text-center">{item.label}</SectionTitle>
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
            )
          }

          if (item.type === 'repair_planning') {
            return (
              <SectionCard className="col-span-full" key={item.type}>
                <SectionTitle>Priority Repair Planning</SectionTitle>
                <PiorityRepairPlanList items={inspectinData?.repairItems ?? []} />
              </SectionCard>
            )
          }

          if (item.type === 'roof_health_rating') {
            return (
              <SectionCard className="col-span-full" key={item.type}>
                <PropertyCheckListPreview
                  label={item.label}
                  formConfig={formConfig}
                  inspectionData={inspectinData}
                />
              </SectionCard>
            )
          }

          if (item.type === 'additional_info') {
            return (
              <SectionCard className="col-span-full" key={item.type}>
                <SectionTitle>{item.label}</SectionTitle>
                <div className="mt-4 space-y-3">
                  <InfoCard
                    title="NTE (Not-To-Exceed)"
                    description={withNA(inspectinData?.nteValue, (f) => `$${f.toLocaleString()}`)}
                  />
                  <InfoCard
                    title="Additional Comments"
                    description={naIfEmpty(inspectinData?.additionalComments)}
                  />
                </div>
              </SectionCard>
            )
          }

          if (item.type === 'documents') {
            if (!Array.isArray(inspectinData?.mediaFiles)) {
              return null
            }

            const filteredDocuments = inspectinData.mediaFiles.filter(
              (mf) => mf.mediaFieldKey === 'documents',
            )

            return (
              <SectionCard className="col-span-full space-y-4.5" key={item.type}>
                <div className="flex items-center justify-between">
                  <SectionTitle>Documents</SectionTitle>

                  <Button variant="link" theme="text">
                    View All <ChevronRight />
                  </Button>
                </div>
                <div>
                  <CustomTable
                    columns={DocumentsTableColumns}
                    data={filteredDocuments}
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
            )
          }

          //          return (
          //            <div key={item.type} className="bg-blue-300">
          //              {item.type}
          //          )
          //            </div>
        })}
      </section>
    </SectionCard>
  )
}
