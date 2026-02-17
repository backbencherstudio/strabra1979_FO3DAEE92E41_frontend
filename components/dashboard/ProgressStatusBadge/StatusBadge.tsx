import { ElementType } from "react";

type StatusTheme<TVariant extends string | null | undefined> = {
  label: string;
  variant: TVariant;
  icon?: ElementType;
};

type ResolvedStatusTheme<TVariant extends string | null | undefined> = Omit<
  StatusTheme<TVariant>,
  "label"
> & {
  label?: string; // optional ONLY here
};

export function createStatusSystem<
  TStatus extends string,
  TVariant extends string | null | undefined,
>(options: {
  config: Record<TStatus, StatusTheme<TVariant>>;
  defaultTheme: ResolvedStatusTheme<TVariant>;
}) {
  return {
    get: (status?: TStatus): ResolvedStatusTheme<TVariant> => {
      if (!status) return options.defaultTheme;
      return options.config[status] ?? options.defaultTheme;
    },
    config: options.config,
  };
}

import { Badge, MyBadgeVariant } from "@/components/ui/badge";

interface StatusBadgeProps<
  TStatus extends string,
  TVariant extends string | null | undefined,
> {
  status?: TStatus;
  system: {
    get: (status?: TStatus) => ResolvedStatusTheme<TVariant>;
  };
  className?: string;
}

export function StatusBadge<
  TStatus extends string,
  TVariant extends MyBadgeVariant,
>({ status, system, className }: StatusBadgeProps<TStatus, TVariant>) {
  const { label = status, variant, icon: Icon } = system.get(status);

  return (
    <Badge variant={variant} className={className}>
      {Icon && <Icon className="size-3.5" />}
      {label}
    </Badge>
  );
}
