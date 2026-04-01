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
  IDashboardInspectionListItem,
  IInspectionFieldValues,
  IInspectionScoreCheckboxValue,
  IPropertyInspectionFormData,
} from '@/types'
import { useState } from 'react'
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
  // const [date, setDate] = useState<Date | undefined>(undefined)
  // const [open, setOpen] = useState(false)

  const [headerFieldsValues, setHeaderFieldsValues] = useState<IInspectionFieldValues>(
    () => inspectionData?.headerData ?? {},
  )
  const handleInputChange = (key: string, value: string) => {
    setHeaderFieldsValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  const headerFields = formConfig?.form.headerFields.map((category) => {
    const value = headerFieldsValues?.[category.key]

    return {
      ...category,
      value: value ?? '',
    }
  })

  const [scores, setScores] = useState<Record<string, IInspectionScoreCheckboxValue>>(
    () => inspectionData?.scores ?? {},
  )
  const handleScoreChange = (key: string, value: number) => {
    setScores((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        score: value,
      },
    }))
  }
  const handleNotesChange = (key: string, value: string) => {
    setScores((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        notes: value,
      },
    }))
  }

  // // initialize once
  // useEffect(() => {
  //   if (inspectionData?.scores) {
  //     setScores(inspectionData.scores)
  //   }
  //   if (inspectionData?.headerData) {
  //     setHeaderFieldsValues(inspectionData.headerData)
  //   }
  // }, [inspectionData])

  const [nteValue, setNteValue] = useState(inspectionData?.nteValue ?? '')
  const [additionalComments, setAdditionalComments] = useState(
    inspectionData?.additionalComments ?? '',
  )

  if (!formConfig || !inspectionData) return null

  return (
    <form>
      <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
        {headerFields?.map((item) => {
          const isDropdown = item.type === 'dropdown'
          return (
            <Field key={item.key}>
              <FieldLabel data-required={item.required} htmlFor={item.key}>
                {item.label}
              </FieldLabel>

              {isDropdown ? (
                <Select
                  value={item.value}
                  required={item.required}
                  onValueChange={(val) => handleInputChange(item.key, val)}
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
              disabled={!isEditable}
              id="nte"
              value={nteValue}
              placeholder={formConfig?.form?.nteConfig?.placeholder}
              onChange={(e) => setNteValue(e.target.value)}
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
              onChange={(e) => setAdditionalComments(e.target.value)}
            />
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  )
}
