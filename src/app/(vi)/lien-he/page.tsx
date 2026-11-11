/**
 * Page 9 (VI): Contact (`/lien-he`)
 */
import { ContactPageView } from '@/components/pages/contact-page-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('contact', 'vi')

export default async function ViContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>
}) {
  const params = await searchParams
  return <ContactPageView locale="vi" topicParam={params.topic} />
}
