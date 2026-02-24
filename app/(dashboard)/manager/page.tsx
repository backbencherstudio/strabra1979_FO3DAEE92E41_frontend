import { Stat } from '@/components/dashboard/StatItem/StatListItem'
import StatsList from '@/components/dashboard/StatItem/StatsList'
import { CubeIcon } from '@/components/icons/CubeIcon'
import { HouseIcon } from '@/components/icons/HouseIcon'
import { InformationSquare } from '@/components/icons/InformationIcon'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { properties } from '../(autorized_viewer)/mock'
import Pagination from '@/components/reusable/Pagination/Pagination'
import { ChevronRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'
import Link from 'next/link'
import { ReportManagementColumns, demoReportData } from '@/components/columns/ReportsManagement'
import CustomTable from '@/components/reusable/table/CustomTable'

const stats: Stat[] = [
  {
    title: 'Total Properties',
    value: 20,
    icon: HouseIcon,
  },
  {
    title: 'Avg. Roof Health',
    value: '76%',
    icon: CubeIcon,
  },
  {
    title: 'Urgent Repairs',
    value: 80,
    icon: InformationSquare,
  },
]

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <StatsList stats={stats} isLoading={false} />
      <SectionCard className="">
        <div className="flex items-center justify-between">
          <SectionTitle>My Properties</SectionTitle>

          <div className="ml-auto">
            <InputGroup className="bg-transparen h-10.5">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Button asChild variant="link" theme="text">
            <Link href="/manager/property-list">
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {properties.slice(0, 3).map((p) => (
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

      <SectionCard className="space-y-4.5">
        <div className="flex items-center justify-between">
          <SectionTitle>Recent Reports Updates</SectionTitle>

          <Button asChild variant="link" theme="text">
            <Link href="/manager/property-list">
              View All <ChevronRight />
            </Link>
          </Button>
        </div>
        {/* TODO: table */}
        <div>
          <CustomTable
            columns={ReportManagementColumns}
            data={demoReportData}
            //   currentPage={currentPage}
            //   itemsPerPage={itemsPerPage}
            //   onPageChange={setCurrentPage}
            //   sortConfig={sortConfig}
            //   onSort={handleSort}
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
    </div>
  )
}
