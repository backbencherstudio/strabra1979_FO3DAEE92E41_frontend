'use client'

import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Property } from '../PropertyCard/PropertyCard'
import PropertyScoreListPreview from './PropertyScoreList'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'

interface PropertyDetailsProps {
  id: string
  property: Property
  accessExpiration?: string
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

export default function PropertyDetails({ property, accessExpiration }: PropertyDetailsProps) {
  const rowInfos = [
    { label: 'Type', value: property.type },
    { label: 'Address', value: property.address },
    { label: 'Next Inspection', value: property.nextInspection ?? '' },
  ]

  return (
    <SectionCard className="grid gap-5">
      <PropertyHeaderWrapper
        title={property.property}
        rightContent={
          accessExpiration ? (
            <InfoList items={[{ label: 'Access expiration', value: accessExpiration }]} />
          ) : null
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

        <SectionCard className="grid flex-1 gap-2 bg-white sm:grid-cols-2">
          <div className="row-span-2 min-h-35 rounded-md bg-gray-100"></div>
          <div className="min-h-35 rounded-md bg-gray-100"></div>
          <div className="min-h-35 rounded-md bg-gray-100"></div>
        </SectionCard>
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
      <SectionCard className="">
        <div className="flex items-center justify-between">
          <SectionTitle>Documents</SectionTitle>

          <Button variant="link" theme="text">
            View All <ChevronRight />
          </Button>
        </div>
        {/* TODO: table */}
      </SectionCard>
    </SectionCard>
  )
}
