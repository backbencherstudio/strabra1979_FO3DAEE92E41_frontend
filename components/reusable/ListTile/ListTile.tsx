interface ListTileProps {
  leading: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  tailing: React.ReactNode
}

export function ListTile({ leading, title, subtitle, tailing }: ListTileProps) {
  return (
    <li className="flex items-center gap-2 py-4">
      {leading}

      <section className="flex flex-1 flex-col items-start">
        <span className="text-base font-medium">{title}</span>
        <span className="text-muted-foreground text-sm">{subtitle}</span>
      </section>

      {tailing}
    </li>
  )
}
