/**
 * Standardized section heading primitive (`SectionHeading`).
 *
 * Follows `/figma-web-build` text-fidelity rules:
 * - Preserves intentional desktop line breaks (`\n`) at `lg` and above (`lg:whitespace-pre-line`).
 * - Applies `text-balance` on headings and `text-pretty` on descriptions to prevent orphan words.
 */
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface SectionHeadingProps {
  /** Optional small overline/eyebrow label above the heading. */
  eyebrow?: string
  /** Main heading text (may contain `\n` for intentional desktop line breaks). */
  title: string
  /** Optional lead/supporting paragraph below the heading. */
  description?: string
  /** Heading HTML tag level (`h1` for page hero/intro, `h2` for standard sections). */
  as?: 'h1' | 'h2' | 'h3'
  /** Optional actions or slots beside/below the heading. */
  actions?: ReactNode
  /** Additional wrapper class names. */
  className?: string
}

/**
 * Renders a consistent section header block with eyebrow, title, and description.
 *
 * @param props - SectionHeading properties.
 * @returns Rendered heading block.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: HeadingTag = 'h2',
  actions,
  className,
}: SectionHeadingProps) {
  const titleSizeClass =
    HeadingTag === 'h1' ? 'text-h1' : HeadingTag === 'h2' ? 'text-h2' : 'text-h3'

  return (
    <div className={cn('flex flex-col gap-3 max-w-[56.25rem]', className)}>
      {eyebrow ? (
        <span className="text-overline uppercase tracking-[0.06em] text-text-accent font-semibold">
          {eyebrow}
        </span>
      ) : null}
      <HeadingTag
        className={cn(titleSizeClass, 'text-text-primary text-balance lg:whitespace-pre-line m-0')}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            HeadingTag === 'h1' ? 'text-body-lg' : 'text-body-md',
            'text-text-secondary text-pretty lg:whitespace-pre-line m-0 max-w-[53.75rem]',
          )}
        >
          {description}
        </p>
      ) : null}
      {actions ? <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div> : null}
    </div>
  )
}
