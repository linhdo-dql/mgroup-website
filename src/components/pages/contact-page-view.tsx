/**
 * Bilingual Contact Page View (`ContactPageView`) implementing Page 9 (3 Blocks) of M.Group specification.
 *
 * Renders:
 * - Block 1: Opening hero (`h1` + lead description).
 * - Block 2: Headquarters address, phone, and email details.
 * - Block 3: Consultation request `ContactForm`.
 */
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { SITE_CHROME_CONTENT } from '@/content/navigation'
import { ContactForm } from '@/features/contact/contact-form'
import { INTEREST_TOPICS, type InterestTopic } from '@/features/contact/schemas'
import type { Locale } from '@/i18n/routes'

export interface ContactPageViewProps {
  /** Active page locale (`vi` or `en`). */
  locale: Locale
  /** Raw `topic` query parameter from URL search params. */
  topicParam?: string
}

const CONTACT_PAGE_COPY: Record<
  Locale,
  {
    title: string
    lead: string
    infoHeading: string
    formHeading: string
  }
> = {
  vi: {
    title: 'Liên hệ với M.Group',
    lead: 'Cho chúng tôi biết lĩnh vực, hiện trạng camera hoặc loại tài liệu cần xử lý. M.Group sẽ liên hệ lại để trao đổi và hẹn lịch khảo sát.',
    infoHeading: 'Thông tin liên hệ',
    formHeading: 'Biểu mẫu yêu cầu tư vấn',
  },
  en: {
    title: 'Contact M.Group',
    lead: 'Tell us about your sector, camera infrastructure, or the documents you need to process. M.Group will get back to you to discuss and schedule a survey.',
    infoHeading: 'Contact information',
    formHeading: 'Consultation request form',
  },
}

/**
 * Renders the 3-block Contact page for the given locale.
 *
 * @param props - ContactPageView properties.
 * @returns Rendered Contact page sections.
 */
export function ContactPageView({ locale, topicParam }: ContactPageViewProps) {
  const copy = CONTACT_PAGE_COPY[locale]
  const { footer } = SITE_CHROME_CONTENT[locale]

  const validTopic =
    topicParam && INTEREST_TOPICS.includes(topicParam as InterestTopic)
      ? (topicParam as InterestTopic)
      : undefined

  return (
    <>
      {/* Block 1: Opening */}
      <Section tone="subtle">
        <SectionHeading as="h1" title={copy.title} description={copy.lead} />
      </Section>

      {/* Block 2: Contact Information */}
      <Section>
        <SectionHeading title={copy.infoHeading} />
        <ul className="m-0 p-0 list-none flex flex-col gap-2.5 max-w-[56.25rem]">
          <li className="flex items-start gap-3 rounded-10 border border-border-subtle bg-surface-default px-4 py-3.5 text-body-sm text-text-secondary">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-4 border-2 border-text-primary"
            />
            <span>
              <strong className="text-text-primary">{footer.addressLabel}:</strong>{' '}
              {footer.addressValue}
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-10 border border-border-subtle bg-surface-default px-4 py-3.5 text-body-sm text-text-secondary">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-4 border-2 border-text-primary"
            />
            <span>
              <strong className="text-text-primary">{footer.phoneLabel}:</strong>{' '}
              {footer.phoneValue}
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-10 border border-border-subtle bg-surface-default px-4 py-3.5 text-body-sm text-text-secondary">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-4 border-2 border-text-primary"
            />
            <span>
              <strong className="text-text-primary">{footer.emailLabel}:</strong>{' '}
              {footer.emailValue}
            </span>
          </li>
        </ul>
      </Section>

      {/* Block 3: Consultation Form */}
      <Section tone="muted">
        <SectionHeading title={copy.formHeading} />
        <ContactForm locale={locale} defaultTopic={validTopic} />
      </Section>
    </>
  )
}
