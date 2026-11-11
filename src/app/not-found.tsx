/**
 * Global 404 Not Found page.
 */
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <SiteHeader locale="vi" />
      <main id="main-content" className="flex-1">
        <Section tone="subtle">
          <SectionHeading
            eyebrow="404 · NOT FOUND"
            as="h1"
            title="Không tìm thấy trang yêu cầu"
            description="Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi. Vui lòng quay lại trang chủ."
            actions={
              <>
                <ButtonLink href="/" variant="primary">
                  Về Trang chủ (VI)
                </ButtonLink>
                <ButtonLink href="/en" variant="ghost">
                  Go to Home (EN)
                </ButtonLink>
              </>
            }
          />
        </Section>
      </main>
      <SiteFooter locale="vi" />
    </>
  )
}
