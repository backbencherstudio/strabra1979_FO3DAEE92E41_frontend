import PropertyDetails, {
  propertyDetails,
} from '@/components/reusable/PropertyDetails/PropertyDetails'
import PropertySharePopover from '@/components/reusable/PropertyDetails/PropertySharePopover'

interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = await params
  return (
    <PropertyDetails
      dashboardId={propertyId}
      headerRightContent={<PropertySharePopover />}
      data={propertyDetails}
    />
  )
}
