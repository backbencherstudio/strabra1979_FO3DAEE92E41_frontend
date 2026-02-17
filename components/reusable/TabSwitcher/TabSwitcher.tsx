import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TabSwitcher({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (v: number) => void;
}) {
  return (
    <div className="bg-hover-50 inline-flex items-center p-1 rounded-full">
      <TabSwitch onClick={() => onSelect(0)} isActive={selected == 0}>
        Checklist
      </TabSwitch>
      <div className="w-25 h-1 relative bg-white">
        <hr
          className={cn(
            "absolute transition-transform left-0 h-full w-1/2 bg-navy-500 ",
            selected == 0 ? "translate-x-0" : "translate-x-full",
          )}
        />
      </div>
      <TabSwitch onClick={() => onSelect(1)} isActive={selected == 1}>
        Media Files
      </TabSwitch>
    </div>
  );
}
interface TabSwitchProps extends React.ComponentProps<typeof Button> {
  isActive?: boolean;
}

function TabSwitch({
  children,
  isActive,
  className,
  ...props
}: TabSwitchProps) {
  return (
    <Button
      className={cn(
        "rounded-full text-sm bg-white hover:bg-white text-foreground p-2 h-8",
        className,
        { "bg-navy-500 text-white hover:bg-navy-500": isActive },
      )}
      {...props}
    >
      <div
        className={cn(
          "relative transition-colors before:transition-colors size-4.5 bg-[#DFE1E7] rounded-full before:content-[''] before:absolute before:inset-0 before:m-auto before:size-3 before:bg-[#ECEFF3] before:rounded-full",
          { "bg-[#3C5562] before:bg-[#637781]": isActive },
        )}
      />
      <span className="pr-1">{children}</span>
    </Button>
  );
}
