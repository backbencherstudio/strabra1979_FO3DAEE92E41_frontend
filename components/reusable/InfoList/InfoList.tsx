import React from "react"

interface InfoListItem {
  label?: string
  value: string
}

interface InfoListProps {
  items: InfoListItem[]
}

export function InfoList({ items }: InfoListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.label} className="text-sm">
          {item.label ? `${item.label}:` : null} <span className="font-medium">{item.value}</span>
        </li>
      ))}
    </ul>
  )
}

interface PropertyHeaderProps extends React.PropsWithChildren {
  title: string
  rightContent?: React.ReactNode
}

export function PropertyHeaderWrapper({
  title,
  children,
  rightContent
}: PropertyHeaderProps) {
  return (
    <section className="mt-1 flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">{title}</h1>
        {children}
      </div>
      {rightContent}
    </section>
  )
}
