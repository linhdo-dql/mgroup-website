/**
 * Page 9 (EN): Contact (`/en/contact`)
 */
import { ContactPageView } from '@/components/pages/contact-page-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('contact', 'en')

export default async function EnContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>
}) {
  const params = await searchParams
  return <ContactPageView locale="en" topicParam={params.topic} />
}
