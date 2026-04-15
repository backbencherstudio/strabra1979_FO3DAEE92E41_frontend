import { mockPropertyDetails } from '@/constant/mock'
import PropertyDetailsReports from '@/components/reusable/PropertyDetails/PropertyDetailsReports'

interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string
  }>
}

export default async function PropertyDetailReportPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = await params
  return (
    <PropertyDetailsReports
      accessExpiration="12 Jan, 2025"
      id={propertyId}
      property={mockPropertyDetails}
    />
  )
}
