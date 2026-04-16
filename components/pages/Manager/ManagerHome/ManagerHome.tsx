'use client'
import { useGetManagerOverviewQuery } from '@/api/dashboard/overviewApi'
import { ReportManagementColumns } from '@/components/columns/ReportsManagement'
import { StatListItemProps } from '@/components/dashboard/StatItem/StatListItem'
import StatsList from '@/components/dashboard/StatItem/StatsList'
import { CubeIcon } from '@/components/icons/CubeIcon'
import { HouseIcon } from '@/components/icons/HouseIcon'
import { InformationSquare } from '@/components/icons/InformationIcon'
import PropertyCard, {
  PropertyCardInfoList,
  PropertyCardSkeleton,
} from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { formatDate, naIfEmpty } from '@/lib/farmatters'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ManagerHome() {
  const { data, isLoading } = useGetManagerOverviewQuery()

  const item = data?.data?.stats

  const recentReports = data?.data?.recentReports || []

  const formattedReports = recentReports.map((report, index) => ({
    id: report.id,
    no: index + 1,
    // report: report?.reportName || 'Unknown Report',
    property: report.propertyName,
    address: report.address,
    updated_at: report.inspectedAt,
    status: report.healthLabel.toLowerCase(),
  }))

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
  ]

  return (
    <div className="grid grid-cols-1 gap-6">
      <StatsList stats={stats} isLoading={isLoading} />
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
            <Link href={routes.manager.propertyList}>
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : data?.data?.properties?.map((p) => (
                <PropertyCard
                  key={p.id}
                  id={p.id}
                  hasAccess
                  slug={
                    p?.dashboardId
                      ? routes.manager.propertyDetail.build({ dashboardId: p?.dashboardId })
                      : '#'
                  }
                  propertyName={p.name}
                  address={naIfEmpty(p.address)}
                  score={p?.roofHealth?.overallScore ?? 0}
                >
                  <PropertyCardInfoList
                    items={[
                      { label: 'Type', value: naIfEmpty(p.propertyType) },
                      {
                        label: 'Next Inspection',
                        value: naIfEmpty(p.nextInspectionDate, formatDate),
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
            <Link href={routes.manager.report}>
              View All <ChevronRight />
            </Link>
          </Button>
        </div>
        <div>
          <CustomTable
            columns={ReportManagementColumns}
            data={formattedReports}
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
