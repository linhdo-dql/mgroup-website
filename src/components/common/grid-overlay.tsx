'use client'

/**
 * Interactive 4 / 8 / 12-column Grid Overlay (`GridOverlay`).
 *
 * Used on `/design-system` (and optionally in development) to visually inspect
 * how layout sections align with `Container` (`--page-margin`) and `PageGrid` (`--grid-gutter`).
 */
import { useState } from 'react'

import { Container } from '@/components/layout/container'
import { PageGrid } from '@/components/layout/page-grid'
import { Button } from '@/components/ui/button'

/**
 * Renders a floating toggle button and a full-viewport 4/8/12-column overlay.
 *
 * @returns Rendered toggle control and optional grid overlay.
 */
export function GridOverlay() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className="flex items-center gap-3">
        <Button variant={visible ? 'primary' : 'ghost'} onClick={() => setVisible((v) => !v)}>
          {visible ? 'Hide Grid Overlay (12 cols)' : 'Show Grid Overlay (4 / 8 / 12 cols)'}
        </Button>
      </div>

      {visible ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 flex justify-center"
        >
          <Container className="h-full">
            <PageGrid className="h-full">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className={
                    idx < 4
                      ? 'h-full bg-brand-accent/10 border-x border-brand-accent/25 flex items-end justify-center pb-3 text-caption font-semibold text-text-accent'
                      : idx < 8
                        ? 'hidden md:flex h-full bg-brand-accent/10 border-x border-brand-accent/25 items-end justify-center pb-3 text-caption font-semibold text-text-accent'
                        : 'hidden lg:flex h-full bg-brand-accent/10 border-x border-brand-accent/25 items-end justify-center pb-3 text-caption font-semibold text-text-accent'
                  }
                >
                  <span>{idx + 1}</span>
                </div>
              ))}
            </PageGrid>
          </Container>
        </div>
      ) : null}
    </>
  )
}
