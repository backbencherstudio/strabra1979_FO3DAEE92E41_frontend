'use client'

import {
  CircularProgressWithMeta,
  scoreScale,
} from '@/components/reusable/CircularProgress/CircularProgress'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
interface InspectionReportFinalScoreCardProps {
  score: number
}

export default function InspectionReportFinalScoreCard({
  score = 0,
}: InspectionReportFinalScoreCardProps) {
  return (
    <SectionCard className="@container">
      <h3>
        Final Score <span className="text-gray-black-300">(Average Health Score)</span>
      </h3>
      <div className="border-input mt-2 grid divide-x rounded-md border bg-white @sm:grid-cols-2">
        <CircularProgressWithMeta placeholder="Remaining Life: 5-7 Years" value={score} />
        <section className="p-4.5 pt-0 @sm:pt-4.5">
          <div className="space-y-3">
            <h2 className="text-base font-medium">Health Distribution</h2>
            {scoreScale.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-base">
                <span
                  className="inline-block size-3 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span>
                  {s.label} ({s.min}-{s.max})
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionCard>
  )
}
