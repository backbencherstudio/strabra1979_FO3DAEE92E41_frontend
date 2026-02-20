'use client'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import Pagination from '@/components/reusable/Pagination/Pagination'
import PropertyCard, { Property } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'

const properties: Property[] = [
  {
    title: '2024 Annual Roof Inspection',
    property: 'Sunset Office Complex',
    id: 'INS2323',
    type: 'Commercial',
    inspector: { name: 'John Doe' },
    address: '1234 Sunset Blvd, Los Angeles, USA',
    date: 'May 15, 2025',
    accessExpiration: 'May 15, 2025',
    score: 76,
    previewImageUrl: '/images/property-card/property-01.png',
  },
  {
    title: '2024 Spring Roof Inspection',
    property: 'Riverside Apartments',
    id: 'INS2324',
    type: 'Residential',
    inspector: { name: 'Jane Smith' },
    address: '456 Riverside Dr, Chicago, USA',
    date: 'Jun 10, 2025',
    accessExpiration: 'Jun 10, 2025',
    score: 89,
    previewImageUrl: '/images/property-card/property-02.png',
  },
  {
    title: '2024 Winter Roof Inspection',
    property: 'Downtown Retail Hub',
    id: 'INS2325',
    type: 'Commercial',
    inspector: { name: 'Mike Johnson' },
    address: '789 Main St, New York, USA',
    date: 'May 15, 2025',
    accessExpiration: 'Jul 22, 2025',
    score: 62,
    previewImageUrl: '/images/property-card/property-03.png',
  },
  {
    title: '2024 Quarterly Roof Inspection',
    property: 'Greenwood Mall',
    id: 'INS2326',
    type: 'Industrial',
    inspector: { name: 'Sarah Lee' },
    address: '321 Oak Ave, Houston, USA',
    date: 'Aug 30, 2025',
    accessExpiration: 'Aug 30, 2025',
    score: 91,
    previewImageUrl: '/images/property-card/property-04.png',
  },
  {
    title: '2024 Emergency Roof Inspection',
    property: 'Harbor View Condos',
    id: 'INS2327',
    type: 'Residential',
    inspector: { name: 'Chris Brown' },
    address: '654 Harbor Blvd, Miami, USA',
    date: 'Sep 14, 2025',
    accessExpiration: 'Sep 14, 2025',
    score: 45,
    previewImageUrl: '/images/property-card/property-05.png',
  },
  {
    title: '2024 Routine Roof Inspection',
    property: 'Pinecrest Warehouse',
    id: 'INS2328',
    type: 'Industrial',
    inspector: { name: 'Emily Davis' },
    address: '987 Pine Rd, Seattle, USA',
    date: 'Oct 3, 2025',
    accessExpiration: 'Oct 3, 2025',
    score: 73,
    previewImageUrl: '/images/property-card/property-06.png',
  },
  {
    title: '2024 Mid-Year Roof Inspection',
    property: 'Lakeside Townhomes',
    id: 'INS2329',
    type: 'Residential',
    inspector: { name: 'David Wilson' },
    address: '147 Lake Shore Dr, Denver, USA',
    date: 'Nov 20, 2025',
    accessExpiration: 'Nov 20, 2025',
    score: 58,
    previewImageUrl: '/images/property-card/property-07.png',
  },
  {
    title: '2024 Annual Structural Inspection',
    property: 'Elmwood Business Park',
    id: 'INS2330',
    type: 'Commercial',
    inspector: { name: 'Olivia Martinez' },
    address: '258 Elm St, Phoenix, USA',
    date: 'Dec 8, 2025',
    accessExpiration: 'Dec 8, 2025',
    score: 84,
    previewImageUrl: '/images/property-card/property-08.png',
  },
  {
    title: '2024 Post-Storm Roof Inspection',
    property: 'Maplewood Residences',
    id: 'INS2331',
    type: 'Residential',
    inspector: { name: 'James Anderson' },
    address: '369 Maple Ave, Atlanta, USA',
    date: 'Jan 17, 2026',
    accessExpiration: 'Jan 17, 2026',
    score: 37,
    previewImageUrl: '/images/property-card/property-09.png',
  },
]

export default function AutorizedViewerLandingPage() {
  return (
    <div>
      <SectionCard className="">
        <SharedPropertyCardListActions title="Shared Property Dashboards" />

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {properties.map((p, index) => (
            <PropertyCard slug="/property/123" hasAccess={index == 1} key={p.title} {...p} />
          ))}
        </div>
      </SectionCard>

      <Pagination />
    </div>
  )
}
