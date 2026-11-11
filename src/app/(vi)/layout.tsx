/**
 * Vietnamese route group layout (`(vi)`).
 * Wraps all Vietnamese pages with `SiteHeader` and `SiteFooter` in `vi` locale.
 */
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export default function ViLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader locale="vi" />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter locale="vi" />
    </>
  )
}
