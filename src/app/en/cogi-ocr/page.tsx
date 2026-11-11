/**
 * Page 4 (EN): COGI AI Vision OCR (`/en/cogi-ocr`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('ocr', 'en')

export default function EnOcrPage() {
  return <PageScaffoldView pageId="ocr" locale="en" ctaTopic="ocr" />
}
