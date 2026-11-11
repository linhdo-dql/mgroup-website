/**
 * Page 3 (VI): COGI AI Vision Platform (`/nen-tang`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('platform', 'vi')

export default function ViPlatformPage() {
  return <PageScaffoldView pageId="platform" locale="vi" />
}
