'use client'

import { DatePickerWrapper } from '@/components/reusable/DatePicker/DatePicker'
import MarkInput from '@/components/reusable/MarkInput/MarkInput'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'

export default function InspectionReportForm() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [mark, setMark] = useState(1)

  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4.5 py-5">
      <h1 className="text-heading text-center text-2xl">LIBERTY SHIELD ROOF HEALTH INSPECTION</h1>
      <div className="mt-2 flex justify-center gap-1 text-base font-medium">
        <span className="text-gray-black-300">Inspection ID:</span>
        <span className="text-gray-black-400">INS2323</span>
      </div>
      <div className="mt-4 flex justify-center">
        <TabSwitcher selected={selectedTab} onSelect={(v) => setSelectedTab(v)} />
      </div>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="name">Property</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
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
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Address</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="" />
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
              <InputGroupInput placeholder="" />
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

          <Field>
            <FieldLabel htmlFor="name">Surface Condition (25 pts)</FieldLabel>
            <MarkInput value={mark} maxValue={25} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Seams & Flashings (20 pts)</FieldLabel>
            <MarkInput value={mark} maxValue={20} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Drainage & Ponding (15 pts)</FieldLabel>
            <MarkInput value={mark} maxValue={15} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Penetrations & Accessories (10 pts)</FieldLabel>
            <MarkInput value={mark} maxValue={10} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Repairs & Patch History (10 pts)</FieldLabel>
            <MarkInput value={mark} maxValue={10} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Age vs. Expected Life (10 pts)</FieldLabel>
            <MarkInput value={mark} maxValue={10} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Structural & Safety (10 pts)</FieldLabel>
            <MarkInput value={mark} maxValue={10} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field className="col-span-2">
            <FieldLabel htmlFor="name">NTE (Not-To-Exceed):</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Enter NTE" />
            </InputGroup>
          </Field>

          <Field className="col-span-2">
            <FieldLabel htmlFor="">Additional Notes/Comments</FieldLabel>
            <InputGroup>
              <InputGroupTextarea placeholder="Type Any Additional Notes/Comments" />
            </InputGroup>
          </Field>
        </div>
      </form>
    </div>
  )
}
