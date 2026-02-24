'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface TimeSelectorProps {
    onTimeChange?: (time: { hour: string; minute: string; period: string }) => void
    defaultValue?: { hour: string; minute: string; period: string }
}

export function TimeSelector({ onTimeChange, defaultValue }: TimeSelectorProps) {
    const [hour, setHour] = useState(defaultValue?.hour || '12')
    const [minute, setMinute] = useState(defaultValue?.minute || '00')
    const [period, setPeriod] = useState(defaultValue?.period || 'AM')
    const [selectedField, setSelectedField] = useState<'hour' | 'minute' | 'period' | null>(null)

    const hours = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    const periods = ['AM', 'PM']

    // Generate minutes from 00 to 59
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

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

    return (
        <div className="flex items-center justify-center gap-6 p-4">
            {/* Hour */}
            <div className="flex flex-col items-center">
                <button
                    onClick={handleHourUp}
                    className="p-1 hover:bg-[#f6f8fa] rounded-full transition-colors"
                >
                    <ChevronUp className="h-5 w-5 text-[#4a4c56]" />
                </button>
                <button
                    onClick={() => handleFieldClick('hour')}
                    className={`w-16 h-16 flex items-center justify-center text-2xl font-medium     my-1 transition-colors ${
                        selectedField === 'hour'
                            ? 'bg-[#0b2a3b] text-white border-[#0b2a3b] rounded-full'
                            : 'text-[#0b2a3b] border-[#e7eaeb] hover:border-[#0b2a3b]'
                    }`}
                >
                    {hour}
                </button>
                <button
                    onClick={handleHourDown}
                    className="p-1 hover:bg-[#f6f8fa] rounded-full transition-colors"
                >
                    <ChevronDown className="h-5 w-5 text-[#4a4c56]" />
                </button>
             
            </div>

            {/* Minute */}
            <div className="flex flex-col items-center">
                <button
                    onClick={handleMinuteUp}
                    className="p-1 hover:bg-[#f6f8fa] rounded-full transition-colors"
                >
                    <ChevronUp className="h-5 w-5 text-[#4a4c56]" />
                </button>
                <button
                    onClick={() => handleFieldClick('minute')}
                    className={`w-16 h-16 flex items-center justify-center text-2xl font-medium   rounded-[8px] my-1 transition-colors ${
                        selectedField === 'minute'
                            ? 'bg-[#0b2a3b] text-white border-[#0b2a3b] rounded-full'
                            : 'text-[#0b2a3b] border-[#e7eaeb] hover:border-[#0b2a3b]'
                    }`}
                >
                    {minute}
                </button>
                <button
                    onClick={handleMinuteDown}
                    className="p-1 hover:bg-[#f6f8fa] rounded-full transition-colors"
                >
                    <ChevronDown className="h-5 w-5 text-[#4a4c56]" />
                </button>
               
            </div>

            {/* AM/PM */}
            <div className="flex flex-col items-center">
                <button
                    onClick={handlePeriodUp}
                    className="p-1 hover:bg-[#f6f8fa] rounded-full transition-colors"
                >
                    <ChevronUp className="h-5 w-5 text-[#4a4c56]" />
                </button>
                <button
                    onClick={() => handleFieldClick('period')}
                    className={`w-16 h-16 flex items-center justify-center text-2xl font-medium   rounded-full my-1 transition-colors ${
                        selectedField === 'period'
                            ? 'bg-[#0b2a3b] text-white border-[#0b2a3b]'
                            : 'text-[#0b2a3b] border-[#e7eaeb] hover:border-[#0b2a3b]'
                    }`}
                >
                    {period}
                </button>
                <button
                    onClick={handlePeriodDown}
                    className="p-1 hover:bg-[#f6f8fa] rounded-full transition-colors"
                >
                    <ChevronDown className="h-5 w-5 text-[#4a4c56]" />
                </button>
                {/* <span className="text-xs text-[#5f6166] mt-1">AM/PM</span> */}
            </div>
        </div>
    )
}