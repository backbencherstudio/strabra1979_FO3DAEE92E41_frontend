import { Calendar } from "@/components/icons/Calender";
import { Button } from "@/components/ui/button";
import InspectionListItem from "./InspectionListItem";

export default function InspectionList() {
  return (
    <div className="bg-normal-25 border border-hover-50 rounded-2xl py-5 px-4">
      <section className="flex justify-between items-center">
        <h3 className="text-foreground text-xl font-medium">
          Today's Inspections
        </h3>

        <Button className="" variant="outline">
          <Calendar className="size-5" />
          <hr className="border-gray-black-50 border h-4" />
          <span>February 4, 2026</span>
        </Button>
      </section>

      <section className="space-y-3 mt-4">
        {mockInspections.map((inspection) => (
          <InspectionListItem
            status={inspection.status}
            key={inspection.id}
            title={inspection.title}
            time={inspection.time}
            propertyName={inspection.propertyName}
            address={inspection.address}
          />
        ))}
      </section>
    </div>
  );
}

export const mockInspections = [
  {
    id: "1",
    title: "Private Residence",
    time: "8:45 AM",
    propertyName: "Riverside Apartments",
    address: "1234 Sunset Blvd, CA 90028",
    status: "DUE",
  },
  {
    id: "2",
    title: "Commercial Building",
    time: "10:30 AM",
    propertyName: "Downtown Plaza",
    address: "5678 Main Street, CA 90012",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "Warehouse Inspection",
    time: "1:15 PM",
    propertyName: "West Coast Storage",
    address: "890 Industrial Rd, CA 90210",
    status: "ASSIGNED",
  },
  {
    id: "4",
    title: "Summit Heights Apartments",
    time: "1:15 PM",
    propertyName: "West Coast Storage",
    address: "890 Industrial Rd, CA 90210",
    status: "COMPLETED",
  },
];
