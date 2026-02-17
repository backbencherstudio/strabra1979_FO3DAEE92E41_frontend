'use client'

import {
  CircularProgressWithMeta,
  scoreScale,
} from '@/components/reusable/ CircularProgress/CircularProgress'

export default function InspectionReportFinalScoreCard() {
  const score = 40

  return (
    <div className="border-input rounded-2xl border px-4 py-5">
      <h3>
        Final Score <span className="text-gray-black-300">(Average Health Score)</span>
      </h3>
      <div className="border-input mt-2 grid grid-cols-2 divide-x rounded-md border bg-white">
        <CircularProgressWithMeta placeholder="Remaining Life: 5-7 Years" value={score} />
        <section className="p-4.5">
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
    </div>
  )
}
