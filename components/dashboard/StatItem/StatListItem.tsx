import { ComponentType, PropsWithChildren } from "react";

export interface Stat {
  title: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
}

interface StatListItemPorps extends PropsWithChildren {
  stat: Stat;
  isLoading: boolean;
}

export default function StatListItem({ stat }: StatListItemPorps) {
  return (
    <div className="bg-disabled-0 border border-opacity-dark-05 rounded-2xl p-4.5">
      <div className="flex justify-between">
        <span className="text-base ">{stat.title}</span>
        <span>
          <stat.icon className="text-foreground size-6" />
        </span>
      </div>

      <h3 className="text-2xl font-medium">{stat.value}</h3>
    </div>
  );
}
