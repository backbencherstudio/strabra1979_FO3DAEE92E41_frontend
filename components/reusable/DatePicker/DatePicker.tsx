import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface DatePickerProps extends React.PropsWithChildren {
  open: boolean;
  value?: string;
  setOpen: (v: boolean) => void;
  placeholder?: string;
}

export function DatePickerWrapper({
  open,
  value,
  setOpen,
  placeholder = "",
  children,
}: DatePickerProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="squircle justify-start font-normal h-14"
      >
        <Button variant="outline" id="date">
          {value ?? placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );
}
