import {
  InspectionListManagementColums,
  demoInspectionData,
} from '@/components/columns/InspectionListManagement'
import { Stat } from '@/components/dashboard/StatItem/StatListItem'
import StatsList from '@/components/dashboard/StatItem/StatsList'
import { CalenderSchedule } from '@/components/icons/Calender'
import { DocumentTick } from '@/components/icons/Doc'
import { SearchText } from '@/components/icons/SearchText'
import TodaysInspectionList from '@/components/pages/operation/InspectionList/InspectionList'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const stats: Stat[] = [
  {
    title: 'Today’s Inspection',
    value: 4,
    icon: SearchText,
  },
  {
    title: 'Today’s Inspection',
    value: 124,
    icon: CalenderSchedule,
  },
  {
    title: 'Today’s Inspection',
    value: 80,
    icon: DocumentTick,
  },
]

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <StatsList stats={stats} isLoading={false} />
      <TodaysInspectionList
        isLoading={false}
        title="Today's Inspections"
        actionButton={
          <Button variant="outline" asChild>
            <Link href={`/operation/inspection-report/${123}`}>Start Inspection</Link>
          </Button>
        }
      />

      <SectionCard className="space-y-4.5">
        <div className="flex items-center justify-between">
          <SectionTitle>Recent Inspections</SectionTitle>

          <Button asChild variant="link" theme="text">
            <Link href="/operation/inspection-list">
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        <div>
          {/* <CustomTable */}
          {/*   columns={InspectionListManagementColums} */}
          {/*   data={demoInspectionData} */}
          {/*   //   currentPage={currentPage} */}
          {/*   //   itemsPerPage={itemsPerPage} */}
          {/*   //   onPageChange={setCurrentPage} */}
          {/*   //   sortConfig={sortConfig} */}
          {/*   //   onSort={handleSort} */}
          {/*   minWidth={1000} */}
          {/*   headerStyles={{ */}
          {/*     backgroundColor: '#eceff3', */}
          {/*     textColor: '#4a4c56', */}
          {/*     fontSize: '14px', */}
          {/*     fontWeight: '400', */}
          {/*     padding: '12px 16px', */}
          {/*   }} */}
          {/*   cellBorderColor="#eceff3" */}
          {/*   hasWrapperBorder={false} */}
          {/*   roundedClass="rounded-lg" */}
          {/* /> */}
        </div>
      </SectionCard>
    </div>
  )
}
