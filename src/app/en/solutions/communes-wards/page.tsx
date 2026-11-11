/**
 * Page 5 (EN): Communes & Wards Solution (`/en/solutions/communes-wards`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-communes-wards', 'en')

export default function EnCommunesWardsPage() {
  return <PageScaffoldView pageId="solution-communes-wards" locale="en" ctaTopic="communes-wards" />
}
