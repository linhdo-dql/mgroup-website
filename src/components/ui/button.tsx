/**
 * Reusable Button and ButtonLink primitives.
 *
 * Implements the two global button variants specified in Part C3 of the M.Group handover:
 * - `primary`: solid dark/accent fill (`bg-action-primary text-text-inverse`)
 * - `ghost`: outlined secondary button (`bg-surface-default text-text-primary border border-border-strong`)
 *
 * Enforces >= 46px touch height (`min-h-[2.875rem]`) and `whitespace-nowrap` per `/figma-web-build`.
 */
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'ghost'

export interface BaseButtonProps {
  /** Visual style variant of the button. */
  variant?: ButtonVariant
  /** Button label and optional icon children. */
  children: ReactNode
  /** Optional custom class names. */
  className?: string
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-action-primary text-text-inverse hover:bg-action-primary-hover border border-transparent',
  ghost: 'bg-surface-default text-text-primary border border-border-strong hover:bg-surface-subtle',
}

const BASE_BUTTON_CLASSES =
  'inline-flex items-center justify-center gap-2 min-h-[2.875rem] px-5 rounded-8 text-body-sm font-semibold whitespace-nowrap no-underline transition-[background-color,transform] duration-[var(--duration-fast)] ease-standard active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

export type ButtonProps = BaseButtonProps & ComponentPropsWithoutRef<'button'>

/**
 * Renders a native `<button>` element with M.Group design system tokens.
 *
 * @param props - Button properties.
 * @returns Rendered button element.
 */
export function Button({
  variant = 'primary',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE_BUTTON_CLASSES, VARIANT_CLASSES[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export type ButtonLinkProps = BaseButtonProps & ComponentPropsWithoutRef<typeof Link>

/**
 * Renders a Next.js `<Link>` styled identically to `Button`.
 *
 * @param props - ButtonLink properties.
 * @returns Rendered anchor link element.
 */
export function ButtonLink({ variant = 'primary', className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={cn(BASE_BUTTON_CLASSES, VARIANT_CLASSES[variant], className)} {...rest}>
      {children}
    </Link>
  )
}
