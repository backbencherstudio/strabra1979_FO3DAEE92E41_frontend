import { BuildingIcon } from '@/components/icons/BuildingIcon'
import { Calender2Icon } from '@/components/icons/Calender2Icon'
import { User2 } from 'lucide-react'

import React from 'react'
import Chart from './Chart'
import ActivityLog from './ActivityLog'

// Demo data
const statsData = [
  {
    id: 1,
    title: 'Total Properties',
    value: '106',
    change: ' +4.5% from last month',
    icon: BuildingIcon,
    bgColor: 'bg-[#f8fafb]'
  },
  {
    id: 2,
    title: 'Active Inspectors',
    value: '24',
    change: '+4.5% from last month',
    icon: User2,
    bgColor: 'bg-[#f8fafb]'
  },
  {
    id: 3,
    title: 'Scheduled Inspections',
    value: '18',
    change: 'Scheduled for this month',
    icon: Calender2Icon,
    bgColor: 'bg-[#f8fafb]'
  }
]

export default function AdminHome() {
  return (
    <div className='space-y-5'>
      <div className="grid grid-cols-3 gap-4.5  ">
        {statsData.map((stat) => {
          const IconComponent = stat.icon
          return (
            <div
              key={stat.id}
              className={`${stat.bgColor} p-4.5 rounded-3xl   border border-[#ebeeef] space-y-2 w-full`}
            >
              <div className='flex justify-between  '>
                <p className='text-base text-[#5f6166]'>{stat.title}</p>
                <IconComponent />
              </div>
              <h2 className='text-2xl text-[#4a4c56] font-medium'>{stat.value}</h2>
              <p className='text-base text-[#5f6166]'>{stat.change}</p>
            </div>
          )
        })}

      </div>

      <div className='grid lg:grid-cols-12 gap-5'>
        <div className='lg:col-span-7 xl:col-span-8 2xl:col-span-9'>
          {/* chart */}
          <Chart />
        </div>

        <div className='lg:col-span-5 xl:col-span-4 2xl:col-span-3'>
          {/* Activity Log  */}
          <ActivityLog />
        </div>
      </div>

    </div>
  )
}


