/**
 * Page 8 (EN): Our Team (`/en/team`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('team', 'en')

export default function EnTeamPage() {
  return <PageScaffoldView pageId="team" locale="en" />
}
