/**
 * Page 7 (VI): Banking Solution (`/giai-phap/ngan-hang`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-banks', 'vi')

export default function ViBanksPage() {
  return <PageScaffoldView pageId="solution-banks" locale="vi" ctaTopic="banks" />
}
