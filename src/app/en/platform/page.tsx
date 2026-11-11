/**
 * Page 3 (EN): COGI AI Vision Platform (`/en/platform`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('platform', 'en')

export default function EnPlatformPage() {
  return <PageScaffoldView pageId="platform" locale="en" />
}
