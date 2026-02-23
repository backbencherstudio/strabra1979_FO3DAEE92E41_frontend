'use client'

import { FileEditBlue } from '@/components/icons/FileEditBlue'
import { User } from '@/components/icons/User'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

// Mock data for activity logs (10 entries)
const mockActivityLogs = [
  // Property Updates - Operation badge (5 entries)
  {
    id: 1,
    type: 'property-updates',
    icon: 'FileEditBlue',
    title: "Riverside Apartment's",
    description: 'Inspection report uploaded',
    timestamp: '3.22 PM, 12 Jan, 2026',
    badge: 'Operation'
  },
  {
    id: 2,
    type: 'property-updates',
    icon: 'FileEditBlue',
    title: "Harbor View Condo's",
    description: 'Maintenance request completed',
    timestamp: '10.15 AM, 12 Jan, 2026',
    badge: 'Operation'
  },
  {
    id: 3,
    type: 'property-updates',
    icon: 'FileEditBlue',
    title: "Greenwood Villa's",
    description: 'Tenant lease renewed',
    timestamp: '2.45 PM, 11 Jan, 2026',
    badge: 'Operation'
  },
  {
    id: 4,
    type: 'property-updates',
    icon: 'FileEditBlue',
    title: "Sunset Towers's",
    description: 'Property tax document uploaded',
    timestamp: '11.30 AM, 11 Jan, 2026',
    badge: 'Operation'
  },
  {
    id: 5,
    type: 'property-updates',
    icon: 'FileEditBlue',
    title: "Maple Gardens's",
    description: 'Security report filed',
    timestamp: '4.20 PM, 10 Jan, 2026',
    badge: 'Operation'
  },
  
  // User Access - Admin badge (2 entries)
  {
    id: 6,
    type: 'user-access',
    icon: 'User',
    user: 'System Admin',
    action: 'updated user permissions for',
    property: 'all properties',
    description: '',
    timestamp: '2.30 PM, 12 Jan, 2026',
    badge: 'admin'
  },
  {
    id: 7,
    type: 'user-access',
    icon: 'User',
    user: 'Super Admin',
    action: 'added new admin role to',
    property: 'dashboard',
    description: '',
    timestamp: '12.45 PM, 11 Jan, 2026',
    badge: 'admin'
  },
  
  // User Access - Authorized Viewer badge (1 entry)
  {
    id: 8,
    type: 'user-access',
    icon: 'User',
    user: 'John Doe',
    action: 'was given view access to',
    property: 'Sunshade apartment',
    description: 'dashboard',
    timestamp: '3.22 PM, 12 Jan, 2026',
    badge: 'Authorized Viewer'
  },
  
  // User Access - Property Manager badge (2 entries)
  {
    id: 9,
    type: 'user-access',
    icon: 'User',
    user: 'Emily Brown',
    action: 'was assigned as manager for',
    property: 'Lakeside Towers',
    description: 'dashboard',
    timestamp: '4.15 PM, 11 Jan, 2026',
    badge: 'Property Manager'
  },
  {
    id: 10,
    type: 'user-access',
    icon: 'User',
    user: 'Sarah Smith',
    action: 'was granted edit access to',
    property: 'Oakwood Heights',
    description: 'dashboard',
    timestamp: '11.30 AM, 12 Jan, 2026',
    badge: 'Property Manager'
  }
]

