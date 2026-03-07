'use client'

import { useGetProfileQuery, useUpdateTimezoneMutation } from '@/api/profile/profileAccountApi'
import { TimezoneCombobox, TimezoneItem } from '@/components/form/timezone-combobox'
import { SettingSectionCard } from '@/components/reusable/SectionCard/SectionCard'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'
import { getErrorMessage } from '@/lib/farmatters'
import { cn } from '@/lib/utils'
import { IUserProfile } from '@/types'
import { useEffect, useEffectEvent, useState } from 'react'
import { toast } from 'sonner'

export default function TimeZoneSettings() {
  const { data, isLoading } = useGetProfileQuery()

  const [autoTimezone, setAutoTimezone] = useState<boolean | undefined>(undefined)
  const [timezone, setTimezone] = useState<TimezoneItem | null>(null)

  const updateInitialData = useEffectEvent((data: IUserProfile) => {
    if (autoTimezone === undefined) {
      setAutoTimezone(data.is_set_timezone_automatic)
    }

    if (data.timezone) {
      setTimezone({
        value: data.timezone,
        label: data.timezone,
      })
    }
  })

  useEffect(() => {
    if (!data) return
    updateInitialData(data)
  }, [data])

  const [updateTimezone, { isLoading: updateIsLoading }] = useUpdateTimezoneMutation()

  const handleAutoToggle = async (checked: boolean) => {
    setAutoTimezone(checked)

    const payload = {
      auto_timezone: checked,
      timezone: data?.timezone ?? '',
    }

    try {
      const res = await updateTimezone(payload).unwrap()

      toast.success(res.message ?? 'Timezone updated successfully')
    } catch (error) {
      toast.error('Failed to update timezone', {
        description: getErrorMessage(error),
      })
    }
  }

  const handleTimezoneChange = async (tz: TimezoneItem | null) => {
    setTimezone(tz)

    try {
      if (!tz || !tz.value) {
        return
      }

      const res = await updateTimezone({
        auto_timezone: false,
        timezone: tz.value,
      }).unwrap()

      toast.success(res.message ?? 'Timezone updated successfully')
    } catch (error) {
      toast.error('Failed to update timezone', {
        description: getErrorMessage(error),
      })
    }
  }

  return (
    <SettingSectionCard>
      <SettingListItem
        title="Set the time zone automatically"
        className="border-none bg-transparent"
        titleClassName="text-forground tex-base"
      >
        <Switch
          disabled={isLoading || updateIsLoading}
          checked={autoTimezone}
          onCheckedChange={handleAutoToggle}
        />
      </SettingListItem>

      <hr className="border-gray-black-50 my-1" />

      <SettingListItem
        title="Time zone"
        className="border-none bg-transparent"
        titleClassName="text-forground tex-base text-nowrap"
      >
        <div className={cn({ 'pointer-events-none opacity-40': autoTimezone })}>
          <TimezoneCombobox
            disabled={autoTimezone || isLoading || updateIsLoading}
            value={timezone}
            onValueChange={(v) => handleTimezoneChange(v)}
          />
        </div>
      </SettingListItem>
    </SettingSectionCard>
  )
}
