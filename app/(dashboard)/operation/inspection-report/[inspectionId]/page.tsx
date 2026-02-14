"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function InspectionReportPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="bg-normal-25 border-hover-50 border rounded-2xl px-4.5 py-5">
      <h1 className="text-center text-heading text-2xl">
        LIBERTY SHIELD ROOF HEALTH INSPECTION
      </h1>
      <div className="font-medium text-base flex gap-1 justify-center mt-2">
        <span className="text-gray-black-300">Inspection ID:</span>
        <span className="text-gray-black-400">INS2323</span>
      </div>
      <div className="flex justify-center mt-4">
        <TabSwitcher
          selected={selectedTab}
          onSelect={(v) => setSelectedTab(v)}
        />
      </div>
      <form>
        <div className="grid gap-4 grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Property</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Date</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Property Type</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Address</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Inspection Title *</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Inspector</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Roof System Type</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Drainage Type</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Surface Condition (25 pts)</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Seams & Flashings (20 pts)</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Drainage & Ponding (15 pts)</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">
              Penetrations & Accessories (10 pts)
            </FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">
              Repairs & Patch History (10 pts)
            </FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">
              Age vs. Expected Life (10 pts)
            </FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Structural & Safety (10 pts)</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
            </InputGroup>
          </Field>
        </div>
      </form>
    </div>
  );
}

function TabSwitcher({
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
