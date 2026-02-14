import { MyBadgeVariant } from "@/components/ui/badge";
import { createStatusSystem, StatusBadge } from "./StatusBadge";

export type InspectionProgressStatus =
  | "DUE"
  | "IN_PROGRESS"
  | "ASSIGNED"
  | "COMPLETED";

export const inspectionStatusSystem = createStatusSystem<
  InspectionProgressStatus,
  MyBadgeVariant
>({
  config: {
    DUE: {
      label: "Due",
      variant: "danger",
    },
    IN_PROGRESS: {
      label: "In Progress",
      variant: "warning",
    },
    ASSIGNED: {
      label: "Assigned",
      variant: "info",
    },
    COMPLETED: {
      label: "Completed",
      variant: "success",
    },
  },
  defaultTheme: {
    variant: "default",
  },
});

interface ProgressStatusBadgeProps {
  status: InspectionProgressStatus;
}

export default function ProgressStatusBadge({
  status,
}: ProgressStatusBadgeProps) {
  return <StatusBadge status={status} system={inspectionStatusSystem} />;
}
