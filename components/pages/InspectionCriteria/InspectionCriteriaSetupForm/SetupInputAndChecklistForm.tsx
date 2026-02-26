'use client'

import { PlusSignSquare } from '@/components/icons/File'
import { DatePickerWrapper } from '@/components/reusable/DatePicker/DatePicker'
import MarkInput from '@/components/reusable/MarkInput/MarkInput'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Edit as Edit2 } from '@/components/icons/Edit'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import {
  CreateMoreInputModal,
  CreateMoreMarkInputModal,
  EditSingleInputModal,
  InputFieldType,
} from './EditInputFeilds/EditInputFeilds'

interface InputAndChecklistSetupFormProps {
  editMode: boolean
}

export default function SetupInputAndChecklistForm({ editMode }: InputAndChecklistSetupFormProps) {
  const [mark, setMark] = useState(1)

  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  const [openEditFieldsModal, setOpenEditFieldsModal] = React.useState(false)
  const [editFieldType, setEditFieldType] = React.useState<InputFieldType>()
  const handleEditFieldClick = (type: InputFieldType) => {
    setEditFieldType(type)
    setOpenEditFieldsModal((v) => !v)
  }

  const [openCreateMarkInputFieldsModal, setOpenCreateMarkInputFieldsModal] = React.useState(false)
  const [openCreateFieldsModal, setOpenCreateFieldsModal] = React.useState(false)
  const handleCreateFieldOpen = (type: InputFieldType) => {
    setEditFieldType(type)
    if (type === 'input-mark') {
      setOpenCreateMarkInputFieldsModal((v) => !v)
    } else {
      setOpenCreateFieldsModal((v) => !v)
    }
  }

  return (
    <div>
      {/* Add More Input fileds */}
      <CreateMoreInputModal
        editFieldType={editFieldType}
        open={openCreateFieldsModal}
        onOpenChange={(v) => setOpenCreateFieldsModal(v)}
      />

      <CreateMoreMarkInputModal
        editFieldType={editFieldType}
        open={openCreateMarkInputFieldsModal}
        onOpenChange={(v) => setOpenCreateMarkInputFieldsModal(v)}
      />

      <EditSingleInputModal
        editFieldType={editFieldType}
        open={openEditFieldsModal}
        onOpenChange={(v) => setOpenEditFieldsModal(v)}
      />

      <form>
        <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Property</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-text')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <InputGroup>
              <InputGroupInput placeholder="Enter property name" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="date">Date</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-date')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
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
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="property-type">Property Type</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-dropdown')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <Select>
              <SelectTrigger className="relative" id="property-type">
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
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Address</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-text')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <InputGroup>
              <InputGroupInput placeholder="Enter property address" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">
                Inspection Title <span className="text-destructive">*</span>
              </FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-text')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <InputGroup>
              <InputGroupInput
                required
                placeholder="Enter the name of the inspection (e.g. 2024 Annual Roof Inspection)"
              />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Inspector</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-text')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <InputGroup>
              <InputGroupInput placeholder="Enter inspector name" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="roof-system-type">Roof System Type</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-dropdown')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
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
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="drainage-type">Drainage Type</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-dropdown')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
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

          <Button
            onClick={() => handleCreateFieldOpen('input-text')}
            variant="muted"
            type="button"
            className="col-span-full h-23 flex-col"
          >
            <PlusSignSquare className="size-6" />
            Add More Input fileds
          </Button>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Surface Condition (25 pts)</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-mark')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <MarkInput value={mark} maxValue={25} onChange={setMark} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Seams & Flashings (20 pts)</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-mark')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <MarkInput value={12} maxValue={20} onChange={() => {}} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Drainage & Ponding (15 pts)</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-mark')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <MarkInput value={3} maxValue={15} onChange={() => {}} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Penetrations & Accessories (10 pts)</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-mark')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <MarkInput value={6} maxValue={10} onChange={() => {}} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Repairs & Patch History (10 pts)</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-mark')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <MarkInput value={7} maxValue={10} onChange={() => {}} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Age vs. Expected Life (10 pts)</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-mark')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <MarkInput value={9} maxValue={10} onChange={() => {}} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Structural & Safety (10 pts)</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-mark')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <MarkInput value={8} maxValue={10} onChange={() => {}} />
            <InputGroup>
              <InputGroupTextarea placeholder="Add Observations Notes" />
            </InputGroup>
          </Field>

          <Button
            onClick={() => handleCreateFieldOpen('input-mark')}
            variant="muted"
            type="button"
            className="h-auto flex-col"
          >
            <PlusSignSquare className="size-6" />
            Add More Condition Rating Scale
          </Button>

          <Field className="col-span-full">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">NTE (Not-To-Exceed):</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-textarea')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <InputGroup>
              <InputGroupInput placeholder="Enter NTE" />
            </InputGroup>
          </Field>

          <Field className="col-span-full">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="">Additional Notes/Comments</FieldLabel>

              {editMode && (
                <Button
                  size="icon"
                  onClick={() => handleEditFieldClick('input-textarea')}
                  variant="outline"
                >
                  <Edit2 />
                </Button>
              )}
            </div>
            <InputGroup>
              <InputGroupTextarea placeholder="Type Any Additional Notes/Comments" />
            </InputGroup>
          </Field>

          <Button
            onClick={() => handleCreateFieldOpen('input-text')}
            variant="muted"
            type="button"
            className="col-span-full h-23 flex-col"
          >
            <PlusSignSquare className="size-6" />
            Add More Input fileds
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}

export function EditButtonWrapper({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('absolute inset-0 z-10 flex items-center justify-end pr-3', className)}
      {...props}
    />
  )
}
