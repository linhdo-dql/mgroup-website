/**
 * Layout container primitive (`Container`).
 *
 * Constrains content to `--container-site` (D = 1280px) with fluid `--page-margin`
 * horizontal padding so the inner content column equals C = 1200px at desktop width.
 */
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface ContainerProps<T extends ElementType = 'div'> {
  /** HTML element tag to render (defaults to `div`). */
  as?: T
  /** Child elements inside the container. */
  children: ReactNode
  /** Optional additional class names. */
  className?: string
}

/**
 * Renders a centered, fluidly padded page container.
 *
 * @param props - Container properties.
 * @returns Rendered container element.
 */
export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...rest
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as ?? 'div'
  return (
    <Component className={cn('mx-auto w-full max-w-site px-page', className)} {...rest}>
      {children}
    </Component>
  )
}
