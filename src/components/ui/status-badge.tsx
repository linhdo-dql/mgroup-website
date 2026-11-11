/**
 * Status badge component (`StatusBadge`).
 *
 * Implements the two deployment readiness badges specified in Part C3 (Page 5 Block 3):
 * - `ready`: "Sẵn có" / "Ready to use" (`bg-status-ready-bg text-status-ready-text`)
 * - `tuned`: "Hiệu chỉnh theo địa bàn" / "Tuned to local data" (`bg-status-tuned-bg text-status-tuned-text`)
 */
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type StatusBadgeVariant = 'ready' | 'tuned' | 'neutral'

export interface StatusBadgeProps {
  /** Semantic status variant. */
  variant?: StatusBadgeVariant
  /** Label text inside the badge. */
  children: ReactNode
  /** Optional custom class names. */
  className?: string
}

const BADGE_VARIANTS: Record<StatusBadgeVariant, string> = {
  ready: 'bg-status-ready-bg text-status-ready-text border-transparent',
  tuned: 'bg-status-tuned-bg text-status-tuned-text border-transparent',
  neutral: 'bg-surface-muted text-text-secondary border-border-default',
}

/**
 * Renders a single-line status pill badge.
 *
 * @param props - StatusBadge properties.
 * @returns Rendered span element.
 */
export function StatusBadge({ variant = 'neutral', children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-6 border text-caption font-semibold whitespace-nowrap',
        BADGE_VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
