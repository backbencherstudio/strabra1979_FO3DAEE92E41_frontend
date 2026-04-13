import InspectionCheckBoxes from '@/components/pages/InspectionReport/InspectionReportForm/InspectionCheckBoxes'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'
import { IDashboardInspectionListItem, IPropertyInspectionFormData } from '@/types'

interface PropertyScoreListPreviewProps {
  label: string
  formConfig: IPropertyInspectionFormData | undefined
  inspectionData: IDashboardInspectionListItem | undefined
}

export default function PropertyCheckListPreview({
  label,
  formConfig,
  inspectionData,
}: PropertyScoreListPreviewProps) {
  const headerFields = formConfig?.form.headerFields.map((category) => {
    const value = inspectionData?.headerData?.[category.key]
    return { ...category, value: value ?? '' }
  })

  const isEditable = false

  return (
    <div className="@container/form">
      <h2 className="text-center text-2xl font-medium">{label}</h2>

      <section className="mt-4">
        <FieldGroup
          className={cn(
            'grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4',
            '[&_input]:opacity-100! [&_textarea]:opacity-100!',
          )}
        >
          {headerFields?.map((item) => {
            return (
              <Field key={item.key}>
                <FieldLabel data-required={item.required} htmlFor={item.key}>
                  {item.label}
                </FieldLabel>

                <InputGroup disabled={!isEditable}>
                  <InputGroupInput
                    className=""
                    value={item.value}
                    required={item.required}
                    id={item.key}
                    placeholder={item.placeholder}
                    disabled={!isEditable}
                  />
                </InputGroup>
              </Field>
            )
          })}

          <InspectionCheckBoxes
            isEditable={isEditable}
            scoringCategories={formConfig?.form?.scoringCategories}
            inspectionScores={inspectionData?.scores}
          />
        </FieldGroup>
      </section>
    </div>
  )
}
