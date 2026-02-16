"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatZeroPrefix } from "@/lib/farmatters";

interface MarkInputProps {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
}

export default function MarkInput({
  value,
  maxValue,
  onChange,
}: MarkInputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleNext = () => {
    if (value < maxValue) onChange(value + 1);
  };

  // Keyboard Support
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Auto scroll when value changes
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const activeElement = container.querySelector(
      `[data-number="${value}"]`,
    ) as HTMLElement | null;

    if (!activeElement) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();

    const isOutOfView =
      elementRect.left < containerRect.left ||
      elementRect.right > containerRect.right;

    if (isOutOfView) {
      const offset =
        activeElement.offsetLeft -
        container.offsetWidth / 2 +
        activeElement.offsetWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  }, [value]);

  return (
    <div className="flex gap-2">
      <section
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex bg flex-1 min-w-0 items-center gap-1 rounded-md h-14 bg-white px-2 shadow-[0_2px_10px_0_rgba(0,0,0,0.11)]",
          "outline-none border border-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        )}
      >
        {/* Prev */}
        <Button
          tabIndex={-1}
          type="button"
          size="icon-md"
          variant="ghost"
          onClick={handlePrev}
          disabled={value === 1}
          className="rounded-full shrink-0"
        >
          <ChevronLeft className="size-5" />
        </Button>

        {/* Scrollable Numbers */}
        <div className="no-scrollbar h-full flex items-center overflow-hidden relative flex-1">
          <div
            className={cn(
              "bg-linear-90 to-transparent transition pointer-events-none absolute left-0 top-0 h-full w-12",
              { "from-white": value !== 1 },
            )}
          />
          <div
            className={cn(
              "bg-linear-270 to-transparent transition pointer-events-none absolute right-0 top-0 h-full w-12",
              { "from-white": value !== maxValue },
            )}
          />

          <div
            ref={scrollRef}
            tabIndex={-1}
            className="flex overflow-x-auto no-scrollbar h-full items-center px-0 gap-2 flex-1"
          >
            {Array.from({ length: maxValue }).map((_, idx) => {
              const number = idx + 1;
              const isActive = number === value;

              return (
                <button
                  tabIndex={-1}
                  key={number}
                  data-number={number}
                  type="button"
                  onClick={() => onChange(number)}
                  className={cn(
                    "min-w-10.5 h-10.5 px-1.5 flex rounded-full items-center justify-center text-sm font-medium shrink-0",
                    isActive
                      ? "bg-primary relative text-white"
                      : "text-primary hover:bg-muted",
                  )}
                >
                  {formatZeroPrefix(number)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next */}
        <Button
          tabIndex={-1}
          type="button"
          size="icon-md"
          variant="ghost"
          onClick={handleNext}
          disabled={value === maxValue}
          className="rounded-full shrink-0"
        >
          <ChevronRight className="size-5" />
        </Button>
      </section>
      <section className="flex min-w-22 px-6 items-center justify-center rounded-md h-14 bg-white shadow-[0_2px_10px_0_rgba(0,0,0,0.11)]">
        <div className="flex items-baseline justify-center text-center text-base text-gray-black-300 ">
          <span>{formatZeroPrefix(value)}/</span>
          <span className="text-xs">{formatZeroPrefix(maxValue)}</span>
        </div>
      </section>
    </div>
  );
}
