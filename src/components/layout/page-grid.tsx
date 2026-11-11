/**
 * Responsive 4 / 8 / 12-column CSS Grid primitive (`PageGrid`).
 *
 * Implements the responsive grid matrix from `design/figma-tokens.json`:
 * - Base (mobile): 4 columns
 * - `md` (tablet >= 48rem): 8 columns
 * - `lg` (desktop >= 64rem): 12 columns
 * - Horizontal gap bound to `--grid-gutter` (`gap-x-gutter`).
 */
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface PageGridProps extends ComponentPropsWithoutRef<'div'> {
  /** Grid child elements. */
  children: ReactNode
}

/**
 * Renders the standard 4/8/12 responsive column grid.
 *
 * @param props - PageGrid properties.
 * @returns Rendered grid container.
 */
export function PageGrid({ children, className, ...rest }: PageGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-gutter gap-y-4',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
