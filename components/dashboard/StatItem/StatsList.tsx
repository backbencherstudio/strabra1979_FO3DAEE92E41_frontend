import StatListItem, { StatListItemProps } from './StatListItem'

interface StatsListProps {
  stats: StatListItemProps[]
  isLoading: boolean
}

export default function StatsList({ stats, isLoading }: StatsListProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatListItem isLoading={isLoading} key={stat.title} {...stat} />
      ))}
    </div>
  )
}
