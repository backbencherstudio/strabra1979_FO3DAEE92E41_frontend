import { cn } from '@/lib/utils'

interface CircularProgressProps {
  value: number // 0 - 100
  size?: number // px
  strokeWidth?: number
  className?: string
  labelClassName?: string
  containerClassName?: string
}

export default function CircularProgress({
  value = 0,
  size = 120,
  strokeWidth = 10,
  className,
  labelClassName,
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
      <span className={cn('absolute text-xl font-semibold text-gray-900', labelClassName)}>
        {value}%
      </span>
    </div>
  )
}

export const scoreScale = [
  { id: 'good', label: 'Good', min: 70, max: 100, color: 'var(--success)' },
  { id: 'fair', label: 'Fair', min: 30, max: 69, color: 'var(--warning)' },
  { id: 'poor', label: 'Poor', min: 0, max: 29, color: 'var(--danger)' },
]

const getScoreMeta = (score: number) => scoreScale.find((s) => score >= s.min && score <= s.max)

export function CircularProgressWithMeta({
  placeholder,
  containerClassName,
  ...props
}: { placeholder?: string } & CircularProgressProps) {
  const meta =
    typeof props.value === 'number'
      ? getScoreMeta(props.value)
      : { id: '', label: '', min: 0, max: 0, color: '' }

  return (
    <section
      style={{ color: meta?.color ?? 'black' }}
      className={cn(
        'flex flex-col items-center justify-center gap-1 p-4.5 pt-6',
        containerClassName,
      )}
    >
      <CircularProgress {...props} />
      <p className="mt-2 text-center text-base font-medium">{meta?.label}</p>
      {placeholder && <p className="text-foreground text-center text-sm">{placeholder}</p>}
    </section>
  )
}
