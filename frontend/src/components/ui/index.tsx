import { clsx } from 'clsx'

// ── Badge ────────────────────────────────────────────────────────────────────

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-ink-100 text-ink-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger:  'bg-red-100 text-red-700',
  info:    'bg-blue-100 text-blue-700',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

// ── Star Rating ───────────────────────────────────────────────────────────────

interface StarRatingProps {
  value: number      // 0–5, supports decimals
  count?: number
  size?: number
}

export function StarRating({ value, count, size = 14 }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(Math.max(value - i, 0), 1) * 100
    return fill
  })

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((fill, i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="none">
            <defs>
              <linearGradient id={`star-${i}-${value}`}>
                <stop offset={`${fill}%`} stopColor="#f97316" />
                <stop offset={`${fill}%`} stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              d="M10 1l2.39 4.84 5.34.78-3.86 3.77.91 5.32L10 13.27 5.22 15.7l.91-5.32L2.27 6.62l5.34-.78L10 1z"
              fill={`url(#star-${i}-${value})`}
            />
          </svg>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-ink-600">({count.toLocaleString()})</span>
      )}
    </div>
  )
}

// ── Spinner ───────────────────────────────────────────────────────────────────

interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; className?: string }

const spinnerSize = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <svg
      className={clsx('animate-spin text-brand-500', spinnerSize[size], className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={clsx('animate-pulse-soft rounded bg-ink-200', className)} />
  )
}
