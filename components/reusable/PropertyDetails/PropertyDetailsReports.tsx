'use client'

import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Folder } from '../Folder/Folder'
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

      <SectionCard className="">
        <SharedPropertyCardListActions titleClassName="text-forground" title="Report Updates" />
        {/* TODO: table */}
      </SectionCard>
    </SectionCard>
  )
}
