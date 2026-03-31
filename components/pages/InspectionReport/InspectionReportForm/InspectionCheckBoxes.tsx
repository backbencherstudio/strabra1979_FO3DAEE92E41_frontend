import { useGetPropertyInspectionFormQuery } from '@/api/inspectionManagement/inspectionFormApi'
import { useGetSingleInspectionWithIdQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import MarkInput from '@/components/reusable/MarkInput/MarkInput'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import { IDashboardInspectionListItem } from '@/types'
import { useEffect, useState } from 'react'

interface InspectionCheckBoxesProps {
  isEditable: boolean
}

export default function InspectionCheckBoxes({ isEditable }: InspectionCheckBoxesProps) {
  const { data: { data: formConfig } = {}, isLoading: isFormLoading } =
    useGetPropertyInspectionFormQuery('cmne1xe9p0001s4u8ua22cmm9')

  const { data: { data: inspectionData } = {}, isLoading: isInspectionLoading } =
    useGetSingleInspectionWithIdQuery('cmne225eb000gs4u8ctiglq5k')

  const [formData, setFormData] = useState<IDashboardInspectionListItem | null>(null)

  useEffect(() => {
    if (inspectionData && !formData) {
      setFormData(inspectionData)
    }
  }, [inspectionData, formData])

  const handleScoreChange = (key: string, value: number) => {
    setFormData((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        scores: {
          ...prev.scores,
          [key]: {
            ...prev.scores[key],
            score: value,
          },
        },
      }
    })
  }

  const handleNotesChange = (key: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        scores: {
          ...prev.scores,
          [key]: {
            ...prev.scores[key],
            notes: value,
          },
        },
      }
    })
  }

  if (isFormLoading || isInspectionLoading) return <div>Loading...</div>
  if (!formConfig || !formData) return <div>No data found</div>

  // merge config + state (NOT raw inspectionData)
  const scoringFields = formConfig.form.scoringCategories.map((category) => {
    const scoreData = formData.scores?.[category.key]

    return {
      ...category,
      score: scoreData?.score ?? 0,
      notes: scoreData?.notes ?? '',
    }
  })

  return (
    <>
      {scoringFields.map((field) => (
        <Field key={field.key}>
          <FieldLabel htmlFor={field.key}>
            {field.label} ({field.maxPoints} pts)
          </FieldLabel>

          <MarkInput
            value={field.score}
            maxValue={field.maxPoints}
            onChange={(val) => handleScoreChange(field.key, val)}
            disabled={!isEditable}
          />

          <InputGroup>
            <InputGroupTextarea
              placeholder="Add Observations Notes"
              value={field.notes}
              onChange={(e) => handleNotesChange(field.key, e.target.value)}
              disabled={!isEditable}
            />
          </InputGroup>
        </Field>
      ))}
    </>
  )
}
