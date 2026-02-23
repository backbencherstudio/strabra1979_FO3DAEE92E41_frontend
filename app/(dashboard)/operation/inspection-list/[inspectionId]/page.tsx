'use client'

import PropertyDetails, {
  propertyDetails,
} from '@/components/reusable/PropertyDetails/PropertyDetails'

export default function InspectionListItemDetailsPage() {
  return (
    <div>
      <PropertyDetails id="123" property={propertyDetails} />
    </div>
  )
}
