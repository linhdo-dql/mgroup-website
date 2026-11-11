/**
 * Page 7 (EN): Banking Solution (`/en/solutions/banks`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('solution-banks', 'en')

export default function EnBanksPage() {
  return <PageScaffoldView pageId="solution-banks" locale="en" ctaTopic="banks" />
}
