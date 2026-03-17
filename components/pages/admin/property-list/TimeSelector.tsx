'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export interface TimeSelectorValue {
  hour: string
  minute: string
  period: string
}

interface TimeSelectorProps {
  onTimeChange?: (time: { hour: string; minute: string; period: string }) => void
  defaultValue?: TimeSelectorValue
}

export function TimeSelector({ onTimeChange, defaultValue }: TimeSelectorProps) {
  const [hour, setHour] = useState(defaultValue?.hour || '12')
  const [minute, setMinute] = useState(defaultValue?.minute || '00')
  const [period, setPeriod] = useState(defaultValue?.period || 'AM')
  const [selectedField, setSelectedField] = useState<'hour' | 'minute' | 'period' | null>(null)

  const hours = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
  const periods = ['AM', 'PM']

  // Generate minutes from 00 to 59
  // const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  const handleHourUp = () => {
    const currentIndex = hours.indexOf(hour)
    const nextIndex = (currentIndex + 1) % hours.length
    const newHour = hours[nextIndex]
    setHour(newHour)
    onTimeChange?.({ hour: newHour, minute, period })
  }

  const handleHourDown = () => {
    const currentIndex = hours.indexOf(hour)
    const prevIndex = (currentIndex - 1 + hours.length) % hours.length
    const newHour = hours[prevIndex]
    setHour(newHour)
    onTimeChange?.({ hour: newHour, minute, period })
  }

  const handleMinuteUp = () => {
    const currentMinute = parseInt(minute, 10)
    const nextMinute = (currentMinute + 1) % 60
    const newMinute = nextMinute.toString().padStart(2, '0')
    setMinute(newMinute)
    onTimeChange?.({ hour, minute: newMinute, period })
  }

  const handleMinuteDown = () => {
    const currentMinute = parseInt(minute, 10)
    const prevMinute = (currentMinute - 1 + 60) % 60
    const newMinute = prevMinute.toString().padStart(2, '0')
    setMinute(newMinute)
    onTimeChange?.({ hour, minute: newMinute, period })
  }

  const handlePeriodUp = () => {
    const currentIndex = periods.indexOf(period)
    const nextIndex = (currentIndex + 1) % periods.length
    const newPeriod = periods[nextIndex]
    setPeriod(newPeriod)
    onTimeChange?.({ hour, minute, period: newPeriod })
  }

  const handlePeriodDown = () => {
    const currentIndex = periods.indexOf(period)
    const prevIndex = (currentIndex - 1 + periods.length) % periods.length
    const newPeriod = periods[prevIndex]
    setPeriod(newPeriod)
    onTimeChange?.({ hour, minute, period: newPeriod })
  }

  const handleFieldClick = (field: 'hour' | 'minute' | 'period') => {
    setSelectedField(field)
  }

  const fields = [
    {
      key: 'hour' as const,
      value: hour,
      up: handleHourUp,
      down: handleHourDown,
      shape: 'circle',
    },
    {
      key: 'minute' as const,
      value: minute,
      up: handleMinuteUp,
      down: handleMinuteDown,
      shape: 'square',
    },
    {
      key: 'period' as const,
      value: period,
      up: handlePeriodUp,
      down: handlePeriodDown,
      shape: 'circle',
    },
  ]

  return (
    <div className="flex items-center justify-center gap-6 p-4">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col items-center">
          <Button
            className="rounded-full"
            variant="ghost"
            size="icon"
            onClick={() => {
              handleFieldClick(field.key)
              field.up()
            }}
          >
            <ChevronUp className="size-6" />
          </Button>

          <div
            className={`my-1 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium ${
              selectedField === field.key ? 'bg-[#0b2a3b] text-white' : 'text-[#0b2a3b]'
            } `}
          >
            {field.value}
          </div>

          <Button
            className="rounded-full"
            variant="ghost"
            size="icon"
            onClick={() => {
              handleFieldClick(field.key)
              field.down()
            }}
          >
            <ChevronDown className="size-6" />
          </Button>
        </div>
      ))}
    </div>
  )
}

export function convertTimeSelectorToISOString(date: Date, time: TimeSelectorValue): string {
  const hours = parseInt(time.hour, 10)
  const minutes = parseInt(time.minute, 10)

  let finalHour = hours

  // Convert to 24-hour format
  if (time.period === 'PM' && hours !== 12) {
    finalHour += 12
  } else if (time.period === 'AM' && hours === 12) {
    finalHour = 0
  }

  const result = new Date(date)

  result.setHours(finalHour)
  result.setMinutes(minutes)
  result.setSeconds(0)
  result.setMilliseconds(0)

  return result.toISOString()
}
