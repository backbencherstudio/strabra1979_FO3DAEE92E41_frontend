import MarkInput from '@/components/reusable/MarkInput/MarkInput'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import { IInspectionScoreCheckboxValue, ScoringCategory } from '@/types'

interface InspectionCheckBoxesProps {
  isEditable: boolean
  scoringCategories: ScoringCategory[] | undefined
  inspectionScores: Record<string, IInspectionScoreCheckboxValue> | undefined
  onScoreChange?: (key: string, value: number) => void
  onNotesChange?: (key: string, value: string) => void
}

export default function InspectionCheckBoxes({
  isEditable,
  scoringCategories,
  inspectionScores,
  onScoreChange,
  onNotesChange,
}: InspectionCheckBoxesProps) {
  if (!scoringCategories || !inspectionScores) {
    return null
  }

  const scoringFields = scoringCategories
    // .sort((a, b) => a.order - b.order)
    ?.map((category) => {
      const scoreData = inspectionScores?.[category.key]

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
            onChange={(val) => onScoreChange?.(field.key, val)}
            disabled={!isEditable}
          />

          <InputGroup>
            <InputGroupTextarea
              placeholder="Add Observations Notes"
              value={field.notes}
              onChange={(e) => onNotesChange?.(field.key, e.target.value)}
              disabled={!isEditable}
            />
          </InputGroup>
        </Field>
      ))}
    </>
  )
}
