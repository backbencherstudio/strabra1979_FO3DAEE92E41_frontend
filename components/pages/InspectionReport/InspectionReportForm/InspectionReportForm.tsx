'use client'

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
import {
  selectInspectionAdditionalComments,
  selectInspectionHeaderData,
  selectInspectionNteValue,
  selectInspectionScores,
  setAdditionalComments,
  setNteValue,
  updateHeaderField,
  updateScoreNote,
  updateScoreValue,
} from '@/redux/features/inspectionForm/inspectionFormSlice'
import { AppDispatch } from '@/redux/store'
import { IDashboardInspectionListItem, IPropertyInspectionFormData } from '@/types'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InspectionCheckBoxes from './InspectionCheckBoxes'

interface InspectionReportFormProps {
  isEditable: boolean
  formConfig: IPropertyInspectionFormData | undefined
  inspectionData: IDashboardInspectionListItem | undefined
}

export default function InspectionReportForm({
  isEditable,
  formConfig,
  inspectionData,
}: InspectionReportFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const headerFieldsValues = useSelector(selectInspectionHeaderData)
  const touchedFieldsRef = useRef<Set<string>>(new Set())

  const headerFields = formConfig?.form.headerFields.map((category) => {
    const value = headerFieldsValues?.[category.key]
    return { ...category, value: value ?? '' }
  })
  const handleInputChange = (key: string, value: string) => {
    dispatch(updateHeaderField({ key, value }))
  }

  const scores = useSelector(selectInspectionScores)
  const handleScoreChange = (key: string, value: number) => {
    dispatch(updateScoreValue({ key, score: value }))
  }
  const handleNotesChange = (key: string, value: string) => {
    dispatch(updateScoreNote({ key, note: value }))
  }

  const nteValue = useSelector(selectInspectionNteValue)
  const handleNteValueChange = (val: number) => {
    dispatch(setNteValue(val))
  }

  const additionalComments = useSelector(selectInspectionAdditionalComments)
  const handleAdditionalComments = (val: string) => {
    dispatch(setAdditionalComments(val))
  }

  if (!formConfig || !inspectionData) return null

  return (
    <form>
      <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
        {headerFields?.map((item) => {
          const isDropdown = item.type === 'dropdown'
          return (
            <Field key={item.key}>
              <FieldLabel data-required={item.required} htmlFor={item.key}>
                {item.label} {item.value === '' ? 'yes' : 'no'}
              </FieldLabel>

              {isDropdown ? (
                <Select
                  onOpenChange={(isOpen) => {
                    if (isOpen) {
                      touchedFieldsRef.current.add(item.key)
                    }
                  }}
                  value={item.value}
                  required={item.required}
                  onValueChange={(val) => {
                    if (touchedFieldsRef.current.has(item.key)) {
                      handleInputChange(item.key, val)
                    }
                  }}
                  disabled={!isEditable}
                >
                  <SelectTrigger id={item.key}>
                    <SelectValue placeholder={item.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {item.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <InputGroup disabled={!isEditable}>
                  <InputGroupInput
                    className=""
                    value={item.value}
                    required={item.required}
                    id={item.key}
                    placeholder={item.placeholder}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    disabled={!isEditable}
                  />
                </InputGroup>
              )}
            </Field>
          )
        })}

        {/* <Field> */}
        {/*   <FieldLabel htmlFor="date">Date</FieldLabel> */}
        {/*   <DatePickerWrapper */}
        {/*     placeholder="Select date" */}
        {/*     value={date?.toLocaleDateString()} */}
        {/*     open={open} */}
        {/*     setOpen={setOpen} */}
        {/*   > */}
        {/*     <Calendar */}
        {/*       mode="single" */}
        {/*       selected={date} */}
        {/*       defaultMonth={date} */}
        {/*       captionLayout="dropdown" */}
        {/*       onSelect={(date) => { */}
        {/*         setDate(date) */}
        {/*         setOpen(false) */}
        {/*       }} */}
        {/*     /> */}
        {/*   </DatePickerWrapper> */}
        {/* </Field> */}

        {/* <Field> */}
        {/*   <FieldLabel htmlFor="name">Address</FieldLabel> */}
        {/*   <InputGroup> */}
        {/*     <InputGroupInput placeholder="Enter property address" /> */}
        {/*   </InputGroup> */}
        {/* </Field> */}

        <InspectionCheckBoxes
          isEditable={isEditable}
          scoringCategories={formConfig?.form?.scoringCategories}
          inspectionScores={scores}
          onScoreChange={handleScoreChange}
          onNotesChange={handleNotesChange}
        />

        <Field className="col-span-full">
          <FieldLabel htmlFor="nte">{formConfig?.form?.nteConfig?.label}</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type="number"
              disabled={!isEditable}
              id="nte"
              value={nteValue}
              placeholder={formConfig?.form?.nteConfig?.placeholder}
              onChange={(e) => handleNteValueChange(parseInt(e.target.value))}
            />
          </InputGroup>
        </Field>

        <Field className="col-span-full">
          <FieldLabel htmlFor="additional-notes">
            {formConfig?.form.additionalNotesConfig.placeholder}
          </FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="additional-notes"
              disabled={!isEditable}
              value={additionalComments}
              placeholder={formConfig?.form.additionalNotesConfig.placeholder}
              onChange={(e) => handleAdditionalComments(e.target.value)}
            />
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  )
}
