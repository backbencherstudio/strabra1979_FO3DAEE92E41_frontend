import { cn } from '@/lib/utils'

interface CircularProgressProps {
  value: number // 0 - 100
  size?: number // px
  strokeWidth?: number
  className?: string
}

export default function CircularProgress({
  value,
  size = 120,
  strokeWidth = 10,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          stroke="currentColor"
          className="text-hover-50"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle */}
        <circle
          stroke="currentColor"
          className="transition-all duration-500 ease-out"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* Center text */}
      <span className="absolute text-xl font-semibold text-gray-900">{value}%</span>
    </div>
  )
}
