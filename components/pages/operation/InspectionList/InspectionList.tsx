import { Calendar } from '@/components/icons/Calender'
import { Button } from '@/components/ui/button'
import InspectionListItem from './InspectionListItem'
import { InspectionProgressStatus } from '@/components/dashboard/ProgressStatusBadge/ProgressStatusBadge'

export default function InspectionList() {
  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4 py-5">
      <section className="flex items-center justify-between">
        <h3 className="text-foreground text-xl font-medium">Today's Inspections</h3>

        <Button className="" variant="outline">
          <Calendar className="size-5" />
          <hr className="border-gray-black-50 h-4 border" />
          <span>February 4, 2026</span>
        </Button>
      </section>

      <section className="mt-4 space-y-3">
        {mockInspections.map((inspection) => (
          <InspectionListItem
            slug="123"
            status={inspection.status as InspectionProgressStatus}
            key={inspection.id}
            title={inspection.title}
            time={inspection.time}
            propertyName={inspection.propertyName}
            address={inspection.address}
          />
        ))}
      </section>
    </div>
  )
}

export const mockInspections = [
  {
    id: '1',
    title: 'Private Residence',
    time: '8:45 AM',
    propertyName: 'Riverside Apartments',
    address: '1234 Sunset Blvd, CA 90028',
    status: 'DUE',
  },
  {
    id: '2',
    title: 'Commercial Building',
    time: '10:30 AM',
    propertyName: 'Downtown Plaza',
    address: '5678 Main Street, CA 90012',
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Warehouse Inspection',
    time: '1:15 PM',
    propertyName: 'West Coast Storage',
    address: '890 Industrial Rd, CA 90210',
    status: 'ASSIGNED',
  },
  {
    id: '4',
    title: 'Summit Heights Apartments',
    time: '1:15 PM',
    propertyName: 'West Coast Storage',
    address: '890 Industrial Rd, CA 90210',
    status: 'COMPLETED',
  },
]
