"use client"
import { ReportManagementColumns, demoReportData } from '@/components/columns/ReportsManagement'
import { StatListItemProps } from '@/components/dashboard/StatItem/StatListItem'
import StatsList from '@/components/dashboard/StatItem/StatsList'
import { CubeIcon } from '@/components/icons/CubeIcon'
import { HouseIcon } from '@/components/icons/HouseIcon'
import { InformationSquare } from '@/components/icons/InformationIcon'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import { properties } from '../(autorized_viewer)/mock'
import { useGetManagerOverviewQuery } from '@/api/dashboard/overviewApi'
import { isArrayEmpty } from '@/lib/utils'
import { routes } from '@/constant'
import { formatDate, naIfEmpty, withNAf } from '@/lib/farmatters'

export default function page() {
const { data } = useGetManagerOverviewQuery();
console.log(data, "=d=d=d==d=d==d");


const item = data?.data?.stats;
console.log(item, "Stats from first report");

const recentReports = data?.data?.recentReports || [];  

const formattedReports = recentReports.map((report:any, index:any) => ({
  id: report.id,
  no: index + 1,
  report: report.reportName || "Unknown Report",
  property: report.propertyName,
  address: report.address,
  updated_at: report.inspectedAt,
  status: report.healthLabel.toLowerCase(), 
}));


const stats: StatListItemProps[] = [
  {
    title: 'Total Properties',
    value: item?.totalProperties ?? 0,  
    icon: <HouseIcon />,
    subtitle: '',
  },
  {
    title: 'Avg. Roof Health',
    value: `${item?.avgRoofHealthPercent ?? 0}%`,  
    icon: <CubeIcon />,
    subtitle: '',
  },
  {
    title: 'Urgent Repairs',
    value: item?.urgentRepairs ?? 0,  
    icon: <InformationSquare />,
    subtitle: '',
  },
];

  console.table()
  return (
    <div className="grid grid-cols-1 gap-6">
      <StatsList stats={stats} isLoading={false} />
      <SectionCard className="">
        <div className="flex items-center justify-between">
          <SectionTitle>My Properties</SectionTitle>

          {/* <div className="ml-auto">
            <InputGroup className="bg-transparen h-10.5">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div> */}

          <Button asChild variant="link" theme="text">
            <Link href="/manager/property-list">
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
       {isArrayEmpty(data?.data?.properties)
                 ? null
                 : data?.data?.properties?.map((p:any) => (
                     <PropertyCard
                       slug={routes.manager.propertyDetail.build({ dashboardId: p?.dashboardId })}
                       hasAccess
                       key={p.id}
                       id={p.id}
                       propertyName={p.name}
                       address={naIfEmpty(p.address)}
                       score={p?.roofHealth?.overallScore ?? 0}
                     >
                       <PropertyCardInfoList
                         items={[
                           { label: 'Type', value: withNAf(p.propertyType) },
                           {
                             label: 'Next Inspection',
                             value: withNAf(p?.nextInspectionDate, formatDate),
                           },
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
            <Link href="/manager/report">
              View All <ChevronRight />
            </Link>
          </Button>
        </div>
        {/* TODO: table */}
        <div>
          <CustomTable
            columns={ReportManagementColumns}
            data={formattedReports}
              // currentPage={currentPage}
              // itemsPerPage={itemsPerPage}
              // onPageChange={setCurrentPage}
              // sortConfig={sortConfig}
              // onSort={handleSort}
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
