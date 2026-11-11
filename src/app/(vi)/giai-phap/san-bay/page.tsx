/**
 * Page 6 (VI): Airports Solution (`/giai-phap/san-bay`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-airports', 'vi')

export default function ViAirportsPage() {
  return <PageScaffoldView pageId="solution-airports" locale="vi" ctaTopic="airports" />
}
