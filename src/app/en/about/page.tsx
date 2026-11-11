/**
 * Page 2 (EN): About M.Group (`/en/about`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('about', 'en')

export default function EnAboutPage() {
  return <PageScaffoldView pageId="about" locale="en" />
}
