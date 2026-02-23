import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { properties } from '../../(autorized_viewer)/mock'
import Pagination from '@/components/reusable/Pagination/Pagination'

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SectionCard className="">
        <SharedPropertyCardListActions title="My Properties" />

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {properties.map((p) => (
            <PropertyCard slug="/manager/property-list/123" hasAccess key={p.title} {...p}>
              <PropertyCardInfoList
                items={[
                  { label: 'Type', value: p.type },
                  { label: 'Next Inspection', value: p.date },
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
