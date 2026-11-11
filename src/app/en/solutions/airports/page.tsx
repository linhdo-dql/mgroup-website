/**
 * Page 6 (EN): Airports Solution (`/en/solutions/airports`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-airports', 'en')

export default function EnAirportsPage() {
  return <PageScaffoldView pageId="solution-airports" locale="en" ctaTopic="airports" />
}
