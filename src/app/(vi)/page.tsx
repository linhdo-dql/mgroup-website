/**
 * Page 1 (VI): Home (`/`)
 */
import { HomePageView } from '@/components/pages/home-page-view'
import { buildPageMetadata } from '@/i18n/routes'

export const metadata = buildPageMetadata('home', 'vi')

export default function ViHomePage() {
  return <HomePageView locale="vi" />
}
