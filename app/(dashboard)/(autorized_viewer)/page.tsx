'use client'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import Pagination from '@/components/reusable/Pagination/Pagination'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { properties } from './mock'

export default function AutorizedViewerLandingPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SectionCard>
        <SharedPropertyCardListActions title="Shared Property Dashboards" />

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {properties.map((p, index) => (
            <PropertyCard slug="/property/123" hasAccess={index == 1} key={p.title} {...p}>
              <PropertyCardInfoList
                items={[
                  { label: 'Type', value: p.type },
                  { label: 'Access expiration', value: p.date },
                ]}
              />
            </PropertyCard>
          ))}
        </div>
      </SectionCard>

      <Pagination />
    </div>
  )
}
