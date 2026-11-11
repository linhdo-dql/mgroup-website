/**
 * Page 10 (EN): Custom Solutions (`/en/solutions/other`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-other', 'en')

export default function EnOtherSolutionPage() {
  return <PageScaffoldView pageId="solution-other" locale="en" ctaTopic="other" />
}
