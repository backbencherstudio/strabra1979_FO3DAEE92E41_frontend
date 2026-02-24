'use client'

import React from 'react'
import { properties } from '../../(autorized_viewer)/mock'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import Building3Icon from '@/components/icons/Building3Icon'
import PlusIcon from '@/components/icons/PlusIcon'
import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import { AddNewDialog } from '@/components/pages/admin/property-list/AddNewDialog'
 

export default function Page() {
  const handleSchedule = (propertyId: string) => {
    // Handle schedule action
    console.log('Schedule inspection for property:', propertyId)
  }

  const handleAssign = (propertyId: string) => {
    // Handle assign action
    console.log('Assign inspector to property:', propertyId)
  }

  const handleViewAccess = (propertyId: string) => {
    // Handle view access action
    console.log('View access details for property:', propertyId)
  }

   const handleAddNew = (data: any) => {
    console.log('Create new property:', data)
    // Add your logic here to create a new property
    // For example: router.push('/manager/property-list/new')
    // Or make an API call
  }

  return (
    <div className=' p-4 bg-[#f6f8fa] rounded-3xl'>
      <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 ">
        <div className=' bg-[#ffffff] rounded-[12px] flex items-center justify-center border border-[#e9e9ea]'>
        <div className=' flex flex-col justify-center items-center py-24'>

           <Building3Icon/>
           <h2 className=' text-base text-[#4a4c56] font-medium text-center mt-3'>Create New Property Dashboard</h2>
           <p className=' text-sm text-[#5f6166] text-center mt-1.5'>Set up a dashboard to manage <br /> inspections, and all property reports.</p>

           <AddNewDialog onAdd={handleAddNew} trigger={

       <button className=' text-[#0b2a3b] text-sm font-medium border border-[#eceff3] py-3.5 w-full rounded-[8px] mt-6 flex items-center justify-center gap-1.5'> <PlusIcon/> Create New</button>
           }/>
         

            </div>
        </div>
        {properties.map((p) => (
            
          <PropertyCard 
            slug="/manager/property-list/123" 
            hasAccess 
            key={p.id} 
            {...p}
            isAdmin={true}
            onSchedule={() => handleSchedule(p.id)}
            onAssign={() => handleAssign(p.id)}
            onViewAccess={() => handleViewAccess(p.id)}
          >
            <PropertyCardInfoList
              items={[
                { label: 'Type', value: p.type },
                { label: 'Next Inspection', value: p.date },
              ]}
            />
          </PropertyCard>
        ))}
      </div>
    </div>
  )
}