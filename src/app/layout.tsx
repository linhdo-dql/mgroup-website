/**
 * Root application layout (`RootLayout`).
 *
 * Imports global CSS (Tailwind v4, self-hosted Inter Variable font, generated design tokens,
 * and semantic theme mappings) and configures default metadata.
 */
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { env } from '@/config/env'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'M.Group – Nền tảng AI Vision Make in Vietnam, chạy tại chỗ',
    template: '%s',
  },
  description:
    'M.Group, start-up được ươm tạo của VNU-TIP (ĐHQGHN), thương mại hóa và phát triển COGI AI Vision: phân tích hình ảnh camera và tài liệu bằng AI, chạy hoàn toàn trong hạ tầng của đơn vị.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className="light">
      <body className="min-h-svh flex flex-col bg-surface-default text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
