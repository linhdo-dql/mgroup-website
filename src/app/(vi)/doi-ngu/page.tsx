/**
 * Page 8 (VI): Our Team (`/doi-ngu`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('team', 'vi')

export default function ViTeamPage() {
  return <PageScaffoldView pageId="team" locale="vi" />
}
