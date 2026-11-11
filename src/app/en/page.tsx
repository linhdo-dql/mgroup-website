/**
 * Page 1 (EN): Home (`/en`)
 */
import { HomePageView } from '@/components/pages/home-page-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('home', 'en')

export default function EnHomePage() {
  return <HomePageView locale="en" />
}