export default function ActivityLogPage() {
  // Filter logs by type
  const propertyUpdateLogs = mockActivityLogs.filter(log => log.type === 'property-updates')
  const userAccessLogs = mockActivityLogs.filter(log => log.type === 'user-access')

  return (
    <div className='bg-[#f8fafb] p-4.5 rounded-3xl border border-[#ebeeef]'>
      <SharedPropertyCardListActions 
        title='Activity Log' 
        titleClassName='md:text-base font-medium text-[#4a4c56]'
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className='bg-transparent gap-4'>
          <TabsTrigger 
            value="all"  
            className='data-[state=active]:bg-[#abc8e4] data-[state=active]:text-medium data-[state=active]:font-medium data-[state=active]:text-black rounded-lg'
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="property-updates" 
            className='data-[state=active]:bg-[#abc8e4] data-[state=active]:text-medium data-[state=active]:font-medium data-[state=active]:text-black rounded-lg'
          >
            Property dashboard updates
          </TabsTrigger>
          <TabsTrigger 
            value="user-access" 
            className='data-[state=active]:bg-[#abc8e4] data-[state=active]:text-medium data-[state=active]:font-medium data-[state=active]:text-black rounded-lg'
          >
            User Access
          </TabsTrigger>
        </TabsList>

        {/* All Tab - Shows all logs */}
        <TabsContent value="all" className='border border-[#e9e9ea] rounded-[8px] p-3 bg-white'>
          <ul className='flex flex-col gap-6'>
            {mockActivityLogs.map(log => (
              <li key={log.id} className='flex items-start gap-3'>
                <div className={`p-1.5 ${log.icon === 'FileEditBlue' ? 'bg-[#e5f3fe]' : 'bg-[#fbf5db]'} rounded-full inline-block`}>
                  {log.icon === 'FileEditBlue' ? <FileEditBlue /> : <User />}
                </div>
                <div>
                  {log.type === 'property-updates' ? (
                    <h3 className='text-sm font-medium text-black'>
                      {log.title} <span className='text-[#4a4c56] font-normal'>{log.description}</span>
                    </h3>
                  ) : (
                    <h3 className='text-[#4a4c56] font-normal'>
                      <span className='text-sm font-medium text-black'>{log.user}</span> {log.action}{' '}
                      <span className='text-sm font-medium text-black'>{log.property}</span> {log.description}
                    </h3>
                  )}
                  <p className='text-xs'>{log.timestamp}</p>
                </div>
                <p className={`py-1 px-2 rounded-full text-xs inline-block text-black ${
                  log.badge === 'Operation' ? 'bg-[#ffcd71]' : 
                  log.badge === 'admin' ? 'bg-[#d2d2d5]' : 
                  log.badge === 'Authorized Viewer' ? 'bg-[#4ba7ff]' : 
                  log.badge === 'Property Manager' ? 'bg-[#05d945]' : 
                  'bg-[#d2d2d5]'
                }`}>
                  {log.badge}
                </p>
              </li>
            ))}
          </ul>
        </TabsContent>

        {/* Property Updates Tab */}
        <TabsContent value="property-updates" className='border border-[#e9e9ea] rounded-[8px] p-3 bg-white'>
          <ul className='flex flex-col gap-6'>
            {propertyUpdateLogs.map(log => (
              <li key={log.id} className='flex items-start gap-3'>
                <div className='p-1.5 bg-[#e5f3fe] rounded-full inline-block'>
                  <FileEditBlue />
                </div>
                <div>
                  <h3 className='text-sm font-medium text-black'>
                    {log.title} <span className='text-[#4a4c56] font-normal'>{log.description}</span>
                  </h3>
                  <p className='text-xs'>{log.timestamp}</p>
                </div>
                <p className='py-1 px-2 bg-[#ffcd71] rounded-full text-xs inline-block text-black'>
                  {log.badge}
                </p>
              </li>
            ))}
          </ul>
        </TabsContent>

        {/* User Access Tab */}
        <TabsContent value="user-access" className='border border-[#e9e9ea] rounded-[8px] p-3 bg-white'>
          <ul className='flex flex-col gap-6'>
            {userAccessLogs.map(log => (
              <li key={log.id} className='flex items-start gap-3'>
                <div className='p-1.5 bg-[#fbf5db] rounded-full inline-block'>
                  <User />
                </div>
                <div>
                  <h3 className='text-[#4a4c56] font-normal'>
                    <span className='text-sm font-medium text-black'>{log.user}</span> {log.action}{' '}
                    <span className='text-sm font-medium text-black'>{log.property}</span> {log.description}
                  </h3>
                  <p className='text-xs'>{log.timestamp}</p>
                </div>
                <p className={`py-1 px-2 rounded-full text-xs inline-block text-black ${
                  log.badge === 'admin' ? 'bg-[#d2d2d5]' : 
                  log.badge === 'Authorized Viewer' ? 'bg-[#4ba7ff]' : 
                  log.badge === 'Property Manager' ? 'bg-[#05d945]' : 
                  'bg-[#d2d2d5]'
                }`}>
                  {log.badge}
                </p>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}