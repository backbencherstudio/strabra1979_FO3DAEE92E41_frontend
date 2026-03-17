'use client'
import { LocationPin } from '@/components/icons/LocationPin'
import { NoEntryIcon } from '@/components/icons/NoEntryIcon'
import { AssignUserDialog } from '@/components/pages/admin/property-list/AssignUserDialog'
import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import { ViewAccessDialog } from '@/components/pages/admin/property-list/ViewAccessDialog'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Check, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CircularProgressWithMeta } from '../CircularProgress/CircularProgress'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import { InfoItem } from '../InfoGrid/InfoGrid'
import { useAssignUserToPropertyMutation } from '@/api/dashboard/properties/propertiesApi'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/farmatters'

export interface Property {
  id: string
  title: string
  property: string
  address: string
  nextInspection?: string
  updated_at?: string
  score: number
  scoreTitle?: string
  previewImageUrl?: string
  dashboardId?: string
  // type: string
  // date: string
}

export interface PropertyCardProps extends Property, React.PropsWithChildren {
  hasAccess?: boolean
  slug: string
  accessExpiration?: string
  isSelectable?: boolean
  onSelect?: (selected: boolean) => void
  defaultSelected?: boolean
  isAdmin?: boolean
  onSchedule?: () => void
  onAssign?: () => void
  onViewAccess?: () => void
}

export default function PropertyCard({
  property,
  address,
  score,
  scoreTitle = 'Overall Health',
  previewImageUrl,
  hasAccess,
  slug = '#',
  children,
  isSelectable = false,
  onSelect,
  defaultSelected = false,
  id,
  dashboardId,
  isAdmin = false,
  onSchedule,
  onAssign,
  onViewAccess,
}: PropertyCardProps) {
  const [isSelected, setIsSelected] = useState(defaultSelected)
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [viewAccessDialogOpen, setViewAccessDialogOpen] = useState(false)

  useEffect(() => {
    setIsSelected(defaultSelected)
  }, [defaultSelected])

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isSelectable) {
      const newSelectedState = !isSelected
      setIsSelected(newSelectedState)
      onSelect?.(newSelectedState)
    }
  }

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleScheduleClick = () => {
    setScheduleDialogOpen(true)
  }

  const handleAssignClick = () => {
    setAssignDialogOpen(true)
  }

  const handleViewAccessClick = (e: React.MouseEvent) => {
    setViewAccessDialogOpen(true)
  }

  const handleScheduleConfirm = (data: any) => {
    console.log('Schedule confirmed:', data)
    if (onSchedule) {
      onSchedule()
    }
    setScheduleDialogOpen(false)
  }

  // Assign a propery manager
  const [assignUser, { isLoading: assignUserIsLoading }] = useAssignUserToPropertyMutation()
  const handleAssignPropertyManagerConfirm = async (userId?: string, dashboardId?: string) => {
    setAssignDialogOpen(false)
    if (!userId || !dashboardId) {
      return
    }

    try {
      const res = await assignUser({
        dashboardId: dashboardId,
        userId: userId,
      }).unwrap()
      toast.message(res.message ?? 'Successfully assigned a user')
    } catch (error) {
      toast.error('Failed to assing a user', {
        description: getErrorMessage(error),
      })
    }
  }

  return (
    <div
      className={cn(
        'border-input relative overflow-hidden rounded-md border bg-white transition-all duration-200',
        isSelectable && 'cursor-pointer',
        isSelected && 'border-[3px] border-blue-500',
      )}
      onClick={handleCardClick}
    >
      {isSelectable && isSelected && (
        <div className="absolute top-3 right-3 z-50">
          <div className="rounded-full bg-blue-500 p-1 shadow-lg">
            <Check className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      {isAdmin && (
        <>
          <div className="absolute top-3 right-3 z-40">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border-hover-50 h-8 w-8 border bg-[#bfcbce] shadow-lg hover:bg-[#bfcbce]/50"
                >
                  <MoreVertical className="h-4 w-4 text-white hover:text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleScheduleClick} className="cursor-pointer">
                  Schedule Inspection
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAssignClick} className="cursor-pointer">
                  Assign a Property Manager
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleViewAccessClick} className="cursor-pointer">
                  View Access Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Schedule Inspection Dialog */}
          <ScheduleInspectionDialog
            open={scheduleDialogOpen}
            onOpenChange={setScheduleDialogOpen}
            onSchedule={handleScheduleConfirm}
            propertyName={property}
            propertyAddress={address}
          />

          {/* Assign propery manager Dialog */}
          <AssignUserDialog
            // TODO: show previous selected user with selectedUserId
            // selectedUserId=''
            dialogTitle="Assign a Property Manager"
            label="Propery Manager"
            userType="PROPERTY_MANAGER"
            placeholder="Select a propery manager"
            open={assignDialogOpen}
            onOpenChange={setAssignDialogOpen}
            onSelect={(userId) => {
              handleAssignPropertyManagerConfirm(userId, dashboardId)
            }}
          />

          {/* View Access Dialog */}
          <ViewAccessDialog
            open={viewAccessDialogOpen}
            onOpenChange={setViewAccessDialogOpen}
            dashboardId={dashboardId}
            propertyId={id}
          />
        </>
      )}

      <div className="relative aspect-video bg-gray-400 max-sm:h-50">
        {previewImageUrl && (
          <Image
            className="h-full w-full object-cover"
            width={550}
            height={380}
            alt=""
            src={previewImageUrl!}
          />
        )}
        <div className="absolute bottom-0 left-0 px-4.5 pb-3">
          <h3 className="text-lg font-medium text-white">{property}</h3>
          <div className="text-gray-black-50 space-x-1 text-balance">
            <LocationPin className="inline" />
            <p className="inline text-sm">{address}</p>
          </div>
        </div>
      </div>
      <div className="p-4.5 pt-4">
        <section className="grid grid-cols-2 divide-x">
          {children}
          <div className="flex flex-col items-end pr-3">
            <div>
              <p className="text-gray-black-300 text-center text-sm">{scoreTitle}</p>
              <CircularProgressWithMeta
                containerClassName="pb-0 pt-1"
                labelClassName="text-xs text-gray-black-300 font-medium"
                strokeWidth={4}
                size={50}
                value={score}
              />
            </div>
          </div>
        </section>
        <section className="mt-4.5">
          {hasAccess ? (
            <Button asChild size="lg" className="w-full" variant="outline">
              <Link href={slug}>View Details</Link>
            </Button>
          ) : (
            <ConfirmDialog
              iconContainerClass="bg-transparent p-0"
              icon={<NoEntryIcon className="size-14" />}
              trigger={
                <Button size="lg" className="w-full" variant="outline">
                  View Details
                </Button>
              }
              title="Access Not Granted"
              desc="You don’t currently have permission to view this property dashboard. Please request access from the property manager to continue."
            >
              <AlertDialogCancel>Decline</AlertDialogCancel>
              <AlertDialogAction variant="default">Request Access</AlertDialogAction>
            </ConfirmDialog>
          )}
        </section>
      </div>
    </div>
  )
}

interface PropertyCardInfoListProps {
  items: InfoItem[]
}

export function PropertyCardInfoList({ items }: PropertyCardInfoListProps) {
  return (
    <div className="space-y-4">
      {items.map((info) => (
        <div key={info.label} className="flex flex-col gap-1">
          <span className="text-gray-black-300 text-sm">{info.label}</span>
          <span className="text-sm font-medium">{info.value}</span>
        </div>
      ))}
    </div>
  )
}
