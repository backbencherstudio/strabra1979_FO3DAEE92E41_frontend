'use client'

import { DatePickerWrapper } from '@/components/reusable/DatePicker/DatePicker'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import InspectionCheckBoxes from './InspectionCheckBoxes'

export default function InspectionReportForm() {
  const [mark, setMark] = useState(1)

  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <form>
      <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
        <Field>
          <FieldLabel htmlFor="name">Property</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="Enter property name" />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="date">Date</FieldLabel>
          <DatePickerWrapper
            placeholder="Select date"
            value={date?.toLocaleDateString()}
            open={open}
            setOpen={setOpen}
          >
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </DatePickerWrapper>
        </Field>

        <Field>
          <FieldLabel htmlFor="property-type">Property Type</FieldLabel>
          <Select>
            <SelectTrigger id="property-type">
              <SelectValue placeholder="Select Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="mixed-use">Mixed Use</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="name">Address</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="Enter property address" />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="name">
            Inspection Title <span className="text-destructive">*</span>
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              required
              placeholder="Enter the name of the inspection (e.g. 2024 Annual Roof Inspection)"
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="name">Inspector</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="Enter inspector name" />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="roof-system-type">Roof System Type</FieldLabel>
          <Select>
            <SelectTrigger id="roof-system-type">
              <SelectValue placeholder="Select Roof System Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="modified">Modified</SelectItem>
                <SelectItem value="BUR">BUR</SelectItem>
                <SelectItem value="TOP">TPO</SelectItem>
                <SelectItem value="PVC">PVC</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="drainage-type">Drainage Type</FieldLabel>
          <Select>
            <SelectTrigger id="drainage-type">
              <SelectValue placeholder="Select Drainage Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="internal-drains">Internal Drains</SelectItem>
                <SelectItem value="scuppers">Scuppers</SelectItem>
                <SelectItem value="gutters">Gutters</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <InspectionCheckBoxes isEditable={false} />
      </FieldGroup>
    </form>
  )
}
