import { formatDate, naIfEmpty } from '@/lib/farmatters'
import { InfoList } from '../InfoList/InfoList'

export const AccessExpirationInfo = ({ accessExpiresAt }: { accessExpiresAt?: string | null }) => {
  if (!accessExpiresAt) return null

  return (
    <InfoList
      items={[
        {
          label: 'Access expiration',
          value: naIfEmpty(accessExpiresAt, formatDate),
        },
      ]}
    />
  )
}
