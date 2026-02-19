'use client'

import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import MarkInput from '@/components/reusable/MarkInput/MarkInput'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import { ChevronRight } from 'lucide-react'

export default function InspectionListItemDetailsPage() {
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

      <SectionCard className="grid grid-cols-3 bg-white">
        {rowInfos.map((info) => (
          <div key={info.label} className="flex flex-col gap-1">
            <span className="text-gray-black-300 text-sm">{info.label}</span>
            <span className="text-sm font-medium">{info.value}</span>
          </div>
        ))}
      </SectionCard>

      <div className="flex gap-4.5">
        <SectionCard className="bg-white">
          <SectionTitle className="text-center">Roof Health Snapshot</SectionTitle>
          <p className="text-center text-sm">Average Health Score</p>
          <CircularProgressWithMeta placeholder="Remaining Life: 5-7 Years" value={details.score} />
        </SectionCard>

        <SectionCard className="grid flex-1 grid-cols-2 gap-2 bg-white">
          <div className="row-span-2 rounded-md bg-gray-100"></div>
          <div className="rounded-md bg-gray-100"></div>
          <div className="rounded-md bg-gray-100"></div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4.5">
        <SectionCard className="space-y-2 bg-white">
          <SectionTitle className="text-center">Aerial Map</SectionTitle>
          <div className="aspect-video rounded-md bg-gray-100"></div>
        </SectionCard>
        <SectionCard className="space-y-2 bg-white">
          <SectionTitle className="text-center">3D Roof Tour</SectionTitle>
          <div className="aspect-video rounded-md bg-gray-100"></div>
        </SectionCard>
      </div>

      <SectionCard>
        <SectionTitle>Add Priority Repair Planning</SectionTitle>
        <PiorityRepairPlanList />
      </SectionCard>

      <SectionCard>
        <div className="flex items-center justify-between">
          <SectionTitle>Documents</SectionTitle>

          <Button variant="link" theme="text">
            View All <ChevronRight />
          </Button>
        </div>
        {/* TODO: table */}
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

      <div className="mt-8">
        <h2 className="text-center text-2xl font-medium">Roof Health Rating</h2>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {roofHealthRatings.map((item) => {
            if (item.type == 'input') {
              return (
                <Field key={item.label}>
                  <FieldLabel>{item.label}</FieldLabel>
                  <InputGroup contentEditable={false}>
                    <InputGroupInput readOnly placeholder="" value={item.value} />
                  </InputGroup>
                </Field>
              )
            }

            if (item.type == 'score') {
              return (
                <Field key={item.label}>
                  <FieldLabel>{item.label}</FieldLabel>
                  <MarkInput value={item.value} maxValue={item.maxValue} onChange={() => {}} />
                  <InputGroup>
                    <InputGroupTextarea
                      contentEditable={false}
                      readOnly
                      value={item.desc}
                      placeholder="No additional noto is provided"
                    />
                  </InputGroup>
                </Field>
              )
            }

            return null
          })}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
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

          <InspectionReportFinalScoreCard score={76} />
        </div>
      </div>
    </SectionCard>
  )
}

type HealthRatingItem =
  | { type: 'input'; label: string; value: string }
  | { type: 'score'; label: string; value: number; maxValue: number; desc?: string }

const roofHealthRatings: HealthRatingItem[] = [
  { type: 'input', label: 'Roof System Type', value: 'BUR' },
  { type: 'input', label: 'Drainage Type', value: 'Scuppers' },
  {
    type: 'score',
    label: 'Surface Condition (25 pts)',
    value: 12,
    maxValue: 25,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Seams & Flashings (20 pts)',
    value: 4,
    maxValue: 20,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Drainage & Ponding (15 pts)',
    value: 4,
    maxValue: 15,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Penetrations & Accessories (10 pts)',
    value: 4,
    maxValue: 10,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Repairs & Patch History (10 pts)',
    value: 4,
    maxValue: 10,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Age vs. Expected Life (10 pts)',
    value: 4,
    maxValue: 10,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
]
