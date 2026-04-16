import { formatDate, naIfEmpty } from '@/lib/farmatters'
import { IPropertyListItem } from '@/types'
import { PropertyCardInfoList } from './PropertyCard'

export function PropertyCardAdminInfoList({ property }: { property: Partial<IPropertyListItem> }) {
  return (
    <PropertyCardInfoList
      items={[
        { label: 'Type', value: naIfEmpty(property.propertyType) },
        {
          label: 'Next Inspection',
          value: naIfEmpty(formatDate(property?.nextInspectionDate)),
        },
        {
          label: 'Property Manager',
          value: naIfEmpty(property?.propertyManager?.username),
        },
      ]}
    />
  )
}
