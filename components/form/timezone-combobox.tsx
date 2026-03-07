'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

import { ComboboxRoot } from '@base-ui/react/combobox'
import { allTimezones } from 'react-timezone-select'

export type TimezoneItem = {
  label: string
  value: string
}

const timezones: TimezoneItem[] = Object.entries(allTimezones).map(([value, label]) => ({
  value,
  label,
}))

export function TimezoneCombobox({
  value,
  onValueChange,
  disabled,
}: {
  disabled?: boolean
  value?: TimezoneItem | null
  onValueChange?:
    | ((value: TimezoneItem | null, eventDetails: ComboboxRoot.ChangeEventDetails) => void)
    | undefined
}) {
  return (
    <Combobox
      disabled={disabled}
      items={timezones}
      itemToStringValue={(tz) => tz?.label ?? ''}
      value={value}
      onValueChange={onValueChange}
    >
      <ComboboxInput placeholder="Select timezone..." />

      <ComboboxContent>
        <ComboboxEmpty>No timezone found.</ComboboxEmpty>

        <ComboboxList>
          {(tz) => (
            <ComboboxItem key={tz.value} value={tz}>
              {tz.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
