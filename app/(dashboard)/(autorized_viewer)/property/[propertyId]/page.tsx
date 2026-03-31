import PropertyDetails, {
  propertyDetails,
} from '@/components/reusable/PropertyDetails/PropertyDetails'

interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = await params
  // <PropertyDetails dashboardId={propertyId} accessExpiration="12 Jan, 2025" data={propertyDetails} />
  return null
}
