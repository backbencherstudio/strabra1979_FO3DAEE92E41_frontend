import { LocationPin } from '@/components/icons/LocationPin'
import { NoEntryIcon } from '@/components/icons/NoEntryIcon'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { CircularProgressWithMeta } from '../CircularProgress/CircularProgress'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import Link from 'next/link'

export interface Property {
  title: string
  property: string
  id: string
  type: string
  inspector: {
    name: string
  }
  address: string
  date: string
  nextInspection?: string
  updated_at?: string
  score: number
  previewImageUrl?: string
}

export interface PropertyCardProps extends Property {
  hasAccess?: boolean
  slug: string
  accessExpiration?: string
}

export default function PropertyCard({
  property,
  address,
  type,
  accessExpiration,
  score,
  previewImageUrl,
  hasAccess,
  slug = '#',
}: PropertyCardProps) {
  const rowInfos = [
    { label: 'Type', value: type },
    { label: 'Access expiration', value: accessExpiration },
  ]

  return (
    <div className="border-input overflow-hidden rounded-md border bg-white">
      <div className="relative bg-gray-200 max-sm:h-50 sm:aspect-video">
        <Image
          className="h-full w-full object-cover"
          width={550}
          height={380}
          alt=""
          src={previewImageUrl!}
        />
        <div className="absolute bottom-0 left-0 px-4.5 pb-3">
          <h3 className="text-lg font-medium text-white">{property}</h3>
          <div className="text-gray-black-50 space-x-1 text-balance">
            <LocationPin className="inline" />
            <p className="inline text-sm">{address}</p>
          </div>
        </div>
      </div>
      <div className="p-4.5 pt-4">
        <section className="grid grid-cols-2">
          <div className="space-y-4">
            {rowInfos.map((info) => (
              <div key={info.label} className="flex flex-col gap-1">
                <span className="text-gray-black-300 text-sm">{info.label}</span>
                <span className="text-sm font-medium">{info.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end pr-3">
            <p className="text-gray-black-300 text-center text-sm">Roof Health</p>
            <CircularProgressWithMeta
              labelClassName="text-xs text-gray-black-300 font-medium"
              strokeWidth={4}
              size={50}
              value={score}
            />
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
