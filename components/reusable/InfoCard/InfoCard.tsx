interface InfoCardProps {
  title: string
  description: string
  children?: React.ReactNode
}

export default function InfoCard({ title, description, children }: InfoCardProps) {
  return (
    <div className="border-input space-y-4 rounded-md border bg-white p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        {children}
      </div>

      <div className="text-sm">{description}</div>
    </div>
  )
}
