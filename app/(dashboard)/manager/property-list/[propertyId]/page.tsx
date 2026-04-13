interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = await params
  // TODO: fix this
  return null
  // return (
  //   <PropertyDetails
  //     dashboardId={propertyId}
  //     headerRightContent={<PropertySharePopover />}
  //     data={propertyDetails}
  //   />
  // )
}
