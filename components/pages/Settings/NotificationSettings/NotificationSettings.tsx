import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'

export default function NotificationSettings({children}: React.PropsWithChildren) {
  return (
    <SectionCard className="border-none p-8">
      <SectionTitle className="text-lg">Notification Settings</SectionTitle>

      <div className="mt-4.5 space-y-2">
        {children}
      </div>
    </SectionCard>
  )
}
