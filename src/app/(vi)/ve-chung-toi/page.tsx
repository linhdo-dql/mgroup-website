/**
 * Page 2 (VI): About M.Group (`/ve-chung-toi`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('about', 'vi')

export default function ViAboutPage() {
  return <PageScaffoldView pageId="about" locale="vi" />
}
