/**
 * Reusable Call-To-Action banner (`CtaBanner`) implementing Part C3 of the M.Group specification.
 *
 * Appears at the bottom of Pages 1, 4, 5, 6, 7, and 10.
 * Links to the Contact page (`/lien-he` or `/en/contact`) with an optional `?topic=` query parameter
 * so the Contact Form pre-selects the relevant field of interest.
 */
import { getPageHref } from '@/content/navigation'
import type { InterestTopic } from '@/features/contact/schemas'
import type { Locale } from '@/i18n/routes'

import { Section } from '../layout/section'
import { ButtonLink } from '../ui/button'

export interface CtaBannerProps {
  /** Active page locale. */
  locale: Locale
  /** Heading text for the CTA banner. */
  title: string
  /** Supporting description text. */
  description: string
  /** Button label text. */
  buttonLabel: string
  /** Optional topic pre-selected when navigating to the contact form. */
  defaultTopic?: InterestTopic
}

/**
 * Renders a dark-surface call-to-action strip at the bottom of solution/product pages.
 *
 * @param props - CtaBanner properties.
 * @returns Rendered dark section with CTA link.
 */
export function CtaBanner({
  locale,
  title,
  description,
  buttonLabel,
  defaultTopic,
}: CtaBannerProps) {
  const baseHref = getPageHref('contact', locale)
  const href = defaultTopic ? `${baseHref}?topic=${defaultTopic}` : baseHref

  return (
    <Section tone="dark">
      <div className="flex flex-col gap-4 max-w-[53.75rem]">
        <h2 className="text-h2 text-text-primary text-balance m-0">{title}</h2>
        <p className="text-body-md text-text-secondary text-pretty m-0">{description}</p>
        <div className="pt-1">
          <ButtonLink href={href} variant="primary">
            {buttonLabel}
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
