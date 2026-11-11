/**
 * Page 10 (VI): Custom Solutions (`/giai-phap/khac`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-other', 'vi')

export default function ViOtherSolutionPage() {
  return <PageScaffoldView pageId="solution-other" locale="vi" ctaTopic="other" />
}
