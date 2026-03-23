import { propertyDetails } from '@/components/reusable/PropertyDetails/PropertyDetails'
import PropertyDetailsReports from '@/components/reusable/PropertyDetails/PropertyDetailsReports'
import PropertySharePopover from '@/components/reusable/PropertyDetails/PropertySharePopover'

interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string
  }>
}

export default async function PropertyDetailReportPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = await params
  return (
    <PropertyDetailsReports
      id={propertyId}
      property={propertyDetails}
      headerRightContent={<PropertySharePopover />}
    />
  )
}
