/**
 * Page section layout primitive (`Section`).
 *
 * Enforces consistent vertical section rhythm (`pt-section-top pb-section-bottom`),
 * semantic surface tones (`default`, `subtle`, `muted`, `dark`), and inner `Container` wrapping.
 */
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Container } from './container'

export type SectionTone = 'default' | 'subtle' | 'muted' | 'dark'

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  /** Visual surface tone of the section. */
  tone?: SectionTone
  /** When true, omits the inner `Container` so children can span full viewport width. */
  bleed?: boolean
  /** Optional class name applied to the inner `Container`. */
  containerClassName?: string
  /** Child content of the section. */
  children: ReactNode
}

const TONE_CLASSES: Record<SectionTone, string> = {
  default: 'bg-surface-default text-text-primary border-b border-border-subtle',
  subtle: 'bg-surface-subtle text-text-primary border-b border-border-subtle',
  muted: 'bg-surface-muted text-text-primary border-b border-border-subtle',
  dark: 'dark bg-surface-default text-text-primary border-b border-border-subtle',
}

/**
 * Renders a semantic `<section>` with standardized spacing and background tone.
 *
 * @param props - Section properties.
 * @returns Rendered section element.
 */
export function Section({
  tone = 'default',
  bleed = false,
  containerClassName,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn('pt-section-top pb-section-bottom', TONE_CLASSES[tone], className)}
      {...rest}
    >
      {bleed ? (
        children
      ) : (
        <Container className={cn('flex flex-col gap-section-gap', containerClassName)}>
          {children}
        </Container>
      )}
    </section>
  )
}
