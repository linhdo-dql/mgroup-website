/**
 * English route segment layout (`/en`).
 * Wraps all English pages with `SiteHeader` and `SiteFooter` in `en` locale.
 */
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader locale="en" />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter locale="en" />
    </>
  )
}
