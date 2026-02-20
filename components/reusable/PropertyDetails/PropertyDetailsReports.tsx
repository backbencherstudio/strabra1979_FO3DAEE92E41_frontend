'use client'

import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { InfoGrid } from '../InfoGrid/InfoGrid'
import { InfoList, PropertyHeaderWrapper } from '../InfoList/InfoList'
import { Property } from '../PropertyCard/PropertyCard'

interface PropertyDetailsReportsProps {
  id: string
  property: Property
  accessExpiration?: string
}

export default function PropertyDetailsReports({
  property,
  accessExpiration,
}: PropertyDetailsReportsProps) {
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
        <InfoList items={[{ label: 'Last updated', value: property.updated_at ?? '' }]} />
      </PropertyHeaderWrapper>

      <InfoGrid items={rowInfos} />

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
