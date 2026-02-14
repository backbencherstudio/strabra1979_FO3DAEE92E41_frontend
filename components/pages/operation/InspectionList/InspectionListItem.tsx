import ProgressStatusBadge, {
  InspectionProgressStatus,
} from "@/components/dashboard/ProgressStatusBadge/ProgressStatusBadge";
import { Clock } from "@/components/icons/Clock";
import { LocationPin } from "@/components/icons/LocationPin";
import { Property } from "@/components/icons/SideBarIcons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type InspectionListItemProps = {
  slug: string,
  title: string;
  time: string;
  propertyName: string;
  address: string;
  status: InspectionProgressStatus;
};

export default function InspectionListItem({
  slug,
  title,
  time,
  status,
  propertyName,
  address,
}: InspectionListItemProps) {
  return (
    <div className="border flex justify-between bg-white rounded-md p-3 border-gray-black-50">
      <section>
        <div className="flex gap-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <ProgressStatusBadge status={status} />
        </div>

        <div className="mt-3">
          <div className="flex text-secondary gap-1 items-center">
            <Clock className="size-4" />
            <span className="text-sm leading-none font-medium">{time}</span>
          </div>
        </div>

        <div className="mt-2 flex gap-4.5">
          <div className="flex text-foreground gap-1 items-center">
            <Property className="size-5" />
            <span className="text-sm leading-none">{propertyName}</span>
          </div>

          <div className="flex text-foreground gap-1 items-center">
            <LocationPin className="size-5" />
            <span className="text-sm leading-none">{address}</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center">
        <Button variant="outline" asChild>
          <Link href={`/operation/inspection-report/${slug}`}>Start Inspection</Link>
        </Button>
      </section>
    </div>
  );
}
