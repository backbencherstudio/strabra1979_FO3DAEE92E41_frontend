'use client'

import CircularProgress from '@/components/reusable/ CircularProgress/CircularProgress'

const scoreScale = [
  { label: 'Good', min: 70, max: 100, color: 'var(--success)' },
  { label: 'Fair', min: 30, max: 69, color: 'var(--warning)' },
  { label: 'Poor', min: 0, max: 29, color: 'var(--danger)' },
]

const getScoreMeta = (score: number) => scoreScale.find((s) => score >= s.min && score <= s.max)

export default function InspectionReportFinalScoreCard() {
  const score = 40

  const meta = getScoreMeta(score)

  return (
    <div className="border-input rounded-2xl border px-4 py-5">
      <h3>
        Final Score <span className="text-gray-black-300">(Average Health Score)</span>
      </h3>
      <div className="border-input mt-2 grid grid-cols-2 divide-x rounded-md border bg-white">
        <section
          style={{ color: meta?.color ?? 'black' }}
          className="flex flex-col items-center justify-center gap-1 p-4.5 pt-6"
        >
          <CircularProgress value={76} />
          <p className="mt-2 text-center text-base font-medium">{meta?.label}</p>
          <p className="text-foreground text-center text-sm">Remaining Life: 5-7 Years</p>
        </section>
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
