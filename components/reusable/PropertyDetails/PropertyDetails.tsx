'use client'

import { DocumentsTableColumns, demoDocumentsData } from '@/components/columns/DocumentsTable'
import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { formatDate, naIfEmpty, withNA } from '@/lib/farmatters'
import { IPropertyDashboardDetails } from '@/types'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Slide } from 'yet-another-react-lightbox'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'
import { MediaFiles, MediaFilesGridPreview } from '../MediaFiles/MediaFiles'
import { Property } from '../PropertyCard/PropertyCard'
import CustomTable from '../table/CustomTable'
import PropertyScoreListPreview from './PropertyScoreList'

interface PropertyDetailsProps {
  dashboardId: string
  data: IPropertyDashboardDetails
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

export default function PropertyDetails({
  dashboardId,
  data,
  accessExpiration,
  headerRightContent = null,
}: PropertyDetailsProps) {
  const { property } = data
  const rowInfos = [
    { label: 'Type', value: naIfEmpty(property?.propertyType) },
    { label: 'Address', value: naIfEmpty(property?.address) },
    { label: 'Next Inspection', value: naIfEmpty(formatDate(property?.nextInspectionDate)) },
  ]

  const inspectin = data?.inspections[0] || {}

  return (
    <SectionCard className="grid grid-cols-1 gap-5">
      <PropertyHeaderWrapper
        title={withNA(property?.name)}
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
            // { label: 'Inspection ID', value: data.id },
            { label: 'Property Manager', value: withNA(property?.propertyManager?.username) },
            { label: 'Date', value: withNA(formatDate(data.createdAt)) },
            { label: 'Status', value: withNA(property?.status) },
          ]}
        />
      </PropertyHeaderWrapper>
      {/* outline *:outline *:outline-red-500 */}
      <section className="grid grid-cols-8 gap-6">
        {data.templateSnapshot.map((item) => {
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
                  healthLabel={inspectin?.healthLabel}
                  placeholder={`Remaining Life: ${inspectin?.remainingLife}`}
                  value={inspectin?.overallScore}
                />
              </SectionCard>
            )
          }

          if (item.type === 'media_grid') {
            const slides: Slide[] = inspectin?.mediaFiles.map((item) => {
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
                  <MediaFilesGridPreview slides={slides} />
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
                <PiorityRepairPlanList items={inspectin?.repairItems ?? []} />
              </SectionCard>
            )
          }

          if (item.type === 'roof_health_rating') {
            return (
              <SectionCard className="col-span-full" key={item.type}>
                {/* <SectionTitle>Priority Repair Planning</SectionTitle> */}
                <PropertyScoreListPreview />
              </SectionCard>
            )
          }

          if (item.type === 'additional_info') {
            return (
              <SectionCard className="col-span-full" key={item.type}>
                <SectionTitle>Additional Information</SectionTitle>
                <div className="mt-4 space-y-3">
                  <InfoCard
                    title="NTE (Not-To-Exceed)"
                    description={withNA(inspectin?.nteValue, (f) => `$${f.toLocaleString()}`)}
                  />
                  <InfoCard
                    title="Additional Comments"
                    description={naIfEmpty(inspectin?.additionalComments)}
                  />
                </div>
              </SectionCard>
            )
          }

          if (item.type === 'documents') {
            return (
              <SectionCard className="col-span-full space-y-4.5" key={item.type}>
                <div className="flex items-center justify-between">
                  <SectionTitle>Documents</SectionTitle>

                  <Button variant="link" theme="text">
                    View All <ChevronRight />
                  </Button>
                </div>
                <div>
                  {/* <CustomTable */}
                  {/*   columns={DocumentsTableColumns} */}
                  {/*   data={demoDocumentsData} */}
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
            )
          }

          return (
            <div key={item.type} className="bg-blue-300">
              {item.type}
            </div>
          )
        })}
      </section>
    </SectionCard>
  )
}
