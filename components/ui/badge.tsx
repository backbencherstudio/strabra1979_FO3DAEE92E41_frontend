import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex rounded-sm px-2 py-1 font-medium text-xs gap-1 items-center justify-center  border border-transparent w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        warning:
          "bg-[#FBF5DB] text-[#9A6036] border border-[#F6E7DC] [a&]:hover:bg-secondary/90",
        info: "bg-[#E5F3FE] text-[#3366CF] border border-[#D9E5FF] [a&]:hover:bg-secondary/90",
        success:
          "bg-[#EDFAF6] text-[#008C5D] border border-[#D8EBE5] [a&]:hover:bg-secondary/90",
        danger:
          "bg-[#FEF0F4] text-[#C7262B] border border-[#F4DFE0] [a&]:hover:bg-secondary/90",
          complete:
          "bg-[#FEF0F4] text-[#C7262B] border border-[#F4DFE0] [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export type MyBadgeVariant = VariantProps<typeof badgeVariants>["variant"];

function createStatusConfig<
  TStatus extends string,
  TVariant extends string | null | undefined,
  TIcon = undefined,
>(
  config: Record<
    TStatus,
    {
      label: string;
      variant: TVariant;
      icon?: TIcon;
    }
  >,
) {
  return {
    getVariant: (status: TStatus) => config[status].variant,
    getLabel: (status: TStatus) => config[status].label,
    getIcon: (status: TStatus) => config[status].icon,
    config,
  };
}

export { Badge, badgeVariants, createStatusConfig };
