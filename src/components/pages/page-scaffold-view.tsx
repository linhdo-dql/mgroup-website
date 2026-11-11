/**
 * Structured page view scaffold (`PageScaffoldView`) for M.Group content pages (Pages 2–8, 10).
 *
 * Provides the standardized Block 1 opening hero (`h1` + lead), structured content blocks,
 * and optional bottom `CtaBanner` with pre-selected `InterestTopic`.
 */
import { CtaBanner } from '@/components/common/cta-banner'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import type { InterestTopic } from '@/features/contact/schemas'
import { type Locale, PAGE_ROUTES, type PageId } from '@/i18n/routes'

export interface PageScaffoldViewProps {
  /** Canonical page identifier. */
  pageId: PageId
  /** Active page locale (`vi` or `en`). */
  locale: Locale
  /** Optional default topic for the bottom CTA banner. */
  ctaTopic?: InterestTopic
}

/**
 * Renders the foundational page layout for a given `PageId` and `Locale`.
 *
 * @param props - PageScaffoldView properties.
 * @returns Rendered page sections.
 */
export function PageScaffoldView({ pageId, locale, ctaTopic }: PageScaffoldViewProps) {
  const def = PAGE_ROUTES[pageId]
  const isVi = locale === 'vi'

  return (
    <>
      <Section tone="subtle">
        <SectionHeading
          as="h1"
          title={def.labels[locale]}
          description={def.seoDescription[locale]}
        />
      </Section>

      <Section>
        <div className="rounded-12 border border-border-default bg-surface-default p-6 max-w-[56.25rem]">
          <p className="text-body-md text-text-secondary m-0">{def.seoDescription[locale]}</p>
        </div>
      </Section>

      {ctaTopic ? (
        <CtaBanner
          locale={locale}
          defaultTopic={ctaTopic}
          title={
            isVi
              ? 'Trao đổi bài toán triển khai tại đơn vị'
              : 'Discuss deployment for your organisation'
          }
          description={
            isVi
              ? 'M.Group khảo sát hiện trạng camera/tài liệu và đề xuất cấu hình COGI AI Vision phù hợp.'
              : 'M.Group surveys your existing cameras or documents and proposes an on-premise COGI AI Vision configuration.'
          }
          buttonLabel={isVi ? 'Liên hệ tư vấn' : 'Contact us'}
        />
      ) : null}
    </>
  )
}
