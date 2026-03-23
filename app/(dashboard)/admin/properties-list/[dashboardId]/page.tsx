import PropertyDetails, {
  propertyDetails,
} from '@/components/reusable/PropertyDetails/PropertyDetails'
import PropertySharePopover from '@/components/reusable/PropertyDetails/PropertySharePopover'

interface PropertyDetailPageProps {
  params: Promise<{
    dashboardId: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { dashboardId } = await params
  return (
    <PropertyDetails
      dashboardId={dashboardId}
      headerRightContent={<PropertySharePopover />}
      property={propertyDetails}
    />
  )
}
