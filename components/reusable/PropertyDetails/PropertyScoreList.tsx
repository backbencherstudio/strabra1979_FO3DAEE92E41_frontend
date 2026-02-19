import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import InfoCard from '../InfoCard/InfoCard'
import MarkInput from '../MarkInput/MarkInput'

type HealthRatingItem =
  | { type: 'input'; label: string; value: string }
  | { type: 'score'; label: string; value: number; maxValue: number; desc?: string }

export default function PropertyScoreListPreview() {
  return (
    <div className="@container/form">
      <h2 className="text-center text-2xl font-medium">Roof Health Rating</h2>

      <div className="mt-5 grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
        {roofHealthRatings.map((item) => {
          if (item.type == 'input') {
            return (
              <Field key={item.label}>
                <FieldLabel>{item.label}</FieldLabel>
                <InputGroup contentEditable={false}>
                  <InputGroupInput readOnly placeholder="" value={item.value} />
                </InputGroup>
              </Field>
            )
          }

          if (item.type == 'score') {
            return (
              <Field key={item.label}>
                <FieldLabel>{item.label}</FieldLabel>
                <MarkInput value={item.value} maxValue={item.maxValue} onChange={() => {}} />
                <InfoCard description={item.desc} />
              </Field>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

export const roofHealthRatings: HealthRatingItem[] = [
  { type: 'input', label: 'Roof System Type', value: 'BUR' },
  { type: 'input', label: 'Drainage Type', value: 'Scuppers' },
  {
    type: 'score',
    label: 'Surface Condition (25 pts)',
    value: 12,
    maxValue: 25,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Seams & Flashings (20 pts)',
    value: 4,
    maxValue: 20,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Drainage & Ponding (15 pts)',
    value: 4,
    maxValue: 15,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Penetrations & Accessories (10 pts)',
    value: 4,
    maxValue: 10,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Repairs & Patch History (10 pts)',
    value: 4,
    maxValue: 10,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
  {
    type: 'score',
    label: 'Age vs. Expected Life (10 pts)',
    value: 4,
    maxValue: 10,
    desc: 'The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface aging, and localized deterioration were observed in selected areas. ',
  },
]
