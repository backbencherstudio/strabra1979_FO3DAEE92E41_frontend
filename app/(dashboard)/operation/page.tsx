import { Stat } from "@/components/dashboard/StatItem/StatListItem";
import StatsList from "@/components/dashboard/StatItem/StatsList";
import { CalenderSchedule } from "@/components/icons/Calender";
import { DocumentTick } from "@/components/icons/Doc";
import { SearchText } from "@/components/icons/SearchText";
import TodaysInspectionList from "@/components/pages/operation/InspectionList/InspectionList";

const stats: Stat[] = [
  {
    title: "Today’s Inspection",
    value: 4,
    icon: SearchText,
  },
  {
    title: "Today’s Inspection",
    value: 124,
    icon: CalenderSchedule,
  },
  {
    title: "Today’s Inspection",
    value: 80,
    icon: DocumentTick,
  },
];

export default function page() {
  return (
    <div className="space-y-8">
      <StatsList stats={stats} isLoading={false} />
      <TodaysInspectionList />
    </div>
  );
}
