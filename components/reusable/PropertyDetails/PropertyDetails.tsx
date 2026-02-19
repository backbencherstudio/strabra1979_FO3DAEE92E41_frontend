'use client'

import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import MarkInput from '@/components/reusable/MarkInput/MarkInput'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import PropertyScoreListPreview from './PropertyScoreList'

export default function PropertyDetails() {
  const details = {
    title: '2024 Annual Roof Inspection',
    property: 'Sunset Office Complex',
    id: 'INS2323',
    type: 'Commercial',
    inspector: {
      name: 'John Doe',
    },
    address: '1234 Sunset Blvd, Los Angeles, USA',
    nextInspectionDate: 'Jan 12, 2025',
    date: 'May 15, 2025',
    score: 76,
  }

  const rowInfos = [
    { label: 'Type', value: details.type },
    { label: 'Address', value: details.address },
    { label: 'Next Inspection', value: details.nextInspectionDate },
  ]

  return (
    <SectionCard className="grid gap-5">
      <div>
        <h1 className="text-lg font-semibold">{details.property}</h1>
        <ul className="mt-1 grid gap-1">
          <li className="text-sm">
            Inspection ID: <span className="font-medium">{details.id}</span>
          </li>
          <li className="text-sm">{details.title}</li>
          <li className="text-sm">
            Date: Inspection ID: <span className="font-medium">{details.date}</span>
          </li>
          <li className="text-sm">
            Inspector: <span className="font-medium">{details.inspector.name}</span>
          </li>
        </ul>
      </div>

      <SectionCard className="grid bg-white max-lg:divide-y lg:grid-cols-3">
        {rowInfos.map((info) => (
          <div key={info.label} className="flex flex-col gap-1 py-3">
            <span className="text-gray-black-300 text-sm">{info.label}</span>
            <span className="text-sm font-medium">{info.value}</span>
          </div>
        ))}
      </SectionCard>

      <div className="flex flex-col gap-4.5 lg:flex-row">
        <SectionCard className="bg-white">
          <SectionTitle className="text-center">Roof Health Snapshot</SectionTitle>
          <p className="text-center text-sm">Average Health Score</p>
          <CircularProgressWithMeta placeholder="Remaining Life: 5-7 Years" value={details.score} />
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
