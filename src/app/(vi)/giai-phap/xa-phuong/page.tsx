/**
 * Page 5 (VI): Communes & Wards Solution (`/giai-phap/xa-phuong`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-communes-wards', 'vi')

export default function ViCommunesWardsPage() {
  return <PageScaffoldView pageId="solution-communes-wards" locale="vi" ctaTopic="communes-wards" />
}
