'use client'

import { CircularProgressWithMeta } from '@/components/reusable/CircularProgress/CircularProgress'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { IInspectionHealthThresholdConfig } from '@/types'

interface InspectionReportFinalScoreCardProps {
  healthLabel?: string
  remainingLife?: string
  score?: number
  config: IInspectionHealthThresholdConfig | undefined
}

const HealthRangesLocalConfig = [
  { key: 'good', color: 'var(--success)' },
  { key: 'fair', color: 'var(--warning)' },
  { key: 'poor', color: 'var(--danger)' },
] as const

export default function InspectionReportFinalScoreCard({
  healthLabel,
  remainingLife = '',
  score = 0,
  config,
}: InspectionReportFinalScoreCardProps) {
  return (
    <SectionCard className="@container">
      <h3>
        Final Score <span className="text-gray-black-300">(Average Health Score)</span>
      </h3>
      <div className="border-input mt-2 grid divide-x rounded-md border bg-white @sm:grid-cols-2">
        <CircularProgressWithMeta
          conf={{}}
          healthLabel={healthLabel}
          placeholder={remainingLife ? `Remaining Life: ${remainingLife}` : undefined}
          value={score}
        />
        <section className="p-4.5 pt-0 @sm:pt-4.5">
          <div className="space-y-3">
            <h2 className="text-base font-medium">Health Distribution</h2>
            {config !== undefined &&
              HealthRangesLocalConfig.map((conf) => {
                const item = config[conf.key]
                return (
                  <div key={conf.key} className="flex items-center gap-2 text-base">
                    <span
                      className="inline-block size-3 rounded-full"
                      style={{ backgroundColor: conf.color }}
                    />
                    <span className="capitalize">
                      {conf.key} ({item.minScore}-{item.maxScore})
                    </span>
                  </div>
                )
              })}
          </div>
        </section>
      </div>
    </SectionCard>
  )
}
