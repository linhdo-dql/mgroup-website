/**
 * Page 4 (VI): COGI AI Vision OCR (`/cogi-ocr`)
 */
import { PageScaffoldView } from '@/components/pages/page-scaffold-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('ocr', 'vi')

export default function ViOcrPage() {
  return <PageScaffoldView pageId="ocr" locale="vi" ctaTopic="ocr" />
}
